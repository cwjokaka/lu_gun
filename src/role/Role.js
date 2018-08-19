var Role = (function(_super){
    function Role(){
        Role.super(this);
        this.className = "Role";
        //this.init();
    }
    Laya.class(Role, "Role", _super);

    var _proto = Role.prototype;

    _proto.init = function(_info){
        //飞机种类
        this.type = _info.type;
        //飞机阵营
        this.camp = _info.camp;
        //血量
        this.hp = _info.hp;
        //速度
        this.speedY = _info.speed;
        this.speedX = 0;
        //被击半径
        this.hitRadius = _info.hitRadius;
        this.hitRadiusX = _info.hitRadius;
        this.hitRadiusY = _info.hitRadius;
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

        //==========================
        //是否死亡
        this.isDead = false;
        //攻击力
        this.att = 1;
        //死亡积分
        this.score = 1;
        
        if(!this.body){
            //创建一个动画为飞机的身体
            this.body = new Laya.Animation();
            //把机体添加到 容器内
            this.addChild(this.body);

            this.body.on(Laya.Event.COMPLETE, this, this.onPlayComplete);
        }
        this.playAction("fly");
    }
    //======================================================================
    //角色移动
    _proto.move = function(){
        this.y += this.speedY;
        this.x += this.speedX;
    }


    //======================================================================
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