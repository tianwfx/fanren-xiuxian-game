// 30个互动NPC完整配置
const NPC_INTERACTION_LIST = [
    // ========== 金阳门 ==========
    {
        id: "chu-lieyang",
        name: "楚烈阳",
        sect: "金阳门",
        character: "正直友善",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "斩杀金牙狼×5", contribution: 40, reward: "金髓末×1" },
            { name: "护送门派物资", contribution: 60, reward: "赤金晶×1" },
            { name: "金剑台比武试炼", contribution: 100, reward: "金阳玉碎片×1" }
        ],
        shop: [
            { item: "金系符箓", cost: 50 },
            { item: "金刃飞镖", cost: 100 },
            { item: "聚气丹", cost: 50 },
            { item: "金髓末", cost: 50 }
        ],
        dialogs: [
            "道友，此处有妖兽出没，需不需要同行？",
            "出身修仙世家，性格正直，金阳门内门弟子。",
            "我可以帮你避开妖兽巢穴！"
        ]
    },
    {
        id: "qin-feng",
        name: "秦风",
        sect: "金阳门",
        character: "仗义",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "清理山门妖兽", contribution: 35 },
            { name: "每日看守金阳殿", contribution: 20, daily: true }
        ],
        shop: [
            { item: "金纹剑", cost: 200 },
            { item: "赤金甲", cost: 300 },
            { item: "金阳丹", cost: 100 }
        ],
        dialogs: [
            "道友，请问有何事需要帮忙？",
            "我是金阳门金剑卫，为人仗义！",
            "我可以帮你解决外门弟子的刁难！"
        ]
    },
    {
        id: "shen-muyan",
        name: "沈慕言",
        sect: "金阳门",
        character: "精明中立",
        favor: 0,
        relation: "stranger",
        canSteal: true,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "收集情报", contribution: 50 },
            { name: "寻回遗失腰牌", contribution: 80 }
        ],
        shop: [
            { item: "低阶金系功法", cost: 150 },
            { item: "金系矿石", cost: 80 }
        ],
        dialogs: [
            "道友，要不要坐下来喝一杯？我知道一些秘境的消息。",
            "我是无门派散修，擅长情报收集！",
            "我可以分享秘境情报给你！"
        ]
    },
    {
        id: "gu-chen",
        name: "顾宸",
        sect: "金阳门",
        character: "谨慎中立",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "整理功法阁", contribution: 30 },
            { name: "寻回遗失功法", contribution: 120 }
        ],
        shop: [
            { item: "金阳基础剑术", cost: 100 },
            { item: "纯阳金诀", cost: 800 }
        ],
        dialogs: [
            "道友，是来借阅功法的吗？我可以为你推荐。",
            "我是金阳门执事弟子，擅长功法传授！",
            "我可以推荐合适的功法给你！"
        ]
    },
    {
        id: "leng-xuan",
        name: "冷轩",
        sect: "金阳门",
        character: "无情反派",
        favor: 0,
        relation: "stranger",
        canSteal: true,
        canAttack: true,
        canMarry: false,
        canSworn: false,
        tasks: [
            { name: "偷袭同门弟子（黑任务）", contribution: 100, reputation: -200 }
        ],
        shop: [
            { item: "阴毒金系暗器", cost: 500 },
            { item: "禁术残卷", cost: 800 }
        ],
        dialogs: [
            "哼，又来了一个送宝物的？",
            "我是金阳门叛逆弟子，无情无义！",
            "小心我偷袭你！"
        ]
    },
    {
        id: "lei-hu",
        name: "雷虎",
        sect: "金阳门",
        character: "狂傲重义",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: true,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "切磋胜利", contribution: 50 },
            { name: "猎杀高阶妖兽", contribution: 150 }
        ],
        shop: [
            { item: "金系暴击符", cost: 120 },
            { item: "临时攻击BUFF", cost: 200 }
        ],
        dialogs: [
            "小子，敢跟我切磋一下吗？赢了我就认你当兄弟！",
            "我是无门派散修，狂傲好斗，但重情义！",
            "重情义，结拜后绝不会背叛！"
        ]
    },

    // ========== 青木宗 ==========
    {
        id: "lin-qinghan",
        name: "林清寒",
        sect: "青木宗",
        character: "温柔友善",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "采集草药×10", contribution: 30, reward: "灵木露×1" },
            { name: "每日清理药田杂草", contribution: 20, daily: true },
            { name: "培育凝魂草", contribution: 70, reward: "青木芯×1" }
        ],
        shop: [
            { item: "疗伤丹", cost: 120 },
            { item: "木系符箓", cost: 60 },
            { item: "灵草种子", cost: 50 },
            { item: "灵木露", cost: 50 }
        ],
        dialogs: [
            "道友，来采草药吗？我可以帮你辨认几种稀有品种。",
            "我是青木宗外门执事之女，擅长草药培育！",
            "我可以赠送灵草给你！"
        ]
    },
    {
        id: "lin-yue",
        name: "林月",
        sect: "青木宗",
        character: "胆小友善",
        favor: 0,
        relation: "stranger",
        canSteal: true,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "帮忙采药", contribution: 25 }
        ],
        shop: [
            { item: "木灵衣", cost: 200 },
            { item: "青藤杖", cost: 250 },
            { item: "土灵膏", cost: 50 }
        ],
        dialogs: [
            "道…道友，你不要吓我，我没有偷草药。",
            "我是青木宗药童，擅长草药采集！",
            "我可以赠送基础草药给你！"
        ]
    },
    {
        id: "su-wanqing",
        name: "苏晚晴",
        sect: "青木宗",
        character: "小贪中立",
        favor: 0,
        relation: "stranger",
        canSteal: true,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "采摘灵莲", contribution: 35 }
        ],
        shop: [
            { item: "清寒丹", cost: 130 },
            { item: "速行丹", cost: 70 },
            { item: "水玉露", cost: 50 }
        ],
        dialogs: [
            "道友，要不要买一朵灵莲？很便宜的~",
            "我是水月宫侍女，擅长采摘水下灵物！",
            "我可以赠送灵莲给你！"
        ]
    },
    {
        id: "wen-xuan",
        name: "文轩",
        sect: "青木宗",
        character: "书呆子特殊",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "寻找古阵法残卷", contribution: 80 }
        ],
        shop: [
            { item: "木系防御阵图", cost: 300 },
            { item: "聚灵阵基础篇", cost: 400 }
        ],
        dialogs: [
            "道友，请勿打扰，我正在研读古籍。",
            "我是无门派书生修仙者，痴迷于修仙古籍！",
            "我可以与你分享古籍知识！"
        ]
    },
    {
        id: "mo-ying",
        name: "墨影",
        sect: "青木宗",
        character: "阴狠反派",
        favor: 0,
        relation: "stranger",
        canSteal: true,
        canAttack: true,
        canMarry: false,
        canSworn: false,
        tasks: [
            { name: "毒杀护药灵兽（黑任务）", contribution: 100 }
        ],
        shop: [
            { item: "阴毒暗器", cost: 450 },
            { item: "阴木材料", cost: 200 }
        ],
        dialogs: [
            "人类，滚远点！否则别怪我不客气！",
            "我是邪修散修，擅长偷窃与偷袭！",
            "小心我偷袭你，偷取你大量灵石/材料！"
        ]
    },
    {
        id: "xiao-tao",
        name: "小桃",
        sect: "青木宗",
        character: "桃树精特殊",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "寻找灵果", contribution: 20 },
            { name: "守护桃林", contribution: 40 }
        ],
        shop: [
            { item: "持续回血BUFF", cost: 150 },
            { item: "木灵气加成", cost: 200 }
        ],
        dialogs: [
            "道友，你有灵果吗？我可以给你桃花瓣哦~",
            "我是青木宗灵宠化形（桃树精），天真烂漫！",
            "我可以赠送桃花瓣给你！"
        ]
    },

    // ========== 水月宫 ==========
    {
        id: "wen-ruoxi",
        name: "温若溪",
        sect: "水月宫",
        character: "灵动友善",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "采集水月石", contribution: 35, reward: "水玉露×1" },
            { name: "水下潜行试炼", contribution: 60, reward: "寒水晶×1" }
        ],
        shop: [
            { item: "水纹衣", cost: 200 },
            { item: "水遁符", cost: 130 },
            { item: "速行丹", cost: 70 },
            { item: "水玉露", cost: 50 }
        ],
        dialogs: [
            "道友，要不要来喝一杯我泡的灵茶？",
            "我是水月宫弟子，擅长幻术与疗伤！",
            "我可以赠送灵茶给你！"
        ]
    },
    {
        id: "shui-yao",
        name: "水瑶",
        sect: "水月宫",
        character: "孤僻中立",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "清理水下妖兽", contribution: 45 }
        ],
        shop: [
            { item: "水行步法", cost: 130 },
            { item: "碧水幻术", cost: 880 }
        ],
        dialogs: [
            "此处是我的修炼之地，请勿打扰。",
            "我是水月宫内门弟子，擅长水战与隐匿！",
            "我可以允许你在附近修炼！"
        ]
    },
    {
        id: "liu-rumei",
        name: "柳如眉",
        sect: "水月宫",
        character: "妩媚中立",
        favor: 0,
        relation: "stranger",
        canSteal: true,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "护送商队", contribution: 50 }
        ],
        shop: [
            { item: "幻术符箓", cost: 65 },
            { item: "魅惑小法器", cost: 300 }
        ],
        dialogs: [
            "道友，要不要买一件饰品？戴上能提升灵气哦~",
            "我是无门派散修，擅长幻术与魅惑！",
            "我可以用魅惑术帮你提升少量修为！"
        ]
    },
    {
        id: "bing-ji",
        name: "冰姬",
        sect: "水月宫",
        character: "高冷特殊",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "冰殿试炼", contribution: 90 }
        ],
        shop: [
            { item: "寒水甲", cost: 850 },
            { item: "水魄珠碎片", cost: 2000 }
        ],
        dialogs: [
            "此处禁止入内，速速离开。",
            "我是水月宫长老弟子，擅长冰系攻击与幻术！",
            "我可以允许你在附近修炼！"
        ]
    },
    {
        id: "su-lianer",
        name: "苏怜儿",
        sect: "水月宫",
        character: "伪装反派",
        favor: 0,
        relation: "stranger",
        canSteal: true,
        canAttack: true,
        canMarry: false,
        canSworn: false,
        tasks: [
            { name: "偷取莲台碎片（黑任务）", contribution: 120 }
        ],
        shop: [
            { item: "毒药", cost: 400 },
            { item: "水系阴符", cost: 300 }
        ],
        dialogs: [
            "道友，求你帮帮我，我被妖兽所伤…",
            "我是无门派邪修，擅长伪装与偷窃！",
            "小心我趁你帮忙时偷取你宝物！"
        ]
    },
    {
        id: "ling-xi",
        name: "灵汐",
        sect: "水月宫",
        character: "锦鲤精特殊",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "寻找锦鲤鳞片", contribution: 25 },
            { name: "水下寻宝", contribution: 40 }
        ],
        shop: [
            { item: "水下呼吸BUFF", cost: 100 },
            { item: "幸运加成", cost: 180 }
        ],
        dialogs: [
            "道友，道友，我知道水下有宝物，要不要一起去挖？",
            "我是水月宫灵宠化形（锦鲤精），活泼好动！",
            "我可以带你寻找水下小宝物！"
        ]
    },

    // ========== 炎火殿 ==========
    {
        id: "zhao-yan",
        name: "赵炎",
        sect: "炎火殿",
        character: "冲动中立",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: true,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "斩杀火蜥蜴", contribution: 40, reward: "火灵粉×1" },
            { name: "每日看守炉鼎", contribution: 20, daily: true }
        ],
        shop: [
            { item: "火纹衣", cost: 200 },
            { item: "火焰刀", cost: 250 },
            { item: "焚心丹", cost: 120 },
            { item: "火灵粉", cost: 50 }
        ],
        dialogs: [
            "喂，你就是新来的？敢不敢跟我切磋一下？",
            "我是炎火殿外门弟子，性格冲动！",
            "我可以邀请你一起淬炼矿石！"
        ]
    },
    {
        id: "huo-lan",
        name: "火岚",
        sect: "炎火殿",
        character: "温和友善",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "添加炉鼎燃料", contribution: 25 },
            { name: "清理炉鼎残渣", contribution: 35 }
        ],
        shop: [
            { item: "低阶火系功法", cost: 120 },
            { item: "火系符箓", cost: 55 }
        ],
        dialogs: [
            "道友，来炎火殿做客吗？",
            "我是炎火殿弟子，性格温和友善！",
            "我可以帮你添加炉鼎燃料！"
        ]
    },
    {
        id: "huo-tu",
        name: "火屠",
        sect: "炎火殿",
        character: "沉稳中立",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "淬炼矿石", contribution: 50 }
        ],
        shop: [
            { item: "火焰法器", cost: 500 },
            { item: "火魂石", cost: 800 }
        ],
        dialogs: [
            "道友，来淬炼矿石吗？",
            "我是炎火殿弟子，性格沉稳！",
            "我可以邀请你一起淬炼矿石！"
        ]
    },
    {
        id: "huo-er",
        name: "火儿",
        sect: "炎火殿",
        character: "火凰特殊",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "寻找火焰晶", contribution: 30 }
        ],
        shop: [
            { item: "火焰抗性BUFF", cost: 120 },
            { item: "小火灵助阵", cost: 300 }
        ],
        dialogs: [
            "道友，道友，给我灵果吃好不好？我给你暖手~",
            "我是炎火殿灵宠化形（火凤凰幼崽），活泼爱撒娇！",
            "我可以用火焰为你暖手！"
        ]
    },
    {
        id: "chi-lian",
        name: "赤练",
        sect: "炎火殿",
        character: "毒辣反派",
        favor: 0,
        relation: "stranger",
        canSteal: true,
        canAttack: true,
        canMarry: false,
        canSworn: false,
        tasks: [
            { name: "烧毁药田（黑任务）", contribution: 110 }
        ],
        shop: [
            { item: "焚焰毒", cost: 500 },
            { item: "火系禁术", cost: 800 }
        ],
        dialogs: [
            "哟，又来了一个送宝物的？",
            "我是炎火殿叛逆弟子，性格阴险狡诈！",
            "小心我主动攻击你，偷取你宝物！"
        ]
    },
    {
        id: "fen-xin",
        name: "焚心",
        sect: "炎火殿",
        character: "狂战士特殊",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: true,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "挑战火焰妖兽", contribution: 80 }
        ],
        shop: [
            { item: "爆发火系攻击符", cost: 150 }
        ],
        dialogs: [
            "来战！来战！",
            "我是炎火殿弟子，狂战士！",
            "我可以邀请你一起挑战火焰妖兽！"
        ]
    },

    // ========== 皇土阁 ==========
    {
        id: "shi-jian",
        name: "石坚",
        sect: "皇土阁",
        character: "憨厚友善",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "修城墙", contribution: 20 },
            { name: "杀石傀儡", contribution: 40 }
        ],
        shop: [
            { item: "石甲", cost: 200 },
            { item: "玄铁棍", cost: 250 },
            { item: "固元丹", cost: 120 },
            { item: "土灵膏", cost: 50 }
        ],
        dialogs: [
            "道友，来皇土阁做客吗？我带你去见执事。",
            "我是皇土阁弟子，擅长防御阵法！",
            "我可以帮你搬运重物！"
        ]
    },
    {
        id: "shi-qingyao",
        name: "石清瑶",
        sect: "皇土阁",
        character: "温婉友善",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "布置土盾阵", contribution: 50 }
        ],
        shop: [
            { item: "阵图", cost: 300 },
            { item: "土魄晶", cost: 800 }
        ],
        dialogs: [
            "道友，来布置土盾阵吗？",
            "我是皇土阁弟子，性格温婉友善！",
            "我可以帮你布置土盾阵！"
        ]
    },
    {
        id: "wang-lei",
        name: "王磊",
        sect: "皇土阁",
        character: "贪小中立",
        favor: 0,
        relation: "stranger",
        canSteal: true,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "挖矿×10", contribution: 30 }
        ],
        shop: [
            { item: "玄黄石", cost: 80 },
            { item: "土系防御符", cost: 60 }
        ],
        dialogs: [
            "道友，来挖矿吗？我知道哪里有好矿石。",
            "我是皇土阁外门石徒，擅长矿石开采！",
            "我可以分享矿石位置给你！"
        ]
    },
    {
        id: "tie-niu",
        name: "铁牛",
        sect: "皇土阁",
        character: "耿直特殊",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: true,
        canSworn: true,
        tasks: [
            { name: "搬巨石", contribution: 35 },
            { name: "加固大阵", contribution: 60 }
        ],
        shop: [
            { item: "磐石丹", cost: 150 },
            { item: "大地棍", cost: 300 }
        ],
        dialogs: [
            "道友，要不要帮忙？我力气大！",
            "我是皇土阁内门弟子，性格耿直，力气极大！",
            "我可以帮你搬运巨石！"
        ]
    },
    {
        id: "tu-lang",
        name: "土狼",
        sect: "皇土阁",
        character: "贪婪反派",
        favor: 0,
        relation: "stranger",
        canSteal: true,
        canAttack: true,
        canMarry: false,
        canSworn: false,
        tasks: [
            { name: "盗挖矿脉（黑任务）", contribution: 100 }
        ],
        shop: [
            { item: "土系偷袭法器", cost: 450 }
        ],
        dialogs: [
            "道友，你身上有灵石吗？交出来，不然我不客气！",
            "我是皇土阁外门叛徒，性格贪婪残暴！",
            "小心我主动攻击你，偷取你矿石与灵石！"
        ]
    },
    {
        id: "yao-lao",
        name: "药老",
        sect: "皇土阁",
        character: "慈祥特殊",
        favor: 0,
        relation: "stranger",
        canSteal: false,
        canAttack: false,
        canMarry: false,
        canSworn: true,
        tasks: [
            { name: "寻找炼丹材料", contribution: 70 }
        ],
        shop: [
            { item: "高阶疗伤丹", cost: 300 },
            { item: "突破固元丹", cost: 500 }
        ],
        dialogs: [
            "道友，来寻丹药吗？我这里有一些基础丹药。",
            "我是无门派炼丹大师，痴迷炼丹！",
            "我可以赠送基础丹药给你！"
        ]
    }
];
