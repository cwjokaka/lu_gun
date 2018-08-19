var Boom = (function(_super){
    function Boom(){
        Boom.super(this);
        this.className = "Boom";
    }
    Laya.class(Boom, "Boom", _super);

    var _proto = Boom.prototype;

    _proto.init = function(_info){
        _super.prototype.init.call(this, _info);
        this.att = 10000;
        this.speedY = -6;
        this.graphics.drawRect(0, 0, 400, 20, 'blue', 'yellow', 3);
        this.pos(0, 825);
    }

    _proto.hitAction = function(loseHp){
        this.hp -= loseHp;
        if(this.hp < 0){
            this.visible = false;
        }
    }

    return Boom;
})(Role);