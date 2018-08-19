var WebGL = laya.webgl.WebGL;
var Sprite = Laya.Sprite;

var RoleInfos =  [
    {"type" : "enemy1", "camp" : 1, "speed" : 5, "hp" : 1, "hitRadius" : 15},
    {"type" : "enemy2", "camp" : 1, "speed" : 3, "hp" : 2, "hitRadius" : 30},
    {"type" : "enemy3", "camp" : 1, "speed" : 1, "hp" : 10, "hitRadius" : 70},
    ];
var index = 0;
 var GameMain = (function(_super){
        function GameMain(){
            GameMain.super(this);
            //子弹发射偏移位置表
            this.bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
            //关卡等级
            this.level = 1;
            //积分成绩
            this.score = 1;
            //升级等级所需的成绩数量
            this.levelUpScore = 1;
            //子弹级别
            this.bulletLevel = 0;
            //boss
            this.hasBoss = false;

            //加载图集资源
            Laya.loader.load("res/atlas/resource.atlas", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.ATLAS);
         }
         Laya.class(GameMain, "GameMain", _super);
         var _proto = GameMain.prototype;
        _proto.onLoaded = function(){
            //加载资源
            var resourceLoader = new ResourceLoader();
            resourceLoader.init();
            Laya.SoundManager.playMusic(MusicConf.BACKGROUND_MUSIC);
            Laya.SoundManager.setMusicVolume(0.7);
            //创建背景
            this.backGround = new BackGround();
            Laya.stage.addChild(this.backGround);
            //实例化角色 容器
            this.roleBox = new Sprite();
            Laya.stage.addChild(this.roleBox);
            // 子弹容器
            this.bulletsBox = new Sprite();
            Laya.stage.addChild(this.bulletsBox);
            // 敌机子弹容器
            this.enemyBulletsBox = new Sprite();
            Laya.stage.addChild(this.enemyBulletsBox);
            this.itemBox = new Sprite();
            Laya.stage.addChild(this.itemBox);
            //炸弹容器
            this.boomBox = new Sprite();
            Laya.stage.addChild(this.boomBox);
            //创建UI界面
            this.gameInfo = new GameInfo(this);
            Laya.stage.addChild(this.gameInfo);
            //创建主角
            this.hero = new Hero();
            Laya.stage.addChild(this.hero);
            //this.roleBox.addChild();


            this.restart();
        }

         _proto.onLoop = function(){

            //子弹循环
            for(var j=0; j < this.bulletsBox.numChildren; j++){
                var bullet = this.bulletsBox.getChildAt(j);
                if(!bullet.visible || bullet.y < -20){
                    //回收对象
                    if(bullet.className == "Bullet"){
                        //从舞台移除
                        bullet.removeSelf();
                        //回收前重置属性信息
                        bullet.visible = true;
                        Laya.Pool.recover("Bullet", bullet);
                    }else{
                        bullet.destroy();
                    }
                    
                }else{
                    bullet.move();
                }
            }

            // 敌机子弹循环
            for(var j=0; j < this.enemyBulletsBox.numChildren; j++){
                var bullet = this.enemyBulletsBox.getChildAt(j);
                if (bullet.getBounds().intersects(this.hero.getBounds())) {
                    this.hero.hitAction(1);
                    bullet.removeSelf();
                    continue;
                }

                if(bullet.y < 900){
                    bullet.move();
                }else{
                    //从舞台移除
                    bullet.removeSelf();
                }
            }


            //主角射击
            //获取当前时间
            var time = Laya.Browser.now();
            //如果当前时间大于下次设计时间
            if(time > this.hero.shootTime){
                //更新下次射击时间
                this.hero.shootTime = time + this.hero.shootInterval;
                //创建新子弹
                var bulletPos = this.bulletPos[this.hero.shootType - 1];
                for(var k=0; k < bulletPos.length; k++){
                    var bullet = Laya.Pool.getItemByClass("Bullet", Bullet);
                    bullet.init({"type" : "bullet1", "camp" : 0, "speed" : -4-this.hero.shootType * 5, "hp" : 1, "hitRadius" : 1, "heroType": 1});
                    index++;
                    bullet.pos(this.hero.x + bulletPos[k], this.hero.y - this.hero.hitRadius -10);
                    this.bulletsBox.addChild(bullet);
                }
                Laya.SoundManager.playSound(MusicConf.HERO_SHOOT);
                Laya.SoundManager.setSoundVolume(0.8, MusicConf.HERO_SHOOT);
            }

            if (this.hasBoss) {
                // console.log('23213123asda');
                // console.log(this.boss.x, this.boss.y);
                this.boss.dodo();
                for(var j=0; j < this.bulletsBox.numChildren; j++){
                    
                    var bullet = this.bulletsBox.getChildAt(j);

                    if (bullet.getBounds().intersects(this.boss.getBounds())) {
                        var die = this.boss.hitAction(bullet.att);
                        bullet.hitAction();
                        bullet.removeSelf();
                        if (die) {
                            this.hasBoss = false;
                            this.boss.removeSelf();
                        }
                        continue;
                    }

                    if(bullet.y > 0){
                        bullet.move();
                    }else{
                        //从舞台移除
                        bullet.removeSelf();
                    }
                }

            } 

            //敌机循环
            for(var i = this.roleBox.numChildren - 1; i > -1; i--){
                var role = this.roleBox.getChildAt(i);
                if(role){
                    role.move();
                    if(role.y > 1000 || !role.visible || this.hasBoss){
                        //从舞台移除
                        role.removeSelf();
                        //回收前重置属性信息
                        role.visible = true;
                        //回收对象
                        Laya.Pool.recover("Enemy", role);
                        break;
                    }
                }
                //碰撞检测
                if(role.hp > 0){
                    //主角
                    if(Math.abs(role.x - this.hero.x) < role.hitRadius && Math.abs(role.y - this.hero.y) < role.hitRadius){
                        role.hitAction(role.hp);//秒杀
                        this.hero.hitAction(role.att);
                    }
                    //子弹
                    if(role.hp > 0){
                        for(var j = 0; j < this.bulletsBox.numChildren; j++){
                            var bullet = this.bulletsBox.getChildAt(j);
                            var hitRadiusX = role.hitRadius;
                            var hitRadiusY = role.hitRadius;
                            // if(hitRadius < 20){
                            //     hitRadius = 20;
                            //     if(this.level > 10){
                            //         hitRadius = 40;
                            //     }
                            // }
                            if(bullet.className == "Boom"){
                                hitRadiusX = 450;
                            }
                            if(Math.abs(role.x - bullet.x) < hitRadiusX && Math.abs(role.y - bullet.y) < hitRadiusY){
                                role.hitAction(bullet.att);
                                bullet.hitAction();
                                if(role.hp < 1 && role.type == "enemy3"){
                                    var r = Math.random();
                                    var goodType = r < 0.7 ? 2 : 3;
                                    var good = Laya.Pool.getItemByClass("Item", Item);
                                    good.init({"type" : "ufo" + (goodType-1), "camp" : role.camp, "speed" : 3, "hp" : 4, "hitRadius" : 15, "itemType" : goodType});
                                    good.pos(role.x, role.y);
                                    this.itemBox.addChild(good);
                                }
                            }
                        }
                    }
                    if(role.hp <= 0){
                        //计算积分
                        this.score += role.score;
                        if(this.score > this.levelUpScore && this.level < 100){
                            this.level++;
                            this.gameInfo.showLevel(this.level);
                            this.levelUpScore += this.level * 30;
                        }

                        if(this.score >= 1){
                            this.hasBoss = true;
                            this.boss = new Boss();
                            // this.bossBox.addChild(boss);
                            Laya.stage.addChild(this.boss);

                        }
                    }
                }

            }

            //如果主角死亡清楚定时器
            if(this.hero.hp < 1 || !this.hero.visible){
                Laya.timer.clear(this, this.onLoop);
                //设置结束信息
                var deadPage = new DeadPage(this);
                //this.gameInfo.infoLabel.text = "GameOver, 分数" + this.score + "\n点击这里重新开始游戏";
                //注册点击事件， 点击重新开始游戏
                Laya.stage.addChild(deadPage);
                //this.gameInfo.infoLabel.once(Laya.Event.CLICK, this, this.restart);
            }

            //奖励物品循环
            for(var i=this.itemBox.numChildren-1; i > -1; i--){
                var item = this.itemBox.getChildAt(i);
                if((Math.abs(this.hero.x - item.x) < this.hero.hitRadius && Math.abs(this.hero.y - item.y) < this.hero.hitRadius)){
                    //回收奖励
                    item.removeSelf();
                    item.visible = true;
                    Laya.Pool.recover("Item", item);
                    //主角获得奖励
                    this.hero.handleItem(item);
                }else if(this.boss){
                    item.removeSelf();
                    item.visible = true;
                    Laya.Pool.recover("Item", item);
                }
                item.move();
            }

            //每隔30帧 创建新的敌机
            if(!this.hasBoss){
                var timeLevel = this.level > 5 ? 5 : this.level;
                if(Laya.timer.currFrame % (90 - timeLevel * 10) === 0){
                    var info = {"type" : "enemy1", "camp" : 1, "speed" : 3 + this.level * 1, "hp" : this.level * 0.3, "hitRadius" : 15};
                    this.createEnemy(info);
                }
                if(Laya.timer.currFrame % (130 - timeLevel * 10) === 0){
                    var info = {"type" : "enemy2", "camp" : 1, "speed" : 2 + this.level * 0.8, "hp" : this.level * 0.5, "hitRadius" : 30};
                    this.createEnemy(info);
                }
                // if(Laya.timer.currFrame % (210 - timeLevel * 10) === 0){
                //     var info = {"type" : "enemy3", "camp" : 1, "speed" : 1 + this.level * 0.5, "hp" : this.level * 3, "hitRadius" : 75};
                //     this.createEnemy(info);
                // }
         }

            //显示
            this.gameInfo.showHp(this.hero.hp);
            this.gameInfo.showScore(this.score);
            this.gameInfo.showBoom(this.hero.boomNum);
        }

        //  _proto.lostHp = function(role, lostHp){
        //     role.hp -= lostHp;
            
        //     //设置主角血量值
        //     if(role == this.hero){
        //         this.gameInfo.showHp(this.hero.hp);
        //     }

        //     //物品判断
        //     if(role.heroType == 2){
        //         //每吃一个子弹升级道具，子弹升级+1
        //         this.bulletLevel++;
        //         //子弹每升2级，子弹数量增加1，最大数量限制在4个
        //         //this.hero.shootType = Math.min(Math.floor(this.bulletLevel / 2) + 1,4);
        //         if(this.hero.shootType < 4){
        //             this.hero.shootType += 1;
        //         }
                
        //         //子弹级别越高，发射频率越快
        //         this.hero.shootInterval = 500 -15 * (this.bulletLevel > 20 ? 20 : this.bulletLevel);
        //         //隐藏道具
        //         role.visible = false;
        //     }else if(role.heroType == 3){//补给品
        //         if(this.hero.hp < 10){
        //             this.hero.hp++;
        //             this.gameInfo.showHp(this.hero.hp);
        //         }
        //         role.visible = false;
        //     }
        //     //扣血后 操作判断
        //     if(role.hp > 0){
        //         role.playAction("hit");
        //     }else{
        //         role.playAction("down");
        //         Laya.SoundManager.playSound(MusicConf.ENEMY3_DOWN);
        //         if(role.type == "enemy3"){
        //             var r = Math.random();
        //             var goodType = r < 0.7 ? 2 : 3;
        //             var good = Laya.Pool.getItemByClass("role", Role);
        //             good.init({"type" : "ufo" + (goodType-1), "camp" : role.camp, "speed" : 1, "hp" : 4, "hitRadius" : 15, "heroType" : goodType});
        //             good.pos(role.x, role.y);
        //             this.roleBox.addChild(good);
        //         }
        //     }
        // }

        _proto.boomAction = function(){
            if(this.hero.boomNum > 0){
                this.hero.boomNum--;
                var boom = new Boom();
                boom.init({});
                this.bulletsBox.addChild(boom);
            }
        }

         _proto.onMouseMove = function(){
            this.hero.pos(Laya.stage.mouseX, Laya.stage.mouseY);
        }

        //新建敌机
         _proto.createEnemy = function(info){
            // var r = Math.random();
            // var type = r < 0.6 ? 0 : r < 0.95 ? 1 : 2;
            //对象池 （便于创建 和 回收 对象）
            var enemy = Laya.Pool.getItemByClass("Enemy", Enemy);
            enemy.init(info);
            enemy.pos(Math.random()*400 + 20, Math.random()* -10);
            //enemy.pos(Math.random()*400 + 20, -Math.random()*200 -100);
            this.roleBox.addChild(enemy);
        }

         _proto.adviceRestart = function(){
            this.hero.visible = true;
            this.hero.hp = 5;
            this.gameInfo.showHp(this.hero.hp);
            this.resume();
         }

        //重新开始游戏
         _proto.restart = function(){
            console.log("重新开始游戏");
            this.score = 0;
            this.level = 1;
            this.levelUpScore = 1;
            this.bulletLevel = 1;
            this.gameInfo.reset();
            //初始化主角
            this.hero.init({"type" : "hero", "camp" : 0, "speed" : 0, "hp" : 2, "hitRadius" : 30});
            this.hero.pos(220, 420);
            this.hero.shootType = 1;
            this.hero.shootInterval = 500;
            this.hero.visible = true;

            //移除role
            for(var i=this.roleBox.numChildren - 1; i > 0; i--){
                var role = this.roleBox.getChildAt(i);
                if(role != this.hero){
                    console.log("移除了一个角色");
                    role.removeSelf();
                    role.visible = true;
                    Laya.Pool.recover(role.className, role);
                }
            }
            //恢复游戏
            this.resume();
        }

        //暂停
         _proto.pause = function(){
            //停止游戏主循环
            Laya.timer.clear(this, this.onLoop);
            //移除舞台的鼠标移动事件
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        }
        //恢复游戏
         _proto.resume = function(){
            //添加鼠标移动触发事件
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            //场景刷新 渲染
            Laya.timer.frameLoop(1, this, this.onLoop);
        }
        return GameMain;
})(Laya.Sprite);

