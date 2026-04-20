    showQuest2Blacksmith() {
        // 铁匠铺场景
        this.showStoryModal('铁匠铺', `
            <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">铁匠铺</h3>
            <p style="margin-bottom: 15px;">你来到村东头的铁匠铺，看到一位膀大腰圆的铁匠正在打铁。</p>
            <p style="margin-bottom: 15px;"><span style="color: #ef4444; font-weight: bold;">李铁：</span>"村长说你是守岚者？就你这破衣服？"</p>
            <p style="margin-bottom: 15px;"><span style="color: #ef4444; font-weight: bold;">李铁：</span>"放心，我给你打造一把能破瘴气的匕首，不过你得给我找些野兔皮毛，我正好用来做护腕。"</p>
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
                        <p style="margin-bottom: 15px;"><span style="color: #ef4444; font-weight: bold;">李铁：</span>"没有野兔皮毛，我怎么给你做护腕？你还是去打几只野兔吧。"</p>
                        <p style="margin-bottom: 15px;">李铁继续打铁，不再理你。</p>
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
        // 打猎第一阶段 - 寻找并击败第一只野兔
        this.showStoryModal('小树林打猎', `
            <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">小树林打猎</h3>
            <p style="margin-bottom: 15px;">你回到小树林，开始寻找野兔。</p>
            <p style="margin-bottom: 15px;">突然，一只灰色的野兔从草丛中窜了出来！</p>
            <p style="margin-bottom: 15px;">它看到你，竖起耳朵，似乎准备逃跑。</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (0/3)</p>
        `, [
            {
                text: '悄悄靠近',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('捕获第一只野兔', `
                        <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">成功捕获！</h3>
                        <p style="margin-bottom: 15px;">你悄悄靠近野兔，趁它不注意，迅速出手！</p>
                        <p style="margin-bottom: 15px;">野兔被你成功捕获，你获得了一张野兔皮毛。</p>
                        <p style="margin-bottom: 15px;">还需要再捕获2只野兔。</p>
                    `, [
                        {
                            text: '继续寻找',
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
                    this.showStoryModal('追赶', `
                        <p style="margin-bottom: 15px;">你直接追赶野兔，但它跑得太快了！</p>
                        <p style="margin-bottom: 15px;">你追了一会儿，野兔钻进了灌木丛，你失去了它的踪影。</p>
                        <p style="margin-bottom: 15px;">你决定换个地方继续寻找。</p>
                    `, [
                        {
                            text: '继续寻找',
                            callback: () => {
                                document.getElementById('story-modal').classList.add('hidden');
                                this.showQuest2HuntPhase2();
                            }
                        }
                    ]);
                }
            }
        ]);
    }

    showQuest2HuntPhase2() {
        // 打猎第二阶段 - 寻找并击败第二只野兔
        this.showStoryModal('继续打猎', `
            <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">继续打猎</h3>
            <p style="margin-bottom: 15px;">你在小树林中继续寻找野兔。</p>
            <p style="margin-bottom: 15px;">这次你发现了一对野兔正在吃草。</p>
            <p style="margin-bottom: 15px;">你决定先捕获其中一只。</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (1/3)</p>
        `, [
            {
                text: '扔石头驱赶',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('捕获第二只野兔', `
                        <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">成功捕获！</h3>
                        <p style="margin-bottom: 15px;">你捡起一块石头，精准地扔向野兔！</p>
                        <p style="margin-bottom: 15px;">野兔被石头击中，你迅速上前捕获了它。</p>
                        <p style="margin-bottom: 15px;">你又获得了一张野兔皮毛，现在已经有2张了。</p>
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
                text: '设置陷阱',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('陷阱捕获', `
                        <p style="margin-bottom: 15px;">你利用周围的树枝和藤蔓，快速设置了一个简易陷阱。</p>
                        <p style="margin-bottom: 15px;">你躲在树后等待，不久一只野兔走进了陷阱！</p>
                        <p style="margin-bottom: 15px;">你成功捕获了第二只野兔，获得了一张野兔皮毛。</p>
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
        // 打猎第三阶段 - 寻找并击败第三只野兔
        this.showStoryModal('寻找最后一只', `
            <h3 style="color: #fbbf24; text-align: center; margin-bottom: 20px;">寻找最后一只</h3>
            <p style="margin-bottom: 15px;">你已经收集了2张野兔皮毛，还需要最后一张。</p>
            <p style="margin-bottom: 15px;">你在小树林深处发现了一只体型较大的野兔。</p>
            <p style="margin-bottom: 15px;">这只野兔看起来很机警，不容易捕获。</p>
            <p style="margin-bottom: 15px; color: #fbbf24;">任务目标：收集3张野兔皮毛 (2/3)</p>
        `, [
            {
                text: '耐心等待时机',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('捕获最后一只', `
                        <h3 style="color: #22c55e; text-align: center; margin-bottom: 20px;">任务完成！</h3>
                        <p style="margin-bottom: 15px;">你耐心地等待，野兔渐渐放松了警惕。</p>
                        <p style="margin-bottom: 15px;">当它低头吃草时，你迅速出手，成功捕获了它！</p>
                        <p style="margin-bottom: 15px;">你获得了第三张野兔皮毛，任务完成！</p>
                        <p style="margin-bottom: 15px;">你带着3张野兔皮毛回到铁匠铺。</p>
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
            },
            {
                text: '快速突袭',
                callback: () => {
                    document.getElementById('story-modal').classList.add('hidden');
                    this.showStoryModal('突袭成功', `
                        <p style="margin-bottom: 15px;">你决定快速突袭，不给野兔逃跑的机会。</p>
                        <p style="margin-bottom: 15px;">你猛地扑向野兔，虽然摔了一跤，但还是成功抓住了它！</p>
                        <p style="margin-bottom: 15px;">你获得了第三张野兔皮毛，任务完成！</p>
                        <p style="margin-bottom: 15px;">你带着3张野兔皮毛回到铁匠铺。</p>
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
