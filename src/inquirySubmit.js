export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const MIN_FORM_MS = 3000;
export const MIN_RESUBMIT_MS = 60_000;
export const RATE_LIMIT_KEY = "diandian-inquiry-last-submit";
export const MAJOR_OTHER_VALUE = "其他";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d+\s()-]{8,20}$/;

export function resolveMajor(form) {
  const choice = form.majorChoice?.trim() ?? "";
  const other = form.majorOther?.trim() ?? "";
  if (choice === MAJOR_OTHER_VALUE) return other;
  return choice;
}

export function validateInquiryFields(form, locale) {
  const zh = locale === "zh";
  const fieldErrors = {};
  const education = form.education?.trim() ?? "";
  const employment = form.employment?.trim() ?? "";
  const income = form.income?.trim() ?? "";
  const majorChoice = form.majorChoice?.trim() ?? "";
  const major = resolveMajor(form);
  const email = form.email?.trim() ?? "";
  const phone = form.phone?.trim() ?? "";

  if (!education) {
    fieldErrors.education = zh ? "请选择学历。" : "Please select your education level.";
  }
  if (!employment) {
    fieldErrors.employment = zh ? "请选择工作情况。" : "Please select your employment status.";
  }
  if (!income) {
    fieldErrors.income = zh ? "请选择收入区间。" : "Please select an income range.";
  }
  if (!majorChoice) {
    fieldErrors.major = zh ? "请选择专业方向。" : "Please select a field of study.";
  } else if (majorChoice === MAJOR_OTHER_VALUE && !major) {
    fieldErrors.majorOther = zh ? "请填写你的专业方向。" : "Please describe your field of study.";
  }
  if (!email) {
    fieldErrors.email = zh ? "请填写邮箱。" : "Please enter your email.";
  } else if (!EMAIL_RE.test(email)) {
    fieldErrors.email = zh ? "请输入有效邮箱。" : "Please enter a valid email.";
  }
  if (!phone) {
    fieldErrors.phone = zh ? "请填写手机号。" : "Please enter your mobile number.";
  } else if (!PHONE_RE.test(phone)) {
    fieldErrors.phone = zh
      ? "请输入有效手机号（8–20 位数字）。"
      : "Please enter a valid mobile number (8–20 digits).";
  }

  if (Object.keys(fieldErrors).length) {
    return { ok: false, fieldErrors };
  }
  return {
    ok: true,
    data: { education, employment, income, major, email, phone },
  };
}

export function checkInquirySpamGuards({
  honeypot,
  formStartedAt,
  now = Date.now(),
  lastSubmitAt = 0,
  locale = "zh",
}) {
  const zh = locale === "zh";
  if (honeypot?.trim()) {
    return { ok: false, bot: true };
  }
  if (now - formStartedAt < MIN_FORM_MS) {
    return {
      ok: false,
      formError: zh
        ? "提交过快，请稍等几秒再试。"
        : "That was too fast. Please wait a few seconds and try again.",
    };
  }
  if (lastSubmitAt && now - lastSubmitAt < MIN_RESUBMIT_MS) {
    return {
      ok: false,
      formError: zh
        ? "你已刚刚提交过，请稍后再试。"
        : "You just submitted. Please wait a minute before trying again.",
    };
  }
  return { ok: true };
}

export function buildInquiryPayload(data, locale) {
  const zh = locale === "zh";
  const lines = [
    zh ? "— 留学意向咨询（diandianyudita.com/ask）—" : "— Study inquiry (diandianyudita.com/ask) —",
    `${zh ? "学历" : "Education"}: ${data.education}`,
    `${zh ? "工作情况" : "Employment"}: ${data.employment}`,
    `${zh ? "收入" : "Income"}: ${data.income}`,
    `${zh ? "专业方向" : "Intended major"}: ${data.major}`,
    `${zh ? "邮箱" : "Email"}: ${data.email}`,
    `${zh ? "手机" : "Mobile"}: ${data.phone}`,
  ];
  return {
    subject: zh ? "留学意向咨询｜点点网站" : "Study inquiry | DianDian site",
    from_name: data.phone,
    email: data.email,
    message: lines.join("\n"),
    education_level: data.education,
    employment_status: data.employment,
    income: data.income,
    intended_major: data.major,
    phone: data.phone,
  };
}

export async function submitInquiryToWeb3Forms(payload, accessKey) {
  if (!accessKey?.trim()) {
    return { ok: false, error: "not_configured" };
  }

  let response;
  try {
    response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey.trim(),
        botcheck: "",
        ...payload,
      }),
    });
  } catch {
    return { ok: false, error: "network" };
  }

  let body;
  try {
    body = await response.json();
  } catch {
    return { ok: false, error: "network" };
  }

  if (!response.ok || !body.success) {
    return { ok: false, error: "service" };
  }
  return { ok: true };
}
