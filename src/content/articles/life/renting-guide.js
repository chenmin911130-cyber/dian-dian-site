export const rentingGuide = {
  slug: "renting-guide",
  guideId: "life",
  categoryId: "settle",
  titleZh: "新西兰租房入门：合租、押金与看房清单",
  titleEn: "Renting in New Zealand: flatting, bond and viewing checklist",
  excerptZh: "从短住过渡到合租：看清房租包含什么、押金如何处理、室友规则是否适合你。",
  excerptEn: "Move from short stay to flatting by checking inclusions, bond handling and whether house rules fit your life.",
  image: "/images/hero-coast.jpg",
  imageAltZh: "新西兰住宅街区与看房路线",
  imageAltEn: "A New Zealand residential street and viewing route",
  readingMins: 9,
  sectionsZh: [
    {
      type: "links",
      items: [
        { href: "https://www.trademe.co.nz/a/property/residential/rent", label: "打开 Trade Me Property 租房" },
        { href: "https://www.barfoot.co.nz/rent", label: "打开 Barfoot & Thompson 租房" },
      ],
    },
    {
      type: "h2",
      text: "先短住，再决定长租",
    },
    {
      type: "p",
      text: "刚落地时，不建议在没看房、没走过通勤路线、没见过室友的情况下签长租。先订 1-3 周短住或学校宿舍过渡，熟悉学校、公交、超市和安全感，再看合租房会稳很多。人还在国内时，也可用 Trade Me Property、大型中介官网筛区与价格，但尽量把正式长租留到落地后确认。",
    },
    {
      type: "p",
      text: "新西兰合租常见按周标价。计算月预算时用每周租金乘以 4.33，而不是乘以 4。还要确认是否包含水、电、网、家具、床品、暖气和停车；“包 bills”也要问是否有限额。",
    },
    {
      type: "table",
      caption: "奥克兰常见分区印象（约数，务必本地再核）",
      headers: ["区域印象", "常见特点", "看房时多问"],
      rows: [
        ["City / CBD", "通勤近，租金偏高，人员更杂", "安保、噪音、晚归路线"],
        ["中区近城", "通勤与租金较折中", "高峰公交时间、是否包网电"],
        ["东区", "华人与家庭区更多，生活配套全", "到学校是否需换车"],
        ["北岸", "环境与安全口碑常更好，通勤更长", "过桥/轮渡成本和晚班回家"],
      ],
    },
    {
      type: "table",
      caption: "看房时必须问清的内容",
      headers: [
        "问题",
        "为什么问",
        "理想答案",
      ],
      rows: [
        [
          "房租包含什么",
          "避免入住后 bills 超预算",
          "明确水电网、家具、垃圾费和限额",
        ],
        [
          "bond 交给谁",
          "正规押金应有记录",
          "按规定提交并有收据/书面记录",
        ],
        [
          "最短入住期",
          "防止课程变动时被锁死",
          "与开学、实习和假期计划匹配",
        ],
        [
          "室友作息",
          "合租冲突多来自生活习惯",
          "安静时间、访客、清洁安排清楚",
        ],
        [
          "通勤时间",
          "远房源可能省租金但耗时间",
          "高峰期公交/步行路线可接受",
        ],
      ],
    },
    {
      type: "h2",
      text: "看房现场不要只看照片",
    },
    {
      type: "steps",
      items: [
        {
          title: "白天看采光",
          text: "检查房间是否潮湿、窗户能否打开、衣柜和插座是否够用。",
        },
        {
          title: "试通勤",
          text: "用上课时间段查公交和步行路线，看雨天是否现实。",
        },
        {
          title: "问清公共区域",
          text: "厨房、冰箱、洗衣、晾衣和卫生间高峰期怎么安排。",
        },
        {
          title: "拍照留证",
          text: "入住前记录已有划痕、霉点、坏灯和家具状态，发给房东或主租确认。",
        },
      ],
    },
    {
      type: "tip",
      title: "安全提醒",
      text: "不要在没看房、没合同或没确认对方身份时转大额押金。若价格明显低于同区水平又催你马上付款，先停下来核实。",
    },
    {
      type: "h2",
      text: "合租沟通写下来",
    },
    {
      type: "ul",
      items: [
        "房租、bills、入住日期和退租通知期用文字确认。",
        "清洁轮值、访客、做饭味道和安静时间提前说清。",
        "如果跟朋友合租，也要把钱和规则写清楚，避免关系受影响。",
        "保存租金转账记录和与房东/主租的关键聊天记录。",
      ],
    },
  ],
  sectionsEn: [
    {
      type: "links",
      items: [
        { href: "https://www.trademe.co.nz/a/property/residential/rent", label: "Open Trade Me Property rentals" },
        { href: "https://www.barfoot.co.nz/rent", label: "Open Barfoot & Thompson rentals" },
      ],
    },
    {
      type: "h2",
      text: "Use short stay before committing long term",
    },
    {
      type: "p",
      text: "When you first arrive, avoid signing a long lease before seeing the room, testing the commute and meeting flatmates. Book 1-3 weeks of short stay or halls, learn the campus, bus routes, supermarkets and neighbourhood feel, then inspect flats with better judgement. From overseas you can shortlist areas and prices on Trade Me Property or major agency sites, but keep the formal long lease until you can confirm in person.",
    },
    {
      type: "p",
      text: "Rent is commonly advertised weekly. For a monthly budget, multiply weekly rent by 4.33, not 4. Confirm whether water, power, internet, furniture, bedding, heating and parking are included; even “bills included” may have limits.",
    },
    {
      type: "table",
      caption: "Rough Auckland area impressions (verify locally)",
      headers: ["Area feel", "Common traits", "Ask at viewing"],
      rows: [
        ["City / CBD", "Short commute, higher rent, busier streets", "Security, noise, late-night routes"],
        ["Inner / mid suburbs", "Often a middle ground on rent and commute", "Peak bus time, whether power/internet is included"],
        ["East Auckland", "More family and Chinese-community amenities", "Whether you need transfers to campus"],
        ["North Shore", "Often praised for environment; longer commute", "Bridge/ferry cost and late shifts home"],
      ],
    },
    {
      type: "table",
      caption: "Questions to ask at a viewing",
      headers: [
        "Question",
        "Why it matters",
        "Good answer",
      ],
      rows: [
        [
          "What is included?",
          "Prevents bills from blowing the budget",
          "Water, power, internet, furniture, rubbish and limits are clear",
        ],
        [
          "Who handles bond?",
          "Proper bond should be recorded",
          "Submitted correctly with receipt/written record",
        ],
        [
          "Minimum stay?",
          "Avoid being locked in if study plans change",
          "Matches intake, placement and holiday plans",
        ],
        [
          "Flatmate routine?",
          "Many conflicts come from habits",
          "Quiet hours, guests and cleaning are clear",
        ],
        [
          "Commute time?",
          "Distant rooms can cost time",
          "Peak bus/walking route is realistic",
        ],
      ],
    },
    {
      type: "h2",
      text: "At viewings, look beyond photos",
    },
    {
      type: "steps",
      items: [
        {
          title: "Check daylight",
          text: "Look for dampness, windows that open, enough wardrobe space and enough power points.",
        },
        {
          title: "Test the commute",
          text: "Search routes at class time and ask whether the walk is realistic in rain.",
        },
        {
          title: "Ask about shared areas",
          text: "Clarify kitchen, fridge, laundry, drying space and bathroom peak times.",
        },
        {
          title: "Photograph condition",
          text: "Before moving in, record scratches, mould, broken lights and furniture condition and send them to the landlord or head tenant.",
        },
      ],
    },
    {
      type: "tip",
      title: "Safety note",
      text: "Do not transfer a large bond before seeing the room, receiving written terms or confirming the other person’s identity. If the price is far below the area and payment is urgent, pause and verify.",
    },
    {
      type: "h2",
      text: "Write flatting communication down",
    },
    {
      type: "ul",
      items: [
        "Confirm rent, bills, move-in date and notice period in writing.",
        "Discuss cleaning, guests, cooking smells and quiet hours early.",
        "Even with friends, write down money and rules to protect the friendship.",
        "Save rent transfers and key messages with the landlord or head tenant.",
      ],
    },
  ],
};
