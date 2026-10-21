import {
  IMG,
  article,
  fig,
  h2,
  feeNoteZh,
  feeNoteEn,
  sourcesBlock,
} from "./article-kit.mjs";

const RELATED = [
  "nz-universities-overview",
  "school-auckland",
  "school-aut",
  "school-waikato",
  "school-massey",
  "school-vuw",
  "school-canterbury",
  "school-lincoln",
  "school-otago",
];

export function universityArticles() {
  return UNIS.map(universityArticle);
}

const UNIS = [
  {
    slug: "school-auckland",
    nameZh: "奥克兰大学",
    nameEn: "University of Auckland",
    maori: "Waipapa Taumata Rau",
    website: "https://www.auckland.ac.nz/",
    cityZh: "奥克兰（City、Grafton、Newmarket、Epsom、Tai Tokerau 等校区）",
    cityEn: "Auckland (City, Grafton, Newmarket, Epsom, Tai Tokerau and others)",
    rankZh:
      "QS World University Rankings 2026：全球第 65 名，新西兰最高。校方新闻 2025-06-19：https://www.auckland.ac.nz/en/news/2025/06/19/university-of-auckland-no-1-in-nz-again-in-qs-world-university-r.html",
    rankEn:
      "QS World University Rankings 2026: 65th globally, highest in New Zealand (university news, 19 June 2025).",
    strengthsZh:
      "综合研究型大学。常被讨论的方向包括医学与健康科学（Grafton）、工程、商科（Business School）、法学、建筑与规划、理学与计算机。医学、药学、视光等健康专业录取与截止更早，不能按普通文科时间表申请。",
    strengthsEn:
      "A research-intensive comprehensive university. Medicine and health (Grafton), engineering, business, law, architecture and science/computer science are frequently discussed. Health programmes have earlier closing dates than a generic arts timetable.",
    feesZh:
      "2026 年国际招生材料按 120 学分估算（另加 Student Services Fee，2025 年公开约 NZD 9.24/学分，满负荷约 NZD 1,109）。约数：文科约 NZD 44,970；教育约 NZD 43,674；商科约 NZD 47,675–50,105；工程/建筑/设计约 NZD 55,484。来源：奥克兰大学 2026 Programme List。https://www.auckland.ac.nz/assets/study/international-students/agent-resources/publications/Programme-List-2026-WEB.pdf 与 https://international.auckland.ac.nz/study/fees",
    feesEn:
      "2026 international estimates are usually for 120 points plus the student services fee (about NZD 9.24/point in the 2025 note). Approximate bands: arts ~NZD 44,970; education ~NZD 43,674; business ~NZD 47,675–50,105; engineering/architecture/design ~NZD 55,484. Source: University of Auckland 2026 Programme List.",
    entryZh:
      "本科通常需要认可的中学学历（中国高考/预科等路径以国际招生页为准）与英语成绩。Universities New Zealand 概括本科常见 IELTS Academic 6.0、研究生 6.5；奥克兰大学部分学院与健康科学更高。PTE Academic、TOEFL iBT 及语言班也可被接受——打开具体 programme 的 English language requirements。",
    entryEn:
      "Undergraduate entry needs an accepted secondary qualification (Gaokao/foundation routes are programme-specific) plus English. Many programmes follow the common NZ bands (IELTS 6.0 undergraduate / 6.5 postgraduate); health and some faculties sit higher. PTE Academic and TOEFL iBT may be accepted.",
    intakeZh:
      "主开学季 2 月与 7 月。2027 Semester 1 校历一般课程截止 2026-12-08；国际授课型研究生页另建议 2026-12-01 以便签证。医学、药学、视光、部分护理与临床心理更早（部分 2026-07-01 或 2026-11-01）。https://www.auckland.ac.nz/en/about-us/about-the-university/the-university/official-publications/university-calendar/current-calendar/key-university-dates/closing-dates-for-admission.html",
    intakeEn:
      "Main intakes February and July. 2027 Semester 1 general closing date 8 December 2026; international taught postgraduate applicants are also advised to apply by 1 December 2026. Medicine and several health programmes close earlier.",
    suitsZh:
      "适合：希望在奥克兰读综合研究型大学、能承担更高房租与学费、并接受竞争性录取的人。不太适合：预算紧、或明确只要应用型小班技能课的人——可对照 AUT、Yoobee、NZSE 或 Future Skills。",
    suitsEn:
      "Good fit: a research-intensive university in Auckland if you can budget higher rent and fees. Less fit: tight budgets or a studio/skills-college preference—compare AUT, Yoobee, NZSE or Future Skills.",
  },
  {
    slug: "school-aut",
    nameZh: "奥克兰理工大学（AUT）",
    nameEn: "Auckland University of Technology",
    maori: "Te Wānanga Aronui o Tāmaki Makau Rau",
    website: "https://www.aut.ac.nz/",
    cityZh: "奥克兰 City、South（Manukau）、North（Akoranga）校区",
    cityEn: "Auckland City, South (Manukau) and North (Akoranga) campuses",
    rankZh:
      "QS World University Rankings 2027：全球第 431（AUT 排名页）。QS 学科 2026：体育相关全球第 23，酒店与休闲管理新西兰并列第一。https://www.aut.ac.nz/about/rankings-and-accreditation",
    rankEn:
      "QS World University Rankings 2027: 431st (AUT rankings page). QS Subject 2026: sports-related 23rd globally; hospitality and leisure management equal first in New Zealand.",
    strengthsZh:
      "偏应用与行业项目。传播、设计、计算机与数学科学、护理、体育、酒店与旅游、商科常见。许多本科含工作整合学习。博士若在新西兰境内就读，校方学费页按国内费率另列（2026 年公开约 NZD 8,402 学费 + 服务费）。",
    strengthsEn:
      "Applied and industry-linked. Communication, design, computing, nursing, sport, hospitality and business are common. Many bachelor’s degrees include work-integrated learning. Onshore PhD study is listed at domestic tuition on AUT’s fee page.",
    feesZh:
      "2026 国际学费页（含 GST、按 120 学分估算）：Bachelor of Business 学费约 NZD 38,700 + 学生服务费约 NZD 1,260；部分双学位更高。授课型硕士按项目，例如 Master of Applied Finance 2026 年 180 学分约 NZD 58,050 学费。https://www.aut.ac.nz/study/fees-and-scholarships/fees-to-study-at-aut/international-student-fees-at-aut",
    feesEn:
      "2026 international BBus about NZD 38,700 tuition plus ~NZD 1,260 levy per 120 points. Taught master’s vary; e.g. Master of Applied Finance 2026 about NZD 58,050 tuition for 180 points. AUT international fees page.",
    entryZh:
      "本科英语常见 IELTS Academic 6.0（小分要求以课程为准），研究生常见 6.5。部分健康与教育专业更高，并可能要求面试或注册相关材料。开学季多为 2 月与 7 月，部分课程有更多入学点。",
    entryEn:
      "Undergraduate English is commonly IELTS Academic 6.0; postgraduate commonly 6.5, with higher bands in some health and education programmes. February and July are the main intakes.",
    intakeZh: "主开学季 2 月与 7 月。个别研究生与路径课程有额外入学点，以课程页为准。",
    intakeEn: "February and July are the main intakes; some programmes add extra entry points.",
    suitsZh:
      "适合：想在奥克兰读应用型大学学位、看重实习/项目、专业在传播设计计算机护理体育酒店一带的人。若你要的是奥克兰大学式的研究型医学院或法学路径，应对照奥克兰大学而不是默认 AUT。",
    suitsEn:
      "Good fit: an applied university degree in Auckland with placements or projects. Choose Auckland if you need its research-medicine or law pathways.",
  },
  {
    slug: "school-waikato",
    nameZh: "怀卡托大学",
    nameEn: "University of Waikato",
    maori: "Te Whare Wānanga o Waikato",
    website: "https://www.waikato.ac.nz/",
    cityZh: "汉密尔顿主校区，另有陶朗加（Tauranga）",
    cityEn: "Hamilton, plus Tauranga",
    rankZh:
      "校方国际页写明：依据 QS World University Rankings 2026，进入全球前 300。https://www.waikato.ac.nz/int/",
    rankEn:
      "The university states a QS 2026 position in the global top 300: https://www.waikato.ac.nz/int/",
    strengthsZh:
      "管理、计算机、教育、法律、环境与毛利/太平洋相关学科常被问到。生活成本通常低于奥克兰。确认上课校区是汉密尔顿还是陶朗加，再算房租与通勤。",
    strengthsEn:
      "Management, computing, education, law, environment and Māori/Pacific-related fields are often discussed. Living costs are usually lower than Auckland. Confirm Hamilton versus Tauranga before you budget rent.",
    feesZh:
      "国际学费按学科与级别在官网学费工具中查询，本稿不编造未在公开页写明的总价。请打开 https://www.waikato.ac.nz/study/costs/ 与具体 qualification 页。博士境内就读费率以博士页为准。",
    feesEn:
      "International fees are listed by subject on the university’s cost pages. This article does not invent a single headline number. See https://www.waikato.ac.nz/study/costs/ and the qualification page.",
    entryZh:
      "本科常见 IELTS Academic 6.0，研究生常见 6.5（Universities New Zealand 概括，课程页可更高）。接受的同等考试以 Waikato 国际入学页为准。主开学季 2 月与 7 月。",
    entryEn:
      "Common English bands are IELTS 6.0 undergraduate and 6.5 postgraduate unless a programme lists higher. Main intakes February and July.",
    intakeZh: "Semester 1（2 月）与 Semester 2（7 月）为主；暑期课另计。",
    intakeEn: "Semester 1 (February) and Semester 2 (July); summer school is separate.",
    suitsZh:
      "适合：希望避开奥克兰高房租、专业在管理/计算机/教育/法律、能适应汉密尔顿或陶朗加城市规模的人。若你必须留在奥克兰兼职网络里，应对照奥克兰大学或 AUT。",
    suitsEn:
      "Good fit: a university degree without Auckland rent, if Hamilton or Tauranga works for you. Stay with Auckland or AUT if your work network must remain in Auckland.",
  },
  {
    slug: "school-massey",
    nameZh: "梅西大学",
    nameEn: "Massey University",
    maori: "Te Kunenga ki Pūrehuroa",
    website: "https://www.massey.ac.nz/",
    cityZh: "奥克兰 Albany、北帕默斯顿（Manawatū）、惠灵顿",
    cityEn: "Auckland Albany, Manawatū (Palmerston North) and Wellington",
    rankZh:
      "QS World University Rankings 2027：全球第 215，新西兰第三（校方新闻 2026-06-18）。https://www.massey.ac.nz/about/news/massey-universitys-global-rank-climbs-to-record-position/",
    rankEn:
      "QS World University Rankings 2027: 215th globally, third in New Zealand (Massey news, 18 June 2026).",
    strengthsZh:
      "兽医与农科、航空、设计、传播、商科与食品科学常被讨论。三校区专业并不完全重复——兽医与农科多在 Manawatū，设计与传播常见惠灵顿，商科与部分理工在 Albany。短名单必须写上课校区。",
    strengthsEn:
      "Veterinary and agriculture, aviation, design, communication, business and food science are typical strengths. Campuses do not duplicate every programme—confirm Albany versus Manawatū versus Wellington.",
    feesZh:
      "2026 国际招生手册按 120 学分估算：文科本科约 NZD 34,220；商科本科常见约 NZD 38,080；理工/农科本科约 NZD 42,300。预科 Foundation Certificate（International）约 NZD 30,800。https://www.massey.ac.nz/ 与 2026 国际手册。",
    feesEn:
      "2026 international estimates per 120 credits: arts bachelor ~NZD 34,220; business bachelor ~NZD 38,080; science/agriculture bachelor ~NZD 42,300; international foundation ~NZD 30,800.",
    entryZh:
      "本科常见 IELTS 6.0，研究生常见 6.5；兽医、航空、教育等更高或另有选拔。开学季多为 2 月与 7 月，部分校区/课程有 11 月点。",
    entryEn:
      "Common English bands are IELTS 6.0 / 6.5; veterinary, aviation and teaching can add extra selection. February and July are the main intakes; some programmes add a November point.",
    intakeZh: "2 月、7 月为主；个别课程与预科有更多入学点，以课程页为准。",
    intakeEn: "February and July mainly; some foundation and taught programmes add extra intakes.",
    suitsZh:
      "适合：兽医/农科/航空/设计等梅西强项，或希望在奥克兰以外降低生活费但仍读大学学位的人。不要把「梅西」当成单一城市——先锁定校区。",
    suitsEn:
      "Good fit: Massey’s specialist strengths, or a university degree outside central Auckland. Lock the campus first.",
  },
  {
    slug: "school-vuw",
    nameZh: "惠灵顿维多利亚大学",
    nameEn: "Victoria University of Wellington",
    maori: "Te Herenga Waka",
    website: "https://www.wgtn.ac.nz/",
    cityZh: "惠灵顿（Kelburn、Pipitea、Te Aro 等校区）",
    cityEn: "Wellington (Kelburn, Pipitea, Te Aro and others)",
    rankZh:
      "校方排名页写明 QS 全球第 240。https://www.wgtn.ac.nz/about/our-story/global-civic-university/reputation/global-rankings",
    rankEn:
      "The university’s rankings page lists QS #240: https://www.wgtn.ac.nz/about/our-story/global-civic-university/reputation/global-rankings",
    strengthsZh:
      "法律、国际关系与公共管理、建筑与设计、人文、地球科学与地震研究常被提及。首都实习与政府、文化机构距离近。风大、住房紧张，房租可能接近奥克兰部分郊区。",
    strengthsEn:
      "Law, international relations and public policy, architecture and design, humanities and earth sciences are frequent strengths. Capital-city internships are a feature. Wind and a tight rental market are part of the living-cost picture.",
    feesZh:
      "2026 国际学费按学分公布（含 GST）：本科一年 120 学分约 NZD 35,362（人文/教育）至 NZD 46,451（工程）；研究生多数课程约 NZD 37,855–49,430。https://www.wgtn.ac.nz/students/money/fees/international 博士在境内就读按国内费率。",
    feesEn:
      "2026 international undergraduate 120-point years about NZD 35,362 (humanities/education) to NZD 46,451 (engineering). Most postgraduate years about NZD 37,855–49,430. Onshore PhD study uses domestic tuition.",
    entryZh:
      "本科常见 IELTS 6.0，研究生常见 6.5；法律、教育、建筑可能另有要求。主开学季 2 月与 7 月。",
    entryEn:
      "Common English bands IELTS 6.0 / 6.5; law, education and architecture can add extra requirements. February and July intakes.",
    intakeZh: "Semester 1（2 月）与 Semester 2（7 月）。",
    intakeEn: "Semester 1 (February) and Semester 2 (July).",
    suitsZh:
      "适合：法律、国际关系、建筑设计或希望在首都实习的人。若你主要想读临床医学或兽医，应对照奥塔哥或梅西，而不是默认惠灵顿。",
    suitsEn:
      "Good fit: law, IR, architecture/design or capital-city internships. Clinical medicine or veterinary study belongs at Otago or Massey.",
  },
  {
    slug: "school-canterbury",
    nameZh: "坎特伯雷大学",
    nameEn: "University of Canterbury",
    maori: "Te Whare Wānanga o Waitaha",
    website: "https://www.canterbury.ac.nz/",
    cityZh: "基督城 Ilam 主校区",
    cityEn: "Ilam campus, Christchurch",
    rankZh:
      "QS World University Rankings 2027：全球第 257（校方排名页，2026-09-01）。土木与结构工程、地理学、语言学等学科在 QS 学科 2026 中进入前列区间。https://www.canterbury.ac.nz/about-uc/why-uc/our-rankings/qs-world-university-rankings",
    rankEn:
      "QS World University Rankings 2027: 257th (UC rankings page, 1 September 2026). Civil engineering, geography and linguistics sit in strong QS subject bands for 2026.",
    strengthsZh:
      "工程（尤其土木、地震相关）、林业、环境科学、教育与商科常见。基督城生活成本通常低于奥克兰。重建后的城市与校园设施是近年宣传重点，但仍以官网参观信息为准。",
    strengthsEn:
      "Engineering (especially civil/earthquake-related), forestry, environmental science, education and business are common. Christchurch living costs are usually below Auckland.",
    feesZh:
      "国际学费按学科分档（Tuition Fee Band），部分资格收整课 Special Programme Fee。校方页 2026-08-31 更新，具体金额以资格列表为准，本稿不摘未稳定显示的数字。博士在境内就读按国内费率。https://www.canterbury.ac.nz/study/getting-started/study-and-living-costs/study-costs/international-tuition-fees",
    feesEn:
      "International fees are banded by subject; some qualifications use a Special Programme Fee. UC updated the page on 31 August 2026—use the qualification table rather than a single headline number. Onshore PhD study uses domestic tuition.",
    entryZh:
      "本科常见 IELTS 6.0，研究生常见 6.5；工程、教育可能另有数学或注册相关要求。主开学季 2 月与 7 月。",
    entryEn:
      "Common English bands IELTS 6.0 / 6.5; engineering and education can add extra academic requirements. February and July intakes.",
    intakeZh: "Semester 1 与 Semester 2 为主。",
    intakeEn: "Semester 1 and Semester 2.",
    suitsZh:
      "适合：工程、林业、环境或希望在南岛降低生活费的人。若专业必须在奥克兰医院或首都政府网络，应对照奥克兰大学或惠灵顿维多利亚。",
    suitsEn:
      "Good fit: engineering, forestry, environment, or a South Island living-cost profile. Auckland or Wellington may fit better for hospital or capital-government networks.",
  },
  {
    slug: "school-lincoln",
    nameZh: "林肯大学",
    nameEn: "Lincoln University",
    maori: "Te Whare Wānaka o Aoraki",
    website: "https://www.lincoln.ac.nz/",
    cityZh: "基督城以南林肯镇（Lincoln）",
    cityEn: "Lincoln township, south of Christchurch",
    rankZh:
      "QS World University Rankings 2026：全球第 407（校方新闻 2025-06-19）。农学与环境相关学科是其传统强项。https://www.lincoln.ac.nz/news-and-events/lincoln-university-maintains-top-450-position-in-global-rankings/",
    rankEn:
      "QS World University Rankings 2026: 407th (Lincoln news, 19 June 2025). Agriculture and environment are traditional strengths.",
    strengthsZh:
      "农学、园艺、环境管理、物业与估价、旅游与酒店管理是长项。校园在乡镇，生活节奏与奥克兰完全不同；去基督城市区需要通勤。规模小，师生比是其宣传点之一。",
    strengthsEn:
      "Agriculture, horticulture, environmental management, property/valuation and tourism are core. The campus is in a township—budget the Christchurch commute if you want city life.",
    feesZh:
      "国际学费按项目打包：入学第一年定价后，在最短完成年限内维持该价（校方国际学费页）。具体金额打开该 qualification。博士在境内就读通常按国内费率。https://www.lincoln.ac.nz/study/fees/international-fees/",
    feesEn:
      "International fees are programme-based and held for the minimum completion period after the first-year price is set. Open the qualification page. Onshore PhD study is usually charged at domestic rates.",
    entryZh:
      "本科常见 IELTS 6.0，研究生常见 6.5。2027 Semester 1 境外国际生申请截止 2026-12-01。https://www.lincoln.ac.nz/study/apply-and-enrol/apply/",
    entryEn:
      "Common English bands IELTS 6.0 / 6.5. Offshore international applications for Semester 1 2027 close 1 December 2026.",
    intakeZh:
      "Semester 1 与 Semester 2 为主；另有 11 月入学点（2026 年 11 月境外截止曾写 2026-09-01）。以申请页为准。",
    intakeEn:
      "Semester 1 and Semester 2, plus a November intake on some programmes. Use the apply page for the exact offshore deadline.",
    suitsZh:
      "适合：农学、环境、物业或旅游，并能适应小镇校园的人。不适合把「人在基督城市区、每天逛街」当成默认生活——那是另一笔通勤账。",
    suitsEn:
      "Good fit: agriculture, environment, property or tourism if a township campus works. It is not a default central-Christchurch lifestyle.",
  },
  {
    slug: "school-otago",
    nameZh: "奥塔哥大学",
    nameEn: "University of Otago",
    maori: "Ōtākou Whakaihu Waka",
    website: "https://www.otago.ac.nz/",
    cityZh: "但尼丁主校区；基督城、惠灵顿有健康科学校区",
    cityEn: "Dunedin, with health-science campuses in Christchurch and Wellington",
    rankZh:
      "QS World University Rankings 2026：全球并列第 197，新西兰第二（校方新闻 2025-06-19）。https://www.otago.ac.nz/news/newsroom/otago-rises-in-international-ranking",
    rankEn:
      "QS World University Rankings 2026: =197, second in New Zealand (Otago news, 19 June 2025).",
    strengthsZh:
      "医学、牙科、药学、理疗与健康科学是全国最常被提到的路径之一；人文、海洋科学与体育相关学科也强。健康科学后期可能在基督城或惠灵顿校区上课，申请前确认地点。但尼丁是典型大学城，冬季冷，房租通常低于奥克兰。",
    strengthsEn:
      "Medicine, dentistry, pharmacy and other health sciences are among the most discussed pathways; humanities, marine science and sport-related fields are also strong. Later health-science years may be in Christchurch or Wellington. Dunedin is a university town with colder winters and usually lower rent than Auckland.",
    feesZh:
      "国际学费按 paper 计，同一学历选不同 paper 总价会变。请用资格页与 2026 paper 学费表，不要套用单一「医学学费」口头数。https://www.otago.ac.nz/study/fees/international-tuition-fees",
    feesEn:
      "International tuition is charged per paper, so the yearly total depends on the mix. Use the qualification page and the 2026 paper-fee schedule—do not rely on a verbal “medicine fee”.",
    entryZh:
      "本科常见 IELTS 6.0，研究生常见 6.5；健康科学选拔更严、截止更早。2027 Semester 1 境外全日制学位申请截止 2026-11-15。https://www.otago.ac.nz/international/future-students/prepare-for-otago/key-dates-for-new-international-students",
    entryEn:
      "Common English bands IELTS 6.0 / 6.5; health-science selection is tighter and earlier. Offshore full-degree applications for Semester 1 2027 close 15 November 2026.",
    intakeZh:
      "Semester 1（2 月底/3 月初）为主；Semester 2 境外申请期另写到 4 月 30 日。博士与论文硕士可全年申请（需导师）。",
    intakeEn:
      "Semester 1 is the main full-degree intake. Semester 2 offshore applications have a separate window (30 April on the key-dates page). PhD and thesis-only master’s can be year-round with a supervisor.",
    suitsZh:
      "适合：健康科学或希望体验大学城、并接受南岛气候的人。若你必须留在奥克兰，奥塔哥不是「顺便读医学」的捷径。",
    suitsEn:
      "Good fit: health sciences or a university-town experience if you accept a southern climate. It is not a shortcut to medicine while remaining in Auckland.",
  },
];

function universityArticle(uni) {
  const titleZh = `${uni.nameZh}：优势专业、排名、学费与适合谁`;
  const titleEn = `${uni.nameEn}: strengths, rank, fees and who it suits`;
  return article({
    slug: uni.slug,
    guideId: "study",
    section: "universities",
    titleZh,
    titleEn,
    excerptZh: `${uni.nameZh}（${uni.maori}）：校区城市、公开排名来源、国际学费约数与入学英语。`,
    excerptEn: `${uni.nameEn} (${uni.maori}): campus city, cited ranking, approximate international fees and English entry.`,
    image: IMG.study,
    imageAltZh: uni.nameZh,
    imageAltEn: uni.nameEn,
    website: uni.website,
    related: RELATED.filter((slug) => slug !== uni.slug),
    bodyZh: [
      `${uni.nameZh}（${uni.nameEn}，${uni.maori}）是新西兰八所公立大学之一。选校、交费和签证材料用官网全名。下面只整理可核对的公开信息；数字会变。`,
      `官网：${uni.website}`,
      fig(IMG.class, `${uni.nameZh}学习场景`, "先锁定专业与上课校区，再比排名和学费。"),
      h2("校区与城市"),
      uni.cityZh,
      "城市决定房租、兼职机会和气候。奥克兰最贵；惠灵顿住房也紧；汉密尔顿、但尼丁、林肯通常更省。把一年房租写进和学费同一张表。",
      h2("优势与常见专业"),
      uni.strengthsZh,
      h2("排名（请看来源与年份）"),
      uni.rankZh,
      "排名不是录取保证，也不能替代职业注册要求。同一所大学不同学科在 QS 学科榜上的位置可能差很多。",
      h2("国际生学费约数"),
      uni.feesZh,
      feeNoteZh(),
      fig(IMG.flat, "城市生活成本", "学费差常常小于一年房租差。"),
      h2("入学与英语"),
      uni.entryZh,
      "语言班或预科只能弥补有限缺口。成绩单认证与英语考试并行准备。",
      h2("开学季"),
      uni.intakeZh,
      h2("适合谁"),
      uni.suitsZh,
      "下一步：对照《八大怎么选》，再读申请时间线与学生签证。需要压缩短名单时用咨询表。",
      ...sourcesBlock(true, [
        uni.website,
        "https://www.universitiesnz.ac.nz/international-students/am-i-eligible",
      ]),
    ],
    bodyEn: [
      `${uni.nameEn} (${uni.maori}) is one of New Zealand’s eight public universities. Use the official name for applications, fees and visas.`,
      `Official site: ${uni.website}`,
      fig(IMG.class, `${uni.nameEn} study setting`, "Lock the programme and campus before you compare rank or fees."),
      h2("Campus and city"),
      uni.cityEn,
      "City choice drives rent, part-time work and climate. Put a year of housing on the same sheet as tuition.",
      h2("Strengths and typical programmes"),
      uni.strengthsEn,
      h2("Rankings (source and year)"),
      uni.rankEn,
      "A rank is not an offer, and it does not replace professional registration rules.",
      h2("Approximate international fees"),
      uni.feesEn,
      feeNoteEn(),
      fig(IMG.flat, "City living costs", "A year of rent can outweigh a tuition gap."),
      h2("Entry and English"),
      uni.entryEn,
      h2("Intakes"),
      uni.intakeEn,
      h2("Who it suits"),
      uni.suitsEn,
      "Next: the eight-university overview, then the timeline and student-visa pages.",
      ...sourcesBlock(false, [
        uni.website,
        "https://www.universitiesnz.ac.nz/international-students/am-i-eligible",
      ]),
    ],
  });
}
