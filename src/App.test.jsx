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

  await user.click(screen.getByRole("button", { name: "咨询申请" }));

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

  await user.click(
    screen.getAllByRole("button", { name: /阅读文章/ })[0],
  );

  expect(
    screen.getByRole("heading", {
      name: "AIS / ICL / Yoobee / NZSE / Future Skills：学费与怎么选",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/为每所学校准备了独立详解/, { exact: false }),
  ).toBeInTheDocument();
  expect(screen.getByText(/ICL——奥克兰 CBD/, { exact: false })).toBeInTheDocument();
});

it("lists dedicated school articles in the study guide", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("button", { name: /探索指南/ })[0]);
  expect(
    screen.getByRole("heading", { name: "留学准备" }),
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /AIS 奥克兰商学院：专业、学费与适合谁/ }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /ICL 商学院：课程路径、学费与就读体验要点/,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Yoobee：动画、设计与软件课程怎么选/ }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /NZSE \/ NZSEG：技能课程、校区与学费区间/,
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", {
      name: /Future Skills：应用管理、学费与奖学金怎么看/,
    }),
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole("button", {
      name: /ICL 商学院：课程路径、学费与就读体验要点/,
    }),
  );
  expect(
    screen.getByRole("heading", {
      name: "ICL 商学院：课程路径、学费与就读体验要点",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /icl\.ac\.nz/ }),
  ).toHaveAttribute("href", "https://icl.ac.nz/");
  expect(
    screen.getByText(/ICL Graduate Business School/, { exact: false }),
  ).toBeInTheDocument();
});

it("opens the Seek and Trade Me article from the career guide", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getAllByRole("button", { name: /探索指南/ })[1]);
  expect(
    screen.getByRole("heading", { name: "求职与工作" }),
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole("button", {
      name: /在 Seek 与 Trade Me 找工作/,
    }),
  );

  expect(
    screen.getByRole("heading", {
      name: "在 Seek 与 Trade Me 找工作：实用建议",
    }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/本地感强，很多中小商家会发/, { exact: false }),
  ).toBeInTheDocument();
});
