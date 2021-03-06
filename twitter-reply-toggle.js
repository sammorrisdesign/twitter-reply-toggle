// ==UserScript==
// @name       	Twitter Reply Toggle
// @namespace  	http://www.sammorr.is
// @version    	0.1
// @description	Ability to turn off replies 
// @match      	https://twitter.com/*
// @copyright  	2012+, Sam Morris
// @require    	http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==

$(document).ready(function() {

	if ($(".verified-link").length == 0) {
	
		$("<style>.hidden-tweet{display: none}</style>").appendTo("head");
		$("<small class='view-toggler'><a href='#'>All</a> / <a href='#'>No Replies</a></small>").appendTo(".content-main .content-header .header-inner h2");
		$(".view-toggler a:eq(0)").addClass('active');
		
		var flag = 0;
		
		$(".view-toggler a:eq(0)").click(function() {
			$(this).addClass('active');
			$(".view-toggler a:eq(1)").removeClass('active');
			repliesOn();
			flag = 0;
		});
		
		$(".view-toggler a:eq(1)").click(function() {
			$(this).addClass('active');
			$(".view-toggler a:eq(0)").removeClass('active');
			repliesOff();
			flag = 1;
		});
		
		$(window).scroll(function() {
			if (flag == 1) {
				repliesOff();
			}
		});
		
		function repliesOff() {
			$("li .tweet").each(function (index) {
				tweet = $(".content .js-tweet-text", this).text().substr(0,1);
				if (tweet == "@") {
					$(this).addClass("hidden-tweet");
				}
			});
		}
		
		function repliesOn() {
			$("li .tweet").each(function (index) {
				$(this).removeClass("hidden-tweet");
			});
		}
	
	};

});