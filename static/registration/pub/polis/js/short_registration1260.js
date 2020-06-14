$(document).ready(function () {
    try {
        $('#short-registration-form').find('.js-nice-select').niceSelect();
    }
    catch(TypeError) {
        console.error('No nice select lib found');
    }

    function ShowNotifications(aNotifications) {
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
    }

    $('.trigger-university-change').on('change', function () {
        var university = $('.other_university');
        if ($(this).val() === 'other') {
            university.show();
        }
        else {
            university.hide();
        }
    });

    $('#short-registration-form').find('input').on('change', function () {
         $(this).closest('form').find('.js-error-__all__').empty();
    });

    $('#short-registration-form').submit(function (e) {
        e.preventDefault();
        var submit_btn = $(this).find('button');
        submit_btn.attr('disabled', 'disabled');
        $(this).find('.error-message').empty();
        var $errorPlace = $(this).find('.js-error-__all__');
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: $(this).serialize(),
            success: function (result) {
                var bError = ShowNotifications(result.aNotifications);
                if (bError) {
                    $errorPlace.html('Необходимо заполнить все поля');
                }
                else {
                    $('.app-last').show();
                    $('.app-before').hide();
                    $('.registration-form').hide();
                    if (result.resetPassword === true) {
                        $('.reset-password-info').show();
                    }
                    else if (result.login === true) {
                        $('.action-info').show();
                    }
                    else {
                        $('.info-form').show();
                    }
                }
                submit_btn.removeAttr('disabled');
            },
            error: function (result) {
                submit_btn.removeAttr('disabled');
                $.msg.error(null, 'Системная ошибка, повторите позже');
            }
        });
    });

    function disableSubmit($btn) {
        $btn.attr('disabled', 'disabled');
        $btn.prop('disabled', true);
        $btn.addClass('disabled');
    }
    function enableSubmit($btn) {
        $btn.removeAttr('disabled');
        $btn.prop('disabled', false);
        $btn.removeClass('disabled');
    }

    $('.js-reset-form').submit(function (event) {
        event.preventDefault();
        var $form = $(this);
        var url = $form.attr('action');
        var $btn = $form.find('button[type="submit"]');

        disableSubmit($btn);
        $form.find('.error-message').empty();
        $.post(url, $(this).serialize())
            .done(function (response) {
                console.log(response);
                if (response.status === 'ERR') {
                    Object.keys(response.errors).forEach(function (field) {
                        $form.find('.error-' + field).html(response.errors[field][0]);
                    });
                }
                else if (response.status === 'OK') {
                    $.msg.notice('Успех', 'Новый пароль успешно сохранён!');
                    setTimeout(function () {
                        location.replace(response['redirect_url']);
                    }, 3000);
                }

            }.bind(this))
            .fail(function () {
                $.msg.error(null, 'Произошла ошибка, попробуйте позже');
                enableSubmit($btn);
            });
    });
    $('.js-reset-form input').keyup(function () {
        var $form = $(this).parents('form');
        var $btn = $form.find('button[type="submit"]');
        enableSubmit($btn);
    });

});