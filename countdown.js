/* Обратный отсчёт до свадьбы.
   Чистые функции сверху — они покрыты тестами в tests.html.
   Слой DOM снизу — проверяется руками. */

/* 2026-10-09T15:00:00+03:00 — смещение МСК указано явно,
   иначе гость в другом часовом поясе увидит неверный отсчёт. */
var WEDDING_MS = 1791547200000;

/* Склонение русских числительных.
   forms — [для 1, для 2-4, для 5-20].
   Числа 11-14 всегда берут третью форму: «11 дней», а не «11 день». */
function pluralRu(n, forms) {
  var n10 = n % 10;
  var n100 = n % 100;
  if (n100 >= 11 && n100 <= 14) return forms[2];
  if (n10 === 1) return forms[0];
  if (n10 >= 2 && n10 <= 4) return forms[1];
  return forms[2];
}

/* Разбор остатка в миллисекундах на дни/часы/минуты/секунды.
   Возвращает null, если момент уже наступил или прошёл. */
function breakdown(msLeft) {
  if (msLeft <= 0) return null;
  var s = Math.floor(msLeft / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor(s / 3600) % 24,
    minutes: Math.floor(s / 60) % 60,
    seconds: s % 60
  };
}

/* ---------- Слой DOM ---------- */

(function () {
  var root = document.getElementById('countdown');
  if (!root) return; /* на tests.html секции нет — выходим молча */

  var LABELS = {
    days: ['день', 'дня', 'дней'],
    hours: ['час', 'часа', 'часов'],
    minutes: ['минута', 'минуты', 'минут'],
    seconds: ['секунда', 'секунды', 'секунд']
  };

  var ORDER = ['days', 'hours', 'minutes', 'seconds'];

  function render() {
    var left = breakdown(WEDDING_MS - Date.now());

    if (!left) {
      root.innerHTML = '<p class="countdown-done">Мы поженились!<br>Спасибо, что были с нами</p>';
      return true; /* сигнал остановить таймер */
    }

    var html = '';
    for (var i = 0; i < ORDER.length; i++) {
      var key = ORDER[i];
      html += '<div class="countdown-cell">' +
              '<span class="countdown-num">' + left[key] + '</span>' +
              '<span class="countdown-label">' + pluralRu(left[key], LABELS[key]) + '</span>' +
              '</div>';
    }
    root.innerHTML = html;
    return false;
  }

  if (render()) return;
  var timer = setInterval(function () {
    if (render()) clearInterval(timer);
  }, 1000);
})();
