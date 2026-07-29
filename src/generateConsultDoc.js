import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";

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

export async function generateConsultDoc(data) {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

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
          field("国籍", data.nationality),
          field("护照号码", data.passportNo),
          field("邮箱", data.email),
          field("手机", data.contact),
          field("微信", data.wechat),

          heading("2. 留学意向"),
          field("目标城市", data.city),
          field("意向学校", data.schoolIntent),
          field("意向学历", data.degree),
          field("意向专业 / 课程", data.major),
          field("预计开学", data.arrival),
          field("英语成绩", data.english),
          field("是否已有 Offer", data.hasOffer),
          field(
            "咨询方向",
            Array.isArray(data.interests)
              ? data.interests.join("、")
              : data.interests,
          ),

          heading("3. 学历背景"),
          field("最高学历", data.highestEdu),
          field("学校", data.schoolName),
          field("专业", data.schoolMajor),
          ...block("学历时间线", data.eduHistory),

          heading("4. 工作经历"),
          field("当前状态", data.employmentStatus),
          field("单位", data.employer),
          field("职位", data.jobTitle),
          field("税后月收入（人民币）", data.monthlyIncome),
          ...block("工作经历", data.workHistory),

          heading("5. 资金证明：收入、存款与流水"),
          field("资金来源", data.fundingSource),
          field("担保人姓名", data.sponsorName),
          field("与申请人关系", data.sponsorRelation),
          field("担保人年收入（人民币）", data.sponsorIncome),
          field("存款总额", data.depositAmount),
          field("开户银行", data.depositBank),
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
                text: "材料提醒：请另附学历证明、在职/收入证明、存款证明、银行流水扫描件。本文件由点点新西兰留学咨询网站在客户浏览器本地生成，未上传至服务器。",
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

  const blob = await Packer.toBlob(doc);
  const safeName = (data.name || "").trim().replace(/[\\/:*?"<>|]/g, "") || "申请";
  saveAs(blob, `点点新西兰留学咨询-签证信息表-${safeName}.docx`);
}
