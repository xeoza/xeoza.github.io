// var Z = {
// 	ios: (navigator.userAgent.match(/like Mac OS X/i)) ? true : false,
// 	touch: ('ontouchstart' in document.documentElement) ? true : false,
// 	oldie: (!$.support.opacity) ? true : false,
// 	canvas: (document.createElement('canvas').getContext) ? true : false,
// 	email: /^^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
// 	url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
// };
// if (Z.ios) $('html').addClass('ios');
// if (Z.touch) $('html').addClass('touch');
// if (Z.oldie) $('html').addClass('oldie');
//
// function scrollBodyTo(top) {
// 	var scrollWorking = true;
// 	var top = top || 0;
// 	var term = 700;
// 	$('html'+(!$.browser?',body':'')).stop().animate({ scrollTop:top-50 },term,'easeOutExpo',function(){
// 		scrollWorking = false;
// 		$(window).unbind('mousewheel.scrollto');
// 	});
// 	$(window).bind('mousewheel.scrollto',function(event,delta){
// 		if (scrollWorking) {
// 			$('html'+(!$.browser?',body':'')).stop();
// 			scrollWorking = false;
// 			$(window).unbind('mousewheel.scrollto');
// 		};
// 	});
// };
//
//
// function setCenter(item) {
// 	windowHeight = $(window).height();
// 	currentOffset = $(document).scrollTop();
// 	currentOffset = currentOffset + parseInt((windowHeight - item.outerHeight()) / 2);
// 	currentOffset = (currentOffset < $(document).scrollTop()+40) ? $(document).scrollTop()+40 : currentOffset;
// 	pLeft = parseInt(($(window).width() - item.outerWidth()) / 2);
// 	currentOffset -= 70;
// 	item.css({top:currentOffset,left:pLeft});
// }
//
// // типа запрещаю прокрутку когда открыт попап, ибо нефиг
//
// var keys = [37, 38, 39, 40];
//
// function preventDefault(e) {
//     e = e || window.event;
//     if (e.preventDefault)
//         e.preventDefault();
//     e.returnValue = false;
// }
//
// function keydown(e) {
//     for (var i = keys.length; i--;) {
//         if (e.keyCode === keys[i]) {
//             // preventDefault(e);
//             return;
//         }
//     }
// }
//
// function wheel(e) {
//     preventDefault(e);
// }
//
// function disable_scroll() {
//     if (window.addEventListener) {
//         window.addEventListener('DOMMouseScroll', wheel, false);
//     }
//     window.onmousewheel = document.onmousewheel = wheel;
//     document.onkeydown = keydown;
// }
//
// function enable_scroll() {
//     if (window.removeEventListener) {
//         window.removeEventListener('DOMMouseScroll', wheel, false);
//     }
//     window.onmousewheel = document.onmousewheel = document.onkeydown = null;
// }
//
//
//
//
// function showPopup(popup,isFast) {
// 	popup = $('#'+popup);
// 	setCenter(popup);
// 	//createBlind(popup,isFast);
// 	if (!isFast) {
// 		popup.css({opacity:0}).show().animate({opacity:1},300);
// 	} else {
// 		popup.show();
// 	};
// 	popup.find('.js-popup-close').unbind('click').click(function(e){
// 		e.preventDefault();
//         enable_scroll();
// 		closePopup(popup);
// 	});
// 	$(".b-popup-frame").click(function(e){
// 		if (e.offsetX > this.offsetWidth) {
// 			popup.find('.js-popup-close').trigger('click');
// 		}
// 	});
// 	$(document).on('click', function(e){
// 		if (e.target.className == "b-popup-frame"){
// 			popup.find('.js-popup-close').trigger('click');
// 		}
// 	});
// 	$(document).bind('keydown.popup',function(e){
// 		if (e.which == 27) {
// 			popup.find('.js-popup-close').trigger('click');
// 		};
// 	});
//
//     disable_scroll();
//
//
// 	$('.blind').height($(document).height());
// 	$(window).bind('resize.popup',function(){
//         setCenter(popup);
// 	})
// };
// function createBlind(popup,isFast) {
// 	var blind = $('<div class="blind"></div>');
// 	if (!isFast) {
// 		blind.css({opacity:0}).height($(document).height()).appendTo('body').animate({opacity:0.6},200);
// 	} else {
// 		blind.height($(document).height()).appendTo('body');
// 	};
// 	blind.click(function(){
// 		popup.find('.rtr_popup__close').trigger('click');
// 		//return false;
// 	});
// };
// function closePopup(popup) {
// 	$('.blind').remove();
// 	popup.hide();
// 	$(document).unbind('keydown.popup');
// 	$(window).unbind('resize.popup');
// 	return false;
// };
//
// $.fn.digitsOnly = function(){ // позволяет вводить в инпут только цифры
// 	$(this).keypress(function(event) {
// 		var controlKeys = [8, 9, 13, 35, 36, 37, 39];
// 		var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
// 		if (!event.which || (48 <= event.which && event.which <= 57) || (48 == event.which && $(this).attr("value")) || isControlKey) {
// 			return;
// 		} else {
// 			event.preventDefault();
// 		};
// 	});
// };
//
// function dig3cut(value) {
// 	value = value.toString();
// 	var result = [];
// 	while (value.length > 3) {
// 		result.unshift(value.substring(value.length-3,value.length));
// 		value = value.substr(0,value.length-3);
// 	};
// 	result.unshift(value);
// 	return result.toString().replace(/,/gi,' ');
// };
//
// $.fn.checkbox = function() {
// 	$(this).each(function(i){
// 		var checkboxLabel = $(this);
// 		checkboxLabel.find('i').remove();
// 		checkboxLabel.append('<i />');
// 		if (checkboxLabel.find('input').is(':checked')) {
// 			checkboxLabel.addClass('checkbox-checked');
// 			checkboxLabel.find('input').attr('checked','checked');
// 		} else {
// 			checkboxLabel.removeClass('checkbox-checked');
// 			checkboxLabel.find('input').removeAttr('checked');
// 		};
// 		/*if (checkboxLabel.hasClass('disabled')) {
// 			checkboxLabel.find('input').attr('disabled','disabled');
// 		};*/
// 		checkboxLabel.find('input').unbind('click').click(function(){
// 			var checkboxLabel = $(this).parent();
// 			if (!checkboxLabel.hasClass('disabled')) {
// 				if ($(this).is(':checked')) {
// 					checkboxLabel.addClass('checkbox-checked');
// 					checkboxLabel.find('input').attr('checked','checked');
// 				} else {
// 					checkboxLabel.removeClass('checkbox-checked');
// 					checkboxLabel.find('input').removeAttr('checked');
// 				};
// 			};
// 		});
// 		if (checkboxLabel.find('input').is(':disabled')) {
// 			checkboxLabel.addClass('checkbox-disabled');
// 		}
// 	});
// };
//
// $.fn.radio = function() {
//     $(this).each(function(){
//         $(this).append('<i></i>');
//         if ($(this).find('input').is(':checked')) {
//             $(this).addClass('radio-checked');
//         } else {
//             $(this).removeClass('radio-checked');
//         };
//         $(this).click(function(){
//             if ($(this).find('input').is(':checked')) {
//                 $(this).addClass('radio-checked');
//                 var name = $(this).find('input').attr('name');
//                 $('input[name="'+name+'"]').not($(this).find('input')).parent().removeClass('radio-checked');
//                 if ($(this).hasClass('friend')) {
//                     $(this).siblings('.friend_name').css('display', 'block');
//                 } else {
//                     $(this).siblings('.friend_name').css('display', 'none');
//                 }
//             } else {
//                 //$(this).find('i').removeClass('checked');
//             };
//         });
//     });
// };
//
// $.fn.tabs = function(){
// 	$(this).each(function(){
// 		var t = $(this),
// 			s = t.find('.tabs-switcher');
//
// 		s.find('span').unbind('.tabs');
// 		s.find('span')
// 			.bind('click.tabs',function(){
// 				var a = $(this);
// 				if (!a.hasClass('active')) {
// 					s.find('.active').removeClass('active');
// 					a.addClass('active');
// 					t.find('.tab-item').hide();
// 					t.find('.tab-item-'+a.attr('data-rel')).show();
// 				};
// 				return false;
// 			})
// 			.bind('mousedown.tabs',function(){
// 				var a = $(this);
// 				a.addClass('hovered');
// 				$(document).bind('mouseup.tabs',function(){
// 					a.removeClass('hovered');
// 					$(document).unbind('mouseup.tabs')
// 				});
// 			});
//
//
// 		s.find('span:not(.active)').each(function(){
// 			t.find('.tab-item-'+$(this).attr('data-rel')).hide();
// 		});
// 	});
// };
//
// $.fn.switcher = function(){
// 	$(this).each(function(){
// 		var s = $(this);
//
// 		s.find('span').unbind('click').click(function(){
// 			var a = $(this);
// 			if (!a.hasClass('active')) {
// 				s.find('.active').removeClass('active');
// 				a.addClass('active');
// 			};
// 			return false;
// 		});
// 	});
// };
//
// function inflect(i,a,b,c) {
// 	i = parseInt(i);
// 	var r;
// 	if (i>20) {
// 		i = i.toString();
// 		i = parseInt(i.slice(i.length-1,i.length));
// 		r = inflect(i,a,b,c);
// 	} else {
// 		if (i == 1) {
// 			r = a;
// 		} else if (i > 1 && i <5) {
// 			r = b;
// 		} else {
// 			r = c;
// 		};
// 	};
// 	return r;
// };
//
// /*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
//  * Licensed under the MIT License (LICENSE.txt).
//  *
//  * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
//  * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
//  * Thanks to: Seamus Leahy for adding deltaX and deltaY
//  *
//  * Version: 3.0.6
//  *
//  * Requires: 1.2.2+
//  */
//
// (function($){var types=['DOMMouseScroll','mousewheel'];if($.event.fixHooks){for(var i=types.length;i;){$.event.fixHooks[types[--i]]=$.event.mouseHooks}}$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=types.length;i;){this.addEventListener(types[--i],handler,false)}}else{this.onmousewheel=handler}},teardown:function(){if(this.removeEventListener){for(var i=types.length;i;){this.removeEventListener(types[--i],handler,false)}}else{this.onmousewheel=null}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,returnValue=true,deltaX=0,deltaY=0;event=$.event.fix(orgEvent);event.type="mousewheel";if(orgEvent.wheelDelta){delta=orgEvent.wheelDelta/120}if(orgEvent.detail){delta=-orgEvent.detail/3}deltaY=delta;if(orgEvent.axis!==undefined&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS){deltaY=0;deltaX=-1*delta}if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY/120}if(orgEvent.wheelDeltaX!==undefined){deltaX=-1*orgEvent.wheelDeltaX/120}args.unshift(event,delta,deltaX,deltaY);return($.event.dispatch||$.event.handle).apply(this,args)}})(jQuery);
//
//
// /*
//  * jQuery Hotkeys Plugin
//  * Copyright 2010, John Resig
//  * Dual licensed under the MIT or GPL Version 2 licenses.
//  *
//  * Based upon the plugin by Tzury Bar Yochay:
//  * http://github.com/tzuryby/hotkeys
//  *
//  * Original idea by:
//  * Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
// // */
// // (function(jQuery){jQuery.hotkeys={version:"0.8+",specialKeys:{8:"backspace",9:"tab",13:"return",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"del",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",144:"numlock",145:"scroll",188:",",190:".",191:"/",224:"meta"},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":": ","'":"\"",",":"<",".":">","/":"?","\\":"|"}};function keyHandler(handleObj){var origHandler=handleObj.handler,keys=(handleObj.namespace||"").toLowerCase().split(" ");keys=jQuery.map(keys,function(key){return key.split(".")});if(keys.length===1&&(keys[0]===""||keys[0]==="autocomplete")){return}handleObj.handler=function(event){if(this!==event.target&&(/textarea|select/i.test(event.target.nodeName)||event.target.type==="text"||$(event.target).prop('contenteditable')=='true')){return}var special=event.type!=="keypress"&&jQuery.hotkeys.specialKeys[event.which],character=String.fromCharCode(event.which).toLowerCase(),key,modif="",possible={};if(event.altKey&&special!=="alt"){modif+="alt_"}if(event.ctrlKey&&special!=="ctrl"){modif+="ctrl_"}if(event.metaKey&&!event.ctrlKey&&special!=="meta"){modif+="meta_"}if(event.shiftKey&&special!=="shift"){modif+="shift_"}if(special){possible[modif+special]=true}else{possible[modif+character]=true;possible[modif+jQuery.hotkeys.shiftNums[character]]=true;if(modif==="shift_"){possible[jQuery.hotkeys.shiftNums[character]]=true}}for(var i=0,l=keys.length;i<l;i++){if(possible[keys[i]]){return origHandler.apply(this,arguments)}}}}jQuery.each(["keydown","keyup","keypress"],function(){jQuery.event.special[this]={add:keyHandler}})})(jQuery);
//
// Date.dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
// Date.abbrDayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
// Date.monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
// Date.monthNamesInflectioned = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
// Date.abbrMonthNames = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
//
// Date.firstDayOfWeek = 1;
// Date.format = 'dd.mm.yyyy';
// //Date.format = 'dd mmm. yyyy';
// $.dpText = {
// 	TEXT_PREV_YEAR		:	'Предыдущий год',
// 	TEXT_PREV_MONTH		:	'Предыдущий месяц',
// 	TEXT_NEXT_YEAR		:	'Следующий год',
// 	TEXT_NEXT_MONTH		:	'Следующий месяц',
// 	TEXT_CLOSE			:	'Закрыть',
// 	TEXT_CHOOSE_DATE	:	'Выберите дату',
// 	HEADER_FORMAT		:	'mmmm yyyy'
// };
//
// $.fn.required = function(){
// 	$(this).each(function(){
// 		var f = $(this);
// 		f.find('.required').each(function(){
// 			var input = $(this);
// 			if (this.className.indexOf("jq-selectbox") > -1 || this.className.indexOf("jq-radio") > -1){
// 				return
// 			}
// 			if (input.attr('type') == ('checkbox' || 'radio')) {
// 				input.click(checkAll);
// 			} else {
// 				input.keyup(checkAll).change(checkAll);
// 				if (input.attr('data-error')) {
// 					input.wrap('<span class="error-wrapper"/>');
// 					input.parent().append('<span class="error-message">'+input.attr('data-error')+'</span>');
// 					input.focusout(function(){
// 						var v = check.apply(this),
// 							input = $(this);
// 						input.parent().removeClass('active');
// 						if (!v) {
// 							input.parent().addClass('active');
// 						};
// 					});
// 				};
// 			};
// 		});
//
// 		checkAll();
// 		function checkAll() {
// 			var valid = true;
// 			f.find('.required').each(function(){
// 				if (this.className.indexOf("jq-selectbox") > -1 || this.className.indexOf("jq-radio") > -1){
// 					return
// 				}
// 				var v = check.apply(this);
// 				if (v) {
// 					 //console.log(this.outerHTML+" === TRUE ===");
// 				} else {
// 					 //console.log(this.outerHTML+" === FALSE ===");
// 					valid = false;
// 				};
// 			});
//
// 			if (valid) {
// 				f.find('button[type="submit"]').removeClass('disabled').removeAttr('disabled');
// 			} else {
// 				f.find('button[type="submit"]').addClass('disabled').attr('disabled','disabled');
// 			};
// 		};
// 		function check() {
// 			var input = $(this),
// 				min = input.attr('minlength') || 1,
// 				max = input.attr('maxlength') || 65535,
// 				valid = true;
//
// 			if (input.attr('type') == ('checkbox' || 'radio') && input.attr('data-group')) {
// 				var groupValid = false;
// 				f.find('input[data-group="'+input.attr('data-group')+'"]').each(function(){
// 					if ($(this).is(':checked')) groupValid = true;
// 				});
// 				if (!groupValid) valid = false;
// 			} else if (input.attr('type') == 'checkbox' && !input.is(':checked')) {
// 				valid = false;
// 			} else if (input.attr('type') == 'radio') {
// 				(function(){
// 					var rv = false;
// 					f.find('input[type="radio"][name="'+input.attr('name')+'"]').each(function(){
// 						if ($(this).is(':checked')) rv = true;
// 					});
// 					if (!rv) valid = false;
// 				})();
// 			} else if (input.hasClass('selectInput')) {
// 				if (!input.find('option').val() && !input.find('input').val())	valid = false;
// 			} else if (input.hasClass('textInput-placeholder') || input.val().length < min || input.val().length > max) {
// 				valid = false;
// 			} else if (input.hasClass('required-email') && !Z.email.test(input.val())) {
// 				valid = false;
// 			} else if (input.hasClass('required-url') && !Z.url.test(input.val())) {
// 				valid = false;
// 			} else if (input.hasClass('required-word') && input.val() == parseInt(input.val())) {
// 				valid = false;
// 			} else if (input.hasClass('required-name') && input.val().length < min || input.val() == "Ваше имя") {
// 				valid = false;
// 			}
//
// 			if (input.hasClass('required-password')) {
// 				var iw = input.parents('.input');
//
// 				iw.find('.input-message').remove();
// 				if (input.val().length) {
// 					if (pass(input.val())) {
// 						iw.append('<span class="input-message input-message-ok"><i></i>Надёжный пароль</span>');
// 					} else {
// 						iw.append('<span class="input-message input-message-bad"><i></i>Ненадёжный пароль</span>');
// 					};
// 				};
// 			};
//
// 			if (input.hasClass('required-password2')) {
// 				var iw = input.parents('.input');
//
// 				iw.find('.input-message').remove();
// 				if (input.val().length) {
// 					if (input.val() == f.find('.required-password').val()) {
// 						iw.append('<span class="input-message input-message-ok"><i></i>Пароли совпадают</span>');
// 					} else {
// 						iw.append('<span class="input-message input-message-bad"><i></i>Пароли не совпадают</span>');
// 						valid = false;
// 					};
// 				};
// 			};
//
// 			function pass(pw){
// 				if(
// 					( /[a-z]/.test(pw) && /[A-Z]/.test(pw)? 1 : 0 ) +
// 					( /\d/.test(pw)? 1 : 0 ) +
// 					( /[!-\/:-@[-`{-~]/.test(pw)? 1 : 0 )
// 				> 1 && pw.length > 5){
// 					return true;
// 				} else {
// 					return false;
// 				};
// 			};
// 			return valid;
// 		};
// 	});
// };
//
// $.fn.placeholder = function(){
// 	$(this).each(function(){
// 		var input = $(this);
// 		input.attr('data-placeholder',input.val());
// 		input.focusin(function(){
// 			if (input.val() == input.attr('data-placeholder')) {
// 				input.val('');
// 			};
// 			input.removeClass('textInput-placeholder');
// 		}).focusout(function(){
// 			if (input.val() == '') {
// 				input.val(input.attr('data-placeholder')).addClass('textInput-placeholder');
// 			} else {
// 				input.removeClass('textInput-placeholder');
// 			};
// 		});
// 	});
// };
//
// $.fn.placeholder2 = function(){
// 	$(this).each(function(){
// 		var input = $(this);
// 		input.wrap('<label class="input-placeholder"/>');
// 		var wrapper = input.parent();
// 		wrapper.append('<span>'+input.attr('placeholder')+'</span>')
// 		input.attr('data-placeholder',input.attr('placeholder'));
// 		input.removeAttr('placeholder');
//
// 		input.focusin(function(){
// 			wrapper.addClass('focus');
// 		}).focusout(function(){
// 			wrapper.removeClass('focus');
// 			input.trigger('keydown');
// 		}).keydown(function(){
// 			setTimeout((function(){
// 				if (input.val() != '') {
// 					wrapper.addClass('nolabel');
// 				} else {
// 					wrapper.removeClass('nolabel');
// 				};
// 			}),5);
// 		});
// 	});
// };
//
// $.fn.textInput = function(){
// 	$(this).each(function(){
// 		var w = $(this);
// 		w.find('input,textarea').focusin(function(){
// 			w.addClass('focus');
// 		}).focusout(function(){
// 			w.removeClass('focus');
// 		});
// 	});
// };
//
// $.fn.inputSwitcher = function(){
// 	$(this).each(function(){
// 		var switcher = $(this),
// 			items = switcher.find('span'),
// 			input = switcher.find('input');
// 		items.click(function(){
// 			if (!$(this).hasClass('active') && !switcher.hasClass('disabled')) {
// 				input.val($(this).attr('data-name'));
// 				items.filter('.active').removeClass('active');
// 				$(this).addClass('active');
// 			};
// 		});
// 	});
// };
//
// jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d)},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b}});
//
// $.fn.selectInput = function() {
// 	$(this).each(function(){
// 		var si = $(this),
// 			id = 'selectInput-'+ (new Date().getTime()),
// 			opt = si.find('.selectInput-options'),
// 			list = opt.find('.selectInput-options-inner'),
// 			isMultiple = (si.hasClass('multiple')) ? true : false;
// 			isChanged = false,
// 			mh = 220,
// 			oh = 160;
//
// 		opt.find('.bar').remove();
// 		opt.append('<div class="bar-wrapper"></div>');
// 		var bar = $('<div class="bar"><div></div></div>').appendTo(opt);
// 		var height, ratio, handler, x;
//
// 		si.find('.b').unbind('click').click(function(){
// 			id = 'selectInput-'+ (new Date().getTime());
// 			si.attr('id',id);
// 			if (!si.hasClass('disabled')) {
// 				if (!si.hasClass('selectInput-opened')) {
// 					si.addClass('selectInput-opened');
// 					$(document).unbind('mousedown.select').bind('mousedown.select',function(e){
// 						var t = $(e.target);
// 						if (!t.parents('#'+id).length) {
// 							si.find('.b').trigger('click');
// 						};
// 					});
// 					height = list.height();
// 					if (height>mh) {
// 						ratio = (height-mh)/oh;
// 						if (!Z.touch) {
// 							bar.mousedown(mouseDown);
// 							opt.unbind('mousewheel').mousewheel(function(event, delta) {
// 								var dir = 60*delta;
// 								var pos = parseInt(list.css('margin-top')) + dir;
// 								pos = (pos>0) ? 0 : ( (pos<-(height-mh)) ? -(height-mh) : pos );
// 								list.css('margin-top',pos);
// 								bar.css('top',(parseInt((-pos)/ratio)+'px'));
// 								return false;
// 							});
// 						} else {
// 							bar.addEventListener('touchstart',mouseDown);
// 						};
// 					} else {
// 						bar.remove();
// 						opt.unbind();
// 						opt.find('.bar-wrapper').remove();
// 					};
// 				} else {
// 					$(document).unbind('mousedown.select');
// 					opt.unbind('mousewheel');
// 					si.removeClass('selectInput-opened');
// 					if (isChanged) si.find('input').val($(this).attr('data-name')).trigger('change');
// 				};
// 			};
// 		});
// 		si.find('li').unbind('click').click(function(e){
// 			if ((isMultiple && !e.ctrlKey) || !isMultiple) {
// 				if (!$(this).hasClass('active')) {
// 					si.removeClass('selectInput-placeholder');
// 					si.find('li.active').removeClass('active');
// 					$(this).addClass('active');
// 					si.find('input').val($(this).attr('data-name')).trigger('change');
// 					si.find('.b').html($(this).html()+'<i />');
// 				};
// 				si.find('.b').trigger('click');
// 			} else {
// 				isChanged = true;
// 				var index = si.find('li').index(this);
// 				if (index == 0) {
// 					if (!$(this).hasClass('active')) {
// 						si.find('li.active').removeClass('active');
// 						$(this).addClass('active');
// 					};
// 				} else {
// 					$(this).toggleClass('active');
// 					if (si.find('li:gt(0)').filter('.active').length < 1) {
// 						si.find('li:eq(0)').addClass('active');
// 					} else {
// 						si.find('li:eq(0)').removeClass('active');
// 					};
// 				};
// 				var ids = [], labels = [];
// 				si.find('li.active').each(function(){
// 					ids.push($(this).attr('data-name'));
// 					labels.push($(this).text());
// 				});
// 				ids = ids.toString();
// 				labels = labels.toString();
// 				labels = labels.replace(/,/gi,', ');
// 				// console.log(ids + ' / '+ labels);
// 				si.find('input').val(ids);
// 				si.find('.b').html(labels);
// 			};
// 		});
//
// 		function mouseDown(event) {
// 			event.preventDefault();
// 			x = (!Z.touch) ? event.pageY : event.touches[0].pageY;
// 			handler = parseInt(bar.css('top'));
// 			if (!Z.touch) {
// 				$(document).mousemove(mouseMove);
// 				$(document).mouseup(mouseUp);
// 			} else {
// 				document.addEventListener('touchmove',mouseMove);
// 				document.addEventListener('touchend',mouseUp);
// 			};
// 		};
// 		function mouseMove(event) {
// 			var curX = (!Z.touch) ? event.pageY : event.touches[0].pageY;
// 			var pos = handler - (x - curX);
// 			pos = (pos<0) ? 0 : ( (pos>oh) ? oh : pos );
// 			//$('#asd').html(pos)
// 			bar.css('top',(pos+'px'));
// 			list.css('margin-top',(-parseInt((pos)*ratio)+'px'));
// 		};
// 		function mouseUp(event) {
// 			if (!Z.touch) {
// 				$(document).unbind('mousemove',mouseMove);
// 				$(document).unbind('mouseup',mouseUp);
// 			} else {
// 				document.removeEventListener('touchmove',mouseMove);
// 				document.removeEventListener('touchend',mouseUp);
// 			};
// 		};
// 	});
// };
//
//
// $.fn.wScroll = function() {
// 	$(this).each(function(i){
// 		var list = $(this),
// 			inner = list.find('.inner'),
// 			H = list.height();
//
// 		list.attr('data-list','list'+i)
// 		list.find('.bar').remove();
// 		list.find('.scroll-shadow').remove()
// 		list.unbind('mousewheel');
//
// 		if (inner.height() > H+3) {
// 			var shadow = $('<div class="scroll-shadow shadow-top"></div><div class="scroll-shadow shadow-bottom"></div>').appendTo(list);
// 			var bar = $('<div class="bar"><b></b><i></i></div>').appendTo(list),
// 				min = inner.height() - H,
// 				barHeight = H * (H / inner.height());
// 				barHeight = (barHeight >= H) ? H-1 : ( (barHeight < 30) ? 30 : barHeight );
// 			var listOffset = H - barHeight,
// 				ratio = min / listOffset;
//
// 			(function(){
// 				var top = parseInt(inner.css('margin-top'));
// 				if (top < -min) top = -min;
// 				inner.css('margin-top',top);
// 			})();
// 			bar
// 				.height(barHeight)
// 				.css('margin-top',-parseInt(inner.css('margin-top'))/ratio);
//
// 			checkShadow(-parseInt(inner.css('margin-top'))/ratio);
//
// 			var y, pos;
//
// 			if (!Z.touch) {
// 				bar.mousedown(mouseDown);
// 			} else {
// 				bar.get(0).addEventListener('touchstart',mouseDown);
// 			};
// 			list.mousewheel(function(e, delta) {
// 				var dir = -60/ratio*delta,
// 					pos = Math.abs(parseInt(inner.css('marginTop')))/ratio,
// 					dif = (dir	 + pos),
// 					temp = dif;
//
// 				dif = (dif < 0) ? 0 : ( (dif > listOffset) ? listOffset : dif );
// 				bar.css('marginTop',dif);
// 				inner.css('marginTop',-dif*ratio);
// 				checkShadow(dif);
//
// 				if (dif == temp) {
// 					return false;
// 				};
// 			});
// 		} else {
// 			inner.css('margin-top',0);
// 		}
//
// 		function checkShadow(dif) {
// 			dif = (dif < 0) ? 0 : ( (dif > listOffset) ? listOffset : dif );
// 			if (dif <= 0) {
// 				shadow.eq(0).hide();
// 				shadow.eq(1).show();
// 			} else if (dif >= listOffset) {
// 				shadow.eq(0).show();
// 				shadow.eq(1).hide();
// 			} else {
// 				shadow.eq(0).show();
// 				shadow.eq(1).show();
// 			};
// 		};
//
// 		function mouseDown(e) {
// 			e.preventDefault();
// 			y = (!Z.touch) ? e.pageY : e.touches[0].pageY;
// 			pos = Math.abs(parseInt(inner.css('marginTop')))/ratio;
// 			if (!Z.touch) {
// 				$(document).mousemove(mouseMove);
// 				$(document).mouseup(mouseUp);
// 			} else {
// 				document.addEventListener('touchmove',mouseMove);
// 				document.addEventListener('touchend',mouseUp);
// 			};
// 		};
// 		function mouseUp(e) {
// 			if (!Z.touch) {
// 				$(document).unbind('mousemove',mouseMove);
// 				$(document).unbind('mouseup',mouseUp);
// 			} else {
// 				document.removeEventListener('touchmove',mouseMove);
// 				document.removeEventListener('touchend',mouseUp);
// 			};
// 		};
// 		function mouseMove(e) {
// 			e.preventDefault();
// 			var curY = (!Z.touch) ? e.pageY : e.touches[0].pageY;
// 			var dif = curY - y;
// 				dif = (dif + pos);
// 				dif = (dif < 0) ? 0 : ( (dif > listOffset) ? listOffset : dif );
//
// 			bar.css('marginTop',dif);
// 			inner.css('marginTop',-dif*ratio);
// 			checkShadow(dif);
// 		};
//
// 	});
// };