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
    income: "10000–20000 人民币",
    savings: "NZ$30,000–60,000",
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
  it("includes savings and job fields for Web3Forms", () => {
    const payload = buildInquiryPayload(
      {
        education: "本科",
        employment: "在职",
        jobDescription: " 市场专员 ",
        income: "10000–20000 人民币",
        savings: "NZ$10,000–30,000",
        major: "IT / 计算机",
        email: "test@example.com",
      },
      "zh",
    );
    expect(payload.savings).toBe("NZ$10,000–30,000");
    expect(payload.job_description).toBe("市场专员");
    expect(payload.message).toContain("存款");
    expect(payload.message).toContain("具体工作");
    expect(payload.message).not.toContain("手机");
    expect(payload.phone).toBeUndefined();
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
