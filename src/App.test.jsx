import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach } from "vitest";
import { App } from "./App";

beforeEach(() => {
  window.localStorage.clear();
  window.history.replaceState({}, "", "/");
});

it("renders the Chinese site title", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "留学新西兰，从规划到落地" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "点点新西兰留学咨询" }),
  ).toBeInTheDocument();
});

it("keeps the homepage free of consultation form fields", () => {
  render(<App />);
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
});

it("switches the hero copy to English without showing both languages", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "EN" }));

  expect(
    screen.getByRole("heading", {
      name: "From plan to arrival in New Zealand.",
    }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "留学新西兰，从规划到落地" }),
  ).not.toBeInTheDocument();
});

it("renders the three Chinese editorial sections", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: "留学准备" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "求职与工作" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "生活指南" }),
  ).toBeInTheDocument();
});

it("opens the consultation form from the hero with six visa-prep sections", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("link", { name: "咨询申请" }));

  expect(window.location.pathname).toBe("/consult");
  expect(
    screen.getByRole("heading", { name: "留学签证咨询信息表" }),
  ).toBeInTheDocument();

  for (const title of [
    "1. 基本信息 / 护照",
    "2. 留学意向",
    "3. 学历背景",
    "4. 工作经历",
    "5. 资金证明：收入、存款与流水",
    "6. 其他签证相关",
  ]) {
    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
  }

  const levelSelect = screen.getByRole("combobox", { name: "意向学历" });
  expect(
    within(levelSelect)
      .getAllByRole("option")
      .map((option) => option.textContent),
  ).toEqual([
    "请选择",
    "语言 / 预科",
    "专科 / Diploma",
    "本科",
    "研文 / PGDip",
    "硕士",
    "其他",
  ]);

  expect(
    screen.getAllByText(/不构成持牌移民法律建议/).length,
  ).toBeGreaterThanOrEqual(2);
  expect(
    screen.getAllByRole("link", { name: "yuditawang0925@gmail.com" }).length,
  ).toBeGreaterThanOrEqual(2);
  expect(
    screen.getByRole("button", { name: "生成并下载 Word" }),
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole("button", { name: /返回首页/ }).length,
  ).toBeGreaterThanOrEqual(1);
  expect(
    screen.queryByRole("heading", { name: "留学新西兰，从规划到落地" }),
  ).not.toBeInTheDocument();
});

it("opens the private schools article from the home featured link", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("link", { name: /阅读文章/ })[0]);

  expect(window.location.pathname).toBe("/article/pte-private-schools");
  expect(
    screen.getByRole("heading", {
      name: "AIS / ICL / Yoobee / NZSE / Future Skills：学费与怎么选",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/为每所学校准备了独立详解/, { exact: false }),
  ).toBeInTheDocument();
  expect(screen.getByText(/ICL——奥克兰 CBD/, { exact: false })).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: /课堂学习场景|应用型学院/ }),
  ).toBeInTheDocument();
});

it("lists dedicated school articles in the study guide", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("link", { name: /探索指南/ })[0]);
  expect(window.location.pathname).toBe("/study");
  expect(
    screen.getByRole("heading", { name: "留学准备" }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", { name: /AIS 奥克兰商学院：专业、学费与适合谁/ }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /ICL 商学院：课程路径、学费与就读体验要点/,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /Yoobee：动画、设计与软件课程怎么选/ }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /NZSE \/ NZSEG：技能课程、校区与学费区间/,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /Future Skills：应用管理、学费与奖学金怎么看/,
    }),
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole("link", {
      name: /ICL 商学院：课程路径、学费与就读体验要点/,
    }),
  );
  expect(window.location.pathname).toBe("/article/school-icl");
  expect(
    screen.getByRole("heading", {
      name: "ICL 商学院：课程路径、学费与就读体验要点",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole("link", { name: /icl\.ac\.nz/ })[0],
  ).toHaveAttribute("href", "https://icl.ac.nz/");
  expect(
    screen.getByText(/ICL Graduate Business School/, { exact: false }),
  ).toBeInTheDocument();
});

it("opens the Seek and Trade Me article from the career guide", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("link", { name: /探索指南/ })[1]);
  expect(window.location.pathname).toBe("/career");
  expect(
    screen.getByRole("heading", { name: "求职与工作" }),
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole("link", {
      name: /在 Seek 与 Trade Me 找工作/,
    }),
  );

  expect(window.location.pathname).toBe("/article/seek-trademe-jobs");
  expect(
    screen.getByRole("heading", {
      name: "在 Seek 与 Trade Me 找工作：实用建议",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/本地中小商家多，适合附近兼职/, { exact: false }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: /在 Seek 与 Trade Me 找工作/ }),
  ).toBeInTheDocument();
});

it("loads the consultation page directly at /consult", () => {
  window.history.replaceState({}, "", "/consult");
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "留学签证咨询信息表" }),
  ).toBeInTheDocument();
});

it("loads a school article directly at its URL", () => {
  window.history.replaceState({}, "", "/article/school-ais");
  render(<App />);
  expect(
    screen.getByRole("heading", {
      name: "AIS 奥克兰商学院：专业、学费与适合谁",
    }),
  ).toBeInTheDocument();
});

it("shows a not-found page for unknown URLs", () => {
  window.history.replaceState({}, "", "/no-such-page");
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "页面没有找到" }),
  ).toBeInTheDocument();
});
