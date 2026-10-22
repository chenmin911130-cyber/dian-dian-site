import { INZ, article, h2, feeNoteZh, feeNoteEn, sourcesBlock } from "./article-kit.mjs";
import { campusFig, campusHero } from "./campus-images.mjs";

const table = (head, rows, caption) => ({ type: "table", head, rows, ...(caption ? { caption } : {}) });

const SRC = {
  figureNz: "https://figure.nz/chart/IqPpvXrOxAWO7Ny7-z9m5LaFBmZ4dh5IT",
  eduCounts: "https://www.educationcounts.govt.nz/statistics/tertiary-participation",
  greenAppendix: "https://www.immigration.govt.nz/opsmanual/89117.htm",
  vuwFees: "https://www.wgtn.ac.nz/students/money/fees/international",
  unz: "https://www.universitiesnz.ac.nz/international-students/am-i-eligible",
  uoaReq: "https://www.internationalcollege.ac.nz/entry-requirements/",
  uoaCn: "https://cn.internationalcollege.ac.nz/entry-requirements1/",
  uoaFees: "https://uploads.up.education/wp-content/uploads/2026/02/UP-Cheat-Sheet-2026-WEB-170226.pdf",
  uoaExit: "https://www.auckland.ac.nz/assets/study/applications-and-admissions/entry-requirements/undergraduate-entry-requirements/foundation-study/2027+UoA+Cert+in+Foundation+Studies+(Up+Educ).pdf",
  otagoReq: "https://www.otago.ac.nz/uolcfy/pathway/requirements",
  otagoPdf: "https://www.otago.ac.nz/__data/assets/pdf_file/0017/615203/PELC-brochure.pdf",
  otagoFees: "https://www.otago.ac.nz/uolcfy/dates-fees/fees",
  otagoDirect: "https://www.otago.ac.nz/study/entry-requirements/international-entrance-requirements",
  vuwUp: "https://wgtn.up.education/intakes-and-fees/",
  vuwReq: "https://uploads.up.education/wp-content/uploads/2026/03/2026-VUW-Foundation-Entry-Requirements.pdf",
  ucCert: "https://www.canterbury.ac.nz/study/other-study-options/transition-programmes/pathways-for-international-students/certificate-in-foundation-studies",
  ucicReq: "https://www.ucic.ac.nz/admissions/entry-requirements/academic/",
};

export function foundationArticles() {
  return [popularCourses(), foundationCompare(), xAdvice()];
}

function popularCourses() {
  return article({
    slug: "nz-popular-courses-2026",
    guideId: "study",
    section: "foundation",
    titleZh: "2026 新西兰最热门专业：国际生都在读什么、哪些和绿名单挂钩",
    titleEn: "New Zealand’s most popular fields for international students (2026)",
    excerptZh: "用教育部 2025 全年数据看国际生最多的专业，再对照移民局绿名单：商科人最多，工程、护理、教师更贴近居留路径。",
    excerptEn: "Ministry of Education 2025 data on what international students study, cross-checked with the Green List.",
    ...campusHero("uni-auckland"),
    imageAltZh: "奥克兰大学钟楼",
    imageAltEn: "University of Auckland clock tower",
    related: ["nz-foundation-for-gaokao-students", "nz-study-advice-from-x", "green-list-residence", "nz-universities-overview", "post-study-work-visa"],
    bodyZh: [
      "「新西兰现在最流行读什么？」答案分两层：一是人数最多的专业，二是对毕业后工作和身份最有帮助的专业。两者并不完全重合。本文数据核对日期 2026-10-21 至 2026-10-23，均附官方来源。",
      h2("人数：国际生 2025 年最多读的领域"),
      "新西兰教育部（Education Counts，2026 年 5 月更新）显示，2025 年在新西兰高等院校就读的国际生共 59,890 人，比 2024 年增长 15%，但仍略低于 2019 年的 61,040 人。大学的国际生增长 14%，私立培训机构（PTE）增长 28%。来源：" + SRC.eduCounts,
      table(
        ["学科领域（按主要学习方向）", "2025 国际生人数"],
        [
          ["管理与商科", "17,020"],
          ["社会与文化（含法律、经济、心理、语言等）", "12,210"],
          ["信息技术", "9,540"],
          ["自然与物理科学", "6,120"],
          ["工程及相关技术", "5,750"],
          ["健康（含护理）", "4,900"],
          ["教育", "3,900"],
          ["创意艺术", "2,785"],
          ["建筑与营造", "1,560"],
          ["农业与环境", "1,245"],
        ],
        "数据：Figure.NZ 整理的教育部数据，2025 全年，所有层级。同一学生可被计入多个领域，合计不等于总人数。",
      ),
      "来源：" + SRC.figureNz,
      h2("就业与身份：为什么工程、护理、教师被反复推荐"),
      "移民局绿名单（Green List）列出新西兰紧缺职位。按移民局 2026-03-09 版 Appendix 13，名单上包括土木、结构、电气、机械等各类工程师，注册护士（多个方向）、医生、牙医、药剂师、物理治疗师、医学影像等健康职位，以及中小学教师（须在 Teaching Council 注册）、工料测量师、建筑项目经理等。原文：" + SRC.greenAppendix + "（该版本已归档，现行名单与分层请看 " + INZ.greenRoles + " ）",
      "要注意两件事。第一，绿名单看的是职业和注册资格，不是读了某个专业就自动拿身份：护士要拿到护理委员会注册，教师要有 Teaching Council 注册与执业证，工程师常见要求是华盛顿协议认证的学位。第二，IT 类岗位（软件工程师、开发、网络安全等）虽在名单上，但同一版本要求时薪至少 NZD 70（约年薪 NZD 145,600），应届生很难直接达到。",
      h2("热门专业一览（结合人数与出口）"),
      table(
        ["方向", "为什么热门", "要留意"],
        [
          ["商科（会计、金融、市场、商业分析）", "人数第一，转专业门槛低", "竞争最大；会计等岗位的身份路径不如工程、护理直接"],
          ["工程（土木、电气、机械、软件）", "多个工程师职位在绿名单上", "本科 4 年荣誉学位，数学物理要求高"],
          ["护理与健康科学", "注册护士等职位在绿名单上", "英语要求高，常见 IELTS 7.0；须完成临床实习与注册"],
          ["教育（中小学教师）", "教师在绿名单上", "需 Teaching Council 注册；部分教育学位要求 IELTS 7.0"],
          ["计算机 / 数据 / AI", "人数第三，增长快", "绿名单 IT 岗薪资门槛高，应届不一定适用"],
          ["建筑管理与工料测量", "建筑业紧缺职位多", "学校选择较少，以官网为准"],
          ["农业、食品科技、环境", "新西兰传统强项（林肯、梅西）", "城市较小，生活成本较低"],
        ],
      ),
      h2("学费参考：同一学校不同专业差很多"),
      "以惠灵顿维多利亚大学 2027 国际本科学费（每年 120 学分，含 GST）为例：人文社科 NZD 37,483；商科 NZD 39,798；健康 NZD 39,610；理科 NZD 42,892；法律 NZD 43,802；设计 NZD 44,399；建筑 NZD 47,137；工程 NZD 49,237。来源：" + SRC.vuwFees,
      "Universities New Zealand 说明：本科一般最低 IELTS Academic 6.0，研究生一般 6.5，部分专业更高。" + SRC.unz,
      h2("点点的建议"),
      "如果目标是「读完能留下来」，优先看工程、护理、教师这几条有注册和紧缺职位支撑的路径；如果只是想拿学历、以后回国或去别国，商科、IT 选择最多。不论哪条，都先确认该专业对高中数学、物理、化学的要求——这直接决定你预科该选哪个方向（见《适合中国高中毕业生的新西兰预科对比》）。",
      feeNoteZh("移民政策变化频繁，绿名单以移民局现行页面为准。"),
      ...sourcesBlock(true, [SRC.eduCounts, SRC.figureNz, INZ.greenRoles, SRC.greenAppendix, SRC.vuwFees]),
    ],
    bodyEn: [
      "Ministry of Education data: 59,890 international tertiary students in 2025 (+15% on 2024). Top fields: management and commerce (17,020), society and culture (12,210), IT (9,540), natural sciences (6,120), engineering (5,750), health (4,900), education (3,900). " + SRC.figureNz,
      h2("Green List link"),
      "Engineers, registered nurses, doctors and school teachers appear on the Green List (Appendix 13, 09/03/2026 version, now archived). IT roles carry a NZD 70/hour threshold in that version. Check the current list: " + INZ.greenRoles,
      table(
        ["Field", "Why popular", "Watch out"],
        [
          ["Business", "Largest enrolment", "Most competitive"],
          ["Engineering", "Green List roles", "4-year honours degree, strong maths/physics"],
          ["Nursing / health", "Green List roles", "IELTS often 7.0; registration needed"],
          ["Teaching", "Green List roles", "Teaching Council registration"],
          ["IT / data", "Fast growth", "High wage threshold on Green List"],
        ],
      ),
      "VUW 2027 international undergraduate fees per 120 points: from NZD 37,483 (humanities) to NZD 49,237 (engineering). " + SRC.vuwFees,
      feeNoteEn(),
    ],
  });
}

function foundationCompare() {
  return article({
    slug: "nz-foundation-for-gaokao-students",
    guideId: "study",
    section: "foundation",
    titleZh: "国内高中毕业读新西兰预科：奥克兰、奥塔哥、维多利亚、坎特伯雷四校对比",
    titleEn: "NZ university foundation programmes for Chinese high-school graduates",
    excerptZh: "高三成绩、高考分数、雅思分别要多少？学制 6–12 个月、学费约 NZD 2.3–3.7 万，一张表看清。",
    excerptEn: "Entry grades, gaokao, IELTS, length and fees for four university foundation programmes.",
    ...campusHero("uni-otago"),
    imageAltZh: "奥塔哥大学钟楼",
    imageAltEn: "University of Otago clock tower",
    related: ["nz-popular-courses-2026", "nz-study-advice-from-x", "english-test-guide", "school-auckland", "school-otago", "school-vuw", "school-canterbury"],
    bodyZh: [
      "国内普通高中毕业生，大多数不能用高中毕业证直接申请新西兰大学本科。直录通常看高考：例如奥塔哥大学写明高考需达到满分的 65%（文理科均同）（" + SRC.otagoDirect + "）。没有高考、或高考分不够的学生，最常见的路径就是大学预科（Foundation Studies），读完达到要求即可升入对应大学本科一年级。",
      "下面四所都是大学自己的或官方合作的预科，核对日期 2026-10-23。奥克兰和维多利亚的预科由 UP Education 运营，奥塔哥由校内 Pathway and English Language Centre 运营，坎特伯雷由校内 UC International College（UCIC）运营。",
      h2("一张表看清"),
      table(
        ["预科", "中国学生学术要求", "雅思（IELTS）", "学制", "国际学费（NZD）"],
        [
          ["奥克兰大学 Certificate in Foundation Studies（UP）", "标准：高二 75% 或高三 60%；快捷：高二 80% 或高三 65%；速成：高三四科 75% 或高考 50%+", "标准 5.0（单项≥4.5）；快捷 5.5（≥5.0）；速成 6.0（≥5.5）", "按课程而定（速成 / 快捷 / 标准）", "2026：速成 27,623；快捷 / 标准 36,830；另有报名费 550"],
          ["奥塔哥大学 Foundation Studies Certificate", "高中毕业，相关学科平均 70%；或高考 60%（上海 396/660，其他省 450/750）", "5.5（单项≥5.0）", "2 月、6 月、10 月三期入学", "2027：文 / 商 32,341；健康科学 / 理科 33,637；另有学生服务费约 1,193（2026）"],
          ["惠灵顿维多利亚大学 Foundation Studies（UP）", "高二：标准 60%、快捷 65%、速成 70%；高三：快捷 60%、速成 65%", "标准 5.0（≥4.5）；快捷 5.5（≥5.0）；速成 6.0（≥5.0）；衔接课 4.5", "速成 6 个月；快捷 8–9 个月；标准 12 个月", "2027：速成 23,032；快捷 28,649；标准 36,851；另有资料费 2,000、报名费 575"],
          ["坎特伯雷大学 Certificate in Foundation Studies（UCIC）", "完成高二；或高一加高二上学期平均 75%；英语、语文、政治不计入", "5.5（单项≥5.0）", "8 个月（两个学期）", "2027：28,842（120 学分）；保险、学生服务费另计"],
        ],
        "以上为官网公示的最低入学要求与约数，不保证录取；学费会按年调整。",
      ),
      h2("怎么选"),
      "1. 先定本科专业，再选预科方向。坎特伯雷明确写：本科想读理科需修过数学 / 微积分，想读工程需修过数学、物理、化学（" + SRC.ucicReq + "）。奥克兰预科结业时还要满足目标学位的 GPA 与英语（EAP）分数，热门专业分数线更高，有的还要作品集或面试（" + SRC.uoaExit + "）。",
      "2. 成绩好、雅思到 6.0，选速成可以省半年。奥克兰速成接受高考 50% 以上或高三四科平均 75%；维多利亚速成只要 6 个月，学费最低。",
      "3. 雅思只有 5.0 左右，选标准课程或先读语言 / 衔接课。维多利亚的 Foundation Connect 接受 IELTS 4.5（单项≥4.0），读完再评估能否升入标准预科（" + SRC.vuwUp + "）。",
      "4. 算总预算，不只看学费。还要加报名费、资料费、保险、生活费和寄宿家庭费用。奥塔哥 2026 寄宿家庭标准价为每晚 NZD 62.25（" + SRC.otagoFees + "）。未满 18 岁的学生还要安排符合移民局要求的监护或住宿。",
      "5. 预科一般只保证升入本校。想换学校，要先问清目标大学是否认可这个预科。",
      campusFig("uni-canterbury", "坎特伯雷大学校园", "坎特伯雷预科由校内 UCIC 授课，8 个月，2026 年 6 月、10 月及 2027 年 2 月开学。", true),
      h2("别忘了还有直录和文凭路线"),
      "高考成绩好的学生可以直接申请本科（奥塔哥要求高考 65%）。奥塔哥还有 Diploma（文、商、理），读完可以衔接本科二年级，2027 国际学费约 NZD 38,535–40,635，只在 2 月入学（" + SRC.otagoFees + "）。坎特伯雷 UCIC 也有 DipUS 文凭路线。具体以官网为准。",
      feeNoteZh("奥克兰预科 2027 年学费官网尚未公布，表中为 2026 年数字。"),
      ...sourcesBlock(true, [SRC.uoaReq, SRC.uoaFees, SRC.otagoPdf, SRC.otagoFees, SRC.vuwUp, SRC.vuwReq, SRC.ucCert, SRC.ucicReq]),
    ],
    bodyEn: [
      "Most Chinese senior-high graduates without a strong gaokao enter NZ universities via foundation studies.",
      table(
        ["Programme", "China entry", "IELTS", "Length", "Fee (NZD)"],
        [
          ["Auckland (UP)", "S2 75% / S3 60% (Standard); gaokao 50+ for Accelerated", "5.0–6.0", "Varies by track", "2026: 27,623–36,830"],
          ["Otago", "70% average, or gaokao 60%", "5.5 (5.0)", "Feb/Jun/Oct intakes", "2027: 32,341–33,637"],
          ["Victoria (UP)", "S2 60–70%, S3 60–65%", "5.0–6.0", "6–12 months", "2027: 23,032–36,851"],
          ["Canterbury (UCIC)", "Completed Senior 2", "5.5 (5.0)", "8 months", "2027: 28,842"],
        ],
      ),
      feeNoteEn(),
    ],
  });
}

function xAdvice() {
  return article({
    slug: "nz-study-advice-from-x",
    guideId: "study",
    section: "foundation",
    titleZh: "过来人怎么说：X 上关于新西兰留学的建议与避坑汇总",
    titleEn: "What people on X say about studying in New Zealand",
    excerptZh: "商科是不是中介最爱推？新政 6 分是不是真香？还有铺天盖地的代写广告。我们整理了网友观点，并配上官方事实核对。",
    excerptEn: "Opinions from X, fact-checked against official sources, plus practical tips.",
    ...campusHero("uni-vuw"),
    imageAltZh: "惠灵顿维多利亚大学",
    imageAltEn: "Victoria University of Wellington",
    related: ["nz-popular-courses-2026", "nz-foundation-for-gaokao-students", "visa-scams-fake-degrees", "skilled-migrant-category", "green-list-residence"],
    bodyZh: [
      "我们在 X（原 Twitter）上搜了 2025–2026 年中英文关于新西兰留学、预科、选专业的帖子（检索日期 2026-10-23）。说实话，大部分是留学中介的广告，真正的经验帖不多。下面挑出有参考价值的观点，原样标注账号，并写上我们的核对。网友观点不代表点点立场，也不构成移民建议。",
      h2("观点一：「中介爱推商科」"),
      "@1x99999（2026-03-28）：「中介帮你申请新西兰学校，学校会给中介返点/佣金，商科是万金油专业，谁都可以来读，对中介来说推荐商科可以实现利益最大化。」",
      "核对：商科确实是国际生人数最多的领域（2025 年 17,020 人，见《2026 新西兰最热门专业》）。商科本身没有问题，但如果你的目标是毕业后留下来，应该同时比较工程、护理、教师这些在绿名单上的职业路径，而不是只听一家中介的建议。",
      h2("观点二：「移民放宽了，但你可能更难移了」"),
      "@babilo214544（2026-10-21）：「8月24日起，技术移民新政生效：本地硕士加学士直接6分……但有个前提：你得先拿到一份时薪$35以上的技术类工作。」该帖还提到失业率 5.6%。",
      "核对：技术移民（SMC）改革的官方说明见 " + INZ.smcChanges + " 。帖子里的时薪和失业率数字我们没有逐一核实，请以移民局 SMC 薪资工具（" + INZ.smcWageTool + "）和统计局最新数据为准。这条帖子的提醒是对的：学历只是第一步，真正的门槛是找到合格的工作。",
      h2("观点三：「选什么课，决定毕业后能走哪条路」"),
      "@globalchoice360（2026-10-20）：「In New Zealand, the course you choose to study can influence your post-study work opportunities and the pathways available to you in the future.」",
      "核对：属实。毕业工签的资格与学历层级、学制和课程类型挂钩，详见 " + INZ.stayWork + " 。高中毕业生读预科加三年本科，通常比读短期证书更稳。",
      h2("观点四：雅思没达标、预科没达标怎么办"),
      "@Frank_SLin 发过一系列视频，标题包括「留学新西兰，雅思未达入学要求的对策」「假如预科成绩未达标，还能读本科吗？」「高二学生留学新西兰的建议」。这些是中介的视频，但问题本身很实际。",
      "核对：各校的官方答案是先读语言课或衔接课。例如维多利亚 Foundation Connect 接受雅思 4.5；奥塔哥校内有英语中心和雅思考点。预科结业分数达不到目标专业的，可以申请同校门槛较低的专业，或者续读。具体以学校规定为准。",
      h2("警惕：代写、代考广告"),
      "搜「新西兰 预科」时，排在前面的几乎全是「Essay 代写、代考、包课」广告（例如 @essaywriter004、@essaywriter008 等账号）。新西兰大学对学术诚信处理很严，奥克兰大学甚至要求预科生升本科前完成学术诚信课程。一旦被查出代写，可能被开除，并影响学生签证。不要碰。另见《签证骗局与假学历》。",
      h2("我们补充的五条实用建议"),
      "1. 先定专业方向，再选预科：工科和理科对数学、物理、化学有要求。",
      "2. 雅思尽早考：速成预科一般要 6.0，护理、教育本科常见 7.0。",
      "3. 把总预算写成表：学费、生活费（以移民局资金证明要求为准，" + INZ.funds + "）、保险、住宿。",
      "4. 未满 18 岁要安排合规的住宿和监护，签证材料里要写清楚。",
      "5. 所有数字都回到学校官网和移民局核对，别只看帖子或中介海报。",
      ...sourcesBlock(true, [
        "https://x.com/1x99999/status/2037817079974461758",
        "https://x.com/babilo214544/status/2112836781095981155",
        "https://x.com/globalchoice360/status/2112619995125502130",
        INZ.smcChanges,
        INZ.stayWork,
      ]),
    ],
    bodyEn: [
      "We searched X for 2025–2026 posts on studying in NZ (2026-10-23). Most were agency ads. Useful points: agencies may push business because it suits anyone (@1x99999); the new SMC 6-point rule still needs a skilled job at the wage threshold (@babilo214544, figures not verified); course choice shapes post-study pathways (@globalchoice360). Beware essay-writing/exam-cheating ads that dominate Chinese search results.",
      INZ.smcChanges,
    ],
  });
}
