import type {
  CqcpeFriendLink,
  CqcpeHall,
  CqcpeMagazineIssue,
  CqcpeNavItem,
  CqcpeNewsItem,
} from "@/types/cqcpe";

export const ORIGIN = "https://www.cqcpe.cn";
export const PAGE_ASSETS = "/sites/www-cqcpe-cn-ccd5d01f/root-8a5edab2";
export const SHARED_ASSETS = "/sites/www-cqcpe-cn-ccd5d01f/shared";

export const navItems: CqcpeNavItem[] = [
  {
    label: "参观服务",
    href: `/index.php?c=category&id=235`,
    children: [
      { label: "参观须知", href: `/index.php?c=category&id=235#show243` },
      { label: "交通路线", href: `/index.php?c=category&id=235#show244` },
      { label: "讲解预约", href: `/index.php?c=category&id=235#show245` },
      { label: "楼层导视", href: `/index.php?c=category&id=235#show246` },
      { label: "展厅一览", href: `/index.php?c=category&id=235#show247` },
      { label: "飞越重庆", href: `/index.php?c=category&id=235#show248` },
    ],
  },
  {
    label: "数字展馆",
    href: `/index.php?c=category&id=236`,
    children: [{ label: "全景漫游", href: "https://www.rxcn.net/v2.html" }],
  },
  {
    label: "新闻动态",
    href: `/index.php?c=category&id=237`,
    children: [
      { label: "单位动态", href: `/index.php?c=category&id=287` },
      { label: "科普活动", href: `/index.php?c=category&id=251` },
      { label: "通知公告", href: `/index.php?c=category&id=250` },
      { label: "来访动态", href: `/index.php?c=category&id=46` },
      { label: "新闻资讯", href: `/index.php?c=category&id=249` },
      { label: "馆校共建", href: `/index.php?c=category&id=160` },
    ],
  },
  { label: "党群建设", href: `/index.php?c=category&id=238` },
  {
    label: "博士后工作站",
    href: `/index.php?c=category&id=239`,
    children: [
      { label: "工作站介绍", href: `/index.php?c=category&id=239#show252` },
      { label: "专家团队", href: `/index.php?c=category&id=253` },
      { label: "博士风采", href: `/index.php?c=category&id=254` },
    ],
  },
  {
    label: "城市地理",
    href: `/index.php?c=category&id=240`,
    children: [
      { label: "期刊简介", href: `/index.php?c=category&id=240#show255` },
      { label: "期刊导读", href: `/index.php?c=category&id=256` },
      { label: "征订方式", href: `/index.php?c=category&id=240#show257` },
      { label: "特别推荐", href: `/index.php?c=category&id=144` },
    ],
  },
  { label: "文创作品", href: `/index.php?c=category&id=241` },
  {
    label: "关于我们",
    href: `/index.php?c=category&id=242`,
    children: [
      { label: "单位概况", href: `/index.php?c=category&id=242#show258` },
      { label: "组织架构", href: `/index.php?c=category&id=242#show259` },
      { label: "领导班子", href: `/index.php?c=category&id=242#show260` },
      { label: "专家团队", href: `/index.php?c=category&id=261` },
      { label: "科研成果", href: `/index.php?c=category&id=263` },
      { label: "长嘉会堂", href: `/index.php?c=category&id=242#show264` },
      { label: "联系我们", href: `/index.php?c=category&id=242#show265` },
    ],
  },
];

export const banners = [
  `${PAGE_ASSETS}/images/banner-01.jpg`,
  `${PAGE_ASSETS}/images/banner-02.jpg`,
];

export const visitIcons = [
  {
    label: "参观须知",
    href: `/index.php?c=category&id=235#show243`,
    icon: `${SHARED_ASSETS}/images/kgsj01.png`,
  },
  {
    label: "讲解预约",
    href: `/index.php?c=category&id=235#show245`,
    icon: `${SHARED_ASSETS}/images/kgsj02.png`,
  },
  {
    label: "楼层总览",
    href: `/index.php?c=category&id=235#show246`,
    icon: `${SHARED_ASSETS}/images/kgsj03.png`,
  },
  {
    label: "交通线路",
    href: `/index.php?c=category&id=235#show244`,
    icon: `${SHARED_ASSETS}/images/kgsj04.png`,
  },
];

export const halls: CqcpeHall[] = [
  {
    id: "xuting",
    name: "序厅",
    href: `/index.php?c=category&id=266`,
    image: `${PAGE_ASSETS}/images/hall-xuting.jpg`,
    description:
      "序厅位于展馆一层，布展面积650平方米，空间层高7.1米。巨型球幕“重庆之眼”深化展示重庆与世界联系，上下长屏讲述重庆百年变迁故事，以金字红底镌刻习近平总书记对重庆的殷殷嘱托，为重庆各方面工作定调。",
  },
  {
    id: "quxian",
    name: "区县特色",
    href: `/index.php?c=category&id=275`,
    image: `${PAGE_ASSETS}/images/hall-quxian.jpg`,
    description:
      "区县特色展区位于展馆一层内侧，布展面积500平方米，空间层高2.6米。归纳各区县重点内容，展示各区县基本情况、规划重点、风土人情等。",
  },
  {
    id: "shanshui",
    name: "自然山水",
    href: `/index.php?c=category&id=267`,
    image: `${PAGE_ASSETS}/images/hall-shanshui.jpg`,
    description:
      "自然山水展区位于展馆二层，布展面积400平方米，空间层高3米。突出“不忘本来”主线，强调“亘古山水大地史诗”主题，渐次展开一幕宁静、和谐、美丽“自然本底画卷”。主要分为“地势演变”“地理枢纽”“重庆的山”“重庆的水”“山水胜境”“山水地名”“山水诗歌” 八个篇章。",
  },
  {
    id: "lishi",
    name: "历史人文",
    href: `/index.php?c=category&id=268`,
    image: `${PAGE_ASSETS}/images/hall-lishi.jpg`,
    description:
      "历史人文展区位于展馆二层南侧，布展面积650平方米，空间层高3米。突出“不忘本来”主线，强化“巴渝渊薮、自古繁华”主题，主要分为“历史沿革”“文化脉络”“四次筑城”“大足石刻”“白鹤梁”“钓鱼城”“开放口岸”“战时首都”“名城荟萃”“镜头中的重庆”“笔尖上的重庆”十一个篇章。",
  },
  {
    id: "zhuanxiang",
    name: "专项规划",
    href: `/index.php?c=category&id=269`,
    image: `${PAGE_ASSETS}/images/hall-zhuanxiang.jpg`,
    description:
      "专项规划展区位于展馆二层北侧，布展面积430平方米，空间层高2.7米。重点介绍老百姓身边规划等专业性、体系性、科普性、参与性内容，增强群众参观的获得感、满足感。主要分为“城迹”“山城江城”两个篇章。",
  },
  {
    id: "zhanlue",
    name: "战略定位",
    href: `/index.php?c=category&id=290`,
    image: `${PAGE_ASSETS}/images/hall-zhanlue.jpg`,
    description: "",
  },
  {
    id: "zongti",
    name: "总体规划",
    href: `/index.php?c=category&id=291`,
    image: `${PAGE_ASSETS}/images/hall-zongti.jpg`,
    description:
      "国土空间规划是国家空间发展的指南、可持续发展的空间蓝图，是各类开发保护建设活动的基本依据。建立国土空间规划体系并监督实施，将主体功能区规划、土地利用规划、城乡规划等空间规划融合为统一的国土空间规划，实现“多规合一”，强化国土空间规划对各专项规划的指导约束作用是党中央、国务院作出的重大部署。",
  },
  {
    id: "guojia",
    name: "国家战略",
    href: `/index.php?c=category&id=292`,
    image: `${PAGE_ASSETS}/images/hall-guojia.jpg`,
    description:
      "重庆要对标新时代新征程党的中心任务和党中央赋予的使命，充分发挥比较优势、后发优势，进一步全面深化改革开放，主动服务和融入新发展格局,着力推动高质量发展，奋力打造新时代西部大开发重要战略支点、内陆开放综合枢纽，在发挥“三个作用上展现更大作为，不断谱写中国式现代化重庆篇章。",
  },
  {
    id: "zhongxin",
    name: "国家重要的中心城市",
    href: `/index.php?c=category&id=293`,
    image: `${PAGE_ASSETS}/images/hall-zhongxin.jpg`,
    description: "",
  },
  {
    id: "meili",
    name: "美丽重庆",
    href: `/index.php?c=category&id=294`,
    image: `${PAGE_ASSETS}/images/hall-meili.jpg`,
    description: "",
  },
  {
    id: "feiyi",
    name: "非遗传承",
    href: `/index.php?c=category&id=295`,
    image: `${PAGE_ASSETS}/images/hall-feiyi.jpg`,
    description: "",
  },
];

export const unitFeatured: CqcpeNewsItem = {
  title: "【动态】市规划展览馆开展“群防群治·百日攻坚”地灾防治主题宣传活动",
  date: "2026-08-27",
  href: `/index.php?c=show&id=4109`,
  image: `${PAGE_ASSETS}/images/news-featured.png`,
};

export const unitList: CqcpeNewsItem[] = [
  {
    title: "【动态】南岸区委社会工作部到馆调研指导志愿服务工作",
    date: "2026-07-18",
    href: `/index.php?c=show&id=4096`,
  },
  {
    title:
      "【锚定为民政绩·永葆清廉本色】我馆召开“以案四说”警示教育大会暨树立和践行正确政绩观专题党课",
    date: "2026-07-06",
    href: `/index.php?c=show&id=4092`,
  },
  {
    title: "【动态】市规划馆开展应急救护专题培训",
    date: "2026-07-02",
    href: `/index.php?c=show&id=4090`,
  },
  {
    title: "【迎交叉复核检查 提质升级促发展】市规划馆迎接4A级景区交叉复核",
    date: "2026-06-10",
    href: `/index.php?c=show&id=4083`,
  },
];

export const scienceItems: CqcpeNewsItem[] = [
  {
    title: "【动态】8.29测绘法宣传日暨国家版图意识宣传周活动在我馆正式启动",
    date: "2026-08-30",
    href: `/index.php?c=show&id=4118`,
    image: `${PAGE_ASSETS}/images/science-01.jpg`,
    excerpt:
      "2026年8月29日，迎来第23个全国测绘法宣传日。为深入宣传《中华人民共和国测绘法》及国家版图管理相关规定，普及标准地图使用知识，排查整治“问题地图”隐患，筑牢全社会地理信息安全底线，重庆市规划展览馆开展测绘法宣传日暨国家版图意识宣传周活动。",
  },
  {
    title:
      "【公益招募】2026年测绘法宣传日“维护地理信息安全 激发时空数据潜能”青少年科普研学活动开启报名！",
    date: "2026-08-27",
    href: `/index.php?c=show&id=4110`,
    image: `${PAGE_ASSETS}/images/science-02.png`,
    excerpt:
      "值第23个全国测绘法宣传日暨国家版图意识宣传周来临之际，为深入普及测绘法律法规、国家版图知识，传播现代测绘科学技术，重庆市规划展览馆特开展两场青少年公益科普研学活动，现面向全市青少年公开招募研学学员！",
  },
];

export const notices: CqcpeNewsItem[] = [
  {
    title:
      "【维护地理信息安全 激发时空数据潜能】2026年测绘法宣传日暨国家版图意识宣传周活动开启",
    date: "2026-08-27",
    href: `/index.php?c=show&id=4108`,
  },
  {
    title: "【群防群治·百日攻坚】志愿服务活动招募启事",
    date: "2026-08-24",
    href: `/index.php?c=show&id=4107`,
  },
  {
    title: "【公告】重庆市规划展览馆（重庆市规划研究中心）招聘简章",
    date: "2026-08-03",
    href: `/index.php?c=show&id=4103`,
  },
  {
    title:
      "【征集】重庆市城市规划学会关于重庆获评国家历史文化名城40周年主题标识征集作品公示及公众投票的公告",
    date: "2026-07-10",
    href: `/index.php?c=show&id=4093`,
  },
];

export const magazines: CqcpeMagazineIssue[] = [
  {
    title: "2026年第八期（总第188期）目录",
    href: `/index.php?c=show&id=4104`,
    image: `${PAGE_ASSETS}/images/mag-188.jpg`,
    sponsor: "主办单位：重庆市规划展览馆",
    language: "语       种：中文",
    date: "日       期：2026.08.03",
  },
  {
    title: "2026年第七期（总第187期）目录",
    href: `/index.php?c=show&id=4091`,
    image: `${PAGE_ASSETS}/images/mag-187.jpg`,
    sponsor: "主办单位：重庆市规划展览馆",
    language: "语       种：中文",
    date: "日       期：2026.07.03",
  },
  {
    title: "2026年第六期（总第186期）目录",
    href: `/index.php?c=show&id=4078`,
    image: `${PAGE_ASSETS}/images/mag-186.jpg`,
    sponsor: "主办单位：重庆市规划展览馆",
    language: "语       种：中文",
    date: "日       期：2026.06.01",
  },
  {
    title: "2026年第五期（总第185期）目录",
    href: `/index.php?c=show&id=4067`,
    image: `${PAGE_ASSETS}/images/mag-185.jpg`,
    sponsor: "主办单位：重庆市规划展览馆",
    language: "语       种：中文",
    date: "日       期：2026.05.09",
  },
  {
    title: "2026年第四期（总第184期）目录",
    href: `/index.php?c=show&id=4044`,
    image: `${PAGE_ASSETS}/images/mag-184.jpg`,
    sponsor: "主办单位：重庆市规划展览馆",
    language: "语       种：中文",
    date: "日       期：2026.04.07",
  },
];

export const aboutText =
  "重庆市规划展览馆成立于2004年，2006年经市编办批复，增挂“重庆市规划研究中心”牌子，为重庆市规划和自然资源局直属正处级公益二类事业单位。2019年经市规划自然资源局研究决定，负责重庆自然资源科普馆建设运行管理。单位宗旨是为城乡规划成果展览、城乡规划研究提供服务，主要承担城乡规划展览、展示和公示工作，开展城乡规划政策和城市问题研究，开展城乡规划宣传教育，根据资质为城乡规划编制提供技术服务。单位现有职工90余人，其中正高级职称17人、副高级职称21人，博士3人、硕士29人，注册城乡规划师12人。";

export const friendLinks: CqcpeFriendLink[] = [
  { label: "中华人民共和国住房和城乡建设部" },
  { label: "重庆市人民政府" },
  { label: "重庆市规划和自然资源局" },
  { label: "重庆市规划设计研究院" },
  { label: "中国城市规划学会" },
];
