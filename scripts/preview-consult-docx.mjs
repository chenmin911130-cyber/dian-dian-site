import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import fs from "fs";
import path from "path";

function field(label, value) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [
      new TextRun({ text: `${label}：`, bold: true }),
      new TextRun({ text: value || "—" }),
    ],
  });
}

function heading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 160 },
    children: [new TextRun({ text, bold: true })],
  });
}

function block(label, value) {
  return [
    new Paragraph({
      spacing: { before: 80, after: 60 },
      children: [new TextRun({ text: `${label}：`, bold: true })],
    }),
    new Paragraph({
      spacing: { after: 140 },
      children: [new TextRun({ text: value || "—" })],
    }),
  ];
}

const data = {
  name: "张三",
  nameEn: "ZHANG San",
  birthDate: "1998-05-12",
  passportNo: "E12345678",
  email: "zhangsan@example.com",
  contact: "13800138000 / zs_nz2026",
  city: "奥克兰 Auckland",
  degree: "专科 / Diploma",
  schoolIntent: "ICL Education",
  major: "Business",
  arrival: "2026年2月",
  english: "IELTS 6.0",
  hasOffer: "否",
  highestEdu: "本科",
  schoolName: "某某大学",
  schoolMajor: "会计学",
  employmentStatus: "在职",
  employer: "某某贸易有限公司 / 销售专员",
  monthlyIncome: "8000",
  fundingSource: "父母资助",
  sponsorName: "张父 / 父亲",
  depositAmount: "28万人民币",
  statementMonths: "近12个月",
  largeTransfers: "每月工资入账；2025年3月父母转入学费准备金约15万",
  travelHistory: "无",
  visaRefusal: "无",
  notes: "希望优先对比 ICL 与 AIS 的学费与课程",
};

const dateStr = "2026-07-29";

const doc = new Document({
  sections: [
    {
      children: [
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 160 },
          children: [
            new TextRun({
              text: "点点新西兰留学咨询 · 留学签证信息表",
              bold: true,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 320 },
          children: [
            new TextRun({
              text: `填写日期：${dateStr}`,
              color: "666666",
              size: 20,
            }),
          ],
        }),
        heading("1. 基本信息 / 护照"),
        field("中文姓名", data.name),
        field("护照姓名（拼音）", data.nameEn),
        field("出生日期", data.birthDate),
        field("护照号码", data.passportNo),
        field("邮箱", data.email),
        field("手机 / 微信", data.contact),
        heading("2. 留学意向"),
        field("目标城市", data.city),
        field("意向学历", data.degree),
        field("意向学校", data.schoolIntent),
        field("意向专业 / 课程", data.major),
        field("预计开学", data.arrival),
        field("英语成绩", data.english),
        field("是否已有 Offer", data.hasOffer),
        heading("3. 学历背景"),
        field("最高学历", data.highestEdu),
        field("毕业院校", data.schoolName),
        field("专业", data.schoolMajor),
        heading("4. 工作经历"),
        field("当前状态", data.employmentStatus),
        field("单位 / 职位", data.employer),
        field("税后月收入（人民币）", data.monthlyIncome),
        heading("5. 资金证明：收入、存款与流水"),
        field("资金来源", data.fundingSource),
        field("担保人 / 关系", data.sponsorName),
        field("存款总额", data.depositAmount),
        field("可提供流水月份", data.statementMonths),
        ...block("大额进账说明", data.largeTransfers),
        heading("6. 其他签证相关"),
        ...block("出国 / 旅行记录", data.travelHistory),
        ...block("拒签史", data.visaRefusal),
        ...block("补充说明", data.notes),
        new Paragraph({
          spacing: { before: 360 },
          children: [
            new TextRun({
              text: "材料提醒：如需继续沟通，请将此 Word 文件发送至 yuditawang0925@gmail.com。请另附学历证明、在职/收入证明、存款证明、银行流水扫描件。本文件由点点新西兰留学咨询网站在客户浏览器本地生成，未上传至服务器。本站内容仅为一般信息，不构成持牌移民法律建议。",
              italics: true,
              color: "888888",
              size: 18,
            }),
          ],
        }),
      ],
    },
  ],
});

const outDir = path.resolve("public/samples");
fs.mkdirSync(outDir, { recursive: true });

const buf = await Packer.toBuffer(doc);
const docxPath = path.join(outDir, "点点新西兰留学咨询-签证信息表-示例.docx");
fs.writeFileSync(docxPath, buf);

const html = `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Word 输出样式预览</title>
<style>
  body { margin: 0; background: #e8e6e1; font-family: "Segoe UI", "Microsoft YaHei", sans-serif; color: #1c2418; }
  .bar { background: #315824; color: #fffdf8; padding: 14px 24px; font-size: 14px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
  .bar a { color: #dce8d4; }
  .page {
    width: min(720px, 94vw);
    margin: 28px auto 48px;
    background: #fff;
    padding: 56px 64px 64px;
    box-shadow: 0 10px 40px rgba(28,36,24,.12);
    line-height: 1.55;
  }
  h1 { text-align: center; font-size: 22px; margin: 0 0 8px; }
  .date { text-align: center; color: #666; font-size: 13px; margin: 0 0 28px; }
  h2 { font-size: 16px; margin: 26px 0 12px; }
  .field { margin: 0 0 8px; font-size: 14px; }
  .field b { font-weight: 700; }
  .block-label { margin: 10px 0 4px; font-size: 14px; font-weight: 700; }
  .block-body { margin: 0 0 12px; font-size: 14px; }
  .note { margin-top: 28px; color: #888; font-size: 12px; font-style: italic; }
  @media (max-width: 640px) {
    .page { padding: 32px 22px 40px; }
  }
</style>
</head>
<body>
  <div class="bar">
    <span>Word 输出样式预览（示例数据）</span>
    <a href="./%E7%82%B9%E7%82%B9%E6%96%B0%E8%A5%BF%E5%85%B0%E7%95%99%E5%AD%A6%E5%92%A8%E8%AF%A2-%E7%AD%BE%E8%AF%81%E4%BF%A1%E6%81%AF%E8%A1%A8-%E7%A4%BA%E4%BE%8B.docx">下载示例 .docx</a>
  </div>
  <article class="page">
    <h1>点点新西兰留学咨询 · 留学签证信息表</h1>
    <p class="date">填写日期：${dateStr}</p>

    <h2>1. 基本信息 / 护照</h2>
    <p class="field"><b>中文姓名：</b>${data.name}</p>
    <p class="field"><b>护照姓名（拼音）：</b>${data.nameEn}</p>
    <p class="field"><b>出生日期：</b>${data.birthDate}</p>
    <p class="field"><b>护照号码：</b>${data.passportNo}</p>
    <p class="field"><b>邮箱：</b>${data.email}</p>
    <p class="field"><b>手机 / 微信：</b>${data.contact}</p>

    <h2>2. 留学意向</h2>
    <p class="field"><b>目标城市：</b>${data.city}</p>
    <p class="field"><b>意向学历：</b>${data.degree}</p>
    <p class="field"><b>意向学校：</b>${data.schoolIntent}</p>
    <p class="field"><b>意向专业 / 课程：</b>${data.major}</p>
    <p class="field"><b>预计开学：</b>${data.arrival}</p>
    <p class="field"><b>英语成绩：</b>${data.english}</p>
    <p class="field"><b>是否已有 Offer：</b>${data.hasOffer}</p>

    <h2>3. 学历背景</h2>
    <p class="field"><b>最高学历：</b>${data.highestEdu}</p>
    <p class="field"><b>毕业院校：</b>${data.schoolName}</p>
    <p class="field"><b>专业：</b>${data.schoolMajor}</p>

    <h2>4. 工作经历</h2>
    <p class="field"><b>当前状态：</b>${data.employmentStatus}</p>
    <p class="field"><b>单位 / 职位：</b>${data.employer}</p>
    <p class="field"><b>税后月收入（人民币）：</b>${data.monthlyIncome}</p>

    <h2>5. 资金证明：收入、存款与流水</h2>
    <p class="field"><b>资金来源：</b>${data.fundingSource}</p>
    <p class="field"><b>担保人 / 关系：</b>${data.sponsorName}</p>
    <p class="field"><b>存款总额：</b>${data.depositAmount}</p>
    <p class="field"><b>可提供流水月份：</b>${data.statementMonths}</p>
    <p class="block-label">大额进账说明：</p>
    <p class="block-body">${data.largeTransfers}</p>

    <h2>6. 其他签证相关</h2>
    <p class="block-label">出国 / 旅行记录：</p>
    <p class="block-body">${data.travelHistory}</p>
    <p class="block-label">拒签史：</p>
    <p class="block-body">${data.visaRefusal}</p>
    <p class="block-label">补充说明：</p>
    <p class="block-body">${data.notes}</p>

    <p class="note">材料提醒：如需继续沟通，请将此 Word 文件发送至 yuditawang0925@gmail.com。请另附学历证明、在职/收入证明、存款证明、银行流水扫描件。本文件由点点新西兰留学咨询网站在客户浏览器本地生成，未上传至服务器。本站内容仅为一般信息，不构成持牌移民法律建议。</p>
  </article>
</body>
</html>
`;

fs.writeFileSync(path.join(outDir, "consult-word-preview.html"), html);
console.log("Wrote:", docxPath);
