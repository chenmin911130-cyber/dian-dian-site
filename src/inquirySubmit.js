export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const MIN_FORM_MS = 3000;
export const MIN_RESUBMIT_MS = 60_000;
export const RATE_LIMIT_KEY = "diandian-inquiry-last-submit";
export const MAJOR_OTHER_VALUE = "其他";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const jobDescription = form.jobDescription?.trim() ?? "";
  const income = form.income?.trim() ?? "";
  const savings = form.savings?.trim() ?? "";
  const majorChoice = form.majorChoice?.trim() ?? "";
  const major = resolveMajor(form);
  const email = form.email?.trim() ?? "";

  if (!education) {
    fieldErrors.education = zh ? "请选择学历。" : "Please select your education level.";
  }
  if (!employment) {
    fieldErrors.employment = zh ? "请选择工作情况。" : "Please select your employment status.";
  }
  if (!income) {
    fieldErrors.income = zh ? "请选择收入区间。" : "Please select an income range.";
  }
  if (!savings) {
    fieldErrors.savings = zh ? "请选择存款区间。" : "Please select a savings range.";
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

  if (Object.keys(fieldErrors).length) {
    return { ok: false, fieldErrors };
  }
  return {
    ok: true,
    data: { education, employment, jobDescription, income, savings, major, email },
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

function formatInquirySubmittedAt(date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Pacific/Auckland",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}（新西兰时间）`;
}

function inquiryMessageLine(label, value) {
  return `${label}：${value ?? ""}`;
}

export function buildInquiryPayload(data, locale, submittedAt = new Date()) {
  const jobDescription = data.jobDescription?.trim() ?? "";
  const submitLanguage = locale === "zh" ? "中文" : "English";
  const lines = [
    inquiryMessageLine("学历", data.education),
    inquiryMessageLine("工作情况", data.employment),
    inquiryMessageLine("具体工作", jobDescription),
    inquiryMessageLine("收入", data.income),
    inquiryMessageLine("存款", data.savings),
    inquiryMessageLine("意向专业", data.major),
    inquiryMessageLine("邮箱", data.email),
    inquiryMessageLine("提交语言", submitLanguage),
    inquiryMessageLine("提交时间", formatInquirySubmittedAt(submittedAt)),
  ];
  return {
    subject: `咨询：${data.email}｜${data.major}`,
    from_name: data.email,
    email: data.email,
    message: lines.join("\n"),
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
