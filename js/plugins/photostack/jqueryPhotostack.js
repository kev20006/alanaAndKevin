/**
* jquery.Photostack.js v0.1.2 - Simple Photostack plugin for jQuery
* https://github.com/steelydylan/jquery.Photostack.js
* MIT Licensed
* Copyright (C) 2015 steelydylan http://horicdesign.com
*/
(function($){
	var getRand = function (a, b) {
        return ~~(Math.random() * (b - a + 1)) + a;
    }
    var getPrefix = function(){
    	var userAgent = window.navigator.userAgent.toLowerCase();
			console.log(userAgent);
    	if(userAgent.indexOf("chrome") != -1 || userAgent.indexOf("safari") != -1){
				console.log("using webkit");
    		return "-webkit-"
    	}else if(userAgent.indexOf("firefox") != -1){
				console.log("using webkit");
				return "-moz-";

    	}else if(userAgent.indexOf("opera") != -1){
				console.log("using webkit");
				return "-o-";
    	}else{
				console.log("else condition using webkit");
    		return "-webkit-";
    	}
    }
    var def = {
    	top:-40,
    	left:40,
    	degFrom:-15,
    	degTo:15,
    	animation:"move",
    	animationSpeed:500,
    	timespan:0,
    	auto:false,
    	preventClick:false
    }
	$.prototype.Photostack = function(opt){
		opt = $.extend(def,opt);
		var $this = $(this);
		var $children = $this.children();
		var prefix = getPrefix();
		var zindex = 0;
		var width = 300;
		var height = 300;

		$this.addClass("js-photostack");
		$children.each(function(){
			var $child = $(this);
			var rand = getRand(opt.degFrom,opt.degTo);
			var rotate = "rotate("+rand+"deg)";
			$child.css(prefix+"transform",rotate);
			$child.css("transform",rotate);
			$child.css("z-index",zindex);
			zindex++;
			if($child.width() > width){
				width = $child.width();
			}
			if($child.height() > height){
				height = $child.height();
			}
		});
		$this.width(width);
		$this.height(height);
		var finished = true;
		$this.click(function(e){
			if(e.originalEvent && opt.preventClick){
				return;
			}
			if(!finished){
				return;
			}
			finished = false;
			var max = 0;
			$children.each(function(){
				var current = parseInt($(this).css("z-index"));
				current++;
				$(this).css("z-index",current);
				if(current > max){
					max = current;
				}
			});
			var $child = $children.filter(function(){
				return max == $(this).css("z-index");
			});
			if(opt.animation == "move"){
				var animationStart = {top:opt.top,left:opt.left};
				var animationEnd = {top:0,left:0};
			}else if(opt.animation = "fade"){
				var animationStart = {opacity:0};
				var animationEnd = {opacity:1};
			}
			$child
			.animate(animationStart,opt.animationSpeed)
			.queue(function(next){
				$child.css("z-index",0);
				next();
			})
			.animate(animationEnd,opt.animationSpeed)
			.queue(function(next){
				finished = true;
				next();
			});
		});
		if(opt.auto){
			setInterval(function(){$this.click()},opt.timespan+opt.animationSpeed*2);
		}
	};
})(jQuery);
