class UI {
    constructor() {
        this.game = null;
        this.selectedEnemyIndex = null;
    }

    init() {
        this.game = game;
        this.checkForSave();
        this.bindEvents();
        this.game.init();
        this.updateAll();
    }

    // 获取品质颜色
    getQualityColor(quality) {
        const colors = {
            '白': '#9ca3af',
            '绿': '#22c55e',
            '蓝': '#3b82f6',
            '紫': '#a855f7',
            '橙': '#f97316'
        };
        return colors[quality] || '#9ca3af';
    }

    // 检查玩家境界是否满足装备要求
    canEquipRealm(equip) {
        console.log('canEquipRealm - equip:', equip);
        console.log('canEquipRealm - equip.realm:', equip?.realm);
        console.log('canEquipRealm - player.realm:', this.game.player?.realm);
        console.log('canEquipRealm - player.realm.name:', this.game.player?.realm?.name);
        
        if (!equip || !equip.realm) {
            console.log('canEquipRealm - 无realm，允许装备');
            return true; // 没有境界限制的装备可以装备
        }
        
        const playerRealmName = this.game.player.realm.name;
        const equipRealm = equip.realm;
        
        // 提取境界类型
        const realmTypes = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期', '渡劫期'];
        let playerRealmType = null;
        let equipRealmType = null;
        
        for (const type of realmTypes) {
            if (playerRealmName.includes(type)) {
                playerRealmType = type;
            }
            if (equipRealm.includes(type)) {
                equipRealmType = type;
            }
        }
        
        console.log('canEquipRealm - playerRealmType:', playerRealmType);
        console.log('canEquipRealm - equipRealmType:', equipRealmType);
        
        if (!equipRealmType) {
            console.log('canEquipRealm - 装备境界格式不对，允许装备');
            return true; // 装备境界格式不对，直接允许装备
        }
        
        // 获取境界等级
        const getRealmLevel = (type) => realmTypes.indexOf(type);
        
        const playerLevel = getRealmLevel(playerRealmType);
        const equipLevel = getRealmLevel(equipRealmType);
        
        console.log('canEquipRealm - playerLevel:', playerLevel);
        console.log('canEquipRealm - equipLevel:', equipLevel);
        console.log('canEquipRealm - 返回结果:', playerLevel >= equipLevel);
        
        return playerLevel >= equipLevel;
    }
    
    // 装备物品
    equipItem(equip, index) {
        console.log('equipItem - 开始装备');
        console.log('equipItem - equip:', equip);
        console.log('equipItem - equip.item:', equip?.item);
        
        if (!this.game.player || !equip) return;
        
        // 如果equip是嵌套对象，提取item
        let equipToCheck = equip;
        if (equip.item) {
            equipToCheck = equip.item;
            console.log('equipItem - 使用equip.item');
        }
        
        // 检查境界限制
        if (!this.canEquipRealm(equipToCheck)) {
            this.showStoryModal('境界不足', `
                <h3 style="color: #ef4444; text-align: center; margin-bottom: 20px;">⚠️ 境界不足</h3>
                <p style="text-align: center; margin-bottom: 15px;">无法装备此装备！</p>
                <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <p style="margin-bottom: 8px;"><strong>装备名称：</strong><span style="color: ${this.getQualityColor(equipToCheck.quality)}">${equipToCheck.name}</span></p>
                    <p style="margin-bottom: 8px;"><strong>当前境界：</strong><span style="color: #9ca3af;">${this.game.player.realm.name}</span></p>
                    <p><strong>需要境界：</strong><span style="color: #fbbf24;">${equipToCheck.realm}</span></p>
                </div>
                <p style="text-align: center; color: #9ca3af;">请努力修炼，提升境界后再来尝试！</p>
            `, [
                {
                    text: '确定',
                    className: 'btn-primary',
                    callback: () => {
                        document.getElementById('story-modal').classList.add('hidden');
                    }
                }
            ]);
            return;
        }

        // 检查门派限制
        if (equipToCheck.sectExclusive) {
            const playerSect = this.game.player.sect;
            const playerSectId = typeof playerSect === 'object' ? playerSect.id : playerSect;
            
            if (playerSectId !== equipToCheck.sectExclusive) {
                const sectNameMap = {
                    'jinyang': '金阳门',
                    'qingmu': '青木宗',
                    'shuiyue': '水月宫',
                    'yanhuo': '炎火殿',
                    'huangtu': '皇土阁'
                };
                const equipSectName = sectNameMap[equipToCheck.sectExclusive] || equipToCheck.sectExclusive;
                const playerSectName = playerSectId ? (sectNameMap[playerSectId] || playerSectId) : '散修';
                
                this.showStoryModal('门派限制', `
                    <h3 style="color: #ef4444; text-align: center; margin-bottom: 20px;">⚠️ 门派限制</h3>
                    <p style="text-align: center; margin-bottom: 15px;">无法装备此装备！</p>
                    <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                        <p style="margin-bottom: 8px;"><strong>装备名称：</strong><span style="color: ${this.getQualityColor(equipToCheck.quality)}">${equipToCheck.name}</span></p>
                        <p style="margin-bottom: 8px;"><strong>你的门派：</strong><span style="color: #9ca3af;">${playerSectName}</span></p>
                        <p><strong>需要门派：</strong><span style="color: #fbbf24;">${equipSectName}</span></p>
                    </div>
                    <p style="text-align: center; color: #9ca3af;">此装备仅限${equipSectName}弟子使用！</p>
                `, [
                    {
                        text: '确定',
                        className: 'btn-primary',
                        callback: () => {
                            document.getElementById('story-modal').classList.add('hidden');
                        }
                    }
                ]);
                return;
            }
        }
        
        // 根据装备类型确定装备槽位
        let slot = null;
        const equipType = equipToCheck.type || '';
        switch (equipType) {
            case '武器':
            case 'weapon':
                slot = 'weapon';
                break;
            case '胸甲':
            case '衣服':
            case 'chest':
                slot = 'chest';
                break;
            case '法宝':
            case 'artifact':
                slot = 'artifact';
                break;
            case '法器':
            case 'magic-weapon':
            case 'magicWeapon':
                slot = 'magicWeapon';
                break;
            case '头盔':
            case 'helmet':
                slot = 'helmet';
                break;
            case '戒指':
            case 'ring':
                slot = 'ring';
                break;
            case '护肩':
            case 'shoulder':
                slot = 'shoulder';
                break;
            case '护腿':
            case 'pants':
                slot = 'pants';
                break;
            case '战靴':
            case '靴子':
            case 'boots':
                slot = 'boots';
                break;
            default:
                // 尝试从装备名称推断类型
                const equipName = equipToCheck.name || '';
                if (equipName.includes('剑') || equipName.includes('刀') || equipName.includes('武器')) {
                    slot = 'weapon';
                } else if (equipName.includes('甲') || equipName.includes('衣服') || equipName.includes('胸')) {
                    slot = 'chest';
                } else if (equipName.includes('盔') || equipName.includes('帽') || equipName.includes('头')) {
                    slot = 'helmet';
                } else if (equipName.includes('戒指') || equipName.includes('环')) {
                    slot = 'ring';
                } else if (equipName.includes('护肩') || equipName.includes('肩')) {
                    slot = 'shoulder';
                } else if (equipName.includes('护腿') || equipName.includes('裤')) {
                    slot = 'pants';
                } else if (equipName.includes('靴') || equipName.includes('鞋')) {
                    slot = 'boots';
                } else if (equipName.includes('法宝') || equipName.includes('宝')) {
                    slot = 'artifact';
                } else if (equipName.includes('法器') || equipName.includes('器')) {
                    slot = 'magicWeapon';
                } else {
                    this.game.log('系统', '无法装备此物品', 'warning');
                    return;
                }
        }
        
        // 如果该槽位已有装备，先卸下
        if (this.game.player.equipment[slot]) {
            // 移除旧装备属性
            const currentEquip = this.game.player.equipment[slot];
            if (currentEquip) {
                this.removeEquipmentStats(currentEquip);
                this.game.addToInventory(currentEquip);
            }
        }
        
        // 装备新物品 - 存储装备对象
        this.game.player.equipment[slot] = equipToCheck;
        
        // 从背包中移除
        // 首先找到装备在原始装备背包中的索引
        let originalIndex = -1;
        for (let i = 0; i < this.game.player.equipmentBag.length; i++) {
            const bagItem = this.game.player.equipmentBag[i];
            if (bagItem && bagItem.name === equipToCheck.name && bagItem.type === equipToCheck.type) {
                originalIndex = i;
                break;
            }
        }
        
        if (originalIndex !== -1) {
            this.game.player.equipmentBag.splice(originalIndex, 1);
        } else if (index >= 0 && index < this.game.player.equipmentBag.length) {
            // 如果找不到，使用传入的索引
            this.game.player.equipmentBag.splice(index, 1);
        }
        
        // 清理装备背包中的undefined或null值
        this.game.player.equipmentBag = this.game.player.equipmentBag.filter(item => item !== undefined && item !== null);
        
        // 应用装备属性
        this.applyEquipmentStats(equipToCheck);
        
        this.game.log('系统', `装备 ${equipToCheck.name || '未知装备'} [${equipToCheck.quality || '普通'}]`, 'success');
        this.updateInventoryModal();
        this.updateAll();
    }

    // 应用装备属性
    applyEquipmentStats(equip) {
        // 处理装备的attrs属性
        if (equip.attrs) {
            for (const [attrName, value] of Object.entries(equip.attrs)) {
                switch (attrName) {
                    case 'hp':
                        this.game.player.maxHp += value;
                        this.game.player.hp += value;
                        break;
                    case 'mp':
                        this.game.player.maxMp += value;
                        this.game.player.mp += value;
                        break;
                    case 'atk':
                        this.game.player.attack += value;
                        break;
                    case 'def':
                        this.game.player.defense += value;
                        break;
                    case 'str':
                        this.game.player.strength += value;
                        break;
                    case 'con':
                        this.game.player.vitality += value;
                        break;
                    case 'int':
                        this.game.player.intelligence += value;
                        break;
                    case 'dex':
                        this.game.player.agility += value;
                        break;
                    case 'dodge':
                        // 闪避是百分比，需要特殊处理
                        break;
                    case 'crit':
                        // 暴击是百分比，需要特殊处理
                        break;
                    case 'luck':
                        this.game.player.luck += value;
                        break;
                }
            }
        }
        
        // 处理直接存储在装备对象上的属性（套装装备的属性）
        if (equip.attack) this.game.player.attack += equip.attack;
        if (equip.defense) this.game.player.defense += equip.defense;
        if (equip.hp) {
            this.game.player.maxHp += equip.hp;
            this.game.player.hp += equip.hp;
        }
        if (equip.mp) {
            this.game.player.maxMp += equip.mp;
            this.game.player.mp += equip.mp;
        }
        if (equip.strength) this.game.player.strength += equip.strength;
        if (equip.vitality) this.game.player.vitality += equip.vitality;
        if (equip.intelligence) this.game.player.intelligence += equip.intelligence;
        if (equip.agility) this.game.player.agility += equip.agility;
    }
    
    // 移除装备属性
    removeEquipmentStats(equip) {
        // 处理装备的attrs属性
        if (equip.attrs) {
            for (const [attrName, value] of Object.entries(equip.attrs)) {
                switch (attrName) {
                    case 'hp':
                        this.game.player.maxHp -= value;
                        this.game.player.hp -= value;
                        break;
                    case 'mp':
                        this.game.player.maxMp -= value;
                        this.game.player.mp -= value;
                        break;
                    case 'atk':
                        this.game.player.attack -= value;
                        break;
                    case 'def':
                        this.game.player.defense -= value;
                        break;
                    case 'str':
                        this.game.player.strength -= value;
                        break;
                    case 'con':
                        this.game.player.vitality -= value;
                        break;
                    case 'int':
                        this.game.player.intelligence -= value;
                        break;
                    case 'dex':
                        this.game.player.agility -= value;
                        break;
                    case 'luck':
                        this.game.player.luck -= value;
                        break;
                }
            }
        }
        
        // 处理直接存储在装备对象上的属性（套装装备的属性）
        if (equip.attack) this.game.player.attack -= equip.attack;
        if (equip.defense) this.game.player.defense -= equip.defense;
        if (equip.hp) {
            this.game.player.maxHp -= equip.hp;
            this.game.player.hp -= equip.hp;
        }
        if (equip.mp) {
            this.game.player.maxMp -= equip.mp;
            this.game.player.mp -= equip.mp;
        }
        if (equip.strength) this.game.player.strength -= equip.strength;
        if (equip.vitality) this.game.player.vitality -= equip.vitality;
        if (equip.intelligence) this.game.player.intelligence -= equip.intelligence;
        if (equip.agility) this.game.player.agility -= equip.agility;
    }

    checkForSave() {
        if (this.game.hasSaveGame()) {
            document.getElementById('continue-btn').style.display = 'inline-block';
        }
    }

    bindEvents() {
        document.getElementById('start-btn').addEventListener('click', () => this.showCharacterCreation());
        document.getElementById('continue-btn').addEventListener('click', () => this.continueGame());
        document.getElementById('next-step').addEventListener('click', () => this.nextStep());
        document.getElementById('prev-step').addEventListener('click', () => this.prevStep());
        document.getElementById('confirm-creation').addEventListener('click', () => this.confirmCreation());
        document.getElementById('reincarnate-btn').addEventListener('click', () => this.reincarnate());
        document.getElementById('save-btn').addEventListener('click', () => this.saveGame());
        document.getElementById('quit-btn').addEventListener('click', () => this.quitGame());
        document.getElementById('character-btn').addEventListener('click', () => this.showCharacterModal());
        document.getElementById('close-character-modal').addEventListener('click', () => this.closeCharacterModal());
        document.getElementById('map-btn').addEventListener('click', () => this.openMapModal());
        document.getElementById('inventory-btn').addEventListener('click', () => this.openInventoryModal());
        document.getElementById('close-map-modal').addEventListener('click', () => this.closeMapModal());
        document.getElementById('close-inventory-modal').addEventListener('click', () => this.closeInventoryModal());
        document.getElementById('map-modal').addEventListener('click', (e) => {
            if (e.target.id === 'map-modal') {
                this.closeMapModal();
            }
        });
        document.getElementById('inventory-modal').addEventListener('click', (e) => {
            if (e.target.id === 'inventory-modal') {
                this.closeInventoryModal();
            }
        });
        document.getElementById('confirm-character-btn').addEventListener('click', () => this.confirmAndStartGame());
        document.getElementById('back-to-creation-btn').addEventListener('click', () => this.backToCharacterCreation());
        document.getElementById('combat-heal-btn').addEventListener('click', () => this.useHealingItemInCombat('回春丹'));
        document.getElementById('combat-mana-btn').addEventListener('click', () => this.useHealingItemInCombat('聚灵散'));
        document.getElementById('adventure-accept-btn').addEventListener('click', () => this.acceptAdventure());
        document.getElementById('adventure-reject-btn').addEventListener('click', () => this.rejectAdventure());
        document.getElementById('skill-btn').addEventListener('click', () => this.openSkillModal());
        document.getElementById('close-skill-modal').addEventListener('click', () => this.closeSkillModal());
        document.getElementById('skill-modal').addEventListener('click', (e) => {
            if (e.target.id === 'skill-modal') {
                this.closeSkillModal();
            }
        });
        document.getElementById('close-shop-modal').addEventListener('click', () => this.closeShopModal());
        document.getElementById('shop-modal').addEventListener('click', (e) => {
            if (e.target.id === 'shop-modal') {
                this.closeShopModal();
            }
        });
        document.getElementById('close-breakthrough-modal').addEventListener('click', () => this.closeBreakthroughModal());
        document.getElementById('breakthrough-modal').addEventListener('click', (e) => {
            if (e.target.id === 'breakthrough-modal') {
                this.closeBreakthroughModal();
            }
        });
        
        // 添加NPC对话框点击空白处关闭功能
        document.getElementById('npc-dialog').addEventListener('click', (e) => {
            if (e.target.id === 'npc-dialog') {
                this.closeNpcDialog();
            }
        });

        document.getElementById('victory-continue-btn').addEventListener('click', () => {
            this.closeVictoryScreen();
            this.updateAll();
            const nextRealm = GAME_DATA.REALMS[this.game.player.realmIndex + 1];
            
            // 提取当前境界类型
            const currentRealmName = this.game.player.realm.name;
            const currentRealmTypeMatch = currentRealmName.match(/(炼气|筑基|金丹|元婴|化神)/);
            if (!currentRealmTypeMatch || !nextRealm) return;
            const currentRealmType = currentRealmTypeMatch[0];
            
            // 提取下一境界类型
            const nextRealmTypeMatch = nextRealm.name.match(/(炼气|筑基|金丹|元婴|化神)/);
            if (!nextRealmTypeMatch) return;
            const nextRealmType = nextRealmTypeMatch[0];
            
            // 只有当境界类型发生变化时才显示突破弹窗
            if (currentRealmType !== nextRealmType && this.game.player.cultivation >= nextRealm.cultivationNeeded && !this.game.breakthroughModalShown) {
                this.game.breakthroughModalShown = true;
                this.showBreakthroughPopup();
            }
        });
        document.getElementById('victory-screen').addEventListener('click', (e) => {
            if (e.target.id === 'victory-screen') {
                this.closeVictoryScreen();
                this.updateAll();
            }
        });
        
        document.getElementById('dungeon-btn').addEventListener('click', () => {
            this.showDungeonModal();
        });
        
        document.getElementById('acquaintance-btn').addEventListener('click', () => {
            this.openAcquaintanceModal();
        });
        
        document.getElementById('close-acquaintance-modal').addEventListener('click', () => {
            this.closeAcquaintanceModal();
        });
        
        document.getElementById('close-item-modal').addEventListener('click', () => this.closeItemModal());
        document.getElementById('close-alchemy-modal').addEventListener('click', () => this.closeAlchemyModal());
        document.getElementById('alchemy-modal').addEventListener('click', (e) => {
            if (e.target.id === 'alchemy-modal') {
                this.closeAlchemyModal();
            }
        });
        document.getElementById('item-modal').addEventListener('click', (e) => {
            if (e.target.id === 'item-modal') {
                this.closeItemModal();
            }
        });
        
        document.getElementById('acquaintance-modal').addEventListener('click', (e) => {
            if (e.target.id === 'acquaintance-modal') {
                this.closeAcquaintanceModal();
            }
        });
        
        document.getElementById('close-dungeon-modal').addEventListener('click', () => {
            document.getElementById('dungeon-modal').classList.add('hidden');
        });
        
        document.getElementById('dungeon-modal').addEventListener('click', (e) => {
            if (e.target.id === 'dungeon-modal') {
                document.getElementById('dungeon-modal').classList.add('hidden');
            }
        });
        
        document.getElementById('close-sanxiu-modal').addEventListener('click', () => {
            document.getElementById('sanxiu-modal').classList.add('hidden');
        });
        
        document.getElementById('sanxiu-modal').addEventListener('click', (e) => {
            if (e.target.id === 'sanxiu-modal') {
                document.getElementById('sanxiu-modal').classList.add('hidden');
            }
        });
        
        document.getElementById('close-quest-modal').addEventListener('click', () => {
            document.getElementById('quest-modal').classList.add('hidden');
        });
        
        document.getElementById('quest-modal').addEventListener('click', (e) => {
            if (e.target.id === 'quest-modal') {
                document.getElementById('quest-modal').classList.add('hidden');
            }
        });
        
        document.getElementById('close-story-modal').addEventListener('click', () => {
            document.getElementById('story-modal').classList.add('hidden');
        });
        
        document.getElementById('story-modal').addEventListener('click', (e) => {
            if (e.target.id === 'story-modal') {
                document.getElementById('story-modal').classList.add('hidden');
            }
        });
        
        document.getElementById('close-battle-reward').addEventListener('click', () => {
            this.closeBattleRewardModal();
        });
        
        document.getElementById('battle-reward-modal').addEventListener('click', (e) => {
            if (e.target.id === 'battle-reward-modal') {
                this.closeBattleRewardModal();
            }
        });
    }

    continueGame() {
        if (this.game.loadGame()) {
            document.getElementById('start-screen').classList.add('hidden');
            document.getElementById('game-controls').style.display = 'flex';
            document.getElementById('game-controls').style.gap = '10px';
            document.getElementById('sidebar-buttons').style.display = 'flex';
            this.startGame();
        }
    }

    showCharacterCreation() {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('character-creation').classList.remove('hidden');
        document.getElementById('player-name-input').value = '';
        this.currentStep = 1;
        this.selectedBirth = null;
        this.selectedNativePlace = null;
        this.selectedPersonality = null;
        
        document.querySelectorAll('.creation-steps .step').forEach(el => {
            el.classList.add('hidden');
            el.classList.remove('active');
        });
        document.querySelector('.creation-steps .step[data-step="1"]').classList.remove('hidden');
        document.querySelector('.creation-steps .step[data-step="1"]').classList.add('active');
        
        this.renderBirthOptions();
        this.updateStepUI();
    }

    renderBirthOptions() {
        const container = document.getElementById('birth-options');
        container.innerHTML = '';
        
        GAME_DATA.BIRTH_OPTIONS.forEach(birth => {
            const div = document.createElement('div');
            div.className = 'birth-option';
            div.dataset.id = birth.id;
            
            let typeLabel = '';
            if (birth.type === 'unlock') {
                typeLabel = '<span style="font-size: 12px; color: #f59e0b; display: block; margin-bottom: 5px;">🔒 需轮回解锁</span>';
            }
            
            div.innerHTML = `
                ${typeLabel}
                <h3>${birth.name}</h3>
                <p>${birth.description}</p>
            `;
            div.addEventListener('click', () => this.selectBirth(birth.id));
            container.appendChild(div);
        });
    }

    renderNativePlaceOptions() {
        const container = document.getElementById('native-place-options');
        container.innerHTML = '';
        
        GAME_DATA.NATIVE_PLACES.forEach(place => {
            const div = document.createElement('div');
            div.className = 'birth-option';
            div.dataset.id = place.id;
            div.innerHTML = `
                <h3>${place.name}</h3>
                <p>${place.description}</p>
            `;
            div.addEventListener('click', () => this.selectNativePlace(place.id));
            container.appendChild(div);
        });
    }

    renderPersonalityOptions() {
        const container = document.getElementById('personality-options');
        container.innerHTML = '';
        
        GAME_DATA.PERSONALITIES.forEach(personality => {
            const div = document.createElement('div');
            div.className = 'birth-option';
            div.dataset.id = personality.id;
            div.innerHTML = `
                <h3>${personality.name}</h3>
                <p>${personality.description}</p>
            `;
            div.addEventListener('click', () => this.selectPersonality(personality.id));
            container.appendChild(div);
        });
    }

    selectBirth(birthId) {
        document.querySelectorAll('#birth-options .birth-option').forEach(el => {
            el.classList.remove('selected');
        });
        document.querySelector(`#birth-options .birth-option[data-id="${birthId}"]`).classList.add('selected');
        this.selectedBirth = birthId;
        this.updateStepUI();
    }

    selectNativePlace(placeId) {
        document.querySelectorAll('#native-place-options .birth-option').forEach(el => {
            el.classList.remove('selected');
        });
        document.querySelector(`#native-place-options .birth-option[data-id="${placeId}"]`).classList.add('selected');
        this.selectedNativePlace = placeId;
        this.updateStepUI();
    }

    selectPersonality(personalityId) {
        document.querySelectorAll('#personality-options .birth-option').forEach(el => {
            el.classList.remove('selected');
        });
        document.querySelector(`#personality-options .birth-option[data-id="${personalityId}"]`).classList.add('selected');
        this.selectedPersonality = personalityId;
        this.updateStepUI();
    }

    nextStep() {
        if (this.currentStep === 1 && !this.selectedBirth) {
            alert('请先选择你的身世！');
            return;
        }
        if (this.currentStep === 2 && !this.selectedNativePlace) {
            alert('请先选择你的籍贯！');
            return;
        }
        
        this.currentStep++;
        
        if (this.currentStep === 2) {
            this.renderNativePlaceOptions();
        } else if (this.currentStep === 3) {
            this.renderPersonalityOptions();
        }
        
        this.updateStepUI();
    }

    prevStep() {
        this.currentStep--;
        this.updateStepUI();
    }

    updateStepUI() {
        document.querySelectorAll('.creation-steps .step').forEach(el => {
            el.classList.add('hidden');
            el.classList.remove('active');
        });
        document.querySelector(`.creation-steps .step[data-step="${this.currentStep}"]`).classList.remove('hidden');
        document.querySelector(`.creation-steps .step[data-step="${this.currentStep}"]`).classList.add('active');
        
        const prevBtn = document.getElementById('prev-step');
        const nextBtn = document.getElementById('next-step');
        const confirmBtn = document.getElementById('confirm-creation');
        
        prevBtn.style.display = this.currentStep > 1 ? 'inline-block' : 'none';
        nextBtn.style.display = this.currentStep < 3 ? 'inline-block' : 'none';
        confirmBtn.style.display = this.currentStep === 3 ? 'inline-block' : 'none';
        
        if (this.currentStep === 1) {
            nextBtn.disabled = !this.selectedBirth;
        } else if (this.currentStep === 2) {
            nextBtn.disabled = !this.selectedNativePlace;
        }
    }

    confirmCreation() {
        const playerName = document.getElementById('player-name-input').value.trim();
        
        if (!playerName) {
            alert('请输入你的名字！');
            return;
        }
        if (playerName.length < 2 || playerName.length > 10) {
            alert('名字长度应该在2-10个字符之间！');
            return;
        }
        if (!this.selectedBirth || !this.selectedNativePlace || !this.selectedPersonality) {
            alert('请完成所有选择！');
            return;
        }
        
        this.pendingPlayerName = playerName;
        this.pendingLingen = this.game.generateLingen();
        this.showCharacterConfirmation();
    }
    
    showCharacterConfirmation() {
        document.getElementById('character-creation').classList.add('hidden');
        document.getElementById('character-confirmation').classList.remove('hidden');
        this.renderCharacterPreview();
    }
    
    renderCharacterPreview() {
        const container = document.getElementById('character-stats-preview');
        
        const birth = GAME_DATA.BIRTH_OPTIONS.find(b => b.id === this.selectedBirth);
        const nativePlace = GAME_DATA.NATIVE_PLACES.find(n => n.id === this.selectedNativePlace);
        const personality = GAME_DATA.PERSONALITIES.find(p => p.id === this.selectedPersonality);
        
        const startRealm = GAME_DATA.REALMS[0];
        const lingen = this.pendingLingen;
        
        const hp = startRealm.hp + (birth.bonus.hp || 0);
        const mp = startRealm.mp + (birth.bonus.mp || 0);
        const attack = startRealm.attack + (birth.bonus.attack || 0) + (personality.bonus.combatDamage ? Math.floor(startRealm.attack * personality.bonus.combatDamage / 100) : 0);
        const defense = startRealm.defense + (birth.bonus.defense || 0) + (personality.bonus.defense || 0);
        const wisdom = 10 + (birth.bonus.wisdom || 0);
        const gold = 50 + (birth.bonus.gold || 0);
        
        container.innerHTML = `
            <div style="background: rgba(76, 29, 149, 0.3); padding: 20px; border-radius: 12px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h3 style="color: #fbbf24; font-size: 24px; margin-bottom: 5px;">${this.pendingPlayerName}</h3>
                    <div style="color: #9ca3af;">即将开启修仙之旅...</div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                    <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px;">
                        <div style="color: #9ca3af; font-size: 12px; margin-bottom: 5px;">境界</div>
                        <div style="color: #fbbf24; font-weight: bold;">${startRealm.name}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px;">
                        <div style="color: #9ca3af; font-size: 12px; margin-bottom: 5px;">灵根</div>
                        <div style="color: ${lingen.color}; font-weight: bold;">${lingen.name}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px;">
                        <div style="color: #9ca3af; font-size: 12px; margin-bottom: 5px;">身世</div>
                        <div style="color: #60a5fa; font-weight: bold;">${birth.name}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px;">
                        <div style="color: #9ca3af; font-size: 12px; margin-bottom: 5px;">籍贯</div>
                        <div style="color: #22c55e; font-weight: bold;">${nativePlace.name}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px;">
                        <div style="color: #9ca3af; font-size: 12px; margin-bottom: 5px;">性格</div>
                        <div style="color: #f59e0b; font-weight: bold;">${personality.name}</div>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px;">
                        <div style="color: #9ca3af; font-size: 12px; margin-bottom: 5px;">银两</div>
                        <div style="color: #fbbf24; font-weight: bold;">${gold}</div>
                    </div>
                </div>
                
                <div style="border-top: 2px solid #4c1d95; padding-top: 15px;">
                    <h4 style="color: #fbbf24; margin-bottom: 10px;">初始属性</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(34, 197, 94, 0.2); border-radius: 6px;">
                            <span style="color: #9ca3af;">气血</span>
                            <span style="color: #22c55e; font-weight: bold;">${hp}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(59, 130, 246, 0.2); border-radius: 6px;">
                            <span style="color: #9ca3af;">灵力</span>
                            <span style="color: #3b82f6; font-weight: bold;">${mp}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(239, 68, 68, 0.2); border-radius: 6px;">
                            <span style="color: #9ca3af;">攻击</span>
                            <span style="color: #ef4444; font-weight: bold;">${attack}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(139, 92, 246, 0.2); border-radius: 6px;">
                            <span style="color: #9ca3af;">防御</span>
                            <span style="color: #8b5cf6; font-weight: bold;">${defense}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: rgba(251, 191, 36, 0.2); border-radius: 6px; grid-column: 1 / -1;">
                            <span style="color: #9ca3af;">悟性</span>
                            <span style="color: #fbbf24; font-weight: bold;">${wisdom}</span>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 15px; padding: 12px; background: rgba(148, 163, 184, 0.1); border-radius: 8px;">
                    <div style="color: #9ca3af; font-size: 12px; margin-bottom: 5px;">灵根品级</div>
                    <div style="color: ${lingen.color}; font-size: 14px;">${lingen.grade} - ${lingen.description}</div>
                </div>
            </div>
        `;
    }
    
    confirmAndStartGame() {
        document.getElementById('character-confirmation').classList.add('hidden');
        this.game.createPlayer(this.selectedBirth, this.selectedNativePlace, this.selectedPersonality, this.pendingPlayerName, this.pendingLingen);
        this.startGame();
    }
    
    backToCharacterCreation() {
        document.getElementById('character-confirmation').classList.add('hidden');
        document.getElementById('character-creation').classList.remove('hidden');
    }

    startGame() {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('game-controls').style.display = 'flex';
        document.getElementById('game-controls').style.gap = '10px';
        document.getElementById('sidebar-buttons').style.display = 'flex';
        this.updateAll();
        
        // 显示初始剧情（只有未完成任务1时才显示）
        const completedQuests = this.game.player.completedQuests || [];
        const hasCompletedQuest1 = completedQuests.includes('qinglan-1');
        
        // 如果玩家没有完成任务1，说明是第一次进入游戏
        if (!hasCompletedQuest1) {
            const self = this;
            setTimeout(function() {
                self.showInitialStory();
            }, 1000);
        }
    }

    saveGame() {
        this.game.saveGame();
        this.updateMessageLog();
    }

    quitGame() {
        if (this.game.quitGame()) {
            document.getElementById('game-controls').style.display = 'none';
            document.getElementById('start-screen').classList.remove('hidden');
            this.checkForSave();
        }
    }

    reincarnate() {
        document.getElementById('death-screen').classList.add('hidden');
        this.game.reincarnate();
        this.showCharacterCreation();
    }

    updateAll() {
        this.updateTimeDisplay();
        this.updatePlayerStatsPanel();
        this.updateScene();
        this.updateAreaEntities();
        this.updateQuestPanel();
        this.updateMessageLog();
        
        if (this.game.justGainedCultivation) {
            this.game.justGainedCultivation = false;
            this.checkAndShowBreakthrough();
        }
    }
    
    checkAndShowBreakthrough() {
        const currentRealmName = this.game.player.realm.name;
        const isAt10Layers = currentRealmName.includes('10层');
        const nextRealm = GAME_DATA.REALMS[this.game.player.realmIndex + 1];
        
        // 提取当前境界类型
        const currentRealmTypeMatch = currentRealmName.match(/(炼气|筑基|金丹|元婴|化神)/);
        if (!currentRealmTypeMatch) return;
        const currentRealmType = currentRealmTypeMatch[0];
        
        // 提取下一境界类型
        if (!nextRealm) return;
        const nextRealmTypeMatch = nextRealm.name.match(/(炼气|筑基|金丹|元婴|化神)/);
        if (!nextRealmTypeMatch) return;
        const nextRealmType = nextRealmTypeMatch[0];
        
        // 只有当境界类型发生变化时才显示突破弹窗
        if (currentRealmType !== nextRealmType && isAt10Layers && this.game.player.cultivation >= nextRealm.cultivationNeeded && !this.game.breakthroughModalShown) {
            this.game.breakthroughModalShown = true;
            this.showBreakthroughPopup();
        }
    }
    
    updateQuestPanel() {
        const container = document.getElementById('quest-panel');
        container.innerHTML = '<h3>任务进度</h3>';
        
        const hasQuests = this.game.player && this.game.player.quests && this.game.player.quests.length > 0;
        const hasBountyQuests = this.game.player && this.game.player.bountyQuests && this.game.player.bountyQuests.length > 0;
        
        if (!hasQuests && !hasBountyQuests) {
            container.innerHTML += '<p style="color: #9ca3af; text-align: center; margin-top: 10px;">暂无任务</p>';
            return;
        }
        
        this.game.player.quests.forEach(quest => {
            // 先从QUESTS查找，再从QINGLAN_QUESTS查找
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
            
            const div = document.createElement('div');
            div.className = 'item-slot';
            div.style.marginBottom = '10px';
            
            // 计算任务目标总数和进度
            let totalCount = 1;
            let currentProgress = quest.progress || 0;
            let objectiveText = '';
            
            if (questData.objectives && questData.objectives.length > 0) {
                // 青岚村任务类型 - 有objectives数组
                totalCount = questData.objectives.reduce((sum, obj) => sum + obj.count, 0);
                const currentObjective = questData.objectives[0];
                if (currentObjective) {
                    const targetName = this.getObjectiveTargetName(currentObjective);
                    objectiveText = `${targetName}: ${currentProgress}/${currentObjective.count}`;
                }
            } else if (questData.count) {
                // 普通任务类型 - 有count字段
                totalCount = questData.count;
                objectiveText = `${currentProgress}/${totalCount}`;
            }
            
            const progressPercent = Math.min(100, (currentProgress / totalCount) * 100);
            const statusColor = quest.completed ? '#22c55e' : '#fbbf24';
            const statusText = quest.completed ? '已完成' : '进行中';
            
            // 构建任务目标描述
            let objectivesHtml = '';
            if (questData.objectives && questData.objectives.length > 0) {
                objectivesHtml = '<div style="margin-top: 6px; font-size: 12px; color: #9ca3af;">';
                objectivesHtml += '<strong>任务目标：</strong><br>';
                questData.objectives.forEach((obj, idx) => {
                    const targetName = this.getObjectiveTargetName(obj);
                    const objStatus = idx === 0 && currentProgress >= obj.count ? '✓' : (idx === 0 ? '○' : '○');
                    objectivesHtml += `<span style="color: ${idx === 0 ? '#fbbf24' : '#6b7280'};">${objStatus} ${targetName} (${obj.count})</span><br>`;
                });
                objectivesHtml += '</div>';
            }
            
            // 检查是否是守护任务
            const isGuardQuest = questData.type === 'guard';
            const canStartGuard = isGuardQuest && !quest.completed && this.isAtMountainGate();
            
            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <strong style="color: ${statusColor};">【${questData.name || questData.title}】</strong>
                    <button class="btn btn-danger abandon-quest-btn" data-quest-id="${quest.id}" style="padding: 2px 8px; font-size: 11px; margin-left: 8px;">放弃</button>
                </div>
                <br><small style="color: #d1d5db;">${questData.description}</small>
                ${objectivesHtml}
                <div style="margin-top: 8px;">
                    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                        <span style="color: #9ca3af;">进度</span>
                        <span style="color: #fbbf24;">${objectiveText}</span>
                    </div>
                    <div style="background: rgba(0,0,0,0.3); border-radius: 4px; height: 8px; overflow: hidden;">
                        <div style="background: linear-gradient(90deg, #3b82f6, #60a5fa); height: 100%; width: ${progressPercent}%;"></div>
                    </div>
                    <div style="margin-top: 4px; font-size: 12px; color: ${statusColor};">
                        状态：${statusText}
                    </div>
                </div>
                ${canStartGuard ? `<button class="btn btn-warning start-guard-btn" data-quest-id="${quest.id}" style="margin-top: 8px; width: 100%;">🛡️ 开始守护</button>` : ''}
            `;
            
            // 添加放弃按钮事件监听
            const abandonBtn = div.querySelector('.abandon-quest-btn');
            if (abandonBtn) {
                abandonBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const questId = abandonBtn.getAttribute('data-quest-id');
                    this.showAbandonQuestConfirm(questId, questData.name || questData.title);
                });
            }
            
            // 添加守护按钮事件监听
            const guardBtn = div.querySelector('.start-guard-btn');
            if (guardBtn) {
                guardBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const questId = guardBtn.getAttribute('data-quest-id');
                    this.startGuardMission(questId);
                });
            }
            
            container.appendChild(div);
        });
        
        // 显示悬赏任务
        const bountyQuests = this.game.player.bountyQuests || [];
        if (bountyQuests.length > 0) {
            const bountyHeader = document.createElement('h4');
            bountyHeader.style.color = '#f97316';
            bountyHeader.style.marginTop = '20px';
            bountyHeader.style.marginBottom = '10px';
            bountyHeader.style.borderBottom = '1px solid #f97316';
            bountyHeader.style.paddingBottom = '5px';
            bountyHeader.textContent = '📜 悬赏任务';
            container.appendChild(bountyHeader);
            
            bountyQuests.forEach(quest => {
                const div = document.createElement('div');
                div.className = 'item-slot';
                div.style.marginBottom = '10px';
                
                const totalCount = quest.targetCount;
                const currentProgress = quest.progress || 0;
                const progressPercent = Math.min(100, (currentProgress / totalCount) * 100);
                const statusColor = quest.completed ? '#22c55e' : '#fbbf24';
                const statusText = quest.completed ? '已完成' : '进行中';
                
                div.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <strong style="color: ${statusColor};">【${quest.title}】</strong>
                        <button class="btn btn-danger abandon-bounty-btn" data-quest-id="${quest.id}" style="padding: 2px 8px; font-size: 11px; margin-left: 8px;">放弃</button>
                    </div>
                    <br><small style="color: #d1d5db;">${quest.description}</small>
                    <div style="font-size: 12px; color: #9ca3af; margin-top: 6px;">
                        <strong>任务目标：</strong> ${quest.target} (${currentProgress}/${totalCount})<br>
                        <strong>地点：</strong> ${quest.dungeon}
                    </div>
                    <div style="margin-top: 8px;">
                        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                            <span style="color: #9ca3af;">进度</span>
                            <span style="color: #fbbf24;">${currentProgress}/${totalCount}</span>
                        </div>
                        <div style="background: rgba(0,0,0,0.3); border-radius: 4px; height: 8px; overflow: hidden;">
                            <div style="background: linear-gradient(90deg, #f97316, #fb923c); height: 100%; width: ${progressPercent}%;"></div>
                        </div>
                        <div style="margin-top: 4px; font-size: 12px; color: ${statusColor};">
                            状态：${statusText}
                        </div>
                    </div>
                    <div style="margin-top: 8px; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 4px; font-size: 11px;">
                        <div style="color: #fbbf24; margin-bottom: 3px;"><strong>奖励：</strong></div>
                        <div style="display: flex; flex-wrap: wrap; gap: 8px; color: #9ca3af;">
                            <span>💰 ${quest.rewards.silver}</span>
                            <span>⭐ ${quest.rewards.reputation}</span>
                            <span>📖 ${quest.rewards.cultivation}</span>
                            <span>💊 ${quest.rewards.pill}×${quest.rewards.pillCount}</span>
                        </div>
                    </div>
                `;
                
                // 添加放弃按钮事件监听
                const abandonBtn = div.querySelector('.abandon-bounty-btn');
                if (abandonBtn) {
                    abandonBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const questId = abandonBtn.getAttribute('data-quest-id');
                        this.showAbandonBountyConfirm(questId, quest.title);
                    });
                }
                
                container.appendChild(div);
            });
        }
    }
    
    // 检查是否在山门区域
    isAtMountainGate() {
        const currentArea = this.game.currentArea;
        if (!currentArea) return false;
        
        // 检查当前区域是否是门派山门区域
        const playerSect = this.game.player.sect;
        if (!playerSect) return false;
        
        // 获取门派ID
        let sectId = playerSect;
        if (typeof playerSect === 'object') {
            sectId = playerSect.id;
        }
        
        // 检查当前地图是否是该门派的地图
        const currentMap = this.game.currentMap;
        if (!currentMap) return false;
        
        // 检查当前区域是否是entrance区域（山门）
        const isEntrance = currentArea.npcs && currentArea.npcs.some(npcId => npcId.includes('-guard'));
        
        return isEntrance;
    }
    
    // 开始守护任务
    startGuardMission(questId) {
        const quest = this.game.player.quests.find(q => q.id === questId);
        if (!quest) return;
        
        // 查找任务数据
        let questData = null;
        for (const sect in GAME_DATA.SECT_QUESTS) {
            const sectQuests = GAME_DATA.SECT_QUESTS[sect];
            const foundQuest = sectQuests.find(q => q.id === questId);
            if (foundQuest) {
                questData = foundQuest;
                break;
            }
        }
        
        if (!questData || questData.type !== 'guard') return;
        
        // 显示守护开始提示
        this.game.log('系统', `开始守护任务：${questData.name || questData.title}，持续1分钟，期间可能会遭遇敌人袭击！`, 'warning');
        
        // 设置守护状态
        this.guardMission = {
            active: true,
            questId: questId,
            startTime: Date.now(),
            duration: 60000, // 1分钟
            battlesTriggered: 0,
            maxBattles: Math.floor(Math.random() * 2) + 1, // 随机1-2场战斗
            completed: false
        };
        
        // 开始守护计时器
        this.guardTimer = setInterval(() => {
            this.updateGuardMission();
        }, 1000);
        
        // 更新UI
        this.updateQuestPanel();
        this.showGuardProgressModal();
    }
    
    // 更新守护任务状态
    updateGuardMission() {
        if (!this.guardMission || !this.guardMission.active) return;
        
        const elapsed = Date.now() - this.guardMission.startTime;
        const remaining = Math.max(0, this.guardMission.duration - elapsed);
        
        // 检查是否需要触发战斗
        if (this.guardMission.battlesTriggered < this.guardMission.maxBattles) {
            // 随机触发战斗（在守护期间的随机时间点）
            const triggerChance = 0.02; // 每秒2%的概率触发战斗
            if (Math.random() < triggerChance && !this.game.inBattle) {
                this.triggerGuardBattle();
            }
        }
        
        // 更新守护进度弹窗
        this.updateGuardProgressModal(remaining);
        
        // 检查守护是否完成
        if (remaining <= 0 && !this.guardMission.completed) {
            this.completeGuardMission();
        }
    }
    
    // 触发守护战斗
    triggerGuardBattle() {
        if (!this.guardMission || !this.guardMission.active) return;
        
        this.guardMission.battlesTriggered++;
        
        // 生成与玩家当前境界相同的怪物
        const playerRealm = this.game.player.realm.name;
        const monster = this.generateRealmMonster(playerRealm);
        
        if (monster) {
            this.game.log('系统', `守护期间遭遇敌人袭击！${monster.name}出现了！`, 'combat');
            
            // 初始化战斗
            const success = this.game.initCombat(monster.id, 'wild');
            if (success) {
                this.showBattle();
            }
        }
    }
    
    // 根据玩家境界生成怪物
    generateRealmMonster(playerRealm) {
        // 根据玩家境界选择合适的怪物
        const realmMonsterMap = {
            '炼气期': ['wild-boar', 'gray-wolf', 'wild-dog'],
            '筑基期': ['tree-spirit', 'sparrow-demon', 'water-snake'],
            '金丹期': ['rock-golem', 'mountain-bandit', 'ghost-soldier'],
            '元婴期': ['demon-cultivator', 'ghost-general', 'tomb-guardian'],
            '化神期': ['demon-commander', 'tomb-guardian-general', 'ancient-beast'],
            '渡劫期': ['demon-king', 'ancient-dragon', 'celestial-being']
        };
        
        // 提取境界类型
        const realmType = playerRealm.match(/(炼气期|筑基期|金丹期|元婴期|化神期|渡劫期)/);
        if (!realmType) return null;
        
        const monsterIds = realmMonsterMap[realmType[0]] || realmMonsterMap['炼气期'];
        const randomMonsterId = monsterIds[Math.floor(Math.random() * monsterIds.length)];
        
        return GAME_DATA.MONSTERS[randomMonsterId];
    }
    
    // 完成守护任务
    completeGuardMission() {
        if (!this.guardMission || this.guardMission.completed) return;
        
        this.guardMission.completed = true;
        this.guardMission.active = false;
        
        // 清除计时器
        if (this.guardTimer) {
            clearInterval(this.guardTimer);
            this.guardTimer = null;
        }
        
        // 关闭守护进度弹窗
        this.hideGuardProgressModal();
        
        // 触发任务完成
        const questId = this.guardMission.questId;
        const quest = this.game.player.quests.find(q => q.id === questId);
        if (quest) {
            let questData = null;
            for (const sect in GAME_DATA.SECT_QUESTS) {
                const sectQuests = GAME_DATA.SECT_QUESTS[sect];
                const foundQuest = sectQuests.find(q => q.id === questId);
                if (foundQuest) {
                    questData = foundQuest;
                    break;
                }
            }
            
            if (questData) {
                this.game.log('系统', `守护任务完成！成功守护了${questData.target}！`, 'success');
                this.game.updateQuestProgress('guard_complete', questData.target);
            }
        }
        
        // 清理守护状态
        this.guardMission = null;
        
        // 更新UI
        this.updateQuestPanel();
    }
    
    // 显示守护进度弹窗
    showGuardProgressModal() {
        // 创建守护进度弹窗
        let modal = document.getElementById('guard-progress-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'guard-progress-modal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 400px;">
                    <div class="modal-header">
                        <h3>🛡️ 守护进行中</h3>
                    </div>
                    <div class="modal-body" style="text-align: center;">
                        <div style="font-size: 48px; margin: 20px 0;">🛡️</div>
                        <p style="color: #fbbf24; font-weight: bold; margin-bottom: 15px;">正在守护山门...</p>
                        <div style="font-size: 24px; color: #3b82f6; margin: 15px 0;" id="guard-timer">60秒</div>
                        <div style="background: rgba(0,0,0,0.3); border-radius: 8px; height: 12px; overflow: hidden; margin: 15px 0;">
                            <div id="guard-progress-bar" style="background: linear-gradient(90deg, #f59e0b, #fbbf24); height: 100%; width: 100%; transition: width 1s linear;"></div>
                        </div>
                        <p style="color: #9ca3af; font-size: 12px; margin-top: 10px;">期间可能会遭遇敌人袭击，请保持警惕！</p>
                        <p style="color: #ef4444; font-size: 12px; margin-top: 5px;" id="guard-battle-info"></p>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        
        modal.classList.remove('hidden');
    }
    
    // 更新守护进度弹窗
    updateGuardProgressModal(remaining) {
        const timerEl = document.getElementById('guard-timer');
        const progressBar = document.getElementById('guard-progress-bar');
        const battleInfo = document.getElementById('guard-battle-info');
        
        if (timerEl) {
            timerEl.textContent = `${Math.ceil(remaining / 1000)}秒`;
        }
        
        if (progressBar && this.guardMission) {
            const progress = (remaining / this.guardMission.duration) * 100;
            progressBar.style.width = `${progress}%`;
        }
        
        if (battleInfo && this.guardMission) {
            const battlesRemaining = this.guardMission.maxBattles - this.guardMission.battlesTriggered;
            if (battlesRemaining > 0) {
                battleInfo.textContent = `⚠️ 预计还有 ${battlesRemaining} 场战斗`;
            } else {
                battleInfo.textContent = '✓ 所有战斗已结束';
                battleInfo.style.color = '#22c55e';
            }
        }
    }
    
    // 隐藏守护进度弹窗
    hideGuardProgressModal() {
        const modal = document.getElementById('guard-progress-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    // 取消守护任务（战斗失败时调用）
    cancelGuardMission() {
        if (!this.guardMission) return;
        
        this.guardMission.active = false;
        this.guardMission.completed = false;
        
        // 清除计时器
        if (this.guardTimer) {
            clearInterval(this.guardTimer);
            this.guardTimer = null;
        }
        
        // 关闭守护进度弹窗
        this.hideGuardProgressModal();
        
        // 清理守护状态
        this.guardMission = null;
        
        // 更新UI
        this.updateQuestPanel();
    }
    
    getObjectiveTargetName(objective) {
        if (objective.type === 'talk') {
            const npc = GAME_DATA.NPCS[objective.target];
            return npc ? `与${npc.name}对话` : '对话';
        } else if (objective.type === 'kill') {
            const monster = GAME_DATA.MONSTERS[objective.target];
            return monster ? `击败${monster.name}` : '击败怪物';
        } else if (objective.type === 'travel') {
            const map = GAME_DATA.MAPS[objective.target];
            return map ? `前往${map.name}` : '前往目的地';
        }
        return objective.target || '完成任务';
    }
    
    showAbandonQuestConfirm(questId, questName) {
        // 显示放弃任务确认弹窗
        this.showStoryModal('确认放弃任务', `
            <h3 style="color: #ef4444; text-align: center; margin-bottom: 20px;">确认放弃任务</h3>
            <p style="margin-bottom: 15px;">你确定要放弃任务【${questName}】吗？</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">⚠️ 放弃后任务进度将重置，需要重新接取才能继续。</p>
        `, [
            {
                text: '确认放弃',
                className: 'btn-danger',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.abandonQuest(questId);
                }
            },
            {
                text: '取消',
                className: 'btn-secondary',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                }
            }
        ]);
    }
    
    abandonQuest(questId) {
        // 放弃任务
        const questIndex = this.game.player.quests.findIndex(q => q.id === questId);
        if (questIndex === -1) {
            this.game.log('系统', '任务不存在！', 'warning');
            return;
        }
        
        // 获取任务名称
        let questData = GAME_DATA.QUESTS[questId];
        if (!questData) {
            questData = GAME_DATA.QINGLAN_QUESTS[questId];
        }
        if (!questData) {
            // 检查门派任务
            for (const sect in GAME_DATA.SECT_QUESTS) {
                const sectQuests = GAME_DATA.SECT_QUESTS[sect];
                const foundQuest = sectQuests.find(q => q.id === questId);
                if (foundQuest) {
                    questData = foundQuest;
                    break;
                }
            }
        }
        const questName = questData ? (questData.name || questData.title) : questId;
        
        // 从任务列表中移除
        this.game.player.quests.splice(questIndex, 1);
        
        // 记录日志
        this.game.log('系统', `已放弃任务：【${questName}】`, 'info');
        
        // 更新任务面板
        this.updateQuestPanel();
    }
    
    showAbandonBountyConfirm(questId, questTitle) {
        // 显示放弃悬赏任务确认弹窗
        this.showStoryModal('确认放弃悬赏任务', `
            <h3 style="color: #ef4444; text-align: center; margin-bottom: 20px;">确认放弃悬赏任务</h3>
            <p style="margin-bottom: 15px;">你确定要放弃悬赏任务【${questTitle}】吗？</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">⚠️ 放弃后任务进度将重置，需要重新接取才能继续。</p>
        `, [
            {
                text: '确认放弃',
                className: 'btn-danger',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.abandonBountyQuest(questId);
                }
            },
            {
                text: '取消',
                className: 'btn-secondary',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                }
            }
        ]);
    }
    
    abandonBountyQuest(questId) {
        // 放弃悬赏任务
        const questIndex = this.game.player.bountyQuests.findIndex(q => q.id === questId);
        if (questIndex === -1) {
            this.game.log('系统', '悬赏任务不存在！', 'warning');
            return;
        }
        
        const quest = this.game.player.bountyQuests[questIndex];
        
        // 从悬赏任务列表中移除
        this.game.player.bountyQuests.splice(questIndex, 1);
        
        // 记录日志
        this.game.log('系统', `已放弃悬赏任务：【${quest.title}】`, 'info');
        
        // 更新任务面板
        this.updateQuestPanel();
    }

    updateTimeDisplay() {
        if (!this.game.timeSystem) return;
        
        const timeDisplay = this.game.getTimeDisplay();
        let karmaInfo = { name: '无', color: '#9ca3af' };
        
        if (this.game.player && this.game.player.karma !== undefined) {
            const karmaTier = this.game.getKarmaTier(this.game.player.karma);
            karmaInfo = GAME_DATA.KARMA_SYSTEM.tiers[karmaTier] || karmaInfo;
        }
        
        document.getElementById('time-display').innerHTML = `
            <div style="display: flex; gap: 20px; align-items: center;">
                <div style="color: #fbbf24; font-weight: bold;">
                    <span>${timeDisplay}</span>
                </div>
                <div style="color: ${karmaInfo.color || '#9ca3af'};">
                    <span>${karmaInfo.name}</span>
                </div>
            </div>
        `;
    }

    updatePlayerStatsPanel() {
        const player = this.game.player;
        if (!player) return;
        
        const totalStats = this.game.getPlayerTotalStats();
        const hpPercent = (player.hp / totalStats.maxHp) * 100;
        const mpPercent = (player.mp / totalStats.maxMp) * 100;
        const nextRealm = GAME_DATA.REALMS[player.realmIndex + 1];
        const cultivationPercent = nextRealm && nextRealm.cultivationNeeded !== Infinity
            ? (player.cultivation / nextRealm.cultivationNeeded) * 100 
            : 0;
        const karmaTier = this.game.getKarmaTier(player.karma);
        const karmaInfo = GAME_DATA.KARMA_SYSTEM.tiers[karmaTier];
        const canBreakthrough = this.game.canBreakthrough();
        
        const currentRealmName = player.realm.name;
        const isAt10Layers = currentRealmName.includes('10层');
        const hasEnoughCultivation = nextRealm && nextRealm.cultivationNeeded !== Infinity && player.cultivation >= nextRealm.cultivationNeeded;
        const needsBreakthroughHint = isAt10Layers && hasEnoughCultivation;
        
        let htmlContent = `
            <h3>${player.name}</h3>
            <div style="margin-bottom: 15px; padding: 10px; background: rgba(251, 191, 36, 0.1); border-radius: 8px;">
                <div style="color: #fbbf24; font-weight: bold; font-size: 16px;">${player.realm.name}</div>
                <div style="color: ${player.lingen.color}; margin-top: 5px;">${player.lingen.name}</div>
                <div style="color: #9ca3af; margin-top: 5px;">${player.sect ? `${player.sect.name} - ${player.sectPosition}` : '散修'}</div>
            </div>
            
            <div class="stat-bar" id="hp-bar">
                <label>气血:</label>
                <div class="bar"><div class="fill" style="width: ${hpPercent}%; background: linear-gradient(90deg, #22c55e, #16a34a);"></div></div>
                <span>${player.hp}/${totalStats.maxHp}</span>
            </div>
            <div class="stat-bar" id="mp-bar">
                <label>灵力:</label>
                <div class="bar"><div class="fill" style="width: ${mpPercent}%; background: linear-gradient(90deg, #3b82f6, #1d4ed8);"></div></div>
                <span>${player.mp}/${totalStats.maxMp}</span>
            </div>
            <div class="stat-bar" id="cultivation-bar">
                <label>修为:</label>
                <div class="bar"><div class="fill" style="width: ${Math.min(100, cultivationPercent)}%; background: linear-gradient(90deg, #f59e0b, #d97706);"></div></div>
                <span>${player.cultivation}${nextRealm && nextRealm.cultivationNeeded !== Infinity ? '/' + nextRealm.cultivationNeeded : ''}</span>
            </div>
            
            <div style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div style="padding: 10px; background: rgba(251, 191, 36, 0.2); border-radius: 6px; text-align: center;">
                    <div style="color: #9ca3af; font-size: 12px;">银两</div>
                    <div style="color: #fbbf24; font-weight: bold; font-size: 18px;">${player.gold}</div>
                </div>
                <div style="padding: 10px; background: rgba(59, 130, 246, 0.2); border-radius: 6px; text-align: center;">
                    <div style="color: #9ca3af; font-size: 12px;">门派贡献</div>
                    <div style="color: #3b82f6; font-weight: bold; font-size: 18px;">${player.contribution || 0}</div>
                </div>
                <div style="padding: 10px; background: rgba(16, 185, 129, 0.2); border-radius: 6px; text-align: center;">
                    <div style="color: #9ca3af; font-size: 12px;">声望</div>
                    <div style="color: #10b981; font-weight: bold; font-size: 18px;">${player.reputation || 0}</div>
                </div>
                <div style="padding: 10px; background: rgba(148, 163, 184, 0.2); border-radius: 6px; text-align: center;">
                    <div style="color: #9ca3af; font-size: 12px;">善恶</div>
                    <div style="color: ${karmaInfo.color}; font-weight: bold; font-size: 18px;">${karmaInfo.name}</div>
                </div>
            </div>
        `;
        
        if (needsBreakthroughHint) {
            const breakthroughMap = {
                '炼气': ['筑基丹'],
                '筑基': ['金丹突破丹'],
                '金丹': ['元婴突破丹'],
                '元婴': ['化神突破丹'],
                '化神': ['渡劫突破丹']
            };
            const realmType = currentRealmName.match(/(炼气|筑基|金丹|元婴|化神)/)[0];
            const neededItems = breakthroughMap[realmType];
            const hasItem = neededItems && player.inventory ? neededItems.some(item => player.inventory[item] && player.inventory[item] > 0) : false;
            
            htmlContent += `
                <div style="margin-top: 15px; padding: 10px; background: ${hasItem ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'} ;border-radius: 6px;">
                    <div style="color: ${hasItem ? '#22c55e' : '#ef4444'}; font-weight: bold;">
                        ${hasItem ? '✨ 可以突破！' : '⚠️ 需要突破丹！'}
                    </div>
                    <div style="color: #9ca3af; font-size: 12px; margin-top: 5px;">
                        需要：${neededItems ? neededItems.join(' 或 ') : '未知突破丹'} ${hasItem ? '(已拥有)' : '(未拥有)'}
                    </div>
                </div>
            `;
        }
        
        if (canBreakthrough) {
            htmlContent += `
                <button id="breakthrough-btn" class="btn btn-warning" style="width: 100%; margin-top: 15px;">
                    ⚡ 尝试突破
                </button>
            `;
        }
        
        document.getElementById('player-stats-panel').innerHTML = htmlContent;
        
        if (canBreakthrough) {
            setTimeout(() => {
                const btn = document.getElementById('breakthrough-btn');
                if (btn) {
                    btn.addEventListener('click', () => {
                        this.game.attemptBreakthrough();
                        this.updateAll();
                    });
                }
            }, 0);
        }
    }

    openMapModal() {
        this.updateMapModal();
        document.getElementById('map-modal').classList.remove('hidden');
    }

    closeMapModal() {
        document.getElementById('map-modal').classList.add('hidden');
    }

    updateMapModal() {
        const container = document.getElementById('map-modal-content');
        container.innerHTML = '';
        
        const worldLayers = GAME_DATA.WORLD_LAYERS;
        Object.entries(worldLayers).forEach(([layerId, layerInfo]) => {
            const layerDiv = document.createElement('div');
            layerDiv.style.marginBottom = '15px';
            layerDiv.innerHTML = `
                <h4 style="color: ${layerInfo.locked ? '#6b7280' : '#fbbf24'}; margin-bottom: 8px; font-size: 14px;">
                    ${layerInfo.locked ? '🔒 ' : ''}${layerInfo.name}
                </h4>
            `;
            
            if (layerInfo.regions) {
                Object.entries(layerInfo.regions).forEach(([regionId, regionInfo]) => {
                    const regionDiv = document.createElement('div');
                    regionDiv.style.marginBottom = '8px';
                    regionDiv.innerHTML = `
                        <div style="color: #60a5fa; font-weight: 500; margin-bottom: 5px; font-size: 13px;">
                            ${regionInfo.name}
                        </div>
                    `;
                    
                    if (regionInfo.subregions) {
                        regionInfo.subregions.forEach(mapId => {
                            const map = GAME_DATA.MAPS[mapId];
                            if (map) {
                                const div = document.createElement('div');
                                div.className = `map-location ${this.game.currentMap && this.game.currentMap.id === map.id ? 'current' : ''}`;
                                div.textContent = map.name;
                                div.style.borderLeft = `4px solid ${map.color}`;
                                div.style.padding = '6px 10px';
                                div.style.fontSize = '13px';
                                
                                if (this.game.currentMap && this.game.currentMap.connections.includes(map.id)) {
                                    div.addEventListener('click', () => {
                                        this.game.moveToMap(map.id);
                                        this.closeMapModal();
                                        this.updateAll();
                                        this.tryTriggerAdventure('travel');
                                    });
                                    div.style.cursor = 'pointer';
                                    div.style.opacity = '1';
                                } else if (this.game.currentMap && this.game.currentMap.id !== map.id) {
                                    div.style.opacity = '0.5';
                                }
                                
                                regionDiv.appendChild(div);
                            }
                        });
                    }
                    layerDiv.appendChild(regionDiv);
                });
            }
            container.appendChild(layerDiv);
        });
    }

    openInventoryModal() {
        this.updateInventoryModal();
        document.getElementById('inventory-modal').classList.remove('hidden');
    }

    closeInventoryModal() {
        document.getElementById('inventory-modal').classList.add('hidden');
    }
    
    openItemModal(item, quantity = 1, index = -1, bagType = '') {
        this.showItemDetails(item, quantity, index, bagType);
        document.getElementById('item-modal').classList.remove('hidden');
    }
    
    closeItemModal() {
        document.getElementById('item-modal').classList.add('hidden');
        this.currentContributionItem = null;
    }
    
    getItemIcon(itemType) {
        const icons = {
            'weapon': '⚔️',
            'armor': '🛡️',
            'chest': '👕',
            'helmet': '🪖',
            'ring': '💍',
            'shoulder': '💪',
            'pants': '👖',
            'boots': '👢',
            'artifact': '✨',
            'magicWeapon': '🔮',
            'magic-weapon': '🔮',
            'consumable': '🧪',
            'material': '📦',
            'currency': '💰',
            'misc': '📜'
        };
        return icons[itemType] || '📦';
    }
    
    getQualityName(quality) {
        const qualityMap = {
            'common': '白',
            'uncommon': '绿',
            'rare': '蓝',
            'epic': '紫',
            'legendary': '橙',
            'mythic': '橙',
            'white': '白',
            'green': '绿',
            'blue': '蓝',
            'purple': '紫',
            'orange': '橙'
        };
        if (typeof quality === 'string' && qualityMap[quality]) {
            return qualityMap[quality];
        }
        return quality || '白';
    }
    
    getTypeName(type) {
        const typeMap = {
            'weapon': '武器',
            'armor': '防具',
            'chest': '胸甲',
            'helmet': '头盔',
            'ring': '戒指',
            'shoulder': '护肩',
            'pants': '护腿',
            'boots': '战靴',
            'artifact': '法宝',
            'magicWeapon': '法器',
            'magic-weapon': '法器',
            'consumable': '消耗品',
            'material': '材料',
            'currency': '货币',
            'misc': '其他'
        };
        return typeMap[type] || type || '未知';
    }
    
    getSetName(setKey) {
        const setNameMap = {
            'liu jin': '鎏金套装',
            'lie yang': '烈阳套装',
            'zhen jin': '镇金套装',
            'jin que': '金阙套装',
            'qing lan': '青岚套装',
            'wan mu': '万木套装',
            'chang sheng': '长生套装',
            'ku rong': '枯荣套装',
            'ning shui': '凝水套装',
            'liu shuang': '流霜套装',
            'cang lan': '沧澜套装',
            'cang hai': '沧海套装',
            'chi yan': '赤焰套装',
            'fen tian': '焚天套装',
            'yan yu': '炎狱套装',
            'jiu tian': '九天套装',
            'huang tu': '黄土套装',
            'pan shi': '磐石套装',
            'zhen yue': '镇岳套装',
            'wan yue': '万岳套装',
            'shui yue': '水月套装',
            'shuang han': '霜寒套装',
            'shui jing': '水晶套装',
            'huang cheng': '皇城套装',
            'wu yue': '五岳套装',
            'xi mi': '须弥套装'
        };
        return setNameMap[setKey] || setKey;
    }
    
    getItemSource(itemName) {
        const sources = [];
        
        if (itemName === '完整守岚者玉佩') {
            sources.push('新手剧情任务奖励');
        } else {
            sources.push('商店购买');
            sources.push('怪物掉落');
            sources.push('秘境探险');
        }
        
        return sources;
    }
    
    getEquipSlot(item) {
        if (!item) return '';
        const itemName = item.name || '';
        const itemType = item.type || '';
        
        if (itemType === 'weapon' || itemName.includes('剑') || itemName.includes('刀') || 
            itemName.includes('枪') || itemName.includes('棍') || itemName.includes('琴') ||
            itemName.includes('珠') || itemName.includes('杖')) {
            return 'weapon';
        } else if (itemType === 'artifact' || itemName.includes('佩') || itemName.includes('玉') ||
                   itemName.includes('宝') || itemName.includes('印')) {
            return 'artifact';
        } else if (itemType === 'magicWeapon' || itemType === 'magic-weapon' || itemName.includes('器')) {
            return 'magicWeapon';
        } else if (itemType === 'helmet' || itemName.includes('盔') || itemName.includes('帽')) {
            return 'helmet';
        } else if (itemType === 'chest' || itemType === 'armor' || itemName.includes('甲') || itemName.includes('衣')) {
            return 'chest';
        } else if (itemType === 'shoulder' || itemName.includes('肩')) {
            return 'shoulder';
        } else if (itemType === 'pants' || itemName.includes('裤')) {
            return 'pants';
        } else if (itemType === 'boots' || itemName.includes('靴') || itemName.includes('鞋')) {
            return 'boots';
        } else if (itemType === 'ring' || itemName.includes('戒')) {
            return 'ring';
        }
        
        return '';
    }
    
    showItemDetails(item, quantity = 1, index = -1, bagType = '') {
        const title = document.getElementById('item-modal-title');
        const content = document.getElementById('item-modal-content');
        
        let itemData = item;
        let itemName = '';
        let isEquipment = false;
        const isShopModal = document.getElementById('shop-modal') && !document.getElementById('shop-modal').classList.contains('hidden');
        
        if (typeof item === 'string') {
            itemName = item;
            itemData = GAME_DATA.ITEMS[item] || { type: 'misc', rarity: 'common', description: '未知物品' };
        } else {
            itemName = item.name || item.itemName || item.item || '未知物品';
            isEquipment = true;
        }
        
        const quality = this.getQualityName(itemData.rarity || itemData.quality);
        const qualityColor = this.getQualityColor(quality);
        const typeName = this.getTypeName(itemData.type);
        const icon = this.getItemIcon(itemData.type);
        
        title.innerHTML = `<span style="color: ${qualityColor};">${icon} ${itemName}</span>`;
        
        let html = '<div style="display: flex; gap: 20px;">';
        
        let mainStatsHtml = '';
        let extraStatsHtml = '';
        
        if (isEquipment || itemData.type === 'weapon' || itemData.type === 'armor' || 
            itemData.type === 'artifact' || itemData.type === 'magicWeapon' || 
            itemData.type === 'magic-weapon' || itemData.type === 'helmet' || 
            itemData.type === 'chest' || itemData.type === 'shoulder' || 
            itemData.type === 'pants' || itemData.type === 'boots' || 
            itemData.type === 'ring') {
            
            let baseStats = '';
            let extraStats = '';
            
            const statNames = {
                'attack': '攻击',
                'magicDamage': '法攻',
                'defense': '防御',
                'magicDefense': '法防',
                'hp': '气血',
                'mp': '灵力',
                'strength': '力量',
                'vitality': '体质',
                'intelligence': '智力',
                'agility': '敏捷',
                'crit': '暴击',
                'critDmg': '暴击伤害',
                'speed': '速度',
                'dodge': '闪避',
                'regen': '回血',
                'burn': '灼烧',
                'atk': '攻击',
                'def': '防御',
                'str': '力量',
                'con': '体质',
                'int': '智力',
                'dex': '敏捷'
            };
            
            const directStats = ['attack', 'magicDamage', 'defense', 'magicDefense', 'hp', 'mp'];
            const attrStats = ['strength', 'vitality', 'intelligence', 'agility', 'crit', 'critDmg', 'speed', 'dodge', 'regen', 'burn'];
            
            directStats.forEach(stat => {
                if (itemData[stat]) {
                    baseStats += `<div style="display: flex; justify-content: space-between; padding: 4px 0;">
                        <span style="color: #9ca3af;">${statNames[stat] || stat}</span>
                        <span style="color: #60a5fa; font-weight: bold;">+${itemData[stat]}</span>
                    </div>`;
                }
            });
            
            attrStats.forEach(stat => {
                if (itemData[stat]) {
                    extraStats += `<div style="display: flex; justify-content: space-between; padding: 4px 0;">
                        <span style="color: #9ca3af;">${statNames[stat] || stat}</span>
                        <span style="color: #a78bfa; font-weight: bold;">+${itemData[stat]}</span>
                    </div>`;
                }
            });
            
            if (itemData.attrs && typeof itemData.attrs === 'object') {
                for (const [attrName, value] of Object.entries(itemData.attrs)) {
                    const attrDesc = GAME_DATA.EQUIPMENT?.equipBaseData?.attrDesc?.[attrName] || attrName;
                    if (directStats.includes(attrName) || ['atk', 'def', 'str', 'con', 'int', 'dex'].includes(attrName)) {
                        baseStats += `<div style="display: flex; justify-content: space-between; padding: 4px 0;">
                            <span style="color: #9ca3af;">${attrDesc}</span>
                            <span style="color: #60a5fa; font-weight: bold;">+${value}</span>
                        </div>`;
                    } else {
                        extraStats += `<div style="display: flex; justify-content: space-between; padding: 4px 0;">
                            <span style="color: #9ca3af;">${attrDesc}</span>
                            <span style="color: #a78bfa; font-weight: bold;">+${value}</span>
                        </div>`;
                    }
                }
            }
            
            mainStatsHtml = baseStats ? `<div style="margin-bottom: 15px;">
                <h4 style="color: #fbbf24; margin-bottom: 10px; font-size: 14px;">基础属性</h4>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px;">
                    ${baseStats}
                </div>
            </div>` : '';
            
            extraStatsHtml = extraStats ? `<div style="margin-bottom: 15px;">
                <h4 style="color: #a78bfa; margin-bottom: 10px; font-size: 14px;">追加属性</h4>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px;">
                    ${extraStats}
                </div>
            </div>` : '';
        }
        
        let setInfoHtml = '';
        if (itemData.set) {
            const setData = GAME_DATA.EQUIPMENT?.SETS?.[itemData.set];
            let setEffectHtml = '';
            if (setData && setData.effects) {
                setEffectHtml = '<div style="margin-top: 10px;">';
                for (const [count, effect] of Object.entries(setData.effects)) {
                    setEffectHtml += `<div style="padding: 5px 0; color: #60a5fa;">
                        <span style="color: #fbbf24;">[${count}件]</span> ${effect}
                    </div>`;
                }
                setEffectHtml += '</div>';
            }
            
            setInfoHtml = `<div style="margin-bottom: 15px;">
                <h4 style="color: #f97316; margin-bottom: 10px; font-size: 14px;">套装信息</h4>
                <div style="background: rgba(249, 115, 22, 0.1); padding: 10px; border-radius: 8px; border: 1px solid rgba(249, 115, 22, 0.3);">
                    <div style="color: #f97316; font-weight: bold; margin-bottom: 5px;">${this.getSetName(itemData.set) || '未知套装'}</div>
                    ${setEffectHtml}
                </div>
            </div>`;
        }
        
        html += `<div style="flex: 1;">
            <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="color: #9ca3af;">类型</span>
                    <span style="color: #d1d5db;">${typeName}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="color: #9ca3af;">品质</span>
                    <span style="color: ${qualityColor}; font-weight: bold;">[${quality}]</span>
                </div>
                ${itemData.realm ? `<div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="color: #9ca3af;">境界</span>
                    <span style="color: #d1d5db;">${itemData.realm}</span>
                </div>` : ''}
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #9ca3af;">数量</span>
                    <span style="color: #fbbf24; font-weight: bold;">x${quantity}</span>
                </div>
            </div>
            
            ${mainStatsHtml}
            ${extraStatsHtml}
            ${setInfoHtml}
            
            <div style="margin-bottom: 15px;">
                <h4 style="color: #34d399; margin-bottom: 10px; font-size: 14px;">物品介绍</h4>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; color: #d1d5db; line-height: 1.6;">
                    ${itemData.description || '暂无描述'}
                </div>
            </div>
            
            <div style="margin-bottom: 15px;">
                <h4 style="color: #60a5fa; margin-bottom: 10px; font-size: 14px;">获取途径</h4>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px;">
                    ${this.getItemSource(itemName).map(source => `<div style="padding: 3px 0; color: #d1d5db;">• ${source}</div>`).join('')}
                </div>
            </div>
        </div>`;
        
        let compareHtml = '';
        const slot = this.getEquipSlot(itemData);
        if (slot && this.game.player.equipment[slot]) {
            const equippedItem = this.game.player.equipment[slot];
            const eqQuality = this.getQualityName(equippedItem.rarity || equippedItem.quality);
            const eqQualityColor = this.getQualityColor(eqQuality);
            const eqTypeName = this.getTypeName(equippedItem.type);
            const eqIcon = this.getItemIcon(equippedItem.type);
            
            let eqStatsHtml = '';
            const statNames = {
                'attack': '攻击', 'magicDamage': '法攻', 'defense': '防御', 
                'magicDefense': '法防', 'hp': '气血', 'mp': '灵力',
                'strength': '力量', 'vitality': '体质', 'intelligence': '智力', 
                'agility': '敏捷', 'crit': '暴击', 'critDmg': '暴击伤害',
                'speed': '速度', 'dodge': '闪避', 'regen': '回血', 'burn': '灼烧',
                'atk': '攻击', 'def': '防御', 'str': '力量', 'con': '体质', 
                'int': '智力', 'dex': '敏捷'
            };
            
            const allStats = ['attack', 'magicDamage', 'defense', 'magicDefense', 'hp', 'mp', 
                             'strength', 'vitality', 'intelligence', 'agility', 'crit', 'critDmg',
                             'speed', 'dodge', 'regen', 'burn', 'atk', 'def', 'str', 'con', 'int', 'dex'];
            
            allStats.forEach(stat => {
                const newVal = itemData[stat] || (itemData.attrs && itemData.attrs[stat]) || 0;
                const oldVal = equippedItem[stat] || (equippedItem.attrs && equippedItem.attrs[stat]) || 0;
                
                if (newVal || oldVal) {
                    const diff = newVal - oldVal;
                    let diffColor = '#9ca3af';
                    let diffText = '';
                    if (diff > 0) {
                        diffColor = '#22c55e';
                        diffText = ` (+${diff})`;
                    } else if (diff < 0) {
                        diffColor = '#ef4444';
                        diffText = ` (${diff})`;
                    }
                    
                    eqStatsHtml += `<div style="display: flex; justify-content: space-between; padding: 4px 0;">
                        <span style="color: #9ca3af;">${statNames[stat] || stat}</span>
                        <span>
                            <span style="color: #d1d5db;">${oldVal}</span>
                            <span style="color: ${diffColor};">${diffText}</span>
                        </span>
                    </div>`;
                }
            });
            
            compareHtml = `<div style="flex: 1;">
                <div style="background: rgba(239, 68, 68, 0.1); padding: 10px; border-radius: 8px; border: 2px solid rgba(239, 68, 68, 0.3); margin-bottom: 15px;">
                    <div style="text-align: center; color: #ef4444; font-weight: bold; margin-bottom: 10px;">当前装备</div>
                    <div style="text-align: center; font-size: 24px; margin-bottom: 5px;">${eqIcon}</div>
                    <div style="text-align: center; color: ${eqQualityColor}; font-weight: bold;">${equippedItem.name || '未知'}</div>
                    <div style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 5px;">${eqTypeName} [${eqQuality}]</div>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px;">
                    <h4 style="color: #ef4444; margin-bottom: 10px; font-size: 14px; text-align: center;">属性对比</h4>
                    ${eqStatsHtml}
                </div>
            </div>`;
        }
        
        html += compareHtml;
        html += '</div>';
        
        let actionButtonsHtml = '<div style="display: flex; gap: 10px; margin-top: 20px; justify-content: center;">';
        
        if (isShopModal) {
            const buyTab = document.getElementById('shop-buy-tab');
            const isBuyTab = buyTab && buyTab.className.includes('btn-primary');
            
            if (this.currentContributionItem) {
                const cost = this.currentContributionItem.cost;
                const canBuy = this.game.player.contribution >= cost;
                actionButtonsHtml += `
                    <button class="btn btn-primary" id="contribution-buy-action-btn" style="padding: 10px 30px;" ${!canBuy ? 'disabled' : ''}>
                        ${canBuy ? '兑换' : '贡献不足'} (${cost} 贡献)
                    </button>
                `;
            } else if (isBuyTab) {
                const buyPrice = this.getPriceByRarity(itemData);
                const canBuy = this.game.player.gold >= buyPrice;
                actionButtonsHtml += `
                    <input type="number" id="shop-qty-input" value="1" min="1" max="${Math.floor(this.game.player.gold / buyPrice) || 1}" 
                           style="width: 80px; padding: 8px; border-radius: 6px; border: 1px solid #4b5563; background: #1f2937; color: #fbbf24; text-align: center;">
                    <button class="btn btn-primary" id="buy-action-btn" style="padding: 10px 30px;" ${!canBuy ? 'disabled' : ''}>
                        ${canBuy ? '购买' : '银两不足'}
                    </button>
                `;
            } else {
                if (bagType === 'equipment' && index >= 0) {
                    let sellPrice = 0;
                    const qualityMultiplier = {
                        '白': 1, '绿': 2, '蓝': 4, '紫': 8, '橙': 16
                    };
                    const basePrice = 50;
                    const quality = itemData.quality || '白';
                    const multiplier = qualityMultiplier[quality] || 1;
                    if (itemData.attrs) {
                        let attrValue = 0;
                        for (const [attrName, value] of Object.entries(itemData.attrs)) {
                            attrValue += value;
                        }
                        sellPrice = Math.floor((basePrice + attrValue * 5) * multiplier * 0.5);
                    } else {
                        sellPrice = Math.floor(basePrice * multiplier * 0.5);
                    }
                    actionButtonsHtml += `<button class="btn btn-success" id="sell-action-btn" style="padding: 10px 30px;">出售 (+${sellPrice} 银两)</button>`;
                } else if (typeof item === 'string') {
                    let sellPrice;
                    if (itemData.value) {
                        sellPrice = itemData.value;
                    } else {
                        const buyPrice = this.getPriceByRarity(itemData);
                        sellPrice = Math.floor(buyPrice * 0.5);
                    }
                    actionButtonsHtml += `
                        <input type="number" id="shop-qty-input" value="1" min="1" max="${quantity}" 
                               style="width: 80px; padding: 8px; border-radius: 6px; border: 1px solid #4b5563; background: #1f2937; color: #fbbf24; text-align: center;">
                        <button class="btn btn-success" id="sell-action-btn" style="padding: 10px 30px;">出售 (+${sellPrice} 银两/个)</button>
                    `;
                }
            }
        } else {
            if (isEquipment || itemData.type === 'weapon' || itemData.type === 'armor' || 
                itemData.type === 'artifact' || itemData.type === 'magicWeapon' || 
                itemData.type === 'magic-weapon' || itemData.type === 'helmet' || 
                itemData.type === 'chest' || itemData.type === 'shoulder' || 
                itemData.type === 'pants' || itemData.type === 'boots' || 
                itemData.type === 'ring') {
                actionButtonsHtml += `<button class="btn btn-success" id="equip-action-btn" style="padding: 10px 30px;">装备</button>`;
            } else if (itemData.type === 'consumable') {
                actionButtonsHtml += `<button class="btn btn-primary" id="use-action-btn" style="padding: 10px 30px;">使用</button>`;
            }
        }
        
        actionButtonsHtml += '<button class="btn btn-secondary" id="close-item-action-btn" style="padding: 10px 30px;">关闭</button>';
        actionButtonsHtml += '</div>';
        
        html += actionButtonsHtml;
        content.innerHTML = html;
        
        setTimeout(() => {
            const equipBtn = document.getElementById('equip-action-btn');
            if (equipBtn) {
                equipBtn.addEventListener('click', () => {
                    if (isEquipment && index >= 0 && bagType === 'equipment') {
                        this.equipItem(item, index);
                    } else if (typeof item === 'string') {
                        this.game.equipItem(item);
                    }
                    this.closeItemModal();
                    this.updateInventoryModal();
                    this.updateAll();
                });
            }
            
            const useBtn = document.getElementById('use-action-btn');
            if (useBtn && typeof item === 'string') {
                useBtn.addEventListener('click', () => {
                    this.game.useConsumableItem(item);
                    this.updateInventoryModal();
                    this.updateAll();
                    if (this.game.hasItem(item)) {
                        this.showItemDetails(item, bagType, index);
                    } else {
                        this.closeItemModal();
                    }
                });
            }
            
            const contributionBuyBtn = document.getElementById('contribution-buy-action-btn');
            if (contributionBuyBtn && this.currentContributionItem) {
                contributionBuyBtn.addEventListener('click', () => {
                    const itemId = this.currentContributionItem.id;
                    const cost = this.currentContributionItem.cost;
                    
                    if (this.game.player.contribution >= cost) {
                        this.game.player.contribution -= cost;
                        this.game.addToInventory(itemId);
                        this.game.log('系统', `使用${cost}贡献度兑换了${itemId}！`, 'success');
                        this.currentContributionItem = null;
                    }
                    this.closeItemModal();
                    let sect = this.game.player.sect;
                    if (sect && typeof sect === 'object') {
                        sect = sect.name;
                    }
                    this.showContributionShopModal(sect);
                    this.updateAll();
                });
            }
            
            const buyBtn = document.getElementById('buy-action-btn');
            if (buyBtn) {
                buyBtn.addEventListener('click', () => {
                    const qtyInput = document.getElementById('shop-qty-input');
                    const qty = parseInt(qtyInput.value) || 1;
                    if (typeof item === 'string') {
                        this.buyItem(item, qty);
                    }
                    this.closeItemModal();
                    this.updateShopModal();
                    this.updateAll();
                });
            }
            
            const sellBtn = document.getElementById('sell-action-btn');
            if (sellBtn) {
                sellBtn.addEventListener('click', () => {
                    if (bagType === 'equipment' && index >= 0) {
                        let sellPrice = 0;
                        const qualityMultiplier = {
                            '白': 1, '绿': 2, '蓝': 4, '紫': 8, '橙': 16
                        };
                        const basePrice = 50;
                        const quality = itemData.quality || '白';
                        const multiplier = qualityMultiplier[quality] || 1;
                        if (itemData.attrs) {
                            let attrValue = 0;
                            for (const [attrName, value] of Object.entries(itemData.attrs)) {
                                attrValue += value;
                            }
                            sellPrice = Math.floor((basePrice + attrValue * 5) * multiplier * 0.5);
                        } else {
                            sellPrice = Math.floor(basePrice * multiplier * 0.5);
                        }
                        this.sellEquipment(item, index, sellPrice);
                        this.closeItemModal();
                    } else if (typeof item === 'string') {
                        let sellPrice;
                        if (itemData.value) {
                            sellPrice = itemData.value;
                        } else {
                            const buyPrice = this.getPriceByRarity(itemData);
                            sellPrice = Math.floor(buyPrice * 0.5);
                        }
                        const qtyInput = document.getElementById('shop-qty-input');
                        const qty = parseInt(qtyInput.value) || 1;
                        this.sellItem(item, sellPrice, qty);
                        if (this.game.hasItem(item)) {
                            this.showItemDetails(item, bagType, index);
                        } else {
                            this.closeItemModal();
                        }
                    }
                    this.updateAll();
                });
            }
            
            const closeBtn = document.getElementById('close-item-action-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeItemModal());
            }
        }, 0);
    }
    
    openSkillModal() {
        this.updateSkillModal();
        document.getElementById('skill-modal').classList.remove('hidden');
    }
    
    closeSkillModal() {
        document.getElementById('skill-modal').classList.add('hidden');
    }
    
    showBattleRewardModal(rewards) {
        const content = document.getElementById('battle-reward-content');
        let html = '';
        
        if (!rewards) {
            rewards = { cultivation: 0, gold: 0, items: [] };
        }
        
        if (rewards.cultivation > 0) {
            html += `<div style="margin: 10px 0; padding: 10px; background: rgba(34, 197, 94, 0.1); border-radius: 8px;">
                <span style="color: #22c55e;">📖 修为: +${rewards.cultivation}</span>
            </div>`;
        }
        
        if (rewards.gold > 0) {
            html += `<div style="margin: 10px 0; padding: 10px; background: rgba(251, 191, 36, 0.1); border-radius: 8px;">
                <span style="color: #fbbf24;">💰 银两: +${rewards.gold}</span>
            </div>`;
        }
        
        if (rewards.items && rewards.items.length > 0) {
            html += `<div style="margin-top: 15px; font-weight: bold; color: #a78bfa;">🎁 获得物品:</div>`;
            rewards.items.forEach(item => {
                let itemName = '';
                try {
                    if (typeof item === 'object' && item !== null) {
                        if (item.isEquipment && item.item && item.item.name) {
                            // 装备对象
                            itemName = `${item.item.name} [${item.item.quality || '普通'}]`;
                        } else if (item.item) {
                            // 其他物品对象
                            itemName = item.item;
                        } else if (item.name) {
                            // 有name属性的对象
                            itemName = item.name + (item.quantity ? ` ×${item.quantity}` : '');
                        } else {
                            itemName = '未知物品';
                        }
                    } else if (typeof item === 'string') {
                        // 字符串物品
                        const itemData = GAME_DATA.ITEMS[item];
                        itemName = itemData ? itemData.name : item;
                    } else {
                        itemName = '未知物品';
                    }
                } catch (e) {
                    itemName = '未知物品';
                }
                html += `<div style="margin: 5px 0; padding: 8px; background: rgba(167, 139, 250, 0.1); border-radius: 6px;">
                    <span style="color: #a78bfa;">${itemName}</span>
                </div>`;
            });
        }
        
        if (!html) {
            html = '<div style="color: #94a3b8;">没有获得任何奖励</div>';
        }
        
        try {
            content.innerHTML = html;
            document.getElementById('battle-reward-modal').classList.remove('hidden');
        } catch (e) {
            console.error('显示奖励界面出错:', e);
            // 如果显示奖励界面失败，直接退出秘境
            if (this.game.inDungeon) {
                this.game.exitDungeon();
            }
        }
    }
    
    closeBattleRewardModal() {
        document.getElementById('battle-reward-modal').classList.add('hidden');
        // 如果在秘境中，关闭奖励界面后退出秘境
        if (this.game.inDungeon) {
            this.game.exitDungeon();
        }
    }
    
    openAcquaintanceModal() {
        this.updateAcquaintanceModal();
        document.getElementById('acquaintance-modal').classList.remove('hidden');
    }
    
    closeAcquaintanceModal() {
        document.getElementById('acquaintance-modal').classList.add('hidden');
    }
    
    updateAcquaintanceModal() {
        const container = document.getElementById('acquaintance-modal-content');
        container.innerHTML = '';
        
        if (!this.game.player || !this.game.player.npcRelations) {
            container.innerHTML = '<p style="color: #9ca3af; text-align: center; margin-top: 20px;">暂无认识的NPC</p>';
            return;
        }
        
        const npcRelations = this.game.player.npcRelations;
        const knownNPCs = Object.entries(npcRelations);
        
        if (knownNPCs.length === 0) {
            container.innerHTML = '<p style="color: #9ca3af; text-align: center; margin-top: 20px;">暂无认识的NPC</p>';
            return;
        }
        
        // 按好感度排序
        knownNPCs.sort((a, b) => b[1].favor - a[1].favor);
        
        knownNPCs.forEach(([npcId, relation]) => {
            const npc = GAME_DATA.NPCS[npcId];
            if (!npc) return;
            
            const div = document.createElement('div');
            div.style.marginBottom = '15px';
            div.style.padding = '12px';
            div.style.background = 'rgba(0, 0, 0, 0.3)';
            div.style.borderRadius = '8px';
            
            // 根据关系状态设置颜色
            let relationColor = '#9ca3af';
            let relationText = '陌生人';
            
            switch (relation.relation) {
                case 'intimate':
                    relationColor = '#ec4899';
                    relationText = '亲密';
                    break;
                case 'close':
                    relationColor = '#8b5cf6';
                    relationText = '亲近';
                    break;
                case 'friend':
                    relationColor = '#3b82f6';
                    relationText = '友好';
                    break;
                case 'stranger':
                    relationColor = '#9ca3af';
                    relationText = '陌生人';
                    break;
                case 'hostile':
                    relationColor = '#ef4444';
                    relationText = '敌对';
                    break;
            }
            
            // 计算好感度百分比（0-1000）
            const favorPercent = Math.min(100, (relation.favor / 1000) * 100);
            
            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <h4 style="color: #fbbf24; margin: 0;">${npc.name}</h4>
                    <span style="color: ${relationColor}; font-weight: bold;">${relationText}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="color: #9ca3af; font-size: 12px;">好感度</span>
                    <span style="color: #fbbf24; font-weight: bold;">${relation.favor}/1000</span>
                </div>
                <div style="background: rgba(0,0,0,0.3); border-radius: 4px; height: 8px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #3b82f6, #60a5fa); height: 100%; width: ${favorPercent}%;"></div>
                </div>
                <div style="margin-top: 8px; font-size: 12px; color: #9ca3af;">
                    所属门派：${npc.sect || '无'}
                </div>
            `;
            
            container.appendChild(div);
        });
    }
    
    openShopModal(shopId) {
        this.currentShopId = shopId;
        this.currentShopTab = 'buy';
        this.updateShopModal();
        document.getElementById('shop-modal').classList.remove('hidden');
    }
    
    closeShopModal() {
        document.getElementById('shop-modal').classList.add('hidden');
    }
    
    updateShopModal() {
        const shopId = this.currentShopId;
        const shop = GAME_DATA.SHOPS[shopId];
        
        if (!shop) return;
        
        document.getElementById('shop-title').textContent = shop.name;
        document.getElementById('shop-gold').textContent = `💰 ${this.game.player.gold} 银两`;
        document.getElementById('shop-description').textContent = shop.description;
        
        const container = document.getElementById('shop-modal-content');
        container.innerHTML = '';
        
        const tabDiv = document.createElement('div');
        tabDiv.style.cssText = 'display: flex; gap: 10px; margin-bottom: 20px;';
        tabDiv.innerHTML = `
            <button id="shop-buy-tab" class="btn ${this.currentShopTab === 'sell' ? 'btn-secondary' : 'btn-primary'}" style="flex: 1;">购买</button>
            <button id="shop-sell-tab" class="btn ${this.currentShopTab === 'sell' ? 'btn-primary' : 'btn-secondary'}" style="flex: 1;">出售</button>
        `;
        container.appendChild(tabDiv);
        
        const contentDiv = document.createElement('div');
        contentDiv.id = 'shop-tab-content';
        container.appendChild(contentDiv);
        
        if (this.currentShopTab === 'sell') {
            this.renderShopSellTab(contentDiv);
        } else {
            this.renderShopBuyTab(shop, contentDiv);
        }
        
        document.getElementById('shop-buy-tab').addEventListener('click', () => {
            this.currentShopTab = 'buy';
            document.getElementById('shop-buy-tab').className = 'btn btn-primary';
            document.getElementById('shop-sell-tab').className = 'btn btn-secondary';
            this.renderShopBuyTab(shop, contentDiv);
        });
        
        document.getElementById('shop-sell-tab').addEventListener('click', () => {
            this.currentShopTab = 'sell';
            document.getElementById('shop-buy-tab').className = 'btn btn-secondary';
            document.getElementById('shop-sell-tab').className = 'btn btn-primary';
            this.renderShopSellTab(contentDiv);
        });
    }
    
    getPriceByRarity(item) {
        const basePrice = item.price || 10;
        const rarityMultiplier = {
            common: 1,
            uncommon: 2,
            rare: 5,
            epic: 15,
            legendary: 50,
            mythic: 200
        };
        
        if (item.price) {
            return item.price;
        }
        
        return basePrice * (rarityMultiplier[item.rarity] || 1);
    }
    
    renderShopBuyTab(shop, container) {
        container.innerHTML = '';
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
        container.style.gap = '10px';
        
        shop.items.forEach(itemName => {
            const item = GAME_DATA.ITEMS[itemName];
            if (!item) return;
            
            const buyPrice = this.getPriceByRarity(item);
            const maxAffordable = Math.floor(this.game.player.gold / buyPrice);
            const canBuy = this.game.player.gold >= buyPrice;
            
            const div = document.createElement('div');
            div.className = 'item-slot';
            div.style.cssText = 'padding: 10px; cursor: pointer; text-align: center;';
            
            const itemQuality = this.getQualityName(item.rarity || item.quality);
            const icon = this.getItemIcon(item.type);
            const isContributionShop = shop.useContribution;
            const priceText = isContributionShop ? `${buyPrice} 贡献` : `${buyPrice} 银两`;
            const priceColor = isContributionShop ? '#3b82f6' : '#fbbf24';
            
            div.innerHTML = `
                <div style="font-size: 28px; margin-bottom: 5px;">${icon}</div>
                <div style="color: ${this.getQualityColor(itemQuality)}; font-weight: bold; font-size: 12px; margin-bottom: 3px;">${item.name || itemName}</div>
                <div style="color: ${priceColor}; font-size: 11px; font-weight: bold; margin-bottom: 3px;">${priceText}</div>
                <div style="color: #9ca3af; font-size: 10px;">[${itemQuality}]</div>
            `;
            
            div.addEventListener('click', () => {
                this.openItemModal(itemName, 1);
            });
            
            container.appendChild(div);
        });
    }
    
    renderShopSellTab(container) {
        container.innerHTML = '';
        
        const sellAllDiv = document.createElement('div');
        sellAllDiv.style.cssText = 'grid-column: 1/-1; margin-bottom: 15px; text-align: center;';
        sellAllDiv.innerHTML = `<button id="sell-all-btn" class="btn btn-danger" style="padding: 10px 40px;">全部出售</button>`;
        container.appendChild(sellAllDiv);
        
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
        container.style.gap = '10px';
        
        const inventory = this.game.player.inventory || {};
        const equipmentBag = this.game.player.equipmentBag || [];
        const bookBag = this.game.player.bookBag || [];
        const items = Object.entries(inventory);
        
        let hasItems = items.length > 0 || equipmentBag.length > 0 || bookBag.length > 0;
        
        if (!hasItems) {
            container.innerHTML = '<p style="color: #9ca3af; text-align: center; grid-column: 1/-1;">背包是空的，没有东西可以卖</p>';
            return;
        }
        
        // 渲染普通物品
        items.forEach(([itemName, quantity]) => {
            const item = GAME_DATA.ITEMS[itemName];
            if (!item) return;
            
            let sellPrice;
            if (item.value) {
                sellPrice = item.value;
            } else {
                const buyPrice = this.getPriceByRarity(item);
                sellPrice = Math.floor(buyPrice * 0.5);
            }
            
            const div = document.createElement('div');
            div.className = 'item-slot';
            div.style.cssText = 'padding: 10px; cursor: pointer; text-align: center;';
            
            const itemQuality = this.getQualityName(item.rarity || item.quality);
            const icon = this.getItemIcon(item.type);
            
            div.innerHTML = `
                <div style="font-size: 28px; margin-bottom: 5px;">${icon}</div>
                <div style="color: ${this.getQualityColor(itemQuality)}; font-weight: bold; font-size: 12px; margin-bottom: 3px;">${itemName}</div>
                <div style="color: #fbbf24; font-size: 11px; font-weight: bold; margin-bottom: 3px;">x${quantity}</div>
                <div style="color: #22c55e; font-size: 11px; font-weight: bold; margin-bottom: 3px;">+${sellPrice} 银两/个</div>
                <div style="color: #9ca3af; font-size: 10px;">[${itemQuality}]</div>
            `;
            
            div.addEventListener('click', () => {
                this.openItemModal(itemName, quantity);
            });
            
            container.appendChild(div);
        });
        
        // 渲染功法书籍
        bookBag.forEach((bookId, index) => {
            const book = this.game.findBookById(bookId);
            if (!book) return;
            
            // 计算功法出售价格
            const qualityPriceMap = {
                '白': 50,
                '绿': 150,
                '蓝': 400,
                '紫': 1000,
                '橙': 2500
            };
            
            const sellPrice = Math.floor((qualityPriceMap[book.quality] || 50) * 0.5);
            
            const div = document.createElement('div');
            div.className = 'item-slot';
            div.style.cssText = 'padding: 10px; cursor: pointer; text-align: center;';
            
            div.innerHTML = `
                <div style="font-size: 28px; margin-bottom: 5px;">📚</div>
                <div style="color: ${this.getQualityColor(book.quality)}; font-weight: bold; font-size: 12px; margin-bottom: 3px;">${book.name}</div>
                <div style="color: #22c55e; font-size: 11px; font-weight: bold; margin-bottom: 3px;">+${sellPrice} 银两</div>
                <div style="color: #9ca3af; font-size: 10px;">[${book.quality}]</div>
            `;
            
            div.addEventListener('click', () => {
                this.showStoryModal('功法信息', `
                    <div style="text-align: center;">
                        <h3 style="color: ${this.getQualityColor(book.quality)}; margin-bottom: 15px;">${book.name}</h3>
                        <p style="color: #9ca3af; margin-bottom: 15px;">${book.description || '功法书籍'}</p>
                        <p style="color: #fbbf24; margin-bottom: 20px;">出售价格：${sellPrice} 银两</p>
                        <div style="display: flex; gap: 10px; justify-content: center;">
                            <button class="btn btn-success" id="sell-book-confirm">出售</button>
                            <button class="btn btn-secondary" id="sell-book-cancel">取消</button>
                        </div>
                    </div>
                `);
                
                setTimeout(() => {
                    document.getElementById('sell-book-confirm')?.addEventListener('click', () => {
                        this.closeStoryModal();
                        this.sellBook(bookId, index, sellPrice);
                    });
                    document.getElementById('sell-book-cancel')?.addEventListener('click', () => {
                        this.closeStoryModal();
                    });
                }, 0);
            });
            
            container.appendChild(div);
        });
        
        // 渲染装备
        equipmentBag.forEach((equip, index) => {
            if (!equip) return;
            
            // 计算装备出售价格
            let sellPrice = 0;
            const qualityMultiplier = {
                '白': 1,
                '绿': 2,
                '蓝': 4,
                '紫': 8,
                '橙': 16
            };
            
            const basePrice = 50;
            const quality = equip.quality || '白';
            const multiplier = qualityMultiplier[quality] || 1;
            
            if (equip.attrs) {
                let attrValue = 0;
                for (const [attrName, value] of Object.entries(equip.attrs)) {
                    attrValue += value;
                }
                sellPrice = Math.floor((basePrice + attrValue * 5) * multiplier * 0.5);
            } else {
                sellPrice = Math.floor(basePrice * multiplier * 0.5);
            }
            
            const div = document.createElement('div');
            div.className = 'item-slot';
            div.style.cssText = 'padding: 10px; cursor: pointer; text-align: center;';
            
            const equipQuality = this.getQualityName(quality);
            const icon = this.getItemIcon(equip.type);
            
            div.innerHTML = `
                <div style="font-size: 28px; margin-bottom: 5px;">${icon}</div>
                <div style="color: ${this.getQualityColor(equipQuality)}; font-weight: bold; font-size: 12px; margin-bottom: 3px;">${equip.name || '未知装备'}</div>
                <div style="color: #22c55e; font-size: 11px; font-weight: bold; margin-bottom: 3px;">+${sellPrice} 银两</div>
                <div style="color: #9ca3af; font-size: 10px;">[${equipQuality}]</div>
            `;
            
            div.addEventListener('click', () => {
                this.openItemModal(equip, 1, index, 'equipment');
            });
            
            container.appendChild(div);
        });
        
        setTimeout(() => {
            const sellAllBtn = document.getElementById('sell-all-btn');
            if (sellAllBtn) {
                sellAllBtn.addEventListener('click', () => {
                    this.sellAllItems();
                });
            }
        }, 0);
    }
    
    sellBook(bookId, index, sellPrice) {
        const bookBag = this.game.player.bookBag;
        if (!bookBag || index < 0 || index >= bookBag.length) {
            return;
        }
        
        // 从功法背包中移除
        bookBag.splice(index, 1);
        
        // 增加银两
        this.game.player.gold += sellPrice;
        
        const book = this.game.findBookById(bookId);
        this.game.log('商店', `出售了${book ? book.name : '功法'}，获得${sellPrice}银两！`, 'success');
        
        // 保持在出售页面
        const contentDiv = document.getElementById('shop-tab-content');
        this.renderShopSellTab(contentDiv);
        
        this.updateAll();
    }
    
    sellAllItems() {
        let totalGold = 0;
        const inventory = this.game.player.inventory || {};
        const equipmentBag = this.game.player.equipmentBag || [];
        const bookBag = this.game.player.bookBag || [];
        
        const items = Object.entries(inventory);
        items.forEach(([itemName, quantity]) => {
            const item = GAME_DATA.ITEMS[itemName];
            if (!item) return;
            
            let sellPrice;
            if (item.value) {
                sellPrice = item.value;
            } else {
                const buyPrice = this.getPriceByRarity(item);
                sellPrice = Math.floor(buyPrice * 0.5);
            }
            
            const totalPrice = sellPrice * quantity;
            totalGold += totalPrice;
        });
        
        equipmentBag.forEach((equip) => {
            if (!equip) return;
            
            let sellPrice = 0;
            const qualityMultiplier = {
                '白': 1, '绿': 2, '蓝': 4, '紫': 8, '橙': 16
            };
            const basePrice = 50;
            const quality = equip.quality || '白';
            const multiplier = qualityMultiplier[quality] || 1;
            
            if (equip.attrs) {
                let attrValue = 0;
                for (const [attrName, value] of Object.entries(equip.attrs)) {
                    attrValue += value;
                }
                sellPrice = Math.floor((basePrice + attrValue * 5) * multiplier * 0.5);
            } else {
                sellPrice = Math.floor(basePrice * multiplier * 0.5);
            }
            
            totalGold += sellPrice;
        });
        
        bookBag.forEach((bookId) => {
            const book = this.game.findBookById(bookId);
            if (!book) return;
            
            const qualityPriceMap = {
                '白': 50, '绿': 150, '蓝': 400, '紫': 1000, '橙': 2500
            };
            const sellPrice = Math.floor((qualityPriceMap[book.quality] || 50) * 0.5);
            totalGold += sellPrice;
        });
        
        this.game.player.inventory = {};
        this.game.player.equipmentBag = [];
        this.game.player.bookBag = [];
        this.game.player.gold += totalGold;
        
        this.game.log('商店', `全部出售完成，获得${totalGold}银两！`, 'success');
        
        const contentDiv = document.getElementById('shop-tab-content');
        this.renderShopSellTab(contentDiv);
        this.updateAll();
    }
    
    sellItem(itemName, sellPrice, quantity = 1) {
        const inventory = this.game.player.inventory;
        if (!inventory[itemName] || inventory[itemName] <= 0) {
            return;
        }
        
        const actualQty = Math.min(quantity, inventory[itemName]);
        const totalPrice = sellPrice * actualQty;
        
        inventory[itemName] -= actualQty;
        if (inventory[itemName] <= 0) {
            delete inventory[itemName];
        }
        
        this.game.player.gold += totalPrice;
        
        if (actualQty > 1) {
            this.game.log('商店', `出售了${actualQty}个${itemName}，获得${totalPrice}银两！`, 'success');
        } else {
            this.game.log('商店', `出售了${itemName}，获得${totalPrice}银两！`, 'success');
        }
        
        this.currentShopTab = 'sell';
        const contentDiv = document.getElementById('shop-tab-content');
        this.renderShopSellTab(contentDiv);
        
        this.updateAll();
    }
    
    // 出售装备
    sellEquipment(equip, index, sellPrice) {
        if (!equip || index < 0 || index >= this.game.player.equipmentBag.length) {
            return;
        }
        
        // 从装备背包中移除装备
        this.game.player.equipmentBag.splice(index, 1);
        
        // 清理装备背包中的undefined或null值
        this.game.player.equipmentBag = this.game.player.equipmentBag.filter(item => item !== undefined && item !== null);
        
        // 增加银两
        this.game.player.gold += sellPrice;
        
        this.game.log('商店', `出售了${equip.name || '未知装备'}，获得${sellPrice}银两！`, 'success');
        
        // 保持在出售页面
        this.currentShopTab = 'sell';
        const contentDiv = document.getElementById('shop-tab-content');
        this.renderShopSellTab(contentDiv);
        
        this.updateAll();
    }
    
    buyItem(itemName, quantity = 1) {
        const item = GAME_DATA.ITEMS[itemName];
        if (!item) return;
        
        const buyPrice = this.getPriceByRarity(item);
        const totalPrice = buyPrice * quantity;
        
        if (this.game.player.gold < totalPrice) {
            this.game.log('商店', '银两不足！', 'combat');
            return;
        }
        
        if (item.sectExclusive) {
            if (!this.game.player.sect || this.game.player.sect.id !== item.sectExclusive) {
                this.game.log('商店', '这是门派专属道具，只有该门派弟子才能购买！', 'combat');
                return;
            }
        }
        
        this.game.player.gold -= totalPrice;
        
        for (let i = 0; i < quantity; i++) {
            this.game.addToInventory(itemName);
        }
        
        if (quantity > 1) {
            this.game.log('商店', `购买了${quantity}个${itemName}！`, 'success');
        } else {
            this.game.log('商店', `购买了${itemName}！`, 'success');
        }
        
        this.updateShopModal();
        this.updateAll();
    }
    
    updateSkillModal() {
        const container = document.getElementById('skill-modal-content');
        container.innerHTML = '';
        
        console.log('=== updateSkillModal 开始 ===');
        console.log('玩家原始skills数组:', this.game.player.skills);
        
        const allSkills = this.game.getAvailableSkills();
        const activeSkills = allSkills.filter(skill => skill.type !== 'passive');
        const passiveSkills = [];
        const addedSkills = new Set();
        
        // 添加散修被动技能
        if (this.game.player.sanxiuPassiveSkills) {
            this.game.player.sanxiuPassiveSkills.forEach(skillName => {
                if (!addedSkills.has(skillName)) {
                    passiveSkills.push(skillName);
                    addedSkills.add(skillName);
                }
            });
        }
        
        // 提取门派被动技能
        if (this.game.player.skills) {
            this.game.player.skills.forEach(skillName => {
                const skill = GAME_DATA.SKILLS[skillName];
                if (skill && skill.type === 'passive' && !addedSkills.has(skillName)) {
                    passiveSkills.push(skillName);
                    addedSkills.add(skillName);
                }
            });
        }
        
        // 提取已学习的功法
        const learnedBooks = this.game.player.learnedBooks || [];
        
        if (activeSkills.length === 0 && passiveSkills.length === 0 && learnedBooks.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #9ca3af;">还没有学会任何技能</div>';
            return;
        }
        
        if (activeSkills.length > 0) {
            const activeHeader = document.createElement('h3');
            activeHeader.style.cssText = 'color: #fbbf24; margin-bottom: 10px; font-size: 16px;';
            activeHeader.textContent = '主动技能';
            container.appendChild(activeHeader);
            
            activeSkills.forEach(skill => {
                const div = document.createElement('div');
                div.className = 'item-slot';
                div.style.marginBottom = '8px';
                div.style.padding = '10px';
                
                const typeColors = {
                    attack: '#ef4444',
                    heal: '#22c55e',
                    defense: '#3b82f6',
                    control: '#a855f7'
                };
                
                let skillDetails = '';
                if (skill.damage) skillDetails += `<span style="color: #ef4444;">伤害+${skill.damage}</span> `;
                if (skill.heal) skillDetails += `<span style="color: #22c55e;">治疗+${skill.heal}</span> `;
                if (skill.defenseBonus) skillDetails += `<span style="color: #3b82f6;">防御+${skill.defenseBonus}</span> `;
                if (skill.cooldown) skillDetails += `<span style="color: #6b7280;">冷却: ${skill.cooldown}回合</span> `;
                
                div.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                        <strong style="color: ${typeColors[skill.type] || '#fbbf24'}; font-size: 14px;">${skill.name}</strong>
                        <span style="color: #6b7280; font-size: 11px;">
                            ${skill.type === 'attack' ? '攻击' : 
                              skill.type === 'heal' ? '治疗' : 
                              skill.type === 'defense' ? '防御' : 
                              skill.type === 'control' ? '控制' : '技能'}
                        </span>
                    </div>
                    <small style="color: #9ca3af; font-size: 12px; margin-bottom: 5px; display: block;">${skill.description || '暂无描述'}</small>
                    <div style="margin-top: 5px; font-size: 11px;">
                        ${skill.manaCost ? `<span style="color: #60a5fa;">消耗灵力: ${skill.manaCost}</span> ` : ''}
                        ${skillDetails}
                    </div>
                `;
                container.appendChild(div);
            });
        }
        
        if (passiveSkills.length > 0) {
            const passiveHeader = document.createElement('h3');
            passiveHeader.style.cssText = 'color: #a78bfa; margin-top: 15px; margin-bottom: 10px; font-size: 16px;';
            passiveHeader.textContent = '被动技能';
            container.appendChild(passiveHeader);
            
            passiveSkills.forEach(passiveId => {
                let passive;
                if (GAME_DATA.SANXIU_PASSIVE_SKILLS[passiveId]) {
                    passive = GAME_DATA.SANXIU_PASSIVE_SKILLS[passiveId];
                } else if (GAME_DATA.SKILLS[passiveId]) {
                    passive = GAME_DATA.SKILLS[passiveId];
                } else {
                    return;
                }
                
                const div = document.createElement('div');
                div.className = 'item-slot';
                div.style.marginBottom = '8px';
                div.style.padding = '10px';
                
                let passiveEffects = '';
                if (passive.hpPercent) passiveEffects += `气血+${passive.hpPercent}% `;
                if (passive.defPercent) passiveEffects += `防御+${passive.defPercent}% `;
                if (passive.atkPercent) passiveEffects += `攻击+${passive.atkPercent}% `;
                if (passive.critRate) passiveEffects += `暴击率+${passive.critRate}% `;
                if (passive.critDmg) passiveEffects += `暴击伤害+${passive.critDmg}% `;
                if (passive.effect) passiveEffects += passive.effect;
                
                div.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                        <strong style="color: #a78bfa; font-size: 14px;">${passive.name}</strong>
                        <span style="color: #6b7280; font-size: 11px;">被动</span>
                    </div>
                    <small style="color: #9ca3af; font-size: 12px; margin-bottom: 5px; display: block;">${passive.description || '暂无描述'}</small>
                    <div style="margin-top: 5px; font-size: 11px; color: #fbbf24;">
                        ${passiveEffects}
                    </div>
                `;
                container.appendChild(div);
            });
        }
        
        if (learnedBooks.length > 0) {
            const bookHeader = document.createElement('h3');
            bookHeader.style.cssText = 'color: #34d399; margin-top: 15px; margin-bottom: 10px; font-size: 16px;';
            bookHeader.textContent = '已学功法';
            container.appendChild(bookHeader);
            
            learnedBooks.forEach(bookId => {
                const book = this.game.findBookById(bookId);
                if (!book) return;
                
                const qualityColors = {
                    '白': '#9ca3af',
                    '绿': '#34d399',
                    '蓝': '#60a5fa',
                    '紫': '#a78bfa',
                    '橙': '#fbbf24'
                };
                
                const div = document.createElement('div');
                div.className = 'item-slot';
                div.style.marginBottom = '8px';
                div.style.padding = '10px';
                div.style.borderLeft = `3px solid ${qualityColors[book.quality] || '#9ca3af'}`;
                
                let attrText = '';
                const attr = book.attr;
                if (attr.hp) attrText += `气血+${attr.hp} `;
                if (attr.atk) attrText += `攻击+${attr.atk} `;
                if (attr.def) attrText += `防御+${attr.def} `;
                if (attr.hpPercent) attrText += `气血+${attr.hpPercent}% `;
                if (attr.all) attrText += `全属性+${attr.all} `;
                if (attr.crit) attrText += `暴击率+${attr.crit}% `;
                if (attr.critDmg) attrText += `暴击伤害+${attr.critDmg}% `;
                if (attr.dodge) attrText += `闪避+${attr.dodge}% `;
                if (attr.dmgReduce) attrText += `减伤+${attr.dmgReduce}% `;
                if (attr.dmgUp) attrText += `伤害+${attr.dmgUp}% `;
                if (attr.strength) attrText += `力量+${attr.strength} `;
                if (attr.vitality) attrText += `体质+${attr.vitality} `;
                if (attr.intelligence) attrText += `智力+${attr.intelligence} `;
                if (attr.agility) attrText += `敏捷+${attr.agility} `;
                
                div.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <strong style="color: ${qualityColors[book.quality] || '#9ca3af'};">${book.name}</strong>
                        <span style="color: ${qualityColors[book.quality]};">[${book.quality}]</span>
                    </div>
                    <small style="color: #9ca3af; display: block; margin-bottom: 5px;">${book.description}</small>
                    <small style="color: #60a5fa; display: block; margin-bottom: 8px;">${attrText}</small>
                `;
                container.appendChild(div);
            });
        }
        
        console.log('=== updateSkillModal 结束 ===');
    }

    updateInventoryModal() {
        const equipContainer = document.getElementById('equipment-container');
        const equipBagContainer = document.getElementById('equipment-bag-container');
        const bookContainer = document.getElementById('book-bag-container');
        const itemContainer = document.getElementById('inventory-modal-content');
        
        equipContainer.innerHTML = '';
        equipBagContainer.innerHTML = '';
        bookContainer.innerHTML = '';
        itemContainer.innerHTML = '';
        
        if (!this.game.player) return;
        
        document.getElementById('inventory-gold').textContent = `💰 ${this.game.player.gold} 银两`;
        
        const slots = [
            { key: 'weapon', name: '武器', icon: '⚔️' },
            { key: 'chest', name: '胸甲', icon: '👕' },
            { key: 'artifact', name: '法宝', icon: '✨' },
            { key: 'magicWeapon', name: '法器', icon: '🔮' },
            { key: 'helmet', name: '头盔', icon: '🪖' },
            { key: 'ring', name: '戒指', icon: '💍' },
            { key: 'shoulder', name: '护肩', icon: '💪' },
            { key: 'pants', name: '护腿', icon: '👖' },
            { key: 'boots', name: '战靴', icon: '👢' }
        ];
        
        const equipRow = document.createElement('div');
        equipRow.style.cssText = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 15px;';
        
        slots.forEach(slot => {
            const equipItem = this.game.player.equipment[slot.key];
            const div = document.createElement('div');
            div.className = 'item-slot';
            div.style.cssText = 'text-align: center; padding: 10px; min-height: 80px; cursor: pointer;';
            
            if (equipItem) {
                const equipName = equipItem.name || equipItem.itemName || equipItem.item || '未知装备';
                let equipQuality = equipItem.quality || equipItem.rarity || '普通';
                
                const qualityMap = {
                    'common': '白',
                    'uncommon': '绿',
                    'rare': '蓝',
                    'epic': '紫',
                    'legendary': '橙',
                    'mythic': '橙',
                    'white': '白',
                    'green': '绿',
                    'blue': '蓝',
                    'purple': '紫',
                    'orange': '橙'
                };
                if (typeof equipQuality === 'string' && qualityMap[equipQuality]) {
                    equipQuality = qualityMap[equipQuality];
                }
                
                div.innerHTML = `
                    <div style="font-size: 24px; margin-bottom: 5px;">${slot.icon}</div>
                    <strong style="display: block; font-size: 12px; color: ${this.getQualityColor(equipQuality)}">${equipName}</strong>
                    <div style="font-size: 10px; color: #9ca3af;">[${equipQuality}]</div>
                `;
                
                div.addEventListener('click', () => {
                    this.openItemModal(equipItem, 1, -1, 'equipped');
                });
                
                const unequipBtn = document.createElement('button');
                unequipBtn.className = 'btn btn-secondary';
                unequipBtn.style.cssText = 'margin-top: 5px; padding: 3px 8px; font-size: 10px;';
                unequipBtn.textContent = '卸下';
                unequipBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.removeEquipmentStats(equipItem);
                    this.game.unequipItem(slot.key);
                    this.updateInventoryModal();
                    this.updateAll();
                });
                div.appendChild(unequipBtn);
            } else {
                div.innerHTML = `
                    <div style="font-size: 24px; margin-bottom: 5px;">${slot.icon}</div>
                    <span style="color: #9ca3af; font-size: 12px;">${slot.name}</span>
                `;
            }
            
            equipRow.appendChild(div);
        });
        equipContainer.appendChild(equipRow);
        
        if (this.game.player.bookBag && this.game.player.bookBag.length > 0) {
            bookContainer.style.display = 'grid';
            bookContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
            bookContainer.style.gap = '10px';
            
            this.game.player.bookBag.forEach(bookId => {
                const book = this.game.findBookById(bookId);
                if (!book) return;
                
                const qualityColors = {
                    '白': '#9ca3af',
                    '绿': '#34d399',
                    '蓝': '#60a5fa',
                    '紫': '#a78bfa',
                    '橙': '#fbbf24'
                };
                
                const div = document.createElement('div');
                div.className = 'item-slot';
                div.style.padding = '8px';
                div.style.borderLeft = `3px solid ${qualityColors[book.quality] || '#9ca3af'}`;
                
                let attrText = '';
                const attr = book.attr;
                if (attr.hp) attrText += `气血+${attr.hp} `;
                if (attr.atk) attrText += `攻击+${attr.atk} `;
                if (attr.def) attrText += `防御+${attr.def} `;
                if (attr.hpPercent) attrText += `气血+${attr.hpPercent}% `;
                if (attr.all) attrText += `全属性+${attr.all} `;
                if (attr.crit) attrText += `暴击率+${attr.crit}% `;
                if (attr.critDmg) attrText += `暴击伤害+${attr.critDmg}% `;
                if (attr.dodge) attrText += `闪避+${attr.dodge}% `;
                if (attr.dmgReduce) attrText += `减伤+${attr.dmgReduce}% `;
                if (attr.dmgUp) attrText += `伤害+${attr.dmgUp}% `;
                
                div.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                        <strong style="color: ${qualityColors[book.quality] || '#9ca3af'}; font-size: 12px;">${book.name}</strong>
                        <span style="color: ${qualityColors[book.quality]}; font-size: 10px;">[${book.quality}]</span>
                    </div>
                    <small style="color: #9ca3af; display: block; margin-bottom: 3px; font-size: 11px;">${book.description}</small>
                    <small style="color: #60a5fa; display: block; margin-bottom: 5px; font-size: 10px;">${attrText}</small>
                `;
                
                const learnBtn = document.createElement('button');
                learnBtn.className = 'btn btn-primary';
                learnBtn.style.padding = '3px 8px';
                learnBtn.style.fontSize = '10px';
                learnBtn.style.width = '100%';
                learnBtn.textContent = '学习';
                learnBtn.addEventListener('click', () => {
                    const success = this.game.learnSkillBook(bookId);
                    this.updateInventoryModal();
                    this.updateAll();
                });
                div.appendChild(learnBtn);
                
                bookContainer.appendChild(div);
            });
        } else {
            bookContainer.innerHTML = '<p style="color: #9ca3af; text-align: center;">没有功法书籍</p>';
        }
        
        // 渲染配方背包
        const recipeContainer = document.getElementById('recipe-bag-container');
        if (this.game.player.knownRecipes && this.game.player.knownRecipes.length > 0) {
            recipeContainer.style.display = 'grid';
            recipeContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
            recipeContainer.style.gap = '10px';
            
            this.game.player.knownRecipes.forEach(recipeName => {
                // 先从普通配方中查找
                let recipe = GAME_DATA.ALCHEMY?.RECIPES?.[recipeName];
                // 如果普通配方中没有，从特殊配方中查找
                if (!recipe) {
                    recipe = GAME_DATA.ALCHEMY?.SPECIAL_RECIPES?.[recipeName];
                }
                
                if (!recipe) return;
                
                const div = document.createElement('div');
                div.className = `item-slot ${recipe.rarity} inventory-item`;
                div.style.cssText = 'padding: 10px; cursor: pointer; text-align: center; background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.3);';
                
                const recipeQuality = this.getQualityName(recipe.rarity);
                const qualityColor = this.getQualityColor(recipeQuality);
                
                // 生成材料列表文本
                let materialsText = '';
                if (recipe.materials) {
                    const materialsArray = Object.entries(recipe.materials);
                    materialsText = materialsArray.map(([matName, count]) => `${matName}×${count}`).join('，');
                }
                
                div.innerHTML = `
                    <div style="font-size: 28px; margin-bottom: 5px;">📜</div>
                    <div style="color: ${qualityColor}; font-weight: bold; font-size: 12px; margin-bottom: 3px;">${recipe.name}</div>
                    <div style="color: #9ca3af; font-size: 10px; margin-bottom: 3px;">${recipe.description}</div>
                    <div style="color: #a855f7; font-size: 9px; margin-bottom: 3px;">材料：${materialsText}</div>
                    <div style="color: #fbbf24; font-size: 9px;">成功率：${Math.floor((1 - recipe.failureRate) * 100)}%</div>
                    <div style="color: #9ca3af; font-size: 8px;">[${recipeQuality}]</div>
                `;
                
                recipeContainer.appendChild(div);
            });
        } else {
            recipeContainer.innerHTML = '<p style="color: #9ca3af; text-align: center;">还没有学会任何炼丹配方</p>';
        }
        
        // 渲染装备背包
        const equipmentBag = this.game.player.equipmentBag || [];
        // 过滤掉undefined或null值
        const validEquipment = equipmentBag.filter(equip => equip !== undefined && equip !== null);
        
        if (validEquipment.length > 0) {
            equipBagContainer.style.display = 'grid';
            equipBagContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(180px, 1fr))';
            equipBagContainer.style.gap = '10px';
            
            validEquipment.forEach((equip, index) => {
                const div = document.createElement('div');
                div.className = `item-slot ${equip.quality || 'common'} inventory-item`;
                div.style.cssText = 'padding: 10px; cursor: pointer; text-align: center;';
                
                const equipName = equip.name || equip.itemName || equip.item || '未知装备';
                let equipQuality = equip.quality || equip.rarity || '普通';
                
                const qualityMap = {
                    'common': '白',
                    'uncommon': '绿',
                    'rare': '蓝',
                    'epic': '紫',
                    'legendary': '橙',
                    'mythic': '橙',
                    'white': '白',
                    'green': '绿',
                    'blue': '蓝',
                    'purple': '紫',
                    'orange': '橙'
                };
                if (typeof equipQuality === 'string' && qualityMap[equipQuality]) {
                    equipQuality = qualityMap[equipQuality];
                }
                
                const icon = this.getItemIcon(equip.type);
                
                div.innerHTML = `
                    <div style="font-size: 28px; margin-bottom: 5px;">${icon}</div>
                    <div style="color: ${this.getQualityColor(equipQuality)}; font-weight: bold; font-size: 12px; margin-bottom: 3px;">${equipName}</div>
                    <div style="color: #9ca3af; font-size: 10px;">[${equipQuality}]</div>
                `;
                
                div.addEventListener('click', () => {
                    this.openItemModal(equip, 1, index, 'equipment');
                });
                
                equipBagContainer.appendChild(div);
            });
        } else {
            equipBagContainer.innerHTML = '<p style="color: #9ca3af; text-align: center;">装备背包是空的</p>';
        }
        
        const inventory = this.game.player.inventory;
        const items = Object.entries(inventory);
        
        if (items.length === 0) {
            itemContainer.innerHTML = '<p style="color: #9ca3af; text-align: center;">没有物品</p>';
            return;
        }
        
        itemContainer.style.display = 'grid';
        itemContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(180px, 1fr))';
        itemContainer.style.gap = '10px';
        
        items.forEach(([itemName, quantity]) => {
            const item = GAME_DATA.ITEMS[itemName] || { type: 'misc', rarity: 'common', description: '未知物品' };
            const div = document.createElement('div');
            div.className = `item-slot ${item.rarity} inventory-item`;
            div.style.cssText = 'padding: 10px; cursor: pointer; text-align: center;';
            
            let itemQuality = this.getQualityName(item.rarity || item.quality);
            const icon = this.getItemIcon(item.type);
            
            div.innerHTML = `
                <div style="font-size: 28px; margin-bottom: 5px;">${icon}</div>
                <div style="color: ${this.getQualityColor(itemQuality)}; font-weight: bold; font-size: 12px; margin-bottom: 3px;">${itemName}</div>
                <div style="color: #fbbf24; font-size: 11px; font-weight: bold;">x${quantity}</div>
                <div style="color: #9ca3af; font-size: 10px;">[${itemQuality}]</div>
            `;
            
            div.addEventListener('click', () => {
                this.openItemModal(itemName, quantity);
            });
            
            itemContainer.appendChild(div);
        });
    }

    updateScene() {
        const map = this.game.currentMap;
        const area = this.game.currentArea;
        if (!map || !area) return;
        
        document.getElementById('scene-description').innerHTML = `
            <h2>${map.name} - ${area.name}</h2>
            <p>${map.description}</p>
            <p style="margin-top: 10px;">${area.description}</p>
        `;
        
        this.renderActionButtons();
    }

    renderActionButtons() {
        const container = document.getElementById('action-buttons');
        container.innerHTML = '';
        
        const map = this.game.currentMap;
        const area = this.game.currentArea;
        
        console.log('renderActionButtons - 地图和区域信息:');
        console.log('地图:', map);
        console.log('当前区域:', area);
        console.log('区域monsters:', area ? area.monsters : '无');
        
        map.connections.forEach(connId => {
            const connMap = GAME_DATA.MAPS[connId];
            if (connMap) {
                const btn = document.createElement('button');
                btn.className = 'btn btn-primary';
                btn.textContent = `前往${connMap.name}`;
                btn.addEventListener('click', () => {
                    this.game.moveToMap(connId);
                    this.updateAll();
                    this.tryTriggerAdventure('travel');
                });
                container.appendChild(btn);
            }
        });
        
        Object.keys(map.areas).forEach(areaId => {
            if (map.areas[areaId] !== area) {
                const btn = document.createElement('button');
                btn.className = 'btn btn-secondary';
                btn.textContent = map.areas[areaId].name;
                btn.addEventListener('click', () => {
                    this.game.moveToArea(areaId);
                    this.updateAll();
                });
                container.appendChild(btn);
            }
        });
        
        if (area.npcs && Array.isArray(area.npcs)) {
            console.log('发现NPC列表:', area.npcs);
            area.npcs.forEach(npcId => {
                console.log('处理NPC ID:', npcId);
                const npc = GAME_DATA.NPCS[npcId];
                console.log('找到的NPC:', npc);
                if (npc && npc.name) {
                    const btn = document.createElement('button');
                    btn.className = 'btn btn-warning';
                    btn.textContent = npc.name;
                    btn.addEventListener('click', () => this.showNpcDialog(npcId));
                    container.appendChild(btn);
                    console.log('成功添加NPC按钮:', npc.name);
                } else {
                    console.error('找不到NPC数据或NPC没有name属性:', npcId);
                }
            });
        } else {
            console.log('当前区域没有npcs字段或npcs不是一个数组');
        }
        
        // 怪物显示已移至右侧面板，不再在中间显示
        // if (area.monsters && Array.isArray(area.monsters)) {
        //     console.log('准备渲染怪物按钮，怪物列表:', area.monsters);
        //     area.monsters.forEach(monsterId => {
        //         console.log('正在处理怪物ID:', monsterId);
        //         const monster = GAME_DATA.MONSTERS[monsterId];
        //         console.log('找到的怪物:', monster);
        //         if (monster) {
        //             const btn = document.createElement('button');
        //             btn.className = 'btn btn-danger';
        //             btn.textContent = `挑战${monster.name}`;
        //             btn.addEventListener('click', () => {
        //                 this.startCombat(monsterId, 'wild');
        //                 this.tryTriggerAdventure('monster');
        //             });
        //             container.appendChild(btn);
        //             console.log('成功添加怪物按钮:', monster.name);
        //         } else {
        //             console.error('找不到怪物数据:', monsterId);
        //         }
        //     });
        // } else {
        //     console.log('当前区域没有monsters字段');
        // }
        
        if (area.gatherPoints) {
            const gatherPointNames = {
                'common-herb': '草药',
                'stone': '石头',
                'spirit-grass': '灵草',
                'wood-fruit': '木果',
                'iron-ore': '铁矿石',
                'metal-stone': '金属石',
                'alchemy-common': '炼丹材料（低级）',
                'alchemy-century': '炼丹材料（百年）',
                'alchemy-millennium': '炼丹材料（千年）',
                'alchemy-ice': '炼丹材料（冰晶）',
                'alchemy-fire': '炼丹材料（火核）',
                'alchemy-thunder': '炼丹材料（雷晶）',
                'alchemy-star': '炼丹材料（星尘）'
            };
            area.gatherPoints.forEach(point => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-success';
                btn.textContent = `采集${gatherPointNames[point] || point}`;
                btn.addEventListener('click', () => {
                    this.game.gather(point);
                    this.updateAll();
                    this.tryTriggerAdventure('gather');
                });
                container.appendChild(btn);
            });
        }
        
        if (area.events) {
            area.events.forEach(event => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-success';
                
                switch(event) {
                    case 'eat':
                        btn.textContent = '点餐';
                        btn.addEventListener('click', () => {
                            this.game.eat();
                            this.updateAll();
                            this.tryTriggerAdventure('eat');
                        });
                        break;
                    case 'sleep':
                        btn.textContent = '睡觉';
                        btn.addEventListener('click', () => {
                            this.game.sleep();
                            this.updateAll();
                            this.tryTriggerAdventure('sleep');
                        });
                        break;
                    case 'rest':
                        btn.textContent = '休息';
                        btn.addEventListener('click', () => {
                            this.game.rest();
                            this.updateAll();
                            this.tryTriggerAdventure('wild');
                        });
                        break;
                    case 'cultivate':
                        btn.textContent = '修炼';
                        btn.addEventListener('click', () => {
                            this.game.cultivate();
                            this.updateAll();
                            this.tryTriggerAdventure('cultivate');
                        });
                        break;
                    case 'alchemy':
                        btn.textContent = '炼丹炉';
                        btn.addEventListener('click', () => {
                            this.showAlchemyModal();
                        });
                        break;
                }
                container.appendChild(btn);
            });
        }
        
        const restBtn = document.createElement('button');
        restBtn.className = 'btn btn-secondary';
        restBtn.textContent = '打坐恢复';
        restBtn.addEventListener('click', () => {
            this.game.rest();
            this.updateAll();
        });
        container.appendChild(restBtn);
    }

    // 检查是否有需要交付给指定NPC的护送任务
    checkDeliverQuest(npcId) {
        const player = this.game.player;
        if (!player || !player.quests) return null;
        
        for (const quest of player.quests) {
            if (quest.completed) continue;
            
            // 查找任务数据
            let questData = GAME_DATA.QUESTS[quest.id];
            
            // 检查任务数据是否找到
            if (!questData) {
                console.log('未找到任务数据:', quest.id);
            } else {
                console.log('找到任务数据:', questData);
                console.log('任务类型:', questData.type);
                console.log('目标NPC:', questData.targetNpc);
                console.log('当前NPC:', npcId);
            }
            
            // 检查是否是deliver类型任务且目标NPC匹配
            if (questData && questData.type === 'deliver' && questData.targetNpc === npcId) {
                // 检查玩家是否拥有需要交付的物品及数量
                if (questData.item && (!player.inventory || !player.inventory[questData.item] || player.inventory[questData.item] < (questData.count || 1))) {
                    console.log('物品不足:', questData.item, player.inventory[questData.item]);
                    continue; // 玩家没有该物品或数量不足，不触发任务完成
                }
                console.log('任务匹配成功，返回任务数据');
                return questData;
            }
        }
        
        console.log('没有找到匹配的任务');
        return null;
    }

    showNpcDialog(npcId) {
        const npc = this.game.talkToNpc(npcId);
        if (!npc) return;
        
        document.getElementById('npc-name').textContent = npc.name;
        
        // 检查是否有护送任务需要交付给这个NPC
        const deliverQuest = this.checkDeliverQuest(npcId);
        
        // 显示好感度和关系状态（如果是互动NPC）
        let favorInfo = '';
        if (npc.type === 'interactive') {
            const favor = this.game.getNPCFavor(npcId);
            const relation = this.game.getNPCRrelation(npcId);
            const relationText = {
                'stranger': '陌生人',
                'friend': '朋友',
                'close': '亲密',
                'intimate': '道侣/结拜',
                'hostile': '敌对'
            }[relation] || '陌生人';
            
            favorInfo = `
                <div style="margin-top: 10px; padding: 10px; background-color: rgba(0,0,0,0.1); border-radius: 5px;">
                    <div style="display: flex; justify-content: space-between;">
                        <span>好感度：</span>
                        <span style="color: ${favor >= 0 ? '#22c55e' : '#ef4444'};">${favor}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>关系：</span>
                        <span>${relationText}</span>
                    </div>
                </div>
            `;
        }
        
        const actionsContainer = document.getElementById('npc-actions');
        actionsContainer.innerHTML = '';
        
        // 如果有护送任务，显示任务对话
        if (deliverQuest) {
            document.getElementById('npc-dialog-content').innerHTML = `
                <div class="npc-avatar">📦</div>
                <p style="margin-top: 15px; color: #fbbf24; font-weight: bold;">你带来了${deliverQuest.item}！</p>
                <p style="margin-top: 10px;">${npc.name}接过${deliverQuest.item}，满意地点了点头。</p>
                <p style="margin-top: 10px; color: #22c55e;">任务【${deliverQuest.name}】准备完成！</p>
                ${favorInfo}
            `;
            
            // 添加交付任务按钮
            const completeBtn = document.createElement('button');
            completeBtn.className = 'btn btn-primary';
            completeBtn.textContent = '交付任务';
            completeBtn.style.marginTop = '15px';
            completeBtn.addEventListener('click', () => {
                // 触发任务完成
                this.game.updateQuestProgress('talk', npcId);
                // 显示完成提示
                this.showStoryModal('任务完成', `
                    <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">🎉 任务完成</h3>
                    <p style="text-align: center; margin-bottom: 15px;">任务【${deliverQuest.name}】已成功完成！</p>
                    <p style="text-align: center; color: #fbbf24;">恭喜你获得了任务奖励！</p>
                `, [
                    {
                        text: '确定',
                        className: 'btn-success',
                        callback: () => {
                            document.getElementById('story-modal').classList.add('hidden');
                            this.closeNpcDialog();
                        }
                    }
                ]);
            });
            actionsContainer.appendChild(completeBtn);
        } else {
            document.getElementById('npc-dialog-content').innerHTML = `
                <div class="npc-avatar">👤</div>
                <p style="margin-top: 15px;">${npc.dialogs[Math.floor(Math.random() * npc.dialogs.length)]}</p>
                ${favorInfo}
            `;
        }
        
        if (npc.type === 'sect-recruiter' && !this.game.player.sect) {
            const joinBtn = document.createElement('button');
            joinBtn.className = 'btn btn-primary';
            joinBtn.textContent = '申请加入';
            joinBtn.addEventListener('click', () => {
                const result = this.game.joinSect(npc.sect);
                
                if (result.success) {
                    alert(`恭喜！你成功加入了 ${result.sectName}！`);
                } else {
                    alert(`加入失败：${result.reason}`);
                }
                
                this.updateAll();
                this.closeNpcDialog();
            });
            actionsContainer.appendChild(joinBtn);
        }
        
        if (npc.id === 'weaponsmith') {
            const shopBtn = document.createElement('button');
            shopBtn.className = 'btn btn-primary';
            shopBtn.textContent = '查看武器';
            shopBtn.addEventListener('click', () => {
                this.closeNpcDialog();
                this.openShopModal('weaponsmith');
            });
            actionsContainer.appendChild(shopBtn);
        }
        
        if (npc.id === 'pharmacist') {
            const shopBtn = document.createElement('button');
            shopBtn.className = 'btn btn-primary';
            shopBtn.textContent = '查看丹药';
            shopBtn.addEventListener('click', () => {
                this.closeNpcDialog();
                this.openShopModal('pharmacist');
            });
            actionsContainer.appendChild(shopBtn);
        }
        
        if (npc.id === 'artifact-dealer') {
            const shopBtn = document.createElement('button');
            shopBtn.className = 'btn btn-primary';
            shopBtn.textContent = '查看法宝';
            shopBtn.addEventListener('click', () => {
                this.closeNpcDialog();
                this.openShopModal('artifact-dealer');
            });
            actionsContainer.appendChild(shopBtn);
        }
        
        if (npc.id === 'herb-gatherer') {
            const shopBtn = document.createElement('button');
            shopBtn.className = 'btn btn-primary';
            shopBtn.textContent = '购买草药';
            shopBtn.addEventListener('click', () => {
                this.closeNpcDialog();
                this.openShopModal('pharmacist');
            });
            actionsContainer.appendChild(shopBtn);
        }
        
        if (npc.id === 'merchant') {
            const shopBtn = document.createElement('button');
            shopBtn.className = 'btn btn-primary';
            shopBtn.textContent = '查看商品';
            shopBtn.addEventListener('click', () => {
                this.closeNpcDialog();
                this.openShopModal('artifact-dealer');
            });
            actionsContainer.appendChild(shopBtn);
        }
        
        if (npc.id === 'innkeeper') {
            const shopBtn = document.createElement('button');
            shopBtn.className = 'btn btn-primary';
            shopBtn.textContent = '购买补给';
            shopBtn.addEventListener('click', () => {
                this.closeNpcDialog();
                this.openShopModal('pharmacist');
            });
            actionsContainer.appendChild(shopBtn);
        }
        
        // 互动NPC的特殊功能
        if (npc.type === 'interactive') {
            // 闲聊按钮
            if (npc.actions.includes('talk')) {
                const talkBtn = document.createElement('button');
                talkBtn.className = 'btn btn-secondary';
                talkBtn.textContent = '闲聊';
                talkBtn.addEventListener('click', () => {
                    this.talkToNPC(npcId);
                });
                actionsContainer.appendChild(talkBtn);
            }
            
            // 送礼按钮
            if (npc.actions.includes('gift')) {
                const giftBtn = document.createElement('button');
                giftBtn.className = 'btn btn-success';
                giftBtn.textContent = '送礼';
                giftBtn.addEventListener('click', () => {
                    this.showGiftModal(npcId);
                });
                actionsContainer.appendChild(giftBtn);
            }
            
            // 切磋按钮
            if (npc.actions.includes('spar')) {
                const sparBtn = document.createElement('button');
                sparBtn.className = 'btn btn-warning';
                sparBtn.textContent = '切磋';
                sparBtn.addEventListener('click', () => {
                    this.sparWithNPC(npcId);
                });
                actionsContainer.appendChild(sparBtn);
            }
            
            // 任务按钮
            if (npc.actions.includes('task') && npc.tasks) {
                const taskBtn = document.createElement('button');
                taskBtn.className = 'btn btn-info';
                taskBtn.textContent = '查看任务';
                taskBtn.addEventListener('click', () => {
                    this.showNPCTasks(npcId);
                });
                actionsContainer.appendChild(taskBtn);
            }
            

            
            // 结拜按钮（好感度≥300）
            if (npc.actions.includes('sworn') && npc.canSworn) {
                const favor = this.game.getNPCFavor(npcId);
                const relation = this.game.getNPCRelation(npcId);
                if (favor >= 300 && relation !== 'intimate') {
                    const swornBtn = document.createElement('button');
                    swornBtn.className = 'btn btn-primary';
                    swornBtn.textContent = '结拜';
                    swornBtn.addEventListener('click', () => {
                        this.showSwornModal(npcId);
                    });
                    actionsContainer.appendChild(swornBtn);
                }
            }
            
            // 道侣按钮（好感度≥500）
            if (npc.actions.includes('marry') && npc.canMarry) {
                const favor = this.game.getNPCFavor(npcId);
                const relation = this.game.getNPCRelation(npcId);
                const isSpouse = this.game.player.npcRelations[npcId]?.isSpouse;
                if (favor >= 500 && !isSpouse) {
                    const marryBtn = document.createElement('button');
                    marryBtn.className = 'btn btn-primary';
                    marryBtn.textContent = '结为道侣';
                    marryBtn.addEventListener('click', () => {
                        this.showMarryModal(npcId);
                    });
                    actionsContainer.appendChild(marryBtn);
                }
            }
            
            // 偷窃按钮
            if (npc.actions.includes('steal') && npc.canSteal) {
                const stealBtn = document.createElement('button');
                stealBtn.className = 'btn btn-danger';
                stealBtn.textContent = '偷窃';
                stealBtn.addEventListener('click', () => {
                    this.stealFromNPC(npcId);
                });
                actionsContainer.appendChild(stealBtn);
            }
            
            // 攻击按钮
            if (npc.actions.includes('attack') && npc.canAttack) {
                const attackBtn = document.createElement('button');
                attackBtn.className = 'btn btn-danger';
                attackBtn.textContent = '攻击';
                attackBtn.addEventListener('click', () => {
                    this.attackNPC(npcId);
                });
                actionsContainer.appendChild(attackBtn);
            }
        }
        
        // 悬赏按钮（放在外面，所有有bounty action的NPC都可以显示）
        if (npc.actions && npc.actions.includes('bounty')) {
            const bountyBtn = document.createElement('button');
            bountyBtn.className = 'btn btn-warning';
            bountyBtn.textContent = '查看悬赏令';
            bountyBtn.addEventListener('click', () => {
                this.showBountyBoard();
            });
            actionsContainer.appendChild(bountyBtn);
        }
        
        if (npc.id.includes('skill-master') && this.game.player.sect) {
            const learnBtn = document.createElement('button');
            learnBtn.className = 'btn btn-primary';
            learnBtn.textContent = '学习门派技能';
            learnBtn.addEventListener('click', () => {
                this.learnMoreSkills();
            });
            actionsContainer.appendChild(learnBtn);
        }
        
        if ((npc.type === 'shop' || npc.type === 'sect-contribution') && npc.sect) {
            const shopBtn = document.createElement('button');
            shopBtn.className = 'btn btn-primary';
            shopBtn.textContent = '贡献商店';
            shopBtn.addEventListener('click', () => {
                this.closeNpcDialog();
                this.showContributionShopModal(npc.sect);
            });
            actionsContainer.appendChild(shopBtn);
        }
        
        if (npc.id.includes('treasure') && this.game.player.sect) {
            const shopBtn = document.createElement('button');
            shopBtn.className = 'btn btn-primary';
            shopBtn.textContent = '查看门派道具';
            shopBtn.addEventListener('click', () => {
                this.closeNpcDialog();
                this.openShopModal('artifact-dealer');
            });
            actionsContainer.appendChild(shopBtn);
        }
        
        if (npc.id === 'sanxiu-master') {
            const playerHasSect = this.game.player.sect;
            
            if (playerHasSect) {
                const warnBtn = document.createElement('button');
                warnBtn.className = 'btn btn-danger';
                warnBtn.textContent = '已是门派弟子，无法学习';
                warnBtn.disabled = true;
                actionsContainer.appendChild(warnBtn);
            } else {
                const learnBtn = document.createElement('button');
                learnBtn.className = 'btn btn-primary';
                learnBtn.textContent = '学习散修功法';
                learnBtn.addEventListener('click', () => {
                    this.closeNpcDialog();
                    this.showSanxiuModal();
                });
                actionsContainer.appendChild(learnBtn);
            }
        }
        
        if (npc.type === 'sect-guard') {
            let playerSectId = this.game.player.sect;
            if (playerSectId && typeof playerSectId === 'object') {
                playerSectId = playerSectId.id;
            }
            const npcSect = npc.sect;
            
            if (playerSectId && playerSectId === npcSect) {
                const enterBtn = document.createElement('button');
                enterBtn.className = 'btn btn-success';
                enterBtn.textContent = '进入门派';
                enterBtn.addEventListener('click', () => {
                    this.closeNpcDialog();
                    const map = this.game.currentMap;
                    if (map && map.areas['core']) {
                        this.game.moveToArea('core');
                        this.updateAll();
                    }
                });
                actionsContainer.appendChild(enterBtn);
            } else {
                const leaveBtn = document.createElement('button');
                leaveBtn.className = 'btn btn-secondary';
                leaveBtn.textContent = '离开';
                leaveBtn.addEventListener('click', () => {
                    this.closeNpcDialog();
                });
                actionsContainer.appendChild(leaveBtn);
                
                const sneakBtn = document.createElement('button');
                sneakBtn.className = 'btn btn-warning';
                sneakBtn.textContent = '偷溜进去';
                sneakBtn.addEventListener('click', () => {
                    this.closeNpcDialog();
                    if (Math.random() < 0.1) {
                        this.game.log('系统', '你趁守门人不注意，溜了进去！', 'success');
                        const map = this.game.currentMap;
                        if (map && map.areas['core']) {
                            this.game.currentArea = map.areas['core'];
                            this.game.log('系统', `你来到了${this.game.currentArea.name}`, 'info');
                            this.updateAll();
                        }
                    } else {
                        this.game.log('系统', '你的行踪被发现了！守门人怒喝一声，向你发起攻击！', 'combat');
                        const guardMonsterId = `${npcSect}-guard-monster`;
                        const success = this.game.initCombat(guardMonsterId, 'sect-guard');
                        if (success) {
                            this.showBattle();
                        }
                    }
                });
                actionsContainer.appendChild(sneakBtn);
                
                const fightBtn = document.createElement('button');
                fightBtn.className = 'btn btn-danger';
                fightBtn.textContent = '强闯';
                fightBtn.addEventListener('click', () => {
                    this.closeNpcDialog();
                    this.game.log('系统', '你决定强闯！守门人怒喝一声，向你发起攻击！', 'combat');
                    const guardMonsterId = `${npcSect}-guard-monster`;
                    const success = this.game.initCombat(guardMonsterId, 'sect-guard');
                    if (success) {
                        this.showBattle();
                    }
                });
                actionsContainer.appendChild(fightBtn);
            }
        }
        
        if (npc.type === 'task-master') {
            const questBtn = document.createElement('button');
            questBtn.className = 'btn btn-primary';
            questBtn.textContent = '领取任务';
            questBtn.addEventListener('click', () => {
                this.closeNpcDialog();
                this.showQuestModal(npc.sect);
            });
            actionsContainer.appendChild(questBtn);
        }
        
        // 处理guide类型NPC的任务
        if (npc.quests && npc.quests.length > 0) {
            const questBtn = document.createElement('button');
            questBtn.className = 'btn btn-primary';
            questBtn.textContent = '查看任务';
            questBtn.addEventListener('click', () => {
                this.closeNpcDialog();
                this.showNpcQuestsModal(npc.id);
            });
            actionsContainer.appendChild(questBtn);
        }
        
        if (npc.type === 'sect-master' && this.game.player.sect) {
            const promoteBtn = document.createElement('button');
            promoteBtn.className = 'btn btn-warning';
            promoteBtn.textContent = '申请晋升';
            promoteBtn.addEventListener('click', () => {
                this.promoteInSect(npc);
            });
            actionsContainer.appendChild(promoteBtn);
        }
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn btn-secondary';
        closeBtn.textContent = '告辞';
        closeBtn.addEventListener('click', () => this.closeNpcDialog());
        actionsContainer.appendChild(closeBtn);
        
        document.getElementById('npc-dialog').classList.remove('hidden');
        this.updateMessageLog();
    }

    closeNpcDialog() {
        document.getElementById('npc-dialog').classList.add('hidden');
    }
    
    // NPC互动功能
    talkToNPC(npcId) {
        const result = this.game.talkToInteractiveNPC(npcId);
        if (result.success) {
            const npc = GAME_DATA.NPCS[npcId];
            if (npc && npc.type === 'interactive') {
                this.showInteractiveNpcDialog(npc);
            } else {
                this.showNpcDialog(npcId);
            }
        } else {
            // 显示弹窗提醒
            this.showStoryModal('提示', `
                <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">📢 提醒</h3>
                <p style="text-align: center; margin-bottom: 15px;">${result.message}</p>
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
    }
    
    showGiftModal(npcId) {
        const container = document.getElementById('npc-dialog-content');
        const inventory = this.game.player.inventory || {};
        const items = Object.entries(inventory);
        
        let html = `
            <h3 style="color: #fbbf24; margin-bottom: 15px;">选择礼物</h3>
            <div style="max-height: 300px; overflow-y: auto;">
        `;
        
        if (items.length === 0) {
            html += '<p style="color: #9ca3af; text-align: center;">背包中没有物品</p>';
        } else {
            items.forEach(([itemName, quantity]) => {
                const item = GAME_DATA.ITEMS[itemName];
                if (item && item.type !== 'equipment') {
                    html += `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #374151; margin-bottom: 8px;">
                            <span>${itemName} x${quantity}</span>
                            <button class="btn btn-success gift-item-btn" data-npc-id="${npcId}" data-item-name="${itemName}">送礼</button>
                        </div>
                    `;
                }
            });
        }
        
        html += `
            </div>
            <button class="btn btn-secondary" style="margin-top: 15px; width: 100%;" id="close-gift-modal">取消</button>
        `;
        
        container.innerHTML = html;
        
        document.getElementById('close-gift-modal').addEventListener('click', () => {
            const npc = GAME_DATA.NPCS[npcId];
            if (npc && npc.type === 'interactive') {
                this.showInteractiveNpcDialog(npc);
            } else {
                this.showNpcDialog(npcId);
            }
        });
        
        const giftBtns = container.querySelectorAll('.gift-item-btn');
        giftBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const itemName = btn.dataset.itemName;
                const result = this.game.giftToNPC(npcId, itemName);
                if (result.success) {
                    const npc = GAME_DATA.NPCS[npcId];
                    if (npc && npc.type === 'interactive') {
                        this.showInteractiveNpcDialog(npc);
                    } else {
                        this.showNpcDialog(npcId);
                    }
                } else {
                    // 显示弹窗提醒
                    this.showStoryModal('提示', `
                        <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">📢 提醒</h3>
                        <p style="text-align: center; margin-bottom: 15px;">${result.message}</p>
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
            });
        });
    }
    
    sparWithNPC(npcId) {
        const result = this.game.sparWithNPC(npcId);
        if (result.success) {
            const npc = GAME_DATA.NPCS[npcId];
            if (npc && npc.type === 'interactive') {
                this.showInteractiveNpcDialog(npc);
            } else {
                this.showNpcDialog(npcId);
            }
        } else {
            // 显示弹窗提醒
            this.showStoryModal('提示', `
                <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">📢 提醒</h3>
                <p style="text-align: center; margin-bottom: 15px;">${result.message}</p>
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
    }
    
    stealFromNPC(npcId) {
        const result = this.game.stealFromNPC(npcId);
        if (result.success) {
            const npc = GAME_DATA.NPCS[npcId];
            if (npc && npc.type === 'interactive') {
                this.showInteractiveNpcDialog(npc);
            } else {
                this.showNpcDialog(npcId);
            }
        } else {
            // 显示弹窗提醒
            this.showStoryModal('提示', `
                <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">📢 提醒</h3>
                <p style="text-align: center; margin-bottom: 15px;">${result.message}</p>
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
    }
    
    attackNPC(npcId) {
        const result = this.game.attackNPC(npcId);
        if (result.success) {
            const npc = GAME_DATA.NPCS[npcId];
            if (npc && npc.type === 'interactive') {
                this.showInteractiveNpcDialog(npc);
            } else {
                this.showNpcDialog(npcId);
            }
        } else {
            // 显示弹窗提醒
            this.showStoryModal('提示', `
                <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">📢 提醒</h3>
                <p style="text-align: center; margin-bottom: 15px;">${result.message}</p>
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
    }
    
    showSwornModal(npcId) {
        const container = document.getElementById('npc-dialog-content');
        const npc = GAME_DATA.NPCS[npcId];
        
        container.innerHTML = `
            <h3 style="color: #fbbf24; margin-bottom: 15px;">结拜为异性兄弟/姐妹</h3>
            <p style="margin-bottom: 15px;">你确定要与${npc.name}结拜为异性兄弟/姐妹吗？</p>
            <p style="color: #fbbf24; margin-bottom: 15px;">需要300点好感度</p>
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary" id="confirm-sworn-btn">确认结拜</button>
                <button class="btn btn-secondary" id="cancel-sworn-btn">取消</button>
            </div>
        `;
        
        document.getElementById('confirm-sworn-btn').addEventListener('click', () => {
            const result = this.game.swornWithNPC(npcId);
            if (result.success) {
                if (npc && npc.type === 'interactive') {
                    this.showInteractiveNpcDialog(npc);
                } else {
                    this.showNpcDialog(npcId);
                }
            } else {
                this.game.log('系统', result.message, 'warning');
                if (npc && npc.type === 'interactive') {
                    this.showInteractiveNpcDialog(npc);
                } else {
                    this.showNpcDialog(npcId);
                }
            }
        });
        
        document.getElementById('cancel-sworn-btn').addEventListener('click', () => {
            if (npc && npc.type === 'interactive') {
                this.showInteractiveNpcDialog(npc);
            } else {
                this.showNpcDialog(npcId);
            }
        });
    }
    
    showMarryModal(npcId) {
        const container = document.getElementById('npc-dialog-content');
        const npc = GAME_DATA.NPCS[npcId];
        
        container.innerHTML = `
            <h3 style="color: #fbbf24; margin-bottom: 15px;">结为道侣</h3>
            <p style="margin-bottom: 15px;">你确定要与${npc.name}结为道侣吗？</p>
            <p style="color: #fbbf24; margin-bottom: 15px;">需要500点好感度</p>
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary" id="confirm-marry-btn">确认结为道侣</button>
                <button class="btn btn-secondary" id="cancel-marry-btn">取消</button>
            </div>
        `;
        
        document.getElementById('confirm-marry-btn').addEventListener('click', () => {
            const result = this.game.marryNPC(npcId);
            if (result.success) {
                if (npc && npc.type === 'interactive') {
                    this.showInteractiveNpcDialog(npc);
                } else {
                    this.showNpcDialog(npcId);
                }
            } else {
                this.game.log('系统', result.message, 'warning');
                if (npc && npc.type === 'interactive') {
                    this.showInteractiveNpcDialog(npc);
                } else {
                    this.showNpcDialog(npcId);
                }
            }
        });
        
        document.getElementById('cancel-marry-btn').addEventListener('click', () => {
            if (npc && npc.type === 'interactive') {
                this.showInteractiveNpcDialog(npc);
            } else {
                this.showNpcDialog(npcId);
            }
        });
    }
    
    showNPCTasks(npcId) {
        const result = this.game.getNPCTasks(npcId);
        if (result.success) {
            const container = document.getElementById('npc-dialog-content');
            const tasks = result.tasks;
            const npc = GAME_DATA.NPCS[npcId];
            
            let html = `
                <h3 style="color: #fbbf24; margin-bottom: 15px;">${npc.name}的任务</h3>
                <div style="max-height: 300px; overflow-y: auto;">
            `;
            
            tasks.forEach(task => {
                html += `
                    <div style="padding: 10px; border-bottom: 1px solid #374151; margin-bottom: 8px;">
                        <strong style="color: #60a5fa;">${task.name}</strong>
                        <p style="margin: 5px 0;">${task.description}</p>
                        <div style="font-size: 12px; color: #9ca3af;">
                            奖励：${task.reward}
                        </div>
                    </div>
                `;
            });
            
            html += `
                </div>
                <button class="btn btn-secondary" style="margin-top: 15px; width: 100%;" id="close-tasks-modal">关闭</button>
            `;
            
            container.innerHTML = html;
            
            document.getElementById('close-tasks-modal').addEventListener('click', () => {
                if (npc && npc.type === 'interactive') {
                    this.showInteractiveNpcDialog(npc);
                } else {
                    this.showNpcDialog(npcId);
                }
            });
        } else {
            this.game.log('系统', result.message, 'warning');
        }
    }
    
    showBountyBoard() {
        const playerRealm = this.game.player.realm.name;
        let availableRealm = '';
        
        // 判断玩家当前境界
        if (playerRealm.includes('炼气期')) {
            availableRealm = '炼气期';
        } else if (playerRealm.includes('筑基期')) {
            availableRealm = '筑基期';
        } else if (playerRealm.includes('金丹期')) {
            availableRealm = '金丹期';
        } else if (playerRealm.includes('元婴期')) {
            availableRealm = '元婴期';
        } else if (playerRealm.includes('化神期')) {
            availableRealm = '化神期';
        } else {
            availableRealm = '炼气期';
        }
        
        const bountyQuests = GAME_DATA.ITEM_DATABASE.BOUNTY_QUESTS;
        const container = document.getElementById('npc-dialog-content');
        const activeQuests = this.game.player.bountyQuests || [];
        const completedQuests = activeQuests.filter(q => q.completed);
        const inProgressQuests = activeQuests.filter(q => !q.completed);
        
        let html = `
            <h3 style="color: #fbbf24; margin-bottom: 15px; text-align: center;">📜 悬赏令</h3>
            <p style="text-align: center; margin-bottom: 15px; color: #9ca3af;">当前境界：${playerRealm}</p>
        `;
        
        // 显示已完成可领取的任务
        if (completedQuests.length > 0) {
            html += `<h4 style="color: #22c55e; margin-top: 10px; margin-bottom: 10px; border-bottom: 1px solid #22c55e; padding-bottom: 5px;">✅ 待领取奖励</h4>`;
            completedQuests.forEach(quest => {
                html += `
                    <div style="padding: 12px; border: 2px solid #22c55e; border-radius: 8px; margin-bottom: 10px; background: rgba(34, 197, 94, 0.1);">
                        <strong style="color: #22c55e;">${quest.title}</strong>
                        <p style="margin: 8px 0; font-size: 14px; color: #d1d5db;">${quest.description}</p>
                        <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 4px; font-size: 13px;">
                            <div style="color: #fbbf24; margin-bottom: 5px;"><strong>奖励：</strong></div>
                            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                <span>💰 银两：${quest.rewards.silver}</span>
                                <span>⭐ 声望：${quest.rewards.reputation}</span>
                                <span>📖 修为：${quest.rewards.cultivation}</span>
                                <span>💊 ${quest.rewards.pill}×${quest.rewards.pillCount}</span>
                            </div>
                        </div>
                        <button class="btn btn-success" style="margin-top: 10px; width: 100%;" onclick="ui.claimBountyReward('${quest.id}')">
                            领取奖励
                        </button>
                    </div>
                `;
            });
        }
        
        // 显示进行中的任务
        if (inProgressQuests.length > 0) {
            html += `<h4 style="color: #60a5fa; margin-top: 15px; margin-bottom: 10px; border-bottom: 1px solid #60a5fa; padding-bottom: 5px;">📋 进行中</h4>`;
            inProgressQuests.forEach(quest => {
                html += `
                    <div style="padding: 12px; border: 1px solid #60a5fa; border-radius: 8px; margin-bottom: 10px; background: rgba(96, 165, 250, 0.1);">
                        <strong style="color: #60a5fa;">${quest.title}</strong>
                        <p style="margin: 8px 0; font-size: 14px; color: #d1d5db;">${quest.description}</p>
                        <div style="font-size: 13px; color: #9ca3af;">
                            <span style="margin-right: 15px;">🎯 目标：${quest.target}</span>
                            <span>📍 ${quest.dungeon}</span>
                        </div>
                        <div style="margin-top: 8px; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 4px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span style="color: #9ca3af;">进度</span>
                                <span style="color: #fbbf24; font-weight: bold;">${quest.progress || 0}/${quest.targetCount}</span>
                            </div>
                            <div style="background: #374151; height: 8px; border-radius: 4px; overflow: hidden;">
                                <div style="background: linear-gradient(90deg, #fbbf24, #f59e0b); height: 100%; width: ${Math.min(100, ((quest.progress || 0) / quest.targetCount) * 100)}%; transition: width 0.3s;"></div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        
        html += `<div style="max-height: 300px; overflow-y: auto;">`;
        
        // 显示所有可接取境界的任务
        const allRealms = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期'];
        const realmIndex = allRealms.indexOf(availableRealm);
        
        for (let i = 0; i <= realmIndex; i++) {
            const realm = allRealms[i];
            const quests = bountyQuests[realm];
            
            if (quests && quests.length > 0) {
                html += `<h4 style="color: ${realm === availableRealm ? '#fbbf24' : '#6b7280'}; margin-top: 15px; margin-bottom: 10px; border-bottom: 1px solid #374151; padding-bottom: 5px;">${realm}任务</h4>`;
                
                quests.forEach(quest => {
                    const isRequirementMet = realmIndex >= allRealms.indexOf(realm);
                    const isCurrentRealm = realm === availableRealm;
                    const isAlreadyAccepted = activeQuests.some(q => q.id === quest.id);
                    
                    if (isAlreadyAccepted) return;
                    
                    html += `
                        <div style="padding: 12px; border: 1px solid ${isCurrentRealm ? '#fbbf24' : '#374151'}; border-radius: 8px; margin-bottom: 10px; background: ${isCurrentRealm ? 'rgba(251, 191, 36, 0.1)' : 'rgba(55, 65, 81, 0.3)'};">
                            <strong style="color: ${isCurrentRealm ? '#fbbf24' : '#9ca3af'};">${quest.title}</strong>
                            <p style="margin: 8px 0; font-size: 14px; color: #d1d5db;">${quest.description}</p>
                            <div style="font-size: 13px; color: #9ca3af; margin-bottom: 8px;">
                                <span style="margin-right: 15px;">🎯 目标：${quest.target}×${quest.targetCount}</span>
                                <span>📍 ${quest.dungeon}</span>
                            </div>
                            <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 4px; font-size: 13px;">
                                <div style="color: #fbbf24; margin-bottom: 5px;"><strong>奖励：</strong></div>
                                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                    <span>💰 银两：${quest.rewards.silver}</span>
                                    <span>⭐ 声望：${quest.rewards.reputation}</span>
                                    <span>📖 修为：${quest.rewards.cultivation}</span>
                                    <span>💊 ${quest.rewards.pill}×${quest.rewards.pillCount}</span>
                                </div>
                            </div>
                            ${isRequirementMet ? `
                                <button class="btn btn-success" style="margin-top: 10px; width: 100%;" onclick="ui.acceptBountyQuest('${quest.id}')">
                                    接取任务
                                </button>
                            ` : `
                                <button class="btn btn-secondary" style="margin-top: 10px; width: 100%;" disabled>
                                    境界不足（需要${quest.requiredRealm}）
                                </button>
                            `}
                        </div>
                    `;
                });
            }
        }
        
        html += `
            </div>
            <button class="btn btn-secondary" style="margin-top: 15px; width: 100%;" id="close-bounty-modal">关闭</button>
        `;
        
        container.innerHTML = html;
        
        document.getElementById('close-bounty-modal').addEventListener('click', () => {
            this.closeNpcDialog();
        });
    }
    
    claimBountyReward(questId) {
        const success = this.game.completeBountyQuest(questId);
        if (success) {
            this.showBountyBoard();
            this.updateQuestPanel();
        }
    }
    
    acceptBountyQuest(questId) {
        // 找到对应的任务
        let quest = null;
        const bountyQuests = GAME_DATA.ITEM_DATABASE.BOUNTY_QUESTS;
        
        for (const realm in bountyQuests) {
            const quests = bountyQuests[realm];
            quest = quests.find(q => q.id === questId);
            if (quest) break;
        }
        
        if (!quest) {
            this.game.log('系统', '任务不存在！', 'error');
            return;
        }
        
        // 获取玩家当前境界
        const player = this.game.player;
        if (!player.realm || !player.realm.name) {
            this.game.log('系统', '无法获取玩家境界信息！', 'error');
            return;
        }
        
        // 检查境界是否足够
        const allRealms = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期'];
        const playerRealmIndex = allRealms.findIndex(r => player.realm.name.includes(r));
        const questRealmIndex = allRealms.indexOf(quest.requiredRealm);
        
        if (playerRealmIndex === -1 || questRealmIndex === -1) {
            this.game.log('系统', '境界信息错误！', 'error');
            return;
        }
        
        if (playerRealmIndex < questRealmIndex) {
            this.game.log('系统', `境界不足！需要达到${quest.requiredRealm}才能接取此任务！`, 'warning');
            return;
        }
        
        // 检查是否已经接取了该任务
        if (!this.game.player.bountyQuests) {
            this.game.player.bountyQuests = [];
        }
        
        const existingQuest = this.game.player.bountyQuests.find(q => q.id === questId);
        if (existingQuest) {
            this.game.log('系统', '你已经接取了该任务！', 'warning');
            return;
        }
        
        // 接取任务
        this.game.player.bountyQuests.push({
            ...quest,
            progress: 0,
            accepted: Date.now()
        });
        
        this.game.log('系统', `成功接取任务【${quest.title}】！`, 'success');
        this.showBountyBoard();
        this.updateQuestPanel();
    }
    

    
    promoteInSect(npc) {
        const player = this.game.player;
        if (!player.sect) {
            this.game.log('系统', '你还没有加入门派！', 'info');
            this.closeNpcDialog();
            return;
        }
        
        const sect = player.sect;
        const currentPosition = player.sectPosition || '外门弟子';
        
        const promotionRequirements = {
            '外门弟子': {
                next: '内门弟子',
                contribution: 1000,
                realm: '筑基期'
            },
            '内门弟子': {
                next: '核心弟子',
                contribution: 5000,
                realm: '金丹期'
            },
            '核心弟子': {
                next: '长老',
                contribution: 15000,
                realm: '元婴期'
            }
        };
        
        const requirement = promotionRequirements[currentPosition];
        if (!requirement) {
            this.game.log('系统', '你已经是最高职位了！', 'info');
            this.closeNpcDialog();
            return;
        }
        
        const hasContribution = player.contribution >= requirement.contribution;
        const hasRealm = player.realm.name.includes(requirement.realm);
        
        if (!hasContribution) {
            this.game.log('系统', `贡献度不足！需要${requirement.contribution}贡献度`, 'info');
        } else if (!hasRealm) {
            this.game.log('系统', `境界不足！需要${requirement.realm}`, 'info');
        } else {
            player.sectPosition = requirement.next;
            this.game.log('系统', `恭喜晋升为${requirement.next}！`, 'success');
        }
        
        this.closeNpcDialog();
        this.updateAll();
    }
    
    showSectGateDenial(sect) {
        const sectNames = {
            'jinyang': { name: '金阳门', guardMonster: 'jinyang-guard-monster' },
            'qingmu': { name: '青木宗', guardMonster: 'qingmu-guard-monster' },
            'shuiyue': { name: '水月宫', guardMonster: 'shuiyue-guard-monster' },
            'yanhuo': { name: '炎火殿', guardMonster: 'yanhuo-guard-monster' },
            'huangtu': { name: '皇土阁', guardMonster: 'huangtu-guard-monster' }
        };
        
        const sectInfo = sectNames[sect] || { name: '该门派', guardMonster: 'jinyang-guard-monster' };
        
        const modal = document.getElementById('npc-dialog');
        const content = document.getElementById('npc-dialog-content');
        const actionsContainer = document.getElementById('npc-actions');
        
        document.getElementById('npc-name').textContent = sectInfo.name + '守门人';
        content.innerHTML = `
            <p style="color: #ef4444; font-weight: bold; text-align: center;">⚠️ 禁止入内！</p>
            <p style="text-align: center; margin-top: 10px;">非${sectInfo.name}弟子，不得擅自闯入！</p>
        `;
        
        actionsContainer.innerHTML = '';
        
        const leaveBtn = document.createElement('button');
        leaveBtn.className = 'btn btn-secondary';
        leaveBtn.textContent = '离开';
        leaveBtn.addEventListener('click', () => {
            this.closeNpcDialog();
        });
        
        const sneakBtn = document.createElement('button');
        sneakBtn.className = 'btn btn-warning';
        sneakBtn.textContent = '偷溜进去';
        sneakBtn.addEventListener('click', () => {
            this.closeNpcDialog();
            if (Math.random() < 0.3) {
                this.game.log('系统', `你趁守门人不注意，顺利溜进了${sectInfo.name}！`, 'success');
                const map = this.game.currentMap;
                if (map && map.areas['core']) {
                    this.game.currentArea = map.areas['core'];
                    this.game.log('系统', `你来到了${this.game.currentArea.name}`, 'info');
                    this.updateAll();
                }
            } else {
                this.game.log('系统', '你的行踪被发现了！守门人怒喝一声，向你发起攻击！', 'combat');
                const success = this.game.initCombat(sectInfo.guardMonster, 'sect-guard');
                if (success) {
                    this.showBattle();
                }
            }
        });
        
        const fightBtn = document.createElement('button');
        fightBtn.className = 'btn btn-danger';
        fightBtn.textContent = '强闯';
        fightBtn.addEventListener('click', () => {
            this.closeNpcDialog();
            this.game.log('系统', '你决定强闯！守门人怒喝一声，向你发起攻击！', 'combat');
            const success = this.game.initCombat(sectInfo.guardMonster, 'sect-guard');
            if (success) {
                this.showBattle();
            }
        });
        
        actionsContainer.appendChild(leaveBtn);
        actionsContainer.appendChild(sneakBtn);
        actionsContainer.appendChild(fightBtn);
        
        modal.classList.remove('hidden');
    }
    
    showQuestModal(sect) {
        const container = document.getElementById('quest-modal-content');
        container.innerHTML = '';
        
        const playerSect = this.game.player.sect;
        const playerSectId = playerSect ? (typeof playerSect === 'object' ? playerSect.id : playerSect) : null;
        
        if (!playerSectId) {
            container.innerHTML = '<div style="text-align: center; color: #ef4444;">你不是本门派弟子，无法领取任务！</div>';
            document.getElementById('quest-modal').classList.remove('hidden');
            return;
        }
        
        // 确保sect参数是字符串格式的门派ID
        const sectId = typeof sect === 'object' ? sect.id : sect;
        if (playerSectId !== sectId) {
            container.innerHTML = '<div style="text-align: center; color: #ef4444;">你不是本门派弟子，无法领取任务！</div>';
            document.getElementById('quest-modal').classList.remove('hidden');
            return;
        }
        
        const sectQuests = GAME_DATA.SECT_QUESTS[sectId];
        
        if (!sectQuests || sectQuests.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #9ca3af;">暂无任务</div>';
            document.getElementById('quest-modal').classList.remove('hidden');
            return;
        }
        
        const currentQuests = this.game.player.quests || [];
        
        sectQuests.forEach(quest => {
            const playerQuest = currentQuests.find(q => q.id === quest.id);
            const div = document.createElement('div');
            div.className = 'item-slot';
            div.style.marginBottom = '10px';
            
            let statusText = '';
            let actionBtn = '';
            
            if (!playerQuest) {
                statusText = '<span style="color: #22c55e;">可领取</span>';
                actionBtn = `<button class="btn btn-primary" style="padding: 5px 15px; font-size: 12px;" data-quest-id="${quest.id}" data-action="accept">领取任务</button>`;
            } else if (playerQuest.completed) {
                statusText = '<span style="color: #3b82f6;">已完成，待提交</span>';
                actionBtn = `<button class="btn btn-success" style="padding: 5px 15px; font-size: 12px;" data-quest-id="${quest.id}" data-action="complete">提交任务</button>`;
            } else {
                statusText = `<span style="color: #fbbf24;">进行中 ${playerQuest.progress}/${quest.count}</span>`;
                actionBtn = '';
            }
            
            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <strong>${quest.title}</strong>
                    ${statusText}
                </div>
                <small style="color: #9ca3af; display: block; margin-bottom: 8px;">${quest.description}</small>
                <div style="font-size: 12px; color: #60a5fa; margin-bottom: 8px;">
                    奖励：贡献${quest.rewards.contribution} | 银两${quest.rewards.gold} | 修为${quest.rewards.exp}
                </div>
                ${actionBtn}
            `;
            
            container.appendChild(div);
        });
        
        container.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const questId = e.target.dataset.questId;
                const action = e.target.dataset.action;
                
                if (action === 'accept') {
                    const success = this.game.acceptQuest(questId);
                    if (success) {
                        this.showQuestModal(sect);
                        this.updateQuestPanel();
                    }
                } else if (action === 'complete') {
                    const success = this.game.completeQuest(questId);
                    if (success) {
                        this.showQuestModal(sect);
                        this.updateQuestPanel();
                    }
                }
            }
        });
        
        document.getElementById('quest-modal').classList.remove('hidden');
    }
    
    showContributionShopModal(sect) {
        const container = document.getElementById('shop-modal-content');
        container.innerHTML = '';
        
        // 中文门派名称到英文键的映射
        const sectMap = {
            '金阳门': 'jinyang',
            '青木宗': 'qingmu',
            '水月宫': 'shuiyue',
            '炎火殿': 'yanhuo',
            '皇土阁': 'huangtu'
        };
        
        const sectKey = sectMap[sect] || sect;
        const shop = GAME_DATA.SECT_SHOPS[sectKey];
        if (!shop) {
            document.getElementById('shop-modal').classList.remove('hidden');
            return;
        }
        
        document.getElementById('shop-title').textContent = shop.name;
        document.getElementById('shop-gold').textContent = `🏆 ${this.game.player.contribution} 贡献`;
        document.getElementById('shop-description').textContent = '使用门派贡献度兑换物品！';
        
        const contentDiv = document.createElement('div');
        contentDiv.style.display = 'grid';
        contentDiv.style.gridTemplateColumns = 'repeat(auto-fill, minmax(160px, 1fr))';
        contentDiv.style.gap = '10px';
        
        // 显示普通物品
        if (shop.items && shop.items.length > 0) {
            shop.items.forEach(item => {
                const itemData = GAME_DATA.ITEM_DATABASE.GENERATORS.getItemById(item.id);
                if (!itemData) {
                    console.error('物品数据不存在:', item.id);
                    return;
                }
                
                const div = document.createElement('div');
                div.className = 'item-slot';
                div.style.cssText = 'padding: 10px; cursor: pointer; text-align: center;';
                
                const itemQuality = this.getQualityName(itemData.rarity || itemData.quality);
                const icon = this.getItemIcon(itemData.type);
                const priceText = `${item.cost} 贡献`;
                const priceColor = '#3b82f6';
                
                div.innerHTML = `
                    <div style="font-size: 28px; margin-bottom: 5px;">${icon}</div>
                    <div style="color: ${this.getQualityColor(itemQuality)}; font-weight: bold; font-size: 12px; margin-bottom: 3px;">${item.id}</div>
                    <div style="color: ${priceColor}; font-size: 11px; font-weight: bold; margin-bottom: 3px;">${priceText}</div>
                    <div style="color: #9ca3af; font-size: 10px;">[${itemQuality}]</div>
                `;
                
                div.addEventListener('click', () => {
                    this.currentContributionItem = item;
                    this.openItemModal(item.id, 1);
                });
                
                contentDiv.appendChild(div);
            });
        }
        
        // 如果有配方兑换，显示高阶炼丹配方
        if (shop.recipes && shop.recipes.length > 0) {
            // 获取玩家当前境界
            const playerRealm = this.game.player.realm.name;
            const realmOrder = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期'];
            const playerRealmIndex = realmOrder.indexOf(playerRealm);
            
            // 添加分隔标题
            const separatorDiv = document.createElement('div');
            separatorDiv.style.cssText = 'grid-column: 1/-1; text-align: center; margin: 20px 0 10px 0; padding: 10px; background: rgba(168,85,247,0.2); border-radius: 8px;';
            separatorDiv.innerHTML = '<h3 style="color: #a855f7; margin: 0;">高阶炼丹配方</h3>';
            contentDiv.appendChild(separatorDiv);
            
            // 显示配方
            shop.recipes.forEach(recipeItem => {
                // 检查境界要求
                const requiredRealmIndex = realmOrder.indexOf(recipeItem.requiredRealm);
                if (playerRealmIndex < requiredRealmIndex) {
                    return; // 境界不足，跳过
                }
                
                // 检查玩家是否已经会这个配方
                if (this.game.player.knownRecipes && this.game.player.knownRecipes.includes(recipeItem.name)) {
                    return; // 已经学会，跳过
                }
                
                const div = document.createElement('div');
                div.className = 'item-slot';
                div.style.cssText = 'padding: 10px; cursor: pointer; text-align: center; background: rgba(168,85,247,0.1); border: 1px solid rgba(168,85,247,0.3);';
                
                const priceText = `${recipeItem.cost} 贡献`;
                const priceColor = '#a855f7';
                
                div.innerHTML = `
                    <div style="font-size: 28px; margin-bottom: 5px;">📜</div>
                    <div style="color: ${priceColor}; font-weight: bold; font-size: 12px; margin-bottom: 3px;">${recipeItem.name}</div>
                    <div style="color: ${priceColor}; font-size: 11px; font-weight: bold; margin-bottom: 3px;">${priceText}</div>
                    <div style="color: #9ca3af; font-size: 10px;">[配方]</div>
                `;
                
                div.addEventListener('click', () => {
                    this.exchangeRecipe(recipeItem);
                });
                
                contentDiv.appendChild(div);
            });
        }
        
        if (contentDiv.children.length === 0) {
            contentDiv.innerHTML = '<p style="color: #9ca3af; text-align: center; grid-column: 1/-1;">暂无商品</p>';
        }
        
        container.appendChild(contentDiv);
        document.getElementById('shop-modal').classList.remove('hidden');
    }

    // 兑换炼丹配方
    exchangeRecipe(recipeItem) {
        if (!this.game.player) return;
        
        // 检查贡献度
        if (this.game.player.contribution < recipeItem.cost) {
            this.game.log('系统', '贡献度不足！', 'error');
            return;
        }
        
        // 检查是否已经会这个配方
        if (!this.game.player.knownRecipes) {
            this.game.player.knownRecipes = [];
        }
        if (this.game.player.knownRecipes.includes(recipeItem.name)) {
            this.game.log('系统', '你已经学会这个配方了！', 'warning');
            return;
        }
        
        // 扣除贡献度
        this.game.player.contribution -= recipeItem.cost;
        
        // 学习配方
        this.game.player.knownRecipes.push(recipeItem.name);
        
        this.game.log('系统', `成功兑换并学会了配方：${recipeItem.name}！`, 'success');
        
        // 刷新界面
        this.showContributionShopModal(this.game.player.sect.name);
        this.updateAll();
    }
    
    learnMoreSkills() {
        if (!this.game.player.sect) return;
        
        this.closeNpcDialog();
        this.showSkillLearningModal();
    }
    
    showSkillLearningModal() {
        const modal = document.getElementById('shop-modal');
        const title = document.getElementById('shop-title');
        const container = document.getElementById('shop-modal-content');
        
        let sect = this.game.player.sect;
        if (sect && typeof sect === 'string') {
            sect = GAME_DATA.SECTS.find(s => s.id === sect);
        } else if (!sect || !sect.skills) {
            if (this.game.player.sect && typeof this.game.player.sect === 'object') {
                sect = GAME_DATA.SECTS.find(s => s.id === this.game.player.sect.id);
            }
        }
        
        if (!sect) {
            container.innerHTML = '<p style="text-align: center; color: #ef4444;">未加入门派，无法学习技能！</p>';
            title.textContent = '技能学习';
            modal.classList.remove('hidden');
            return;
        }
        
        const learnedSkills = this.game.player.skills;
        
        const getRealmTier = (name) => {
            if (name.includes('炼气')) return '炼气期';
            if (name.includes('筑基')) return '筑基期';
            if (name.includes('金丹')) return '金丹期';
            if (name.includes('元婴')) return '元婴期';
            if (name.includes('化神')) return '化神期';
            return '炼气期';
        };
        
        const playerTier = getRealmTier(this.game.player.realm.name);
        const realmOrder = ['炼气期', '筑基期', '金丹期', '元婴期', '化神期'];
        
        title.textContent = `${sect.name} - 技能学习`;
        container.innerHTML = '';
        
        const typeColors = {
            'attack': '#ef4444',
            'heal': '#22c55e',
            'passive': '#3b82f6',
            'buff': '#f59e0b',
            'defense': '#3b82f6',
            'control': '#f59e0b',
            'support': '#22c55e',
            'area': '#ef4444'
        };
        
        const typeNames = {
            'attack': '主动',
            'heal': '治疗',
            'passive': '被动',
            'buff': '增益',
            'defense': '防御',
            'control': '控制',
            'support': '辅助',
            'area': '范围'
        };
        
        const skillsGrid = document.createElement('div');
        skillsGrid.style.display = 'grid';
        skillsGrid.style.gridTemplateColumns = '1fr';
        skillsGrid.style.gap = '10px';
        
        sect.skills.forEach(skillName => {
            const skill = GAME_DATA.SKILLS[skillName];
            if (!skill) return;
            
            const isLearned = learnedSkills.includes(skillName);
            const requiredRealm = skill.requiredRealm || '炼气期';
            const canLearnRealm = realmOrder.indexOf(playerTier) >= realmOrder.indexOf(requiredRealm);
            const canLearn = !isLearned && canLearnRealm;
            
            const skillCard = document.createElement('div');
            skillCard.style.padding = '12px';
            skillCard.style.borderRadius = '8px';
            skillCard.style.border = `1px solid ${isLearned ? '#22c55e' : canLearn ? '#3b82f6' : '#4b5563'}`;
            skillCard.style.background = isLearned ? 'rgba(34, 197, 94, 0.1)' : canLearn ? 'rgba(59, 130, 246, 0.1)' : 'rgba(55, 65, 81, 0.5)';
            
            let skillDetails = '';
            if (skill.damage) skillDetails += `<span style="color: #ef4444;">伤害+${skill.damage}</span> `;
            if (skill.heal) skillDetails += `<span style="color: #22c55e;">治疗+${skill.heal}</span> `;
            if (skill.defenseBonus) skillDetails += `<span style="color: #3b82f6;">防御+${skill.defenseBonus}</span> `;
            if (skill.cooldown) skillDetails += `<span style="color: #6b7280;">冷却: ${skill.cooldown}回合</span> `;
            if (skill.manaCost) skillDetails += `<span style="color: #60a5fa;">灵力消耗: ${skill.manaCost}</span> `;
            
            const realmHint = !canLearnRealm ? `<span style="color: #ef4444; font-size: 12px;">(需要${requiredRealm})</span>` : '';
            
            skillCard.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="color: ${typeColors[skill.type] || '#fff'};">${skill.name}</strong>
                        <span style="font-size: 12px; color: #9ca3af; margin-left: 10px;">
                            [${typeNames[skill.type] || '技能'}]
                        </span>
                        ${realmHint}
                    </div>
                    ${isLearned ? '<span style="color: #22c55e;">✓ 已学会</span>' : ''}
                </div>
                <p style="margin-top: 8px; color: #d1d5db; font-size: 13px;">${skill.description || skill.effect || '暂无描述'}</p>
                ${skillDetails ? `<p style="margin-top: 4px; color: #9ca3af; font-size: 12px;">${skillDetails}</p>` : ''}
            `;
            
            if (canLearn) {
                const learnBtn = document.createElement('button');
                learnBtn.className = 'btn btn-primary';
                learnBtn.style.marginTop = '10px';
                learnBtn.style.width = '100%';
                learnBtn.textContent = '学习技能';
                learnBtn.addEventListener('click', () => {
                    this.game.player.skills.push(skillName);
                    this.game.log('传功长老', `学会了 ${skillName}！`, 'success');
                    this.showSkillLearningModal();
                    this.updateAll();
                });
                skillCard.appendChild(learnBtn);
            }
            
            skillsGrid.appendChild(skillCard);
        });
        
        container.appendChild(skillsGrid);
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn btn-secondary';
        closeBtn.style.marginTop = '20px';
        closeBtn.style.width = '100%';
        closeBtn.textContent = '关闭';
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
        container.appendChild(closeBtn);
        
        modal.classList.remove('hidden');
    }

    showBattle() {
        this.updateBattle();
        document.getElementById('battle-screen').classList.remove('hidden');
        document.getElementById('battle-log').innerHTML = '';
        this.updateBattleLog();
    }
    
    // 显示伤害数字
    showDamageNumber(x, y, damage, isPlayer = false) {
        const damageDiv = document.createElement('div');
        damageDiv.style.position = 'absolute';
        damageDiv.style.left = `${x}px`;
        damageDiv.style.top = `${y}px`;
        damageDiv.style.color = isPlayer ? '#ef4444' : '#22c55e';
        damageDiv.style.fontSize = '24px';
        damageDiv.style.fontWeight = 'bold';
        damageDiv.style.pointerEvents = 'none';
        damageDiv.style.zIndex = '1000';
        damageDiv.style.textShadow = '0 0 10px rgba(0,0,0,0.8)';
        damageDiv.style.fontFamily = 'Arial, sans-serif';
        damageDiv.textContent = `-${damage}`;
        
        // 添加初始缩放效果
        damageDiv.style.transform = 'scale(0)';
        damageDiv.style.transition = 'transform 0.2s ease, opacity 0.5s ease, translateY 0.5s ease';
        
        document.body.appendChild(damageDiv);
        
        // 触发动画
        setTimeout(() => {
            damageDiv.style.transform = 'scale(1.5) translateY(-20px)';
            damageDiv.style.opacity = '1';
        }, 10);
        
        // 结束动画
        setTimeout(() => {
            damageDiv.style.transform = 'scale(1) translateY(-60px)';
            damageDiv.style.opacity = '0';
            
            // 移除元素
            setTimeout(() => {
                if (damageDiv.parentNode) {
                    damageDiv.parentNode.removeChild(damageDiv);
                }
            }, 500);
        }, 100);
    }
    
    // 显示攻击动画
    showAttackAnimation(target, isPlayer = false) {
        if (!target) return;
        
        const animationDiv = document.createElement('div');
        animationDiv.style.position = 'absolute';
        animationDiv.style.width = '100%';
        animationDiv.style.height = '100%';
        animationDiv.style.top = '0';
        animationDiv.style.left = '0';
        animationDiv.style.background = isPlayer ? 'rgba(255, 200, 0, 0.7)' : 'rgba(239, 68, 68, 0.7)';
        animationDiv.style.borderRadius = '10px';
        animationDiv.style.zIndex = '999';
        animationDiv.style.transition = 'all 0.3s ease';
        animationDiv.style.transform = 'scale(0.8)';
        animationDiv.style.boxShadow = isPlayer ? '0 0 20px rgba(255, 200, 0, 0.8)' : '0 0 20px rgba(239, 68, 68, 0.8)';
        
        target.appendChild(animationDiv);
        
        // 触发动画
        setTimeout(() => {
            animationDiv.style.transform = 'scale(1.1)';
            animationDiv.style.opacity = '0.5';
        }, 10);
        
        // 结束动画
        setTimeout(() => {
            animationDiv.style.transform = 'scale(1)';
            animationDiv.style.opacity = '0';
            
            // 移除元素
            setTimeout(() => {
                if (animationDiv.parentNode) {
                    animationDiv.parentNode.removeChild(animationDiv);
                }
            }, 300);
        }, 150);
    }
    
    // 显示粒子效果
    showParticleEffect(x, y, isPlayer = false) {
        const particleCount = 10;
        const colors = isPlayer ? ['#ffd700', '#ffed4e', '#ffc107'] : ['#ef4444', '#f87171', '#fb923c'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '999';
            particle.style.opacity = '0.8';
            
            document.body.appendChild(particle);
            
            // 随机方向和速度
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 2;
            const distance = Math.random() * 40 + 20;
            
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            // 动画
            particle.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                particle.style.transform = `translate(${endX}px, ${endY}px)`;
                particle.style.opacity = '0';
                particle.style.width = '2px';
                particle.style.height = '2px';
            }, 10);
            
            // 移除元素
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 600);
        }
    }
    
    // 震动效果
    shakeElement(element) {
        if (!element) return;
        
        element.style.transition = 'transform 0.1s ease';
        
        // 震动效果
        element.style.transform = 'translateX(-5px)';
        setTimeout(() => {
            element.style.transform = 'translateX(5px)';
            setTimeout(() => {
                element.style.transform = 'translateX(-3px)';
                setTimeout(() => {
                    element.style.transform = 'translateX(3px)';
                    setTimeout(() => {
                        element.style.transform = 'translateX(0)';
                    }, 100);
                }, 100);
            }, 100);
        }, 100);
    }
    
    updateBattle() {
        const enemies = this.game.currentEnemies;
        
        if (!this.game.inBattle) {
            document.getElementById('battle-screen').classList.add('hidden');
            this.selectedEnemyIndex = null; // 重置选中的目标
            if (this.game.player.hp <= 0) {
                this.showDeathScreen();
            }
            this.updateAll();
            return;
        }
        
        document.getElementById('battle-screen').classList.remove('hidden');
        
        const enemiesContainer = document.getElementById('battle-enemies-container');
        enemiesContainer.innerHTML = '';
        
        const rarityColors = {
            common: '#9ca3af',
            uncommon: '#22c55e',
            rare: '#3b82f6',
            epic: '#a855f7',
            legendary: '#f59e0b',
            mythic: '#ef4444'
        };
        
        enemies.forEach((enemy, index) => {
            if (!enemy.currentHp || enemy.currentHp <= 0) return;
            
            const maxHp = enemy.maxHp || enemy.hp || 1;
            const hpPercent = (enemy.currentHp / maxHp) * 100;
            const color = rarityColors[enemy.rarity] || '#ef4444';
            
            const enemyDiv = document.createElement('div');
            enemyDiv.style.background = 'rgba(239, 68, 68, 0.15)';
            enemyDiv.style.padding = '10px';
            enemyDiv.style.borderRadius = '8px';
            enemyDiv.style.border = `2px solid ${color}`;
            enemyDiv.style.position = 'relative';
            enemyDiv.style.transition = 'all 0.3s ease';
            
            enemyDiv.innerHTML = `
                <div style="text-align: center; margin-bottom: 8px;">
                    <strong style="color: ${color}; font-size: 13px;">${enemy.name}</strong>
                </div>
                <div class="stat-bar" style="margin-bottom: 8px; font-size: 11px;">
                    <label>气血:</label>
                    <div class="bar" style="position: relative; height: 8px; background: rgba(239, 68, 68, 0.2); border-radius: 4px; overflow: hidden;">
                        <div class="fill" style="width: ${Math.max(0, hpPercent)}%; background: linear-gradient(90deg, #ef4444, #dc2626); height: 100%; transition: width 0.5s ease;"></div>
                    </div>
                    <span>${Math.max(0, enemy.currentHp)}/${maxHp}</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                    <div style="text-align: center; padding: 6px; background: rgba(239, 68, 68, 0.2); border-radius: 4px;">
                        <div style="color: #9ca3af; font-size: 10px;">攻击</div>
                        <div style="color: #ef4444; font-weight: bold; font-size: 12px;">${enemy.attack}</div>
                    </div>
                    <div style="text-align: center; padding: 6px; background: rgba(59, 130, 246, 0.2); border-radius: 4px;">
                        <div style="color: #9ca3af; font-size: 10px;">防御</div>
                        <div style="color: #3b82f6; font-weight: bold; font-size: 12px;">${enemy.defense}</div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 6px; padding: 4px; background: rgba(251, 191, 36, 0.2); border-radius: 4px; font-size: 10px; color: #fbbf24;">
                    点击选择目标
                </div>
            `;
            
            // 添加点击事件，选择该敌人作为攻击目标
            enemyDiv.style.cursor = 'pointer';
            enemyDiv.addEventListener('click', () => {
                this.selectedEnemyIndex = index;
                // 高亮选中的敌人
                Array.from(enemiesContainer.children).forEach((child, idx) => {
                    if (idx === index) {
                        child.style.boxShadow = '0 0 15px #fbbf24';
                        child.style.transform = 'scale(1.02)';
                    } else {
                        child.style.boxShadow = '';
                        child.style.transform = '';
                    }
                });
            });
            
            enemiesContainer.appendChild(enemyDiv);
        });
        
        const player = this.game.player;
        const totalStats = this.game.getPlayerTotalStats();
        const playerHpPercent = (player.hp / totalStats.maxHp) * 100;
        const playerMpPercent = (player.mp / totalStats.maxMp) * 100;
        
        // 添加平滑过渡效果
        const hpFill = document.getElementById('battle-player-hp-fill');
        const mpFill = document.getElementById('battle-player-mp-fill');
        hpFill.style.transition = 'width 0.5s ease';
        mpFill.style.transition = 'width 0.5s ease';
        
        hpFill.style.width = `${Math.max(0, playerHpPercent)}%`;
        document.getElementById('battle-player-hp-text').textContent = `${Math.max(0, player.hp)}/${totalStats.maxHp}`;
        mpFill.style.width = `${Math.max(0, playerMpPercent)}%`;
        document.getElementById('battle-player-mp-text').textContent = `${Math.max(0, player.mp)}/${totalStats.maxMp}`;
        document.getElementById('battle-player-attack').textContent = totalStats.attack;
        document.getElementById('battle-player-defense').textContent = totalStats.defense;
        
        this.updateBattleActions();
        this.updateBattleSkills();
        this.updateBattleLog();
    }
    
    updateBattleActions() {
        const container = document.getElementById('battle-actions');
        container.innerHTML = '';
        
        const aliveEnemies = this.game.currentEnemies.filter(e => e.currentHp && e.currentHp > 0);
        
        if (aliveEnemies.length === 0) return;
        
        // 获取选中的目标或第一个存活的敌人
        let targetEnemy = aliveEnemies[0];
        let targetIndex = this.game.currentEnemies.indexOf(targetEnemy);
        
        if (this.selectedEnemyIndex !== undefined && this.selectedEnemyIndex !== null) {
            const selectedEnemy = this.game.currentEnemies[this.selectedEnemyIndex];
            if (selectedEnemy && selectedEnemy.currentHp > 0) {
                targetEnemy = selectedEnemy;
                targetIndex = this.selectedEnemyIndex;
            }
        }
        
        // 添加"普通攻击"按钮
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.style.padding = '8px 12px';
        btn.style.fontSize = '12px';
        btn.innerHTML = `<strong>普通攻击</strong><br><small>${targetEnemy.name}</small>`;
        btn.addEventListener('click', () => {
            this.game.attackEnemy(targetIndex, '普通攻击');
            this.updateBattle();
        });
        container.appendChild(btn);
        
        // 如果有多个敌人，显示目标选择提示
        if (aliveEnemies.length > 1) {
            const tipBtn = document.createElement('button');
            tipBtn.className = 'btn btn-secondary';
            tipBtn.style.padding = '8px 12px';
            tipBtn.style.fontSize = '11px';
            tipBtn.innerHTML = `<small>点击右侧敌人<br>切换目标</small>`;
            tipBtn.disabled = true;
            container.appendChild(tipBtn);
        }
    }
    
    // 初始化战斗界面事件
    initBattleEvents() {
        // 技能菜单按钮点击事件
        const skillMenuBtn = document.getElementById('battle-skill-menu-btn');
        if (skillMenuBtn) {
            skillMenuBtn.addEventListener('click', () => {
                this.showSkillSelectModal();
            });
        }
        
        // 关闭技能选择模态框
        const closeSkillSelectBtn = document.getElementById('close-skill-select-modal');
        if (closeSkillSelectBtn) {
            closeSkillSelectBtn.addEventListener('click', () => {
                document.getElementById('skill-select-modal').classList.add('hidden');
            });
        }
        
        // 关闭快捷键设置模态框
        const closeHotkeySetBtn = document.getElementById('close-hotkey-set-modal');
        if (closeHotkeySetBtn) {
            closeHotkeySetBtn.addEventListener('click', () => {
                document.getElementById('hotkey-set-modal').classList.add('hidden');
            });
        }
        
        // 快捷键槽位点击事件
        const hotkeySlots = document.querySelectorAll('.hotkey-slot');
        hotkeySlots.forEach(slot => {
            slot.addEventListener('click', () => {
                const slotNumber = slot.dataset.slot;
                this.showHotkeySetModal(slotNumber);
            });
        });
        
        // 键盘快捷键事件
        document.addEventListener('keydown', (e) => {
            if (!this.game.inBattle) return;
            
            const key = e.key;
            if (key >= '1' && key <= '8') {
                const slotNumber = parseInt(key);
                this.useHotkeySkill(slotNumber);
            }
        });
    }
    
    // 显示技能选择模态框
    showSkillSelectModal() {
        const modal = document.getElementById('skill-select-modal');
        const content = document.getElementById('skill-select-content');
        const player = this.game.player;
        const aliveEnemies = this.game.currentEnemies.filter(e => e.currentHp && e.currentHp > 0);
        
        if (aliveEnemies.length === 0) return;
        
        // 获取选中的目标或第一个存活的敌人
        let targetEnemy = aliveEnemies[0];
        let targetIndex = this.game.currentEnemies.indexOf(targetEnemy);
        
        if (this.selectedEnemyIndex !== undefined && this.selectedEnemyIndex !== null) {
            const selectedEnemy = this.game.currentEnemies[this.selectedEnemyIndex];
            if (selectedEnemy && selectedEnemy.currentHp > 0) {
                targetEnemy = selectedEnemy;
                targetIndex = this.selectedEnemyIndex;
            }
        }
        
        content.innerHTML = '';
        
        // 显示普通技能
        player.skills.forEach(skillName => {
            const skill = GAME_DATA.SKILLS[skillName];
            if (!skill || skill.type === 'passive') return;
            
            const canUse = player.mp >= skill.mpCost;
            
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-select-item';
            skillItem.style.opacity = canUse ? '1' : '0.5';
            skillItem.innerHTML = `
                <div class="skill-name">${skill.name}</div>
                <div class="skill-cost">灵力消耗: ${skill.mpCost}</div>
                <div class="skill-desc" style="font-size: 12px; color: #9ca3af; margin-top: 5px;">${skill.description || '暂无描述'}</div>
            `;
            
            if (canUse) {
                skillItem.addEventListener('click', () => {
                    if (skill.isAOE) {
                        this.game.attackEnemy(0, skillName);
                    } else if (targetIndex !== -1) {
                        this.game.attackEnemy(targetIndex, skillName);
                    }
                    this.updateBattle();
                    document.getElementById('skill-select-modal').classList.add('hidden');
                });
            }
            
            content.appendChild(skillItem);
        });
        
        // 显示散修技能
        if (player.sanxiuActiveSkills) {
            player.sanxiuActiveSkills.forEach(skillName => {
                const skill = GAME_DATA.SANXIU_ACTIVE_SKILLS[skillName];
                if (!skill || skill.type === 'passive') return;
                
                const canUse = player.mp >= (skill.mpCost || 0);
                
                const skillItem = document.createElement('div');
                skillItem.className = 'skill-select-item';
                skillItem.style.opacity = canUse ? '1' : '0.5';
                skillItem.innerHTML = `
                    <div class="skill-name">${skill.name} (散修)</div>
                    <div class="skill-cost">灵力消耗: ${skill.mpCost || 0}</div>
                    <div class="skill-desc" style="font-size: 12px; color: #9ca3af; margin-top: 5px;">${skill.description || '暂无描述'}</div>
                `;
                
                if (canUse) {
                    skillItem.addEventListener('click', () => {
                        if (skill.isAOE) {
                            this.game.attackEnemy(0, skillName);
                        } else if (targetIndex !== -1) {
                            this.game.attackEnemy(targetIndex, skillName);
                        }
                        this.updateBattle();
                        document.getElementById('skill-select-modal').classList.add('hidden');
                    });
                }
                
                content.appendChild(skillItem);
            });
        }
        
        modal.classList.remove('hidden');
    }
    
    // 显示快捷键设置模态框
    showHotkeySetModal(slotNumber) {
        const modal = document.getElementById('hotkey-set-modal');
        const content = document.getElementById('hotkey-set-content');
        const player = this.game.player;
        
        content.innerHTML = `
            <h3 style="color: #fbbf24; margin-bottom: 15px;">选择技能设置到快捷键 ${slotNumber}</h3>
        `;
        
        // 添加门派技能
        player.skills.forEach(skillName => {
            const skill = GAME_DATA.SKILLS[skillName];
            if (!skill || skill.type === 'passive') return;
            
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-select-item';
            skillItem.innerHTML = `
                <div class="skill-name">${skill.name}</div>
                <div class="skill-cost">灵力消耗: ${skill.mpCost}</div>
                <div class="skill-desc" style="font-size: 12px; color: #9ca3af; margin-top: 5px;">${skill.description || '暂无描述'}</div>
            `;
            
            skillItem.addEventListener('click', () => {
                this.setHotkeySkill(slotNumber, skillName);
                document.getElementById('hotkey-set-modal').classList.add('hidden');
            });
            
            content.appendChild(skillItem);
        });
        
        // 添加散修技能
        if (player.sanxiuActiveSkills) {
            player.sanxiuActiveSkills.forEach(skillId => {
                const skill = GAME_DATA.SANXIU_ACTIVE_SKILLS[skillId];
                if (!skill || skill.type === 'passive') return;
                
                const skillItem = document.createElement('div');
                skillItem.className = 'skill-select-item';
                skillItem.innerHTML = `
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-cost">灵力消耗: ${skill.mpCost}</div>
                    <div class="skill-desc" style="font-size: 12px; color: #9ca3af; margin-top: 5px;">${skill.description || '暂无描述'}</div>
                `;
                
                skillItem.addEventListener('click', () => {
                    this.setHotkeySkill(slotNumber, skillId);
                    document.getElementById('hotkey-set-modal').classList.add('hidden');
                });
                
                content.appendChild(skillItem);
            });
        }
        
        modal.classList.remove('hidden');
    }
    
    // 设置快捷键技能
    setHotkeySkill(slotNumber, skillName) {
        if (!this.game.player.hotkeys) {
            this.game.player.hotkeys = {};
        }
        this.game.player.hotkeys[slotNumber] = skillName;
        this.updateHotkeys();
    }
    
    // 使用快捷键技能
    useHotkeySkill(slotNumber) {
        if (!this.game.player.hotkeys || !this.game.player.hotkeys[slotNumber]) return;
        
        const skillName = this.game.player.hotkeys[slotNumber];
        let skill = GAME_DATA.SKILLS[skillName];
        let isSanxiuSkill = false;
        
        // 检查是否是散修技能
        if (!skill && this.game.player.sanxiuActiveSkills && this.game.player.sanxiuActiveSkills.includes(skillName)) {
            skill = GAME_DATA.SANXIU_ACTIVE_SKILLS[skillName];
            isSanxiuSkill = true;
        }
        
        if (!skill || skill.type === 'passive') return;
        
        const player = this.game.player;
        if (player.mp < skill.mpCost) return;
        
        const aliveEnemies = this.game.currentEnemies.filter(e => e.currentHp && e.currentHp > 0);
        if (aliveEnemies.length === 0) return;
        
        // 获取选中的目标或第一个存活的敌人
        let targetEnemy = aliveEnemies[0];
        let targetIndex = this.game.currentEnemies.indexOf(targetEnemy);
        
        if (this.selectedEnemyIndex !== undefined && this.selectedEnemyIndex !== null) {
            const selectedEnemy = this.game.currentEnemies[this.selectedEnemyIndex];
            if (selectedEnemy && selectedEnemy.currentHp > 0) {
                targetEnemy = selectedEnemy;
                targetIndex = this.selectedEnemyIndex;
            }
        }
        
        if (isSanxiuSkill) {
            // 使用散修技能
            this.game.useSanxiuSkill(skillName, targetIndex);
        } else {
            // 使用门派技能
            if (skill.isAOE) {
                this.game.attackEnemy(0, skillName);
            } else if (targetIndex !== -1) {
                this.game.attackEnemy(targetIndex, skillName);
            }
        }
        this.updateBattle();
    }
    
    // 更新快捷键显示
    updateHotkeys() {
        const hotkeySlots = document.querySelectorAll('.hotkey-slot');
        hotkeySlots.forEach(slot => {
            const slotNumber = slot.dataset.slot;
            const skillElement = slot.querySelector('.hotkey-skill');
            
            if (this.game.player.hotkeys && this.game.player.hotkeys[slotNumber]) {
                const skillName = this.game.player.hotkeys[slotNumber];
                let skill = GAME_DATA.SKILLS[skillName];
                
                // 检查是否是散修技能
                if (!skill && this.game.player.sanxiuActiveSkills && this.game.player.sanxiuActiveSkills.includes(skillName)) {
                    skill = GAME_DATA.SANXIU_ACTIVE_SKILLS[skillName];
                }
                
                if (skill) {
                    skillElement.textContent = skill.name;
                    slot.classList.remove('empty');
                } else {
                    skillElement.textContent = '空';
                    slot.classList.add('empty');
                }
            } else {
                skillElement.textContent = '空';
                slot.classList.add('empty');
            }
        });
    }
    
    updateBattleSkills() {
        // 初始化战斗事件（如果尚未初始化）
        if (!this.battleEventsInitialized) {
            this.initBattleEvents();
            this.battleEventsInitialized = true;
        }
        
        // 更新快捷键显示
        this.updateHotkeys();
        
        // 添加防御和逃跑按钮到基础攻击区域
        const actionsContainer = document.getElementById('battle-actions');
        if (actionsContainer) {
            // 清空容器
            actionsContainer.innerHTML = '';
            
            // 获取选中的目标或第一个存活的敌人
            const aliveEnemies = this.game.currentEnemies.filter(e => e.currentHp && e.currentHp > 0);
            if (aliveEnemies.length > 0) {
                let targetEnemy = aliveEnemies[0];
                let targetIndex = this.game.currentEnemies.indexOf(targetEnemy);
                
                if (this.selectedEnemyIndex !== undefined && this.selectedEnemyIndex !== null) {
                    const selectedEnemy = this.game.currentEnemies[this.selectedEnemyIndex];
                    if (selectedEnemy && selectedEnemy.currentHp > 0) {
                        targetEnemy = selectedEnemy;
                        targetIndex = this.selectedEnemyIndex;
                    }
                }
                
                // 添加普通攻击按钮
                const attackBtn = document.createElement('button');
                attackBtn.className = 'btn btn-primary';
                attackBtn.style.padding = '8px';
                attackBtn.style.fontSize = '11px';
                attackBtn.style.height = '60px';
                attackBtn.style.display = 'flex';
                attackBtn.style.flexDirection = 'column';
                attackBtn.style.justifyContent = 'center';
                attackBtn.style.alignItems = 'center';
                attackBtn.style.width = '100%';
                attackBtn.innerHTML = `<strong>普通攻击</strong><br><small>${targetEnemy.name}</small>`;
                attackBtn.addEventListener('click', () => {
                    this.game.attackEnemy(targetIndex, '普通攻击');
                    this.updateBattle();
                });
                actionsContainer.appendChild(attackBtn);
                
                // 添加防御按钮
                const defenseBtn = document.createElement('button');
                defenseBtn.className = 'btn btn-secondary';
                defenseBtn.style.padding = '8px';
                defenseBtn.style.fontSize = '11px';
                defenseBtn.style.height = '60px';
                defenseBtn.style.display = 'flex';
                defenseBtn.style.flexDirection = 'column';
                defenseBtn.style.justifyContent = 'center';
                defenseBtn.style.alignItems = 'center';
                defenseBtn.style.width = '100%';
                defenseBtn.innerHTML = `<strong>防御</strong><br><small>减少伤害</small>`;
                defenseBtn.addEventListener('click', () => {
                    this.game.defend();
                    this.updateBattle();
                });
                actionsContainer.appendChild(defenseBtn);
                
                // 添加逃跑按钮到技能菜单下面
                const escapeContainer = document.getElementById('battle-escape-container');
                if (escapeContainer) {
                    escapeContainer.innerHTML = '';
                    const fleeBtn = document.createElement('button');
                    fleeBtn.className = 'btn btn-secondary';
                    fleeBtn.style.padding = '8px';
                    fleeBtn.style.fontSize = '11px';
                    fleeBtn.style.height = '60px';
                    fleeBtn.style.display = 'flex';
                    fleeBtn.style.flexDirection = 'column';
                    fleeBtn.style.justifyContent = 'center';
                    fleeBtn.style.alignItems = 'center';
                    fleeBtn.style.width = '100%';
                    fleeBtn.innerHTML = `<strong>逃跑</strong><br><small>50%成功率</small>`;
                    fleeBtn.addEventListener('click', () => this.tryFlee());
                    escapeContainer.appendChild(fleeBtn);
                }
                
                // 更新技能菜单按钮的样式
                const skillMenuBtn = document.getElementById('battle-skill-menu-btn');
                if (skillMenuBtn) {
                    skillMenuBtn.style.padding = '8px';
                    skillMenuBtn.style.fontSize = '11px';
                    skillMenuBtn.style.height = '60px';
                    skillMenuBtn.style.display = 'flex';
                    skillMenuBtn.style.flexDirection = 'column';
                    skillMenuBtn.style.justifyContent = 'center';
                    skillMenuBtn.style.alignItems = 'center';
                    skillMenuBtn.style.width = '100%';
                }
            }
        }
    }

    updateBattleLog() {
        const container = document.getElementById('battle-log');
        container.innerHTML = '';
        
        const battleMessages = this.game.messageLog.filter(msg => msg.category === 'combat' || msg.category === 'success').slice(0, 10);
        battleMessages.reverse().forEach(msg => {
            const div = document.createElement('div');
            div.className = `log-message ${msg.category}`;
            div.textContent = `${msg.message}`;
            container.appendChild(div);
        });
    }

    tryFlee() {
        if (Math.random() < 0.5) {
            this.game.log('战斗', '成功逃跑！', 'success');
            this.game.inBattle = false;
            this.game.currentEnemy = null;
            this.game.currentEnemies = [];
            document.getElementById('battle-screen').classList.add('hidden');
            if (this.game.inDungeon) {
                this.game.exitDungeon();
            }
            this.updateAll();
        } else {
            this.game.log('战斗', '逃跑失败！', 'combat');
            this.game.enemyTurn();
            this.updateBattle();
        }
    }

    showVictoryScreen() {
        const player = this.game.player;
        const rewards = this.game.lastBattleRewards || { cultivation: 0, drops: [] };
        let content = '';
        
        content += `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
                <div style="color: #22c55e; font-size: 20px; font-weight: bold;">战斗胜利！</div>
            </div>
            <div style="margin-bottom: 20px; padding: 15px; background: rgba(34, 197, 94, 0.1); border-radius: 8px;">
                <div style="margin-bottom: 10px;">
                    <span>获得修为：</span>
                    <span style="color: #fbbf24; font-weight: bold;">+${rewards.cultivation}</span>
                </div>
                <div style="margin-bottom: 10px;">
                    <span>当前修为：</span>
                    <span style="color: #fbbf24; font-weight: bold;">${player.cultivation}</span>
                </div>
                <div>
                    <span>当前境界：</span>
                    <span style="color: #3b82f6; font-weight: bold;">${player.realm.name}</span>
                </div>
            </div>
        `;
        
        if (rewards.drops.length > 0) {
            content += `
                <div style="margin-bottom: 20px; padding: 15px; background: rgba(59, 130, 246, 0.1); border-radius: 8px;">
                    <h4 style="margin-bottom: 10px; color: #60a5fa;">获得战利品</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
            `;
            
            const dropSummary = {};
            rewards.drops.forEach(drop => {
                let itemKey = '';
                if (typeof drop.item === 'object' && drop.item !== null) {
                    if (drop.isEquipment) {
                        // 装备对象
                        itemKey = `${drop.item.name} [${drop.item.quality}]`;
                    } else {
                        itemKey = '未知物品';
                    }
                } else {
                    // 字符串物品
                    itemKey = drop.item;
                }
                if (!dropSummary[itemKey]) {
                    dropSummary[itemKey] = 0;
                }
                dropSummary[itemKey] += drop.quantity;
            });
            
            Object.keys(dropSummary).forEach(itemName => {
                const quantity = dropSummary[itemName];
                const quantityStr = quantity > 1 ? ` x${quantity}` : '';
                content += `<div style="color: #d1d5db;">${itemName}${quantityStr}</div>`;
            });
            
            content += `
                    </div>
                </div>
            `;
        }
        
        document.getElementById('victory-content').innerHTML = content;
        document.getElementById('victory-screen').classList.remove('hidden');
    }
    
    closeVictoryScreen() {
        document.getElementById('victory-screen').classList.add('hidden');
    }
    
    showDeathScreen() {
        document.getElementById('death-info').innerHTML = `
            <p>你的修仙旅途结束了...</p>
            <p style="margin-top: 15px;">境界: ${this.game.player.realm.name}</p>
            <p>灵根: ${this.game.player.lingen.name}</p>
            <p>轮回次数: ${this.game.reincarnationCount + 1}</p>
            <p style="margin-top: 15px; color: #34d399;">下次轮回将获得: +${Math.floor((this.game.inheritance.stats.bonus + 0.1) * 100)}%修炼速度</p>
        `;
        document.getElementById('death-screen').classList.remove('hidden');
    }

    updateSkillPanel() {
        const container = document.getElementById('skill-panel');
        container.innerHTML = '<h3>技能</h3>';
        
        if (!this.game.player) return;
        
        this.game.player.skills.forEach(skillName => {
            const skill = GAME_DATA.SKILLS[skillName];
            if (skill) {
                const div = document.createElement('div');
                div.className = 'item-slot';
                div.innerHTML = `
                    <strong>${skill.name}</strong>
                    <br><small>${skill.description}</small>
                    <br><small style="color: #60a5fa;">消耗: ${skill.mpCost}MP</small>
                `;
                container.appendChild(div);
            }
        });
    }

    updateMessageLog() {
        const container = document.getElementById('message-log');
        container.innerHTML = '';
        
        this.game.messageLog.slice(0, 50).forEach(msg => {
            const div = document.createElement('div');
            div.className = `log-message ${msg.category}`;
            div.innerHTML = `<span style="color: #6b7280;">[${msg.timestamp}]</span> <strong>[${msg.type}]</strong> ${msg.message}`;
            container.appendChild(div);
        });
    }
    
    startCombat(monsterId, battleType = 'wild') {
        this.game.initCombat(monsterId, battleType);
        this.showBattle();
    }
    
    showCombatScreen() {
        document.getElementById('combat-screen').classList.remove('hidden');
        this.updateCombatUI();
    }
    
    updateCombatUI() {
        if (!this.game.combat || !this.game.combat.active) {
            document.getElementById('combat-screen').classList.add('hidden');
            this.updateAll();
            return;
        }
        
        const combat = this.game.combat;
        const player = this.game.player;
        const monster = combat.monster;
        const totalStats = this.game.getPlayerTotalStats();
        
        document.getElementById('combat-player-hp').textContent = `气血: ${Math.max(0, player.hp)}/${totalStats.maxHp}`;
        document.getElementById('combat-player-mp').textContent = `灵力: ${Math.max(0, player.mp)}/${totalStats.maxMp}`;
        
        document.getElementById('combat-monster-name').textContent = monster.name;
        document.getElementById('combat-monster-hp').textContent = `气血: ${Math.max(0, monster.currentHp || monster.hp)}/${monster.maxHp || monster.hp}`;
        document.getElementById('combat-monster-realm').textContent = monster.realm || '未知';
        
        const combatLogContainer = document.getElementById('combat-log');
        combatLogContainer.innerHTML = '';
        
        this.game.messageLog.slice(-10).forEach(msg => {
            if (msg.type === '战斗') {
                const div = document.createElement('div');
                div.style.marginBottom = '5px';
                div.style.padding = '5px';
                div.style.borderRadius = '4px';
                div.style.background = 'rgba(0,0,0,0.2)';
                div.textContent = msg.message;
                combatLogContainer.appendChild(div);
            }
        });
        
        combatLogContainer.scrollTop = combatLogContainer.scrollHeight;
        
        // 初始化战斗事件（如果尚未初始化）
        if (!this.combatEventsInitialized) {
            this.initCombatEvents();
            this.combatEventsInitialized = true;
        }
        
        // 更新基础操作按钮
        const actionsContainer = document.getElementById('combat-actions');
        if (actionsContainer) {
            actionsContainer.innerHTML = '';
            
            // 普通攻击按钮
            const attackBtn = document.createElement('button');
            attackBtn.className = 'btn btn-success';
            attackBtn.style.padding = '10px';
            attackBtn.innerHTML = `<strong>普通攻击</strong><br><small>灵力: 0</small>`;
            attackBtn.addEventListener('click', () => {
                if (this.game.combat && this.game.combat.active) {
                    const monster = this.game.combat.monster;
                    const damage = this.game.calculateDamage(this.game.player, monster);
                    monster.currentHp -= damage;
                    this.game.log('战斗', `你使用普通攻击，造成 ${damage} 点伤害！`, 'combat');
                    
                    if (monster.currentHp <= 0) {
                        this.game.endCombat(true);
                        document.getElementById('combat-screen').classList.add('hidden');
                    } else {
                        this.game.monsterTurn();
                        if (this.game.player.hp <= 0) {
                            this.game.endCombat(false);
                            document.getElementById('combat-screen').classList.add('hidden');
                        }
                    }
                    this.updateCombatUI();
                }
            });
            actionsContainer.appendChild(attackBtn);
            
            // 防御按钮
            const defenseBtn = document.createElement('button');
            defenseBtn.className = 'btn btn-secondary';
            defenseBtn.style.padding = '10px';
            defenseBtn.innerHTML = `<strong>防御</strong><br><small>减少伤害</small>`;
            defenseBtn.addEventListener('click', () => {
                if (this.game.combat && this.game.combat.active) {
                    if (!this.game.combat.tempDefense) this.game.combat.tempDefense = 0;
                    this.game.combat.tempDefense += 50; // 增加50点防御
                    this.game.log('战斗', '你采取了防御姿态，减少受到的伤害！', 'combat');
                    this.game.monsterTurn();
                    if (this.game.player.hp <= 0) {
                        this.game.endCombat(false);
                        document.getElementById('combat-screen').classList.add('hidden');
                    }
                    this.updateCombatUI();
                }
            });
            actionsContainer.appendChild(defenseBtn);
            
            // 逃跑按钮
            const fleeBtn = document.createElement('button');
            fleeBtn.className = 'btn btn-secondary';
            fleeBtn.style.padding = '10px';
            fleeBtn.innerHTML = `<strong>逃跑</strong><br><small>50%成功率</small>`;
            fleeBtn.addEventListener('click', () => this.escapeFromCombat());
            actionsContainer.appendChild(fleeBtn);
        }
        
        // 更新技能按钮
        const skillsContainer = document.getElementById('combat-skills');
        skillsContainer.innerHTML = '';
        
        const availableSkills = this.game.getAvailableSkills(true);
        availableSkills.forEach(skill => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-primary';
            
            let isOnCooldown = false;
            if (combat.skillCooldowns[skill.id] && combat.skillCooldowns[skill.id] > 0) {
                isOnCooldown = true;
                btn.classList.add('disabled');
            }
            
            if (player.mp < skill.manaCost) {
                btn.classList.add('disabled');
            }
            
            btn.innerHTML = `
                <strong>${skill.name}</strong><br>
                <small style="font-size: 10px;">
                    灵力: ${skill.manaCost}
                    ${skill.cooldown > 0 ? ` | 冷却: ${combat.skillCooldowns[skill.id] || 0}/${skill.cooldown}` : ''}
                </small>
            `;
            
            btn.addEventListener('click', () => {
                if (!isOnCooldown && player.mp >= skill.manaCost) {
                    this.game.playerUseSkill(skill.id);
                    this.updateCombatUI();
                    if (!this.game.combat || !this.game.combat.active) {
                        document.getElementById('combat-screen').classList.add('hidden');
                    }
                }
            });
            
            skillsContainer.appendChild(btn);
        });
        
        // 更新快捷键显示
        this.updateCombatHotkeys();
    }
    
    useHealingItemInCombat(itemName) {
        this.game.useHealingItem(itemName);
        this.updateCombatUI();
    }
    
    escapeFromCombat() {
        const success = this.game.escapeBattle();
        if (success) {
            document.getElementById('combat-screen').classList.add('hidden');
            this.updateAll();
        } else {
            this.updateCombatUI();
        }
    }
    
    initCombatEvents() {
        // 快捷键槽位点击事件
        const hotkeySlots = document.querySelectorAll('#combat-hotkeys .hotkey-slot');
        hotkeySlots.forEach(slot => {
            slot.addEventListener('click', () => {
                const slotNumber = slot.dataset.slot;
                this.showCombatHotkeySetModal(slotNumber);
            });
        });
        
        // 键盘快捷键事件
        document.addEventListener('keydown', (e) => {
            if (!this.game.combat || !this.game.combat.active) return;
            
            const key = e.key;
            if (key >= '1' && key <= '8') {
                const slotNumber = parseInt(key);
                this.useCombatHotkeySkill(slotNumber);
            }
        });
    }
    
    // 显示快捷键设置模态框
    showCombatHotkeySetModal(slotNumber) {
        const modal = document.getElementById('hotkey-set-modal');
        const content = document.getElementById('hotkey-set-content');
        const player = this.game.player;
        
        content.innerHTML = `
            <h3 style="color: #fbbf24; margin-bottom: 15px;">选择技能设置到快捷键 ${slotNumber}</h3>
        `;
        
        const availableSkills = this.game.getAvailableSkills(true);
        availableSkills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-select-item';
            skillItem.innerHTML = `
                <div class="skill-name">${skill.name}</div>
                <div class="skill-cost">灵力消耗: ${skill.manaCost}</div>
                <div class="skill-desc" style="font-size: 12px; color: #9ca3af; margin-top: 5px;">${skill.description || '暂无描述'}</div>
            `;
            
            skillItem.addEventListener('click', () => {
                this.setCombatHotkeySkill(slotNumber, skill.id);
                document.getElementById('hotkey-set-modal').classList.add('hidden');
            });
            
            content.appendChild(skillItem);
        });
        
        modal.classList.remove('hidden');
    }
    
    // 设置快捷键技能
    setCombatHotkeySkill(slotNumber, skillId) {
        if (!this.game.player.hotkeys) {
            this.game.player.hotkeys = {};
        }
        this.game.player.hotkeys[slotNumber] = skillId;
        this.updateCombatHotkeys();
    }
    
    // 使用快捷键技能
    useCombatHotkeySkill(slotNumber) {
        if (!this.game.player.hotkeys || !this.game.player.hotkeys[slotNumber]) return;
        
        const skillId = this.game.player.hotkeys[slotNumber];
        const availableSkills = this.game.getAvailableSkills(true);
        const skill = availableSkills.find(s => s.id === skillId);
        
        if (!skill) return;
        
        const combat = this.game.combat;
        if (!combat || !combat.active) return;
        
        let isOnCooldown = false;
        if (combat.skillCooldowns[skillId] && combat.skillCooldowns[skillId] > 0) {
            isOnCooldown = true;
        }
        
        if (this.game.player.mp < skill.manaCost) {
            this.game.log('战斗', '灵力不足！', 'combat');
            return;
        }
        
        if (!isOnCooldown) {
            this.game.playerUseSkill(skillId);
            this.updateCombatUI();
            if (!this.game.combat || !this.game.combat.active) {
                document.getElementById('combat-screen').classList.add('hidden');
            }
        }
    }
    
    // 更新快捷键显示
    updateCombatHotkeys() {
        const hotkeySlots = document.querySelectorAll('#combat-hotkeys .hotkey-slot');
        hotkeySlots.forEach(slot => {
            const slotNumber = slot.dataset.slot;
            const skillElement = slot.querySelector('.hotkey-skill');
            
            if (this.game.player.hotkeys && this.game.player.hotkeys[slotNumber]) {
                const skillId = this.game.player.hotkeys[slotNumber];
                const availableSkills = this.game.getAvailableSkills(true);
                const skill = availableSkills.find(s => s.id === skillId);
                
                if (skill) {
                    skillElement.textContent = skill.name;
                    skillElement.style.fontSize = '10px';
                    skillElement.style.marginTop = '5px';
                    skillElement.style.color = '#fbbf24';
                } else {
                    skillElement.textContent = '';
                }
            } else {
                skillElement.textContent = '';
            }
        });
    }
    
    tryTriggerAdventure(sceneType) {
        const adventure = this.game.checkAdventureTrigger(sceneType);
        if (adventure) {
            this.game.triggerAdventure(adventure);
            this.showAdventureScreen(adventure);
        }
    }
    
    showAdventureScreen(adventure) {
        document.getElementById('adventure-screen').classList.remove('hidden');
        
        const tierColors = {
            low: '#22c55e',
            mid: '#3b82f6',
            high: '#f59e0b',
            special: '#ec4899'
        };
        
        const tierNames = {
            low: '低阶',
            mid: '中阶',
            high: '高阶',
            special: '特殊'
        };
        
        document.getElementById('adventure-title').innerHTML = `🎁 奇遇【${adventure.name}】`;
        document.getElementById('adventure-description').textContent = adventure.description;
        
        const rewardsContainer = document.getElementById('adventure-rewards');
        
        if (adventure.rewards) {
            let rewardsHtml = '<h4 style="color: #fbbf24; margin-bottom: 10px;">预期奖励</h4><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">';
            
            if (adventure.rewards.mana) {
                rewardsHtml += `<div style="padding: 8px; background: rgba(59, 130, 246, 0.2); border-radius: 4px;">灵力: ${adventure.rewards.mana > 0 ? '+' : ''}${adventure.rewards.mana}</div>`;
            }
            if (adventure.rewards.hp) {
                rewardsHtml += `<div style="padding: 8px; background: rgba(34, 197, 94, 0.2); border-radius: 4px;">气血: +${adventure.rewards.hp}</div>`;
            }
            if (adventure.rewards.gold) {
                rewardsHtml += `<div style="padding: 8px; background: rgba(251, 191, 36, 0.2); border-radius: 4px;">银两: +${adventure.rewards.gold}</div>`;
            }
            if (adventure.rewards.items) {
                rewardsHtml += `<div style="padding: 8px; background: rgba(168, 85, 247, 0.2); border-radius: 4px;">物品: ${adventure.rewards.items.length}个</div>`;
            }
            
            rewardsHtml += '</div>';
            
            if (adventure.noBattle) {
                rewardsHtml += `<div style="margin-top: 10px; padding: 8px; background: rgba(34, 197, 94, 0.1); border-radius: 4px; text-align: center; color: #22c55e;">无需战斗</div>`;
            } else {
                rewardsHtml += `<div style="margin-top: 10px; padding: 8px; background: rgba(239, 68, 68, 0.1); border-radius: 4px; text-align: center; color: #ef4444;">可能需要战斗</div>`;
            }
            
            rewardsContainer.innerHTML = rewardsHtml;
        } else {
            rewardsContainer.innerHTML = '<div style="text-align: center; color: #9ca3af;">奖励未定，需要完成后知晓</div>';
        }
    }
    
    acceptAdventure() {
        document.getElementById('adventure-screen').classList.add('hidden');
        const result = this.game.acceptAdventure();
        
        if (result && result.needCombat) {
            // 战斗已经在game.acceptAdventure中初始化
            this.showBattle();
        } else {
            this.game.completeAdventure();
            this.updateAll();
        }
    }
    
    rejectAdventure() {
        document.getElementById('adventure-screen').classList.add('hidden');
        this.game.rejectAdventure();
        this.updateAll();
    }
    
    showBreakthroughPopup() {
        const player = this.game.player;
        if (!player) return;
        
        const currentRealm = GAME_DATA.REALMS[player.realmIndex];
        const nextRealm = GAME_DATA.REALMS[player.realmIndex + 1];
        if (!nextRealm) return;
        
        // 提取当前境界类型（如从"筑基期前期10层"提取"筑基"）
        const currentRealmTypeMatch = currentRealm.name.match(/(炼气|筑基|金丹|元婴|化神)/);
        if (!currentRealmTypeMatch) return;
        const currentRealmType = currentRealmTypeMatch[0];
        
        // 提取下一境界类型
        const nextRealmTypeMatch = nextRealm.name.match(/(炼气|筑基|金丹|元婴|化神)/);
        if (!nextRealmTypeMatch) return;
        const nextRealmType = nextRealmTypeMatch[0];
        
        // 只有当境界类型发生变化时才显示突破弹窗
        if (currentRealmType === nextRealmType) return;
        
        // 只有当境界类型发生变化时才需要突破丹
        let neededItems = [];
        if (currentRealmType !== nextRealmType) {
            const breakthroughMap = {
                '炼气': ['筑基丹'],
                '筑基': ['金丹突破丹'],
                '金丹': ['元婴突破丹'],
                '元婴': ['化神突破丹'],
                '化神': ['渡劫突破丹']
            };
            neededItems = breakthroughMap[currentRealmType] || [];
        }
        
        let hasItem = true;
        let displayItem = '无需突破丹';
        let itemCount = 0;
        
        // 只有当需要突破丹时才检查
        if (neededItems.length > 0) {
            hasItem = false;
            for (const item of neededItems) {
                if (player.inventory[item] && player.inventory[item] > 0) {
                    hasItem = true;
                    displayItem = item;
                    itemCount = player.inventory[item];
                    break;
                }
            }
            if (!hasItem) {
                displayItem = neededItems.join(' 或 ');
            }
        }
        
        const realmIndex = player.realmIndex;
        let successRate = 100;
        let difficulty = 1;
        
        // 不同境界间突破有成功率
        if (currentRealmType !== nextRealmType) {
            const baseSuccessRate = 0.8;
            difficulty = currentRealm.demonDifficulty || 1;
            successRate = Math.floor((baseSuccessRate / difficulty) * 100);
        }
        
        const content = document.getElementById('breakthrough-content');
        content.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 48px; margin-bottom: 10px;">⚡</div>
                <div style="color: #fbbf24; font-size: 20px; font-weight: bold;">
                    ${currentRealm.name} → ${nextRealm.name}
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <div style="margin-bottom: 15px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>突破成功率:</span>
                        <span style="color: ${successRate >= 50 ? '#22c55e' : '#ef4444'}; font-weight: bold;">
                            ${successRate}%
                        </span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span>所需突破丹:</span>
                        <span style="color: ${hasItem ? '#22c55e' : '#ef4444'}; font-weight: bold;">
                            ${displayItem} ${hasItem && neededItems.length > 0 ? `(x${itemCount})` : neededItems.length > 0 ? '(未拥有)' : ''}
                        </span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>失败惩罚:</span>
                        <span style="color: #ef4444; font-weight: bold;">
                            ${currentRealmType !== nextRealmType ? '损失5%修为' : '无'}
                        </span>
                    </div>
                </div>
                
                <div style="color: #9ca3af; font-size: 14px; text-align: center;">
                    ${currentRealmType !== nextRealmType ? '境界越高，突破难度越大，成功率越低' : '同一境界内突破，成功率100%'}
                </div>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: center;">
                <button id="confirm-breakthrough-btn" class="btn btn-warning" 
                    style="padding: 12px 30px; font-size: 16px;"
                    ${!hasItem ? 'disabled' : ''}>
                    ⚡ 尝试突破
                </button>
                <button id="cancel-breakthrough-btn" class="btn btn-secondary" 
                    style="padding: 12px 30px; font-size: 16px;">
                    稍后再说
                </button>
            </div>
        `;
        
        document.getElementById('confirm-breakthrough-btn').addEventListener('click', () => {
            this.game.attemptBreakthrough();
            this.closeBreakthroughModal();
            this.updateAll();
        });
        
        document.getElementById('cancel-breakthrough-btn').addEventListener('click', () => {
            this.closeBreakthroughModal();
        });
        
        document.getElementById('breakthrough-modal').classList.remove('hidden');
    }
    
    closeBreakthroughModal() {
        document.getElementById('breakthrough-modal').classList.add('hidden');
        this.game.breakthroughModalShown = false;
    }
    
    showNpcQuestsModal(npcId) {
        const container = document.getElementById('quest-modal-content');
        container.innerHTML = '';
        
        const npc = GAME_DATA.NPCS[npcId];
        if (!npc || !npc.quests) {
            container.innerHTML = '<div style="text-align: center; color: #ef4444;">该NPC没有任务！</div>';
            document.getElementById('quest-modal').classList.remove('hidden');
            return;
        }
        
        // 设置任务弹框标题
        const questModalTitle = document.getElementById('quest-modal-title');
        if (npc.type === 'task-master' || npc.sect) {
            questModalTitle.textContent = '门派任务';
        } else {
            questModalTitle.textContent = '剧情任务';
        }
        
        const currentQuests = this.game.player.quests || [];
        
        // 过滤显示的任务：只显示可领取或已接取的任务
        const displayQuests = npc.quests.filter(quest => {
            const playerQuest = currentQuests.find(q => q.id === quest.id);
            // 如果任务已接取，或者是第一个未接取的任务，则显示
            if (playerQuest) return true;
            
            // 检查是否前面的任务都已完成
            const questIndex = npc.quests.indexOf(quest);
            if (questIndex === 0) return true; // 第一个任务总是可领取
            
            // 检查前面的任务是否已完成
            for (let i = 0; i < questIndex; i++) {
                const prevQuest = npc.quests[i];
                const prevPlayerQuest = currentQuests.find(q => q.id === prevQuest.id);
                if (!prevPlayerQuest || !prevPlayerQuest.completed) {
                    return false;
                }
            }
            return true;
        });
        
        if (displayQuests.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: #9ca3af;">当前没有可接取的任务</div>';
            document.getElementById('quest-modal').classList.remove('hidden');
            return;
        }
        
        displayQuests.forEach(quest => {
            const playerQuest = currentQuests.find(q => q.id === quest.id);
            const div = document.createElement('div');
            div.className = 'item-slot';
            div.style.marginBottom = '10px';
            
            let statusText = '';
            let actionBtn = '';
            
            if (!playerQuest) {
                statusText = '<span style="color: #22c55e;">可领取</span>';
                actionBtn = `<button class="btn btn-primary" style="padding: 5px 15px; font-size: 12px;" data-quest-id="${quest.id}" data-action="accept">领取任务</button>`;
            } else if (playerQuest.completed) {
                statusText = '<span style="color: #3b82f6;">已完成，待提交</span>';
                actionBtn = `<button class="btn btn-success" style="padding: 5px 15px; font-size: 12px;" data-quest-id="${quest.id}" data-action="complete">提交任务</button>`;
            } else {
                statusText = `<span style="color: #fbbf24;">进行中 ${playerQuest.progress || 0}/${quest.objectives ? quest.objectives[0].count : quest.count}</span>`;
                actionBtn = '';
            }
            
            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <strong>${quest.name}</strong>
                    ${statusText}
                </div>
                <small style="color: #9ca3af; display: block; margin-bottom: 8px;">${quest.description}</small>
                <div style="font-size: 12px; color: #60a5fa; margin-bottom: 8px;">
                    奖励：银两${quest.rewards.gold} | 修为${quest.rewards.cultivation || quest.rewards.exp}
                </div>
                ${actionBtn}
            `;
            
            container.appendChild(div);
        });
        
        container.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const questId = e.target.dataset.questId;
                const action = e.target.dataset.action;
                
                if (action === 'accept') {
                    const success = this.game.acceptQuest(questId);
                    if (success) {
                        this.showNpcQuestsModal(npcId);
                        this.updateQuestPanel();
                    }
                } else if (action === 'complete') {
                    const success = this.game.completeQuest(questId);
                    if (success) {
                        this.showNpcQuestsModal(npcId);
                        this.updateQuestPanel();
                    }
                }
            }
        });
        
        document.getElementById('quest-modal').classList.remove('hidden');
    }
    
    updateAreaEntities() {
        const container = document.getElementById('monster-panel');
        container.innerHTML = '';
        
        if (!this.game.player || !this.game.currentArea) return;
        
        let hasPeople = false;
        let hasMonsters = false;
        
        // 显示区域人物
        const peopleTitle = document.createElement('h3');
        peopleTitle.textContent = '区域人物';
        container.appendChild(peopleTitle);
        
        const interactiveNPCs = this.game.currentArea.interactiveNPCs;
        const npcs = this.game.currentArea.npcs;
        
        if ((interactiveNPCs && interactiveNPCs.length > 0) || (npcs && npcs.length > 0)) {
            hasPeople = true;
            
            // 显示互动NPC
            if (interactiveNPCs && interactiveNPCs.length > 0) {
                interactiveNPCs.forEach(npc => {
                    const div = document.createElement('div');
                    div.className = 'item-slot';
                    div.style.cursor = 'pointer';
                    div.innerHTML = `
                        <strong style="color: #fbbf24;">${npc.name}</strong>
                        <br><small style="color: #9ca3af;">门派: ${npc.sect}</small>
                        <br><small style="color: #d1d5db;">性格: ${npc.character}</small>
                    `;
                    div.addEventListener('click', () => {
                        this.showInteractiveNpcDialog(npc);
                    });
                    container.appendChild(div);
                });
            }
            
            // 显示普通NPC
            if (npcs && npcs.length > 0) {
                npcs.forEach(npcId => {
                    const npc = GAME_DATA.NPCS[npcId];
                    if (npc) {
                        const div = document.createElement('div');
                        div.className = 'item-slot';
                        div.style.cursor = 'pointer';
                        div.innerHTML = `
                            <strong style="color: #60a5fa;">${npc.name}</strong>
                        `;
                        div.addEventListener('click', () => {
                            this.showNpcDialog(npcId);
                        });
                        container.appendChild(div);
                    }
                });
            }
        } else {
            const noPeople = document.createElement('p');
            noPeople.style.color = '#9ca3af';
            noPeople.style.textAlign = 'center';
            noPeople.style.marginTop = '10px';
            noPeople.textContent = '此区域无人物';
            container.appendChild(noPeople);
        }
        
        // 显示区域怪物
        const monstersTitle = document.createElement('h3');
        monstersTitle.textContent = '区域怪物';
        container.appendChild(monstersTitle);
        
        const monsters = this.game.currentArea.monsters;
        if (monsters && monsters.length > 0) {
            hasMonsters = true;
            monsters.forEach(monsterId => {
                const monster = GAME_DATA.MONSTERS[monsterId];
                if (monster) {
                    const div = document.createElement('div');
                    div.className = 'item-slot';
                    div.style.cursor = 'pointer';
                    div.innerHTML = `
                        <strong style="color: #ef4444;">${monster.name}</strong>
                        <br><small style="color: #9ca3af;">等级: ${monster.level}</small>
                    `;
                    div.addEventListener('click', () => {
                        this.startBattle(monsterId);
                    });
                    container.appendChild(div);
                }
            });
        } else {
            const noMonsters = document.createElement('p');
            noMonsters.style.color = '#9ca3af';
            noMonsters.style.textAlign = 'center';
            noMonsters.style.marginTop = '10px';
            noMonsters.textContent = '此区域无怪物';
            container.appendChild(noMonsters);
        }
    }
    
    startBattle(monsterId) {
        const monster = GAME_DATA.MONSTERS[monsterId];
        if (!monster) return;
        
        this.game.startBattle(monsterId);
        this.showBattle();
    }
    
    // 显示互动NPC对话框
    showInteractiveNpcDialog(npc) {
        document.getElementById('npc-name').textContent = npc.name;
        
        // 显示好感度和关系状态
        const favor = this.game.getNPCFavor(npc.id);
        const relation = this.game.getNPCRrelation(npc.id);
        const relationText = {
            'stranger': '陌生人',
            'friend': '朋友',
            'close': '亲密',
            'intimate': '道侣/结拜',
            'hostile': '敌对'
        }[relation] || '陌生人';
        
        const favorInfo = `
            <div style="margin-top: 10px; padding: 10px; background-color: rgba(0,0,0,0.1); border-radius: 5px;">
                <div style="display: flex; justify-content: space-between;">
                    <span>好感度：</span>
                    <span style="color: ${favor >= 0 ? '#22c55e' : '#ef4444'};">${favor}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>关系：</span>
                    <span>${relationText}</span>
                </div>
            </div>
        `;
        
        document.getElementById('npc-dialog-content').innerHTML = `
            <div class="npc-avatar">👤</div>
            <p style="margin-top: 15px;">${npc.dialogs[Math.floor(Math.random() * npc.dialogs.length)]}</p>
            ${favorInfo}
        `;
        
        const actionsContainer = document.getElementById('npc-actions');
        actionsContainer.innerHTML = '';
        
        // 闲聊按钮
        if (npc.canTalk !== false) {
            const talkBtn = document.createElement('button');
            talkBtn.className = 'btn btn-secondary';
            talkBtn.textContent = '闲聊';
            talkBtn.addEventListener('click', () => {
                this.talkToNPC(npc.id);
            });
            actionsContainer.appendChild(talkBtn);
        }
        
        // 送礼按钮
        if (npc.canGift !== false) {
            const giftBtn = document.createElement('button');
            giftBtn.className = 'btn btn-success';
            giftBtn.textContent = '送礼';
            giftBtn.addEventListener('click', () => {
                this.showGiftModal(npc.id);
            });
            actionsContainer.appendChild(giftBtn);
        }
        
        // 切磋按钮
        if (npc.canSpar) {
            const sparBtn = document.createElement('button');
            sparBtn.className = 'btn btn-warning';
            sparBtn.textContent = '切磋';
            sparBtn.addEventListener('click', () => {
                this.sparWithNPC(npc.id);
            });
            actionsContainer.appendChild(sparBtn);
        }
        
        // 任务按钮
        if (npc.tasks) {
            const taskBtn = document.createElement('button');
            taskBtn.className = 'btn btn-info';
            taskBtn.textContent = '查看任务';
            taskBtn.addEventListener('click', () => {
                this.showNPCTasks(npc.id);
            });
            actionsContainer.appendChild(taskBtn);
        }
        

        
        // 结拜按钮（好感度≥300）
        if (npc.canSworn) {
            const relation = this.game.getNPCRelation(npc.id);
            if (favor >= 300 && relation !== 'intimate') {
                const swornBtn = document.createElement('button');
                swornBtn.className = 'btn btn-primary';
                swornBtn.textContent = '结拜';
                swornBtn.addEventListener('click', () => {
                    this.showSwornModal(npc.id);
                });
                actionsContainer.appendChild(swornBtn);
            }
        }
        
        // 道侣按钮（好感度≥500）
        if (npc.canMarry) {
            const isSpouse = this.game.player.npcRelations[npc.id]?.isSpouse;
            if (favor >= 500 && !isSpouse) {
                const marryBtn = document.createElement('button');
                marryBtn.className = 'btn btn-primary';
                marryBtn.textContent = '结为道侣';
                marryBtn.addEventListener('click', () => {
                    this.showMarryModal(npc.id);
                });
                actionsContainer.appendChild(marryBtn);
            }
        }
        
        // 偷窃按钮
        if (npc.canSteal) {
            const stealBtn = document.createElement('button');
            stealBtn.className = 'btn btn-danger';
            stealBtn.textContent = '偷窃';
            stealBtn.addEventListener('click', () => {
                this.stealFromNPC(npc.id);
            });
            actionsContainer.appendChild(stealBtn);
        }
        
        // 攻击按钮
        if (npc.canAttack) {
            const attackBtn = document.createElement('button');
            attackBtn.className = 'btn btn-danger';
            attackBtn.textContent = '攻击';
            attackBtn.addEventListener('click', () => {
                this.attackNPC(npc.id);
            });
            actionsContainer.appendChild(attackBtn);
        }
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn btn-secondary';
        closeBtn.textContent = '告辞';
        closeBtn.addEventListener('click', () => this.closeNpcDialog());
        actionsContainer.appendChild(closeBtn);
        
        document.getElementById('npc-dialog').classList.remove('hidden');
        this.updateMessageLog();
    }
    
    showDungeonModal() {
        const modal = document.getElementById('dungeon-modal');
        const content = document.getElementById('dungeon-modal-content');
        
        const dungeons = GAME_DATA.DUNGEONS;
        
        content.innerHTML = '';
        
        content.style.display = 'grid';
        content.style.gridTemplateColumns = 'repeat(auto-fill, minmax(220px, 1fr))';
        content.style.gap = '15px';
        
        dungeons.forEach(dg => {
            const div = document.createElement('div');
            div.className = 'item-slot';
            div.style.padding = '12px';
            div.style.borderLeft = '3px solid #f59e0b';
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.justifyContent = 'space-between';
            div.style.minHeight = '140px';
            
            const canEnter = this.canEnterDungeon(dg.requireRealm);
            
            div.innerHTML = `
                <div style="margin-bottom: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <strong style="font-size: 0.9em;">${dg.name}</strong>
                        <span style="color: ${canEnter ? '#34d399' : '#ef4444'}; font-size: 0.8em;">
                            ${canEnter ? '可进入' : `需要${dg.requireRealm}`}
                        </span>
                    </div>
                    <div style="color: #9ca3af; font-size: 0.8em; margin-bottom: 8px;">
                        <p>波次：${dg.waves.length}波</p>
                        <p>要求：${dg.requireRealm}</p>
                    </div>
                </div>
                <div>
                    <button class="btn ${canEnter ? 'btn-primary' : 'btn-secondary'}" 
                            ${!canEnter ? 'disabled' : ''} style="width: 100%; font-size: 0.8em; padding: 8px 12px;">
                        ${canEnter ? '进入秘境' : '境界不足'}
                    </button>
                </div>
            `;
            
            const enterBtn = div.querySelector('button');
            enterBtn.addEventListener('click', () => {
                if (canEnter) {
                    this.game.enterDungeon(dg.id);
                    modal.classList.add('hidden');
                    this.updateAll();
                }
            });
            
            content.appendChild(div);
        });
        
        modal.classList.remove('hidden');
    }
    
    canEnterDungeon(requireRealm) {
        let playerRealm = '';
        if (typeof this.game.player.realm === 'object' && this.game.player.realm.name) {
            playerRealm = this.game.player.realm.name;
        } else if (typeof this.game.player.realm === 'string') {
            playerRealm = this.game.player.realm;
        } else if (this.game.player.realmIndex !== undefined) {
            const realm = GAME_DATA.REALMS[this.game.player.realmIndex];
            if (realm && realm.name) {
                playerRealm = realm.name;
            }
        }
        
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
        return realmOrder.indexOf(playerTier) >= realmOrder.indexOf(requireRealm);
    }
    
    showSanxiuModal() {
        const modal = document.getElementById('sanxiu-modal');
        const activeContainer = document.getElementById('sanxiu-active-container');
        const passiveContainer = document.getElementById('sanxiu-passive-container');
        
        activeContainer.innerHTML = '';
        passiveContainer.innerHTML = '';
        
        Object.keys(GAME_DATA.SANXIU_ACTIVE_SKILLS).forEach(skillId => {
            const skill = GAME_DATA.SANXIU_ACTIVE_SKILLS[skillId];
            const isLearned = this.game.player.sanxiuActiveSkills && this.game.player.sanxiuActiveSkills.includes(skillId);
            
            const div = document.createElement('div');
            div.className = 'item-slot';
            div.style.marginBottom = '10px';
            div.style.padding = '10px';
            div.style.borderLeft = isLearned ? '3px solid #34d399' : '3px solid #6b7280';
            div.style.background = isLearned ? 'rgba(52, 211, 153, 0.1)' : 'transparent';
            
            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                    <strong style="color: ${isLearned ? '#34d399' : '#fbbf24'};">${skill.name}</strong>
                    <span style="color: ${isLearned ? '#34d399' : '#9ca3af'};">${isLearned ? '✓ 已学' : '未学'}</span>
                </div>
                <small style="color: #9ca3af;">${skill.description}</small>
                <div style="margin-top: 8px;">
                    <small style="color: #60a5fa;">消耗: ${skill.mpCost} MP</small>
                    ${skill.cooldown > 0 ? `<small style="color: #f59e0b; margin-left: 10px;">冷却: ${skill.cooldown} 回合</small>` : ''}
                    ${skill.damage ? `<small style="color: #ef4444; margin-left: 10px;">伤害: ×${skill.damage}</small>` : ''}
                    ${skill.ignoreDef ? `<small style="color: #fbbf24; margin-left: 10px;">无视防御: ${Math.floor(skill.ignoreDef * 100)}%</small>` : ''}
                    ${skill.noCounter ? `<small style="color: #a855f7; margin-left: 10px;">无法反击</small>` : ''}
                </div>
            `;
            
            if (!isLearned) {
                const learnBtn = document.createElement('button');
                learnBtn.className = 'btn btn-primary';
                learnBtn.style.marginTop = '8px';
                learnBtn.style.padding = '5px 15px';
                learnBtn.style.fontSize = '12px';
                learnBtn.textContent = '领悟';
                learnBtn.addEventListener('click', () => {
                    this.game.learnSanxiuActiveSkill(skillId);
                    this.showSanxiuModal();
                });
                div.appendChild(learnBtn);
            }
            
            activeContainer.appendChild(div);
        });
        
        Object.keys(GAME_DATA.SANXIU_PASSIVE_SKILLS).forEach(passiveId => {
            const passive = GAME_DATA.SANXIU_PASSIVE_SKILLS[passiveId];
            const isLearned = this.game.player.sanxiuPassiveSkills && this.game.player.sanxiuPassiveSkills.includes(passiveId);
            
            const div = document.createElement('div');
            div.className = 'item-slot';
            div.style.marginBottom = '10px';
            div.style.padding = '10px';
            div.style.borderLeft = isLearned ? '3px solid #34d399' : '3px solid #6b7280';
            div.style.background = isLearned ? 'rgba(52, 211, 153, 0.1)' : 'transparent';
            
            let effectText = '';
            if (passive.hpPercent) effectText += `血量+${passive.hpPercent}%`;
            if (passive.atkPercent) effectText += `${effectText ? '、' : ''}攻击+${passive.atkPercent}%`;
            if (passive.defPercent) effectText += `${effectText ? '、' : ''}防御+${passive.defPercent}%`;
            if (passive.allPercent) effectText += `${effectText ? '、' : ''}全属性+${passive.allPercent}%`;
            if (passive.critRate) effectText += `${effectText ? '、' : ''}暴击率+${passive.critRate}%`;
            if (passive.critDmg) effectText += `${effectText ? '、' : ''}暴击伤害+${passive.critDmg}%`;
            if (passive.dodge) effectText += `${effectText ? '、' : ''}闪避+${passive.dodge}%`;
            if (passive.dotReduce) effectText += `${effectText ? '、' : ''}持续伤害减免${passive.dotReduce}%`;
            if (passive.hpLowDefUp) effectText += `${effectText ? '、' : ''}血量低于30%防御翻倍`;
            
            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                    <strong style="color: ${isLearned ? '#34d399' : '#fbbf24'};">${passive.name}</strong>
                    <span style="color: ${isLearned ? '#34d399' : '#9ca3af'};">${isLearned ? '✓ 已学' : `需要${passive.realm}`}</span>
                </div>
                <small style="color: #9ca3af;">${passive.description}</small>
                <div style="margin-top: 8px;">
                    <small style="color: #34d399;">${effectText}</small>
                </div>
            `;
            
            if (!isLearned) {
                const learnBtn = document.createElement('button');
                learnBtn.className = 'btn btn-primary';
                learnBtn.style.marginTop = '8px';
                learnBtn.style.padding = '5px 15px';
                learnBtn.style.fontSize = '12px';
                learnBtn.textContent = '领悟';
                learnBtn.addEventListener('click', () => {
                    this.game.learnSanxiuPassiveSkill(passiveId);
                    this.updatePlayerStatsPanel();
                    this.showSanxiuModal();
                });
                div.appendChild(learnBtn);
            }
            
            passiveContainer.appendChild(div);
        });
        
        modal.classList.remove('hidden');
    }
    
    showStoryModal(title, content, actions) {
        const modal = document.getElementById('story-modal');
        const titleElement = document.getElementById('story-modal-title');
        const contentElement = document.getElementById('story-modal-content');
        const actionsElement = document.getElementById('story-modal-actions');
        
        titleElement.textContent = title || '剧情';
        contentElement.innerHTML = content;
        actionsElement.innerHTML = '';
        
        if (actions && actions.length > 0) {
            actions.forEach(action => {
                const button = document.createElement('button');
                button.className = 'btn ' + (action.className || 'btn-primary');
                button.textContent = action.text;
                button.addEventListener('click', action.callback);
                actionsElement.appendChild(button);
            });
        }
        
        modal.classList.remove('hidden');
    }
    
    showInitialStory() {
        // 显示初始剧情：醒来场景
        this.showStoryModal('青岚村 · 觉醒篇', `
            <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">任务1：林间苏醒</h3>
            <p style="margin-bottom: 15px;">你在冰冷的地面上醒来，脑袋一片空白，只记得自己好像从很高的地方坠落。</p>
            <p style="margin-bottom: 15px;">身旁有一块<span style="color: #fbbf24; font-weight: bold;">残破玉佩</span>，上面刻着一个模糊的“岚”字。</p>
            <h4 style="color: #60a5fa; margin-top: 20px; margin-bottom: 10px;">【可点击按钮】</h4>
        `, [
            {
                text: '查看玉佩',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('查看玉佩', `
                        <p>你拿起玉佩仔细查看，上面刻着一个模糊的“岚”字，纹路似有微光，不知用途。</p>
                        <p>突然，你感到一阵头痛，脑海中闪过一些模糊的记忆片段，但很快就消失了。</p>
                    `, [
                        {
                            text: '站起身',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.continueInitialStory();
                            }
                        }
                    ]);
                }
            },
            {
                text: '站起身',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.continueInitialStory();
                }
            },
            {
                text: '呼喊求助',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('呼喊求助', `
                        <p>你大声呼喊：“有人吗？有人能帮帮我吗？”</p>
                        <p>你的声音在树林中回荡，但没有得到回应。你决定站起身来，看看周围的环境。</p>
                    `, [
                        {
                            text: '站起身',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.continueInitialStory();
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    continueInitialStory() {
        // 继续剧情：遇到阿禾
        this.showStoryModal('遇到村姑', `
            <p style="margin-bottom: 15px;">你站起身来，环顾四周，发现自己身处一片茂密的小树林中。</p>
            <p style="margin-bottom: 15px;">就在这时，草丛响动，一个年轻的村姑出现在你面前。</p>
            <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村姑阿禾：</span>“你是谁？怎么躺在这里？最近山里很不安全。”</p>
            <h4 style="color: #60a5fa; margin-top: 20px; margin-bottom: 10px;">【选择回应】</h4>
        `, [
            {
                text: '我失忆了，不知道自己是谁',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('阿禾的回应', `
                        <p><span style="color: #34d399; font-weight: bold;">村姑阿禾：</span>“可怜人，怕是遇到危险失忆了。这里是青岚村外的小树林，最近不太平，你跟我回村吧，村长见多识广，或许能帮你。”</p>
                        <p>阿禾伸手搀扶你，带你向青岚村走去。</p>
                    `, [
                        {
                            text: '跟随阿禾回村',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.completeInitialStory();
                            }
                        }
                    ]);
                }
            },
            {
                text: '此地是何处？我要去安全的地方',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('阿禾的回应', `
                        <p><span style="color: #34d399; font-weight: bold;">村姑阿禾：</span>“我是青岚村的阿禾，去山上采草药的。你别紧张，我没有恶意，只是这山林最近老出怪事，你一个人在这里太危险了，跟我回村吧。”</p>
                        <p>阿禾友善地微笑着，示意你跟她走。</p>
                    `, [
                        {
                            text: '跟随阿禾回村',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.completeInitialStory();
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    completeInitialStory() {
        // 完成初始剧情，自动接取并完成任务1
        this.game.acceptQuest('qinglan-1');
        
        // 自动完成任务1（跟随阿禾回村）
        const quest1 = this.game.player.quests.find(q => q.id === 'qinglan-1');
        if (quest1) {
            quest1.progress = 1;
            quest1.completed = true;
            this.game.completeQuest('qinglan-1');
        }
        
        this.game.log('系统', '你在青岚村外的小树林中苏醒，遇到了村姑阿禾', 'info');
        this.game.log('系统', '新手任务已完成：【林间苏醒】', 'success');
        this.updateQuestPanel();
        
        // 显示任务完成提示
        this.showStoryModal('任务完成', `
            <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">任务完成！</h3>
            <p style="margin-bottom: 15px;">你跟随阿禾来到了青岚村，这个宁静的小山村。</p>
            <p style="margin-bottom: 15px;">阿禾带你来到村长家，准备向村长介绍你的情况。</p>
            <p style="margin-bottom: 15px; color: #22c55e;">✅ 任务【林间苏醒】已完成</p>
            <p style="margin-bottom: 15px;">接下来，你需要与村长交谈，了解守岚者的传说。</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">💡 提示：点击村长NPC开始下一个任务</p>
        `, [
            {
                text: '好的，我知道了',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    // 不再自动触发任务2，让玩家自己点击村长
                }
            }
        ]);
    }
    
    showQuest2Story() {
        // 任务2：面见村长
        this.showStoryModal('面见村长', `
            <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">任务2：面见村长</h3>
            <p style="margin-bottom: 15px;">阿禾带你来到村长家，一位白发苍苍的老者正坐在院子里。</p>
            <p style="margin-bottom: 15px;">村长一看到你身上的玉佩，脸色骤变，站起身来。</p>
            <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“这是……守岚者的玉佩！上一任守岚者失踪已经数十年了……”</p>
            <h4 style="color: #60a5fa; margin-top: 20px; margin-bottom: 10px;">【选择回应】</h4>
        `, [
            {
                text: '守岚者是什么？',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('守岚者的传说', `
                        <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“守岚者是守护我们青岚村的人，世代相传，负责镇压迷雾谷的瘴气。”</p>
                        <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“可几十年前，最后一位守岚者失踪了，信物也不见了……看来，你就是天选的守岚者。”</p>
                        <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“最近迷雾谷瘴气外泄，怪物伤人，已有村民失踪。你的玉佩是唯一能压制瘴气的东西。”</p>
                    `, [
                        {
                            text: '答应帮助村长',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2Accept();
                            }
                        },
                        {
                            text: '先考虑一下',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showStoryModal('考虑', `
                                    <p style="margin-bottom: 15px;">你需要时间考虑是否要帮助青岚村。</p>
                                    <p style="margin-bottom: 15px;">但看到村民们焦虑的表情，你知道自己不能袖手旁观。</p>
                                `, [
                                    {
                                        text: '答应帮助村长',
                                        callback: () => {
                                            document.getElementById('story-modal').classList.add('hidden');
                                            this.showQuest2Accept();
                                        }
                                    }
                                ]);
                            }
                        }
                    ]);
                }
            },
            {
                text: '村里最近是不是出事了？',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('村里的怪事', `
                        <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“是的，最近迷雾谷瘴气外泄，怪物伤人，已有村民失踪。”</p>
                        <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“你的玉佩是唯一能压制瘴气的东西，是救回村民、平息怪事的关键。”</p>
                        <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“守岚者是守护我们青岚村的人，世代相传，负责镇压迷雾谷的瘴气。”</p>
                    `, [
                        {
                            text: '答应帮助村长',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2Accept();
                            }
                        },
                        {
                            text: '先考虑一下',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showStoryModal('考虑', `
                                    <p style="margin-bottom: 15px;">你需要时间考虑是否要帮助青岚村。</p>
                                    <p style="margin-bottom: 15px;">但看到村民们焦虑的表情，你知道自己不能袖手旁观。</p>
                                `, [
                                    {
                                        text: '答应帮助村长',
                                        callback: () => {
                                            document.getElementById('story-modal').classList.add('hidden');
                                            this.showQuest2Accept();
                                        }
                                    }
                                ]);
                            }
                        }
                    ]);
                }
            },
            {
                text: '我只想找回我的记忆',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('记忆与使命', `
                        <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“我明白你的想法，可你的记忆，大概率和守岚者、迷雾谷有关。”</p>
                        <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“只要你能帮我们找回失踪的村民、平息瘴气，我会尽我所能，帮你寻找恢复记忆的线索。”</p>
                        <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“最近迷雾谷瘴气外泄，怪物伤人，已有村民失踪。你的玉佩是唯一能压制瘴气的东西。”</p>
                    `, [
                        {
                            text: '答应帮助村长',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2Accept();
                            }
                        },
                        {
                            text: '先考虑一下',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showStoryModal('考虑', `
                                    <p style="margin-bottom: 15px;">你需要时间考虑是否要帮助青岚村。</p>
                                    <p style="margin-bottom: 15px;">但想到这可能与你的记忆有关，你决定答应村长的请求。</p>
                                `, [
                                    {
                                        text: '答应帮助村长',
                                        callback: () => {
                                            document.getElementById('story-modal').classList.add('hidden');
                                            this.showQuest2Accept();
                                        }
                                    }
                                ]);
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    showQuest2Accept() {
        // 接受任务2
        this.showStoryModal('接受任务', `
            <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“太好了！有了你的帮助，我们一定能解决迷雾谷的问题。”</p>
            <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“不过，你需要一把能破瘴气的匕首。去找铁匠李铁，他能帮你打造。”</p>
            <p style="margin-bottom: 15px;">阿禾在一旁微笑着对你说：“我相信你一定能帮到我们！”</p>
        `, [
            {
                text: '前往铁匠铺',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showQuest2Blacksmith();
                }
            },
            {
                text: '先和阿禾告别',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('与阿禾告别', `
                        <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">阿禾：</span>“一定要小心啊！要是遇到危险，就回村找我。”</p>
                        <p style="margin-bottom: 15px;">阿禾送给你一个草药包，里面有几株新鲜的草药。</p>
                    `, [
                        {
                            text: '前往铁匠铺',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2Blacksmith();
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    showQuest2Blacksmith() {
        // 铁匠铺场景 - 已修改
        this.showStoryModal('铁匠铺', `
            <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">铁匠铺</h3>
            <p style="margin-bottom: 15px;">你来到村东头的铁匠铺，看到一位膀大腰圆的铁匠正在打铁。</p>
            <p style="margin-bottom: 15px;"><span style="color: #ef4444; font-weight: bold;">李铁：</span>“村长说你是守岚者？就你这破衣服？”</p>
            <p style="margin-bottom: 15px;"><span style="color: #ef4444; font-weight: bold;">李铁：</span>“放心，我给你打造一把能破瘴气的匕首，不过你得给我找些野兔皮毛，我正好用来做护腕。"</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (0/3)</p>
        `, [
            {
                text: '去小树林打猎',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showQuest2HuntPhase1();
                }
            },
            {
                text: '问问有没有别的办法',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('别的办法', `
                        <p style="margin-bottom: 15px;"><span style="color: #ef4444; font-weight: bold;">李铁：</span>“没有野兔皮毛，我怎么给你做护腕？你还是去打几只野兔吧。”</p>
                        <p style="margin-bottom: 15px;">李铁继续打铁，不再理你。</p>
                        <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (0/3)</p>
                    `, [
                        {
                            text: '去小树林打猎',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2HuntPhase1();
                            }
                        }
                    ]);
                }
            }
        ]);
    }

    showQuest2HuntPhase1() {
        // 第一阶段：捕获第一只野兔
        this.showStoryModal('小树林 - 打猎', `
            <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">小树林</h3>
            <p style="margin-bottom: 15px;">你来到小树林，四周草木茂盛，鸟鸣声声。</p>
            <p style="margin-bottom: 15px;">突然，你发现不远处有一只灰色的野兔正在低头啃食青草。</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (0/3)</p>
            <p style="margin-bottom: 15px; color: #60a5fa;">你要如何捕捉这只野兔？</p>
        `, [
            {
                text: '悄悄靠近',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('捕捉成功', `
                        <p style="margin-bottom: 15px;">你屏住呼吸，弯下腰，蹑手蹑脚地向野兔靠近。</p>
                        <p style="margin-bottom: 15px;">野兔似乎察觉到了什么，竖起耳朵四处张望，但很快又低头继续吃草。</p>
                        <p style="margin-bottom: 15px;">就在距离足够近的时候，你猛地扑了上去！</p>
                        <p style="margin-bottom: 15px; color: #22c55e;">你成功捕获了第一只野兔，获得了野兔皮毛x1！</p>
                        <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (1/3)</p>
                    `, [
                        {
                            text: '继续寻找下一只',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2HuntPhase2();
                            }
                        }
                    ]);
                }
            },
            {
                text: '直接追赶',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('追逐', `
                        <p style="margin-bottom: 15px;">你大喊一声，直接向野兔冲去！</p>
                        <p style="margin-bottom: 15px;">野兔受惊，撒腿就跑，速度极快。</p>
                        <p style="margin-bottom: 15px;">你在后面紧追不舍，穿过灌木丛，跳过小溪...</p>
                        <p style="margin-bottom: 15px;">终于，野兔跑累了，躲进了一个树洞里。</p>
                        <p style="margin-bottom: 15px; color: #ef4444;">你失去了野兔的踪迹。</p>
                    `, [
                        {
                            text: '重新寻找',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2HuntPhase1();
                            }
                        }
                    ]);
                }
            },
            {
                text: '扔石头',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('捕捉成功', `
                        <p style="margin-bottom: 15px;">你捡起地上的一块石头，瞄准野兔。</p>
                        <p style="margin-bottom: 15px;">深吸一口气，你用力将石头扔了出去！</p>
                        <p style="margin-bottom: 15px;">石头准确地击中了野兔的头部，野兔应声倒地。</p>
                        <p style="margin-bottom: 15px; color: #22c55e;">你成功捕获了第一只野兔，获得了野兔皮毛x1！</p>
                        <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (1/3)</p>
                    `, [
                        {
                            text: '继续寻找下一只',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2HuntPhase2();
                            }
                        }
                    ]);
                }
            },
            {
                text: '设置陷阱',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('等待', `
                        <p style="margin-bottom: 15px;">你找来一些藤蔓和树枝，在野兔经常出没的地方设置了一个简易陷阱。</p>
                        <p style="margin-bottom: 15px;">然后你躲到远处的灌木丛后，静静等待...</p>
                        <p style="margin-bottom: 15px;">时间一分一秒过去，野兔似乎察觉到了危险，始终没有靠近陷阱。</p>
                        <p style="margin-bottom: 15px; color: #ef4444;">野兔跑掉了，陷阱没有发挥作用。</p>
                    `, [
                        {
                            text: '重新寻找',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2HuntPhase1();
                            }
                        }
                    ]);
                }
            }
        ]);
    }

    showQuest2HuntPhase2() {
        // 第二阶段：捕获第二只野兔
        this.showStoryModal('小树林 - 打猎', `
            <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">小树林</h3>
            <p style="margin-bottom: 15px;">你带着第一只野兔的收获，继续在小树林中搜寻。</p>
            <p style="margin-bottom: 15px;">在一处草丛边缘，你又发现了一只野兔，这只比刚才那只更大一些。</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (1/3)</p>
            <p style="margin-bottom: 15px; color: #60a5fa;">你要如何捕捉这只野兔？</p>
        `, [
            {
                text: '悄悄靠近',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('惊动了野兔', `
                        <p style="margin-bottom: 15px;">你试图悄悄靠近，但不慎踩断了一根枯枝。</p>
                        <p style="margin-bottom: 15px;">"咔嚓"一声，野兔瞬间警觉，一溜烟钻进了草丛深处。</p>
                        <p style="margin-bottom: 15px; color: #ef4444;">野兔逃走了。</p>
                    `, [
                        {
                            text: '重新寻找',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2HuntPhase2();
                            }
                        }
                    ]);
                }
            },
            {
                text: '用树枝驱赶',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('捕捉成功', `
                        <p style="margin-bottom: 15px;">你捡起一根长树枝，从侧面包抄过去。</p>
                        <p style="margin-bottom: 15px;">野兔发现你后想要逃跑，但你用树枝挡住了它的去路。</p>
                        <p style="margin-bottom: 15px;">野兔慌乱中撞到了树干，被你轻松抓住。</p>
                        <p style="margin-bottom: 15px; color: #22c55e;">你成功捕获了第二只野兔，获得了野兔皮毛x1！</p>
                        <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (2/3)</p>
                    `, [
                        {
                            text: '继续寻找最后一只',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2HuntPhase3();
                            }
                        }
                    ]);
                }
            },
            {
                text: '扔石头',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('没打中', `
                        <p style="margin-bottom: 15px;">你捡起石头，瞄准野兔扔了过去。</p>
                        <p style="margin-bottom: 15px;">可惜石头偏了一些，砸在野兔旁边的地上。</p>
                        <p style="margin-bottom: 15px;">野兔受惊，瞬间消失在草丛中。</p>
                        <p style="margin-bottom: 15px; color: #ef4444;">野兔逃走了。</p>
                    `, [
                        {
                            text: '重新寻找',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2HuntPhase2();
                            }
                        }
                    ]);
                }
            },
            {
                text: '挖陷阱',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('捕捉成功', `
                        <p style="margin-bottom: 15px;">你观察到野兔正在往一个土坡方向移动。</p>
                        <p style="margin-bottom: 15px;">你快速绕到土坡前方，用随身携带的小刀挖了一个浅坑，铺上落叶伪装。</p>
                        <p style="margin-bottom: 15px;">然后你假装离开，躲在树后观察。</p>
                        <p style="margin-bottom: 15px;">野兔果然中计，一脚踏入陷阱，被你轻松抓获。</p>
                        <p style="margin-bottom: 15px; color: #22c55e;">你成功捕获了第二只野兔，获得了野兔皮毛x1！</p>
                        <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (2/3)</p>
                    `, [
                        {
                            text: '继续寻找最后一只',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2HuntPhase3();
                            }
                        }
                    ]);
                }
            }
        ]);
    }

    showQuest2HuntPhase3() {
        // 第三阶段：捕获第三只野兔
        this.showStoryModal('小树林 - 打猎', `
            <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">小树林</h3>
            <p style="margin-bottom: 15px;">你已经收集到两张野兔皮毛了，还差最后一张。</p>
            <p style="margin-bottom: 15px;">你在树林深处发现了一片野兔出没的草地，那里有三只野兔正在觅食。</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (2/3)</p>
            <p style="margin-bottom: 15px; color: #60a5fa;">面对这群野兔，你要怎么做？</p>
        `, [
            {
                text: '悄悄靠近最边缘的野兔',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('捕捉成功', `
                        <p style="margin-bottom: 15px;">你选择了一只落单的野兔作为目标，匍匐前进，利用草丛作为掩护。</p>
                        <p style="margin-bottom: 15px;">你的动作轻盈而缓慢，没有引起任何野兔的注意。</p>
                        <p style="margin-bottom: 15px;">当距离足够近时，你如闪电般出手，一把抓住了野兔的后腿！</p>
                        <p style="margin-bottom: 15px; color: #22c55e;">你成功捕获了第三只野兔，获得了野兔皮毛x1！</p>
                        <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (3/3) - 完成！</p>
                    `, [
                        {
                            text: '返回铁匠铺',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showStoryModal('返回铁匠铺', `
                                    <p style="margin-bottom: 15px;">你带着3张野兔皮毛，回到了铁匠铺。</p>
                                    <p style="margin-bottom: 15px;"><span style="color: #ef4444; font-weight: bold;">李铁：</span>"哟，动作还挺快嘛！"</p>
                                    <p style="margin-bottom: 15px;">李铁接过野兔皮毛，满意地点了点头。</p>
                                `, [
                                    {
                                        text: '交给李铁',
                                        callback: () => {
                                            document.getElementById('story-modal').classList.add('hidden');
                                            this.showQuest2Complete();
                                        }
                                    }
                                ]);
                            }
                        }
                    ]);
                }
            },
            {
                text: '大声喊叫驱赶',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('全部逃走了', `
                        <p style="margin-bottom: 15px;">你大喊一声，冲向野兔群！</p>
                        <p style="margin-bottom: 15px;">三只野兔同时受惊，向不同方向逃窜，速度快得惊人。</p>
                        <p style="margin-bottom: 15px;">你追了一会儿，但一只也没抓到。</p>
                        <p style="margin-bottom: 15px; color: #ef4444;">所有野兔都逃走了。</p>
                    `, [
                        {
                            text: '重新寻找',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2HuntPhase3();
                            }
                        }
                    ]);
                }
            },
            {
                text: '用藤蔓做套索',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('捕捉成功', `
                        <p style="margin-bottom: 15px;">你找来一根结实的藤蔓，做了一个简易的套索。</p>
                        <p style="margin-bottom: 15px;">你绕到上风处，将套索轻轻抛向一只正在专心吃草的野兔。</p>
                        <p style="margin-bottom: 15px;">套索准确地套住了野兔的脖子！</p>
                        <p style="margin-bottom: 15px;">你迅速收紧套索，将野兔拉了过来。</p>
                        <p style="margin-bottom: 15px; color: #22c55e;">你成功捕获了第三只野兔，获得了野兔皮毛x1！</p>
                        <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (3/3) - 完成！</p>
                    `, [
                        {
                            text: '返回铁匠铺',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showStoryModal('返回铁匠铺', `
                                    <p style="margin-bottom: 15px;">你带着3张野兔皮毛，回到了铁匠铺。</p>
                                    <p style="margin-bottom: 15px;"><span style="color: #ef4444; font-weight: bold;">李铁：</span>"哟，动作还挺快嘛！"</p>
                                    <p style="margin-bottom: 15px;">李铁接过野兔皮毛，满意地点了点头。</p>
                                `, [
                                    {
                                        text: '交给李铁',
                                        callback: () => {
                                            document.getElementById('story-modal').classList.add('hidden');
                                            this.showQuest2Complete();
                                        }
                                    }
                                ]);
                            }
                        }
                    ]);
                }
            },
            {
                text: '等待时机',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('时机到来', `
                        <p style="margin-bottom: 15px;">你决定耐心等待最佳时机。</p>
                        <p style="margin-bottom: 15px;">你躲在一棵大树后，静静观察着野兔群的动向。</p>
                        <p style="margin-bottom: 15px;">过了一会儿，一只野兔离开了群体，独自来到一棵树下。</p>
                        <p style="margin-bottom: 15px;">机会来了！你悄悄绕到树后，从上方扑下，将野兔压在身下。</p>
                        <p style="margin-bottom: 15px; color: #22c55e;">你成功捕获了第三只野兔，获得了野兔皮毛x1！</p>
                        <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (3/3) - 完成！</p>
                    `, [
                        {
                            text: '返回铁匠铺',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showStoryModal('返回铁匠铺', `
                                    <p style="margin-bottom: 15px;">你带着3张野兔皮毛，回到了铁匠铺。</p>
                                    <p style="margin-bottom: 15px;"><span style="color: #ef4444; font-weight: bold;">李铁：</span>"哟，动作还挺快嘛！"</p>
                                    <p style="margin-bottom: 15px;">李铁接过野兔皮毛，满意地点了点头。</p>
                                `, [
                                    {
                                        text: '交给李铁',
                                        callback: () => {
                                            document.getElementById('story-modal').classList.add('hidden');
                                            this.showQuest2Complete();
                                        }
                                    }
                                ]);
                            }
                        }
                    ]);
                }
            }
        ]);
    }

    showQuest2Complete() {
        // 检查任务是否已经完成
        const completedQuests = this.game.player.completedQuests || [];
        if (completedQuests.includes('qinglan-2')) {
            return;
        }
        
        // 接取并完成任务2
        this.game.acceptQuest('qinglan-2');
        
        // 自动完成任务2（与村长对话并获得破瘴匕首）
        const quest2 = this.game.player.quests.find(q => q.id === 'qinglan-2');
        if (quest2) {
            quest2.progress = 1;
            quest2.completed = true;
            this.game.completeQuest('qinglan-2');
        }
        
        this.game.log('系统', '完成任务：【面见村长】', 'success');
        this.game.log('系统', '获得奖励：银两x50，修为x200，破瘴匕首', 'success');
        this.updateQuestPanel();
        
        this.showStoryModal('任务完成', `
            <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">任务完成！</h3>
            <p style="margin-bottom: 15px;"><span style="color: #ef4444; font-weight: bold;">李铁：</span>“好了，这把匕首能驱散轻微瘴气，去迷雾谷的时候用得上，别弄丢了！”</p>
            <p style="margin-bottom: 15px;">你获得了破瘴匕首，这把匕首散发着微弱的光芒，似乎真的能驱散瘴气。</p>
            <p style="margin-bottom: 15px; color: #22c55e;">✅ 任务【面见村长】已完成</p>
            <p style="margin-bottom: 15px;">接下来，你需要前往迷雾谷寻找失踪的猎户王大叔。</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">💡 提示：点击王大叔NPC或前往迷雾谷开始下一个任务</p>
        `, [
            {
                text: '好的，我知道了',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    // 不再自动触发任务3，让玩家自己触发
                }
            }
        ]);
    }
    
    showQuest3Story() {
        // 任务3：初探迷雾谷
        this.showStoryModal('迷雾谷入口', `
            <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">任务3：初探迷雾谷 · 寻找猎户</h3>
            <p style="margin-bottom: 15px;">你来到迷雾谷入口，瘴气弥漫，能见度很低。</p>
            <p style="margin-bottom: 15px;">远处传来微弱的呼救声，似乎是有人被困在里面。</p>
            <p style="margin-bottom: 15px;">你握紧手中的破瘴匕首，准备进入迷雾谷。</p>
        `, [
            {
                text: '向前探索',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showQuest3Combat();
                }
            },
            {
                text: '使用破瘴匕首',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('使用破瘴匕首', `
                        <p style="margin-bottom: 15px;">你拿出破瘴匕首，匕首上的光芒驱散了周围的瘴气，形成一个安全的区域。</p>
                        <p style="margin-bottom: 15px;">现在你可以更清楚地看到周围的环境了。</p>
                    `, [
                        {
                            text: '向前探索',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest3Combat();
                            }
                        }
                    ]);
                }
            },
            {
                text: '小心观察四周',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('观察四周', `
                        <p style="margin-bottom: 15px;">你小心地观察四周，发现地上有一些脚印和血迹。</p>
                        <p style="margin-bottom: 15px;">呼救声越来越清晰，似乎来自迷雾谷的深处。</p>
                    `, [
                        {
                            text: '向前探索',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest3Combat();
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    showQuest3Combat() {
        // 遇到瘴气蠕虫 - 分阶段战斗
        this.showStoryModal('遭遇瘴气蠕虫', `
            <h3 style="color: #ef4444; text-align: center; margin-bottom: 20px;">战斗！</h3>
            <p style="margin-bottom: 15px;">你刚走进迷雾谷，就遇到了3只瘴气蠕虫！</p>
            <p style="margin-bottom: 15px;">这些蠕虫全身覆盖着绿色的瘴气，看起来非常危险。</p>
            <p style="margin-bottom: 15px;">你握紧破瘴匕首，准备战斗。</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：击败3只瘴气蠕虫 (0/3)</p>
        `, [
            {
                text: '使用匕首破瘴',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showQuest3CombatPhase1();
                }
            },
            {
                text: '逃跑（返回村庄）',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('逃跑', `
                        <p style="margin-bottom: 15px;">你决定暂时撤退，返回村庄准备一下再出发。</p>
                        <p style="margin-bottom: 15px;">村长看到你回来，鼓励你不要放弃。</p>
                    `, [
                        {
                            text: '重新进入迷雾谷',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest3Combat();
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    showQuest3CombatPhase1() {
        // 战斗第一阶段 - 击败第1只瘴气蠕虫
        this.showStoryModal('战斗进行中', `
            <h3 style="color: #ef4444; text-align: center; margin-bottom: 20px;">战斗！</h3>
            <p style="margin-bottom: 15px;">你使用破瘴匕首的光芒照射第一只瘴气蠕虫！</p>
            <p style="margin-bottom: 15px;">瘴气蠕虫发出刺耳的尖叫，身上的瘴气被驱散了一部分。</p>
            <p style="margin-bottom: 15px;">它向你扑来，你必须继续攻击！</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：击败3只瘴气蠕虫 (1/3)</p>
        `, [
            {
                text: '继续攻击',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('击败第一只', `
                        <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">击败！</h3>
                        <p style="margin-bottom: 15px;">你成功击败了第一只瘴气蠕虫！</p>
                        <p style="margin-bottom: 15px;">但是还有两只瘴气蠕虫正在向你逼近。</p>
                    `, [
                        {
                            text: '迎战第二只',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest3CombatPhase2();
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    showQuest3CombatPhase2() {
        // 战斗第二阶段 - 击败第2只瘴气蠕虫
        this.showStoryModal('战斗进行中', `
            <h3 style="color: #ef4444; text-align: center; margin-bottom: 20px;">战斗！</h3>
            <p style="margin-bottom: 15px;">第二只瘴气蠕虫比第一只更加凶猛！</p>
            <p style="margin-bottom: 15px;">它喷出大量瘴气，你感到有些头晕。</p>
            <p style="margin-bottom: 15px;">你握紧破瘴匕首，集中精神应对。</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：击败3只瘴气蠕虫 (2/3)</p>
        `, [
            {
                text: '使用匕首全力一击',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('击败第二只', `
                        <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">击败！</h3>
                        <p style="margin-bottom: 15px;">你全力一击，成功击败了第二只瘴气蠕虫！</p>
                        <p style="margin-bottom: 15px;">只剩下最后一只了，它看起来是最大的那只。</p>
                    `, [
                        {
                            text: '迎战最后一只',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest3CombatPhase3();
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    showQuest3CombatPhase3() {
        // 战斗第三阶段 - 击败第3只瘴气蠕虫（BOSS）
        this.showStoryModal('BOSS战！', `
            <h3 style="color: #ef4444; text-align: center; margin-bottom: 20px;">BOSS战！</h3>
            <p style="margin-bottom: 15px;">最后一只瘴气蠕虫体型巨大，是它们的首领！</p>
            <p style="margin-bottom: 15px;">它身上的瘴气浓郁得几乎化不开，看起来非常危险。</p>
            <p style="margin-bottom: 15px;">你感到手中的破瘴匕首在微微震动，似乎感应到了强大的瘴气。</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：击败3只瘴气蠕虫 (3/3)</p>
        `, [
            {
                text: '使用玉佩力量加持匕首',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('玉佩共鸣', `
                        <p style="margin-bottom: 15px;">你拿出身上的玉佩，它与破瘴匕首产生了共鸣！</p>
                        <p style="margin-bottom: 15px;">匕首发出耀眼的蓝光，光芒驱散了周围的瘴气。</p>
                        <p style="margin-bottom: 15px;">瘴气蠕虫BOSS发出痛苦的尖叫，它的防御被削弱了！</p>
                    `, [
                        {
                            text: '发动最后一击',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest3Victory();
                            }
                        }
                    ]);
                }
            },
            {
                text: '直接攻击',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('艰难战斗', `
                        <p style="margin-bottom: 15px;">你与瘴气蠕虫BOSS展开了激烈的战斗。</p>
                        <p style="margin-bottom: 15px;">它的皮太厚了，普通攻击效果不大。</p>
                        <p style="margin-bottom: 15px;">你受了些伤，但最终凭借毅力击败了它。</p>
                    `, [
                        {
                            text: '继续',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest3Victory();
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    showQuest3Victory() {
        // 击败瘴气蠕虫
        this.showStoryModal('战斗胜利', `
            <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">战斗胜利！</h3>
            <p style="margin-bottom: 15px;">你使用破瘴匕首的特殊能力，成功击败了3只瘴气蠕虫！</p>
            <p style="margin-bottom: 15px;">匕首的光芒驱散了周围的瘴气，你看到了被困在角落里的王大叔。</p>
            <p style="margin-bottom: 15px;"><span style="color: #f59e0b; font-weight: bold;">王大叔：</span>“谢谢你……这虫子太厉害了，我被它困住好几天了，瘴气快把我折磨疯了。”</p>
        `, [
            {
                text: '护送王大叔回村',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showQuest3Complete();
                }
            }
        ]);
    }
    
    showQuest3Complete() {
        // 检查任务是否已经完成
        const completedQuests = this.game.player.completedQuests || [];
        if (completedQuests.includes('qinglan-3')) {
            return;
        }
        
        // 接取并完成任务3
        this.game.acceptQuest('qinglan-3');
        
        // 自动完成任务3（击败瘴气蠕虫并护送王大叔回村）
        const quest3 = this.game.player.quests.find(q => q.id === 'qinglan-3');
        if (quest3) {
            quest3.progress = 3;
            quest3.completed = true;
            this.game.completeQuest('qinglan-3');
        }
        
        this.game.log('系统', '完成任务：【初探迷雾谷 · 寻找猎户】', 'success');
        this.game.log('系统', '获得奖励：守岚者披风，猎户的弓箭', 'success');
        this.updateQuestPanel();
        
        this.showStoryModal('任务完成', `
            <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">任务完成！</h3>
            <p style="margin-bottom: 15px;">你成功将王大叔送回了青岚村，村民们都松了一口气。</p>
            <p style="margin-bottom: 15px;"><span style="color: #f59e0b; font-weight: bold;">王大叔：</span>“我在迷雾谷深处看到一个巨大的黑影，好像是它在释放瘴气，而且它身上，也有一块和你一样的玉佩碎片！”</p>
            <p style="margin-bottom: 15px; color: #22c55e;">✅ 任务【初探迷雾谷 · 寻找猎户】已完成</p>
            <p style="margin-bottom: 15px;">接下来，你需要准备应对黑影的袭击。</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">💡 提示：返回村子准备应对黑影的袭击</p>
        `, [
            {
                text: '好的，我知道了',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    // 不再自动触发任务4，让玩家自己触发
                }
            }
        ]);
    }
    
    showQuest4Story() {
        // 任务4：守护村庄
        this.showStoryModal('黑影来袭', `
            <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">任务4：守护村庄 · 黑影来袭</h3>
            <p style="margin-bottom: 15px;">刚回到村里，突然警报大作！</p>
            <p style="margin-bottom: 15px;">瘴气蔓延至村口，几只黑影怪物冲破瘴气，直接攻入村子！</p>
            <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“是黑影的先锋部队，守住村口，别让它们伤害村民！”</p>
        `, [
            {
                text: '迎战黑影怪物',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showQuest4Combat();
                }
            },
            {
                text: '保护村民',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('保护村民', `
                        <p style="margin-bottom: 15px;">你优先保护村民，将他们疏散到安全的地方。</p>
                        <p style="margin-bottom: 15px;">黑影怪物看到你，纷纷向你扑来。</p>
                    `, [
                        {
                            text: '迎战黑影怪物',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest4Combat();
                            }
                        }
                    ]);
                }
            },
            {
                text: '让王大叔协助射击',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('王大叔协助', `
                        <p style="margin-bottom: 15px;">王大叔虽然受伤了，但还是拿起弓箭准备帮忙。</p>
                        <p style="margin-bottom: 15px;"><span style="color: #f59e0b; font-weight: bold;">王大叔：</span>“我来帮你！虽然我受伤了，但还能射几箭！”</p>
                    `, [
                        {
                            text: '迎战黑影怪物',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest4Combat();
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    showQuest4Combat() {
        // 与黑影怪物战斗
        this.showStoryModal('战斗！', `
            <h3 style="color: #ef4444; text-align: center; margin-bottom: 20px;">战斗！</h3>
            <p style="margin-bottom: 15px;">你与黑影怪物展开了激烈的战斗。</p>
            <p style="margin-bottom: 15px;">阿禾在一旁给你扔草药，大喊：“加油！你一定可以的！”</p>
            <p style="margin-bottom: 15px;">王大叔在远处射箭，偶尔提醒你：“左边！小心身后！”</p>
        `, [
            {
                text: '全力进攻',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showQuest4Boss();
                }
            },
            {
                text: '防御反击',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('防御反击', `
                        <p style="margin-bottom: 15px;">你采取防御反击的策略，先抵挡怪物的攻击，然后寻找机会反击。</p>
                        <p style="margin-bottom: 15px;">这种策略虽然保守，但有效地减少了你的伤害。</p>
                        <p style="margin-bottom: 15px;">你成功击败了所有的小怪，准备迎战黑影先锋。</p>
                    `, [
                        {
                            text: '继续战斗',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest4Boss();
                            }
                        }
                    ]);
                }
            },
            {
                text: '寻找弱点',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('寻找弱点', `
                        <p style="margin-bottom: 15px;">你仔细观察黑影怪物的动作，寻找它们的弱点。</p>
                        <p style="margin-bottom: 15px;">你发现它们害怕破瘴匕首的光芒，于是集中攻击它们的头部。</p>
                        <p style="margin-bottom: 15px;">你成功击败了所有的小怪，准备迎战黑影先锋。</p>
                    `, [
                        {
                            text: '继续战斗',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest4Boss();
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    showQuest4Boss() {
        // 黑影先锋出现
        this.showStoryModal('黑影先锋', `
            <h3 style="color: #ef4444; text-align: center; margin-bottom: 20px;">黑影先锋</h3>
            <p style="margin-bottom: 15px;">击败所有小怪后，一个巨大的黑影先锋出现了！</p>
            <p style="margin-bottom: 15px;">它散发着浓郁的瘴气，看起来非常强大。</p>
            <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“这就是黑影的先锋！一定要击败它，否则青岚村就完了！”</p>
        `, [
            {
                text: '全力进攻',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showQuest4Victory();
                }
            },
            {
                text: '使用玉佩力量',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('玉佩力量', `
                        <p style="margin-bottom: 15px;">你拿出身上的玉佩，它突然发出强烈的光芒！</p>
                        <p style="margin-bottom: 15px;">光芒照射在黑影先锋身上，它发出痛苦的尖叫。</p>
                        <p style="margin-bottom: 15px;">现在是击败它的好机会！</p>
                    `, [
                        {
                            text: '全力进攻',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest4Victory();
                            }
                        }
                    ]);
                }
            },
            {
                text: '呼叫支援',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('呼叫支援', `
                        <p style="margin-bottom: 15px;">你呼叫村里的其他村民帮忙，大家一起对抗黑影先锋。</p>
                        <p style="margin-bottom: 15px;">虽然村民们没有太多战斗经验，但他们的帮助分散了黑影先锋的注意力。</p>
                    `, [
                        {
                            text: '全力进攻',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest4Victory();
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    showQuest4Victory() {
        // 击败黑影先锋
        this.showStoryModal('战斗胜利', `
            <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">战斗胜利！</h3>
            <p style="margin-bottom: 15px;">你成功击败了黑影先锋！</p>
            <p style="margin-bottom: 15px;">黑影先锋留下一块玉佩碎片，与你身上的玉佩纹路吻合。</p>
            <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“果然，黑影和守岚者的信物有关，它的目标，应该是完整的守岚者玉佩。”</p>
        `, [
            {
                text: '好的，我知道了',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showQuest4Complete();
                }
            }
        ]);
    }
    
    showQuest4Complete() {
        // 检查任务是否已经完成
        const completedQuests = this.game.player.completedQuests || [];
        if (completedQuests.includes('qinglan-4')) {
            return;
        }
        
        // 接取并完成任务4
        this.game.acceptQuest('qinglan-4');
        
        // 自动完成任务4（击退黑影怪物和黑影先锋）
        const quest4 = this.game.player.quests.find(q => q.id === 'qinglan-4');
        if (quest4) {
            quest4.progress = 1;
            quest4.completed = true;
            this.game.completeQuest('qinglan-4');
        }
        
        this.game.log('系统', '完成任务：【守护村庄 · 黑影来袭】', 'success');
        this.game.log('系统', '获得奖励：银两x200，修为x500，守岚者长剑', 'success');
        this.updateQuestPanel();
        
        this.showStoryModal('任务完成', `
            <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">任务完成！</h3>
            <p style="margin-bottom: 15px;">你成功守护了青岚村，村民们都对你表示感谢。</p>
            <p style="margin-bottom: 15px;">村长将黑影先锋留下的玉佩碎片交给你，玉佩与碎片贴合，发出微光。</p>
            <p style="margin-bottom: 15px; color: #22c55e;">✅ 任务【守护村庄 · 黑影来袭】已完成</p>
            <p style="margin-bottom: 15px;">接下来，你需要与青岚村的村民们告别，前往青河镇。</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">💡 提示：点击村长或村民开始告别仪式</p>
        `, [
            {
                text: '好的，我知道了',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    // 不再自动触发任务5，让玩家自己触发
                }
            }
        ]);
    }
    
    showQuest5Story() {
        // 任务5：告别青岚村
        this.showStoryModal('告别青岚村', `
            <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">任务5：告别青岚村 · 正式入世</h3>
            <p style="margin-bottom: 15px;">村长召集村民，在村口举行简单的仪式。</p>
            <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“小伙子，你已经证明了自己，你就是真正的守岚者。”</p>
            <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“黑影没有被彻底消灭，它还在迷雾谷深处，而且它的势力正在扩大，迟早会危害更多地方。”</p>
            <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“青岚村已经安全了，但还有更多人需要你守护。沿着村外的大路一直走，就能到达青河镇。”</p>
        `, [
            {
                text: '与村长告别',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('与村长告别', `
                        <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">村长：</span>“去吧，守岚者！记住你的使命，保护那些需要帮助的人。”</p>
                        <p style="margin-bottom: 15px;">村长递给你一些银两和补给，作为路上的盘缠。</p>
                    `, [
                        {
                            text: '继续告别其他人',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showStoryModal('与阿禾告别', `
                                    <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">阿禾：</span>“这是我做的干粮，路上吃，你一定要照顾好自己，记得常回青岚村看看我们。”</p>
                                    <p style="margin-bottom: 15px;">阿禾眼眶微红，递给你一包干粮。</p>
                                `, [
                                    {
                                        text: '继续告别其他人',
                                        callback: () => {
                                            document.getElementById('story-modal').classList.add('hidden');
                                            this.showStoryModal('与王大叔告别', `
                                                <p style="margin-bottom: 15px;"><span style="color: #f59e0b; font-weight: bold;">王大叔：</span>“加油，守岚者！要是遇到搞不定的怪物，就回来找我，我陪你一起去！”</p>
                                                <p style="margin-bottom: 15px;">王大叔拍了拍你的肩膀，鼓励你。</p>
                                            `, [
                                                {
                                                    text: '直接离开',
                                                    callback: () => {
                                                        document.getElementById('story-modal').classList.add('hidden');
                                                        this.showQuest5Leave();
                                                    }
                                                }
                                            ]);
                                        }
                                    },
                                    {
                                        text: '直接离开',
                                        callback: () => {
                                            document.getElementById('story-modal').classList.add('hidden');
                                            this.showQuest5Leave();
                                        }
                                    }
                                ]);
                            }
                        },
                        {
                            text: '直接离开',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest5Leave();
                            }
                        }
                    ]);
                }
            },
            {
                text: '与阿禾告别',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('与阿禾告别', `
                        <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">阿禾：</span>“这是我做的干粮，路上吃，你一定要照顾好自己，记得常回青岚村看看我们。”</p>
                        <p style="margin-bottom: 15px;">阿禾眼眶微红，递给你一包干粮。</p>
                    `, [
                        {
                            text: '继续告别其他人',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showStoryModal('与王大叔告别', `
                                    <p style="margin-bottom: 15px;"><span style="color: #f59e0b; font-weight: bold;">王大叔：</span>“加油，守岚者！要是遇到搞不定的怪物，就回来找我，我陪你一起去！”</p>
                                    <p style="margin-bottom: 15px;">王大叔拍了拍你的肩膀，鼓励你。</p>
                                `, [
                                    {
                                        text: '直接离开',
                                        callback: () => {
                                            document.getElementById('story-modal').classList.add('hidden');
                                            this.showQuest5Leave();
                                        }
                                    }
                                ]);
                            }
                        },
                        {
                            text: '直接离开',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest5Leave();
                            }
                        }
                    ]);
                }
            },
            {
                text: '与王大叔告别',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('与王大叔告别', `
                        <p style="margin-bottom: 15px;"><span style="color: #f59e0b; font-weight: bold;">王大叔：</span>“加油，守岚者！要是遇到搞不定的怪物，就回来找我，我陪你一起去！”</p>
                        <p style="margin-bottom: 15px;">王大叔拍了拍你的肩膀，鼓励你。</p>
                    `, [
                        {
                            text: '直接离开',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest5Leave();
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    showQuest5Leave() {
        // 离开青岚村
        this.showStoryModal('离开青岚村', `
            <p style="margin-bottom: 15px;">你与青岚村的村民们告别，踏上了前往青河镇的道路。</p>
            <p style="margin-bottom: 15px;">回头望去，村民们还在村口挥手送别。</p>
            <p style="margin-bottom: 15px;">玉佩与碎片融合，浮现出模糊的记忆碎片——一个模糊的身影，在迷雾谷深处守护着什么。</p>
        `, [
            {
                text: '前往青河镇',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showQuest5Complete();
                }
            }
        ]);
    }
    
    showQuest5Complete() {
        // 检查任务是否已经完成
        const completedQuests = this.game.player.completedQuests || [];
        if (completedQuests.includes('qinglan-5')) {
            return;
        }
        
        // 接取并完成任务5
        this.game.acceptQuest('qinglan-5');
        
        // 自动完成任务5（与村民告别并前往青河镇）
        const quest5 = this.game.player.quests.find(q => q.id === 'qinglan-5');
        if (quest5) {
            quest5.progress = 1;
            quest5.completed = true;
            this.game.completeQuest('qinglan-5');
        }
        
        this.game.log('系统', '完成任务：【告别青岚村 · 正式入世】', 'success');
        this.game.log('系统', '获得奖励：银两x500，修为x1000，完整守岚者玉佩，称号：青岚守护者', 'success');
        this.updateQuestPanel();
        
        this.showStoryModal('任务完成', `
            <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">任务完成！</h3>
            <p style="margin-bottom: 15px;">你成功到达了青河镇，完成了新手村的所有任务。</p>
            <p style="margin-bottom: 15px;">你的玉佩现在完整了，它赋予你瘴气免疫的能力，并且提升了你的基础属性。</p>
            <p style="margin-bottom: 15px;">你获得了「青岚守护者」的称号，这是对你守护青岚村的认可。</p>
            <p style="margin-bottom: 15px; color: #22c55e;">✅ 任务【告别青岚村 · 正式入世】已完成</p>
            <p style="margin-bottom: 15px;">现在，你可以在青河镇开始新的冒险了！</p>
        `, [
            {
                text: '好的，我知道了',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                }
            }
        ]);
    }
    
    showQingheTownArrival() {
        // 青河镇到达剧情
        this.showStoryModal('青河镇 · 新的开始', `
            <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">欢迎来到青河镇</h3>
            <p style="margin-bottom: 15px;">你终于到达了青河镇，这里比青岚村繁华得多。</p>
            <p style="margin-bottom: 15px;">街道两旁店铺林立，人来人往，好不热闹。</p>
            <p style="margin-bottom: 15px;">突然，你听到旁边有人在议论着什么...</p>
            <p style="margin-bottom: 15px;"><span style="color: #34d399; font-weight: bold;">路人甲：</span>"听说了吗？最近各大宗门都在招兵买马呢！"</p>
            <p style="margin-bottom: 15px;"><span style="color: #60a5fa; font-weight: bold;">路人乙：</span>"是啊，听说只要符合条件的修士，都可以去各大门派的招募使那里报名加入。"</p>
            <p style="margin-bottom: 15px;"><span style="color: #f59e0b; font-weight: bold;">路人丙：</span>"不过也有人不加入门派，听说去散修大师那里学习技能，做个散修大神也不错！"</p>
        `, [
            {
                text: '询问门派招募详情',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('门派招募', `
                        <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">门派招募</h3>
                        <p style="margin-bottom: 15px;">你向路人打听了更多关于门派招募的信息。</p>
                        <p style="margin-bottom: 15px;">据说青河镇的中心广场有各大门派的招募使驻守，包括：</p>
                        <p style="margin-bottom: 10px;"><span style="color: #ef4444; font-weight: bold;">🔥 炎阳宗</span> - 擅长火系法术，攻击力强大</p>
                        <p style="margin-bottom: 10px;"><span style="color: #3b82f6; font-weight: bold;">💧 玄冰宫</span> - 擅长冰系法术，控制能力强</p>
                        <p style="margin-bottom: 10px;"><span style="color: #22c55e; font-weight: bold;">🌿 万木林</span> - 擅长木系法术，治疗能力出众</p>
                        <p style="margin-bottom: 10px;"><span style="color: #f59e0b; font-weight: bold;">⚔️ 金剑门</span> - 擅长剑术，近战能力极强</p>
                        <p style="margin-bottom: 15px;"><span style="color: #6b7280; font-weight: bold;">🏔️ 土行宗</span> - 擅长防御，生存能力最强</p>
                        <p style="margin-bottom: 15px; color: #fbbf24;">💡 提示：前往中心广场寻找各大门派的招募使</p>
                    `, [
                        {
                            text: '前往中心广场',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showStoryModal('出发', `
                                    <p style="margin-bottom: 15px;">你决定前往中心广场，寻找适合自己的门派。</p>
                                    <p style="margin-bottom: 15px;">加入门派后，你将获得门派功法、资源和庇护。</p>
                                    <p style="margin-bottom: 15px; color: #22c55e;">祝你在修仙之路上一帆风顺！</p>
                                `, [
                                    {
                                        text: '出发',
                                        callback: () => {
                                            document.getElementById('story-modal').classList.add('hidden');
                                        }
                                    }
                                ]);
                            }
                        },
                        {
                            text: '了解散修路线',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQingheTownScatteredCultivator();
                            }
                        }
                    ]);
                }
            },
            {
                text: '了解散修路线',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showQingheTownScatteredCultivator();
                }
            },
            {
                text: '继续探索青河镇',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('探索青河镇', `
                        <p style="margin-bottom: 15px;">你决定在青河镇四处走走，熟悉一下环境。</p>
                        <p style="margin-bottom: 15px;">青河镇比青岚村大得多，有很多值得探索的地方。</p>
                        <p style="margin-bottom: 15px;">你可以去中心广场找门派招募使，也可以去城西找散修大师学习技能。</p>
                        <p style="margin-bottom: 15px; color: #fbbf24;">💡 提示：点击地图上的地点进行移动</p>
                    `, [
                        {
                            text: '开始探索',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    showQingheTownScatteredCultivator() {
        // 散修路线介绍
        this.showStoryModal('散修之路', `
            <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">散修之路</h3>
            <p style="margin-bottom: 15px;">你向路人打听了散修大师的信息。</p>
            <p style="margin-bottom: 15px;"><span style="color: #a855f7; font-weight: bold;">散修大师</span>住在青河镇的城西，是一位隐世高人。</p>
            <p style="margin-bottom: 15px;">他不属于任何门派，但精通各种功法，愿意教导有缘人。</p>
            <p style="margin-bottom: 15px;">成为散修的好处：</p>
            <p style="margin-bottom: 10px;">✅ 不受门派规矩约束，自由度高</p>
            <p style="margin-bottom: 10px;">✅ 可以学习各种流派的技能，博采众长</p>
            <p style="margin-bottom: 10px;">✅ 不需要完成门派任务，时间自由</p>
            <p style="margin-bottom: 15px;">成为散修的挑战：</p>
            <p style="margin-bottom: 10px;">⚠️ 没有门派资源支持，修炼资源需要自己获取</p>
            <p style="margin-bottom: 10px;">⚠️ 没有门派庇护，遇到危险只能靠自己</p>
            <p style="margin-bottom: 15px;">⚠️ 功法学习需要更多时间和努力</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">💡 提示：前往城西寻找散修大师</p>
        `, [
            {
                text: '前往城西找散修大师',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('出发', `
                        <p style="margin-bottom: 15px;">你决定前往城西，寻找散修大师学习技能。</p>
                        <p style="margin-bottom: 15px;">成为散修虽然艰难，但自由自在，不受约束。</p>
                        <p style="margin-bottom: 15px;">相信凭借你的努力，一定能成为一代散修大神！</p>
                        <p style="margin-bottom: 15px; color: #22c55e;">祝你在修仙之路上一帆风顺！</p>
                    `, [
                        {
                            text: '出发',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                            }
                        }
                    ]);
                }
            },
            {
                text: '了解门派招募',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('门派招募', `
                        <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">门派招募</h3>
                        <p style="margin-bottom: 15px;">你向路人打听了更多关于门派招募的信息。</p>
                        <p style="margin-bottom: 15px;">据说青河镇的中心广场有各大门派的招募使驻守，包括：</p>
                        <p style="margin-bottom: 10px;"><span style="color: #ef4444; font-weight: bold;">🔥 炎阳宗</span> - 擅长火系法术，攻击力强大</p>
                        <p style="margin-bottom: 10px;"><span style="color: #3b82f6; font-weight: bold;">💧 玄冰宫</span> - 擅长冰系法术，控制能力强</p>
                        <p style="margin-bottom: 10px;"><span style="color: #22c55e; font-weight: bold;">🌿 万木林</span> - 擅长木系法术，治疗能力出众</p>
                        <p style="margin-bottom: 10px;"><span style="color: #f59e0b; font-weight: bold;">⚔️ 金剑门</span> - 擅长剑术，近战能力极强</p>
                        <p style="margin-bottom: 15px;"><span style="color: #6b7280; font-weight: bold;">🏔️ 土行宗</span> - 擅长防御，生存能力最强</p>
                        <p style="margin-bottom: 15px; color: #fbbf24;">💡 提示：前往中心广场寻找各大门派的招募使</p>
                    `, [
                        {
                            text: '前往中心广场',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showStoryModal('出发', `
                                    <p style="margin-bottom: 15px;">你决定前往中心广场，寻找适合自己的门派。</p>
                                    <p style="margin-bottom: 15px;">加入门派后，你将获得门派功法、资源和庇护。</p>
                                    <p style="margin-bottom: 15px; color: #22c55e;">祝你在修仙之路上一帆风顺！</p>
                                `, [
                                    {
                                        text: '出发',
                                        callback: () => {
                                            document.getElementById('story-modal').classList.add('hidden');
                                        }
                                    }
                                ]);
                            }
                        }
                    ]);
                }
            }
        ]);
    }
    
    showCharacterModal() {
        const player = this.game.player;
        if (!player) return;
        
        const totalStats = this.game.getPlayerTotalStats();
        const equipBonuses = this.game.calculateEquipmentBonuses();
        const bookBonuses = this.game.calculateBookBonuses();
        
        const strengthTotal = (player.strength || 0) + (equipBonuses.strength || 0) + (bookBonuses.strength || 0);
        const vitalityTotal = (player.vitality || 0) + (equipBonuses.vitality || 0) + (bookBonuses.vitality || 0);
        const intelligenceTotal = (player.intelligence || 0) + (equipBonuses.intelligence || 0) + (bookBonuses.intelligence || 0);
        const agilityTotal = (player.agility || 0) + (equipBonuses.agility || 0) + (bookBonuses.agility || 0);
        
        // 获取套装信息
        const equipment = this.game.player.equipment;
        const equippedItems = Object.values(equipment).filter(item => item !== null);
        const sets = {};
        equippedItems.forEach(item => {
            if (item.set) {
                if (!sets[item.set]) {
                    sets[item.set] = [];
                }
                sets[item.set].push(item);
            }
        });
        
        // 套装名称映射（拼音 -> 中文）
        const setNameMap = {
            'liu jin': '鎏金套',
            'lie yang': '烈阳套',
            'zhen jin': '镇金套',
            'jin que': '金阙套',
            'qing lan': '青岚套',
            'wan mu': '万木套',
            'chang sheng': '长生套',
            'ku rong': '枯荣套',
            'ning shui': '凝水套',
            'liu shuang': '流霜套',
            'cang lan': '沧澜套',
            'cang hai': '沧海套',
            'chi yan': '赤焰套',
            'fen tian': '焚天套',
            'yan yu': '炎狱套',
            'jiu tian': '九天套',
            'huang tu': '黄土套',
            'pan shi': '磐石套',
            'zhen yue': '镇岳套',
            'wan yue': '万岳套'
        };
        
        // 套装效果描述（拼音为键）
        const setEffectDescriptions = {
            'liu jin': { desc: '金芒一闪：15%几率额外30%物攻伤害', pieces: 2 },
            'lie yang': { desc: '金芒一闪：30%几率额外30%物攻伤害', pieces: 4 },
            'zhen jin': { desc: '金斩：攻击时额外造成伤害', pieces: 4 },
            'jin que': { desc: '金斩+金御：攻击额外伤害并提升防御', pieces: 4 },
            'qing lan': { desc: '木愈：10%几率攻击后恢复气血', pieces: 4 },
            'wan mu': { desc: '木愈：20%几率攻击后恢复气血', pieces: 4 },
            'chang sheng': { desc: '木愈：25%几率攻击后恢复气血', pieces: 4 },
            'ku rong': { desc: '木愈：40%几率攻击后恢复气血，免疫中毒', pieces: 4 },
            'ning shui': { desc: '冰封：10%几率冰冻敌人2回合', pieces: 4 },
            'liu shuang': { desc: '冰封：20%几率冰冻敌人2回合', pieces: 4 },
            'cang lan': { desc: '冰封：25%几率冰冻敌人2回合', pieces: 4 },
            'cang hai': { desc: '冰封：40%几率冰冻敌人2回合', pieces: 4 },
            'chi yan': { desc: '灼烧：15%几率使敌人灼烧3回合', pieces: 4 },
            'fen tian': { desc: '灼烧：25%几率使敌人灼烧3回合', pieces: 4 },
            'yan yu': { desc: '灼烧：30%几率使敌人灼烧3回合', pieces: 4 },
            'jiu tian': { desc: '灼烧：50%几率使敌人灼烧3回合', pieces: 4 },
            'huang tu': { desc: '反震：10%几率反弹20%伤害', pieces: 4 },
            'pan shi': { desc: '反震：20%几率反弹20%伤害', pieces: 4 },
            'zhen yue': { desc: '反震：25%几率反弹20%伤害', pieces: 4 },
            'wan yue': { desc: '反震：40%几率反弹20%伤害', pieces: 4 }
        };
        
        // 构建套装HTML
        let setHtml = '';
        if (Object.keys(sets).length > 0) {
            const setBonuses = GAME_DATA.ITEM_DATABASE.GENERATORS.SET_BONUSES;
            setHtml = '<div style="margin-top: 20px; padding: 15px; background: rgba(168, 85, 247, 0.15); border-radius: 8px;">';
            setHtml += '<h4 style="color: #a855f7; margin-bottom: 10px;">✨ 套装效果</h4>';
            for (const [setName, items] of Object.entries(sets)) {
                const chineseName = setNameMap[setName] || setName;
                const setData = setBonuses[setName];
                const setInfo = setEffectDescriptions[setName];
                const count = items.length;
                
                let effectHtml = '';
                
                // 显示2件套装属性
                if (setData && setData.twoPiece) {
                    const isTwoPieceActive = count >= 2;
                    const attrs = Object.entries(setData.twoPiece).map(([attr, val]) => {
                        const attrNames = {
                            attack: '攻击', defense: '防御', hp: '气血', mp: '灵力',
                            strength: '力量', vitality: '体质', intelligence: '智力', agility: '敏捷',
                            crit: '暴击率', critDmg: '暴击伤害', dodge: '闪避', hit: '命中',
                            magicDamage: '法伤', mpRegen: '回蓝', magicDefense: '法防',
                            regen: '回血', burn: '灼烧', dotReduce: '减伤', reflect: '反弹',
                            attackPercent: '物攻', defensePercent: '物防', hpPercent: '气血',
                            magicAttackPercent: '法攻', magicDefensePercent: '法防', speedPercent: '速度',
                            dodgePercent: '闪避', critRate: '暴击', burnDamage: '灼烧',
                            armorPenetration: '破甲', teamHealBonus: '治疗', poisonDamage: '毒伤',
                            freezeChance: '冰冻', freezeDuration: '冰冻', burnExplodeChance: '爆发',
                            burnExplodeDamageBonus: '爆发伤害', burnDamageBonus: '灼烧',
                            burnDurationBonus: '灼烧', reflectChance: '反震', reflectDamagePercent: '反震',
                            stunResist: '抗晕', poisonImmune: '免疫毒', slowImmune: '免疫减速',
                            areaSkillDamageBonus: '范围伤害', fullScreenDamageBonus: '全屏伤害',
                            jinMangYiShan: '金芒一闪', jinMangYiShanChance: '金芒一闪',
                            jinMangYiShanDamageBonus: '金芒伤害', jinMangZhan: '金斩',
                            jinMangZhanDamage: '金斩伤害', jinMangZhanRangeBonus: '金斩范围',
                            jinYangHuTi: '金阳护体', jinYangHuTiDamageReduce: '金阳减伤',
                            qingMuHuiChun: '青木回春', qingMuHuiChunChance: '青木回春',
                            qingMuHuiChunHealPercent: '回春治疗', qingMuHuXin: '青木护心',
                            qingMuHuXinChance: '青木护心', qingMuHuXinHealPercent: '护心治疗',
                            kuRongBuff: '枯荣', kuRongDamageReduce: '枯荣减伤',
                            shuiYingBu: '水影步', shuiYingBuDodge: '水影闪避',
                            shuiYingShanBi: '水影闪避', shuiYingShanBiChance: '水影闪避',
                            yanHuoBuMie: '炎火不灭', daDiShouHu: '大地守护',
                            daDiShouHuDamageReduce: '大地减伤', zhenYueZhiQu: '镇岳之躯',
                            zhenYueZhiQuDamageReduce: '镇岳减伤', burnDamageDouble: '双倍灼烧'
                        };
                        return `${attrNames[attr] || attr}+${val}`;
                    }).join('，');
                    effectHtml += `<div style="margin-top: 5px; color: ${isTwoPieceActive ? '#22c55e' : '#6b7280'};">
                        <span style="font-weight: bold;">【2件】</span> ${attrs}
                        ${isTwoPieceActive ? ' ✓' : ' (需2件)'}
                    </div>`;
                }
                
                // 显示4件套装属性
                if (setData && setData.fourPiece) {
                    const isFourPieceActive = count >= 4;
                    const attrs = Object.entries(setData.fourPiece).map(([attr, val]) => {
                        const attrNames = {
                            attack: '攻击', defense: '防御', hp: '气血', mp: '灵力',
                            strength: '力量', vitality: '体质', intelligence: '智力', agility: '敏捷',
                            crit: '暴击率', critDmg: '暴击伤害', dodge: '闪避', hit: '命中',
                            magicDamage: '法伤', mpRegen: '回蓝', magicDefense: '法防',
                            regen: '回血', burn: '灼烧', dotReduce: '减伤', reflect: '反弹',
                            attackPercent: '物攻', defensePercent: '物防', hpPercent: '气血',
                            magicAttackPercent: '法攻', magicDefensePercent: '法防', speedPercent: '速度',
                            dodgePercent: '闪避', critRate: '暴击', burnDamage: '灼烧',
                            armorPenetration: '破甲', teamHealBonus: '治疗', poisonDamage: '毒伤',
                            freezeChance: '冰冻', freezeDuration: '冰冻', burnExplodeChance: '爆发',
                            burnExplodeDamageBonus: '爆发伤害', burnDamageBonus: '灼烧',
                            burnDurationBonus: '灼烧', reflectChance: '反震', reflectDamagePercent: '反震',
                            stunResist: '抗晕', poisonImmune: '免疫毒', slowImmune: '免疫减速',
                            areaSkillDamageBonus: '范围伤害', fullScreenDamageBonus: '全屏伤害',
                            jinMangYiShan: '金芒一闪', jinMangYiShanChance: '金芒一闪',
                            jinMangYiShanDamageBonus: '金芒伤害', jinMangZhan: '金斩',
                            jinMangZhanDamage: '金斩伤害', jinMangZhanRangeBonus: '金斩范围',
                            jinYangHuTi: '金阳护体', jinYangHuTiDamageReduce: '金阳减伤',
                            qingMuHuiChun: '青木回春', qingMuHuiChunChance: '青木回春',
                            qingMuHuiChunHealPercent: '回春治疗', qingMuHuXin: '青木护心',
                            qingMuHuXinChance: '青木护心', qingMuHuXinHealPercent: '护心治疗',
                            kuRongBuff: '枯荣', kuRongDamageReduce: '枯荣减伤',
                            shuiYingBu: '水影步', shuiYingBuDodge: '水影闪避',
                            shuiYingShanBi: '水影闪避', shuiYingShanBiChance: '水影闪避',
                            yanHuoBuMie: '炎火不灭', daDiShouHu: '大地守护',
                            daDiShouHuDamageReduce: '大地减伤', zhenYueZhiQu: '镇岳之躯',
                            zhenYueZhiQuDamageReduce: '镇岳减伤', burnDamageDouble: '双倍灼烧'
                        };
                        return `${attrNames[attr] || attr}+${val}`;
                    }).join('，');
                    effectHtml += `<div style="margin-top: 3px; color: ${isFourPieceActive ? '#22c55e' : '#6b7280'};">
                        <span style="font-weight: bold;">【4件】</span> ${attrs}
                        ${isFourPieceActive ? ' ✓' : ' (需4件)'}
                    </div>`;
                }
                
                // 显示特殊效果
                if (setInfo) {
                    const isSpecialActive = count >= setInfo.pieces;
                    effectHtml += `<div style="margin-top: 3px; color: ${isSpecialActive ? '#fbbf24' : '#6b7280'};">
                        <span style="font-weight: bold;">【特效】</span> ${setInfo.desc}
                        ${isSpecialActive ? ' ✓' : ` (需${setInfo.pieces}件)`}
                    </div>`;
                }
                
                setHtml += `
                    <div style="margin-bottom: 10px; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 6px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <strong style="color: #d1d5db;">${chineseName}</strong>
                            <span style="color: #a855f7; font-weight: bold;">
                                已装备：${count}/6
                            </span>
                        </div>
                        ${effectHtml}
                    </div>
                `;
            }
            setHtml += '</div>';
        }
        
        const htmlContent = `
            <div style="margin-bottom: 20px; padding: 15px; background: rgba(251, 191, 36, 0.1); border-radius: 8px; text-align: center;">
                <h3 style="color: #fbbf24; font-size: 24px; margin-bottom: 10px;">${player.name}</h3>
                <div style="color: ${player.lingen.color}; font-size: 18px; margin-bottom: 5px;">${player.lingen.name}</div>
                <div style="color: #fbbf24; font-weight: bold; font-size: 20px;">${player.realm.name}</div>
                <div style="color: #9ca3af; margin-top: 5px;">${player.sect ? `${player.sect.name} - ${player.sectPosition}` : '散修'}</div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <h4 style="color: #60a5fa; margin-bottom: 15px; border-bottom: 1px solid #374151; padding-bottom: 5px;">基础属性</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div style="padding: 10px; background: rgba(239, 68, 68, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">攻击</div>
                            <div style="color: #ef4444; font-weight: bold; font-size: 18px;">${totalStats.attack}</div>
                        </div>
                        <div style="padding: 10px; background: rgba(59, 130, 246, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">防御</div>
                            <div style="color: #3b82f6; font-weight: bold; font-size: 18px;">${totalStats.defense}</div>
                        </div>
                        <div style="padding: 10px; background: rgba(245, 158, 11, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">力量</div>
                            <div style="color: #f59e0b; font-weight: bold; font-size: 18px;">${strengthTotal}</div>
                        </div>
                        <div style="padding: 10px; background: rgba(16, 185, 129, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">体质</div>
                            <div style="color: #10b981; font-weight: bold; font-size: 18px;">${vitalityTotal}</div>
                        </div>
                        <div style="padding: 10px; background: rgba(139, 92, 246, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">智力</div>
                            <div style="color: #8b5cf6; font-weight: bold; font-size: 18px;">${intelligenceTotal}</div>
                        </div>
                        <div style="padding: 10px; background: rgba(59, 130, 246, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">敏捷</div>
                            <div style="color: #3b82f6; font-weight: bold; font-size: 18px;">${agilityTotal}</div>
                        </div>
                        <div style="padding: 10px; background: rgba(139, 92, 246, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">悟性</div>
                            <div style="color: #8b5cf6; font-weight: bold; font-size: 18px;">${player.wisdom}</div>
                        </div>
                        <div style="padding: 10px; background: rgba(251, 191, 36, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">气运</div>
                            <div style="color: #fbbf24; font-weight: bold; font-size: 18px;">${player.luck || 0}</div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 style="color: #f97316; margin-bottom: 15px; border-bottom: 1px solid #374151; padding-bottom: 5px;">战斗属性</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div style="padding: 10px; background: rgba(239, 68, 68, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">暴击率</div>
                            <div style="color: #ef4444; font-weight: bold; font-size: 18px;">${totalStats.critRate.toFixed(1)}%</div>
                        </div>
                        <div style="padding: 10px; background: rgba(251, 191, 36, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">暴击伤害</div>
                            <div style="color: #fbbf24; font-weight: bold; font-size: 18px;">${totalStats.critDmg.toFixed(0)}%</div>
                        </div>
                        <div style="padding: 10px; background: rgba(59, 130, 246, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">闪避</div>
                            <div style="color: #3b82f6; font-weight: bold; font-size: 18px;">${totalStats.dodge.toFixed(1)}%</div>
                        </div>
                        <div style="padding: 10px; background: rgba(34, 197, 94, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">命中</div>
                            <div style="color: #22c55e; font-weight: bold; font-size: 18px;">${totalStats.hit.toFixed(1)}%</div>
                        </div>
                        <div style="padding: 10px; background: rgba(139, 92, 246, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">法伤</div>
                            <div style="color: #8b5cf6; font-weight: bold; font-size: 18px;">${totalStats.magicDamage}</div>
                        </div>
                        <div style="padding: 10px; background: rgba(59, 130, 246, 0.2); border-radius: 6px; text-align: center;">
                            <div style="color: #9ca3af; font-size: 12px;">回蓝</div>
                            <div style="color: #3b82f6; font-weight: bold; font-size: 18px;">${totalStats.mpRegen.toFixed(1)}/回合</div>
                        </div>
                    </div>
                </div>
            </div>
            
            ${setHtml}
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px;">
                <h4 style="color: #a78bfa; margin-bottom: 10px;">属性说明</h4>
                <div style="color: #9ca3af; font-size: 12px; line-height: 1.8;">
                    <p>• <strong style="color: #f59e0b;">力量</strong>：增加物理攻击力</p>
                    <p>• <strong style="color: #10b981;">体质</strong>：增加气血值和物理防御</p>
                    <p>• <strong style="color: #8b5cf6;">智力</strong>：增加灵力值、法术伤害和回蓝速度</p>
                    <p>• <strong style="color: #3b82f6;">敏捷</strong>：增加闪避率、命中率和暴击率</p>
                    <p>• <strong style="color: #60a5fa;">悟性</strong>：增加修炼速度</p>
                    <p>• <strong style="color: #fbbf24;">气运</strong>：影响随机事件和掉落概率</p>
                </div>
            </div>
        `;
        
        document.getElementById('character-modal-content').innerHTML = htmlContent;
        document.getElementById('character-modal').classList.remove('hidden');
        
        document.getElementById('character-modal').addEventListener('click', (e) => {
            if (e.target.id === 'character-modal') {
                this.closeCharacterModal();
            }
        });
    }
    
    closeCharacterModal() {
        document.getElementById('character-modal').classList.add('hidden');
    }

    // 炼丹房相关函数

    showAlchemyModal() {
        console.log('showAlchemyModal: called');
        if (!this.game || !this.game.player) {
            console.log('showAlchemyModal: game or player is null');
            return;
        }
        console.log('showAlchemyModal: calling getAvailableRecipes');
        const recipes = this.game.getAvailableRecipes() || [];
        console.log('showAlchemyModal: recipes =', recipes);
        let htmlContent = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <h3 style="color: #fbbf24; margin-bottom: 15px;">材料仓库</h3>
                    <div style="max-height: 300px; overflow-y: auto; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px;">
        `;
        
        if (this.game.player.materialInventory && Object.keys(this.game.player.materialInventory).length > 0) {
            for (const [materialId, quantity] of Object.entries(this.game.player.materialInventory)) {
                let materialName = materialId;
                if (GAME_DATA.ALCHEMY && GAME_DATA.ALCHEMY.MATERIALS && GAME_DATA.ALCHEMY.MATERIALS[materialId]) {
                    materialName = GAME_DATA.ALCHEMY.MATERIALS[materialId].name;
                }
                htmlContent += `
                    <div style="padding: 8px; margin-bottom: 5px; background: rgba(59,130,246,0.1); border-radius: 4px; display: flex; justify-content: space-between;">
                        <span style="color: #9ca3af;">${materialName}</span>
                        <span style="color: #fbbf24;">x${quantity}</span>
                    </div>
                `;
            }
        } else {
            htmlContent += `<div style="color: #6b7280; text-align: center; padding: 20px;">暂无材料</div>`;
        }
        
        htmlContent += `
                    </div>
                    <div style="margin-top: 15px; padding: 15px; background: rgba(59,130,246,0.1); border-radius: 8px;">
                        <div style="color: #9ca3af; margin-bottom: 5px;">炼丹熟练度</div>
                        <div style="color: #3b82f6; font-size: 24px; font-weight: bold;">${this.game.player.alchemyProficiency || 0}</div>
                        ${this.game.hasHerbLingen ? '<div style="color: #22c55e; margin-top: 10px;">✨ 炼丹辅助特性生效</div>' : ''}
                    </div>
                </div>
                <div>
                    <h3 style="color: #fbbf24; margin-bottom: 15px;">配方列表</h3>
                    <div style="max-height: 450px; overflow-y: auto;">
        `;
        
        if (recipes.length > 0) {
            recipes.forEach(recipe => {
                const canCraft = this.game.hasMaterials ? this.game.hasMaterials(recipe) : false;
                const successRate = this.game.calculateSuccessRate ? this.game.calculateSuccessRate(recipe) : 0.5;
                let materialsHtml = '';
                if (recipe.materials) {
                    for (const [materialId, quantity] of Object.entries(recipe.materials)) {
                        let materialName = materialId;
                        if (GAME_DATA.ALCHEMY && GAME_DATA.ALCHEMY.MATERIALS && GAME_DATA.ALCHEMY.MATERIALS[materialId]) {
                            materialName = GAME_DATA.ALCHEMY.MATERIALS[materialId].name;
                        }
                        const hasEnough = this.game.player.materialInventory && 
                                        this.game.player.materialInventory[materialId] >= quantity;
                        materialsHtml += `
                            <span style="color: ${hasEnough ? '#22c55e' : '#ef4444'}; margin-right: 10px;">${materialName} x${quantity}</span>
                        `;
                    }
                }
                
                htmlContent += `
                    <div style="padding: 12px; margin-bottom: 10px; background: ${recipe.isSpecial ? 'rgba(168,85,247,0.1)' : 'rgba(0,0,0,0.2)'}; border-radius: 8px; border: 1px solid ${recipe.isSpecial ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.1)'};">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="color: ${recipe.isSpecial ? '#a855f7' : '#fbbf24'}; font-weight: bold;">${recipe.name || '未知配方'}${recipe.isSpecial ? ' (特殊)' : ''}</span>
                            <span style="color: #22c55e; font-size: 14px;">成功率: ${(successRate * 100).toFixed(0)}%</span>
                        </div>
                        <div style="color: #9ca3af; font-size: 12px; margin-bottom: 8px;">${recipe.description || ''}</div>
                        <div style="font-size: 12px; margin-bottom: 8px;">材料: ${materialsHtml}</div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: #6b7280; font-size: 12px;">需要: ${recipe.requiredRealm || '无'} | 熟练度 ${recipe.requiredProficiency || 0}</span>
                            <button class="btn ${canCraft ? 'btn-success' : 'btn-secondary'}" style="padding: 5px 15px; font-size: 12px;" 
                                    ${canCraft ? '' : 'disabled'}
                                    onclick="ui.craftPill('${recipe.name}')">
                                ${canCraft ? '炼制' : '材料不足'}
                            </button>
                        </div>
                    </div>
                `;
            });
        } else {
            htmlContent += `<div style="color: #6b7280; text-align: center; padding: 40px;">暂无可炼制的配方</div>`;
        }
        
        htmlContent += `
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('alchemy-modal-content').innerHTML = htmlContent;
        document.getElementById('alchemy-modal').classList.remove('hidden');
    }

    closeAlchemyModal() {
        document.getElementById('alchemy-modal').classList.add('hidden');
    }

    craftPill(recipeName) {
        if (!this.game || !this.game.craftPill) {
            return;
        }
        this.game.craftPill(recipeName);
        this.showAlchemyModal();
        this.updateAll();
    }
}

const ui = new UI();
document.addEventListener('DOMContentLoaded', () => ui.init());