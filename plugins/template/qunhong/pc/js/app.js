$(function(){
	/(iPhone|iPad|iPhone OS|Phone|iPod|iOS)/i.test(navigator.userAgent) && (head = document.getElementsByTagName("head"), viewport = document.createElement("meta"), viewport.name = "viewport", viewport.content = "target-densitydpi=device-dpi, width=1200px, user-scalable=no", head.length > 0 && head[head.length - 1].appendChild(viewport));
	
	toolbar();
	share();
	banner();
	showimg();
	String.prototype.trim = function () {
	    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
	// 主导航 - 上拉
	$(".nav_main li").hover(function() {
		$(this).children('.box').stop().slideDown();
	},function() {
		$(this).children('.box').stop().slideUp();
	});
	$(".ewmbtn").click(function(){
		$("body .ewmbox").show();
		layout(1);
	});
	$(".ewmbox .close").click(function(){
		$(".ewmbox").hide();
		layout(0);
	});
	//searchSubmit
    var flag=false;
    $("#searchSubmit").click(function(){
    	if(flag){
    		var _kw = $.trim($('#searchTxt').val());
	        if (_kw != '' && _kw != "请输入搜索关键词") {
	            //12为分页条数
	            window.location.href = '/searchresults/' + _kw + '/0/1/12';
	        } else {
	            alert("请输入搜索关键词");
	        }
    	}else{
    		$(this).parent().addClass("click");
    		flag=true;
    	}
    });
    $(".iproject .li_h").hover(function(){
    	$(this).addClass("hover").siblings().removeClass("hover");
    },function(){});
	$("#addFavo").click(function() {
		var fm = $("title").html();
		AddFavorite(fm, location.href, '');
	});
	$(".fix_top").click(function() {
		$("body, html").stop().animate({
			"scrollTop": 0
		});
	});
	if($(".ifood").length){
		jQuery(".ifood").slide({titCell:".hd ul",mainCell:".ifoodCon .list",autoPage:true,effect:"left",prevCell:".prev",nextCell:".next",autoPlay:true,vis:3});
	}
	 
});
//toolbar
function toolbar(){
	$('#toolbar dd').bind({
		'mouseenter': function(){
			if($(this).children('.slide').length){
				var _this = $(this).children('.slide');
				_this.stop(true, true).animate({'width': 180}, 200);
			}else if($(this).children('.pop').length){
				var _this = $(this).children('.pop');
				_this.show().animate({'right':150}, 200);
			}
		},
		'mouseleave': function(){
			if($(this).children('.slide').length){
				var _this = $(this).children('.slide');
				_this.stop(false, false).animate({'width': 0}, 200);
			}else if($(this).children('.pop').length){
				var _this = $(this).children('.pop');
				_this.hide().animate({'right': 90}, 200);
			}
		}
	});
    
	$("#gotop").click(function() {
		$("body, html").stop().animate({
				"scrollTop": 0
		});
	});
	
}
function showimg(){
	if(!$("#showimg").length){ return false; }
	$('#showimg').banqh({
		box: "#showimg",//总框架
		pic: "#bigimg",//大图框架
		pnum: "#smallimg",//小图框架
		prev_btn: ".prev",//小图左箭头
		next_btn: ".next",//小图右箭头
		autoplay: true,//是否自动播放
		interTime: 5000,//图片自动切换间隔
		delayTime: 400,//切换一张图片时间
		order: 0,//当前显示的图片（从0开始）
		picdire: true,//大图滚动方向（true为水平方向滚动）
		mindire: true,//小图滚动方向（true为水平方向滚动）
		min_picnum: 5,//小图显示数量
		pop_up: false//大图是否有弹出框
	});
}
// banner
function banner(){
	if (!$("#banner").length || $("#banner .list li").length <= 1) { return false; }
	var _this = $("#banner"),
		me = $("#banner .list"),
		tip = $("#banner .tip"),
		prev = _this.find(".prev"),
		next = _this.find(".next"),
		t, interval = 5000,
		speed = 1000,
		speed2 = 700,
		n = 0,
		N = me.children("li").length;
		me.find("li:gt(0)").hide();
	if ($("#banner .tip").length) {
		var htmlTip = "";
		for (var i = 0; i < N; i++) {
			if (i == 0) {
				htmlTip += "<span class='cur'></span>";
			} else {
				htmlTip += "<span></span>";
			}
		}
		tip.append(htmlTip);
	}
	var func = function() {
		if (n >= N - 1) {
			n = 0;
		} else {
			n++;
		}
		me.children("li").eq(n).css({
			"z-index": 2
		}).stop().fadeIn(speed).siblings("li").css({
			"z-index": 1
		}).stop().fadeOut(speed2);
		if ($("#banner .tip").length) {
			tip.children("span").eq(n).addClass("cur").siblings("span").removeClass("cur");
		}
	}
	t = setInterval(func, interval);
	next.bind("click", function(){
		clearInterval(t);
		func();
	});
	prev.bind("click", function(){
		clearInterval(t);
		n -= 2;
		n < -1 ? n = N-2 : n ;
		func();
	});
	tip.children("span").mouseover(function() {
		clearInterval(t);
		n = $(this).index() - 1;
		func();
	});
	$("#banner").hover(function(){
		console.log(1)
		clearInterval(t);
	},function(){
		console.log(2)
		t = setInterval(func, interval);
	});
}
function layout(u){
	var $obj = $('<div class="dialog-layout"></div>');
	if(u == 0){
		$('.dialog-layout').remove();
	}else{
		if(!$('.dialog-layout').length){
			$obj.appendTo('body').show();
		}
	}
}
function share(){
	window._bd_share_config={
		"common":{
			"bdSnsKey":{},
			"bdText":"",
			"bdMini":"1",
			"bdMiniList":["sqq","qzone","weixin","tsina"],
			"bdPic":"","bdStyle":"0","bdSize":"16"
		},
		"share": {},
		"slide":{"type":"slide","bdImg":"1","bdPos":"left","bdTop":"170.5"}
	};
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
}
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    } catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        } catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}