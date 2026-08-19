import { render, screen } from "@testing-library/react";
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

it("opens the consultation form from the hero", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("link", { name: "咨询申请" }));

  expect(
    screen.getByRole("heading", { name: "先聊聊你的计划" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "生成并下载 Word" }),
  ).toBeInTheDocument();
  expect(screen.getByText(/可选：签证材料小表/)).toBeInTheDocument();
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
  expect(
    screen.getByRole("heading", { name: "求职与工作" }),
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole("link", {
      name: /在 Seek 与 Trade Me 找工作/,
    }),
  );

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
