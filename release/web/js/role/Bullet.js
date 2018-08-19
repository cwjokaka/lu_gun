var Bullet = (function(_super){
    function Bullet(){
        Bullet.super(this);
        this.className = "Bullet";
    }
    Laya.class(Bullet, "Bullet", _super);
    
    var _proto = Bullet.prototype;

    _proto.hitAction = function(){
         this.visible = false;
    }

    return Bullet;
})(Role);