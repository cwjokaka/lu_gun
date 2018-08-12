var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var DeadPageUI=(function(_super){
		function DeadPageUI(){
			
		    this.adviceBtn=null;
		    this.restartBtn=null;

			DeadPageUI.__super.call(this);
		}

		CLASS$(DeadPageUI,'ui.DeadPageUI',_super);
		var __proto__=DeadPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(DeadPageUI.uiView);

		}

		DeadPageUI.uiView={"type":"View","props":{"width":400,"height":825},"child":[{"type":"Button","props":{"y":343,"x":116,"width":152,"var":"adviceBtn","stateNum":1,"skin":"resource/btn_home.png","label":"广告继续","height":45}},{"type":"Button","props":{"y":425,"x":117,"width":152,"var":"restartBtn","stateNum":1,"skin":"resource/btn_home.png","label":"重新开始","height":45}}]};
		return DeadPageUI;
	})(View);
var GameInfoUI=(function(_super){
		function GameInfoUI(){
			
		    this.pauseBtn=null;
		    this.hpLabel=null;
		    this.levelLabel=null;
		    this.scoreLabel=null;
		    this.infoLabel=null;

			GameInfoUI.__super.call(this);
		}

		CLASS$(GameInfoUI,'ui.GameInfoUI',_super);
		var __proto__=GameInfoUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameInfoUI.uiView);

		}

		GameInfoUI.uiView={"type":"View","props":{"width":400,"height":825},"child":[{"type":"Button","props":{"y":23,"x":324,"var":"pauseBtn","stateNum":1,"skin":"resource/btn_pause.png"}},{"type":"Label","props":{"y":29,"x":14,"width":78,"var":"hpLabel","text":"HP:10","height":24,"fontSize":22,"color":"#22e82a","align":"center"}},{"type":"Label","props":{"y":27,"x":104,"width":80,"var":"levelLabel","text":"level:1","height":24,"fontSize":22,"color":"#0833dd","align":"center"}},{"type":"Label","props":{"y":28,"x":200,"wordWrap":true,"width":111,"var":"scoreLabel","text":"score:1","height":24,"fontSize":22,"color":"#eabe0f","align":"center"}},{"type":"Label","props":{"y":341,"x":-4,"wordWrap":true,"width":399,"var":"infoLabel","height":84,"fontSize":24,"color":"#72757d","align":"center"}}]};
		return GameInfoUI;
	})(View);
var HomePageUI=(function(_super){
		function HomePageUI(){
			
		    this.titleLabel=null;
		    this.startLabel=null;

			HomePageUI.__super.call(this);
		}

		CLASS$(HomePageUI,'ui.HomePageUI',_super);
		var __proto__=HomePageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(HomePageUI.uiView);

		}

		HomePageUI.uiView={"type":"View","props":{"width":400,"height":825},"child":[{"type":"Label","props":{"y":96,"x":82,"var":"titleLabel","text":"小游戏demo","fontSize":45,"color":"#352b69"}},{"type":"Label","props":{"y":371,"x":120,"var":"startLabel","text":"开 始 游 戏","fontSize":36,"color":"#27af2d"}}]};
		return HomePageUI;
	})(View);