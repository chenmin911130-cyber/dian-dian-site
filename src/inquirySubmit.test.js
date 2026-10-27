import { describe, expect, it } from "vitest";
import {
  MAJOR_OTHER_VALUE,
  checkInquirySpamGuards,
  resolveMajor,
  validateInquiryFields,
} from "./inquirySubmit";

describe("validateInquiryFields", () => {
  const valid = {
    education: "本科",
    employment: "在职",
    income: "10000–20000 人民币",
    majorChoice: "IT / 计算机",
    majorOther: "",
    email: "test@example.com",
    phone: "13800138000",
  };

  it("accepts a complete form", () => {
    expect(validateInquiryFields(valid, "zh").ok).toBe(true);
  });

  it("returns per-field errors", () => {
    const result = validateInquiryFields({}, "zh");
    expect(result.ok).toBe(false);
    expect(result.fieldErrors.education).toBeTruthy();
    expect(result.fieldErrors.email).toBeTruthy();
  });

  it("requires majorOther when other is selected", () => {
    const result = validateInquiryFields(
      { ...valid, majorChoice: MAJOR_OTHER_VALUE, majorOther: "" },
      "en",
    );
    expect(result.ok).toBe(false);
    expect(result.fieldErrors.majorOther).toBeTruthy();
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
