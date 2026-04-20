const GAME_DATA = {
    TIME_SYSTEM: {
        hour: 6,
        day: 1,
        month: 1,
        year: 1,
        season: 'spring',
        isDay: true
    },
    
    SEASONS: {
        'spring': { name: '春季', effects: { herbBonus: 2.0, growthBonus: 1.5 } },
        'summer': { name: '夏季', effects: { fireBonus: 1.5, waterPenalty: 0.8 } },
        'autumn': { name: '秋季', effects: { harvestBonus: 2.0, metalBonus: 1.5 } },
        'winter': { name: '冬季', effects: { iceBonus: 2.0, movementPenalty: 0.7 } }
    },
    
    WORLD_LAYERS: {
        'mortal': {
            name: '凡人界',
            regions: {
                'central-plains': {
                    id: 'central-plains',
                    name: '中原修真区域',
                    description: '修真界的核心区域，五大宗门汇聚',
                    color: '#f59e0b',
                    subregions: ['qinghe-town', 'jinyang-mountain', 'qingmu-forest', 'shuiyue-lake', 'yanhuo-mountain', 'huangtu-plateau']
                },
                'southern-wilderness': {
                    id: 'southern-wilderness',
                    name: '南疆蛮荒区域',
                    description: '毒虫密布，巫蛊盛行，充满神秘',
                    color: '#22c55e',
                    subregions: ['poison-valley', 'wu-village', 'ancient-temple', 'mysterious-cave']
                },
                'eastern-sea': {
                    id: 'eastern-sea',
                    name: '东海仙岛区域',
                    description: '岛屿林立，海族众多，藏有无数宝藏',
                    color: '#3b82f6',
                    subregions: ['dragon-palace', 'pearl-island', 'storm-reef', 'fairy-cave']
                },
                'northern-snowfield': {
                    id: 'northern-snowfield',
                    name: '北境雪原区域',
                    description: '终年积雪，寒风刺骨，冰灵修士圣地',
                    color: '#06b6d4',
                    subregions: ['ice-palace', 'snow-mountain', 'frozen-lake', 'ancient-tomb']
                },
                'western-desert': {
                    id: 'western-desert',
                    name: '西漠沙海区域',
                    description: '沙漠无垠，古遗迹众多，佛修聚集',
                    color: '#a16207',
                    subregions: ['ancient-city', 'oasis', 'sand-temple', 'hidden-tomb']
                }
            }
        },
        'cultivation': {
            name: '修真界',
            locked: true,
            regions: {}
        },
        'spirit': {
            name: '灵界',
            locked: true,
            regions: {}
        },
        'immortal': {
            name: '仙界',
            locked: true,
            regions: {}
        },
        'demon': {
            name: '魔界',
            locked: true,
            regions: {}
        },
        'nether': {
            name: '冥界',
            locked: true,
            regions: {}
        }
    },
    
    REALMS: [
        // 炼气期前期 1-10层
        { name: '炼气期前期1层', level: 1, cultivationNeeded: 100, mp: 50, hp: 100, attack: 20, defense: 15, demonDifficulty: 0.5, features: ['基础普攻', '采集基础药材矿石', '购买基础道具'] },
        { name: '炼气期前期2层', level: 2, cultivationNeeded: 200, mp: 70, hp: 120, attack: 25, defense: 18, demonDifficulty: 0.5, features: [] },
        { name: '炼气期前期3层', level: 3, cultivationNeeded: 350, mp: 90, hp: 140, attack: 30, defense: 21, demonDifficulty: 0.5, features: [] },
        { name: '炼气期前期4层', level: 4, cultivationNeeded: 550, mp: 110, hp: 160, attack: 35, defense: 24, demonDifficulty: 0.5, features: [] },
        { name: '炼气期前期5层', level: 5, cultivationNeeded: 800, mp: 130, hp: 180, attack: 40, defense: 27, demonDifficulty: 0.5, features: [] },
        { name: '炼气期前期6层', level: 6, cultivationNeeded: 1100, mp: 150, hp: 200, attack: 45, defense: 30, demonDifficulty: 0.5, features: [] },
        { name: '炼气期前期7层', level: 7, cultivationNeeded: 1450, mp: 170, hp: 220, attack: 50, defense: 33, demonDifficulty: 0.5, features: [] },
        { name: '炼气期前期8层', level: 8, cultivationNeeded: 1850, mp: 190, hp: 240, attack: 55, defense: 36, demonDifficulty: 0.5, features: [] },
        { name: '炼气期前期9层', level: 9, cultivationNeeded: 2300, mp: 210, hp: 260, attack: 60, defense: 39, demonDifficulty: 0.5, features: [] },
        { name: '炼气期前期10层', level: 10, cultivationNeeded: 3000, mp: 250, hp: 300, attack: 70, defense: 45, demonDifficulty: 1.0, features: ['学习1种基础属性功法'], breakthroughItems: ['筑基丹'] },
        // 炼气期中期 11-20层
        { name: '炼气期中期1层', level: 11, cultivationNeeded: 3500, mp: 280, hp: 340, attack: 80, defense: 50, demonDifficulty: 1.0, features: [] },
        { name: '炼气期中期2层', level: 12, cultivationNeeded: 4200, mp: 310, hp: 380, attack: 90, defense: 55, demonDifficulty: 1.0, features: [] },
        { name: '炼气期中期3层', level: 13, cultivationNeeded: 5000, mp: 340, hp: 420, attack: 100, defense: 60, demonDifficulty: 1.0, features: [] },
        { name: '炼气期中期4层', level: 14, cultivationNeeded: 6000, mp: 370, hp: 460, attack: 110, defense: 65, demonDifficulty: 1.0, features: [] },
        { name: '炼气期中期5层', level: 15, cultivationNeeded: 7200, mp: 400, hp: 500, attack: 120, defense: 70, demonDifficulty: 1.0, features: [] },
        { name: '炼气期中期6层', level: 16, cultivationNeeded: 8500, mp: 430, hp: 540, attack: 130, defense: 75, demonDifficulty: 1.0, features: [] },
        { name: '炼气期中期7层', level: 17, cultivationNeeded: 10000, mp: 460, hp: 570, attack: 140, defense: 85, demonDifficulty: 1.0, features: [] },
        { name: '炼气期中期8层', level: 18, cultivationNeeded: 11500, mp: 480, hp: 590, attack: 150, defense: 95, demonDifficulty: 1.0, features: [] },
        { name: '炼气期中期9层', level: 19, cultivationNeeded: 13000, mp: 490, hp: 595, attack: 155, defense: 98, demonDifficulty: 1.0, features: [] },
        { name: '炼气期中期10层', level: 20, cultivationNeeded: 15000, mp: 500, hp: 600, attack: 160, defense: 100, demonDifficulty: 1.2, features: ['可偷师基础功法(30%)'], breakthroughItems: ['筑基丹'] },
        // 炼气期后期 21-30层
        { name: '炼气期后期1层', level: 21, cultivationNeeded: 17000, mp: 550, hp: 700, attack: 180, defense: 110, demonDifficulty: 1.3, features: [] },
        { name: '炼气期后期2层', level: 22, cultivationNeeded: 19500, mp: 620, hp: 800, attack: 200, defense: 120, demonDifficulty: 1.3, features: [] },
        { name: '炼气期后期3层', level: 23, cultivationNeeded: 22000, mp: 700, hp: 900, attack: 220, defense: 130, demonDifficulty: 1.4, features: [] },
        { name: '炼气期后期4层', level: 24, cultivationNeeded: 24500, mp: 800, hp: 1000, attack: 240, defense: 140, demonDifficulty: 1.4, features: [] },
        { name: '炼气期后期5层', level: 25, cultivationNeeded: 27000, mp: 900, hp: 1100, attack: 260, defense: 150, demonDifficulty: 1.5, features: [] },
        { name: '炼气期后期6层', level: 26, cultivationNeeded: 29500, mp: 1000, hp: 1200, attack: 280, defense: 160, demonDifficulty: 1.5, features: [] },
        { name: '炼气期后期7层', level: 27, cultivationNeeded: 32000, mp: 1050, hp: 1300, attack: 300, defense: 180, demonDifficulty: 1.5, features: [] },
        { name: '炼气期后期8层', level: 28, cultivationNeeded: 34500, mp: 1100, hp: 1400, attack: 330, defense: 200, demonDifficulty: 1.5, features: ['学习第2种基础属性功法'] },
        { name: '炼气期后期9层', level: 29, cultivationNeeded: 37000, mp: 1150, hp: 1450, attack: 370, defense: 230, demonDifficulty: 1.5, features: [] },
        { name: '炼气期后期10层', level: 30, cultivationNeeded: 40000, mp: 1200, hp: 1500, attack: 400, defense: 250, demonDifficulty: 1.5, features: ['申请加入基础门派'], breakthroughItems: ['筑基丹'] },
        // 筑基期前期 31-40层
        { name: '筑基期前期1层', level: 31, cultivationNeeded: 44000, mp: 140, hp: 180, attack: 45, defense: 28, demonDifficulty: 1.6, features: [] },
        { name: '筑基期前期2层', level: 32, cultivationNeeded: 48000, mp: 160, hp: 210, attack: 50, defense: 31, demonDifficulty: 1.7, features: [] },
        { name: '筑基期前期3层', level: 33, cultivationNeeded: 52000, mp: 180, hp: 240, attack: 56, defense: 34, demonDifficulty: 1.7, features: [] },
        { name: '筑基期前期4层', level: 34, cultivationNeeded: 56000, mp: 200, hp: 270, attack: 63, defense: 37, demonDifficulty: 1.8, features: [] },
        { name: '筑基期前期5层', level: 35, cultivationNeeded: 60000, mp: 220, hp: 300, attack: 70, defense: 40, demonDifficulty: 1.8, features: [] },
        { name: '筑基期前期6层', level: 36, cultivationNeeded: 64500, mp: 240, hp: 330, attack: 78, defense: 43, demonDifficulty: 1.8, features: [] },
        { name: '筑基期前期7层', level: 37, cultivationNeeded: 69000, mp: 260, hp: 360, attack: 86, defense: 47, demonDifficulty: 1.8, features: [] },
        { name: '筑基期前期8层', level: 38, cultivationNeeded: 73500, mp: 280, hp: 380, attack: 93, defense: 55, demonDifficulty: 1.8, features: [] },
        { name: '筑基期前期9层', level: 39, cultivationNeeded: 78000, mp: 290, hp: 390, attack: 97, defense: 59, demonDifficulty: 1.8, features: [] },
        { name: '筑基期前期10层', level: 40, cultivationNeeded: 82500, mp: 300, hp: 400, attack: 100, defense: 62, demonDifficulty: 1.8, features: [], breakthroughItems: ['金丹突破丹', '金灵珠', '地灵宝', '金丹玉'] },
        // 筑基期中期 41-50层
        { name: '筑基期中期1层', level: 41, cultivationNeeded: 88000, mp: 350, hp: 450, attack: 110, defense: 70, demonDifficulty: 1.9, features: [] },
        { name: '筑基期中期2层', level: 42, cultivationNeeded: 93500, mp: 400, hp: 500, attack: 120, defense: 78, demonDifficulty: 2.0, features: [] },
        { name: '筑基期中期3层', level: 43, cultivationNeeded: 99000, mp: 450, hp: 550, attack: 135, defense: 86, demonDifficulty: 2.1, features: [] },
        { name: '筑基期中期4层', level: 44, cultivationNeeded: 104500, mp: 500, hp: 600, attack: 150, defense: 94, demonDifficulty: 2.1, features: [] },
        { name: '筑基期中期5层', level: 45, cultivationNeeded: 110000, mp: 550, hp: 700, attack: 165, defense: 102, demonDifficulty: 2.2, features: [] },
        { name: '筑基期中期6层', level: 46, cultivationNeeded: 115500, mp: 600, hp: 800, attack: 180, defense: 110, demonDifficulty: 2.2, features: [] },
        { name: '筑基期中期7层', level: 47, cultivationNeeded: 121000, mp: 630, hp: 850, attack: 195, defense: 120, demonDifficulty: 2.2, features: [] },
        { name: '筑基期中期8层', level: 48, cultivationNeeded: 126500, mp: 660, hp: 900, attack: 210, defense: 130, demonDifficulty: 2.2, features: [] },
        { name: '筑基期中期9层', level: 49, cultivationNeeded: 132000, mp: 680, hp: 950, attack: 230, defense: 140, demonDifficulty: 2.2, features: [] },
        { name: '筑基期中期10层', level: 50, cultivationNeeded: 137500, mp: 700, hp: 1000, attack: 250, defense: 156, demonDifficulty: 2.2, features: ['修炼中阶功法', '学习基础生活职业', '进入低阶野外'], breakthroughItems: ['金丹突破丹', '金灵珠', '地灵宝', '金丹玉'] },
        // 筑基期后期 51-60层
        { name: '筑基期后期1层', level: 51, cultivationNeeded: 143000, mp: 1500, hp: 2500, attack: 325, defense: 190, demonDifficulty: 2.6, features: [] },
        { name: '筑基期后期2层', level: 52, cultivationNeeded: 148500, mp: 1800, hp: 3000, attack: 375, defense: 234, demonDifficulty: 2.7, features: [] },
        { name: '筑基期后期3层', level: 53, cultivationNeeded: 154000, mp: 2100, hp: 3500, attack: 437, defense: 273, demonDifficulty: 2.8, features: [] },
        { name: '筑基期后期4层', level: 54, cultivationNeeded: 159500, mp: 3500, hp: 6000, attack: 781, defense: 487, demonDifficulty: 3.0, features: [] },
        { name: '筑基期后期5层', level: 55, cultivationNeeded: 165000, mp: 4200, hp: 7200, attack: 937, defense: 585, demonDifficulty: 3.1, features: [] },
        { name: '筑基期后期6层', level: 56, cultivationNeeded: 170500, mp: 4900, hp: 8400, attack: 1093, defense: 682, demonDifficulty: 3.2, features: [] },
        { name: '筑基期后期7层', level: 57, cultivationNeeded: 176000, mp: 8000, hp: 15000, attack: 1952, defense: 1218, demonDifficulty: 3.5, features: [] },
        { name: '筑基期后期8层', level: 58, cultivationNeeded: 181500, mp: 9000, hp: 17000, attack: 2245, defense: 1390, demonDifficulty: 3.6, features: [] },
        { name: '筑基期后期9层', level: 59, cultivationNeeded: 187000, mp: 10000, hp: 19000, attack: 2537, defense: 1562, demonDifficulty: 3.7, features: [] },
        { name: '筑基期后期10层', level: 60, cultivationNeeded: 192500, mp: 12000, hp: 22000, attack: 3045, defense: 1874, demonDifficulty: 4.0, features: ['炼丹炼器基础级', '加入中高阶门派', '开启个人洞府', '偷师中阶功法'], breakthroughItems: ['金丹突破丹', '金灵珠', '地灵宝', '金丹玉'] },
        // 金丹期及以上境界类似扩展，这里省略...
        { name: '金丹期前期1层', level: 61, cultivationNeeded: 750000, mp: 15000, hp: 25000, attack: 3806, defense: 2342, demonDifficulty: 4.5, features: [], breakthroughItems: ['元婴突破丹', '火灵晶', '魂珠', '元婴果'] },
        // 元婴期突破到化神期
        { name: '元婴期后期10层', level: 120, cultivationNeeded: 6250000, mp: 100000, hp: 200000, attack: 25000, defense: 15000, demonDifficulty: 8.0, features: ['掌握高阶功法', '开启领域', '感悟法则'], breakthroughItems: ['化神突破丹', '冰灵髓', '雷灵珠', '化神草'] },
        // 化神期突破到渡劫期
        { name: '化神期后期10层', level: 180, cultivationNeeded: 62500000, mp: 500000, hp: 1000000, attack: 125000, defense: 75000, demonDifficulty: 15.0, features: ['掌握法则', '开辟小世界', '准备渡劫'], breakthroughItems: ['渡劫突破丹', '星空石', '混沌结晶', '渡劫莲'] }
    ],
    
    REALM_POWER: {
        '炼气期': {
            minHp: 50,
            maxHp: 200,
            minAttack: 5,
            maxAttack: 20,
            minDefense: 1,
            maxDefense: 3
        },
        '筑基期': {
            minHp: 200,
            maxHp: 800,
            minAttack: 20,
            maxAttack: 50,
            minDefense: 3,
            maxDefense: 8
        },
        '金丹期': {
            minHp: 800,
            maxHp: 3000,
            minAttack: 50,
            maxAttack: 150,
            minDefense: 8,
            maxDefense: 20
        },
        '元婴期': {
            minHp: 3000,
            maxHp: 10000,
            minAttack: 150,
            maxAttack: 400,
            minDefense: 20,
            maxDefense: 50
        },
        '化神期': {
            minHp: 10000,
            maxHp: 30000,
            minAttack: 400,
            maxAttack: 1000,
            minDefense: 50,
            maxDefense: 100
        }
    },

    LINGEN_TYPES: [
        { 
            name: '五灵根', 
            element: 'penta', 
            color: '#374151', 
            bonus: 1.0, 
            grade: '废品杂灵根',
            description: '修炼速度大幅降低，全属性亲和度低，但可兼容所有属性功法，适配阵法、炼体、生活职业等多元玩法',
            features: ['全属性兼容', '阵法适配', '生活职业加成'],
            compatibleSects: ['metal', 'wood', 'water', 'fire', 'earth']
        },
        { 
            name: '四灵根', 
            element: 'quadruple', 
            color: '#6b7280', 
            bonus: 1.5, 
            grade: '凡品四灵根',
            description: '修炼速度偏低，可适配多属性基础功法，容错率高，适合新手',
            features: ['多属性基础功法适配', '容错率高'],
            compatibleSects: ['metal', 'wood', 'water', 'fire', 'earth']
        },
        { 
            name: '三灵根', 
            element: 'triple', 
            color: '#f59e0b', 
            bonus: 2.5, 
            grade: '良品三灵根',
            description: '修炼速度中等，主流修士灵根，可加入大部分门派，兼顾修炼效率和玩法多样性',
            features: ['主流修士', '可加入大部分门派'],
            compatibleSects: ['metal', 'wood', 'water', 'fire', 'earth']
        },
        { 
            name: '双灵根', 
            element: 'dual', 
            color: '#0ea5e9', 
            bonus: 4.0, 
            grade: '优品双灵根',
            description: '修炼速度快，属性亲和度高，门派核心弟子首选',
            features: ['高速修炼', '属性亲和度高', '门派核心弟子'],
            compatibleSects: ['metal', 'wood', 'water', 'fire', 'earth']
        },
        { 
            name: '金灵根', 
            element: 'metal', 
            color: '#c0c0c0', 
            bonus: 5.0, 
            grade: '极品天灵根',
            description: '单属性灵根，修炼速度拉满，金系功法效果翻倍，正道顶级门派争抢，但无法修炼其他属性功法',
            features: ['修炼速度拉满', '金系功法效果翻倍', '无法修炼其他属性'],
            compatibleSects: ['metal']
        },
        { 
            name: '木灵根', 
            element: 'wood', 
            color: '#22c55e', 
            bonus: 5.0, 
            grade: '极品天灵根',
            description: '单属性灵根，修炼速度拉满，木系功法效果翻倍，正道顶级门派争抢，但无法修炼其他属性功法',
            features: ['修炼速度拉满', '木系功法效果翻倍', '无法修炼其他属性'],
            compatibleSects: ['wood']
        },
        { 
            name: '水灵根', 
            element: 'water', 
            color: '#3b82f6', 
            bonus: 5.0, 
            grade: '极品天灵根',
            description: '单属性灵根，修炼速度拉满，水系功法效果翻倍，正道顶级门派争抢，但无法修炼其他属性功法',
            features: ['修炼速度拉满', '水系功法效果翻倍', '无法修炼其他属性'],
            compatibleSects: ['water']
        },
        { 
            name: '火灵根', 
            element: 'fire', 
            color: '#ef4444', 
            bonus: 5.0, 
            grade: '极品天灵根',
            description: '单属性灵根，修炼速度拉满，火系功法效果翻倍，正道顶级门派争抢，但无法修炼其他属性功法',
            features: ['修炼速度拉满', '火系功法效果翻倍', '无法修炼其他属性'],
            compatibleSects: ['fire']
        },
        { 
            name: '土灵根', 
            element: 'earth', 
            color: '#a16207', 
            bonus: 5.0, 
            grade: '极品天灵根',
            description: '单属性灵根，修炼速度拉满，土系功法效果翻倍，正道顶级门派争抢，但无法修炼其他属性功法',
            features: ['修炼速度拉满', '土系功法效果翻倍', '无法修炼其他属性'],
            compatibleSects: ['earth']
        },
        { 
            name: '先天雷灵根', 
            element: 'thunder', 
            color: '#8b5cf6', 
            bonus: 4.5, 
            grade: '神品变异灵根',
            description: '变异的水火灵根，高速+战斗控制，突破风险中等，战斗玩家首选，可加入水系或火系门派，拥有雷系专属神通',
            features: ['高速修炼', '战斗控制', '雷系专属神通'],
            compatibleSects: ['water', 'fire']
        },
        { 
            name: '先天冰灵根', 
            element: 'ice', 
            color: '#06b6d4', 
            bonus: 4.2, 
            grade: '神品变异灵根',
            description: '变异的水灵根，中高速+炼丹辅助，灵活性高，双修玩家适配，可加入水系门派，拥有冰系专属神通',
            features: ['中高速修炼', '炼丹辅助', '冰系专属神通'],
            compatibleSects: ['water']
        },
        { 
            name: '先天空间灵根', 
            element: 'space', 
            color: '#a855f7', 
            bonus: 3.5, 
            grade: '神品变异灵根',
            description: '中速+探索优势，散修专属，生存能力强，拥有空间专属神通',
            features: ['中速修炼', '探索优势', '空间专属神通'],
            compatibleSects: ['metal', 'wood', 'water', 'fire', 'earth']
        },
        { 
            name: '先天百草灵根', 
            element: 'herb', 
            color: '#84cc16', 
            bonus: 2.0, 
            grade: '神品变异灵根',
            description: '变异的木灵根，中低速+炼丹天花板，靠生活职业逆袭，无需高强度修炼，可加入木系门派，拥有百草专属神通',
            features: ['中低速修炼', '炼丹天花板', '百草专属神通'],
            compatibleSects: ['wood']
        },
        { 
            name: '先天金石灵根', 
            element: 'goldstone', 
            color: '#eab308', 
            bonus: 2.2, 
            grade: '神品变异灵根',
            description: '变异的木土灵根，中低速+炼器优势，防御高，战斗+经营双适配，可加入木系或土系门派，拥有金石专属神通',
            features: ['中低速修炼', '炼器优势', '金石专属神通'],
            compatibleSects: ['wood', 'earth']
        },
        { 
            name: '先天剑骨', 
            element: 'sword', 
            color: '#f43f5e', 
            bonus: 4.8, 
            grade: '神品变异灵根',
            description: '变异的金灵根，近满速+剑修天花板，突破风险最高，纯战斗高玩专属，只可加入金系门派，拥有剑修专属神通',
            features: ['近满速修炼', '剑修天花板', '剑修专属神通'],
            compatibleSects: ['metal']
        },
        { 
            name: '混沌灵根', 
            element: 'chaos', 
            color: '#ec4899', 
            bonus: 6.0, 
            grade: '神品变异灵根',
            description: '传说中的灵根，修炼速度最快，可兼容所有属性，拥有混沌专属神通',
            features: ['传说灵根', '修炼速度最快', '全属性兼容', '混沌专属神通'],
            compatibleSects: ['metal', 'wood', 'water', 'fire', 'earth']
        }
    ],

    BIRTH_OPTIONS: [
        {
            id: 'peasant',
            name: '凡俗农家',
            description: '生于普通农家，身无长物，但吃苦耐劳',
            type: 'basic',
            bonus: { hp: 20, stamina: 10 },
            items: ['粗布衣服', '干粮']
        },
        {
            id: 'scholar',
            name: '书香门第',
            description: '生于读书人家，博览群书，悟性较高',
            type: 'basic',
            bonus: { wisdom: 15, cultivation: 50 },
            items: ['笔墨纸砚', '古籍']
        },
        {
            id: 'merchant',
            name: '市井小贩',
            description: '生于小商之家，有些余财，见多识广',
            type: 'basic',
            bonus: { gold: 100, luck: 5 },
            items: ['丝绸衣服', '银两']
        },
        {
            id: 'orphan',
            name: '孤儿流民',
            description: '自幼父母双亡，流浪街头，机警过人',
            type: 'basic',
            bonus: { agility: 15, stealth: 10 },
            items: ['破旧匕首', '乞讨碗']
        },
        {
            id: 'warrior',
            name: '武夫世家',
            description: '生于武夫家族，自幼习武，体魄强健',
            type: 'basic',
            bonus: { attack: 10, defense: 5 },
            items: ['破旧铁剑', '护心镜']
        },
        {
            id: 'cultivator',
            name: '修仙世家',
            description: '生于修仙家族，从小接触道法',
            type: 'unlock',
            unlockCondition: 'reincarnation-5',
            bonus: { mp: 30, spirit: 10 },
            items: ['家族法器', '基础功法']
        },
        {
            id: 'sanxiu',
            name: '散修遗孤',
            description: '散修后人，父母留下一些残缺功法',
            type: 'unlock',
            unlockCondition: 'reincarnation-10',
            bonus: { cultivation: 100, wisdom: 5 },
            items: ['残缺功法', '低级灵石']
        },
        {
            id: 'prince',
            name: '王朝皇子',
            description: '王朝皇室子弟，天生贵气，人脉广博',
            type: 'unlock',
            unlockCondition: 'reincarnation-15',
            bonus: { gold: 500, charm: 20 },
            items: ['皇室玉佩', '皇室功法残卷']
        },
        {
            id: 'servant',
            name: '宗门杂役',
            description: '曾在仙门做杂役，了解修仙界',
            type: 'unlock',
            unlockCondition: 'reincarnation-20',
            bonus: { mp: 20, wisdom: 10 },
            items: ['杂役腰牌', '入门手册']
        },
        {
            id: 'hermit',
            name: '隐世门派后人',
            description: '隐世门派传承，掌握特殊功法',
            type: 'unlock',
            unlockCondition: 'ascend-1',
            bonus: { wisdom: 20, spirit: 15 },
            items: ['隐世信物', '特殊功法残卷']
        },
        {
            id: 'tycoon',
            name: '商贾巨富之子',
            description: '生于巨富之家，财富惊人',
            type: 'unlock',
            unlockCondition: 'reincarnation-25',
            bonus: { gold: 2000, luck: 10 },
            items: ['传家宝玉', '大量银两']
        }
    ],

    NATIVE_PLACES: [
        {
            id: 'qinghe',
            name: '青河镇',
            description: '平凡小镇，修仙者梦想起点',
            startMap: 'newbie-village',
            eventPool: 'common'
        },
        {
            id: 'mountain',
            name: '大山深处',
            description: '隐居山林，常有奇遇',
            startMap: 'qinghe-forest',
            eventPool: 'adventure'
        },
        {
            id: 'seaside',
            name: '东海之滨',
            description: '海边渔村，海产丰富',
            startMap: 'qinghe-town',
            eventPool: 'sea'
        },
        {
            id: 'desert',
            name: '西漠边缘',
            description: '沙漠边缘，藏有古遗迹',
            startMap: 'mountain-path',
            eventPool: 'desert'
        }
    ],

    PERSONALITIES: [
        {
            id: 'kind',
            name: '善良',
            description: '心地善良，NPC初始好感+20%，更容易获得帮助',
            bonus: { npcFavor: 20 },
            eventBonus: 'kind'
        },
        {
            id: 'cunning',
            name: '狡诈',
            description: '狡诈多变，偷窃成功率+30%',
            bonus: { stealChance: 30 },
            eventBonus: 'cunning'
        },
        {
            id: 'brave',
            name: '勇敢',
            description: '勇敢无畏，战斗伤害+15%',
            bonus: { combatDamage: 15 },
            eventBonus: 'brave'
        },
        {
            id: 'cautious',
            name: '谨慎',
            description: '小心谨慎，防御+20%，突破成功率+10%',
            bonus: { defense: 20, breakthroughBonus: 10 },
            eventBonus: 'cautious'
        },
        {
            id: 'lazy',
            name: '懒散',
            description: '性格懒散，修炼速度-10%，但奇遇概率+20%',
            bonus: { cultivationSpeed: -10, eventChance: 20 },
            eventBonus: 'lazy'
        },
        {
            id: 'greedy',
            name: '贪婪',
            description: '贪婪成性，掉落物品数量+50%，但NPC好感-10%',
            bonus: { dropBonus: 50, npcFavor: -10 },
            eventBonus: 'greedy'
        }
    ],

    REINCARNATION_ACHIEVEMENTS: {
        'reincarnation-1': { name: '初入轮回', description: '完成第1次轮回', requirement: 1, reward: '解锁新称号' },
        'reincarnation-5': { name: '轮回常客', description: '完成5次轮回', requirement: 5, reward: '解锁修仙世家出身' },
        'reincarnation-10': { name: '轮回老手', description: '完成10次轮回', requirement: 10, reward: '解锁散修遗孤出身' },
        'reincarnation-15': { name: '轮回大师', description: '完成15次轮回', requirement: 15, reward: '解锁王朝皇子出身' },
        'reincarnation-20': { name: '轮回宗师', description: '完成20次轮回', requirement: 20, reward: '解锁宗门杂役出身' },
        'reincarnation-25': { name: '轮回传奇', description: '完成25次轮回', requirement: 25, reward: '解锁商贾巨富之子出身' },
        'ascend-1': { name: '飞升成仙', description: '成功渡劫飞升', requirement: 1, reward: '解锁隐世门派后人出身' }
    },

    SECTS: [
        {
            id: 'jinyang',
            name: '金阳门',
            element: 'metal',
            description: '以剑入道，攻击力极强',
            color: '#c0c0c0',
            location: 'jinyang-mountain',
            requiredRealm: '炼气期',
            requiredLingen: ['金灵根'],
            skills: ['金刃击', '金纹护体', '破甲斩', '金罡破', '金骨不屈', '万刃归宗', '庚金裂空', '金銮盾', '乾元金罡印', '先天庚金斩', '万法不侵', '诛仙金刃']
        },
        {
            id: 'qingmu',
            name: '青木宗',
            element: 'wood',
            description: '擅长炼丹和治疗之术',
            color: '#22c55e',
            location: 'qingmu-forest',
            requiredRealm: '炼气期',
            requiredLingen: ['木灵根'],
            skills: ['青藤缚', '枯荣诀', '回春术2', '万木绞杀', '木灵守护', '枯木逢春', '青木领域', '造化生机', '万木长生', '先天乙木咒', '不死藤', '世界树降临']
        },
        {
            id: 'shuiyue',
            name: '水月宫',
            element: 'water',
            description: '功法飘逸，擅长控制',
            color: '#3b82f6',
            location: 'shuiyue-lake',
            requiredRealm: '炼气期',
            requiredLingen: ['水灵根'],
            skills: ['水浪击', '水纹盾', '凝水成冰', '沧澜奔涌', '水镜分身', '四海冰封', '天河倒灌', '沧海壁垒', '玄冥水玉', '先天壬水咒', '水幕天华2', '四海归墟']
        },
        {
            id: 'yanhuo',
            name: '炎火殿',
            element: 'fire',
            description: '霸道异常，攻击力最强',
            color: '#ef4444',
            location: 'yanhuo-volcano',
            requiredRealm: '炼气期',
            requiredLingen: ['火灵根'],
            skills: ['火焰弹', '炎息', '爆炎术', '炎狱冲击', '焚天战意', '炎爆领域', '南明离火', '九阳焚邪', '焚天煮海', '先天丙火咒', '不死炎凰', '焚天灭世']
        },
        {
            id: 'huangtu',
            name: '皇土阁',
            element: 'earth',
            description: '防御无双，稳如泰山',
            color: '#a16207',
            location: 'huangtu-plateau',
            requiredRealm: '炼气期',
            requiredLingen: ['土灵根'],
            skills: ['落石术', '石肤术', '地裂术', '岩山突刺', '大地守护', '五岳镇地', '须弥山印', '后土神躯', '镇岳洪荒', '先天戊土咒', '万劫不磨', '盘古开天']
        }
    ],

    MAPS: {
        'qinghe-town': {
            id: 'qinghe-town',
            name: '青河镇',
            type: 'town',
            description: '一座平凡的小镇，却是无数修仙者梦想开始的地方',
            color: '#f5f0e6',
            connections: ['newbie-village', 'qinghe-forest', 'mountain-path', 'shuiyue-lake', 'wu-village', 'pearl-island', 'snow-mountain', 'oasis'],
            areas: {
                'core': {
                    name: '中心广场',
                    description: '青河镇的中心，人来人往，热闹非凡，各大门派招募使汇聚于此',
                    npcs: ['sect-recruiter-jinyang', 'sect-recruiter-qingmu', 'sect-recruiter-shuiyue', 'sect-recruiter-yanhuo', 'sect-recruiter-huangtu', 'town-mayor', 'sanxiu-master', 'bounty-master']
                },
                'rest': {
                    name: '迎客楼',
                    description: '镇上最大的客栈，可以吃饭休息，恢复气血灵力',
                    npcs: ['innkeeper', 'waiter'],
                    events: ['eat', 'sleep']
                },
                'guide': {
                    name: '镇口',
                    description: '青河镇的入口，有引导新人的老者指点方向',
                    npcs: ['guide-oldman', 'ahe']
                },
                'shops': {
                    name: '商铺区',
                    description: '各种店铺林立，武器店、药店、法宝店一应俱全',
                    npcs: ['weaponsmith', 'pharmacist', 'artifact-dealer']
                },
                'alchemy': {
                    name: '炼丹房',
                    description: '可以在这里炼制各种丹药',
                    events: ['alchemy']
                }
            },
            currentArea: 'core'
        },
        'newbie-village': {
            id: 'newbie-village',
            name: '青岚村',
            type: 'village',
            description: '宁静的山村，最近却频频出现怪事',
            color: '#e8f5e9',
            connections: ['qinghe-town'],
            areas: {
                'wakeup': {
                    name: '小树林',
                    description: '你在这里醒来，身上只有一块残破的玉佩',
                    npcs: ['village-elder', 'ahe']
                },
                'gather': {
                    name: '后山采集点',
                    description: '可以采集一些基础草药和矿石',
                    gatherPoints: ['common-herb', 'stone', 'alchemy-common']
                },
                'fight': {
                    name: '村外草地',
                    description: '有些低级妖兽，适合新手历练',
                    monsters: ['wild-boar', 'sparrow-demon', 'wild-rabbit']
                },
                'guide': {
                    name: '村口',
                    description: '通往青河镇的路，有指引NPC',
                    npcs: ['road-guide', 'wang-hunter', 'blacksmith']
                }
            },
            currentArea: 'wakeup'
        },

        'qinghe-forest': {
            id: 'qinghe-forest',
            name: '清河密林',
            type: 'wild',
            description: '青河镇外的一片密林，隐藏着许多秘密',
            color: '#2d5016',
            connections: ['qinghe-town', 'qingmu-forest'],
            areas: {
                'safe': {
                    name: '林中小径',
                    description: '相对安全的小路，有采药人在此',
                    npcs: ['herb-gatherer', 'forest-guide', 'wang-hunter']
                },
                'gather': {
                    name: '灵药园',
                    description: '生长着各种草药和木果',
                    gatherPoints: ['spirit-grass', 'wood-fruit', 'alchemy-common', 'alchemy-century']
                },
                'fight-low': {
                    name: '外围林地',
                    description: '低等级妖兽出没，适合炼气期弟子',
                    monsters: ['wood-wolf', 'tree-spirit', 'wild-rabbit', 'wild-monster', 'invade']
                },
                'fight-high': {
                    name: '深处',
                    description: '高等级妖兽领地，危险重重',
                    monsters: ['forest-bear', 'ancient-tree-demon', 'miasma-worm', 'shadow-monster', 'shadow-leader', 'elite-monster', 'boss-monster', 'army']
                },
                'rest': {
                    name: '林间小屋',
                    description: '可以休息的地方，偶尔有奇遇',
                    events: ['rest', 'random-event']
                }
            },
            currentArea: 'safe'
        },
        'mountain-path': {
            id: 'mountain-path',
            name: '山路',
            type: 'wild',
            description: '通往各大仙门的必经之路',
            color: '#78716c',
            connections: ['qinghe-town', 'jinyang-mountain', 'huangtu-plateau', 'yanhuo-volcano'],
            areas: {
                'safe': {
                    name: '山腰驿站',
                    description: '供旅人休息的驿站，有行商在此',
                    npcs: ['merchant', 'mountain-guide']
                },
                'gather': {
                    name: '矿石洞',
                    description: '可以采集矿石和金属石',
                    gatherPoints: ['iron-ore', 'metal-stone']
                },
                'fight-low': {
                    name: '山脚',
                    description: '有些山贼和低级妖兽',
                    monsters: ['mountain-bandit', 'rock-golem']
                },
                'fight-high': {
                    name: '山顶',
                    description: '危险区域，高等级妖兽出没',
                    monsters: ['thunder-eagle', 'earth-titan']
                },
                'rest': {
                    name: '观云亭',
                    description: '可以休息的地方，风景优美',
                    events: ['rest']
                }
            },
            currentArea: 'safe'
        },
        'jinyang-mountain': {
            id: 'jinyang-mountain',
            name: '金阳山',
            type: 'sect',
            sect: 'jinyang',
            description: '金阳门的驻地，剑气冲天，银光闪烁',
            color: '#c0c0c0',
            connections: ['mountain-path'],
            areas: {
                'entrance': {
                    name: '山门',
                    description: '金阳门的入口，有守门人把守',
                    npcs: ['jinyang-guard']
                },
                'core': {
                    name: '金阳殿',
                    description: '金阳门的核心区域，门主和长老在此',
                    npcs: ['jinyang-master', 'jinyang-elder', 'jinyang-skill-master']
                },
                'task': {
                    name: '任务堂',
                    description: '接取门派任务的地方',
                    npcs: ['jinyang-task-master']
                },
                'special': {
                    name: '剑冢',
                    description: '金阳门历代祖师埋剑之地，蕴含剑意',
                    events: ['sword-insight']
                },
                'cultivation': {
                    name: '修炼场',
                    description: '弟子们修炼的地方，剑气环绕',
                    events: ['cultivate']
                },
                'fight': {
                    name: '试炼场',
                    description: '弟子们进行战斗试炼的地方',
                    monsters: ['wild-monster', 'elite-monster', 'boss-monster']
                },
                'shop': {
                    name: '炼器阁',
                    description: '门派商店，可购买金系道具',
                    npcs: ['jinyang-shopkeeper', 'jinyang-contribution']
                },
                'world-boss': {
                    name: '金阳山顶',
                    description: '金阳门最高处，有强大的世界BOSS',
                    monsters: ['world-boss-jinyang']
                }
            },
            currentArea: 'entrance'
        },
        'qingmu-forest': {
            id: 'qingmu-forest',
            name: '青木林海',
            type: 'sect',
            sect: 'qingmu',
            description: '青木宗的驻地，生机盎然，绿意葱葱',
            color: '#22c55e',
            connections: ['qinghe-forest'],
            areas: {
                'entrance': {
                    name: '山门',
                    description: '青木宗的入口，有守门人把守',
                    npcs: ['qingmu-guard']
                },
                'core': {
                    name: '青木殿',
                    description: '青木宗的核心区域',
                    npcs: ['qingmu-master', 'qingmu-elder', 'qingmu-skill-master']
                },
                'task': {
                    name: '百草堂',
                    description: '接取任务和兑换丹药的地方',
                    npcs: ['qingmu-task-master', 'qingmu-pharmacist']
                },
                'special': {
                    name: '世界树',
                    description: '青木宗的圣地，蕴含生命之力',
                    events: ['life-insight']
                },
                'cultivation': {
                    name: '灵田',
                    description: '种植灵药和修炼的地方',
                    events: ['cultivate']
                },
                'gather': {
                    name: '药园',
                    description: '门派专属采集点，生长珍稀草药',
                    gatherPoints: ['qingmu-herb', 'qingmu-spirit', 'herb']
                },
                'pill': {
                    name: '炼丹房',
                    description: '炼制丹药的地方',
                    events: ['pill', 'high-pill']
                },
                'shop': {
                    name: '百草园',
                    description: '门派商店，可购买木系道具',
                    npcs: ['qingmu-contribution']
                },
                'world-boss': {
                    name: '青木林海深处',
                    description: '青木宗最深处，有强大的世界BOSS',
                    monsters: ['world-boss-qingmu']
                }
            },
            currentArea: 'entrance'
        },
        'shuiyue-lake': {
            id: 'shuiyue-lake',
            name: '水月湖',
            type: 'sect',
            sect: 'shuiyue',
            description: '水月宫的驻地，水天一色，波光粼粼',
            color: '#3b82f6',
            connections: ['qinghe-town'],
            areas: {
                'entrance': {
                    name: '山门',
                    description: '水月宫的入口，有守门人把守',
                    npcs: ['shuiyue-guard']
                },
                'core': {
                    name: '水月殿',
                    description: '水月宫的核心区域',
                    npcs: ['shuiyue-master', 'shuiyue-elder', 'shuiyue-skill-master']
                },
                'task': {
                    name: '碧波阁',
                    description: '接取任务的地方',
                    npcs: ['shuiyue-task-master']
                },
                'special': {
                    name: '月神潭',
                    description: '水月宫的圣地，月光映照',
                    events: ['water-insight']
                },
                'cultivation': {
                    name: '湖心岛',
                    description: '修炼的绝佳之地',
                    events: ['cultivate', 'practice']
                },
                'fight': {
                    name: '湖边滩涂',
                    description: '水妖出没的地方，适合除妖任务',
                    monsters: ['water-monster', 'water-slime'],
                    events: ['patrol']
                },
                'shop': {
                    name: '珍宝阁',
                    description: '门派商店，可购买水系道具',
                    npcs: ['shuiyue-shopkeeper', 'shuiyue-contribution']
                },
                'world-boss': {
                    name: '水月湖底',
                    description: '水月宫湖底深处，有强大的世界BOSS',
                    monsters: ['world-boss-shuiyue']
                }
            },
            currentArea: 'entrance'
        },
        'yanhuo-volcano': {
            id: 'yanhuo-volcano',
            name: '炎火山',
            type: 'sect',
            sect: 'yanhuo',
            description: '炎火殿的驻地，烈焰熊熊，赤地千里',
            color: '#ef4444',
            connections: ['mountain-path'],
            areas: {
                'entrance': {
                    name: '山门',
                    description: '炎火殿的入口，有守门人把守',
                    npcs: ['yanhuo-guard']
                },
                'core': {
                    name: '炎火殿',
                    description: '炎火殿的核心区域',
                    npcs: ['yanhuo-master', 'yanhuo-elder', 'yanhuo-skill-master']
                },
                'task': {
                    name: '烈焰堂',
                    description: '接取任务的地方',
                    npcs: ['yanhuo-task-master']
                },
                'special': {
                    name: '熔岩池',
                    description: '炎火殿的圣地，岩浆翻涌',
                    events: ['fire-insight']
                },
                'cultivation': {
                    name: '火脉',
                    description: '靠近地火的修炼之地',
                    events: ['cultivate']
                },
                'practice': {
                    name: '炼器室',
                    description: '炼制法器的地方',
                    events: ['refine']
                },
                'patrol': {
                    name: '巡山区',
                    description: '巡山的地方',
                    events: ['patrol']
                },
                'shop': {
                    name: '炼器坊',
                    description: '门派商店，可购买火系道具',
                    npcs: ['yanhuo-shopkeeper', 'yanhuo-contribution']
                },
                'fight-low': {
                    name: '火山外围',
                    description: '魔怪出没的地方，适合除魔任务',
                    monsters: ['demon']
                },
                'fight-high': {
                    name: '火山深处',
                    description: '魔王领地，危险重重',
                    monsters: ['demon-boss']
                },
                'world-boss': {
                    name: '炎火山顶',
                    description: '炎火殿最高处，有强大的世界BOSS',
                    monsters: ['world-boss-yanhuo']
                }
            },
            currentArea: 'entrance'
        },
        'huangtu-plateau': {
            id: 'huangtu-plateau',
            name: '皇土高原',
            type: 'sect',
            sect: 'huangtu',
            description: '皇土阁的驻地，厚重沉稳，黄土漫天',
            color: '#a16207',
            connections: ['mountain-path'],
            areas: {
                'entrance': {
                    name: '山门',
                    description: '皇土阁的入口，有守门人把守',
                    npcs: ['huangtu-guard']
                },
                'core': {
                    name: '皇土阁',
                    description: '皇土阁的核心区域',
                    npcs: ['huangtu-master', 'huangtu-elder', 'huangtu-skill-master']
                },
                'task': {
                    name: '后土堂',
                    description: '接取任务的地方',
                    npcs: ['huangtu-task-master']
                },
                'special': {
                    name: '大地之心',
                    description: '皇土阁的圣地，大地之力汇聚',
                    events: ['earth-insight']
                },
                'cultivation': {
                    name: '土脉',
                    description: '修炼的好地方',
                    events: ['cultivate']
                },
                'gather': {
                    name: '矿脉',
                    description: '门派专属采集点，蕴含珍稀矿石',
                    gatherPoints: ['huangtu-ore', 'huangtu-crystal', 'mine']
                },
                'fight': {
                    name: '护土场',
                    description: '抵御妖兽入侵的地方',
                    monsters: ['invade', 'army']
                },
                'wall': {
                    name: '筑墙区',
                    description: '修筑城墙的地方',
                    events: ['wall']
                },
                'shop': {
                    name: '矿石阁',
                    description: '门派商店，可购买土系道具',
                    npcs: ['huangtu-contribution']
                },
                'world-boss': {
                    name: '皇土高原中心',
                    description: '皇土阁中心地带，有强大的世界BOSS',
                    monsters: ['world-boss-huangtu']
                }
            },
            currentArea: 'entrance'
        },
        'poison-valley': {
            id: 'poison-valley',
            name: '毒瘴谷',
            type: 'wilderness',
            region: 'southern-wilderness',
            description: '南疆毒瘴谷，毒虫密布，巫蛊盛行',
            color: '#166534',
            connections: ['wu-village'],
            areas: {
                'safe': { name: '谷口', description: '相对安全的入口', npcs: ['poison-guide'] },
                'gather': { name: '毒草园', description: '各种毒草生长的地方', gatherPoints: ['poison-herb', 'centipede'] },
                'low-combat': { name: '外围沼泽', description: '低级毒虫出没', monsters: ['scorpion', 'miasma-demon'] },
                'high-combat': { name: '深谷', description: '高级毒物聚集地', monsters: ['witch-doctor', 'corpse-puppet'] },
                'special': { name: '巫蛊祭坛', description: '神秘的祭坛，可能有奇遇', events: ['wu-gu-secret'] },
                'rest': { name: '避毒洞', description: '可以休息的安全洞穴', events: ['rest'] }
            },
            currentArea: 'safe'
        },
        'wu-village': {
            id: 'wu-village',
            name: '巫蛊村',
            type: 'town',
            region: 'southern-wilderness',
            description: '神秘的巫蛊村落',
            color: '#15803d',
            connections: ['poison-valley', 'ancient-temple', 'qinghe-town'],
            areas: {
                'core': { name: '村子中心', description: '村子的核心区域', npcs: ['wu-elder', 'wu-shaman'] },
                'rest': { name: '草屋客栈', description: '简陋的客栈', npcs: ['wu-innkeeper'], events: ['eat', 'sleep'] },
                'guide': { name: '村口', description: '村子入口', npcs: ['wu-guide'] },
                'shops': { name: '巫蛊商铺', description: '售卖巫蛊道具', npcs: ['wu-merchant'] }
            },
            currentArea: 'core'
        },
        'ancient-temple': {
            id: 'ancient-temple',
            name: '古神庙',
            type: 'dungeon',
            region: 'southern-wilderness',
            description: '上古神庙遗址，藏有无数秘密',
            color: '#14532d',
            connections: ['wu-village'],
            areas: {
                'entrance': { name: '神庙入口', description: '入口处有守卫', npcs: ['temple-guardian'] },
                'resource': { name: '宝库', description: '高阶资源采集点', gatherPoints: ['ancient-herb', 'divine-stone'] },
                'combat': { name: '神殿大厅', description: '高阶妖兽和守护者', monsters: ['tomb-guardian', 'ghost-general'] },
                'exit': { name: '后门', description: '神秘的后门', npcs: ['mysterious-monk'] },
                'hidden': { name: '密室', description: '隐藏的密室，藏有神功', events: ['temple-secret'] }
            },
            currentArea: 'entrance'
        },
        'dragon-palace': {
            id: 'dragon-palace',
            name: '龙宫',
            type: 'sect',
            region: 'eastern-sea',
            description: '传说中的海底龙宫',
            color: '#0ea5e9',
            connections: ['pearl-island'],
            areas: {
                'core': { name: '水晶宫', description: '龙宫核心', npcs: ['dragon-king', 'dragon-princess'] },
                'task': { name: '巡海殿', description: '接取任务', npcs: ['sea-commander'] },
                'special': { name: '定海神针', description: '龙宫圣地', events: ['water-insight'] },
                'cultivation': { name: '深海修炼场', description: '修炼之地', events: ['cultivate'] },
                'shop': { name: '珍宝阁', description: '售卖海族宝物', npcs: ['dragon-treasurer'] },
                'world-boss': { name: '龙宫深处', description: '龙宫最深处，有强大的世界BOSS', monsters: ['world-boss-dragon'] }
            },
            currentArea: 'core'
        },
        'pearl-island': {
            id: 'pearl-island',
            name: '珍珠岛',
            type: 'wilderness',
            region: 'eastern-sea',
            description: '盛产珍珠的美丽海岛',
            color: '#38bdf8',
            connections: ['dragon-palace', 'qinghe-town'],
            areas: {
                'safe': { name: '沙滩', description: '安全的沙滩', npcs: ['fisherman'] },
                'gather': { name: '浅海', description: '采集珍珠和贝类', gatherPoints: ['pearl', 'sea-shell'] },
                'low-combat': { name: '近海', description: '低级海怪', monsters: ['crab-general', 'shrimp-soldier'] },
                'high-combat': { name: '深海', description: '高级海怪', monsters: ['dragon-prince', 'turtle-prime-minister'] },
                'special': { name: '海底洞穴', description: '神秘洞穴', events: ['sea-treasure'] },
                'rest': { name: '岛上小屋', description: '休息处', events: ['rest'] }
            },
            currentArea: 'safe'
        },
        'ice-palace': {
            id: 'ice-palace',
            name: '冰宫',
            type: 'sect',
            region: 'northern-snowfield',
            description: '北境冰宫，冰灵修士圣地',
            color: '#67e8f9',
            connections: ['snow-mountain'],
            areas: {
                'core': { name: '冰神殿', description: '冰宫核心', npcs: ['ice-queen', 'ice-elder'] },
                'task': { name: '寒霜殿', description: '接取任务', npcs: ['ice-commander'] },
                'special': { name: '万年冰窟', description: '冰宫圣地', events: ['ice-insight'] },
                'cultivation': { name: '冰脉', description: '修炼之地', events: ['cultivate'] },
                'shop': { name: '冰宝阁', description: '售卖冰系宝物', npcs: ['ice-merchant'] }
            },
            currentArea: 'core'
        },
        'snow-mountain': {
            id: 'snow-mountain',
            name: '雪山',
            type: 'wilderness',
            region: 'northern-snowfield',
            description: '终年积雪的神秘雪山',
            color: '#a5f3fc',
            connections: ['ice-palace', 'qinghe-town'],
            areas: {
                'safe': { name: '山脚', description: '相对安全的山脚', npcs: ['snow-guide'] },
                'gather': { name: '雪岭', description: '采集雪莲等', gatherPoints: ['snow-lotus', 'ice-crystal'] },
                'low-combat': { name: '低坡', description: '低级雪怪', monsters: ['snow-wolf', 'ice-ape'] },
                'high-combat': { name: '山顶', description: '高级雪怪', monsters: ['ice-maiden', 'ice-golem'] },
                'special': { name: '雪洞', description: '神秘雪洞', events: ['ancient-ice-secret'] },
                'rest': { name: '雪屋', description: '休息处', events: ['rest'] }
            },
            currentArea: 'safe'
        },
        // 金丹期秘境
        'golden-core-dungeon1': {
            id: 'golden-core-dungeon1',
            name: '金灵秘境',
            type: 'dungeon',
            region: 'central-plains',
            description: '蕴含金系灵气的神秘秘境，是突破金丹期的关键场所',
            color: '#f59e0b',
            connections: ['jinyang-mountain'],
            areas: {
                'entrance': { name: '秘境入口', description: '秘境的入口，有金系守卫', npcs: ['golden-guardian'] },
                'combat': { name: '金灵殿', description: '金系妖兽聚集之地', monsters: ['golden-beast', 'golden-core-boss'] },
                'treasure': { name: '金灵宝库', description: '藏有金系宝物', gatherPoints: ['golden-ore', 'golden-grass'] },
                'exit': { name: '秘境出口', description: '离开秘境的通道', npcs: ['exit-guardian'] }
            },
            currentArea: 'entrance'
        },
        'golden-core-dungeon2': {
            id: 'golden-core-dungeon2',
            name: '地灵秘境',
            type: 'dungeon',
            region: 'central-plains',
            description: '蕴含大地之力的神秘秘境，是突破金丹期的关键场所',
            color: '#a16207',
            connections: ['huangtu-plateau'],
            areas: {
                'entrance': { name: '秘境入口', description: '秘境的入口，有土系守卫', npcs: ['earth-guardian'] },
                'combat': { name: '地灵殿', description: '土系妖兽聚集之地', monsters: ['earth-beast', 'earth-core-boss'] },
                'treasure': { name: '地灵宝库', description: '藏有土系宝物', gatherPoints: ['earth-ore', 'earth-grass'] },
                'exit': { name: '秘境出口', description: '离开秘境的通道', npcs: ['exit-guardian'] }
            },
            currentArea: 'entrance'
        },
        // 元婴期秘境
        'yuan-ying-dungeon1': {
            id: 'yuan-ying-dungeon1',
            name: '火灵秘境',
            type: 'dungeon',
            region: 'central-plains',
            description: '蕴含火系灵气的神秘秘境，是突破元婴期的关键场所',
            color: '#ef4444',
            connections: ['yanhuo-volcano'],
            areas: {
                'entrance': { name: '秘境入口', description: '秘境的入口，有火系守卫', npcs: ['fire-guardian'] },
                'combat': { name: '火灵殿', description: '火系妖兽聚集之地', monsters: ['fire-beast', 'fire-ying-boss'] },
                'treasure': { name: '火灵宝库', description: '藏有火系宝物', gatherPoints: ['fire-ore', 'fire-grass'] },
                'exit': { name: '秘境出口', description: '离开秘境的通道', npcs: ['exit-guardian'] }
            },
            currentArea: 'entrance'
        },
        'yuan-ying-dungeon2': {
            id: 'yuan-ying-dungeon2',
            name: '魂灵秘境',
            type: 'dungeon',
            region: 'southern-wilderness',
            description: '蕴含灵魂之力的神秘秘境，是突破元婴期的关键场所',
            color: '#8b5cf6',
            connections: ['poison-valley'],
            areas: {
                'entrance': { name: '秘境入口', description: '秘境的入口，有魂系守卫', npcs: ['soul-guardian'] },
                'combat': { name: '魂灵殿', description: '魂系妖兽聚集之地', monsters: ['soul-beast', 'soul-ying-boss'] },
                'treasure': { name: '魂灵宝库', description: '藏有魂系宝物', gatherPoints: ['soul-ore', 'soul-grass'] },
                'exit': { name: '秘境出口', description: '离开秘境的通道', npcs: ['exit-guardian'] }
            },
            currentArea: 'entrance'
        },
        // 化神期秘境
        'hua-shen-dungeon1': {
            id: 'hua-shen-dungeon1',
            name: '冰灵秘境',
            type: 'dungeon',
            region: 'northern-snowfield',
            description: '蕴含冰系灵气的神秘秘境，是突破化神期的关键场所',
            color: '#06b6d4',
            connections: ['ice-palace'],
            areas: {
                'entrance': { name: '秘境入口', description: '秘境的入口，有冰系守卫', npcs: ['ice-guardian'] },
                'combat': { name: '冰灵殿', description: '冰系妖兽聚集之地', monsters: ['ice-beast', 'ice-shen-boss'] },
                'treasure': { name: '冰灵宝库', description: '藏有冰系宝物', gatherPoints: ['ice-ore', 'ice-grass'] },
                'exit': { name: '秘境出口', description: '离开秘境的通道', npcs: ['exit-guardian'] }
            },
            currentArea: 'entrance'
        },
        'hua-shen-dungeon2': {
            id: 'hua-shen-dungeon2',
            name: '雷灵秘境',
            type: 'dungeon',
            region: 'eastern-sea',
            description: '蕴含雷系灵气的神秘秘境，是突破化神期的关键场所',
            color: '#8b5cf6',
            connections: ['dragon-palace'],
            areas: {
                'entrance': { name: '秘境入口', description: '秘境的入口，有雷系守卫', npcs: ['thunder-guardian'] },
                'combat': { name: '雷灵殿', description: '雷系妖兽聚集之地', monsters: ['thunder-beast', 'thunder-shen-boss'] },
                'treasure': { name: '雷灵宝库', description: '藏有雷系宝物', gatherPoints: ['thunder-ore', 'thunder-grass'] },
                'exit': { name: '秘境出口', description: '离开秘境的通道', npcs: ['exit-guardian'] }
            },
            currentArea: 'entrance'
        },
        // 渡劫期秘境
        'du-jie-dungeon1': {
            id: 'du-jie-dungeon1',
            name: '星空秘境',
            type: 'dungeon',
            region: 'central-plains',
            description: '蕴含星空之力的神秘秘境，是突破渡劫期的关键场所',
            color: '#a855f7',
            connections: ['jinyang-mountain'],
            areas: {
                'entrance': { name: '秘境入口', description: '秘境的入口，有星空守卫', npcs: ['star-guardian'] },
                'combat': { name: '星空殿', description: '星空妖兽聚集之地', monsters: ['star-beast', 'star-jie-boss'] },
                'treasure': { name: '星空宝库', description: '藏有星空宝物', gatherPoints: ['star-ore', 'star-grass'] },
                'exit': { name: '秘境出口', description: '离开秘境的通道', npcs: ['exit-guardian'] }
            },
            currentArea: 'entrance'
        },
        'du-jie-dungeon2': {
            id: 'du-jie-dungeon2',
            name: '混沌秘境',
            type: 'dungeon',
            region: 'western-desert',
            description: '蕴含混沌之力的神秘秘境，是突破渡劫期的关键场所',
            color: '#ec4899',
            connections: ['ancient-city'],
            areas: {
                'entrance': { name: '秘境入口', description: '秘境的入口，有混沌守卫', npcs: ['chaos-guardian'] },
                'combat': { name: '混沌殿', description: '混沌妖兽聚集之地', monsters: ['chaos-beast', 'chaos-jie-boss'] },
                'treasure': { name: '混沌宝库', description: '藏有混沌宝物', gatherPoints: ['chaos-ore', 'chaos-grass'] },
                'exit': { name: '秘境出口', description: '离开秘境的通道', npcs: ['exit-guardian'] }
            },
            currentArea: 'entrance'
        },
        'ancient-city': {
            id: 'ancient-city',
            name: '古城',
            type: 'town',
            region: 'western-desert',
            description: '沙漠中的神秘古城',
            color: '#ca8a04',
            connections: ['oasis'],
            areas: {
                'core': { name: '城主府', description: '古城核心', npcs: ['city-lord', 'monk-elder'] },
                'rest': { name: '沙漠客栈', description: '休息的地方', npcs: ['desert-innkeeper'], events: ['eat', 'sleep'] },
                'guide': { name: '城门', description: '古城入口', npcs: ['desert-guide'] },
                'shops': { name: '集市', description: '各种商铺', npcs: ['desert-merchant', 'artifact-dealer'] }
            },
            currentArea: 'core'
        },
        'oasis': {
            id: 'oasis',
            name: '绿洲',
            type: 'wilderness',
            region: 'western-desert',
            description: '沙漠中的绿洲',
            color: '#84cc16',
            connections: ['ancient-city', 'qinghe-town'],
            areas: {
                'safe': { name: '绿洲边缘', description: '安全的休息地', npcs: ['oasis-dweller'] },
                'gather': { name: '椰林', description: '采集椰枣等', gatherPoints: ['date-palm', 'desert-herb'] },
                'low-combat': { name: '外围沙丘', description: '低级沙漠生物', monsters: ['sand-worm', 'sand-bandit'] },
                'high-combat': { name: '深处', description: '高级沙漠生物', monsters: ['mummy', 'tomb-guardian-general'] },
                'special': { name: '地下泉', description: '神秘泉水', events: ['life-spring'] },
                'rest': { name: '帐篷', description: '休息处', events: ['rest'] }
            },
            currentArea: 'safe'
        }
    },



    NPCS: {
        'bounty-master': {
            id: 'bounty-master',
            name: '悬赏令使',
            type: 'quest',
            dialogs: [
                '道友，来看看悬赏令吧！完成任务有丰厚奖励！',
                '最近妖兽出没频繁，需要各位道友出手相助！',
                '秘境中也有不少悬赏任务，丰厚的奖励等着你！'
            ],
            actions: ['talk', 'bounty']
        },
        'village-elder': {
            id: 'village-elder',
            name: '王村长',
            type: 'guide',
            dialogs: [
                '年轻人，你终于醒了！',
                '你身上的玉佩是守岚者的信物，上一任守岚者失踪已经数十年了……',
                '最近迷雾谷瘴气外泄，怪物伤人，已有村民失踪。',
                '你的玉佩是唯一能压制瘴气的东西，你愿意帮助我们吗？',
                '去找铁匠李铁，他能帮你打造一把能破瘴气的匕首。'
            ],
            actions: ['talk']
        },
        'road-guide': {
            id: 'road-guide',
            name: '指路村民',
            type: 'guide',
            dialogs: [
                '要去青河镇吗？沿着这条路一直走就到了。',
                '路上小心，听说最近有妖兽出没！'
            ],
            actions: ['talk', 'guide']
        },
        'blacksmith': {
            id: 'blacksmith',
            name: '铁匠李铁',
            type: 'shop',
            dialogs: [
                '村长说你是守岚者？就你这破衣服？',
                '放心，我给你打造一把能破瘴气的匕首，不过你得给我找些野兔皮毛。',
                '这把匕首能驱散轻微瘴气，去迷雾谷的时候用得上，别弄丢了！'
            ],
            actions: ['talk', 'shop'],
            shopId: 'blacksmith-shop'
        },
        'guide-oldman': {
            id: 'guide-oldman',
            name: '引路老者',
            type: 'guide',
            dialogs: [
                '小友，是来寻找仙缘的吗？',
                '中心广场有各大门派的招募使，去看看吧。',
                '记住，灵根是修仙的关键！'
            ],
            actions: ['talk', 'guide']
        },
        'forest-guide': {
            id: 'forest-guide',
            name: '林中小厮',
            type: 'guide',
            dialogs: [
                '这片森林可不简单，往里走要小心！',
                '外围有些低级妖兽，可以历练历练。'
            ],
            actions: ['talk', 'guide']
        },
        'mountain-guide': {
            id: 'mountain-guide',
            name: '山路向导',
            type: 'guide',
            dialogs: [
                '这条山路通往各大仙门！',
                '山顶危险，不是炼气期该去的地方！'
            ],
            actions: ['talk', 'guide']
        },
        'sect-recruiter-jinyang': {
            id: 'sect-recruiter-jinyang',
            name: '金阳门招募使',
            type: 'sect-recruiter',
            sect: 'jinyang',
            dialogs: [
                '我乃金阳门招募使！',
                '金阳门以剑入道，攻击力天下无双！',
                '只要你有金灵根，且达到炼气期，便可加入！'
            ],
            actions: ['talk', 'join-sect']
        },
        'sect-recruiter-qingmu': {
            id: 'sect-recruiter-qingmu',
            name: '青木宗招募使',
            type: 'sect-recruiter',
            sect: 'qingmu',
            dialogs: [
                '青木宗欢迎各位有志青年！',
                '我们精通炼丹和治疗，救人救己！',
                '木灵根的道友请留步！'
            ],
            actions: ['talk', 'join-sect']
        },
        'sect-recruiter-shuiyue': {
            id: 'sect-recruiter-shuiyue',
            name: '水月宫招募使',
            type: 'sect-recruiter',
            sect: 'shuiyue',
            dialogs: [
                '水月宫收徒啦！',
                '我们的功法飘逸灵动，控制力极强！',
                '水灵根的仙子请过来！'
            ],
            actions: ['talk', 'join-sect']
        },
        'sect-recruiter-yanhuo': {
            id: 'sect-recruiter-yanhuo',
            name: '炎火殿招募使',
            type: 'sect-recruiter',
            sect: 'yanhuo',
            dialogs: [
                '炎火殿！霸道绝伦！',
                '我们的攻击力五门最强！',
                '是火灵根就来加入我们！'
            ],
            actions: ['talk', 'join-sect']
        },
        'sect-recruiter-huangtu': {
            id: 'sect-recruiter-huangtu',
            name: '皇土阁招募使',
            type: 'sect-recruiter',
            sect: 'huangtu',
            dialogs: [
                '皇土阁，稳如泰山！',
                '我们的防御天下第一！',
                '土灵根的道友看过来！'
            ],
            actions: ['talk', 'join-sect']
        },
        'town-mayor': {
            id: 'town-mayor',
            name: '李镇长',
            type: 'npc',
            dialogs: [
                '欢迎来到青河镇！',
                '这里是修仙者的起点，祝你好运！'
            ],
            actions: ['talk']
        },
        'sanxiu-master': {
            id: 'sanxiu-master',
            name: '散修大师',
            type: 'npc',
            dialogs: [
                '老夫一生散修，游历天下！',
                '你可愿学我一身散修本领？',
                '散修之路，艰难困苦，但自有其法！'
            ],
            actions: ['talk', 'learn-sanxiu']
        },
        'jinyang-guard': {
            id: 'jinyang-guard',
            name: '金阳门守门人',
            type: 'sect-guard',
            sect: 'jinyang',
            realm: '金丹期',
            dialogs: [
                '这里是金阳门！',
                '非本门弟子，不得进入！'
            ],
            actions: ['talk']
        },
        'qingmu-guard': {
            id: 'qingmu-guard',
            name: '青木宗守门人',
            type: 'sect-guard',
            sect: 'qingmu',
            realm: '金丹期',
            dialogs: [
                '这里是青木宗！',
                '非本门弟子，不得进入！'
            ],
            actions: ['talk']
        },
        'shuiyue-guard': {
            id: 'shuiyue-guard',
            name: '水月宫守门人',
            type: 'sect-guard',
            sect: 'shuiyue',
            realm: '金丹期',
            dialogs: [
                '这里是水月宫！',
                '非本门弟子，不得进入！'
            ],
            actions: ['talk']
        },
        'yanhuo-guard': {
            id: 'yanhuo-guard',
            name: '炎火殿守门人',
            type: 'sect-guard',
            sect: 'yanhuo',
            realm: '金丹期',
            dialogs: [
                '这里是炎火殿！',
                '非本门弟子，不得进入！'
            ],
            actions: ['talk']
        },
        'huangtu-guard': {
            id: 'huangtu-guard',
            name: '皇土阁守门人',
            type: 'sect-guard',
            sect: 'huangtu',
            realm: '金丹期',
            dialogs: [
                '这里是皇土阁！',
                '非本门弟子，不得进入！'
            ],
            actions: ['talk']
        },
        'innkeeper': {
            id: 'innkeeper',
            name: '客栈掌柜',
            type: 'shop',
            dialogs: [
                '客官，要住店吗？',
                '我们这儿可是青河镇最好的客栈！',
                '上房50文一晚，通铺10文一晚！'
            ],
            actions: ['talk', 'rent-room', 'buy-food']
        },
        'waiter': {
            id: 'waiter',
            name: '店小二',
            type: 'service',
            dialogs: [
                '客官您好！',
                '想吃点什么？',
                '我们这儿的招牌菜是红烧灵猪肉！'
            ],
            actions: ['talk', 'order-food']
        },
        'weaponsmith': {
            id: 'weaponsmith',
            name: '铁匠铺老板',
            type: 'shop',
            dialogs: [
                '要买兵器吗？',
                '我这儿的兵器都是精钢打造！',
                '客官请看，这把飞剑怎么样？'
            ],
            actions: ['talk', 'buy-weapon', 'repair-weapon']
        },
        'pharmacist': {
            id: 'pharmacist',
            name: '药店老板',
            type: 'shop',
            dialogs: [
                '需要什么丹药？',
                '我这儿有各种疗伤和补气的丹药！',
                '这瓶聚气丹可是抢手货！'
            ],
            actions: ['talk', 'buy-medicine', 'sell-herbs']
        },
        'artifact-dealer': {
            id: 'artifact-dealer',
            name: '法宝商人',
            type: 'shop',
            dialogs: [
                '想看点法宝？',
                '我这儿的货可都是好东西！',
                '这件防护法器你看怎么样？'
            ],
            actions: ['talk', 'buy-artifact', 'sell-artifact']
        },
        'herb-gatherer': {
            id: 'herb-gatherer',
            name: '采药人',
            type: 'npc',
            dialogs: [
                '这片森林的草药真不少啊！',
                '往里走可要小心，有妖兽出没！',
                '听说深处还有千年灵芝呢！'
            ],
            actions: ['talk', 'buy-herbs']
        },
        'merchant': {
            id: 'merchant',
            name: '行商',
            type: 'shop',
            dialogs: [
                '路过路过，卖点小东西！',
                '要看看吗？都是些实用的玩意儿！',
                '赚点路费，赚点路费！'
            ],
            actions: ['talk', 'trade']
        },
        'jinyang-master': {
            id: 'jinyang-master',
            name: '金阳门主',
            type: 'sect-master',
            sect: 'jinyang',
            dialogs: [
                '欢迎来到金阳门！',
                '好好修炼，将来必有大成！'
            ],
            actions: ['talk', 'promote']
        },
        'jinyang-elder': {
            id: 'jinyang-elder',
            name: '金阳长老',
            type: 'elder',
            sect: 'jinyang',
            dialogs: [
                '金阳门以剑入道，剑气是根本！',
                '勤加练习，不可懈怠！'
            ],
            actions: ['talk']
        },
        'jinyang-skill-master': {
            id: 'jinyang-skill-master',
            name: '传功长老',
            type: 'skill-master',
            sect: 'jinyang',
            dialogs: [
                '想要学习本门功法？',
                '先看看你的贡献够不够！'
            ],
            actions: ['talk', 'learn-skill']
        },
        'jinyang-task-master': {
            id: 'jinyang-task-master',
            name: '任务长老',
            type: 'task-master',
            sect: 'jinyang',
            dialogs: [
                '来接任务吗？',
                '完成任务可获得贡献和奖励！'
            ],
            actions: ['talk', 'take-quest']
        },
        'jinyang-shopkeeper': {
            id: 'jinyang-shopkeeper',
            name: '炼器阁掌柜',
            type: 'shop',
            sect: 'jinyang',
            dialogs: [
                '要买些金系法器吗？',
                '都是本门弟子炼制的好东西！'
            ],
            actions: ['talk', 'buy-item']
        },
        'qingmu-master': {
            id: 'qingmu-master',
            name: '青木宗主',
            type: 'sect-master',
            sect: 'qingmu',
            dialogs: [
                '欢迎来到青木宗！',
                '生命之力，生生不息！'
            ],
            actions: ['talk', 'promote']
        },
        'qingmu-elder': {
            id: 'qingmu-elder',
            name: '青木长老',
            type: 'elder',
            sect: 'qingmu',
            dialogs: [
                '木系功法，重在生生不息！',
                '好好领悟生命的真谛！'
            ],
            actions: ['talk']
        },
        'qingmu-skill-master': {
            id: 'qingmu-skill-master',
            name: '传功长老',
            type: 'skill-master',
            sect: 'qingmu',
            dialogs: [
                '想要学习本门功法？',
                '先看看你的贡献够不够！'
            ],
            actions: ['talk', 'learn-skill']
        },
        'qingmu-task-master': {
            id: 'qingmu-task-master',
            name: '百草堂主',
            type: 'task-master',
            sect: 'qingmu',
            dialogs: [
                '来接任务吗？',
                '完成任务可获得贡献和奖励！'
            ],
            actions: ['talk', 'take-quest']
        },
        'qingmu-pharmacist': {
            id: 'qingmu-pharmacist',
            name: '炼丹师',
            type: 'shop',
            sect: 'qingmu',
            dialogs: [
                '要买些丹药吗？',
                '都是本门炼制的上好丹药！'
            ],
            actions: ['talk', 'buy-medicine']
        },
        'shuiyue-master': {
            id: 'shuiyue-master',
            name: '水月宫主',
            type: 'sect-master',
            sect: 'shuiyue',
            dialogs: [
                '欢迎来到水月宫！',
                '上善若水，水利万物而不争！'
            ],
            actions: ['talk', 'promote']
        },
        'shuiyue-elder': {
            id: 'shuiyue-elder',
            name: '水月长老',
            type: 'elder',
            sect: 'shuiyue',
            dialogs: [
                '水系功法，飘逸灵动！',
                '好好领悟水的真谛！'
            ],
            actions: ['talk']
        },
        'shuiyue-skill-master': {
            id: 'shuiyue-skill-master',
            name: '传功长老',
            type: 'skill-master',
            sect: 'shuiyue',
            dialogs: [
                '想要学习本门功法？',
                '先看看你的贡献够不够！'
            ],
            actions: ['talk', 'learn-skill']
        },
        'shuiyue-task-master': {
            id: 'shuiyue-task-master',
            name: '碧波阁主',
            type: 'task-master',
            sect: 'shuiyue',
            dialogs: [
                '来接任务吗？',
                '完成任务可获得贡献和奖励！'
            ],
            actions: ['talk', 'take-quest']
        },
        'shuiyue-shopkeeper': {
            id: 'shuiyue-shopkeeper',
            name: '珍宝阁掌柜',
            type: 'shop',
            sect: 'shuiyue',
            dialogs: [
                '要买些水系法宝吗？',
                '都是本门精心炼制的！'
            ],
            actions: ['talk', 'buy-item']
        },
        'yanhuo-master': {
            id: 'yanhuo-master',
            name: '炎火殿主',
            type: 'sect-master',
            sect: 'yanhuo',
            dialogs: [
                '欢迎来到炎火殿！',
                '烈焰焚天，霸道绝伦！'
            ],
            actions: ['talk', 'promote']
        },
        'yanhuo-elder': {
            id: 'yanhuo-elder',
            name: '炎火长老',
            type: 'elder',
            sect: 'yanhuo',
            dialogs: [
                '火系功法，霸道异常！',
                '要有足够的勇气才能驾驭！'
            ],
            actions: ['talk']
        },
        'yanhuo-skill-master': {
            id: 'yanhuo-skill-master',
            name: '传功长老',
            type: 'skill-master',
            sect: 'yanhuo',
            dialogs: [
                '想要学习本门功法？',
                '先看看你的贡献够不够！'
            ],
            actions: ['talk', 'learn-skill']
        },
        // 青河镇相关NPC
        'ahe': {
            id: 'ahe',
            name: '村姑阿禾',
            type: 'npc',
            dialogs: [
                '你是谁？怎么躺在这里？最近山里很不安全。',
                '我是青岚村的阿禾，去山上采草药的。',
                '你看起来好像失忆了，跟我回村吧，村长见多识广，或许能帮你。',
                '最近村里怪事不断，村长正为此发愁呢。'
            ],
            actions: ['talk']
        },
        'wang-hunter': {
            id: 'wang-hunter',
            name: '猎户王大叔',
            type: 'npc',
            dialogs: [
                '你是来帮我的吗？',
                '清河密林里有奇怪的瘴气，我被它困住了好几天。',
                '我在清河密林深处看到一个巨大的黑影，它身上也有一块和你一样的玉佩碎片！',
                '谢谢你救了我，要是遇到搞不定的怪物，就回来找我。'
            ],
            actions: ['talk']
        },
        'yanhuo-task-master': {
            id: 'yanhuo-task-master',
            name: '烈焰堂主',
            type: 'task-master',
            sect: 'yanhuo',
            dialogs: [
                '来接任务吗？',
                '完成任务可获得贡献和奖励！'
            ],
            actions: ['talk', 'take-quest']
        },
        'yanhuo-shopkeeper': {
            id: 'yanhuo-shopkeeper',
            name: '炼器坊掌柜',
            type: 'shop',
            sect: 'yanhuo',
            dialogs: [
                '要买些火系法器吗？',
                '都是本门弟子精心炼制的！'
            ],
            actions: ['talk', 'buy-item']
        },
        'huangtu-master': {
            id: 'huangtu-master',
            name: '皇土阁主',
            type: 'sect-master',
            sect: 'huangtu',
            dialogs: [
                '欢迎来到皇土阁！',
                '厚德载物，稳如泰山！'
            ],
            actions: ['talk', 'promote']
        },
        // 贡献度兑换NPC
        'jinyang-contribution': {
            id: 'jinyang-contribution',
            name: '金阳兑换使',
            type: 'sect-contribution',
            sect: 'jinyang',
            dialogs: [
                '金阳门贡献商店，欢迎兑换！',
                '用贡献度可以兑换各种宝物！'
            ],
            actions: ['talk', 'contribution-shop']
        },
        'qingmu-contribution': {
            id: 'qingmu-contribution',
            name: '青木兑换使',
            type: 'sect-contribution',
            sect: 'qingmu',
            dialogs: [
                '青木宗贡献商店，欢迎兑换！',
                '用贡献度可以兑换各种宝物！'
            ],
            actions: ['talk', 'contribution-shop']
        },
        'shuiyue-contribution': {
            id: 'shuiyue-contribution',
            name: '水月兑换使',
            type: 'sect-contribution',
            sect: 'shuiyue',
            dialogs: [
                '水月宫贡献商店，欢迎兑换！',
                '用贡献度可以兑换各种宝物！'
            ],
            actions: ['talk', 'contribution-shop']
        },
        'yanhuo-contribution': {
            id: 'yanhuo-contribution',
            name: '炎火兑换使',
            type: 'sect-contribution',
            sect: 'yanhuo',
            dialogs: [
                '炎火殿贡献商店，欢迎兑换！',
                '用贡献度可以兑换各种宝物！'
            ],
            actions: ['talk', 'contribution-shop']
        },
        'huangtu-contribution': {
            id: 'huangtu-contribution',
            name: '皇土兑换使',
            type: 'sect-contribution',
            sect: 'huangtu',
            dialogs: [
                '皇土阁贡献商店，欢迎兑换！',
                '用贡献度可以兑换各种宝物！'
            ],
            actions: ['talk', 'contribution-shop']
        },
        // ========== 互动NPC ==========
        // 金阳门
        'jinyang-chulieyang': {
            id: 'jinyang-chulieyang',
            name: '楚烈阳',
            type: 'interactive',
            sect: 'jinyang',
            character: '正直友善',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期5层',
            lingen: '金灵根',
            hp: 1100,
            mp: 900,
            attack: 260,
            defense: 150,
            strength: 40,
            vitality: 35,
            intelligence: 20,
            agility: 25,
            skills: ['金刃击', '金纹护体', '破甲斩'],
            dialogs: [
                '这位道友看着面生，可是刚来本门修行？',
                '此处常有妖兽出没，道友可要多加小心。',
                '道友若有难处，不妨直言，力所能及必出手相助。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'jinyang-qinfeng': {
            id: 'jinyang-qinfeng',
            name: '秦风',
            type: 'interactive',
            sect: 'jinyang',
            character: '仗义',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期6层',
            lingen: '金灵根',
            hp: 1200,
            mp: 1000,
            attack: 280,
            defense: 160,
            strength: 45,
            vitality: 38,
            intelligence: 22,
            agility: 28,
            skills: ['金刃击', '金纹护体', '破甲斩', '金罡破'],
            dialogs: [
                '这位道友看着面生，可是刚来本门修行？',
                '此处常有妖兽出没，道友可要多加小心。',
                '道友若有难处，不妨直言，力所能及必出手相助。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'jinyang-shenmuyan': {
            id: 'jinyang-shenmuyan',
            name: '沈慕言',
            type: 'interactive',
            sect: 'jinyang',
            character: '精明中立',
            favor: 0,
            relation: 'stranger',
            canSteal: true,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期3层',
            lingen: '金灵根',
            hp: 900,
            mp: 700,
            attack: 220,
            defense: 130,
            strength: 35,
            vitality: 30,
            intelligence: 35,
            agility: 22,
            skills: ['金刃击', '金纹护体'],
            dialogs: [
                '道友看着像个明白人，要不要聊聊秘境消息？',
                '相逢即是缘，要不要做个小买卖？',
                '这里人多眼杂，说话可得小心点。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'steal', 'sworn', 'marry']
        },
        'jinyang-guchen': {
            id: 'jinyang-guchen',
            name: '顾宸',
            type: 'interactive',
            sect: 'jinyang',
            character: '谨慎中立',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期4层',
            lingen: '金灵根',
            hp: 1000,
            mp: 800,
            attack: 240,
            defense: 140,
            strength: 38,
            vitality: 32,
            intelligence: 28,
            agility: 24,
            skills: ['金刃击', '金纹护体', '破甲斩'],
            dialogs: [
                '道友看着像个明白人，要不要聊聊秘境消息？',
                '相逢即是缘，要不要做个小买卖？',
                '这里人多眼杂，说话可得小心点。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'jinyang-lengxuan': {
            id: 'jinyang-lengxuan',
            name: '冷轩',
            type: 'interactive',
            sect: 'jinyang',
            character: '无情反派',
            favor: 0,
            relation: 'stranger',
            canSteal: true,
            canAttack: true,
            canMarry: false,
            canSworn: false,
            realm: '炼气期后期7层',
            lingen: '金灵根',
            hp: 1300,
            mp: 1050,
            attack: 300,
            defense: 180,
            strength: 50,
            vitality: 40,
            intelligence: 25,
            agility: 30,
            skills: ['金刃击', '金纹护体', '破甲斩', '金罡破', '金骨不屈'],
            dialogs: [
                '嘿嘿，又送来一个肥羊……',
                '身上好东西不少嘛，小心被人盯上。',
                '别那么紧张，我又不会吃了你。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'steal', 'attack']
        },
        'jinyang-leihu': {
            id: 'jinyang-leihu',
            name: '雷虎',
            type: 'interactive',
            sect: 'jinyang',
            character: '狂傲重义',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: true,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期8层',
            lingen: '金灵根',
            hp: 1400,
            mp: 1100,
            attack: 320,
            defense: 200,
            strength: 55,
            vitality: 45,
            intelligence: 20,
            agility: 35,
            skills: ['金刃击', '金纹护体', '破甲斩', '金罡破', '金骨不屈', '万刃归宗'],
            dialogs: [
                '你就是最近新来的？敢不敢跟我切磋一场？',
                '别磨磨蹭蹭，要动手便动手！',
                '弱者可没资格跟我并肩。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'attack', 'sworn', 'marry']
        },
        // 青木宗
        'qingmu-linqinghan': {
            id: 'qingmu-linqinghan',
            name: '林清寒',
            type: 'interactive',
            sect: 'qingmu',
            character: '温柔友善',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期5层',
            lingen: '木灵根',
            hp: 1100,
            mp: 950,
            attack: 240,
            defense: 160,
            strength: 25,
            vitality: 45,
            intelligence: 30,
            agility: 25,
            skills: ['青藤缚', '枯荣诀', '回春术2'],
            dialogs: [
                '道友来啦，要不要尝尝我刚泡好的灵茶？',
                '这里风景不错，道友也是来散心的吗？',
                '你身上气息很温和，我觉得你是个好人呢。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'qingmu-linyue': {
            id: 'qingmu-linyue',
            name: '林月',
            type: 'interactive',
            sect: 'qingmu',
            character: '胆小友善',
            favor: 0,
            relation: 'stranger',
            canSteal: true,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期3层',
            lingen: '木灵根',
            hp: 900,
            mp: 750,
            attack: 200,
            defense: 140,
            strength: 20,
            vitality: 40,
            intelligence: 25,
            agility: 20,
            skills: ['青藤缚', '枯荣诀'],
            dialogs: [
                '道…道友好……我、我没有捣乱……',
                '你、你不要吓我……',
                '我…我这里有草药，分给你一点……'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'steal', 'sworn', 'marry']
        },
        'qingmu-suwanqing': {
            id: 'qingmu-suwanqing',
            name: '苏晚晴',
            type: 'interactive',
            sect: 'qingmu',
            character: '小贪中立',
            favor: 0,
            relation: 'stranger',
            canSteal: true,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期4层',
            lingen: '木灵根',
            hp: 1000,
            mp: 850,
            attack: 220,
            defense: 150,
            strength: 22,
            vitality: 42,
            intelligence: 32,
            agility: 22,
            skills: ['青藤缚', '枯荣诀', '回春术2'],
            dialogs: [
                '哟，这位小友生得真好看~',
                '陪我说说话嘛，我告诉你一个小秘密。',
                '你身上有好闻的灵气呢~'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'steal', 'sworn', 'marry']
        },
        'qingmu-wenxuan': {
            id: 'qingmu-wenxuan',
            name: '文轩',
            type: 'interactive',
            sect: 'qingmu',
            character: '书呆子特殊',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期6层',
            lingen: '木灵根',
            hp: 1200,
            mp: 1000,
            attack: 260,
            defense: 170,
            strength: 28,
            vitality: 48,
            intelligence: 40,
            agility: 28,
            skills: ['青藤缚', '枯荣诀', '回春术2', '万木绞杀'],
            dialogs: [
                '道友，请勿打扰，我正在研读古籍',
                '这本书籍记载了上古阵法，甚是精妙',
                '你也对古籍感兴趣吗？'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'qingmu-moying': {
            id: 'qingmu-moying',
            name: '墨影',
            type: 'interactive',
            sect: 'qingmu',
            character: '阴狠反派',
            favor: 0,
            relation: 'stranger',
            canSteal: true,
            canAttack: true,
            canMarry: false,
            canSworn: false,
            realm: '炼气期后期7层',
            lingen: '木灵根',
            hp: 1300,
            mp: 1050,
            attack: 280,
            defense: 180,
            strength: 30,
            vitality: 50,
            intelligence: 45,
            agility: 30,
            skills: ['青藤缚', '枯荣诀', '回春术2', '万木绞杀', '木灵守护'],
            dialogs: [
                '嘿嘿，又送来一个肥羊……',
                '身上好东西不少嘛，小心被人盯上。',
                '别那么紧张，我又不会吃了你。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'steal', 'attack']
        },
        'qingmu-xiaotao': {
            id: 'qingmu-xiaotao',
            name: '小桃',
            type: 'interactive',
            sect: 'qingmu',
            character: '桃树精特殊',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期8层',
            lingen: '木灵根',
            hp: 1400,
            mp: 1100,
            attack: 300,
            defense: 200,
            strength: 35,
            vitality: 55,
            intelligence: 50,
            agility: 35,
            skills: ['青藤缚', '枯荣诀', '回春术2', '万木绞杀', '木灵守护', '枯木逢春'],
            dialogs: [
                '道友道友！有没有带灵果呀？',
                '我们一起去玩好不好？',
                '桃花送给你~你要对我好一点哦~'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        // 水月宫
        'shuiyue-wenruoxi': {
            id: 'shuiyue-wenruoxi',
            name: '温若溪',
            type: 'interactive',
            sect: 'shuiyue',
            character: '灵动友善',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期5层',
            lingen: '水灵根',
            hp: 1100,
            mp: 950,
            attack: 240,
            defense: 160,
            strength: 25,
            vitality: 40,
            intelligence: 40,
            agility: 30,
            skills: ['水浪击', '水纹盾', '凝水成冰'],
            dialogs: [
                '道友来啦，要不要尝尝我刚泡好的灵茶？',
                '这里风景不错，道友也是来散心的吗？',
                '你身上气息很温和，我觉得你是个好人呢。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'shuiyue-shuiyao': {
            id: 'shuiyue-shuiyao',
            name: '水瑶',
            type: 'interactive',
            sect: 'shuiyue',
            character: '孤僻中立',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期3层',
            lingen: '水灵根',
            hp: 900,
            mp: 800,
            attack: 210,
            defense: 140,
            strength: 22,
            vitality: 35,
            intelligence: 45,
            agility: 25,
            skills: ['水浪击', '水纹盾'],
            dialogs: [
                '……请勿打扰我修行。',
                '此地是我静修之处，速速离开。',
                '无事便退下吧。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'shuiyue-liurumei': {
            id: 'shuiyue-liurumei',
            name: '柳如眉',
            type: 'interactive',
            sect: 'shuiyue',
            character: '妩媚中立',
            favor: 0,
            relation: 'stranger',
            canSteal: true,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期4层',
            lingen: '水灵根',
            hp: 1000,
            mp: 850,
            attack: 220,
            defense: 150,
            strength: 24,
            vitality: 38,
            intelligence: 42,
            agility: 28,
            skills: ['水浪击', '水纹盾', '凝水成冰'],
            dialogs: [
                '哟，这位小友生得真好看~',
                '陪我说说话嘛，我告诉你一个小秘密。',
                '你身上有好闻的灵气呢~'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'steal', 'sworn', 'marry']
        },
        'shuiyue-bingji': {
            id: 'shuiyue-bingji',
            name: '冰姬',
            type: 'interactive',
            sect: 'shuiyue',
            character: '高冷特殊',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期6层',
            lingen: '水灵根',
            hp: 1200,
            mp: 1000,
            attack: 260,
            defense: 170,
            strength: 28,
            vitality: 42,
            intelligence: 48,
            agility: 32,
            skills: ['水浪击', '水纹盾', '凝水成冰', '沧澜奔涌'],
            dialogs: [
                '……请勿打扰我修行。',
                '此地是我静修之处，速速离开。',
                '无事便退下吧。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'shuiyue-sulianer': {
            id: 'shuiyue-sulianer',
            name: '苏怜儿',
            type: 'interactive',
            sect: 'shuiyue',
            character: '伪装反派',
            favor: 0,
            relation: 'stranger',
            canSteal: true,
            canAttack: true,
            canMarry: false,
            canSworn: false,
            realm: '炼气期后期7层',
            lingen: '水灵根',
            hp: 1300,
            mp: 1050,
            attack: 280,
            defense: 180,
            strength: 30,
            vitality: 45,
            intelligence: 50,
            agility: 35,
            skills: ['水浪击', '水纹盾', '凝水成冰', '沧澜奔涌', '水镜分身'],
            dialogs: [
                '嘿嘿，又送来一个肥羊……',
                '身上好东西不少嘛，小心被人盯上。',
                '别那么紧张，我又不会吃了你。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'steal', 'attack']
        },
        'shuiyue-lingxi': {
            id: 'shuiyue-lingxi',
            name: '灵汐',
            type: 'interactive',
            sect: 'shuiyue',
            character: '锦鲤精特殊',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期8层',
            lingen: '水灵根',
            hp: 1400,
            mp: 1100,
            attack: 300,
            defense: 200,
            strength: 35,
            vitality: 50,
            intelligence: 55,
            agility: 40,
            skills: ['水浪击', '水纹盾', '凝水成冰', '沧澜奔涌', '水镜分身', '四海冰封'],
            dialogs: [
                '道友道友！有没有带灵果呀？',
                '我们一起去玩好不好？',
                '桃花送给你~你要对我好一点哦~'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        // 炎火殿
        'yanhuo-zhaoyan': {
            id: 'yanhuo-zhaoyan',
            name: '赵炎',
            type: 'interactive',
            sect: 'yanhuo',
            character: '冲动中立',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: true,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期5层',
            lingen: '火灵根',
            hp: 1100,
            mp: 900,
            attack: 280,
            defense: 140,
            strength: 40,
            vitality: 35,
            intelligence: 25,
            agility: 30,
            skills: ['火焰弹', '炎息', '爆炎术'],
            dialogs: [
                '你就是最近新来的？敢不敢跟我切磋一场？',
                '别磨磨蹭蹭，要动手便动手！',
                '弱者可没资格跟我并肩。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'attack', 'sworn', 'marry']
        },
        'yanhuo-huolan': {
            id: 'yanhuo-huolan',
            name: '火岚',
            type: 'interactive',
            sect: 'yanhuo',
            character: '温和友善',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期5层',
            lingen: '火灵根',
            hp: 1100,
            mp: 920,
            attack: 260,
            defense: 150,
            strength: 35,
            vitality: 38,
            intelligence: 28,
            agility: 28,
            skills: ['火焰弹', '炎息', '爆炎术'],
            dialogs: [
                '道友来啦，要不要尝尝我刚泡好的灵茶？',
                '这里风景不错，道友也是来散心的吗？',
                '你身上气息很温和，我觉得你是个好人呢。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'yanhuo-huotu': {
            id: 'yanhuo-huotu',
            name: '火屠',
            type: 'interactive',
            sect: 'yanhuo',
            character: '沉稳中立',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期4层',
            lingen: '火灵根',
            hp: 1000,
            mp: 850,
            attack: 240,
            defense: 145,
            strength: 38,
            vitality: 36,
            intelligence: 30,
            agility: 26,
            skills: ['火焰弹', '炎息', '爆炎术'],
            dialogs: [
                '道友看着像个明白人，要不要聊聊秘境消息？',
                '相逢即是缘，要不要做个小买卖？',
                '这里人多眼杂，说话可得小心点。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'yanhuo-huoer': {
            id: 'yanhuo-huoer',
            name: '火儿',
            type: 'interactive',
            sect: 'yanhuo',
            character: '火凰特殊',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期8层',
            lingen: '火灵根',
            hp: 1400,
            mp: 1100,
            attack: 320,
            defense: 180,
            strength: 50,
            vitality: 45,
            intelligence: 35,
            agility: 40,
            skills: ['火焰弹', '炎息', '爆炎术', '炎狱冲击', '焚天战意', '炎爆领域'],
            dialogs: [
                '道友道友！有没有带灵果呀？',
                '我们一起去玩好不好？',
                '桃花送给你~你要对我好一点哦~'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'yanhuo-chilian': {
            id: 'yanhuo-chilian',
            name: '赤练',
            type: 'interactive',
            sect: 'yanhuo',
            character: '毒辣反派',
            favor: 0,
            relation: 'stranger',
            canSteal: true,
            canAttack: true,
            canMarry: false,
            canSworn: false,
            realm: '炼气期后期7层',
            lingen: '火灵根',
            hp: 1300,
            mp: 1050,
            attack: 300,
            defense: 160,
            strength: 45,
            vitality: 40,
            intelligence: 30,
            agility: 35,
            skills: ['火焰弹', '炎息', '爆炎术', '炎狱冲击', '焚天战意'],
            dialogs: [
                '嘿嘿，又送来一个肥羊……',
                '身上好东西不少嘛，小心被人盯上。',
                '别那么紧张，我又不会吃了你。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'steal', 'attack']
        },
        'yanhuo-fenxin': {
            id: 'yanhuo-fenxin',
            name: '焚心',
            type: 'interactive',
            sect: 'yanhuo',
            character: '狂战士特殊',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: true,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期8层',
            lingen: '火灵根',
            hp: 1450,
            mp: 1080,
            attack: 340,
            defense: 175,
            strength: 55,
            vitality: 42,
            intelligence: 28,
            agility: 38,
            skills: ['火焰弹', '炎息', '爆炎术', '炎狱冲击', '焚天战意', '炎爆领域'],
            dialogs: [
                '你就是最近新来的？敢不敢跟我切磋一场？',
                '别磨磨蹭蹭，要动手便动手！',
                '弱者可没资格跟我并肩。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'attack', 'sworn', 'marry']
        },
        // 皇土阁
        'huangtu-shijian': {
            id: 'huangtu-shijian',
            name: '石坚',
            type: 'interactive',
            sect: 'huangtu',
            character: '憨厚友善',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期5层',
            lingen: '土灵根',
            hp: 1200,
            mp: 850,
            attack: 240,
            defense: 200,
            strength: 40,
            vitality: 45,
            intelligence: 25,
            agility: 25,
            skills: ['落石术', '石肤术', '地裂术'],
            dialogs: [
                '俺看你身板不错，要不要一起练一练？',
                '道友要挖矿/修墙不？俺知道好地方！',
                '俺叫XXX，以后有事喊一声！'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'huangtu-shiqingyao': {
            id: 'huangtu-shiqingyao',
            name: '石清瑶',
            type: 'interactive',
            sect: 'huangtu',
            character: '温婉友善',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期5层',
            lingen: '土灵根',
            hp: 1150,
            mp: 880,
            attack: 220,
            defense: 190,
            strength: 35,
            vitality: 48,
            intelligence: 28,
            agility: 28,
            skills: ['落石术', '石肤术', '地裂术'],
            dialogs: [
                '道友来啦，要不要尝尝我刚泡好的灵茶？',
                '这里风景不错，道友也是来散心的吗？',
                '你身上气息很温和，我觉得你是个好人呢。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'huangtu-wanglei': {
            id: 'huangtu-wanglei',
            name: '王磊',
            type: 'interactive',
            sect: 'huangtu',
            character: '贪小中立',
            favor: 0,
            relation: 'stranger',
            canSteal: true,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期3层',
            lingen: '土灵根',
            hp: 950,
            mp: 750,
            attack: 200,
            defense: 170,
            strength: 32,
            vitality: 40,
            intelligence: 30,
            agility: 22,
            skills: ['落石术', '石肤术'],
            dialogs: [
                '俺看你身板不错，要不要一起练一练？',
                '道友要挖矿/修墙不？俺知道好地方！',
                '俺叫XXX，以后有事喊一声！'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'steal', 'sworn', 'marry']
        },
        'huangtu-tieniu': {
            id: 'huangtu-tieniu',
            name: '铁牛',
            type: 'interactive',
            sect: 'huangtu',
            character: '耿直特殊',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: true,
            canSworn: true,
            realm: '炼气期后期6层',
            lingen: '土灵根',
            hp: 1300,
            mp: 950,
            attack: 260,
            defense: 220,
            strength: 45,
            vitality: 50,
            intelligence: 26,
            agility: 30,
            skills: ['落石术', '石肤术', '地裂术', '岩山突刺'],
            dialogs: [
                '俺看你身板不错，要不要一起练一练？',
                '道友要挖矿/修墙不？俺知道好地方！',
                '俺叫XXX，以后有事喊一声！'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn', 'marry']
        },
        'huangtu-tulang': {
            id: 'huangtu-tulang',
            name: '土狼',
            type: 'interactive',
            sect: 'huangtu',
            character: '贪婪反派',
            favor: 0,
            relation: 'stranger',
            canSteal: true,
            canAttack: true,
            canMarry: false,
            canSworn: false,
            realm: '炼气期后期7层',
            lingen: '土灵根',
            hp: 1350,
            mp: 1000,
            attack: 280,
            defense: 210,
            strength: 48,
            vitality: 45,
            intelligence: 28,
            agility: 32,
            skills: ['落石术', '石肤术', '地裂术', '岩山突刺', '大地守护'],
            dialogs: [
                '嘿嘿，又送来一个肥羊……',
                '身上好东西不少嘛，小心被人盯上。',
                '别那么紧张，我又不会吃了你。'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'steal', 'attack']
        },
        'huangtu-yaolao': {
            id: 'huangtu-yaolao',
            name: '药老',
            type: 'interactive',
            sect: 'huangtu',
            character: '慈祥特殊',
            favor: 0,
            relation: 'stranger',
            canSteal: false,
            canAttack: false,
            canMarry: false,
            canSworn: true,
            realm: '炼气期后期8层',
            lingen: '土灵根',
            hp: 1450,
            mp: 1100,
            attack: 240,
            defense: 250,
            strength: 38,
            vitality: 55,
            intelligence: 40,
            agility: 28,
            skills: ['落石术', '石肤术', '地裂术', '岩山突刺', '大地守护', '五岳镇地'],
            dialogs: [
                '道友来寻丹药吗？我这里有一些基础丹药',
                '炼丹需心无旁骛，方能成丹',
                '你对炼丹感兴趣吗？'
            ],
            actions: ['talk', 'gift', 'spar', 'task', 'shop', 'sworn']
        },
        'huangtu-elder': {
            id: 'huangtu-elder',
            name: '星土长老',
            type: 'elder',
            sect: 'huangtu',
            dialogs: [
                '土系功法，厚重沉稳！',
                '打好基础，方能厚积薄发！'
            ],
            actions: ['talk']
        },
        'huangtu-skill-master': {
            id: 'huangtu-skill-master',
            name: '传功长老',
            type: 'skill-master',
            sect: 'huangtu',
            dialogs: [
                '想要学习本门功法？',
                '先看看你的贡献够不够！'
            ],
            actions: ['talk', 'learn-skill']
        },
        'huangtu-task-master': {
            id: 'huangtu-task-master',
            name: '后土堂主',
            type: 'task-master',
            sect: 'huangtu',
            dialogs: [
                '来接任务吗？',
                '完成任务可获得贡献和奖励！'
            ],
            actions: ['talk', 'take-quest']
        }
    },

    MONSTERS: {
        // 青岚村相关怪物
        'wild-rabbit': {
            id: 'wild-rabbit',
            name: '野兔',
            level: 1,
            realm: '炼气期',
            hp: 100,
            maxHp: 100,
            attack: 10,
            defense: 2,
            element: '木',
            cultivation: 30,
            rarity: 'common',
            skills: ['跳跃'],
            drops: [
                { item: '兔肉', weight: 50, min: 1, max: 2 },
                { item: '野兔皮毛', weight: 40, min: 1, max: 1 },
                { item: '银两', weight: 30, min: 3, max: 10 },
                { item: '破烂武器', weight: 20, min: 1, max: 1 }
            ]
        },
        'miasma-worm': {
            id: 'miasma-worm',
            name: '瘴气蠕虫',
            level: 6,
            realm: '炼气期',
            hp: 300,
            maxHp: 300,
            attack: 30,
            defense: 8,
            element: '土',
            cultivation: 240,
            rarity: 'elite',
            skills: ['瘴气喷射', '缠绕'],
            drops: [
                { item: '瘴气核心', weight: 30, min: 1, max: 1 },
                { item: '蠕虫肉', weight: 20, min: 1, max: 2 },
                { item: '银两', weight: 40, min: 20, max: 50 },
                { item: '一阶法器', weight: 25, min: 1, max: 1 }
            ]
        },
        'shadow-monster': {
            id: 'shadow-monster',
            name: '黑影怪物',
            level: 9,
            realm: '炼气期',
            hp: 450,
            maxHp: 450,
            attack: 45,
            defense: 12,
            element: '暗',
            cultivation: 180,
            rarity: 'elite',
            skills: ['黑影爪', '瘴气攻击'],
            drops: [
                { item: '黑影精华', weight: 30, min: 1, max: 1 },
                { item: '暗影石', weight: 20, min: 1, max: 1 },
                { item: '银两', weight: 40, min: 30, max: 80 },
                { item: '长剑', weight: 25, min: 1, max: 1 }
            ]
        },
        'shadow-leader': {
            id: 'shadow-leader',
            name: '黑影先锋',
            level: 10,
            realm: '炼气期',
            hp: 500,
            maxHp: 500,
            attack: 50,
            defense: 15,
            element: '暗',
            cultivation: 250,
            rarity: 'boss',
            skills: ['黑影冲击', '瘴气爆发', '暗影领域'],
            drops: [
                { item: '玉佩碎片', weight: 100, min: 1, max: 1 },
                { item: '黑影核心', weight: 50, min: 1, max: 1 },
                { item: '银两', weight: 60, min: 100, max: 200 },
                { item: '金阳剑', weight: 30, min: 1, max: 1 },
                { item: '回春珠', weight: 30, min: 1, max: 1 },
                { item: '水灵珠', weight: 30, min: 1, max: 1 },
                { item: '火灵珠', weight: 30, min: 1, max: 1 },
                { item: '土灵珠', weight: 30, min: 1, max: 1 }
            ]
        },
        'wild-boar': {
            id: 'wild-boar',
            name: '野猪',
            level: 1,
            realm: '炼气期',
            hp: 120,
            maxHp: 120,
            attack: 15,
            defense: 3,
            element: '土',
            cultivation: 20,
            rarity: 'common',
            skills: ['冲撞'],
            drops: [
                { item: '野猪肉', weight: 50, min: 1, max: 2 },
                { item: '猪皮', weight: 30, min: 1, max: 1 },
                { item: '银两', weight: 40, min: 5, max: 15 },
                { item: '破烂武器', weight: 20, min: 1, max: 1 }
            ]
        },
        'sparrow-demon': {
            id: 'sparrow-demon',
            name: '麻雀妖',
            level: 1,
            realm: '炼气期',
            hp: 90,
            maxHp: 90,
            attack: 12,
            defense: 2,
            element: '火',
            cultivation: 25,
            rarity: 'common',
            skills: ['火球术'],
            drops: [
                { item: '妖羽', weight: 40, min: 1, max: 1 },
                { item: '妖丹', weight: 10, min: 1, max: 1 },
                { item: '银两', weight: 35, min: 5, max: 20 },
                { item: '破烂武器', weight: 20, min: 1, max: 1 }
            ]
        },
        'wood-wolf': {
            id: 'wood-wolf',
            name: '木狼',
            level: 3,
            realm: '炼气期',
            hp: 180,
            maxHp: 180,
            attack: 20,
            defense: 5,
            element: '木',
            cultivation: 60,
            rarity: 'common',
            skills: ['撕咬', '藤蔓缠绕'],
            drops: [
                { item: '狼皮', weight: 45, min: 1, max: 1 },
                { item: '狼牙', weight: 35, min: 1, max: 2 },
                { item: '银两', weight: 50, min: 10, max: 30 },
                { item: '一阶法器', weight: 25, min: 1, max: 1 }
            ]
        },
        'tree-spirit': {
            id: 'tree-spirit',
            name: '树精',
            level: 4,
            realm: '炼气期',
            hp: 220,
            maxHp: 220,
            attack: 18,
            defense: 8,
            element: '木',
            cultivation: 80,
            rarity: 'common',
            skills: ['根须穿刺', '自然恢复'],
            drops: [
                { item: '木材', weight: 60, min: 1, max: 3 },
                { item: '树心', weight: 20, min: 1, max: 1 },
                { item: '银两', weight: 45, min: 15, max: 40 },
                { item: '一阶法器', weight: 25, min: 1, max: 1 }
            ]
        },
        'forest-bear': {
            id: 'forest-bear',
            name: '森林巨熊',
            level: 6,
            realm: '炼气期',
            hp: 300,
            maxHp: 300,
            attack: 30,
            defense: 12,
            element: '土',
            cultivation: 150,
            rarity: 'uncommon',
            skills: ['熊掌拍击', '大地震颤'],
            drops: [
                { item: '熊掌', weight: 40, min: 1, max: 2 },
                { item: '熊胆', weight: 25, min: 1, max: 1 },
                { item: '银两', weight: 55, min: 20, max: 60 },
                { item: '回春丹', weight: 15, min: 1, max: 2 },
                { item: '长剑', weight: 25, min: 1, max: 1 }
            ]
        },
        'ancient-tree-demon': {
            id: 'ancient-tree-demon',
            name: '古树妖',
            level: 8,
            realm: '筑基期',
            hp: 800,
            maxHp: 800,
            attack: 50,
            defense: 30,
            element: '木',
            cultivation: 300,
            rarity: 'rare',
            skills: ['根须穿刺', '自然恢复', '古树之怒'],
            drops: [
                { item: '万年树心', weight: 30, min: 1, max: 1 },
                { item: '妖丹', weight: 25, min: 1, max: 1 },
                { item: '银两', weight: 60, min: 50, max: 150 },
                { item: '筑基丹', weight: 10, min: 1, max: 1 },
                { item: '青木杖', weight: 15, min: 1, max: 1 },
                { item: '灵木杖', weight: 10, min: 1, max: 1 },
                { item: '青木秘典', weight: 5, min: 1, max: 1 }
            ]
        },

        'rock-golem': {
            id: 'rock-golem',
            name: '岩石傀儡',
            level: 4,
            realm: '炼气期',
            hp: 220,
            maxHp: 220,
            attack: 18,
            defense: 10,
            element: '土',
            cultivation: 100,
            rarity: 'uncommon',
            skills: ['重拳', '岩石护盾'],
            drops: [
                { item: '矿石', weight: 55, min: 1, max: 3 },
                { item: '傀儡核心', weight: 25, min: 1, max: 1 },
                { item: '银两', weight: 50, min: 15, max: 45 }
            ]
        },
        'thunder-eagle': {
            id: 'thunder-eagle',
            name: '雷鹰',
            level: 7,
            realm: '筑基期',
            hp: 600,
            maxHp: 600,
            attack: 40,
            defense: 15,
            element: '火',
            cultivation: 200,
            rarity: 'uncommon',
            skills: ['利爪撕裂', '闪电攻击'],
            drops: [
                { item: '雷鹰羽毛', weight: 45, min: 1, max: 2 },
                { item: '雷丹', weight: 15, min: 1, max: 1 },
                { item: '银两', weight: 55, min: 30, max: 80 }
            ]
        },
        'earth-titan': {
            id: 'earth-titan',
            name: '土之泰坦',
            level: 10,
            realm: '筑基期',
            hp: 1000,
            maxHp: 1000,
            attack: 60,
            defense: 40,
            element: '土',
            cultivation: 500,
            rarity: 'epic',
            skills: ['重拳', '大地震颤', '泰坦之怒'],
            drops: [
                { item: '土之心', weight: 35, min: 1, max: 1 },
                { item: '泰坦核心', weight: 20, min: 1, max: 1 },
                { item: '银两', weight: 65, min: 100, max: 300 },
                { item: '筑基丹', weight: 15, min: 1, max: 2 },
                { item: '皇土盾', weight: 15, min: 1, max: 1 },
                { item: '岩纹佩', weight: 10, min: 1, max: 1 },
                { item: '皇土秘典', weight: 5, min: 1, max: 1 }
            ]
        },
        'fire-serpent': {
            id: 'fire-serpent',
            name: '火蛇',
            level: 2,
            realm: '炼气期',
            hp: 140,
            maxHp: 140,
            attack: 15,
            defense: 3,
            element: '火',
            cultivation: 35,
            rarity: 'common',
            skills: ['火球术', '毒牙'],
            drops: [
                { item: '蛇鳞', weight: 45, min: 1, max: 2 },
                { item: '蛇胆', weight: 20, min: 1, max: 1 },
                { item: '银两', weight: 40, min: 8, max: 22 }
            ]
        },
        'water-slime': {
            id: 'water-slime',
            name: '水史莱姆',
            level: 2,
            realm: '炼气期',
            hp: 160,
            maxHp: 160,
            attack: 12,
            defense: 6,
            element: '水',
            cultivation: 30,
            rarity: 'common',
            skills: ['水球', '分裂'],
            drops: [
                { item: '史莱姆液', weight: 55, min: 1, max: 2 },
                { item: '银两', weight: 35, min: 5, max: 18 }
            ]
        },
        'wild-monster': {
            id: 'wild-monster',
            name: '野猪',
            level: 2,
            realm: '炼气期',
            hp: 140,
            maxHp: 140,
            attack: 15,
            defense: 4,
            element: '土',
            cultivation: 35,
            rarity: 'common',
            skills: ['冲撞'],
            drops: [
                { item: '野猪肉', weight: 50, min: 1, max: 2 },
                { item: '猪皮', weight: 30, min: 1, max: 1 },
                { item: '银两', weight: 40, min: 5, max: 15 },
                { item: '破烂武器', weight: 20, min: 1, max: 1 }
            ]
        },
        'elite-monster': {
            id: 'elite-monster',
            name: '精英野猪',
            level: 5,
            realm: '炼气期',
            hp: 280,
            maxHp: 280,
            attack: 25,
            defense: 8,
            element: '土',
            cultivation: 100,
            rarity: 'uncommon',
            skills: ['冲撞', '重拳'],
            drops: [
                { item: '野猪肉', weight: 45, min: 1, max: 3 },
                { item: '猪皮', weight: 35, min: 1, max: 2 },
                { item: '银两', weight: 55, min: 20, max: 50 },
                { item: '一阶法器', weight: 25, min: 1, max: 1 }
            ]
        },
        'boss-monster': {
            id: 'boss-monster',
            name: '野猪首领',
            level: 8,
            realm: '炼气期',
            hp: 400,
            maxHp: 400,
            attack: 40,
            defense: 15,
            element: '土',
            cultivation: 250,
            rarity: 'rare',
            skills: ['熊掌拍击', '大地震颤'],
            drops: [
                { item: '野猪肉', weight: 40, min: 2, max: 5 },
                { item: '猪皮', weight: 30, min: 1, max: 3 },
                { item: '银两', weight: 60, min: 50, max: 100 },
                { item: '长剑', weight: 30, min: 1, max: 1 },
                { item: '金阳剑', weight: 25, min: 1, max: 1 }
            ]
        },
        'water-monster': {
            id: 'water-monster',
            name: '水妖',
            level: 4,
            realm: '炼气期',
            hp: 220,
            maxHp: 220,
            attack: 20,
            defense: 8,
            element: '水',
            cultivation: 80,
            rarity: 'common',
            skills: ['水球'],
            drops: [
                { item: '史莱姆液', weight: 60, min: 1, max: 2 },
                { item: '银两', weight: 45, min: 10, max: 30 },
                { item: '一阶法器', weight: 25, min: 1, max: 1 }
            ]
        },
        'demon': {
            id: 'demon',
            name: '魔怪',
            level: 5,
            realm: '炼气期',
            hp: 280,
            maxHp: 280,
            attack: 25,
            defense: 8,
            element: '火',
            cultivation: 90,
            rarity: 'uncommon',
            skills: ['火球术'],
            drops: [
                { item: '妖丹', weight: 40, min: 1, max: 1 },
                { item: '银两', weight: 50, min: 15, max: 35 }
            ]
        },
        'demon-boss': {
            id: 'demon-boss',
            name: '魔王',
            level: 10,
            realm: '炼气期',
            hp: 500,
            maxHp: 500,
            attack: 50,
            defense: 15,
            element: '火',
            cultivation: 400,
            rarity: 'epic',
            skills: ['火球术', '利爪撕裂'],
            drops: [
                { item: '妖丹', weight: 50, min: 2, max: 3 },
                { item: '银两', weight: 60, min: 80, max: 150 }
            ]
        },
        'invade': {
            id: 'invade',
            name: '入侵妖兽',
            level: 6,
            realm: '炼气期',
            hp: 300,
            maxHp: 300,
            attack: 30,
            defense: 10,
            element: '土',
            cultivation: 120,
            rarity: 'uncommon',
            skills: ['横斩', '重拳'],
            drops: [
                { item: '狼皮', weight: 50, min: 1, max: 1 },
                { item: '银两', weight: 55, min: 20, max: 45 }
            ]
        },
        'army': {
            id: 'army',
            name: '敌方大军',
            level: 9,
            realm: '炼气期',
            hp: 450,
            maxHp: 450,
            attack: 45,
            defense: 12,
            element: '土',
            cultivation: 300,
            rarity: 'rare',
            skills: ['横斩', '大地震颤'],
            drops: [
                { item: '矿石', weight: 55, min: 2, max: 3 },
                { item: '银两', weight: 60, min: 50, max: 100 }
            ]
        },
        // 中原修真区域怪物
        'wild-dog': {
            id: 'wild-dog',
            name: '野狗',
            level: 1,
            realm: '炼气期',
            hp: 100,
            maxHp: 100,
            attack: 10,
            defense: 2,
            element: '土',
            cultivation: 20,
            rarity: 'common',
            skills: ['撕咬'],
            drops: [
                { item: '铜钱', weight: 50, min: 5, max: 10 },
                { item: '粗布衫', weight: 30, min: 1, max: 1 },
                { item: '止血草', weight: 40, min: 1, max: 2 }
            ]
        },
        'bandit': {
            id: 'bandit',
            name: '流寇',
            level: 3,
            realm: '炼气期',
            hp: 180,
            maxHp: 180,
            attack: 20,
            defense: 5,
            element: '金',
            cultivation: 40,
            rarity: 'common',
            skills: ['挥刀'],
            drops: [
                { item: '铜钱', weight: 50, min: 10, max: 20 },
                { item: '粗布衫', weight: 25, min: 1, max: 1 },
                { item: '止血草', weight: 35, min: 1, max: 3 }
            ]
        },
        'gray-wolf': {
            id: 'gray-wolf',
            name: '灰狼',
            level: 6,
            realm: '炼气期',
            hp: 300,
            maxHp: 300,
            attack: 30,
            defense: 10,
            element: '土',
            cultivation: 80,
            rarity: 'common',
            skills: ['扑击'],
            drops: [
                { item: '生铁剑', weight: 30, min: 1, max: 1 },
                { item: '兽皮', weight: 40, min: 1, max: 2 },
                { item: '一阶灵石', weight: 30, min: 1, max: 1 }
            ]
        },
        'mountain-bandit': {
            id: 'mountain-bandit',
            name: '山匪',
            level: 8,
            realm: '炼气期',
            hp: 400,
            maxHp: 400,
            attack: 40,
            defense: 12,
            element: '金',
            cultivation: 100,
            rarity: 'uncommon',
            skills: ['劈砍'],
            drops: [
                { item: '生铁剑', weight: 35, min: 1, max: 1 },
                { item: '兽皮', weight: 35, min: 1, max: 2 },
                { item: '一阶灵石', weight: 30, min: 1, max: 2 }
            ]
        },
        'green-wolf': {
            id: 'green-wolf',
            name: '青狼',
            level: 11,
            realm: '炼气期',
            hp: 250,
            maxHp: 250,
            attack: 25,
            defense: 8,
            element: '木',
            cultivation: 150,
            rarity: 'uncommon',
            skills: ['木刺'],
            drops: [
                { item: '木系功法残页', weight: 30, min: 1, max: 1 },
                { item: '灵木', weight: 40, min: 1, max: 3 },
                { item: '一阶法器', weight: 30, min: 1, max: 1 }
            ]
        },
        'ancient-tree-spirit': {
            id: 'ancient-tree-spirit',
            name: '树精',
            level: 13,
            realm: '炼气期',
            hp: 300,
            maxHp: 300,
            attack: 22,
            defense: 10,
            element: '木',
            cultivation: 180,
            rarity: 'uncommon',
            skills: ['缠绕'],
            drops: [
                { item: '木系功法残页', weight: 35, min: 1, max: 1 },
                { item: '灵木', weight: 35, min: 2, max: 3 },
                { item: '一阶法器', weight: 30, min: 1, max: 1 }
            ]
        },
        'water-snake': {
            id: 'water-snake',
            name: '水蛇',
            level: 16,
            realm: '炼气期',
            hp: 350,
            maxHp: 350,
            attack: 35,
            defense: 10,
            element: '水',
            cultivation: 220,
            rarity: 'uncommon',
            skills: ['水箭'],
            drops: [
                { item: '水属性灵材', weight: 40, min: 1, max: 2 },
                { item: '清心丹', weight: 30, min: 1, max: 2 },
                { item: '二阶灵石', weight: 30, min: 1, max: 1 }
            ]
        },
        'fish-demon': {
            id: 'fish-demon',
            name: '渔妖',
            level: 18,
            realm: '炼气期',
            hp: 400,
            maxHp: 400,
            attack: 40,
            defense: 12,
            element: '水',
            cultivation: 250,
            rarity: 'uncommon',
            skills: ['毒咬'],
            drops: [
                { item: '水属性灵材', weight: 35, min: 2, max: 3 },
                { item: '清心丹', weight: 35, min: 1, max: 2 },
                { item: '二阶灵石', weight: 30, min: 1, max: 2 }
            ]
        },
        'earth-wolf': {
            id: 'earth-wolf',
            name: '土狼',
            level: 21,
            realm: '筑基期',
            hp: 300,
            maxHp: 300,
            attack: 25,
            defense: 8,
            element: '土',
            cultivation: 300,
            rarity: 'uncommon',
            skills: ['落石'],
            drops: [
                { item: '土系防御法器', weight: 30, min: 1, max: 1 },
                { item: '中品灵石', weight: 35, min: 1, max: 2 },
                { item: '筑基丹材料', weight: 35, min: 1, max: 2 }
            ]
        },
        'stone-golem': {
            id: 'stone-golem',
            name: '石傀儡',
            level: 23,
            realm: '筑基期',
            hp: 400,
            maxHp: 400,
            attack: 30,
            defense: 12,
            element: '土',
            cultivation: 350,
            rarity: 'rare',
            skills: ['冲撞'],
            drops: [
                { item: '土系防御法器', weight: 35, min: 1, max: 1 },
                { item: '中品灵石', weight: 30, min: 2, max: 3 },
                { item: '筑基丹材料', weight: 35, min: 1, max: 3 }
            ]
        },
        // 南疆蛮荒区域怪物
        'scorpion': {
            id: 'scorpion',
            name: '毒蝎',
            level: 26,
            realm: '筑基期',
            hp: 500,
            maxHp: 500,
            attack: 35,
            defense: 10,
            element: '木',
            cultivation: 400,
            rarity: 'uncommon',
            skills: ['毒刺'],
            drops: [
                { item: '毒抗丹', weight: 35, min: 1, max: 2 },
                { item: '蛊虫', weight: 35, min: 1, max: 2 },
                { item: '二阶灵石', weight: 30, min: 2, max: 3 }
            ]
        },
        'miasma-demon': {
            id: 'miasma-demon',
            name: '瘴气妖',
            level: 28,
            realm: '筑基期',
            hp: 600,
            maxHp: 600,
            attack: 40,
            defense: 12,
            element: '木',
            cultivation: 450,
            rarity: 'uncommon',
            skills: ['瘴气弥漫'],
            drops: [
                { item: '毒抗丹', weight: 30, min: 2, max: 3 },
                { item: '蛊虫', weight: 40, min: 1, max: 2 },
                { item: '二阶灵石', weight: 30, min: 2, max: 3 }
            ]
        },
        'witch-doctor': {
            id: 'witch-doctor',
            name: '巫蛊师',
            level: 31,
            realm: '筑基期',
            hp: 700,
            maxHp: 700,
            attack: 45,
            defense: 15,
            element: '木',
            cultivation: 500,
            rarity: 'rare',
            skills: ['蛊毒咒'],
            drops: [
                { item: '巫蛊秘籍', weight: 30, min: 1, max: 1 },
                { item: '尸毒粉', weight: 35, min: 1, max: 2 },
                { item: '金丹丹材料', weight: 35, min: 1, max: 2 }
            ]
        },
        'corpse-puppet': {
            id: 'corpse-puppet',
            name: '尸傀',
            level: 33,
            realm: '筑基期',
            hp: 750,
            maxHp: 750,
            attack: 50,
            defense: 18,
            element: '土',
            cultivation: 550,
            rarity: 'rare',
            skills: ['尸爆'],
            drops: [
                { item: '巫蛊秘籍', weight: 35, min: 1, max: 1 },
                { item: '尸毒粉', weight: 30, min: 2, max: 3 },
                { item: '金丹丹材料', weight: 35, min: 1, max: 2 }
            ]
        },
        'tomb-guardian': {
            id: 'tomb-guardian',
            name: '守墓石像',
            level: 36,
            realm: '筑基期',
            hp: 15000,
            maxHp: 15000,
            attack: 1500,
            defense: 800,
            element: '土',
            cultivation: 600,
            rarity: 'rare',
            skills: ['石像冲击'],
            drops: [
                { item: '古神残卷', weight: 30, min: 1, max: 1 },
                { item: '高阶防御法宝', weight: 35, min: 1, max: 1 },
                { item: '三阶灵石', weight: 35, min: 1, max: 2 }
            ]
        },
        'ghost-general': {
            id: 'ghost-general',
            name: '鬼将',
            level: 38,
            realm: '筑基期',
            hp: 20000,
            maxHp: 20000,
            attack: 2000,
            defense: 1000,
            element: '水',
            cultivation: 650,
            rarity: 'epic',
            skills: ['鬼哭斩'],
            drops: [
                { item: '古神残卷', weight: 35, min: 1, max: 1 },
                { item: '高阶防御法宝', weight: 30, min: 1, max: 1 },
                { item: '三阶灵石', weight: 35, min: 2, max: 3 }
            ]
        },
        // 东海仙岛区域怪物
        'crab-general': {
            id: 'crab-general',
            name: '蟹将',
            level: 41,
            realm: '金丹期',
            hp: 1500,
            maxHp: 1500,
            attack: 80,
            defense: 30,
            element: '水',
            cultivation: 800,
            rarity: 'uncommon',
            skills: ['钳击'],
            drops: [
                { item: '珍珠', weight: 35, min: 1, max: 3 },
                { item: '水属性功法', weight: 30, min: 1, max: 1 },
                { item: '三阶灵石', weight: 35, min: 2, max: 3 }
            ]
        },
        'shrimp-soldier': {
            id: 'shrimp-soldier',
            name: '虾兵',
            level: 43,
            realm: '金丹期',
            hp: 1200,
            maxHp: 1200,
            attack: 70,
            defense: 25,
            element: '水',
            cultivation: 750,
            rarity: 'common',
            skills: ['水炮'],
            drops: [
                { item: '珍珠', weight: 40, min: 1, max: 2 },
                { item: '水属性功法', weight: 35, min: 1, max: 1 },
                { item: '三阶灵石', weight: 25, min: 1, max: 2 }
            ]
        },
        'dragon-prince': {
            id: 'dragon-prince',
            name: '龙子',
            level: 46,
            realm: '金丹期',
            hp: 2000,
            maxHp: 2000,
            attack: 120,
            defense: 40,
            element: '水',
            cultivation: 1000,
            rarity: 'epic',
            skills: ['龙息'],
            drops: [
                { item: '龙鳞', weight: 30, min: 1, max: 2 },
                { item: '避水珠', weight: 30, min: 1, max: 1 },
                { item: '元婴丹材料', weight: 20, min: 1, max: 2 },
                { item: '仙器碎片', weight: 20, min: 1, max: 1 }
            ]
        },
        'turtle-prime-minister': {
            id: 'turtle-prime-minister',
            name: '龟丞相',
            level: 48,
            realm: '金丹期',
            hp: 2200,
            maxHp: 2200,
            attack: 110,
            defense: 45,
            element: '水',
            cultivation: 1100,
            rarity: 'epic',
            skills: ['水幕天华'],
            drops: [
                { item: '龙鳞', weight: 35, min: 1, max: 2 },
                { item: '避水珠', weight: 30, min: 1, max: 1 },
                { item: '元婴丹材料', weight: 20, min: 2, max: 3 },
                { item: '仙器碎片', weight: 15, min: 1, max: 1 }
            ]
        },
        // 北境雪原区域怪物
        'snow-wolf': {
            id: 'snow-wolf',
            name: '雪狼',
            level: 61,
            realm: '元婴期',
            hp: 4000,
            maxHp: 4000,
            attack: 200,
            defense: 60,
            element: '冰',
            cultivation: 1500,
            rarity: 'uncommon',
            skills: ['冰爪'],
            drops: [
                { item: '冰魄', weight: 35, min: 1, max: 2 },
                { item: '耐寒丹', weight: 30, min: 1, max: 2 },
                { item: '四阶灵石', weight: 35, min: 1, max: 2 }
            ]
        },
        'ice-ape': {
            id: 'ice-ape',
            name: '冰猿',
            level: 65,
            realm: '元婴期',
            hp: 5000,
            maxHp: 5000,
            attack: 250,
            defense: 70,
            element: '冰',
            cultivation: 1600,
            rarity: 'rare',
            skills: ['雪崩'],
            drops: [
                { item: '冰魄', weight: 30, min: 2, max: 3 },
                { item: '耐寒丹', weight: 35, min: 1, max: 2 },
                { item: '四阶灵石', weight: 35, min: 2, max: 3 }
            ]
        },
        'ice-maiden': {
            id: 'ice-maiden',
            name: '冰女',
            level: 71,
            realm: '元婴期',
            hp: 6000,
            maxHp: 6000,
            attack: 300,
            defense: 80,
            element: '冰',
            cultivation: 1800,
            rarity: 'rare',
            skills: ['冰封'],
            drops: [
                { item: '冰系法宝', weight: 30, min: 1, max: 1 },
                { item: '万年玄冰', weight: 30, min: 1, max: 1 },
                { item: '化神丹材料', weight: 40, min: 1, max: 2 }
            ]
        },
        'ice-golem': {
            id: 'ice-golem',
            name: '冰傀儡',
            level: 75,
            realm: '元婴期',
            hp: 7000,
            maxHp: 7000,
            attack: 350,
            defense: 90,
            element: '冰',
            cultivation: 2000,
            rarity: 'epic',
            skills: ['冰刺雨'],
            drops: [
                { item: '冰系法宝', weight: 35, min: 1, max: 1 },
                { item: '万年玄冰', weight: 35, min: 1, max: 1 },
                { item: '化神丹材料', weight: 30, min: 2, max: 3 }
            ]
        },
        // 西漠沙海区域怪物
        'sand-worm': {
            id: 'sand-worm',
            name: '沙虫',
            level: 81,
            realm: '化神期',
            hp: 15000,
            maxHp: 15000,
            attack: 600,
            defense: 200,
            element: '土',
            cultivation: 2500,
            rarity: 'uncommon',
            skills: ['沙暴'],
            drops: [
                { item: '沙棘果', weight: 35, min: 1, max: 3 },
                { item: '沙漠地图', weight: 30, min: 1, max: 1 },
                { item: '五阶灵石', weight: 35, min: 1, max: 2 }
            ]
        },
        'sand-bandit': {
            id: 'sand-bandit',
            name: '沙匪',
            level: 85,
            realm: '化神期',
            hp: 20000,
            maxHp: 20000,
            attack: 700,
            defense: 250,
            element: '土',
            cultivation: 60000,
            rarity: 'uncommon',
            skills: ['弯刀斩', '沙暴'],
            drops: [
                { item: '沙棘果', weight: 30, min: 2, max: 3 },
                { item: '沙漠地图', weight: 35, min: 1, max: 1 },
                { item: '五阶灵石', weight: 35, min: 2, max: 3 }
            ]
        },
        'mummy': {
            id: 'mummy',
            name: '木乃伊',
            level: 91,
            realm: '化神期',
            hp: 25000,
            maxHp: 25000,
            attack: 800,
            defense: 300,
            element: '土',
            cultivation: 70000,
            rarity: 'rare',
            skills: ['诅咒', '尸爆'],
            drops: [
                { item: '古域秘宝', weight: 30, min: 1, max: 1 },
                { item: '高阶功法', weight: 30, min: 1, max: 1 },
                { item: '炼虚丹材料', weight: 40, min: 1, max: 2 }
            ]
        },
        'tomb-guardian-general': {
            id: 'tomb-guardian-general',
            name: '守墓将军',
            level: 95,
            realm: '化神期',
            hp: 30000,
            maxHp: 30000,
            attack: 1000,
            defense: 400,
            element: '土',
            cultivation: 80000,
            rarity: 'epic',
            skills: ['破甲刀', '大地守护', '泰坦之怒'],
            drops: [
                { item: '古域秘宝', weight: 35, min: 1, max: 1 },
                { item: '高阶功法', weight: 35, min: 1, max: 1 },
                { item: '炼虚丹材料', weight: 30, min: 2, max: 3 }
            ]
        },
        // 金丹期秘境怪物
        'golden-beast': {
            id: 'golden-beast',
            name: '金灵兽',
            level: 55,
            realm: '筑基期',
            hp: 800,
            maxHp: 800,
            attack: 50,
            defense: 20,
            element: '金',
            cultivation: 5000,
            rarity: 'epic',
            skills: ['金爪击', '金灵斩'],
            drops: [
                { item: '金灵珠', weight: 40, min: 1, max: 1 },
                { item: '金系功法', weight: 30, min: 1, max: 1 },
                { item: '三阶灵石', weight: 30, min: 1, max: 2 }
            ]
        },
        'golden-core-boss': {
            id: 'golden-core-boss',
            name: '金灵王',
            level: 60,
            realm: '筑基期',
            hp: 1000,
            maxHp: 1000,
            attack: 60,
            defense: 30,
            element: '金',
            cultivation: 10000,
            rarity: 'legendary',
            skills: ['金灵领域', '金灵破灭斩'],
            drops: [
                { item: '金灵珠', weight: 50, min: 1, max: 2 },
                { item: '地灵宝', weight: 40, min: 1, max: 1 },
                { item: '金丹玉', weight: 30, min: 1, max: 1 },
                { item: '金丹突破丹', weight: 20, min: 1, max: 1 },
                { item: '金灵印', weight: 25, min: 1, max: 1 },
                { item: '木灵珠', weight: 25, min: 1, max: 1 },
                { item: '水灵珠', weight: 25, min: 1, max: 1 },
                { item: '火灵珠', weight: 25, min: 1, max: 1 },
                { item: '土灵珠', weight: 25, min: 1, max: 1 }
            ]
        },
        'earth-beast': {
            id: 'earth-beast',
            name: '地灵兽',
            level: 55,
            realm: '筑基期',
            hp: 800,
            maxHp: 800,
            attack: 50,
            defense: 25,
            element: '土',
            cultivation: 5000,
            rarity: 'epic',
            skills: ['地刺', '大地守护'],
            drops: [
                { item: '地灵宝', weight: 40, min: 1, max: 1 },
                { item: '土系功法', weight: 30, min: 1, max: 1 },
                { item: '三阶灵石', weight: 30, min: 1, max: 2 }
            ]
        },
        'earth-core-boss': {
            id: 'earth-core-boss',
            name: '地灵王',
            level: 60,
            realm: '筑基期',
            hp: 1000,
            maxHp: 1000,
            attack: 60,
            defense: 30,
            element: '土',
            cultivation: 10000,
            rarity: 'legendary',
            skills: ['地灵领域', '大地崩塌'],
            drops: [
                { item: '地灵宝', weight: 50, min: 1, max: 2 },
                { item: '金灵珠', weight: 40, min: 1, max: 1 },
                { item: '金丹玉', weight: 30, min: 1, max: 1 },
                { item: '金丹突破丹', weight: 20, min: 1, max: 1 }
            ]
        },
        // 元婴期秘境怪物
        'fire-beast': {
            id: 'fire-beast',
            name: '火灵兽',
            level: 110,
            realm: '金丹期',
            hp: 3000,
            maxHp: 3000,
            attack: 150,
            defense: 60,
            element: '火',
            cultivation: 20000,
            rarity: 'epic',
            skills: ['火焰喷射', '火灵斩'],
            drops: [
                { item: '火灵晶', weight: 40, min: 1, max: 1 },
                { item: '火系功法', weight: 30, min: 1, max: 1 },
                { item: '四阶灵石', weight: 30, min: 1, max: 2 }
            ]
        },
        'fire-ying-boss': {
            id: 'fire-ying-boss',
            name: '火灵王',
            level: 120,
            realm: '金丹期',
            hp: 5000,
            maxHp: 5000,
            attack: 250,
            defense: 100,
            element: '火',
            cultivation: 40000,
            rarity: 'legendary',
            skills: ['火灵领域', '焚天灭地'],
            drops: [
                { item: '火灵晶', weight: 50, min: 1, max: 2 },
                { item: '魂珠', weight: 40, min: 1, max: 1 },
                { item: '元婴果', weight: 30, min: 1, max: 1 },
                { item: '元婴突破丹', weight: 20, min: 1, max: 1 },
                { item: '金阳剑', weight: 25, min: 1, max: 1 },
                { item: '青木杖', weight: 25, min: 1, max: 1 },
                { item: '水月剑', weight: 25, min: 1, max: 1 },
                { item: '炎火剑', weight: 25, min: 1, max: 1 },
                { item: '后土盾', weight: 25, min: 1, max: 1 }
            ]
        },
        'soul-beast': {
            id: 'soul-beast',
            name: '魂灵兽',
            level: 110,
            realm: '金丹期',
            hp: 2800,
            maxHp: 2800,
            attack: 140,
            defense: 55,
            element: '暗',
            cultivation: 20000,
            rarity: 'epic',
            skills: ['灵魂冲击', '魂灵斩'],
            drops: [
                { item: '魂珠', weight: 40, min: 1, max: 1 },
                { item: '魂系功法', weight: 30, min: 1, max: 1 },
                { item: '四阶灵石', weight: 30, min: 1, max: 2 }
            ]
        },
        'soul-ying-boss': {
            id: 'soul-ying-boss',
            name: '魂灵王',
            level: 120,
            realm: '金丹期',
            hp: 4500,
            maxHp: 4500,
            attack: 220,
            defense: 90,
            element: '暗',
            cultivation: 40000,
            rarity: 'legendary',
            skills: ['魂灵领域', '灵魂破灭'],
            drops: [
                { item: '魂珠', weight: 50, min: 1, max: 2 },
                { item: '火灵晶', weight: 40, min: 1, max: 1 },
                { item: '元婴果', weight: 30, min: 1, max: 1 },
                { item: '元婴突破丹', weight: 20, min: 1, max: 1 }
            ]
        },
        // 化神期秘境怪物
        'ice-beast': {
            id: 'ice-beast',
            name: '冰灵兽',
            level: 170,
            realm: '元婴期',
            hp: 8000,
            maxHp: 8000,
            attack: 400,
            defense: 150,
            element: '冰',
            cultivation: 80000,
            rarity: 'epic',
            skills: ['冰锥术', '冰灵斩'],
            drops: [
                { item: '冰灵髓', weight: 40, min: 1, max: 1 },
                { item: '冰系功法', weight: 30, min: 1, max: 1 },
                { item: '五阶灵石', weight: 30, min: 1, max: 2 }
            ]
        },
        'ice-shen-boss': {
            id: 'ice-shen-boss',
            name: '冰灵王',
            level: 180,
            realm: '元婴期',
            hp: 12000,
            maxHp: 12000,
            attack: 600,
            defense: 200,
            element: '冰',
            cultivation: 160000,
            rarity: 'legendary',
            skills: ['冰灵领域', '冰封天地'],
            drops: [
                { item: '冰灵髓', weight: 50, min: 1, max: 2 },
                { item: '雷灵珠', weight: 40, min: 1, max: 1 },
                { item: '化神草', weight: 30, min: 1, max: 1 },
                { item: '化神突破丹', weight: 20, min: 1, max: 1 },
                { item: '金仙印', weight: 25, min: 1, max: 1 },
                { item: '灵木印', weight: 25, min: 1, max: 1 },
                { item: '水神印', weight: 25, min: 1, max: 1 },
                { item: '火神印', weight: 25, min: 1, max: 1 },
                { item: '土神印', weight: 25, min: 1, max: 1 }
            ]
        },
        'thunder-beast': {
            id: 'thunder-beast',
            name: '雷灵兽',
            level: 170,
            realm: '元婴期',
            hp: 7500,
            maxHp: 7500,
            attack: 375,
            defense: 140,
            element: '雷',
            cultivation: 80000,
            rarity: 'epic',
            skills: ['雷电术', '雷灵斩'],
            drops: [
                { item: '雷灵珠', weight: 40, min: 1, max: 1 },
                { item: '雷系功法', weight: 30, min: 1, max: 1 },
                { item: '五阶灵石', weight: 30, min: 1, max: 2 }
            ]
        },
        'thunder-shen-boss': {
            id: 'thunder-shen-boss',
            name: '雷灵王',
            level: 180,
            realm: '元婴期',
            hp: 11000,
            maxHp: 11000,
            attack: 550,
            defense: 180,
            element: '雷',
            cultivation: 160000,
            rarity: 'legendary',
            skills: ['雷灵领域', '雷霆万钧'],
            drops: [
                { item: '雷灵珠', weight: 50, min: 1, max: 2 },
                { item: '冰灵髓', weight: 40, min: 1, max: 1 },
                { item: '化神草', weight: 30, min: 1, max: 1 },
                { item: '化神突破丹', weight: 20, min: 1, max: 1 }
            ]
        },
        // 渡劫期秘境怪物
        'star-beast': {
            id: 'star-beast',
            name: '星空兽',
            level: 230,
            realm: '化神期',
            hp: 30000,
            maxHp: 30000,
            attack: 1200,
            defense: 400,
            element: '星空',
            cultivation: 300000,
            rarity: 'epic',
            skills: ['星芒术', '星空斩'],
            drops: [
                { item: '星空石', weight: 40, min: 1, max: 1 },
                { item: '星空功法', weight: 30, min: 1, max: 1 },
                { item: '六阶灵石', weight: 30, min: 1, max: 2 }
            ]
        },
        'star-jie-boss': {
            id: 'star-jie-boss',
            name: '星空王',
            level: 240,
            realm: '化神期',
            hp: 50000,
            maxHp: 50000,
            attack: 2000,
            defense: 600,
            element: '星空',
            cultivation: 600000,
            rarity: 'mythic',
            skills: ['星空领域', '星陨灭世'],
            drops: [
                { item: '星空石', weight: 50, min: 1, max: 2 },
                { item: '混沌结晶', weight: 40, min: 1, max: 1 },
                { item: '渡劫莲', weight: 30, min: 1, max: 1 },
                { item: '渡劫突破丹', weight: 20, min: 1, max: 1 },
                { item: '金仙印', weight: 25, min: 1, max: 1 },
                { item: '灵木印', weight: 25, min: 1, max: 1 },
                { item: '水神印', weight: 25, min: 1, max: 1 },
                { item: '火神印', weight: 25, min: 1, max: 1 },
                { item: '土神印', weight: 25, min: 1, max: 1 }
            ]
        },
        'chaos-beast': {
            id: 'chaos-beast',
            name: '混沌兽',
            level: 230,
            realm: '化神期',
            hp: 28000,
            maxHp: 28000,
            attack: 1120,
            defense: 360,
            element: '混沌',
            cultivation: 300000,
            rarity: 'epic',
            skills: ['混沌术', '混沌斩'],
            drops: [
                { item: '混沌结晶', weight: 40, min: 1, max: 1 },
                { item: '混沌功法', weight: 30, min: 1, max: 1 },
                { item: '六阶灵石', weight: 30, min: 1, max: 2 }
            ]
        },
        'chaos-jie-boss': {
            id: 'chaos-jie-boss',
            name: '混沌王',
            level: 240,
            realm: '化神期',
            hp: 560000,
            maxHp: 560000,
            attack: 64000,
            defense: 33600,
            element: '混沌',
            cultivation: 600000,
            rarity: 'mythic',
            skills: ['混沌领域', '混沌灭世'],
            drops: [
                { item: '混沌结晶', weight: 50, min: 1, max: 2 },
                { item: '星空石', weight: 40, min: 1, max: 1 },
                { item: '渡劫莲', weight: 30, min: 1, max: 1 },
                { item: '渡劫突破丹', weight: 20, min: 1, max: 1 }
            ]
        },
        // 世界BOSS
        'world-boss-jinyang': {
            id: 'world-boss-jinyang',
            name: '金阳妖兽',
            level: 60,
            realm: '筑基期',
            hp: 15000,
            maxHp: 15000,
            attack: 1500,
            defense: 900,
            element: '金',
            cultivation: 15000,
            rarity: 'legendary',
            skills: ['金阳领域', '金阳破灭斩'],
            drops: [
                { item: '金灵珠', weight: 50, min: 1, max: 1 },
                { item: '地灵宝', weight: 40, min: 1, max: 1 },
                { item: '金丹玉', weight: 30, min: 1, max: 1 },
                { item: '金丹突破丹', weight: 20, min: 1, max: 1 },
                { item: '高阶金系法宝', weight: 25, min: 1, max: 1 }
            ]
        },
        'world-boss-qingmu': {
            id: 'world-boss-qingmu',
            name: '青木妖兽',
            level: 60,
            realm: '筑基期',
            hp: 16000,
            maxHp: 16000,
            attack: 1400,
            defense: 1000,
            element: '木',
            cultivation: 15000,
            rarity: 'legendary',
            skills: ['青木领域', '青木缠绕'],
            drops: [
                { item: '金灵珠', weight: 40, min: 1, max: 1 },
                { item: '地灵宝', weight: 50, min: 1, max: 1 },
                { item: '金丹玉', weight: 30, min: 1, max: 1 },
                { item: '金丹突破丹', weight: 20, min: 1, max: 1 },
                { item: '高阶木系法宝', weight: 25, min: 1, max: 1 }
            ]
        },
        'world-boss-shuiyue': {
            id: 'world-boss-shuiyue',
            name: '水月妖兽',
            level: 120,
            realm: '金丹期',
            hp: 50000,
            maxHp: 50000,
            attack: 5000,
            defense: 3000,
            element: '水',
            cultivation: 50000,
            rarity: 'legendary',
            skills: ['水月领域', '水月冰封'],
            drops: [
                { item: '火灵晶', weight: 50, min: 1, max: 1 },
                { item: '魂珠', weight: 40, min: 1, max: 1 },
                { item: '元婴果', weight: 30, min: 1, max: 1 },
                { item: '元婴突破丹', weight: 20, min: 1, max: 1 },
                { item: '高阶水系法宝', weight: 25, min: 1, max: 1 }
            ]
        },
        'world-boss-yanhuo': {
            id: 'world-boss-yanhuo',
            name: '炎火妖兽',
            level: 120,
            realm: '金丹期',
            hp: 48000,
            maxHp: 48000,
            attack: 5200,
            defense: 2800,
            element: '火',
            cultivation: 50000,
            rarity: 'legendary',
            skills: ['炎火领域', '炎火焚天'],
            drops: [
                { item: '火灵晶', weight: 50, min: 1, max: 1 },
                { item: '魂珠', weight: 40, min: 1, max: 1 },
                { item: '元婴果', weight: 30, min: 1, max: 1 },
                { item: '元婴突破丹', weight: 20, min: 1, max: 1 },
                { item: '高阶火系法宝', weight: 25, min: 1, max: 1 }
            ]
        },
        'world-boss-huangtu': {
            id: 'world-boss-huangtu',
            name: '皇土妖兽',
            level: 180,
            realm: '元婴期',
            hp: 200000,
            maxHp: 200000,
            attack: 20000,
            defense: 12000,
            element: '土',
            cultivation: 200000,
            rarity: 'legendary',
            skills: ['皇土领域', '皇土崩塌'],
            drops: [
                { item: '冰灵髓', weight: 50, min: 1, max: 1 },
                { item: '雷灵珠', weight: 40, min: 1, max: 1 },
                { item: '化神草', weight: 30, min: 1, max: 1 },
                { item: '化神突破丹', weight: 20, min: 1, max: 1 },
                { item: '高阶土系法宝', weight: 25, min: 1, max: 1 }
            ]
        },
        'world-boss-dragon': {
            id: 'world-boss-dragon',
            name: '海龙妖兽',
            level: 180,
            realm: '元婴期',
            hp: 190000,
            maxHp: 190000,
            attack: 21000,
            defense: 11400,
            element: '水',
            cultivation: 200000,
            rarity: 'legendary',
            skills: ['海龙领域', '海龙喷水'],
            drops: [
                { item: '冰灵髓', weight: 50, min: 1, max: 1 },
                { item: '雷灵珠', weight: 40, min: 1, max: 1 },
                { item: '化神草', weight: 30, min: 1, max: 1 },
                { item: '化神突破丹', weight: 20, min: 1, max: 1 },
                { item: '高阶水系法宝', weight: 25, min: 1, max: 1 }
            ]
        }
    },
    
    MONSTER_SKILLS: {
        '冲撞': {
            name: '冲撞',
            type: 'attack',
            damageMultiplier: 1.2,
            description: '猛烈冲撞敌人'
        },
        '火球术': {
            name: '火球术',
            type: 'attack',
            damageMultiplier: 1.3,
            description: '发射火球攻击'
        },
        '撕咬': {
            name: '撕咬',
            type: 'attack',
            damageMultiplier: 1.1,
            description: '用尖牙撕咬敌人'
        },
        '藤蔓缠绕': {
            name: '藤蔓缠绕',
            type: 'attack',
            damageMultiplier: 0.8,
            description: '用藤蔓缠绕敌人'
        },
        '根须穿刺': {
            name: '根须穿刺',
            type: 'attack',
            damageMultiplier: 1.4,
            description: '从地下伸出根须穿刺敌人'
        },
        '自然恢复': {
            name: '自然恢复',
            type: 'heal',
            healAmount: 20,
            description: '恢复自身气血'
        },
        '熊掌拍击': {
            name: '熊掌拍击',
            type: 'attack',
            damageMultiplier: 1.5,
            description: '用巨大的熊掌拍击敌人'
        },
        '大地震颤': {
            name: '大地震颤',
            type: 'attack',
            damageMultiplier: 1.0,
            isAOE: true,
            description: '引发地震，伤害所有敌人'
        },
        '古树之怒': {
            name: '古树之怒',
            type: 'attack',
            damageMultiplier: 2.0,
            description: '古树的愤怒攻击'
        },
        '横斩': {
            name: '横斩',
            type: 'attack',
            damageMultiplier: 1.1,
            description: '横向斩击敌人'
        },
        '重拳': {
            name: '重拳',
            type: 'attack',
            damageMultiplier: 1.3,
            description: '重拳出击'
        },
        '岩石护盾': {
            name: '岩石护盾',
            type: 'defense',
            defenseBoost: 10,
            description: '提升防御力'
        },
        '利爪撕裂': {
            name: '利爪撕裂',
            type: 'attack',
            damageMultiplier: 1.4,
            description: '用利爪撕裂敌人'
        },
        '闪电攻击': {
            name: '闪电攻击',
            type: 'attack',
            damageMultiplier: 1.6,
            description: '召唤闪电攻击敌人'
        },
        '泰坦之怒': {
            name: '泰坦之怒',
            type: 'attack',
            damageMultiplier: 2.5,
            isAOE: true,
            description: '泰坦的毁灭性攻击'
        },
        '毒牙': {
            name: '毒牙',
            type: 'attack',
            damageMultiplier: 1.0,
            description: '有毒的尖牙攻击'
        },
        '水球': {
            name: '水球',
            type: 'attack',
            damageMultiplier: 1.1,
            description: '发射水球攻击'
        },
        '分裂': {
            name: '分裂',
            type: 'special',
            description: '分裂成多个'
        },
        '挥刀': {
            name: '挥刀',
            type: 'attack',
            damageMultiplier: 1.1,
            description: '挥动刀具攻击敌人'
        },
        '扑击': {
            name: '扑击',
            type: 'attack',
            damageMultiplier: 1.2,
            description: '猛扑攻击敌人'
        },
        '劈砍': {
            name: '劈砍',
            type: 'attack',
            damageMultiplier: 1.3,
            description: '用力劈砍敌人'
        },
        '木刺': {
            name: '木刺',
            type: 'attack',
            damageMultiplier: 1.2,
            description: '发射木刺攻击敌人'
        },
        '缠绕': {
            name: '缠绕',
            type: 'attack',
            damageMultiplier: 0.9,
            description: '用藤蔓缠绕敌人'
        },
        '水箭': {
            name: '水箭',
            type: 'attack',
            damageMultiplier: 1.2,
            description: '发射水箭攻击敌人'
        },
        '落石': {
            name: '落石',
            type: 'attack',
            damageMultiplier: 1.4,
            description: '召唤落石攻击敌人'
        },
        '毒刺': {
            name: '毒刺',
            type: 'attack',
            damageMultiplier: 1.1,
            description: '用毒刺攻击敌人'
        },
        '瘴气弥漫': {
            name: '瘴气弥漫',
            type: 'attack',
            damageMultiplier: 0.8,
            isAOE: true,
            description: '释放瘴气攻击所有敌人'
        },
        '蛊毒咒': {
            name: '蛊毒咒',
            type: 'attack',
            damageMultiplier: 1.2,
            description: '施放蛊毒咒语攻击敌人'
        },
        '尸爆': {
            name: '尸爆',
            type: 'attack',
            damageMultiplier: 1.5,
            description: '引发尸爆攻击敌人'
        },
        '石像冲击': {
            name: '石像冲击',
            type: 'attack',
            damageMultiplier: 1.4,
            description: '石像猛烈冲击敌人'
        },
        '鬼哭斩': {
            name: '鬼哭斩',
            type: 'attack',
            damageMultiplier: 1.6,
            description: '发出鬼哭般的斩击'
        },
        '钳击': {
            name: '钳击',
            type: 'attack',
            damageMultiplier: 1.3,
            description: '用钳子攻击敌人'
        },
        '水炮': {
            name: '水炮',
            type: 'attack',
            damageMultiplier: 1.4,
            description: '发射水炮攻击敌人'
        },
        '龙息': {
            name: '龙息',
            type: 'attack',
            damageMultiplier: 2.0,
            description: '喷出龙息攻击敌人'
        },
        '水幕天华': {
            name: '水幕天华',
            type: 'defense',
            defenseBoost: 15,
            description: '形成水幕保护自己'
        },
        '冰爪': {
            name: '冰爪',
            type: 'attack',
            damageMultiplier: 1.3,
            description: '用冰爪攻击敌人'
        },
        '雪崩': {
            name: '雪崩',
            type: 'attack',
            damageMultiplier: 1.5,
            isAOE: true,
            description: '引发雪崩攻击所有敌人'
        },
        '冰封': {
            name: '冰封',
            type: 'attack',
            damageMultiplier: 1.2,
            description: '冰封敌人'
        },
        '冰刺雨': {
            name: '冰刺雨',
            type: 'attack',
            damageMultiplier: 1.4,
            isAOE: true,
            description: '降下冰刺雨攻击所有敌人'
        },
        '沙暴': {
            name: '沙暴',
            type: 'attack',
            damageMultiplier: 1.0,
            isAOE: true,
            description: '引发沙暴攻击所有敌人'
        },
        '弯刀斩': {
            name: '弯刀斩',
            type: 'attack',
            damageMultiplier: 1.2,
            description: '用弯刀斩击敌人'
        },
        '诅咒': {
            name: '诅咒',
            type: 'attack',
            damageMultiplier: 0.9,
            description: '施放诅咒攻击敌人'
        },
        '破甲刀': {
            name: '破甲刀',
            type: 'attack',
            damageMultiplier: 1.5,
            description: '用破甲刀攻击敌人，无视部分防御'
        }
    },

    ITEMS: {
        '粗布衣服': { type: 'armor', rarity: 'common', defense: 1, description: '普通的粗布衣服' },
        '干粮': { type: 'consumable', rarity: 'common', effect: { hp: 20 }, description: '可以恢复少量气血' },
        // 青岚村任务相关物品
        '破旧布衣': { type: 'armor', rarity: 'common', defense: 1, description: '破旧的布衣，提供基础防御' },
        '面包': { type: 'consumable', rarity: 'common', effect: { hp: 15 }, description: '可以恢复少量生命值' },
        '草药包': { type: 'consumable', rarity: 'common', effect: { hp: 30 }, description: '阿禾赠送的草药包，可恢复生命值' },
        '瘴气香囊': { type: 'consumable', rarity: 'uncommon', effect: { miasmaResistance: 50 }, description: '可以短暂抵御迷雾谷的瘴气' },
        '破瘴匕首': { type: 'weapon', rarity: 'uncommon', attack: 3, description: '能驱散轻微瘴气的匕首' },
        '守岚者披风': { type: 'armor', rarity: 'rare', defense: 5, description: '守岚者的披风，增加瘴气抗性' },
        '猎户的弓箭': { type: 'weapon', rarity: 'uncommon', attack: 4, description: '猎户王大叔赠送的弓箭，远程攻击+4' },
        '守岚者长剑': { type: 'weapon', rarity: 'rare', attack: 8, description: '守岚者的长剑，瘴气伤害加成' },
        '完整守岚者玉佩': { type: 'artifact', rarity: 'epic', effect: { miasmaImmunity: true, allAttr: 10 }, description: '完整的守岚者玉佩，拥有瘴气免疫和属性加成' },
        '玉佩碎片': { type: 'material', rarity: 'rare', description: '守岚者玉佩的碎片' },
        '野兔皮毛': { type: 'material', rarity: 'common', description: '野兔的皮毛，可用于制作护腕' },
        '猎户的信物': { type: 'misc', rarity: 'common', description: '猎户王大叔掉落的信物' },
        '丝绸衣服': { type: 'armor', rarity: 'uncommon', defense: 3, description: '丝绸做的衣服' },
        '银两': { type: 'currency', rarity: 'common', value: 500, description: '钱' },
        '铜钱': { type: 'currency', rarity: 'common', value: 1, description: '铜钱' },
        '粗布衫': { type: 'armor', rarity: 'common', defense: 2, description: '粗布做的衣衫' },
        '止血草': { type: 'material', rarity: 'common', description: '用于止血的草药' },
        '生铁剑': { type: 'weapon', rarity: 'common', attack: 15, description: '生铁打造的剑' },
        '兽皮': { type: 'material', rarity: 'uncommon', description: '野兽的皮毛' },
        '一阶灵石': { type: 'currency', rarity: 'uncommon', value: 50, description: '蕴含初级灵力的灵石' },
        '木系功法残页': { type: 'skill-book', rarity: 'uncommon', description: '木系功法的残页' },
        '灵木': { type: 'material', rarity: 'uncommon', description: '蕴含灵气的木材' },
        '水属性灵材': { type: 'material', rarity: 'uncommon', description: '蕴含水属性灵气的材料' },
        '清心丹': { type: 'consumable', rarity: 'uncommon', effect: { mp: 50 }, description: '清除杂念，恢复灵力' },
        '二阶灵石': { type: 'currency', rarity: 'rare', value: 200, description: '蕴含中级灵力的灵石' },
        '中品灵石': { type: 'currency', rarity: 'uncommon', value: 100, description: '蕴含中等灵力的灵石' },
        '筑基丹材料': { type: 'material', rarity: 'rare', description: '用于炼制筑基丹的材料' },
        '毒抗丹': { type: 'consumable', rarity: 'uncommon', effect: { defense: 10 }, description: '提高毒抗性' },
        '蛊虫': { type: 'material', rarity: 'uncommon', description: '用于巫蛊之术的虫子' },
        '巫蛊秘籍': { type: 'skill-book', rarity: 'rare', description: '记载巫蛊之术的秘籍' },
        '尸毒粉': { type: 'material', rarity: 'uncommon', description: '含有尸毒的粉末' },
        '金丹丹材料': { type: 'material', rarity: 'rare', description: '用于炼制金丹的材料' },
        '古神残卷': { type: 'skill-book', rarity: 'epic', description: '记载古神功法的残卷' },
        '三阶灵石': { type: 'currency', rarity: 'epic', value: 500, description: '蕴含高级灵力的灵石' },
        '珍珠': { type: 'material', rarity: 'uncommon', description: '珍贵的珍珠' },
        '水属性功法': { type: 'skill-book', rarity: 'rare', description: '水属性功法' },
        '龙鳞': { type: 'material', rarity: 'rare', description: '龙的鳞片' },
        '元婴丹材料': { type: 'material', rarity: 'epic', description: '用于炼制元婴丹的材料' },
        '仙器碎片': { type: 'material', rarity: 'epic', description: '仙器的碎片' },
        '冰魄': { type: 'material', rarity: 'rare', description: '蕴含冰属性灵气的魄晶' },
        '耐寒丹': { type: 'consumable', rarity: 'uncommon', effect: { defense: 15 }, description: '提高耐寒能力' },
        '四阶灵石': { type: 'currency', rarity: 'epic', value: 1000, description: '蕴含顶级灵力的灵石' },
        '万年玄冰': { type: 'material', rarity: 'epic', description: '万年形成的玄冰' },
        '化神丹材料': { type: 'material', rarity: 'epic', description: '用于炼制化神丹的材料' },
        '沙棘果': { type: 'material', rarity: 'common', description: '沙漠中的沙棘果' },
        '沙漠地图': { type: 'misc', rarity: 'uncommon', description: '沙漠地区的地图' },
        '五阶灵石': { type: 'currency', rarity: 'legendary', value: 2000, description: '蕴含神级灵力的灵石' },
        '高阶功法': { type: 'skill-book', rarity: 'epic', description: '高阶修炼功法' },
        '炼虚丹材料': { type: 'material', rarity: 'legendary', description: '用于炼制炼虚丹的材料' },
        '笔墨纸砚': { type: 'misc', rarity: 'common', description: '文人用品' },
        '古籍': { type: 'book', rarity: 'uncommon', description: '一本古老的书籍' },
        '破旧匕首': { type: 'weapon', rarity: 'common', attack: 3, description: '破旧的匕首' },
        '乞讨碗': { type: 'misc', rarity: 'common', description: '乞讨用的碗' },
        '基础功法': { type: 'skill-book', rarity: 'common', skill: '基础吐纳法', description: '修仙基础功法' },
        '野猪肉': { type: 'material', rarity: 'common', description: '野猪的肉' },
        '猪皮': { type: 'material', rarity: 'common', description: '野猪的皮' },
        '妖羽': { type: 'material', rarity: 'uncommon', description: '妖鸟的羽毛' },
        '妖丹': { type: 'material', rarity: 'rare', description: '妖兽的内丹' },
        '狼皮': { type: 'material', rarity: 'uncommon', description: '狼的皮' },
        '狼牙': { type: 'material', rarity: 'uncommon', description: '狼的牙齿' },
        '木材': { type: 'material', rarity: 'common', description: '木材' },
        '树心': { type: 'material', rarity: 'rare', description: '树的精华' },
        '熊掌': { type: 'material', rarity: 'rare', description: '珍贵的熊掌' },
        '熊胆': { type: 'material', rarity: 'rare', description: '珍贵的熊胆' },
        '万年树心': { type: 'material', rarity: 'epic', description: '万年古树的精华' },
        '破烂武器': { type: 'weapon', rarity: 'common', attack: 5, description: '破烂的武器' },
        '矿石': { type: 'material', rarity: 'common', description: '普通矿石' },
        '傀儡核心': { type: 'material', rarity: 'uncommon', description: '傀儡的核心' },
        '雷鹰羽毛': { type: 'material', rarity: 'rare', description: '雷鹰的羽毛' },
        '雷丹': { type: 'material', rarity: 'epic', description: '蕴含雷电之力的丹药' },
        '土之心': { type: 'material', rarity: 'epic', description: '大地的精华' },
        '泰坦核心': { type: 'material', rarity: 'legendary', description: '泰坦的核心' },
        '上品灵石': { type: 'currency', rarity: 'rare', value: 500, description: '蕴含高等灵力的灵石' },
        
        '草药': { type: 'material', rarity: 'common', description: '普通的草药' },
        '灵草': { type: 'material', rarity: 'uncommon', description: '含有灵气的灵草' },
        '石头': { type: 'material', rarity: 'common', description: '普通的石头' },
        '铁矿石': { type: 'material', rarity: 'uncommon', description: '铁矿石' },
        '精铁矿': { type: 'material', rarity: 'rare', description: '精炼的铁矿' },
        '金属石': { type: 'material', rarity: 'uncommon', description: '含有金属的石头' },
        '秘银矿': { type: 'material', rarity: 'rare', description: '珍贵的秘银矿' },
        '灵芝': { type: 'material', rarity: 'rare', description: '珍贵的灵芝' },
        '木果': { type: 'material', rarity: 'common', description: '普通的木果' },
        '千年木果': { type: 'material', rarity: 'rare', description: '千年木果' },
        
        '筑基丹': { type: 'consumable', rarity: 'uncommon', effect: { breakthrough: '炼气' }, description: '用于炼气期突破到筑基期', price: 500 },
        '金丹突破丹': { type: 'consumable', rarity: 'rare', effect: { breakthrough: '筑基' }, description: '用于筑基期突破到金丹期', price: 2000 },
        '元婴突破丹': { type: 'consumable', rarity: 'epic', effect: { breakthrough: '金丹' }, description: '用于金丹期突破到元婴期', price: 10000 },
        '化神突破丹': { type: 'consumable', rarity: 'legendary', effect: { breakthrough: '元婴' }, description: '用于元婴期突破到化神期', price: 50000 },
        '渡劫突破丹': { type: 'consumable', rarity: 'mythic', effect: { breakthrough: '化神' }, description: '用于化神期突破到渡劫期', price: 200000 },
        // 突破辅助道具
        '金灵珠': { type: 'material', rarity: 'rare', description: '蕴含金系灵气的宝珠，用于突破到金丹期', price: 1500 },
        '地灵宝': { type: 'material', rarity: 'rare', description: '蕴含大地之力的灵宝，用于突破到金丹期', price: 1500 },
        '金丹玉': { type: 'material', rarity: 'epic', description: '凝聚金丹之气的宝玉，用于突破到金丹期', price: 3000 },
        '火灵晶': { type: 'material', rarity: 'epic', description: '蕴含火灵之力的晶体，用于突破到元婴期', price: 8000 },
        '魂珠': { type: 'material', rarity: 'epic', description: '凝聚灵魂之力的宝珠，用于突破到元婴期', price: 8000 },
        '元婴果': { type: 'material', rarity: 'legendary', description: '蕴含元婴之气的灵果，用于突破到元婴期', price: 15000 },
        '冰灵髓': { type: 'material', rarity: 'legendary', description: '蕴含冰灵之力的精髓，用于突破到化神期', price: 40000 },
        '雷灵珠': { type: 'material', rarity: 'legendary', description: '蕴含雷灵之力的宝珠，用于突破到化神期', price: 40000 },
        '化神草': { type: 'material', rarity: 'mythic', description: '蕴含化神之气的灵草，用于突破到化神期', price: 80000 },
        '星空石': { type: 'material', rarity: 'mythic', description: '来自星空的奇石，用于突破到渡劫期', price: 150000 },
        '混沌结晶': { type: 'material', rarity: 'mythic', description: '混沌之力凝聚的结晶，用于突破到渡劫期', price: 150000 },
        '渡劫莲': { type: 'material', rarity: 'mythic', description: '蕴含渡劫之力的莲花，用于突破到渡劫期', price: 250000 },
        
        '回春丹': { type: 'consumable', rarity: 'common', effect: { hp: 50 }, description: '恢复50点气血', price: 50 },
        '聚灵散': { type: 'consumable', rarity: 'common', effect: { mp: 30 }, description: '恢复30点灵力', price: 30 },
        '大还丹': { type: 'consumable', rarity: 'uncommon', effect: { hp: 150 }, description: '恢复150点气血', price: 200 },
        '灵元丹': { type: 'consumable', rarity: 'uncommon', effect: { mp: 100 }, description: '恢复100点灵力', price: 150 },
        '九转金丹': { type: 'consumable', rarity: 'rare', effect: { hp: 500, mp: 300 }, description: '恢复500点气血和300点灵力', price: 1000 },
        '下品修炼丹': { type: 'consumable', rarity: 'common', effect: { cultivation: 3000 }, description: '使用后获得3000修为值', price: 100 },
        '中品修炼丹': { type: 'consumable', rarity: 'uncommon', effect: { cultivation: 30000 }, description: '使用后获得30000修为值', price: 500 },
        '上品修炼丹': { type: 'consumable', rarity: 'rare', effect: { cultivation: 300000 }, description: '使用后获得300000修为值', price: 2000 },
        '极品修炼丹': { type: 'consumable', rarity: 'epic', effect: { cultivation: 3000000 }, description: '使用后获得3000000修为值', price: 10000 },
        
        '铁剑': { type: 'weapon', rarity: 'common', attack: 10, description: '普通铁剑', price: 100 },
        '精钢剑': { type: 'weapon', rarity: 'uncommon', attack: 25, description: '精钢打造的剑', price: 500 },
        '长剑': { type: 'weapon', rarity: 'rare', attack: 50, description: '上品法器长剑', price: 2000 },
        
        '布甲': { type: 'armor', rarity: 'common', defense: 5, description: '普通布甲', price: 80 },
        
        // 金阳门套装和物品
        // 金阳门套装部件
        '鎏金盔': { type: 'helmet', rarity: 'epic', defense: 65, vitality: 20, description: '金阳门炼气期头盔，物攻+3%，物防+2%', sectExclusive: 'jinyang', set: 'liu jin' },
        '鎏金甲': { type: 'chest', rarity: 'epic', hp: 1250, defense: 100, vitality: 20, description: '金阳门炼气期胸甲，物攻+3%，物防+2%', sectExclusive: 'jinyang', set: 'liu jin' },
        '鎏金护肩': { type: 'shoulder', rarity: 'epic', defense: 65, vitality: 18, description: '金阳门炼气期护肩，物攻+3%，物防+2%', sectExclusive: 'jinyang', set: 'liu jin' },
        '鎏金护腿': { type: 'pants', rarity: 'epic', defense: 65, agility: 20, description: '金阳门炼气期护腿，物攻+3%，物防+2%', sectExclusive: 'jinyang', set: 'liu jin' },
        '鎏金靴': { type: 'boots', rarity: 'epic', agility: 20, dodge: 6, description: '金阳门炼气期战靴，物攻+3%，物防+2%', sectExclusive: 'jinyang', set: 'liu jin' },
        '鎏金剑': { type: 'weapon', rarity: 'epic', attack: 275, strength: 25, crit: 6, description: '金阳门炼气期武器，物攻+5%', sectExclusive: 'jinyang', set: 'liu jin', realm: '炼气期' },
        
        '烈阳盔': { type: 'helmet', rarity: 'epic', defense: 75, vitality: 22, description: '金阳门筑基期头盔，物攻+5%，物防+3%，暴击率+1%', sectExclusive: 'jinyang', set: 'lie yang' },
        '烈阳甲': { type: 'chest', rarity: 'epic', hp: 1500, defense: 125, vitality: 22, description: '金阳门筑基期胸甲，物攻+5%，物防+3%，暴击率+1%', sectExclusive: 'jinyang', set: 'lie yang' },
        '烈阳护肩': { type: 'shoulder', rarity: 'epic', defense: 75, vitality: 20, description: '金阳门筑基期护肩，物攻+5%，物防+3%，暴击率+1%', sectExclusive: 'jinyang', set: 'lie yang' },
        '烈阳护腿': { type: 'pants', rarity: 'epic', defense: 75, agility: 22, description: '金阳门筑基期护腿，物攻+5%，物防+3%，暴击率+1%', sectExclusive: 'jinyang', set: 'lie yang' },
        '烈阳靴': { type: 'boots', rarity: 'epic', agility: 22, dodge: 6.5, description: '金阳门筑基期战靴，物攻+5%，物防+3%，暴击率+1%', sectExclusive: 'jinyang', set: 'lie yang' },
        '烈阳剑': { type: 'weapon', rarity: 'epic', attack: 300, strength: 30, crit: 6.5, description: '金阳门筑基期武器，物攻+8%，暴击率+2%', sectExclusive: 'jinyang', set: 'lie yang', realm: '筑基期' },
        
        '镇金盔': { type: 'helmet', rarity: 'epic', defense: 110, vitality: 35, description: '金阳门金丹期头盔，物攻+8%，物防+5%，暴击率+2%', sectExclusive: 'jinyang', set: 'zhen jin' },
        '镇金甲': { type: 'chest', rarity: 'epic', hp: 3750, defense: 200, vitality: 35, description: '金阳门金丹期胸甲，物攻+8%，物防+5%，暴击率+2%', sectExclusive: 'jinyang', set: 'zhen jin' },
        '镇金护肩': { type: 'shoulder', rarity: 'epic', defense: 110, vitality: 30, description: '金阳门金丹期护肩，物攻+8%，物防+5%，暴击率+2%', sectExclusive: 'jinyang', set: 'zhen jin' },
        '镇金护腿': { type: 'pants', rarity: 'epic', defense: 110, agility: 35, description: '金阳门金丹期护腿，物攻+8%，物防+5%，暴击率+2%', sectExclusive: 'jinyang', set: 'zhen jin' },
        '镇金靴': { type: 'boots', rarity: 'epic', agility: 35, dodge: 8.75, description: '金阳门金丹期战靴，物攻+8%，物防+5%，暴击率+2%', sectExclusive: 'jinyang', set: 'zhen jin' },
        '镇金剑': { type: 'weapon', rarity: 'epic', attack: 625, strength: 37, crit: 8.75, description: '金阳门金丹期武器，物攻+12%，暴击率+4%', sectExclusive: 'jinyang', set: 'zhen jin', realm: '金丹期' },
        
        '金阙盔': { type: 'helmet', rarity: 'epic', attack: 120, defense: 90, vitality: 60, crit: 12, description: '金阳门元婴期头盔，物攻+12%，物防+8%，暴击率+3%', sectExclusive: 'jinyang', set: 'jin que' },
        '金阙甲': { type: 'chest', rarity: 'epic', attack: 110, defense: 120, hp: 1200, crit: 12, description: '金阳门元婴期胸甲，物攻+12%，物防+8%，暴击率+3%', sectExclusive: 'jinyang', set: 'jin que' },
        '金阙护肩': { type: 'shoulder', rarity: 'epic', attack: 90, defense: 90, vitality: 50, crit: 9, description: '金阳门元婴期护肩，物攻+12%，物防+8%，暴击率+3%', sectExclusive: 'jinyang', set: 'jin que' },
        '金阙护腿': { type: 'pants', rarity: 'epic', attack: 90, defense: 90, agility: 50, crit: 9, description: '金阳门元婴期护腿，物攻+12%，物防+8%，暴击率+3%', sectExclusive: 'jinyang', set: 'jin que' },
        '金阙靴': { type: 'boots', rarity: 'epic', attack: 90, defense: 85, agility: 60, crit: 9, description: '金阳门元婴期战靴，物攻+12%，物防+8%，暴击率+3%', sectExclusive: 'jinyang', set: 'jin que' },
        '金阙剑': { type: 'weapon', rarity: 'epic', attack: 1200, strength: 80, crit: 17.5, description: '金阳门化神期武器，物攻+15%，暴击率+6%', sectExclusive: 'jinyang', set: 'jin que', realm: '化神期' },
        // 金丹期橙色装备 - 赤焰窟（困难）掉落
        '赤焰剑': { type: 'weapon', rarity: 'epic', attack: 850, strength: 60, crit: 12, description: '金丹期橙色武器，火系伤害+15%，攻击有概率触发焚火效果', realm: '金丹期' },
        '赤焰戒': { type: 'ring', rarity: 'epic', attack: 50, crit: 8, description: '金丹期橙色戒指，火系伤害+10%，暴击伤害+20%', realm: '金丹期' },
        '赤焰印': { type: 'artifact', rarity: 'epic', attack: 80, burn: 30, description: '金丹期橙色法宝，火系伤害+20%，灼烧伤害提升50%', realm: '金丹期', requiredRoot: '火灵根' },
        '赤焰符': { type: 'artifact', rarity: 'epic', attack: 60, crit: 6, description: '金丹期橙色法器，攻击时有概率释放火焰新星，造成范围伤害', realm: '金丹期' },
        // 金丹期橙色装备 - 万魂泽（困难）掉落
        '万魂剑': { type: 'weapon', rarity: 'epic', attack: 800, intelligence: 60, dodge: 8, description: '金丹期橙色武器，木系伤害+15%，攻击有概率吸取敌人气血', realm: '金丹期' },
        '万魂戒': { type: 'ring', rarity: 'epic', hp: 2000, regen: 20, description: '金丹期橙色戒指，气血上限+15%，回血效果+30%', realm: '金丹期' },
        '万魂珠': { type: 'artifact', rarity: 'epic', hp: 1500, regen: 25, description: '金丹期橙色法宝，木系伤害+20%，击杀敌人后回复气血', realm: '金丹期', requiredRoot: '木灵根' },
        '万魂幡': { type: 'artifact', rarity: 'epic', attack: 50, hp: 1000, description: '金丹期橙色法器，攻击时有概率召唤魂灵协助战斗', realm: '金丹期' },
        // 元婴期橙色装备 - 玄冰洞（困难）掉落
        '玄冰剑': { type: 'weapon', rarity: 'epic', attack: 1100, intelligence: 80, crit: 15, description: '元婴期橙色武器，水系伤害+20%，攻击有概率冰冻目标', realm: '元婴期' },
        '玄冰符': { type: 'artifact', rarity: 'epic', attack: 80, crit: 8, description: '元婴期橙色法器，攻击时有概率释放冰风暴，造成范围伤害', realm: '元婴期' },
        // 元婴期橙色装备 - 雷云峰（困难）掉落
        '雷云戒': { type: 'ring', rarity: 'epic', attack: 70, crit: 10, description: '元婴期橙色戒指，雷系伤害+20%，暴击伤害+30%', realm: '元婴期' },
        '雷云珠': { type: 'artifact', rarity: 'epic', attack: 100, crit: 10, description: '元婴期橙色法宝，雷系伤害+25%，攻击有概率触发闪电链', realm: '元婴期', requiredRoot: '雷灵根' },
        // 化神期橙色装备 - 星空殿（困难）掉落
        '星空剑': { type: 'weapon', rarity: 'epic', attack: 1500, strength: 100, crit: 20, description: '化神期橙色武器，星空之力+25%，攻击有概率造成真实伤害', realm: '化神期' },
        '星空符': { type: 'artifact', rarity: 'epic', attack: 120, crit: 12, description: '化神期橙色法器，攻击时有概率召唤星陨，造成范围伤害', realm: '化神期' },
        // 化神期橙色装备 - 混沌秘境（困难）掉落
        '混沌戒': { type: 'ring', rarity: 'epic', attack: 90, crit: 12, description: '化神期橙色戒指，混沌之力+25%，全属性+10%', realm: '化神期' },
        '混沌印': { type: 'artifact', rarity: 'epic', attack: 140, defense: 50, description: '化神期橙色法宝，混沌之力+30%，受到伤害时概率反弹', realm: '化神期', requiredRoot: '混沌灵根' },
        // 炼气期秘境装备 - 灵草谷
        '灵草剑': { type: 'weapon', rarity: 'rare', attack: 60, intelligence: 15, description: '炼气期蓝色武器，灵草之气加持，攻击附带微弱灵气', realm: '炼气期' },
        '灵草盔': { type: 'helmet', rarity: 'rare', defense: 25, vitality: 10, description: '炼气期蓝色头盔，灵草之气保护头部', realm: '炼气期' },
        '灵草甲': { type: 'chest', rarity: 'rare', defense: 40, hp: 500, description: '炼气期蓝色胸甲，灵草之气保护身躯', realm: '炼气期' },
        // 炼气期秘境装备 - 妖兽森林
        '兽牙匕': { type: 'weapon', rarity: 'rare', attack: 55, crit: 4, description: '炼气期蓝色武器，妖兽之牙打造，暴击率+3%', realm: '炼气期' },
        '兽皮帽': { type: 'helmet', rarity: 'rare', defense: 22, agility: 8, description: '炼气期蓝色头盔，妖兽皮毛缝制', realm: '炼气期' },
        '兽皮衣': { type: 'chest', rarity: 'rare', defense: 38, hp: 450, description: '炼气期蓝色胸甲，妖兽皮革缝制', realm: '炼气期' },
        // 筑基期秘境装备 - 黑风洞
        '黑风剑': { type: 'weapon', rarity: 'epic', attack: 150, strength: 18, description: '筑基期紫色武器，黑风之力加持，物攻+8%', realm: '筑基期' },
        '黑风盔': { type: 'helmet', rarity: 'epic', defense: 50, vitality: 15, description: '筑基期紫色头盔，黑风之力保护', realm: '筑基期' },
        '黑风甲': { type: 'chest', rarity: 'epic', defense: 80, hp: 1000, description: '筑基期紫色胸甲，黑风之力护身', realm: '筑基期' },
        // 筑基期秘境装备 - 残月谷
        '残月刀': { type: 'weapon', rarity: 'epic', magicDamage: 140, intelligence: 18, description: '筑基期紫色武器，残月之力，法攻+7%', realm: '筑基期' },
        '残月冠': { type: 'helmet', rarity: 'epic', defense: 48, intelligence: 15, description: '筑基期紫色头盔，残月之力守护', realm: '筑基期' },
        '残月袍': { type: 'chest', rarity: 'epic', defense: 75, hp: 950, mp: 200, description: '筑基期紫色胸甲，残月之力加身', realm: '筑基期' },
        // 金丹期秘境装备 - 赤焰窟（普通）
        '赤焰刀': { type: 'weapon', rarity: 'epic', attack: 400, strength: 30, crit: 6, description: '金丹期紫色武器，赤焰之力，物攻+10%', realm: '金丹期' },
        '赤焰冠': { type: 'helmet', rarity: 'epic', defense: 80, vitality: 25, description: '金丹期紫色头盔，赤焰守护', realm: '金丹期' },
        '赤焰甲': { type: 'chest', rarity: 'epic', defense: 130, hp: 2500, description: '金丹期紫色胸甲，赤焰加身', realm: '金丹期' },
        // 金丹期秘境装备 - 万魂泽（普通）
        '万魂杖': { type: 'weapon', rarity: 'epic', magicDamage: 380, intelligence: 30, regen: 10, description: '金丹期紫色武器，万魂之力，法攻+9%', realm: '金丹期' },
        '万魂冠': { type: 'helmet', rarity: 'epic', defense: 78, intelligence: 25, description: '金丹期紫色头盔，万魂守护', realm: '金丹期' },
        '万魂袍': { type: 'chest', rarity: 'epic', defense: 125, hp: 2400, mp: 500, description: '金丹期紫色胸甲，万魂加身', realm: '金丹期' },
        // 元婴期秘境装备 - 玄冰洞（普通）
        '玄冰剑': { type: 'weapon', rarity: 'epic', attack: 700, intelligence: 45, crit: 10, description: '元婴期紫色武器，玄冰之力，物攻+12%', realm: '元婴期' },
        '玄冰冠': { type: 'helmet', rarity: 'epic', defense: 130, vitality: 40, description: '元婴期紫色头盔，玄冰守护', realm: '元婴期' },
        '玄冰甲': { type: 'chest', rarity: 'epic', defense: 200, hp: 4000, description: '元婴期紫色胸甲，玄冰加身', realm: '元婴期' },
        // 元婴期秘境装备 - 雷云峰（普通）
        '雷云锤': { type: 'weapon', rarity: 'epic', magicDamage: 680, intelligence: 45, crit: 10, description: '元婴期紫色武器，雷云之力，法攻+11%', realm: '元婴期' },
        '雷云冠': { type: 'helmet', rarity: 'epic', defense: 125, intelligence: 40, description: '元婴期紫色头盔，雷云守护', realm: '元婴期' },
        '雷云峰甲': { type: 'chest', rarity: 'epic', defense: 190, hp: 3800, mp: 800, description: '元婴期紫色胸甲，雷云加身', realm: '元婴期' },
        // 化神期秘境装备 - 星空殿（普通）
        '星空刀': { type: 'weapon', rarity: 'epic', attack: 1000, strength: 60, crit: 15, description: '化神期紫色武器，星空之力，物攻+15%', realm: '化神期' },
        '星空冠': { type: 'helmet', rarity: 'epic', defense: 180, vitality: 55, description: '化神期紫色头盔，星空守护', realm: '化神期' },
        '星空甲': { type: 'chest', rarity: 'epic', defense: 280, hp: 6000, description: '化神期紫色胸甲，星空加身', realm: '化神期' },
        // 化神期秘境装备 - 混沌秘境（普通）
        '混沌杖': { type: 'weapon', rarity: 'epic', magicDamage: 980, intelligence: 60, crit: 15, description: '化神期紫色武器，混沌之力，法攻+14%', realm: '化神期' },
        '混沌冠': { type: 'helmet', rarity: 'epic', defense: 175, intelligence: 55, description: '化神期紫色头盔，混沌守护', realm: '化神期' },
        '混沌甲': { type: 'chest', rarity: 'epic', defense: 270, hp: 5800, mp: 1200, description: '化神期紫色胸甲，混沌加身', realm: '化神期' },
        // 金丹期困难秘境 - 赤焰窟掉落（金阳门和皇土阁橙色武器
        '赤焰金阳剑': { type: 'weapon', rarity: 'legendary', attack: 900, strength: 65, crit: 14, description: '金丹期橙色武器，金阳门专属，金系伤害+18%，暴击率+8%', realm: '金丹期' },
        '赤焰皇土棍': { type: 'weapon', rarity: 'legendary', attack: 880, strength: 60, defense: 50, description: '金丹期橙色武器，皇土阁专属，土系伤害+18%，物防+12%', realm: '金丹期' },
        // 金丹期困难秘境 - 万魂泽掉落（水月宫、炎火殿、青木宗橙色武器
        '万魂水月珠': { type: 'weapon', rarity: 'legendary', magicDamage: 870, intelligence: 65, dodge: 10, description: '金丹期橙色武器，水月宫专属，水系伤害+18%，闪避+10%', realm: '金丹期' },
        '万魂炎火杖': { type: 'weapon', rarity: 'legendary', magicDamage: 890, intelligence: 60, burn: 25, description: '金丹期橙色武器，炎火殿专属，火系伤害+18%，灼烧伤害+30%', realm: '金丹期' },
        '万魂青木琴': { type: 'weapon', rarity: 'legendary', magicDamage: 860, intelligence: 60, regen: 20, description: '金丹期橙色武器，青木宗专属，木系伤害+18%，回血效果+25%', realm: '金丹期' },
        // 元婴期困难秘境 - 玄冰洞掉落（金阳门、皇土阁橙色武器）
        '玄冰金阳剑': { type: 'weapon', rarity: 'legendary', attack: 1200, strength: 85, crit: 18, description: '元婴期橙色武器，金阳门专属，金系伤害+22%，暴击率+10%', realm: '元婴期' },
        '玄冰皇土盾': { type: 'weapon', rarity: 'legendary', attack: 1150, strength: 80, defense: 80, description: '元婴期橙色武器，皇土阁专属，土系伤害+22%，物防+18%', realm: '元婴期' },
        // 元婴期困难秘境 - 雷云峰掉落（水月宫、炎火殿、青木宗橙色武器）
        '雷云水月剑': { type: 'weapon', rarity: 'legendary', magicDamage: 1180, intelligence: 85, dodge: 15, description: '元婴期橙色武器，水月宫专属，水系伤害+22%，闪避+15%', realm: '元婴期' },
        '雷云炎火杖': { type: 'weapon', rarity: 'legendary', magicDamage: 1200, intelligence: 80, burn: 35, description: '元婴期橙色武器，炎火殿专属，火系伤害+22%，灼烧伤害+40%', realm: '元婴期' },
        '雷云青木琴': { type: 'weapon', rarity: 'legendary', magicDamage: 1160, intelligence: 80, regen: 30, description: '元婴期橙色武器，青木宗专属，木系伤害+22%，回血效果+35%', realm: '元婴期' },
        // 化神期困难秘境 - 星空殿掉落（金阳门、皇土阁橙色武器）
        '星空金阳剑': { type: 'weapon', rarity: 'legendary', attack: 1600, strength: 110, crit: 22, description: '化神期橙色武器，金阳门专属，金系伤害+25%，暴击率+12%', realm: '化神期' },
        '星空皇土锤': { type: 'weapon', rarity: 'legendary', attack: 1550, strength: 100, defense: 110, description: '化神期橙色武器，皇土阁专属，土系伤害+25%，物防+22%', realm: '化神期' },
        // 化神期困难秘境 - 混沌秘境掉落（水月宫、炎火殿、青木宗橙色武器）
        '混沌水月珠': { type: 'weapon', rarity: 'legendary', magicDamage: 1580, intelligence: 110, dodge: 20, description: '化神期橙色武器，水月宫专属，水系伤害+25%，闪避+20%', realm: '化神期' },
        '混沌炎火杖': { type: 'weapon', rarity: 'legendary', magicDamage: 1600, intelligence: 100, burn: 45, description: '化神期橙色武器，炎火殿专属，火系伤害+25%，灼烧伤害+50%', realm: '化神期' },
        '混沌青木琴': { type: 'weapon', rarity: 'legendary', magicDamage: 1560, intelligence: 100, regen: 40, description: '化神期橙色武器，青木宗专属，木系伤害+25%，回血效果+45%', realm: '化神期' },
        '金阳基础诀': { type: 'skill-book', rarity: 'uncommon', attack: 8, description: '金阳门基础功法，物攻+8%，解锁基础招式金阳拳' },
        '裂金剑法': { type: 'skill-book', rarity: 'rare', attack: 20, description: '金阳门筑基期功法，物攻+20%，技能伤害+15%，解锁招式裂金刺' },
        '大日金煌诀': { type: 'skill-book', rarity: 'epic', attack: 15, defense: 15, crit: 12, description: '金阳门核心心法，全属性+15%，金系伤害+35%，暴击率+12%，心法加持下裂金刺伤害翻倍' },
        '金阙破天击': { type: 'skill-book', rarity: 'legendary', attack: 250, description: '金阳门绝学，单体爆发，无视30%防御，造成250%物攻伤害，冷却10分钟' },
        '金纹剑': { type: 'weapon', rarity: 'uncommon', attack: 5, description: '金阳门炼气期法宝，物攻+5%，提升金阳拳伤害10%' },
        '烈阳佩': { type: 'artifact', rarity: 'rare', defense: 8, crit: 5, description: '金阳门筑基期法宝，破甲+8%，暴击率+5%，可主动触发烈阳护体' },
        '金阙印': { type: 'artifact', rarity: 'epic', attack: 10, defense: 10, description: '金阳门金丹期法宝，全属性+10%，金系技能冷却缩短15%' },
        '焚天剑': { type: 'weapon', rarity: 'legendary', attack: 20, description: '金阳门元婴期法宝，物攻+20%，触发金芒斩时额外造成范围伤害' },
        // 金系新法宝
        '金灵印': { type: 'artifact', rarity: 'epic', attack: 70, crit: 8, description: '金丹期金色法宝，金系伤害+15%，攻击有概率触发金芒一闪', realm: '金丹期', requiredRoot: '金灵根' },
        '金阳剑': { type: 'weapon', rarity: 'epic', attack: 90, crit: 10, description: '元婴期金色法宝，金系伤害+20%，暴击伤害+30%', realm: '元婴期', requiredRoot: '金灵根' },
        '金仙印': { type: 'artifact', rarity: 'epic', attack: 120, defense: 40, description: '化神期金色法宝，金系伤害+25%，受到伤害时概率触发金阳护体', realm: '化神期', requiredRoot: '金灵根' },
        '金阳丹': { type: 'consumable', rarity: 'common', effect: { hp: 15, regen: 2 }, description: '金阳门炼气期丹药，瞬间恢复15%气血，每秒回血2%，持续5秒' },
        '裂金丹': { type: 'consumable', rarity: 'uncommon', effect: { attack: 15, defense: 5 }, description: '金阳门筑基期丹药，30秒内物攻+15%，破甲+5%' },
        '金煌丹': { type: 'consumable', rarity: 'rare', effect: { crit: 5 }, description: '金阳门金丹期丹药，永久提升5%暴击率（最多叠加3颗）' },
        '破天丹': { type: 'consumable', rarity: 'epic', effect: { cooldown: 3 }, description: '金阳门元婴期丹药，使用后1分钟内，金阙破天击冷却缩短至3分钟' },
        '金阳弟子令': { type: 'misc', rarity: 'common', description: '金阳门弟子令，可进入门派基础试炼场，每日1次' },
        '烈阳精英令': { type: 'misc', rarity: 'uncommon', description: '金阳门精英令，可进入门派精英试炼场，获取额外贡献，每日1次' },
        '金阙核心令': { type: 'misc', rarity: 'rare', description: '金阳门核心令，可参与门派核心议事，解锁高阶任务' },
        '焚天长老令': { type: 'misc', rarity: 'epic', description: '金阳门长老令，可调用门派资源，招募弟子协助作战，仅长老及以上可兑' },
        
        // 青木宗套装和物品
        // 青木宗套装部件
        '青岚盔': { type: 'helmet', rarity: 'epic', defense: 65, vitality: 20, description: '青木宗炼气期头盔，气血+2%，每秒回血+0.2%', sectExclusive: 'qingmu', set: 'qing lan' },
        '青岚甲': { type: 'chest', rarity: 'epic', hp: 1250, defense: 100, vitality: 20, description: '青木宗炼气期胸甲，气血+2%，每秒回血+0.2%', sectExclusive: 'qingmu', set: 'qing lan' },
        '青岚护肩': { type: 'shoulder', rarity: 'epic', defense: 65, vitality: 18, description: '青木宗炼气期护肩，气血+2%，每秒回血+0.2%', sectExclusive: 'qingmu', set: 'qing lan' },
        '青岚护腿': { type: 'pants', rarity: 'epic', defense: 65, agility: 20, description: '青木宗炼气期护腿，气血+2%，每秒回血+0.2%', sectExclusive: 'qingmu', set: 'qing lan' },
        '青岚靴': { type: 'boots', rarity: 'epic', agility: 20, dodge: 6, description: '青木宗炼气期战靴，气血+2%，每秒回血+0.2%', sectExclusive: 'qingmu', set: 'qing lan' },
        '青岚琴': { type: 'weapon', rarity: 'epic', magicDamage: 275, intelligence: 25, crit: 6, description: '青木宗炼气期武器，气血+2%，每秒回血+0.2%', sectExclusive: 'qingmu', set: 'qing lan', realm: '炼气期' },
        
        '万木盔': { type: 'helmet', rarity: 'epic', defense: 75, vitality: 22, description: '青木宗筑基期头盔，气血+4%，回血+0.4%，法术防御+2%', sectExclusive: 'qingmu', set: 'wan mu' },
        '万木甲': { type: 'chest', rarity: 'epic', hp: 1500, defense: 125, vitality: 22, description: '青木宗筑基期胸甲，气血+4%，回血+0.4%，法术防御+2%', sectExclusive: 'qingmu', set: 'wan mu' },
        '万木护肩': { type: 'shoulder', rarity: 'epic', defense: 75, vitality: 20, description: '青木宗筑基期护肩，气血+4%，回血+0.4%，法术防御+2%', sectExclusive: 'qingmu', set: 'wan mu' },
        '万木护腿': { type: 'pants', rarity: 'epic', defense: 75, agility: 22, description: '青木宗筑基期护腿，气血+4%，回血+0.4%，法术防御+2%', sectExclusive: 'qingmu', set: 'wan mu' },
        '万木靴': { type: 'boots', rarity: 'epic', agility: 22, dodge: 6.5, description: '青木宗筑基期战靴，气血+4%，回血+0.4%，法术防御+2%', sectExclusive: 'qingmu', set: 'wan mu' },
        '万木琴': { type: 'weapon', rarity: 'epic', magicDamage: 300, intelligence: 30, crit: 6.5, description: '青木宗筑基期武器，气血+2%，回血+0.4%，法术防御+2%', sectExclusive: 'qingmu', set: 'wan mu', realm: '筑基期' },
        
        '长生盔': { type: 'helmet', rarity: 'epic', defense: 110, vitality: 35, description: '青木宗金丹期头盔，气血+6%，回血+0.5%，受击有5%概率触发青木护心', sectExclusive: 'qingmu', set: 'chang sheng' },
        '长生甲': { type: 'chest', rarity: 'epic', hp: 3750, defense: 200, vitality: 35, description: '青木宗金丹期胸甲，气血+6%，回血+0.5%，受击有5%概率触发青木护心', sectExclusive: 'qingmu', set: 'chang sheng' },
        '长生护肩': { type: 'shoulder', rarity: 'epic', defense: 110, vitality: 30, description: '青木宗金丹期护肩，气血+6%，回血+0.5%，受击有5%概率触发青木护心', sectExclusive: 'qingmu', set: 'chang sheng' },
        '长生护腿': { type: 'pants', rarity: 'epic', defense: 110, agility: 35, description: '青木宗金丹期护腿，气血+6%，回血+0.5%，受击有5%概率触发青木护心', sectExclusive: 'qingmu', set: 'chang sheng' },
        '长生靴': { type: 'boots', rarity: 'epic', agility: 35, dodge: 8.75, description: '青木宗金丹期战靴，气血+6%，回血+0.5%，受击有5%概率触发青木护心', sectExclusive: 'qingmu', set: 'chang sheng' },
        '长生琴': { type: 'weapon', rarity: 'epic', magicDamage: 625, intelligence: 37, crit: 8.75, description: '青木宗金丹期武器，气血+8%，回血+0.5%，受击有5%概率触发青木护心', sectExclusive: 'qingmu', set: 'chang sheng', realm: '金丹期' },
        
        '枯荣盔': { type: 'helmet', rarity: 'epic', hp: 900, defense: 90, vitality: 60, regen: 18, magicDefense: 45, description: '青木宗元婴期头盔，气血+8%，回血+0.8%，双防+3%，青木护心触发概率提升至8%', sectExclusive: 'qingmu', set: 'ku rong' },
        '枯荣甲': { type: 'chest', rarity: 'epic', hp: 1200, defense: 120, vitality: 70, regen: 25, magicDefense: 60, description: '青木宗元婴期胸甲，气血+8%，回血+0.8%，双防+3%，青木护心触发概率提升至8%', sectExclusive: 'qingmu', set: 'ku rong' },
        '枯荣护肩': { type: 'shoulder', rarity: 'epic', hp: 750, defense: 90, vitality: 50, regen: 15, magicDefense: 45, description: '青木宗元婴期护肩，气血+8%，回血+0.8%，双防+3%，青木护心触发概率提升至8%', sectExclusive: 'qingmu', set: 'ku rong' },
        '枯荣护腿': { type: 'pants', rarity: 'epic', hp: 750, defense: 90, agility: 50, regen: 15, magicDefense: 45, description: '青木宗元婴期护腿，气血+8%，回血+0.8%，双防+3%，青木护心触发概率提升至8%', sectExclusive: 'qingmu', set: 'ku rong' },
        '枯荣靴': { type: 'boots', rarity: 'epic', hp: 650, defense: 85, agility: 60, regen: 15, magicDefense: 40, description: '青木宗元婴期战靴，气血+8%，回血+0.8%，双防+3%，青木护心触发概率提升至8%', sectExclusive: 'qingmu', set: 'ku rong' },
        '枯荣琴': { type: 'weapon', rarity: 'epic', magicDamage: 1200, intelligence: 70, hp: 750, regen: 20, magicDefense: 50, description: '青木宗元婴期武器，气血+10%，回血+0.8%，双防+2%，青木护心触发概率提升至8%', sectExclusive: 'qingmu', set: 'ku rong', realm: '元婴期' },
        '青木长生诀': { type: 'skill-book', rarity: 'uncommon', hp: 10, description: '青木宗基础功法，气血上限+10%，解锁基础招式青木掌' },
        '缠叶毒经': { type: 'skill-book', rarity: 'rare', attack: 20, description: '青木宗筑基期功法，木系伤害+20%，攻击附带持续毒伤' },
        '万古青元功': { type: 'skill-book', rarity: 'epic', hp: 30, regen: 2, description: '青木宗核心心法，气血+30%，回血效果翻倍，队友享受1/3加成，毒伤持续时间延长50%' },
        '枯荣万木生': { type: 'skill-book', rarity: 'legendary', hp: 30, defense: 100, description: '青木宗绝学，群体大范围回血，自身短时间无敌，冷却8分钟' },
        '青藤鞭': { type: 'weapon', rarity: 'uncommon', attack: 5, description: '青木宗炼气期法宝，木系伤害+5%，提升青木掌伤害10%' },
        '万木珠': { type: 'artifact', rarity: 'rare', regen: 8, defense: 6, description: '青木宗筑基期法宝，回血速度+8%，法术防御+6%，可主动触发万木护罩' },
        '长生玉': { type: 'artifact', rarity: 'epic', hp: 15, regen: 30, attack: 10, description: '青木宗金丹期法宝，气血+15%，回血效果再提升30%，毒伤伤害+10%' },
        '枯荣鼎': { type: 'artifact', rarity: 'legendary', hp: 50, defense: 100, description: '青木宗元婴期法宝，群体回血效果提升50%，自身免疫所有毒伤' },
        // 木系新法宝
        '木灵珠': { type: 'artifact', rarity: 'epic', hp: 1200, regen: 20, description: '金丹期绿色法宝，木系伤害+15%，击杀敌人后回复气血', realm: '金丹期', requiredRoot: '木灵根' },
        '青木杖': { type: 'weapon', rarity: 'epic', magicDamage: 80, hp: 1000, description: '元婴期绿色法宝，木系伤害+20%，回血效果+40%', realm: '元婴期', requiredRoot: '木灵根' },
        '灵木印': { type: 'artifact', rarity: 'epic', hp: 1800, regen: 30, defense: 30, description: '化神期绿色法宝，木系伤害+25%，受到伤害时概率触发青木护心', realm: '化神期', requiredRoot: '木灵根' },
        '青元丹': { type: 'consumable', rarity: 'common', effect: { hp: 15, mp: 10, regen: 3 }, description: '青木宗炼气期丹药，瞬间恢复15%气血+10%灵力，持续回血3秒' },
        '缠叶丹': { type: 'consumable', rarity: 'uncommon', effect: { attack: 15, poison: 2 }, description: '青木宗筑基期丹药，30秒内木系伤害+15%，毒伤效果翻倍' },
        '长生丹': { type: 'consumable', rarity: 'rare', effect: { hp: 5 }, description: '青木宗金丹期丹药，永久提升5%气血上限（最多叠加3颗）' },
        '枯荣丹': { type: 'consumable', rarity: 'epic', effect: { cooldown: 4 }, description: '青木宗元婴期丹药，使用后5分钟内，枯荣万木生冷却缩短至4分钟' },
        '青木弟子令': { type: 'misc', rarity: 'common', description: '青木宗弟子令，可进入门派药圃，采摘基础灵药，每日1次' },
        '万木精英令': { type: 'misc', rarity: 'uncommon', description: '青木宗精英令，可进入门派灵谷，获取高阶灵药，每日1次' },
        '长生核心令': { type: 'misc', rarity: 'rare', description: '青木宗核心令，可参与门派丹道议事，解锁丹方' },
        '枯荣长老令': { type: 'misc', rarity: 'epic', description: '青木宗长老令，可调配门派灵药资源，传授丹道技艺，仅长老及以上可兑' },
        
        // 水月宫套装和物品
        // 水月宫套装部件
        '凝水盔': { type: 'helmet', rarity: 'epic', defense: 65, intelligence: 25, description: '水月宫炼气期头盔，法攻+2%，速度+1.5%', sectExclusive: 'shuiyue', set: 'ning shui' },
        '凝水甲': { type: 'chest', rarity: 'epic', hp: 1250, defense: 100, intelligence: 25, description: '水月宫炼气期胸甲，法攻+2%，速度+1.5%', sectExclusive: 'shuiyue', set: 'ning shui' },
        '凝水护肩': { type: 'shoulder', rarity: 'epic', defense: 65, intelligence: 22, description: '水月宫炼气期护肩，法攻+2%，速度+1.5%', sectExclusive: 'shuiyue', set: 'ning shui' },
        '凝水护腿': { type: 'pants', rarity: 'epic', defense: 65, agility: 20, description: '水月宫炼气期护腿，法攻+2%，速度+1.5%', sectExclusive: 'shuiyue', set: 'ning shui' },
        '凝水靴': { type: 'boots', rarity: 'epic', agility: 20, dodge: 6, description: '水月宫炼气期战靴，法攻+2%，速度+1.5%', sectExclusive: 'shuiyue', set: 'ning shui' },
        '凝水珠': { type: 'weapon', rarity: 'epic', magicDamage: 275, intelligence: 25, crit: 6, description: '水月宫炼气期武器，法攻+2%，速度+1.5%', sectExclusive: 'shuiyue', set: 'ning shui', realm: '炼气期' },
        
        '流霜盔': { type: 'helmet', rarity: 'epic', defense: 75, intelligence: 30, description: '水月宫筑基期头盔，法攻+4%，速度+3%，闪避+2%', sectExclusive: 'shuiyue', set: 'liu shuang' },
        '流霜甲': { type: 'chest', rarity: 'epic', hp: 1500, defense: 125, intelligence: 30, description: '水月宫筑基期胸甲，法攻+4%，速度+3%，闪避+2%', sectExclusive: 'shuiyue', set: 'liu shuang' },
        '流霜护肩': { type: 'shoulder', rarity: 'epic', defense: 75, intelligence: 25, description: '水月宫筑基期护肩，法攻+4%，速度+3%，闪避+2%', sectExclusive: 'shuiyue', set: 'liu shuang' },
        '流霜护腿': { type: 'pants', rarity: 'epic', defense: 75, agility: 22, description: '水月宫筑基期护腿，法攻+4%，速度+3%，闪避+2%', sectExclusive: 'shuiyue', set: 'liu shuang' },
        '流霜靴': { type: 'boots', rarity: 'epic', agility: 22, dodge: 6.5, description: '水月宫筑基期战靴，法攻+4%，速度+3%，闪避+2%', sectExclusive: 'shuiyue', set: 'liu shuang' },
        '流霜珠': { type: 'weapon', rarity: 'epic', magicDamage: 300, intelligence: 30, crit: 6.5, description: '水月宫筑基期武器，法攻+6%，速度+3%，闪避+2%', sectExclusive: 'shuiyue', set: 'liu shuang', realm: '筑基期' },
        
        '沧澜盔': { type: 'helmet', rarity: 'epic', defense: 110, intelligence: 45, description: '水月宫金丹期头盔，法攻+6%，速度+4%，闪避+3%，攻击有5%概率冰冻目标', sectExclusive: 'shuiyue', set: 'cang lan' },
        '沧澜甲': { type: 'chest', rarity: 'epic', hp: 3750, defense: 200, intelligence: 45, description: '水月宫金丹期胸甲，法攻+6%，速度+4%，闪避+3%，攻击有5%概率冰冻目标', sectExclusive: 'shuiyue', set: 'cang lan' },
        '沧澜护肩': { type: 'shoulder', rarity: 'epic', defense: 110, intelligence: 40, description: '水月宫金丹期护肩，法攻+6%，速度+4%，闪避+3%，攻击有5%概率冰冻目标', sectExclusive: 'shuiyue', set: 'cang lan' },
        '沧澜护腿': { type: 'pants', rarity: 'epic', defense: 110, agility: 35, description: '水月宫金丹期护腿，法攻+6%，速度+4%，闪避+3%，攻击有5%概率冰冻目标', sectExclusive: 'shuiyue', set: 'cang lan' },
        '沧澜靴': { type: 'boots', rarity: 'epic', agility: 35, dodge: 8.75, description: '水月宫金丹期战靴，法攻+6%，速度+4%，闪避+3%，攻击有5%概率冰冻目标', sectExclusive: 'shuiyue', set: 'cang lan' },
        '沧澜珠': { type: 'weapon', rarity: 'epic', magicDamage: 625, intelligence: 45, crit: 8.75, description: '水月宫金丹期武器，法攻+12%，速度+4%，闪避+3%，攻击有5%概率冰冻目标', sectExclusive: 'shuiyue', set: 'cang lan', realm: '金丹期' },
        
        '沧海盔': { type: 'helmet', rarity: 'epic', magicDamage: 120, defense: 85, intelligence: 60, speed: 45, dodge: 18, description: '水月宫元婴期头盔，法攻+8%，速度+5%，闪避+4%，冰冻概率提升至8%', sectExclusive: 'shuiyue', set: 'cang hai' },
        '沧海甲': { type: 'chest', rarity: 'epic', magicDamage: 110, defense: 110, hp: 900, speed: 45, dodge: 18, description: '水月宫元婴期胸甲，法攻+8%，速度+5%，闪避+4%，冰冻概率提升至8%', sectExclusive: 'shuiyue', set: 'cang hai' },
        '沧海护肩': { type: 'shoulder', rarity: 'epic', magicDamage: 90, defense: 85, intelligence: 50, speed: 40, dodge: 15, description: '水月宫元婴期护肩，法攻+8%，速度+5%，闪避+4%，冰冻概率提升至8%', sectExclusive: 'shuiyue', set: 'cang hai' },
        '沧海护腿': { type: 'pants', rarity: 'epic', magicDamage: 90, defense: 85, agility: 50, speed: 40, dodge: 15, description: '水月宫元婴期护腿，法攻+8%，速度+5%，闪避+4%，冰冻概率提升至8%', sectExclusive: 'shuiyue', set: 'cang hai' },
        '沧海靴': { type: 'boots', rarity: 'epic', magicDamage: 90, defense: 80, agility: 60, speed: 50, dodge: 20, description: '水月宫元婴期战靴，法攻+8%，速度+5%，闪避+4%，冰冻概率提升至8%', sectExclusive: 'shuiyue', set: 'cang hai' },
        '沧海珠': { type: 'weapon', rarity: 'epic', magicDamage: 1200, intelligence: 70, speed: 50, dodge: 25, description: '水月宫元婴期武器，法攻+10%，速度+5%，闪避+5%，冰冻概率提升至8%', sectExclusive: 'shuiyue', set: 'cang hai', realm: '元婴期' },
        '水月心经': { type: 'skill-book', rarity: 'uncommon', attack: 8, mp: 20, description: '水月宫基础功法，法攻+8%，灵力回复加快20%，解锁基础招式水月掌' },
        '寒江剑法': { type: 'skill-book', rarity: 'rare', attack: 22, speed: 20, description: '水月宫筑基期功法，水系伤害+22%，技能可减速敌人' },
        '沧澜水皇诀': { type: 'skill-book', rarity: 'epic', attack: 30, speed: 30, dodge: 12, description: '水月宫核心心法，法攻+30%，水系伤害+40%，闪避+12%，减速效果提升至30%' },
        '沧海无量潮': { type: 'skill-book', rarity: 'legendary', attack: 180, description: '水月宫绝学，大范围水伤，群体冰冻，冷却10分钟' },
        '水纹剑': { type: 'weapon', rarity: 'uncommon', attack: 5, description: '水月宫炼气期法宝，法攻+5%，提升水月掌伤害10%' },
        '流霜玉佩': { type: 'artifact', rarity: 'rare', speed: 8, dodge: 6, description: '水月宫筑基期法宝，速度+8%，闪避+6%，可主动触发流霜闪避' },
        '沧澜珠': { type: 'artifact', rarity: 'epic', attack: 15, speed: 10, description: '水月宫金丹期法宝，法攻+15%，水系伤害+10%，冰冻持续时间延长1秒' },
        '沧海镜': { type: 'artifact', rarity: 'legendary', attack: 50, speed: 10, description: '水月宫元婴期法宝，大范围水伤效果提升50%，冰冻概率再提升10%' },
        // 水系新法宝
        '水灵珠': { type: 'artifact', rarity: 'epic', attack: 75, speed: 12, description: '金丹期蓝色法宝，水系伤害+15%，攻击有概率冰冻目标', realm: '金丹期', requiredRoot: '水灵根' },
        '水月剑': { type: 'weapon', rarity: 'epic', attack: 95, speed: 15, dodge: 10, description: '元婴期蓝色法宝，水系伤害+20%，闪避+15%', realm: '元婴期', requiredRoot: '水灵根' },
        '水神印': { type: 'artifact', rarity: 'epic', attack: 125, speed: 20, defense: 35, description: '化神期蓝色法宝，水系伤害+25%，攻击有概率触发水影闪避', realm: '化神期', requiredRoot: '水灵根' },
        '水月丹': { type: 'consumable', rarity: 'common', effect: { mp: 15, regen: 2 }, description: '水月宫炼气期丹药，瞬间恢复15%灵力，每秒回灵2%，持续5秒' },
        '寒江丹': { type: 'consumable', rarity: 'uncommon', effect: { attack: 15, speed: 10 }, description: '水月宫筑基期丹药，30秒内法攻+15%，速度+10%' },
        '沧澜丹': { type: 'consumable', rarity: 'rare', effect: { dodge: 5 }, description: '水月宫金丹期丹药，永久提升5%闪避率（最多叠加3颗）' },
        '沧海丹': { type: 'consumable', rarity: 'epic', effect: { cooldown: 5 }, description: '水月宫元婴期丹药，使用后5分钟内，沧海无量潮冷却缩短至5分钟' },
        '水月弟子令': { type: 'misc', rarity: 'common', description: '水月宫弟子令，可进入门派水阁，修炼基础水系功法，每日1次' },
        '流霜精英令': { type: 'misc', rarity: 'uncommon', description: '水月宫精英令，可进入门派寒潭，获取水系灵材，每日1次' },
        '沧澜核心令': { type: 'misc', rarity: 'rare', description: '水月宫核心令，可参与门派剑修议事，解锁高阶剑法' },
        '沧海长老令': { type: 'misc', rarity: 'epic', description: '水月宫长老令，可调用门派水系资源，开启寒潭秘境，仅长老及以上可兑' },
        
        // 炎火殿套装和物品
        // 炎火殿套装部件
        '赤焰盔': { type: 'helmet', rarity: 'epic', defense: 65, intelligence: 25, burn: 1, description: '炎火殿炼气期头盔，法攻+2%，灼烧伤害+1%', sectExclusive: 'yanhuo', set: 'chi yan' },
        '赤焰甲': { type: 'chest', rarity: 'epic', hp: 1250, defense: 100, intelligence: 25, burn: 1, description: '炎火殿炼气期胸甲，法攻+2%，灼烧伤害+1%', sectExclusive: 'yanhuo', set: 'chi yan' },
        '赤焰护肩': { type: 'shoulder', rarity: 'epic', defense: 65, intelligence: 22, burn: 1, description: '炎火殿炼气期护肩，法攻+2%，灼烧伤害+1%', sectExclusive: 'yanhuo', set: 'chi yan' },
        '赤焰护腿': { type: 'pants', rarity: 'epic', defense: 65, agility: 20, burn: 1, description: '炎火殿炼气期护腿，法攻+2%，灼烧伤害+1%', sectExclusive: 'yanhuo', set: 'chi yan' },
        '赤焰靴': { type: 'boots', rarity: 'epic', agility: 20, dodge: 6, burn: 1, description: '炎火殿炼气期战靴，法攻+2%，灼烧伤害+1%', sectExclusive: 'yanhuo', set: 'chi yan' },
        '赤焰杖': { type: 'weapon', rarity: 'epic', magicDamage: 275, intelligence: 25, crit: 6, burn: 1, description: '炎火殿炼气期武器，法攻+5%，灼烧伤害+1%', sectExclusive: 'yanhuo', set: 'chi yan', realm: '炼气期' },
        
        '焚天盔': { type: 'helmet', rarity: 'epic', defense: 75, intelligence: 30, burn: 10, description: '炎火殿筑基期头盔，法攻+4%，暴击+2%，灼烧持续时间延长10%', sectExclusive: 'yanhuo', set: 'fen tian' },
        '焚天甲': { type: 'chest', rarity: 'epic', hp: 1500, defense: 125, intelligence: 30, burn: 10, description: '炎火殿筑基期胸甲，法攻+4%，暴击+2%，灼烧持续时间延长10%', sectExclusive: 'yanhuo', set: 'fen tian' },
        '焚天护肩': { type: 'shoulder', rarity: 'epic', defense: 75, intelligence: 25, burn: 10, description: '炎火殿筑基期护肩，法攻+4%，暴击+2%，灼烧持续时间延长10%', sectExclusive: 'yanhuo', set: 'fen tian' },
        '焚天护腿': { type: 'pants', rarity: 'epic', defense: 75, agility: 22, burn: 10, description: '炎火殿筑基期护腿，法攻+4%，暴击+2%，灼烧持续时间延长10%', sectExclusive: 'yanhuo', set: 'fen tian' },
        '焚天靴': { type: 'boots', rarity: 'epic', agility: 22, dodge: 6.5, burn: 10, description: '炎火殿筑基期战靴，法攻+4%，暴击+2%，灼烧持续时间延长10%', sectExclusive: 'yanhuo', set: 'fen tian' },
        '焚天杖': { type: 'weapon', rarity: 'epic', magicDamage: 300, intelligence: 30, crit: 6.5, burn: 10, description: '炎火殿筑基期武器，法攻+6%，暴击+2%，灼烧持续时间延长10%', sectExclusive: 'yanhuo', set: 'fen tian', realm: '筑基期' },
        
        '炎狱盔': { type: 'helmet', rarity: 'epic', defense: 110, intelligence: 45, burn: 20, description: '炎火殿金丹期头盔，法攻+7%，暴击+3%，灼烧伤害+20%，暴击有6%概率引爆灼烧', sectExclusive: 'yanhuo', set: 'yan yu' },
        '炎狱甲': { type: 'chest', rarity: 'epic', hp: 3750, defense: 200, intelligence: 45, burn: 20, description: '炎火殿金丹期胸甲，法攻+7%，暴击+3%，灼烧伤害+20%，暴击有6%概率引爆灼烧', sectExclusive: 'yanhuo', set: 'yan yu' },
        '炎狱护肩': { type: 'shoulder', rarity: 'epic', defense: 110, intelligence: 40, burn: 20, description: '炎火殿金丹期护肩，法攻+7%，暴击+3%，灼烧伤害+20%，暴击有6%概率引爆灼烧', sectExclusive: 'yanhuo', set: 'yan yu' },
        '炎狱护腿': { type: 'pants', rarity: 'epic', defense: 110, agility: 35, burn: 20, description: '炎火殿金丹期护腿，法攻+7%，暴击+3%，灼烧伤害+20%，暴击有6%概率引爆灼烧', sectExclusive: 'yanhuo', set: 'yan yu' },
        '炎狱靴': { type: 'boots', rarity: 'epic', agility: 35, dodge: 8.75, burn: 20, description: '炎火殿金丹期战靴，法攻+7%，暴击+3%，灼烧伤害+20%，暴击有6%概率引爆灼烧', sectExclusive: 'yanhuo', set: 'yan yu' },
        '炎狱杖': { type: 'weapon', rarity: 'epic', magicDamage: 625, intelligence: 45, crit: 8.75, burn: 20, description: '炎火殿金丹期武器，法攻+7%，暴击+3%，灼烧伤害+20%，暴击有6%概率引爆灼烧', sectExclusive: 'yanhuo', set: 'yan yu', realm: '金丹期' },
        
        '九天盔': { type: 'helmet', rarity: 'epic', magicDamage: 120, defense: 90, intelligence: 60, crit: 12, burn: 20, description: '炎火殿元婴期头盔，法攻+9%，暴击+4%，暴击伤害+7%，灼烧引爆概率提升至10%', sectExclusive: 'yanhuo', set: 'jiu tian' },
        '九天甲': { type: 'chest', rarity: 'epic', magicDamage: 110, defense: 120, hp: 1200, intelligence: 70, crit: 12, burn: 20, description: '炎火殿元婴期胸甲，法攻+9%，暴击+4%，暴击伤害+7%，灼烧引爆概率提升至10%', sectExclusive: 'yanhuo', set: 'jiu tian' },
        '九天护肩': { type: 'shoulder', rarity: 'epic', magicDamage: 90, defense: 90, intelligence: 50, crit: 9, burn: 20, description: '炎火殿元婴期护肩，法攻+9%，暴击+4%，暴击伤害+7%，灼烧引爆概率提升至10%', sectExclusive: 'yanhuo', set: 'jiu tian' },
        '九天护腿': { type: 'pants', rarity: 'epic', magicDamage: 90, defense: 90, agility: 50, crit: 9, burn: 20, description: '炎火殿元婴期护腿，法攻+9%，暴击+4%，暴击伤害+7%，灼烧引爆概率提升至10%', sectExclusive: 'yanhuo', set: 'jiu tian' },
        '九天靴': { type: 'boots', rarity: 'epic', magicDamage: 90, defense: 85, agility: 60, crit: 9, burn: 20, description: '炎火殿元婴期战靴，法攻+9%，暴击+4%，暴击伤害+7%，灼烧引爆概率提升至10%', sectExclusive: 'yanhuo', set: 'jiu tian' },
        '九天杖': { type: 'weapon', rarity: 'epic', magicDamage: 1200, intelligence: 80, crit: 17.5, critDmg: 10, burn: 20, description: '炎火殿元婴期武器，法攻+13%，暴击+5%，暴击伤害+7%，灼烧引爆概率提升至10%', sectExclusive: 'yanhuo', set: 'jiu tian', realm: '元婴期' },
        '炎火基础诀': { type: 'skill-book', rarity: 'uncommon', attack: 10, description: '炎火殿基础功法，法攻+10%，解锁基础招式炎火拳' },
        '燎原火典': { type: 'skill-book', rarity: 'rare', attack: 25, description: '炎火殿筑基期功法，火系伤害+25%，范围技能伤害提升30%' },
        '大焚天心法': { type: 'skill-book', rarity: 'epic', attack: 35, critDmg: 30, description: '炎火殿核心心法，法攻+35%，火系伤害+45%，暴击伤害+30%，范围技能范围扩大50%' },
        '九天焚世炎': { type: 'skill-book', rarity: 'legendary', attack: 250, description: '炎火殿绝学，全屏火伤，持续灼烧，冷却12分钟' },
        '火纹刀': { type: 'weapon', rarity: 'uncommon', attack: 5, description: '炎火殿炼气期法宝，法攻+5%，提升炎火拳伤害10%' },
        '焚天坠': { type: 'artifact', rarity: 'rare', crit: 6, burn: 8, description: '炎火殿筑基期法宝，暴击+6%，灼烧伤害+8%，可主动触发焚天护体' },
        '炎狱印': { type: 'artifact', rarity: 'epic', attack: 18, burn: 12, description: '炎火殿金丹期法宝，法攻+18%，火系伤害+12%，灼烧引爆伤害提升20%' },
        '九天炎剑': { type: 'weapon', rarity: 'legendary', attack: 50, burn: 3, description: '炎火殿元婴期法宝，全屏火伤效果提升50%，持续灼烧时间延长3秒' },
        // 火系新法宝
        '火灵珠': { type: 'artifact', rarity: 'epic', attack: 80, burn: 25, description: '金丹期红色法宝，火系伤害+15%，攻击有概率触发灼烧', realm: '金丹期', requiredRoot: '火灵根' },
        '炎火剑': { type: 'weapon', rarity: 'epic', attack: 100, burn: 30, crit: 12, description: '元婴期红色法宝，火系伤害+20%，灼烧伤害+50%', realm: '元婴期', requiredRoot: '火灵根' },
        '火神印': { type: 'artifact', rarity: 'epic', attack: 130, burn: 40, defense: 40, description: '化神期红色法宝，火系伤害+25%，灼烧引爆伤害提升100%', realm: '化神期', requiredRoot: '火灵根' },
        '炎火丹': { type: 'consumable', rarity: 'common', effect: { mp: 15, attack: 10 }, description: '炎火殿炼气期丹药，瞬间恢复15%灵力，3秒内法攻+10%' },
        '燎原丹': { type: 'consumable', rarity: 'uncommon', effect: { attack: 20, crit: 8 }, description: '炎火殿筑基期丹药，30秒内火系伤害+20%，暴击率+8%' },
        '焚天丹': { type: 'consumable', rarity: 'rare', effect: { critDmg: 5 }, description: '炎火殿金丹期丹药，永久提升5%暴击伤害（最多叠加3颗）' },
        '九天丹': { type: 'consumable', rarity: 'epic', effect: { cooldown: 6 }, description: '炎火殿元婴期丹药，使用后5分钟内，九天焚世炎冷却缩短至6分钟' },
        '炎火弟子令': { type: 'misc', rarity: 'common', description: '炎火殿弟子令，可进入门派火堂，修炼基础火系功法，每日1次' },
        '焚天精英令': { type: 'misc', rarity: 'uncommon', description: '炎火殿精英令，可进入门派火山秘境，获取火系灵材，每日1次' },
        '炎狱核心令': { type: 'misc', rarity: 'rare', description: '炎火殿核心令，可参与门派火攻议事，解锁高阶火法' },
        '九天长老令': { type: 'misc', rarity: 'epic', description: '炎火殿长老令，可调用门派火系资源，开启火山试炼，仅长老及以上可兑' },
        
        // 皇土阁套装和物品
        // 皇土阁套装部件
        '黄土盔': { type: 'helmet', rarity: 'epic', defense: 65, vitality: 20, description: '皇土阁炼气期头盔，物防+2%，气血+2%', sectExclusive: 'huangtu', set: 'huang tu' },
        '黄土甲': { type: 'chest', rarity: 'epic', hp: 1250, defense: 100, vitality: 20, description: '皇土阁炼气期胸甲，物防+2%，气血+2%', sectExclusive: 'huangtu', set: 'huang tu' },
        '黄土护肩': { type: 'shoulder', rarity: 'epic', defense: 65, vitality: 18, description: '皇土阁炼气期护肩，物防+2%，气血+2%', sectExclusive: 'huangtu', set: 'huang tu' },
        '黄土护腿': { type: 'pants', rarity: 'epic', defense: 65, agility: 20, description: '皇土阁炼气期护腿，物防+2%，气血+2%', sectExclusive: 'huangtu', set: 'huang tu' },
        '黄土靴': { type: 'boots', rarity: 'epic', agility: 20, dodge: 6, description: '皇土阁炼气期战靴，物防+2%，气血+2%', sectExclusive: 'huangtu', set: 'huang tu' },
        '黄土棍': { type: 'weapon', rarity: 'epic', attack: 275, strength: 25, vitality: 6, description: '皇土阁炼气期武器，物防+2%，气血+2%', sectExclusive: 'huangtu', set: 'huang tu', realm: '炼气期' },
        
        '磐石盔': { type: 'helmet', rarity: 'epic', defense: 75, vitality: 22, description: '皇土阁筑基期头盔，物防+4%，法防+3%，气血+4%', sectExclusive: 'huangtu', set: 'pan shi' },
        '磐石甲': { type: 'chest', rarity: 'epic', hp: 1500, defense: 125, vitality: 22, description: '皇土阁筑基期胸甲，物防+4%，法防+3%，气血+4%', sectExclusive: 'huangtu', set: 'pan shi' },
        '磐石护肩': { type: 'shoulder', rarity: 'epic', defense: 75, vitality: 20, description: '皇土阁筑基期护肩，物防+4%，法防+3%，气血+4%', sectExclusive: 'huangtu', set: 'pan shi' },
        '磐石护腿': { type: 'pants', rarity: 'epic', defense: 75, agility: 22, description: '皇土阁筑基期护腿，物防+4%，法防+3%，气血+4%', sectExclusive: 'huangtu', set: 'pan shi' },
        '磐石靴': { type: 'boots', rarity: 'epic', agility: 22, dodge: 6.5, description: '皇土阁筑基期战靴，物防+4%，法防+3%，气血+4%', sectExclusive: 'huangtu', set: 'pan shi' },
        '磐石棍': { type: 'weapon', rarity: 'epic', attack: 300, strength: 30, vitality: 6.5, description: '皇土阁筑基期武器，物防+4%，法防+3%，气血+4%', sectExclusive: 'huangtu', set: 'pan shi', realm: '筑基期' },
        
        '镇岳盔': { type: 'helmet', rarity: 'epic', defense: 110, vitality: 35, description: '皇土阁金丹期头盔，双防+5%，气血+6%，受击有5%概率反震伤害', sectExclusive: 'huangtu', set: 'zhen yue' },
        '镇岳甲': { type: 'chest', rarity: 'epic', hp: 3750, defense: 200, vitality: 35, description: '皇土阁金丹期胸甲，双防+5%，气血+6%，受击有5%概率反震伤害', sectExclusive: 'huangtu', set: 'zhen yue' },
        '镇岳护肩': { type: 'shoulder', rarity: 'epic', defense: 110, vitality: 30, description: '皇土阁金丹期护肩，双防+5%，气血+6%，受击有5%概率反震伤害', sectExclusive: 'huangtu', set: 'zhen yue' },
        '镇岳护腿': { type: 'pants', rarity: 'epic', defense: 110, agility: 35, description: '皇土阁金丹期护腿，双防+5%，气血+6%，受击有5%概率反震伤害', sectExclusive: 'huangtu', set: 'zhen yue' },
        '镇岳靴': { type: 'boots', rarity: 'epic', agility: 35, dodge: 8.75, description: '皇土阁金丹期战靴，双防+5%，气血+6%，受击有5%概率反震伤害', sectExclusive: 'huangtu', set: 'zhen yue' },
        '镇岳棍': { type: 'weapon', rarity: 'epic', attack: 625, strength: 37, vitality: 8.75, description: '皇土阁金丹期武器，双防+10%，气血+6%，受击有5%概率反震伤害', sectExclusive: 'huangtu', set: 'zhen yue', realm: '金丹期' },
        
        '万岳盔': { type: 'helmet', rarity: 'epic', defense: 175, vitality: 50, description: '皇土阁元婴期头盔，双防+8%，气血+8%，反震概率提升至8%', sectExclusive: 'huangtu', set: 'wan yue' },
        '万岳甲': { type: 'chest', rarity: 'epic', hp: 6000, defense: 320, vitality: 50, description: '皇土阁元婴期胸甲，双防+8%，气血+8%，反震概率提升至8%', sectExclusive: 'huangtu', set: 'wan yue' },
        '万岳护肩': { type: 'shoulder', rarity: 'epic', defense: 175, vitality: 45, description: '皇土阁元婴期护肩，双防+8%，气血+8%，反震概率提升至8%', sectExclusive: 'huangtu', set: 'wan yue' },
        '万岳护腿': { type: 'pants', rarity: 'epic', defense: 175, agility: 50, description: '皇土阁元婴期护腿，双防+8%，气血+8%，反震概率提升至8%', sectExclusive: 'huangtu', set: 'wan yue' },
        '万岳靴': { type: 'boots', rarity: 'epic', agility: 50, dodge: 14, description: '皇土阁元婴期战靴，双防+8%，气血+8%，反震概率提升至8%', sectExclusive: 'huangtu', set: 'wan yue' },
        '万岳棍': { type: 'weapon', rarity: 'epic', attack: 1000, strength: 60, vitality: 14, description: '皇土阁元婴期武器，双防+16%，气血+8%，反震概率提升至8%', sectExclusive: 'huangtu', set: 'wan yue', realm: '元婴期' },
        '厚土诀': { type: 'skill-book', rarity: 'uncommon', defense: 8, description: '皇土阁基础功法，防御+8%，解锁基础招式镇山拳' },
        '镇山掌法': { type: 'skill-book', rarity: 'rare', defense: 20, description: '皇土阁筑基期功法，防御+20%，技能可眩晕敌人，反震伤害+10%' },
        '玄天镇岳功': { type: 'skill-book', rarity: 'epic', hp: 35, defense: 25, description: '皇土阁核心心法，气血+35%，双防+25%，被攻击概率减伤' },
        '五岳镇神印': { type: 'skill-book', rarity: 'legendary', defense: 50, description: '皇土阁绝学，大范围眩晕，自身获得巨额护盾，冷却10分钟' },
        '土纹盾': { type: 'artifact', rarity: 'uncommon', defense: 5, description: '皇土阁炼气期法宝，物防+5%，提升镇山拳伤害10%' },
        '磐石佩': { type: 'artifact', rarity: 'rare', defense: 6, hp: 8, description: '皇土阁筑基期法宝，双防+6%，气血+8%，可主动触发磐石护盾' },
        '镇岳印': { type: 'artifact', rarity: 'epic', defense: 15, hp: 12, description: '皇土阁金丹期法宝，双防+15%，气血+12%，反震伤害提升20%' },
        '万岳鼎': { type: 'artifact', rarity: 'legendary', defense: 50, description: '皇土阁元婴期法宝，护盾效果提升50%，反震概率再提升10%' },
        // 土系新法宝
        '土灵珠': { type: 'artifact', rarity: 'epic', defense: 60, hp: 1500, description: '金丹期黄色法宝，土系伤害+15%，受到伤害时概率触发反震', realm: '金丹期', requiredRoot: '土灵根' },
        '后土盾': { type: 'artifact', rarity: 'epic', defense: 80, hp: 2000, description: '元婴期黄色法宝，土系伤害+20%，双防+20%', realm: '元婴期', requiredRoot: '土灵根' },
        '土神印': { type: 'artifact', rarity: 'epic', defense: 100, hp: 2500, attack: 80, description: '化神期黄色法宝，土系伤害+25%，受到伤害时概率触发大地守护', realm: '化神期', requiredRoot: '土灵根' },
        '厚土丹': { type: 'consumable', rarity: 'common', effect: { hp: 15, defense: 10 }, description: '皇土阁炼气期丹药，瞬间恢复15%气血，3秒内防御+10%' },
        '镇山丹': { type: 'consumable', rarity: 'uncommon', effect: { defense: 15, hp: 10 }, description: '皇土阁筑基期丹药，30秒内双防+15%，气血+10%' },
        '镇岳丹': { type: 'consumable', rarity: 'rare', effect: { defense: 5 }, description: '皇土阁金丹期丹药，永久提升5%双防（最多叠加3颗）' },
        '万岳丹': { type: 'consumable', rarity: 'epic', effect: { cooldown: 5 }, description: '皇土阁元婴期丹药，使用后5分钟内，五岳镇神印冷却缩短至5分钟' },
        '皇土弟子令': { type: 'misc', rarity: 'common', description: '皇土阁弟子令，可进入门派土牢，修炼基础防御功法，每日1次' },
        '磐石精英令': { type: 'misc', rarity: 'uncommon', description: '皇土阁精英令，可进入门派矿山，获取土系灵材，每日1次' },
        '镇岳核心令': { type: 'misc', rarity: 'rare', description: '皇土阁核心令，可参与门派防御议事，解锁高阶防御功法' },
        '万岳长老令': { type: 'misc', rarity: 'epic', description: '皇土阁长老令，可调用门派土系资源，开启矿山秘境，仅长老及以上可兑' },
        '皮甲': { type: 'armor', rarity: 'uncommon', defense: 15, description: '皮甲', price: 400 },
        '玄铁甲': { type: 'armor', rarity: 'rare', defense: 35, description: '玄铁打造的护甲', price: 1800 },
        
        '金阳剑': { type: 'weapon', rarity: 'rare', attack: 60, element: 'metal', description: '金阳门专属武器', sectExclusive: 'jinyang', price: 3000 },
        '金罡护符': { type: 'artifact', rarity: 'rare', defense: 25, element: 'metal', description: '金阳门专属护符', sectExclusive: 'jinyang', price: 2500 },
        
        '青木杖': { type: 'weapon', rarity: 'rare', magicDamage: 45, element: 'wood', description: '青木宗专属法杖', sectExclusive: 'qingmu', price: 2800 },
        '回春珠': { type: 'artifact', rarity: 'rare', effect: { healBonus: 50 }, element: 'wood', description: '青木宗专属法宝', sectExclusive: 'qingmu', price: 2600 },
        
        '水月剑': { type: 'weapon', rarity: 'rare', attack: 55, element: 'water', description: '水月宫专属武器', sectExclusive: 'shuiyue', price: 2900 },
        '水灵珠': { type: 'artifact', rarity: 'rare', defense: 30, element: 'water', description: '水月宫专属法宝', sectExclusive: 'shuiyue', price: 2700 },
        
        '炎火刀': { type: 'weapon', rarity: 'rare', attack: 65, element: 'fire', description: '炎火殿专属武器', sectExclusive: 'yanhuo', price: 3100 },
        '火灵珠': { type: 'artifact', rarity: 'rare', effect: { fireDamageBonus: 30 }, element: 'fire', description: '炎火殿专属法宝', sectExclusive: 'yanhuo', price: 2800 },
        
        '皇土盾': { type: 'weapon', rarity: 'rare', attack: 40, defense: 40, element: 'earth', description: '皇土阁专属武器', sectExclusive: 'huangtu', price: 3000 },
        '土灵珠': { type: 'artifact', rarity: 'rare', defense: 45, element: 'earth', description: '皇土阁专属法宝', sectExclusive: 'huangtu', price: 2900 },
        
        '铁纹环': { type: 'magic-weapon', rarity: 'common', element: 'metal', attack: 5, defense: 2, description: '小幅提升攻击力，被攻击时微弱反弹伤害', price: 100 },
        '鎏金锥': { type: 'magic-weapon', rarity: 'uncommon', element: 'metal', attack: 12, defense: 5, description: '攻击附带锐金剑气，小幅破甲，反弹几率提升', price: 300 },
        '碎金令': { type: 'magic-weapon', rarity: 'rare', element: 'metal', attack: 25, defense: 10, description: '锐金破甲，无视敌方10%防御，攻击有概率迸发金芒', price: 1000 },
        '乾元金罡印': { type: 'magic-weapon', rarity: 'mythic', element: 'metal', attack: 60, defense: 30, description: '金罡护体，受击概率触发短暂无敌，反弹30%伤害', price: 5000 },
        
        '青藤索': { type: 'magic-weapon', rarity: 'common', element: 'wood', attack: 3, hp: 30, description: '概率束缚敌人1秒，自身微弱回血', price: 100 },
        '灵木杖': { type: 'magic-weapon', rarity: 'uncommon', element: 'wood', magicDamage: 8, hp: 80, description: '束缚时间延长，附带毒伤，持续恢复气血', price: 300 },
        '回春藤': { type: 'magic-weapon', rarity: 'rare', element: 'wood', attack: 15, hp: 200, description: '束缚期间自身快速回血，敌人无法移动', price: 1000 },
        
        '水玉簪': { type: 'magic-weapon', rarity: 'common', element: 'water', attack: 4, mp: 20, description: '提升水伤，移动速度小幅加快', price: 100 },
        '凝水佩': { type: 'magic-weapon', rarity: 'uncommon', element: 'water', attack: 10, mp: 60, description: '攻击附带水浸，降低敌人移速', price: 300 },
        '寒水镜': { type: 'magic-weapon', rarity: 'rare', element: 'water', attack: 20, mp: 150, description: '水浸叠满冻结敌人1秒，冻结期间增伤', price: 1000 },
        
        '火纹石': { type: 'magic-weapon', rarity: 'common', element: 'fire', attack: 6, description: '攻击附带灼烧，持续掉血', price: 100 },
        '焰光珠': { type: 'magic-weapon', rarity: 'uncommon', element: 'fire', attack: 15, description: '灼烧伤害提高，可叠加', price: 300 },
        '焚火符': { type: 'magic-weapon', rarity: 'rare', element: 'fire', attack: 30, description: '灼烧叠满触发爆燃，造成范围爆发伤害', price: 1000 },
        
        '黄土符': { type: 'magic-weapon', rarity: 'common', element: 'earth', defense: 6, hp: 20, description: '提升防御，被攻击时微弱减伤', price: 100 },
        '岩纹佩': { type: 'magic-weapon', rarity: 'uncommon', element: 'earth', defense: 15, hp: 50, description: '概率触发石肤，进一步减免伤害', price: 300 },
        '镇山印': { type: 'magic-weapon', rarity: 'rare', element: 'earth', defense: 30, hp: 120, attack: 15, description: '石肤期间反弹伤害，重击可震荡敌人', price: 1000 },
        
        '风絮符': { type: 'magic-weapon', rarity: 'common', element: 'wind', attack: 3, description: '小幅提升移速与闪避', price: 100 },
        '御风佩': { type: 'magic-weapon', rarity: 'uncommon', element: 'wind', attack: 8, description: '闪避成功后短暂加速', price: 300 },
        '疾风环': { type: 'magic-weapon', rarity: 'rare', element: 'wind', attack: 18, description: '闪避概率大幅提高，身法如风', price: 1000 },
        
        '雷纹符': { type: 'magic-weapon', rarity: 'common', element: 'thunder', attack: 5, mp: 15, description: '攻击附带麻痹，轻微减速', price: 100 },
        '引雷珠': { type: 'magic-weapon', rarity: 'uncommon', element: 'thunder', attack: 12, mp: 45, description: '概率引动落雷，范围伤害并麻痹', price: 300 },
        '惊雷锥': { type: 'magic-weapon', rarity: 'rare', element: 'thunder', attack: 25, mp: 100, description: '麻痹期间敌人无法施法，连续落雷伤害递增', price: 1000 },
        
        '冰屑符': { type: 'magic-weapon', rarity: 'common', element: 'ice', attack: 4, defense: 3, description: '攻击附带寒气，降低敌人移速', price: 100 },
        '寒玉佩': { type: 'magic-weapon', rarity: 'uncommon', element: 'ice', attack: 10, defense: 8, description: '寒气叠加后可冻结敌人0.5秒', price: 300 },
        '玄冰环': { type: 'magic-weapon', rarity: 'rare', element: 'ice', attack: 22, defense: 18, description: '冻结期间目标受到伤害大幅提升', price: 1000 },
        
        '铁剑胚': { type: 'magic-weapon', rarity: 'common', element: 'sword', attack: 6, description: '小幅提升攻击力，剑招更稳定', price: 100 },
        '精钢剑': { type: 'magic-weapon', rarity: 'uncommon', element: 'sword', attack: 15, description: '攻击概率触发剑气，造成额外伤害', price: 300 },
        '青锋剑': { type: 'magic-weapon', rarity: 'rare', element: 'sword', attack: 30, description: '剑气可穿透敌人，伤害翻倍', price: 1000 },
        
        '血纹符': { type: 'magic-weapon', rarity: 'common', element: 'blood', attack: 5, hp: 10, description: '攻击吸取少量气血', price: 100 },
        '血玉佩': { type: 'magic-weapon', rarity: 'uncommon', element: 'blood', attack: 12, hp: 30, description: '吸血比例提升，血量越低伤害越高', price: 300 },
        '噬血环': { type: 'magic-weapon', rarity: 'rare', element: 'blood', attack: 25, hp: 80, mp: 40, description: '吸血同时恢复灵力，残血时吸血翻倍', price: 1000 },
        
        '虚空血纹符': { type: 'magic-weapon', rarity: 'common', element: 'space', attack: 8, hp: 15, description: '空间穿梭中吸取敌人气血，小幅提升空间攻击', price: 200 },
        '虚空心血佩': { type: 'magic-weapon', rarity: 'uncommon', element: 'space', attack: 20, hp: 45, description: '空间穿透敌人，吸取大量气血，空间伤害大幅提升', price: 600 },
        '虚空血魂环': { type: 'magic-weapon', rarity: 'rare', element: 'space', attack: 40, hp: 120, description: '虚空穿梭吸取敌人血魂，吸血同时造成巨量空间伤害', price: 2000 },
        '虚天神血珠': { type: 'magic-weapon', rarity: 'mythic', element: 'space', attack: 100, hp: 300, mp: 150, description: '虚天神血，空间穿梭吸取神血，可撕裂空间造成毁天灭地伤害', price: 10000 },
        
        '混沌原石': { type: 'magic-weapon', rarity: 'common', element: 'chaos', attack: 5, defense: 5, hp: 30, mp: 30, description: '混沌原石，可适配所有灵根，小幅提升全属性', price: 300 },
        '混沌玉佩': { type: 'magic-weapon', rarity: 'uncommon', element: 'chaos', attack: 12, defense: 12, hp: 80, mp: 80, description: '混沌玉佩，可适配所有灵根，大幅提升全属性', price: 900 },
        '混沌环': { type: 'magic-weapon', rarity: 'rare', element: 'chaos', attack: 25, defense: 25, hp: 200, mp: 200, description: '混沌环，可完美适配所有灵根，全属性大幅提升', price: 3000 },
        '混沌珠': { type: 'magic-weapon', rarity: 'mythic', element: 'chaos', attack: 60, defense: 60, hp: 500, mp: 500, description: '混沌珠，内含三千大道，可完美适配所有灵根，全属性巨幅提升', price: 15000 },
        
        '金阳秘籍': { name: '金阳秘籍', type: 'skill-book', rarity: 'uncommon', sectExclusive: 'jinyang', description: '金阳门入门秘籍' },
        '金阳剑谱': { name: '金阳剑谱', type: 'skill-book', rarity: 'rare', sectExclusive: 'jinyang', description: '金阳门核心剑法' },
        '金阳丹': { name: '金阳丹', type: 'consumable', rarity: 'rare', sectExclusive: 'jinyang', effect: { hp: 300, mp: 200 }, description: '金阳门专属丹药' },
        '金阳石': { name: '金阳石', type: 'material', rarity: 'epic', sectExclusive: 'jinyang', description: '金阳门宝物' },
        '金阳神符': { name: '金阳神符', type: 'artifact', rarity: 'legendary', sectExclusive: 'jinyang', attack: 100, defense: 50, description: '金阳门至宝' },
        
        '青木秘典': { name: '青木秘典', type: 'skill-book', rarity: 'uncommon', sectExclusive: 'qingmu', description: '青木宗入门秘籍' },
        '青木术法': { name: '青木术法', type: 'skill-book', rarity: 'rare', sectExclusive: 'qingmu', description: '青木宗核心术法' },
        '青木精': { name: '青木精', type: 'consumable', rarity: 'rare', sectExclusive: 'qingmu', effect: { hp: 400, mp: 150 }, description: '青木宗专属丹药' },
        '青木珠': { name: '青木珠', type: 'material', rarity: 'epic', sectExclusive: 'qingmu', description: '青木宗宝物' },
        '青木之源': { name: '青木之源', type: 'artifact', rarity: 'legendary', sectExclusive: 'qingmu', effect: { healBonus: 100 }, description: '青木宗至宝' },
        
        '水月秘典': { name: '水月秘典', type: 'skill-book', rarity: 'uncommon', sectExclusive: 'shuiyue', description: '水月宫入门秘籍' },
        '水月剑诀': { name: '水月剑诀', type: 'skill-book', rarity: 'rare', sectExclusive: 'shuiyue', description: '水月宫核心剑法' },
        '水月精': { name: '水月精', type: 'consumable', rarity: 'rare', sectExclusive: 'shuiyue', effect: { hp: 250, mp: 300 }, description: '水月宫专属丹药' },
        '水月神符': { name: '水月神符', type: 'material', rarity: 'epic', sectExclusive: 'shuiyue', description: '水月宫宝物' },
        '水月之源': { name: '水月之源', type: 'artifact', rarity: 'legendary', sectExclusive: 'shuiyue', defense: 80, description: '水月宫至宝' },
        
        '炎火秘典': { name: '炎火秘典', type: 'skill-book', rarity: 'uncommon', sectExclusive: 'yanhuo', description: '炎火殿入门秘籍' },
        '炎火术法': { name: '炎火术法', type: 'skill-book', rarity: 'rare', sectExclusive: 'yanhuo', description: '炎火殿核心术法' },
        '炎火精': { name: '炎火精', type: 'consumable', rarity: 'rare', sectExclusive: 'yanhuo', effect: { hp: 200, mp: 350 }, description: '炎火殿专属丹药' },
        '炎火珠': { name: '炎火珠', type: 'material', rarity: 'epic', sectExclusive: 'yanhuo', description: '炎火殿宝物' },
        '炎火之源': { name: '炎火之源', type: 'artifact', rarity: 'legendary', sectExclusive: 'yanhuo', attack: 120, description: '炎火殿至宝' },
        
        '皇土秘典': { name: '皇土秘典', type: 'skill-book', rarity: 'uncommon', sectExclusive: 'huangtu', description: '皇土阁入门秘籍' },
        '皇土术法': { name: '皇土术法', type: 'skill-book', rarity: 'rare', sectExclusive: 'huangtu', description: '皇土阁核心术法' },
        '皇土精': { name: '皇土精', type: 'consumable', rarity: 'rare', sectExclusive: 'huangtu', effect: { hp: 350, mp: 250 }, description: '皇土阁专属丹药' },
        '皇土珠': { name: '皇土珠', type: 'material', rarity: 'epic', sectExclusive: 'huangtu', description: '皇土阁宝物' },
        '皇土之源': { name: '皇土之源', type: 'artifact', rarity: 'legendary', sectExclusive: 'huangtu', defense: 100, attack: 50, description: '皇土阁至宝' }
    },
    
    SHOPS: {
        'weaponsmith': {
            name: '武器店',
            description: '出售各种武器',
            items: ['铁剑', '精钢剑', '长剑']
        },
        'pharmacist': {
            name: '药店',
            description: '出售各种丹药',
            items: ['回春丹', '聚灵散', '大还丹', '灵元丹', '九转金丹', '筑基丹', '金丹突破丹']
        },
        'artifact-dealer': {
            name: '法宝店',
            description: '出售各种装备和法宝',
            items: ['布甲', '皮甲', '玄铁甲', '铁纹环', '鎏金锥', '碎金令', '青藤索', '灵木杖', '回春藤', '水玉簪', '凝水佩', '寒水镜', '火纹石', '焰光珠', '焚火符', '黄土符', '岩纹佩', '镇山印', '风絮符', '御风佩', '疾风环', '雷纹符', '引雷珠', '惊雷锥', '冰屑符', '寒玉佩', '玄冰环', '铁剑胚', '精钢剑', '青锋剑', '血纹符', '血玉佩', '噬血环', '虚空血纹符', '虚空心血佩', '虚空血魂环', '虚天神血珠', '混沌原石', '混沌玉佩', '混沌环', '混沌珠']
        }
    },

    SKILLS: {
        '基础吐纳法': {
            name: '基础吐纳法',
            type: 'cultivation',
            element: 'neutral',
            damage: 0,
            mpCost: 0,
            effect: '缓慢恢复灵力',
            description: '最基础的修仙功法'
        },
        '金阳剑法': {
            name: '金阳剑法',
            type: 'attack',
            element: 'metal',
            damage: 30,
            mpCost: 10,
            effect: '锋利的金系剑法',
            description: '金阳门基础剑法'
        },
        '金罡护体': {
            name: '金罡护体',
            type: 'defense',
            element: 'metal',
            damage: 0,
            mpCost: 15,
            defenseBonus: 15,
            effect: '提升防御',
            description: '金阳门防御技能'
        },
        '裂天斩': {
            name: '裂天斩',
            type: 'attack',
            element: 'metal',
            damage: 80,
            mpCost: 30,
            effect: '强力一击',
            description: '金阳门大招'
        },
        '青木诀': {
            name: '青木诀',
            type: 'attack',
            element: 'wood',
            damage: 25,
            mpCost: 8,
            effect: '木系攻击',
            description: '青木宗基础技能'
        },
        '回春术': {
            name: '回春术',
            type: 'heal',
            element: 'wood',
            damage: 25,
            mpCost: 20,
            effect: '恢复气血',
            description: '青木宗治疗技能'
        },
        '生长术': {
            name: '生长术',
            type: 'support',
            element: 'wood',
            damage: 0,
            mpCost: 15,
            effect: '加速植物生长',
            description: '青木宗特色技能'
        },
        '水月剑法': {
            name: '水月剑法',
            type: 'attack',
            element: 'water',
            damage: 28,
            mpCost: 10,
            effect: '飘逸的水系剑法',
            description: '水月宫基础剑法'
        },
        '冰封术': {
            name: '冰封术',
            type: 'control',
            element: 'water',
            damage: 15,
            mpCost: 20,
            effect: '冻结敌人',
            description: '水月宫控制技能'
        },
        '水幕天华': {
            name: '水幕天华',
            type: 'defense',
            element: 'water',
            damage: 0,
            mpCost: 25,
            defenseBonus: 20,
            effect: '水系护盾',
            description: '水月宫防御技能'
        },
        '炎火诀': {
            name: '炎火诀',
            type: 'attack',
            element: 'fire',
            damage: 35,
            mpCost: 12,
            effect: '霸道的火系攻击',
            description: '炎火殿基础技能'
        },
        '烈焰焚天': {
            name: '烈焰焚天',
            type: 'attack',
            element: 'fire',
            damage: 90,
            mpCost: 35,
            effect: '超强火系攻击',
            description: '炎火殿大招'
        },
        '火墙术': {
            name: '火墙术',
            type: 'area',
            element: 'fire',
            damage: 40,
            mpCost: 25,
            effect: '火焰区域',
            description: '炎火殿范围技能',
            isAOE: true
        },
        '皇土诀': {
            name: '皇土诀',
            type: 'attack',
            element: 'earth',
            damage: 22,
            mpCost: 8,
            effect: '厚重的土系攻击',
            description: '皇土阁基础技能'
        },
        '大地之盾': {
            name: '大地之盾',
            type: 'defense',
            element: 'earth',
            damage: 0,
            mpCost: 20,
            defenseBonus: 25,
            effect: '超强防御',
            description: '皇土阁防御技能'
        },
        '石化术': {
            name: '石化术',
            type: 'control',
            element: 'earth',
            damage: 20,
            mpCost: 30,
            effect: '石化敌人',
            description: '皇土阁控制技能'
        },
        
        '金刃击': {
            name: '金刃击',
            type: 'attack',
            element: 'metal',
            damage: 120,
            mpCost: 15,
            effect: '造成120%攻击伤害，附带5%破甲，持续2回合',
            description: '金阳门炼气期主动技能',
            requiredRealm: '炼气期'
        },
        '金纹护体': {
            name: '金纹护体',
            type: 'passive',
            element: 'metal',
            damage: 0,
            mpCost: 0,
            effect: '永久提升防御+8，被攻击时10%概率反弹10%伤害',
            description: '金阳门炼气期被动技能',
            requiredRealm: '炼气期'
        },
        '破甲斩': {
            name: '破甲斩',
            type: 'ultimate',
            element: 'metal',
            damage: 0,
            mpCost: 30,
            effect: '蓄力1回合，下次攻击无视20%防御，必定暴击',
            description: '金阳门炼气期大招',
            requiredRealm: '炼气期'
        },
        '金罡破': {
            name: '金罡破',
            type: 'attack',
            element: 'metal',
            damage: 150,
            mpCost: 25,
            effect: '对直线敌人造成150%攻击伤害，破甲提升至10%',
            description: '金阳门筑基期主动技能',
            requiredRealm: '筑基期'
        },
        '金骨不屈': {
            name: '金骨不屈',
            type: 'passive',
            element: 'metal',
            damage: 0,
            mpCost: 0,
            effect: '血量低于30%时，防御+20%，免疫眩晕',
            description: '金阳门筑基期被动技能',
            requiredRealm: '筑基期'
        },
        '万刃归宗': {
            name: '万刃归宗',
            type: 'ultimate',
            element: 'metal',
            damage: 300,
            mpCost: 60,
            effect: '对目标造成300%攻击伤害，破甲30%，持续3回合',
            description: '金阳门筑基期大招',
            requiredRealm: '筑基期'
        },
        '庚金裂空': {
            name: '庚金裂空',
            type: 'attack',
            element: 'metal',
            damage: 200,
            mpCost: 40,
            effect: '对周围敌人造成200%攻击伤害，附带15%破甲',
            description: '金阳门金丹期主动技能',
            requiredRealm: '金丹期'
        },
        '金銮盾': {
            name: '金銮盾',
            type: 'passive',
            element: 'metal',
            damage: 0,
            mpCost: 0,
            effect: '受到伤害时，15%概率生成吸收10%最大气血的护盾',
            description: '金阳门金丹期被动技能',
            requiredRealm: '金丹期'
        },
        '乾元金罡印': {
            name: '乾元金罡印',
            type: 'ultimate',
            element: 'metal',
            damage: 500,
            mpCost: 100,
            effect: '对单体造成500%攻击伤害，无视50%防御，击杀后恢复20%气血',
            description: '金阳门金丹期大招',
            requiredRealm: '金丹期'
        },
        '先天庚金斩': {
            name: '先天庚金斩',
            type: 'attack',
            element: 'metal',
            damage: 250,
            mpCost: 50,
            effect: '造成250%攻击伤害，破甲25%，并沉默目标1回合',
            description: '金阳门元婴期主动技能',
            requiredRealm: '元婴期'
        },
        '万法不侵': {
            name: '万法不侵',
            type: 'passive',
            element: 'metal',
            damage: 0,
            mpCost: 0,
            effect: '金系伤害+30%，免疫所有控制效果',
            description: '金阳门元婴期被动技能',
            requiredRealm: '元婴期'
        },
        '诛仙金刃': {
            name: '诛仙金刃',
            type: 'ultimate',
            element: 'metal',
            damage: 800,
            mpCost: 150,
            effect: '对全场敌人造成800%攻击伤害，无视70%防御，自身进入1回合虚弱',
            description: '金阳门元婴期大招',
            requiredRealm: '元婴期'
        },
        
        '青藤缚': {
            name: '青藤缚',
            type: 'control',
            element: 'wood',
            damage: 0,
            mpCost: 12,
            effect: '用青藤束缚目标1回合，使其无法移动，自身每秒回血+2',
            description: '青木宗炼气期主动技能',
            requiredRealm: '炼气期'
        },
        '枯荣诀': {
            name: '枯荣诀',
            type: 'passive',
            element: 'wood',
            damage: 0,
            mpCost: 0,
            effect: '自然回血速度+20%，受到伤害后3秒内额外回血+5',
            description: '青木宗炼气期被动技能',
            requiredRealm: '炼气期'
        },
        '回春术2': {
            name: '回春术',
            type: 'heal',
            element: 'wood',
            damage: 20,
            mpCost: 25,
            effect: '瞬间恢复自身20%最大气血，并给队友施加持续回血buff',
            description: '青木宗炼气期大招',
            requiredRealm: '炼气期'
        },
        '万木绞杀': {
            name: '万木绞杀',
            type: 'attack',
            element: 'wood',
            damage: 130,
            mpCost: 20,
            effect: '造成130%攻击伤害，持续毒伤+5/秒，束缚2回合',
            description: '青木宗筑基期主动技能',
            requiredRealm: '筑基期'
        },
        '木灵守护': {
            name: '木灵守护',
            type: 'passive',
            element: 'wood',
            damage: 0,
            mpCost: 0,
            effect: '队友受到伤害时，替其承担10%伤害，并转化为自身回血',
            description: '青木宗筑基期被动技能',
            requiredRealm: '筑基期'
        },
        '枯木逢春': {
            name: '枯木逢春',
            type: 'ultimate',
            element: 'wood',
            damage: 0,
            mpCost: 50,
            effect: '濒死时触发，恢复50%最大气血，获得10秒减伤30%，冷却60秒',
            description: '青木宗筑基期大招',
            requiredRealm: '筑基期'
        },
        '青木领域': {
            name: '青木领域',
            type: 'attack',
            element: 'wood',
            damage: 180,
            mpCost: 35,
            effect: '对周围敌人造成180%攻击伤害，同时为队友回血15%最大气血',
            description: '青木宗金丹期主动技能',
            requiredRealm: '金丹期'
        },
        '造化生机': {
            name: '造化生机',
            type: 'passive',
            element: 'wood',
            damage: 0,
            mpCost: 0,
            effect: '治疗效果+40%，击杀敌人后恢复全队10%气血',
            description: '青木宗金丹期被动技能',
            requiredRealm: '金丹期'
        },
        '万木长生': {
            name: '万木长生',
            type: 'ultimate',
            element: 'wood',
            damage: 0,
            mpCost: 90,
            effect: '召唤生命古树，为全队持续回血10%/秒，持续8秒，期间队友免疫致死伤害1次',
            description: '青木宗金丹期大招',
            requiredRealm: '金丹期'
        },
        '先天乙木咒': {
            name: '先天乙木咒',
            type: 'attack',
            element: 'wood',
            damage: 220,
            mpCost: 45,
            effect: '对敌人造成220%攻击伤害，同时为队友回血25%最大气血',
            description: '青木宗元婴期主动技能',
            requiredRealm: '元婴期'
        },
        '不死藤': {
            name: '不死藤',
            type: 'passive',
            element: 'wood',
            damage: 0,
            mpCost: 0,
            effect: '死亡后原地复活，恢复30%气血，每场战斗仅触发1次',
            description: '青木宗元婴期被动技能',
            requiredRealm: '元婴期'
        },
        '世界树降临': {
            name: '世界树降临',
            type: 'ultimate',
            element: 'wood',
            damage: 0,
            mpCost: 140,
            effect: '召唤世界树，全场队友回血30%/秒，持续10秒，敌人受到持续毒伤20/秒，领域内无法死亡',
            description: '青木宗元婴期大招',
            requiredRealm: '元婴期'
        },
        
        '水浪击': {
            name: '水浪击',
            type: 'attack',
            element: 'water',
            damage: 110,
            mpCost: 10,
            effect: '掀起水浪击退敌人，造成110%攻击伤害，减速15%，持续2回合',
            description: '水月宫炼气期主动技能',
            requiredRealm: '炼气期'
        },
        '水纹盾': {
            name: '水纹盾',
            type: 'passive',
            element: 'water',
            damage: 0,
            mpCost: 0,
            effect: '受到伤害时，10%概率生成吸收5%最大气血的水盾',
            description: '水月宫炼气期被动技能',
            requiredRealm: '炼气期'
        },
        '凝水成冰': {
            name: '凝水成冰',
            type: 'ultimate',
            element: 'water',
            damage: 0,
            mpCost: 30,
            effect: '将目标冻结1.5秒，冻结期间受到的伤害提升20%',
            description: '水月宫炼气期大招',
            requiredRealm: '炼气期'
        },
        '沧澜奔涌': {
            name: '沧澜奔涌',
            type: 'attack',
            element: 'water',
            damage: 160,
            mpCost: 22,
            effect: '召唤巨浪冲击，对前方范围敌人造成160%攻击伤害，减速30%，持续3回合',
            description: '水月宫筑基期主动技能',
            requiredRealm: '筑基期',
            isAOE: true
        },
        '水镜分身': {
            name: '水镜分身',
            type: 'passive',
            element: 'water',
            damage: 0,
            mpCost: 0,
            effect: '闪避后生成水镜分身，迷惑敌人，分身存在2秒',
            description: '水月宫筑基期被动技能',
            requiredRealm: '筑基期'
        },
        '四海冰封': {
            name: '四海冰封',
            type: 'ultimate',
            element: 'water',
            damage: 0,
            mpCost: 55,
            effect: '冻结周围所有敌人2秒，期间他们受到的伤害提升40%',
            description: '水月宫筑基期大招',
            requiredRealm: '筑基期'
        },
        '天河倒灌': {
            name: '天河倒灌',
            type: 'attack',
            element: 'water',
            damage: 220,
            mpCost: 38,
            effect: '引动天河之水，对大范围敌人造成220%攻击伤害，减速50%，持续4回合',
            description: '水月宫金丹期主动技能',
            requiredRealm: '金丹期',
            isAOE: true
        },
        '沧海壁垒': {
            name: '沧海壁垒',
            type: 'passive',
            element: 'water',
            damage: 0,
            mpCost: 0,
            effect: '水盾吸收量提升至20%最大气血，破碎时对周围造成冰伤',
            description: '水月宫金丹期被动技能',
            requiredRealm: '金丹期'
        },
        '玄冥水玉': {
            name: '玄冥水玉',
            type: 'ultimate',
            element: 'water',
            damage: 0,
            mpCost: 95,
            effect: '召唤玄冥水玉，冻结全场敌人3秒，期间他们防御清零，受到的所有伤害翻倍',
            description: '水月宫金丹期大招',
            requiredRealm: '金丹期'
        },
        '先天壬水咒': {
            name: '先天壬水咒',
            type: 'attack',
            element: 'water',
            damage: 260,
            mpCost: 48,
            effect: '操控先天壬水，造成260%攻击伤害，冻结目标2.5秒，并减速70%',
            description: '水月宫元婴期主动技能',
            requiredRealm: '元婴期'
        },
        '水幕天华2': {
            name: '水幕天华',
            type: 'passive',
            element: 'water',
            damage: 0,
            mpCost: 0,
            effect: '免疫所有控制，水系伤害+35%，治疗效果+25%',
            description: '水月宫元婴期被动技能',
            requiredRealm: '元婴期'
        },
        '四海归墟': {
            name: '四海归墟',
            type: 'ultimate',
            element: 'water',
            damage: 600,
            mpCost: 145,
            effect: '创造归墟领域，对全场敌人造成600%攻击伤害，冻结5秒，期间持续流失气血',
            description: '水月宫元婴期大招',
            requiredRealm: '元婴期'
        },
        
        '火焰弹': {
            name: '火焰弹',
            type: 'attack',
            element: 'fire',
            damage: 120,
            mpCost: 12,
            effect: '发射火焰弹，造成120%攻击伤害，附带灼烧+3/秒，持续3回合',
            description: '炎火殿炼气期主动技能',
            requiredRealm: '炼气期'
        },
        '炎息': {
            name: '炎息',
            type: 'passive',
            element: 'fire',
            damage: 0,
            mpCost: 0,
            effect: '灼烧伤害+20%，攻击灼烧目标时暴击率+5%',
            description: '炎火殿炼气期被动技能',
            requiredRealm: '炼气期'
        },
        '爆炎术': {
            name: '爆炎术',
            type: 'ultimate',
            element: 'fire',
            damage: 0,
            mpCost: 28,
            effect: '引爆目标身上的灼烧效果，造成150%额外伤害，灼烧层数越多伤害越高',
            description: '炎火殿炼气期大招',
            requiredRealm: '炼气期'
        },
        '炎狱冲击': {
            name: '炎狱冲击',
            type: 'attack',
            element: 'fire',
            damage: 170,
            mpCost: 24,
            effect: '向前冲锋，对路径敌人造成170%攻击伤害，附带灼烧+5/秒，持续4回合',
            description: '炎火殿筑基期主动技能',
            requiredRealm: '筑基期'
        },
        '焚天战意': {
            name: '焚天战意',
            type: 'passive',
            element: 'fire',
            damage: 0,
            mpCost: 0,
            effect: '血量越低，攻击越高，最多提升30%',
            description: '炎火殿筑基期被动技能',
            requiredRealm: '筑基期'
        },
        '炎爆领域': {
            name: '炎爆领域',
            type: 'ultimate',
            element: 'fire',
            damage: 200,
            mpCost: 58,
            effect: '展开炎狱领域，对周围敌人造成200%攻击伤害，持续灼烧+10/秒，持续8秒',
            description: '炎火殿筑基期大招',
            requiredRealm: '筑基期'
        },
        '南明离火': {
            name: '南明离火',
            type: 'attack',
            element: 'fire',
            damage: 240,
            mpCost: 42,
            effect: '召唤南明离火，对大范围敌人造成240%攻击伤害，灼烧+15/秒，持续5回合',
            description: '炎火殿金丹期主动技能',
            requiredRealm: '金丹期',
            isAOE: true
        },
        '九阳焚邪': {
            name: '九阳焚邪',
            type: 'passive',
            element: 'fire',
            damage: 0,
            mpCost: 0,
            effect: '火系伤害+40%，灼烧目标无法回血',
            description: '炎火殿金丹期被动技能',
            requiredRealm: '金丹期'
        },
        '焚天煮海': {
            name: '焚天煮海',
            type: 'ultimate',
            element: 'fire',
            damage: 500,
            mpCost: 105,
            effect: '引动九阳真火，对全场敌人造成500%攻击伤害，灼烧+30/秒，持续10秒，期间敌人无法移动',
            description: '炎火殿金丹期大招',
            requiredRealm: '金丹期',
            isAOE: true
        },
        '先天丙火咒': {
            name: '先天丙火咒',
            type: 'attack',
            element: 'fire',
            damage: 300,
            mpCost: 52,
            effect: '操控先天丙火，造成300%攻击伤害，灼烧+25/秒，并点燃周围敌人',
            description: '炎火殿元婴期主动技能',
            requiredRealm: '元婴期',
            isAOE: true
        },
        '不死炎凰': {
            name: '不死炎凰',
            type: 'passive',
            element: 'fire',
            damage: 0,
            mpCost: 0,
            effect: '死亡后化为炎凰，复活并恢复40%气血，攻击+50%，持续10秒',
            description: '炎火殿元婴期被动技能',
            requiredRealm: '元婴期'
        },
        '焚天灭世': {
            name: '焚天灭世',
            type: 'ultimate',
            element: 'fire',
            damage: 1000,
            mpCost: 160,
            effect: '释放灭世之火，对全场敌人造成1000%攻击伤害，灼烧+50/秒，持续15秒，自身进入2回合虚弱',
            description: '炎火殿元婴期大招',
            requiredRealm: '元婴期'
        },
        
        '落石术': {
            name: '落石术',
            type: 'attack',
            element: 'earth',
            damage: 130,
            mpCost: 11,
            effect: '召唤落石砸向目标，造成130%攻击伤害，眩晕0.5秒',
            description: '皇土阁炼气期主动技能',
            requiredRealm: '炼气期'
        },
        '石肤术': {
            name: '石肤术',
            type: 'passive',
            element: 'earth',
            damage: 0,
            mpCost: 0,
            effect: '永久提升防御+10，受到伤害时减免5%',
            description: '皇土阁炼气期被动技能',
            requiredRealm: '炼气期'
        },
        '地裂术': {
            name: '地裂术',
            type: 'ultimate',
            element: 'earth',
            damage: 180,
            mpCost: 32,
            effect: '震裂地面，对周围敌人造成180%攻击伤害，眩晕1秒，减速20%',
            description: '皇土阁炼气期大招',
            requiredRealm: '炼气期'
        },
        '岩山突刺': {
            name: '岩山突刺',
            type: 'attack',
            element: 'earth',
            damage: 190,
            mpCost: 26,
            effect: '地面突刺，对直线敌人造成190%攻击伤害，破甲10%，持续2回合',
            description: '皇土阁筑基期主动技能',
            requiredRealm: '筑基期'
        },
        '大地守护': {
            name: '大地守护',
            type: 'passive',
            element: 'earth',
            damage: 0,
            mpCost: 0,
            effect: '被攻击时，15%概率触发石化，免疫伤害1秒，反弹15%伤害',
            description: '皇土阁筑基期被动技能',
            requiredRealm: '筑基期'
        },
        '五岳镇地': {
            name: '五岳镇地',
            type: 'ultimate',
            element: 'earth',
            damage: 300,
            mpCost: 62,
            effect: '召唤五岳之力，对周围敌人造成300%攻击伤害，眩晕2秒，减速50%',
            description: '皇土阁筑基期大招',
            requiredRealm: '筑基期'
        },
        '须弥山印': {
            name: '须弥山印',
            type: 'attack',
            element: 'earth',
            damage: 250,
            mpCost: 44,
            effect: '砸下须弥山印，对大范围敌人造成250%攻击伤害，破甲20%，持续3回合',
            description: '皇土阁金丹期主动技能',
            requiredRealm: '金丹期',
            isAOE: true
        },
        '后土神躯': {
            name: '后土神躯',
            type: 'passive',
            element: 'earth',
            damage: 0,
            mpCost: 0,
            effect: '气血上限+30%，防御+25%，免疫眩晕',
            description: '皇土阁金丹期被动技能',
            requiredRealm: '金丹期'
        },
        '镇岳洪荒': {
            name: '镇岳洪荒',
            type: 'ultimate',
            element: 'earth',
            damage: 600,
            mpCost: 110,
            effect: '化身洪荒山岳，对全场敌人造成600%攻击伤害，眩晕3秒，期间自身无敌，防御翻倍',
            description: '皇土阁金丹期大招',
            requiredRealm: '金丹期',
            isAOE: true
        },
        '先天戊土咒': {
            name: '先天戊土咒',
            type: 'attack',
            element: 'earth',
            damage: 320,
            mpCost: 54,
            effect: '操控先天戊土，造成320%攻击伤害，破甲30%，眩晕2.5秒',
            description: '皇土阁元婴期主动技能',
            requiredRealm: '元婴期'
        },
        '万劫不磨': {
            name: '万劫不磨',
            type: 'passive',
            element: 'earth',
            damage: 0,
            mpCost: 0,
            effect: '受到的伤害减免30%，反弹20%伤害，免疫所有控制',
            description: '皇土阁元婴期被动技能',
            requiredRealm: '元婴期'
        },
        '盘古开天': {
            name: '盘古开天',
            type: 'ultimate',
            element: 'earth',
            damage: 1200,
            mpCost: 170,
            effect: '引动盘古之力，震裂大地，对全场敌人造成1200%攻击伤害，眩晕5秒，破甲70%，自身防御翻倍10秒',
            description: '皇土阁元婴期大招',
            requiredRealm: '元婴期'
        },
        
        '混沌初开': {
            name: '混沌初开',
            type: 'passive',
            element: 'chaos',
            damage: 0,
            mpCost: 0,
            effect: '所有灵根伤害+5%，气血/防御+5%，全属性均衡成长',
            description: '混沌灵根炼气期被动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '混沌灵根'
        },
        '混沌吐纳': {
            name: '混沌吐纳',
            type: 'active',
            element: 'chaos',
            damage: 0,
            mpCost: 20,
            effect: '10秒内灵力恢复速度+30%，所有技能冷却缩短10%',
            description: '混沌灵根炼气期主动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '混沌灵根'
        },
        '混沌一气': {
            name: '混沌一气',
            type: 'ultimate',
            element: 'chaos',
            damage: 0,
            mpCost: 40,
            effect: '短暂凝聚混沌之气，下次攻击附带随机一种灵根效果',
            description: '混沌灵根炼气期大招',
            requiredRealm: '炼气期',
            exclusiveRoot: '混沌灵根'
        },
        '混沌衍变': {
            name: '混沌衍变',
            type: 'passive',
            element: 'chaos',
            damage: 0,
            mpCost: 0,
            effect: '每次攻击有15%概率触发灵根随机强化，持续3回合',
            description: '混沌灵根筑基期被动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '混沌灵根'
        },
        '混沌屏障': {
            name: '混沌屏障',
            type: 'active',
            element: 'chaos',
            damage: 0,
            mpCost: 35,
            effect: '生成混沌护盾，吸收20%最大气血伤害，护盾破碎时反弹所有伤害',
            description: '混沌灵根筑基期主动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '混沌灵根'
        },
        '混沌归墟': {
            name: '混沌归墟',
            type: 'ultimate',
            element: 'chaos',
            damage: 200,
            mpCost: 70,
            effect: '引动混沌之力，对全场造成200%攻击伤害，附带随机2种灵根debuff',
            description: '混沌灵根筑基期大招',
            requiredRealm: '筑基期',
            exclusiveRoot: '混沌灵根'
        },
        '混沌道体': {
            name: '混沌道体',
            type: 'passive',
            element: 'chaos',
            damage: 0,
            mpCost: 0,
            effect: '全属性+15%，免疫所有灵根克制效果',
            description: '混沌灵根金丹期被动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '混沌灵根'
        },
        '混沌流转': {
            name: '混沌流转',
            type: 'active',
            element: 'chaos',
            damage: 0,
            mpCost: 50,
            effect: '瞬间切换任意灵根技能形态，无冷却（每场限3次）',
            description: '混沌灵根金丹期主动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '混沌灵根'
        },
        '混沌开天': {
            name: '混沌开天',
            type: 'ultimate',
            element: 'chaos',
            damage: 600,
            mpCost: 120,
            effect: '开天辟地一击，对单体造成600%攻击伤害，无视50%防御，附带所有灵根基础效果',
            description: '混沌灵根金丹期大招',
            requiredRealm: '金丹期',
            exclusiveRoot: '混沌灵根'
        },
        '混沌本源': {
            name: '混沌本源',
            type: 'passive',
            element: 'chaos',
            damage: 0,
            mpCost: 0,
            effect: '所有技能效果+25%，击杀敌人后恢复30%气血+灵力',
            description: '混沌灵根元婴期被动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '混沌灵根'
        },
        '混沌领域': {
            name: '混沌领域',
            type: 'active',
            element: 'chaos',
            damage: 0,
            mpCost: 80,
            effect: '展开领域，友方全属性+20%，敌方全属性-20%，持续8秒',
            description: '混沌灵根元婴期主动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '混沌灵根'
        },
        '混沌无极': {
            name: '混沌无极',
            type: 'ultimate',
            element: 'chaos',
            damage: 1000,
            mpCost: 180,
            effect: '召唤混沌巨兽，对全场造成1000%攻击伤害，清空敌方所有增益，自身进入3回合无敌',
            description: '混沌灵根元婴期大招',
            requiredRealm: '元婴期',
            exclusiveRoot: '混沌灵根'
        },
        
        '百草回春': {
            name: '百草回春',
            type: 'passive',
            element: 'wood',
            damage: 0,
            mpCost: 0,
            effect: '自然回血+30%，攻击时有10%概率为自身/队友回血5%',
            description: '先天百草灵根炼气期被动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天百草灵根'
        },
        '毒藤缠绕': {
            name: '毒藤缠绕',
            type: 'control',
            element: 'wood',
            damage: 0,
            mpCost: 18,
            effect: '召唤毒藤束缚目标1.5秒，持续毒伤+8/秒',
            description: '先天百草灵根炼气期主动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天百草灵根'
        },
        '百草淬体': {
            name: '百草淬体',
            type: 'ultimate',
            element: 'wood',
            damage: 0,
            mpCost: 35,
            effect: '瞬间净化所有负面效果，恢复15%气血，获得10秒减伤15%',
            description: '先天百草灵根炼气期大招',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天百草灵根'
        },
        '灵草共生': {
            name: '灵草共生',
            type: 'passive',
            element: 'wood',
            damage: 0,
            mpCost: 0,
            effect: '队友存在时，自身治疗效果+20%，队友防御+10%',
            description: '先天百草灵根筑基期被动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天百草灵根'
        },
        '百花迷阵': {
            name: '百花迷阵',
            type: 'control',
            element: 'wood',
            damage: 0,
            mpCost: 32,
            effect: '释放花粉迷雾，敌方全体失明2秒，移速-40%',
            description: '先天百草灵根筑基期主动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天百草灵根'
        },
        '枯木逢生': {
            name: '枯木逢生',
            type: 'ultimate',
            element: 'wood',
            damage: 0,
            mpCost: 60,
            effect: '濒死时触发，恢复60%气血，召唤灵草替死，每场限1次',
            description: '先天百草灵根筑基期大招',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天百草灵根'
        },
        '百草造化': {
            name: '百草造化',
            type: 'passive',
            element: 'wood',
            damage: 0,
            mpCost: 0,
            effect: '治疗效果+40%，毒伤+30%，击杀敌人后全队回血15%',
            description: '先天百草灵根金丹期被动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天百草灵根'
        },
        '万毒归宗': {
            name: '万毒归宗',
            type: 'area',
            element: 'wood',
            damage: 0,
            mpCost: 48,
            effect: '释放剧毒领域，敌方持续毒伤+20/秒，持续6秒',
            description: '先天百草灵根金丹期主动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天百草灵根'
        },
        '生命古树': {
            name: '生命古树',
            type: 'ultimate',
            element: 'wood',
            damage: 0,
            mpCost: 100,
            effect: '召唤古树，全队回血20%/秒，持续10秒，期间队友免疫致死伤害',
            description: '先天百草灵根金丹期大招',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天百草灵根'
        },
        '先天百草道': {
            name: '先天百草道',
            type: 'passive',
            element: 'wood',
            damage: 0,
            mpCost: 0,
            effect: '治疗/毒伤效果翻倍，自身死亡后化为灵草，3秒后复活（限1次）',
            description: '先天百草灵根元婴期被动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天百草灵根'
        },
        '百草封神': {
            name: '百草封神',
            type: 'active',
            element: 'wood',
            damage: 300,
            mpCost: 75,
            effect: '单体目标要么回血50%，要么受到毒伤300%（由你选择）',
            description: '先天百草灵根元婴期主动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天百草灵根'
        },
        '万物复苏': {
            name: '万物复苏',
            type: 'ultimate',
            element: 'wood',
            damage: 0,
            mpCost: 160,
            effect: '复活所有阵亡队友，恢复其30%气血，全队获得15秒不死buff',
            description: '先天百草灵根元婴期大招',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天百草灵根'
        },
        
        '引雷诀': {
            name: '引雷诀',
            type: 'passive',
            element: 'thunder',
            damage: 0,
            mpCost: 0,
            effect: '攻击有10%概率引动落雷，造成额外50%雷伤',
            description: '先天雷灵根炼气期被动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天雷灵根'
        },
        '雷弧闪': {
            name: '雷弧闪',
            type: 'attack',
            element: 'thunder',
            damage: 130,
            mpCost: 15,
            effect: '瞬移到目标身边，造成130%雷伤，麻痹0.5秒',
            description: '先天雷灵根炼气期主动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天雷灵根'
        },
        '惊雷炸响': {
            name: '惊雷炸响',
            type: 'ultimate',
            element: 'thunder',
            damage: 200,
            mpCost: 38,
            effect: '对目标范围造成200%雷伤，麻痹1秒，清空其10%灵力',
            description: '先天雷灵根炼气期大招',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天雷灵根',
            isAOE: true
        },
        '雷池护体': {
            name: '雷池护体',
            type: 'passive',
            element: 'thunder',
            damage: 0,
            mpCost: 0,
            effect: '被攻击时15%概率触发雷池，对周围造成雷伤+麻痹',
            description: '先天雷灵根筑基期被动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天雷灵根'
        },
        '雷遁术': {
            name: '雷遁术',
            type: 'attack',
            element: 'thunder',
            damage: 0,
            mpCost: 30,
            effect: '连续瞬移3次，每次瞬移后下一击必定暴击',
            description: '先天雷灵根筑基期主动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天雷灵根'
        },
        '九天雷狱': {
            name: '九天雷狱',
            type: 'ultimate',
            element: 'thunder',
            damage: 300,
            mpCost: 68,
            effect: '召唤雷狱，对全场造成300%雷伤，麻痹2秒，敌方技能冷却翻倍',
            description: '先天雷灵根筑基期大招',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天雷灵根',
            isAOE: true
        },
        '先天雷体': {
            name: '先天雷体',
            type: 'passive',
            element: 'thunder',
            damage: 0,
            mpCost: 0,
            effect: '雷伤+40%，麻痹时间+50%，免疫眩晕/冰冻',
            description: '先天雷灵根金丹期被动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天雷灵根'
        },
        '紫霄雷罚': {
            name: '紫霄雷罚',
            type: 'attack',
            element: 'thunder',
            damage: 250,
            mpCost: 46,
            effect: '对单体造成250%雷伤，破甲20%，沉默2秒',
            description: '先天雷灵根金丹期主动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天雷灵根'
        },
        '雷神降世': {
            name: '雷神降世',
            type: 'ultimate',
            element: 'thunder',
            damage: 600,
            mpCost: 115,
            effect: '化身雷神，对全场造成600%雷伤，麻痹3秒，清空敌方50%灵力',
            description: '先天雷灵根金丹期大招',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天雷灵根'
        },
        '混沌雷劫': {
            name: '混沌雷劫',
            type: 'passive',
            element: 'thunder',
            damage: 0,
            mpCost: 0,
            effect: '雷伤+60%，麻痹时必定暴击，击杀后雷伤再+20%',
            description: '先天雷灵根元婴期被动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天雷灵根'
        },
        '雷域天罚': {
            name: '雷域天罚',
            type: 'active',
            element: 'thunder',
            damage: 0,
            mpCost: 72,
            effect: '展开雷域，敌方持续雷伤+30/秒，无法释放技能',
            description: '先天雷灵根元婴期主动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天雷灵根'
        },
        '灭世雷劫': {
            name: '灭世雷劫',
            type: 'ultimate',
            element: 'thunder',
            damage: 1200,
            mpCost: 175,
            effect: '引动灭世雷劫，对全场造成1200%雷伤，麻痹5秒，敌方灵力清零',
            description: '先天雷灵根元婴期大招',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天雷灵根'
        },
        
        '冰肌玉骨': {
            name: '冰肌玉骨',
            type: 'passive',
            element: 'ice',
            damage: 0,
            mpCost: 0,
            effect: '受到伤害时10%概率冰冻攻击者0.5秒',
            description: '先天冰灵根炼气期被动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天冰灵根'
        },
        '冰刃突刺': {
            name: '冰刃突刺',
            type: 'attack',
            element: 'ice',
            damage: 120,
            mpCost: 14,
            effect: '发射冰刃，造成120%冰伤，减速20%，持续2回合',
            description: '先天冰灵根炼气期主动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天冰灵根'
        },
        '冰封术2': {
            name: '冰封术',
            type: 'ultimate',
            element: 'ice',
            damage: 0,
            mpCost: 36,
            effect: '冻结目标1.5秒，期间目标防御-20%',
            description: '先天冰灵根炼气期大招',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天冰灵根'
        },
        '永冻领域': {
            name: '永冻领域',
            type: 'passive',
            element: 'ice',
            damage: 0,
            mpCost: 0,
            effect: '攻击冰冻目标时，暴击率+20%，冰伤+25%',
            description: '先天冰灵根筑基期被动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天冰灵根'
        },
        '冰墙阻隔': {
            name: '冰墙阻隔',
            type: 'defense',
            element: 'ice',
            damage: 0,
            mpCost: 28,
            effect: '生成冰墙，阻挡敌人移动/攻击，持续3秒',
            description: '先天冰灵根筑基期主动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天冰灵根'
        },
        '万里冰封': {
            name: '万里冰封',
            type: 'ultimate',
            element: 'ice',
            damage: 0,
            mpCost: 65,
            effect: '冻结周围所有敌人2秒，期间他们受到的伤害+40%',
            description: '先天冰灵根筑基期大招',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天冰灵根'
        },
        '先天冰魄': {
            name: '先天冰魄',
            type: 'passive',
            element: 'ice',
            damage: 0,
            mpCost: 0,
            effect: '冰伤+40%，冻结时间+50%，免疫灼烧/中毒',
            description: '先天冰灵根金丹期被动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天冰灵根'
        },
        '绝对零度': {
            name: '绝对零度',
            type: 'attack',
            element: 'ice',
            damage: 250,
            mpCost: 44,
            effect: '对单体造成250%冰伤，冻结3秒，防御清零',
            description: '先天冰灵根金丹期主动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天冰灵根'
        },
        '玄冥冰封': {
            name: '玄冥冰封',
            type: 'ultimate',
            element: 'ice',
            damage: 0,
            mpCost: 110,
            effect: '冻结全场敌人3.5秒，期间他们无法行动，受到的所有伤害翻倍',
            description: '先天冰灵根金丹期大招',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天冰灵根'
        },
        '冰皇之体': {
            name: '冰皇之体',
            type: 'passive',
            element: 'ice',
            damage: 0,
            mpCost: 0,
            effect: '冰伤+60%，冻结目标时必定暴击，自身免疫所有控制',
            description: '先天冰灵根元婴期被动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天冰灵根'
        },
        '冰界降临': {
            name: '冰界降临',
            type: 'active',
            element: 'ice',
            damage: 0,
            mpCost: 70,
            effect: '创造冰界，敌方移速-80%，持续8秒',
            description: '先天冰灵根元婴期主动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天冰灵根'
        },
        '冰封纪元': {
            name: '冰封纪元',
            type: 'ultimate',
            element: 'ice',
            damage: 800,
            mpCost: 170,
            effect: '冻结全场5秒，对所有敌人造成800%冰伤，冻结结束后额外眩晕2秒',
            description: '先天冰灵根元婴期大招',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天冰灵根'
        },
        
        '空间瞬移': {
            name: '空间瞬移',
            type: 'passive',
            element: 'space',
            damage: 0,
            mpCost: 0,
            effect: '闪避后自动瞬移到随机位置，躲避下一次伤害',
            description: '先天空间灵根炼气期被动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天空间灵根'
        },
        '空间切割': {
            name: '空间切割',
            type: 'attack',
            element: 'space',
            damage: 130,
            mpCost: 16,
            effect: '撕裂空间，对目标造成130%真实伤害，无视防御',
            description: '先天空间灵根炼气期主动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天空间灵根'
        },
        '空间禁锢': {
            name: '空间禁锢',
            type: 'ultimate',
            element: 'space',
            damage: 0,
            mpCost: 42,
            effect: '禁锢目标1秒，使其无法移动/施法',
            description: '先天空间灵根炼气期大招',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天空间灵根'
        },
        '血影空间': {
            name: '血影空间',
            type: 'passive',
            element: 'space',
            damage: 0,
            mpCost: 0,
            effect: '血量越低，空间技能伤害+越高（最多+30%）',
            description: '先天空间灵根筑基期被动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天空间灵根'
        },
        '空间折叠': {
            name: '空间折叠',
            type: 'control',
            element: 'space',
            damage: 0,
            mpCost: 34,
            effect: '将目标传送到随机位置，打断其技能',
            description: '先天空间灵根筑基期主动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天空间灵根'
        },
        '空间绞杀': {
            name: '空间绞杀',
            type: 'ultimate',
            element: 'space',
            damage: 300,
            mpCost: 72,
            effect: '撕裂目标周围空间，造成300%真实伤害，附带持续流血+10/秒',
            description: '先天空间灵根筑基期大招',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天空间灵根'
        },
        '空间道体': {
            name: '空间道体',
            type: 'passive',
            element: 'space',
            damage: 0,
            mpCost: 0,
            effect: '真实伤害+40%，免疫所有位移/控制效果',
            description: '先天空间灵根金丹期被动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天空间灵根'
        },
        '虚空吞噬': {
            name: '虚空吞噬',
            type: 'active',
            element: 'space',
            damage: 0,
            mpCost: 52,
            effect: '吞噬目标15%气血，转化为自身护盾',
            description: '先天空间灵根金丹期主动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天空间灵根'
        },
        '空间裂缝': {
            name: '空间裂缝',
            type: 'ultimate',
            element: 'space',
            damage: 500,
            mpCost: 120,
            effect: '生成裂缝，对全场造成500%真实伤害，敌方被拉扯到中心',
            description: '先天空间灵根金丹期大招',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天空间灵根'
        },
        '血域空间': {
            name: '血域空间',
            type: 'passive',
            element: 'space',
            damage: 0,
            mpCost: 0,
            effect: '吸血+20%，空间技能冷却-50%',
            description: '先天空间灵根元婴期被动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天空间灵根'
        },
        '虚空漫步': {
            name: '虚空漫步',
            type: 'active',
            element: 'space',
            damage: 0,
            mpCost: 78,
            effect: '无限瞬移，持续5秒，期间无法被选中',
            description: '先天空间灵根元婴期主动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天空间灵根'
        },
        '次元斩': {
            name: '次元斩',
            type: 'ultimate',
            element: 'space',
            damage: 1500,
            mpCost: 190,
            effect: '撕裂次元，对单体造成1500%真实伤害，无视所有防御/免伤，击杀后自身满血',
            description: '先天空间灵根元婴期大招',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天空间灵根'
        },
        
        '金石之躯': {
            name: '金石之躯',
            type: 'passive',
            element: 'earth',
            damage: 0,
            mpCost: 0,
            effect: '防御+15%，气血+10%，被攻击时反弹5%伤害',
            description: '先天金石灵根炼气期被动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天金石灵根'
        },
        '石破天惊': {
            name: '石破天惊',
            type: 'attack',
            element: 'earth',
            damage: 140,
            mpCost: 17,
            effect: '砸击地面，造成140%土伤，眩晕0.8秒',
            description: '先天金石灵根炼气期主动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天金石灵根'
        },
        '金石壁垒': {
            name: '金石壁垒',
            type: 'ultimate',
            element: 'earth',
            damage: 0,
            mpCost: 40,
            effect: '生成壁垒，吸收25%最大气血伤害，持续5秒',
            description: '先天金石灵根炼气期大招',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天金石灵根'
        },
        '万金石甲': {
            name: '万金石甲',
            type: 'passive',
            element: 'earth',
            damage: 0,
            mpCost: 0,
            effect: '受到伤害时15%概率生成石甲，减免30%伤害',
            description: '先天金石灵根筑基期被动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天金石灵根'
        },
        '金石裂空': {
            name: '金石裂空',
            type: 'attack',
            element: 'earth',
            damage: 180,
            mpCost: 32,
            effect: '向前突刺，造成180%土伤，破甲15%',
            description: '先天金石灵根筑基期主动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天金石灵根'
        },
        '五岳镇山2': {
            name: '五岳镇山',
            type: 'ultimate',
            element: 'earth',
            damage: 350,
            mpCost: 70,
            effect: '召唤五岳，对周围造成350%土伤，眩晕2秒，减速60%',
            description: '先天金石灵根筑基期大招',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天金石灵根'
        },
        '先天金石道': {
            name: '先天金石道',
            type: 'passive',
            element: 'earth',
            damage: 0,
            mpCost: 0,
            effect: '防御+35%，气血+30%，反弹伤害+15%',
            description: '先天金石灵根金丹期被动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天金石灵根'
        },
        '须弥山印2': {
            name: '须弥山印',
            type: 'attack',
            element: 'earth',
            damage: 280,
            mpCost: 50,
            effect: '砸下巨印，对大范围造成280%土伤，破甲25%',
            description: '先天金石灵根金丹期主动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天金石灵根',
            isAOE: true
        },
        '镇岳洪荒2': {
            name: '镇岳洪荒',
            type: 'ultimate',
            element: 'earth',
            damage: 700,
            mpCost: 125,
            effect: '化身山岳，对全场造成700%土伤，眩晕3秒，期间自身无敌',
            description: '先天金石灵根金丹期大招',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天金石灵根',
            isAOE: true
        },
        '盘古石躯': {
            name: '盘古石躯',
            type: 'passive',
            element: 'earth',
            damage: 0,
            mpCost: 0,
            effect: '防御+60%，气血+50%，免疫所有控制/破甲',
            description: '先天金石灵根元婴期被动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天金石灵根'
        },
        '金石崩灭': {
            name: '金石崩灭',
            type: 'attack',
            element: 'earth',
            damage: 400,
            mpCost: 75,
            effect: '引爆自身周围岩石，造成400%土伤，眩晕2.5秒',
            description: '先天金石灵根元婴期主动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天金石灵根'
        },
        '开天辟地2': {
            name: '开天辟地',
            type: 'ultimate',
            element: 'earth',
            damage: 1300,
            mpCost: 195,
            effect: '引动盘古之力，对全场造成1300%土伤，眩晕5秒，破甲80%，自身防御翻倍10秒',
            description: '先天金石灵根元婴期大招',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天金石灵根'
        },
        
        '剑心通明': {
            name: '剑心通明',
            type: 'passive',
            element: 'sword',
            damage: 0,
            mpCost: 0,
            effect: '攻击+10%，暴击率+5%，剑招必定命中',
            description: '先天剑骨炼气期被动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天剑骨'
        },
        '剑气斩': {
            name: '剑气斩',
            type: 'attack',
            element: 'sword',
            damage: 150,
            mpCost: 18,
            effect: '挥出剑气，造成150%剑伤，可穿透2个目标',
            description: '先天剑骨炼气期主动技能',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天剑骨'
        },
        '剑啸九天': {
            name: '剑啸九天',
            type: 'ultimate',
            element: 'sword',
            damage: 250,
            mpCost: 45,
            effect: '对单体造成250%剑伤，必定暴击，破甲10%',
            description: '先天剑骨炼气期大招',
            requiredRealm: '炼气期',
            exclusiveRoot: '先天剑骨'
        },
        '万剑归宗': {
            name: '万剑归宗',
            type: 'passive',
            element: 'sword',
            damage: 0,
            mpCost: 0,
            effect: '连续攻击3次后，下一击伤害+50%',
            description: '先天剑骨筑基期被动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天剑骨'
        },
        '剑影分身': {
            name: '剑影分身',
            type: 'attack',
            element: 'sword',
            damage: 0,
            mpCost: 36,
            effect: '召唤2个剑影，同步攻击目标，持续3秒',
            description: '先天剑骨筑基期主动技能',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天剑骨'
        },
        '一剑破万法': {
            name: '一剑破万法',
            type: 'ultimate',
            element: 'sword',
            damage: 400,
            mpCost: 78,
            effect: '无视所有防御/免伤，对单体造成400%剑伤',
            description: '先天剑骨筑基期大招',
            requiredRealm: '筑基期',
            exclusiveRoot: '先天剑骨'
        },
        '先天剑骨': {
            name: '先天剑骨',
            type: 'passive',
            element: 'sword',
            damage: 0,
            mpCost: 0,
            effect: '剑伤+40%，暴击伤害+30%，免疫所有控制',
            description: '先天剑骨金丹期被动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天剑骨'
        },
        '剑域领域': {
            name: '剑域领域',
            type: 'active',
            element: 'sword',
            damage: 0,
            mpCost: 58,
            effect: '展开剑域，友方剑伤+25%，敌方防御-20%，持续8秒',
            description: '先天剑骨金丹期主动技能',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天剑骨'
        },
        '诛仙一剑': {
            name: '诛仙一剑',
            type: 'ultimate',
            element: 'sword',
            damage: 800,
            mpCost: 130,
            effect: '对单体造成800%剑伤，必定暴击，斩杀血量低于20%的目标',
            description: '先天剑骨金丹期大招',
            requiredRealm: '金丹期',
            exclusiveRoot: '先天剑骨'
        },
        '剑神之体': {
            name: '剑神之体',
            type: 'passive',
            element: 'sword',
            damage: 0,
            mpCost: 0,
            effect: '剑伤+60%，暴击率+20%，击杀后剑伤再+30%',
            description: '先天剑骨元婴期被动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天剑骨'
        },
        '万剑朝宗': {
            name: '万剑朝宗',
            type: 'attack',
            element: 'sword',
            damage: 500,
            mpCost: 85,
            effect: '召唤万剑，对全场造成500%剑伤，穿透所有目标',
            description: '先天剑骨元婴期主动技能',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天剑骨'
        },
        '剑开天门': {
            name: '剑开天门',
            type: 'ultimate',
            element: 'sword',
            damage: 1500,
            mpCost: 200,
            effect: '斩开天门，对全场造成1500%剑伤，必定暴击，斩杀血量低于30%的目标',
            description: '先天剑骨元婴期大招',
            requiredRealm: '元婴期',
            exclusiveRoot: '先天剑骨'
        }
    },

    RANDOM_EVENTS: [
        {
            id: 'treasure-found',
            name: '发现宝藏',
            description: '你在某处发现了一个隐藏的宝箱！',
            chance: 0.05,
            reward: { type: 'item', items: ['银两', '银两', '银两'] }
        },
        {
            id: 'old-man-teach',
            name: '老者传功',
            description: '一位神秘的老者看中了你的资质，决定传你一招半式！',
            chance: 0.02,
            reward: { type: 'exp', amount: 200 }
        },
        {
            id: 'spirit-beast',
            name: '灵兽认主',
            description: '一只可爱的小灵兽愿意跟随你！',
            chance: 0.01,
            reward: { type: 'pet', pet: '小灵狐' }
        },
        {
            id: 'robbery',
            name: '遭遇抢劫',
            description: '一群山贼拦住了你的去路！',
            chance: 0.08,
            type: 'combat',
            enemy: 'mountain-bandit'
        },
        {
            id: 'heavenly-tribulation',
            name: '天降奇遇',
            description: '天空中降下一道光柱，你感受到了天地的恩赐！',
            chance: 0.03,
            reward: { type: 'luck', amount: 5 }
        }
    ],

    KARMA_SYSTEM: {
        min: -1000,
        max: 1000,
        neutral: 0,
        tiers: {
            'saint': { min: 800, name: '圣贤', effects: { npcFavor: 50, expBonus: 1.5, demonDifficulty: 2.0 } },
            'virtuous': { min: 500, name: '君子', effects: { npcFavor: 30, expBonus: 1.2, demonDifficulty: 1.5 } },
            'good': { min: 200, name: '善人', effects: { npcFavor: 15, expBonus: 1.1, demonDifficulty: 1.2 } },
            'neutral': { min: -199, name: '凡人', effects: { npcFavor: 0, expBonus: 1.0, demonDifficulty: 1.0 } },
            'evil': { min: -499, name: '恶人', effects: { npcFavor: -20, expBonus: 0.9, demonDifficulty: 1.5 } },
            'villain': { min: -799, name: '魔头', effects: { npcFavor: -40, expBonus: 0.8, demonDifficulty: 2.0 } },
            'demon': { min: -1000, name: '恶魔', effects: { npcFavor: -60, expBonus: 0.7, demonDifficulty: 3.0 } }
        },
        actions: {
            'kill-innocent': -100,
            'kill-evil': 50,
            'help-npc': 20,
            'steal': -50,
            'donate': 30,
            'betray': -150,
            'save-life': 100
        }
    },

    NPC_PERSONALITIES: {
        'honest': {
            name: '正直',
            traits: ['痛恨恶行', '主动攻击恶人', '容易信任'],
            reactions: {
                'evil': 'hostile',
                'good': 'friendly',
                'neutral': 'neutral'
            }
        },
        'greedy': {
            name: '贪婪',
            traits: ['可被贿赂', '喜欢宝物', '见利忘义'],
            reactions: {
                'evil': 'neutral',
                'good': 'neutral',
                'neutral': 'neutral'
            }
        },
        'kind': {
            name: '善良',
            traits: ['乐于助人', '免费治疗', '厌恶暴力'],
            reactions: {
                'evil': 'neutral',
                'good': 'very-friendly',
                'neutral': 'friendly'
            }
        },
        'cunning': {
            name: '狡诈',
            traits: ['可能欺骗', '可能背叛', '利益至上'],
            reactions: {
                'evil': 'friendly',
                'good': 'neutral',
                'neutral': 'neutral'
            }
        },
        'proud': {
            name: '高傲',
            traits: ['看不起弱者', '尊重强者', '不轻易低头'],
            reactions: {
                'evil': 'neutral',
                'good': 'neutral',
                'neutral': 'neutral'
            }
        },
        'loner': {
            name: '孤僻',
            traits: ['需要高好感才传授', '喜欢独处', '不喜欢热闹'],
            reactions: {
                'evil': 'hostile',
                'good': 'neutral',
                'neutral': 'unfriendly'
            }
        }
    },
    
    'jinyang-guard-monster': {
        id: 'jinyang-guard-monster',
        name: '金阳门守门人',
        hp: 1500,
        maxHp: 1500,
        attack: 400,
        defense: 250,
        skills: ['横斩', '重拳'],
        realm: '金丹期',
        drop: ['银两', '金阳剑'],
        description: '金阳门守门人，金丹期修为'
    },
    'qingmu-guard-monster': {
        id: 'qingmu-guard-monster',
        name: '青木宗守门人',
        hp: 1500,
        maxHp: 1500,
        attack: 400,
        defense: 250,
        skills: ['藤蔓缠绕', '根须穿刺'],
        realm: '金丹期',
        drop: ['银两', '青木杖'],
        description: '青木宗守门人，金丹期修为'
    },
    'shuiyue-guard-monster': {
        id: 'shuiyue-guard-monster',
        name: '水月宫守门人',
        hp: 1500,
        maxHp: 1500,
        attack: 400,
        defense: 250,
        skills: ['水球', '闪电攻击'],
        realm: '金丹期',
        drop: ['银两', '水月剑'],
        description: '水月宫守门人，金丹期修为'
    },
    'yanhuo-guard-monster': {
        id: 'yanhuo-guard-monster',
        name: '炎火殿守门人',
        hp: 1500,
        maxHp: 1500,
        attack: 400,
        defense: 250,
        skills: ['火球术', '烈焰冲击'],
        realm: '金丹期',
        drop: ['银两', '炎火刀'],
        description: '炎火殿守门人，金丹期修为'
    },
    'huangtu-guard-monster': {
        id: 'huangtu-guard-monster',
        name: '皇土阁守门人',
        hp: 1500,
        maxHp: 1500,
        attack: 400,
        defense: 250,
        skills: ['大地震颤', '岩石护盾'],
        realm: '金丹期',
        drop: ['银两', '皇土盾'],
        description: '皇土阁守门人，金丹期修为'
    },

    WANTED_SYSTEM: {
        levels: {
            1: { name: '通缉犯', bounty: 100, description: '小范围通缉' },
            2: { name: '要犯', bounty: 500, description: '门派通缉' },
            3: { name: '重犯', bounty: 2000, description: '区域通缉' },
            4: { name: '钦犯', bounty: 10000, description: '全修真界通缉' },
            5: { name: '魔头', bounty: 50000, description: '人人得而诛之' }
        },
        decayRate: 1
    },
    
    COMBAT_SYSTEM: {
        rules: {
            maxHealingItems: 3,
            maxSecretBattles: 5,
            baseDamage: 1,
            hpRegenRate: 0.1,
            autoBattle: false
        },
        battleTypes: {
            'wild': {
                name: '野外战斗',
                canEscape: true,
                rewards: ['采集道具', '妖兽材料']
            },
            'secret': {
                name: '秘境战斗',
                canEscape: false,
                rewards: ['高阶道具', '功法碎片'],
                resetOnFail: true
            },
            'encounter': {
                name: '奇遇战斗',
                canEscape: false,
                rewards: ['奇遇专属奖励'],
                noPenalty: true,
                maxRounds: 5
            },
            'sect-guard': {
                name: '门派守护战斗',
                canEscape: true,
                rewards: ['门派贡献', '门派物品']
            }
        }
    },
    
    QUESTS: {
        // 新手主线任务
        'main-1': {
            id: 'main-1',
            name: '初入修仙',
            sect: 'none',
            type: 'talk',
            description: '与新手村的王村长交谈，了解修仙世界',
            target: 'village-elder',
            count: 1,
            rewards: {
                gold: 50,
                exp: 100,
                items: ['止血草']
            }
        },
        'main-2': {
            id: 'main-2',
            name: '历练之路',
            sect: 'none',
            type: 'kill',
            description: '在村外草地击杀3只野猪，获得战斗经验',
            target: 'wild-boar',
            count: 3,
            rewards: {
                gold: 80,
                exp: 200,
                items: ['野猪肉']
            }
        },
        'main-3': {
            id: 'main-3',
            name: '前往青河镇',
            sect: 'none',
            type: 'travel',
            description: '从新手村前往青河镇，开启修仙之旅',
            target: 'qinghe-town',
            count: 1,
            rewards: {
                gold: 100,
                exp: 300
            }
        },
        'main-4': {
            id: 'main-4',
            name: '了解门派',
            sect: 'none',
            type: 'talk',
            description: '与青河镇中心广场的各大门派招募使交谈，了解门派选择',
            target: 'sect-recruiter-jinyang',
            count: 1,
            rewards: {
                gold: 120,
                exp: 400
            }
        },
        'main-5': {
            id: 'main-6',
            name: '散修之路',
            sect: 'none',
            type: 'talk',
            description: '与青河镇的散修大师交谈，了解散修的修炼方式',
            target: 'sanxiu-master',
            count: 1,
            rewards: {
                gold: 150,
                exp: 500,
                items: ['聚气丹']
            }
        },
        'main-6': {
            id: 'main-6',
            name: '探索周边',
            sect: 'none',
            type: 'travel',
            description: '前往清河密林，探索修仙世界的广阔',
            target: 'qinghe-forest',
            count: 1,
            rewards: {
                gold: 200,
                exp: 600
            }
        },
        'main-7': {
            id: 'main-7',
            name: '挑战更强',
            sect: 'none',
            type: 'kill',
            description: '在清河密林击杀2只木狼，提升战斗能力',
            target: 'wood-wolf',
            count: 2,
            rewards: {
                gold: 250,
                exp: 800,
                items: ['狼皮']
            }
        },
        'main-8': {
            id: 'main-8',
            name: '境界突破',
            sect: 'none',
            type: 'breakthrough',
            description: '修炼到炼气期前期10层，并突破到炼气期中期',
            target: 'breakthrough',
            count: 1,
            rewards: {
                gold: 300,
                exp: 1000,
                items: ['筑基丹']
            }
        },
        'main-9': {
            id: 'main-9',
            name: '探索南疆',
            sect: 'none',
            type: 'travel',
            description: '前往南疆毒瘴谷，探索新的区域',
            target: 'poison-valley',
            count: 1,
            rewards: {
                gold: 400,
                exp: 1200
            }
        },
        'main-10': {
            id: 'main-10',
            name: '探索东海',
            sect: 'none',
            type: 'travel',
            description: '前往东海龙宫，探索海底世界',
            target: 'dragon-palace',
            count: 1,
            rewards: {
                gold: 500,
                exp: 1500
            }
        },
        'main-11': {
            id: 'main-11',
            name: '探索北境',
            sect: 'none',
            type: 'travel',
            description: '前往北境冰宫，探索冰雪世界',
            target: 'ice-palace',
            count: 1,
            rewards: {
                gold: 600,
                exp: 1800
            }
        },
        'main-12': {
            id: 'main-12',
            name: '探索西漠',
            sect: 'none',
            type: 'travel',
            description: '前往西漠古城，探索沙漠世界',
            target: 'ancient-city',
            count: 1,
            rewards: {
                gold: 700,
                exp: 2000
            }
        },
        // 金阳门任务
        'jinyang-1': {
            id: 'jinyang-1',
            name: '击杀野猪',
            sect: 'jinyang',
            type: 'kill',
            description: '在青岚村的山林中有野猪作祟，去击杀5只野猪',
            target: 'wild-boar',
            count: 5,
            rewards: {
                contribution: 50,
                gold: 100,
                exp: 200
            }
        },
        'jinyang-2': {
            id: 'jinyang-2',
            name: '采集木材',
            sect: 'jinyang',
            type: 'collect',
            description: '在青岚村的山林中采集10份木材',
            target: '木材',
            count: 10,
            rewards: {
                contribution: 30,
                gold: 80,
                exp: 150
            }
        },
        'jinyang-3': {
            id: 'jinyang-3',
            name: '清理山门',
            sect: 'jinyang',
            type: 'kill',
            description: '清理金阳派山门前的5只野狗',
            target: 'wild-dog',
            count: 5,
            rewards: {
                contribution: 40,
                gold: 90,
                exp: 180
            }
        },
        'jinyang-4': {
            id: 'jinyang-4',
            name: '寻找丢失的剑',
            sect: 'jinyang',
            type: 'collect',
            description: '在金阳派附近的山林中寻找丢失的3把练习剑',
            target: '练习剑',
            count: 3,
            rewards: {
                contribution: 60,
                gold: 120,
                exp: 220
            }
        },
        'jinyang-5': {
            id: 'jinyang-5',
            name: '运送金阳信物',
            sect: 'jinyang',
            type: 'deliver',
            description: '将金阳信物送到青河镇的客栈老板手中',
            item: '金阳信物',
            targetNpc: 'innkeeper',
            count: 1,
            rewards: {
                contribution: 80,
                gold: 150,
                exp: 280
            }
        },
        // 青木宗任务
        'qingmu-1': {
            id: 'qingmu-1',
            name: '救助树精',
            sect: 'qingmu',
            type: 'kill',
            description: '在青木宗的森林中击杀3只树精',
            target: 'tree-spirit',
            count: 3,
            rewards: {
                contribution: 60,
                gold: 120,
                exp: 250
            }
        },
        'qingmu-2': {
            id: 'qingmu-2',
            name: '采集草药',
            sect: 'qingmu',
            type: 'collect',
            description: '在青木宗的森林中采集15株灵草',
            target: '灵草',
            count: 15,
            rewards: {
                contribution: 45,
                gold: 95,
                exp: 190
            }
        },
        'qingmu-3': {
            id: 'qingmu-3',
            name: '驱赶野兽',
            sect: 'qingmu',
            type: 'kill',
            description: '在青木宗的森林中驱赶4只灰狼',
            target: 'gray-wolf',
            count: 4,
            rewards: {
                contribution: 55,
                gold: 110,
                exp: 210
            }
        },
        'qingmu-4': {
            id: 'qingmu-4',
            name: '培育灵田',
            sect: 'qingmu',
            type: 'collect',
            description: '在青木宗的灵田中浇水10次',
            target: 'water',
            count: 10,
            rewards: {
                contribution: 35,
                gold: 85,
                exp: 170
            }
        },
        'qingmu-5': {
            id: 'qingmu-5',
            name: '运送青木丹药',
            sect: 'qingmu',
            type: 'deliver',
            description: '将青木丹药送到青河镇的药师手中',
            item: '青木丹药',
            targetNpc: 'qinghe-pharmacist',
            count: 1,
            rewards: {
                contribution: 75,
                gold: 140,
                exp: 270
            }
        },
        // 水月宫任务
        'shuiyue-1': {
            id: 'shuiyue-1',
            name: '除妖任务',
            sect: 'shuiyue',
            type: 'kill',
            description: '在水月宫附近的山林中击杀2只麻雀妖',
            target: 'sparrow-demon',
            count: 2,
            rewards: {
                contribution: 40,
                gold: 90,
                exp: 180
            }
        },
        'shuiyue-2': {
            id: 'shuiyue-2',
            name: '采集珍珠',
            sect: 'shuiyue',
            type: 'collect',
            description: '在水月宫的湖泊中采集8颗珍珠',
            target: '珍珠',
            count: 8,
            rewards: {
                contribution: 50,
                gold: 100,
                exp: 200
            }
        },
        'shuiyue-3': {
            id: 'shuiyue-3',
            name: '清理水妖',
            sect: 'shuiyue',
            type: 'kill',
            description: '清理湖中的3只水蛇',
            target: 'water-snake',
            count: 3,
            rewards: {
                contribution: 60,
                gold: 120,
                exp: 240
            }
        },
        'shuiyue-4': {
            id: 'shuiyue-4',
            name: '运送水月宝珠',
            sect: 'shuiyue',
            type: 'deliver',
            description: '将水月宝珠送到青河镇的商人手中',
            item: '水月宝珠',
            targetNpc: 'qinghe-merchant',
            count: 1,
            rewards: {
                contribution: 70,
                gold: 130,
                exp: 260
            }
        },
        'shuiyue-5': {
            id: 'shuiyue-5',
            name: '寻找丢失的玉佩',
            sect: 'shuiyue',
            type: 'collect',
            description: '寻找丢失的2块玉佩',
            target: 'jade-pendant',
            count: 2,
            rewards: {
                contribution: 80,
                gold: 150,
                exp: 290
            }
        },
        // 炎火殿任务
        'yanhuo-1': {
            id: 'yanhuo-1',
            name: '猎杀木狼',
            sect: 'yanhuo',
            type: 'kill',
            description: '击杀4只木狼',
            target: 'wood-wolf',
            count: 4,
            rewards: {
                contribution: 70,
                gold: 130,
                exp: 280
            }
        },
        'yanhuo-2': {
            id: 'yanhuo-2',
            name: '采集火种',
            sect: 'yanhuo',
            type: 'collect',
            description: '采集5团灵火',
            target: 'spirit-fire',
            count: 5,
            rewards: {
                contribution: 55,
                gold: 115,
                exp: 220
            }
        },
        'yanhuo-3': {
            id: 'yanhuo-3',
            name: '清理火妖',
            sect: 'yanhuo',
            type: 'kill',
            description: '清理3只火精灵',
            target: 'fire-serpent',
            count: 3,
            rewards: {
                contribution: 65,
                gold: 125,
                exp: 250
            }
        },
        'yanhuo-4': {
            id: 'yanhuo-4',
            name: '看守火脉',
            sect: 'yanhuo',
            type: 'escort',
            description: '看守火脉1小时',
            target: 'fire-vein',
            count: 1,
            rewards: {
                contribution: 85,
                gold: 160,
                exp: 300
            }
        },
        'yanhuo-5': {
            id: 'yanhuo-5',
            name: '寻找火晶石',
            sect: 'yanhuo',
            type: 'collect',
            description: '寻找3块火晶石',
            target: 'fire-crystal',
            count: 3,
            rewards: {
                contribution: 90,
                gold: 170,
                exp: 320
            }
        },
        // 皇土阁任务
        'huangtu-1': {
            id: 'huangtu-1',
            name: '山贼清剿',
            sect: 'huangtu',
            type: 'kill',
            description: '清剿3名山贼',
            target: 'mountain-bandit',
            count: 3,
            rewards: {
                contribution: 55,
                gold: 110,
                exp: 220
            }
        },
        'huangtu-2': {
            id: 'huangtu-2',
            name: '采集矿石',
            sect: 'huangtu',
            type: 'collect',
            description: '采集12块铁矿石',
            target: 'iron-ore',
            count: 12,
            rewards: {
                contribution: 40,
                gold: 90,
                exp: 180
            }
        },
        'huangtu-3': {
            id: 'huangtu-3',
            name: '驱赶土妖',
            sect: 'huangtu',
            type: 'kill',
            description: '驱赶5只土傀儡',
            target: 'rock-golem',
            count: 5,
            rewards: {
                contribution: 60,
                gold: 120,
                exp: 240
            }
        },
        'huangtu-4': {
            id: 'huangtu-4',
            name: '守卫山门',
            sect: 'huangtu',
            type: 'guard',
            description: '前往皇土阁山门进行守护，持续1分钟，期间可能会遭遇敌人袭击',
            target: 'mountain-gate',
            count: 1,
            rewards: {
                contribution: 75,
                gold: 140,
                exp: 270
            }
        },
        'huangtu-5': {
            id: 'huangtu-5',
            name: '寻找护山符',
            sect: 'huangtu',
            type: 'collect',
            description: '寻找4张护山符',
            target: 'mountain-talisman',
            count: 4,
            rewards: {
                contribution: 85,
                gold: 160,
                exp: 300
            }
        }
    },
    
    // 新增装备数据
    EQUIPMENT: {
        // 装备基础数据
        equipBaseData: {
            attrDesc: {
                hp: "气血",
                mp: "灵力",
                atk: "攻击",
                def: "防御",
                str: "力量",
                con: "体质",
                int: "智力",
                dex: "敏捷",
                dodge: "闪避",
                crit: "暴击",
                luck: "气运"
            },
            qualityRate: {
                "白": 1,
                "绿": 1.3,
                "蓝": 1.8,
                "紫": 2.5,
                "橙": 4
            }
        },
        // 地图装备掉落
        mapEquipDrops: [
            {
                mapName: "中原修真区域",
                realm: "炼气期",
                levelRange: "1-30层",
                monsterDropGroups: [
                    {
                        monsters: ["野狗", "流寇"],
                        equipList: [
                            {
                                name: "铁剑",
                                type: "武器",
                                quality: "白",
                                attrs: { "atk": [5,12], "str": [1,2], "crit": [0.5,0.8] }
                            },
                            {
                                name: "粗布衫",
                                type: "胸甲",
                                quality: "白",
                                attrs: { "hp": [30,60], "def": [3,6], "con": [1,2] }
                            },
                            {
                                name: "平安符",
                                type: "法器",
                                quality: "白",
                                attrs: { "dex": [1,2], "luck": [1,2] }
                            },
                            {
                                name: "粗布帽",
                                type: "头盔",
                                quality: "白",
                                attrs: { "def": [2,4], "con": [1,2] }
                            },
                            {
                                name: "铁戒指",
                                type: "戒指",
                                quality: "白",
                                attrs: { "str": [1,2], "int": [1,2] }
                            },
                            {
                                name: "粗布护肩",
                                type: "护肩",
                                quality: "白",
                                attrs: { "def": [2,4], "con": [1,2] }
                            },
                            {
                                name: "粗布裤",
                                type: "护腿",
                                quality: "白",
                                attrs: { "def": [2,4], "dex": [1,2] }
                            },
                            {
                                name: "粗布鞋",
                                type: "战靴",
                                quality: "白",
                                attrs: { "dex": [1,2], "dodge": [0.2,0.5] }
                            }
                        ]
                    },
                    {
                        monsters: ["灰狼", "山匪"],
                        equipList: [
                            {
                                name: "青锋短剑",
                                type: "武器",
                                quality: "绿",
                                attrs: { "atk": [10,18], "str": [2,3], "crit": [0.6,1.0] }
                            },
                            {
                                name: "兽皮甲",
                                type: "胸甲",
                                quality: "绿",
                                attrs: { "hp": [50,100], "def": [5,9], "con": [2,3] }
                            },
                            {
                                name: "引气玉",
                                type: "法器",
                                quality: "绿",
                                attrs: { "dex": [2,3], "luck": [2,3] }
                            },
                            {
                                name: "兽皮帽",
                                type: "头盔",
                                quality: "绿",
                                attrs: { "def": [4,6], "con": [2,3] }
                            },
                            {
                                name: "铜戒指",
                                type: "戒指",
                                quality: "绿",
                                attrs: { "str": [2,3], "int": [2,3] }
                            },
                            {
                                name: "兽皮护肩",
                                type: "护肩",
                                quality: "绿",
                                attrs: { "def": [4,6], "con": [2,3] }
                            },
                            {
                                name: "兽皮裤",
                                type: "护腿",
                                quality: "绿",
                                attrs: { "def": [4,6], "dex": [2,3] }
                            },
                            {
                                name: "兽皮靴",
                                type: "战靴",
                                quality: "绿",
                                attrs: { "dex": [2,3], "dodge": [0.5,0.8] }
                            }
                        ]
                    },
                    {
                        monsters: ["青狼", "树精", "水蛇"],
                        equipList: [
                            {
                                name: "木灵杖",
                                type: "武器",
                                quality: "蓝",
                                attrs: { "magicDamage": [15,25], "int": [2,4], "mp": [20,40] }
                            },
                            {
                                name: "灵木袍",
                                type: "胸甲",
                                quality: "蓝",
                                attrs: { "hp": [80,150], "def": [8,15], "con": [3,4] }
                            },
                            {
                                name: "木灵佩",
                                type: "法宝",
                                quality: "蓝",
                                attrs: { "mp": [40,80], "int": [2,4], "dodge": [0.5,1.0] }
                            },
                            {
                                name: "灵木帽",
                                type: "头盔",
                                quality: "蓝",
                                attrs: { "def": [6,9], "con": [3,4] }
                            },
                            {
                                name: "木灵戒",
                                type: "戒指",
                                quality: "蓝",
                                attrs: { "int": [3,4], "mp": [10,20] }
                            },
                            {
                                name: "灵木护肩",
                                type: "护肩",
                                quality: "蓝",
                                attrs: { "def": [6,9], "con": [3,4] }
                            },
                            {
                                name: "灵木裤",
                                type: "护腿",
                                quality: "蓝",
                                attrs: { "def": [6,9], "dex": [3,4] }
                            },
                            {
                                name: "灵木靴",
                                type: "战靴",
                                quality: "蓝",
                                attrs: { "dex": [3,4], "dodge": [0.8,1.2] }
                            }
                        ]
                    },
                    {
                        monsters: ["土狼", "石傀儡"],
                        equipList: [
                            {
                                name: "石纹剑",
                                type: "武器",
                                quality: "蓝",
                                attrs: { "atk": [20,30], "str": [3,5], "crit": [1.0,1.5] }
                            },
                            {
                                name: "石纹铠",
                                type: "胸甲",
                                quality: "蓝",
                                attrs: { "hp": [100,180], "def": [10,18], "con": [3,5] }
                            },
                            {
                                name: "小护心镜",
                                type: "法宝",
                                quality: "蓝",
                                attrs: { "def": [3,7], "hp": [30,60], "dodge": [0.5,1.0] }
                            },
                            {
                                name: "石纹头盔",
                                type: "头盔",
                                quality: "蓝",
                                attrs: { "def": [8,12], "con": [3,5] }
                            },
                            {
                                name: "石纹戒",
                                type: "戒指",
                                quality: "蓝",
                                attrs: { "str": [3,5], "def": [2,4] }
                            },
                            {
                                name: "石纹护肩",
                                type: "护肩",
                                quality: "蓝",
                                attrs: { "def": [8,12], "con": [3,5] }
                            },
                            {
                                name: "石纹护腿",
                                type: "护腿",
                                quality: "蓝",
                                attrs: { "def": [8,12], "dex": [3,5] }
                            },
                            {
                                name: "石纹靴",
                                type: "战靴",
                                quality: "蓝",
                                attrs: { "dex": [3,5], "dodge": [1.0,1.5] }
                            }
                        ]
                    }
                ]
            },
            {
                mapName: "南疆蛮荒区域",
                realm: "筑基期",
                levelRange: "31-60层",
                monsterDropGroups: [
                    {
                        monsters: ["毒蝎", "瘴气妖"],
                        equipList: [
                            {
                                name: "精铁剑",
                                type: "武器",
                                quality: "绿",
                                attrs: { "atk": [40,60], "str": [6,8], "crit": [1.0,1.5] }
                            },
                            {
                                name: "蛮皮甲",
                                type: "胸甲",
                                quality: "绿",
                                attrs: { "hp": [200,300], "def": [18,25], "con": [5,6] }
                            },
                            {
                                name: "毒蛊珠",
                                type: "法宝",
                                quality: "绿",
                                attrs: { "mp": [100,160], "int": [5,6], "dodge": [1.0,1.5] }
                            },
                            {
                                name: "蛮皮头盔",
                                type: "头盔",
                                quality: "绿",
                                attrs: { "def": [12,16], "con": [5,6] }
                            },
                            {
                                name: "毒蛊戒",
                                type: "戒指",
                                quality: "绿",
                                attrs: { "int": [5,6], "mp": [30,50] }
                            },
                            {
                                name: "蛮皮护肩",
                                type: "护肩",
                                quality: "绿",
                                attrs: { "def": [12,16], "con": [5,6] }
                            },
                            {
                                name: "蛮皮护腿",
                                type: "护腿",
                                quality: "绿",
                                attrs: { "def": [12,16], "dex": [5,6] }
                            },
                            {
                                name: "蛮皮靴",
                                type: "战靴",
                                quality: "绿",
                                attrs: { "dex": [5,6], "dodge": [1.0,1.5] }
                            }
                        ]
                    },
                    {
                        monsters: ["巫蛊师", "尸傀"],
                        equipList: [
                            {
                                name: "巫骨杖",
                                type: "武器",
                                quality: "蓝",
                                attrs: { "magicDamage": [60,90], "int": [7,9], "mp": [160,220] }
                            },
                            {
                                name: "巫纹袍",
                                type: "胸甲",
                                quality: "蓝",
                                attrs: { "hp": [300,450], "def": [25,35], "con": [6,8] }
                            },
                            {
                                name: "遁影玉",
                                type: "法器",
                                quality: "蓝",
                                attrs: { "dex": [6,8], "luck": [4,6], "dodge": [1.5,2.0] }
                            },
                            {
                                name: "巫纹头盔",
                                type: "头盔",
                                quality: "蓝",
                                attrs: { "def": [16,22], "con": [6,8] }
                            },
                            {
                                name: "巫骨戒",
                                type: "戒指",
                                quality: "蓝",
                                attrs: { "int": [7,9], "mp": [50,70] }
                            },
                            {
                                name: "巫纹护肩",
                                type: "护肩",
                                quality: "蓝",
                                attrs: { "def": [16,22], "con": [6,8] }
                            },
                            {
                                name: "巫纹护腿",
                                type: "护腿",
                                quality: "蓝",
                                attrs: { "def": [16,22], "dex": [6,8] }
                            },
                            {
                                name: "巫纹靴",
                                type: "战靴",
                                quality: "蓝",
                                attrs: { "dex": [6,8], "dodge": [1.5,2.0] }
                            }
                        ]
                    },
                    {
                        monsters: ["守墓石像", "鬼将"],
                        equipList: [
                            {
                                name: "古兽刃",
                                type: "武器",
                                quality: "紫",
                                attrs: { "atk": [90,120], "str": [9,12], "crit": [2.0,2.5] }
                            },
                            {
                                name: "古纹铠",
                                type: "胸甲",
                                quality: "紫",
                                attrs: { "hp": [450,600], "def": [35,45], "con": [8,9] }
                            },
                            {
                                name: "守神玉",
                                type: "法宝",
                                quality: "紫",
                                attrs: { "mp": [220,260], "int": [8,9], "dodge": [2.0,2.5] }
                            },
                            {
                                name: "古纹头盔",
                                type: "头盔",
                                quality: "紫",
                                attrs: { "def": [22,30], "con": [8,9] }
                            },
                            {
                                name: "古纹戒",
                                type: "戒指",
                                quality: "紫",
                                attrs: { "str": [9,12], "int": [8,9] }
                            },
                            {
                                name: "古纹护肩",
                                type: "护肩",
                                quality: "紫",
                                attrs: { "def": [22,30], "con": [8,9] }
                            },
                            {
                                name: "古纹护腿",
                                type: "护腿",
                                quality: "紫",
                                attrs: { "def": [22,30], "dex": [8,9] }
                            },
                            {
                                name: "古纹靴",
                                type: "战靴",
                                quality: "紫",
                                attrs: { "dex": [8,9], "dodge": [2.0,2.5] }
                            }
                        ]
                    }
                ]
            },
            {
                mapName: "东海仙岛区域",
                realm: "金丹期",
                levelRange: "61-90层",
                monsterDropGroups: [
                    {
                        monsters: ["虾兵", "蟹将"],
                        equipList: [
                            {
                                name: "碧水剑",
                                type: "武器",
                                quality: "蓝",
                                attrs: { "atk": [150,220], "str": [13,15], "crit": [2.0,3.0] }
                            },
                            {
                                name: "海鳞甲",
                                type: "胸甲",
                                quality: "蓝",
                                attrs: { "hp": [700,1100], "def": [50,65], "con": [10,12] }
                            },
                            {
                                name: "水云佩",
                                type: "法宝",
                                quality: "蓝",
                                attrs: { "mp": [300,450], "int": [10,12], "dodge": [2.0,3.0] }
                            },
                            {
                                name: "海鳞头盔",
                                type: "头盔",
                                quality: "蓝",
                                attrs: { "def": [30,40], "con": [10,12] }
                            },
                            {
                                name: "水云戒",
                                type: "戒指",
                                quality: "蓝",
                                attrs: { "int": [10,12], "mp": [100,150] }
                            },
                            {
                                name: "海鳞护肩",
                                type: "护肩",
                                quality: "蓝",
                                attrs: { "def": [30,40], "con": [10,12] }
                            },
                            {
                                name: "海鳞护腿",
                                type: "护腿",
                                quality: "蓝",
                                attrs: { "def": [30,40], "dex": [10,12] }
                            },
                            {
                                name: "海鳞靴",
                                type: "战靴",
                                quality: "蓝",
                                attrs: { "dex": [10,12], "dodge": [2.0,3.0] }
                            }
                        ]
                    },
                    {
                        monsters: ["龙宫守卫", "鲛人卫士"],
                        equipList: [
                            {
                                name: "海龙杖",
                                type: "武器",
                                quality: "紫",
                                attrs: { "magicDamage": [220,300], "int": [13,16], "mp": [450,600] }
                            },
                            {
                                name: "龙鳞甲",
                                type: "胸甲",
                                quality: "紫",
                                attrs: { "hp": [1100,1500], "def": [65,80], "con": [12,14] }
                            },
                            {
                                name: "踏浪玉",
                                type: "法器",
                                quality: "紫",
                                attrs: { "dex": [12,14], "luck": [7,9], "dodge": [3.0,3.5] }
                            },
                            {
                                name: "龙鳞头盔",
                                type: "头盔",
                                quality: "紫",
                                attrs: { "def": [40,50], "con": [12,14] }
                            },
                            {
                                name: "踏浪戒",
                                type: "戒指",
                                quality: "紫",
                                attrs: { "int": [13,16], "mp": [150,200] }
                            },
                            {
                                name: "龙鳞护肩",
                                type: "护肩",
                                quality: "紫",
                                attrs: { "def": [40,50], "con": [12,14] }
                            },
                            {
                                name: "龙鳞护腿",
                                type: "护腿",
                                quality: "紫",
                                attrs: { "def": [40,50], "dex": [12,14] }
                            },
                            {
                                name: "龙鳞靴",
                                type: "战靴",
                                quality: "紫",
                                attrs: { "dex": [12,14], "dodge": [3.0,3.5] }
                            }
                        ]
                    },
                    {
                        monsters: ["龙子", "龟丞相"],
                        equipList: [
                            {
                                name: "避水仙剑",
                                type: "武器",
                                quality: "橙",
                                attrs: { "atk": [300,380], "str": [16,18], "crit": [3.5,4.0] }
                            },
                            {
                                name: "龙宫宝甲",
                                type: "胸甲",
                                quality: "橙",
                                attrs: { "hp": [1500,1800], "def": [80,90], "con": [14,16] }
                            },
                            {
                                name: "避水珠",
                                type: "法宝",
                                quality: "橙",
                                attrs: { "mp": [600,700], "int": [14,16], "dodge": [3.5,4.0] }
                            },
                            {
                                name: "龙宫头盔",
                                type: "头盔",
                                quality: "橙",
                                attrs: { "def": [50,60], "con": [14,16] }
                            },
                            {
                                name: "避水戒",
                                type: "戒指",
                                quality: "橙",
                                attrs: { "str": [16,18], "int": [14,16] }
                            },
                            {
                                name: "龙宫护肩",
                                type: "护肩",
                                quality: "橙",
                                attrs: { "def": [50,60], "con": [14,16] }
                            },
                            {
                                name: "龙宫护腿",
                                type: "护腿",
                                quality: "橙",
                                attrs: { "def": [50,60], "dex": [14,16] }
                            },
                            {
                                name: "龙宫靴",
                                type: "战靴",
                                quality: "橙",
                                attrs: { "dex": [14,16], "dodge": [3.5,4.0] }
                            }
                        ]
                    }
                ]
            },
            {
                mapName: "北境雪原区域",
                realm: "元婴期",
                levelRange: "91-120层",
                monsterDropGroups: [
                    {
                        monsters: ["雪狼", "冰猿"],
                        equipList: [
                            {
                                name: "冰锋剑",
                                type: "武器",
                                quality: "紫",
                                attrs: { "atk": [400,600], "str": [19,22], "crit": [3.5,4.5] }
                            },
                            {
                                name: "冰鳞甲",
                                type: "胸甲",
                                quality: "紫",
                                attrs: { "hp": [2000,3000], "def": [95,115], "con": [15,17] }
                            },
                            {
                                name: "冰心珠",
                                type: "法宝",
                                quality: "紫",
                                attrs: { "mp": [800,1200], "int": [15,17], "dodge": [3.5,4.5] }
                            },
                            {
                                name: "冰鳞头盔",
                                type: "头盔",
                                quality: "紫",
                                attrs: { "def": [60,75], "con": [15,17] }
                            },
                            {
                                name: "冰心戒",
                                type: "戒指",
                                quality: "紫",
                                attrs: { "int": [15,17], "mp": [200,250] }
                            },
                            {
                                name: "冰鳞护肩",
                                type: "护肩",
                                quality: "紫",
                                attrs: { "def": [60,75], "con": [15,17] }
                            },
                            {
                                name: "冰鳞护腿",
                                type: "护腿",
                                quality: "紫",
                                attrs: { "def": [60,75], "dex": [15,17] }
                            },
                            {
                                name: "冰鳞靴",
                                type: "战靴",
                                quality: "紫",
                                attrs: { "dex": [15,17], "dodge": [3.5,4.5] }
                            }
                        ]
                    },
                    {
                        monsters: ["冰女", "冰傀儡"],
                        equipList: [
                            {
                                name: "寒玉杖",
                                type: "武器",
                                quality: "橙",
                                attrs: { "magicDamage": [600,750], "int": [20,23], "mp": [1200,1500] }
                            },
                            {
                                name: "雪绒仙袍",
                                type: "胸甲",
                                quality: "橙",
                                attrs: { "hp": [3000,3800], "def": [115,135], "con": [17,19] }
                            },
                            {
                                name: "玄冰盾",
                                type: "法宝",
                                quality: "橙",
                                attrs: { "def": [50,70], "hp": [500,800], "dodge": [4.5,5.0] }
                            },
                            {
                                name: "雪绒头盔",
                                type: "头盔",
                                quality: "橙",
                                attrs: { "def": [75,90], "con": [17,19] }
                            },
                            {
                                name: "寒玉戒",
                                type: "戒指",
                                quality: "橙",
                                attrs: { "int": [20,23], "mp": [250,300] }
                            },
                            {
                                name: "雪绒护肩",
                                type: "护肩",
                                quality: "橙",
                                attrs: { "def": [75,90], "con": [17,19] }
                            },
                            {
                                name: "雪绒护腿",
                                type: "护腿",
                                quality: "橙",
                                attrs: { "def": [75,90], "dex": [17,19] }
                            },
                            {
                                name: "雪绒靴",
                                type: "战靴",
                                quality: "橙",
                                attrs: { "dex": [17,19], "dodge": [4.5,5.0] }
                            }
                        ]
                    },
                    {
                        monsters: ["冰宫宫主"],
                        equipList: [
                            {
                                name: "冰魄神剑",
                                type: "武器",
                                quality: "橙",
                                attrs: { "atk": [750,900], "str": [23,25], "crit": [5.0,6.0] }
                            },
                            {
                                name: "冰凰仙甲",
                                type: "胸甲",
                                quality: "橙",
                                attrs: { "hp": [3800,4500], "def": [135,150], "con": [19,21] }
                            },
                            {
                                name: "雪魂玉",
                                type: "法宝",
                                quality: "橙",
                                attrs: { "mp": [1500,1800], "int": [19,21], "dodge": [5.0,6.0] }
                            },
                            {
                                name: "冰凰头盔",
                                type: "头盔",
                                quality: "橙",
                                attrs: { "def": [90,105], "con": [19,21] }
                            },
                            {
                                name: "冰魄戒",
                                type: "戒指",
                                quality: "橙",
                                attrs: { "str": [23,25], "int": [19,21] }
                            },
                            {
                                name: "冰凰护肩",
                                type: "护肩",
                                quality: "橙",
                                attrs: { "def": [90,105], "con": [19,21] }
                            },
                            {
                                name: "冰凰护腿",
                                type: "护腿",
                                quality: "橙",
                                attrs: { "def": [90,105], "dex": [19,21] }
                            },
                            {
                                name: "冰凰靴",
                                type: "战靴",
                                quality: "橙",
                                attrs: { "dex": [19,21], "dodge": [5.0,6.0] }
                            }
                        ]
                    }
                ]
            },
            {
                mapName: "西漠沙海区域",
                realm: "化神期",
                levelRange: "121-150层",
                monsterDropGroups: [
                    {
                        monsters: ["沙虫", "沙匪"],
                        equipList: [
                            {
                                name: "裂沙剑",
                                type: "武器",
                                quality: "紫",
                                attrs: { "atk": [1000,1400], "str": [26,28], "crit": [5.0,6.0] }
                            },
                            {
                                name: "沙金甲",
                                type: "防具",
                                quality: "紫",
                                attrs: { "hp": [5000,7000], "def": [160,190], "con": [20,22] }
                            },
                            {
                                name: "荒古玉",
                                type: "法宝",
                                quality: "紫",
                                attrs: { "mp": [2000,2800], "int": [20,22], "dodge": [5.0,6.0] }
                            }
                        ]
                    },
                    {
                        monsters: ["木乃伊", "守墓将军"],
                        equipList: [
                            {
                                name: "古神杖",
                                type: "武器",
                                quality: "橙",
                                attrs: { "magicDamage": [1400,1800], "int": [25,28], "mp": [2800,3600] }
                            },
                            {
                                name: "古域铠",
                                type: "防具",
                                quality: "橙",
                                attrs: { "hp": [7000,9000], "def": [190,220], "con": [22,24] }
                            },
                            {
                                name: "镇邪珠",
                                type: "法宝",
                                quality: "橙",
                                attrs: { "mp": [3600,4500], "int": [22,24], "dodge": [6.0,7.0] }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    
    // 新增功法数据
    NEW_SKILLS: {
        rootType: {
            jin: "金灵根",
            mu: "木灵根",
            shui: "水灵根",
            huo: "火灵根",
            tu: "土灵根",
            lei: "先天雷灵根",
            space: "先天空间灵根",
            metalStone: "先天金石灵根",
            herb: "先天百草灵根",
            sword: "先天剑灵根",
            chaos: "混沌灵根"
        },
        skillType: {
            fight: "武学",
            magic: "法术",
            heart: "心法",
            move: "身法"
        },
        quality: ["白", "绿", "蓝", "紫", "橙"],
        skillList: [
            {
                name: "锐金诀",
                root: "jin",
                realm: "炼气期",
                type: "fight",
                quality: "绿",
                attrs: {"atk": 12, "crit": 1.0},
                desc: "金灵根武学，提升物理攻击与暴击",
                dropMap: "中原修真区域",
                dropMonster: ["灰狼", "山匪"]
            },
            {
                name: "碎金诀",
                root: "jin",
                realm: "炼气期",
                type: "fight",
                quality: "蓝",
                attrs: {"atk": 20, "crit": 1.5},
                desc: "金灵根武学，攻击附带破甲效果",
                dropMap: "中原修真区域",
                dropMonster: ["土狼", "石傀儡"]
            },
            {
                name: "青木吐纳法",
                root: "mu",
                realm: "炼气期",
                type: "heart",
                quality: "白",
                attrs: {"hp": 50},
                desc: "木灵根心法，小幅提升气血上限",
                dropMap: "中原修真区域",
                dropMonster: ["野狗", "流寇"]
            },
            {
                name: "万木心法",
                root: "mu",
                realm: "炼气期",
                type: "heart",
                quality: "蓝",
                attrs: {"hp": 150, "con": 4},
                desc: "木灵根心法，持续恢复气血",
                dropMap: "中原修真区域",
                dropMonster: ["青狼", "树精"]
            },
            {
                name: "水镜盾",
                root: "shui",
                realm: "炼气期",
                type: "heart",
                quality: "绿",
                attrs: {"mp": 40, "def": 3},
                desc: "水灵根心法，形成灵力护盾",
                dropMap: "中原修真区域",
                dropMonster: ["水蛇", "渔妖"]
            },
            {
                name: "沧澜诀",
                root: "shui",
                realm: "炼气期",
                type: "magic",
                quality: "蓝",
                attrs: {"mp": 60, "int": 4},
                desc: "水灵根法术，提升灵力与法术防御",
                dropMap: "中原修真区域",
                dropMonster: ["水蛇", "渔妖"]
            },
            {
                name: "燃火术",
                root: "huo",
                realm: "炼气期",
                type: "magic",
                quality: "绿",
                attrs: {"magicAtk": 10, "crit": 0.8},
                desc: "火灵根法术，攻击附带灼烧效果",
                dropMap: "中原修真区域",
                dropMonster: ["灰狼", "山匪"]
            },
            {
                name: "烈炎诀",
                root: "huo",
                realm: "炼气期",
                type: "magic",
                quality: "蓝",
                attrs: {"magicAtk": 15, "crit": 1.2},
                desc: "火灵根法术，大幅提升法术爆发",
                dropMap: "中原修真区域",
                dropMonster: ["土狼", "石傀儡"]
            },
            {
                name: "厚土诀",
                root: "tu",
                realm: "炼气期",
                type: "heart",
                quality: "绿",
                attrs: {"def": 6, "con": 2},
                desc: "土灵根心法，提升防御与体质",
                dropMap: "中原修真区域",
                dropMonster: ["土狼", "石傀儡"]
            },
            {
                name: "大地心法",
                root: "tu",
                realm: "炼气期",
                type: "heart",
                quality: "蓝",
                attrs: {"def": 10, "dodge": 1.0},
                desc: "土灵根心法，伤害减免5%",
                dropMap: "中原修真区域",
                dropMonster: ["土狼", "石傀儡"]
            },
            {
                name: "基础剑典",
                root: "sword",
                realm: "炼气期",
                type: "fight",
                quality: "蓝",
                attrs: {"atk": 22, "crit": 1.5},
                desc: "先天剑灵根专属，超高物理攻击",
                dropMap: "中原修真区域",
                dropMonster: ["石傀儡"]
            },
            {
                name: "引雷诀",
                root: "lei",
                realm: "炼气期",
                type: "magic",
                quality: "蓝",
                attrs: {"magicAtk": 18, "crit": 1.5},
                desc: "先天雷灵根专属，几率麻痹目标",
                dropMap: "中原修真区域",
                dropMonster: ["石傀儡"]
            },
            {
                name: "混沌引气诀",
                root: "chaos",
                realm: "炼气期",
                type: "heart",
                quality: "蓝",
                attrs: {"allAttr": 1},
                desc: "混沌灵根专属，可修炼所有功法",
                dropMap: "中原修真区域",
                dropMonster: ["石傀儡"]
            },
            {
                name: "金罡劲",
                root: "jin",
                realm: "筑基期",
                type: "fight",
                quality: "绿",
                attrs: {"atk": 40, "crit": 1.0},
                desc: "金灵根武学，筑基期基础物攻功法",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["毒蝎", "瘴气妖"]
            },
            {
                name: "破甲金诀",
                root: "jin",
                realm: "筑基期",
                type: "fight",
                quality: "蓝",
                attrs: {"atk": 60, "crit": 1.5},
                desc: "金灵根武学，破甲效果提升",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["巫蛊师", "尸傀"]
            },
            {
                name: "锐金战体",
                root: "jin",
                realm: "筑基期",
                type: "fight",
                quality: "紫",
                attrs: {"atk": 90, "crit": 2.5},
                desc: "金灵根武学，大幅提升暴击伤害",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["守墓石像", "鬼将"]
            },
            {
                name: "枯荣诀",
                root: "mu",
                realm: "筑基期",
                type: "heart",
                quality: "蓝",
                attrs: {"hp": 300, "con": 6},
                desc: "木灵根心法，受伤后恢复气血",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["巫蛊师", "尸傀"]
            },
            {
                name: "万木长生诀",
                root: "mu",
                realm: "筑基期",
                type: "heart",
                quality: "紫",
                attrs: {"hp": 600, "con": 9},
                desc: "木灵根心法，极强续航能力",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["守墓石像", "鬼将"]
            },
            {
                name: "水幕心法",
                root: "shui",
                realm: "筑基期",
                type: "heart",
                quality: "蓝",
                attrs: {"mp": 160, "def": 25},
                desc: "水灵根心法，护盾效果大幅提升",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["巫蛊师", "尸傀"]
            },
            {
                name: "沧澜无尽诀",
                root: "shui",
                realm: "筑基期",
                type: "magic",
                quality: "紫",
                attrs: {"mp": 260, "int": 9},
                desc: "水灵根法术，护盾吸收10%伤害",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["守墓石像", "鬼将"]
            },
            {
                name: "焚炎诀",
                root: "huo",
                realm: "筑基期",
                type: "magic",
                quality: "蓝",
                attrs: {"magicAtk": 60, "crit": 1.5},
                desc: "火灵根法术，灼烧伤害增强",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["巫蛊师", "尸傀"]
            },
            {
                name: "赤地火海诀",
                root: "huo",
                realm: "筑基期",
                type: "magic",
                quality: "紫",
                attrs: {"magicAtk": 90, "crit": 2.0},
                desc: "火灵根法术，群体范围灼烧",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["守墓石像", "鬼将"]
            },
            {
                name: "山岩心法",
                root: "tu",
                realm: "筑基期",
                type: "heart",
                quality: "蓝",
                attrs: {"def": 25, "con": 6},
                desc: "土灵根心法，伤害减免8%",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["巫蛊师", "尸傀"]
            },
            {
                name: "大地战体",
                root: "tu",
                realm: "筑基期",
                type: "heart",
                quality: "紫",
                attrs: {"def": 45, "con": 9},
                desc: "土灵根心法，伤害减免12%",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["守墓石像", "鬼将"]
            },
            {
                name: "雷鸣诀",
                root: "lei",
                realm: "筑基期",
                type: "magic",
                quality: "紫",
                attrs: {"magicAtk": 85, "crit": 2.0},
                desc: "先天雷灵根专属，麻痹目标1秒",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["鬼将"]
            },
            {
                name: "百草心经",
                root: "herb",
                realm: "筑基期",
                type: "heart",
                quality: "紫",
                attrs: {"hp": 450, "con": 8},
                desc: "先天百草灵根专属，炼丹效果+10%",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["巫蛊师"]
            },
            {
                name: "金石躯",
                root: "metalStone",
                realm: "筑基期",
                type: "heart",
                quality: "蓝",
                attrs: {"def": 30, "con": 5},
                desc: "先天金石灵根专属，炼器成功率提升",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["守墓石像"]
            },
            {
                name: "疾风剑典",
                root: "sword",
                realm: "筑基期",
                type: "fight",
                quality: "紫",
                attrs: {"atk": 100, "crit": 3.0},
                desc: "先天剑灵根专属，攻击必中提升",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["鬼将"]
            },
            {
                name: "空间闪步",
                root: "space",
                realm: "筑基期",
                type: "move",
                quality: "蓝",
                attrs: {"dex": 6, "dodge": 2.0},
                desc: "先天空间灵根专属，散修专用",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["巫蛊师"]
            },
            {
                name: "混沌筑基诀",
                root: "chaos",
                realm: "筑基期",
                type: "heart",
                quality: "紫",
                attrs: {"allAttr": 3},
                desc: "混沌灵根专属，全属性提升",
                dropMap: "南疆蛮荒区域",
                dropMonster: ["鬼将"]
            },
            {
                name: "金虹斩",
                root: "jin",
                realm: "金丹期",
                type: "fight",
                quality: "蓝",
                attrs: {"atk": 150, "crit": 2.0},
                desc: "金灵根武学，金丹期基础物攻功法",
                dropMap: "东海仙岛区域",
                dropMonster: ["虾兵", "蟹将"]
            },
            {
                name: "金刚战体",
                root: "jin",
                realm: "金丹期",
                type: "fight",
                quality: "紫",
                attrs: {"atk": 220, "crit": 3.0},
                desc: "金灵根武学，破甲效果提升8%",
                dropMap: "东海仙岛区域",
                dropMonster: ["龙宫守卫", "鲛人卫士"]
            },
            {
                name: "庚金不灭诀",
                root: "jin",
                realm: "金丹期",
                type: "fight",
                quality: "橙",
                attrs: {"atk": 380, "crit": 4.0},
                desc: "金灵根武学，金丹期顶级物攻功法",
                dropMap: "东海仙岛区域",
                dropMonster: ["龙子", "龟丞相"]
            },
            {
                name: "翻江倒海诀",
                root: "shui",
                realm: "金丹期",
                type: "magic",
                quality: "紫",
                attrs: {"mp": 450, "int": 13},
                desc: "水灵根法术，强力灵力护盾",
                dropMap: "东海仙岛区域",
                dropMonster: ["龙宫守卫", "鲛人卫士"]
            },
            {
                name: "四海龙王诀",
                root: "shui",
                realm: "金丹期",
                type: "magic",
                quality: "橙",
                attrs: {"mp": 700, "int": 16},
                desc: "水灵根法术，护盾吸收20%伤害",
                dropMap: "东海仙岛区域",
                dropMonster: ["龙子", "龟丞相"]
            },
            {
                name: "炎狱诀",
                root: "huo",
                realm: "金丹期",
                type: "magic",
                quality: "紫",
                attrs: {"magicAtk": 220, "crit": 3.0},
                desc: "火灵根法术，持续高额灼烧",
                dropMap: "东海仙岛区域",
                dropMonster: ["龙宫守卫", "鲛人卫士"]
            },
            {
                name: "九阳焚天诀",
                root: "huo",
                realm: "金丹期",
                type: "magic",
                quality: "橙",
                attrs: {"magicAtk": 380, "crit": 4.0},
                desc: "火灵根法术，法术爆发天花板",
                dropMap: "东海仙岛区域",
                dropMonster: ["龙子", "龟丞相"]
            },
            {
                name: "坤元诀",
                root: "tu",
                realm: "金丹期",
                type: "heart",
                quality: "蓝",
                attrs: {"def": 50, "con": 10},
                desc: "土灵根心法，提升防御与体质",
                dropMap: "东海仙岛区域",
                dropMonster: ["虾兵", "蟹将"]
            },
            {
                name: "大地至尊体",
                root: "tu",
                realm: "金丹期",
                type: "heart",
                quality: "橙",
                attrs: {"def": 90, "con": 16},
                desc: "土灵根心法，伤害减免20%",
                dropMap: "东海仙岛区域",
                dropMonster: ["龙子", "龟丞相"]
            },
            {
                name: "紫宵雷诀",
                root: "lei",
                realm: "金丹期",
                type: "magic",
                quality: "橙",
                attrs: {"magicAtk": 350, "crit": 4.0},
                desc: "先天雷灵根专属，法术穿透+10%",
                dropMap: "东海仙岛区域",
                dropMonster: ["龙子"]
            },
            {
                name: "凌霄剑典",
                root: "sword",
                realm: "金丹期",
                type: "fight",
                quality: "橙",
                attrs: {"atk": 360, "crit": 5.0},
                desc: "先天剑灵根专属，几率斩杀低血目标",
                dropMap: "东海仙岛区域",
                dropMonster: ["龟丞相"]
            },
            {
                name: "虚空遁",
                root: "space",
                realm: "金丹期",
                type: "move",
                quality: "橙",
                attrs: {"dex": 14, "dodge": 6.0},
                desc: "先天空间灵根专属，可闪避致命伤",
                dropMap: "东海仙岛区域",
                dropMonster: ["龙宫守卫"]
            },
            {
                name: "混沌金丹诀",
                root: "chaos",
                realm: "金丹期",
                type: "heart",
                quality: "橙",
                attrs: {"allAttr": 5},
                desc: "混沌灵根专属，功法效果额外+5%",
                dropMap: "东海仙岛区域",
                dropMonster: ["龙子", "龟丞相"]
            },
            {
                name: "冰锋斩",
                root: "shui",
                realm: "元婴期",
                type: "fight",
                quality: "紫",
                attrs: {"atk": 400, "crit": 3.5},
                desc: "水灵根武学，附带减速控制",
                dropMap: "北境雪原区域",
                dropMonster: ["雪狼", "冰猿"]
            },
            {
                name: "冰皇诀",
                root: "shui",
                realm: "元婴期",
                type: "magic",
                quality: "橙",
                attrs: {"magicAtk": 750, "crit": 5.0},
                desc: "水灵根法术，冻结目标1秒",
                dropMap: "北境雪原区域",
                dropMonster: ["冰宫宫主"]
            },
            {
                name: "万古剑经",
                root: "sword",
                realm: "元婴期",
                type: "fight",
                quality: "橙",
                attrs: {"atk": 850, "crit": 6.0},
                desc: "先天剑灵根专属，元婴期顶级剑修功法",
                dropMap: "北境雪原区域",
                dropMonster: ["冰宫宫主"]
            },
            {
                name: "九天神雷诀",
                root: "lei",
                realm: "元婴期",
                type: "magic",
                quality: "橙",
                attrs: {"magicAtk": 800, "crit": 5.0},
                desc: "先天雷灵根专属，群体麻痹效果",
                dropMap: "北境雪原区域",
                dropMonster: ["冰女", "冰傀儡"]
            },
            {
                name: "虚空幻步",
                root: "space",
                realm: "元婴期",
                type: "move",
                quality: "橙",
                attrs: {"dex": 19, "dodge": 8.0},
                desc: "先天空间灵根专属，极高闪避与先手",
                dropMap: "北境雪原区域",
                dropMonster: ["冰女"]
            },
            {
                name: "混沌元婴诀",
                root: "chaos",
                realm: "元婴期",
                type: "heart",
                quality: "橙",
                attrs: {"allAttr": 8},
                desc: "混沌灵根专属，功法效果额外+8%",
                dropMap: "北境雪原区域",
                dropMonster: ["冰宫宫主"]
            },
            {
                name: "裂沙刀法",
                root: "jin",
                realm: "化神期",
                type: "fight",
                quality: "紫",
                attrs: {"atk": 1000, "crit": 5.0},
                desc: "金灵根武学，化神期基础物攻功法",
                dropMap: "西漠沙海区域",
                dropMonster: ["沙虫", "沙匪"]
            },
            {
                name: "盘古金诀",
                root: "jin",
                realm: "化神期",
                type: "fight",
                quality: "橙",
                attrs: {"atk": 2100, "crit": 7.0},
                desc: "金灵根武学，破甲效果+15%",
                dropMap: "西漠沙海区域",
                dropMonster: ["守墓将军"]
            },
            {
                name: "焚界天火诀",
                root: "huo",
                realm: "化神期",
                type: "magic",
                quality: "橙",
                attrs: {"magicAtk": 2000, "crit": 7.0},
                desc: "火灵根法术，附带真实灼烧伤害",
                dropMap: "西漠沙海区域",
                dropMonster: ["守墓将军"]
            },
            {
                name: "荒古大地体",
                root: "tu",
                realm: "化神期",
                type: "heart",
                quality: "橙",
                attrs: {"def": 230, "con": 24},
                desc: "土灵根心法，伤害减免30%",
                dropMap: "西漠沙海区域",
                dropMonster: ["守墓将军"]
            },
            {
                name: "诛仙剑典",
                root: "sword",
                realm: "化神期",
                type: "fight",
                quality: "橙",
                attrs: {"atk": 2200, "crit": 8.0},
                desc: "先天剑灵根专属，15%几率斩杀",
                dropMap: "西漠沙海区域",
                dropMonster: ["守墓将军"]
            },
            {
                name: "灭世雷诀",
                root: "lei",
                realm: "化神期",
                type: "magic",
                quality: "橙",
                attrs: {"magicAtk": 2100, "crit": 8.0},
                desc: "先天雷灵根专属，法术穿透+20%",
                dropMap: "西漠沙海区域",
                dropMonster: ["守墓将军"]
            },
            {
                name: "虚空穿梭诀",
                root: "space",
                realm: "化神期",
                type: "move",
                quality: "橙",
                attrs: {"dex": 24, "dodge": 10.0},
                desc: "先天空间灵根专属，免疫控制效果",
                dropMap: "西漠沙海区域",
                dropMonster: ["木乃伊"]
            },
            {
                name: "九转百草心经",
                root: "herb",
                realm: "化神期",
                type: "heart",
                quality: "橙",
                attrs: {"hp": 9000, "con": 24},
                desc: "先天百草灵根专属，每秒回血3%",
                dropMap: "西漠沙海区域",
                dropMonster: ["沙匪"]
            },
            {
                name: "万劫金石体",
                root: "metalStone",
                realm: "化神期",
                type: "heart",
                quality: "橙",
                attrs: {"def": 240, "con": 24},
                desc: "先天金石灵根专属，炼器效果+15%",
                dropMap: "西漠沙海区域",
                dropMonster: ["守墓将军"]
            },
            {
                name: "混沌化神诀",
                root: "chaos",
                realm: "化神期",
                type: "heart",
                quality: "橙",
                attrs: {"allAttr": 12},
                desc: "混沌灵根专属，功法效果额外+12%",
                dropMap: "西漠沙海区域",
                dropMonster: ["守墓将军"]
            }
        ]
    },
    
    // 青岚村 · 觉醒篇
    QINGLAN_QUESTS: {
        'qinglan-1': {
            id: 'qinglan-1',
            name: '林间苏醒',
            sect: 'none',
            type: 'story',
            description: '在青岚村外小树林中苏醒，遇到村姑阿禾',
            target: 'newbie-village',
            count: 1,
            rewards: {
                gold: 0,
                exp: 100,
                items: ['破旧布衣', '面包']
            }
        },
        'qinglan-2': {
            id: 'qinglan-2',
            name: '面见村长',
            sect: 'none',
            type: 'talk',
            description: '与青岚村村长交谈，了解守岚者的传说',
            target: 'village-elder',
            count: 1,
            rewards: {
                gold: 50,
                exp: 200,
                items: ['破瘴匕首']
            }
        },
        'qinglan-3': {
            id: 'qinglan-3',
            name: '初探迷雾谷 · 寻找猎户',
            sect: 'none',
            type: 'kill',
            description: '前往迷雾谷寻找失踪的猎户王大叔，击败瘴气蠕虫',
            target: 'miasma-worm',
            count: 3,
            rewards: {
                gold: 0,
                exp: 300,
                items: ['守岚者披风', '猎户的弓箭']
            }
        },
        'qinglan-4': {
            id: 'qinglan-4',
            name: '守护村庄 · 黑影来袭',
            sect: 'none',
            type: 'kill',
            description: '击退黑影怪物和黑影先锋，守护青岚村',
            target: 'shadow-leader',
            count: 1,
            rewards: {
                gold: 200,
                exp: 500,
                items: ['守岚者长剑']
            }
        },
        'qinglan-5': {
            id: 'qinglan-5',
            name: '告别青岚村 · 正式入世',
            sect: 'none',
            type: 'travel',
            description: '与青岚村村民告别，前往青河镇',
            target: 'qinghe-town',
            count: 1,
            rewards: {
                gold: 500,
                exp: 1000,
                items: ['完整守岚者玉佩'],
                title: '青岚守护者'
            }
        }
    },
    
    DAILY_QUESTS: {
        'shuiyue-1': {
            id: 'shuiyue-1',
            name: '除妖任务',
            sect: 'shuiyue',
            type: 'kill',
            description: '击杀2只麻雀妖',
            target: 'sparrow-demon',
            count: 2,
            rewards: {
                contribution: 40,
                gold: 90,
                exp: 180
            }
        },
        'yanhuo-1': {
            id: 'yanhuo-1',
            name: '猎杀木狼',
            sect: 'yanhuo',
            type: 'kill',
            description: '击杀4只木狼',
            target: 'wood-wolf',
            count: 4,
            rewards: {
                contribution: 70,
                gold: 130,
                exp: 280
            }
        },
        'huangtu-1': {
            id: 'huangtu-1',
            name: '山贼清剿',
            sect: 'huangtu',
            type: 'kill',
            description: '清剿3名山贼',
            target: 'mountain-bandit',
            count: 3,
            rewards: {
                contribution: 55,
                gold: 110,
                exp: 220
            }
        }
    },
    
    SECT_PROMOTIONS: {
        'jinyang': [
            {
                title: '外门弟子',
                requiredQuests: 0,
                requiredCultivation: 0,
                rewards: { contribution: 100 }
            },
            {
                title: '内门弟子',
                requiredQuests: 3,
                requiredCultivation: 100,
                rewards: { contribution: 300, item: '金阳秘籍' }
            },
            {
                title: '核心弟子',
                requiredQuests: 8,
                requiredCultivation: 500,
                rewards: { contribution: 800, item: '金阳剑谱' }
            },
            {
                title: '执法执事',
                requiredQuests: 15,
                requiredCultivation: 1500,
                rewards: { contribution: 2000, item: '金阳丹' }
            },
            {
                title: '长老',
                requiredQuests: 25,
                requiredCultivation: 5000,
                rewards: { contribution: 5000, item: '金阳石' }
            },
            {
                title: '掌门',
                requiredQuests: 40,
                requiredCultivation: 15000,
                rewards: { contribution: 15000, item: '金阳神符' }
            }
        ],
        'qingmu': [
            {
                title: '采药童子',
                requiredQuests: 0,
                requiredCultivation: 0,
                rewards: { contribution: 100 }
            },
            {
                title: '内门弟子',
                requiredQuests: 3,
                requiredCultivation: 100,
                rewards: { contribution: 300, item: '青木秘典' }
            },
            {
                title: '青木使者',
                requiredQuests: 8,
                requiredCultivation: 500,
                rewards: { contribution: 800, item: '青木术法' }
            },
            {
                title: '青木执事',
                requiredQuests: 15,
                requiredCultivation: 1500,
                rewards: { contribution: 2000, item: '青木精' }
            },
            {
                title: '青木长老',
                requiredQuests: 25,
                requiredCultivation: 5000,
                rewards: { contribution: 5000, item: '青木珠' }
            },
            {
                title: '青木宗主',
                requiredQuests: 40,
                requiredCultivation: 15000,
                rewards: { contribution: 15000, item: '青木之源' }
            }
        ],
        'shuiyue': [
            {
                title: '水月侍女',
                requiredQuests: 0,
                requiredCultivation: 0,
                rewards: { contribution: 100 }
            },
            {
                title: '内门弟子',
                requiredQuests: 3,
                requiredCultivation: 100,
                rewards: { contribution: 300, item: '水月秘典' }
            },
            {
                title: '水月使者',
                requiredQuests: 8,
                requiredCultivation: 500,
                rewards: { contribution: 800, item: '水月剑诀' }
            },
            {
                title: '水月执事',
                requiredQuests: 15,
                requiredCultivation: 1500,
                rewards: { contribution: 2000, item: '水月精' }
            },
            {
                title: '水月长老',
                requiredQuests: 25,
                requiredCultivation: 5000,
                rewards: { contribution: 5000, item: '水月神符' }
            },
            {
                title: '水月宫主',
                requiredQuests: 40,
                requiredCultivation: 15000,
                rewards: { contribution: 15000, item: '水月之源' }
            }
        ],
        'yanhuo': [
            {
                title: '炎火学徒',
                requiredQuests: 0,
                requiredCultivation: 0,
                rewards: { contribution: 100 }
            },
            {
                title: '内门弟子',
                requiredQuests: 3,
                requiredCultivation: 100,
                rewards: { contribution: 300, item: '炎火秘典' }
            },
            {
                title: '炎火使者',
                requiredQuests: 8,
                requiredCultivation: 500,
                rewards: { contribution: 800, item: '炎火术法' }
            },
            {
                title: '炎火执事',
                requiredQuests: 15,
                requiredCultivation: 1500,
                rewards: { contribution: 2000, item: '炎火精' }
            },
            {
                title: '炎火长老',
                requiredQuests: 25,
                requiredCultivation: 5000,
                rewards: { contribution: 5000, item: '炎火珠' }
            },
            {
                title: '炎火殿主',
                requiredQuests: 40,
                requiredCultivation: 15000,
                rewards: { contribution: 15000, item: '炎火之源' }
            }
        ],
        'huangtu': [
            {
                title: '皇土学徒',
                requiredQuests: 0,
                requiredCultivation: 0,
                rewards: { contribution: 100 }
            },
            {
                title: '内门弟子',
                requiredQuests: 3,
                requiredCultivation: 100,
                rewards: { contribution: 300, item: '皇土秘典' }
            },
            {
                title: '皇土使者',
                requiredQuests: 8,
                requiredCultivation: 500,
                rewards: { contribution: 800, item: '皇土术法' }
            },
            {
                title: '皇土执事',
                requiredQuests: 15,
                requiredCultivation: 1500,
                rewards: { contribution: 2000, item: '皇土精' }
            },
            {
                title: '皇土长老',
                requiredQuests: 25,
                requiredCultivation: 5000,
                rewards: { contribution: 5000, item: '皇土珠' }
            },
            {
                title: '皇土阁主',
                requiredQuests: 40,
                requiredCultivation: 15000,
                rewards: { contribution: 15000, item: '皇土之源' }
            }
        ]
    },
    
    SECT_QUESTS: {
        'jinyang': [
            {
                id: 'jinyang-quest-1',
                title: '外门任务',
                description: '击杀10只妖兽',
                target: 'wild-monster',
                count: 10,
                rewards: { contribution: 30, gold: 100, exp: 200 }
            },
            {
                id: 'jinyang-quest-2',
                title: '内门任务',
                description: '击杀5只精英妖兽',
                target: 'elite-monster',
                count: 5,
                rewards: { contribution: 80, gold: 300, exp: 600 }
            },
            {
                id: 'jinyang-quest-3',
                title: '核心任务',
                description: '击杀1只妖兽首领',
                target: 'boss-monster',
                count: 1,
                rewards: { contribution: 160, gold: 800, exp: 1600 }
            },
            {
                id: 'jinyang-quest-4',
                title: '执法任务',
                description: '击杀3只妖兽首领',
                target: 'boss-monster',
                count: 3,
                rewards: { contribution: 400, gold: 2000, exp: 4000 }
            }
        ],
        'qingmu': [
            {
                id: 'qingmu-quest-1',
                title: '采药任务',
                description: '采集10株灵草',
                target: 'herb',
                count: 10,
                rewards: { contribution: 30, gold: 100, exp: 200 }
            },
            {
                id: 'qingmu-quest-2',
                title: '种植任务',
                description: '种植5株灵草',
                target: 'plant',
                count: 5,
                rewards: { contribution: 80, gold: 300, exp: 600 }
            },
            {
                id: 'qingmu-quest-3',
                title: '炼丹任务',
                description: '炼制3炉丹药',
                target: 'pill',
                count: 3,
                rewards: { contribution: 160, gold: 800, exp: 1600 }
            },
            {
                id: 'qingmu-quest-4',
                title: '长老任务',
                description: '炼制10炉高级丹药',
                target: 'high-pill',
                count: 10,
                rewards: { contribution: 400, gold: 2000, exp: 4000 }
            }
        ],
        'shuiyue': [
            {
                id: 'shuiyue-quest-1',
                title: '巡逻任务',
                description: '巡逻水月宫周边',
                target: 'patrol',
                count: 5,
                rewards: { contribution: 30, gold: 100, exp: 200 }
            },
            {
                id: 'shuiyue-quest-2',
                title: '练剑任务',
                description: '练习水月剑法10次',
                target: 'practice',
                count: 10,
                rewards: { contribution: 80, gold: 300, exp: 600 }
            },
            {
                id: 'shuiyue-quest-3',
                title: '除妖任务',
                description: '击杀8只水妖',
                target: 'water-monster',
                count: 8,
                rewards: { contribution: 160, gold: 800, exp: 1600 }
            },
            {
                id: 'shuiyue-quest-4',
                title: '秘境任务',
                description: '探索水月秘境1次',
                target: 'dungeon',
                count: 1,
                rewards: { contribution: 400, gold: 2000, exp: 4000 }
            }
        ],
        'yanhuo': [
            {
                id: 'yanhuo-quest-1',
                title: '巡山任务',
                description: '巡山10次',
                target: 'patrol',
                count: 10,
                rewards: { contribution: 30, gold: 100, exp: 200 }
            },
            {
                id: 'yanhuo-quest-2',
                title: '炼器任务',
                description: '炼制5件法器',
                target: 'refine',
                count: 5,
                rewards: { contribution: 80, gold: 300, exp: 600 }
            },
            {
                id: 'yanhuo-quest-3',
                title: '除魔任务',
                description: '击杀10只魔怪',
                target: 'demon',
                count: 10,
                rewards: { contribution: 160, gold: 800, exp: 1600 }
            },
            {
                id: 'yanhuo-quest-4',
                title: '长老任务',
                description: '击杀3只魔王',
                target: 'demon-boss',
                count: 3,
                rewards: { contribution: 400, gold: 2000, exp: 4000 }
            }
        ],
        'huangtu': [
            {
                id: 'huangtu-quest-1',
                title: '挖矿任务',
                description: '挖掘10块矿石',
                target: 'mine',
                count: 10,
                rewards: { contribution: 30, gold: 100, exp: 200 }
            },
            {
                id: 'huangtu-quest-2',
                title: '筑墙任务',
                description: '修筑5段城墙',
                target: 'wall',
                count: 5,
                rewards: { contribution: 80, gold: 300, exp: 600 }
            },
            {
                id: 'huangtu-quest-3',
                title: '守土任务',
                description: '击杀8只入侵妖兽',
                target: 'invade',
                count: 8,
                rewards: { contribution: 160, gold: 800, exp: 1600 }
            },
            {
                id: 'huangtu-quest-4',
                title: '长老任务',
                description: '击退1次妖兽大军',
                target: 'army',
                count: 1,
                rewards: { contribution: 400, gold: 2000, exp: 4000 }
            }
        ]
    },
    
    SECT_SHOPS: {
        'jinyang': {
            name: '金阳门贡献商店',
            items: [
                { id: '回春丹', cost: 20 },
                { id: '聚灵散', cost: 30 },
                { id: '鎏金盔', cost: 150 },
                { id: '鎏金甲', cost: 200 },
                { id: '鎏金护肩', cost: 150 },
                { id: '鎏金护腿', cost: 150 },
                { id: '鎏金靴', cost: 150 },
                { id: '鎏金剑', cost: 200 },
                { id: '烈阳盔', cost: 400 },
                { id: '烈阳甲', cost: 500 },
                { id: '烈阳护肩', cost: 400 },
                { id: '烈阳护腿', cost: 400 },
                { id: '烈阳靴', cost: 400 },
                { id: '烈阳剑', cost: 500 },
                { id: '镇金盔', cost: 1000 },
                { id: '镇金甲', cost: 1200 },
                { id: '镇金护肩', cost: 1000 },
                { id: '镇金护腿', cost: 1000 },
                { id: '镇金靴', cost: 1000 },
                { id: '镇金剑', cost: 1200 },
                { id: '金阙盔', cost: 2000 },
                { id: '金阙甲', cost: 2500 },
                { id: '金阙护肩', cost: 2000 },
                { id: '金阙护腿', cost: 2000 },
                { id: '金阙靴', cost: 2000 },
                { id: '金阙剑', cost: 2500 },
                { id: '金阳基础诀', cost: 500 },
                { id: '裂金剑法', cost: 2000 },
                { id: '大日金煌诀', cost: 5000 },
                { id: '金阙破天击', cost: 9000 },
                { id: '金纹剑', cost: 1000 },
                { id: '烈阳佩', cost: 3000 },
                { id: '金阙印', cost: 7000 },
                { id: '焚天剑', cost: 15000 },
                { id: '金阳丹', cost: 200 },
                { id: '裂金丹', cost: 800 },
                { id: '金煌丹', cost: 2500 },
                { id: '破天丹', cost: 6000 },
                { id: '金阳弟子令', cost: 500 },
                { id: '烈阳精英令', cost: 2000 },
                { id: '金阙核心令', cost: 5000 },
                { id: '焚天长老令', cost: 10000 }
            ]
        },
        'qingmu': {
            name: '青木宗贡献商店',
            items: [
                { id: '回春丹', cost: 20 },
                { id: '聚灵散', cost: 30 },
                { id: '青岚盔', cost: 150 },
                { id: '青岚甲', cost: 200 },
                { id: '青岚护肩', cost: 150 },
                { id: '青岚护腿', cost: 150 },
                { id: '青岚靴', cost: 150 },
                { id: '青岚琴', cost: 200 },
                { id: '万木盔', cost: 400 },
                { id: '万木甲', cost: 500 },
                { id: '万木护肩', cost: 400 },
                { id: '万木护腿', cost: 400 },
                { id: '万木靴', cost: 400 },
                { id: '万木琴', cost: 500 },
                { id: '长生盔', cost: 1000 },
                { id: '长生甲', cost: 1200 },
                { id: '长生护肩', cost: 1000 },
                { id: '长生护腿', cost: 1000 },
                { id: '长生靴', cost: 1000 },
                { id: '长生琴', cost: 1200 },
                { id: '枯荣盔', cost: 2000 },
                { id: '枯荣甲', cost: 2500 },
                { id: '枯荣护肩', cost: 2000 },
                { id: '枯荣护腿', cost: 2000 },
                { id: '枯荣靴', cost: 2000 },
                { id: '枯荣琴', cost: 2500 },
                { id: '青木长生诀', cost: 450 },
                { id: '缠叶毒经', cost: 1900 },
                { id: '万古青元功', cost: 4800 },
                { id: '枯荣万木生', cost: 8800 },
                { id: '青藤鞭', cost: 900 },
                { id: '万木珠', cost: 2800 },
                { id: '长生玉', cost: 6500 },
                { id: '枯荣鼎', cost: 14000 },
                { id: '青元丹', cost: 180 },
                { id: '缠叶丹', cost: 750 },
                { id: '长生丹', cost: 2300 },
                { id: '枯荣丹', cost: 5500 },
                { id: '青木弟子令', cost: 450 },
                { id: '万木精英令', cost: 1800 },
                { id: '长生核心令', cost: 4800 },
                { id: '枯荣长老令', cost: 9500 }
            ],
            // 高阶炼丹配方兑换（需要金丹期以上才能看到）
            recipes: [
                { name: '上品攻击丹', cost: 800, requiredRealm: '金丹期' },
                { name: '上品防御丹', cost: 800, requiredRealm: '金丹期' },
                { name: '上品法攻丹', cost: 1000, requiredRealm: '金丹期' },
                { name: '上品暴击丹', cost: 1200, requiredRealm: '金丹期' },
                { name: '上品回血丹', cost: 600, requiredRealm: '金丹期' },
                { name: '上品回蓝丹', cost: 600, requiredRealm: '金丹期' },
                { name: '上品修炼丹', cost: 1500, requiredRealm: '金丹期' }
            ]
        },
        'shuiyue': {
            name: '水月宫贡献商店',
            items: [
                { id: '回春丹', cost: 20 },
                { id: '聚灵散', cost: 30 },
                { id: '凝水盔', cost: 150 },
                { id: '凝水甲', cost: 200 },
                { id: '凝水护肩', cost: 150 },
                { id: '凝水护腿', cost: 150 },
                { id: '凝水靴', cost: 150 },
                { id: '凝水珠', cost: 200 },
                { id: '流霜盔', cost: 400 },
                { id: '流霜甲', cost: 500 },
                { id: '流霜护肩', cost: 400 },
                { id: '流霜护腿', cost: 400 },
                { id: '流霜靴', cost: 400 },
                { id: '流霜珠', cost: 500 },
                { id: '沧澜盔', cost: 1000 },
                { id: '沧澜甲', cost: 1200 },
                { id: '沧澜护肩', cost: 1000 },
                { id: '沧澜护腿', cost: 1000 },
                { id: '沧澜靴', cost: 1000 },
                { id: '沧澜珠', cost: 1200 },
                { id: '沧海盔', cost: 2000 },
                { id: '沧海甲', cost: 2500 },
                { id: '沧海护肩', cost: 2000 },
                { id: '沧海护腿', cost: 2000 },
                { id: '沧海靴', cost: 2000 },
                { id: '沧海珠', cost: 2500 },
                { id: '水月心经', cost: 480 },
                { id: '寒江剑法', cost: 1950 },
                { id: '沧澜水皇诀', cost: 4900 },
                { id: '沧海无量潮', cost: 8900 },
                { id: '水纹剑', cost: 950 },
                { id: '流霜玉佩', cost: 2900 },
                { id: '沧澜珠', cost: 6800 },
                { id: '沧海镜', cost: 14500 },
                { id: '水月丹', cost: 190 },
                { id: '寒江丹', cost: 780 },
                { id: '沧澜丹', cost: 2400 },
                { id: '沧海丹', cost: 5800 },
                { id: '水月弟子令', cost: 480 },
                { id: '流霜精英令', cost: 1900 },
                { id: '沧澜核心令', cost: 4900 },
                { id: '沧海长老令', cost: 9800 }
            ]
        },
        'yanhuo': {
            name: '炎火殿贡献商店',
            items: [
                { id: '回春丹', cost: 20 },
                { id: '聚灵散', cost: 30 },
                { id: '赤焰盔', cost: 150 },
                { id: '赤焰甲', cost: 200 },
                { id: '赤焰护肩', cost: 150 },
                { id: '赤焰护腿', cost: 150 },
                { id: '赤焰靴', cost: 150 },
                { id: '赤焰杖', cost: 200 },
                { id: '焚天盔', cost: 400 },
                { id: '焚天甲', cost: 500 },
                { id: '焚天护肩', cost: 400 },
                { id: '焚天护腿', cost: 400 },
                { id: '焚天靴', cost: 400 },
                { id: '焚天杖', cost: 500 },
                { id: '炎狱盔', cost: 1000 },
                { id: '炎狱甲', cost: 1200 },
                { id: '炎狱护肩', cost: 1000 },
                { id: '炎狱护腿', cost: 1000 },
                { id: '炎狱靴', cost: 1000 },
                { id: '炎狱杖', cost: 1200 },
                { id: '九天盔', cost: 2000 },
                { id: '九天甲', cost: 2500 },
                { id: '九天护肩', cost: 2000 },
                { id: '九天护腿', cost: 2000 },
                { id: '九天靴', cost: 2000 },
                { id: '九天杖', cost: 2500 },
                { id: '炎火基础诀', cost: 520 },
                { id: '燎原火典', cost: 2100 },
                { id: '大焚天心法', cost: 5200 },
                { id: '九天焚世炎', cost: 9500 },
                { id: '火纹刀', cost: 1050 },
                { id: '焚天坠', cost: 3200 },
                { id: '炎狱印', cost: 7200 },
                { id: '九天炎剑', cost: 16000 },
                { id: '炎火丹', cost: 220 },
                { id: '燎原丹', cost: 850 },
                { id: '焚天丹', cost: 2600 },
                { id: '九天丹', cost: 6500 },
                { id: '炎火弟子令', cost: 520 },
                { id: '焚天精英令', cost: 2100 },
                { id: '炎狱核心令', cost: 5200 },
                { id: '九天长老令', cost: 10000 }
            ]
        },
        'huangtu': {
            name: '皇土阁贡献商店',
            items: [
                { id: '回春丹', cost: 20 },
                { id: '聚灵散', cost: 30 },
                { id: '黄土盔', cost: 150 },
                { id: '黄土甲', cost: 200 },
                { id: '黄土护肩', cost: 150 },
                { id: '黄土护腿', cost: 150 },
                { id: '黄土靴', cost: 150 },
                { id: '黄土棍', cost: 200 },
                { id: '磐石盔', cost: 400 },
                { id: '磐石甲', cost: 500 },
                { id: '磐石护肩', cost: 400 },
                { id: '磐石护腿', cost: 400 },
                { id: '磐石靴', cost: 400 },
                { id: '磐石棍', cost: 500 },
                { id: '镇岳盔', cost: 1000 },
                { id: '镇岳甲', cost: 1200 },
                { id: '镇岳护肩', cost: 1000 },
                { id: '镇岳护腿', cost: 1000 },
                { id: '镇岳靴', cost: 1000 },
                { id: '镇岳棍', cost: 1200 },
                { id: '万岳盔', cost: 2000 },
                { id: '万岳甲', cost: 2500 },
                { id: '万岳护肩', cost: 2000 },
                { id: '万岳护腿', cost: 2000 },
                { id: '万岳靴', cost: 2000 },
                { id: '万岳棍', cost: 2500 },
                { id: '厚土诀', cost: 460 },
                { id: '镇山掌法', cost: 1800 },
                { id: '玄天镇岳功', cost: 4700 },
                { id: '五岳镇神印', cost: 8700 },
                { id: '土纹盾', cost: 920 },
                { id: '磐石佩', cost: 2700 },
                { id: '镇岳印', cost: 6300 },
                { id: '万岳鼎', cost: 15000 },
                { id: '厚土丹', cost: 185 },
                { id: '镇山丹', cost: 720 },
                { id: '镇岳丹', cost: 2200 },
                { id: '万岳丹', cost: 5600 },
                { id: '皇土弟子令', cost: 460 },
                { id: '磐石精英令', cost: 1800 },
                { id: '镇岳核心令', cost: 4700 },
                { id: '万岳长老令', cost: 9200 }
            ]
        }
    },
    
    ADVENTURES: {
        low: {
            chance: 10,
            unlockRealm: '炼气1层',
            events: [
                {
                    id: 'eat-recluse',
                    name: '偶遇隐世修士',
                    description: '食用饭菜后，偶遇一位隐世修士，对方见你根骨尚可，赠予你少量灵力。',
                    scenes: ['eat'],
                    rewards: {
                        mana: 50
                    },
                    noBattle: true
                },
                {
                    id: 'eat-spirit-herb',
                    name: '灵草佳肴',
                    description: '这饭菜中居然含有灵仙草成分！食用后感觉神清气爽。',
                    scenes: ['eat'],
                    rewards: {
                        mana: 30,
                        hp: 20
                    },
                    noBattle: true
                },
                {
                    id: 'sleep-dream-spirit',
                    name: '梦中悟道',
                    description: '睡梦中你领悟了修仙小技巧，醒来后灵力有了小幅提升！',
                    scenes: ['sleep'],
                    rewards: {
                        mana: 80
                    },
                    noBattle: true
                },
                {
                    id: 'sleep-water-blessing',
                    name: '水灵加持',
                    description: '梦见水灵仙子赐福，醒来后感觉气血恢复速度提升了！',
                    scenes: ['sleep'],
                    sects: ['shuiyue'],
                    rewards: {
                        mana: 60
                    },
                    noBattle: true
                }
            ]
        },
        mid: {
            chance: 8,
            unlockRealm: '筑基期',
            events: [
                {
                    id: 'gather-double-herb',
                    name: '隐藏草药丛',
                    description: '采集时发现了一片隐藏的草药丛！可以额外采集3株灵草。',
                    scenes: ['gather'],
                    sects: ['cuiyun'],
                    rewards: {
                        items: ['灵仙草', '灵仙草', '灵仙草'],
                        mana: 150
                    },
                    noBattle: true
                },
                {
                    id: 'gather-fire-beast',
                    name: '火焰灵韵',
                    description: '采集火灵花时触发火焰灵韵！一只火纹兽被惊动了，击败它可获得双倍火灵花！',
                    scenes: ['gather'],
                    sects: ['liuhuo'],
                    monster: 'fire-wolf',
                    rewards: {
                        items: ['火灵花', '火灵花'],
                        mana: 150
                    }
                },
                {
                    id: 'monster-elite',
                    name: '精英妖兽',
                    description: '斩杀妖兽时，居然出现了一只精英版本！击败它可获得额外材料！',
                    scenes: ['monster'],
                    monster: 'golden-eagle',
                    rewards: {
                        items: ['金雕羽', '金雕爪', '金雕内丹'],
                        mana: 200,
                        gold: 30
                    }
                }
            ]
        },
        high: {
            chance: 5,
            unlockRealm: '化神期',
            events: [
                {
                    id: 'cultivate-spirit-resonance',
                    name: '木灵共鸣',
                    description: '修炼时突然触发木灵共鸣！千年灵草的气息从翠竹林深处传来，快去采集吧！',
                    scenes: ['cultivate'],
                    sects: ['cuiyun'],
                    monster: 'ice-bear',
                    rewards: {
                        items: ['千年灵草', '功法碎片'],
                        mana: 500
                    }
                },
                {
                    id: 'secret-alchemy-room',
                    name: '炼丹密室',
                    description: '探索时发现一间尘封的炼丹密室！破解简单机关后，获得了高阶炼丹材料！',
                    scenes: ['secret'],
                    rewards: {
                        items: ['高阶炼丹材料', '功法碎片', '功法碎片'],
                        mana: 400,
                        gold: 100
                    },
                    noBattle: true
                }
            ]
        },
        special: {
            chance: 8,
            events: [
                {
                    id: 'town-lost-disciple',
                    name: '迷路的弟子',
                    description: '闲逛时遇到一位迷路的门派弟子，指引他返回门派吧！',
                    scenes: ['town'],
                    rewards: {
                        mana: 100,
                        items: ['回春丹']
                    },
                    noBattle: true
                },
                {
                    id: 'wild-injured-pet',
                    name: '受伤的灵宠',
                    description: '野外休息时发现一只受伤的灵宠，选择救治它吧！',
                    scenes: ['wild'],
                    rewards: {
                        items: ['灵宠材料'],
                        mana: -50
                    },
                    noBattle: true
                },
                {
                    id: 'shop-double-sale',
                    name: '限时福利',
                    description: '商店NPC推出限时福利！购买道具可获得双倍数量！',
                    scenes: ['shop'],
                    special: 'double-buy',
                    noBattle: true
                },
                {
                    id: 'travel-spirit-fog',
                    name: '灵雾奇遇',
                    description: '跨地图跳转时偶遇一片灵雾！穿过灵雾后感觉灵力提升了！',
                    scenes: ['travel'],
                    rewards: {
                        mana: 100
                    },
                    noBattle: true
                }
            ]
        }
    },
    
    ADVENTURE_SCENE_TRIGGER: {
        eat: {
            maps: ['qinghe-town', 'black-market', 'floating-market', 'cuiyun-town', 'liuhuo-town', 'shuiyue-town', 'jinyang-town', 'qingyun-town']
        },
        sleep: {
            maps: ['qinghe-town', 'qingyun-mountain', 'cuiyun-mountain', 'liuhuo-mountain', 'shuiyue-mountain', 'jinyang-mountain']
        },
        gather: {
            maps: ['qingyun-mountain', 'cuiyun-mountain', 'liuhuo-mountain', 'shuiyue-mountain', 'jinyang-mountain', 'poison-valley', 'ancient-temple', 'eastern-sea', 'snowfield', 'desert']
        },
        monster: {
            maps: ['qingyun-mountain', 'cuiyun-mountain', 'liuhuo-mountain', 'shuiyue-mountain', 'jinyang-mountain', 'poison-valley', 'ancient-temple', 'eastern-sea', 'snowfield', 'desert']
        },
        cultivate: {
            maps: ['qingyun-mountain', 'cuiyun-mountain', 'liuhuo-mountain', 'shuiyue-mountain', 'jinyang-mountain']
        },
        secret: {
            maps: ['ancient-temple', 'dragon-palace', 'ice-palace']
        },
        town: {
            maps: ['qinghe-town', 'black-market', 'floating-market', 'cuiyun-town', 'liuhuo-town', 'shuiyue-town', 'jinyang-town', 'qingyun-town']
        },
        wild: {
            maps: ['poison-valley', 'ancient-temple', 'eastern-sea', 'snowfield', 'desert']
        },
        shop: {
            maps: ['qinghe-town', 'black-market', 'floating-market']
        },
        travel: {
            maps: ['all']
        }
    },
    
    MAGIC_WEAPONS: {
        magicWeapons: [
            {
                id: "gold_qi_basic",
                name: "铁纹环",
                root: "金灵根",
                realm: "炼气期",
                quality: "普通",
                mainAttr: { "type": "攻击", "min": 5, "max": 10 },
                randomAttrCount: 1,
                randomAttrPool: ["攻击", "防御", "破甲"],
                skillDesc: "小幅提升攻击力，被攻击时微弱反弹伤害",
                source: "商店购买、小怪掉落",
                price: 100
            },
            {
                id: "gold_qi_fine",
                name: "鎏金锥",
                root: "金灵根",
                realm: "炼气期",
                quality: "精良",
                mainAttr: { "type": "攻击", "min": 12, "max": 18 },
                randomAttrCount: 2,
                randomAttrPool: ["攻击", "破甲", "暴击率", "金系伤害"],
                skillDesc: "攻击附带锐金剑气，小幅破甲，反弹几率提升",
                source: "小怪概率掉落",
                price: 300
            },
            {
                id: "gold_qi_legend",
                name: "碎金令",
                root: "金灵根",
                realm: "炼气期",
                quality: "传说",
                mainAttr: { "type": "破甲", "min": 5, "max": 8 },
                randomAttrCount: 3,
                randomAttrPool: ["攻击", "暴击伤害", "反弹", "伤害减免"],
                skillDesc: "锐金破甲，无视敌方10%防御，攻击有概率迸发金芒",
                source: "秘境BOSS、炼制",
                price: 1000
            },
            {
                id: "gold_qi_myth",
                name: "乾元金罡印",
                root: "金灵根",
                realm: "炼气期",
                quality: "神话",
                mainAttr: { "type": "攻击", "min": 80, "max": 120 },
                randomAttrCount: 3,
                randomAttrPool: ["破甲", "暴击率", "濒死免伤", "反弹"],
                skillDesc: "金罡护体，受击概率触发短暂无敌，反弹30%伤害",
                source: "顶级秘境BOSS、高阶炼制",
                price: 5000
            },
            {
                id: "wood_qi_basic",
                name: "青藤索",
                root: "木灵根",
                realm: "炼气期",
                quality: "普通",
                mainAttr: { "type": "回血", "min": 1, "max": 2 },
                randomAttrCount: 1,
                randomAttrPool: ["气血上限", "防御", "木系伤害"],
                skillDesc: "概率束缚敌人1秒，自身微弱回血",
                source: "商店购买、小怪掉落",
                price: 100
            },
            {
                id: "wood_qi_fine",
                name: "灵木杖",
                root: "木灵根",
                realm: "炼气期",
                quality: "精良",
                mainAttr: { "type": "回血", "min": 2, "max": 4 },
                randomAttrCount: 2,
                randomAttrPool: ["气血上限", "木系伤害", "治疗效果"],
                skillDesc: "束缚时间延长，附带毒伤，持续恢复气血",
                source: "小怪概率掉落",
                price: 300
            },
            {
                id: "wood_qi_legend",
                name: "回春藤",
                root: "木灵根",
                realm: "炼气期",
                quality: "传说",
                mainAttr: { "type": "治疗效果", "min": 15, "max": 20 },
                randomAttrCount: 3,
                randomAttrPool: ["气血上限", "回血", "减伤", "击杀回血"],
                skillDesc: "束缚期间自身快速回血，敌人无法移动",
                source: "秘境BOSS、炼制",
                price: 1000
            },
            {
                id: "water_qi_basic",
                name: "水玉簪",
                root: "水灵根",
                realm: "炼气期",
                quality: "普通",
                mainAttr: { "type": "水系伤害", "min": 3, "max": 5 },
                randomAttrCount: 1,
                randomAttrPool: ["移速", "防御", "水抗"],
                skillDesc: "提升水伤，移动速度小幅加快",
                source: "商店购买、小怪掉落",
                price: 100
            },
            {
                id: "water_qi_fine",
                name: "凝水佩",
                root: "水灵根",
                realm: "炼气期",
                quality: "精良",
                mainAttr: { "type": "水系伤害", "min": 6, "max": 9 },
                randomAttrCount: 2,
                randomAttrPool: ["减速概率", "水抗", "移速"],
                skillDesc: "攻击附带水浸，降低敌人移速",
                source: "小怪概率掉落",
                price: 300
            },
            {
                id: "water_qi_legend",
                name: "寒水镜",
                root: "水灵根",
                realm: "炼气期",
                quality: "传说",
                mainAttr: { "type": "冻结概率", "min": 3, "max": 5 },
                randomAttrCount: 3,
                randomAttrPool: ["水系伤害", "控制时长", "气血上限", "暴击率"],
                skillDesc: "水浸叠满冻结敌人1秒，冻结期间增伤",
                source: "秘境BOSS、炼制",
                price: 1000
            },
            {
                id: "fire_qi_basic",
                name: "火纹石",
                root: "火灵根",
                realm: "炼气期",
                quality: "普通",
                mainAttr: { "type": "灼烧伤害", "min": 2, "max": 4 },
                randomAttrCount: 1,
                randomAttrPool: ["攻击", "火抗", "火系伤害"],
                skillDesc: "攻击附带灼烧，持续掉血",
                source: "商店购买、小怪掉落",
                price: 100
            },
            {
                id: "fire_qi_fine",
                name: "焰光珠",
                root: "火灵根",
                realm: "炼气期",
                quality: "精良",
                mainAttr: { "type": "灼烧伤害", "min": 5, "max": 7 },
                randomAttrCount: 2,
                randomAttrPool: ["火系伤害", "暴击率", "火抗"],
                skillDesc: "灼烧伤害提高，可叠加",
                source: "小怪概率掉落",
                price: 300
            },
            {
                id: "fire_qi_legend",
                name: "焚火符",
                root: "火灵根",
                realm: "炼气期",
                quality: "传说",
                mainAttr: { "type": "火系伤害", "min": 12, "max": 16 },
                randomAttrCount: 3,
                randomAttrPool: ["暴击伤害", "真实伤害", "灼烧时长", "减CD"],
                skillDesc: "灼烧叠满触发爆燃，造成范围爆发伤害",
                source: "秘境BOSS、炼制",
                price: 1000
            },
            {
                id: "earth_qi_basic",
                name: "黄土符",
                root: "土灵根",
                realm: "炼气期",
                quality: "普通",
                mainAttr: { "type": "防御", "min": 5, "max": 8 },
                randomAttrCount: 1,
                randomAttrPool: ["气血上限", "土抗", "减伤"],
                skillDesc: "提升防御，被攻击时微弱减伤",
                source: "商店购买、小怪掉落",
                price: 100
            },
            {
                id: "earth_qi_fine",
                name: "岩纹佩",
                root: "土灵根",
                realm: "炼气期",
                quality: "精良",
                mainAttr: { "type": "防御", "min": 10, "max": 15 },
                randomAttrCount: 2,
                randomAttrPool: ["土系伤害", "眩晕概率", "反弹"],
                skillDesc: "概率触发石肤，进一步减免伤害",
                source: "小怪概率掉落",
                price: 300
            },
            {
                id: "earth_qi_legend",
                name: "镇山印",
                root: "土灵根",
                realm: "炼气期",
                quality: "传说",
                mainAttr: { "type": "伤害减免", "min": 8, "max": 12 },
                randomAttrCount: 3,
                randomAttrPool: ["防御", "气血上限", "反弹", "范围眩晕"],
                skillDesc: "石肤期间反弹伤害，重击可震荡敌人",
                source: "秘境BOSS、炼制",
                price: 1000
            },
            {
                id: "wind_qi_basic",
                name: "风絮符",
                root: "风灵根",
                realm: "炼气期",
                quality: "普通",
                mainAttr: { "type": "闪避", "min": 1, "max": 2 },
                randomAttrCount: 1,
                randomAttrPool: ["移速", "攻击", "风系伤害"],
                skillDesc: "小幅提升移速与闪避",
                source: "商店购买、小怪掉落",
                price: 100
            },
            {
                id: "wind_qi_fine",
                name: "御风佩",
                root: "风灵根",
                realm: "炼气期",
                quality: "精良",
                mainAttr: { "type": "闪避", "min": 2, "max": 3 },
                randomAttrCount: 2,
                randomAttrPool: ["移速", "暴击率", "风系伤害"],
                skillDesc: "闪避成功后短暂加速",
                source: "小怪概率掉落",
                price: 300
            },
            {
                id: "wind_qi_legend",
                name: "疾风环",
                root: "风灵根",
                realm: "炼气期",
                quality: "传说",
                mainAttr: { "type": "移速", "min": 8, "max": 12 },
                randomAttrCount: 3,
                randomAttrPool: ["闪避", "暴击伤害", "风系伤害", "真空伤害"],
                skillDesc: "闪避概率大幅提高，身法如风",
                source: "秘境BOSS、炼制",
                price: 1000
            },
            {
                id: "thunder_qi_basic",
                name: "雷纹符",
                root: "雷灵根",
                realm: "炼气期",
                quality: "普通",
                mainAttr: { "type": "雷系伤害", "min": 3, "max": 5 },
                randomAttrCount: 1,
                randomAttrPool: ["攻击", "麻痹概率", "雷抗"],
                skillDesc: "攻击附带麻痹，轻微减速",
                source: "商店购买、小怪掉落",
                price: 100
            },
            {
                id: "thunder_qi_fine",
                name: "引雷珠",
                root: "雷灵根",
                realm: "炼气期",
                quality: "精良",
                mainAttr: { "type": "麻痹概率", "min": 2, "max": 3 },
                randomAttrCount: 2,
                randomAttrPool: ["雷系伤害", "暴击率", "雷抗"],
                skillDesc: "概率引动落雷，范围伤害并麻痹",
                source: "小怪概率掉落",
                price: 300
            },
            {
                id: "thunder_qi_legend",
                name: "惊雷锥",
                root: "雷灵根",
                realm: "炼气期",
                quality: "传说",
                mainAttr: { "type": "雷系伤害", "min": 12, "max": 16 },
                randomAttrCount: 3,
                randomAttrPool: ["麻痹禁技", "范围伤害", "破甲", "减CD"],
                skillDesc: "麻痹期间敌人无法施法，连续落雷伤害递增",
                source: "秘境BOSS、炼制",
                price: 1000
            },
            {
                id: "ice_qi_basic",
                name: "冰屑符",
                root: "冰灵根",
                realm: "炼气期",
                quality: "普通",
                mainAttr: { "type": "冰系伤害", "min": 3, "max": 5 },
                randomAttrCount: 1,
                randomAttrPool: ["防御", "减速", "冰抗"],
                skillDesc: "攻击附带寒气，降低敌人移速",
                source: "商店购买、小怪掉落",
                price: 100
            },
            {
                id: "ice_qi_fine",
                name: "寒玉佩",
                root: "冰灵根",
                realm: "炼气期",
                quality: "精良",
                mainAttr: { "type": "冻结概率", "min": 1, "max": 2 },
                randomAttrCount: 2,
                randomAttrPool: ["冰系伤害", "冰抗", "减速"],
                skillDesc: "寒气叠加后可冻结敌人0.5秒",
                source: "小怪概率掉落",
                price: 300
            },
            {
                id: "ice_qi_legend",
                name: "玄冰环",
                root: "冰灵根",
                realm: "炼气期",
                quality: "传说",
                mainAttr: { "type": "冻结增伤", "min": 15, "max": 20 },
                randomAttrCount: 3,
                randomAttrPool: ["冰系伤害", "控制时长", "防御", "气血上限"],
                skillDesc: "冻结期间目标受到伤害大幅提升",
                source: "秘境BOSS、炼制",
                price: 1000
            },
            {
                id: "sword_qi_basic",
                name: "铁剑胚",
                root: "剑灵根",
                realm: "炼气期",
                quality: "普通",
                mainAttr: { "type": "攻击", "min": 6, "max": 11 },
                randomAttrCount: 1,
                randomAttrPool: ["暴击率", "剑气伤害", "防御"],
                skillDesc: "小幅提升攻击力，剑招更稳定",
                source: "商店购买、小怪掉落",
                price: 100
            },
            {
                id: "sword_qi_fine",
                name: "精钢剑",
                root: "剑灵根",
                realm: "炼气期",
                quality: "精良",
                mainAttr: { "type": "剑气伤害", "min": 8, "max": 12 },
                randomAttrCount: 2,
                randomAttrPool: ["暴击率", "破甲", "剑系伤害"],
                skillDesc: "攻击概率触发剑气，造成额外伤害",
                source: "小怪概率掉落",
                price: 300
            },
            {
                id: "sword_qi_legend",
                name: "青锋剑",
                root: "剑灵根",
                realm: "炼气期",
                quality: "传说",
                mainAttr: { "type": "剑系伤害", "min": 12, "max": 16 },
                randomAttrCount: 3,
                randomAttrPool: ["暴击伤害", "真实伤害", "穿透", "减CD"],
                skillDesc: "剑气可穿透敌人，伤害翻倍",
                source: "秘境BOSS、炼制",
                price: 1000
            },
            {
                id: "blood_qi_basic",
                name: "血纹符",
                root: "血灵根",
                realm: "炼气期",
                quality: "普通",
                mainAttr: { "type": "吸血", "min": 1, "max": 2 },
                randomAttrCount: 1,
                randomAttrPool: ["攻击", "气血上限", "血系伤害"],
                skillDesc: "攻击吸取少量气血",
                source: "商店购买、小怪掉落",
                price: 100
            },
            {
                id: "blood_qi_fine",
                name: "血玉佩",
                root: "血灵根",
                realm: "炼气期",
                quality: "精良",
                mainAttr: { "type": "吸血", "min": 2, "max": 3 },
                randomAttrCount: 2,
                randomAttrPool: ["残血增伤", "血系伤害", "回血"],
                skillDesc: "吸血比例提升，血量越低伤害越高",
                source: "小怪概率掉落",
                price: 300
            },
            {
                id: "blood_qi_legend",
                name: "噬血环",
                root: "血灵根",
                realm: "炼气期",
                quality: "传说",
                mainAttr: { "type": "残血增伤", "min": 15, "max": 20 },
                randomAttrCount: 3,
                randomAttrPool: ["吸血", "击杀回血", "护盾", "减伤"],
                skillDesc: "吸血同时恢复灵力，残血时吸血翻倍",
                source: "秘境BOSS、炼制",
                price: 1000
            },
            {
                id: "space_blood_basic",
                name: "虚空血纹符",
                root: "先天空间灵根",
                realm: "炼气期",
                quality: "普通",
                mainAttr: { "type": "吸血", "min": 2, "max": 4 },
                randomAttrCount: 1,
                randomAttrPool: ["空间伤害", "血系伤害", "气血上限"],
                skillDesc: "空间穿梭中吸取敌人气血，小幅提升空间攻击",
                source: "秘境掉落、空间裂隙",
                price: 200
            },
            {
                id: "space_blood_fine",
                name: "虚空心血佩",
                root: "先天空间灵根",
                realm: "炼气期",
                quality: "精良",
                mainAttr: { "type": "空间伤害", "min": 8, "max": 12 },
                randomAttrCount: 2,
                randomAttrPool: ["吸血", "血系伤害", "空间穿透", "气血上限"],
                skillDesc: "空间穿透敌人，吸取大量气血，空间伤害大幅提升",
                source: "空间秘境BOSS",
                price: 600
            },
            {
                id: "space_blood_legend",
                name: "虚空血魂环",
                root: "先天空间灵根",
                realm: "炼气期",
                quality: "传说",
                mainAttr: { "type": "吸血", "min": 8, "max": 12 },
                randomAttrCount: 3,
                randomAttrPool: ["空间伤害", "血系伤害", "空间穿透", "暴击率"],
                skillDesc: "虚空穿梭吸取敌人血魂，吸血同时造成巨量空间伤害",
                source: "空间裂隙深处",
                price: 2000
            },
            {
                id: "space_blood_myth",
                name: "虚天神血珠",
                root: "先天空间灵根",
                realm: "炼气期",
                quality: "神话",
                mainAttr: { "type": "空间伤害", "min": 60, "max": 80 },
                randomAttrCount: 3,
                randomAttrPool: ["吸血", "血系伤害", "空间穿透", "暴击伤害", "濒死免伤"],
                skillDesc: "虚天神血，空间穿梭吸取神血，可撕裂空间造成毁天灭地伤害",
                source: "虚空之主掉落",
                price: 10000
            },
            {
                id: "chaos_all_basic",
                name: "混沌原石",
                root: "混沌灵根",
                realm: "炼气期",
                quality: "普通",
                mainAttr: { "type": "全属性", "min": 3, "max": 5 },
                randomAttrCount: 1,
                randomAttrPool: ["金系伤害", "木系伤害", "水系伤害", "火系伤害", "土系伤害"],
                skillDesc: "混沌原石，可适配所有灵根，小幅提升全属性",
                source: "混沌秘境、时空裂隙",
                price: 300
            },
            {
                id: "chaos_all_fine",
                name: "混沌玉佩",
                root: "混沌灵根",
                realm: "炼气期",
                quality: "精良",
                mainAttr: { "type": "全属性", "min": 8, "max": 12 },
                randomAttrCount: 2,
                randomAttrPool: ["金系伤害", "木系伤害", "水系伤害", "火系伤害", "土系伤害", "风系伤害", "雷系伤害"],
                skillDesc: "混沌玉佩，可适配所有灵根，大幅提升全属性",
                source: "混沌秘境BOSS",
                price: 900
            },
            {
                id: "chaos_all_legend",
                name: "混沌环",
                root: "混沌灵根",
                realm: "炼气期",
                quality: "传说",
                mainAttr: { "type": "全属性", "min": 15, "max": 20 },
                randomAttrCount: 3,
                randomAttrPool: ["金系伤害", "木系伤害", "水系伤害", "火系伤害", "土系伤害", "风系伤害", "雷系伤害", "冰系伤害"],
                skillDesc: "混沌环，可完美适配所有灵根，全属性大幅提升",
                source: "混沌深渊",
                price: 3000
            },
            {
                id: "chaos_all_myth",
                name: "混沌珠",
                root: "混沌灵根",
                realm: "炼气期",
                quality: "神话",
                mainAttr: { "type": "全属性", "min": 80, "max": 120 },
                randomAttrCount: 3,
                randomAttrPool: ["金系伤害", "木系伤害", "水系伤害", "火系伤害", "土系伤害", "风系伤害", "雷系伤害", "冰系伤害", "剑系伤害", "血系伤害", "暴击率", "暴击伤害"],
                skillDesc: "混沌珠，内含三千大道，可完美适配所有灵根，全属性巨幅提升",
                source: "混沌之主掉落",
                price: 15000
            }
        ]
    },
    
    DUNGEON_SKILLS: {
        claw_swipe: { name: '利爪横扫', type: 'atk', rate: 0.4, dmg: 1.2 },
        poison_bite: { name: '毒牙撕咬', type: 'atk', rate: 0.4, dmg: 1.1, dot: 5, round: 2 },
        snake_poison: { name: '蛇毒喷吐', type: 'atk', rate: 0.6, dmg: 1.5, dot: 15, round: 3 },
        moon_crash: { name: '残月冲击', type: 'atk', rate: 0.6, dmg: 1.8 },
        fire_claw: { name: '火焰爪击', type: 'atk', rate: 0.5, dmg: 1.3 },
        ghost_scream: { name: '怨灵尖啸', type: 'atk', rate: 0.5, dmg: 1.0, stun: 1 },
        fire_breath: { name: '烈焰吐息', type: 'aoe', rate: 0.7, dmg: 2.0 },
        soul_absorb: { name: '噬魂术', type: 'atk', rate: 0.7, dmg: 1.5, heal: 0.5 },
        ice_armor: { name: '玄冰甲', type: 'buff', rate: 1.0, shield: 0.3 },
        thunder_storm: { name: '紫电雷云', type: 'aoe', rate: 0.8, dmg: 2.2 },
        star_explode: { name: '陨星爆裂', type: 'aoe', rate: 0.8, dmg: 2.5 }
    },
    
    DUNGEON_MONSTERS: {
        zj_normal_1: { name: '黑风蛇', realm: '筑基期', hp: 560, maxHp: 560, attack: 130, defense: 24, cultivation: 90, skill: 'claw_swipe', element: '土', rarity: 'common' },
        zj_normal_2: { name: '残月狼', realm: '筑基期', hp: 640, maxHp: 640, attack: 140, defense: 28, cultivation: 100, skill: 'poison_bite', element: '木', rarity: 'common' },
        zj_elite_1: { name: '精英·黑风蟒', realm: '筑基期', hp: 1200, maxHp: 1200, attack: 260, defense: 48, cultivation: 240, skill: 'snake_poison', element: '土', rarity: 'rare' },
        zj_boss_1: { id: 'zj_boss_1', name: '黑风蛇王', realm: '筑基期', hp: 7600, maxHp: 7600, attack: 440, defense: 70, cultivation: 1600, skill: 'snake_poison', element: '土', rarity: 'epic' },
        zj_boss_2: { id: 'zj_boss_2', name: '残月狼君', realm: '筑基期', hp: 9600, maxHp: 9600, attack: 520, defense: 84, cultivation: 2200, skill: 'moon_crash', element: '木', rarity: 'epic' },
        jd_normal_1: { id: 'jd_normal_1', name: '赤焰狐', realm: '金丹期', hp: 3600, maxHp: 3600, attack: 640, defense: 110, cultivation: 400, skill: 'fire_claw', element: '火', rarity: 'common' },
        jd_normal_2: { id: 'jd_normal_2', name: '幽影鬼', realm: '金丹期', hp: 3200, maxHp: 3200, attack: 580, defense: 100, cultivation: 360, skill: 'ghost_scream', element: '木', rarity: 'common' },
        jd_elite_1: { id: 'jd_elite_1', name: '精英·焰尾狐', realm: '金丹期', hp: 7200, maxHp: 7200, attack: 1200, defense: 190, cultivation: 1000, skill: 'fire_breath', element: '火', rarity: 'rare' },
        jd_boss_1: { id: 'jd_boss_1', name: '赤焰狮王', realm: '金丹期', hp: 44000, maxHp: 44000, attack: 1600, defense: 240, cultivation: 10000, skill: 'fire_breath', element: '火', rarity: 'epic' },
        jd_boss_2: { id: 'jd_boss_2', name: '万魂鬼主', realm: '金丹期', hp: 56000, maxHp: 56000, attack: 1900, defense: 300, cultivation: 13000, skill: 'soul_absorb', element: '木', rarity: 'epic' },
        jd_boss_3: { id: 'jd_boss_3', name: '玄冰巨蟾', realm: '金丹期', hp: 70000, maxHp: 70000, attack: 2200, defense: 360, cultivation: 16000, skill: 'ice_armor', element: '水', rarity: 'epic' }
    },
    
    DUNGEONS: [
        // 炼气期秘境
        {
            id: 10,
            name: '灵草谷',
            requireRealm: '炼气期',
            waves: [
                [{ t: 'normal', id: 'zj_normal_1', num: 1 }],
                [{ t: 'normal', id: 'zj_normal_1', num: 2 }],
                [{ t: 'elite', id: 'zj_elite_1', rate: 0.5 }]
            ],
            rewards: [
                { name: '下品灵石', rate: 1, min: 10, max: 20 },
                { name: '回春丹', rate: 0.8, min: 3, max: 5 },
                { name: '铁剑', rate: 0.6, min: 1, max: 1 },
                { name: '布甲', rate: 0.6, min: 1, max: 1 },
                { name: '铁纹环', rate: 0.3, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 150, max: 250 }
            ]
        },
        {
            id: 1010,
            name: '灵草谷（困难）',
            requireRealm: '炼气期',
            difficulty: 'hard',
            waves: [
                [{ t: 'normal', id: 'zj_normal_1', num: 2 }, { t: 'elite', id: 'zj_elite_1', rate: 0.3 }],
                [{ t: 'normal', id: 'zj_normal_1', num: 3 }, { t: 'elite', id: 'zj_elite_1', rate: 0.5 }],
                [{ t: 'elite', id: 'zj_elite_1', rate: 0.8 }]
            ],
            rewards: [
                { name: '下品灵石', rate: 1, min: 20, max: 30 },
                { name: '聚气丹', rate: 0.8, min: 2, max: 4 },
                { name: '精钢剑', rate: 0.5, min: 1, max: 1 },
                { name: '皮甲', rate: 0.5, min: 1, max: 1 },
                { bookId: 'fb01', rate: 0.3, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 250, max: 400 }
            ]
        },
        {
            id: 11,
            name: '妖兽森林',
            requireRealm: '炼气期',
            waves: [
                [{ t: 'normal', id: 'zj_normal_2', num: 1 }],
                [{ t: 'normal', id: 'zj_normal_2', num: 2 }],
                [{ t: 'elite', id: 'zj_elite_1', rate: 0.4 }]
            ],
            rewards: [
                { name: '下品灵石', rate: 1, min: 12, max: 25 },
                { name: '回春丹', rate: 0.7, min: 2, max: 4 },
                { name: '铁剑', rate: 0.5, min: 1, max: 1 },
                { name: '布甲', rate: 0.5, min: 1, max: 1 },
                { name: '鎏金锥', rate: 0.2, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 170, max: 270 }
            ]
        },
        {
            id: 1110,
            name: '妖兽森林（困难）',
            requireRealm: '炼气期',
            difficulty: 'hard',
            waves: [
                [{ t: 'normal', id: 'zj_normal_2', num: 2 }, { t: 'elite', id: 'zj_elite_1', rate: 0.4 }],
                [{ t: 'normal', id: 'zj_normal_2', num: 3 }, { t: 'elite', id: 'zj_elite_1', rate: 0.6 }],
                [{ t: 'elite', id: 'zj_elite_1', rate: 0.9 }]
            ],
            rewards: [
                { name: '下品灵石', rate: 1, min: 25, max: 35 },
                { name: '聚气丹', rate: 0.9, min: 3, max: 5 },
                { name: '精钢剑', rate: 0.6, min: 1, max: 1 },
                { name: '皮甲', rate: 0.6, min: 1, max: 1 },
                { bookId: 'fb02', rate: 0.3, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 300, max: 450 }
            ]
        },
        // 筑基期秘境
        {
            id: 101,
            name: '黑风洞',
            requireRealm: '筑基期',
            waves: [
                [{ t: 'normal', id: 'zj_normal_1', num: 2 }],
                [{ t: 'normal', id: 'zj_normal_1', num: 2 }, { t: 'elite', id: 'zj_elite_1', rate: 0.3 }],
                [{ t: 'boss', id: 'zj_boss_1' }]
            ],
            rewards: [
                { name: '中品灵石', rate: 1, min: 5, max: 10 },
                { name: '回春丹', rate: 0.8, min: 2, max: 4 },
                { name: '铁剑', rate: 0.6, min: 1, max: 1 },
                { name: '布甲', rate: 0.6, min: 1, max: 1 },
                { name: '铁纹环', rate: 0.4, min: 1, max: 1 },
                { bookId: 'fb01', rate: 0.3, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 350, max: 550 }
            ]
        },
        {
            id: 1011,
            name: '黑风洞（困难）',
            requireRealm: '筑基期',
            difficulty: 'hard',
            waves: [
                [{ t: 'normal', id: 'zj_normal_1', num: 3 }, { t: 'elite', id: 'zj_elite_1', rate: 0.5 }],
                [{ t: 'normal', id: 'zj_normal_1', num: 3 }, { t: 'elite', id: 'zj_elite_1', rate: 0.7 }],
                [{ t: 'boss', id: 'zj_boss_1' }, { t: 'elite', id: 'zj_elite_1', rate: 0.5 }]
            ],
            rewards: [
                { name: '中品灵石', rate: 1, min: 10, max: 20 },
                { name: '筑基丹', rate: 0.8, min: 2, max: 4 },
                { bookId: 'fb05', rate: 0.4, min: 1, max: 1 },
                { bookId: 'fb06', rate: 0.3, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 550, max: 850 }
            ]
        },
        {
            id: 102,
            name: '残月谷',
            requireRealm: '筑基期',
            waves: [
                [{ t: 'normal', id: 'zj_normal_2', num: 2 }],
                [{ t: 'normal', id: 'zj_normal_2', num: 3 }, { t: 'elite', id: 'zj_elite_1', rate: 0.4 }],
                [{ t: 'boss', id: 'zj_boss_2' }]
            ],
            rewards: [
                { name: '中品灵石', rate: 1, min: 8, max: 15 },
                { name: '筑基丹', rate: 0.3, min: 1, max: 1 },
                { name: '精钢剑', rate: 0.5, min: 1, max: 1 },
                { name: '皮甲', rate: 0.5, min: 1, max: 1 },
                { name: '鎏金锥', rate: 0.3, min: 1, max: 1 },
                { bookId: 'fb02', rate: 0.2, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 400, max: 600 }
            ]
        },
        {
            id: 1021,
            name: '残月谷（困难）',
            requireRealm: '筑基期',
            difficulty: 'hard',
            waves: [
                [{ t: 'normal', id: 'zj_normal_2', num: 3 }, { t: 'elite', id: 'zj_elite_1', rate: 0.6 }],
                [{ t: 'normal', id: 'zj_normal_2', num: 4 }, { t: 'elite', id: 'zj_elite_1', rate: 0.8 }],
                [{ t: 'boss', id: 'zj_boss_2' }, { t: 'elite', id: 'zj_elite_1', rate: 0.6 }]
            ],
            rewards: [
                { name: '中品灵石', rate: 1, min: 12, max: 20 },
                { name: '筑基丹', rate: 0.9, min: 3, max: 5 },
                { bookId: 'fb04', rate: 0.4, min: 1, max: 1 },
                { bookId: 'fb06', rate: 0.3, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 650, max: 950 }
            ]
        },
        // 金丹期秘境
        {
            id: 201,
            name: '赤焰窟',
            requireRealm: '金丹期',
            waves: [
                [{ t: 'normal', id: 'jd_normal_1', num: 2 }],
                [{ t: 'normal', id: 'jd_normal_1', num: 2 }, { t: 'elite', id: 'jd_elite_1', rate: 0.4 }],
                [{ t: 'boss', id: 'jd_boss_1' }]
            ],
            rewards: [
                { name: '上品灵石', rate: 1, min: 3, max: 8 },
                { name: '筑基丹', rate: 0.6, min: 1, max: 2 },
                { name: '长剑', rate: 0.5, min: 1, max: 1 },
                { name: '玄铁甲', rate: 0.5, min: 1, max: 1 },
                { name: '碎金令', rate: 0.3, min: 1, max: 1 },
                { bookId: 'gd01', rate: 0.2, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 850, max: 1250 }
            ]
        },
        {
            id: 2011,
            name: '赤焰窟（困难）',
            requireRealm: '金丹期',
            difficulty: 'hard',
            waves: [
                [{ t: 'normal', id: 'jd_normal_1', num: 3 }, { t: 'elite', id: 'jd_elite_1', rate: 0.6 }],
                [{ t: 'normal', id: 'jd_normal_1', num: 3 }, { t: 'elite', id: 'jd_elite_1', rate: 0.8 }],
                [{ t: 'boss', id: 'jd_boss_1' }, { t: 'elite', id: 'jd_elite_1', rate: 0.6 }]
            ],
            rewards: [
                { name: '上品灵石', rate: 1, min: 6, max: 12 },
                { name: '金丹突破丹', rate: 0.7, min: 2, max: 3 },
                { name: '赤焰剑', rate: 0.2, min: 1, max: 1 },
                { name: '赤焰符', rate: 0.15, min: 1, max: 1 },
                { bookId: 'gd05', rate: 0.4, min: 1, max: 1 },
                { bookId: 'gd07', rate: 0.2, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 1250, max: 1850 }
            ]
        },
        {
            id: 202,
            name: '万魂泽',
            requireRealm: '金丹期',
            waves: [
                [{ t: 'normal', id: 'jd_normal_2', num: 2 }],
                [{ t: 'normal', id: 'jd_normal_2', num: 2 }, { t: 'elite', id: 'jd_elite_1', rate: 0.4 }],
                [{ t: 'boss', id: 'jd_boss_2' }]
            ],
            rewards: [
                { name: '上品灵石', rate: 1, min: 4, max: 9 },
                { name: '金丹突破丹', rate: 0.4, min: 1, max: 1 },
                { name: '长剑', rate: 0.5, min: 1, max: 1 },
                { name: '玄铁甲', rate: 0.5, min: 1, max: 1 },
                { name: '碎金令', rate: 0.3, min: 1, max: 1 },
                { bookId: 'gd02', rate: 0.2, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 950, max: 1350 }
            ]
        },
        {
            id: 2021,
            name: '万魂泽（困难）',
            requireRealm: '金丹期',
            difficulty: 'hard',
            waves: [
                [{ t: 'normal', id: 'jd_normal_2', num: 3 }, { t: 'elite', id: 'jd_elite_1', rate: 0.6 }],
                [{ t: 'normal', id: 'jd_normal_2', num: 3 }, { t: 'elite', id: 'jd_elite_1', rate: 0.8 }],
                [{ t: 'boss', id: 'jd_boss_2' }, { t: 'elite', id: 'jd_elite_1', rate: 0.6 }]
            ],
            rewards: [
                { name: '上品灵石', rate: 1, min: 7, max: 13 },
                { name: '金丹突破丹', rate: 0.8, min: 2, max: 4 },
                { name: '万魂戒', rate: 0.2, min: 1, max: 1 },
                { name: '万魂珠', rate: 0.15, min: 1, max: 1 },
                { bookId: 'gd04', rate: 0.4, min: 1, max: 1 },
                { bookId: 'gd08', rate: 0.2, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 1350, max: 1950 }
            ]
        },
        // 元婴期秘境
        {
            id: 301,
            name: '玄冰洞',
            requireRealm: '元婴期',
            waves: [
                [{ t: 'normal', id: 'jd_normal_1', num: 3 }],
                [{ t: 'normal', id: 'jd_normal_1', num: 3 }, { t: 'elite', id: 'jd_elite_1', rate: 0.5 }],
                [{ t: 'boss', id: 'jd_boss_3' }]
            ],
            rewards: [
                { name: '极品灵石', rate: 1, min: 2, max: 5 },
                { name: '元婴突破丹', rate: 0.5, min: 1, max: 1 },
                { name: '碎金令', rate: 0.6, min: 1, max: 1 },
                { bookId: 'yy01', rate: 0.3, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 2050, max: 3050 }
            ]
        },
        {
            id: 3011,
            name: '玄冰洞（困难）',
            requireRealm: '元婴期',
            difficulty: 'hard',
            waves: [
                [{ t: 'normal', id: 'jd_normal_1', num: 4 }, { t: 'elite', id: 'jd_elite_1', rate: 0.7 }],
                [{ t: 'normal', id: 'jd_normal_1', num: 4 }, { t: 'elite', id: 'jd_elite_1', rate: 0.9 }],
                [{ t: 'boss', id: 'jd_boss_3' }, { t: 'elite', id: 'jd_elite_1', rate: 0.7 }]
            ],
            rewards: [
                { name: '极品灵石', rate: 1, min: 4, max: 8 },
                { name: '元婴突破丹', rate: 0.8, min: 2, max: 3 },
                { name: '玄冰剑', rate: 0.15, min: 1, max: 1 },
                { name: '玄冰符', rate: 0.12, min: 1, max: 1 },
                { bookId: 'yy04', rate: 0.4, min: 1, max: 1 },
                { bookId: 'yy07', rate: 0.15, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 3050, max: 4550 }
            ]
        },
        {
            id: 302,
            name: '雷云峰',
            requireRealm: '元婴期',
            waves: [
                [{ t: 'normal', id: 'jd_normal_2', num: 3 }],
                [{ t: 'normal', id: 'jd_normal_2', num: 3 }, { t: 'elite', id: 'jd_elite_1', rate: 0.5 }],
                [{ t: 'boss', id: 'jd_boss_1' }]
            ],
            rewards: [
                { name: '极品灵石', rate: 1, min: 3, max: 6 },
                { name: '元婴突破丹', rate: 0.4, min: 1, max: 1 },
                { name: '碎金令', rate: 0.5, min: 1, max: 1 },
                { bookId: 'yy02', rate: 0.3, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 2250, max: 3250 }
            ]
        },
        {
            id: 3021,
            name: '雷云峰（困难）',
            requireRealm: '元婴期',
            difficulty: 'hard',
            waves: [
                [{ t: 'normal', id: 'jd_normal_2', num: 4 }, { t: 'elite', id: 'jd_elite_1', rate: 0.7 }],
                [{ t: 'normal', id: 'jd_normal_2', num: 4 }, { t: 'elite', id: 'jd_elite_1', rate: 0.9 }],
                [{ t: 'boss', id: 'jd_boss_1' }, { t: 'elite', id: 'jd_elite_1', rate: 0.7 }]
            ],
            rewards: [
                { name: '极品灵石', rate: 1, min: 5, max: 9 },
                { name: '元婴突破丹', rate: 0.9, min: 2, max: 4 },
                { name: '雷云戒', rate: 0.15, min: 1, max: 1 },
                { name: '雷云珠', rate: 0.12, min: 1, max: 1 },
                { bookId: 'yy03', rate: 0.4, min: 1, max: 1 },
                { bookId: 'yy08', rate: 0.15, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 3250, max: 4850 }
            ]
        },
        // 化神期秘境
        {
            id: 401,
            name: '星空殿',
            requireRealm: '化神期',
            waves: [
                [{ t: 'normal', id: 'jd_normal_1', num: 4 }],
                [{ t: 'normal', id: 'jd_normal_1', num: 4 }, { t: 'elite', id: 'jd_elite_1', rate: 0.6 }],
                [{ t: 'boss', id: 'jd_boss_1' }, { t: 'boss', id: 'jd_boss_2', rate: 0.5 }]
            ],
            rewards: [
                { name: '极品灵石', rate: 1, min: 5, max: 10 },
                { name: '化神突破丹', rate: 0.5, min: 1, max: 1 },
                { bookId: 'yy05', rate: 0.4, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 4050, max: 6050 }
            ]
        },
        {
            id: 4011,
            name: '星空殿（困难）',
            requireRealm: '化神期',
            difficulty: 'hard',
            waves: [
                [{ t: 'normal', id: 'jd_normal_1', num: 5 }, { t: 'elite', id: 'jd_elite_1', rate: 0.8 }],
                [{ t: 'normal', id: 'jd_normal_1', num: 5 }, { t: 'elite', id: 'jd_elite_1', rate: 1.0 }],
                [{ t: 'boss', id: 'jd_boss_1' }, { t: 'boss', id: 'jd_boss_2', rate: 0.7 }]
            ],
            rewards: [
                { name: '极品灵石', rate: 1, min: 8, max: 15 },
                { name: '化神突破丹', rate: 0.8, min: 2, max: 3 },
                { name: '星空剑', rate: 0.12, min: 1, max: 1 },
                { name: '星空符', rate: 0.1, min: 1, max: 1 },
                { bookId: 'yy06', rate: 0.5, min: 1, max: 1 },
                { bookId: 'hs01', rate: 0.12, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 6050, max: 9050 }
            ]
        },
        {
            id: 402,
            name: '混沌秘境',
            requireRealm: '化神期',
            waves: [
                [{ t: 'normal', id: 'jd_normal_2', num: 4 }],
                [{ t: 'normal', id: 'jd_normal_2', num: 4 }, { t: 'elite', id: 'jd_elite_1', rate: 0.6 }],
                [{ t: 'boss', id: 'jd_boss_2' }, { t: 'boss', id: 'jd_boss_3', rate: 0.5 }]
            ],
            rewards: [
                { name: '极品灵石', rate: 1, min: 6, max: 12 },
                { name: '化神突破丹', rate: 0.4, min: 1, max: 1 },
                { bookId: 'yy05', rate: 0.4, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 4550, max: 6550 }
            ]
        },
        {
            id: 4021,
            name: '混沌秘境（困难）',
            requireRealm: '化神期',
            difficulty: 'hard',
            waves: [
                [{ t: 'normal', id: 'jd_normal_2', num: 5 }, { t: 'elite', id: 'jd_elite_1', rate: 0.8 }],
                [{ t: 'normal', id: 'jd_normal_2', num: 5 }, { t: 'elite', id: 'jd_elite_1', rate: 1.0 }],
                [{ t: 'boss', id: 'jd_boss_2' }, { t: 'boss', id: 'jd_boss_3', rate: 0.7 }]
            ],
            rewards: [
                { name: '极品灵石', rate: 1, min: 9, max: 16 },
                { name: '化神突破丹', rate: 0.9, min: 2, max: 4 },
                { name: '混沌戒', rate: 0.12, min: 1, max: 1 },
                { name: '混沌印', rate: 0.1, min: 1, max: 1 },
                { bookId: 'yy06', rate: 0.6, min: 1, max: 1 },
                { bookId: 'hs02', rate: 0.12, min: 1, max: 1 },
                { name: '修为', rate: 1, min: 6550, max: 9550 }
            ]
        }
    ],
    
    SANXIU_ACTIVE_SKILLS: {
        punch: {
            id: 'punch',
            name: '散修拳',
            type: 'attack',
            damage: 1.2,
            mpCost: 0,
            cooldown: 0,
            description: '基础拳法，稳定造成伤害'
        },
        airStrike: {
            id: 'airStrike',
            name: '气浪冲击',
            type: 'attack',
            damage: 1.5,
            mpCost: 5,
            cooldown: 2,
            description: '凝聚气浪，造成较高伤害'
        },
        sweep: {
            id: 'sweep',
            name: '散修掌·横扫',
            type: 'aoe',
            damage: 0.9,
            mpCost: 10,
            cooldown: 3,
            description: '一掌横扫，攻击所有敌人'
        },
        heal: {
            id: 'heal',
            name: '吐纳调息',
            type: 'heal',
            healPercent: 15,
            mpCost: 8,
            cooldown: 4,
            description: '调息打坐，恢复气血'
        },
        defend: {
            id: 'defend',
            name: '凝气护体',
            type: 'buff',
            damageReduce: 0.5,
            mpCost: 10,
            cooldown: 5,
            description: '凝气成盾，大幅减伤'
        },
        instant: {
            id: 'instant',
            name: '散修·瞬击',
            type: 'attack',
            damage: 1.3,
            mpCost: 12,
            cooldown: 4,
            noCounter: true,
            description: '快速突袭，敌人无法反击'
        },
        breakDef: {
            id: 'breakDef',
            name: '破法诀',
            type: 'attack',
            damage: 1.4,
            ignoreDef: 0.3,
            mpCost: 8,
            cooldown: 3,
            description: '无视敌方部分防御'
        }
    },
    
    SANXIU_PASSIVE_SKILLS: {
        basicBreathing: {
            id: 'basicBreathing',
            name: '基础吐纳法',
            realm: '炼气期',
            hpPercent: 10,
            description: '散修入门必修，最朴实的生存功法'
        },
        bodyForging: {
            id: 'bodyForging',
            name: '筋骨锻体诀',
            realm: '筑基期',
            defPercent: 15,
            description: '打磨肉身，硬抗小怪伤害'
        },
        qiDrawing: {
            id: 'qiDrawing',
            name: '引气诀',
            realm: '炼气期',
            atkPercent: 10,
            description: '最简单的聚气法门'
        },
        bloodShadow: {
            id: 'bloodShadow',
            name: '血影炼神法',
            realm: '金丹期',
            critRate: 5,
            critDmg: 20,
            description: '散修暗杀、速杀流派核心'
        },
        windSteps: {
            id: 'windSteps',
            name: '随风步',
            realm: '金丹期',
            dodge: 8,
            description: '无门无派的逃命身法，非常实用'
        },
        qiCalm: {
            id: 'qiCalm',
            name: '敛气静息功',
            realm: '金丹期',
            dotReduce: 50,
            description: '克制万魂泽、赤焰窟BOSS'
        },
        oneQi: {
            id: 'oneQi',
            name: '散修一气诀',
            realm: '元婴期',
            allPercent: 15,
            description: '散修能摸到的最高级通用功法'
        },
        indestructible: {
            id: 'indestructible',
            name: '不灭法体',
            realm: '元婴期',
            hpLowDefUp: true,
            description: '血量低于30%时防御翻倍'
        }
    },
    
    SKILL_BOOKS: {
        foundation: [
            {
                id: 'fb01', name: '《基础练气诀》',
                realm: '筑基期', quality: '白',
                attr: { hp: 50, atk: 5 },
                description: '基础功法，稳定提升属性',
                price: 100
            },
            {
                id: 'fb02', name: '《粗浅锻体法》',
                realm: '筑基期', quality: '白',
                attr: { def: 4, hp: 30 },
                description: '基础锻体，提升生存能力',
                price: 100
            },
            {
                id: 'fb03', name: '《引气小术》',
                realm: '筑基期', quality: '白',
                attr: { atk: 6 },
                description: '简单的引气之法',
                price: 100
            },
            {
                id: 'fb04', name: '《静息养气法》',
                realm: '筑基期', quality: '绿',
                attr: { hpPercent: 10 },
                description: '静心养气，提升气血上限',
                price: 300
            },
            {
                id: 'fb05', name: '《散修筋骨图》',
                realm: '筑基期', quality: '绿',
                attr: { def: 8, crit: 2 },
                description: '散修总结的筋骨锻炼法门',
                price: 300
            },
            {
                id: 'fb06', name: '《一气奠基诀》',
                realm: '筑基期', quality: '蓝',
                attr: { all: 8, hp: 100 },
                description: '筑基期的核心功法',
                price: 500
            }
        ],
        golden: [
            {
                id: 'gd01', name: '《金丹养命法》',
                realm: '金丹期', quality: '白',
                attr: { hp: 200, def: 12 },
                description: '养护金丹，提升生存能力',
                price: 800
            },
            {
                id: 'gd02', name: '《聚气破障诀》',
                realm: '金丹期', quality: '白',
                attr: { atk: 30, critDmg: 8 },
                description: '聚气破障，提升攻击力',
                price: 800
            },
            {
                id: 'gd03', name: '《玄铁锻骨经》',
                realm: '金丹期', quality: '绿',
                attr: { def: 20, dmgReduce: 3 },
                description: '如玄铁般坚韧',
                price: 1200
            },
            {
                id: 'gd04', name: '《疾风遁走术》',
                realm: '金丹期', quality: '绿',
                attr: { dodge: 5 },
                description: '提升闪避能力',
                price: 1200
            },
            {
                id: 'gd05', name: '《焚火炼神诀》',
                realm: '金丹期', quality: '蓝',
                attr: { atk: 40 },
                description: '火焰般的攻击力',
                price: 2000
            },
            {
                id: 'gd06', name: '《散修金丹秘要》',
                realm: '金丹期', quality: '紫',
                attr: { all: 30, hpPercent: 12 },
                description: '散修金丹期的终极秘诀',
                price: 3000
            },
            {
                id: 'gd07', name: '《赤焰焚天诀》',
                realm: '金丹期', quality: '橙',
                attr: { atk: 60, crit: 10, burn: 30 },
                description: '金丹期橙色功法，火系伤害+30%，暴击率+10%，攻击有概率触发焚火效果',
                price: 5000
            },
            {
                id: 'gd08', name: '《万魂归宗诀》',
                realm: '金丹期', quality: '橙',
                attr: { hp: 500, regen: 25, atk: 40 },
                description: '金丹期橙色功法，木系伤害+30%，气血上限+20%，击杀敌人后回复气血',
                price: 5000
            }
        ],
        yuanying: [
            {
                id: 'yy01', name: '《元婴固神法》',
                realm: '元婴期', quality: '绿',
                attr: { hp: 600, atk: 80 },
                description: '稳固元婴，全面提升',
                price: 5000
            },
            {
                id: 'yy02', name: '《雷元淬体诀》',
                realm: '元婴期', quality: '绿',
                attr: { def: 45 },
                description: '雷元淬体，防御大增',
                price: 5000
            },
            {
                id: 'yy03', name: '《幻灵闪避术》',
                realm: '元婴期', quality: '蓝',
                attr: { dodge: 8 },
                description: '幻灵般的闪避',
                price: 8000
            },
            {
                id: 'yy04', name: '《星元吐纳经》',
                realm: '元婴期', quality: '蓝',
                attr: { hpPercent: 15 },
                description: '吸纳星元，气血大增',
                price: 8000
            },
            {
                id: 'yy05', name: '《一气化元诀》',
                realm: '元婴期', quality: '紫',
                attr: { atk: 120, critDmg: 20 },
                description: '一气化元，攻击力暴增',
                price: 12000
            },
            {
                id: 'yy06', name: '《散修元神秘录》',
                realm: '元婴期', quality: '橙',
                attr: { all: 80, dmgUp: 12 },
                description: '散修元婴期的终极秘录',
                price: 20000
            },
            {
                id: 'yy07', name: '《玄冰凝心诀》',
                realm: '元婴期', quality: '橙',
                attr: { atk: 80, crit: 12, dodge: 8 },
                description: '元婴期橙色功法，水系伤害+35%，暴击率+12%，攻击有概率冰冻目标',
                price: 8000
            },
            {
                id: 'yy08', name: '《雷云万钧诀》',
                realm: '元婴期', quality: '橙',
                attr: { atk: 90, crit: 15, critDmg: 25 },
                description: '元婴期橙色功法，雷系伤害+35%，暴击率+15%，暴击伤害+25%',
                price: 8000
            }
        ],
        huashen: [
            {
                id: 'hs01', name: '《星空大道诀》',
                realm: '化神期', quality: '橙',
                attr: { all: 100, dmgUp: 15 },
                description: '化神期橙色功法，星空之力+40%，全属性+15%',
                price: 15000
            },
            {
                id: 'hs02', name: '《混沌归一诀》',
                realm: '化神期', quality: '橙',
                attr: { all: 110, dmgReduce: 10 },
                description: '化神期橙色功法，混沌之力+40%，受到伤害减少10%',
                price: 15000
            }
        ]
    },
    
    BOOK_SET_EFFECTS: {
        foundation: {
            2: { atk: 10, def: 5, hp: 100 },
            4: { crit: 3, dmgReduce: 3, hpPercent: 5 },
            6: { all: 15, dmgUp: 8, hpPercent: 10 }
        },
        golden: {
            2: { atk: 40, def: 20, hp: 400 },
            4: { crit: 5, dodge: 3, dmgReduce: 5 },
            6: { all: 40, dmgUp: 12, hpPercent: 15 }
        },
        yuanying: {
            2: { atk: 100, def: 50, hp: 1200 },
            4: { crit: 8, dodge: 5, dmgReduce: 8 },
            6: { all: 90, dmgUp: 18, hpPercent: 20 }
        }
    },
    
    // 30个互动NPC完整配置
    NPC_LIST: [
        // ========== 金阳门 ==========
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },

        // ========== 青木宗 ==========
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },

        // ========== 水月宫 ==========
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },

        // ========== 炎火殿 ==========
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
            ]
        },
        {
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
                { name: "烧毁敌对药田（黑任务）", contribution: 110 }
            ],
            shop: [
                { item: "焚焰毒", cost: 450 },
                { item: "火系禁术", cost: 900 }
            ]
        },
        {
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
                { item: "爆发火系攻击符", cost: 200 }
            ]
        },

        // ========== 皇土阁 ==========
        {
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
                { name: "每日修缮城墙", contribution: 20, daily: true },
                { name: "斩杀石傀儡", contribution: 40, reward: "土灵膏×1" }
            ],
            shop: [
                { item: "石甲", cost: 200 },
                { item: "玄铁棍", cost: 250 },
                { item: "固元丹", cost: 120 },
                { item: "土灵膏", cost: 50 }
            ]
        },
        {
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
                { item: "土系阵图", cost: 300 },
                { item: "土魄晶", cost: 800 }
            ]
        },
        {
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
                { item: "玄黄石", cost: 300 },
                { item: "土系防御符", cost: 60 }
            ]
        },
        {
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
                { name: "搬运巨石", contribution: 35 },
                { name: "加固门派大阵", contribution: 60 }
            ],
            shop: [
                { item: "磐石丹", cost: 70 },
                { item: "大地棍", cost: 900 }
            ]
        },
        {
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
                { item: "土系偷袭法器", cost: 400 }
            ]
        },
        {
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
            ]
        }
    ],
    
    // 中原以外地图的旅行路线
    TRAVEL_ROUTES: {
        'central-plains': {
            name: '中原修真区域',
            connections: [
                { to: 'southern-wilderness', method: '马车', cost: 50, requiredRealm: '筑基期' },
                { to: 'eastern-sea', method: '船', cost: 100, requiredRealm: '金丹期' },
                { to: 'northern-snowfield', method: '飞剑', cost: 200, requiredRealm: '元婴期' },
                { to: 'western-desert', method: '骆驼', cost: 150, requiredRealm: '金丹期' }
            ]
        },
        'southern-wilderness': {
            name: '南疆蛮荒区域',
            connections: [
                { to: 'central-plains', method: '马车', cost: 50, requiredRealm: '筑基期' }
            ]
        },
        'eastern-sea': {
            name: '东海仙岛区域',
            connections: [
                { to: 'central-plains', method: '船', cost: 100, requiredRealm: '金丹期' }
            ]
        },
        'northern-snowfield': {
            name: '北境雪原区域',
            connections: [
                { to: 'central-plains', method: '飞剑', cost: 200, requiredRealm: '元婴期' }
            ]
        },
        'western-desert': {
            name: '西漠沙海区域',
            connections: [
                { to: 'central-plains', method: '骆驼', cost: 150, requiredRealm: '金丹期' }
            ]
        }
    },
    // 物品数据库 - 统一管理所有物品
    ITEM_DATABASE: {
        // 道具类
        ITEMS: {
            // 恢复类道具
            RECOVERY: {
                '干粮': { 
                    name: '干粮', 
                    displayType: '恢复道具',
                    rarity: 'common', 
                    effect: { hp: 20 }, 
                    description: '可以恢复少量气血',
                    price: 10
                },
                '面包': { 
                    name: '面包', 
                    displayType: '恢复道具',
                    rarity: 'common', 
                    effect: { hp: 15 }, 
                    description: '可以恢复少量生命值',
                    price: 8
                },
                '草药包': { 
                    name: '草药包', 
                    displayType: '恢复道具',
                    rarity: 'common', 
                    effect: { hp: 30 }, 
                    description: '阿禾赠送的草药包，可恢复生命值',
                    price: 20
                },
                '回春丹': { 
                    name: '回春丹', 
                    displayType: '恢复道具',
                    rarity: 'common', 
                    effect: { hp: 50 }, 
                    description: '恢复50点气血',
                    price: 50
                },
                '聚灵散': { 
                    name: '聚灵散', 
                    displayType: '恢复道具',
                    rarity: 'common', 
                    effect: { mp: 30 }, 
                    description: '恢复30点灵力',
                    price: 30
                },
                '大还丹': { 
                    name: '大还丹', 
                    displayType: '恢复道具',
                    rarity: 'uncommon', 
                    effect: { hp: 150 }, 
                    description: '恢复150点气血',
                    price: 200
                },
                '灵元丹': { 
                    name: '灵元丹', 
                    displayType: '恢复道具',
                    rarity: 'uncommon', 
                    effect: { mp: 100 }, 
                    description: '恢复100点灵力',
                    price: 150
                },
                '九转金丹': { 
                    name: '九转金丹', 
                    displayType: '恢复道具',
                    rarity: 'rare', 
                    effect: { hp: 500, mp: 300 }, 
                    description: '恢复500点气血和300点灵力',
                    price: 1000
                },
                '清心丹': { 
                    name: '清心丹', 
                    displayType: '恢复道具',
                    rarity: 'uncommon', 
                    effect: { mp: 50 }, 
                    description: '清除杂念，恢复灵力',
                    price: 80
                },
                '毒抗丹': { 
                    name: '毒抗丹', 
                    displayType: '恢复道具',
                    rarity: 'uncommon', 
                    effect: { defense: 10 }, 
                    description: '提高毒抗性',
                    price: 100
                },
                '耐寒丹': { 
                    name: '耐寒丹', 
                    displayType: '恢复道具',
                    rarity: 'uncommon', 
                    effect: { defense: 15 }, 
                    description: '提高耐寒能力',
                    price: 120
                },
                '金阳丹': { 
                    name: '金阳丹', 
                    displayType: '恢复道具',
                    rarity: 'common', 
                    effect: { hp: 15, regen: 2 }, 
                    description: '金阳门炼气期丹药，瞬间恢复15%气血，每秒回血2%，持续5秒',
                    price: 60
                },
                '青元丹': { 
                    name: '青元丹', 
                    displayType: '恢复道具',
                    rarity: 'common', 
                    effect: { hp: 15, mp: 10, regen: 3 }, 
                    description: '青木宗炼气期丹药，瞬间恢复15%气血+10%灵力，持续回血3秒',
                    price: 60
                },
                '水月丹': { 
                    name: '水月丹', 
                    displayType: '恢复道具',
                    rarity: 'common', 
                    effect: { mp: 15, regen: 2 }, 
                    description: '水月宫炼气期丹药，瞬间恢复15%灵力，每秒回灵2%，持续5秒',
                    price: 60
                },
                '下品修炼丹': { 
                    name: '下品修炼丹', 
                    displayType: '恢复道具',
                    rarity: 'common', 
                    effect: { cultivation: 3000 }, 
                    description: '使用后获得3000修为值',
                    price: 100
                },
                '中品修炼丹': { 
                    name: '中品修炼丹', 
                    displayType: '恢复道具',
                    rarity: 'uncommon', 
                    effect: { cultivation: 30000 }, 
                    description: '使用后获得30000修为值',
                    price: 500
                },
                '上品修炼丹': { 
                    name: '上品修炼丹', 
                    displayType: '恢复道具',
                    rarity: 'rare', 
                    effect: { cultivation: 300000 }, 
                    description: '使用后获得300000修为值',
                    price: 2000
                },
                '极品修炼丹': { 
                    name: '极品修炼丹', 
                    displayType: '恢复道具',
                    rarity: 'epic', 
                    effect: { cultivation: 3000000 }, 
                    description: '使用后获得3000000修为值',
                    price: 10000
                }
            },
            // 突破道具
            BREAKTHROUGH: {
                '筑基丹': { 
                    name: '筑基丹', 
                    displayType: '突破道具',
                    rarity: 'uncommon', 
                    effect: { breakthrough: '炼气' }, 
                    description: '用于炼气期突破到筑基期',
                    price: 500
                },
                '金丹突破丹': { 
                    name: '金丹突破丹', 
                    displayType: '突破道具',
                    rarity: 'rare', 
                    effect: { breakthrough: '筑基' }, 
                    description: '用于筑基期突破到金丹期',
                    price: 2000
                },
                '元婴突破丹': { 
                    name: '元婴突破丹', 
                    displayType: '突破道具',
                    rarity: 'epic', 
                    effect: { breakthrough: '金丹' }, 
                    description: '用于金丹期突破到元婴期',
                    price: 10000
                },
                '化神突破丹': { 
                    name: '化神突破丹', 
                    displayType: '突破道具',
                    rarity: 'legendary', 
                    effect: { breakthrough: '元婴' }, 
                    description: '用于元婴期突破到化神期',
                    price: 50000
                },
                '渡劫突破丹': { 
                    name: '渡劫突破丹', 
                    displayType: '突破道具',
                    rarity: 'mythic', 
                    effect: { breakthrough: '化神' }, 
                    description: '用于化神期突破到渡劫期',
                    price: 200000
                },
                '金灵珠': { 
                    name: '金灵珠', 
                    displayType: '突破道具',
                    rarity: 'rare', 
                    description: '蕴含金系灵气的宝珠，用于突破到金丹期',
                    price: 1500
                },
                '地灵宝': { 
                    name: '地灵宝', 
                    displayType: '突破道具',
                    rarity: 'rare', 
                    description: '蕴含大地之力的灵宝，用于突破到金丹期',
                    price: 1500
                },
                '金丹玉': { 
                    name: '金丹玉', 
                    displayType: '突破道具',
                    rarity: 'epic', 
                    description: '凝聚金丹之气的宝玉，用于突破到金丹期',
                    price: 3000
                },
                '火灵晶': { 
                    name: '火灵晶', 
                    displayType: '突破道具',
                    rarity: 'epic', 
                    description: '蕴含火灵之力的晶体，用于突破到元婴期',
                    price: 8000
                },
                '魂珠': { 
                    name: '魂珠', 
                    displayType: '突破道具',
                    rarity: 'epic', 
                    description: '凝聚灵魂之力的宝珠，用于突破到元婴期',
                    price: 8000
                },
                '元婴果': { 
                    name: '元婴果', 
                    displayType: '突破道具',
                    rarity: 'legendary', 
                    description: '蕴含元婴之气的灵果，用于突破到元婴期',
                    price: 15000
                },
                '冰灵髓': { 
                    name: '冰灵髓', 
                    displayType: '突破道具',
                    rarity: 'legendary', 
                    description: '蕴含冰灵之力的精髓，用于突破到化神期',
                    price: 40000
                },
                '雷灵珠': { 
                    name: '雷灵珠', 
                    displayType: '突破道具',
                    rarity: 'legendary', 
                    description: '蕴含雷灵之力的宝珠，用于突破到化神期',
                    price: 40000
                },
                '化神草': { 
                    name: '化神草', 
                    displayType: '突破道具',
                    rarity: 'mythic', 
                    description: '蕴含化神之气的灵草，用于突破到化神期',
                    price: 80000
                },
                '星空石': { 
                    name: '星空石', 
                    displayType: '突破道具',
                    rarity: 'mythic', 
                    description: '来自星空的奇石，用于突破到渡劫期',
                    price: 150000
                },
                '混沌结晶': { 
                    name: '混沌结晶', 
                    displayType: '突破道具',
                    rarity: 'mythic', 
                    description: '混沌之力凝聚的结晶，用于突破到渡劫期',
                    price: 150000
                },
                '渡劫莲': { 
                    name: '渡劫莲', 
                    displayType: '突破道具',
                    rarity: 'mythic', 
                    description: '蕴含渡劫之力的莲花，用于突破到渡劫期',
                    price: 250000
                },
                '裂金丹': { 
                    name: '裂金丹', 
                    displayType: '突破道具',
                    rarity: 'uncommon', 
                    effect: { attack: 15, defense: 5 }, 
                    description: '金阳门筑基期丹药，30秒内物攻+15%，破甲+5%',
                    price: 200
                },
                '缠叶丹': { 
                    name: '缠叶丹', 
                    displayType: '突破道具',
                    rarity: 'uncommon', 
                    effect: { attack: 15, poison: 2 }, 
                    description: '青木宗筑基期丹药，30秒内木系伤害+15%，毒伤效果翻倍',
                    price: 200
                },
                '寒江丹': { 
                    name: '寒江丹', 
                    displayType: '突破道具',
                    rarity: 'uncommon', 
                    effect: { attack: 15, speed: 10 }, 
                    description: '水月宫筑基期丹药，30秒内法攻+15%，速度+10%',
                    price: 200
                },
                '金煌丹': { 
                    name: '金煌丹', 
                    displayType: '突破道具',
                    rarity: 'rare', 
                    effect: { crit: 5 }, 
                    description: '金阳门金丹期丹药，永久提升5%暴击率（最多叠加3颗）',
                    price: 1000
                },
                '长生丹': { 
                    name: '长生丹', 
                    displayType: '突破道具',
                    rarity: 'rare', 
                    effect: { hp: 5 }, 
                    description: '青木宗金丹期丹药，永久提升5%气血上限（最多叠加3颗）',
                    price: 1000
                },
                '沧澜丹': { 
                    name: '沧澜丹', 
                    displayType: '突破道具',
                    rarity: 'rare', 
                    effect: { dodge: 5 }, 
                    description: '水月宫金丹期丹药，永久提升5%闪避率（最多叠加3颗）',
                    price: 1000
                },
                '破天丹': { 
                    name: '破天丹', 
                    displayType: '突破道具',
                    rarity: 'epic', 
                    effect: { cooldown: 3 }, 
                    description: '金阳门元婴期丹药，使用后1分钟内，金阙破天击冷却缩短至3分钟',
                    price: 5000
                },
                '枯荣丹': { 
                    name: '枯荣丹', 
                    displayType: '突破道具',
                    rarity: 'epic', 
                    effect: { cooldown: 4 }, 
                    description: '青木宗元婴期丹药，使用后5分钟内，枯荣万木生冷却缩短至4分钟',
                    price: 5000
                },
                '沧海丹': { 
                    name: '沧海丹', 
                    displayType: '突破道具',
                    rarity: 'epic', 
                    effect: { cooldown: 5 }, 
                    description: '水月宫元婴期丹药，使用后5分钟内，沧海无量潮冷却缩短至5分钟',
                    price: 5000
                }
            },
            // 材料类
            MATERIALS: {
                '野兔皮毛': { 
                    name: '野兔皮毛', 
                    displayType: '材料',
                    rarity: 'common', 
                    description: '野兔的皮毛，可用于制作护腕',
                    price: 10
                },
                '止血草': { 
                    name: '止血草', 
                    displayType: '材料',
                    rarity: 'common', 
                    description: '用于止血的草药',
                    price: 5
                },
                '草药': { 
                    name: '草药', 
                    displayType: '材料',
                    rarity: 'common', 
                    description: '普通的草药',
                    price: 3
                },
                '灵草': { 
                    name: '灵草', 
                    displayType: '材料',
                    rarity: 'uncommon', 
                    description: '含有灵气的灵草',
                    price: 20
                },
                '野猪肉': { 
                    name: '野猪肉', 
                    displayType: '材料',
                    rarity: 'common', 
                    description: '野猪的肉',
                    price: 8
                },
                '猪皮': { 
                    name: '猪皮', 
                    displayType: '材料',
                    rarity: 'common', 
                    description: '野猪的皮',
                    price: 6
                },
                '妖羽': { 
                    name: '妖羽', 
                    displayType: '材料',
                    rarity: 'uncommon', 
                    description: '妖鸟的羽毛',
                    price: 25
                },
                '妖丹': { 
                    name: '妖丹', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '妖兽的内丹',
                    price: 100
                },
                '狼皮': { 
                    name: '狼皮', 
                    displayType: '材料',
                    rarity: 'uncommon', 
                    description: '狼的皮',
                    price: 15
                },
                '狼牙': { 
                    name: '狼牙', 
                    displayType: '材料',
                    rarity: 'uncommon', 
                    description: '狼的牙齿',
                    price: 18
                },
                '兽皮': { 
                    name: '兽皮', 
                    displayType: '材料',
                    rarity: 'uncommon', 
                    description: '野兽的皮毛',
                    price: 12
                },
                '木材': { 
                    name: '木材', 
                    displayType: '材料',
                    rarity: 'common', 
                    description: '木材',
                    price: 5
                },
                '灵木': { 
                    name: '灵木', 
                    displayType: '材料',
                    rarity: 'uncommon', 
                    description: '蕴含灵气的木材',
                    price: 30
                },
                '树心': { 
                    name: '树心', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '树的精华',
                    price: 80
                },
                '千年木果': { 
                    name: '千年木果', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '千年木果',
                    price: 100
                },
                '木果': { 
                    name: '木果', 
                    displayType: '材料',
                    rarity: 'common', 
                    description: '普通的木果',
                    price: 5
                },
                '熊掌': { 
                    name: '熊掌', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '珍贵的熊掌',
                    price: 120
                },
                '熊胆': { 
                    name: '熊胆', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '珍贵的熊胆',
                    price: 100
                },
                '石头': { 
                    name: '石头', 
                    displayType: '材料',
                    rarity: 'common', 
                    description: '普通的石头',
                    price: 2
                },
                '矿石': { 
                    name: '矿石', 
                    displayType: '材料',
                    rarity: 'common', 
                    description: '普通矿石',
                    price: 3
                },
                '铁矿石': { 
                    name: '铁矿石', 
                    displayType: '材料',
                    rarity: 'uncommon', 
                    description: '铁矿石',
                    price: 15
                },
                '精铁矿': { 
                    name: '精铁矿', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '精炼的铁矿',
                    price: 50
                },
                '金属石': { 
                    name: '金属石', 
                    displayType: '材料',
                    rarity: 'uncommon', 
                    description: '含有金属的石头',
                    price: 20
                },
                '秘银矿': { 
                    name: '秘银矿', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '珍贵的秘银矿',
                    price: 80
                },
                '灵芝': { 
                    name: '灵芝', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '珍贵的灵芝',
                    price: 150
                },
                '珍珠': { 
                    name: '珍珠', 
                    displayType: '材料',
                    rarity: 'uncommon', 
                    description: '珍贵的珍珠',
                    price: 40
                },
                '龙鳞': { 
                    name: '龙鳞', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '龙的鳞片',
                    price: 200
                },
                '冰魄': { 
                    name: '冰魄', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '蕴含冰属性灵气的魄晶',
                    price: 180
                },
                '万年玄冰': { 
                    name: '万年玄冰', 
                    displayType: '材料',
                    rarity: 'epic', 
                    description: '万年形成的玄冰',
                    price: 500
                },
                '沙棘果': { 
                    name: '沙棘果', 
                    displayType: '材料',
                    rarity: 'common', 
                    description: '沙漠中的沙棘果',
                    price: 8
                },
                '筑基丹材料': { 
                    name: '筑基丹材料', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '用于炼制筑基丹的材料',
                    price: 300
                },
                '金丹丹材料': { 
                    name: '金丹丹材料', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '用于炼制金丹的材料',
                    price: 800
                },
                '元婴丹材料': { 
                    name: '元婴丹材料', 
                    displayType: '材料',
                    rarity: 'epic', 
                    description: '用于炼制元婴丹的材料',
                    price: 3000
                },
                '化神丹材料': { 
                    name: '化神丹材料', 
                    displayType: '材料',
                    rarity: 'epic', 
                    description: '用于炼制化神丹的材料',
                    price: 8000
                },
                '炼虚丹材料': { 
                    name: '炼虚丹材料', 
                    displayType: '材料',
                    rarity: 'legendary', 
                    description: '用于炼制炼虚丹的材料',
                    price: 20000
                },
                '蛊虫': { 
                    name: '蛊虫', 
                    displayType: '材料',
                    rarity: 'uncommon', 
                    description: '用于巫蛊之术的虫子',
                    price: 30
                },
                '尸毒粉': { 
                    name: '尸毒粉', 
                    displayType: '材料',
                    rarity: 'uncommon', 
                    description: '含有尸毒的粉末',
                    price: 35
                },
                '仙器碎片': { 
                    name: '仙器碎片', 
                    displayType: '材料',
                    rarity: 'epic', 
                    description: '仙器的碎片',
                    price: 2000
                },
                '雷鹰羽毛': { 
                    name: '雷鹰羽毛', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '雷鹰的羽毛',
                    price: 150
                },
                '雷丹': { 
                    name: '雷丹', 
                    displayType: '材料',
                    rarity: 'epic', 
                    description: '蕴含雷电之力的丹药',
                    price: 500
                },
                '土之心': { 
                    name: '土之心', 
                    displayType: '材料',
                    rarity: 'epic', 
                    description: '大地的精华',
                    price: 600
                },
                '泰坦核心': { 
                    name: '泰坦核心', 
                    displayType: '材料',
                    rarity: 'legendary', 
                    description: '泰坦的核心',
                    price: 3000
                },
                '水属性灵材': { 
                    name: '水属性灵材', 
                    displayType: '材料',
                    rarity: 'uncommon', 
                    description: '蕴含水属性灵气的材料',
                    price: 40
                },
                '傀儡核心': { 
                    name: '傀儡核心', 
                    displayType: '材料',
                    rarity: 'uncommon', 
                    description: '傀儡的核心',
                    price: 50
                },

                '千年树心': { 
                    name: '千年树心', 
                    displayType: '材料',
                    rarity: 'epic', 
                    description: '万年古树的精华',
                    price: 800
                },
                '玉佩碎片': { 
                    name: '玉佩碎片', 
                    displayType: '材料',
                    rarity: 'rare', 
                    description: '守岚者玉佩的碎片',
                    price: 200
                }
            },
            // 功法类
            SKILL_BOOKS: {
                '基础功法': { 
                    name: '基础功法', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'common', 
                    skill: '基础吐纳法', 
                    description: '修仙基础功法',
                    price: 0
                },
                '木系功法残页': { 
                    name: '木系功法残页', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'uncommon', 
                    description: '木系功法的残页',
                    price: 0
                },
                '巫蛊秘籍': { 
                    name: '巫蛊秘籍', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'rare', 
                    description: '记载巫蛊之术的秘籍',
                    price: 0
                },
                '古神残卷': { 
                    name: '古神残卷', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'epic', 
                    description: '记载古神功法的残卷',
                    price: 0
                },
                '水属性功法': { 
                    name: '水属性功法', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'rare', 
                    description: '水属性功法',
                    price: 0
                },
                '高阶功法': { 
                    name: '高阶功法', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'epic', 
                    description: '高阶修炼功法',
                    price: 0
                },
                '金阳基础诀': { 
                    name: '金阳基础诀', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'uncommon', 
                    attack: 8, 
                    description: '金阳门基础功法，物攻+8%，解锁基础招式金阳拳',
                    price: 0
                },
                '裂金剑法': { 
                    name: '裂金剑法', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'rare', 
                    attack: 20, 
                    description: '金阳门筑基期功法，物攻+20%，技能伤害+15%，解锁招式裂金刺',
                    price: 0
                },
                '大日金煌诀': { 
                    name: '大日金煌诀', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'epic', 
                    attack: 15, 
                    defense: 15, 
                    crit: 12, 
                    description: '金阳门核心心法，全属性+15%，金系伤害+35%，暴击率+12%，心法加持下裂金刺伤害翻倍',
                    price: 0
                },
                '金阙破天击': { 
                    name: '金阙破天击', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'legendary', 
                    attack: 250, 
                    description: '金阳门绝学，单体爆发，无视30%防御，造成250%物攻伤害，冷却10分钟',
                    price: 0
                },
                '青木长生诀': { 
                    name: '青木长生诀', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'uncommon', 
                    hp: 10, 
                    description: '青木宗基础功法，气血上限+10%，解锁基础招式青木掌',
                    price: 0
                },
                '缠叶毒经': { 
                    name: '缠叶毒经', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'rare', 
                    attack: 20, 
                    description: '青木宗筑基期功法，木系伤害+20%，攻击附带持续毒伤',
                    price: 0
                },
                '万古青元功': { 
                    name: '万古青元功', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'epic', 
                    hp: 30, 
                    regen: 2, 
                    description: '青木宗核心心法，气血+30%，回血效果翻倍，队友享受1/3加成，毒伤持续时间延长50%',
                    price: 0
                },
                '枯荣万木生': { 
                    name: '枯荣万木生', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'legendary', 
                    hp: 30, 
                    defense: 100, 
                    description: '青木宗绝学，群体大范围回血，自身短时间无敌，冷却8分钟',
                    price: 0
                },
                '水月心经': { 
                    name: '水月心经', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'uncommon', 
                    attack: 8, 
                    mp: 20, 
                    description: '水月宫基础功法，法攻+8%，灵力回复加快20%，解锁基础招式水月掌',
                    price: 0
                },
                '寒江剑法': { 
                    name: '寒江剑法', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'rare', 
                    attack: 22, 
                    speed: 20, 
                    description: '水月宫筑基期功法，水系伤害+22%，技能可减速敌人',
                    price: 0
                },
                '沧澜水皇诀': { 
                    name: '沧澜水皇诀', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'epic', 
                    attack: 30, 
                    speed: 30, 
                    dodge: 12, 
                    description: '水月宫核心心法，法攻+30%，水系伤害+40%，闪避+12%，减速效果提升至30%',
                    price: 0
                },
                '沧海无量潮': { 
                    name: '沧海无量潮', 
                    displayType: '功法',
                    type: 'skill-book',
                    rarity: 'legendary', 
                    attack: 180, 
                    description: '水月宫绝学，大范围水伤，群体冰冻，冷却10分钟',
                    price: 0
                }
            },
            // 杂物类
            MISC: {
                '笔墨纸砚': { 
                    name: '笔墨纸砚', 
                    displayType: '杂物',
                    rarity: 'common', 
                    description: '文人用品',
                    price: 20
                },
                '古籍': { 
                    name: '古籍', 
                    displayType: '杂物',
                    rarity: 'uncommon', 
                    description: '一本古老的书籍',
                    price: 80
                },
                '乞讨碗': { 
                    name: '乞讨碗', 
                    displayType: '杂物',
                    rarity: 'common', 
                    description: '乞讨用的碗',
                    price: 5
                },
                '猎户的信物': { 
                    name: '猎户的信物', 
                    displayType: '杂物',
                    rarity: 'common', 
                    description: '猎户王大叔掉落的信物',
                    price: 15
                },
                '沙漠地图': { 
                    name: '沙漠地图', 
                    displayType: '杂物',
                    rarity: 'uncommon', 
                    description: '沙漠地区的地图',
                    price: 100
                },
                '金阳弟子令': { 
                    name: '金阳弟子令', 
                    displayType: '杂物',
                    rarity: 'common', 
                    description: '金阳门弟子令，可进入门派基础试炼场，每日1次',
                    price: 0
                },
                '烈阳精英令': { 
                    name: '烈阳精英令', 
                    displayType: '杂物',
                    rarity: 'uncommon', 
                    description: '金阳门精英令，可进入门派精英试炼场，获取额外贡献，每日1次',
                    price: 0
                },
                '金阙核心令': { 
                    name: '金阙核心令', 
                    displayType: '杂物',
                    rarity: 'rare', 
                    description: '金阳门核心令，可参与门派核心议事，解锁高阶任务',
                    price: 0
                },
                '焚天长老令': { 
                    name: '焚天长老令', 
                    displayType: '杂物',
                    rarity: 'epic', 
                    description: '金阳门长老令，可调用门派资源，招募弟子协助作战，仅长老及以上可兑',
                    price: 0
                },
                '青木弟子令': { 
                    name: '青木弟子令', 
                    displayType: '杂物',
                    rarity: 'common', 
                    description: '青木宗弟子令，可进入门派药圃，采摘基础灵药，每日1次',
                    price: 0
                },
                '万木精英令': { 
                    name: '万木精英令', 
                    displayType: '杂物',
                    rarity: 'uncommon', 
                    description: '青木宗精英令，可进入门派灵谷，获取高阶灵药，每日1次',
                    price: 0
                },
                '长生核心令': { 
                    name: '长生核心令', 
                    displayType: '杂物',
                    rarity: 'rare', 
                    description: '青木宗核心令，可参与门派丹道议事，解锁丹方',
                    price: 0
                },
                '枯荣长老令': { 
                    name: '枯荣长老令', 
                    displayType: '杂物',
                    rarity: 'epic', 
                    description: '青木宗长老令，可调配门派灵药资源，传授丹道技艺，仅长老及以上可兑',
                    price: 0
                },
                '水月弟子令': { 
                    name: '水月弟子令', 
                    displayType: '杂物',
                    rarity: 'common', 
                    description: '水月宫弟子令，可进入门派水阁，修炼基础水系功法，每日1次',
                    price: 0
                },
                '流霜精英令': { 
                    name: '流霜精英令', 
                    displayType: '杂物',
                    rarity: 'uncommon', 
                    description: '水月宫精英令，可进入门派寒潭，获取水系灵材，每日1次',
                    price: 0
                },
                '沧澜核心令': { 
                    name: '沧澜核心令', 
                    displayType: '杂物',
                    rarity: 'rare', 
                    description: '水月宫核心令，可参与门派剑修议事，解锁高阶剑法',
                    price: 0
                },
                '沧海长老令': { 
                    name: '沧海长老令', 
                    displayType: '杂物',
                    rarity: 'epic', 
                    description: '水月宫长老令，可调用门派水系资源，开启寒潭秘境，仅长老及以上可兑',
                    price: 0
                },
                '瘴气香囊': { 
                    name: '瘴气香囊', 
                    displayType: '杂物',
                    rarity: 'uncommon', 
                    effect: { miasmaResistance: 50 }, 
                    description: '可以短暂抵御迷雾谷的瘴气',
                    price: 100
                },
                '银两': { 
                    name: '银两', 
                    displayType: '货币',
                    rarity: 'common', 
                    value: 500, 
                    description: '钱',
                    price: 0
                },
                '铜钱': { 
                    name: '铜钱', 
                    displayType: '货币',
                    rarity: 'common', 
                    value: 1, 
                    description: '铜钱',
                    price: 0
                },
                '一阶灵石': { 
                    name: '一阶灵石', 
                    displayType: '货币',
                    rarity: 'uncommon', 
                    value: 50, 
                    description: '蕴含初级灵力的灵石',
                    price: 0
                },
                '二阶灵石': { 
                    name: '二阶灵石', 
                    displayType: '货币',
                    rarity: 'rare', 
                    value: 200, 
                    description: '蕴含中级灵力的灵石',
                    price: 0
                },
                '中品灵石': { 
                    name: '中品灵石', 
                    displayType: '货币',
                    rarity: 'uncommon', 
                    value: 100, 
                    description: '蕴含中等灵力的灵石',
                    price: 0
                },
                '三阶灵石': { 
                    name: '三阶灵石', 
                    displayType: '货币',
                    rarity: 'epic', 
                    value: 500, 
                    description: '蕴含高级灵力的灵石',
                    price: 0
                },
                '四阶灵石': { 
                    name: '四阶灵石', 
                    displayType: '货币',
                    rarity: 'epic', 
                    value: 1000, 
                    description: '蕴含顶级灵力的灵石',
                    price: 0
                },
                '五阶灵石': { 
                    name: '五阶灵石', 
                    displayType: '货币',
                    rarity: 'legendary', 
                    value: 2000, 
                    description: '蕴含神级灵力的灵石',
                    price: 0
                },
                '上品灵石': { 
                    name: '上品灵石', 
                    displayType: '货币',
                    rarity: 'rare', 
                    value: 500, 
                    description: '蕴含高等灵力的灵石',
                    price: 0
                }
            }
        },
        // 装备类
        EQUIPMENT: {
            // 武器
            WEAPONS: {
                '铁剑': { 
                    name: '铁剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'common', 
                    attack: 10, 
                    description: '普通铁剑',
                    realm: '炼气期',
                    price: 100
                },
                '精钢剑': { 
                    name: '精钢剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'uncommon', 
                    attack: 25, 
                    description: '精钢打造的剑',
                    realm: '炼气期',
                    price: 500
                },
                '长剑': { 
                    name: '长剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'rare', 
                    attack: 50, 
                    description: '上品法器长剑',
                    realm: '炼气期',
                    price: 2000
                },
                '生铁剑': { 
                    name: '生铁剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'common', 
                    attack: 15, 
                    description: '生铁打造的剑',
                    realm: '炼气期',
                    price: 80
                },
                '破旧匕首': { 
                    name: '破旧匕首', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'common', 
                    attack: 3, 
                    description: '破旧的匕首',
                    realm: '炼气期',
                    price: 20
                },
                '破烂武器': { 
                    name: '破烂武器', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'common', 
                    attack: 5, 
                    description: '破烂的武器',
                    realm: '炼气期',
                    price: 10
                },
                '破瘴匕首': { 
                    name: '破瘴匕首', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'uncommon', 
                    attack: 3, 
                    description: '能驱散轻微瘴气的匕首',
                    realm: '炼气期',
                    price: 150
                },
                '守岚者长剑': { 
                    name: '守岚者长剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'rare', 
                    attack: 8, 
                    description: '守岚者的长剑，瘴气伤害加成',
                    realm: '炼气期',
                    price: 500
                },
                '猎户的弓箭': { 
                    name: '猎户的弓箭', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'uncommon', 
                    attack: 4, 
                    description: '猎户王大叔赠送的弓箭，远程攻击+4',
                    realm: '炼气期',
                    price: 200
                },
                '金纹剑': { 
                    name: '金纹剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'uncommon', 
                    attack: 5, 
                    description: '金阳门炼气期法宝，物攻+5%，提升金阳拳伤害10%',
                    realm: '炼气期',
                    price: 0
                },
                '焚天剑': { 
                    name: '焚天剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    attack: 20, 
                    description: '金阳门元婴期法宝，物攻+20%，触发金芒斩时额外造成范围伤害',
                    realm: '元婴期',
                    price: 0
                },
                '金灵印': { 
                    name: '金灵印', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 70, 
                    crit: 8, 
                    description: '金丹期金色法宝，金系伤害+15%，攻击有概率触发金芒一闪',
                    realm: '金丹期', 
                    requiredRoot: '金灵根',
                    price: 0
                },
                '金阳剑': { 
                    name: '金阳剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 90, 
                    crit: 10, 
                    description: '元婴期金色法宝，金系伤害+20%，暴击伤害+30%',
                    realm: '元婴期', 
                    requiredRoot: '金灵根',
                    price: 0
                },
                '青藤鞭': { 
                    name: '青藤鞭', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'uncommon', 
                    attack: 5, 
                    description: '青木宗炼气期法宝，木系伤害+5%，提升青木掌伤害10%',
                    price: 0
                },
                '青木杖': { 
                    name: '青木杖', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 80, 
                    hp: 1000, 
                    description: '元婴期绿色法宝，木系伤害+20%，回血效果+40%',
                    realm: '元婴期', 
                    requiredRoot: '木灵根',
                    price: 0
                },
                '水纹剑': { 
                    name: '水纹剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'uncommon', 
                    attack: 5, 
                    description: '水月宫炼气期法宝，法攻+5%，提升水月掌伤害10%',
                    price: 0
                },
                '水月剑': { 
                    name: '水月剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 95, 
                    speed: 15, 
                    dodge: 10, 
                    description: '元婴期蓝色法宝，水系伤害+20%，闪避+15%',
                    realm: '元婴期', 
                    requiredRoot: '水灵根',
                    price: 0
                },
                '鎏金剑': { 
                    name: '鎏金剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 275, 
                    strength: 25, 
                    crit: 6, 
                    description: '金阳门炼气期武器，物攻+5%',
                    sectExclusive: 'jinyang', 
                    set: 'liu jin', 
                    realm: '炼气期',
                    price: 0
                },
                '烈阳剑': { 
                    name: '烈阳剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 300, 
                    strength: 30, 
                    crit: 6.5, 
                    description: '金阳门筑基期武器，物攻+8%，暴击率+2%',
                    sectExclusive: 'jinyang', 
                    set: 'lie yang', 
                    realm: '筑基期',
                    price: 0
                },
                '镇金剑': { 
                    name: '镇金剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 625, 
                    strength: 37, 
                    crit: 8.75, 
                    description: '金阳门金丹期武器，物攻+12%，暴击率+4%',
                    sectExclusive: 'jinyang', 
                    set: 'zhen jin', 
                    realm: '金丹期',
                    price: 0
                },
                '金阙剑': { 
                    name: '金阙剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 1200, 
                    strength: 80, 
                    crit: 17.5, 
                    description: '金阳门化神期武器，物攻+15%，暴击率+6%',
                    sectExclusive: 'jinyang', 
                    set: 'jin que', 
                    realm: '化神期',
                    price: 0
                },
                '青岚琴': { 
                    name: '青岚琴', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 275, 
                    intelligence: 25, 
                    crit: 6, 
                    description: '青木宗炼气期武器，气血+2%，每秒回血+0.2%',
                    sectExclusive: 'qingmu', 
                    set: 'qing lan', 
                    realm: '炼气期',
                    price: 0
                },
                '万木琴': { 
                    name: '万木琴', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 300, 
                    intelligence: 30, 
                    crit: 6.5, 
                    description: '青木宗筑基期武器，气血+2%，回血+0.4%，法术防御+2%',
                    sectExclusive: 'qingmu', 
                    set: 'wan mu', 
                    realm: '筑基期',
                    price: 0
                },
                '长生琴': { 
                    name: '长生琴', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 625, 
                    intelligence: 37, 
                    crit: 8.75, 
                    description: '青木宗金丹期武器，气血+8%，回血+0.5%，受击有5%概率触发青木护心',
                    sectExclusive: 'qingmu', 
                    set: 'chang sheng', 
                    realm: '金丹期',
                    price: 0
                },
                '枯荣琴': { 
                    name: '枯荣琴', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 1200, 
                    intelligence: 70, 
                    hp: 750, 
                    regen: 20, 
                    magicDefense: 50, 
                    description: '青木宗元婴期武器，气血+10%，回血+0.8%，双防+2%，青木护心触发概率提升至8%',
                    sectExclusive: 'qingmu', 
                    set: 'ku rong', 
                    realm: '元婴期',
                    price: 0
                },
                '凝水珠': { 
                    name: '凝水珠', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 275, 
                    intelligence: 25, 
                    crit: 6, 
                    description: '水月宫炼气期武器，法攻+2%，速度+1.5%',
                    sectExclusive: 'shuiyue', 
                    set: 'ning shui', 
                    realm: '炼气期',
                    price: 0
                },
                '流霜珠': { 
                    name: '流霜珠', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 300, 
                    intelligence: 30, 
                    crit: 6.5, 
                    description: '水月宫筑基期武器，法攻+6%，速度+3%，闪避+2%',
                    sectExclusive: 'shuiyue', 
                    set: 'liu shuang', 
                    realm: '筑基期',
                    price: 0
                },
                '沧澜珠': { 
                    name: '沧澜珠', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 625, 
                    intelligence: 45, 
                    crit: 8.75, 
                    description: '水月宫金丹期武器，法攻+12%，速度+4%，闪避+3%，攻击有5%概率冰冻目标',
                    sectExclusive: 'shuiyue', 
                    set: 'cang lan', 
                    realm: '金丹期',
                    price: 0
                },
                '沧海珠': { 
                    name: '沧海珠', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 1200, 
                    intelligence: 70, 
                    speed: 50, 
                    dodge: 25, 
                    description: '水月宫元婴期武器，法攻+10%，速度+5%，闪避+5%，冰冻概率提升至8%',
                    sectExclusive: 'shuiyue', 
                    set: 'cang hai', 
                    realm: '元婴期',
                    price: 0
                },
                '赤焰杖': { 
                    name: '赤焰杖', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 275, 
                    intelligence: 25, 
                    crit: 6, 
                    burn: 1, 
                    description: '炎火殿炼气期武器，法攻+5%，灼烧伤害+1%',
                    sectExclusive: 'yanhuo', 
                    set: 'chi yan', 
                    realm: '炼气期',
                    price: 0
                },
                '焚天杖': { 
                    name: '焚天杖', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 300, 
                    intelligence: 30, 
                    crit: 6.5, 
                    burn: 10, 
                    description: '炎火殿筑基期武器，法攻+6%，暴击+2%，灼烧持续时间延长10%',
                    sectExclusive: 'yanhuo', 
                    set: 'fen tian', 
                    realm: '筑基期',
                    price: 0
                },
                '炎狱杖': { 
                    name: '炎狱杖', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 625, 
                    intelligence: 45, 
                    crit: 8.75, 
                    burn: 20, 
                    description: '炎火殿金丹期武器，法攻+7%，暴击+3%，灼烧伤害+20%，暴击有6%概率引爆灼烧',
                    sectExclusive: 'yanhuo', 
                    set: 'yan yu', 
                    realm: '金丹期',
                    price: 0
                },
                '九天杖': { 
                    name: '九天杖', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 1200, 
                    intelligence: 80, 
                    crit: 17.5, 
                    critDmg: 10, 
                    burn: 20, 
                    description: '炎火殿元婴期武器，法攻+13%，暴击+5%，暴击伤害+7%，灼烧引爆概率提升至10%',
                    sectExclusive: 'yanhuo', 
                    set: 'jiu tian', 
                    realm: '元婴期',
                    price: 0
                },
                '赤焰剑': { 
                    name: '赤焰剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 850, 
                    strength: 60, 
                    crit: 12, 
                    description: '金丹期橙色武器，火系伤害+15%，攻击有概率触发焚火效果',
                    realm: '金丹期',
                    price: 0
                },
                '万魂剑': { 
                    name: '万魂剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 800, 
                    intelligence: 60, 
                    dodge: 8, 
                    description: '金丹期橙色武器，木系伤害+15%，攻击有概率吸取敌人气血',
                    realm: '金丹期',
                    price: 0
                },
                '玄冰剑': { 
                    name: '玄冰剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 1100, 
                    intelligence: 80, 
                    crit: 15, 
                    description: '元婴期橙色武器，水系伤害+20%，攻击有概率冰冻目标',
                    realm: '元婴期',
                    price: 0
                },
                '星空剑': { 
                    name: '星空剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 1500, 
                    strength: 100, 
                    crit: 20, 
                    description: '化神期橙色武器，星空之力+25%，攻击有概率造成真实伤害',
                    realm: '化神期',
                    price: 0
                },
                // 炼气期秘境武器
                '灵草剑': { 
                    name: '灵草剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'rare', 
                    attack: 60, 
                    intelligence: 15, 
                    description: '炼气期蓝色武器，灵草之气加持，攻击附带微弱灵气',
                    realm: '炼气期',
                    price: 0
                },
                '兽牙匕': { 
                    name: '兽牙匕', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'rare', 
                    attack: 55, 
                    crit: 4, 
                    description: '炼气期蓝色武器，妖兽之牙打造，暴击率+3%',
                    realm: '炼气期',
                    price: 0
                },
                // 筑基期秘境武器
                '黑风剑': { 
                    name: '黑风剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 150, 
                    strength: 18, 
                    description: '筑基期紫色武器，黑风之力加持，物攻+8%',
                    realm: '筑基期',
                    price: 0
                },
                '残月刀': { 
                    name: '残月刀', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 140, 
                    intelligence: 18, 
                    description: '筑基期紫色武器，残月之力，法攻+7%',
                    realm: '筑基期',
                    price: 0
                },
                // 金丹期秘境武器（普通）
                '赤焰刀': { 
                    name: '赤焰刀', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 400, 
                    strength: 30, 
                    crit: 6, 
                    description: '金丹期紫色武器，赤焰之力，物攻+10%',
                    realm: '金丹期',
                    price: 0
                },
                '万魂杖': { 
                    name: '万魂杖', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 380, 
                    intelligence: 30, 
                    regen: 10, 
                    description: '金丹期紫色武器，万魂之力，法攻+9%',
                    realm: '金丹期',
                    price: 0
                },
                // 元婴期秘境武器（普通）
                '玄冰剑': { 
                    name: '玄冰剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 700, 
                    intelligence: 45, 
                    crit: 10, 
                    description: '元婴期紫色武器，玄冰之力，物攻+12%',
                    realm: '元婴期',
                    price: 0
                },
                '雷云锤': { 
                    name: '雷云锤', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 680, 
                    intelligence: 45, 
                    crit: 10, 
                    description: '元婴期紫色武器，雷云之力，法攻+11%',
                    realm: '元婴期',
                    price: 0
                },
                // 化神期秘境武器（普通）
                '星空刀': { 
                    name: '星空刀', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 1000, 
                    strength: 60, 
                    crit: 15, 
                    description: '化神期紫色武器，星空之力，物攻+15%',
                    realm: '化神期',
                    price: 0
                },
                '混沌杖': { 
                    name: '混沌杖', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    magicDamage: 980, 
                    intelligence: 60, 
                    crit: 15, 
                    description: '化神期紫色武器，混沌之力，法攻+14%',
                    realm: '化神期',
                    price: 0
                },
                // 金丹期困难秘境武器（橙色）
                '赤焰金阳剑': { 
                    name: '赤焰金阳剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    attack: 900, 
                    strength: 65, 
                    crit: 14, 
                    description: '金丹期橙色武器，金阳门专属，金系伤害+18%，暴击率+8%',
                    realm: '金丹期',
                    price: 0
                },
                '赤焰皇土棍': { 
                    name: '赤焰皇土棍', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    attack: 880, 
                    strength: 60, 
                    defense: 50, 
                    description: '金丹期橙色武器，皇土阁专属，土系伤害+18%，物防+12%',
                    realm: '金丹期',
                    price: 0
                },
                '万魂水月珠': { 
                    name: '万魂水月珠', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    magicDamage: 870, 
                    intelligence: 65, 
                    dodge: 10, 
                    description: '金丹期橙色武器，水月宫专属，水系伤害+18%，闪避+10%',
                    realm: '金丹期',
                    price: 0
                },
                '万魂炎火杖': { 
                    name: '万魂炎火杖', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    magicDamage: 890, 
                    intelligence: 60, 
                    burn: 25, 
                    description: '金丹期橙色武器，炎火殿专属，火系伤害+18%，灼烧伤害+30%',
                    realm: '金丹期',
                    price: 0
                },
                '万魂青木琴': { 
                    name: '万魂青木琴', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    magicDamage: 860, 
                    intelligence: 60, 
                    regen: 20, 
                    description: '金丹期橙色武器，青木宗专属，木系伤害+18%，回血效果+25%',
                    realm: '金丹期',
                    price: 0
                },
                // 元婴期困难秘境武器（橙色）
                '玄冰金阳剑': { 
                    name: '玄冰金阳剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    attack: 1200, 
                    strength: 85, 
                    crit: 18, 
                    description: '元婴期橙色武器，金阳门专属，金系伤害+22%，暴击率+10%',
                    realm: '元婴期',
                    price: 0
                },
                '玄冰皇土盾': { 
                    name: '玄冰皇土盾', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    attack: 1150, 
                    strength: 80, 
                    defense: 80, 
                    description: '元婴期橙色武器，皇土阁专属，土系伤害+22%，物防+18%',
                    realm: '元婴期',
                    price: 0
                },
                '雷云水月剑': { 
                    name: '雷云水月剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    magicDamage: 1180, 
                    intelligence: 85, 
                    dodge: 15, 
                    description: '元婴期橙色武器，水月宫专属，水系伤害+22%，闪避+15%',
                    realm: '元婴期',
                    price: 0
                },
                '雷云炎火杖': { 
                    name: '雷云炎火杖', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    magicDamage: 1200, 
                    intelligence: 80, 
                    burn: 35, 
                    description: '元婴期橙色武器，炎火殿专属，火系伤害+22%，灼烧伤害+40%',
                    realm: '元婴期',
                    price: 0
                },
                '雷云青木琴': { 
                    name: '雷云青木琴', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    magicDamage: 1160, 
                    intelligence: 80, 
                    regen: 30, 
                    description: '元婴期橙色武器，青木宗专属，木系伤害+22%，回血效果+35%',
                    realm: '元婴期',
                    price: 0
                },
                // 化神期困难秘境武器（橙色）
                '星空金阳剑': { 
                    name: '星空金阳剑', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    attack: 1600, 
                    strength: 110, 
                    crit: 22, 
                    description: '化神期橙色武器，金阳门专属，金系伤害+25%，暴击率+12%',
                    realm: '化神期',
                    price: 0
                },
                '星空皇土锤': { 
                    name: '星空皇土锤', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    attack: 1550, 
                    strength: 100, 
                    defense: 110, 
                    description: '化神期橙色武器，皇土阁专属，土系伤害+25%，物防+22%',
                    realm: '化神期',
                    price: 0
                },
                '混沌水月珠': { 
                    name: '混沌水月珠', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    magicDamage: 1580, 
                    intelligence: 110, 
                    dodge: 20, 
                    description: '化神期橙色武器，水月宫专属，水系伤害+25%，闪避+20%',
                    realm: '化神期',
                    price: 0
                },
                '混沌炎火杖': { 
                    name: '混沌炎火杖', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    magicDamage: 1600, 
                    intelligence: 100, 
                    burn: 45, 
                    description: '化神期橙色武器，炎火殿专属，火系伤害+25%，灼烧伤害+50%',
                    realm: '化神期',
                    price: 0
                },
                '混沌青木琴': { 
                    name: '混沌青木琴', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'legendary', 
                    magicDamage: 1560, 
                    intelligence: 100, 
                    regen: 40, 
                    description: '化神期橙色武器，青木宗专属，木系伤害+25%，回血效果+45%',
                    realm: '化神期',
                    price: 0
                },
                '黄土棍': { 
                    name: '黄土棍', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 275, 
                    strength: 25, 
                    vitality: 6, 
                    description: '皇土阁炼气期武器，物防+2%，气血+2%',
                    sectExclusive: 'huangtu', 
                    set: 'huang tu',
                    realm: '炼气期',
                    price: 0
                },
                '磐石棍': { 
                    name: '磐石棍', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 300, 
                    strength: 30, 
                    vitality: 6.5, 
                    description: '皇土阁筑基期武器，物防+4%，法防+3%，气血+4%',
                    sectExclusive: 'huangtu', 
                    set: 'pan shi',
                    realm: '筑基期',
                    price: 0
                },
                '镇岳棍': { 
                    name: '镇岳棍', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 625, 
                    strength: 37, 
                    vitality: 8.75, 
                    description: '皇土阁金丹期武器，双防+10%，气血+6%，受击有5%概率反震伤害',
                    sectExclusive: 'huangtu', 
                    set: 'zhen yue',
                    realm: '金丹期',
                    price: 0
                },
                '万岳棍': { 
                    name: '万岳棍', 
                    displayType: '武器',
                    type: 'weapon',
                    rarity: 'epic', 
                    attack: 1000, 
                    strength: 60, 
                    vitality: 14, 
                    description: '皇土阁元婴期武器，双防+16%，气血+8%，反震概率提升至8%',
                    sectExclusive: 'huangtu', 
                    set: 'wan yue',
                    realm: '元婴期',
                    price: 0
                }
            },
            // 防具-头盔
            HELMETS: {
                '鎏金盔': { 
                    name: '鎏金盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 65, 
                    vitality: 20, 
                    description: '金阳门炼气期头盔，物攻+3%，物防+2%',
                    sectExclusive: 'jinyang', 
                    set: 'liu jin',
                    realm: '炼气期',
                    price: 0
                },
                '烈阳盔': { 
                    name: '烈阳盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 75, 
                    vitality: 22, 
                    description: '金阳门筑基期头盔，物攻+5%，物防+3%，暴击率+1%',
                    sectExclusive: 'jinyang', 
                    set: 'lie yang',
                    realm: '筑基期',
                    price: 0
                },
                '镇金盔': { 
                    name: '镇金盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 110, 
                    vitality: 35, 
                    description: '金阳门金丹期头盔，物攻+8%，物防+5%，暴击率+2%',
                    sectExclusive: 'jinyang', 
                    set: 'zhen jin',
                    realm: '金丹期',
                    price: 0
                },
                '金阙盔': { 
                    name: '金阙盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    attack: 120, 
                    defense: 90, 
                    vitality: 60, 
                    crit: 12, 
                    description: '金阳门元婴期头盔，物攻+12%，物防+8%，暴击率+3%',
                    sectExclusive: 'jinyang', 
                    set: 'jin que',
                    realm: '元婴期',
                    price: 0
                },
                '青岚盔': { 
                    name: '青岚盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 65, 
                    vitality: 20, 
                    description: '青木宗炼气期头盔，气血+2%，每秒回血+0.2%',
                    sectExclusive: 'qingmu', 
                    set: 'qing lan',
                    realm: '炼气期',
                    price: 0
                },
                '万木盔': { 
                    name: '万木盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 75, 
                    vitality: 22, 
                    description: '青木宗筑基期头盔，气血+4%，回血+0.4%，法术防御+2%',
                    sectExclusive: 'qingmu', 
                    set: 'wan mu',
                    realm: '筑基期',
                    price: 0
                },
                '长生盔': { 
                    name: '长生盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 110, 
                    vitality: 35, 
                    description: '青木宗金丹期头盔，气血+6%，回血+0.5%，受击有5%概率触发青木护心',
                    sectExclusive: 'qingmu', 
                    set: 'chang sheng',
                    realm: '金丹期',
                    price: 0
                },
                '枯荣盔': { 
                    name: '枯荣盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    hp: 900, 
                    defense: 90, 
                    vitality: 60, 
                    regen: 18, 
                    magicDefense: 45, 
                    description: '青木宗元婴期头盔，气血+8%，回血+0.8%，双防+3%，青木护心触发概率提升至8%',
                    sectExclusive: 'qingmu', 
                    set: 'ku rong',
                    realm: '元婴期',
                    price: 0
                },
                '凝水盔': { 
                    name: '凝水盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 65, 
                    intelligence: 25, 
                    description: '水月宫炼气期头盔，法攻+2%，速度+1.5%',
                    sectExclusive: 'shuiyue', 
                    set: 'ning shui',
                    realm: '炼气期',
                    price: 0
                },
                '流霜盔': { 
                    name: '流霜盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 75, 
                    intelligence: 30, 
                    description: '水月宫筑基期头盔，法攻+4%，速度+3%，闪避+2%',
                    sectExclusive: 'shuiyue', 
                    set: 'liu shuang',
                    realm: '筑基期',
                    price: 0
                },
                '沧澜盔': { 
                    name: '沧澜盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 110, 
                    intelligence: 45, 
                    description: '水月宫金丹期头盔，法攻+6%，速度+4%，闪避+3%，攻击有5%概率冰冻目标',
                    sectExclusive: 'shuiyue', 
                    set: 'cang lan',
                    realm: '金丹期',
                    price: 0
                },
                '沧海盔': { 
                    name: '沧海盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    magicDamage: 120, 
                    defense: 85, 
                    intelligence: 60, 
                    speed: 45, 
                    dodge: 18, 
                    description: '水月宫元婴期头盔，法攻+8%，速度+5%，闪避+4%，冰冻概率提升至8%',
                    sectExclusive: 'shuiyue', 
                    set: 'cang hai',
                    realm: '元婴期',
                    price: 0
                },
                '赤焰盔': { 
                    name: '赤焰盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 65, 
                    intelligence: 25, 
                    burn: 1, 
                    description: '炎火殿炼气期头盔，法攻+2%，灼烧伤害+1%',
                    sectExclusive: 'yanhuo', 
                    set: 'chi yan',
                    realm: '炼气期',
                    price: 0
                },
                '焚天盔': { 
                    name: '焚天盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 75, 
                    intelligence: 30, 
                    burn: 10, 
                    description: '炎火殿筑基期头盔，法攻+4%，暴击+2%，灼烧持续时间延长10%',
                    sectExclusive: 'yanhuo', 
                    set: 'fen tian',
                    realm: '筑基期',
                    price: 0
                },
                '炎狱盔': { 
                    name: '炎狱盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 110, 
                    intelligence: 45, 
                    burn: 20, 
                    description: '炎火殿金丹期头盔，法攻+7%，暴击+3%，灼烧伤害+20%，暴击有6%概率引爆灼烧',
                    sectExclusive: 'yanhuo', 
                    set: 'yan yu',
                    realm: '金丹期',
                    price: 0
                },
                '九天盔': { 
                    name: '九天盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    magicDamage: 120, 
                    defense: 90, 
                    intelligence: 60, 
                    crit: 12, 
                    burn: 20, 
                    description: '炎火殿元婴期头盔，法攻+9%，暴击+4%，暴击伤害+7%，灼烧引爆概率提升至10%',
                    sectExclusive: 'yanhuo', 
                    set: 'jiu tian',
                    realm: '元婴期',
                    price: 0
                },
                '黄土盔': { 
                    name: '黄土盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 65, 
                    vitality: 20, 
                    description: '皇土阁炼气期头盔，物防+2%，气血+2%',
                    sectExclusive: 'huangtu', 
                    set: 'huang tu',
                    realm: '炼气期',
                    price: 0
                },
                '磐石盔': { 
                    name: '磐石盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 75, 
                    vitality: 22, 
                    description: '皇土阁筑基期头盔，物防+4%，法防+3%，气血+4%',
                    sectExclusive: 'huangtu', 
                    set: 'pan shi',
                    realm: '筑基期',
                    price: 0
                },
                '镇岳盔': { 
                    name: '镇岳盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 110, 
                    vitality: 35, 
                    description: '皇土阁金丹期头盔，双防+5%，气血+6%，受击有5%概率反震伤害',
                    sectExclusive: 'huangtu', 
                    set: 'zhen yue',
                    realm: '金丹期',
                    price: 0
                },
                '万岳盔': { 
                    name: '万岳盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 175, 
                    vitality: 50, 
                    description: '皇土阁元婴期头盔，双防+8%，气血+8%，反震概率提升至8%',
                    sectExclusive: 'huangtu', 
                    set: 'wan yue',
                    realm: '元婴期',
                    price: 0
                },
                // 炼气期秘境头盔
                '灵草盔': { 
                    name: '灵草盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'rare', 
                    defense: 25, 
                    vitality: 10, 
                    description: '炼气期蓝色头盔，灵草之气保护头部',
                    realm: '炼气期',
                    price: 0
                },
                '兽皮帽': { 
                    name: '兽皮帽', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'rare', 
                    defense: 22, 
                    agility: 8, 
                    description: '炼气期蓝色头盔，妖兽皮毛缝制',
                    realm: '炼气期',
                    price: 0
                },
                // 筑基期秘境头盔
                '黑风盔': { 
                    name: '黑风盔', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 50, 
                    vitality: 15, 
                    description: '筑基期紫色头盔，黑风之力保护',
                    realm: '筑基期',
                    price: 0
                },
                '残月冠': { 
                    name: '残月冠', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 48, 
                    intelligence: 15, 
                    description: '筑基期紫色头盔，残月之力守护',
                    realm: '筑基期',
                    price: 0
                },
                // 金丹期秘境头盔（普通）
                '赤焰冠': { 
                    name: '赤焰冠', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 80, 
                    vitality: 25, 
                    description: '金丹期紫色头盔，赤焰守护',
                    realm: '金丹期',
                    price: 0
                },
                '万魂冠': { 
                    name: '万魂冠', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 78, 
                    intelligence: 25, 
                    description: '金丹期紫色头盔，万魂守护',
                    realm: '金丹期',
                    price: 0
                },
                // 元婴期秘境头盔（普通）
                '玄冰冠': { 
                    name: '玄冰冠', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 130, 
                    vitality: 40, 
                    description: '元婴期紫色头盔，玄冰守护',
                    realm: '元婴期',
                    price: 0
                },
                '雷云冠': { 
                    name: '雷云冠', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 125, 
                    intelligence: 40, 
                    description: '元婴期紫色头盔，雷云守护',
                    realm: '元婴期',
                    price: 0
                },
                // 化神期秘境头盔（普通）
                '星空冠': { 
                    name: '星空冠', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 180, 
                    vitality: 55, 
                    description: '化神期紫色头盔，星空守护',
                    realm: '化神期',
                    price: 0
                },
                '混沌冠': { 
                    name: '混沌冠', 
                    displayType: '头盔',
                    type: 'helmet',
                    rarity: 'epic', 
                    defense: 175, 
                    intelligence: 55, 
                    description: '化神期紫色头盔，混沌守护',
                    realm: '化神期',
                    price: 0
                }
            },
            // 防具-胸甲
            CHESTS: {
                '粗布衣服': { 
                    name: '粗布衣服', 
                    displayType: '防具',
                    type: 'chest',
                    rarity: 'common', 
                    defense: 1, 
                    description: '普通的粗布衣服',
                    realm: '炼气期',
                    price: 20
                },
                '破旧布衣': { 
                    name: '破旧布衣', 
                    displayType: '防具',
                    type: 'chest',
                    rarity: 'common', 
                    defense: 1, 
                    description: '破旧的布衣，提供基础防御',
                    realm: '炼气期',
                    price: 15
                },
                '粗布衫': { 
                    name: '粗布衫', 
                    displayType: '防具',
                    type: 'chest',
                    rarity: 'common', 
                    defense: 2, 
                    description: '粗布做的衣衫',
                    realm: '炼气期',
                    price: 25
                },
                '丝绸衣服': { 
                    name: '丝绸衣服', 
                    displayType: '防具',
                    type: 'chest',
                    rarity: 'uncommon', 
                    defense: 3, 
                    description: '丝绸做的衣服',
                    realm: '炼气期',
                    price: 100
                },
                '布甲': { 
                    name: '布甲', 
                    displayType: '防具',
                    type: 'chest',
                    rarity: 'common', 
                    defense: 5, 
                    description: '普通布甲',
                    realm: '炼气期',
                    price: 80
                },
                '守岚者披风': { 
                    name: '守岚者披风', 
                    displayType: '防具',
                    type: 'chest',
                    rarity: 'rare', 
                    defense: 5, 
                    description: '守岚者的披风，增加瘴气抗性',
                    realm: '炼气期',
                    price: 400
                },
                '鎏金甲': { 
                    name: '鎏金甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 1250, 
                    defense: 100, 
                    vitality: 20, 
                    description: '金阳门炼气期胸甲，物攻+3%，物防+2%',
                    sectExclusive: 'jinyang', 
                    set: 'liu jin',
                    realm: '炼气期',
                    price: 0
                },
                '烈阳甲': { 
                    name: '烈阳甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 1500, 
                    defense: 125, 
                    vitality: 22, 
                    description: '金阳门筑基期胸甲，物攻+5%，物防+3%，暴击率+1%',
                    sectExclusive: 'jinyang', 
                    set: 'lie yang',
                    realm: '筑基期',
                    price: 0
                },
                '镇金甲': { 
                    name: '镇金甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 3750, 
                    defense: 200, 
                    vitality: 35, 
                    description: '金阳门金丹期胸甲，物攻+8%，物防+5%，暴击率+2%',
                    sectExclusive: 'jinyang', 
                    set: 'zhen jin',
                    realm: '金丹期',
                    price: 0
                },
                '金阙甲': { 
                    name: '金阙甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    attack: 110, 
                    defense: 120, 
                    hp: 1200, 
                    crit: 12, 
                    description: '金阳门元婴期胸甲，物攻+12%，物防+8%，暴击率+3%',
                    sectExclusive: 'jinyang', 
                    set: 'jin que',
                    realm: '元婴期',
                    price: 0
                },
                '青岚甲': { 
                    name: '青岚甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 1250, 
                    defense: 100, 
                    vitality: 20, 
                    description: '青木宗炼气期胸甲，气血+2%，每秒回血+0.2%',
                    sectExclusive: 'qingmu', 
                    set: 'qing lan',
                    realm: '炼气期',
                    price: 0
                },
                '万木甲': { 
                    name: '万木甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 1500, 
                    defense: 125, 
                    vitality: 22, 
                    description: '青木宗筑基期胸甲，气血+4%，回血+0.4%，法术防御+2%',
                    sectExclusive: 'qingmu', 
                    set: 'wan mu',
                    realm: '筑基期',
                    price: 0
                },
                '长生甲': { 
                    name: '长生甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 3750, 
                    defense: 200, 
                    vitality: 35, 
                    description: '青木宗金丹期胸甲，气血+6%，回血+0.5%，受击有5%概率触发青木护心',
                    sectExclusive: 'qingmu', 
                    set: 'chang sheng',
                    realm: '金丹期',
                    price: 0
                },
                '枯荣甲': { 
                    name: '枯荣甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 1200, 
                    defense: 120, 
                    vitality: 70, 
                    regen: 25, 
                    magicDefense: 60, 
                    description: '青木宗元婴期胸甲，气血+8%，回血+0.8%，双防+3%，青木护心触发概率提升至8%',
                    sectExclusive: 'qingmu', 
                    set: 'ku rong',
                    realm: '元婴期',
                    price: 0
                },
                '凝水甲': { 
                    name: '凝水甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 1250, 
                    defense: 100, 
                    intelligence: 25, 
                    description: '水月宫炼气期胸甲，法攻+2%，速度+1.5%',
                    sectExclusive: 'shuiyue', 
                    set: 'ning shui',
                    realm: '炼气期',
                    price: 0
                },
                '流霜甲': { 
                    name: '流霜甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 1500, 
                    defense: 125, 
                    intelligence: 30, 
                    description: '水月宫筑基期胸甲，法攻+4%，速度+3%，闪避+2%',
                    sectExclusive: 'shuiyue', 
                    set: 'liu shuang',
                    realm: '筑基期',
                    price: 0
                },
                '沧澜甲': { 
                    name: '沧澜甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 3750, 
                    defense: 200, 
                    intelligence: 45, 
                    description: '水月宫金丹期胸甲，法攻+6%，速度+4%，闪避+3%，攻击有5%概率冰冻目标',
                    sectExclusive: 'shuiyue', 
                    set: 'cang lan',
                    realm: '金丹期',
                    price: 0
                },
                '沧海甲': { 
                    name: '沧海甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    magicDamage: 110, 
                    defense: 110, 
                    hp: 900, 
                    speed: 45, 
                    dodge: 18, 
                    description: '水月宫元婴期胸甲，法攻+8%，速度+5%，闪避+4%，冰冻概率提升至8%',
                    sectExclusive: 'shuiyue', 
                    set: 'cang hai',
                    realm: '元婴期',
                    price: 0
                },
                '赤焰甲': { 
                    name: '赤焰甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 1250, 
                    defense: 100, 
                    intelligence: 25, 
                    burn: 1, 
                    description: '炎火殿炼气期胸甲，法攻+2%，灼烧伤害+1%',
                    sectExclusive: 'yanhuo', 
                    set: 'chi yan',
                    realm: '炼气期',
                    price: 0
                },
                '焚天甲': { 
                    name: '焚天甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 1500, 
                    defense: 125, 
                    intelligence: 30, 
                    burn: 10, 
                    description: '炎火殿筑基期胸甲，法攻+4%，暴击+2%，灼烧持续时间延长10%',
                    sectExclusive: 'yanhuo', 
                    set: 'fen tian',
                    realm: '筑基期',
                    price: 0
                },
                '炎狱甲': { 
                    name: '炎狱甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 3750, 
                    defense: 200, 
                    intelligence: 45, 
                    burn: 20, 
                    description: '炎火殿金丹期胸甲，法攻+7%，暴击+3%，灼烧伤害+20%，暴击有6%概率引爆灼烧',
                    sectExclusive: 'yanhuo', 
                    set: 'yan yu',
                    realm: '金丹期',
                    price: 0
                },
                '九天甲': { 
                    name: '九天甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    magicDamage: 110, 
                    defense: 120, 
                    hp: 1200, 
                    intelligence: 70, 
                    crit: 12, 
                    burn: 20, 
                    description: '炎火殿元婴期胸甲，法攻+9%，暴击+4%，暴击伤害+7%，灼烧引爆概率提升至10%',
                    sectExclusive: 'yanhuo', 
                    set: 'jiu tian',
                    realm: '元婴期',
                    price: 0
                },
                '黄土甲': { 
                    name: '黄土甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 1250, 
                    defense: 100, 
                    vitality: 20, 
                    description: '皇土阁炼气期胸甲，物防+2%，气血+2%',
                    sectExclusive: 'huangtu', 
                    set: 'huang tu',
                    realm: '炼气期',
                    price: 0
                },
                '磐石甲': { 
                    name: '磐石甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 1500, 
                    defense: 125, 
                    vitality: 22, 
                    description: '皇土阁筑基期胸甲，物防+4%，法防+3%，气血+4%',
                    sectExclusive: 'huangtu', 
                    set: 'pan shi',
                    realm: '筑基期',
                    price: 0
                },
                '镇岳甲': { 
                    name: '镇岳甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 3750, 
                    defense: 200, 
                    vitality: 35, 
                    description: '皇土阁金丹期胸甲，双防+5%，气血+6%，受击有5%概率反震伤害',
                    sectExclusive: 'huangtu', 
                    set: 'zhen yue',
                    realm: '金丹期',
                    price: 0
                },
                '万岳甲': { 
                    name: '万岳甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    hp: 6000, 
                    defense: 320, 
                    vitality: 50, 
                    description: '皇土阁元婴期胸甲，双防+8%，气血+8%，反震概率提升至8%',
                    sectExclusive: 'huangtu', 
                    set: 'wan yue',
                    realm: '元婴期',
                    price: 0
                },
                // 炼气期秘境胸甲
                '灵草甲': { 
                    name: '灵草甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'rare', 
                    defense: 40, 
                    hp: 500, 
                    description: '炼气期蓝色胸甲，灵草之气保护身躯',
                    realm: '炼气期',
                    price: 0
                },
                '兽皮衣': { 
                    name: '兽皮衣', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'rare', 
                    defense: 38, 
                    hp: 450, 
                    description: '炼气期蓝色胸甲，妖兽皮革缝制',
                    realm: '炼气期',
                    price: 0
                },
                // 筑基期秘境胸甲
                '黑风甲': { 
                    name: '黑风甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    defense: 80, 
                    hp: 1000, 
                    description: '筑基期紫色胸甲，黑风之力护身',
                    realm: '筑基期',
                    price: 0
                },
                '残月袍': { 
                    name: '残月袍', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    defense: 75, 
                    hp: 950, 
                    mp: 200, 
                    description: '筑基期紫色胸甲，残月之力加身',
                    realm: '筑基期',
                    price: 0
                },
                // 金丹期秘境胸甲（普通）
                '赤焰甲': { 
                    name: '赤焰甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    defense: 130, 
                    hp: 2500, 
                    description: '金丹期紫色胸甲，赤焰加身',
                    realm: '金丹期',
                    price: 0
                },
                '万魂袍': { 
                    name: '万魂袍', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    defense: 125, 
                    hp: 2400, 
                    mp: 500, 
                    description: '金丹期紫色胸甲，万魂加身',
                    realm: '金丹期',
                    price: 0
                },
                // 元婴期秘境胸甲（普通）
                '玄冰甲': { 
                    name: '玄冰甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    defense: 200, 
                    hp: 4000, 
                    description: '元婴期紫色胸甲，玄冰加身',
                    realm: '元婴期',
                    price: 0
                },
                '雷云峰甲': { 
                    name: '雷云峰甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    defense: 190, 
                    hp: 3800, 
                    mp: 800, 
                    description: '元婴期紫色胸甲，雷云加身',
                    realm: '元婴期',
                    price: 0
                },
                // 化神期秘境胸甲（普通）
                '星空甲': { 
                    name: '星空甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    defense: 280, 
                    hp: 6000, 
                    description: '化神期紫色胸甲，星空加身',
                    realm: '化神期',
                    price: 0
                },
                '混沌甲': { 
                    name: '混沌甲', 
                    displayType: '胸甲',
                    type: 'chest',
                    rarity: 'epic', 
                    defense: 270, 
                    hp: 5800, 
                    mp: 1200, 
                    description: '化神期紫色胸甲，混沌加身',
                    realm: '化神期',
                    price: 0
                }
            },
            // 防具-护肩
            SHOULDERS: {
                '鎏金护肩': { 
                    name: '鎏金护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 65, 
                    vitality: 18, 
                    description: '金阳门炼气期护肩，物攻+3%，物防+2%',
                    sectExclusive: 'jinyang', 
                    set: 'liu jin',
                    realm: '炼气期',
                    price: 0
                },
                '烈阳护肩': { 
                    name: '烈阳护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 75, 
                    vitality: 20, 
                    description: '金阳门筑基期护肩，物攻+5%，物防+3%，暴击率+1%',
                    sectExclusive: 'jinyang', 
                    set: 'lie yang',
                    realm: '筑基期',
                    price: 0
                },
                '镇金护肩': { 
                    name: '镇金护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 110, 
                    vitality: 30, 
                    description: '金阳门金丹期护肩，物攻+8%，物防+5%，暴击率+2%',
                    sectExclusive: 'jinyang', 
                    set: 'zhen jin',
                    realm: '金丹期',
                    price: 0
                },
                '金阙护肩': { 
                    name: '金阙护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    attack: 90, 
                    defense: 90, 
                    vitality: 50, 
                    crit: 9, 
                    description: '金阳门元婴期护肩，物攻+12%，物防+8%，暴击率+3%',
                    sectExclusive: 'jinyang', 
                    set: 'jin que',
                    realm: '元婴期',
                    price: 0
                },
                '青岚护肩': { 
                    name: '青岚护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 65, 
                    vitality: 18, 
                    description: '青木宗炼气期护肩，气血+2%，每秒回血+0.2%',
                    sectExclusive: 'qingmu', 
                    set: 'qing lan',
                    realm: '炼气期',
                    price: 0
                },
                '万木护肩': { 
                    name: '万木护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 75, 
                    vitality: 20, 
                    description: '青木宗筑基期护肩，气血+4%，回血+0.4%，法术防御+2%',
                    sectExclusive: 'qingmu', 
                    set: 'wan mu',
                    realm: '筑基期',
                    price: 0
                },
                '长生护肩': { 
                    name: '长生护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 110, 
                    vitality: 30, 
                    description: '青木宗金丹期护肩，气血+6%，回血+0.5%，受击有5%概率触发青木护心',
                    sectExclusive: 'qingmu', 
                    set: 'chang sheng',
                    realm: '金丹期',
                    price: 0
                },
                '枯荣护肩': { 
                    name: '枯荣护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    hp: 750, 
                    defense: 90, 
                    vitality: 50, 
                    regen: 15, 
                    magicDefense: 45, 
                    description: '青木宗元婴期护肩，气血+8%，回血+0.8%，双防+3%，青木护心触发概率提升至8%',
                    sectExclusive: 'qingmu', 
                    set: 'ku rong',
                    realm: '元婴期',
                    price: 0
                },
                '凝水护肩': { 
                    name: '凝水护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 65, 
                    intelligence: 22, 
                    description: '水月宫炼气期护肩，法攻+2%，速度+1.5%',
                    sectExclusive: 'shuiyue', 
                    set: 'ning shui',
                    realm: '炼气期',
                    price: 0
                },
                '流霜护肩': { 
                    name: '流霜护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 75, 
                    intelligence: 25, 
                    description: '水月宫筑基期护肩，法攻+4%，速度+3%，闪避+2%',
                    sectExclusive: 'shuiyue', 
                    set: 'liu shuang',
                    realm: '筑基期',
                    price: 0
                },
                '沧澜护肩': { 
                    name: '沧澜护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 110, 
                    intelligence: 40, 
                    description: '水月宫金丹期护肩，法攻+6%，速度+4%，闪避+3%，攻击有5%概率冰冻目标',
                    sectExclusive: 'shuiyue', 
                    set: 'cang lan',
                    realm: '金丹期',
                    price: 0
                },
                '沧海护肩': { 
                    name: '沧海护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    magicDamage: 90, 
                    defense: 90, 
                    intelligence: 50, 
                    speed: 40, 
                    dodge: 15, 
                    description: '水月宫元婴期护肩，法攻+8%，速度+5%，闪避+4%，冰冻概率提升至8%',
                    sectExclusive: 'shuiyue', 
                    set: 'cang hai',
                    realm: '元婴期',
                    price: 0
                },
                '赤焰护肩': { 
                    name: '赤焰护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 65, 
                    intelligence: 22, 
                    burn: 1, 
                    description: '炎火殿炼气期护肩，法攻+2%，灼烧伤害+1%',
                    sectExclusive: 'yanhuo', 
                    set: 'chi yan',
                    realm: '炼气期',
                    price: 0
                },
                '焚天护肩': { 
                    name: '焚天护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 75, 
                    intelligence: 25, 
                    burn: 10, 
                    description: '炎火殿筑基期护肩，法攻+4%，暴击+2%，灼烧持续时间延长10%',
                    sectExclusive: 'yanhuo', 
                    set: 'fen tian',
                    realm: '筑基期',
                    price: 0
                },
                '炎狱护肩': { 
                    name: '炎狱护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 110, 
                    intelligence: 40, 
                    burn: 20, 
                    description: '炎火殿金丹期护肩，法攻+7%，暴击+3%，灼烧伤害+20%，暴击有6%概率引爆灼烧',
                    sectExclusive: 'yanhuo', 
                    set: 'yan yu',
                    realm: '金丹期',
                    price: 0
                },
                '九天护肩': { 
                    name: '九天护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    magicDamage: 90, 
                    defense: 90, 
                    intelligence: 50, 
                    crit: 9, 
                    burn: 20, 
                    description: '炎火殿元婴期护肩，法攻+9%，暴击+4%，暴击伤害+7%，灼烧引爆概率提升至10%',
                    sectExclusive: 'yanhuo', 
                    set: 'jiu tian',
                    realm: '元婴期',
                    price: 0
                },
                '黄土护肩': { 
                    name: '黄土护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 65, 
                    vitality: 18, 
                    description: '皇土阁炼气期护肩，物防+2%，气血+2%',
                    sectExclusive: 'huangtu', 
                    set: 'huang tu',
                    realm: '炼气期',
                    price: 0
                },
                '磐石护肩': { 
                    name: '磐石护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 75, 
                    vitality: 20, 
                    description: '皇土阁筑基期护肩，物防+4%，法防+3%，气血+4%',
                    sectExclusive: 'huangtu', 
                    set: 'pan shi',
                    realm: '筑基期',
                    price: 0
                },
                '镇岳护肩': { 
                    name: '镇岳护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 110, 
                    vitality: 30, 
                    description: '皇土阁金丹期护肩，双防+5%，气血+6%，受击有5%概率反震伤害',
                    sectExclusive: 'huangtu', 
                    set: 'zhen yue',
                    realm: '金丹期',
                    price: 0
                },
                '万岳护肩': { 
                    name: '万岳护肩', 
                    displayType: '护肩',
                    type: 'shoulder',
                    rarity: 'epic', 
                    defense: 175, 
                    vitality: 45, 
                    description: '皇土阁元婴期护肩，双防+8%，气血+8%，反震概率提升至8%',
                    sectExclusive: 'huangtu', 
                    set: 'wan yue',
                    realm: '元婴期',
                    price: 0
                }
            },
            // 防具-护腿
            PANTS: {
                '鎏金护腿': { 
                    name: '鎏金护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 65, 
                    agility: 20, 
                    description: '金阳门炼气期护腿，物攻+3%，物防+2%',
                    sectExclusive: 'jinyang', 
                    set: 'liu jin',
                    realm: '炼气期',
                    price: 0
                },
                '烈阳护腿': { 
                    name: '烈阳护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 75, 
                    agility: 22, 
                    description: '金阳门筑基期护腿，物攻+5%，物防+3%，暴击率+1%',
                    sectExclusive: 'jinyang', 
                    set: 'lie yang',
                    realm: '筑基期',
                    price: 0
                },
                '镇金护腿': { 
                    name: '镇金护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 110, 
                    agility: 35, 
                    description: '金阳门金丹期护腿，物攻+8%，物防+5%，暴击率+2%',
                    sectExclusive: 'jinyang', 
                    set: 'zhen jin',
                    realm: '金丹期',
                    price: 0
                },
                '金阙护腿': { 
                    name: '金阙护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    attack: 90, 
                    defense: 90, 
                    agility: 50, 
                    crit: 9, 
                    description: '金阳门元婴期护腿，物攻+12%，物防+8%，暴击率+3%',
                    sectExclusive: 'jinyang', 
                    set: 'jin que',
                    realm: '元婴期',
                    price: 0
                },
                '青岚护腿': { 
                    name: '青岚护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 65, 
                    agility: 20, 
                    description: '青木宗炼气期护腿，气血+2%，每秒回血+0.2%',
                    sectExclusive: 'qingmu', 
                    set: 'qing lan',
                    realm: '炼气期',
                    price: 0
                },
                '万木护腿': { 
                    name: '万木护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 75, 
                    agility: 22, 
                    description: '青木宗筑基期护腿，气血+4%，回血+0.4%，法术防御+2%',
                    sectExclusive: 'qingmu', 
                    set: 'wan mu',
                    realm: '筑基期',
                    price: 0
                },
                '长生护腿': { 
                    name: '长生护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 110, 
                    agility: 35, 
                    description: '青木宗金丹期护腿，气血+6%，回血+0.5%，受击有5%概率触发青木护心',
                    sectExclusive: 'qingmu', 
                    set: 'chang sheng',
                    realm: '金丹期',
                    price: 0
                },
                '枯荣护腿': { 
                    name: '枯荣护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    hp: 750, 
                    defense: 90, 
                    agility: 50, 
                    regen: 15, 
                    magicDefense: 45, 
                    description: '青木宗元婴期护腿，气血+8%，回血+0.8%，双防+3%，青木护心触发概率提升至8%',
                    sectExclusive: 'qingmu', 
                    set: 'ku rong',
                    realm: '元婴期',
                    price: 0
                },
                '凝水护腿': { 
                    name: '凝水护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 65, 
                    agility: 20, 
                    description: '水月宫炼气期护腿，法攻+2%，速度+1.5%',
                    sectExclusive: 'shuiyue', 
                    set: 'ning shui',
                    realm: '炼气期',
                    price: 0
                },
                '流霜护腿': { 
                    name: '流霜护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 75, 
                    agility: 22, 
                    description: '水月宫筑基期护腿，法攻+4%，速度+3%，闪避+2%',
                    sectExclusive: 'shuiyue', 
                    set: 'liu shuang',
                    realm: '筑基期',
                    price: 0
                },
                '沧澜护腿': { 
                    name: '沧澜护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 110, 
                    agility: 35, 
                    description: '水月宫金丹期护腿，法攻+6%，速度+4%，闪避+3%，攻击有5%概率冰冻目标',
                    sectExclusive: 'shuiyue', 
                    set: 'cang lan',
                    realm: '金丹期',
                    price: 0
                },
                '沧海护腿': { 
                    name: '沧海护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    magicDamage: 90, 
                    defense: 90, 
                    agility: 50, 
                    speed: 40, 
                    dodge: 15, 
                    description: '水月宫元婴期护腿，法攻+8%，速度+5%，闪避+4%，冰冻概率提升至8%',
                    sectExclusive: 'shuiyue', 
                    set: 'cang hai',
                    realm: '元婴期',
                    price: 0
                },
                '赤焰护腿': { 
                    name: '赤焰护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 65, 
                    agility: 20, 
                    burn: 1, 
                    description: '炎火殿炼气期护腿，法攻+2%，灼烧伤害+1%',
                    sectExclusive: 'yanhuo', 
                    set: 'chi yan',
                    realm: '炼气期',
                    price: 0
                },
                '焚天护腿': { 
                    name: '焚天护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 75, 
                    agility: 22, 
                    burn: 10, 
                    description: '炎火殿筑基期护腿，法攻+4%，暴击+2%，灼烧持续时间延长10%',
                    sectExclusive: 'yanhuo', 
                    set: 'fen tian',
                    realm: '筑基期',
                    price: 0
                },
                '炎狱护腿': { 
                    name: '炎狱护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 110, 
                    agility: 35, 
                    burn: 20, 
                    description: '炎火殿金丹期护腿，法攻+7%，暴击+3%，灼烧伤害+20%，暴击有6%概率引爆灼烧',
                    sectExclusive: 'yanhuo', 
                    set: 'yan yu',
                    realm: '金丹期',
                    price: 0
                },
                '九天护腿': { 
                    name: '九天护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    magicDamage: 90, 
                    defense: 90, 
                    agility: 50, 
                    crit: 9, 
                    burn: 20, 
                    description: '炎火殿元婴期护腿，法攻+9%，暴击+4%，暴击伤害+7%，灼烧引爆概率提升至10%',
                    sectExclusive: 'yanhuo', 
                    set: 'jiu tian',
                    realm: '元婴期',
                    price: 0
                },
                '黄土护腿': { 
                    name: '黄土护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 65, 
                    agility: 20, 
                    description: '皇土阁炼气期护腿，物防+2%，气血+2%',
                    sectExclusive: 'huangtu', 
                    set: 'huang tu',
                    realm: '炼气期',
                    price: 0
                },
                '磐石护腿': { 
                    name: '磐石护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 75, 
                    agility: 22, 
                    description: '皇土阁筑基期护腿，物防+4%，法防+3%，气血+4%',
                    sectExclusive: 'huangtu', 
                    set: 'pan shi',
                    realm: '筑基期',
                    price: 0
                },
                '镇岳护腿': { 
                    name: '镇岳护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 110, 
                    agility: 35, 
                    description: '皇土阁金丹期护腿，双防+5%，气血+6%，受击有5%概率反震伤害',
                    sectExclusive: 'huangtu', 
                    set: 'zhen yue',
                    realm: '金丹期',
                    price: 0
                },
                '万岳护腿': { 
                    name: '万岳护腿', 
                    displayType: '护腿',
                    type: 'pants',
                    rarity: 'epic', 
                    defense: 175, 
                    agility: 50, 
                    description: '皇土阁元婴期护腿，双防+8%，气血+8%，反震概率提升至8%',
                    sectExclusive: 'huangtu', 
                    set: 'wan yue',
                    realm: '元婴期',
                    price: 0
                }
            },
            // 防具-战靴
            BOOTS: {
                '鎏金靴': { 
                    name: '鎏金靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 20, 
                    dodge: 6, 
                    description: '金阳门炼气期战靴，物攻+3%，物防+2%',
                    sectExclusive: 'jinyang', 
                    set: 'liu jin',
                    realm: '炼气期',
                    price: 0
                },
                '烈阳靴': { 
                    name: '烈阳靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 22, 
                    dodge: 6.5, 
                    description: '金阳门筑基期战靴，物攻+5%，物防+3%，暴击率+1%',
                    sectExclusive: 'jinyang', 
                    set: 'lie yang',
                    realm: '筑基期',
                    price: 0
                },
                '镇金靴': { 
                    name: '镇金靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 35, 
                    dodge: 8.75, 
                    description: '金阳门金丹期战靴，物攻+8%，物防+5%，暴击率+2%',
                    sectExclusive: 'jinyang', 
                    set: 'zhen jin',
                    realm: '金丹期',
                    price: 0
                },
                '金阙靴': { 
                    name: '金阙靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    attack: 90, 
                    defense: 85, 
                    agility: 60, 
                    crit: 9, 
                    description: '金阳门元婴期战靴，物攻+12%，物防+8%，暴击率+3%',
                    sectExclusive: 'jinyang', 
                    set: 'jin que',
                    realm: '元婴期',
                    price: 0
                },
                '青岚靴': { 
                    name: '青岚靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 20, 
                    dodge: 6, 
                    description: '青木宗炼气期战靴，气血+2%，每秒回血+0.2%',
                    sectExclusive: 'qingmu', 
                    set: 'qing lan',
                    realm: '炼气期',
                    price: 0
                },
                '万木靴': { 
                    name: '万木靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 22, 
                    dodge: 6.5, 
                    description: '青木宗筑基期战靴，气血+4%，回血+0.4%，法术防御+2%',
                    sectExclusive: 'qingmu', 
                    set: 'wan mu',
                    realm: '筑基期',
                    price: 0
                },
                '长生靴': { 
                    name: '长生靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 35, 
                    dodge: 8.75, 
                    description: '青木宗金丹期战靴，气血+6%，回血+0.5%，受击有5%概率触发青木护心',
                    sectExclusive: 'qingmu', 
                    set: 'chang sheng',
                    realm: '金丹期',
                    price: 0
                },
                '枯荣靴': { 
                    name: '枯荣靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    hp: 650, 
                    defense: 85, 
                    agility: 60, 
                    regen: 15, 
                    magicDefense: 40, 
                    description: '青木宗元婴期战靴，气血+8%，回血+0.8%，双防+3%，青木护心触发概率提升至8%',
                    sectExclusive: 'qingmu', 
                    set: 'ku rong',
                    realm: '元婴期',
                    price: 0
                },
                '凝水靴': { 
                    name: '凝水靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 20, 
                    dodge: 6, 
                    description: '水月宫炼气期战靴，法攻+2%，速度+1.5%',
                    sectExclusive: 'shuiyue', 
                    set: 'ning shui',
                    realm: '炼气期',
                    price: 0
                },
                '流霜靴': { 
                    name: '流霜靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 22, 
                    dodge: 6.5, 
                    description: '水月宫筑基期战靴，法攻+4%，速度+3%，闪避+2%',
                    sectExclusive: 'shuiyue', 
                    set: 'liu shuang',
                    realm: '筑基期',
                    price: 0
                },
                '沧澜靴': { 
                    name: '沧澜靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 35, 
                    dodge: 8.75, 
                    description: '水月宫金丹期战靴，法攻+6%，速度+4%，闪避+3%，攻击有5%概率冰冻目标',
                    sectExclusive: 'shuiyue', 
                    set: 'cang lan',
                    realm: '金丹期',
                    price: 0
                },
                '沧海靴': { 
                    name: '沧海靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    magicDamage: 90, 
                    defense: 80, 
                    agility: 60, 
                    speed: 50, 
                    dodge: 20, 
                    description: '水月宫元婴期战靴，法攻+8%，速度+5%，闪避+5%，冰冻概率提升至8%',
                    sectExclusive: 'shuiyue', 
                    set: 'cang hai',
                    realm: '元婴期',
                    price: 0
                },
                '赤焰靴': { 
                    name: '赤焰靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 20, 
                    dodge: 6, 
                    burn: 1, 
                    description: '炎火殿炼气期战靴，法攻+2%，灼烧伤害+1%',
                    sectExclusive: 'yanhuo', 
                    set: 'chi yan',
                    realm: '炼气期',
                    price: 0
                },
                '焚天靴': { 
                    name: '焚天靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 22, 
                    dodge: 6.5, 
                    burn: 10, 
                    description: '炎火殿筑基期战靴，法攻+4%，暴击+2%，灼烧持续时间延长10%',
                    sectExclusive: 'yanhuo', 
                    set: 'fen tian',
                    realm: '筑基期',
                    price: 0
                },
                '炎狱靴': { 
                    name: '炎狱靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 35, 
                    dodge: 8.75, 
                    burn: 20, 
                    description: '炎火殿金丹期战靴，法攻+7%，暴击+3%，灼烧伤害+20%，暴击有6%概率引爆灼烧',
                    sectExclusive: 'yanhuo', 
                    set: 'yan yu',
                    realm: '金丹期',
                    price: 0
                },
                '九天靴': { 
                    name: '九天靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    magicDamage: 90, 
                    defense: 85, 
                    agility: 60, 
                    crit: 9, 
                    burn: 20, 
                    description: '炎火殿元婴期战靴，法攻+9%，暴击+4%，暴击伤害+7%，灼烧引爆概率提升至10%',
                    sectExclusive: 'yanhuo', 
                    set: 'jiu tian',
                    realm: '元婴期',
                    price: 0
                },
                '黄土靴': { 
                    name: '黄土靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 20, 
                    dodge: 6, 
                    description: '皇土阁炼气期战靴，物防+2%，气血+2%',
                    sectExclusive: 'huangtu', 
                    set: 'huang tu',
                    realm: '炼气期',
                    price: 0
                },
                '磐石靴': { 
                    name: '磐石靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 22, 
                    dodge: 6.5, 
                    description: '皇土阁筑基期战靴，物防+4%，法防+3%，气血+4%',
                    sectExclusive: 'huangtu', 
                    set: 'pan shi',
                    realm: '筑基期',
                    price: 0
                },
                '镇岳靴': { 
                    name: '镇岳靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 35, 
                    dodge: 8.75, 
                    description: '皇土阁金丹期战靴，双防+5%，气血+6%，受击有5%概率反震伤害',
                    sectExclusive: 'huangtu', 
                    set: 'zhen yue',
                    realm: '金丹期',
                    price: 0
                },
                '万岳靴': { 
                    name: '万岳靴', 
                    displayType: '战靴',
                    type: 'boots',
                    rarity: 'epic', 
                    agility: 50, 
                    dodge: 14, 
                    description: '皇土阁元婴期战靴，双防+8%，气血+8%，反震概率提升至8%',
                    sectExclusive: 'huangtu', 
                    set: 'wan yue',
                    realm: '元婴期',
                    price: 0
                }
            },
            // 防具-戒指
            RINGS: {
                '赤焰戒': { 
                    name: '赤焰戒', 
                    displayType: '戒指',
                    type: 'ring',
                    rarity: 'epic', 
                    attack: 50, 
                    crit: 8, 
                    description: '金丹期橙色戒指，火系伤害+10%，暴击伤害+20%',
                    realm: '金丹期',
                    price: 0
                },
                '万魂戒': { 
                    name: '万魂戒', 
                    displayType: '戒指',
                    type: 'ring',
                    rarity: 'epic', 
                    hp: 2000, 
                    regen: 20, 
                    description: '金丹期橙色戒指，气血上限+15%，回血效果+30%',
                    realm: '金丹期',
                    price: 0
                },
                '雷云戒': { 
                    name: '雷云戒', 
                    displayType: '戒指',
                    type: 'ring',
                    rarity: 'epic', 
                    attack: 70, 
                    crit: 10, 
                    description: '元婴期橙色戒指，雷系伤害+20%，暴击伤害+30%',
                    realm: '元婴期',
                    price: 0
                },
                '混沌戒': { 
                    name: '混沌戒', 
                    displayType: '戒指',
                    type: 'ring',
                    rarity: 'epic', 
                    attack: 90, 
                    crit: 12, 
                    description: '化神期橙色戒指，混沌之力+25%，全属性+10%',
                    realm: '化神期',
                    price: 0
                }
            },
            // 法宝类-法器
            MAGIC_WEAPONS: {
                '一阶法器': { 
                    name: '一阶法器', 
                    displayType: '法器',
                    type: 'artifact',
                    rarity: 'uncommon', 
                    attack: 10, 
                    description: '初级法器',
                    realm: '炼气期',
                    price: 300
                },
                '土系防御法器': { 
                    name: '土系防御法器', 
                    displayType: '法器',
                    type: 'artifact',
                    rarity: 'uncommon', 
                    defense: 20, 
                    description: '土系防御法器',
                    realm: '炼气期',
                    price: 400
                },
                '家族法器': { 
                    name: '家族法器', 
                    displayType: '法器',
                    type: 'artifact',
                    rarity: 'rare', 
                    attack: 10, 
                    defense: 5,
                    description: '家族传下来的法器',
                    realm: '炼气期',
                    price: 500
                },
                '赤焰符': { 
                    name: '赤焰符', 
                    displayType: '法器',
                    type: 'artifact',
                    rarity: 'epic', 
                    attack: 60, 
                    crit: 6, 
                    description: '金丹期橙色法器，攻击时有概率释放火焰新星，造成范围伤害',
                    realm: '金丹期',
                    price: 0
                },
                '万魂幡': { 
                    name: '万魂幡', 
                    displayType: '法器',
                    type: 'artifact',
                    rarity: 'epic', 
                    attack: 50, 
                    hp: 1000, 
                    description: '金丹期橙色法器，攻击时有概率召唤魂灵协助战斗',
                    realm: '金丹期',
                    price: 0
                },
                '玄冰符': { 
                    name: '玄冰符', 
                    displayType: '法器',
                    type: 'artifact',
                    rarity: 'epic', 
                    attack: 80, 
                    crit: 8, 
                    description: '元婴期橙色法器，攻击时有概率释放冰风暴，造成范围伤害',
                    realm: '元婴期',
                    price: 0
                },
                '星空符': { 
                    name: '星空符', 
                    displayType: '法器',
                    type: 'artifact',
                    rarity: 'epic', 
                    attack: 120, 
                    crit: 12, 
                    description: '化神期橙色法器，攻击时有概率召唤星陨，造成范围伤害',
                    realm: '化神期',
                    price: 0
                }
            },
            // 法宝类-法宝
            ARTIFACTS: {
                '高阶防御法宝': { 
                    name: '高阶防御法宝', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'rare', 
                    defense: 30, 
                    description: '高阶防御法宝',
                    realm: '筑基期',
                    price: 800
                },
                '避水珠': { 
                    name: '避水珠', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'rare', 
                    effect: { waterResistance: 100 }, 
                    description: '可以在水中呼吸的宝珠',
                    realm: '金丹期',
                    price: 600
                },
                '冰系法宝': { 
                    name: '冰系法宝', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'epic', 
                    attack: 25, 
                    element: 'ice',
                    description: '冰系法宝',
                    realm: '元婴期',
                    price: 700
                },
                '古域秘宝': { 
                    name: '古域秘宝', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'epic', 
                    description: '古域中的秘宝',
                    realm: '化神期',
                    price: 2000
                },
                '完整守岚者玉佩': { 
                    name: '完整守岚者玉佩', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'epic', 
                    effect: { miasmaImmunity: true, allAttr: 10 }, 
                    description: '完整的守岚者玉佩，拥有瘴气免疫和属性加成',
                    realm: '炼气期',
                    price: 2000
                },
                '烈阳佩': { 
                    name: '烈阳佩', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'rare', 
                    defense: 8, 
                    crit: 5, 
                    description: '金阳门筑基期法宝，破甲+8%，暴击率+5%，可主动触发烈阳护体',
                    realm: '筑基期',
                    price: 0
                },
                '金阙印': { 
                    name: '金阙印', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'epic', 
                    attack: 10, 
                    defense: 10, 
                    description: '金阳门金丹期法宝，全属性+10%，金系技能冷却缩短15%',
                    realm: '金丹期',
                    price: 0
                },
                '万木珠': { 
                    name: '万木珠', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'rare', 
                    regen: 8, 
                    defense: 6, 
                    description: '青木宗筑基期法宝，回血速度+8%，法术防御+6%，可主动触发万木护罩',
                    realm: '筑基期',
                    price: 0
                },
                '长生玉': { 
                    name: '长生玉', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'epic', 
                    hp: 15, 
                    regen: 30, 
                    attack: 10, 
                    description: '青木宗金丹期法宝，气血+15%，回血效果再提升30%，毒伤伤害+10%',
                    realm: '金丹期',
                    price: 0
                },
                '枯荣鼎': { 
                    name: '枯荣鼎', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'legendary', 
                    hp: 50, 
                    defense: 100, 
                    description: '青木宗元婴期法宝，群体回血效果提升50%，自身免疫所有毒伤',
                    realm: '元婴期',
                    price: 0
                },
                '流霜玉佩': { 
                    name: '流霜玉佩', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'rare', 
                    speed: 8, 
                    dodge: 6, 
                    description: '水月宫筑基期法宝，速度+8%，闪避+6%，可主动触发流霜闪避',
                    realm: '筑基期',
                    price: 0
                },
                '沧澜珠': { 
                    name: '沧澜珠', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'epic', 
                    attack: 15, 
                    speed: 10, 
                    description: '水月宫金丹期法宝，法攻+15%，水系伤害+10%，冰冻持续时间延长1秒',
                    realm: '金丹期',
                    price: 0
                },
                '沧海镜': { 
                    name: '沧海镜', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'legendary', 
                    attack: 50, 
                    speed: 10, 
                    description: '水月宫元婴期法宝，大范围水伤效果提升50%，冰冻概率再提升10%',
                    realm: '元婴期',
                    price: 0
                },
                '赤焰印': { 
                    name: '赤焰印', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'epic', 
                    attack: 80, 
                    burn: 30, 
                    description: '金丹期橙色法宝，火系伤害+20%，灼烧伤害提升50%',
                    realm: '金丹期', 
                    requiredRoot: '火灵根',
                    price: 0
                },
                '万魂珠': { 
                    name: '万魂珠', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'epic', 
                    hp: 1500, 
                    regen: 25, 
                    description: '金丹期橙色法宝，木系伤害+20%，击杀敌人后回复气血',
                    realm: '金丹期', 
                    requiredRoot: '木灵根',
                    price: 0
                },
                '雷云珠': { 
                    name: '雷云珠', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'epic', 
                    attack: 100, 
                    crit: 10, 
                    description: '元婴期橙色法宝，雷系伤害+25%，攻击有概率触发闪电链',
                    realm: '元婴期', 
                    requiredRoot: '雷灵根',
                    price: 0
                },
                '混沌印': { 
                    name: '混沌印', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'epic', 
                    attack: 140, 
                    defense: 50, 
                    description: '化神期橙色法宝，混沌之力+30%，受到伤害时概率反弹',
                    realm: '化神期', 
                    requiredRoot: '混沌灵根',
                    price: 0
                },
                '金仙印': { 
                    name: '金仙印', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'epic', 
                    attack: 120, 
                    defense: 40, 
                    description: '化神期金色法宝，金系伤害+25%，受到伤害时概率触发金阳护体',
                    realm: '化神期', 
                    requiredRoot: '金灵根',
                    price: 0
                },
                '灵木印': { 
                    name: '灵木印', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'epic', 
                    hp: 1800, 
                    regen: 30, 
                    defense: 30, 
                    description: '化神期绿色法宝，木系伤害+25%，受到伤害时概率触发青木护心',
                    realm: '化神期', 
                    requiredRoot: '木灵根',
                    price: 0
                },
                '水神印': { 
                    name: '水神印', 
                    displayType: '法宝',
                    type: 'artifact',
                    rarity: 'epic', 
                    attack: 125, 
                    speed: 20, 
                    defense: 35, 
                    description: '化神期蓝色法宝，水系伤害+25%，攻击有概率触发水影闪避',
                    realm: '化神期', 
                    requiredRoot: '水灵根',
                    price: 0
                }
            }
        },
        // 物品生成逻辑
        GENERATORS: {
            // 装备属性生成规则
            EQUIPMENT_ATTR_RULES: {
                // 物理武器 - 刀、斧、棍
                PHYSICAL_WEAPON_HEAVY: {
                    baseAttrs: ['attack', 'strength', 'vitality'],
                    keywords: ['刀', '斧', '棍', '棒', '锤', '锏']
                },
                // 物理武器 - 剑、匕首、枪
                PHYSICAL_WEAPON_LIGHT: {
                    baseAttrs: ['attack', 'agility', 'vitality'],
                    keywords: ['剑', '匕首', '枪', '矛', '戟']
                },
                // 法系武器 - 法杖、乐器、圣器
                MAGIC_WEAPON: {
                    baseAttrs: ['magicDamage', 'intelligence', 'mpRegen'],
                    keywords: ['杖', '琴', '笛', '箫', '铃', '印', '珠', '塔', '钟', '镜']
                },
                // 防具
                ARMOR: {
                    baseAttrs: ['defense', 'hp', 'mp'],
                    slots: ['头盔', '胸甲', '护肩', '护腿', '战靴']
                },
                // 法宝法器
                ARTIFACT: {
                    baseAttrs: ['hp', 'mp', 'mpRegen'],
                    slots: ['法宝', '法器']
                }
            },
            // 根据品质确定随机属性数量
            RANDOM_ATTR_COUNT_BY_QUALITY: {
                '蓝': 1,
                '蓝品': 1,
                '紫': 2,
                '紫品': 2,
                '橙': 4,
                '橙品': 4
            },
            // 随机属性池
            RANDOM_ATTR_POOL: [
                { name: '暴击率', key: 'critRate', type: 'percent' },
                { name: '暴击伤害', key: 'critDmg', type: 'percent' },
                { name: '命中', key: 'hit', type: 'percent' },
                { name: '闪避', key: 'dodgeRate', type: 'percent' },
                { name: '法伤', key: 'magicDamage', type: 'value' },
                { name: '回蓝', key: 'mpRegen', type: 'value' },
                { name: '物攻', key: 'physicalDamage', type: 'value' },
                { name: '气血', key: 'hpBonus', type: 'value' },
                { name: '灵力', key: 'mpBonus', type: 'value' },
                { name: '防御', key: 'defenseBonus', type: 'value' },
                { name: '吸血', key: 'lifeSteal', type: 'percent' },
                { name: '反弹伤害', key: 'reflect', type: 'percent' }
            ],
            // 根据境界确定属性数值范围
            REALM_VALUE_RANGE: {
                '炼气期': { percent: [1, 3], value: [5, 15] },
                '筑基期': { percent: [2, 5], value: [10, 25] },
                '金丹期': { percent: [4, 8], value: [20, 40] },
                '元婴期': { percent: [6, 12], value: [35, 60] },
                '化神期': { percent: [10, 18], value: [50, 90] }
            },
            // 套装属性加成定义
            SET_BONUSES: {
                // 一、金阳门・金系（锐不可当）
                'liu jin': {
                    name: '鎏金套',
                    twoPiece: { attackPercent: 12, armorPenetration: 5, critRate: 5 },
                    fourPiece: { jinMangYiShan: true, jinMangYiShanChance: 15, jinMangYiShanDamageBonus: 30 }
                },
                'lie yang': {
                    name: '烈阳套',
                    twoPiece: { attackPercent: 20, armorPenetration: 8 },
                    fourPiece: { jinMangYiShanChance: 30, critDamage: 15 }
                },
                'zhen jin': {
                    name: '镇金套',
                    twoPiece: { attackPercent: 32, armorPenetration: 12 },
                    fourPiece: { jinMangZhan: true, jinMangZhanDamage: 50 }
                },
                'jin que': {
                    name: '金阙套',
                    twoPiece: { attackPercent: 45, armorPenetration: 22 },
                    fourPiece: { jinYangHuTi: true, jinYangHuTiDamageReduce: 15, jinMangZhanRangeBonus: 50 }
                },
                // 二、青木宗・木系（生生不息）
                'qing lan': {
                    name: '青岚套',
                    twoPiece: { hpPercent: 10, hpRegenPercent: 1, magicDefensePercent: 8 },
                    fourPiece: { qingMuHuiChun: true, qingMuHuiChunChance: 10, qingMuHuiChunHealPercent: 5 }
                },
                'wan mu': {
                    name: '万木套',
                    twoPiece: { hpPercent: 18, hpRegenPercent: 2, magicDefensePercent: 12 },
                    fourPiece: { qingMuHuiChunChance: 20, teamHealBonus: 50 }
                },
                'chang sheng': {
                    name: '长生套',
                    twoPiece: { hpPercent: 30, hpRegenPercent: 2.5, magicDefensePercent: 18 },
                    fourPiece: { qingMuHuXin: true, qingMuHuXinChance: 25, qingMuHuXinHealPercent: 10, poisonDamage: 15 }
                },
                'ku rong': {
                    name: '枯荣套',
                    twoPiece: { hpPercent: 42, hpRegenPercent: 4, defensePercent: 20, magicDefensePercent: 20 },
                    fourPiece: { qingMuHuXinChance: 40, poisonImmune: true, kuRongBuff: true, kuRongDamageReduce: 12 }
                },
                // 三、水月宫・水系（灵动飘逸）
                'ning shui': {
                    name: '凝水套',
                    twoPiece: { magicAttackPercent: 10, speedPercent: 8, dodgePercent: 6 },
                    fourPiece: { freezeChance: 10, freezeDuration: 0.5 }
                },
                'liu shuang': {
                    name: '流霜套',
                    twoPiece: { magicAttackPercent: 18, speedPercent: 15, dodgePercent: 10 },
                    fourPiece: { freezeChance: 20, freezeDuration: 1, dodgePercent: 5 }
                },
                'cang lan': {
                    name: '沧澜套',
                    twoPiece: { magicAttackPercent: 30, speedPercent: 20, dodgePercent: 18 },
                    fourPiece: { freezeChance: 25, freezeDuration: 1.5, shuiYingBu: true, shuiYingBuDodge: 10 }
                },
                'cang hai': {
                    name: '沧海套',
                    twoPiece: { magicAttackPercent: 42, speedPercent: 30, dodgePercent: 25 },
                    fourPiece: { freezeChance: 40, freezeDuration: 2, shuiYingShanBi: true, shuiYingShanBiChance: 15 }
                },
                // 四、炎火殿・火系（狂暴爆发）
                'chi yan': {
                    name: '赤焰套',
                    twoPiece: { magicAttackPercent: 13, burnDamage: 8 },
                    fourPiece: { burnExplodeChance: 15, burnExplodeDamageBonus: 40, burnDamageBonus: 5 }
                },
                'fen tian': {
                    name: '焚天套',
                    twoPiece: { magicAttackPercent: 22, burnDamage: 10, critRate: 10 },
                    fourPiece: { burnExplodeChance: 25, burnDamageBonus: 15, burnDurationBonus: 50 }
                },
                'yan yu': {
                    name: '炎狱套',
                    twoPiece: { magicAttackPercent: 35, burnDamage: 20, critRate: 18 },
                    fourPiece: { burnExplodeChance: 30, burnDamageDouble: true, areaSkillDamageBonus: 25 }
                },
                'jiu tian': {
                    name: '九天套',
                    twoPiece: { magicAttackPercent: 50, critRate: 25, critDamage: 35 },
                    fourPiece: { burnExplodeChance: 50, burnDamage: 30, yanHuoBuMie: true, fullScreenDamageBonus: 30 }
                },
                // 五、皇土阁・土系（不动如山）
                'huang tu': {
                    name: '黄土套',
                    twoPiece: { defensePercent: 12, hpPercent: 10, magicDefensePercent: 8 },
                    fourPiece: { reflectChance: 10, reflectDamagePercent: 20 }
                },
                'pan shi': {
                    name: '磐石套',
                    twoPiece: { defensePercent: 20, hpPercent: 20, magicDefensePercent: 15 },
                    fourPiece: { reflectChance: 20, reflectDamagePercent: 30, stunResist: 15 }
                },
                'zhen yue': {
                    name: '镇岳套',
                    twoPiece: { defensePercent: 28, magicDefensePercent: 28, hpPercent: 28, reflectChance: 25 },
                    fourPiece: { reflectDamagePercent: 30, daDiShouHu: true, daDiShouHuDamageReduce: 15 }
                },
                'wan yue': {
                    name: '万岳套',
                    twoPiece: { defensePercent: 40, magicDefensePercent: 40, hpPercent: 45, reflectChance: 40 },
                    fourPiece: { reflectDamagePercent: 50, stunImmune: true, slowImmune: true, zhenYueZhiQu: true, zhenYueZhiQuDamageReduce: 20 }
                }
            },
            // 根据物品ID获取物品数据
            getItemById: function(itemId) {
                if (!itemId) return null;
                // 检查道具类
                for (const category in GAME_DATA.ITEM_DATABASE.ITEMS) {
                    if (GAME_DATA.ITEM_DATABASE.ITEMS[category] && GAME_DATA.ITEM_DATABASE.ITEMS[category][itemId]) {
                        return {
                            ...GAME_DATA.ITEM_DATABASE.ITEMS[category][itemId],
                            category: category,
                            isEquipment: false
                        };
                    }
                }
                // 检查装备类
                for (const category in GAME_DATA.ITEM_DATABASE.EQUIPMENT) {
                    if (GAME_DATA.ITEM_DATABASE.EQUIPMENT[category] && GAME_DATA.ITEM_DATABASE.EQUIPMENT[category][itemId]) {
                        return {
                            ...GAME_DATA.ITEM_DATABASE.EQUIPMENT[category][itemId],
                            category: category,
                            isEquipment: true
                        };
                    }
                }
                return null;
            },
            // 创建物品实例
            createItem: function(itemId, quantity = 1) {
                const itemData = this.getItemById(itemId);
                if (!itemData) return null;
                
                return {
                    id: itemId,
                    ...itemData,
                    quantity: quantity,
                    createTime: Date.now()
                };
            },
            // 获取物品显示类型
            getDisplayType: function(itemId) {
                const item = this.getItemById(itemId);
                return item ? item.displayType : '未知';
            },
            // 判断是否是装备
            isEquipment: function(itemId) {
                const item = this.getItemById(itemId);
                return item ? item.isEquipment : false;
            },
            // 获取装备部位
            getEquipSlot: function(itemId) {
                const item = this.getItemById(itemId);
                if (!item || !item.isEquipment) return null;
                
                const type = item.type;
                const slotMap = {
                    'weapon': 'weapon',
                    '武器': 'weapon',
                    'armor': 'chest',
                    'helmet': 'helmet',
                    '头盔': 'helmet',
                    'chest': 'chest',
                    '胸甲': 'chest',
                    'shoulder': 'shoulder',
                    '护肩': 'shoulder',
                    'pants': 'pants',
                    '护腿': 'pants',
                    'boots': 'boots',
                    '战靴': 'boots',
                    'ring': 'ring',
                    '戒指': 'ring',
                    'artifact': 'artifact',
                    '法宝': 'artifact',
                    'magic-weapon': 'magicWeapon',
                    '法器': 'magicWeapon',
                    'magicWeapon': 'magicWeapon'
                };
                return slotMap[type] || null;
            },
            // 获取所有物品列表（按分类）
            getAllItemsByCategory: function(category) {
                if (GAME_DATA.ITEM_DATABASE.ITEMS[category]) {
                    return GAME_DATA.ITEM_DATABASE.ITEMS[category];
                }
                if (GAME_DATA.ITEM_DATABASE.EQUIPMENT[category]) {
                    return GAME_DATA.ITEM_DATABASE.EQUIPMENT[category];
                }
                return null;
            },
            // 搜索物品（按名称或描述）
            searchItems: function(keyword) {
                const results = [];
                keyword = keyword.toLowerCase();
                
                // 搜索道具类
                for (const category in GAME_DATA.ITEM_DATABASE.ITEMS) {
                    const items = GAME_DATA.ITEM_DATABASE.ITEMS[category];
                    for (const itemId in items) {
                        const item = items[itemId];
                        if (item.name.toLowerCase().includes(keyword) || 
                            item.description.toLowerCase().includes(keyword)) {
                            results.push({ ...item, id: itemId, category, isEquipment: false });
                        }
                    }
                }
                
                // 搜索装备类
                for (const category in GAME_DATA.ITEM_DATABASE.EQUIPMENT) {
                    const items = GAME_DATA.ITEM_DATABASE.EQUIPMENT[category];
                    for (const itemId in items) {
                        const item = items[itemId];
                        if (item.name.toLowerCase().includes(keyword) || 
                            item.description.toLowerCase().includes(keyword)) {
                            results.push({ ...item, id: itemId, category, isEquipment: true });
                        }
                    }
                }
                
                return results;
            },
            // 获取物品价格
            getItemPrice: function(itemId) {
                const item = this.getItemById(itemId);
                return item ? (item.price || 0) : 0;
            },
            // 获取物品稀有度
            getItemRarity: function(itemId) {
                const item = this.getItemById(itemId);
                return item ? (item.rarity || 'common') : 'common';
            },
            // 根据境界和稀有度获取随机装备
            getRandomEquipment: function(realm, rarities) {
                const equipment = [];
                const equipCategories = ['WEAPONS', 'HELMETS', 'CHESTS', 'SHOULDERS', 'PANTS', 'BOOTS', 'RINGS', 'MAGIC_WEAPONS', 'ARTIFACTS'];
                
                for (const category of equipCategories) {
                    const categoryEquips = GAME_DATA.ITEM_DATABASE.EQUIPMENT[category];
                    if (!categoryEquips) continue;
                    
                    for (const equipId in categoryEquips) {
                        const equip = categoryEquips[equipId];
                        // 检查境界匹配、稀有度匹配，排除门派专属装备（sectExclusive），并且排除守岚者系列装备
                        if (equip.realm === realm && 
                            rarities.includes(equip.rarity) && 
                            !equip.sectExclusive &&
                            !equipId.includes('守岚') &&
                            !(equip.name && equip.name.includes('守岚'))) {
                            equipment.push({
                                ...equip,
                                id: equipId,
                                category: category
                            });
                        }
                    }
                }
                
                if (equipment.length === 0) return null;
                
                // 随机返回一个装备
                return equipment[Math.floor(Math.random() * equipment.length)];
            },
            // 将 rarity 转换为中文品质名
            rarityToQuality: function(rarity) {
                const qualityMap = {
                    'common': '白',
                    'uncommon': '绿',
                    'rare': '蓝',
                    'epic': '紫',
                    'legendary': '橙',
                    'mythic': '橙'
                };
                return qualityMap[rarity] || '白';
            }
        },
        // 悬赏任务数据
        BOUNTY_QUESTS: {
            '炼气期': [
                {
                    id: 'qi-refining-1',
                    title: '清除灵草谷黑风蛇',
                    description: '灵草谷中黑风蛇出没，威胁村民安全，需要道友出手清除！',
                    target: '黑风蛇',
                    targetCount: 10,
                    requiredRealm: '炼气期',
                    rewards: {
                        silver: 500,
                        reputation: 50,
                        cultivation: 5000,
                        pill: '下品修炼丹',
                        pillCount: 3
                    },
                    dungeon: '灵草谷'
                },
                {
                    id: 'qi-refining-2',
                    title: '妖兽森林清除残月狼',
                    description: '妖兽森林残月狼数量激增，需要控制数量！',
                    target: '残月狼',
                    targetCount: 8,
                    requiredRealm: '炼气期',
                    rewards: {
                        silver: 600,
                        reputation: 60,
                        cultivation: 6000,
                        pill: '下品修炼丹',
                        pillCount: 4
                    },
                    dungeon: '妖兽森林'
                },
                {
                    id: 'qi-refining-3',
                    title: '探索灵草谷秘境',
                    description: '探索灵草谷秘境，收集珍贵草药！',
                    target: '灵草谷秘境',
                    targetCount: 1,
                    requiredRealm: '炼气期',
                    rewards: {
                        silver: 800,
                        reputation: 80,
                        cultivation: 8000,
                        pill: '下品修炼丹',
                        pillCount: 5
                    },
                    dungeon: '灵草谷'
                }
            ],
            '筑基期': [
                {
                    id: 'foundation-1',
                    title: '黑风洞清除黑风蛇',
                    description: '黑风洞黑风蛇肆虐，需要高手出手！',
                    target: '黑风蛇',
                    targetCount: 10,
                    requiredRealm: '筑基期',
                    rewards: {
                        silver: 1500,
                        reputation: 100,
                        cultivation: 15000,
                        pill: '下品修炼丹',
                        pillCount: 3
                    },
                    dungeon: '黑风洞'
                },
                {
                    id: 'foundation-2',
                    title: '残月谷清除残月狼',
                    description: '残月谷残月狼出没，需要净化！',
                    target: '残月狼',
                    targetCount: 8,
                    requiredRealm: '筑基期',
                    rewards: {
                        silver: 1800,
                        reputation: 120,
                        cultivation: 18000,
                        pill: '下品修炼丹',
                        pillCount: 4
                    },
                    dungeon: '残月谷'
                },
                {
                    id: 'foundation-3',
                    title: '探索黑风洞秘境',
                    description: '深入黑风洞秘境，获取珍贵材料！',
                    target: '黑风洞秘境',
                    targetCount: 1,
                    requiredRealm: '筑基期',
                    rewards: {
                        silver: 2500,
                        reputation: 150,
                        cultivation: 25000,
                        pill: '下品修炼丹',
                        pillCount: 5
                    },
                    dungeon: '黑风洞'
                }
            ],
            '金丹期': [
                {
                    id: 'golden-1',
                    title: '赤焰窟清除赤焰狐',
                    description: '赤焰窟赤焰狐威胁往来商队安全！',
                    target: '赤焰狐',
                    targetCount: 10,
                    requiredRealm: '金丹期',
                    rewards: {
                        silver: 5000,
                        reputation: 200,
                        cultivation: 50000,
                        pill: '中品修炼丹',
                        pillCount: 3
                    },
                    dungeon: '赤焰窟'
                },
                {
                    id: 'golden-2',
                    title: '万魂泽清除幽影鬼',
                    description: '万魂泽幽影鬼袭击修士！',
                    target: '幽影鬼',
                    targetCount: 8,
                    requiredRealm: '金丹期',
                    rewards: {
                        silver: 6000,
                        reputation: 250,
                        cultivation: 60000,
                        pill: '中品修炼丹',
                        pillCount: 4
                    },
                    dungeon: '万魂泽'
                },
                {
                    id: 'golden-3',
                    title: '探索赤焰窟秘境',
                    description: '探索赤焰窟秘境，寻找上古炎晶！',
                    target: '赤焰窟秘境',
                    targetCount: 1,
                    requiredRealm: '金丹期',
                    rewards: {
                        silver: 8000,
                        reputation: 300,
                        cultivation: 80000,
                        pill: '中品修炼丹',
                        pillCount: 5
                    },
                    dungeon: '赤焰窟'
                }
            ],
            '元婴期': [
                {
                    id: 'nascent-1',
                    title: '玄冰洞清除冰猿',
                    description: '玄冰洞冰猿躁动不安！',
                    target: '冰猿',
                    targetCount: 10,
                    requiredRealm: '元婴期',
                    rewards: {
                        silver: 15000,
                        reputation: 400,
                        cultivation: 150000,
                        pill: '中品修炼丹',
                        pillCount: 3
                    },
                    dungeon: '玄冰洞'
                },
                {
                    id: 'nascent-2',
                    title: '雷云峰清除雷鹰',
                    description: '雷云峰雷鹰作乱！',
                    target: '雷鹰',
                    targetCount: 8,
                    requiredRealm: '元婴期',
                    rewards: {
                        silver: 18000,
                        reputation: 500,
                        cultivation: 180000,
                        pill: '中品修炼丹',
                        pillCount: 4
                    },
                    dungeon: '雷云峰'
                },
                {
                    id: 'nascent-3',
                    title: '探索玄冰洞秘境',
                    description: '探索玄冰洞秘境，收集冰核！',
                    target: '玄冰洞秘境',
                    targetCount: 1,
                    requiredRealm: '元婴期',
                    rewards: {
                        silver: 25000,
                        reputation: 600,
                        cultivation: 250000,
                        pill: '中品修炼丹',
                        pillCount: 5
                    },
                    dungeon: '玄冰洞'
                }
            ],
            '化神期': [
                {
                    id: 'transformation-1',
                    title: '星空殿清除木乃伊',
                    description: '星空殿木乃伊苏醒！',
                    target: '木乃伊',
                    targetCount: 5,
                    requiredRealm: '化神期',
                    rewards: {
                        silver: 50000,
                        reputation: 800,
                        cultivation: 500000,
                        pill: '上品修炼丹',
                        pillCount: 3
                    },
                    dungeon: '星空殿'
                },
                {
                    id: 'transformation-2',
                    title: '混沌秘境清除沙虫',
                    description: '混沌秘境沙虫入侵！',
                    target: '沙虫',
                    targetCount: 3,
                    requiredRealm: '化神期',
                    rewards: {
                        silver: 60000,
                        reputation: 1000,
                        cultivation: 600000,
                        pill: '上品修炼丹',
                        pillCount: 4
                    },
                    dungeon: '混沌秘境'
                },
                {
                    id: 'transformation-3',
                    title: '探索星空殿秘境',
                    description: '探索星空殿秘境！',
                    target: '星空殿秘境',
                    targetCount: 1,
                    requiredRealm: '化神期',
                    rewards: {
                        silver: 100000,
                        reputation: 1500,
                        cultivation: 1000000,
                        pill: '上品修炼丹',
                        pillCount: 5
                    },
                    dungeon: '星空殿'
                }
            ]
        }
    },
    // 炼丹系统数据
    ALCHEMY: {
        // 炼丹材料
        MATERIALS: {
            '灵草': { id: 'lingcao', name: '灵草', description: '普通灵草，炼气期丹药常用材料', rarity: 'common', requiredRealm: '炼气期' },
            '灵花': { id: 'linghua', name: '灵花', description: '蕴含灵力的花朵', rarity: 'common', requiredRealm: '炼气期' },
            '灵果': { id: 'lingguo', name: '灵果', description: '结有灵力的果实', rarity: 'uncommon', requiredRealm: '炼气期' },
            '晶石': { id: 'jingshi', name: '晶石', description: '蕴含灵力的石头', rarity: 'uncommon', requiredRealm: '炼气期' },
            '百年灵草': { id: 'bainian-lingcao', name: '百年灵草', description: '生长百年的灵草', rarity: 'rare', requiredRealm: '筑基期' },
            '百年灵花': { id: 'bainian-linghua', name: '百年灵花', description: '生长百年的灵花', rarity: 'rare', requiredRealm: '筑基期' },
            '千年灵草': { id: 'qiannian-lingcao', name: '千年灵草', description: '生长千年的灵草', rarity: 'epic', requiredRealm: '金丹期' },
            '千年灵花': { id: 'qiannian-linghua', name: '千年灵花', description: '生长千年的灵花', rarity: 'epic', requiredRealm: '金丹期' },
            '万年灵草': { id: 'wannian-lingcao', name: '万年灵草', description: '生长万年的灵草', rarity: 'legendary', requiredRealm: '元婴期' },
            '万年灵花': { id: 'wannian-linghua', name: '万年灵花', description: '生长万年的灵花', rarity: 'legendary', requiredRealm: '元婴期' },
            '龙涎草': { id: 'longxiancao', name: '龙涎草', description: '传说中的仙草', rarity: 'mythic', requiredRealm: '化神期' },
            '凤血花': { id: 'fengxuehua', name: '凤血花', description: '凤凰血浇灌的花朵', rarity: 'mythic', requiredRealm: '化神期' },
            '冰晶': { id: 'bingjing', name: '冰晶', description: '玄冰洞特产', rarity: 'epic', requiredRealm: '元婴期' },
            '火核': { id: 'huohe', name: '火核', description: '赤焰窟特产', rarity: 'epic', requiredRealm: '元婴期' },
            '雷晶': { id: 'leijing', name: '雷晶', description: '雷云峰特产', rarity: 'legendary', requiredRealm: '化神期' },
            '星尘': { id: 'xingchen', name: '星尘', description: '星空殿特产', rarity: 'legendary', requiredRealm: '化神期' }
        },
        // 丹药配方
        RECIPES: {
            // 恢复类 - 炼气期
            '下品回血丹': {
                id: 'xiapin-huixuedan',
                name: '下品回血丹',
                description: '恢复少量生命值',
                type: 'recovery',
                effect: { hp: 200 },
                rarity: 'common',
                requiredRealm: '炼气期',
                requiredProficiency: 0,
                failureRate: 0.1,
                baseCount: 3,
                materials: { '灵草': 3, '灵花': 2 }
            },
            '下品回蓝丹': {
                id: 'xiapin-huilandan',
                name: '下品回蓝丹',
                description: '恢复少量灵力',
                type: 'recovery',
                effect: { mp: 150 },
                rarity: 'common',
                requiredRealm: '炼气期',
                requiredProficiency: 10,
                failureRate: 0.15,
                baseCount: 3,
                materials: { '灵草': 2, '灵花': 3 }
            },
            '下品修炼丹': {
                id: 'xiapin-xiuliandan',
                name: '下品修炼丹',
                description: '增加少量修炼值',
                type: 'boost',
                effect: { cultivation: 2000 },
                rarity: 'common',
                requiredRealm: '炼气期',
                requiredProficiency: 20,
                failureRate: 0.2,
                baseCount: 2,
                materials: { '灵草': 2, '灵果': 2, '晶石': 1 }
            },
            // 恢复类 - 筑基期
            '中品回血丹': {
                id: 'zhongpin-huixuedan',
                name: '中品回血丹',
                description: '恢复中等生命值',
                type: 'recovery',
                effect: { hp: 800 },
                rarity: 'uncommon',
                requiredRealm: '筑基期',
                requiredProficiency: 100,
                failureRate: 0.25,
                baseCount: 3,
                materials: { '百年灵草': 3, '百年灵花': 2, '晶石': 2 }
            },
            '中品回蓝丹': {
                id: 'zhongpin-huilandan',
                name: '中品回蓝丹',
                description: '恢复中等灵力',
                type: 'recovery',
                effect: { mp: 600 },
                rarity: 'uncommon',
                requiredRealm: '筑基期',
                requiredProficiency: 120,
                failureRate: 0.3,
                baseCount: 3,
                materials: { '百年灵草': 2, '百年灵花': 3, '晶石': 2 }
            },
            '中品修炼丹': {
                id: 'zhongpin-xiuliandan',
                name: '中品修炼丹',
                description: '增加中等修炼值',
                type: 'boost',
                effect: { cultivation: 10000 },
                rarity: 'uncommon',
                requiredRealm: '筑基期',
                requiredProficiency: 150,
                failureRate: 0.35,
                baseCount: 2,
                materials: { '百年灵草': 2, '百年灵花': 2, '灵果': 3, '晶石': 2 }
            },
            '筑基突破丹': {
                id: 'zhuji-tupodan',
                name: '筑基突破丹',
                description: '辅助突破炼气期到筑基期',
                type: 'breakthrough',
                effect: { breakthroughChance: 0.3 },
                rarity: 'rare',
                requiredRealm: '炼气期',
                requiredProficiency: 200,
                failureRate: 0.4,
                baseCount: 1,
                materials: { '百年灵草': 3, '百年灵花': 3, '晶石': 3 }
            },
            // 增益类 - 炼气期
            '下品攻击丹': {
                id: 'xiapin-gongjidan',
                name: '下品攻击丹',
                description: '临时提升攻击力',
                type: 'buff',
                effect: { attack: 10, duration: 3 },
                rarity: 'common',
                requiredRealm: '炼气期',
                requiredProficiency: 30,
                failureRate: 0.2,
                baseCount: 2,
                materials: { '灵草': 2, '晶石': 2 }
            },
            '下品防御丹': {
                id: 'xiapin-fangyudan',
                name: '下品防御丹',
                description: '临时提升防御力',
                type: 'buff',
                effect: { defense: 10, duration: 3 },
                rarity: 'common',
                requiredRealm: '炼气期',
                requiredProficiency: 40,
                failureRate: 0.2,
                baseCount: 2,
                materials: { '灵花': 2, '晶石': 2 }
            },
            // 增益类 - 筑基期
            '中品攻击丹': {
                id: 'zhongpin-gongjidan',
                name: '中品攻击丹',
                description: '临时提升攻击力',
                type: 'buff',
                effect: { attack: 30, duration: 5 },
                rarity: 'uncommon',
                requiredRealm: '筑基期',
                requiredProficiency: 180,
                failureRate: 0.35,
                baseCount: 2,
                materials: { '百年灵草': 2, '晶石': 3 }
            },
            '中品防御丹': {
                id: 'zhongpin-fangyudan',
                name: '中品防御丹',
                description: '临时提升防御力',
                type: 'buff',
                effect: { defense: 30, duration: 5 },
                rarity: 'uncommon',
                requiredRealm: '筑基期',
                requiredProficiency: 200,
                failureRate: 0.35,
                baseCount: 2,
                materials: { '百年灵花': 2, '晶石': 3 }
            },
            // 恢复类 - 金丹期
            '上品回血丹': {
                id: 'shangpin-huixuedan',
                name: '上品回血丹',
                description: '恢复大量生命值',
                type: 'recovery',
                effect: { hp: 3000 },
                rarity: 'rare',
                requiredRealm: '金丹期',
                requiredProficiency: 500,
                failureRate: 0.4,
                baseCount: 3,
                materials: { '千年灵草': 3, '千年灵花': 2, '晶石': 5 }
            },
            '上品回蓝丹': {
                id: 'shangpin-huilandan',
                name: '上品回蓝丹',
                description: '恢复大量灵力',
                type: 'recovery',
                effect: { mp: 2000 },
                rarity: 'rare',
                requiredRealm: '金丹期',
                requiredProficiency: 550,
                failureRate: 0.45,
                baseCount: 3,
                materials: { '千年灵草': 2, '千年灵花': 3, '晶石': 5 }
            },
            '上品修炼丹': {
                id: 'shangpin-xiuliandan',
                name: '上品修炼丹',
                description: '增加大量修炼值',
                type: 'boost',
                effect: { cultivation: 50000 },
                rarity: 'rare',
                requiredRealm: '金丹期',
                requiredProficiency: 600,
                failureRate: 0.5,
                baseCount: 2,
                materials: { '千年灵草': 2, '千年灵花': 2, '灵果': 5, '晶石': 5 }
            },
            '金丹突破丹': {
                id: 'jindan-tupodan',
                name: '金丹突破丹',
                description: '辅助突破筑基期到金丹期',
                type: 'breakthrough',
                effect: { breakthroughChance: 0.25 },
                rarity: 'epic',
                requiredRealm: '筑基期',
                requiredProficiency: 700,
                failureRate: 0.55,
                baseCount: 1,
                materials: { '千年灵草': 5, '千年灵花': 5, '晶石': 10 }
            },
            // 增益类 - 金丹期
            '上品攻击丹': {
                id: 'shangpin-gongjidan',
                name: '上品攻击丹',
                description: '临时提升攻击力',
                type: 'buff',
                effect: { attack: 80, duration: 8 },
                rarity: 'rare',
                requiredRealm: '金丹期',
                requiredProficiency: 650,
                failureRate: 0.45,
                baseCount: 2,
                materials: { '千年灵草': 3, '晶石': 5 }
            },
            '上品防御丹': {
                id: 'shangpin-fangyudan',
                name: '上品防御丹',
                description: '临时提升防御力',
                type: 'buff',
                effect: { defense: 80, duration: 8 },
                rarity: 'rare',
                requiredRealm: '金丹期',
                requiredProficiency: 700,
                failureRate: 0.45,
                baseCount: 2,
                materials: { '千年灵花': 3, '晶石': 5 }
            },
            '上品法攻丹': {
                id: 'shangpin-fagongdan',
                name: '上品法攻丹',
                description: '临时提升法攻',
                type: 'buff',
                effect: { magicDamage: 60, duration: 8 },
                rarity: 'rare',
                requiredRealm: '金丹期',
                requiredProficiency: 750,
                failureRate: 0.48,
                baseCount: 2,
                materials: { '千年灵草': 2, '千年灵花': 2, '晶石': 5 }
            },
            '上品暴击丹': {
                id: 'shangpin-baojidan',
                name: '上品暴击丹',
                description: '临时提升暴击',
                type: 'buff',
                effect: { critRate: 0.15, duration: 8 },
                rarity: 'rare',
                requiredRealm: '金丹期',
                requiredProficiency: 800,
                failureRate: 0.5,
                baseCount: 2,
                materials: { '千年灵草': 3, '千年灵花': 3, '晶石': 5 }
            }
        },
        // 特殊类丹药（需要百草灵根/空间灵根才能领悟）
        SPECIAL_RECIPES: {
            '友情丹': {
                id: 'youqingdan',
                name: '友情丹',
                description: '增加NPC好感度',
                type: 'special',
                effect: { friendship: 20 },
                rarity: 'rare',
                requiredRealm: '筑基期',
                requiredProficiency: 300,
                failureRate: 0.4,
                baseCount: 2,
                materials: { '百年灵花': 5, '灵果': 5 },
                requiresHerbLingen: true
            },
            '和睦丹': {
                id: 'hemudan',
                name: '和睦丹',
                description: '将仇恨关系变为中立',
                type: 'special',
                effect: { neutralize: true },
                rarity: 'epic',
                requiredRealm: '金丹期',
                requiredProficiency: 800,
                failureRate: 0.55,
                baseCount: 1,
                materials: { '千年灵花': 5, '千年灵草': 5, '晶石': 10 },
                requiresHerbLingen: true
            },
            '控制丹': {
                id: 'kongzhidan',
                name: '控制丹',
                description: '让NPC暂时成为队友',
                type: 'special',
                effect: { control: 3 },
                rarity: 'legendary',
                requiredRealm: '元婴期',
                requiredProficiency: 1500,
                failureRate: 0.7,
                baseCount: 1,
                materials: { '万年灵花': 5, '万年灵草': 5, '冰晶': 3, '火核': 3 },
                requiresHerbLingen: true
            },
            '永久攻击丹': {
                id: 'yongjiu-gongjidan',
                name: '永久攻击丹',
                description: '永久提升攻击力',
                type: 'permanent',
                effect: { attack: 20 },
                rarity: 'epic',
                requiredRealm: '金丹期',
                requiredProficiency: 1000,
                failureRate: 0.6,
                baseCount: 1,
                materials: { '千年灵草': 10, '千年灵花': 10, '晶石': 20 },
                requiresHerbLingen: true,
                requiresGoldenCore: true
            },
            '永久防御丹': {
                id: 'yongjiu-fangyudan',
                name: '永久防御丹',
                description: '永久提升防御力',
                type: 'permanent',
                effect: { defense: 20 },
                rarity: 'epic',
                requiredRealm: '金丹期',
                requiredProficiency: 1050,
                failureRate: 0.6,
                baseCount: 1,
                materials: { '千年灵草': 10, '千年灵花': 10, '晶石': 20 },
                requiresHerbLingen: true,
                requiresGoldenCore: true
            },
            '永久法攻丹': {
                id: 'yongjiu-fagongdan',
                name: '永久法攻丹',
                description: '永久提升法攻',
                type: 'permanent',
                effect: { magicDamage: 15 },
                rarity: 'epic',
                requiredRealm: '金丹期',
                requiredProficiency: 1100,
                failureRate: 0.62,
                baseCount: 1,
                materials: { '千年灵草': 10, '千年灵花': 10, '冰晶': 5 },
                requiresHerbLingen: true,
                requiresGoldenCore: true
            },
            '永久暴击丹': {
                id: 'yongjiu-baojidan',
                name: '永久暴击丹',
                description: '永久提升暴击',
                type: 'permanent',
                effect: { critRate: 0.05 },
                rarity: 'legendary',
                requiredRealm: '元婴期',
                requiredProficiency: 1600,
                failureRate: 0.68,
                baseCount: 1,
                materials: { '万年灵草': 10, '万年灵花': 10, '雷晶': 5 },
                requiresHerbLingen: true,
                requiresGoldenCore: true
            },
            '悟性丹': {
                id: 'wuxingdan',
                name: '悟性丹',
                description: '永久提升悟性',
                type: 'permanent',
                effect: { comprehension: 5 },
                rarity: 'legendary',
                requiredRealm: '元婴期',
                requiredProficiency: 1700,
                failureRate: 0.7,
                baseCount: 1,
                materials: { '万年灵草': 15, '万年灵花': 15, '星尘': 5 },
                requiresHerbLingen: true,
                requiresGoldenCore: true
            },
            '气运丹': {
                id: 'qiyundan',
                name: '气运丹',
                description: '永久提升气运',
                type: 'permanent',
                effect: { luck: 5 },
                rarity: 'legendary',
                requiredRealm: '化神期',
                requiredProficiency: 2500,
                failureRate: 0.75,
                baseCount: 1,
                materials: { '龙涎草': 3, '凤血花': 3, '星尘': 10 },
                requiresHerbLingen: true,
                requiresGoldenCore: true
            }
        }
    }
};

// 将互动NPC添加到GAME_DATA.NPCS中
if (typeof NPC_INTERACTION_LIST !== 'undefined') {
    NPC_INTERACTION_LIST.forEach(npc => {
        GAME_DATA.NPCS[npc.id] = {
            id: npc.id,
            name: npc.name,
            type: 'interactive',
            sect: npc.sect,
            character: npc.character,
            dialogs: npc.dialogs,
            tasks: npc.tasks,
            shop: npc.shop,
            canSteal: npc.canSteal,
            canAttack: npc.canAttack,
            canMarry: npc.canMarry,
            canSworn: npc.canSworn
        };
    });
}