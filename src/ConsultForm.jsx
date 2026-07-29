import { useState } from "react";
import { generateConsultDoc } from "./generateConsultDoc";

const INTEREST_OPTIONS = [
  { id: "school", zh: "选校", en: "School choice" },
  { id: "visa", zh: "签证", en: "Visa" },
  { id: "job", zh: "找工作", en: "Jobs" },
  { id: "rent", zh: "租房", en: "Housing" },
  { id: "other", zh: "其他", en: "Other" },
];

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
  nationality: "中国",
  passportNo: "",
  email: "",
  contact: "",
  wechat: "",
  city: "",
  schoolIntent: "",
  degree: "",
  major: "",
  arrival: "",
  english: "",
  hasOffer: "",
  interests: [],
  highestEdu: "",
  schoolName: "",
  schoolMajor: "",
  eduHistory: "",
  employmentStatus: "",
  employer: "",
  jobTitle: "",
  monthlyIncome: "",
  workHistory: "",
  fundingSource: "",
  sponsorName: "",
  sponsorRelation: "",
  sponsorIncome: "",
  depositAmount: "",
  depositBank: "",
  statementMonths: "",
  largeTransfers: "",
  travelHistory: "",
  visaRefusal: "",
  notes: "",
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
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDone(false);
  }

  function toggleInterest(id) {
    setForm((prev) => {
      const has = prev.interests.includes(id);
      return {
        ...prev,
        interests: has
          ? prev.interests.filter((item) => item !== id)
          : [...prev.interests, id],
      };
    });
    setDone(false);
  }

  function interestLabels(ids) {
    return ids.map((id) => {
      const opt = INTEREST_OPTIONS.find((item) => item.id === id);
      return opt ? `${opt.zh} / ${opt.en}` : id;
    });
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
          ? "请至少填写姓名、邮箱和手机。"
          : "Please fill in name, email, and phone.",
      );
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError(zh ? "请输入有效邮箱。" : "Please enter a valid email.");
      return;
    }

    setBusy(true);
    try {
      const payload = trimAll({
        ...form,
        interests: interestLabels(form.interests),
      });
      await generateConsultDoc(payload);
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
            ? "按类别填写必要信息即可。完成后可下载 Word 发给顾问；资料仅在本机生成，不会上传。"
            : "Fill in the essentials by section. Download a Word file for your advisor—nothing is uploaded."}
        </p>
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
          <Field label={zh ? "护照姓名（拼音）" : "Passport name"}>
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
          <Field label={zh ? "国籍" : "Nationality"}>
            <input
              value={form.nationality}
              onChange={(e) => update("nationality", e.target.value)}
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
          <Field label={zh ? "手机 *" : "Phone *"}>
            <input
              value={form.contact}
              onChange={(e) => update("contact", e.target.value)}
              required
            />
          </Field>
          <Field label={zh ? "微信" : "WeChat"}>
            <input
              value={form.wechat}
              onChange={(e) => update("wechat", e.target.value)}
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
          <Field label={zh ? "意向学校" : "Intended school"}>
            <input
              value={form.schoolIntent}
              onChange={(e) => update("schoolIntent", e.target.value)}
              placeholder="AIS / ICL / Yoobee / NZSE / Future Skills"
            />
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
          <Field label={zh ? "英语成绩（IELTS/PTE）" : "English score"}>
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
          <fieldset className="consult-form__interests consult-form__full">
            <legend>{zh ? "咨询方向" : "What you need help with"}</legend>
            <div className="consult-form__checks">
              {INTEREST_OPTIONS.map((opt) => (
                <label key={opt.id} className="consult-check">
                  <input
                    type="checkbox"
                    checked={form.interests.includes(opt.id)}
                    onChange={() => toggleInterest(opt.id)}
                  />
                  <span>{zh ? opt.zh : opt.en}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </Section>

        <Section title={zh ? "3. 学历背景" : "3. Education"}>
          <Field label={zh ? "最高学历" : "Highest qualification"}>
            <input
              value={form.highestEdu}
              onChange={(e) => update("highestEdu", e.target.value)}
              placeholder={zh ? "高中 / 大专 / 本科 / 硕士" : "High school / Diploma / Bachelor"}
            />
          </Field>
          <Field label={zh ? "学校" : "School"}>
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
          <Field
            label={zh ? "学历时间线（简要）" : "Education timeline (brief)"}
            full
          >
            <textarea
              rows={2}
              value={form.eduHistory}
              onChange={(e) => update("eduHistory", e.target.value)}
              placeholder={
                zh
                  ? "例如：2018–2022 某某大学 本科 会计"
                  : "e.g. 2018–2022 University X, Bachelor of Accounting"
              }
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
          <Field label={zh ? "单位" : "Employer"}>
            <input
              value={form.employer}
              onChange={(e) => update("employer", e.target.value)}
            />
          </Field>
          <Field label={zh ? "职位" : "Job title"}>
            <input
              value={form.jobTitle}
              onChange={(e) => update("jobTitle", e.target.value)}
            />
          </Field>
          <Field label={zh ? "税后月收入（人民币）" : "Monthly income (CNY net)"}>
            <input
              value={form.monthlyIncome}
              onChange={(e) => update("monthlyIncome", e.target.value)}
              placeholder={zh ? "例如：8000" : "e.g. 8000"}
            />
          </Field>
          <Field label={zh ? "工作经历（简要）" : "Work history (brief)"} full>
            <textarea
              rows={2}
              value={form.workHistory}
              onChange={(e) => update("workHistory", e.target.value)}
              placeholder={
                zh
                  ? "例如：2022.03–至今 某某公司 销售"
                  : "e.g. 2022.03–present Company Y, Sales"
              }
            />
          </Field>
        </Section>

        <Section
          title={zh ? "5. 资金证明：收入、存款与流水" : "5. Funds: income, deposits, statements"}
        >
          <Field label={zh ? "资金来源" : "Funding source"}>
            <input
              value={form.fundingSource}
              onChange={(e) => update("fundingSource", e.target.value)}
              placeholder={zh ? "自费 / 父母 / 配偶 / 混合" : "Self / parents / spouse / mixed"}
            />
          </Field>
          <Field label={zh ? "担保人姓名" : "Sponsor name"}>
            <input
              value={form.sponsorName}
              onChange={(e) => update("sponsorName", e.target.value)}
            />
          </Field>
          <Field label={zh ? "与申请人关系" : "Relationship"}>
            <input
              value={form.sponsorRelation}
              onChange={(e) => update("sponsorRelation", e.target.value)}
              placeholder={zh ? "父亲 / 母亲 / 配偶" : "Father / mother / spouse"}
            />
          </Field>
          <Field label={zh ? "担保人年收入（人民币）" : "Sponsor annual income (CNY)"}>
            <input
              value={form.sponsorIncome}
              onChange={(e) => update("sponsorIncome", e.target.value)}
            />
          </Field>
          <Field label={zh ? "存款总额" : "Total deposits"}>
            <input
              value={form.depositAmount}
              onChange={(e) => update("depositAmount", e.target.value)}
              placeholder={zh ? "例如：25 万人民币" : "e.g. CNY 250,000"}
            />
          </Field>
          <Field label={zh ? "开户银行" : "Bank"}>
            <input
              value={form.depositBank}
              onChange={(e) => update("depositBank", e.target.value)}
            />
          </Field>
          <Field label={zh ? "可提供流水月份" : "Bank statements available"}>
            <input
              value={form.statementMonths}
              onChange={(e) => update("statementMonths", e.target.value)}
              placeholder={zh ? "例如：近 6–12 个月" : "e.g. last 6–12 months"}
            />
          </Field>
          <Field
            label={zh ? "大额进账说明" : "Large deposits explanation"}
            full
          >
            <textarea
              rows={2}
              value={form.largeTransfers}
              onChange={(e) => update("largeTransfers", e.target.value)}
              placeholder={
                zh
                  ? "工资、转账、卖房等大额来源"
                  : "Salary, transfers, property sale, etc."
              }
            />
          </Field>
        </Section>

        <Section title={zh ? "6. 其他签证相关" : "6. Other visa details"}>
          <Field label={zh ? "出国 / 旅行记录" : "Travel history"} full>
            <textarea
              rows={2}
              value={form.travelHistory}
              onChange={(e) => update("travelHistory", e.target.value)}
              placeholder={zh ? "国家、时间（无则写无）" : "Countries & dates (or none)"}
            />
          </Field>
          <Field label={zh ? "是否有拒签史" : "Any visa refusal?"} full>
            <textarea
              rows={2}
              value={form.visaRefusal}
              onChange={(e) => update("visaRefusal", e.target.value)}
              placeholder={zh ? "无 / 有（说明国家与原因）" : "No / Yes (country & reason)"}
            />
          </Field>
          <Field label={zh ? "补充说明" : "Notes"} full>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder={
                zh
                  ? "材料缺口或其他想说明的情况"
                  : "Document gaps or anything else to note"
              }
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
            {zh
              ? "Word 已开始下载。请另附学历、在职/收入、存款证明与银行流水扫描件发给顾问。"
              : "Word downloading. Attach education, income, deposit and bank-statement scans for your advisor."}
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
