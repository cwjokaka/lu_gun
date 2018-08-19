var Hero = (function(_super){
    function Hero(){
        Hero.super(this);
        this.className = "Hero";
        this.bulletLevel = 1;
        this.boomNum = 10;
    }
    Laya.class(Hero, "Hero", _super);

    var _proto = Hero.prototype;

    // _proto.init = function(_info){
    //     this.bulletLevel = 1;
    //     _super.prototype.init.call(this, _info);
    // }

    _proto.hitAction = function(loseHp, roleType){
        this.hp -= loseHp;
        if(this.hp < 1){
            this.playAction("down");
            this.visible = false;
        }else{
            this.playAction("hit");
        }
         
    }

    _proto.handleItem = function(item){
        if(item.itemType == 2){
            this.bulletLevel++;
            //this.hero.shootType = Math.min(Math.floor(this.bulletLevel / 2) + 1,4);
            if(this.shootType < 4){
                this.shootType += 1;
            }
            //子弹级别越高，发射频率越快
            this.shootInterval = 500 -15 * (this.bulletLevel > 20 ? 20 : this.bulletLevel);
            //隐藏道具
        }else if(item.itemType == 3){//补给品
            if(this.hp < 10){
                this.hp++;
            }
        }
    }

    return Hero;
})(Role);