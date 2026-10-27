import { describe, expect, it } from "vitest";
import {
  MAJOR_OTHER_VALUE,
  buildInquiryPayload,
  checkInquirySpamGuards,
  resolveMajor,
  validateInquiryFields,
} from "./inquirySubmit";

describe("validateInquiryFields", () => {
  const valid = {
    education: "本科",
    employment: "在职",
    jobDescription: "软件工程师",
    income: "20-50万",
    savings: "30-50万",
    majorChoice: "IT / 计算机",
    majorOther: "",
    email: "test@example.com",
  };

  it("accepts a complete form", () => {
    expect(validateInquiryFields(valid, "zh").ok).toBe(true);
  });

  it("returns per-field errors", () => {
    const result = validateInquiryFields({}, "zh");
    expect(result.ok).toBe(false);
    expect(result.fieldErrors.education).toBeTruthy();
    expect(result.fieldErrors.savings).toBeTruthy();
    expect(result.fieldErrors.email).toBeTruthy();
    expect(result.fieldErrors.phone).toBeUndefined();
  });

  it("requires majorOther when other is selected", () => {
    const result = validateInquiryFields(
      { ...valid, majorChoice: MAJOR_OTHER_VALUE, majorOther: "" },
      "en",
    );
    expect(result.ok).toBe(false);
    expect(result.fieldErrors.majorOther).toBeTruthy();
  });

  it("allows empty job description", () => {
    const result = validateInquiryFields({ ...valid, jobDescription: "" }, "zh");
    expect(result.ok).toBe(true);
  });
});

describe("buildInquiryPayload", () => {
  const sampleData = {
    education: "本科",
    employment: "在职",
    jobDescription: "市场专员",
    income: "20-50万",
    savings: "10-30万",
    major: "IT / 计算机",
    email: "test@example.com",
  };
  const submittedAt = new Date("2026-10-27T22:42:00.000Z");

  it("puts all answers in one plain-text message with Chinese labels", () => {
    const payload = buildInquiryPayload(sampleData, "zh", submittedAt);
    expect(payload.message).toBe(
      [
        "学历：本科",
        "工作情况：在职",
        "具体工作：市场专员",
        "收入：20-50万",
        "存款：10-30万",
        "意向专业：IT / 计算机",
        "邮箱：test@example.com",
        "提交语言：中文",
        "提交时间：2026-10-28 11:42（新西兰时间）",
      ].join("\n"),
    );
    expect(payload.message).not.toMatch(/[<>*#]/);
  });

  it("uses English submit language label when locale is en", () => {
    const payload = buildInquiryPayload(sampleData, "en", submittedAt);
    expect(payload.message).toContain("提交语言：English");
  });

  it("sets subject from email and intended major only", () => {
    const payload = buildInquiryPayload(sampleData, "zh", submittedAt);
    expect(payload.subject).toBe("咨询：test@example.com｜IT / 计算机");
  });

  it("does not duplicate fields outside message", () => {
    const payload = buildInquiryPayload(sampleData, "zh", submittedAt);
    expect(Object.keys(payload).sort()).toEqual(["email", "from_name", "message", "subject"]);
    expect(payload.from_name).toBe("test@example.com");
  });
});

describe("resolveMajor", () => {
  it("uses free text for other", () => {
    expect(
      resolveMajor({ majorChoice: MAJOR_OTHER_VALUE, majorOther: " 建筑 " }),
    ).toBe("建筑");
  });
});

describe("checkInquirySpamGuards", () => {
  it("flags honeypot fills as bots", () => {
    const result = checkInquirySpamGuards({
      honeypot: "spam",
      formStartedAt: Date.now() - 10_000,
    });
    expect(result.ok).toBe(false);
    expect(result.bot).toBe(true);
  });

  it("rejects instant submits", () => {
    const result = checkInquirySpamGuards({
      honeypot: "",
      formStartedAt: Date.now(),
    });
    expect(result.ok).toBe(false);
    expect(result.formError).toBeTruthy();
  });
});
