export const studyArticles = [
  {
    slug: "pte-private-schools",
    guideId: "study",
    categoryId: "schools",
    titleZh: "AIS / ICL / Yoobee / NZSE / Future Skills：学费与怎么选",
    titleEn: "AIS, ICL, Yoobee, NZSE, Future Skills: fees and who they suit",
    excerptZh:
      "按小红书高收藏对照逻辑重写：一年制商科硕三强课表、学费约数、英文路径与五校短名单——只作初筛，以官网为准。",
    excerptEn:
      "Rewritten from highly saved community comparisons: one-year master’s timetables, fee ranges, English pathways and a five-school shortlist—verify on official sites.",
    image: "/images/study-feature.jpg",
    imageAltZh: "新西兰私立学院与技能学校资料摊开的桌面",
    imageAltEn: "Study notes for New Zealand private and skills providers on a desk",
    readingMins: 11,
    sectionsZh: [
      {
        type: "h2",
        text: "先用社区最常问的三件事筛学校",
      },
      {
        type: "p",
        text: "高收藏笔记里，学生反复问的不是「八大排第几」，而是：① 上课时间能不能兼顾打工；② 奖学金后学费大概多少；③ 管理 / 数字商业 / 数据分析哪条更贴自己。下面把可核对的区间与筛选逻辑写清楚；移民、工签、配偶打工等说法变化快，一律以 Immigration New Zealand 与学校录取文件为准，不要把中介文案当事实。",
      },
      {
        type: "table",
        caption: "五所常被中国学生比较的私立/技能学校（NZD 约数，2025–2026，需官网核实）",
        headers: ["学校", "主要方向", "学费约数（国际生）", "更适合谁"],
        rows: [
          [
            "AIS",
            "应用商科 / IT / 酒店与语言衔接；管理硕常见周末班",
            "文凭研文约 22,000–27,000；本科约 22,000–24,000/年；部分硕士约 40,000",
            "需要 NZCEL/语言班再衔接主课，或对照应用型路径预算的人",
          ],
          [
            "ICL",
            "奥克兰 CBD 管理细分 / 商务信息化 / 研文与一年制硕士",
            "Level 5–9 常见约 23,000–48,500；社区商科硕粗算约 2.9万–3.1万",
            "想在市中心读实务商科、接受晚班或新开周末班的人（站长就读）",
          ],
          [
            "Yoobee",
            "动画、设计、软件与数字创意；商科硕偏数字商业/科技",
            "文凭/本科常见约 27,300/年；硕奖学金后粗算约 2.8万–3.0万",
            "愿意持续做作品集，或想保留工作日去上课的人",
          ],
          [
            "NZSE / NZSEG",
            "IT 支持、商务智能、数据分析等技能就业",
            "约 18,900–35,500+；硕奖学金后粗算约 2.6万–2.9万",
            "更看重技能就业与混合课表的人（见 NESEG 多半是 NZSEG 误写）",
          ],
          [
            "Future Skills",
            "Queen Street 应用管理 / 建筑相关与部分硕士",
            "标价例约 23,900–40,500；常需算奖学金后净价",
            "会认真对照标价 vs 奖学金净学费的应用管理路径学生",
          ],
        ],
      },
      {
        type: "figure",
        src: "/images/study-documents.jpg",
        alt: "留学申请文件和课程短名单",
        caption:
          "建议先做一张短名单表：课程级别、学费、英文要求、校区、开学时间、是否能衔接后续课程。",
      },
      {
        type: "p",
        text: "本指南为每所学校准备了独立详解：AIS、ICL、Yoobee、NZSE（NZSEG）、Future Skills。下面先讲社区对照里最实用的「课表 + 预算」逻辑，再点进各校专文核对细节。",
      },
      {
        type: "h2",
        text: "社区高收藏：ICL / Yoobee / NZSEG 一年制商科硕怎么比",
      },
      {
        type: "p",
        text: "收藏量较高的对照笔记，常把这三所放在一起：方向不同、上课节奏不同，学费粗算多在奖学金后约 NZD 2.6万–3.1万区间。奖学金规则、开学季和是否需要桥梁课每年会变——下列「印象」只帮你提问。",
      },
      {
        type: "table",
        caption: "一年制商科硕社区对照（改写，NZD 约数，务必官网核实）",
        headers: ["学校", "常见方向印象", "上课节奏印象", "选它时先问"],
        rows: [
          [
            "ICL",
            "管理学细分（含供应链、市场、建筑项目管理等）、商务信息化",
            "常见工作日晚班；部分 intake 新增周末班",
            "是否要商科背景？晚班/周末班对应哪个月开学？奖学金押金截止日？",
          ],
          [
            "Yoobee",
            "数字商业、软件/信息化、创意科技向",
            "常被描述为周末班，工作日相对完整",
            "有无背景是否要桥梁课？作品集/设备要求？奖学金后净学费？",
          ],
          [
            "NZSE / NZSEG",
            "商业智能、数据分析",
            "常被描述为周内线上 + 周末线下混合",
            "授课型还是研究型路径？校区在哪？无相关背景能否入学？",
          ],
        ],
      },
      {
        type: "articleLinks",
        items: [
          { slug: "school-icl", label: "深挖：ICL 商学院" },
          { slug: "school-yoobee", label: "深挖：Yoobee" },
          { slug: "school-nzse", label: "深挖：NZSE / NZSEG" },
          { slug: "renting-guide", label: "生活：奥克兰租房入门" },
        ],
      },
      {
        type: "h2",
        text: "英文路径：IELTS、PTE、NZCEL 跟课程级别走",
      },
      {
        type: "p",
        text: "社区笔记常写「雅思 6.5 / PTE 58 / NZCEL 5 可申硕士」——这只是部分课程的常见门槛印象，不是全校统一标准。证书/大专可能更低，Graduate Diploma、Bachelor、Master 通常更高。部分学校接受 IELTS、PTE Academic、NZCEL，也可能提供内部语言或 pathway。",
      },
      {
        type: "ul",
        items: [
          "PTE Academic：机考节奏清楚、希望较快出分；写作口语模板不能替代真实能力。",
          "IELTS Academic：认可度稳定，适合习惯真人口语的人。",
          "NZCEL：常见本地衔接；读完对应级别能否进指定主课，要问学校是否认可。",
          "ICL 集团下常见 AEA（沟通英语 / IELTS / PTE）与 Bridge（NZCEL）等语言路径——价格与促销会变，以官网为准。",
        ],
      },
      {
        type: "tip",
        title: "点点建议",
        text: "不要只问最低分。同时确认：单项是否卡分、成绩有效期、语言班能否直升、主课开学日是否赶得上，以及语言学习期间的住宿和生活费。签证与工签以 INZ 为准。",
      },
      {
        type: "h2",
        text: "奥克兰租金会改真实预算",
      },
      {
        type: "p",
        text: "五校多数与奥克兰相关。2025–2026 年合租单间常见约 NZD 220–380/周。学费差 2,000 纽币，有时不如租房地点差异明显。CBD 晚班还要算夜间停车或公交末班。",
      },
      {
        type: "steps",
        items: [
          {
            title: "第一步：定专业方向",
            text: "先判断商科管理、数字商业/IT、数据分析、创意还是技能就业，不要从学校名字开始选。",
          },
          {
            title: "第二步：对照课表与打工",
            text: "晚班、周末班、混合班哪个不撞你计划中的兼职时段。",
          },
          {
            title: "第三步：把学费和房租一起算",
            text: "用标价、奖学金净价、保险、教材、签证资金与奥克兰生活费做 12 个月现金流。",
          },
          {
            title: "第四步：核实官方信息",
            text: "最终以学校官网、offer、INZ 要求为准；本文与社区笔记只作初筛。",
          },
        ],
      },
    ],
    sectionsEn: [
      {
        type: "h2",
        text: "Shortlist by the three questions community notes ask most",
      },
      {
        type: "p",
        text: "Highly saved notes rarely obsess over an eight-university ranking. They ask: Can I work around the timetable? What is tuition after scholarships? Is management, digital business or analytics the better fit? Figures below are approximate 2025–2026 ranges. Visa and post-study work claims change—use Immigration New Zealand and your offer as the source of truth.",
      },
      {
        type: "table",
        caption: "Five private/skills providers often compared (approx. NZD; verify officially)",
        headers: ["Provider", "Main focus", "Approx. fees (international)", "Who it suits"],
        rows: [
          [
            "AIS",
            "Applied business / IT / hospitality with English bridging; weekend master’s often mentioned",
            "Diplomas/PGDips ~22k–27k; bachelor ~22k–24k/year; some master’s ~40k",
            "Students who need NZCEL/pathway English or an applied track with a clear budget",
          ],
          [
            "ICL",
            "Auckland CBD management streams, informatics, graduate diplomas and one-year master’s",
            "Level 5–9 often ~23k–48.5k; community master’s talk ~29k–31k",
            "Students wanting practical CBD business study (site author studies here)",
          ],
          [
            "Yoobee",
            "Animation, design, software and digital creative; digital-business master’s paths",
            "Diplomas/bachelor years often ~27,300; master’s after scholarship ~28k–30k in notes",
            "Portfolio builders or students who want weekday free for work",
          ],
          [
            "NZSE / NZSEG",
            "IT support, BI, data analytics and skills-to-work paths",
            "Roughly 18.9k–35.5k+; master’s after scholarship ~26k–29k in notes",
            "Students focused on skills employment (“NESEG” is usually NZSEG misspelled)",
          ],
          [
            "Future Skills",
            "Queen Street applied management / construction-related and some master’s",
            "List prices ~23.9k–40.5k; always calculate scholarship net fees",
            "Students comparing list price vs scholarship net cost",
          ],
        ],
      },
      {
        type: "figure",
        src: "/images/study-documents.jpg",
        alt: "Study application documents and a course shortlist",
        caption:
          "Build a shortlist table first: programme level, tuition, English requirement, campus, intake and further-study options.",
      },
      {
        type: "p",
        text: "Each school has its own deep-dive article: AIS, ICL, Yoobee, NZSE (NZSEG) and Future Skills. Use the community comparison logic below, then open the dedicated pages.",
      },
      {
        type: "h2",
        text: "High-save comparison: ICL / Yoobee / NZSEG one-year master’s",
      },
      {
        type: "p",
        text: "Popular notes group these three: different focus, different timetables, fee talk often NZD 26k–31k after scholarships. Scholarship rules change—use the table to ask better questions.",
      },
      {
        type: "table",
        caption: "One-year master’s community comparison (rewritten; NZD approx; verify)",
        headers: ["School", "Focus impression", "Timetable impression", "Ask first"],
        rows: [
          [
            "ICL",
            "Management streams, business informatics",
            "Weekday evenings; some intakes add weekends",
            "Business background? Which intake is evening vs weekend? Scholarship deposit deadlines?",
          ],
          [
            "Yoobee",
            "Digital business / tech-leaning paths",
            "Often weekend classes",
            "Bridge course needed? Portfolio/equipment? Net fee after scholarship?",
          ],
          [
            "NZSE / NZSEG",
            "BI / data analytics",
            "Often weekday online + weekend on campus",
            "Taught vs research path? Campus? Entry without related background?",
          ],
        ],
      },
      {
        type: "articleLinks",
        items: [
          { slug: "school-icl", label: "Deep dive: ICL" },
          { slug: "school-yoobee", label: "Deep dive: Yoobee" },
          { slug: "school-nzse", label: "Deep dive: NZSE / NZSEG" },
          { slug: "renting-guide", label: "Life: Auckland renting basics" },
        ],
      },
      {
        type: "h2",
        text: "English: IELTS, PTE and NZCEL follow programme level",
      },
      {
        type: "p",
        text: "Notes often quote IELTS 6.5 / PTE 58 / NZCEL 5 for master’s entry—that is an impression for some programmes, not a school-wide rule. Confirm on the course page.",
      },
      {
        type: "ul",
        items: [
          "PTE Academic: faster results if you like computer-based tests; templates do not replace real skill.",
          "IELTS Academic: stable recognition; live speaking suits some learners.",
          "NZCEL: common local pathway—confirm provider recognition for your main course.",
          "ICL Group language paths (e.g. AEA / Bridge NZCEL) change prices often—check the official site.",
        ],
      },
      {
        type: "tip",
        title: "DianDian tip",
        text: "Ask about sub-scores, validity, direct entry, intake timing and living costs during English study. Visas follow INZ—not social posts.",
      },
      {
        type: "h2",
        text: "Auckland rent changes the real budget",
      },
      {
        type: "p",
        text: "Shared rooms commonly NZD 220–380/week in 2025–2026. A small tuition gap can matter less than where you live—and CBD evening classes may add night parking or late buses.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Step 1: Choose the study direction",
            text: "Management, digital business/IT, analytics, creative or skills-to-work—before choosing by brand name.",
          },
          {
            title: "Step 2: Match timetable and work",
            text: "Evening, weekend or hybrid—which fits planned part-time hours.",
          },
          {
            title: "Step 3: Calculate tuition and rent together",
            text: "List price, scholarship net, insurance, materials, visa funds and Auckland living costs for 12 months.",
          },
          {
            title: "Step 4: Verify official details",
            text: "Provider websites, offers and INZ rules win over community notes.",
          },
        ],
      },
    ],
  },
  {
    slug: "school-ais",
    guideId: "study",
    categoryId: "schools",
    titleZh: "AIS 奥克兰商学院：专业、学费与适合谁",
    titleEn: "AIS Auckland: programmes, fees and who it suits",
    excerptZh:
      "社区对照里 AIS 常与 ICL、Yoobee 一起出现：管理硕周末班、语言衔接与应用商科/IT/酒店路径——用官网核实后再定。",
    excerptEn:
      "Community notes often place AIS beside ICL and Yoobee: weekend master’s, English bridging and applied business/IT/hospitality—verify on the official site.",
    image: "/images/study-feature.jpg",
    imageAltZh: "奥克兰私立学院学习场景",
    imageAltEn: "Auckland private college study setting",
    website: "https://ais.ac.nz/",
    readingMins: 8,
    sectionsZh: [
      {
        type: "links",
        items: [{ href: "https://ais.ac.nz/", label: "打开 AIS 官网" }],
      },
      {
        type: "articleLinks",
        items: [
          { slug: "pte-private-schools", label: "返回：五校学费与怎么选" },
          { slug: "school-icl", label: "对照：ICL 商学院" },
        ],
      },
      {
        type: "h2",
        text: "社区语境里 AIS 被怎么比",
      },
      {
        type: "p",
        text: "在高收藏「低预算一年制硕 / 私立三强」讨论里，AIS 常作为对照：管理学硕士本身就被描述为周末上课，和 Yoobee 类似、与 ICL 传统晚班形成对比。AIS（Auckland Institute of Studies）覆盖商科、IT、酒店旅游、英语与 pathway，适合目标明确又想保留转向空间的人。",
      },
      {
        type: "table",
        caption: "AIS 常见方向与预算视角（NZD 约数，务必官网核实）",
        headers: ["方向", "常见级别/类型", "学费约数", "申请时重点确认"],
        rows: [
          [
            "英语与 pathway",
            "英语、预科或衔接",
            "按周或学期计；全年粗算约 12,000–20,000",
            "能否直升主课、出勤、主课开学日",
          ],
          [
            "商科/管理",
            "Diploma、Bachelor、Graduate Diploma、硕士",
            "文凭研文约 22,000–27,000；部分硕士约 40,000",
            "是否周末班、是否要商科背景、奖学金条款",
          ],
          [
            "IT",
            "Diploma、Bachelor 或研究生相关",
            "约 20,000–28,000/年",
            "编程基础、设备、就业支持是否具体",
          ],
          [
            "酒店/旅游",
            "Diploma 或本科相关",
            "约 18,000–26,000/年",
            "是否含实践、假期、行业合作",
          ],
        ],
      },
      {
        type: "h2",
        text: "和 ICL / Yoobee 对照时问什么",
      },
      {
        type: "ul",
        items: [
          "课表：管理硕是否真是周末？与你计划的兼职时段冲突吗？",
          "英文：IELTS / PTE / NZCEL / 内部语言哪条能进目标课？",
          "预算：标价、奖学金净价、奥克兰合租（约 220–380/周）一起算。",
          "目标：要的是大学排名，还是应用型课程与灵活上课？",
        ],
      },
      {
        type: "figure",
        src: "/images/hero-coast.jpg",
        alt: "新西兰海岸与远处城市生活",
        caption: "校区到住宿的通勤时间，会直接影响学习节奏和生活费。",
      },
      {
        type: "tip",
        title: "申请前核实",
        text: "AIS 官网、offer 和 invoice 才是最终依据。社区笔记里的「周末班」「学费区间」只帮助提问，不替代录取文件。",
      },
      {
        type: "steps",
        items: [
          {
            title: "看课程级别",
            text: "确认 NZQA Level 与课程名称是否对应当前官网页面。",
          },
          {
            title: "看预算",
            text: "学费、保险、教材、签证资金与房租排进同一时间线。",
          },
          {
            title: "看英文路径",
            text: "总分、单项、有效期、语言班能否直升。",
          },
          {
            title: "看生活位置",
            text: "校区、公交、晚归安全与合租预算。",
          },
        ],
      },
    ],
    sectionsEn: [
      {
        type: "links",
        items: [{ href: "https://ais.ac.nz/", label: "Open AIS website" }],
      },
      {
        type: "articleLinks",
        items: [
          { slug: "pte-private-schools", label: "Back: fees overview" },
          { slug: "school-icl", label: "Compare: ICL" },
        ],
      },
      {
        type: "h2",
        text: "How community notes place AIS",
      },
      {
        type: "p",
        text: "In high-save “lower-budget one-year master’s” threads, AIS often appears as a weekend-timetable contrast to ICL’s evening classes. AIS covers business, IT, hospitality, English and pathways—useful if you want an applied Auckland private college with room to pivot.",
      },
      {
        type: "table",
        caption: "AIS focus areas and budget view (approx. NZD; verify officially)",
        headers: ["Focus", "Typical level", "Approx. fees", "Confirm before applying"],
        rows: [
          [
            "English / pathway",
            "English, foundation or bridging",
            "Weekly/term pricing; ~12k–20k/year rough",
            "Direct entry, attendance, main intake",
          ],
          [
            "Business / management",
            "Diploma to master’s",
            "Diplomas/PGDips ~22k–27k; some master’s ~40k",
            "Weekend timetable, background rules, scholarships",
          ],
          [
            "IT",
            "Diploma, bachelor or graduate options",
            "~20k–28k/year",
            "Coding baseline, equipment, job support detail",
          ],
          [
            "Hospitality / tourism",
            "Diploma or bachelor-related",
            "~18k–26k/year",
            "Practice components, holidays, industry links",
          ],
        ],
      },
      {
        type: "h2",
        text: "Questions when comparing with ICL / Yoobee",
      },
      {
        type: "ul",
        items: [
          "Timetable: is the master’s truly weekend-based?",
          "English: IELTS / PTE / NZCEL / internal pathway for your course?",
          "Budget: list vs net fees plus Auckland rent (~220–380/week).",
          "Goal: ranking prestige vs applied study and flexible classes?",
        ],
      },
      {
        type: "figure",
        src: "/images/hero-coast.jpg",
        alt: "New Zealand coast with city life in the distance",
        caption: "Commute time from housing to campus shapes both study rhythm and living cost.",
      },
      {
        type: "tip",
        title: "Verify before applying",
        text: "AIS website, offer and invoice win. Community “weekend class” and fee talk only help you ask better questions.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Check the programme level",
            text: "Match NZQA level and course name to the live official page.",
          },
          {
            title: "Check the budget",
            text: "Tuition, insurance, materials, visa funds and rent on one timeline.",
          },
          {
            title: "Check the English pathway",
            text: "Overall score, sub-scores, validity and direct-entry rules.",
          },
          {
            title: "Check the location",
            text: "Campus, buses, late returns and shared-housing budget.",
          },
        ],
      },
    ],
  },
  {
    slug: "school-icl",
    guideId: "study",
    categoryId: "schools",
    titleZh: "ICL 商学院：课程路径、学费与就读体验要点",
    titleEn: "ICL Business School: pathways, fees and practical notes",
    excerptZh:
      "按高收藏笔记改写：CBD 晚班/新开周末班、管理与信息化一年制硕、语言衔接与停车成本——站长就读视角 + 官网核实清单。",
    excerptEn:
      "Rewritten from high-save notes: CBD evenings/new weekend intakes, one-year management & informatics master’s, English pathways and parking costs—plus verification checklist.",
    image: "/images/study-documents.jpg",
    imageAltZh: "ICL 商科申请资料与英文成绩单",
    imageAltEn: "ICL business application documents and English test notes",
    website: "https://icl.ac.nz/",
    readingMins: 10,
    sectionsZh: [
      {
        type: "links",
        items: [{ href: "https://icl.ac.nz/", label: "打开 ICL 官网" }],
      },
      {
        type: "articleLinks",
        items: [
          { slug: "pte-private-schools", label: "返回：五校学费与怎么选" },
          { slug: "school-ais", label: "对照：AIS" },
          { slug: "school-yoobee", label: "对照：Yoobee" },
        ],
      },
      {
        type: "h2",
        text: "为什么社区笔记总提到 ICL",
      },
      {
        type: "p",
        text: "ICL Education Group 旗下含 ICL Graduate Business School 等。高收藏笔记集中在：奥克兰市中心、一年制商科/管理类硕士、语言与主课衔接、晚班方便白天打工、以及与 Yoobee / NZSEG 的性价比对照。点点作者本人在 ICL 商学院就读——下面把可核对事实与营销话术分开写。",
      },
      {
        type: "table",
        caption: "ICL 申请时可先核实的项目（NZD 约数）",
        headers: ["项目", "社区常见说法", "预算/要求约数", "核实重点"],
        rows: [
          [
            "语言 / pathway",
            "AEA 沟通英语、IELTS/PTE；Bridge NZCEL",
            "按周计费常见；促销价会变",
            "能否直升、出勤、主课条件 offer 写法",
          ],
          [
            "商科文凭与本科路径",
            "Level 5 起实务商科",
            "约 23,000–35,000（视级别）",
            "专业方向、入学背景、评估方式",
          ],
          [
            "一年制硕士（如管理 / 商业信息）",
            "180 学分、多 intake；晚班或新开周末班",
            "社区粗算约 2.9万–3.1万；偶有入学奖学金宣传",
            "是否要商科背景、英文门槛、奖学金押金截止日",
          ],
          [
            "CBD 生活与停车",
            "校内无免费停车；晚班可找夜间封顶价",
            "合租单间约 220–380/周；停车价常变",
            "离校距离、末班公交、停车场 App 实时价",
          ],
        ],
      },
      {
        type: "h2",
        text: "课表：晚班、周末班与打工怎么排",
      },
      {
        type: "p",
        text: "社区对照常写：ICL 偏工作日晚间；部分笔记称自某开学季起新增周末授课（不同月份对应不同模式）。想兼顾兼职的人，先向学校要当学期课表，不要只信社交平台截图。",
      },
      {
        type: "ul",
        items: [
          "晚班：白天实习/兼职更灵活，但要算 CBD 夜间停车或公交。",
          "周末班：适合需要工作日排班的人；与 Yoobee / AIS 管理硕周末印象接近。",
          "评估：不少笔记称「作业为主、少考试」——以课程 outline 为准，勿默认轻松。",
        ],
      },
      {
        type: "tip",
        title: "来自在读学生的提醒",
        text: "选 ICL 前，把课程 outline、英文条件、学费 invoice、住宿预算放在一起看。毕业工签、配偶与孩子相关权利取决于 INZ 当时规则与课程级别，不要只信「保证三年工签」类文案。",
      },
      {
        type: "h2",
        text: "和 Yoobee、NZSEG 一张表说清",
      },
      {
        type: "table",
        caption: "社区一年制硕对照（改写，务必官网核实）",
        headers: ["学校", "方向印象", "课表印象", "学费约数印象"],
        rows: [
          [
            "ICL",
            "管理细分、商务信息化",
            "工作日晚班；部分 intake 周末",
            "约 2.9万–3.1万；奖学金条款常变",
          ],
          [
            "Yoobee",
            "数字商业 / 科技向",
            "周末班常见",
            "奖学金后约 2.8万–3.0万",
          ],
          [
            "NZSE / NZSEG",
            "商业智能 / 数据分析",
            "线上 + 周末混合",
            "奖学金后约 2.6万–2.9万",
          ],
        ],
      },
      {
        type: "figure",
        src: "/images/career-feature.jpg",
        alt: "奥克兰城市天际线与商科学习环境",
        caption: "城市便利是加分项，但市中心预算和晚归安排要提前算清。",
      },
      {
        type: "steps",
        items: [
          {
            title: "确认官网课程页",
            text: "icl.ac.nz 上最新课程名、校区、开学日与学费说明。",
          },
          {
            title: "确认英文条件",
            text: "IELTS、PTE、NZCEL 或内部英语是否适用于你的级别。",
          },
          {
            title: "确认资金节奏",
            text: "押金、第一年学费、保险、签证资金与奥克兰生活费。",
          },
          {
            title: "确认个人匹配",
            text: "管理细分、信息化还是其他路径，是否对齐职业目标。",
          },
        ],
      },
    ],
    sectionsEn: [
      {
        type: "links",
        items: [{ href: "https://icl.ac.nz/", label: "Open ICL website" }],
      },
      {
        type: "articleLinks",
        items: [
          { slug: "pte-private-schools", label: "Back: fees overview" },
          { slug: "school-ais", label: "Compare: AIS" },
          { slug: "school-yoobee", label: "Compare: Yoobee" },
        ],
      },
      {
        type: "h2",
        text: "Why community notes keep mentioning ICL",
      },
      {
        type: "p",
        text: "High-save notes focus on the Auckland CBD campus, one-year business/management master’s paths, English bridging, evening classes for daytime work, and fee comparisons with Yoobee / NZSEG. The DianDian author studies at ICL Business School—separate checkable facts from marketing claims.",
      },
      {
        type: "table",
        caption: "Items to verify for ICL (approx. NZD)",
        headers: ["Item", "Community talk", "Approx. budget/requirement", "Verify"],
        rows: [
          [
            "English / pathway",
            "AEA communication / IELTS / PTE; Bridge NZCEL",
            "Often weekly pricing; promos change",
            "Direct entry, attendance, conditional offer wording",
          ],
          [
            "Business diploma / bachelor paths",
            "Applied business from Level 5",
            "~23k–35k depending on level",
            "Specialisation, background, assessment style",
          ],
          [
            "One-year master’s (e.g. management / informatics)",
            "180 credits, multiple intakes; evenings or new weekend modes",
            "Community talk ~29k–31k; scholarships sometimes advertised",
            "Background rules, English threshold, deposit deadlines",
          ],
          [
            "CBD life & parking",
            "No free campus parking; night capped rates for evenings",
            "Shared room ~220–380/week; parking prices move",
            "Distance, late buses, live parking-app rates",
          ],
        ],
      },
      {
        type: "h2",
        text: "Timetable: evenings, weekends and work",
      },
      {
        type: "p",
        text: "Notes often describe weekday evenings; some say later intakes add weekend delivery. Ask the school for the current timetable—do not rely on screenshots alone.",
      },
      {
        type: "ul",
        items: [
          "Evenings: freer daytime for work; budget CBD night parking or buses.",
          "Weekends: closer to Yoobee/AIS weekend impressions for management paths.",
          "Assessment: “assignment-heavy” talk is common—confirm in the outline.",
        ],
      },
      {
        type: "tip",
        title: "Reminder from a current student",
        text: "Read outline, English conditions, invoice and housing budget together. Post-study work and family rights follow INZ rules for your course—not agency slogans.",
      },
      {
        type: "h2",
        text: "One table with Yoobee and NZSEG",
      },
      {
        type: "table",
        caption: "Community one-year master’s comparison (rewritten; verify officially)",
        headers: ["School", "Focus", "Timetable", "Fee impression"],
        rows: [
          [
            "ICL",
            "Management streams, informatics",
            "Weekday evenings; some weekend intakes",
            "~29k–31k; scholarship terms change",
          ],
          [
            "Yoobee",
            "Digital business / tech-leaning",
            "Often weekends",
            "~28k–30k after scholarship in notes",
          ],
          [
            "NZSE / NZSEG",
            "BI / analytics",
            "Online + weekend mix",
            "~26k–29k after scholarship in notes",
          ],
        ],
      },
      {
        type: "figure",
        src: "/images/career-feature.jpg",
        alt: "Auckland skyline and a business-study environment",
        caption: "City convenience helps—but city-centre budgeting and late returns need planning.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Check the official course page",
            text: "Latest name, campus, intake and tuition on icl.ac.nz.",
          },
          {
            title: "Confirm English conditions",
            text: "IELTS, PTE, NZCEL or internal English for your level.",
          },
          {
            title: "Confirm cash-flow timing",
            text: "Deposit, first-year tuition, insurance, visa funds and living costs.",
          },
          {
            title: "Confirm personal fit",
            text: "Management stream vs informatics vs other paths against your career goal.",
          },
        ],
      },
    ],
  },
  {
    slug: "school-yoobee",
    guideId: "study",
    categoryId: "schools",
    titleZh: "Yoobee：动画、设计与软件课程怎么选",
    titleEn: "Yoobee: animation, design and software programmes",
    excerptZh:
      "高收藏对照里 Yoobee 常被写成周末班 + 数字商业/创意科技；作品集、设备与奖学金后净学费要一起看。",
    excerptEn:
      "High-save notes often frame Yoobee as weekend classes plus digital business/creative tech—plan portfolio, equipment and net fees together.",
    image: "/images/career-feature.jpg",
    imageAltZh: "创意科技学生在城市中学习与求职",
    imageAltEn: "Creative technology students studying and job searching in the city",
    website: "https://yoobee.ac.nz/",
    readingMins: 8,
    sectionsZh: [
      {
        type: "links",
        items: [{ href: "https://yoobee.ac.nz/", label: "打开 Yoobee 官网" }],
      },
      {
        type: "articleLinks",
        items: [
          { slug: "pte-private-schools", label: "返回：五校学费与怎么选" },
          { slug: "school-icl", label: "对照：ICL 晚班路径" },
        ],
      },
      {
        type: "h2",
        text: "社区笔记怎么定位 Yoobee",
      },
      {
        type: "p",
        text: "在「性价比硕士三强」类笔记里，Yoobee 常对应：数字商业与科技管理、软件/信息化、周末上课、工作日留给兼职。创意侧则是动画、设计、游戏与数字媒体——和纯商科管理的 ICL 形成互补，而不是简单「谁更好」。",
      },
      {
        type: "table",
        caption: "Yoobee 方向与预算视角（NZD 约数，务必官网核实）",
        headers: ["方向", "社区印象", "学费约数", "申请重点"],
        rows: [
          [
            "创意 / 动画 / 设计",
            "作品集驱动，设备与软件成本真实存在",
            "文凭/本科常见约 27,300/年；另资源费约 1,400–2,400",
            "作品集要求、电脑配置、评估方式",
          ],
          [
            "软件 / 数字科技",
            "适合想走 IT 或数字产品路径的人",
            "同上区间，以课程页为准",
            "先修知识、项目课密度、就业支持",
          ],
          [
            "一年制商科硕（数字商业向）",
            "周末班；奖学金后粗算约 2.8万–3.0万",
            "奖学金条款常变",
            "有无背景是否要桥梁课、净学费、开学日",
          ],
        ],
      },
      {
        type: "h2",
        text: "和 ICL、NZSEG 怎么选",
      },
      {
        type: "ul",
        items: [
          "想细分管理 + 晚班 → 先看 ICL。",
          "想数据分析 / BI → 先看 NZSE/NZSEG。",
          "想创意作品集或数字商业、需要工作日空档 → 先看 Yoobee。",
          "三校社区学费粗算接近；差在方向与课表，不在「谁保证移民」。",
        ],
      },
      {
        type: "tip",
        title: "就业预期要现实",
        text: "创意与数字行业仍看作品与本地经验。课程 alone 不会自动变成 offer；同步规划 Seek / LinkedIn / 作品集更新节奏。",
      },
      {
        type: "steps",
        items: [
          {
            title: "确认方向",
            text: "动画设计、软件还是数字商业硕——先定方向再比学费。",
          },
          {
            title: "整理作品集",
            text: "按官网要求准备，不要临时拼凑。",
          },
          {
            title: "核实总成本",
            text: "学费、资源费、设备、奖学金净价与奥克兰房租。",
          },
          {
            title: "对齐英文路径",
            text: "IELTS / PTE / NZCEL / 桥梁课是否覆盖目标 intake。",
          },
        ],
      },
    ],
    sectionsEn: [
      {
        type: "links",
        items: [{ href: "https://yoobee.ac.nz/", label: "Open Yoobee website" }],
      },
      {
        type: "articleLinks",
        items: [
          { slug: "pte-private-schools", label: "Back: fees overview" },
          { slug: "school-icl", label: "Compare: ICL evenings" },
        ],
      },
      {
        type: "h2",
        text: "How community notes position Yoobee",
      },
      {
        type: "p",
        text: "In “value master’s trio” notes, Yoobee often means digital business/tech, weekend classes and weekdays free for work. Creative tracks (animation, design, games) complement ICL’s management focus—different jobs, not a simple ranking.",
      },
      {
        type: "table",
        caption: "Yoobee focus and budget view (approx. NZD; verify)",
        headers: ["Focus", "Community impression", "Approx. fees", "Confirm"],
        rows: [
          [
            "Creative / animation / design",
            "Portfolio-driven; real equipment costs",
            "Diploma/bachelor years often ~27,300 + resource fees ~1.4k–2.4k",
            "Portfolio brief, laptop specs, assessment",
          ],
          [
            "Software / digital tech",
            "IT or digital-product leaning paths",
            "Same ballpark—check the course page",
            "Prerequisites, project load, career support",
          ],
          [
            "One-year digital-business master’s",
            "Weekend classes; ~28k–30k after scholarship in notes",
            "Scholarship terms change",
            "Bridge course, net fee, intake",
          ],
        ],
      },
      {
        type: "h2",
        text: "Choosing among Yoobee, ICL and NZSEG",
      },
      {
        type: "ul",
        items: [
          "Management streams + evenings → start with ICL.",
          "Analytics / BI → start with NZSE/NZSEG.",
          "Portfolio creative or digital business with free weekdays → start with Yoobee.",
          "Community fee talk is similar; direction and timetable differ—not “who guarantees PR”.",
        ],
      },
      {
        type: "tip",
        title: "Keep job expectations realistic",
        text: "Creative and digital roles still need portfolio and local experience. Plan Seek/LinkedIn and portfolio updates alongside study.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Confirm the direction",
            text: "Animation/design, software or digital-business master’s first.",
          },
          {
            title: "Organise the portfolio",
            text: "Follow the official brief—do not leave it to the last week.",
          },
          {
            title: "Verify total cost",
            text: "Tuition, resource fees, gear, scholarship net and Auckland rent.",
          },
          {
            title: "Align the English pathway",
            text: "IELTS / PTE / NZCEL / bridge for your target intake.",
          },
        ],
      },
    ],
  },
  {
    slug: "school-nzse",
    guideId: "study",
    categoryId: "schools",
    titleZh: "NZSE / NZSEG：技能课程、校区与学费区间",
    titleEn: "NZSE / NZSEG: skills programmes, campuses and fee ranges",
    excerptZh:
      "社区三强对照里 NZSEG 偏数据分析与混合课表；技能课程价差大——先分清校区与 Level，再谈奖学金后净价。",
    excerptEn:
      "In community trio notes NZSEG leans analytics and hybrid timetables; skills fees vary widely—confirm campus and level before net-fee talk.",
    image: "/images/study-feature.jpg",
    imageAltZh: "技能学校课堂与实训相关资料",
    imageAltEn: "Skills-school classroom and training materials",
    website: "https://www.nzse.ac.nz/",
    readingMins: 8,
    sectionsZh: [
      {
        type: "links",
        items: [{ href: "https://www.nzse.ac.nz/", label: "打开 NZSE 官网" }],
      },
      {
        type: "articleLinks",
        items: [
          { slug: "pte-private-schools", label: "返回：五校学费与怎么选" },
          { slug: "school-icl", label: "对照：ICL 管理路径" },
        ],
      },
      {
        type: "h2",
        text: "先分清 NZSE、NZSEG 与「NESEG」",
      },
      {
        type: "p",
        text: "中文社区里 NZSE / NZSEG 常混写；看到 NESEG 多半是 NZSEG 误拼。集团覆盖英语、职业教育、商业与技能培训。高收藏对照笔记把 NZSEG 放在「商业智能 / 数据分析」一侧，课表印象是周内线上约数小时 + 周末线下，适合不想工作日排满面授课的人。",
      },
      {
        type: "table",
        caption: "NZSE / NZSEG 方向与预算视角（NZD 约数）",
        headers: ["方向", "社区印象", "学费约数", "核实重点"],
        rows: [
          [
            "IT 支持 / 网络云等技能课",
            "偏就业向实务",
            "约 18,900–35,500+（课差价大）",
            "校区、Level、设备、是否含实习",
          ],
          [
            "商务 / 教学等技能路径",
            "实务课表 + 行业对接话术多",
            "同上，以课程页为准",
            "评估方式、出勤、就业支持是否具体",
          ],
          [
            "一年制硕（BI / 数据分析）",
            "三强中常写「奖学金后更低」",
            "粗算约 2.6万–2.9万",
            "授课型 vs 研究型、背景要求、净学费",
          ],
        ],
      },
      {
        type: "h2",
        text: "和 ICL、Yoobee 对照时的选校口诀（改写）",
      },
      {
        type: "ul",
        items: [
          "管理细分 + 晚班 → ICL。",
          "数字商业 / 创意科技 + 周末 → Yoobee。",
          "数据分析 / BI + 混合课表 → NZSEG（以官网课程名为准）。",
          "「三校都便宜、都为了工签」是营销压缩句；课程级别、英文与 INZ 规则决定签证结果。",
        ],
      },
      {
        type: "tip",
        title: "关于英文路径",
        text: "无相关背景能否入学、语言衔接能否降总成本，社区说法不一。以课程入学要求与语言 offer 为准。",
      },
      {
        type: "steps",
        items: [
          {
            title: "核实官网",
            text: "确认学校品牌、校区地址与当前开放课程。",
          },
          {
            title: "确认校区",
            text: "通勤与房租一起算，不要只看学费。",
          },
          {
            title: "确认 level",
            text: "NZQA Level 与课程名称是否匹配你的目标。",
          },
          {
            title: "确认实践",
            text: "项目、实习或行业对接写进 outline 了吗？",
          },
        ],
      },
    ],
    sectionsEn: [
      {
        type: "links",
        items: [{ href: "https://www.nzse.ac.nz/", label: "Open NZSE website" }],
      },
      {
        type: "articleLinks",
        items: [
          { slug: "pte-private-schools", label: "Back: fees overview" },
          { slug: "school-icl", label: "Compare: ICL management" },
        ],
      },
      {
        type: "h2",
        text: "Separate NZSE, NZSEG and “NESEG”",
      },
      {
        type: "p",
        text: "Chinese posts mix NZSE / NZSEG; “NESEG” is usually a misspelling. High-save trio notes place NZSEG on the BI/analytics side with a hybrid timetable impression (weekday online + weekend on campus).",
      },
      {
        type: "table",
        caption: "NZSE / NZSEG focus and budget (approx. NZD)",
        headers: ["Focus", "Community impression", "Approx. fees", "Verify"],
        rows: [
          [
            "IT support / network-cloud skills",
            "Employment-leaning practical study",
            "~18.9k–35.5k+ (wide spread)",
            "Campus, level, equipment, placement",
          ],
          [
            "Business / teaching skills paths",
            "Practical timetables + industry-link marketing",
            "Check the live course page",
            "Assessment, attendance, concrete career support",
          ],
          [
            "One-year master’s (BI / analytics)",
            "Often “lowest after scholarship” in trio notes",
            "~26k–29k rough",
            "Taught vs research, background rules, net fee",
          ],
        ],
      },
      {
        type: "h2",
        text: "Rewritten community shortlist logic",
      },
      {
        type: "ul",
        items: [
          "Management + evenings → ICL.",
          "Digital business / creative tech + weekends → Yoobee.",
          "Analytics / BI + hybrid → NZSEG (confirm official names).",
          "“Cheap + work visa for all three” is marketing shorthand—level, English and INZ rules decide outcomes.",
        ],
      },
      {
        type: "tip",
        title: "About English pathways",
        text: "Whether you can enter without related background—and whether language bridging lowers total cost—varies by course. Trust the entry requirements and language offer.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Verify the official site",
            text: "Brand, campus address and currently open programmes.",
          },
          {
            title: "Confirm the campus",
            text: "Commute and rent together—not tuition alone.",
          },
          {
            title: "Confirm the level",
            text: "NZQA level and course name match your goal.",
          },
          {
            title: "Confirm practice",
            text: "Projects, placements or industry links written into the outline?",
          },
        ],
      },
    ],
  },
  {
    slug: "school-future-skills",
    guideId: "study",
    categoryId: "schools",
    titleZh: "Future Skills：应用管理、学费与奖学金怎么看",
    titleEn: "Future Skills: applied management, fees and scholarships",
    excerptZh:
      "社区较少把它塞进「三强」海报，但应用管理与奖学金净价仍是短名单常客——标价减去奖学金再比房租。",
    excerptEn:
      "Less often in “trio” posters, but applied management and scholarship net fees still matter—subtract scholarships before comparing rent.",
    image: "/images/study-documents.jpg",
    imageAltZh: "应用管理课程资料与奖学金说明",
    imageAltEn: "Applied management materials and scholarship notes",
    website: "https://www.futureskills.co.nz/",
    readingMins: 7,
    sectionsZh: [
      {
        type: "links",
        items: [
          { href: "https://www.futureskills.co.nz/", label: "打开 Future Skills 官网" },
        ],
      },
      {
        type: "articleLinks",
        items: [
          { slug: "pte-private-schools", label: "返回：五校学费与怎么选" },
          { slug: "school-icl", label: "对照：ICL 商学院" },
        ],
      },
      {
        type: "h2",
        text: "在短名单里它通常解决什么问题",
      },
      {
        type: "p",
        text: "小红书「ICL / Yoobee / NZSEG」对照帖很少把 Future Skills 画进同一张表，但选校清单里它仍常出现：Queen Street 一带应用管理、建筑相关与部分硕士路径。关键动作不是背标价，而是算奖学金后的净学费，再和奥克兰合租一起比。",
      },
      {
        type: "table",
        caption: "Future Skills 预算视角（NZD 约数，务必官网核实）",
        headers: ["项目", "常见情况", "约数", "核实重点"],
        rows: [
          [
            "应用管理等主课",
            "标价区间较宽",
            "约 23,900–40,500",
            "课程是否仍开放、Level、开学日",
          ],
          [
            "奖学金 / 促销",
            "净价可能明显低于标价",
            "以当期条款为准",
            "截止日、是否可叠加、退学退费规则",
          ],
          [
            "材料 / 实践成本",
            "建筑或应用课可能另计",
            "因课而异",
            "工具、工地、交通与保险",
          ],
          [
            "奥克兰生活",
            "City 通勤方便但房租高",
            "合租约 220–380/周",
            "晚课交通与安全",
          ],
        ],
      },
      {
        type: "h2",
        text: "和社区「三强」怎么并列比较",
      },
      {
        type: "ul",
        items: [
          "若你的目标是一年制管理/信息化硕的晚班或周末班，优先对照 ICL / Yoobee / NZSEG 专文。",
          "若你更看应用管理净价与 Queen Street 位置，把 Future Skills 放进同一张短名单表。",
          "任何「读完就能移民」说法都跳过；只保留可核对的学费、英文与课表。",
        ],
      },
      {
        type: "tip",
        title: "适合度提醒",
        text: "标价好看不等于最终付款。拿到正式费用说明前，不要用社交媒体截图做家庭预算。",
      },
      {
        type: "steps",
        items: [
          {
            title: "查课程开放状态",
            text: "官网是否仍招收你目标的 intake。",
          },
          {
            title: "核实学费和材料费",
            text: "标价、奖学金净价、杂费分列清楚。",
          },
          {
            title: "评估实践要求",
            text: "工地、项目或实习是否与你的时间表冲突。",
          },
          {
            title: "做 12 个月预算",
            text: "学费 + 保险 + 房租 + 生活费，留汇率缓冲。",
          },
        ],
      },
    ],
    sectionsEn: [
      {
        type: "links",
        items: [
          { href: "https://www.futureskills.co.nz/", label: "Open Future Skills website" },
        ],
      },
      {
        type: "articleLinks",
        items: [
          { slug: "pte-private-schools", label: "Back: fees overview" },
          { slug: "school-icl", label: "Compare: ICL" },
        ],
      },
      {
        type: "h2",
        text: "What problem it usually solves on a shortlist",
      },
      {
        type: "p",
        text: "Xiaohongshu “trio” posters rarely include Future Skills, but shortlists still do: Queen Street applied management, construction-related paths and some master’s options. Subtract scholarships before comparing Auckland rent.",
      },
      {
        type: "table",
        caption: "Future Skills budget view (approx. NZD; verify)",
        headers: ["Item", "Common situation", "Approx.", "Verify"],
        rows: [
          [
            "Applied management and related",
            "Wide list-price band",
            "~23.9k–40.5k",
            "Still open? Level? Intake?",
          ],
          [
            "Scholarships / promos",
            "Net fee can be far below list",
            "Current terms only",
            "Deadlines, stacking, refund rules",
          ],
          [
            "Materials / practice costs",
            "Construction/applied courses may add costs",
            "Varies by programme",
            "Tools, sites, transport, insurance",
          ],
          [
            "Auckland living",
            "City commute convenience, higher rent",
            "Shared room ~220–380/week",
            "Evening transport and safety",
          ],
        ],
      },
      {
        type: "h2",
        text: "How to compare beside the community “trio”",
      },
      {
        type: "ul",
        items: [
          "One-year management/informatics with evening or weekend delivery → start with ICL / Yoobee / NZSEG articles.",
          "Applied-management net fee + Queen Street location → put Future Skills on the same shortlist table.",
          "Skip “study then PR guaranteed” claims; keep verifiable fees, English and timetables.",
        ],
      },
      {
        type: "tip",
        title: "Fit reminder",
        text: "A pretty list price is not your invoice. Do not set a family budget from social screenshots.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Check programme availability",
            text: "Confirm your intake is still open on the official site.",
          },
          {
            title: "Verify tuition and material costs",
            text: "List price, scholarship net and extras in separate lines.",
          },
          {
            title: "Assess practice requirements",
            text: "Sites, projects or placements vs your timetable.",
          },
          {
            title: "Build a 12-month budget",
            text: "Tuition + insurance + rent + living costs with FX buffer.",
          },
        ],
      },
    ],
  },
];
