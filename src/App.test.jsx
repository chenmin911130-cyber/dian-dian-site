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
    screen.getByRole("heading", { name: /留学新西兰/ }),
  ).toBeInTheDocument();
  expect(screen.getByText("从规划到落地")).toBeInTheDocument();
  expect(
    screen.getByText("面向计划赴新西兰留学的学生，提供选校、申请材料与落地建议。"),
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole("link", { name: "填写留学咨询" }).length,
  ).toBeGreaterThanOrEqual(1);
  expect(
    screen.getByRole("link", { name: "点点新西兰留学咨询" }),
  ).toBeInTheDocument();
  expect(screen.getAllByText("微信").length).toBeGreaterThanOrEqual(1);
  expect(screen.getAllByText("抖音").length).toBeGreaterThanOrEqual(1);
  expect(
    screen.getAllByRole("img", { name: "微信：点点（好运版）" }).length,
  ).toBeGreaterThanOrEqual(1);
  expect(
    screen.getAllByRole("img", { name: "抖音：@点点儿 Yudita" }).length,
  ).toBeGreaterThanOrEqual(1);
});

it("uses a slowly drifting Wanaka landscape in the homepage hero", () => {
  render(<App />);
  expect(screen.getByTestId("hero-atmosphere")).toBeInTheDocument();
  expect(screen.queryByTestId("hero-video")).not.toBeInTheDocument();
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
    screen.queryByRole("heading", { name: /留学新西兰/ }),
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

it("opens the consultation form from the hero with four visa-prep sections", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("link", { name: "填写留学咨询" })[0]);

  expect(window.location.pathname).toBe("/consult");
  expect(
    screen.getByRole("heading", { name: "留学签证咨询信息表" }),
  ).toBeInTheDocument();

  for (const title of [
    "1. 基本信息 / 护照",
    "2. 留学意向",
    "3. 学历背景",
    "4. 工作经历",
  ]) {
    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
  }
  expect(
    screen.queryByRole("heading", { name: "5. 资金证明：收入、存款与流水" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "6. 其他签证相关" }),
  ).not.toBeInTheDocument();

  const levelSelect = screen.getByRole("combobox", { name: "意向学历" });
  expect(
    within(levelSelect)
      .getAllByRole("option")
      .map((option) => option.textContent),
  ).toEqual([
    "请选择",
    "语言 / 预科",
    "高中",
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
  ).toBeGreaterThanOrEqual(1);
  expect(
    screen.getByRole("button", { name: "生成并下载 Word" }),
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole("button", { name: /返回首页/ }).length,
  ).toBeGreaterThanOrEqual(1);
  expect(
    screen.queryByRole("heading", { name: /留学新西兰/ }),
  ).not.toBeInTheDocument();
});

it("opens the eight-universities article from the home featured link", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("link", { name: /阅读文章/ })[0]);

  expect(window.location.pathname).toBe("/article/nz-universities-overview");
  expect(
    screen.getByRole("heading", {
      name: "新西兰八大怎么选：城市、专业、学费与适合谁",
    }),
  ).toBeInTheDocument();
  expect(screen.getAllByText(/奥克兰大学/, { exact: false }).length).toBeGreaterThan(0);
  expect(screen.queryByText(/icl\.ac\.nz/i)).not.toBeInTheDocument();
  expect(
    screen.getByRole("img", { name: /大学课堂|八大/ }),
  ).toBeInTheDocument();
});

it("lists university and retained private-school articles in the study guide", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("link", { name: /探索指南/ })[0]);
  expect(window.location.pathname).toBe("/study");
  expect(
    screen.getByRole("heading", { name: "留学准备" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "八所大学" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "技能与应用管理" }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("link", { name: /奥克兰大学：优势专业、排名、学费与适合谁/ }),
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
  expect(
    screen.queryByRole("link", { name: /ICL/ }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "AI 课程专文" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /新西兰 AI \/ AI 管理硕士怎么选/,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /NZSE 没有“AI 商务管理”课/,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /Future Skills：Master of AI Integrated IT Solutions/,
    }),
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole("link", {
      name: /NZSE \/ NZSEG：技能课程、校区与学费区间/,
    }),
  );
  expect(window.location.pathname).toBe("/article/school-nzse");
  expect(
    screen.getByRole("heading", {
      name: "NZSE / NZSEG：技能课程、校区与学费区间",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getAllByRole("link", { name: /nzse\.ac\.nz/ })[0],
  ).toHaveAttribute("href", "https://nzse.ac.nz/");
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
      name: "在 Seek 与 Trade Me 找工作：从注册到入职",
    }),
  ).toBeInTheDocument();
  expect(screen.getByText(/本地中小商家多/)).toBeInTheDocument();
  expect(
    screen.getAllByRole("link", { name: "https://www.seek.co.nz/" })[0],
  ).toHaveAttribute("href", "https://www.seek.co.nz/");
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

it("loads a university article directly at its URL", () => {
  window.history.replaceState({}, "", "/article/school-auckland");
  render(<App />);
  expect(
    screen.getByRole("heading", {
      name: "奥克兰大学：优势专业、排名、学费与适合谁",
    }),
  ).toBeInTheDocument();
});

it("uses a compact header menu on small screens", async () => {
  const user = userEvent.setup();
  const originalMatchMedia = window.matchMedia;
  window.matchMedia = (query) => ({
    matches: String(query).includes("max-width: 880px"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });

  try {
    render(<App />);

    expect(screen.queryByRole("navigation", { name: "主导航" })).not.toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "填写留学咨询" }).length,
    ).toBeGreaterThanOrEqual(1);

    await user.click(screen.getByRole("button", { name: "菜单" }));

    const menu = screen.getByRole("navigation", { name: "主导航" });
    expect(within(menu).getByRole("link", { name: "留学" })).toBeInTheDocument();
    expect(within(menu).getByRole("link", { name: "求职" })).toBeInTheDocument();
    expect(within(menu).getByRole("link", { name: "生活" })).toBeInTheDocument();
    expect(
      within(menu).queryByRole("link", { name: "填写留学咨询" }),
    ).not.toBeInTheDocument();
  } finally {
    window.matchMedia = originalMatchMedia;
  }
});

it("shows a not-found page for unknown URLs", () => {
  window.history.replaceState({}, "", "/no-such-page");
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "页面没有找到" }),
  ).toBeInTheDocument();
});
