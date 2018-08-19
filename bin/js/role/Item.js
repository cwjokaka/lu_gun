var Item = (function(_super){
    function Item(){
        Item.super(this);
        this.className = "Item";
    }
    Laya.class(Item, "Item", _super);

    var _proto = Item.prototype;

    _proto.init = function(_info){
        this.itemType = _info.itemType;
        _super.prototype.init.call(this, _info);
    }

    _proto.hitAction = function(loseHp){
        this.hp -= loseHp;
        if(this.hp < 0){
            this.visible = false;
        }
    }

    return Item;
})(Role);