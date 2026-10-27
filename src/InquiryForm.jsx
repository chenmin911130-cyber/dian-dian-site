import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { inquiryCopy } from "./content";
import {
  MAJOR_OTHER_VALUE,
  RATE_LIMIT_KEY,
  buildInquiryPayload,
  checkInquirySpamGuards,
  submitInquiryToWeb3Forms,
  validateInquiryFields,
} from "./inquirySubmit";

const EDUCATION_OPTIONS = [
  { value: "高中", zh: "高中", en: "Secondary" },
  { value: "专科 / Diploma", zh: "专科", en: "Diploma" },
  { value: "本科", zh: "本科", en: "Bachelor" },
  { value: "研文 / PGDip", zh: "研文", en: "PGDip" },
  { value: "硕士", zh: "硕士", en: "Master’s" },
  { value: "博士", zh: "博士", en: "PhD" },
];

const EMPLOYMENT_OPTIONS = [
  { value: "在职", zh: "在职", en: "Employed" },
  { value: "待业", zh: "待业", en: "Unemployed" },
  { value: "在校学生", zh: "在校学生", en: "Student" },
  { value: "自由职业", zh: "自由职业", en: "Self-employed" },
];

const INCOME_OPTIONS = [
  { value: "5000 人民币以下 / under ¥5,000", zh: "5千以下", en: "< ¥5k" },
  { value: "5000–10000 人民币", zh: "5千–1万", en: "¥5–10k" },
  { value: "10000–20000 人民币", zh: "1万–2万", en: "¥10–20k" },
  { value: "20000–35000 人民币", zh: "2万–3.5万", en: "¥20–35k" },
  { value: "35000 人民币以上", zh: "3.5万以上", en: "> ¥35k" },
  { value: "不便透露", zh: "不便透露", en: "Prefer not to say" },
];

const SAVINGS_OPTIONS = [
  { value: "NZ$10,000 以下 / under NZ$10k", zh: "1万纽币以下", en: "< NZ$10k" },
  { value: "NZ$10,000–30,000", zh: "1–3万纽币", en: "NZ$10–30k" },
  { value: "NZ$30,000–60,000", zh: "3–6万纽币", en: "NZ$30–60k" },
  { value: "NZ$60,000–100,000", zh: "6–10万纽币", en: "NZ$60–100k" },
  { value: "NZ$100,000 以上", zh: "10万纽币以上", en: "> NZ$100k" },
  { value: "不便透露", zh: "不便透露", en: "Prefer not to say" },
];

const MAJOR_OPTIONS = [
  { value: "商科 / 管理", zh: "商科", en: "Business" },
  { value: "IT / 计算机", zh: "IT", en: "IT" },
  { value: "工程", zh: "工程", en: "Engineering" },
  { value: "护理 / 健康", zh: "护理/健康", en: "Health" },
  { value: "设计 / 创意", zh: "设计", en: "Design" },
  { value: "教育", zh: "教育", en: "Education" },
  { value: MAJOR_OTHER_VALUE, zh: "其他", en: "Other" },
];

const emptyForm = {
  education: "",
  employment: "",
  jobDescription: "",
  income: "",
  savings: "",
  majorChoice: "",
  majorOther: "",
  email: "",
  website: "",
};

function ChipGroup({ legend, name, options, value, onSelect, error, locale }) {
  const errorId = error ? `${name}-error` : undefined;
  return (
    <fieldset
      className={`inquiry-chip-group${error ? " inquiry-chip-group--error" : ""}`}
      aria-describedby={errorId}
    >
      <legend className="inquiry-chip-group__legend">{legend}</legend>
      <div className="inquiry-chip-group__options" role="radiogroup" aria-label={legend}>
        {options.map((opt) => {
          const selected = value === opt.value;
          const label = locale === "zh" ? opt.zh : opt.en;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`inquiry-chip${selected ? " is-selected" : ""}`}
              onClick={() => onSelect(opt.value)}
            >
              {label}
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="inquiry-field-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

function TextField({ label, id, error, children }) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={`inquiry-form__field${error ? " inquiry-form__field--error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? (
        <p className="inquiry-field-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function InquiryForm({ locale, setLocale }) {
  const copy = inquiryCopy[locale];
  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const formStartedAt = useRef(Date.now());

  useEffect(() => {
    formStartedAt.current = Date.now();
  }, []);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setDone(false);
    setFormError("");
    setFieldErrors((prev) => {
      if (!prev[key] && key !== "majorChoice" && key !== "majorOther") return prev;
      const next = { ...prev };
      delete next[key];
      if (key === "majorChoice" || key === "majorOther") delete next.major;
      if (key === "majorChoice") delete next.majorOther;
      return next;
    });
  }

  async function onSubmit(event) {
    event.preventDefault();
    setFormError("");
    setFieldErrors({});

    const spam = checkInquirySpamGuards({
      honeypot: form.website,
      formStartedAt: formStartedAt.current,
      lastSubmitAt: Number(localStorage.getItem(RATE_LIMIT_KEY) || 0),
      locale,
    });
    if (!spam.ok) {
      if (spam.bot) {
        setDone(true);
        return;
      }
      setFormError(spam.formError);
      return;
    }

    const validated = validateInquiryFields(form, locale);
    if (!validated.ok) {
      setFieldErrors(validated.fieldErrors);
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";
    setBusy(true);
    try {
      const payload = buildInquiryPayload(validated.data, locale);
      const result = await submitInquiryToWeb3Forms(payload, accessKey);
      if (!result.ok) {
        setFormError(copy.submitFail);
        return;
      }
      localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
      setDone(true);
      setForm(emptyForm);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <section className="inquiry-page inquiry-page--success" aria-labelledby="inquiry-success-title">
        <div className="inquiry-success-card">
          <div className="inquiry-page__success-icon" aria-hidden="true">
            <span className="inquiry-page__success-check">✓</span>
          </div>
          <h1 id="inquiry-success-title">{copy.successTitle}</h1>
          <p className="inquiry-page__lead">{copy.successBody}</p>
          <Link className="inquiry-form__home-link inquiry-success-card__cta" to="/">
            {copy.backHome}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="inquiry-page" aria-labelledby="inquiry-title">
      <div className="inquiry-page__card">
        <header className="inquiry-page__head">
          <p className="inquiry-page__kicker">{copy.kicker}</p>
          <h1 id="inquiry-title">{copy.title}</h1>
          <p className="inquiry-page__lead">{copy.lead}</p>
        </header>

        <form className="inquiry-form" onSubmit={onSubmit} noValidate>
          <div className="inquiry-form__hp" aria-hidden="true">
            <label htmlFor="inquiry-website">Leave blank</label>
            <input
              id="inquiry-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </div>

          <ChipGroup
            legend={copy.educationLabel}
            name="education"
            options={EDUCATION_OPTIONS}
            value={form.education}
            onSelect={(value) => update("education", value)}
            error={fieldErrors.education}
            locale={locale}
          />

          <div className="inquiry-form__employment-row">
            <ChipGroup
              legend={copy.employmentLabel}
              name="employment"
              options={EMPLOYMENT_OPTIONS}
              value={form.employment}
              onSelect={(value) => update("employment", value)}
              error={fieldErrors.employment}
              locale={locale}
            />
            <TextField
              label={copy.jobLabel}
              id="inquiry-job"
              error={fieldErrors.jobDescription}
            >
              <input
                id="inquiry-job"
                value={form.jobDescription}
                onChange={(e) => update("jobDescription", e.target.value)}
                placeholder={copy.jobPlaceholder}
                aria-invalid={Boolean(fieldErrors.jobDescription)}
              />
            </TextField>
          </div>

          <ChipGroup
            legend={copy.incomeLabel}
            name="income"
            options={INCOME_OPTIONS}
            value={form.income}
            onSelect={(value) => update("income", value)}
            error={fieldErrors.income}
            locale={locale}
          />

          <ChipGroup
            legend={copy.savingsLabel}
            name="savings"
            options={SAVINGS_OPTIONS}
            value={form.savings}
            onSelect={(value) => update("savings", value)}
            error={fieldErrors.savings}
            locale={locale}
          />

          <ChipGroup
            legend={copy.majorLabel}
            name="major"
            options={MAJOR_OPTIONS}
            value={form.majorChoice}
            onSelect={(value) => update("majorChoice", value)}
            error={fieldErrors.major}
            locale={locale}
          />

          {form.majorChoice === MAJOR_OTHER_VALUE ? (
            <TextField
              label={copy.majorOtherLabel}
              id="inquiry-major-other"
              error={fieldErrors.majorOther}
            >
              <input
                id="inquiry-major-other"
                value={form.majorOther}
                onChange={(e) => update("majorOther", e.target.value)}
                placeholder={copy.majorPlaceholder}
                aria-invalid={Boolean(fieldErrors.majorOther)}
              />
            </TextField>
          ) : null}

          <TextField label={copy.emailLabel} id="inquiry-email" error={fieldErrors.email}>
            <input
              id="inquiry-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
            />
          </TextField>

          {formError ? (
            <p className="inquiry-form__banner" role="alert">
              {formError}
            </p>
          ) : null}

          <p className="inquiry-form__privacy">{copy.privacy}</p>

          <div className="inquiry-form__actions">
            <button
              className="consult-form__submit inquiry-form__submit"
              type="submit"
              disabled={busy}
              aria-busy={busy}
            >
              {busy ? (
                <>
                  <span className="inquiry-spinner" aria-hidden="true" />
                  {copy.submitting}
                </>
              ) : (
                copy.submit
              )}
            </button>
          </div>
        </form>
      </div>

      <footer className="inquiry-page__foot">
        <span className="locale-switch" aria-label="Language">
          <button
            type="button"
            className={locale === "zh" ? "is-active" : ""}
            aria-pressed={locale === "zh"}
            onClick={() => setLocale("zh")}
          >
            中文
          </button>
          <span aria-hidden="true">|</span>
          <button
            type="button"
            className={locale === "en" ? "is-active" : ""}
            aria-pressed={locale === "en"}
            onClick={() => setLocale("en")}
          >
            EN
          </button>
        </span>
        <Link className="inquiry-form__home-link" to="/">
          {copy.backHome}
        </Link>
      </footer>
    </section>
  );
}
