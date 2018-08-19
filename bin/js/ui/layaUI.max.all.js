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
var TestPageUI=(function(_super){
		function TestPageUI(){
			
		    this.btn=null;
		    this.clip=null;
		    this.combobox=null;
		    this.tab=null;
		    this.list=null;
		    this.btn2=null;
		    this.check=null;
		    this.radio=null;
		    this.box=null;

			TestPageUI.__super.call(this);
		}

		CLASS$(TestPageUI,'ui.test.TestPageUI',_super);
		var __proto__=TestPageUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(TestPageUI.uiView);

		}

		TestPageUI.uiView={"type":"View","child":[{"props":{"x":0,"y":0,"skin":"comp/bg.png","sizeGrid":"30,4,4,4","width":600,"height":400},"type":"Image"},{"props":{"x":41,"y":56,"skin":"comp/button.png","label":"点我赋值","width":150,"height":37,"sizeGrid":"4,4,4,4","var":"btn"},"type":"Button"},{"props":{"x":401,"y":56,"skin":"comp/clip_num.png","clipX":10,"var":"clip"},"type":"Clip"},{"props":{"x":220,"y":143,"skin":"comp/combobox.png","labels":"select1,select2,selecte3","selectedIndex":1,"sizeGrid":"4,20,4,4","width":200,"height":23,"var":"combobox"},"type":"ComboBox"},{"props":{"x":220,"y":96,"skin":"comp/tab.png","labels":"tab1,tab2,tab3","var":"tab"},"type":"Tab"},{"props":{"x":259,"y":223,"skin":"comp/vscroll.png","height":150},"type":"VScrollBar"},{"props":{"x":224,"y":223,"skin":"comp/vslider.png","height":150},"type":"VSlider"},{"type":"List","child":[{"type":"Box","child":[{"props":{"skin":"comp/label.png","text":"this is a list","x":26,"y":5,"width":78,"height":20,"fontSize":14,"name":"label"},"type":"Label"},{"props":{"x":0,"y":2,"skin":"comp/clip_num.png","clipX":10,"name":"clip"},"type":"Clip"}],"props":{"name":"render","x":0,"y":0,"width":112,"height":30}}],"props":{"x":452,"y":68,"width":128,"height":299,"vScrollBarSkin":"comp/vscroll.png","repeatX":1,"var":"list"}},{"props":{"x":563,"y":4,"skin":"comp/btn_close.png","name":"close"},"type":"Button"},{"props":{"x":41,"y":112,"skin":"comp/button.png","label":"点我赋值","width":150,"height":66,"sizeGrid":"4,4,4,4","labelSize":30,"labelBold":true,"var":"btn2"},"type":"Button"},{"props":{"x":220,"y":188,"skin":"comp/checkbox.png","label":"checkBox1","var":"check"},"type":"CheckBox"},{"props":{"x":220,"y":61,"skin":"comp/radiogroup.png","labels":"radio1,radio2,radio3","var":"radio"},"type":"RadioGroup"},{"type":"Panel","child":[{"props":{"skin":"comp/image.png"},"type":"Image"}],"props":{"x":299,"y":223,"width":127,"height":150,"vScrollBarSkin":"comp/vscroll.png"}},{"props":{"x":326,"y":188,"skin":"comp/checkbox.png","label":"checkBox2","labelColors":"#ff0000"},"type":"CheckBox"},{"type":"Box","child":[{"props":{"y":70,"skin":"comp/progress.png","width":150,"height":14,"sizeGrid":"4,4,4,4","name":"progress"},"type":"ProgressBar"},{"props":{"y":103,"skin":"comp/label.png","text":"This is a Label","width":137,"height":26,"fontSize":20,"name":"label"},"type":"Label"},{"props":{"y":148,"skin":"comp/textinput.png","text":"textinput","width":150,"name":"input"},"type":"TextInput"},{"props":{"skin":"comp/hslider.png","width":150,"name":"slider"},"type":"HSlider"},{"props":{"y":34,"skin":"comp/hscroll.png","width":150,"name":"scroll"},"type":"HScrollBar"}],"props":{"x":41,"y":197,"var":"box"}}],"props":{"width":600,"height":400}};
		return TestPageUI;
	})(View);