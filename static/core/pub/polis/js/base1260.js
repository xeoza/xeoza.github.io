// function showPopup(popup, isFast) {
//     popup = $('#' + popup);
//     //setCenter(popup);
//     //createBlind(popup,isFast);
//     if (!isFast) {
//         popup.css({opacity: 0}).show().animate({opacity: 1}, 300);
//     } else {
//         popup.show();
//     }
//
//     popup.find('.js-close').unbind('click').click(function (e) {
//         e.preventDefault();
//         enable_scroll();
//         closePopup(popup);
//     });
//     popup.find('.js-popup-close').unbind('click').click(function (e) {
//         e.preventDefault();
//         enable_scroll();
//         closePopup(popup);
//     });
//     $(document).click(function () {
//         popup.find('.js-close').trigger('click');
//     });
//     $(".b-popup-frame").click(function (e) {
//         e.stopPropagation();
//     });
//     $(document).on('click', function (e) {
//         if (e.target.className == "b-popup-frame") {
//             popup.find('.js-close').trigger('click');
//         }
//     });
//     $(document).bind('keydown.popup', function (e) {
//         if (e.which == 27) {
//             popup.find('.js-close').trigger('click');
//         }
//     });
//
//     disable_scroll();
//
//     $('.blind').height($(document).height());
//     $(window).bind('resize.popup', function () {
//         setCenter(popup);
//     })
// };
//
// function closePopup(popup) {
//     $('.blind').remove();
//     popup.hide();
//     $(document).unbind('keydown.popup');
//     $(window).unbind('resize.popup');
//     return false;
// };
//
// $(document).ready(function () {
//
//     $('.trigger-registration').click(function(e){
// 		e.preventDefault();
// 		showPopup('popup-registration');
// 	});
//
//     $('.trigger-login').click(function (e) {
//         e.preventDefault();
//         $('#popup-login').removeClass('popup-login-restore');
//         $('#popup-reminder-form').hide();
//         $('#popup-login-form').show();
//         showPopup('popup-login');
//         return false;
//     });
//
//     if (location.hash === '#auth') {
//         $('#popup-login').removeClass('popup-login-restore');
//         $('#popup-reminder-form').hide();
//         $('#popup-login-form').show();
//         showPopup('popup-login');
//     }
//
//     $(document).ready(function ($) {
//         var beginLogin = function () {
//             $('.login-input').addClass('login-load');
//             $('#popup-login-form .error-message').text('');
//         };
//
//         var endLogin = function () {
//             $('.login-input').removeClass('login-load');
//         };
//
//         var successLogin = function (result) {
//             endLogin();
//
//             if (result.bStateError === false) {
//                 if (result.redirect !== undefined) {
//                     if (result.redirect[0] !== '/') {
//                         result.redirect = '/' + result.redirect;
//                     }
//                     window.location = window.location.origin + result.redirect;
//                 }
//                 else {
//                     location.reload(false);
//                 }
//             } else if (result.sErrorMsg) {
//                 $('#popup-login-form .error-message').text(result.sErrorMsg);
//             }
//         };
//
//         var beginPasswordReset = function () {
//             $('#popup-reminder-form .error-message').text('');
//         };
//
//         var successPasswordReset = function (result) {
//             if (result.bStateError === false) {
//                 for (var i = 0; i < result.aNotifications.length; i++) {
//                     var notice = result.aNotifications[i];
//                     $.msg.notice('', notice.sMsg);
//                     $('.js-close').click();
//                 }
//
//             } else if (result.sErrorMsg) {
//                 $('#popup-reminder-form .error-message').text('Неверный формат Email');
//             }
//         };
//
//         $('#popup-login-form-submit').attr('disabled', false);
//         // $('#popup-login-form').ajaxForm({
//         //     beforeSubmit: beginLogin,
//         //     success: successLogin,
//         //     error: endLogin
//         // });
//
//         var loginAttempt = 0;
//         var gtpMode = $('.gtp-mode').val();
//
//         function loginEvent(result) {
//             if (result.bStateError == false) {
//                 if (typeof ga === 'function') {
//                     ga('send', 'event', 'signup-popup', 'signup-success');
//                 }
//                 if (result.redirect !== undefined) {
//                     if (result.redirect[0] !== '/') {
//                         result.redirect = '/' + result.redirect;
//                     }
//                     window.location = window.location.origin + result.redirect;
//                 }
//                 else {
//                     location.reload(false);
//                 }
//             }
//             if (result.sErrorMsg) {
//                 if (typeof ga === 'function') {
//                     ga('send', 'event', 'signup-popup', 'signup-error');
//                 }
//                 $('#popup-login-form .error-message').text(result.sErrorMsg);
//             }
//         }
//
//         $('#popup-login-form').on("submit", function (e) {
//             e.preventDefault();
//             var data = $(this).serialize();
//
//             var gtp_url = $(this).attr("action");
//
//             $.ajax({
//                 url: gtp_url,
//                 method: 'post',
//                 data: data,
//                 success: function (result) {
//                     loginEvent(result);
//                     if (result.sErrorMsg) {
//                     $('#popup-login-form .error-message').text(result.sErrorMsg);
//                 }
//                 },
//                 error: function (result) {
//                     $('#popup-login-form .error-message').text("Что-то пошло не так. Попробуйте позже");
//                 }
//             });
//         });
//
//         $('#popup-reminder-form-submit').attr('disabled', false);
//         $('#popup-reminder-form').ajaxForm({
//             beforeSubmit: beginPasswordReset,
//             success: successPasswordReset
//         });
//     });
//
//     $('#popup-login').find('.password-reset-button').click(function(e){
//         e.preventDefault();
// 		$('#popup-login-form').hide();
//         $('#popup-reminder-form').show();
// 	});
//
//     $('.js-play-close').on("click", function(e){
//         var $video = $(this).closest('div').find('.youtube-video');
//         var src = $video.attr("src");
//         $video.attr("src", "");
//         $video.attr("src", src);
//     });
//
//     $('.discipline-video').on("click", function(){
//         var videoSrc = $(this).parent().find('.iframe-video-container').data('video');
//         var videoBlockFormat = '<iframe class="youtube-video"' +
//             'width = "930"' +
//             'height = "560"' +
//             'data - src = "' + videoSrc + '"'+
//             'frameborder = "0"' +
//             'allowfullscreen =""></iframe>';
//         $(this).parent().find('.iframe-video-container').html(videoBlockFormat)
//     });
//
//
//     $('.video-card__content').on("click", function(){
//         var videoSrc = $(this).parent().find('.iframe-video-container').data('video');
//         var videoBlockFormat = '<iframe class="youtube-video"' +
//             'width = "930"' +
//             'height = "560"' +
//             'data - src = "' + videoSrc + '"'+
//             'frameborder = "0"' +
//             'allowfullscreen =""></iframe>';
//         $(this).parent().find('.iframe-video-container').html(videoBlockFormat)
//     });
//
//     $('.js-popup-open').click(function (e) {
//         e.preventDefault();
//
//         $('.popup__success').hide();
//         $('.popup-bug-report__content').show();
//
//         $.ajax('/bugreport/').success(function (result) {
//             $('.popup-bug-report__content').html(result);
//
//             var captcha = $('#id_captcha_1');
//             captcha.addClass('required');
//
//             var modal = $('.bugreport-form');
//             modal.find('#id_captcha_1').addClass('field__input');
//             // modal.find('img').hide();
//
//             $('.user-name').focus();
//             modal.placeholder();
//             modal.required();
//             modal.submit(function (e) {
//                 e.preventDefault();
//                 $('#report-theme').val($('.question').val().substring(0,50));
//                 $.ajax({
//                     url: $(this).attr('action'),
//                     type: 'POST',
//                     data: $(this).serialize(),
//                     success: function (result) {
//                         var errors = $('.bug-report__form-errors');
//                         errors.html('');
//                         modal.find('#id_captcha_1').val('');
//                         if (result.bStateError) {
//                             if (result.errors.burst) {
//                         		errors.append('Превышено количество попыток. Попробуйте позже<br>');
// 							}
//                             if (result.errors.captcha) {
//                                 errors.append('Код подтверждения введен неверно<br>')
//                             }
//                             if (result.errors.theme) {
//                                 errors.append('Поле "Тема" является обязательным<br>')
//                             }
//
//                             if (result.errors.text) {
//                                 errors.append('Поле "Описание" является обязательным<br>')
//                             }
//
//                             modal.find('.captcha').attr('src', result.captcha_image);
//                             modal.find('#id_captcha_0').val(result.captcha_key);
//                         } else {
//                             $('.popup-bug-report__content').hide();
//                             $('.popup__success').show();
//                         }
//                     },
//                     error: function () {
//                         $.msg.error(null, 'Произошла ошибка, попробуйте позже');
//                     }
//                 });
//             });
//
//         });
//
//         return false;
//
//     });
//     function bind_click(){
//         $('.dropdown-toggle').unbind();
//         $('.dropdown-toggle').on('click', function (e) {
//             e.preventDefault();
//             var container = $('.' + $(e.target).data('name'));
//             console.log(container);
//             container.toggle();
//         });
//     }
//     bind_click();
//
// });