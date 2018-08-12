var Role = (function(_super){
    function Role(){
        Role.super(this);
        //this.init();
    }
    //标记是否已缓存图片资源（类似类的静态变量）
    Role.cached = false;
    Laya.class(Role, "Role", _super);

    var _proto = Role.prototype;

    _proto.init = function(_info){
        this.roleId = "";
        //飞机种类
        this.type = _info.type;
        //飞机阵营
        this.camp = _info.camp;
        //血量
        this.hp = _info.hp;
        //速度
        this.speed = _info.speed;
        //被击半径
        this.hitRadius = _info.hitRadius;
        //0:普通 1:子弹 2:炸药 3:补给品
        this.heroType = _info.heroType;

        //射击类型
        this.shootType = 0;
        //射击间隔
        this.shootInterval = 200;
        //下次射击时间
        this.shootTime = Laya.Browser.now() + 1000;
        //当前的动作
        this.action = "";
        //是否是子弹
        this.isBullet = false;

        
        if(!Role.cached){
            Role.cached = true;
            //缓存飞机的动作
            Laya.Animation.createFrames(["resource/hero_fly1.png","resource/hero_fly2.png"],"hero_fly");
            //缓存集中爆炸动作
            Laya.Animation.createFrames(["resource/hero_down1.png","resource/hero_down2.png"
            ,"resource/hero_down3.png","resource/hero_down4.png"],"hero_down");

            //缓存敌机1飞行动作
            Laya.Animation.createFrames(["resource/enemy1_fly1.png"],"enemy1_fly");
            //缓存敌机1爆炸动作
            Laya.Animation.createFrames(["resource/enemy1_down1.png","resource/enemy1_down2.png","resource/enemy1_down3.png"
            ,"resource/enemy1_down4.png"],"enemy1_down");

            //缓存敌机2飞行动作
            Laya.Animation.createFrames(["resource/enemy2_fly1.png"],"enemy2_fly");
            //缓存敌机2爆炸动作
            Laya.Animation.createFrames(["resource/enemy2_down1.png","resource/enemy2_down2.png","resource/enemy2_down3.png"
            ,"resource/enemy2_down4.png"],"enemy2_down");
            //缓存敌机2碰撞动作
            Laya.Animation.createFrames(["resource/enemy2_hit.png"],"enemy2_hit");

            //缓存敌机3飞行动作
            Laya.Animation.createFrames(["resource/enemy3_fly1.png","resource/enemy3_fly2.png"],"enemy3_fly");
            //缓存敌机3爆炸动作
            Laya.Animation.createFrames(["resource/enemy3_down1.png","resource/enemy3_down2.png","resource/enemy3_down3.png"
            ,"resource/enemy3_down4.png","resource/enemy3_down5.png","resource/enemy3_down6.png"],"enemy3_down");
            //缓存敌机3碰撞动作
            Laya.Animation.createFrames(["resource/enemy3_hit.png"],"enemy3_hit");

            //缓存子弹动画
            Laya.Animation.createFrames(["resource/bullet1.png"],"bullet1_fly");

            //缓存强化包
            Laya.Animation.createFrames(["resource/ufo1.png"],"ufo1_fly");
            //缓存医疗包
            Laya.Animation.createFrames(["resource/ufo2.png"],"ufo2_fly");
        }
        if(!this.body){
            //创建一个动画为飞机的身体
            this.body = new Laya.Animation();
            //把机体添加到 容器内
            this.addChild(this.body);

            this.body.on(Laya.Event.COMPLETE, this, this.onPlayComplete);
        }
        this.playAction("fly");
    }
     _proto.onPlayComplete = function(){
         //如果是击毁动画 则隐藏对象
         if(this.action === "down"){
            //停止动画播放
            this.body.stop();
            //隐藏显示
            this.visible = false;
         }else if(this.action === "hit"){
            this.playAction("fly");
         }
     }
    _proto.playAction = function(action){
         this.action = action;
        //根据类型播放动画
        if(action == 'hit' && ("ufo1" == this.type || 'enemy1' == this.type || 'ufo2' == this.type)){
            action = "fly"
        }
        
        this.body.play(0, true, this.type + "_" + action);
        //获取动画大小区域t
        this.bound = this.body.getBounds();
        //设置机身居中
        this.body.pos(-this.bound.width/2, -this.bound.height/2);
    }

    return Role;
}
)(Laya.Sprite);