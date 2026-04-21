class Game {
    constructor() {
        this.player = null;
        this.currentMap = null;
        this.currentArea = null;
        this.inBattle = false;
        this.currentEnemy = null;
        this.currentEnemies = [];
        this.reincarnationCount = 0;
        
        this.inDungeon = false;
        this.currentDungeon = null;
        this.dungeonWave = 0;
        this.dungeonStunRound = 0;
        this.dungeonDotDamage = 0;
        this.dungeonDotRound = 0;
        this.inheritance = {
            stats: { bonus: 0 },
            skills: [],
            items: []
        };
        this.messageLog = [];
        this.timeSystem = {
            hour: 6,
            day: 1,
            month: 1,
            year: 1,
            season: 'spring'
        };
        this.wantedSystem = {
            level: 0,
            bounty: 0,
            regions: []
        };
        this.breakthroughModalShown = false;
        this.sanxiuSkillCooldowns = {};
        this.damageReduceBuff = 0;
        this.justGainedCultivation = false;
        // 状态效果系统
        this.statusEffects = {
            player: [],
            enemies: {}
        };
    }

    init() {
        this.log('系统', '欢迎来到凡人修仙录！', 'system');
        this.initTimeSystem();
        this.initInteractiveNPCs();
    }
    
    initInteractiveNPCs() {
        // 将互动NPC添加到GAME_DATA.NPCS中
        if (typeof NPC_INTERACTION_LIST !== 'undefined') {
            NPC_INTERACTION_LIST.forEach(npc => {
                if (!GAME_DATA.NPCS[npc.id]) {
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
                }
            });
        }
    }

    initTimeSystem() {
        this.timeSystem = { ...GAME_DATA.TIME_SYSTEM };
    }

    advanceTime(hours = 1) {
        for (let i = 0; i < hours; i++) {
            this.timeSystem.hour++;
            if (this.timeSystem.hour >= 24) {
                this.timeSystem.hour = 0;
                this.timeSystem.day++;
                if (this.timeSystem.day > 30) {
                    this.timeSystem.day = 1;
                    this.timeSystem.month++;
                    if (this.timeSystem.month > 12) {
                        this.timeSystem.month = 1;
                        this.timeSystem.year++;
                    }
                    this.updateSeason();
                }
            }
        }
        this.timeSystem.isDay = this.timeSystem.hour >= 6 && this.timeSystem.hour < 18;
    }

    updateSeason() {
        if (this.timeSystem.month >= 1 && this.timeSystem.month <= 3) {
            this.timeSystem.season = 'spring';
        } else if (this.timeSystem.month >= 4 && this.timeSystem.month <= 6) {
            this.timeSystem.season = 'summer';
        } else if (this.timeSystem.month >= 7 && this.timeSystem.month <= 9) {
            this.timeSystem.season = 'autumn';
        } else {
            this.timeSystem.season = 'winter';
        }
    }

    getTimeDisplay() {
        const timeOfDay = this.timeSystem.hour >= 6 && this.timeSystem.hour < 12 ? '上午' :
                         this.timeSystem.hour >= 12 && this.timeSystem.hour < 18 ? '下午' : '夜晚';
        const season = GAME_DATA.SEASONS[this.timeSystem.season].name;
        return `第${this.timeSystem.year}年 ${season} 第${this.timeSystem.month}月 第${this.timeSystem.day}日 ${timeOfDay} ${this.timeSystem.hour}时`;
    }

    changeKarma(amount) {
        if (!this.player) return;
        
        const oldKarma = this.player.karma;
        this.player.karma = Math.max(GAME_DATA.KARMA_SYSTEM.min, Math.min(GAME_DATA.KARMA_SYSTEM.max, this.player.karma + amount));
        
        const oldTier = this.getKarmaTier(oldKarma);
        const newTier = this.getKarmaTier(this.player.karma);
        
        if (oldTier !== newTier) {
            const tierInfo = GAME_DATA.KARMA_SYSTEM.tiers[newTier];
            this.log('系统', `善恶值变化：${tierInfo.name}`, 'info');
        }
    }

    getKarmaTier(karma) {
        for (const [tier, info] of Object.entries(GAME_DATA.KARMA_SYSTEM.tiers)) {
            if (karma >= info.min) {
                return tier;
            }
        }
        return 'demon';
    }

    addWanted(region, level = 1) {
        if (!this.wantedSystem.regions.includes(region)) {
            this.wantedSystem.regions.push(region);
        }
        this.wantedSystem.level = Math.max(this.wantedSystem.level, level);
        this.wantedSystem.bounty += GAME_DATA.WANTED_SYSTEM.levels[level].bounty;
        this.log('系统', `你被${region}通缉了！悬赏：${this.wantedSystem.bounty}`, 'combat');
    }

    addToInventory(item, quantity = 1) {
        if (!this.player) return;
        
        // 检查是否是装备包装对象
        if (typeof item === 'object' && item !== null && item.isEquipment && item.item) {
            // 装备包装对象，提取装备对象
            const equipment = item.item;
            if (equipment) {
                // 装备对象，添加到装备背包
                if (!this.player.equipmentBag) {
                    this.player.equipmentBag = [];
                }
                // 深拷贝装备对象，确保所有属性都被正确复制
                const equipmentCopy = JSON.parse(JSON.stringify(equipment));
                equipmentCopy.isEquipment = true;
                // 确保装备有名称
                equipmentCopy.name = equipmentCopy.name || equipment.name || '未知装备';
                equipmentCopy.quality = equipmentCopy.quality || equipmentCopy.rarity || '普通';
                equipmentCopy.type = equipmentCopy.type || equipment.type || '装备';
                this.player.equipmentBag.push(equipmentCopy);
                this.log('系统', `获得装备：${equipmentCopy.name} [${equipmentCopy.quality}]`, 'success');
            }
            return;
        }
        
        // 检查是否是直接的装备对象
        if (typeof item === 'object' && item !== null) {
            // 装备对象，添加到装备背包
            if (!this.player.equipmentBag) {
                this.player.equipmentBag = [];
            }
            // 深拷贝装备对象，确保所有属性都被正确复制
            const equipment = JSON.parse(JSON.stringify(item));
            // 确保必要的属性存在
            equipment.name = equipment.name || equipment.itemName || equipment.item || '未知装备';
            equipment.type = equipment.type || '装备';
            equipment.quality = equipment.quality || equipment.rarity || '普通';
            equipment.attrs = equipment.attrs || {};
            equipment.isEquipment = true;
            this.player.equipmentBag.push(equipment);
            this.log('系统', `获得装备：${equipment.name} [${equipment.quality}]`, 'success');
            return;
        }
        
        // 检查是否是装备名称字符串
        if (typeof item === 'string') {
            // 首先使用正确的 ITEM_DATABASE.getItemById() 函数获取装备数据
            const itemData = GAME_DATA.ITEM_DATABASE.GENERATORS.getItemById(item);
            if (itemData) {
                // 检查是否是装备类型
                if (itemData.isEquipment) {
                    // 装备对象，添加到装备背包
                    if (!this.player.equipmentBag) {
                        this.player.equipmentBag = [];
                    }
                    const equipment = JSON.parse(JSON.stringify(itemData));
                    equipment.name = equipment.name || item;
                    if (equipment.rarity && !equipment.quality) {
                        equipment.quality = GAME_DATA.ITEM_DATABASE.GENERATORS.rarityToQuality(equipment.rarity);
                    }
                    equipment.isEquipment = true;
                    this.player.equipmentBag.push(equipment);
                    this.log('系统', `获得装备：${equipment.name} [${equipment.quality}]`, 'success');
                    return;
                } else {
                    // 普通物品处理
                    const itemName = item;
                    if (this.player.inventory[itemName]) {
                        this.player.inventory[itemName] += quantity;
                    } else {
                        this.player.inventory[itemName] = quantity;
                    }
                    this.log('系统', `获得 ${itemName} x${quantity}`, 'success');
                    return;
                }
            }
            // 如果不在新数据库中，检查旧的GAME_DATA.ITEMS作为兼容
            const oldItemData = GAME_DATA.ITEMS[item];
            if (oldItemData) {
                // 检查是否是装备类型
                const isEquipment = oldItemData.type && 
                    (oldItemData.type === 'weapon' || oldItemData.type === 'armor' || oldItemData.type === 'artifact' || 
                     oldItemData.type === 'magic-weapon' || oldItemData.type === 'helmet' || oldItemData.type === 'chest' || 
                     oldItemData.type === 'shoulder' || oldItemData.type === 'pants' || oldItemData.type === 'boots' || 
                     oldItemData.type === 'ring' || oldItemData.type === 'equipment');
                
                if (isEquipment) {
                    // 装备对象，添加到装备背包
                    if (!this.player.equipmentBag) {
                        this.player.equipmentBag = [];
                    }
                    const equipment = JSON.parse(JSON.stringify(oldItemData));
                    equipment.name = item;
                    if (equipment.rarity && !equipment.quality) {
                        equipment.quality = equipment.rarity;
                    }
                    equipment.isEquipment = true;
                    this.player.equipmentBag.push(equipment);
                    this.log('系统', `获得装备：${equipment.name} [${equipment.quality}]`, 'success');
                    return;
                }
            }
            // 如果是装备名称但不在数据库中，也视为装备（如秘境掉落的装备）
            if (item.includes('剑') || item.includes('刀') || item.includes('甲') || item.includes('盔') || 
                item.includes('戒指') || item.includes('护肩') || item.includes('护腿') || item.includes('靴') || 
                item.includes('法宝') || item.includes('法器') || item.includes('战') || item.includes('古')) {
                // 装备对象，添加到装备背包
                if (!this.player.equipmentBag) {
                    this.player.equipmentBag = [];
                }
                const equipment = {
                    name: item,
                    type: '装备',
                    quality: '普通',
                    isEquipment: true
                };
                this.player.equipmentBag.push(equipment);
                this.log('系统', `获得装备：${equipment.name} [${equipment.quality}]`, 'success');
                return;
            }
        }
        
        // 普通物品处理
        const itemName = typeof item === 'string' ? item : item.name;
        if (!itemName) return;
        
        if (this.player.inventory[itemName]) {
            this.player.inventory[itemName] += quantity;
        } else {
            this.player.inventory[itemName] = quantity;
        }
        this.log('系统', `获得 ${itemName} x${quantity}`, 'success');
    }

    removeFromInventory(itemName, quantity = 1) {
        if (!this.player || !this.player.inventory[itemName]) return false;
        
        if (this.player.inventory[itemName] >= quantity) {
            this.player.inventory[itemName] -= quantity;
            if (this.player.inventory[itemName] <= 0) {
                delete this.player.inventory[itemName];
            }
            return true;
        }
        return false;
    }

    hasItem(itemName, quantity = 1) {
        if (!this.player || !this.player.inventory[itemName]) return false;
        return this.player.inventory[itemName] >= quantity;
    }

    getItemQuantity(itemName) {
        if (!this.player || !this.player.inventory[itemName]) return 0;
        return this.player.inventory[itemName];
    }

    createPlayer(birthOption, nativePlaceOption, personalityOption, playerName = '无名修士', lingen = null) {
        lingen = lingen || this.generateLingen();
        const birth = GAME_DATA.BIRTH_OPTIONS.find(b => b.id === birthOption);
        const nativePlace = GAME_DATA.NATIVE_PLACES.find(n => n.id === nativePlaceOption);
        const personality = GAME_DATA.PERSONALITIES.find(p => p.id === personalityOption);
        const startRealm = GAME_DATA.REALMS[0];
        
        this.initTimeSystem();
        this.wantedSystem = { level: 0, bounty: 0, regions: [] };
        
        this.player = {
            name: playerName || '无名修士',
            birth: birth,
            nativePlace: nativePlace,
            personality: personality,
            lingen: lingen,
            realm: startRealm,
            realmIndex: 0,
            level: 1,
            cultivation: 0,
            hp: startRealm.hp + (birth.bonus.hp || 0),
            maxHp: startRealm.hp + (birth.bonus.hp || 0),
            mp: startRealm.mp + (birth.bonus.mp || 0),
            maxMp: startRealm.mp + (birth.bonus.mp || 0),
            attack: startRealm.attack + (birth.bonus.attack || 0) + (personality.bonus.combatDamage ? Math.floor(startRealm.attack * personality.bonus.combatDamage / 100) : 0),
            defense: startRealm.defense + (birth.bonus.defense || 0) + (personality.bonus.defense || 0),
            wisdom: 10 + (birth.bonus.wisdom || 0),
            strength: 5 + (birth.bonus.strength || 0),
            vitality: 5 + (birth.bonus.vitality || 0),
            intelligence: 5 + (birth.bonus.intelligence || 0),
            agility: 5 + (birth.bonus.agility || 0),
            luck: Math.floor(Math.random() * 30) + 1 + (birth.bonus.luck || 0) + (personality.bonus.luck || 0),
            gold: 50 + (birth.bonus.gold || 0),
            sect: null,
            sectPosition: '散修',
            contribution: 0,
            reputation: 0,
            inventory: {},
            equipmentBag: [],
            equipment: {
                weapon: null,
                armor: null,
                artifact: null,
                magicWeapon: null,
                helmet: null,
                chest: null,
                shoulder: null,
                pants: null,
                boots: null
            },
            skills: ['基础吐纳法'],
            sanxiuActiveSkills: ['punch', 'heal'],
            sanxiuPassiveSkills: ['basicBreathing'],
            bookBag: [],
            learnedBooks: [],
            quests: [],
            karma: 0,
            npcRelations: {},
            npcInteractions: {},
            bountyQuests: [],
            alchemyProficiency: 0,
            knownRecipes: [
                '下品回血丹',
                '下品回蓝丹', 
                '下品修炼丹',
                '下品攻击丹',
                '下品防御丹'
            ],
            materialInventory: {}
        };
        
        birth.items.forEach(item => {
            this.addToInventory(item);
        });

        if (birth.bonus.cultivation) {
            this.player.cultivation += birth.bonus.cultivation;
            this.justGainedCultivation = true;
        }

        this.inheritance.skills.forEach(skill => {
            if (!this.player.skills.includes(skill)) {
                this.player.skills.push(skill);
            }
        });

        this.inheritance.items.forEach(item => {
            this.addToInventory(item);
        });

        // 强制所有玩家出生在青岚村，确保新手任务能够正确触发
        const startMapId = 'newbie-village';
        this.currentMap = GAME_DATA.MAPS[startMapId];
        // 确保玩家出生在小树林（wakeup区域）
        this.currentArea = this.currentMap.areas['wakeup'] || this.currentMap.areas[Object.keys(this.currentMap.areas)[0]];
        
        this.log('系统', `你出生了！灵根：${lingen.name}`, 'success');
        this.log('系统', `灵根品级：${lingen.grade}`, 'info');
        this.log('系统', `灵根描述：${lingen.description}`, 'info');
        this.log('系统', `身世：${birth.name}`, 'info');
        this.log('系统', `籍贯：${nativePlace ? nativePlace.name : '青河镇'}`, 'info');
        this.log('系统', `性格：${personality ? personality.name : '普通'}`, 'info');
        
        // 自动接受青岚村新手任务的第一阶段
        this.acceptQuest('qinglan-1');
        this.log('系统', '你在青岚村外的小树林中苏醒，遇到了村姑阿禾', 'info');
        this.log('系统', '新手任务已自动接取：【林间苏醒】', 'success');
    }

    generateLingen() {
        const rand = Math.random();
        let lingen;
        
        if (rand < 0.001) {
            lingen = GAME_DATA.LINGEN_TYPES.find(l => l.element === 'chaos');
        } else if (rand < 0.005) {
            lingen = GAME_DATA.LINGEN_TYPES.find(l => l.element === 'sword');
        } else if (rand < 0.015) {
            lingen = GAME_DATA.LINGEN_TYPES.find(l => l.element === 'thunder');
        } else if (rand < 0.03) {
            lingen = GAME_DATA.LINGEN_TYPES.find(l => l.element === 'ice');
        } else if (rand < 0.05) {
            lingen = GAME_DATA.LINGEN_TYPES.find(l => l.element === 'space');
        } else if (rand < 0.08) {
            lingen = GAME_DATA.LINGEN_TYPES.find(l => l.element === 'herb');
        } else if (rand < 0.11) {
            lingen = GAME_DATA.LINGEN_TYPES.find(l => l.element === 'goldstone');
        } else if (rand < 0.20) {
            lingen = GAME_DATA.LINGEN_TYPES.find(l => l.element === 'penta');
        } else if (rand < 0.35) {
            lingen = GAME_DATA.LINGEN_TYPES.find(l => l.element === 'quadruple');
        } else if (rand < 0.55) {
            lingen = GAME_DATA.LINGEN_TYPES.find(l => l.element === 'triple');
        } else if (rand < 0.75) {
            lingen = GAME_DATA.LINGEN_TYPES.find(l => l.element === 'dual');
        } else {
            const basicTypes = GAME_DATA.LINGEN_TYPES.filter(l => 
                ['metal', 'wood', 'water', 'fire', 'earth'].includes(l.element)
            );
            lingen = basicTypes[Math.floor(Math.random() * basicTypes.length)];
        }
        
        return lingen;
    }

    moveToMap(mapId) {
        if (!this.currentMap.connections.includes(mapId)) {
            this.log('系统', '无法到达那里！', 'info');
            return;
        }
        
        this.currentMap = GAME_DATA.MAPS[mapId];
        this.currentArea = this.currentMap.areas[Object.keys(this.currentMap.areas)[0]];
        this.log('系统', `你来到了${this.currentMap.name}`, 'info');
        
        // 更新任务进度 - 旅行类型任务
        this.updateQuestProgress('travel', mapId);
        
        // 特殊处理：第一次到达青河镇时触发剧情
        if (mapId === 'qinghe-town') {
            const hasShownQingheArrival = this.player.hasShownQingheArrival;
            if (!hasShownQingheArrival) {
                this.player.hasShownQingheArrival = true;
                // 延迟显示剧情弹窗，让玩家先看到地图
                setTimeout(() => {
                    if (ui && ui.showQingheTownArrival) {
                        ui.showQingheTownArrival();
                    }
                }, 1000);
            }
        }
        
        this.checkRandomEvent();
    }

    moveToArea(areaId) {
        if (!this.currentMap.areas[areaId]) {
            this.log('系统', '没有这个区域！', 'info');
            return;
        }
        
        if (this.currentMap.type === 'sect' && areaId !== 'entrance') {
            const sect = this.currentMap.sect;
            const playerSect = this.player.sect ? (typeof this.player.sect === 'object' ? this.player.sect.id : this.player.sect) : null;
            
            if (!playerSect || playerSect !== sect) {
                this.log('系统', '非本门派弟子，不得进入！', 'warning');
                if (ui) {
                    ui.showSectGateDenial(sect);
                }
                return;
            }
        }
        
        this.currentArea = this.currentMap.areas[areaId];
        
        // 随机生成互动NPC
        this.spawnInteractiveNPCs();
        
        this.log('系统', `你来到了${this.currentArea.name}`, 'info');
        
        // 触发UI更新，显示区域人物
        if (typeof ui !== 'undefined' && ui.updateAreaEntities) {
            ui.updateAreaEntities();
        }
    }
    
    spawnInteractiveNPCs() {
        // 清除当前区域的互动NPC
        if (this.currentArea.interactiveNPCs) {
            delete this.currentArea.interactiveNPCs;
        }
        
        // 确定当前地图的门派
        let currentSect = null;
        if (this.currentMap.type === 'sect') {
            currentSect = this.currentMap.sect;
        }
        
        // 根据当前地图类型决定生成的NPC数量
        let npcCount = 0;
        if (this.currentMap.type === 'town') {
            // 公共区域生成1-2个NPC
            npcCount = Math.floor(Math.random() * 2) + 1;
        } else if (this.currentMap.type === 'sect') {
            // 门派区域生成2-3个NPC
            npcCount = Math.floor(Math.random() * 2) + 2;
        } else if (this.currentMap.type === 'wild') {
            // 野外区域生成0-1个NPC
            npcCount = Math.floor(Math.random() * 2);
        }
        
        if (npcCount > 0) {
            // 过滤出符合条件的NPC
            const availableNPCs = NPC_INTERACTION_LIST.filter(npc => {
                // 门派地图只生成对应门派的NPC
                if (currentSect && npc.sect !== currentSect) {
                    return false;
                }
                // 公共区域可以生成所有门派的NPC
                return true;
            });
            
            if (availableNPCs.length > 0) {
                // 随机选择NPC
                const selectedNPCs = [];
                for (let i = 0; i < npcCount; i++) {
                    if (availableNPCs.length > 0) {
                        const randomIndex = Math.floor(Math.random() * availableNPCs.length);
                        const npc = availableNPCs.splice(randomIndex, 1)[0];
                        selectedNPCs.push(npc);
                    }
                }
                
                if (selectedNPCs.length > 0) {
                    this.currentArea.interactiveNPCs = selectedNPCs;
                }
            }
        }
    }

    talkToNpc(npcId) {
        const npc = GAME_DATA.NPCS[npcId];
        if (!npc) return;
        
        const completedQuests = this.player.completedQuests || [];
        const hasCompletedQuest1 = completedQuests.includes('qinglan-1');
        const hasCompletedQuest2 = completedQuests.includes('qinglan-2');
        const hasCompletedQuest3 = completedQuests.includes('qinglan-3');
        const hasCompletedQuest4 = completedQuests.includes('qinglan-4');
        const hasCompletedQuest5 = completedQuests.includes('qinglan-5');
        
        // 根据任务状态显示不同的对话
        let dialog;
        if (npcId === 'ahe' && hasCompletedQuest1) {
            // 阿禾在任务1完成后的对话
            const postQuestDialogs = [
                '你已经醒了啊，感觉好些了吗？',
                '村长正在等你呢，快去找他吧。',
                '青岚村最近不太平，你要小心啊。'
            ];
            dialog = postQuestDialogs[Math.floor(Math.random() * postQuestDialogs.length)];
        } else if (npcId === 'village-elder') {
            if (hasCompletedQuest5) {
                // 村长在所有任务完成后的对话
                const postQuestDialogs = [
                    '你已经证明了自己是真正的守岚者。',
                    '青岚村永远欢迎你的归来。',
                    '去青河镇的路上要小心，那里有更强大的敌人。'
                ];
                dialog = postQuestDialogs[Math.floor(Math.random() * postQuestDialogs.length)];
            } else if (hasCompletedQuest1 && !hasCompletedQuest2) {
                // 村长在你完成任务1但未完成任务2时的对话
                dialog = '你来了，我已经等你很久了。让我告诉你关于守岚者的事情...';
            } else {
                dialog = npc.dialogs[Math.floor(Math.random() * npc.dialogs.length)];
            }
        } else {
            dialog = npc.dialogs[Math.floor(Math.random() * npc.dialogs.length)];
        }
        
        this.log(npc.name, dialog, 'info');
        
        // 更新任务进度 - 对话类型任务
        this.updateQuestProgress('talk', npcId);
        
        // 特殊处理：与村长对话时触发任务弹窗
        if (npcId === 'village-elder') {
            const completedQuests = this.player.completedQuests || [];
            const hasQuest1 = this.player.quests.find(q => q.id === 'qinglan-1');
            const hasQuest2 = this.player.quests.find(q => q.id === 'qinglan-2');
            const hasQuest3 = this.player.quests.find(q => q.id === 'qinglan-3');
            const hasQuest4 = this.player.quests.find(q => q.id === 'qinglan-4');
            const hasQuest5 = this.player.quests.find(q => q.id === 'qinglan-5');
            
            const hasCompletedQuest1 = completedQuests.includes('qinglan-1');
            const hasCompletedQuest2 = completedQuests.includes('qinglan-2');
            const hasCompletedQuest3 = completedQuests.includes('qinglan-3');
            const hasCompletedQuest4 = completedQuests.includes('qinglan-4');
            const hasCompletedQuest5 = completedQuests.includes('qinglan-5');
            
            // 任务流程判定：必须按顺序完成，且只能触发一次
            // 任务2：已完成任务1，未完成2、3、4、5，且未接取任务2
            if (hasCompletedQuest1 && !hasCompletedQuest2 && !hasCompletedQuest3 && !hasCompletedQuest4 && !hasQuest2) {
                // 触发任务2的弹窗对话
                if (ui && ui.showQuest2Story) {
                    setTimeout(() => {
                        ui.showQuest2Story();
                    }, 500);
                }
            }
            // 任务4：已完成任务1、2、3，未完成4、5，且未接取任务4
            else if (hasCompletedQuest1 && hasCompletedQuest2 && hasCompletedQuest3 && !hasCompletedQuest4 && !hasCompletedQuest5 && !hasQuest4) {
                // 触发任务4的弹窗对话
                if (ui && ui.showQuest4Story) {
                    setTimeout(() => {
                        ui.showQuest4Story();
                    }, 500);
                }
            }
            // 任务5：已完成任务1、2、3、4，未完成5，且未接取任务5
            else if (hasCompletedQuest1 && hasCompletedQuest2 && hasCompletedQuest3 && hasCompletedQuest4 && !hasCompletedQuest5 && !hasQuest5) {
                // 触发任务5的弹窗对话
                if (ui && ui.showQuest5Story) {
                    setTimeout(() => {
                        ui.showQuest5Story();
                    }, 500);
                }
            }
        }
        
        // 特殊处理：与王大叔对话时触发任务3的弹窗
        if (npcId === 'wang-hunter') {
            const completedQuests = this.player.completedQuests || [];
            const hasQuest2 = this.player.quests.find(q => q.id === 'qinglan-2');
            const hasQuest3 = this.player.quests.find(q => q.id === 'qinglan-3');
            
            const hasCompletedQuest1 = completedQuests.includes('qinglan-1');
            const hasCompletedQuest2 = completedQuests.includes('qinglan-2');
            const hasCompletedQuest3 = completedQuests.includes('qinglan-3');
            
            // 任务3：必须按顺序，已完成任务1和2，未完成3，且未接取任务2和3
            // 注意：必须未接取任务2（说明任务2已完成），且未接取任务3
            if (hasCompletedQuest1 && hasCompletedQuest2 && !hasCompletedQuest3 && !hasQuest2 && !hasQuest3) {
                // 触发任务3的弹窗对话
                if (ui && ui.showQuest3Story) {
                    setTimeout(() => {
                        ui.showQuest3Story();
                    }, 500);
                }
            }
        }
        
        return npc;
    }

    joinSect(sectId) {
        const sect = GAME_DATA.SECTS.find(s => s.id === sectId);
        if (!sect) return { success: false, reason: '门派不存在' };
        
        if (this.player.sect) {
            this.log('系统', '你已经加入了一个门派！', 'info');
            return { success: false, reason: '你已经加入了一个门派' };
        }
        
        const requiredRealmName = sect.requiredRealm;
        let requiredLevel = 1;
        
        if (requiredRealmName === '炼气期') {
            requiredLevel = 1;
        } else if (requiredRealmName === '筑基期') {
            requiredLevel = 11;
        } else if (requiredRealmName === '金丹期') {
            requiredLevel = 12;
        } else if (requiredRealmName === '元婴期') {
            requiredLevel = 13;
        } else if (requiredRealmName === '化神期') {
            requiredLevel = 14;
        } else {
            const foundRealm = GAME_DATA.REALMS.find(r => r.name === requiredRealmName);
            if (foundRealm) {
                requiredLevel = foundRealm.level;
            }
        }
        
        const realmOk = this.player.realm.level >= requiredLevel;
        
        const playerLingen = this.player.lingen;
        const lingenOk = playerLingen.compatibleSects && playerLingen.compatibleSects.includes(sect.element);
        
        if (!realmOk) {
            this.log('系统', `你的境界不够！需要${sect.requiredRealm}`, 'combat');
            return { success: false, reason: `你的境界不够！需要 ${sect.requiredRealm}` };
        }
        
        if (!lingenOk) {
            const elementNames = {
                'metal': '金',
                'wood': '木',
                'water': '水',
                'fire': '火',
                'earth': '土'
            };
            this.log('系统', `你的灵根不符合要求！该门派只招收${elementNames[sect.element]}系灵根修士`, 'combat');
            return { success: false, reason: `你的灵根不符合要求！该门派只招收${elementNames[sect.element]}系灵根修士` };
        }
        
        this.player.sect = sect;
        this.player.sectPosition = '外门弟子';
        
        console.log('=== joinSect 开始 ===');
        console.log('添加前skills数组:', this.player.skills);
        console.log('门派技能:', sect.skills);
        
        const qiSkills = sect.skills.slice(0, 3);
        qiSkills.forEach(skill => {
            if (!this.player.skills.includes(skill)) {
                this.player.skills.push(skill);
                console.log('添加技能:', skill);
            }
        });
        
        console.log('添加后skills数组:', this.player.skills);
        console.log('=== joinSect 结束 ===');
        
        this.log('系统', `恭喜！你加入了${sect.name}！`, 'success');
        this.log('系统', `获得门派技能：${qiSkills.join('、')}`, 'success');
        return { success: true, sectName: sect.name };
    }
    
    generateRandomMonsters(monsterPool) {
        const monsters = [];
        const numMonsters = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < numMonsters; i++) {
            const monsterId = monsterPool[Math.floor(Math.random() * monsterPool.length)];
            const monsterData = GAME_DATA.MONSTERS[monsterId];
            if (monsterData) {
                monsters.push({
                    ...monsterData,
                    uniqueId: `${monsterId}_${i}`,
                    currentHp: monsterData.hp
                });
            }
        }
        
        const rareChance = 0.1;
        if (Math.random() < rareChance) {
            const rareMonsters = Object.entries(GAME_DATA.MONSTERS)
                .filter(([id, m]) => m.rarity === 'rare' || m.rarity === 'epic')
                .map(([id]) => id);
            if (rareMonsters.length > 0) {
                const rareMonsterId = rareMonsters[Math.floor(Math.random() * rareMonsters.length)];
                const rareMonsterData = GAME_DATA.MONSTERS[rareMonsterId];
                monsters.push({
                    ...rareMonsterData,
                    uniqueId: `${rareMonsterId}_rare`,
                    currentHp: rareMonsterData.hp
                });
            }
        }
        
        return monsters;
    }
    
    getDropsFromMonster(monster) {
        const drops = [];
        
        // 气运影响掉落率
        const luckBonus = (this.player.luck || 0) * 0.02;
        
        // 先检查是否有装备掉落配置
        const equipDrop = this.getEquipmentDrop(monster);
        if (equipDrop) {
            drops.push(equipDrop);
        }
        
        if (!monster.drops) return drops;
        
        const dropChance = 0.8 + luckBonus;
        
        if (Math.random() < dropChance) {
            const totalWeight = monster.drops.reduce((sum, d) => sum + d.weight, 0);
            const roll = Math.random() * totalWeight;
            
            let cumulative = 0;
            for (const d of monster.drops) {
                cumulative += d.weight;
                if (roll <= cumulative) {
                    let quantity = Math.floor(Math.random() * (d.max - d.min + 1)) + d.min;
                    // 气运影响掉落数量
                    if (Math.random() < luckBonus * 0.5) {
                        quantity = Math.min(d.max, quantity + 1);
                    }
                    drops.push({ item: d.item, quantity });
                    break;
                }
            }
        }
        
        return drops;
    }
    
    // 根据怪物获取装备掉落
    getEquipmentDrop(monster) {
        if (!GAME_DATA.ITEM_DATABASE || !GAME_DATA.ITEM_DATABASE.GENERATORS) return null;
        
        const monsterRealm = monster.realm;
        const rarity = monster.rarity || 'common';
        
        // 根据原有逻辑确定可掉落的品质
        let allowedRarities = [];
        switch (rarity) {
            case 'common':
                // 野外普通怪掉落白色和绿色品质装备
                allowedRarities = ['common', 'uncommon'];
                break;
            case 'uncommon':
            case 'rare':
            case 'elite':
                // 野外精英掉落绿色和蓝色品质装备
                allowedRarities = ['uncommon', 'rare'];
                break;
            case 'boss':
            case 'epic':
                // 野外BOSS掉落紫色品质装备
                allowedRarities = ['epic'];
                break;
            default:
                allowedRarities = ['common'];
        }
        
        // 30%概率掉落装备
        if (Math.random() < 0.3) {
            const equipTemplate = GAME_DATA.ITEM_DATABASE.GENERATORS.getRandomEquipment(monsterRealm, allowedRarities);
            if (equipTemplate) {
                return this.generateEquipment(equipTemplate);
            }
        }
        
        return null;
    }
    
    // 生成装备 - 使用新的装备属性生成规则
    generateEquipment(equipData) {
        // 如果是套装装备，直接保留原始属性，包括所有定义好的属性
        if (equipData.set) {
            const equipment = {
                ...equipData,
                quality: GAME_DATA.ITEM_DATABASE.GENERATORS.rarityToQuality(equipData.rarity),
                id: `${equipData.id || equipData.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                isEquipment: true,
                randomAttrs: []
            };
            // 确保 attrs 存在但不覆盖原始属性
            if (!equipment.attrs) {
                equipment.attrs = {};
            }
            return { item: equipment, quantity: 1, isEquipment: true };
        }
        
        // 获取装备属性生成规则
        const rules = GAME_DATA.ITEM_DATABASE.GENERATORS.EQUIPMENT_ATTR_RULES;
        const randomAttrPool = GAME_DATA.ITEM_DATABASE.GENERATORS.RANDOM_ATTR_POOL;
        const randomAttrCountByQuality = GAME_DATA.ITEM_DATABASE.GENERATORS.RANDOM_ATTR_COUNT_BY_QUALITY;
        const realmValueRange = GAME_DATA.ITEM_DATABASE.GENERATORS.REALM_VALUE_RANGE;
        
        // 创建装备对象 - 先复制所有原始属性
        const equipment = {
            ...equipData,
            quality: GAME_DATA.ITEM_DATABASE.GENERATORS.rarityToQuality(equipData.rarity),
            id: `${equipData.id || equipData.name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            isEquipment: true,
            randomAttrs: []
        };
        
        // 检查原始数据是否已经有属性定义，如果没有才初始化基础属性为0
        // 这样可以保留原始数据库中已经定义好的属性
        const attrKeys = ['attack', 'defense', 'hp', 'mp', 'strength', 'vitality', 'intelligence', 
                          'agility', 'luck', 'crit', 'dodge', 'magicDamage', 'mpRegen', 
                          'physicalDamage', 'hpBonus', 'mpBonus', 'defenseBonus', 'critRate', 
                          'critDmg', 'hit', 'dodgeRate', 'lifeSteal', 'reflect'];
        
        attrKeys.forEach(key => {
            if (equipment[key] === undefined || equipment[key] === null) {
                equipment[key] = 0;
            }
        });
        
        // 确定装备类型并获取基础属性
        let baseAttrs = [];
        const equipName = equipment.name || '';
        const equipType = equipment.type || '';
        const equipDisplayType = equipData.displayType || '';
        
        // 检查是否是重物理武器（刀、斧、棍等）
        const isHeavyPhysicalWeapon = rules.PHYSICAL_WEAPON_HEAVY.keywords.some(keyword => 
            equipName.includes(keyword)
        );
        
        // 检查是否是轻物理武器（剑、匕首、枪等）
        const isLightPhysicalWeapon = rules.PHYSICAL_WEAPON_LIGHT.keywords.some(keyword => 
            equipName.includes(keyword)
        );
        
        // 检查是否是法系武器（杖、琴、笛等）
        const isMagicWeapon = rules.MAGIC_WEAPON.keywords.some(keyword => 
            equipName.includes(keyword)
        );
        
        // 检查是否是防具
        const isArmor = rules.ARMOR.slots.some(slot => 
            equipType.includes(slot) || equipDisplayType.includes(slot)
        );
        
        // 检查是否是法宝法器
        const isArtifact = rules.ARTIFACT.slots.some(slot => 
            equipType.includes(slot) || equipDisplayType.includes(slot)
        );
        
        // 确定基础属性
        if (isHeavyPhysicalWeapon) {
            baseAttrs = rules.PHYSICAL_WEAPON_HEAVY.baseAttrs;
        } else if (isLightPhysicalWeapon) {
            baseAttrs = rules.PHYSICAL_WEAPON_LIGHT.baseAttrs;
        } else if (isMagicWeapon) {
            baseAttrs = rules.MAGIC_WEAPON.baseAttrs;
        } else if (isArmor) {
            baseAttrs = rules.ARMOR.baseAttrs;
        } else if (isArtifact) {
            baseAttrs = rules.ARTIFACT.baseAttrs;
        } else {
            // 默认给一些通用基础属性
            baseAttrs = ['hp', 'mp', 'defense'];
        }
        
        // 获取装备境界对应的数值范围
        let valueRange = { percent: [1, 2], value: [3, 8] }; // 默认值
        for (const [realm, range] of Object.entries(realmValueRange)) {
            if (equipment.realm && equipment.realm.includes(realm)) {
                valueRange = range;
                break;
            }
        }
        
        // 生成基础属性 - 只有在原始数据中没有定义该属性时才生成
        baseAttrs.forEach(attrKey => {
            // 如果原始数据中已经有这个属性了，就不覆盖它
            if (equipData[attrKey] !== undefined && equipData[attrKey] !== null) {
                return;
            }
            
            let value;
            // 根据属性类型决定数值范围
            const isPercentAttr = ['critRate', 'critDmg', 'hit', 'dodgeRate', 'lifeSteal', 'reflect'].includes(attrKey);
            
            if (isPercentAttr) {
                value = (Math.random() * (valueRange.percent[1] - valueRange.percent[0]) + valueRange.percent[0]).toFixed(1);
            } else {
                value = Math.floor(Math.random() * (valueRange.value[1] - valueRange.value[0] + 1)) + valueRange.value[0];
            }
            
            equipment[attrKey] = parseFloat(value);
        });
        
        // 根据品质确定随机属性数量
        const quality = equipment.quality;
        let randomAttrCount = randomAttrCountByQuality[quality] || 0;
        
        // 生成随机属性
        if (randomAttrCount > 0) {
            const availableAttrs = [...randomAttrPool];
            // 移除基础属性中已有的属性，避免重复
            const filteredAttrs = availableAttrs.filter(attr => !baseAttrs.includes(attr.key));
            
            for (let i = 0; i < randomAttrCount; i++) {
                if (filteredAttrs.length === 0) break;
                const randomIndex = Math.floor(Math.random() * filteredAttrs.length);
                const attr = filteredAttrs.splice(randomIndex, 1)[0];
                
                let value;
                if (attr.type === 'percent') {
                    value = (Math.random() * (valueRange.percent[1] - valueRange.percent[0]) + valueRange.percent[0]).toFixed(1);
                } else {
                    value = Math.floor(Math.random() * (valueRange.value[1] - valueRange.value[0] + 1)) + valueRange.value[0];
                }
                
                // 同时设置到equipment对象和randomAttrs数组
                equipment[attr.key] = parseFloat(value);
                equipment.randomAttrs.push({
                    name: attr.name,
                    key: attr.key,
                    value: parseFloat(value),
                    type: attr.type
                });
            }
        }
        
        return { item: equipment, quantity: 1, isEquipment: true };
    }

    startBattle(monsterIdOrPool) {
        this.inBattle = true;
        
        if (Array.isArray(monsterIdOrPool)) {
            this.currentEnemies = this.generateRandomMonsters(monsterIdOrPool);
        } else {
            const monster = GAME_DATA.MONSTERS[monsterIdOrPool];
            if (!monster) {
                this.inBattle = false;
                return;
            }
            this.currentEnemies = [{
                ...monster,
                uniqueId: monsterIdOrPool,
                currentHp: monster.hp
            }];
        }
        
        this.currentEnemy = this.currentEnemies.length > 0 ? this.currentEnemies[0] : null;
        
        const enemyNames = this.currentEnemies.map(e => e.name).join('、');
        this.log('战斗', `遭遇了${enemyNames}！`, 'combat');
        
        if (ui && this.currentEnemies.length > 0) {
            ui.showBattle();
        }
    }

    attackEnemy(targetIndex = 0, skillName = '普通攻击') {
        if (!this.inBattle || this.currentEnemies.length === 0) return;
        
        const target = this.currentEnemies[targetIndex];
        if (!target || !target.currentHp || target.currentHp <= 0) {
            const aliveEnemy = this.currentEnemies.find(e => e.currentHp && e.currentHp > 0);
            if (aliveEnemy) {
                targetIndex = this.currentEnemies.indexOf(aliveEnemy);
                return this.attackEnemy(targetIndex, skillName);
            }
            return;
        }
        
        const totalStats = this.getPlayerTotalStats();
        let damage = totalStats.attack;
        let mpCost = 0;
        let isAOE = false;
        let isHeal = false;
        let isBuff = false;
        let healAmount = 0;
        let defenseBonus = 0;
        let skillElement = null;
        
        if (skillName !== '普通攻击') {
            let skill = GAME_DATA.SKILLS[skillName];
            let isSanxiuSkill = false;
            
            if (!skill && this.player.sanxiuActiveSkills && this.player.sanxiuActiveSkills.includes(skillName)) {
                skill = GAME_DATA.SANXIU_ACTIVE_SKILLS[skillName];
                isSanxiuSkill = true;
            }
            
            if (skill && (this.player.skills.includes(skillName) || isSanxiuSkill)) {
                skillElement = skill.element;
                if (this.player.mp < skill.mpCost) {
                    this.log('战斗', '灵力不足！', 'combat');
                    return;
                }
                if (skill.type === 'heal') {
                    isHeal = true;
                    healAmount = skill.damage || 20;
                } else if (skill.type === 'defense' || skill.type === 'buff') {
                    isBuff = true;
                    defenseBonus = skill.defenseBonus || 15;
                } else if (skill.type === 'control') {
                    // 控制技能，可能没有伤害
                    const baseDamage = (skill.element === 'wood' || skill.element === 'water' || skill.element === 'fire') 
                        ? totalStats.magicDamage 
                        : totalStats.attack;
                    damage = skill.damage ? Math.floor((baseDamage * 0.5) + skill.damage * (this.player.cultivationBonus || 1)) : 0;
                } else {
                    const baseDamage = (skill.element === 'wood' || skill.element === 'water' || skill.element === 'fire') 
                        ? totalStats.magicDamage 
                        : totalStats.attack;
                    damage = Math.floor((baseDamage * 0.7) + skill.damage * (this.player.cultivationBonus || 1));
                }
                mpCost = skill.mpCost;
                isAOE = skill.isAOE || false;
                this.player.mp -= mpCost;
            }
        }
        
        // 应用灵根特性：单属性灵根的对应属性功法效果翻倍
        if (skillElement && this.player.lingen) {
            const lingenElement = this.player.lingen.element;
            // 检查是否是单属性灵根且技能元素匹配
            if ((lingenElement === 'metal' && skillElement === 'metal') ||
                (lingenElement === 'wood' && skillElement === 'wood') ||
                (lingenElement === 'water' && skillElement === 'water') ||
                (lingenElement === 'fire' && skillElement === 'fire') ||
                (lingenElement === 'earth' && skillElement === 'earth')) {
                damage = Math.floor(damage * 2);
                this.log('战斗', `灵根加成！${this.player.lingen.name}特性触发，伤害翻倍！`, 'info');
            }
        }
        
        const skill = GAME_DATA.SKILLS[skillName] || (this.player.sanxiuActiveSkills && this.player.sanxiuActiveSkills.includes(skillName) ? GAME_DATA.SANXIU_ACTIVE_SKILLS[skillName] : null);
        
        if (isHeal) {
            const healValue = Math.floor(totalStats.maxHp * (healAmount / 100));
            this.player.hp = Math.min(totalStats.maxHp, this.player.hp + healValue);
            this.log('战斗', `你使用${skillName}恢复了${healValue}点气血！`, 'combat');
            // 显示治疗效果
            if (ui) {
                const playerDiv = document.getElementById('battle-player-info');
                if (playerDiv) {
                    const rect = playerDiv.getBoundingClientRect();
                    const healDiv = document.createElement('div');
                    healDiv.style.position = 'absolute';
                    healDiv.style.left = `${rect.left + rect.width / 2}px`;
                    healDiv.style.top = `${rect.top + rect.height / 2}px`;
                    healDiv.style.color = '#22c55e';
                    healDiv.style.fontSize = '24px';
                    healDiv.style.fontWeight = 'bold';
                    healDiv.style.pointerEvents = 'none';
                    healDiv.style.zIndex = '1000';
                    healDiv.style.textShadow = '0 0 10px rgba(0,0,0,0.8)';
                    healDiv.textContent = `+${healValue}`;
                    healDiv.style.transform = 'scale(0)';
                    healDiv.style.transition = 'transform 0.2s ease, opacity 0.5s ease, translateY 0.5s ease';
                    document.body.appendChild(healDiv);
                    
                    setTimeout(() => {
                        healDiv.style.transform = 'scale(1.5) translateY(-20px)';
                        healDiv.style.opacity = '1';
                    }, 10);
                    
                    setTimeout(() => {
                        healDiv.style.transform = 'scale(1) translateY(-60px)';
                        healDiv.style.opacity = '0';
                        setTimeout(() => {
                            if (healDiv.parentNode) {
                                healDiv.parentNode.removeChild(healDiv);
                            }
                        }, 500);
                    }, 100);
                }
            }
        } else if (isBuff) {
            if (!this.player.battleBuffs) {
                this.player.battleBuffs = [];
            }
            this.player.battleBuffs.push({
                name: skillName,
                defenseBonus: defenseBonus,
                duration: 3
            });
            this.log('战斗', `你使用${skillName}，防御提升了${defenseBonus}点！`, 'combat');
            // 显示 buff 效果
            if (ui) {
                const playerDiv = document.getElementById('battle-player-info');
                if (playerDiv) {
                    const rect = playerDiv.getBoundingClientRect();
                    ui.showParticleEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
                }
            }
        } else if (isAOE) {
            this.currentEnemies.forEach((enemy, idx) => {
                if (enemy.currentHp && enemy.currentHp > 0) {
                    const finalDamage = Math.max(1, Math.floor(damage - enemy.defense * 0.3));
                    enemy.currentHp -= finalDamage;
                    this.log('战斗', `你使用${skillName}对${enemy.name}造成了${finalDamage}点伤害！`, 'combat');
                    // 显示伤害数字、攻击动画、粒子效果和震动效果
                    if (ui) {
                        const enemyDiv = document.querySelector(`#battle-enemies-container > div:nth-child(${idx + 1})`);
                        if (enemyDiv) {
                            const rect = enemyDiv.getBoundingClientRect();
                            ui.showDamageNumber(rect.left + rect.width / 2, rect.top + rect.height / 2, finalDamage, true);
                            ui.showAttackAnimation(enemyDiv, true);
                            ui.showParticleEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
                            ui.shakeElement(enemyDiv);
                        }
                    }
                    
                    // 处理套装特效 - AOE技能也能触发
                    this.applySetEffects(enemy);
                }
            });
        } else if (skill && skill.type === 'control') {
            // 控制技能，可能没有伤害
            if (damage > 0) {
                const finalDamage = Math.max(1, Math.floor(damage - target.defense * 0.3));
                target.currentHp -= finalDamage;
                this.log('战斗', `你使用${skillName}对${target.name}造成了${finalDamage}点伤害！`, 'combat');
                // 显示伤害数字、攻击动画、粒子效果和震动效果
                if (ui) {
                    const targetIndex = this.currentEnemies.indexOf(target);
                    const enemyDiv = document.querySelector(`#battle-enemies-container > div:nth-child(${targetIndex + 1})`);
                    if (enemyDiv) {
                        const rect = enemyDiv.getBoundingClientRect();
                        ui.showDamageNumber(rect.left + rect.width / 2, rect.top + rect.height / 2, finalDamage, true);
                        ui.showAttackAnimation(enemyDiv, true);
                        ui.showParticleEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
                        ui.shakeElement(enemyDiv);
                    }
                }
            }
            this.log('战斗', `你使用${skillName}控制了${target.name}！`, 'combat');
            
            // 处理套装特效
            this.applySetEffects(target);
        } else {
            const finalDamage = Math.max(1, Math.floor(damage - target.defense * 0.3));
            target.currentHp -= finalDamage;
            this.log('战斗', `你使用${skillName}对${target.name}造成了${finalDamage}点伤害！`, 'combat');
            // 显示伤害数字、攻击动画、粒子效果和震动效果
            if (ui) {
                const targetIndex = this.currentEnemies.indexOf(target);
                const enemyDiv = document.querySelector(`#battle-enemies-container > div:nth-child(${targetIndex + 1})`);
                if (enemyDiv) {
                    const rect = enemyDiv.getBoundingClientRect();
                    ui.showDamageNumber(rect.left + rect.width / 2, rect.top + rect.height / 2, finalDamage, true);
                    ui.showAttackAnimation(enemyDiv, true);
                    ui.showParticleEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
                    ui.shakeElement(enemyDiv);
                }
            }
            
            // 处理套装特效
            this.applySetEffects(target);
        }
        
        // 处理状态效果
        this.processStatusEffects();
        
        // 更新战斗界面
        if (ui) {
            ui.updateBattle();
        }
        
        const aliveEnemies = this.currentEnemies.filter(e => e.currentHp && e.currentHp > 0);
        if (aliveEnemies.length === 0) {
            // 只在秘境战斗中更新悬赏任务（野外战斗在 endBattle 中更新）
            if (this.inDungeon) {
                const killedEnemies = this.currentEnemies.filter(e => !e.currentHp || e.currentHp <= 0);
                killedEnemies.forEach(enemy => {
                    this.updateQuestProgress('kill', enemy.id);
                    this.updateBountyProgress('kill', enemy.name);
                });
                this.dungeonWaveClear();
            } else {
                this.endBattle(true);
            }
        } else {
            this.enemyTurn();
        }
    }

    // 防御方法
    defend() {
        if (!this.inBattle) return;
        
        this.log('战斗', '你采取了防御姿态，减少受到的伤害！', 'combat');
        this.player.isDefending = true;
        
        // 敌人回合
        this.enemyTurn();
        
        // 取消防御状态
        this.player.isDefending = false;
    }

    enemyTurn() {
        if (!this.inBattle) return;
        
        if (this.inDungeon) {
            this.dungeonEnemyTurn();
            return;
        }
        
        // 处理状态效果
        this.processStatusEffects();
        
        const aliveEnemies = this.currentEnemies.filter(e => e.currentHp && e.currentHp > 0);
        const totalStats = this.getPlayerTotalStats();
        
        aliveEnemies.forEach(enemy => {
            // 检查敌人是否被控制（冰冻、眩晕等）
            const hasControlEffect = this.hasStatusEffect('enemy', 'freeze', enemy.uniqueId) || 
                                   this.hasStatusEffect('enemy', 'stun', enemy.uniqueId);
            
            if (hasControlEffect) {
                // 被控制的敌人无法行动
                return;
            }
            
            let damage = enemy.attack;
            let skillUsed = '攻击';
            
            if (enemy.skills && enemy.skills.length > 0) {
                const skillName = enemy.skills[Math.floor(Math.random() * enemy.skills.length)];
                const monsterSkill = GAME_DATA.MONSTER_SKILLS[skillName];
                if (monsterSkill) {
                    skillUsed = monsterSkill.name;
                    if (monsterSkill.type === 'attack') {
                        damage = Math.floor(enemy.attack * (monsterSkill.damageMultiplier || 1));
                    } else if (monsterSkill.type === 'heal') {
                        const healAmount = Math.floor(monsterSkill.healAmount || 20);
                        enemy.currentHp = Math.min(enemy.hp, enemy.currentHp + healAmount);
                        this.log('战斗', `${enemy.name}使用${monsterSkill.name}恢复了${healAmount}点气血！`, 'combat');
                        return;
                    }
                }
            }
            
            // 计算最终伤害，防御状态下减少伤害
            let finalDamage = Math.max(1, Math.floor(damage - totalStats.defense));
            if (this.player.isDefending) {
                finalDamage = Math.max(1, Math.floor(finalDamage * 0.5)); // 防御时减少50%伤害
                this.log('战斗', `你采取防御姿态，减少了受到的伤害！`, 'combat');
            }
            this.player.hp -= finalDamage;
            
            this.log('战斗', `${enemy.name}使用${skillUsed}对你造成了${finalDamage}点伤害！`, 'combat');
        });
        
        if (this.player.battleBuffs) {
            this.player.battleBuffs = this.player.battleBuffs.filter(buff => {
                buff.duration--;
                if (buff.duration <= 0) {
                    this.log('战斗', `${buff.name}效果结束！`, 'combat');
                    return false;
                }
                return true;
            });
        }
        
        if (this.player.hp <= 0) {
            this.player.hp = 0;
            this.endBattle(false);
        }
    }

    endBattle(victory) {
        if (this.inDungeon) {
            // 先清理战斗状态
            this.inBattle = false;
            this.currentEnemy = null;
            this.currentEnemies = [];
            this.player.battleBuffs = [];
            this.statusEffects = {
                player: [],
                enemies: {}
            };
            
            if (victory) {
                this.dungeonWaveClear();
            } else {
                this.exitDungeon();
                this.handleDeath();
            }
            return;
        }
        
        if (victory) {
            let totalCultivation = 0;
            const allDrops = [];
            
            // 先保存敌人引用，因为后面要清理
            const enemies = [...this.currentEnemies];
            
            enemies.forEach(enemy => {
                totalCultivation += enemy.cultivation;
                
                this.updateQuestProgress('kill', enemy.id);
                this.updateBountyProgress('kill', enemy.name);
                
                const drops = this.getDropsFromMonster(enemy);
                drops.forEach(drop => {
                    allDrops.push(drop);
                });
            });
            
            // 清理战斗状态
            this.inBattle = false;
            this.currentEnemy = null;
            this.currentEnemies = [];
            this.player.battleBuffs = [];
            this.statusEffects = {
                player: [],
                enemies: {}
            };
            
            totalCultivation *= (this.player.cultivationBonus || 1);
            
            // 翻倍所有怪物的修为奖励
            totalCultivation *= 2;
            
            // 先增加修为
            this.player.cultivation += Math.floor(totalCultivation);
            this.justGainedCultivation = true;
            this.log('战斗', `胜利！获得${Math.floor(totalCultivation)}点修为！`, 'success');
            
            if (allDrops.length > 0) {
                allDrops.forEach(drop => {
                    if (drop.item === '银两') {
                        this.player.gold += drop.quantity;
                        this.log('战斗', `获得银两：${drop.quantity}`, 'success');
                    } else if (drop.isEquipment) {
                        // 装备掉落
                        this.addToInventory(drop);
                    } else {
                        // 普通物品
                        for (let i = 0; i < drop.quantity; i++) {
                            this.addToInventory(drop.item);
                        }
                        const quantityStr = drop.quantity > 1 ? ` x${drop.quantity}` : '';
                        this.log('战斗', `获得战利品：${drop.item}${quantityStr}`, 'success');
                    }
                });
            }
            
            // 检查是否可以升级
            this.checkLevelUp();
            
            this.lastBattleRewards = {
                cultivation: Math.floor(totalCultivation),
                drops: allDrops
            };
        } else {
            // 清理战斗状态
            this.inBattle = false;
            this.currentEnemy = null;
            this.currentEnemies = [];
            this.player.battleBuffs = [];
            this.statusEffects = {
                player: [],
                enemies: {}
            };
            
            this.log('战斗', '你被打败了...', 'combat');
            this.handleDeath();
        }
        
        if (victory) {
            ui.showVictoryScreen();
        }
    }

    checkLevelUp() {
        const currentRealm = GAME_DATA.REALMS[this.player.realmIndex];
        const nextRealm = GAME_DATA.REALMS[this.player.realmIndex + 1];
        
        if (!nextRealm) {
            return false;
        }
        
        // 检查修为是否足够升级
        if (this.player.cultivation < nextRealm.cultivationNeeded) {
            return false;
        }
        
        const currentName = currentRealm.name;
        const nextName = nextRealm.name;
        
        // 提取当前境界类型（如从"炼气期前期10层"提取"炼气"）
        const currentRealmTypeMatch = currentName.match(/(炼气|筑基|金丹|元婴|化神)/);
        const nextRealmTypeMatch = nextName.match(/(炼气|筑基|金丹|元婴|化神)/);
        
        const currentRealmType = currentRealmTypeMatch ? currentRealmTypeMatch[0] : '';
        const nextRealmType = nextRealmTypeMatch ? nextRealmTypeMatch[0] : '';
        
        // 只有当境界类型发生变化时（如从炼气到筑基）才需要突破
        const isBreakthroughNeeded = currentRealmType !== nextRealmType;
        
        if (isBreakthroughNeeded) {
            // 检查是否可以突破
            if (this.canBreakthrough()) {
                // 提示玩家需要突破
                this.log('系统', '你的修为已满！可以尝试突破了！', 'success');
                if (!this.breakthroughModalShown) {
                    this.breakthroughModalShown = true;
                    ui.showBreakthroughPopup();
                }
                return false;
            } else {
                this.log('系统', '你的境界已达到瓶颈！需要使用突破丹才能继续突破！', 'warning');
                return false;
            }
        }
        
        // 同境界内升级不需要判定成功率，直接升级
        this.player.realmIndex++;
        this.player.realm = GAME_DATA.REALMS[this.player.realmIndex];
        this.player.level++;
        
        // 升级后保留溢出的修为
        this.player.cultivation -= nextRealm.cultivationNeeded;
        
        // 计算属性增长
        const levelUpBonus = {
            strength: Math.floor(Math.random() * 2) + 1,  // 1-2点力量
            vitality: Math.floor(Math.random() * 2) + 1,  // 1-2点体质
            intelligence: Math.floor(Math.random() * 2) + 1,  // 1-2点智力
            agility: Math.floor(Math.random() * 2) + 1,  // 1-2点敏捷
            wisdom: Math.floor(Math.random() * 1) + 1  // 1点悟性
        };
        
        // 应用属性增长
        this.player.strength = (this.player.strength || 0) + levelUpBonus.strength;
        this.player.vitality = (this.player.vitality || 0) + levelUpBonus.vitality;
        this.player.intelligence = (this.player.intelligence || 0) + levelUpBonus.intelligence;
        this.player.agility = (this.player.agility || 0) + levelUpBonus.agility;
        this.player.wisdom = (this.player.wisdom || 0) + levelUpBonus.wisdom;
        
        // 计算属性增量，保留额外属性
        const prevRealm = GAME_DATA.REALMS[this.player.realmIndex - 1];
        const hpIncrement = this.player.realm.hp - (prevRealm ? prevRealm.hp : 0);
        const mpIncrement = this.player.realm.mp - (prevRealm ? prevRealm.mp : 0);
        const attackIncrement = this.player.realm.attack - (prevRealm ? prevRealm.attack : 0);
        const defenseIncrement = this.player.realm.defense - (prevRealm ? prevRealm.defense : 0);
        
        // 应用属性增量
        this.player.maxHp += hpIncrement;
        this.player.maxMp += mpIncrement;
        this.player.attack += attackIncrement;
        this.player.defense += defenseIncrement;
        
        // 恢复满状态
        this.player.hp = this.player.maxHp;
        this.player.mp = this.player.maxMp;
        
        this.log('系统', `恭喜升级！境界提升至${this.player.realm.name}！`, 'success');
        this.log('系统', `升级获得属性：力量+${levelUpBonus.strength}，体质+${levelUpBonus.vitality}，智力+${levelUpBonus.intelligence}，敏捷+${levelUpBonus.agility}，悟性+${levelUpBonus.wisdom}`, 'success');
        
        if (this.player.realm.features && this.player.realm.features.length > 0) {
            this.log('系统', `解锁新功能：${this.player.realm.features.join('、')}`, 'info');
        }
    }
    
    canBreakthrough() {
        const currentRealm = GAME_DATA.REALMS[this.player.realmIndex];
        const nextRealm = GAME_DATA.REALMS[this.player.realmIndex + 1];
        
        if (!currentRealm || !nextRealm) return false;
        
        const currentName = currentRealm.name;
        if (!currentName.includes('10层')) return false;
        
        if (this.player.cultivation < nextRealm.cultivationNeeded) return false;
        
        // 提取当前境界类型（如从"炼气期前期10层"提取"炼气"）
        const currentRealmTypeMatch = currentName.match(/(炼气|筑基|金丹|元婴|化神)/);
        if (!currentRealmTypeMatch) return false;
        
        const currentRealmType = currentRealmTypeMatch[0];
        
        // 提取下一境界类型
        const nextRealmTypeMatch = nextRealm.name.match(/(炼气|筑基|金丹|元婴|化神)/);
        if (!nextRealmTypeMatch) return false;
        
        const nextRealmType = nextRealmTypeMatch[0];
        
        // 只有当境界类型发生变化时（如从炼气到筑基）才需要突破
        if (currentRealmType !== nextRealmType) {
            const breakthroughMap = {
                '炼气': ['筑基丹'],
                '筑基': ['金丹突破丹'],
                '金丹': ['元婴突破丹'],
                '元婴': ['化神突破丹'],
                '化神': ['渡劫突破丹']
            };
            
            const neededItems = breakthroughMap[currentRealmType];
            if (!neededItems || !this.player.inventory) return false;
            
            return neededItems.some(item => this.player.inventory[item] && this.player.inventory[item] > 0);
        }
        
        // 同一境界内的升级不需要突破
        return false;
    }
    
    attemptBreakthrough() {
        if (!this.canBreakthrough()) {
            this.log('系统', '还不能突破！请确保境界达到10层、修为足够且有对应的突破丹！', 'warning');
            return;
        }
        
        const currentRealm = GAME_DATA.REALMS[this.player.realmIndex];
        const currentName = currentRealm.name;
        const nextRealm = GAME_DATA.REALMS[this.player.realmIndex + 1];
        
        // 提取当前境界类型（如从"炼气期前期10层"提取"炼气"）
        const currentRealmTypeMatch = currentName.match(/(炼气|筑基|金丹|元婴|化神)/);
        if (!currentRealmTypeMatch) {
            this.log('系统', '突破失败：无法识别境界类型！', 'error');
            return;
        }
        
        const currentRealmType = currentRealmTypeMatch[0];
        
        // 提取下一境界类型
        const nextRealmTypeMatch = nextRealm.name.match(/(炼气|筑基|金丹|元婴|化神)/);
        if (!nextRealmTypeMatch) {
            this.log('系统', '突破失败：无法识别下一境界类型！', 'error');
            return;
        }
        
        const nextRealmType = nextRealmTypeMatch[0];
        
        // 只有当境界类型发生变化时（如从炼气到筑基）才需要消耗突破丹
        if (currentRealmType !== nextRealmType) {
            const breakthroughMap = {
                '炼气': ['筑基丹'],
                '筑基': ['金丹突破丹'],
                '金丹': ['元婴突破丹'],
                '元婴': ['化神突破丹'],
                '化神': ['渡劫突破丹']
            };
            
            const neededItems = breakthroughMap[currentRealmType];
            if (!neededItems || !this.player.inventory) {
                this.log('系统', '突破失败：缺少突破丹！', 'error');
                return;
            }
            
            let usedItem = null;
            for (const item of neededItems) {
                if (this.player.inventory[item] && this.player.inventory[item] > 0) {
                    usedItem = item;
                    break;
                }
            }
            
            if (!usedItem) {
                this.log('系统', '突破失败：缺少突破丹！', 'error');
                return;
            }
            
            this.player.inventory[usedItem]--;
            if (this.player.inventory[usedItem] <= 0) {
                delete this.player.inventory[usedItem];
            }
            
            this.log('系统', `使用了${usedItem}！`, 'info');
        }
        
        // 同一境界内的突破不需要消耗突破丹
        
        // 同一境界内的突破（如炼气前期到中期）成功率100%
        if (currentRealmType === nextRealmType) {
            this.log('系统', '同一境界内突破，成功率100%！', 'info');
            
            this.player.realmIndex++;
            this.player.realm = GAME_DATA.REALMS[this.player.realmIndex];
            
            // 同一境界内的突破不需要消耗突破丹
            this.log('系统', `恭喜！你突破到了${this.player.realm.name}！`, 'success');
            
            // 突破后修为从0开始
            this.player.cultivation = 0;
            
            // 计算属性增量
            const hpIncrement = this.player.realm.hp - currentRealm.hp;
            const mpIncrement = this.player.realm.mp - currentRealm.mp;
            const attackIncrement = this.player.realm.attack - currentRealm.attack;
            const defenseIncrement = this.player.realm.defense - currentRealm.defense;
            
            // 应用属性增量
            this.player.maxHp += hpIncrement;
            this.player.hp = this.player.maxHp;
            this.player.maxMp += mpIncrement;
            this.player.mp = this.player.maxMp;
            this.player.attack += attackIncrement;
            this.player.defense += defenseIncrement;
            
            // 解锁新功能
            if (this.player.realm.features && this.player.realm.features.length > 0) {
                this.log('系统', `解锁新功能：${this.player.realm.features.join('、')}`, 'info');
            }
            
            this.breakthroughModalShown = false;
            return;
        }
        
        // 不同境界之间的突破（如炼气到筑基）使用原有成功率
        const successRates = {
            '炼气': 1.0,
            '筑基': 0.9,
            '金丹': 0.8,
            '元婴': 0.7,
            '化神': 0.6
        };
        
        let successRate = successRates[currentRealmType] || 0.7;
        // 气运影响突破成功率
        const luckBonus = (this.player.luck || 0) * 0.01;
        successRate = Math.min(1.0, successRate + luckBonus);
        const difficulty = 10 - Math.floor(successRate * 10);
        this.log('系统', `突破成功率：${Math.floor(successRate * 100)}% (气运加成：+${Math.floor(luckBonus * 100)}%)`, 'info');
        
        if (Math.random() < successRate) {
            this.player.realmIndex++;
            this.player.realm = GAME_DATA.REALMS[this.player.realmIndex];
            this.player.level++;
            
            this.breakthroughModalShown = false;
            
            // 计算属性增量
            const hpIncrement = this.player.realm.hp - currentRealm.hp;
            const mpIncrement = this.player.realm.mp - currentRealm.mp;
            const attackIncrement = this.player.realm.attack - currentRealm.attack;
            const defenseIncrement = this.player.realm.defense - currentRealm.defense;
            
            // 应用属性增量
            this.player.maxHp += hpIncrement;
            this.player.maxMp += mpIncrement;
            this.player.attack += attackIncrement;
            this.player.defense += defenseIncrement;
            
            this.player.hp = this.player.maxHp;
            this.player.mp = this.player.maxMp;
            
            this.log('系统', `恭喜成功突破！境界提升至${this.player.realm.name}！`, 'success');
            
            // 突破后修为从0开始
            this.player.cultivation = 0;
            
            this.tryLearnExclusiveSkill('breakthrough');
            
            if (this.player.realm.features && this.player.realm.features.length > 0) {
                this.log('系统', `解锁新功能：${this.player.realm.features.join('、')}`, 'info');
            }
        } else {
            this.log('系统', `突破失败！心魔劫难度：${difficulty}，下次再试！`, 'combat');
            this.player.cultivation = Math.floor(this.player.cultivation * 0.95);
        }
    }

    handleDeath() {
        this.log('系统', '你的生命走到了尽头...', 'combat');
        
        this.reincarnationCount++;
        
        this.inheritance.stats.bonus += 0.1;
        
        if (this.player.skills.length > 1) {
            const keepSkill = this.player.skills[Math.floor(Math.random() * (this.player.skills.length - 1)) + 1];
            if (!this.inheritance.skills.includes(keepSkill)) {
                this.inheritance.skills.push(keepSkill);
                this.log('轮回', `你记住了技能：${keepSkill}`, 'info');
            }
        }
        
        const inventoryItems = Object.keys(this.player.inventory);
        if (inventoryItems.length > 0) {
            const keepItem = inventoryItems[Math.floor(Math.random() * inventoryItems.length)];
            this.inheritance.items.push(keepItem);
            this.log('轮回', `你带走了：${keepItem}`, 'info');
        }
    }

    reincarnate() {
        this.player = null;
        this.currentMap = null;
        this.currentArea = null;
        this.log('系统', `轮回次数：${this.reincarnationCount}`, 'system');
        this.log('系统', `继承加成：+${Math.floor(this.inheritance.stats.bonus * 100)}%`, 'success');
    }

    rest() {
        const totalStats = this.getPlayerTotalStats();
        const hpRecover = Math.floor(totalStats.maxHp * 0.3);
        const mpRecover = Math.floor(totalStats.maxMp * 0.3);
        
        this.player.hp = Math.min(totalStats.maxHp, this.player.hp + hpRecover);
        this.player.mp = Math.min(totalStats.maxMp, this.player.mp + mpRecover);
        
        this.log('休息', `恢复了${hpRecover}点气血和${mpRecover}点灵力`, 'success');
    }
    
    // 好感度系统
    getNPCRelation(npcId) {
        if (!this.player.npcRelations[npcId]) {
            this.player.npcRelations[npcId] = {
                favor: 0,
                relation: 'stranger',
                lastInteract: null
            };
        }
        return this.player.npcRelations[npcId];
    }
    
    changeNPCFavor(npcId, amount) {
        const relation = this.getNPCRelation(npcId);
        relation.favor = Math.max(-100, Math.min(1000, relation.favor + amount));
        relation.lastInteract = Date.now();
        
        // 更新关系状态
        this.updateNPCRelationStatus(npcId);
        
        return relation.favor;
    }
    
    updateNPCRelationStatus(npcId) {
        const relation = this.getNPCRelation(npcId);
        const favor = relation.favor;
        
        if (favor >= 500) {
            relation.relation = 'intimate';
        } else if (favor >= 300) {
            relation.relation = 'close';
        } else if (favor >= 100) {
            relation.relation = 'friend';
        } else if (favor >= 0) {
            relation.relation = 'stranger';
        } else {
            relation.relation = 'hostile';
        }
    }
    
    getNPCFavor(npcId) {
        return this.getNPCRelation(npcId).favor;
    }
    
    getNPCRrelation(npcId) {
        return this.getNPCRelation(npcId).relation;
    }
    
    // NPC互动功能
    talkToInteractiveNPC(npcId) {
        const npc = GAME_DATA.NPCS[npcId];
        if (!npc || npc.type !== 'interactive') return { success: false, message: '无效的NPC' };
        
        // 检查是否已经与该NPC互动过
        const today = this.timeSystem.day;
        if (!this.player.npcInteractions) {
            this.player.npcInteractions = {};
        }
        if (!this.player.npcInteractions[npcId]) {
            this.player.npcInteractions[npcId] = {};
        }
        if (this.player.npcInteractions[npcId].talk === today) {
            return { success: false, message: '今天已经和这位NPC聊过了' };
        }
        
        const favor = this.changeNPCFavor(npcId, 5);
        const relation = this.getNPCRrelation(npcId);
        
        const dialogs = npc.dialogs || ['你好，有什么可以帮助你的吗？'];
        const dialog = dialogs[Math.floor(Math.random() * dialogs.length)];
        
        // 记录互动
        this.player.npcInteractions[npcId].talk = today;
        
        this.log(npc.name, dialog, 'info');
        
        return { success: true, message: dialog, favor, relation };
    }
    
    giftToNPC(npcId, itemName) {
        const npc = GAME_DATA.NPCS[npcId];
        if (!npc || npc.type !== 'interactive') return { success: false, message: '无效的NPC' };
        
        // 检查是否已经与该NPC互动过
        const today = this.timeSystem.day;
        if (!this.player.npcInteractions) {
            this.player.npcInteractions = {};
        }
        if (!this.player.npcInteractions[npcId]) {
            this.player.npcInteractions[npcId] = {};
        }
        if (this.player.npcInteractions[npcId].gift === today) {
            return { success: false, message: '今天已经给这位NPC送过礼物了' };
        }
        
        if (!this.hasItem(itemName)) return { success: false, message: '背包中没有该物品' };
        
        const item = GAME_DATA.ITEMS[itemName];
        const favorGain = item.value || 10;
        
        this.removeFromInventory(itemName);
        const favor = this.changeNPCFavor(npcId, favorGain);
        const relation = this.getNPCRrelation(npcId);
        
        // 记录互动
        this.player.npcInteractions[npcId].gift = today;
        
        this.log(npc.name, `谢谢你的礼物，我很喜欢！`, 'success');
        
        return { success: true, message: '送礼成功', favor, relation, favorGain };
    }
    
    sparWithNPC(npcId) {
        const npc = GAME_DATA.NPCS[npcId];
        if (!npc || npc.type !== 'interactive') return { success: false, message: '无效的NPC' };
        
        // 检查是否已经与该NPC互动过
        const today = this.timeSystem.day;
        if (!this.player.npcInteractions) {
            this.player.npcInteractions = {};
        }
        if (!this.player.npcInteractions[npcId]) {
            this.player.npcInteractions[npcId] = {};
        }
        if (this.player.npcInteractions[npcId].spar === today) {
            return { success: false, message: '今天已经与这位NPC切磋过了' };
        }
        
        const playerLevel = this.player.realm.level;
        const npcLevel = npc.level || playerLevel;
        
        const success = Math.random() < 0.5 + (playerLevel - npcLevel) * 0.1;
        
        if (success) {
            const cultivationGain = Math.floor(Math.random() * 20) + 10;
            this.player.cultivation += cultivationGain;
            this.justGainedCultivation = true;
            this.changeNPCFavor(npcId, 10);
            
            // 记录互动
            this.player.npcInteractions[npcId].spar = today;
            
            this.log('切磋', `你与${npc.name}切磋获胜，获得${cultivationGain}点修为！`, 'success');
            this.checkLevelUp();
            return { success: true, message: '切磋获胜', cultivationGain };
        } else {
            this.player.hp = Math.max(1, Math.floor(this.player.hp * 0.8));
            this.changeNPCFavor(npcId, -5);
            
            // 记录互动
            this.player.npcInteractions[npcId].spar = today;
            
            this.log('切磋', `你与${npc.name}切磋失败，气血减少！`, 'combat');
            return { success: false, message: '切磋失败' };
        }
    }
    
    stealFromNPC(npcId) {
        const npc = GAME_DATA.NPCS[npcId];
        if (!npc || npc.type !== 'interactive') return { success: false, message: '无效的NPC' };
        
        // 检查是否已经与该NPC互动过
        const today = this.timeSystem.day;
        if (!this.player.npcInteractions) {
            this.player.npcInteractions = {};
        }
        if (!this.player.npcInteractions[npcId]) {
            this.player.npcInteractions[npcId] = {};
        }
        if (this.player.npcInteractions[npcId].steal === today) {
            return { success: false, message: '今天已经从这位NPC那里偷过东西了' };
        }
        
        const luck = this.player.luck || 0;
        const success = Math.random() < 0.3 + luck * 0.01;
        
        if (success) {
            const items = ['银两', '草药', '回春丹', '聚灵散'];
            const item = items[Math.floor(Math.random() * items.length)];
            const quantity = Math.floor(Math.random() * 3) + 1;
            
            for (let i = 0; i < quantity; i++) {
                this.addToInventory(item);
            }
            
            this.changeNPCFavor(npcId, -20);
            
            // 记录互动
            this.player.npcInteractions[npcId].steal = today;
            
            this.log('偷窃', `你成功从${npc.name}那里偷到了${item} x${quantity}！`, 'combat');
            return { success: true, message: '偷窃成功', item, quantity };
        } else {
            this.changeNPCFavor(npcId, -30);
            this.player.hp = Math.max(1, Math.floor(this.player.hp * 0.7));
            
            // 记录互动
            this.player.npcInteractions[npcId].steal = today;
            
            this.log('偷窃', `你偷窃${npc.name}时被发现，受到了惩罚！`, 'combat');
            return { success: false, message: '偷窃失败' };
        }
    }
    
    attackNPC(npcId) {
        const npc = GAME_DATA.NPCS[npcId];
        if (!npc || npc.type !== 'interactive') return { success: false, message: '无效的NPC' };
        
        // 检查是否已经与该NPC互动过
        const today = this.timeSystem.day;
        if (!this.player.npcInteractions) {
            this.player.npcInteractions = {};
        }
        if (!this.player.npcInteractions[npcId]) {
            this.player.npcInteractions[npcId] = {};
        }
        if (this.player.npcInteractions[npcId].attack === today) {
            return { success: false, message: '今天已经攻击过这位NPC了' };
        }
        
        this.changeNPCFavor(npcId, -50);
        this.player.hp = Math.max(1, Math.floor(this.player.hp * 0.5));
        
        // 记录互动
        this.player.npcInteractions[npcId].attack = today;
        
        this.log('攻击', `你攻击了${npc.name}，你们成为了敌人！`, 'combat');
        return { success: true, message: '攻击成功' };
    }
    
    swornWithNPC(npcId) {
        const npc = GAME_DATA.NPCS[npcId];
        if (!npc || npc.type !== 'interactive') return { success: false, message: '无效的NPC' };
        
        const favor = this.getNPCFavor(npcId);
        if (favor < 300) return { success: false, message: '好感度不足，需要300点好感度' };
        
        if (!this.player.npcRelations[npcId]) {
            this.player.npcRelations[npcId] = { favor: 0, relation: 'stranger', lastInteract: null };
        }
        
        this.player.npcRelations[npcId].relation = 'intimate';
        this.changeNPCFavor(npcId, 100);
        
        this.log(npc.name, `我们结拜为异性兄弟/姐妹，从此有福同享，有难同当！`, 'success');
        return { success: true, message: '结拜成功' };
    }
    
    marryNPC(npcId) {
        const npc = GAME_DATA.NPCS[npcId];
        if (!npc || npc.type !== 'interactive') return { success: false, message: '无效的NPC' };
        
        const favor = this.getNPCFavor(npcId);
        if (favor < 500) return { success: false, message: '好感度不足，需要500点好感度' };
        
        if (!this.player.npcRelations[npcId]) {
            this.player.npcRelations[npcId] = { favor: 0, relation: 'stranger', lastInteract: null };
        }
        
        this.player.npcRelations[npcId].relation = 'intimate';
        this.player.npcRelations[npcId].isSpouse = true;
        this.changeNPCFavor(npcId, 200);
        
        this.log(npc.name, `我们结为道侣，从此相伴一生！`, 'success');
        return { success: true, message: '结为道侣成功' };
    }
    
    getNPCTasks(npcId) {
        const npc = GAME_DATA.NPCS[npcId];
        if (!npc || npc.type !== 'interactive' || !npc.tasks) return { success: false, message: '该NPC没有任务' };
        
        return { success: true, tasks: npc.tasks };
    }
    
    getNPCShop(npcId) {
        const npc = GAME_DATA.NPCS[npcId];
        if (!npc || npc.type !== 'interactive' || !npc.shop) return { success: false, message: '该NPC没有商店' };
        
        return { success: true, shop: npc.shop };
    }

    eat() {
        const totalStats = this.getPlayerTotalStats();
        this.player.hp = Math.min(totalStats.maxHp, this.player.hp + 30);
        this.log('吃饭', '吃了一顿美味，恢复了30点气血', 'success');
    }

    sleep() {
        const totalStats = this.getPlayerTotalStats();
        this.player.hp = totalStats.maxHp;
        this.player.mp = totalStats.maxMp;
        this.log('睡觉', '美美地睡了一觉，完全恢复了！', 'success');
    }

    cultivate() {
        const baseCultivation = 10;
        const lingenBonus = this.player.lingen.bonus;
        const wisdomBonus = this.player.wisdom / 10;
        const cultivationGain = Math.floor(baseCultivation * lingenBonus * wisdomBonus);
        
        const currentRealm = GAME_DATA.REALMS[this.player.realmIndex];
        const nextRealm = GAME_DATA.REALMS[this.player.realmIndex + 1];
        
        // 提取当前境界类型（如从"炼气期前期10层"提取"炼气"）
        const currentName = currentRealm.name;
        const currentRealmTypeMatch = currentName.match(/(炼气|筑基|金丹|元婴|化神)/);
        const currentRealmType = currentRealmTypeMatch ? currentRealmTypeMatch[0] : '';
        
        // 只有当境界类型发生变化时（如从炼气到筑基）才需要突破
        let isBreakthroughNeeded = false;
        if (currentName.includes('10层') && nextRealm) {
            const nextName = nextRealm.name;
            const nextRealmTypeMatch = nextName.match(/(炼气|筑基|金丹|元婴|化神)/);
            const nextRealmType = nextRealmTypeMatch ? nextRealmTypeMatch[0] : '';
            isBreakthroughNeeded = currentRealmType !== nextRealmType;
        }
        
        // 先增加修为
        this.player.cultivation += cultivationGain;
        this.justGainedCultivation = true;
        this.log('修炼', `闭关修炼，获得${cultivationGain}点修为`, 'success');
        this.breakthroughModalShown = false;
        
        // 检查是否可以升级
        if (!isBreakthroughNeeded) {
            this.checkLevelUp();
        } else {
            // 检查是否需要突破
            if (nextRealm && this.player.cultivation >= nextRealm.cultivationNeeded) {
                this.log('修炼', '你的修为已满！需要突破才能继续提升！', 'warning');
                if (!this.breakthroughModalShown) {
                    this.breakthroughModalShown = true;
                    ui.showBreakthroughPopup();
                }
            }
        }
        
        if (Math.random() < 0.05) {
            this.tryLearnExclusiveSkill('cultivate');
        }
    }
    
    forceLevelUp() {
        // 强制升级（用于修复数据问题）
        const nextRealm = GAME_DATA.REALMS[this.player.realmIndex + 1];
        if (!nextRealm) return;
        
        this.player.realmIndex++;
        this.player.realm = GAME_DATA.REALMS[this.player.realmIndex];
        this.player.level++;
        
        this.log('系统', `恭喜！你突破到了${this.player.realm.name}！`, 'success');
        
        // 计算属性增长
        const levelUpBonus = {
            strength: Math.floor(Math.random() * 2) + 1,
            vitality: Math.floor(Math.random() * 2) + 1,
            intelligence: Math.floor(Math.random() * 2) + 1,
            agility: Math.floor(Math.random() * 2) + 1,
            wisdom: Math.floor(Math.random() * 1) + 1
        };
        
        this.player.strength += levelUpBonus.strength;
        this.player.vitality += levelUpBonus.vitality;
        this.player.intelligence += levelUpBonus.intelligence;
        this.player.agility += levelUpBonus.agility;
        this.player.wisdom += levelUpBonus.wisdom;
        
        this.log('系统', `属性提升：力量+${levelUpBonus.strength} 体质+${levelUpBonus.vitality} 智力+${levelUpBonus.intelligence} 敏捷+${levelUpBonus.agility} 悟性+${levelUpBonus.wisdom}`, 'success');
        
        // 恢复满状态
        const stats = this.getEffectiveStats();
        this.player.hp = stats.maxHp;
        this.player.mp = stats.maxMp;
        
        ui.updateAll();
    }
    
    showBreakthroughPopup() {
    }
    
    tryLearnExclusiveSkill(source) {
        if (!this.player || !this.player.lingen) return;
        
        const playerRootName = this.player.lingen.name;
        const exclusiveRoots = ['混沌灵根', '先天百草灵根', '先天雷灵根', '先天冰灵根', '先天空间灵根', '先天金石灵根', '先天剑骨'];
        
        if (!exclusiveRoots.includes(playerRootName)) return;
        
        const currentRealm = this.player.realm.name;
        const realmMap = {
            '炼气期': ['炼气期'],
            '筑基期': ['炼气期', '筑基期'],
            '金丹期': ['炼气期', '筑基期', '金丹期'],
            '元婴期': ['炼气期', '筑基期', '金丹期', '元婴期']
        };
        
        const availableRealms = realmMap[currentRealm] || ['炼气期'];
        
        const availableSkills = [];
        Object.entries(GAME_DATA.SKILLS).forEach(([skillId, skill]) => {
            if (!skill.exclusiveRoot || skill.exclusiveRoot !== playerRootName) return;
            if (!availableRealms.includes(skill.requiredRealm)) return;
            if (this.player.skills && this.player.skills.includes(skillId)) return;
            availableSkills.push(skillId);
        });
        
        if (availableSkills.length === 0) return;
        
        const chance = source === 'breakthrough' ? 1.0 : (source === 'boss' ? 0.5 : 0.1);
        if (Math.random() >= chance) return;
        
        const learnedSkill = availableSkills[Math.floor(Math.random() * availableSkills.length)];
        const skillData = GAME_DATA.SKILLS[learnedSkill];
        
        if (!this.player.skills) {
            this.player.skills = [];
        }
        this.player.skills.push(learnedSkill);
        
        const sourceText = {
            'breakthrough': '境界突破',
            'cultivate': '修炼感悟',
            'battle': '战斗领悟',
            'boss': '击杀BOSS'
        };
        
        this.log('领悟', `【${sourceText[source] || '机缘巧合'}】领悟了变异灵根专属技能：${skillData.name}！`, 'success');
    }

    gather(gatherType) {
        const items = {
            'common-herb': ['草药', '草药', '灵草'],
            'stone': ['石头', '石头', '铁矿石'],
            'spirit-grass': ['灵草', '灵草', '灵芝'],
            'wood-fruit': ['木果', '木果', '千年木果'],
            'iron-ore': ['铁矿石', '铁矿石', '精铁矿'],
            'metal-stone': ['金属石', '金属石', '秘银矿'],
            'poison-herb': ['毒草', '毒草', '蛊草'],
            'centipede': ['蜈蚣', '毒蜈蚣', '千年蜈蚣'],
            'ancient-herb': ['古神草', '古神草', '太古神草'],
            'divine-stone': ['神石', '神石', '太古神石'],
            'pearl': ['珍珠', '珍珠', '夜明珠'],
            'sea-shell': ['贝壳', '贝壳', '彩贝壳'],
            'snow-lotus': ['雪莲', '雪莲', '千年雪莲'],
            'ice-crystal': ['冰晶', '冰晶', '千年冰晶'],
            'date-palm': ['椰枣', '椰枣', '千年椰枣'],
            'desert-herb': ['沙漠草药', '沙漠草药', '沙漠圣草'],
            'qingmu-herb': ['青木草', '青木草', '千年青木草'],
            'qingmu-spirit': ['青木灵', '青木灵', '千年青木灵'],
            'herb': ['草药', '草药', '灵草'],
            'huangtu-ore': ['星土矿', '星土矿', '千年星土矿'],
            'huangtu-crystal': ['星土晶', '星土晶', '千年星土晶'],
            'mine': ['矿石', '矿石', '精矿石'],
            'alchemy-common': ['灵草', '灵花', '灵果', '晶石'],
            'alchemy-century': ['百年灵草', '百年灵花', '灵果', '晶石'],
            'alchemy-millennium': ['千年灵草', '千年灵花', '灵果', '晶石'],
            'alchemy-ice': ['冰晶', '冰晶', '千年灵草', '千年灵花'],
            'alchemy-fire': ['火核', '火核', '千年灵草', '千年灵花'],
            'alchemy-thunder': ['雷晶', '雷晶', '万年灵草', '万年灵花'],
            'alchemy-star': ['星尘', '星尘', '万年灵草', '万年灵花']
        };
        
        const possibleItems = items[gatherType] || ['普通物品'];
        const item = possibleItems[Math.floor(Math.random() * possibleItems.length)];
        
        // 检查是否是炼丹材料
        if (GAME_DATA.ALCHEMY && GAME_DATA.ALCHEMY.MATERIALS && GAME_DATA.ALCHEMY.MATERIALS[item]) {
            // 是炼丹材料，添加到材料背包
            this.addMaterial(item);
        } else {
            // 普通物品，添加到普通背包
            this.addToInventory(item);
        }
        
        this.log('采集', `采集到了：${item}`, 'success');
    }

    checkRandomEvent() {
        // 气运影响奇遇触发概率
        const baseChance = 0.1;
        const luckBonus = (this.player.luck || 0) * 0.005;
        const totalChance = baseChance + luckBonus;
        
        if (Math.random() < totalChance) {
            const event = GAME_DATA.RANDOM_EVENTS[Math.floor(Math.random() * GAME_DATA.RANDOM_EVENTS.length)];
            if (event) {
                this.triggerEvent(event);
            }
        }
    }

    triggerEvent(event) {
        this.log('奇遇', event.description, 'system');
        
        if (event.type === 'combat') {
            setTimeout(() => this.startBattle(event.enemy), 1000);
        } else if (event.reward) {
            if (event.reward.type === 'item') {
                event.reward.items.forEach(item => this.addToInventory(item));
                this.log('奇遇', `获得物品：${event.reward.items.join('、')}`, 'success');
            } else if (event.reward.type === 'cultivation') {
                this.player.cultivation += event.reward.amount;
                this.justGainedCultivation = true;
                this.log('奇遇', `获得${event.reward.amount}点修为`, 'success');
                this.checkLevelUp();
            } else if (event.reward.type === 'stats') {
                this.player.maxHp += event.reward.hp || 0;
                this.player.maxMp += event.reward.mp || 0;
                this.player.hp += event.reward.hp || 0;
                this.player.mp += event.reward.mp || 0;
                this.log('奇遇', '属性提升了！', 'success');
            } else if (event.reward.type === 'luck') {
                this.player.luck = (this.player.luck || 0) + event.reward.amount;
                this.log('奇遇', `气运提升了${event.reward.amount}点！`, 'success');
            }
        }
    }

    log(type, message, category = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        this.messageLog.unshift({ type, message, category, timestamp });
        if (this.messageLog.length > 100) {
            this.messageLog.pop();
        }
    }

    saveGame() {
        if (!this.player) {
            return false;
        }

        const savePlayer = JSON.parse(JSON.stringify(this.player));
        if (savePlayer.sect && typeof savePlayer.sect === 'object' && savePlayer.sect.id) {
            savePlayer.sect = savePlayer.sect.id;
        }

        const saveData = {
            player: savePlayer,
            currentMapId: this.currentMap ? this.currentMap.id : null,
            currentAreaId: this.currentMap && this.currentArea 
                ? Object.keys(this.currentMap.areas).find(key => this.currentMap.areas[key] === this.currentArea) 
                : null,
            reincarnationCount: this.reincarnationCount,
            inheritance: this.inheritance,
            messageLog: this.messageLog,
            saveTime: new Date().toLocaleString()
        };

        try {
            localStorage.setItem('mortalImmortalSave', JSON.stringify(saveData));
            this.log('系统', '游戏已存档！', 'success');
            return true;
        } catch (error) {
            this.log('系统', '存档失败！', 'combat');
            console.error('Save error:', error);
            return false;
        }
    }

    loadGame() {
        try {
            const saveDataStr = localStorage.getItem('mortalImmortalSave');
            if (!saveDataStr) {
                return false;
            }

            const saveData = JSON.parse(saveDataStr);
            
            this.player = saveData.player;
            
            if (this.player) {
                if (this.player.cultivation === undefined || this.player.cultivation === null) {
                    this.player.cultivation = this.player.exp || 0;
                }
                if (typeof this.player.cultivation !== 'number' || isNaN(this.player.cultivation)) {
                    this.player.cultivation = 0;
                }
                if (!this.player.sanxiuActiveSkills) {
                    this.player.sanxiuActiveSkills = ['punch', 'heal'];
                }
                if (!this.player.sanxiuPassiveSkills) {
                    this.player.sanxiuPassiveSkills = ['basicBreathing'];
                }
                if (!this.player.bookBag) {
                    this.player.bookBag = [];
                }
                if (!this.player.learnedBooks) {
                    this.player.learnedBooks = [];
                }
                // 确保玩家有基础配方，合并并去重
                const baseRecipes = [
                    '下品回血丹',
                    '下品回蓝丹', 
                    '下品修炼丹',
                    '下品攻击丹',
                    '下品防御丹'
                ];
                if (!this.player.knownRecipes) {
                    this.player.knownRecipes = baseRecipes;
                } else {
                    // 合并基础配方，去重
                    for (const recipe of baseRecipes) {
                        if (!this.player.knownRecipes.includes(recipe)) {
                            this.player.knownRecipes.push(recipe);
                        }
                    }
                }
                if (!this.player.alchemyProficiency) {
                    this.player.alchemyProficiency = 0;
                }
                if (!this.player.materialInventory) {
                    this.player.materialInventory = {};
                }
                if (!this.player.equipment) {
                    this.player.equipment = {
                        weapon: null,
                        armor: null,
                        artifact: null,
                        magicWeapon: null
                    };
                }
                if (!this.player.quests) {
                    this.player.quests = [];
                }
                if (!this.player.completedQuests) {
                    this.player.completedQuests = [];
                }
                if (!this.player.contribution) {
                    this.player.contribution = 0;
                }
                if (!this.player.reputation) {
                    this.player.reputation = 0;
                }
                if (!this.player.bountyQuests) {
                    this.player.bountyQuests = [];
                }
                if (this.player.sect && typeof this.player.sect === 'string') {
                    const sect = GAME_DATA.SECTS.find(s => s.id === this.player.sect);
                    if (sect) {
                        this.player.sect = sect;
                    }
                }
                
                if (this.player.realmIndex !== undefined && this.player.realmIndex >= 0 && this.player.realmIndex < GAME_DATA.REALMS.length) {
                    this.player.realm = GAME_DATA.REALMS[this.player.realmIndex];
                    
                    const nextRealm = GAME_DATA.REALMS[this.player.realmIndex + 1];
                    if (nextRealm && nextRealm.cultivationNeeded !== Infinity && this.player.cultivation >= nextRealm.cultivationNeeded) {
                        this.player.cultivation = nextRealm.cultivationNeeded - 1;
                    }
                }
            }
            
            this.reincarnationCount = saveData.reincarnationCount;
            this.inheritance = saveData.inheritance;
            this.messageLog = saveData.messageLog || [];

            if (saveData.currentMapId && GAME_DATA.MAPS[saveData.currentMapId]) {
                this.currentMap = GAME_DATA.MAPS[saveData.currentMapId];
                if (saveData.currentAreaId && this.currentMap.areas[saveData.currentAreaId]) {
                    this.currentArea = this.currentMap.areas[saveData.currentAreaId];
                } else {
                    this.currentArea = this.currentMap.areas[Object.keys(this.currentMap.areas)[0]];
                }
            }

            this.log('系统', `读取存档成功！存档时间：${saveData.saveTime}`, 'success');
            return true;
        } catch (error) {
            this.log('系统', '读档失败！', 'combat');
            console.error('Load error:', error);
            return false;
        }
    }

    hasSaveGame() {
        return localStorage.getItem('mortalImmortalSave') !== null;
    }

    clearSave() {
        try {
            localStorage.removeItem('mortalImmortalSave');
            return true;
        } catch (error) {
            console.error('Clear save error:', error);
            return false;
        }
    }

    quitGame() {
        if (confirm('确定要退出游戏吗？可以先存档哦！')) {
            this.saveGame();
            this.player = null;
            this.currentMap = null;
            this.currentArea = null;
            this.messageLog = [];
            return true;
        }
        return false;
    }
    
    initCombat(monsterId, battleType = 'wild') {
        const monster = GAME_DATA.MONSTERS[monsterId];
        if (!monster) return false;
        
        const combatMonster = JSON.parse(JSON.stringify(monster));
        combatMonster.currentHp = combatMonster.hp;
        combatMonster.maxHp = combatMonster.hp;
        
        this.combat = {
            active: true,
            monster: combatMonster,
            battleType: battleType,
            battleInfo: GAME_DATA.COMBAT_SYSTEM.battleTypes[battleType],
            round: 1,
            logs: [],
            healingItemsUsed: 0,
            autoBattle: false,
            skillCooldowns: {}
        };
        
        this.inBattle = true;
        this.currentEnemies = [{
            ...combatMonster,
            uniqueId: monsterId,
            currentHp: combatMonster.hp
        }];
        this.currentEnemy = this.currentEnemies[0];
        
        this.log('战斗', `进入战斗！对手：${monster.name}`, 'combat');
        return true;
    }
    
    endCombat(victory) {
        if (!this.combat) return;
        
        const monster = this.combat.monster;
        const battleInfo = this.combat.battleInfo;
        
        const rewards = {
            gold: 0,
            items: [],
            cultivation: monster.exp || 0
        };
        
        if (victory) {
            this.log('战斗', `战斗胜利！击败了${monster.name}`, 'success');
            
            if (monster.gold) {
                this.player.gold += monster.gold;
                rewards.gold = monster.gold;
                this.log('战斗', `获得银两：${monster.gold}`, 'success');
            }
            
            if (monster.drop && monster.drop.length > 0) {
                const dropItem = monster.drop[Math.floor(Math.random() * monster.drop.length)];
                this.addToInventory(dropItem);
                rewards.items.push(dropItem);
                this.log('战斗', `获得物品：${dropItem}`, 'success');
            }
            
            if (monster.exp) {
                this.player.cultivation += monster.exp;
                this.justGainedCultivation = true;
                this.checkLevelUp();
                this.checkRealmBreakthrough();
            }
            
            const isBoss = monster.name.includes('王') || monster.name.includes('皇') || monster.name.includes('神') || monster.name.includes('魔');
            this.tryLearnExclusiveSkill(isBoss ? 'boss' : 'battle');
            
            ui.showBattleRewardModal(rewards);
        } else {
            if (battleInfo.noPenalty) {
                this.log('战斗', `战斗失败，无惩罚`, 'combat');
            } else {
                this.player.hp = Math.floor(this.player.maxHp * 0.5);
                this.player.mp = Math.floor(this.player.maxMp * 0.5);
                this.log('战斗', `战斗失败！气血、灵力各扣除50%`, 'combat');
            }
            
            if (battleInfo.resetOnFail) {
                this.log('战斗', '秘境已重置', 'info');
            }
            
            ui.hideModal('battle-modal');
        }
        
        this.combat = null;
        
        if (this.currentAdventure && this.currentAdventure.waitingForBattle) {
            if (victory) {
                this.completeAdventure();
            } else {
                this.log('奇遇', '奇遇战斗失败，错过了这次机缘。', 'combat');
                this.currentAdventure = null;
            }
        }
        
        // 检查是否处于守护任务中
        if (ui.guardMission && ui.guardMission.active) {
            if (!victory) {
                // 守护任务战斗失败，取消守护任务
                ui.game.log('系统', '守护任务失败！你在战斗中倒下了。', 'error');
                ui.cancelGuardMission();
            }
        }
    }
    
    checkAdventureTrigger(sceneType) {
        if (!this.player) return null;
        
        const playerRealmLevel = this.player.realm.level;
        const currentMapId = this.currentMap?.id;
        const sceneTrigger = GAME_DATA.ADVENTURE_SCENE_TRIGGER[sceneType];
        
        if (!sceneTrigger) return null;
        if (sceneTrigger.maps[0] !== 'all' && !sceneTrigger.maps.includes(currentMapId)) return null;
        
        const adventures = [];
        
        const lowTier = GAME_DATA.ADVENTURES.low;
        if (playerRealmLevel >= 1 && Math.random() * 100 < lowTier.chance) {
            const validEvents = lowTier.events.filter(event => 
                event.scenes.includes(sceneType) && 
                (!event.sects || !this.player.sect || event.sects.includes(this.player.sect.id))
            );
            if (validEvents.length > 0) {
                const event = validEvents[Math.floor(Math.random() * validEvents.length)];
                adventures.push({ ...event, tier: 'low' });
            }
        }
        
        const midTier = GAME_DATA.ADVENTURES.mid;
        if (playerRealmLevel >= 11 && Math.random() * 100 < midTier.chance) {
            const validEvents = midTier.events.filter(event => 
                event.scenes.includes(sceneType) && 
                (!event.sects || !this.player.sect || event.sects.includes(this.player.sect.id))
            );
            if (validEvents.length > 0) {
                const event = validEvents[Math.floor(Math.random() * validEvents.length)];
                adventures.push({ ...event, tier: 'mid' });
            }
        }
        
        const highTier = GAME_DATA.ADVENTURES.high;
        if (playerRealmLevel >= 14 && Math.random() * 100 < highTier.chance) {
            const validEvents = highTier.events.filter(event => 
                event.scenes.includes(sceneType) && 
                (!event.sects || !this.player.sect || event.sects.includes(this.player.sect.id))
            );
            if (validEvents.length > 0) {
                const event = validEvents[Math.floor(Math.random() * validEvents.length)];
                adventures.push({ ...event, tier: 'high' });
            }
        }
        
        const specialTier = GAME_DATA.ADVENTURES.special;
        if (Math.random() * 100 < specialTier.chance) {
            const validEvents = specialTier.events.filter(event => 
                event.scenes.includes(sceneType)
            );
            if (validEvents.length > 0) {
                const event = validEvents[Math.floor(Math.random() * validEvents.length)];
                adventures.push({ ...event, tier: 'special' });
            }
        }
        
        if (adventures.length > 0) {
            return adventures[Math.floor(Math.random() * adventures.length)];
        }
        
        return null;
    }
    
    triggerAdventure(adventure) {
        this.currentAdventure = adventure;
        this.log('奇遇', `触发奇遇【${adventure.name}】！`, 'success');
        return adventure;
    }
    
    acceptAdventure() {
        if (!this.currentAdventure) return;
        
        const adventure = this.currentAdventure;
        
        if (adventure.monster) {
            this.initCombat(adventure.monster, 'encounter');
            this.currentAdventure = { ...adventure, waitingForBattle: true };
            return { needCombat: true };
        } else {
            return { needCombat: false };
        }
    }
    
    rejectAdventure() {
        this.log('奇遇', '你拒绝了这次奇遇。', 'info');
        this.currentAdventure = null;
    }
    
    completeAdventure() {
        if (!this.currentAdventure) {
            console.log('completeAdventure 被调用，但没有 currentAdventure！');
            return;
        }
        
        console.log('=== completeAdventure 开始 ===');
        console.log('当前adventure:', this.currentAdventure);
        
        const rewards = this.currentAdventure.rewards;
        
        if (rewards) {
            console.log('开始处理奖励:', rewards);
            
            if (rewards.mana) {
                this.player.maxMp = this.player.maxMp + rewards.mana;
                this.player.mp = Math.min(this.player.mp + rewards.mana, this.player.maxMp);
                if (rewards.mana > 0) {
                    this.log('奇遇', '最大灵力: +' + rewards.mana, 'success');
                } else if (rewards.mana < 0) {
                    this.log('奇遇', '最大灵力: ' + rewards.mana, 'combat');
                }
                console.log('最大灵力现在:', this.player.maxMp, '当前灵力:', this.player.mp);
            }
            
            if (rewards.hp) {
                this.player.maxHp = this.player.maxHp + rewards.hp;
                this.player.hp = Math.min(this.player.hp + rewards.hp, this.player.maxHp);
                this.log('奇遇', '最大气血: +' + rewards.hp, 'success');
                console.log('最大气血现在:', this.player.maxHp, '当前气血:', this.player.hp);
            }
            
            if (rewards.gold) {
                this.player.gold = this.player.gold + rewards.gold;
                this.log('奇遇', '获得银两: +' + rewards.gold, 'success');
                console.log('银两现在:', this.player.gold);
            }
            
            if (rewards.items && Array.isArray(rewards.items)) {
                for (let i = 0; i < rewards.items.length; i++) {
                    const item = rewards.items[i];
                    this.addToInventory(item);
                    this.log('奇遇', '获得物品: ' + item, 'success');
                }
            }
        } else {
            console.log('没有奖励！');
        }
        
        this.log('奇遇', '奇遇【' + this.currentAdventure.name + '】完成！', 'success');
        this.currentAdventure = null;
        console.log('=== completeAdventure 结束 ===');
    }
    
    getPlayerTotalStats() {
        const effectiveStats = this.getEffectiveStats();
        let defenseBonus = 0;
        
        if (this.player.battleBuffs) {
            this.player.battleBuffs.forEach(buff => {
                if (buff.defenseBonus) {
                    defenseBonus += buff.defenseBonus;
                }
            });
        }
        
        return {
            attack: effectiveStats.attack,
            defense: Math.floor(effectiveStats.defense + defenseBonus),
            maxHp: effectiveStats.maxHp,
            maxMp: effectiveStats.maxMp,
            critRate: effectiveStats.critRate,
            critDmg: effectiveStats.critDmg,
            dodge: effectiveStats.dodge,
            hit: effectiveStats.hit,
            magicDamage: effectiveStats.magicDamage,
            mpRegen: effectiveStats.mpRegen,
            dotReduce: effectiveStats.dotReduce
        };
    }

    calculateDamage(attacker, defender, skill = null) {
        let attackerAttack, defenderDefense;
        
        if (attacker === this.player) {
            const stats = this.getPlayerTotalStats();
            attackerAttack = stats.attack;
        } else {
            attackerAttack = attacker.attack;
        }
        
        if (defender === this.player) {
            const stats = this.getPlayerTotalStats();
            defenderDefense = stats.defense;
        } else {
            defenderDefense = defender.defense;
        }
        
        let damage;
        
        if (skill && skill.damage) {
            damage = (attackerAttack + skill.damage) - (defenderDefense * 0.5);
        } else {
            damage = attackerAttack - (defenderDefense * 0.5);
        }
        
        return Math.max(Math.floor(damage), GAME_DATA.COMBAT_SYSTEM.rules.baseDamage);
    }
    
    playerUseSkill(skillId) {
        if (!this.combat || !this.combat.active) return;
        
        const skill = this.getSkillById(skillId);
        if (!skill) {
            this.log('战斗', '技能不存在！', 'combat');
            return;
        }
        
        if (this.combat.skillCooldowns[skillId] && this.combat.skillCooldowns[skillId] > 0) {
            this.log('战斗', `${skill.name} 还在冷却中！`, 'combat');
            return;
        }
        
        if (this.player.mp < skill.manaCost) {
            this.log('战斗', '灵力不足！', 'combat');
            return;
        }
        
        this.player.mp -= skill.manaCost;
        if (skill.cooldown > 0) {
            this.combat.skillCooldowns[skillId] = skill.cooldown;
        }
        
        const monster = this.combat.monster;
        
        if (skill.type === 'attack') {
            const damage = this.calculateDamage(this.player, monster, skill);
            monster.currentHp -= damage;
            this.log('战斗', `你使用 ${skill.name}，造成 ${damage} 点伤害！`, 'combat');
        } else if (skill.type === 'heal') {
            const heal = skill.heal || 20;
            this.player.hp = Math.min(this.player.hp + heal, this.player.maxHp);
            this.log('战斗', `你使用 ${skill.name}，恢复 ${heal} 点气血！`, 'combat');
        } else if (skill.type === 'defense') {
            const defBonus = skill.defenseBonus || 10;
            if (!this.combat.tempDefense) this.combat.tempDefense = 0;
            this.combat.tempDefense += defBonus;
            this.log('战斗', `你使用 ${skill.name}，防御提升 ${defBonus} 点！`, 'combat');
        } else if (skill.type === 'control') {
            const damage = skill.damage ? this.calculateDamage(this.player, monster, skill) : 0;
            if (damage > 0) {
                monster.currentHp -= damage;
                this.log('战斗', `你使用 ${skill.name}，造成 ${damage} 点伤害并控制了目标！`, 'combat');
            } else {
                this.log('战斗', `你使用 ${skill.name}，控制住了目标！`, 'combat');
            }
        }
        
        if (monster.currentHp <= 0) {
            this.endCombat(true);
            return;
        }
        
        this.monsterTurn();
    }
    
    monsterTurn() {
        if (!this.combat || !this.combat.active) return;
        
        const monster = this.combat.monster;
        
        Object.keys(this.combat.skillCooldowns).forEach(skillId => {
            if (this.combat.skillCooldowns[skillId] > 0) {
                this.combat.skillCooldowns[skillId]--;
            }
        });
        
        const playerStats = this.getPlayerTotalStats();
        const totalDefense = playerStats.defense + (this.combat.tempDefense || 0);
        const damage = Math.max(monster.attack - totalDefense, 1);
        this.player.hp -= damage;
        this.log('战斗', `${monster.name} 攻击你，造成 ${damage} 点伤害！`, 'combat');
        
        if (this.combat.tempDefense) {
            this.combat.tempDefense = 0;
        }
        
        this.combat.round++;
        
        if (this.player.hp <= 0) {
            this.endCombat(false);
            return;
        }
    }
    
    getSkillById(skillId) {
        const skill = GAME_DATA.SKILLS[skillId];
        if (skill) {
            return {
                id: skillId,
                ...skill,
                manaCost: skill.mpCost || 0,
                cooldown: 0
            };
        }
        return null;
    }
    
    getAvailableSkills(combatOnly = false) {
        console.log('=== getAvailableSkills 开始 ===');
        console.log('this.player:', this.player);
        console.log('this.player.skills:', this.player.skills);
        
        const skills = [];
        
        if (this.player.skills) {
            this.player.skills.forEach(skillName => {
                console.log('检查技能:', skillName);
                const skill = GAME_DATA.SKILLS[skillName];
                console.log('GAME_DATA.SKILLS[skillName]:', skill);
                if (skill) {
                    if (combatOnly) {
                        if (skill.type === 'attack' || skill.type === 'heal' || skill.type === 'defense' || skill.type === 'control' || skill.type === 'area') {
                            skills.push({
                                id: skillName,
                                ...skill,
                                manaCost: skill.mpCost || 0,
                                cooldown: 0
                            });
                            console.log('成功添加战斗技能:', skillName);
                        }
                    } else {
                        skills.push({
                            id: skillName,
                            ...skill,
                            manaCost: skill.mpCost || 0,
                            cooldown: 0
                        });
                        console.log('成功添加技能:', skillName);
                    }
                }
            });
        }
        
        if (this.player.sanxiuActiveSkills) {
            this.player.sanxiuActiveSkills.forEach(skillName => {
                console.log('检查散修技能:', skillName);
                const skill = GAME_DATA.SANXIU_ACTIVE_SKILLS[skillName];
                console.log('GAME_DATA.SANXIU_ACTIVE_SKILLS[skillName]:', skill);
                if (skill) {
                    if (combatOnly) {
                        if (skill.id !== 'heal' && (skill.type === 'attack' || skill.type === 'heal' || skill.type === 'defense' || skill.type === 'control' || skill.type === 'aoe')) {
                            skills.push({
                                id: skillName,
                                ...skill,
                                manaCost: skill.mpCost || 0,
                                cooldown: 0,
                                isSanxiu: true
                            });
                            console.log('成功添加散修战斗技能:', skillName);
                        }
                    } else {
                        skills.push({
                            id: skillName,
                            ...skill,
                            manaCost: skill.mpCost || 0,
                            cooldown: 0,
                            isSanxiu: true
                        });
                        console.log('成功添加散修技能:', skillName);
                    }
                }
            });
        }
        
        console.log('最终返回的skills:', skills);
        console.log('=== getAvailableSkills 结束 ===');
        
        return skills;
    }
    
    useHealingItem(itemName) {
        if (!this.combat || !this.combat.active) return;
        
        if (this.combat.healingItemsUsed >= GAME_DATA.COMBAT_SYSTEM.rules.maxHealingItems) {
            this.log('战斗', `已使用最多 ${GAME_DATA.COMBAT_SYSTEM.rules.maxHealingItems} 个补给品！`, 'combat');
            return;
        }
        
        if (!this.hasItem(itemName)) {
            this.log('战斗', '背包中没有该物品！', 'combat');
            return;
        }
        
        const totalStats = this.getPlayerTotalStats();
        
        if (itemName === '回春丹') {
            const heal = 50;
            this.player.hp = Math.min(this.player.hp + heal, totalStats.maxHp);
            this.log('战斗', `使用回春丹，恢复 ${heal} 点气血！`, 'combat');
        } else if (itemName === '聚灵散') {
            const mana = 30;
            this.player.mp = Math.min(this.player.mp + mana, totalStats.maxMp);
            this.log('战斗', `使用聚灵散，恢复 ${mana} 点灵力！`, 'combat');
        }
        
        this.removeFromInventory(itemName);
        this.combat.healingItemsUsed++;
    }
    
    useConsumableItem(itemName) {
        if (!this.hasItem(itemName)) {
            this.log('系统', '背包中没有该物品！', 'warning');
            return;
        }
        
        const item = GAME_DATA.ITEMS[itemName];
        if (!item || item.type !== 'consumable') {
            this.log('系统', '该物品无法使用！', 'warning');
            return;
        }
        
        if (item.effect && item.effect.breakthrough) {
            if (this.canBreakthrough()) {
                this.attemptBreakthrough();
            } else {
                this.log('系统', '现在不需要使用突破丹！请确保境界达到10层、修为足够！', 'warning');
            }
            return;
        }
        
        const totalStats = this.getPlayerTotalStats();
        
        if (item.effect) {
            if (item.effect.hp) {
                this.player.hp = Math.min(this.player.hp + item.effect.hp, totalStats.maxHp);
                this.log('系统', `使用${itemName}，恢复${item.effect.hp}点气血！`, 'success');
            }
            if (item.effect.mp) {
                this.player.mp = Math.min(this.player.mp + item.effect.mp, totalStats.maxMp);
                this.log('系统', `使用${itemName}，恢复${item.effect.mp}点灵力！`, 'success');
            }
            if (item.effect.cultivation) {
                let remainingCultivation = item.effect.cultivation;
                let totalGained = 0;
                let loopCount = 0;
                const maxLoops = 100; // 防止死循环
                
                while (remainingCultivation > 0 && loopCount < maxLoops) {
                    loopCount++;
                    
                    const currentRealm = GAME_DATA.REALMS[this.player.realmIndex];
                    const nextRealm = GAME_DATA.REALMS[this.player.realmIndex + 1];
                    
                    if (!nextRealm) {
                        this.player.cultivation += remainingCultivation;
                        totalGained += remainingCultivation;
                        break;
                    }
                    
                    // 检查是否需要大境界突破
                    const currentName = currentRealm.name;
                    const isAt10Layers = currentName.includes('10层');
                    
                    if (isAt10Layers) {
                        // 达到10层，需要突破，停止添加修为
                        this.log('系统', `修为已达到${currentName}上限，请先突破！`, 'warning');
                        break;
                    }
                    
                    const needed = nextRealm.cultivationNeeded - this.player.cultivation;
                    if (needed <= 0) {
                        this.checkLevelUp();
                        continue;
                    }
                    
                    if (remainingCultivation >= needed) {
                        this.player.cultivation = nextRealm.cultivationNeeded;
                        totalGained += needed;
                        remainingCultivation -= needed;
                        this.checkLevelUp();
                    } else {
                        this.player.cultivation += remainingCultivation;
                        totalGained += remainingCultivation;
                        remainingCultivation = 0;
                    }
                }
                
                if (loopCount >= maxLoops) {
                    this.log('系统', '修为添加异常，请联系管理员！', 'error');
                }
                
                if (totalGained > 0) {
                    this.log('系统', `使用${itemName}，获得${totalGained}点修为！`, 'success');
                }
                this.checkRealmBreakthrough();
            }
        }
        
        this.removeFromInventory(itemName);
    }
    
    checkRealmBreakthrough() {
        const currentRealm = GAME_DATA.REALMS[this.player.realmIndex];
        const nextRealm = GAME_DATA.REALMS[this.player.realmIndex + 1];
        if (!nextRealm) return;
        
        const currentName = currentRealm.name;
        const isAt10Layers = currentName.includes('10层');
        const hasEnoughCultivation = nextRealm.cultivationNeeded !== Infinity && this.player.cultivation >= nextRealm.cultivationNeeded;
        
        if (isAt10Layers && hasEnoughCultivation && !this.breakthroughModalShown) {
            this.breakthroughModalShown = true;
            ui.showBreakthroughPopup();
        }
    }
    
    escapeBattle() {
        if (!this.combat || !this.combat.active) return false;
        
        if (!this.combat.battleInfo.canEscape) {
            this.log('战斗', '无法逃离此战斗！', 'combat');
            return false;
        }
        
        if (Math.random() > 0.5) {
            this.log('战斗', '成功逃离战斗！', 'info');
            this.combat = null;
            return true;
        } else {
            this.log('战斗', '逃离失败！', 'combat');
            this.monsterTurn();
            return false;
        }
    }
    
    roll(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    generateMagicWeapon(template) {
        let main = {
            type: template.mainAttr.type,
            value: this.roll(template.mainAttr.min, template.mainAttr.max)
        };

        let randomAttrs = [];
        let pool = [...template.randomAttrPool];

        // 添加新属性到随机属性池
        const newAttributes = ['力量', '体质', '智力', '敏捷'];
        newAttributes.forEach(attr => {
            if (!pool.includes(attr)) {
                pool.push(attr);
            }
        });

        for (let i = 0; i < template.randomAttrCount; i++) {
            if (pool.length === 0) break;
            let idx = Math.floor(Math.random() * pool.length);
            let type = pool.splice(idx, 1)[0];

            let value;
            switch (type) {
                case '攻击': value = this.roll(5, 25); break;
                case '防御': value = this.roll(5, 25); break;
                case '气血上限': value = this.roll(50, 200); break;
                case '暴击率': value = this.roll(1, 5); break;
                case '暴击伤害': value = this.roll(5, 15); break;
                case '破甲': value = this.roll(2, 8); break;
                case '吸血': value = this.roll(1, 5); break;
                case '闪避': value = this.roll(1, 4); break;
                case '移速': value = this.roll(3, 10); break;
                case '伤害减免': value = this.roll(2, 6); break;
                case '力量': value = this.roll(1, 5); break;
                case '体质': value = this.roll(1, 5); break;
                case '智力': value = this.roll(1, 5); break;
                case '敏捷': value = this.roll(1, 5); break;
                case '金系伤害':
                case '木系伤害':
                case '水系伤害':
                case '火系伤害':
                case '土系伤害':
                case '风系伤害':
                case '雷系伤害':
                case '冰系伤害':
                case '剑系伤害':
                case '血系伤害':
                    value = this.roll(3, 12);
                    break;
                default: value = this.roll(1, 5); break;
            }

            randomAttrs.push({ type, value });
        }

        return {
            name: template.name,
            quality: template.quality,
            mainAttr: main,
            randomAttrs: randomAttrs,
            skillDesc: template.skillDesc,
            source: template.source
        };
    }
    
    getRandomMagicWeapon() {
        const templates = GAME_DATA.MAGIC_WEAPONS.magicWeapons;
        if (!templates || templates.length === 0) return null;
        
        const template = templates[Math.floor(Math.random() * templates.length)];
        return this.generateMagicWeapon(template);
    }
    
    enterDungeon(dgId) {
        const dg = GAME_DATA.DUNGEONS.find(d => d.id === dgId);
        if (!dg) {
            this.log('秘境', '秘境不存在', 'combat');
            return false;
        }
        
        const playerRealm = this.player.realm.name;
        const getRealmTier = (name) => {
            if (name.includes('炼气')) return '炼气期';
            if (name.includes('筑基')) return '筑基期';
            if (name.includes('金丹')) return '金丹期';
            if (name.includes('元婴')) return '元婴期';
            if (name.includes('化神')) return '化神期';
            return '炼气期';
        };
        
        const realmOrder = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期'];
        const playerTier = getRealmTier(playerRealm);
        const playerIndex = realmOrder.indexOf(playerTier);
        const dungeonIndex = realmOrder.indexOf(dg.requireRealm);
        
        if (playerIndex < dungeonIndex) {
            this.log('秘境', `需要【${dg.requireRealm}】境界才能进入`, 'combat');
            return false;
        }
        
        this.inDungeon = true;
        this.currentDungeon = dg;
        this.dungeonWave = 0;
        this.dungeonStunRound = 0;
        this.dungeonDotDamage = 0;
        this.dungeonDotRound = 0;
        
        this.log('秘境', `进入秘境：${dg.name}`, 'success');
        this.loadDungeonWave(0);
        return true;
    }
    
    loadDungeonWave(waveIdx) {
        const dg = this.currentDungeon;
        const wave = dg.waves[waveIdx];
        let team = [];
        
        wave.forEach(cfg => {
            if (cfg.t === 'normal' || cfg.t === 'boss') {
                const m = GAME_DATA.DUNGEON_MONSTERS[cfg.id];
                if (m) {
                    const monsterHp = m.maxHp || m.hp || 1;
                    for (let i = 0; i < (cfg.num || 1); i++) {
                        team.push({
                            ...m,
                            uniqueId: `${cfg.id}_${i}`,
                            currentHp: monsterHp,
                            maxHp: monsterHp
                        });
                    }
                }
            }
            if (cfg.t === 'elite' && Math.random() < cfg.rate) {
                const e = GAME_DATA.DUNGEON_MONSTERS[cfg.id];
                if (e) {
                    const monsterHp = e.maxHp || e.hp || 1;
                    team.push({
                        ...e,
                        uniqueId: `${cfg.id}_elite`,
                        currentHp: monsterHp,
                        maxHp: monsterHp
                    });
                }
            }
        });
        
        this.currentEnemies = team;
        this.currentEnemy = team.length > 0 ? team[0] : null;
        
        if (team.length > 0) {
            this.inBattle = true;
            this.log('秘境', `第 ${waveIdx + 1} 波来袭！`, 'combat');
            if (ui) {
                ui.showBattle();
            }
        } else {
            // 如果没有敌人，记录日志并进入下一波
            this.log('秘境', `第 ${waveIdx + 1} 波无敌人，自动进入下一波！`, 'combat');
            // 延迟进入下一波，避免递归调用
            setTimeout(() => {
                this.dungeonWaveClear();
            }, 500);
        }
    }
    
    dungeonWaveClear() {
        const dg = this.currentDungeon;
        if (!dg) {
            this.log('秘境', '秘境数据错误！', 'warning');
            this.exitDungeon();
            return;
        }
        
        this.dungeonWave++;
        
        if (!dg.waves || this.dungeonWave >= dg.waves.length) {
            this.log('秘境', '🎉 秘境通关！', 'success');
            // 立即结束战斗状态，防止updateBattle方法显示空敌人列表
            this.inBattle = false;
            this.currentEnemy = null;
            this.currentEnemies = [];
            this.player.battleBuffs = [];
            this.statusEffects = { player: [], enemies: {} };
            // 隐藏战斗界面
            if (ui) {
                const battleScreen = document.getElementById('battle-screen');
                if (battleScreen) {
                    battleScreen.classList.add('hidden');
                }
            }
            this.giveDungeonRewards();
            // 不自动退出秘境，让用户手动关闭奖励界面后再退出
            // 奖励界面的关闭按钮会调用exitDungeon()
            return;
        }
        
        this.log('秘境', '一波清理完毕，进入下一波！', 'success');
        this.loadDungeonWave(this.dungeonWave);
    }
    
    giveDungeonRewards() {
        const dg = this.currentDungeon;
        if (!dg) {
            this.log('秘境', '秘境数据错误！', 'warning');
            this.exitDungeon();
            return;
        }
        
        try {
            // 更新探索秘境的悬赏任务进度
            if (this.player.bountyQuests && Array.isArray(this.player.bountyQuests)) {
                this.player.bountyQuests.forEach(quest => {
                    try {
                        if (!quest || quest.completed) return;
                        
                        // 检查是否是探索秘境类型的任务
                        // 匹配条件：任务目标包含"秘境"字样，或任务有指定dungeon字段
                        const dungeonNameWithoutDifficulty = dg.name.replace('（困难）', '');
                        const questDungeonName = quest.dungeon || '';
                        
                        this.log('系统', `检查悬赏任务【${quest.title}】，当前秘境：${dg.name}，任务目标：${quest.target}，任务秘境：${questDungeonName}`, 'info');
                        
                        // 检查是否匹配：任务目标包含"秘境" 或 任务有指定dungeon
                        const isDungeonQuest = (quest.target && quest.target.includes('秘境')) || questDungeonName;
                        
                        if (isDungeonQuest) {
                            // 检查秘境名称是否匹配（支持部分匹配）
                            let dungeonMatch = false;
                            if (questDungeonName) {
                                // 如果任务有指定dungeon，检查是否匹配
                                dungeonMatch = dungeonNameWithoutDifficulty.includes(questDungeonName) || 
                                              questDungeonName.includes(dungeonNameWithoutDifficulty) ||
                                              dungeonNameWithoutDifficulty === questDungeonName;
                            } else {
                                // 如果任务没有指定dungeon，只要目标包含"秘境"就匹配
                                dungeonMatch = true;
                            }
                            
                            if (dungeonMatch) {
                                quest.progress = (quest.progress || 0) + 1;
                                this.log('系统', `悬赏任务【${quest.title}】进度：${quest.progress}/${quest.targetCount}`, 'info');
                                
                                if (quest.progress >= quest.targetCount) {
                                    quest.completed = true;
                                    this.log('系统', `悬赏任务【${quest.title}】已完成！请前往悬赏令使处领取奖励！`, 'success');
                                }
                            }
                        }
                    } catch (e) {
                        console.error('更新悬赏任务进度出错:', e);
                    }
                });
            }
        } catch (e) {
            console.error('处理悬赏任务出错:', e);
        }
        
        // 收集奖励信息
        const rewards = {
            cultivation: 0,
            gold: 0,
            items: []
        };
        
        try {
            // 计算秘境修为奖励
            let totalCultivation = 0;
            if (this.currentEnemies && this.currentEnemies.length > 0) {
                this.currentEnemies.forEach(enemy => {
                    totalCultivation += enemy.cultivation || 0;
                });
            }
            
            // 应用修为加成
            totalCultivation *= (this.player.cultivationBonus || 1);
            
            // 翻倍秘境的修为奖励
            totalCultivation *= 2;
            
            rewards.cultivation = Math.floor(totalCultivation);
            
            // 给予修为奖励
            if (totalCultivation > 0) {
                this.player.cultivation += Math.floor(totalCultivation);
                this.justGainedCultivation = true;
                this.log('秘境', `获得 ${Math.floor(totalCultivation)} 点修为！`, 'success');
                this.checkLevelUp();
            }
        } catch (e) {
            console.error('处理修为奖励出错:', e);
        }
        
        try {
            // 根据秘境境界获取装备掉落
            const dungeonEquipDrops = this.getDungeonEquipmentDrops(dg);
            if (dungeonEquipDrops) {
                dungeonEquipDrops.forEach(drop => {
                    try {
                        this.addToInventory(drop);
                        rewards.items.push(drop);
                    } catch (e) {
                        console.error('添加装备掉落出错:', e);
                    }
                });
            }
        } catch (e) {
            console.error('处理装备掉落出错:', e);
        }
        
        try {
            // 处理秘境固定奖励
            if (dg.rewards && Array.isArray(dg.rewards)) {
                const isHardMode = dg.difficulty === 'hard';
                dg.rewards.forEach(item => {
                    try {
                        if (Math.random() < item.rate) {
                            if (item.bookId) {
                                const book = this.findBookById(item.bookId);
                                if (book) {
                                    this.player.bookBag.push(item.bookId);
                                    this.log('秘境', `获得功法：${book.name}`, 'success');
                                    rewards.items.push({ name: book.name, type: 'book' });
                                }
                            } else if (item.name) {
                                const num = Math.floor(Math.random() * (item.max - item.min + 1)) + item.min;
                                
                                if (item.name === '下品灵石' || item.name === '中品灵石' || item.name === '上品灵石') {
                                    // 灵石兑换银两
                                    let goldValue = 10; // 下品灵石默认10银两
                                    if (item.name === '中品灵石') goldValue = 100;
                                    if (item.name === '上品灵石') goldValue = 500;
                                    const totalGold = num * goldValue;
                                    this.player.gold += totalGold;
                                    this.log('秘境', `获得 ${item.name} ×${num}`, 'success');
                                    rewards.gold += totalGold;
                                } else if (item.name === '修为') {
                                    // 修为直接加到玩家修为，不添加到背包
                                    this.player.cultivation += num;
                                    this.log('秘境', `获得修为 +${num}`, 'success');
                                    rewards.cultivation = (rewards.cultivation || 0) + num;
                                } else if (item.name === '聚气丹') {
                                    // 聚气丹替换为下品修炼丹（我们炼丹系统已有）
                                    for (let i = 0; i < num; i++) {
                                        this.addToInventory('下品修炼丹');
                                    }
                                    this.log('秘境', `获得下品修炼丹 ×${num}`, 'success');
                                    rewards.items.push({ name: '下品修炼丹', quantity: num });
                                } else {
                                    // 普通物品和丹药都直接添加
                                    for (let i = 0; i < num; i++) {
                                        this.addToInventory(item.name);
                                    }
                                    this.log('秘境', `获得 ${item.name} ×${num}`, 'success');
                                    rewards.items.push({ name: item.name, quantity: num });
                                }
                            }
                        }
                    } catch (e) {
                        console.error('处理固定奖励出错:', e);
                    }
                });
            }
        } catch (e) {
            console.error('处理固定奖励出错:', e);
        }
        
        try {
            // 秘境掉落低阶炼丹配方
            if (GAME_DATA.ALCHEMY && GAME_DATA.ALCHEMY.RECIPES) {
                // 获取秘境的境界要求
                const requiredRealm = dg.requireRealm;
                const realmIndex = GAME_DATA.REALMS.findIndex(r => r.name === requiredRealm);
                
                // 收集符合秘境境界的低阶配方
                const availableRecipes = [];
                for (const [recipeName, recipe] of Object.entries(GAME_DATA.ALCHEMY.RECIPES)) {
                    const recipeRealmIndex = GAME_DATA.REALMS.findIndex(r => r.name === recipe.requiredRealm);
                    
                    // 只掉落炼气期、筑基期、金丹期的配方
                    if (recipeRealmIndex <= 2 && recipeRealmIndex <= realmIndex) {
                        // 检查玩家是否已经会这个配方
                        if (!this.player.knownRecipes || !this.player.knownRecipes.includes(recipeName)) {
                            availableRecipes.push({ name: recipeName, recipe: recipe });
                        }
                    }
                }
                
                // 有一定概率掉落配方
                const dropChance = dg.difficulty === 'hard' ? 0.4 : 0.2; // 困难模式40%概率，普通模式20%
                const randomValue = Math.random();
                
                if (availableRecipes.length > 0 && randomValue < dropChance) {
                    const randomRecipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
                    if (!this.player.knownRecipes) {
                        this.player.knownRecipes = [];
                    }
                    this.player.knownRecipes.push(randomRecipe.name);
                    this.log('秘境', `获得炼丹配方：${randomRecipe.name}！`, 'success');
                    rewards.items.push({ name: randomRecipe.name, type: 'recipe' });
                }
            }
        } catch (e) {
            console.error('处理炼丹配方掉落出错:', e);
        }
        
        try {
            // 显示奖励界面
            if (ui) {
                ui.showBattleRewardModal(rewards);
            } else {
                // 如果没有UI，直接退出秘境
                this.exitDungeon();
            }
        } catch (e) {
            console.error('显示奖励界面出错:', e);
            this.exitDungeon();
        }
    }
    
    // 获取秘境装备掉落
    getDungeonEquipmentDrops(dungeon) {
        try {
            if (!GAME_DATA.ITEM_DATABASE || !GAME_DATA.ITEM_DATABASE.GENERATORS) return null;
            
            const drops = [];
            const requireRealm = dungeon.requireRealm;
            const isHardMode = dungeon.difficulty === 'hard';
            
            // 根据原有逻辑确定可掉落的品质
            let allowedRarities = [];
            if (isHardMode) {
                // 困难模式秘境掉落紫色和橙色品质装备
                allowedRarities = ['epic', 'legendary', 'mythic'];
            } else {
                // 普通秘境掉落蓝色和紫色品质装备
                allowedRarities = ['rare', 'epic'];
            }
            
            // 掉落概率 - 困难模式更高
            const dropCount = isHardMode ? 3 : 2; // 困难模式掉落更多装备
            const dropRate = isHardMode ? 0.8 : 0.5;
            
            for (let i = 0; i < dropCount; i++) {
                try {
                    if (Math.random() < dropRate) {
                        const equipTemplate = GAME_DATA.ITEM_DATABASE.GENERATORS.getRandomEquipment(requireRealm, allowedRarities);
                        if (equipTemplate) {
                            // 使用generateEquipment生成正确格式的装备对象
                            drops.push(this.generateEquipment(equipTemplate));
                        }
                    }
                } catch (e) {
                    console.error('生成装备掉落出错:', e);
                }
            }
            
            // 困难模式额外掉落一件高品质装备（橙色）
            try {
                if (isHardMode && Math.random() < 0.6) {
                    const legendaryEquip = GAME_DATA.ITEM_DATABASE.GENERATORS.getRandomEquipment(requireRealm, ['legendary', 'mythic']);
                    if (legendaryEquip) {
                        drops.push(this.generateEquipment(legendaryEquip));
                    }
                }
            } catch (e) {
                console.error('生成高品质装备掉落出错:', e);
            }
            
            return drops.length > 0 ? drops : null;
        } catch (e) {
            console.error('获取秘境装备掉落出错:', e);
            return null;
        }
    }
    
    exitDungeon() {
        this.inDungeon = false;
        this.currentDungeon = null;
        this.dungeonWave = 0;
        this.dungeonStunRound = 0;
        this.dungeonDotDamage = 0;
        this.dungeonDotRound = 0;
        this.inBattle = false;
        this.currentEnemy = null;
        this.currentEnemies = [];
        // 清理战斗相关状态
        this.player.battleBuffs = [];
        this.sanxiuSkillCooldowns = {};
        this.damageReduceBuff = 0;
    }
    
    dungeonEnemyTurn() {
        if (!this.inDungeon || !this.inBattle) return;
        
        if (this.dungeonDotRound > 0) {
            this.player.hp -= this.dungeonDotDamage;
            this.log('秘境', `毒伤发作：-${this.dungeonDotDamage} 气血`, 'combat');
            this.dungeonDotRound--;
        }
        
        if (this.dungeonStunRound > 0) {
            this.dungeonStunRound--;
            this.log('秘境', '你被眩晕了！', 'combat');
            return;
        }
        
        const alive = this.currentEnemies.filter(m => m.currentHp && m.currentHp > 0);
        if (alive.length === 0) {
            this.dungeonWaveClear();
            return;
        }
        
        alive.forEach(m => {
            const skill = m.skill ? GAME_DATA.DUNGEON_SKILLS[m.skill] : null;
            const useSkill = skill && Math.random() < skill.rate;
            
            if (useSkill) {
                this.castDungeonMonsterSkill(m, skill);
            } else {
                // 计算伤害，防御状态下减少伤害
                let dmg = Math.max(1, m.attack - this.player.defense);
                if (this.player.isDefending) {
                    dmg = Math.max(1, Math.floor(dmg * 0.5)); // 防御时减少50%伤害
                    this.log('秘境', `你采取防御姿态，减少了受到的伤害！`, 'combat');
                }
                this.player.hp -= dmg;
                this.log('秘境', `【${m.name}】普攻造成 ${dmg} 伤害`, 'combat');
                // 显示伤害数字、攻击动画、粒子效果和震动效果
                if (ui) {
                    const playerDiv = document.getElementById('battle-player-info');
                    if (playerDiv) {
                        const rect = playerDiv.getBoundingClientRect();
                        ui.showDamageNumber(rect.left + rect.width / 2, rect.top + rect.height / 2, dmg, false);
                        ui.showAttackAnimation(playerDiv, false);
                        ui.showParticleEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, false);
                        ui.shakeElement(playerDiv);
                    }
                }
            }
        });
        
        // 更新战斗界面
        if (ui) {
            ui.updateBattle();
        }
        
        if (this.player.hp <= 0) {
            this.player.hp = 0;
            this.log('秘境', '你重伤倒地，挑战失败！', 'combat');
            this.exitDungeon();
            this.handleDeath();
        }
    }
    
    castDungeonMonsterSkill(m, skill) {
        let dmg = Math.max(1, m.attack * skill.dmg - this.player.defense);
        
        if (skill.type === 'aoe') {
            this.player.hp -= dmg;
            this.log('秘境', `【${m.name}】释放【${skill.name}】群体伤害 ${dmg}`, 'combat');
            // 显示伤害数字、攻击动画、粒子效果和震动效果
            if (ui) {
                const playerDiv = document.getElementById('battle-player-info');
                if (playerDiv) {
                    const rect = playerDiv.getBoundingClientRect();
                    ui.showDamageNumber(rect.left + rect.width / 2, rect.top + rect.height / 2, dmg, false);
                    ui.showAttackAnimation(playerDiv, false);
                    ui.showParticleEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, false);
                    ui.shakeElement(playerDiv);
                }
            }
        } else if (skill.type === 'buff') {
            this.log('秘境', `【${m.name}】使用【${skill.name}】`, 'combat');
            // 显示 buff 效果
            if (ui) {
                const targetIndex = this.currentEnemies.indexOf(m);
                const enemyDiv = document.querySelector(`#battle-enemies-container > div:nth-child(${targetIndex + 1})`);
                if (enemyDiv) {
                    const rect = enemyDiv.getBoundingClientRect();
                    ui.showParticleEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
                }
            }
        } else {
            this.player.hp -= dmg;
            this.log('秘境', `【${m.name}】使用【${skill.name}】造成 ${dmg} 伤害`, 'combat');
            // 显示伤害数字、攻击动画、粒子效果和震动效果
            if (ui) {
                const playerDiv = document.getElementById('battle-player-info');
                if (playerDiv) {
                    const rect = playerDiv.getBoundingClientRect();
                    ui.showDamageNumber(rect.left + rect.width / 2, rect.top + rect.height / 2, dmg, false);
                    ui.showAttackAnimation(playerDiv, false);
                    ui.showParticleEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, false);
                    ui.shakeElement(playerDiv);
                }
            }
        }
        
        if (skill.stun) {
            this.dungeonStunRound = skill.stun;
        }
        
        if (skill.dot) {
            this.dungeonDotDamage = skill.dot;
            this.dungeonDotRound = skill.round;
        }
        
        if (skill.heal) {
            const heal = Math.floor(dmg * skill.heal);
            const maxHp = m.maxHp || m.hp;
            m.currentHp = Math.min(maxHp, m.currentHp + heal);
            this.log('秘境', `【${m.name}】吸血 ${heal}`, 'combat');
            // 显示治疗效果
            if (ui) {
                const targetIndex = this.currentEnemies.indexOf(m);
                const enemyDiv = document.querySelector(`#battle-enemies-container > div:nth-child(${targetIndex + 1})`);
                if (enemyDiv) {
                    const rect = enemyDiv.getBoundingClientRect();
                    const healDiv = document.createElement('div');
                    healDiv.style.position = 'absolute';
                    healDiv.style.left = `${rect.left + rect.width / 2}px`;
                    healDiv.style.top = `${rect.top + rect.height / 2}px`;
                    healDiv.style.color = '#22c55e';
                    healDiv.style.fontSize = '24px';
                    healDiv.style.fontWeight = 'bold';
                    healDiv.style.pointerEvents = 'none';
                    healDiv.style.zIndex = '1000';
                    healDiv.style.textShadow = '0 0 10px rgba(0,0,0,0.8)';
                    healDiv.textContent = `+${heal}`;
                    healDiv.style.transform = 'scale(0)';
                    healDiv.style.transition = 'transform 0.2s ease, opacity 0.5s ease, translateY 0.5s ease';
                    document.body.appendChild(healDiv);
                    
                    setTimeout(() => {
                        healDiv.style.transform = 'scale(1.5) translateY(-20px)';
                        healDiv.style.opacity = '1';
                    }, 10);
                    
                    setTimeout(() => {
                        healDiv.style.transform = 'scale(1) translateY(-60px)';
                        healDiv.style.opacity = '0';
                        setTimeout(() => {
                            if (healDiv.parentNode) {
                                healDiv.parentNode.removeChild(healDiv);
                            }
                        }, 500);
                    }, 100);
                }
            }
        }
    }
    
    calculatePassiveBonuses() {
        const bonuses = {
            hpBonus: 0,
            atkBonus: 0,
            defBonus: 0,
            critRate: 0,
            critDmg: 0,
            dodge: 0,
            dotReduce: 0
        };
        
        if (!this.player) return bonuses;
        
        // 处理散修被动技能
        if (this.player.sanxiuPassiveSkills) {
            this.player.sanxiuPassiveSkills.forEach(passiveId => {
                const passive = GAME_DATA.SANXIU_PASSIVE_SKILLS[passiveId];
                if (passive) {
                    if (passive.hpPercent) bonuses.hpBonus += passive.hpPercent;
                    if (passive.atkPercent) bonuses.atkBonus += passive.atkPercent;
                    if (passive.defPercent) bonuses.defBonus += passive.defPercent;
                    if (passive.allPercent) {
                        bonuses.hpBonus += passive.allPercent;
                        bonuses.atkBonus += passive.allPercent;
                        bonuses.defBonus += passive.allPercent;
                    }
                    if (passive.critRate) bonuses.critRate += passive.critRate;
                    if (passive.critDmg) bonuses.critDmg += passive.critDmg;
                    if (passive.dodge) bonuses.dodge += passive.dodge;
                    if (passive.dotReduce) bonuses.dotReduce += passive.dotReduce;
                }
            });
        }
        
        // 处理门派被动技能
        if (this.player.skills) {
            this.player.skills.forEach(skillName => {
                const skill = GAME_DATA.SKILLS[skillName];
                if (skill && skill.type === 'passive') {
                    // 处理门派被动技能的效果
                    if (skill.hpPercent) bonuses.hpBonus += skill.hpPercent;
                    if (skill.atkPercent) bonuses.atkBonus += skill.atkPercent;
                    if (skill.defPercent) bonuses.defBonus += skill.defPercent;
                    if (skill.allPercent) {
                        bonuses.hpBonus += skill.allPercent;
                        bonuses.atkBonus += skill.allPercent;
                        bonuses.defBonus += skill.allPercent;
                    }
                    if (skill.critRate) bonuses.critRate += skill.critRate;
                    if (skill.critDmg) bonuses.critDmg += skill.critDmg;
                    if (skill.dodge) bonuses.dodge += skill.dodge;
                    if (skill.dotReduce) bonuses.dotReduce += skill.dotReduce;
                    
                    // 处理特殊被动技能
                    if (skillName === '剑心通明') {
                        bonuses.atkBonus += 10; // 攻击+10%
                        bonuses.critRate += 5; // 暴击率+5%
                        // 剑招必定命中的效果需要在攻击逻辑中处理
                    }
                }
            });
        }
        
        return bonuses;
    }
    
    findBookById(bookId) {
        for (const key in GAME_DATA.SKILL_BOOKS) {
            const book = GAME_DATA.SKILL_BOOKS[key].find(b => b.id === bookId);
            if (book) return book;
        }
        return null;
    }
    
    learnSkillBook(bookId) {
        const book = this.findBookById(bookId);
        if (!book) {
            this.log('系统', '功法不存在！', 'warning');
            return false;
        }
        
        const playerRealm = this.player.realm.name;
        const getRealmTier = (name) => {
            if (name.includes('炼气')) return '炼气期';
            if (name.includes('筑基')) return '筑基期';
            if (name.includes('金丹')) return '金丹期';
            if (name.includes('元婴')) return '元婴期';
            if (name.includes('化神')) return '化神期';
            return '炼气期';
        };
        
        const playerTier = getRealmTier(playerRealm);
        const realmOrder = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期'];
        if (realmOrder.indexOf(playerTier) < realmOrder.indexOf(book.realm)) {
            this.log('系统', `需要【${book.realm}】境界才能学习！`, 'warning');
            return false;
        }
        
        if (this.player.learnedBooks.includes(bookId)) {
            this.log('系统', '你已经学习过这本功法了！', 'warning');
            return false;
        }
        
        if (!this.player.bookBag.includes(bookId)) {
            this.log('系统', '你没有这本功法书！', 'warning');
            return false;
        }
        
        this.player.bookBag = this.player.bookBag.filter(id => id !== bookId);
        this.player.learnedBooks.push(bookId);
        
        this.log('系统', `成功学习【${book.name}】！`, 'success');
        return true;
    }
    
    calculateBookBonuses() {
        let bonus = {
            hp: 0, atk: 0, def: 0,
            hpPercent: 0, all: 0,
            crit: 0, critDmg: 0,
            dodge: 0, dmgReduce: 0, dmgUp: 0,
            strength: 0, vitality: 0, intelligence: 0, agility: 0
        };
        
        this.player.learnedBooks.forEach(bookId => {
            const book = this.findBookById(bookId);
            if (!book) return;
            const attr = book.attr;
            
            bonus.all += attr.all || 0;
            bonus.hp += attr.hp || 0;
            bonus.atk += attr.atk || 0;
            bonus.def += attr.def || 0;
            bonus.hpPercent += attr.hpPercent || 0;
            bonus.crit += attr.crit || 0;
            bonus.critDmg += attr.critDmg || 0;
            bonus.dodge += attr.dodge || 0;
            bonus.dmgReduce += attr.dmgReduce || 0;
            bonus.dmgUp += attr.dmgUp || 0;
            bonus.strength += attr.strength || 0;
            bonus.vitality += attr.vitality || 0;
            bonus.intelligence += attr.intelligence || 0;
            bonus.agility += attr.agility || 0;
        });
        
        let countFoundation = 0;
        let countGolden = 0;
        let countYuanying = 0;
        
        this.player.learnedBooks.forEach(bookId => {
            const book = this.findBookById(bookId);
            if (!book) return;
            if (book.realm === '筑基期') countFoundation++;
            if (book.realm === '金丹期') countGolden++;
            if (book.realm === '元婴期') countYuanying++;
        });
        
        const applySet = (setData, count) => {
            if (!setData) return;
            if (count >= 2) {
                bonus.atk += setData[2].atk || 0;
                bonus.def += setData[2].def || 0;
                bonus.hp += setData[2].hp || 0;
            }
            if (count >= 4) {
                bonus.crit += setData[4].crit || 0;
                bonus.dodge += setData[4].dodge || 0;
                bonus.dmgReduce += setData[4].dmgReduce || 0;
                bonus.hpPercent += setData[4].hpPercent || 0;
            }
            if (count >= 6) {
                bonus.all += setData[6].all || 0;
                bonus.dmgUp += setData[6].dmgUp || 0;
                bonus.hpPercent += setData[6].hpPercent || 0;
            }
        };
        
        applySet(GAME_DATA.BOOK_SET_EFFECTS.foundation, countFoundation);
        applySet(GAME_DATA.BOOK_SET_EFFECTS.golden, countGolden);
        applySet(GAME_DATA.BOOK_SET_EFFECTS.yuanying, countYuanying);
        
        return bonus;
    }
    
    getEffectiveStats() {
        const base = {
            maxHp: this.player.maxHp,
            attack: this.player.attack,
            defense: this.player.defense,
            maxMp: this.player.maxMp
        };
        
        const bonuses = this.calculatePassiveBonuses();
        const bookBonuses = this.calculateBookBonuses();
        const equipBonuses = this.calculateEquipmentBonuses();
        
        // 计算装备属性加成
        const equipStrength = equipBonuses.strength || 0;
        const equipVitality = equipBonuses.vitality || 0;
        const equipIntelligence = equipBonuses.intelligence || 0;
        const equipAgility = equipBonuses.agility || 0;
        
        // 属性换算逻辑
        // 1点力量 = 2点攻击
        const strengthToAttack = (this.player.strength + bookBonuses.strength + equipStrength) * 2;
        // 1点体质 = 2点防御 + 10点气血
        const vitalityToDefense = (this.player.vitality + bookBonuses.vitality + equipVitality) * 2;
        const vitalityToHp = (this.player.vitality + bookBonuses.vitality + equipVitality) * 10;
        // 1点智力 = 5点灵力
        const intelligenceToMp = (this.player.intelligence + bookBonuses.intelligence + equipIntelligence) * 5;
        // 1点敏捷 = 1%闪避 + 0.5%暴击
        const agilityToDodge = (this.player.agility + bookBonuses.agility + equipAgility) * 1;
        const agilityToCrit = (this.player.agility + bookBonuses.agility + equipAgility) * 0.5;
        
        let adjustedMaxHp = base.maxHp + bookBonuses.hp + equipBonuses.hp + vitalityToHp;
        let adjustedAttack = base.attack + bookBonuses.atk + bookBonuses.all + equipBonuses.attack + strengthToAttack;
        let adjustedDefense = base.defense + bookBonuses.def + bookBonuses.all + equipBonuses.defense + vitalityToDefense;
        let adjustedMaxMp = base.maxMp + equipBonuses.mp + intelligenceToMp;
        
        let effectiveDef = adjustedDefense * (1 + bonuses.defBonus / 100);
        
        if (this.player.hp < adjustedMaxHp * 0.3) {
            if (this.player.sanxiuPassiveSkills && this.player.sanxiuPassiveSkills.includes('indestructible')) {
                effectiveDef *= 2;
            }
            // 处理金骨不屈被动技能
            if (this.player.skills && this.player.skills.includes('金骨不屈')) {
                effectiveDef *= 1.2; // 防御+20%
            }
        }
        
        // 处理金纹护体被动技能
        if (this.player.skills && this.player.skills.includes('金纹护体')) {
            effectiveDef += 8; // 永久提升防御+8
        }
        
        // 智力影响法伤：1点智力=2点法伤
        const intelligenceToMagicDamage = (this.player.intelligence + bookBonuses.intelligence + equipIntelligence) * 2;
        // 命中基础值+敏捷加成：1点敏捷=0.5%命中
        const baseHitRate = 90;
        const agilityToHit = (this.player.agility + bookBonuses.agility + equipAgility) * 0.5;
        // 回蓝：智力加成+基础回蓝
        const baseMpRegen = 5;
        const intelligenceToMpRegen = (this.player.intelligence + bookBonuses.intelligence + equipIntelligence) * 0.5;
        // 暴击伤害基础值：150%
        const baseCritDmg = 150;
        
        return {
            maxHp: Math.floor(adjustedMaxHp * (1 + bonuses.hpBonus / 100 + bookBonuses.hpPercent / 100)),
            maxMp: Math.floor(adjustedMaxMp),
            attack: Math.floor(adjustedAttack * (1 + bonuses.atkBonus / 100) * (1 + bookBonuses.dmgUp / 100)),
            defense: Math.floor(effectiveDef * (1 - bookBonuses.dmgReduce / 100)),
            critRate: bonuses.critRate + bookBonuses.crit + agilityToCrit + (equipBonuses.crit || 0),
            critDmg: baseCritDmg + bonuses.critDmg + bookBonuses.critDmg + (equipBonuses.critDmg || 0),
            dodge: bonuses.dodge + bookBonuses.dodge + agilityToDodge + (equipBonuses.dodge || 0) + (equipBonuses.dodgeRate || 0),
            hit: baseHitRate + agilityToHit + (equipBonuses.hit || 0),
            magicDamage: intelligenceToMagicDamage + (equipBonuses.magicDamage || 0),
            mpRegen: baseMpRegen + intelligenceToMpRegen + (equipBonuses.mpRegen || 0),
            speed: (equipBonuses.speed || 0),
            regen: (equipBonuses.regen || 0),
            burn: (equipBonuses.burn || 0),
            magicDefense: (equipBonuses.magicDefense || 0),
            dotReduce: bonuses.dotReduce
        };
    }
    
    // 重新生成当前境界的属性
    regenerateRealmStats() {
        if (!this.player) return;
        
        // 获取当前境界
        const currentRealm = this.player.realm;
        if (!currentRealm) return;
        
        // 从境界配置中获取基础属性
        const realmConfig = GAME_DATA.REALMS.find(realm => realm.name === currentRealm.name);
        if (!realmConfig) return;
        
        // 保存当前的装备、技能等状态
        const currentEquipment = { ...this.player.equipment };
        const currentSkills = [...this.player.skills];
        const currentSanxiuSkills = { ...this.player.sanxiuActiveSkills, ...this.player.sanxiuPassiveSkills };
        
        // 重置基础属性为当前境界的配置值
        this.player.maxHp = realmConfig.hp;
        this.player.hp = realmConfig.hp;
        this.player.maxMp = realmConfig.mp;
        this.player.mp = realmConfig.mp;
        this.player.attack = realmConfig.attack;
        this.player.defense = realmConfig.defense;
        
        // 保持其他属性不变（力量、体质、智力、敏捷等）
        // 这些属性通常是通过装备、功法等获得的
        
        // 重新装备装备，以应用装备属性
        Object.entries(currentEquipment).forEach(([slot, equipItem]) => {
            if (equipItem) {
                // 先将装备从装备槽移除
                this.player.equipment[slot] = null;
                // 再重新装备
                if (typeof equipItem === 'string') {
                    this.equipItem(equipItem);
                } else if (typeof equipItem === 'object' && equipItem !== null) {
                    // 直接装备装备对象
                    if (!this.player.equipmentBag) {
                        this.player.equipmentBag = [];
                    }
                    // 先添加到装备背包
                    this.player.equipmentBag.push(equipItem);
                    // 然后使用UI的equipItem方法装备
                    if (typeof ui !== 'undefined' && ui.equipItem) {
                        const index = this.player.equipmentBag.indexOf(equipItem);
                        if (index !== -1) {
                            ui.equipItem(equipItem, index);
                        }
                    }
                }
            }
        });
        
        this.log('系统', `已根据当前境界【${currentRealm.name}】重新生成属性！`, 'success');
        return true;
    }
    
    useSanxiuSkill(skillId, targetIndex = 0) {
        const skill = GAME_DATA.SANXIU_ACTIVE_SKILLS[skillId];
        if (!skill) return false;
        
        if (!this.player.sanxiuActiveSkills.includes(skillId)) {
            this.log('系统', '你还没学会这个技能！', 'warning');
            return false;
        }
        
        if (this.sanxiuSkillCooldowns[skillId] > 0) {
            this.log('系统', `技能冷却中，还需${this.sanxiuSkillCooldowns[skillId]}回合！`, 'warning');
            return false;
        }
        
        if (this.player.mp < skill.mpCost) {
            this.log('系统', '法力不足！', 'warning');
            return false;
        }
        
        this.player.mp -= skill.mpCost;
        
        const stats = this.getEffectiveStats();
        let skipCounter = false;
        
        if (skill.type === 'heal') {
            const healAmount = Math.floor(stats.maxHp * skill.healPercent / 100);
            this.player.hp = Math.min(stats.maxHp, this.player.hp + healAmount);
            this.log('战斗', `使用【${skill.name}】恢复了${healAmount}点气血！`, 'success');
        } else if (skill.type === 'buff') {
            this.damageReduceBuff = skill.damageReduce;
            this.log('战斗', `使用【${skill.name}】，本回合减伤${Math.floor(skill.damageReduce * 100)}%！`, 'success');
        } else if (skill.type === 'aoe') {
            this.currentEnemies.forEach((enemy, idx) => {
                if (enemy.currentHp && enemy.currentHp > 0) {
                    const baseDamage = (skill.element === 'wood' || skill.element === 'water' || skill.element === 'fire') 
                        ? stats.magicDamage 
                        : stats.attack;
                    let damage = Math.floor(Math.max(1, baseDamage * skill.damage - enemy.defense));
                    enemy.currentHp -= damage;
                    this.log('战斗', `【${skill.name}】对${enemy.name}造成${damage}点伤害！`, 'combat');
                    if (enemy.currentHp <= 0) {
                        this.log('战斗', `${enemy.name}被击杀！`, 'success');
                    }
                    
                    // 处理套装特效 - AOE技能也能触发
                    this.applySetEffects(enemy);
                }
            });
        } else {
            const targetEnemy = this.currentEnemies[targetIndex];
            if (!targetEnemy || !targetEnemy.currentHp || targetEnemy.currentHp <= 0) {
                const alive = this.currentEnemies.find(e => e.currentHp && e.currentHp > 0);
                if (!alive) return false;
            }
            
            const enemy = targetEnemy && targetEnemy.currentHp && targetEnemy.currentHp > 0 ? targetEnemy : this.currentEnemies.find(e => e.currentHp && e.currentHp > 0);
            let effectiveDef = enemy.defense;
            if (skill.ignoreDef) {
                effectiveDef = enemy.defense * (1 - skill.ignoreDef);
            }
            
            const baseDamage = (skill.element === 'wood' || skill.element === 'water' || skill.element === 'fire') 
                ? stats.magicDamage 
                : stats.attack;
            let damage = Math.floor(Math.max(1, baseDamage * skill.damage - effectiveDef));
            
            if (stats.critRate > 0 && Math.random() < stats.critRate / 100) {
                damage = Math.floor(damage * (1 + stats.critDmg / 100));
                this.log('战斗', '暴击！', 'combat');
            }
            
            enemy.currentHp -= damage;
            this.log('战斗', `使用【${skill.name}】对${enemy.name}造成${damage}点伤害！`, 'combat');
            
            if (enemy.currentHp <= 0) {
                this.log('战斗', `${enemy.name}被击杀！`, 'success');
            }
            
            // 处理套装特效
            this.applySetEffects(enemy);
            
            if (skill.noCounter) {
                skipCounter = true;
            }
        }
        
        // 处理状态效果
        this.processStatusEffects();
        
        if (skill.cooldown > 0) {
            this.sanxiuSkillCooldowns[skillId] = skill.cooldown;
        }
        
        const aliveEnemies = this.currentEnemies.filter(e => e.currentHp && e.currentHp > 0);
        if (aliveEnemies.length === 0) {
            this.endBattle(true);
            return true;
        }
        
        if (!skipCounter && skill.type !== 'buff') {
            this.enemyTurn();
        }
        
        this.reduceSanxiuCooldowns();
        return true;
    }
    
    reduceSanxiuCooldowns() {
        Object.keys(this.sanxiuSkillCooldowns).forEach(skillId => {
            if (this.sanxiuSkillCooldowns[skillId] > 0) {
                this.sanxiuSkillCooldowns[skillId]--;
            }
        });
        this.damageReduceBuff = 0;
    }
    
    // 状态效果系统核心方法
    addStatusEffect(target, effect) {
        if (target === 'player') {
            // 检查是否已经存在相同类型的效果
            const existingEffect = this.statusEffects.player.find(e => e.type === effect.type);
            if (existingEffect) {
                // 如果存在，刷新持续时间
                existingEffect.duration = effect.duration;
                existingEffect.intensity = Math.max(existingEffect.intensity, effect.intensity || 1);
            } else {
                this.statusEffects.player.push(effect);
            }
        } else if (target === 'enemy' && effect.enemyId) {
            if (!this.statusEffects.enemies[effect.enemyId]) {
                this.statusEffects.enemies[effect.enemyId] = [];
            }
            // 检查是否已经存在相同类型的效果
            const existingEffect = this.statusEffects.enemies[effect.enemyId].find(e => e.type === effect.type);
            if (existingEffect) {
                // 如果存在，刷新持续时间
                existingEffect.duration = effect.duration;
                existingEffect.intensity = Math.max(existingEffect.intensity, effect.intensity || 1);
            } else {
                this.statusEffects.enemies[effect.enemyId].push(effect);
            }
        }
    }
    
    removeStatusEffect(target, effectType, enemyId = null) {
        if (target === 'player') {
            this.statusEffects.player = this.statusEffects.player.filter(e => e.type !== effectType);
        } else if (target === 'enemy' && enemyId) {
            if (this.statusEffects.enemies[enemyId]) {
                this.statusEffects.enemies[enemyId] = this.statusEffects.enemies[enemyId].filter(e => e.type !== effectType);
            }
        }
    }
    
    processStatusEffects() {
        // 处理玩家状态效果
        this.statusEffects.player = this.statusEffects.player.filter(effect => {
            // 处理效果
            this.applyStatusEffect('player', effect);
            // 减少持续时间
            effect.duration--;
            return effect.duration > 0;
        });
        
        // 处理敌人状态效果
        Object.keys(this.statusEffects.enemies).forEach(enemyId => {
            this.statusEffects.enemies[enemyId] = this.statusEffects.enemies[enemyId].filter(effect => {
                // 处理效果
                this.applyStatusEffect('enemy', effect, enemyId);
                // 减少持续时间
                effect.duration--;
                return effect.duration > 0;
            });
            
            // 如果敌人没有状态效果了，清除该敌人的状态效果数组
            if (this.statusEffects.enemies[enemyId].length === 0) {
                delete this.statusEffects.enemies[enemyId];
            }
        });
    }
    
    applyStatusEffect(target, effect, enemyId = null) {
        if (target === 'player') {
            switch (effect.type) {
                case 'burn':
                    const burnDamage = Math.floor(this.player.maxHp * (effect.intensity * 0.05));
                    this.player.hp = Math.max(1, this.player.hp - burnDamage);
                    this.log('战斗', `灼烧效果：-${burnDamage} 气血`, 'combat');
                    break;
                case 'freeze':
                    // 冰冻效果：无法行动
                    this.log('战斗', '你被冰冻了，无法行动！', 'combat');
                    break;
                case 'poison':
                    const poisonDamage = Math.floor(this.player.maxHp * (effect.intensity * 0.03));
                    this.player.hp = Math.max(1, this.player.hp - poisonDamage);
                    this.log('战斗', `中毒效果：-${poisonDamage} 气血`, 'combat');
                    break;
                case 'stun':
                    this.log('战斗', '你被眩晕了，无法行动！', 'combat');
                    break;
            }
        } else if (target === 'enemy' && enemyId) {
            const enemy = this.currentEnemies.find(e => e.uniqueId === enemyId);
            if (enemy && enemy.currentHp > 0) {
                switch (effect.type) {
                    case 'burn':
                        const burnDamage = Math.floor(enemy.maxHp * (effect.intensity * 0.05));
                        enemy.currentHp = Math.max(1, enemy.currentHp - burnDamage);
                        this.log('战斗', `${enemy.name}受到灼烧效果：-${burnDamage} 气血`, 'combat');
                        break;
                    case 'freeze':
                        // 冰冻效果：敌人无法行动
                        this.log('战斗', `${enemy.name}被冰冻了，无法行动！`, 'combat');
                        break;
                    case 'poison':
                        const poisonDamage = Math.floor(enemy.maxHp * (effect.intensity * 0.03));
                        enemy.currentHp = Math.max(1, enemy.currentHp - poisonDamage);
                        this.log('战斗', `${enemy.name}受到中毒效果：-${poisonDamage} 气血`, 'combat');
                        break;
                    case 'stun':
                        this.log('战斗', `${enemy.name}被眩晕了，无法行动！`, 'combat');
                        break;
                }
            }
        }
    }
    
    hasStatusEffect(target, effectType, enemyId = null) {
        if (target === 'player') {
            return this.statusEffects.player.some(e => e.type === effectType);
        } else if (target === 'enemy' && enemyId) {
            return this.statusEffects.enemies[enemyId] && this.statusEffects.enemies[enemyId].some(e => e.type === effectType);
        }
        return false;
    }
    
    getStatusEffect(target, effectType, enemyId = null) {
        if (target === 'player') {
            return this.statusEffects.player.find(e => e.type === effectType);
        } else if (target === 'enemy' && enemyId) {
            return this.statusEffects.enemies[enemyId] && this.statusEffects.enemies[enemyId].find(e => e.type === effectType);
        }
        return null;
    }
    
    // 应用套装特效
    applySetEffects(enemy) {
        const totalStats = this.getEffectiveStats();
        
        // 检查套装效果
        const setBonus = this.getSetBonus();
        
        // 处理灼烧效果
        if (totalStats.burn > 0) {
            const burnChance = totalStats.burn;
            if (Math.random() * 100 < burnChance) {
                // 灼烧效果：持续3回合，强度1
                this.addStatusEffect('enemy', {
                    type: 'burn',
                    enemyId: enemy.uniqueId,
                    duration: 3,
                    intensity: 1
                });
                this.log('战斗', `${enemy.name}被灼烧了！`, 'combat');
            }
        }
        
        // 处理冰冻效果（水月宫套装）
        if (setBonus && setBonus.freezeChance) {
            const freezeChance = setBonus.freezeChance;
            if (Math.random() * 100 < freezeChance) {
                // 冰冻效果：持续2回合
                this.addStatusEffect('enemy', {
                    type: 'freeze',
                    enemyId: enemy.uniqueId,
                    duration: 2,
                    intensity: 1
                });
                this.log('战斗', `${enemy.name}被冰冻了！`, 'combat');
            }
        }
        
        // 处理金芒一闪效果（金阳门套装）
        if (setBonus && setBonus.goldenFlashChance) {
            const goldenFlashChance = setBonus.goldenFlashChance;
            if (Math.random() * 100 < goldenFlashChance) {
                // 金芒一闪：额外30%物攻伤害
                const extraDamage = Math.floor(totalStats.attack * 0.3);
                enemy.currentHp = Math.max(1, enemy.currentHp - extraDamage);
                this.log('战斗', `金芒一闪！对${enemy.name}造成了${extraDamage}点额外伤害！`, 'combat');
            }
        }
        
        // 处理青木回春效果（青木宗套装）
        if (setBonus && setBonus.woodHealChance) {
            const woodHealChance = setBonus.woodHealChance;
            if (Math.random() * 100 < woodHealChance) {
                // 青木回春：瞬间回血5%
                const healAmount = Math.floor(totalStats.maxHp * 0.05);
                this.player.hp = Math.min(totalStats.maxHp, this.player.hp + healAmount);
                this.log('战斗', `青木回春！恢复了${healAmount}点气血！`, 'combat');
            }
        }
        
        // 处理反震效果（皇土阁套装）
        if (setBonus && setBonus.reflectChance) {
            const reflectChance = setBonus.reflectChance;
            if (Math.random() * 100 < reflectChance) {
                // 反震：反弹20%伤害
                const reflectDamage = Math.floor(totalStats.attack * 0.2);
                this.log('战斗', `反震！对${enemy.name}造成了${reflectDamage}点伤害！`, 'combat');
            }
        }
    }
    
    // 获取套装效果 - 支持多个套装效果叠加
    getSetBonus() {
        const equipment = this.player.equipment;
        const equippedItems = Object.values(equipment).filter(item => item !== null);
        
        // 按套装分组
        const sets = {};
        equippedItems.forEach(item => {
            if (item.set) {
                if (!sets[item.set]) {
                    sets[item.set] = [];
                }
                sets[item.set].push(item);
            }
        });
        
        const bonus = {};
        
        // 检查套装效果
        for (const [setName, items] of Object.entries(sets)) {
            const setSize = items.length;
            
            // 金阳门套装
            if (setName === 'liu jin' && setSize >= 2) {
                bonus.goldenFlashChance = (bonus.goldenFlashChance || 0) + 15;
            } else if (setName === 'lie yang' && setSize >= 4) {
                bonus.goldenFlashChance = (bonus.goldenFlashChance || 0) + 30;
            } else if (setName === 'zhen jin' && setSize >= 4) {
                bonus.goldenSlash = true;
            } else if (setName === 'jin que' && setSize >= 4) {
                bonus.goldenSlash = true;
                bonus.goldenGuard = true;
            }
            
            // 青木宗套装
            else if (setName === 'qing lan' && setSize >= 4) {
                bonus.woodHealChance = (bonus.woodHealChance || 0) + 10;
            } else if (setName === 'wan mu' && setSize >= 4) {
                bonus.woodHealChance = (bonus.woodHealChance || 0) + 20;
            } else if (setName === 'chang sheng' && setSize >= 4) {
                bonus.woodHealChance = (bonus.woodHealChance || 0) + 25;
            } else if (setName === 'ku rong' && setSize >= 4) {
                bonus.woodHealChance = (bonus.woodHealChance || 0) + 40;
                bonus.poisonImmunity = true;
            }
            
            // 水月宫套装
            else if (setName === 'ning shui' && setSize >= 4) {
                bonus.freezeChance = (bonus.freezeChance || 0) + 10;
            } else if (setName === 'liu shuang' && setSize >= 4) {
                bonus.freezeChance = (bonus.freezeChance || 0) + 20;
            } else if (setName === 'cang lan' && setSize >= 4) {
                bonus.freezeChance = (bonus.freezeChance || 0) + 25;
            } else if (setName === 'cang hai' && setSize >= 4) {
                bonus.freezeChance = (bonus.freezeChance || 0) + 40;
            }
            
            // 炎火殿套装
            else if (setName === 'chi yan' && setSize >= 4) {
                bonus.burnChance = (bonus.burnChance || 0) + 15;
            } else if (setName === 'fen tian' && setSize >= 4) {
                bonus.burnChance = (bonus.burnChance || 0) + 25;
            } else if (setName === 'yan yu' && setSize >= 4) {
                bonus.burnChance = (bonus.burnChance || 0) + 30;
            } else if (setName === 'jiu tian' && setSize >= 4) {
                bonus.burnChance = (bonus.burnChance || 0) + 50;
            }
            
            // 皇土阁套装
            else if (setName === 'huang tu' && setSize >= 4) {
                bonus.reflectChance = (bonus.reflectChance || 0) + 10;
            } else if (setName === 'pan shi' && setSize >= 4) {
                bonus.reflectChance = (bonus.reflectChance || 0) + 20;
            } else if (setName === 'zhen yue' && setSize >= 4) {
                bonus.reflectChance = (bonus.reflectChance || 0) + 25;
            } else if (setName === 'wan yue' && setSize >= 4) {
                bonus.reflectChance = (bonus.reflectChance || 0) + 40;
            }
        }
        
        return Object.keys(bonus).length > 0 ? bonus : null;
    }
    
    learnSanxiuActiveSkill(skillId) {
        if (this.player.sect) {
            this.log('系统', '你已是门派弟子，无法学习散修技能！', 'warning');
            return false;
        }
        
        const skill = GAME_DATA.SANXIU_ACTIVE_SKILLS[skillId];
        if (!skill) return false;
        
        if (this.player.sanxiuActiveSkills.includes(skillId)) {
            this.log('系统', '你已经学会这个技能了！', 'warning');
            return false;
        }
        
        this.player.sanxiuActiveSkills.push(skillId);
        this.log('系统', `学会了【${skill.name}】！`, 'success');
        return true;
    }
    
    learnSanxiuPassiveSkill(passiveId) {
        if (this.player.sect) {
            this.log('系统', '你已是门派弟子，无法学习散修技能！', 'warning');
            return false;
        }
        
        const passive = GAME_DATA.SANXIU_PASSIVE_SKILLS[passiveId];
        if (!passive) return false;
        
        if (this.player.sanxiuPassiveSkills.includes(passiveId)) {
            this.log('系统', '你已经学会这个功法了！', 'warning');
            return false;
        }
        
        const getRealmTier = (name) => {
            if (name.includes('炼气')) return '炼气期';
            if (name.includes('筑基')) return '筑基期';
            if (name.includes('金丹')) return '金丹期';
            if (name.includes('元婴')) return '元婴期';
            if (name.includes('化神')) return '化神期';
            return '炼气期';
        };
        
        const playerTier = getRealmTier(this.player.realm.name);
        const realmOrder = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期'];
        
        if (realmOrder.indexOf(playerTier) < realmOrder.indexOf(passive.realm)) {
            this.log('系统', `需要【${passive.realm}】才能学习这个功法！`, 'warning');
            return false;
        }
        
        this.player.sanxiuPassiveSkills.push(passiveId);
        this.log('系统', `学会了【${passive.name}】！`, 'success');
        this.log('系统', passive.description, 'info');
        return true;
    }
    
    acceptQuest(questId) {
        let quest = GAME_DATA.QUESTS[questId];
        if (!quest) {
            quest = GAME_DATA.QINGLAN_QUESTS[questId];
        }
        if (!quest) {
            // 检查门派任务
            for (const sect in GAME_DATA.SECT_QUESTS) {
                const sectQuests = GAME_DATA.SECT_QUESTS[sect];
                const foundQuest = sectQuests.find(q => q.id === questId);
                if (foundQuest) {
                    quest = foundQuest;
                    break;
                }
            }
        }
        if (!quest) return false;
        
        if (this.player.quests.find(q => q.id === questId)) {
            // 任务已经存在，不重复接取
            return false;
        }
        
        this.player.quests.push({
            id: questId,
            progress: 0,
            completed: false
        });
        this.log('系统', `接受了任务：【${quest.name || quest.title}】`, 'success');
        this.log('系统', quest.description, 'info');
        
        // 如果是护送任务，给玩家需要交付的物品
        if (quest.type === 'deliver' && quest.item) {
            this.addToInventory(quest.item);
            this.log('系统', `获得了${quest.item}，请将其送到指定NPC处。`, 'success');
        }
        
        return true;
    }
    
    updateQuestProgress(type, target) {
        this.player.quests.forEach(quest => {
            if (quest.completed) return;
            let questData = GAME_DATA.QUESTS[quest.id];
            if (!questData) {
                questData = GAME_DATA.QINGLAN_QUESTS[quest.id];
            }
            if (!questData) {
                // 检查门派任务
                for (const sect in GAME_DATA.SECT_QUESTS) {
                    const sectQuests = GAME_DATA.SECT_QUESTS[sect];
                    const foundQuest = sectQuests.find(q => q.id === quest.id);
                    if (foundQuest) {
                        questData = foundQuest;
                        break;
                    }
                }
            }
            if (!questData) return;
            
            let isMatch = false;
            let targetCount = 1;
            
            // 处理青岚村任务类型（有objectives数组）
            if (questData.objectives && questData.objectives.length > 0) {
                const currentObjective = questData.objectives[0];
                if (currentObjective && currentObjective.type === type && currentObjective.target === target) {
                    isMatch = true;
                    targetCount = currentObjective.count;
                }
            } 
            // 处理普通任务类型（有type和target字段）
            else if ((questData.type === type && questData.target === target) || (!questData.type && questData.target === target)) {
                isMatch = true;
                targetCount = questData.count || 1;
            }
            
            // 特殊处理野猪任务
            if (questData.type === type && questData.target === 'wild-boar') {
                if (['wild-boar', 'wild-monster', 'elite-monster', 'boss-monster'].includes(target)) {
                    isMatch = true;
                    targetCount = questData.count || 1;
                }
            }
            
            // 处理护送任务（deliver类型）- 与目标NPC对话
            if (questData.type === 'deliver' && type === 'talk' && questData.targetNpc === target) {
                // 检查玩家是否拥有需要交付的物品及数量
                if (questData.item && (!this.player.inventory || !this.player.inventory[questData.item] || this.player.inventory[questData.item] < (questData.count || 1))) {
                    return; // 玩家没有该物品或数量不足，不触发任务完成
                }
                isMatch = true;
                targetCount = questData.count || 1;
            }
            
            // 处理守护任务（guard类型）- 守护完成
            if (questData.type === 'guard' && type === 'guard_complete' && questData.target === target) {
                isMatch = true;
                targetCount = questData.count || 1;
            }
            
            if (isMatch) {
                quest.progress = (quest.progress || 0) + 1;
                this.log('系统', `任务【${questData.name || questData.title}】进度：${quest.progress}/${targetCount}`, 'info');
                
                if (quest.progress >= targetCount) {
                    quest.completed = true;
                    this.log('系统', `任务【${questData.name || questData.title}】已完成！`, 'success');
                    // 自动完成任务，触发奖励和下一个任务接取
                    this.completeQuest(quest.id);
                }
            }
        });
    }
    
    completeQuest(questId) {
        const questIndex = this.player.quests.findIndex(q => q.id === questId);
        if (questIndex === -1) return false;
        
        const quest = this.player.quests[questIndex];
        let questData = GAME_DATA.QUESTS[questId];
        if (!questData) {
            questData = GAME_DATA.QINGLAN_QUESTS[questId];
        }
        if (!questData) {
            // 检查门派任务
            for (const sect in GAME_DATA.SECT_QUESTS) {
                const sectQuests = GAME_DATA.SECT_QUESTS[sect];
                const foundQuest = sectQuests.find(q => q.id === quest.id);
                if (foundQuest) {
                    questData = foundQuest;
                    break;
                }
            }
        }
        if (!questData) return false;
        
        if (!quest.completed) {
            this.log('系统', '任务还未完成！', 'warning');
            return false;
        }
        
        if (questData.rewards.contribution) {
            this.player.contribution += questData.rewards.contribution;
            this.log('系统', `获得门派贡献：${questData.rewards.contribution}`, 'success');
        }
        if (questData.rewards.gold) {
            this.player.gold += questData.rewards.gold;
            this.log('系统', `获得银两：${questData.rewards.gold}`, 'success');
        }
        if (questData.rewards.exp) {
            this.player.cultivation += questData.rewards.exp;
            this.justGainedCultivation = true;
            this.log('系统', `获得修为：${questData.rewards.exp}`, 'success');
            this.checkLevelUp();
        }
        if (questData.rewards.cultivation) {
            this.player.cultivation += questData.rewards.cultivation;
            this.justGainedCultivation = true;
            this.log('系统', `获得修为：${questData.rewards.cultivation}`, 'success');
            this.checkLevelUp();
        }
        if (questData.rewards.items) {
            questData.rewards.items.forEach(item => {
                this.addToInventory(item);
                this.log('系统', `获得物品：${item}`, 'success');
            });
        }
        if (questData.rewards.title) {
            this.player.title = questData.rewards.title;
            this.log('系统', `获得称号：${questData.rewards.title}`, 'success');
        }
        
        // 如果是护送任务，从背包中移除交付的物品
        if (questData.type === 'deliver' && questData.item) {
            if (this.player.inventory && this.player.inventory[questData.item]) {
                const count = questData.count || 1;
                if (this.player.inventory[questData.item] > count) {
                    this.player.inventory[questData.item] -= count;
                } else {
                    delete this.player.inventory[questData.item];
                }
                this.log('系统', `交付了${count}个${questData.item}`, 'success');
            }
        }
        
        // 记录已完成的任务
        if (!this.player.completedQuests) {
            this.player.completedQuests = [];
        }
        this.player.completedQuests.push(questId);
        
        // 从任务列表中移除任务
        this.player.quests.splice(questIndex, 1);
        this.log('系统', `完成任务：【${questData.name || questData.title}】`, 'success');
        
        // 显示任务完成弹窗
        if (typeof ui !== 'undefined' && ui.showStoryModal) {
            ui.showStoryModal('任务完成', `
                <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">🎉 任务完成</h3>
                <p style="text-align: center; margin-bottom: 15px;">任务【${questData.name || questData.title}】已成功完成！</p>
                <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h4 style="color: #fbbf24; margin-bottom: 10px;">任务奖励</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        ${questData.rewards.contribution ? `<li style="margin-bottom: 5px;">🏆 门派贡献：${questData.rewards.contribution}</li>` : ''}
                        ${questData.rewards.gold ? `<li style="margin-bottom: 5px;">💰 银两：${questData.rewards.gold}</li>` : ''}
                        ${questData.rewards.exp ? `<li style="margin-bottom: 5px;">📖 修为：${questData.rewards.exp}</li>` : ''}
                        ${questData.rewards.cultivation ? `<li style="margin-bottom: 5px;">📖 修为：${questData.rewards.cultivation}</li>` : ''}
                        ${questData.rewards.items ? questData.rewards.items.map(item => `<li style="margin-bottom: 5px;">🎁 ${item}</li>`).join('') : ''}
                        ${questData.rewards.title ? `<li style="margin-bottom: 5px;">🏅 称号：${questData.rewards.title}</li>` : ''}
                    </ul>
                </div>
                <p style="text-align: center; color: #fbbf24;">恭喜你完成了这个任务！</p>
            `, [
                {
                    text: '确定',
                    className: 'btn-success',
                    callback: () => {
                        document.getElementById('story-modal').classList.add('hidden');
                    }
                }
            ]);
        }
        
        // 触发UI更新
        if (typeof ui !== 'undefined' && ui.updateQuestPanel) {
            ui.updateQuestPanel();
        }
        
        // 不再自动接取青岚村的下一个任务，让玩家自己触发
        // 弹窗对话系统会处理任务的触发
        
        return true;
    }
    
    updateBountyProgress(type, target) {
        if (!this.player.bountyQuests) return;
        
        this.player.bountyQuests.forEach(quest => {
            if (quest.completed) return;
            
            // 检查是否匹配目标（双向匹配）
            if (type === 'kill' && quest.target && target) {
                const match = target.includes(quest.target) || quest.target.includes(target);
                if (match) {
                    quest.progress = (quest.progress || 0) + 1;
                    this.log('系统', `悬赏任务【${quest.title}】进度：${quest.progress}/${quest.targetCount}`, 'info');
                    
                    if (quest.progress >= quest.targetCount) {
                        quest.completed = true;
                        this.log('系统', `悬赏任务【${quest.title}】已完成！请前往悬赏令使处领取奖励！`, 'success');
                    }
                }
            }
        });
    }
    
    completeBountyQuest(questId) {
        if (!this.player.bountyQuests) return false;
        
        const questIndex = this.player.bountyQuests.findIndex(q => q.id === questId);
        if (questIndex === -1) return false;
        
        const quest = this.player.bountyQuests[questIndex];
        if (!quest.completed) {
            this.log('系统', '悬赏任务还未完成！', 'warning');
            return false;
        }
        
        const rewards = quest.rewards;
        
        // 发放奖励
        if (rewards.silver) {
            this.player.gold += rewards.silver;
            this.log('系统', `获得银两：${rewards.silver}`, 'success');
        }
        if (rewards.reputation) {
            if (!this.player.reputation) this.player.reputation = 0;
            this.player.reputation += rewards.reputation;
            this.log('系统', `获得声望：${rewards.reputation}`, 'success');
        }
        if (rewards.cultivation) {
            this.player.cultivation += rewards.cultivation;
            this.justGainedCultivation = true;
            this.log('系统', `获得修为：${rewards.cultivation}`, 'success');
            this.checkLevelUp();
        }
        if (rewards.pill && rewards.pillCount) {
            for (let i = 0; i < rewards.pillCount; i++) {
                this.addToInventory(rewards.pill);
            }
            this.log('系统', `获得物品：${rewards.pill}×${rewards.pillCount}`, 'success');
        }
        
        // 从任务列表中移除
        this.player.bountyQuests.splice(questIndex, 1);
        
        // 显示完成弹窗
        if (typeof ui !== 'undefined' && ui.showStoryModal) {
            ui.showStoryModal('悬赏任务完成', `
                <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">🎉 悬赏任务完成</h3>
                <p style="text-align: center; margin-bottom: 15px;">任务【${quest.title}】已成功完成！</p>
                <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h4 style="color: #fbbf24; margin-bottom: 10px;">任务奖励</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="margin-bottom: 5px;">💰 银两：${rewards.silver}</li>
                        <li style="margin-bottom: 5px;">⭐ 声望：${rewards.reputation}</li>
                        <li style="margin-bottom: 5px;">📖 修为：${rewards.cultivation}</li>
                        <li style="margin-bottom: 5px;">💊 ${rewards.pill}×${rewards.pillCount}</li>
                    </ul>
                </div>
                <p style="text-align: center; color: #fbbf24;">恭喜你完成了这个悬赏任务！</p>
            `, [
                {
                    text: '确定',
                    className: 'btn-success',
                    callback: () => {
                        document.getElementById('story-modal').classList.add('hidden');
                    }
                }
            ]);
        }
        
        this.log('系统', `完成悬赏任务：【${quest.title}】`, 'success');
        return true;
    }
    
    equipItem(itemName) {
        const item = GAME_DATA.ITEMS[itemName];
        if (!item) {
            this.log('系统', '物品不存在！', 'warning');
            return false;
        }
        
        let slot = null;
        if (item.type === 'weapon') slot = 'weapon';
        else if (item.type === 'armor') slot = 'armor';
        else if (item.type === 'artifact') slot = 'artifact';
        else if (item.type === 'magic-weapon') slot = 'magicWeapon';
        else if (item.type === 'helmet') slot = 'helmet';
        else if (item.type === 'chest') slot = 'chest';
        else if (item.type === 'shoulder') slot = 'shoulder';
        else if (item.type === 'pants') slot = 'pants';
        else if (item.type === 'boots') slot = 'boots';
        else if (item.type === 'ring') slot = 'ring';
        else {
            this.log('系统', '这个物品不能装备！', 'warning');
            return false;
        }
        
        if (!this.player.inventory[itemName] || this.player.inventory[itemName] <= 0) {
            this.log('系统', '你没有这个物品！', 'warning');
            return false;
        }
        
        if (item.sectExclusive) {
            const playerSectId = typeof this.player.sect === 'object' ? this.player.sect.id : this.player.sect;
            if (!playerSectId || playerSectId !== item.sectExclusive) {
                this.log('系统', '这是门派专属物品，你无法装备！', 'warning');
                return false;
            }
        }
        
        if (this.player.equipment[slot]) {
            this.addToInventory(this.player.equipment[slot]);
        }
        
        // 创建装备对象
        const equipment = {
            name: itemName,
            type: item.type,
            quality: item.rarity || '普通',
            attack: item.attack,
            defense: item.defense,
            hp: item.hp,
            mp: item.mp,
            strength: item.strength,
            vitality: item.vitality,
            intelligence: item.intelligence,
            agility: item.agility,
            crit: item.crit,
            critDmg: item.critDmg,
            speed: item.speed,
            dodge: item.dodge,
            regen: item.regen,
            burn: item.burn,
            magicDefense: item.magicDefense,
            effect: item.effect,
            set: item.set,
            sectExclusive: item.sectExclusive,
            isEquipment: true
        };
        
        this.removeFromInventory(itemName);
        this.player.equipment[slot] = equipment;
        
        this.log('系统', `装备了【${itemName}】！`, 'success');
        return true;
    }
    
    unequipItem(slot) {
        if (!this.player.equipment[slot]) {
            this.log('系统', '这个装备位是空的！', 'warning');
            return false;
        }
        
        const equipItem = this.player.equipment[slot];
        this.addToInventory(equipItem);
        this.player.equipment[slot] = null;
        
        const itemName = typeof equipItem === 'object' ? equipItem.name : equipItem;
        this.log('系统', `卸下了【${itemName}】！`, 'success');
        return true;
    }
    
    calculateEquipmentBonuses() {
        let bonus = { attack: 0, defense: 0, hp: 0, mp: 0, strength: 0, vitality: 0, intelligence: 0, agility: 0, crit: 0, critDmg: 0, speed: 0, dodge: 0, regen: 0, burn: 0, magicDefense: 0, hit: 0, magicDamage: 0, mpRegen: 0, dodgeRate: 0 };
        
        // 收集所有装备的套装信息
        const setItems = {};
        const slots = ['weapon', 'chest', 'artifact', 'magicWeapon', 'helmet', 'ring', 'shoulder', 'pants', 'boots'];
        
        slots.forEach(slot => {
            const equipItem = this.player.equipment[slot];
            if (equipItem) {
                if (typeof equipItem === 'object' && equipItem !== null) {
                    // 装备对象
                    if (equipItem.attrs) {
                        for (const [attrName, value] of Object.entries(equipItem.attrs)) {
                            switch (attrName) {
                                case 'hp':
                                    bonus.hp += value;
                                    break;
                                case 'mp':
                                    bonus.mp += value;
                                    break;
                                case 'atk':
                                    bonus.attack += value;
                                    break;
                                case 'def':
                                    bonus.defense += value;
                                    break;
                                case 'str':
                                    bonus.strength += value;
                                    break;
                                case 'con':
                                    bonus.vitality += value;
                                    break;
                                case 'int':
                                    bonus.intelligence += value;
                                    break;
                                case 'dex':
                                    bonus.agility += value;
                                    break;
                            }
                        }
                    }
                    // 检查直接属性（套装装备的属性直接存储在对象上）
                    if (equipItem.attack) bonus.attack += equipItem.attack;
                    if (equipItem.defense) bonus.defense += equipItem.defense;
                    if (equipItem.hp) bonus.hp += equipItem.hp;
                    if (equipItem.mp) bonus.mp += equipItem.mp;
                    if (equipItem.strength) bonus.strength += equipItem.strength;
                    if (equipItem.vitality) bonus.vitality += equipItem.vitality;
                    if (equipItem.intelligence) bonus.intelligence += equipItem.intelligence;
                    if (equipItem.agility) bonus.agility += equipItem.agility;
                    if (equipItem.crit) bonus.crit += equipItem.crit;
                    if (equipItem.critDmg) bonus.critDmg += equipItem.critDmg;
                    if (equipItem.speed) bonus.speed += equipItem.speed;
                    if (equipItem.dodge) bonus.dodge += equipItem.dodge;
                    if (equipItem.regen) bonus.regen += equipItem.regen;
                    if (equipItem.burn) bonus.burn += equipItem.burn;
                    if (equipItem.magicDefense) bonus.magicDefense += equipItem.magicDefense;
                    if (equipItem.effect && equipItem.effect.hp) bonus.hp += equipItem.effect.hp;
                    if (equipItem.effect && equipItem.effect.mp) bonus.mp += equipItem.effect.mp;
                    // 处理随机属性
                    if (equipItem.randomAttrs && Array.isArray(equipItem.randomAttrs)) {
                        equipItem.randomAttrs.forEach(attr => {
                            switch (attr.key) {
                                case 'critRate':
                                    bonus.crit += attr.value;
                                    break;
                                case 'critDmg':
                                    bonus.critDmg += attr.value;
                                    break;
                                case 'hit':
                                    bonus.hit += attr.value;
                                    break;
                                case 'dodgeRate':
                                    bonus.dodgeRate += attr.value;
                                    break;
                                case 'magicDamage':
                                    bonus.magicDamage += attr.value;
                                    break;
                                case 'mpRegen':
                                    bonus.mpRegen += attr.value;
                                    break;
                            }
                        });
                    }
                    // 处理allAttr效果（所有基础属性加成）
                    if (equipItem.effect && equipItem.effect.allAttr) {
                        bonus.strength += equipItem.effect.allAttr;
                        bonus.vitality += equipItem.effect.allAttr;
                        bonus.intelligence += equipItem.effect.allAttr;
                        bonus.agility += equipItem.effect.allAttr;
                    }
                    // 收集套装信息
                    if (equipItem.set) {
                        if (!setItems[equipItem.set]) {
                            setItems[equipItem.set] = 0;
                        }
                        setItems[equipItem.set]++;
                    }
                } else {
                    // 字符串类型的装备名称
                    const item = GAME_DATA.ITEMS[equipItem];
                    if (item) {
                        if (item.attack) bonus.attack += item.attack;
                        if (item.defense) bonus.defense += item.defense;
                        if (item.hp) bonus.hp += item.hp;
                        if (item.mp) bonus.mp += item.mp;
                        if (item.strength) bonus.strength += item.strength;
                        if (item.vitality) bonus.vitality += item.vitality;
                        if (item.intelligence) bonus.intelligence += item.intelligence;
                        if (item.agility) bonus.agility += item.agility;
                        if (item.crit) bonus.crit += item.crit;
                        if (item.critDmg) bonus.critDmg += item.critDmg;
                        if (item.speed) bonus.speed += item.speed;
                        if (item.dodge) bonus.dodge += item.dodge;
                        if (item.regen) bonus.regen += item.regen;
                        if (item.burn) bonus.burn += item.burn;
                        if (item.magicDefense) bonus.magicDefense += item.magicDefense;
                        if (item.effect && item.effect.hp) bonus.hp += item.effect.hp;
                        if (item.effect && item.effect.mp) bonus.mp += item.effect.mp;
                        // 处理allAttr效果（所有基础属性加成）
                        if (item.effect && item.effect.allAttr) {
                            bonus.strength += item.effect.allAttr;
                            bonus.vitality += item.effect.allAttr;
                            bonus.intelligence += item.effect.allAttr;
                            bonus.agility += item.effect.allAttr;
                        }
                        // 收集套装信息
                        if (item.set) {
                            if (!setItems[item.set]) {
                                setItems[item.set] = 0;
                            }
                            setItems[item.set]++;
                        }
                    }
                }
            }
        });
        
        // 应用套装属性 - 使用SET_BONUSES定义
        const setBonuses = GAME_DATA.ITEM_DATABASE.GENERATORS.SET_BONUSES;
        Object.entries(setItems).forEach(([setName, count]) => {
            const setData = setBonuses[setName];
            if (!setData) return;
            
            // 应用2件套装属性
            if (count >= 2 && setData.twoPiece) {
                Object.entries(setData.twoPiece).forEach(([attr, value]) => {
                    if (bonus.hasOwnProperty(attr)) {
                        bonus[attr] += value;
                    }
                });
            }
            
            // 应用4件套装属性
            if (count >= 4 && setData.fourPiece) {
                Object.entries(setData.fourPiece).forEach(([attr, value]) => {
                    if (bonus.hasOwnProperty(attr)) {
                        bonus[attr] += value;
                    }
                });
            }
        });
        
        return bonus;
    }

    // 炼丹系统相关函数

    // 获取材料
    addMaterial(materialId, quantity = 1) {
        if (!this.player) return;
        if (!this.player.materialInventory) {
            this.player.materialInventory = {};
        }
        if (this.player.materialInventory[materialId]) {
            this.player.materialInventory[materialId] += quantity;
        } else {
            this.player.materialInventory[materialId] = quantity;
        }
        const material = GAME_DATA.ALCHEMY.MATERIALS[materialId];
        const materialName = material ? material.name : materialId;
        this.log('系统', `获得材料：${materialName} x${quantity}`, 'success');
    }

    // 检查是否有足够的材料
    hasMaterials(recipe) {
        if (!this.player || !recipe || !recipe.materials) return false;
        if (!this.player.materialInventory) this.player.materialInventory = {};
        for (const [materialId, quantity] of Object.entries(recipe.materials)) {
            if (!this.player.materialInventory[materialId] || 
                this.player.materialInventory[materialId] < quantity) {
                return false;
            }
        }
        return true;
    }

    // 消耗材料
    consumeMaterials(recipe) {
        if (!this.player || !recipe || !recipe.materials) return false;
        if (!this.player.materialInventory) this.player.materialInventory = {};
        for (const [materialId, quantity] of Object.entries(recipe.materials)) {
            if (!this.player.materialInventory[materialId] || 
                this.player.materialInventory[materialId] < quantity) {
                return false;
            }
            this.player.materialInventory[materialId] -= quantity;
            if (this.player.materialInventory[materialId] <= 0) {
                delete this.player.materialInventory[materialId];
            }
        }
        return true;
    }

    // 检查是否有炼丹辅助特性
    hasHerbLingen() {
        if (!this.player || !this.player.lingen) return false;
        const lingenId = this.player.lingen.id;
        return lingenId === 'herb' || lingenId === 'space';
    }

    // 计算炼丹成功率
    calculateSuccessRate(recipe) {
        if (!recipe || typeof recipe.failureRate !== 'number') return 0.5;
        if (!this.player) return 0.5;
        let successRate = 1 - recipe.failureRate;
        // 炼丹熟练度加成
        const proficiencyBonus = Math.min((this.player.alchemyProficiency || 0) / 1000, 0.3);
        successRate += proficiencyBonus;
        // 炼丹辅助特性加成
        if (this.hasHerbLingen()) {
            successRate += 0.15;
        }
        return Math.min(Math.max(successRate, 0.1), 0.95);
    }

    // 尝试领悟新配方
    tryLearnRecipe(recipeName, recipe) {
        if (!this.player) return false;
        if (!recipe) return false;
        if (!this.player.knownRecipes) {
            this.player.knownRecipes = [];
        }
        if (this.player.knownRecipes.includes(recipeName)) {
            return false;
        }
        // 检查特殊配方的领悟条件
        if (recipe.requiresHerbLingen && !this.hasHerbLingen()) {
            return false;
        }
        if (recipe.requiresGoldenCore) {
            const realmIndex = GAME_DATA.REALMS.findIndex(r => r.name === this.player.realm.name);
            if (realmIndex < 2) { // 金丹期是第3个境界（索引2）
                return false;
            }
        }
        // 检查熟练度要求
        if ((this.player.alchemyProficiency || 0) < (recipe.requiredProficiency || 0)) {
            return false;
        }
        // 领悟概率
        const learnChance = 0.1 + ((this.player.alchemyProficiency || 0) - (recipe.requiredProficiency || 0)) / 2000;
        if (Math.random() < learnChance) {
            this.player.knownRecipes.push(recipeName);
            this.log('系统', `领悟了新配方：${recipeName}！`, 'success');
            return true;
        }
        return false;
    }

    // 炼制丹药
    craftPill(recipeName) {
        if (!this.player) {
            this.log('系统', '玩家不存在！', 'error');
            return false;
        }
        if (!GAME_DATA.ALCHEMY) {
            this.log('系统', '炼丹系统数据不存在！', 'error');
            return false;
        }
        // 获取配方
        let recipe = GAME_DATA.ALCHEMY.RECIPES ? GAME_DATA.ALCHEMY.RECIPES[recipeName] : null;
        let isSpecial = false;
        if (!recipe) {
            recipe = GAME_DATA.ALCHEMY.SPECIAL_RECIPES ? GAME_DATA.ALCHEMY.SPECIAL_RECIPES[recipeName] : null;
            if (!recipe) {
                this.log('系统', '配方不存在！', 'error');
                return false;
            }
            isSpecial = true;
        }
        // 检查境界要求
        const realmIndex = GAME_DATA.REALMS.findIndex(r => r.name === this.player.realm.name);
        const requiredRealmIndex = GAME_DATA.REALMS.findIndex(r => r.name === recipe.requiredRealm);
        if (realmIndex < requiredRealmIndex) {
            this.log('系统', `需要达到${recipe.requiredRealm}才能炼制此丹药！`, 'error');
            return false;
        }
        // 检查熟练度要求
        if (this.player.alchemyProficiency < recipe.requiredProficiency) {
            this.log('系统', `需要${recipe.requiredProficiency}炼丹熟练度才能炼制此丹药！`, 'error');
            return false;
        }
        // 检查特殊配方是否已领悟
        if (isSpecial) {
            if (!this.player.knownRecipes || !this.player.knownRecipes.includes(recipeName)) {
                this.log('系统', '你还没有领悟此配方！', 'error');
                return false;
            }
        }
        // 检查材料
        if (!this.hasMaterials(recipe)) {
            this.log('系统', '材料不足！', 'error');
            return false;
        }
        // 消耗材料
        if (!this.consumeMaterials(recipe)) {
            this.log('系统', '消耗材料失败！', 'error');
            return false;
        }
        // 计算成功率
        const successRate = this.calculateSuccessRate(recipe);
        if (Math.random() < successRate) {
            // 成功
            let count = recipe.baseCount || 1;
            // 炼丹辅助特性多1-2颗
            if (this.hasHerbLingen()) {
                count += Math.floor(Math.random() * 2) + 1;
            }
            // 添加丹药到背包
            for (let i = 0; i < count; i++) {
                this.addToInventory(recipeName);
            }
            // 增加熟练度
            const proficiencyGain = Math.max(1, Math.floor(10 - (recipe.requiredProficiency || 0) / 100));
            this.player.alchemyProficiency = (this.player.alchemyProficiency || 0) + proficiencyGain;
            this.log('系统', `炼丹成功！获得${recipeName} x${count}，炼丹熟练度+${proficiencyGain}`, 'success');
            // 尝试领悟特殊配方
            if (GAME_DATA.ALCHEMY.SPECIAL_RECIPES) {
                for (const [specialRecipeName, specialRecipe] of Object.entries(GAME_DATA.ALCHEMY.SPECIAL_RECIPES)) {
                    this.tryLearnRecipe(specialRecipeName, specialRecipe);
                }
            }
            return true;
        } else {
            // 失败
            this.player.alchemyProficiency = (this.player.alchemyProficiency || 0) + 1;
            this.log('系统', `炼丹失败！炼丹熟练度+1`, 'error');
            return false;
        }
    }

    // 获取可用的配方列表
    getAvailableRecipes() {
        if (!this.player) {
            console.log('getAvailableRecipes: player is null');
            return [];
        }
        if (!GAME_DATA.ALCHEMY) {
            console.log('getAvailableRecipes: GAME_DATA.ALCHEMY is null');
            return [];
        }
        const recipes = [];
        const realmIndex = GAME_DATA.REALMS.findIndex(r => r.name === this.player.realm.name);
        
        console.log('getAvailableRecipes: knownRecipes =', this.player.knownRecipes);
        console.log('getAvailableRecipes: realmIndex =', realmIndex, 'realm =', this.player.realm.name);
        console.log('getAvailableRecipes: alchemyProficiency =', this.player.alchemyProficiency);
        
        // 如果玩家有已学会的配方，只显示已学会的
        if (this.player.knownRecipes && this.player.knownRecipes.length > 0) {
            console.log('getAvailableRecipes: using knownRecipes');
            for (const recipeName of this.player.knownRecipes) {
                console.log('getAvailableRecipes: checking recipe =', recipeName);
                // 先从普通配方中查找
                let recipe = GAME_DATA.ALCHEMY.RECIPES?.[recipeName];
                let isSpecial = false;
                
                console.log('getAvailableRecipes: found in RECIPES =', !!recipe);
                
                // 如果普通配方中没有，从特殊配方中查找
                if (!recipe) {
                    recipe = GAME_DATA.ALCHEMY.SPECIAL_RECIPES?.[recipeName];
                    isSpecial = true;
                    console.log('getAvailableRecipes: found in SPECIAL_RECIPES =', !!recipe);
                }
                
                if (recipe) {
                    console.log('getAvailableRecipes: recipe =', recipe);
                    // 检查是否符合境界和熟练度要求
                    // 简单匹配：检查配方的 requiredRealm 是否包含在玩家的境界名称中
                    // 例如：配方 requiredRealm 是 "炼气期"，玩家境界是 "筑基期前2层"
                    // 我们需要遍历所有境界，找到与配方 requiredRealm 匹配的那个境界
                    console.log('getAvailableRecipes: GAME_DATA.REALMS.length =', GAME_DATA.REALMS.length);
                    console.log('getAvailableRecipes: first 3 REALMS =', GAME_DATA.REALMS.slice(0, 3).map(r => r.name));
                    
                    let requiredRealmIndex = -1;
                    for (let i = 0; i < GAME_DATA.REALMS.length; i++) {
                        const realmName = GAME_DATA.REALMS[i].name;
                        console.log('getAvailableRecipes: checking realm', i, '=', realmName, 'includes', recipe.requiredRealm, '=', realmName.includes(recipe.requiredRealm));
                        if (realmName.includes(recipe.requiredRealm)) {
                            requiredRealmIndex = i;
                            console.log('getAvailableRecipes: FOUND MATCH at index', i);
                            break;
                        }
                    }
                    console.log('getAvailableRecipes: requiredRealmIndex =', requiredRealmIndex, 'requiredRealm =', recipe.requiredRealm);
                    console.log('getAvailableRecipes: requiredProficiency =', recipe.requiredProficiency);
                    if (requiredRealmIndex !== -1 && realmIndex >= requiredRealmIndex && 
                        this.player.alchemyProficiency >= recipe.requiredProficiency) {
                        recipes.push({ ...recipe, name: recipeName, isSpecial: isSpecial });
                        console.log('getAvailableRecipes: added recipe =', recipeName);
                    } else {
                        console.log('getAvailableRecipes: skipped recipe (requirements not met) =', recipeName);
                    }
                }
            }
        } else {
            console.log('getAvailableRecipes: no knownRecipes, showing all');
            // 如果玩家还没有学会任何配方，显示所有符合境界和熟练度要求的普通配方
            if (GAME_DATA.ALCHEMY.RECIPES) {
                for (const [recipeName, recipe] of Object.entries(GAME_DATA.ALCHEMY.RECIPES)) {
                    // 简单匹配：遍历所有境界，找到与配方 requiredRealm 匹配的那个境界
                    let requiredRealmIndex = -1;
                    for (let i = 0; i < GAME_DATA.REALMS.length; i++) {
                        const realmName = GAME_DATA.REALMS[i].name;
                        if (realmName.includes(recipe.requiredRealm)) {
                            requiredRealmIndex = i;
                            break;
                        }
                    }
                    if (requiredRealmIndex !== -1 && realmIndex >= requiredRealmIndex && 
                        this.player.alchemyProficiency >= recipe.requiredProficiency) {
                        recipes.push({ ...recipe, name: recipeName, isSpecial: false });
                    }
                }
            }
        }
        
        console.log('getAvailableRecipes: returning', recipes.length, 'recipes');
        return recipes;
    }
}

const game = new Game();