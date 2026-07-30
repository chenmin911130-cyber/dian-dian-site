import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

it("renders the Chinese site title", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: "留学新西兰，从规划到落地" }),
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

it("shows the contact email on the homepage", () => {
  render(<App />);

  expect(
    screen.getByRole("link", { name: "yuditawang0925@gmail.com" }),
  ).toHaveAttribute("href", "mailto:yuditawang0925@gmail.com");
});

it("opens the consultation form from the hero", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("link", { name: "咨询申请" }));

  expect(
    screen.getByRole("heading", { name: "留学签证咨询信息表" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "生成并下载 Word" }),
  ).toBeInTheDocument();
  expect(screen.getByText(/资金证明：收入、存款与流水/)).toBeInTheDocument();
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
  expect(screen.getAllByText(/ICL/, { exact: false }).length).toBeGreaterThan(0);
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
  ).toHaveAttribute("href", "#/article/school-ais");
  expect(
    screen.getByRole("link", {
      name: /ICL 商学院：课程路径、学费与就读体验要点/,
    }),
  ).toHaveAttribute("href", "#/article/school-icl");
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
    screen.getByRole("link", { name: /打开 ICL 官网|Open ICL website/ }),
  ).toHaveAttribute("href", "https://icl.ac.nz/");
  expect(
    screen.getAllByText(/ICL Graduate Business School/, { exact: false }).length,
  ).toBeGreaterThan(0);
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
  expect(screen.getAllByText(/本地感强/, { exact: false }).length).toBeGreaterThan(
    0,
  );
});

it("uses hash links that open school pages directly", async () => {
  window.location.hash = "#/article/school-ais";
  render(<App />);

  expect(
    await screen.findByRole("heading", {
      name: "AIS 奥克兰商学院：专业、学费与适合谁",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /打开 AIS 官网/ }),
  ).toHaveAttribute("href", "https://ais.ac.nz/");
});
