/**
 * Модуль activity
 */
var activity = (function ($) {
    var ShowNotifications = function (aNotifications) {
        var bError = false;

        $.each(aNotifications, function (iIndexObject, oMessage) {
            if (oMessage.bStateError) {
                $.msg.error(oMessage.sMsgTitle, oMessage.sMsg);
                bError = true;
            } else {
                $.msg.notice(oMessage.sMsgTitle, oMessage.sMsg);
            }
        });

        return bError;
    };

    /**
     * Инициализация модуля
     */
    this.init = function () {
         $('#popup-event-register-form-submit').click(function (e) {

            e.preventDefault();
            $.ajax({
               type: "POST",
               url: $("#popup-event-register").attr('action'),
               data: $("#popup-event-register").serialize(),
               success: function(result)
               {
                   ShowNotifications(result.aNotifications);
                   var error = result.aNotifications[0].bStateError;

                   if (!error){
                       $('.rtr_popup__close').click();
                       location.reload();
                   }
                   else {
                       grecaptcha.reset();
                   }
               }
             });
        });
        this.initActivityHandler();
    };

    /**
     * Инициалзация обработчика вступления/выхода/быстрой регистрации со вступлением на мероприятие
     */
    this.initActivityHandler = function () {
        /**
         * Все кнопки для входа в мероприятие
         */
        var $ActivityJoin = $('.trigger-attend'),
            $ActivityLeave = $('.trigger-cancelAttendance');

        $ActivityJoin.unbind('click', activity.joinActivity);
        $ActivityLeave.unbind('click', activity.leaveActivity);

        $ActivityJoin.click(activity.joinActivity);
        $ActivityLeave.click(activity.leaveActivity);

        if (typeof registrationAttempt !== 'undefined') {
            if (registrationAttempt === true) {
                $ActivityJoin.trigger('click');
            }
        }
    };


    this.joinActivity = function () {
        var $button = $(this), //нажатая кнопка
            $activityData = $button.parents('.activity-data'), //див с необходимыми данными о мероприятии
            csrftoken = $activityData.data('csrftoken'), //айди
            url = $activityData.data('url'), //айди
            eventId = $activityData.data('event-id'), //айди
            activityTitle = $activityData.data('activity-title'), //название
            activityDateStart = $activityData.data('activity-date-start'), //дата начала
            $news = $button.parents('.news'); //пытаемся найти родительскую новость, может быть null -> значит кнопка в списке новостей

        /**
         * Просто варнинг
         */

        $('#popup-success').remove();
        $('#popup-warning').remove();
        $('#popup-cancel').remove();

        var $warningPopup = $(
            '<div id="js-popup-warning" class="b-popup js-popup js-popup-enrol">' +
            '   <div class="b-popup-frame">' +
            '       <div class="b-popup-window">' +
            '           <div class="b-popup-window-head">' +
            '               <div class="typography top-spacer__middle"><span>' +
            '                   Подтвердите, что Вы студент или сотрудник СПбПУ. <br>Если Вы не являетесь ' +
            '                   студентом СПбПУ, мы не сможим обеспечить Вам проход на мероприятие.' +
            '<br>Подтвердите, пожалуйста, что Вы сможете самостоятельно пройти в аудиторию' +
            '               </span></div>' +
            '               <a href="#" class="js-close b-ico i-close"></a>' +
            '           </div>' +
            '           <div class="top-spacer__middle typography b-info">' +
            '               <button type="submit" class="button js-accept-button">Подтверждаю</button>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>');

        /**
         * При каждом нажатии выводим варнинг
         */
        $warningPopup.appendTo('.popups-container');
        showPopup('popup-warning');

        /**
         * Биндим на него подтверждение/отмену
         */
        $warningPopup.find('.js-close').click(function () {
            enable_scroll();
            $('#js-popup-warning').remove();
        });
        $warningPopup.find('.cancel').click(function () {
            $('#js-popup-warning').find('.js-close').trigger('click');
        });

        /**
         * Пацан подтвердил
         */
        $warningPopup.find('.js-accept-button').click(function () {
            $.ajax({
                url: url,
                type: 'POST',
                beforeSend: function (xhr, settings) {
                    var csrftoken = $.cookie('csrftoken');
                    if (!this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                },
                success: function (result) {
                    ShowNotifications(result.aNotifications);

                    /**
                     * Проверяем state, если все окей - выводим финальную форму с благодарностями, блекджеком и шлю..
                     */
                    if (!result.bStateError) {
                        /**
                         * Закрываем предыдущее окно
                         */
                        $('#js-popup-warning').find('.js-close').trigger('click');

                        /**
                         * Если новость полноценная меняем на правильные кнопки и меняем счетчик вакантных мест
                         */


                        if ($news.hasClass('news-page')) {
                            var $activityVacantPlaces = $news.find('.activity-vacant-places'),
                                vacantPlaces = parseInt($activityVacantPlaces.html());
                            if (vacantPlaces > 0)
                                $activityVacantPlaces.html(vacantPlaces - 1);

                            $button.parents('.activity-data').html(
                                '<a href="#" class="button b-button p-size-big p-color-clear_purple trigger-cancelAttendance">Я передумал</a>');
                        } else {
                            $button.parents('.activity-data').html(
                                '<a href="#" class="button b-button p-size-big p-color-clear_purple trigger-cancelAttendance">Я передумал</a>');
                        }

                        $activityData.find('.trigger-cancelAttendance').click(activity.leaveActivity);
                        /**
                         * Находим кнопочку выйти и биндим на нее обработчик
                         */
                        // $activityData.find('.trigger-cancelAttendance').click(activity.leaveActivity);
                        //
                        // var $thanksPopup = $(
                        //     '<div class="b-popup" id="popup-success">' +
                        //     '   <div class="b-popup-frame">' +
                        //     '       <div class="b-popup-window p-info">' +
                        //     '           <div class="b-popup-window-head">' +
                        //     '               Спасибо!' +
                        //     '               <a href="#" class="b-ico i-close"></a>' +
                        //     '	        </div>' +
                        //     '           <div class="b-info">' +
                        //     '               <div class="b-info-text">' +
                        //     '                   Вы успешно записались на мероприятие:<br>"' + activityTitle + '".<br>' +
                        //     '                   Дата проведения:<br>' + activityDateStart + '.' +
                        //     '                   <div class="b-info-footer">' +
                        //     '				        <button type="submit" class="b-button p-size-big p-color-clear_white cancel">Закрыть</button>' +
                        //     '                   </div>' +
                        //     '			    </div>' +
                        //     '	        </div>' +
                        //     '       </div>' +
                        //     '   </div>' +
                        //     '</div>');
                        //
                        // //тоже самое что с варнингом и формой записи
                        // $thanksPopup.appendTo('.js-popups-holder');
                        // showPopup('popup-success', true);
                        // $thanksPopup.find('.i-close').click(function () {
                        //     enable_scroll();
                        //     $('#popup-success').remove();
                        // });
                        // $thanksPopup.find('.cancel').click(function () {
                        //     $('#popup-success').find('.i-close').trigger('click');
                        // });
                    }
                },
                error: function () {
                    $.msg.error(null, 'Системная ошибка');
                }
            });

        });

        return false;
    };


    this.leaveActivity = function () {
        var $button = $(this), //нажатая кнопка
            $activityData = $button.parents('.activity-data'), //див с необходимыми данными о мероприятии
            csrftoken = $activityData.data('csrftoken'), //айди
            url = $activityData.data('url'), //айди
            eventId = $activityData.data('event-id'), //айди
            activityTitle = $activityData.data('activity-title'), //название
            activityDateStart = $activityData.data('activity-date-start'), //дата начала
            $news = $button.parents('.news'); //пытаемся найти родительскую новость, может быть null -> значит кнопка в списке новостей

        $('#popup-success').remove();
        $('#popup-warning').remove();
        $('#popup-cancel').remove();

        var $cancelPopup = $(
            '<div id="js-popup-warning" class="b-popup js-popup js-popup-enrol">' +
            '   <div class="b-popup-frame">' +
            '       <div class="b-popup-window">' +
            '           <div class="b-popup-window-head">' +
            '               <div class="typography top-spacer__middle"><span>' +
            '                   Подтвердите, что хотите отписаться от мероприятия' +
            '               </span></div>' +
            '               <a href="#" class="js-close b-ico i-close"></a>' +
            '           </div>' +
            '           <div class="top-spacer__middle typography b-info">' +
            '               <button type="submit" class="button js-reject-button">Подтверждаю</button>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>');

        $cancelPopup.appendTo('.popups-container');

        showPopup('popup-cancel');

        $cancelPopup.find('.js-close').click(function () {
            enable_scroll();
            $('#js-popup-warning').remove();
        });
        $cancelPopup.find('.cancel').click(function () {
            $('#popup-cancel').find('.i-close').trigger('click');
        });


        $cancelPopup.find('.js-reject-button').click(function () {
            var session_email = $('.trigger-cancelAttendance').attr('attr-session-email');
            var data = {
                type: 'POST',
                url: url,
                data: {event_id: eventId, csrfmiddlewaretoken: csrftoken, email: session_email},

                success: function (result) {
                    ShowNotifications(result.aNotifications);

                    if (!result.bStateError) {
                        $('#js-popup-warning').find('.js-close').trigger('click');


                        if ($news.hasClass('news-page')) {
                            var $activityVacantPlaces = $news.find('.activity-vacant-places'),
                                vacantPlaces = parseInt($activityVacantPlaces.html());
                            if (vacantPlaces >= 0)
                                $activityVacantPlaces.html(vacantPlaces + 1);

                            $button.parents('.activity-data').html(
                                '<a href="#" class="button b-button p-size-big p-color-clear_purple trigger-attend">Я пойду</a>'
                            );
                        } else {
                            $button.parents('.activity-data').html(
                                '<a href="#" class="button b-button p-size-big p-color-clear_purple trigger-attend">Я пойду</a>'
                            );
                        }


                        $activityData.find('.trigger-attend').click(activity.joinActivity);

                        // var $thanksPopup = $(
                        //     '<div class="b-popup" id="popup-success">' +
                        //     '   <div class="b-popup-frame">' +
                        //     '       <div class="b-popup-window p-info">' +
                        //     '           <div class="b-popup-window-head">' +
                        //     '               Вы отписались' +
                        //     '               <a href="#" class="b-ico i-close"></a>' +
                        //     '	        </div>' +
                        //     '           <div class="b-info">' +
                        //     '               <div class="b-info-text">' +
                        //     '                   Приходите к нам еще, у нас интересно!' +
                        //     '                   <div class="b-info-footer">' +
                        //     '				        <button type="submit" class="b-button p-size-big p-color-clear_white cancel">Закрыть</button>' +
                        //     '                   </div>' +
                        //     '			    </div>' +
                        //     '	        </div>' +
                        //     '       </div>' +
                        //     '   </div>' +
                        //     '</div>');
                        //
                        // $thanksPopup.appendTo('.js-popups-holder');
                        // showPopup('popup-success', true);
                        //
                        // $thanksPopup.find('.i-close').click(function () {
                        //     enable_scroll();
                        //     $('#popup-success').remove();
                        // });
                        // $thanksPopup.find('.cancel').click(function () {
                        //     $('#popup-success').find('.i-close').trigger('click');
                        // });

                        location.reload();
                    }
                },
                error: function () {
                    $.msg.error(null, 'Системная ошибка');
                }
            };

            $.ajax(data);


            return false;
        });
        return false;
    };

    /**
     * Объектик для хранения сложных данных (списков) в куки
     * Используется для хранения мероприятий на которые пользователь записался
     * @type {Function}
     */
    this.cookieStorage = (function () {
        /**
         * Конструируем объект
         * Название хранящей куки, параметры и текущие элементы
         */
        this.cookieName = 'user_activity';
        this.aParams = {expires: 365, path: '/'};
        this.items = $.cookie(this.cookieName) ? $.cookie(this.cookieName).split(',') : [];

        /**
         * Добавить в список значение
         * @param val
         */
        this.add = function (val) {
            this.items.push(String(val));
            $.cookie(this.cookieName, this.items.join(','), this.aParams);
        };
        /**
         * Удалить из списка значение
         * @param val
         */
        this.remove = function (val) {
            var index = this.items.indexOf(String(val));
            if (index != -1) this.items.splice(index, 1);
            $.cookie(this.cookieName, this.items.join(','), this.aParams);
        };
        /**
         * Очистить
         */
        this.clear = function () {
            this.items = null;
            $.cookie(this.cookieName, null);
        };

        return this;

    }).call();


    return this;

}).call(activity || {}, jQuery);


/**
 * When jquery is ready, add hooks, init activity
 */
jQuery(function ($) {
    /**
     * Initialize activity
     */
    activity.init();
});