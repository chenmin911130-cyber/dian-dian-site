import { useState } from "react";
import { CONTACT_EMAIL, siteCopy } from "./content";
import { generateConsultDoc } from "./generateConsultDoc";

const CITY_OPTIONS = [
  { value: "", zh: "请选择", en: "Select" },
  { value: "奥克兰 Auckland", zh: "奥克兰 Auckland", en: "Auckland" },
  { value: "惠灵顿 Wellington", zh: "惠灵顿 Wellington", en: "Wellington" },
  { value: "基督城 Christchurch", zh: "基督城 Christchurch", en: "Christchurch" },
  { value: "汉密尔顿 Hamilton", zh: "汉密尔顿 Hamilton", en: "Hamilton" },
  { value: "但尼丁 Dunedin", zh: "但尼丁 Dunedin", en: "Dunedin" },
  { value: "未定 / 需要建议", zh: "未定 / 需要建议", en: "Undecided" },
];

const DEGREE_OPTIONS = [
  { value: "", zh: "请选择", en: "Select" },
  { value: "语言 / 预科", zh: "语言 / 预科", en: "Language / pathway" },
  { value: "专科 / Diploma", zh: "专科 / Diploma", en: "Diploma" },
  { value: "本科", zh: "本科", en: "Bachelor" },
  { value: "研文 / PGDip", zh: "研文 / PGDip", en: "Graduate diploma" },
  { value: "硕士", zh: "硕士", en: "Master’s" },
  { value: "其他", zh: "其他", en: "Other" },
];

const YES_NO = [
  { value: "", zh: "请选择", en: "Select" },
  { value: "是", zh: "是", en: "Yes" },
  { value: "否", zh: "否", en: "No" },
];

const emptyForm = {
  name: "",
  nameEn: "",
  birthDate: "",
  passportNo: "",
  email: "",
  contact: "",
  city: "",
  degree: "",
  schoolIntent: "",
  major: "",
  arrival: "",
  english: "",
  hasOffer: "",
  highestEdu: "",
  schoolName: "",
  schoolMajor: "",
  employmentStatus: "",
  employer: "",
  monthlyIncome: "",
};

function Section({ title, children }) {
  return (
    <section className="consult-section">
      <h3 className="consult-section__title">{title}</h3>
      <div className="consult-form__grid">{children}</div>
    </section>
  );
}

function Field({ label, children, full = false }) {
  return (
    <label className={full ? "consult-form__full" : undefined}>
      <span>{label}</span>
      {children}
    </label>
  );
}

export function ConsultForm({ locale, labels, onBack }) {
  const zh = locale === "zh";
  const copy = siteCopy[locale];
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDone(false);
  }

  function trimAll(data) {
    const next = { ...data };
    for (const key of Object.keys(next)) {
      if (typeof next[key] === "string") next[key] = next[key].trim();
    }
    return next;
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.contact.trim()) {
      setError(
        zh
          ? "请至少填写姓名、邮箱和手机/微信。"
          : "Please fill in name, email, and phone or WeChat.",
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError(zh ? "请输入有效邮箱。" : "Please enter a valid email.");
      return;
    }

    setBusy(true);
    try {
      await generateConsultDoc(trimAll(form));
      setDone(true);
    } catch {
      setError(
        zh
          ? "生成 Word 失败，请重试或换用 Chrome / Edge。"
          : "Could not generate the Word file. Retry in Chrome or Edge.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="detail-page consult-page" aria-labelledby="consult-title">
      <button className="detail-back" type="button" onClick={onBack}>
        ← {labels?.backHome ?? (zh ? "返回首页" : "Back to home")}
      </button>

      <header className="consult-page__head">
        <p className="consult-page__kicker">STUDENT VISA PREP</p>
        <h1 id="consult-title">
          {zh ? "留学签证咨询信息表" : "Student visa consultation form"}
        </h1>
        <p className="consult-page__lead">
          {zh
            ? "按四个部分填写必要信息即可。完成后在本机生成 Word 文件，邮件发给点点；资料仅在你的浏览器中处理，不会上传。"
            : "Fill in the essentials across four sections. A Word file is generated on your device to email to DianDian—nothing is uploaded."}
        </p>
        <div className="consult-page__notes">
          <p className="consult-page__contact">
            {zh ? "联系点点：" : "Contact DianDian: "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            {zh
              ? "（填好的 Word 文件也发到这个邮箱）"
              : " (send the finished Word file here too)"}
          </p>
          <p className="site-note">{copy.disclaimer}</p>
        </div>
      </header>

      <form className="consult-form" onSubmit={onSubmit} noValidate>
        <Section title={zh ? "1. 基本信息 / 护照" : "1. Personal / passport"}>
          <Field label={zh ? "中文姓名 *" : "Name (Chinese) *"}>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </Field>
          <Field label={zh ? "护照姓名（拼音）" : "Passport name (pinyin)"}>
            <input
              value={form.nameEn}
              onChange={(e) => update("nameEn", e.target.value)}
              placeholder="e.g. ZHANG San"
            />
          </Field>
          <Field label={zh ? "出生日期" : "Date of birth"}>
            <input
              value={form.birthDate}
              onChange={(e) => update("birthDate", e.target.value)}
              placeholder="YYYY-MM-DD"
            />
          </Field>
          <Field label={zh ? "护照号码" : "Passport number"}>
            <input
              value={form.passportNo}
              onChange={(e) => update("passportNo", e.target.value)}
            />
          </Field>
          <Field label={zh ? "邮箱 *" : "Email *"}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              required
            />
          </Field>
          <Field label={zh ? "手机 / 微信 *" : "Phone / WeChat *"}>
            <input
              value={form.contact}
              onChange={(e) => update("contact", e.target.value)}
              required
            />
          </Field>
        </Section>

        <Section title={zh ? "2. 留学意向" : "2. Study plans"}>
          <Field label={zh ? "目标城市" : "Target city"}>
            <select
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            >
              {CITY_OPTIONS.map((opt) => (
                <option key={opt.value || "city"} value={opt.value}>
                  {zh ? opt.zh : opt.en}
                </option>
              ))}
            </select>
          </Field>
          <Field label={zh ? "意向学历" : "Intended level"}>
            <select
              value={form.degree}
              onChange={(e) => update("degree", e.target.value)}
            >
              {DEGREE_OPTIONS.map((opt) => (
                <option key={opt.value || "deg"} value={opt.value}>
                  {zh ? opt.zh : opt.en}
                </option>
              ))}
            </select>
          </Field>
          <Field label={zh ? "意向学校" : "Intended school"}>
            <input
              value={form.schoolIntent}
              onChange={(e) => update("schoolIntent", e.target.value)}
              placeholder="AIS / ICL / Yoobee / NZSE / Future Skills"
            />
          </Field>
          <Field label={zh ? "意向专业 / 课程" : "Intended programme"}>
            <input
              value={form.major}
              onChange={(e) => update("major", e.target.value)}
            />
          </Field>
          <Field label={zh ? "预计开学" : "Intended start"}>
            <input
              value={form.arrival}
              onChange={(e) => update("arrival", e.target.value)}
              placeholder={zh ? "例如：2026 年 2 月" : "e.g. Feb 2026"}
            />
          </Field>
          <Field label={zh ? "英语成绩（IELTS/PTE）" : "English score (IELTS/PTE)"}>
            <input
              value={form.english}
              onChange={(e) => update("english", e.target.value)}
              placeholder={zh ? "例如：IELTS 6.0 / 待考" : "e.g. IELTS 6.0 / pending"}
            />
          </Field>
          <Field label={zh ? "是否已有 Offer" : "Offer already?"}>
            <select
              value={form.hasOffer}
              onChange={(e) => update("hasOffer", e.target.value)}
            >
              {YES_NO.map((opt) => (
                <option key={opt.value || "offer"} value={opt.value}>
                  {zh ? opt.zh : opt.en}
                </option>
              ))}
            </select>
          </Field>
        </Section>

        <Section title={zh ? "3. 学历背景" : "3. Education"}>
          <Field label={zh ? "最高学历" : "Highest qualification"}>
            <input
              value={form.highestEdu}
              onChange={(e) => update("highestEdu", e.target.value)}
              placeholder={zh ? "高中 / 大专 / 本科 / 硕士" : "High school / Diploma / Bachelor"}
            />
          </Field>
          <Field label={zh ? "毕业院校" : "School"}>
            <input
              value={form.schoolName}
              onChange={(e) => update("schoolName", e.target.value)}
            />
          </Field>
          <Field label={zh ? "专业" : "Major"}>
            <input
              value={form.schoolMajor}
              onChange={(e) => update("schoolMajor", e.target.value)}
            />
          </Field>
        </Section>

        <Section title={zh ? "4. 工作经历" : "4. Work"}>
          <Field label={zh ? "当前状态" : "Current status"}>
            <input
              value={form.employmentStatus}
              onChange={(e) => update("employmentStatus", e.target.value)}
              placeholder={zh ? "在职 / 待业 / 学生" : "Employed / unemployed / student"}
            />
          </Field>
          <Field label={zh ? "单位 / 职位" : "Employer / role"}>
            <input
              value={form.employer}
              onChange={(e) => update("employer", e.target.value)}
            />
          </Field>
          <Field label={zh ? "税后月收入（人民币）" : "Monthly income (CNY net)"}>
            <input
              value={form.monthlyIncome}
              onChange={(e) => update("monthlyIncome", e.target.value)}
              placeholder={zh ? "例如：8000（无则写无）" : "e.g. 8000 (or none)"}
            />
          </Field>
        </Section>

        {error ? (
          <p className="consult-form__error" role="alert">
            {error}
          </p>
        ) : null}
        {done ? (
          <p className="consult-form__success" role="status">
            {zh ? (
              <>
                Word 已开始下载。请将文件发送至{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                ，如有学历或在职证明扫描件可一并附上。
              </>
            ) : (
              <>
                Word is downloading. Email it to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                , with education or employment scans if you have them.
              </>
            )}
          </p>
        ) : null}

        <div className="consult-form__actions">
          <button
            className="consult-form__submit"
            type="submit"
            disabled={busy}
          >
            {busy
              ? zh
                ? "生成中…"
                : "Generating…"
              : zh
                ? "生成并下载 Word"
                : "Generate & download Word"}
          </button>
          <button
            className="consult-form__cancel"
            type="button"
            onClick={onBack}
          >
            {labels?.backHome ?? (zh ? "返回首页" : "Back to home")}
          </button>
        </div>
      </form>
    </section>
  );
}
