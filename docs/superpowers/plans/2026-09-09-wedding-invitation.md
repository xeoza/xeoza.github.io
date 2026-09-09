# Свадебное приглашение-газета — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Собрать статический сайт-приглашение на свадьбу Данилы и Анастасии 9 октября 2026 года, оформленный как выпуск старой газеты, и опубликовать его на https://xeoza.github.io/

**Architecture:** Одна страница `index.html` со всем текстом прямо в разметке, рядом `styles.css` и единственный скрипт `countdown.js`. Никакой сборки, никаких зависимостей, никакого генератора статики — GitHub Pages отдаёт файлы как есть. Логика обратного отсчёта разделена на чистые функции (тестируются) и тонкий слой обновления DOM (проверяется руками).

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid), ванильный ES5-совместимый JavaScript, Google Fonts, GitHub Pages.

**Spec:** [docs/superpowers/specs/2026-09-09-wedding-invitation-design.md](../specs/2026-09-09-wedding-invitation-design.md)

## Global Constraints

Эти требования действуют во всех задачах без исключения.

- **Node.js на машине отсутствует.** Никаких `npm`, `npx`, `node`. Тесты запускаются открытием `tests.html` в браузере. Обработка изображений — только через `sips` (macOS).
- **Никакого билд-шага.** Файлы, лежащие в репозитории, — это ровно то, что отдаётся браузеру.
- **Язык интерфейса — русский.** `lang="ru"` на `<html>`, кодировка UTF-8.
- **Целевой момент свадьбы:** `2026-10-09T15:00:00+03:00` = epoch `1791547200000`. Смещение МСК указывается явно везде, где встречается дата.
- **Палитра (CSS custom properties):** `--paper: #e9e7e2`, `--paper-alt: #dcd9d3`, `--ink: #111`, `--ink-soft: #3a3a3a`, `--wine: #6e1417`, `--night: #1a1917`.
- **Гарнитуры:** Playfair Display (мастхед, заголовки, кнопки), Old Standard TT (надзаголовки капсом), PT Serif (основной текст). Один запрос к Google Fonts, `display=swap`, подмножества `cyrillic` + `latin`.
- **Mobile-first.** Колонка `max-width: 620px`. Не более двух брейкпоинтов.
- **Страница обязана оставаться осмысленной с отключённым JavaScript.**
- **Коммиты — да, push — только по явному разрешению заказчика.** Ни одна задача этого плана не делает `git push`.
- **Тексты копируются из спеки дословно.** Не переписывать, не «улучшать», не исправлять пунктуацию.

---

## Файловая структура

| Файл | Ответственность |
|---|---|
| `index.html` | Вся разметка и весь текст: 11 секций, мета-теги, Open Graph |
| `styles.css` | Токены палитры, типографика, бумажная текстура, ритм секций, все компоненты |
| `countdown.js` | Чистые функции отсчёта (`pluralRu`, `breakdown`) + слой обновления DOM |
| `tests.html` | Браузерный прогон тестов чистых функций из `countdown.js` |
| `assets/cover.jpg` | Фото на обложку, 960×1280 |
| `assets/outro.jpg` | Фото в завершение, 960×1280 |
| `assets/venue.webp` | Фасад дома Пушкина, 1600×800 |
| `assets/venue.jpg` | Запасной формат для `<picture>` |
| `assets/og-preview.jpg` | Превью ссылки для мессенджеров, 1200×630 |
| `.nojekyll` | Отключает обработку Jekyll на GitHub Pages |

Разделение по ответственности, а не по слоям: весь текст живёт в одном файле, потому что править его будут целиком и редко. `countdown.js` отделён от разметки, потому что это единственный код с логикой, и только он поддаётся автотестам.

**Порядок задач:** 1 → 2 → 3 → 4 → 5 → 6. Задача 4 (таймер) не зависит от 3 и может идти параллельно, если исполнителей несколько.

---

### Task 1: Чистка репозитория и подготовка ассетов

Убрать COCOMO, перенести и пережать фотографии, создать каркас каталогов. Отдельная задача, потому что рецензент может принять или отклонить чистку независимо от вёрстки, а все последующие задачи опираются на готовые пути к картинкам.

**Files:**
- Delete: `index.html`, `index.js`, `cocomo2.js` (файлы COCOMO, уже удалены в рабочей копии — нужно закоммитить удаление)
- Delete: `screnshots/` (референс, в продакшене не нужен), `photos/` (после переноса)
- Create: `assets/cover.jpg`, `assets/outro.jpg`, `assets/venue.jpg`, `assets/venue.webp`, `.nojekyll`

**Interfaces:**
- Consumes: ничего
- Produces: пути `assets/cover.jpg`, `assets/outro.jpg`, `assets/venue.jpg`, `assets/venue.webp` — на них ссылаются задачи 2, 3 и 5

- [ ] **Step 1: Убедиться, что исходники на месте**

```bash
cd /Users/dan/Documents/xeoza.github.io
ls -la photos/
```

Ожидается четыре файла: `photo_2026-09-09 11.42.30.jpeg` (76 КБ), `photo_2026-09-09 11.42.37.jpeg` (96 КБ), `Пушкина.jpg copy.jpg` (1.7 МБ), `Пушкина.jpg.webp` (344 КБ). Если файлов нет — остановиться и сообщить заказчику, дальше идти нельзя.

- [ ] **Step 2: Создать каталог assets и перенести портреты без изменений**

Портреты уже чёрно-белые, 960×1280, весят 76 и 96 КБ — пережимать их незачем, это только испортит качество.

```bash
cd /Users/dan/Documents/xeoza.github.io
mkdir -p assets
cp "photos/photo_2026-09-09 11.42.30.jpeg" assets/cover.jpg
cp "photos/photo_2026-09-09 11.42.37.jpeg" assets/outro.jpg
```

- [ ] **Step 3: Пережать фото площадки**

Исходный JPEG весит 1.7 МБ при разрешении 1600×800 — это в восемь раз больше необходимого.

```bash
cd /Users/dan/Documents/xeoza.github.io
sips -s format jpeg -s formatOptions 72 "photos/Пушкина.jpg copy.jpg" --out assets/venue.jpg
cp "photos/Пушкина.jpg.webp" assets/venue.webp
```

- [ ] **Step 4: Проверить веса**

```bash
cd /Users/dan/Documents/xeoza.github.io
ls -la assets/
```

Ожидается: `venue.jpg` ≤ 200 КБ, `venue.webp` ≤ 150 КБ, `cover.jpg` ≈ 76 КБ, `outro.jpg` ≈ 96 КБ.

Если `venue.jpg` вышел больше 200 КБ — повторить Step 3 с `formatOptions 60`. Если `venue.webp` больше 150 КБ — пережать: `sips -s format webp -s formatOptions 65 assets/venue.jpg --out assets/venue.webp`.

- [ ] **Step 5: Удалить COCOMO, референсы и исходники фото**

```bash
cd /Users/dan/Documents/xeoza.github.io
git rm --cached -q index.js cocomo2.js index.html 2>/dev/null || true
rm -f index.js cocomo2.js index.html
rm -rf screnshots photos
touch .nojekyll
```

- [ ] **Step 6: Проверить состояние репозитория**

```bash
cd /Users/dan/Documents/xeoza.github.io
git status --short
ls -la
```

Ожидается: в корне остались `README.md`, `task.md`, `.gitignore`, `.nojekyll`, `assets/`, `docs/`. Каталогов `photos/` и `screnshots/` нет. В `git status` — удаление трёх файлов COCOMO и новые `assets/`, `.nojekyll`.

- [ ] **Step 7: Коммит**

```bash
cd /Users/dan/Documents/xeoza.github.io
git add -A
git commit -m "$(cat <<'EOF'
Подготовлены ассеты, удалён калькулятор COCOMO

Фотографии перенесены в assets/ с латинскими именами, фото площадки
пережато с 1.7 МБ до приемлемого веса. Файлы COCOMO удалены — корень
занимает свадебное приглашение. Добавлен .nojekyll.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Каркас страницы, дизайн-система, обложка

Создать `index.html` и `styles.css` с полной дизайн-системой и первой секцией. Отдельная задача, потому что дизайн-система — это фундамент: если рецензент забракует палитру или ритм, переделывать придётся только эту задачу, а не все секции разом.

**Files:**
- Create: `index.html`
- Create: `styles.css`

**Interfaces:**
- Consumes: `assets/cover.jpg` из Task 1
- Produces: CSS-классы, на которые опираются задачи 3, 4 и 5 — `.section`, `.section--alt`, `.section--night`, `.wrap`, `.masthead`, `.rule`, `.rule--thick`, `.kicker`, `.headline`, `.h2`, `.body-text`, `.btn`, `.photo`; CSS-переменные из раздела Global Constraints

- [ ] **Step 1: Создать styles.css**

```css
/* ---------- Токены ---------- */
:root {
  --paper: #e9e7e2;
  --paper-alt: #dcd9d3;
  --ink: #111;
  --ink-soft: #3a3a3a;
  --wine: #6e1417;
  --night: #1a1917;

  --col: 620px;
  --pad: 22px;

  --font-display: "Playfair Display", Georgia, serif;
  --font-caps: "Old Standard TT", Georgia, serif;
  --font-body: "PT Serif", Georgia, serif;

  /* Бумажная текстура: инлайновый SVG, ноль сетевых запросов */
  --grain: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
}

/* ---------- База ---------- */
*, *::before, *::after { box-sizing: border-box; }

html { -webkit-text-size-adjust: 100%; }

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink-soft);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.55;
}

img { max-width: 100%; display: block; }

/* ---------- Секции и ритм ---------- */
.section {
  background-color: var(--paper);
  background-image: var(--grain);
  padding: 46px 0;
}

.section--alt { background-color: var(--paper-alt); }

.section--night {
  background-color: var(--night);
  color: #ddd6cc;
}

.wrap {
  max-width: var(--col);
  margin: 0 auto;
  padding: 0 var(--pad);
}

/* ---------- Линейки ---------- */
.rule {
  border: 0;
  border-top: 1px solid var(--ink);
  margin: 16px 0;
}

.rule--thick {
  border-top-width: 3px;
  margin-bottom: 4px;
}

.rule--tight { margin: 6px 0 16px; }

.section--night .rule { border-top-color: #6b645a; }

/* ---------- Типографика ---------- */
.masthead {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(34px, 11vw, 60px);
  line-height: 1.02;
  text-align: center;
  color: var(--ink);
  margin: 0 0 14px;
}

.kicker {
  font-family: var(--font-caps);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-align: center;
  color: var(--ink);
  margin: 0;
}

.dateline {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-family: var(--font-caps);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink);
}

.headline {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(26px, 8vw, 38px);
  line-height: 1.14;
  text-align: center;
  color: var(--ink);
  margin: 0;
}

.h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(28px, 9vw, 42px);
  line-height: 1.08;
  text-align: center;
  color: var(--ink);
  margin: 0 0 4px;
}

.section--night .h2 { color: #f2ece2; }

.body-text {
  text-align: center;
  margin: 0;
  color: var(--ink-soft);
}

.section--night .body-text { color: #c8c0b5; }

/* ---------- Кнопка ---------- */
.btn {
  display: block;
  width: 100%;
  max-width: 320px;
  margin: 22px auto 0;
  padding: 14px 18px;
  background: var(--wine);
  color: #f4ece6;
  font-family: var(--font-display);
  font-size: 18px;
  letter-spacing: 0.02em;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.btn:hover, .btn:focus-visible { background: #56100f; }

.btn:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }

/* ---------- Фотографии ---------- */
.photo { margin: 26px 0 0; }

.photo img { width: 100%; height: auto; }

.photo figcaption {
  font-family: var(--font-caps);
  font-size: 13px;
  text-align: center;
  color: var(--ink-soft);
  margin-top: 10px;
}

/* ---------- Плавное появление ---------- */
@media (prefers-reduced-motion: no-preference) {
  .section { animation: rise 0.5s ease both; }
  @keyframes rise {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: none; }
  }
}

/* ---------- Десктоп ---------- */
@media (min-width: 720px) {
  body { font-size: 17px; }
  .section { padding: 64px 0; }
  :root { --pad: 32px; }
}
```

- [ ] **Step 2: Создать index.html с каркасом и обложкой**

Мета-теги Open Graph заполняются полностью уже здесь — картинка `assets/og-preview.jpg` появится в Task 6, до тех пор ссылка будет битой, и это нормально: страница от этого не ломается.

```html
<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Данила &amp; Анастасия — 9 октября 2026</title>
<meta name="description" content="Приглашение на свадьбу Данилы и Анастасии. 9 октября 2026 года, дом Пушкина, Москва.">

<meta property="og:type" content="website">
<meta property="og:url" content="https://xeoza.github.io/">
<meta property="og:title" content="Данила &amp; Анастасия · 9 октября 2026">
<meta property="og:description" content="Приглашаем вас стать частью нашего знаменательного события — торжественной церемонии в доме Пушкина.">
<meta property="og:image" content="https://xeoza.github.io/assets/og-preview.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Old+Standard+TT:wght@400;700&family=PT+Serif:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>

<!-- 1. Обложка -->
<section class="section">
  <div class="wrap">
    <h1 class="masthead">Свадебный Вестник</h1>
    <hr class="rule rule--thick">
    <hr class="rule rule--tight">
    <p class="dateline"><span>Приглашение на свадьбу</span><span>09 октября 2026</span></p>
    <hr class="rule">
    <p class="headline">ДАНИЛА &amp; АНАСТАСИЯ<br>ЖЕНЯТСЯ!</p>
    <hr class="rule">
    <p class="kicker">Главная свадьба года</p>
    <figure class="photo">
      <img src="assets/cover.jpg" width="960" height="1280"
           alt="Данила и Анастасия складывают руки сердечком">
    </figure>
  </div>
</section>

</body>
</html>
```

- [ ] **Step 3: Открыть страницу и проверить обложку**

```bash
cd /Users/dan/Documents/xeoza.github.io
open index.html
```

Проверить глазами:
- мастхед «Свадебный Вестник» набран Playfair Display жирным, помещается в одну строку на ширине окна 390 px
- под мастхедом парная линейка: толстая 3 px, под ней тонкая 1 px
- «Приглашение на свадьбу» слева, «09 октября 2026» справа, обе капсом с разрядкой
- фон — светлая бумага с еле заметным зерном, не плоская заливка
- фото загрузилось и занимает всю ширину колонки

- [ ] **Step 4: Проверить на узком экране**

В браузере открыть инструменты разработчика, включить эмуляцию устройства и проверить ширины 320 px и 390 px.

Ожидается: горизонтальной прокрутки нет, мастхед не вылезает за края, текст не слипается с краями экрана.

- [ ] **Step 5: Коммит**

```bash
cd /Users/dan/Documents/xeoza.github.io
git add index.html styles.css
git commit -m "$(cat <<'EOF'
Каркас страницы, дизайн-система и блок обложки

Токены палитры, бумажная текстура на инлайновом SVG, три гарнитуры
Google Fonts, ритм секций и парные линейки. Мета-теги Open Graph
для превью ссылки в мессенджерах.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Обращение, календарь, площадка, тайминг, дресс-код

Пять содержательных секций подряд. Собраны в одну задачу, потому что все они — статическая разметка по готовым классам из Task 2; дробить их дальше значило бы плодить коммиты без отдельного смысла. Календарь и тайминг требуют своих стилей — они добавляются здесь же.

**Files:**
- Modify: `index.html` (добавить секции 2–6 после секции обложки)
- Modify: `styles.css` (добавить стили календаря и тайминга)

**Interfaces:**
- Consumes: классы `.section`, `.section--alt`, `.wrap`, `.h2`, `.rule`, `.body-text`, `.btn`, `.photo`, `.kicker` из Task 2; `assets/venue.webp`, `assets/venue.jpg` из Task 1
- Produces: ничего, на что опираются следующие задачи

- [ ] **Step 1: Добавить стили календаря и тайминга в styles.css**

Дописать в конец файла, перед блоком `@media (min-width: 720px)`:

```css
/* ---------- Календарь ---------- */
.calendar {
  width: 100%;
  border-collapse: collapse;
  margin: 18px 0 0;
  font-family: var(--font-body);
}

.calendar caption {
  font-family: var(--font-display);
  font-size: 24px;
  color: var(--ink);
  padding-bottom: 12px;
}

.calendar th {
  font-family: var(--font-caps);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7d786f;
  padding: 6px 0;
}

.calendar td {
  text-align: center;
  padding: 8px 0;
  font-size: 17px;
  color: var(--ink);
}

.calendar .is-wedding {
  position: relative;
  color: var(--wine);
  font-weight: 700;
}

.calendar .is-wedding::before {
  content: "";
  position: absolute;
  inset: 50% auto auto 50%;
  width: 34px;
  height: 34px;
  transform: translate(-50%, -50%);
  border: 1.5px solid var(--wine);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}

/* ---------- Тайминг ---------- */
.timing {
  width: 100%;
  border-collapse: collapse;
  margin: 18px 0 0;
}

.timing td {
  padding: 14px 0;
  font-size: 17px;
  color: var(--ink);
  vertical-align: middle;
}

.timing td:first-child {
  text-align: left;
  padding-right: 18px;
}

.timing td:last-child {
  text-align: right;
  font-family: var(--font-display);
  font-size: 22px;
  white-space: nowrap;
  border-left: 1px solid var(--ink);
  padding-left: 18px;
  width: 92px;
}

.timing tr + tr td { border-top: 1px solid #b9b4ac; }

.note {
  margin: 24px 0 0;
  padding: 14px 16px;
  border: 1px solid var(--wine);
  color: var(--wine);
  font-size: 15px;
  text-align: center;
}
```

- [ ] **Step 2: Добавить секции 2–6 в index.html**

Вставить сразу после закрывающего `</section>` обложки:

```html
<!-- 2. Обращение -->
<section class="section section--alt">
  <div class="wrap">
    <h2 class="h2">Дорогие близкие!</h2>
    <hr class="rule">
    <p class="body-text">Это официальное приглашение на нашу свадьбу! Приглашаем вас стать частью нашего знаменательного события — торжественной церемонии в доме Пушкина. После церемонии вас будет ждать вкусный ужин в ресторане недалеко от локации.</p>
    <hr class="rule">
  </div>
</section>

<!-- 3. Календарь -->
<section class="section">
  <div class="wrap">
    <table class="calendar">
      <caption>Октябрь 2026</caption>
      <thead>
        <tr><th>Пн</th><th>Вт</th><th>Ср</th><th>Чт</th><th>Пт</th><th>Сб</th><th>Вс</th></tr>
      </thead>
      <tbody>
        <tr><td></td><td></td><td></td><td>1</td><td>2</td><td>3</td><td>4</td></tr>
        <tr><td>5</td><td>6</td><td>7</td><td>8</td><td class="is-wedding">9</td><td>10</td><td>11</td></tr>
        <tr><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td></tr>
        <tr><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td></tr>
        <tr><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td></td></tr>
      </tbody>
    </table>
  </div>
</section>

<!-- 4. Площадка -->
<section class="section section--alt">
  <div class="wrap">
    <p class="headline">09 ОКТЯБРЯ 2026<br>15:00</p>
    <h2 class="h2">Место проведения</h2>
    <hr class="rule">
    <p class="body-text">Библиотека-читальня имени А.С. Пушкина<br>Спартаковская ул., 9, стр. 3<br>Москва</p>
    <hr class="rule">
    <a class="btn" href="https://yandex.ru/maps/?text=Москва, Спартаковская улица, 9с3" target="_blank" rel="noopener">Как добраться</a>
    <figure class="photo">
      <picture>
        <source srcset="assets/venue.webp" type="image/webp">
        <img src="assets/venue.jpg" width="1600" height="800"
             alt="Фасад библиотеки-читальни имени А.С. Пушкина, красной рамкой и стрелкой отмечен вход">
      </picture>
      <figcaption>Вход в библиотеку отмечен на снимке</figcaption>
    </figure>
  </div>
</section>

<!-- 5. Тайминг -->
<section class="section">
  <div class="wrap">
    <h2 class="h2">Тайминг</h2>
    <hr class="rule">
    <table class="timing">
      <tbody>
        <tr><td>Сбор гостей у входа</td><td>14:45</td></tr>
        <tr><td>Церемония регистрации</td><td>15:00</td></tr>
        <tr><td>Ужин в ресторане</td><td>—</td></tr>
        <tr><td>Завершение вечера</td><td>20:00</td></tr>
      </tbody>
    </table>
    <p class="note">Просьба не опаздывать — церемония длится всего 10 минут</p>
  </div>
</section>

<!-- 6. Дресс-код -->
<section class="section section--alt">
  <div class="wrap">
    <h2 class="h2">Дресс-код</h2>
    <hr class="rule">
    <p class="body-text">Мы очень ждём и готовимся к нашему незабываемому дню! Поддержите нас вашими улыбками и объятиями, а также красивыми вечерними нарядами.</p>
    <hr class="rule">
  </div>
</section>
```

- [ ] **Step 3: Проверить страницу в браузере**

```bash
cd /Users/dan/Documents/xeoza.github.io
open index.html
```

Проверить глазами:
- секции чередуются по фону: обложка светлая, обращение темнее, календарь светлый, площадка темнее, тайминг светлый, дресс-код темнее
- в календаре 9 октября стоит в колонке «Пт», обведено бордовым сердечком, само число бордовое
- 1 октября стоит в колонке «Чт», последняя строка заканчивается 31-м в субботу
- в тайминге время отделено вертикальной линейкой, строки разделены горизонтальными
- у строки «Ужин в ресторане» вместо времени прочерк
- бордовая рамка вокруг «Просьба не опаздывать»
- фото площадки загрузилось, стрелка «ВХОД» видна

- [ ] **Step 4: Проверить ссылку на карты**

Кликнуть кнопку «Как добраться». Ожидается: открывается новая вкладка Яндекс.Карт с точкой на Спартаковской улице, 9с3.

- [ ] **Step 5: Коммит**

```bash
cd /Users/dan/Documents/xeoza.github.io
git add index.html styles.css
git commit -m "$(cat <<'EOF'
Блоки обращения, календаря, площадки, тайминга и дресс-кода

Календарь октября 2026 с отметкой на 9-м числе, тайминг с разделителем
и просьбой не опаздывать, фото площадки через picture с webp.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Обратный отсчёт

Единственный код с логикой на всём сайте — пишется через TDD. Отдельная задача, потому что здесь есть настоящие автотесты и рецензент оценивает их отдельно от вёрстки.

**Files:**
- Create: `countdown.js`
- Create: `tests.html`
- Modify: `index.html` (добавить секцию 7 и подключить скрипт)
- Modify: `styles.css` (добавить стили таймера)

**Interfaces:**
- Consumes: классы `.section--night`, `.wrap`, `.h2`, `.rule` из Task 2
- Produces:
  - `pluralRu(n, forms)` → `string`, где `n: number`, `forms: [one, few, many]`
  - `breakdown(msLeft)` → `{days, hours, minutes, seconds}` или `null`, если `msLeft <= 0`
  - `WEDDING_MS = 1791547200000` — целевой момент в миллисекундах epoch

- [ ] **Step 1: Написать падающие тесты**

Создать `tests.html`:

```html
<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<title>Тесты обратного отсчёта</title>
<style>
  body { font: 14px/1.6 ui-monospace, Menlo, monospace; padding: 24px; background: #14150f; color: #ddd; }
  h1 { font-size: 17px; }
  .pass { color: #7dc46f; }
  .fail { color: #ef6a5c; font-weight: 700; }
  #summary { margin-top: 18px; padding-top: 12px; border-top: 1px solid #444; font-size: 15px; }
</style>
</head>
<body>
<h1>Тесты обратного отсчёта</h1>
<div id="out"></div>
<div id="summary"></div>

<script src="countdown.js"></script>
<script>
var passed = 0, failed = 0;
var out = document.getElementById('out');

function check(name, actual, expected) {
  var ok = JSON.stringify(actual) === JSON.stringify(expected);
  var line = document.createElement('div');
  line.className = ok ? 'pass' : 'fail';
  line.textContent = (ok ? '✓ ' : '✗ ') + name +
    (ok ? '' : '  — получено ' + JSON.stringify(actual) + ', ожидалось ' + JSON.stringify(expected));
  out.appendChild(line);
  ok ? passed++ : failed++;
}

var D = ['день', 'дня', 'дней'];
var H = ['час', 'часа', 'часов'];
var M = ['минута', 'минуты', 'минут'];

/* --- склонение числительных --- */
check('pluralRu 0',   pluralRu(0, D),   'дней');
check('pluralRu 1',   pluralRu(1, D),   'день');
check('pluralRu 2',   pluralRu(2, D),   'дня');
check('pluralRu 5',   pluralRu(5, D),   'дней');
check('pluralRu 11',  pluralRu(11, D),  'дней');
check('pluralRu 12',  pluralRu(12, D),  'дней');
check('pluralRu 14',  pluralRu(14, D),  'дней');
check('pluralRu 21',  pluralRu(21, D),  'день');
check('pluralRu 22',  pluralRu(22, D),  'дня');
check('pluralRu 25',  pluralRu(25, D),  'дней');
check('pluralRu 101', pluralRu(101, D), 'день');
check('pluralRu 111', pluralRu(111, D), 'дней');
check('pluralRu 1 час',    pluralRu(1, H),  'час');
check('pluralRu 2 часа',   pluralRu(2, H),  'часа');
check('pluralRu 21 минута', pluralRu(21, M), 'минута');
check('pluralRu 25 минут',  pluralRu(25, M), 'минут');

/* --- разбор остатка --- */
check('breakdown за сутки',  breakdown(86400000), {days: 1, hours: 0, minutes: 0, seconds: 0});
check('breakdown за час',    breakdown(3600000),  {days: 0, hours: 1, minutes: 0, seconds: 0});
check('breakdown за минуту', breakdown(60000),    {days: 0, hours: 0, minutes: 1, seconds: 0});
check('breakdown за секунду', breakdown(1000),    {days: 0, hours: 0, minutes: 0, seconds: 1});
check('breakdown смешанный', breakdown(90061000), {days: 1, hours: 1, minutes: 1, seconds: 1});
check('breakdown ровно в момент', breakdown(0),   null);
check('breakdown после',     breakdown(-1000),    null);

/* --- целевая дата --- */
check('WEDDING_MS константа', WEDDING_MS, 1791547200000);
check('WEDDING_MS равен разбору строки со смещением МСК',
      Date.parse('2026-10-09T15:00:00+03:00'), WEDDING_MS);

var s = document.getElementById('summary');
s.textContent = 'Пройдено: ' + passed + ', провалено: ' + failed;
s.className = failed ? 'fail' : 'pass';
</script>
</body>
</html>
```

- [ ] **Step 2: Запустить тесты и убедиться, что они падают**

```bash
cd /Users/dan/Documents/xeoza.github.io
open tests.html
```

Ожидается: страница в ошибках, в консоли браузера `countdown.js` не найден (файла ещё нет), либо `pluralRu is not defined`. Это правильное состояние — тесты написаны раньше кода.

- [ ] **Step 3: Написать countdown.js**

```js
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
```

- [ ] **Step 4: Запустить тесты и убедиться, что они проходят**

```bash
cd /Users/dan/Documents/xeoza.github.io
open tests.html
```

Ожидается: все строки зелёные, внизу «Пройдено: 25, провалено: 0».

Если какой-то тест красный — читать сообщение, оно печатает полученное и ожидаемое значение. Не править тест под реализацию; править реализацию.

- [ ] **Step 5: Добавить стили таймера в styles.css**

Дописать перед блоком `@media (min-width: 720px)`:

```css
/* ---------- Таймер ---------- */
.countdown {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin: 22px 0 0;
}

.countdown-cell {
  flex: 1 1 0;
  text-align: center;
}

.countdown-num {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(28px, 9vw, 40px);
  line-height: 1.1;
  color: #f2ece2;
}

.countdown-label {
  display: block;
  font-family: var(--font-caps);
  font-size: 12px;
  letter-spacing: 0.06em;
  color: #b0a89c;
  margin-top: 4px;
}

.countdown-fallback,
.countdown-done {
  font-family: var(--font-display);
  font-size: 24px;
  line-height: 1.3;
  text-align: center;
  color: #f2ece2;
  margin: 0;
}
```

- [ ] **Step 6: Добавить секцию 7 в index.html и подключить скрипт**

Вставить после секции дресс-кода:

```html
<!-- 7. Таймер -->
<section class="section section--night">
  <div class="wrap">
    <h2 class="h2">До свадьбы осталось</h2>
    <hr class="rule">
    <div class="countdown" id="countdown" aria-live="off">
      <p class="countdown-fallback">9 октября 2026, 15:00</p>
    </div>
    <hr class="rule">
  </div>
</section>
```

Перед закрывающим `</body>` добавить:

```html
<script src="countdown.js"></script>
```

Статическая дата внутри `#countdown` — это запасной вариант: если JavaScript отключён или скрипт не загрузился, гость увидит дату вместо пустоты. Скрипт затирает её при первом же вызове `render()`.

- [ ] **Step 7: Проверить таймер в браузере**

```bash
cd /Users/dan/Documents/xeoza.github.io
open index.html
```

Проверить глазами:
- секция тёмная, выделяется среди светлых
- четыре колонки с числами, подписи под ними согласованы с числом («1 день», а не «1 дней»)
- секунды тикают раз в секунду
- подписи меняют форму при смене числа — понаблюдать за секундами при переходе через 21, 22, 25

- [ ] **Step 8: Проверить работу с отключённым JavaScript**

В браузере отключить JavaScript (Chrome: DevTools → Settings → Debugger → Disable JavaScript), перезагрузить страницу.

Ожидается: вместо цифр в тёмной секции стоит «9 октября 2026, 15:00». Остальная страница выглядит без изменений. Включить JavaScript обратно.

- [ ] **Step 9: Проверить состояние после свадьбы**

Временно изменить константу в `countdown.js` на момент в прошлом:

```bash
cd /Users/dan/Documents/xeoza.github.io
sed -i '' 's/var WEDDING_MS = 1791547200000;/var WEDDING_MS = 1000000000000;/' countdown.js
open index.html
```

Ожидается: вместо цифр «Мы поженились! Спасибо, что были с нами». Вернуть константу:

```bash
cd /Users/dan/Documents/xeoza.github.io
sed -i '' 's/var WEDDING_MS = 1000000000000;/var WEDDING_MS = 1791547200000;/' countdown.js
grep -n "WEDDING_MS = " countdown.js
```

Ожидается: `var WEDDING_MS = 1791547200000;` — убедиться, что константа восстановлена, прежде чем коммитить.

- [ ] **Step 10: Коммит**

```bash
cd /Users/dan/Documents/xeoza.github.io
git add countdown.js tests.html index.html styles.css
git commit -m "$(cat <<'EOF'
Обратный отсчёт с правильным склонением числительных

Чистые функции pluralRu и breakdown покрыты 25 тестами в tests.html.
Числа 11-14 берут форму множественного числа. После свадьбы блок
показывает поздравление вместо отрицательных значений. Без JS
остаётся статическая дата.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Ограничения, контакты, анкета гостя, завершение

Четыре финальные секции. Собраны вместе по той же причине, что и в Task 3 — статическая разметка по готовым классам.

**Files:**
- Modify: `index.html` (добавить секции 8–11 перед `<script>`)
- Modify: `styles.css` (добавить стили списка ограничений и контактов)

**Interfaces:**
- Consumes: классы из Task 2; `assets/outro.jpg` из Task 1
- Produces: ничего

- [ ] **Step 1: Добавить стили в styles.css**

Дописать перед блоком `@media (min-width: 720px)`:

```css
/* ---------- Список ограничений ---------- */
.rules {
  margin: 18px 0 0;
  padding-left: 22px;
  color: var(--ink-soft);
}

.rules li { margin-bottom: 12px; }

.rules li:last-child { margin-bottom: 0; }

.parking {
  margin: 20px 0 0;
  padding-top: 16px;
  border-top: 1px solid #b9b4ac;
  text-align: center;
  font-size: 15px;
}

/* ---------- Контакты и анкета ---------- */
.contact-name {
  font-family: var(--font-caps);
  font-size: 15px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-align: center;
  margin: 18px 0 4px;
  color: var(--ink);
}

.contact-phone {
  font-family: var(--font-display);
  font-size: clamp(24px, 7vw, 30px);
  text-align: center;
  margin: 0;
  color: var(--ink);
}

.deadline {
  font-family: var(--font-display);
  font-size: clamp(24px, 7vw, 32px);
  letter-spacing: 0.02em;
  text-align: center;
  margin: 20px 0 0;
  color: var(--ink);
}

.btn + .btn { margin-top: 12px; }

.signature {
  font-family: var(--font-display);
  font-size: clamp(22px, 6.5vw, 30px);
  text-align: center;
  margin: 0;
  color: var(--ink);
}
```

- [ ] **Step 2: Добавить секции 8–11 в index.html**

Вставить после секции таймера, перед `<script src="countdown.js"></script>`:

```html
<!-- 8. Ограничения -->
<section class="section">
  <div class="wrap">
    <h2 class="h2">Ограничения</h2>
    <hr class="rule">
    <ul class="rules">
      <li>На территории запрещается распитие алкогольных напитков.</li>
      <li>Запрещена церемония «битья бокалов и фужеров на счастье».</li>
      <li>Запрещено использование в поздравлении монет, риса, хлопушек, конфетти, лепестков цветов.</li>
    </ul>
    <p class="parking">Автомобиль можно оставить на ближайшей платной городской парковке.</p>
  </div>
</section>

<!-- 9. Контакты -->
<section class="section section--alt">
  <div class="wrap">
    <h2 class="h2">Контакты</h2>
    <hr class="rule">
    <p class="body-text">По всем вопросам, связанным с мероприятием, вы можете обратиться к нам.</p>
    <p class="contact-name">Данила</p>
    <p class="contact-phone">+7 933 277-42-29</p>
    <a class="btn" href="tel:+79332774229">Позвонить</a>
  </div>
</section>

<!-- 10. Анкета гостя -->
<section class="section">
  <div class="wrap">
    <h2 class="h2">Анкета гостя</h2>
    <hr class="rule">
    <p class="body-text">Пожалуйста, подтвердите своё присутствие до:</p>
    <p class="deadline">16 СЕНТЯБРЯ 2026</p>
    <a class="btn" href="https://t.me/xeoza" target="_blank" rel="noopener">Написать Даниле</a>
    <a class="btn" href="https://t.me/prodnasty" target="_blank" rel="noopener">Написать Анастасии</a>
  </div>
</section>

<!-- 11. Завершение -->
<section class="section section--alt">
  <div class="wrap">
    <h2 class="h2">До скорой встречи!</h2>
    <hr class="rule">
    <p class="kicker">С любовью</p>
    <hr class="rule">
    <p class="signature">ДАНИЛА &amp; АНАСТАСИЯ</p>
    <figure class="photo">
      <img src="assets/outro.jpg" width="960" height="1280"
           alt="Данила и Анастасия, он поправляет ей шляпу">
    </figure>
  </div>
</section>
```

- [ ] **Step 3: Проверить страницу в браузере**

```bash
cd /Users/dan/Documents/xeoza.github.io
open index.html
```

Проверить глазами:
- три пункта ограничений маркированным списком, парковка отделена линейкой
- имя «ДАНИЛА» капсом с разрядкой, под ним телефон крупно
- в анкете две бордовые кнопки друг под другом с зазором
- дата дедлайна «16 СЕНТЯБРЯ 2026» крупно
- в завершении фото загрузилось, подпись «ДАНИЛА & АНАСТАСИЯ» над ним
- чередование фонов не сбилось: ограничения светлые, контакты темнее, анкета светлая, завершение темнее

- [ ] **Step 4: Проверить все ссылки**

Кликнуть по очереди и убедиться:
- «Позвонить» — открывается диалог набора номера +79332774229
- «Написать Даниле» — открывается Telegram на чате `t.me/xeoza`
- «Написать Анастасии» — открывается Telegram на чате `t.me/prodnasty`

- [ ] **Step 5: Проверить доступность с клавиатуры**

Нажимать Tab от начала страницы. Ожидается: фокус последовательно проходит по четырём ссылкам-кнопкам («Как добраться», «Позвонить», «Написать Даниле», «Написать Анастасии»), у каждой видна тёмная рамка фокуса.

- [ ] **Step 6: Коммит**

```bash
cd /Users/dan/Documents/xeoza.github.io
git add index.html styles.css
git commit -m "$(cat <<'EOF'
Блоки ограничений, контактов, анкеты гостя и завершения

Подтверждение присутствия — две ссылки на личные чаты Telegram,
контактный телефон кликабелен через tel:.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Превью ссылки, финальная проверка, подготовка к публикации

Собрать картинку для превью в мессенджерах и прогнать сквозную проверку всей страницы. Отдельная задача, потому что превью можно оценить только на собранном сайте, а финальная проверка — это самостоятельный результат, который рецензент принимает или отклоняет.

**Files:**
- Create: `assets/og-preview.jpg`
- Create: `og-source.html` (временный, удаляется в конце задачи)
- Modify: `README.md`

**Interfaces:**
- Consumes: всё из задач 1–5
- Produces: готовый к публикации сайт

- [ ] **Step 1: Сверстать исходник превью**

Создать временный файл `og-source.html` в корне:

```html
<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<title>Исходник превью</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Old+Standard+TT&display=swap" rel="stylesheet">
<style>
  body { margin: 0; }
  .og {
    width: 1200px; height: 630px;
    background: #e9e7e2;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
    display: flex; align-items: center; gap: 46px;
    padding: 0 60px; box-sizing: border-box;
  }
  .txt { flex: 1; }
  .mast {
    font-family: "Playfair Display", serif; font-weight: 700;
    font-size: 60px; line-height: 1.02; color: #111; margin: 0 0 18px;
  }
  .r3 { border: 0; border-top: 4px solid #111; margin: 0 0 5px; }
  .r1 { border: 0; border-top: 1px solid #111; margin: 0 0 22px; }
  .names {
    font-family: "Playfair Display", serif; font-size: 46px;
    line-height: 1.14; color: #111; margin: 0 0 20px;
  }
  .date {
    font-family: "Old Standard TT", serif; font-size: 22px;
    letter-spacing: 0.16em; text-transform: uppercase; color: #3a3a3a; margin: 0;
  }
  .pic { width: 360px; height: 480px; object-fit: cover; }
</style>
</head>
<body>
<div class="og">
  <div class="txt">
    <p class="mast">Свадебный Вестник</p>
    <hr class="r3"><hr class="r1">
    <p class="names">ДАНИЛА &amp; АНАСТАСИЯ<br>ЖЕНЯТСЯ!</p>
    <p class="date">09 октября 2026 · Москва</p>
  </div>
  <img class="pic" src="assets/cover.jpg" alt="">
</div>
</body>
</html>
```

- [ ] **Step 2: Снять скриншот превью**

```bash
cd /Users/dan/Documents/xeoza.github.io
open og-source.html
```

Снять скриншот области ровно 1200×630 (macOS: Cmd+Shift+4, при выделении зажать пробел для перемещения рамки; размер показывается рядом с курсором). Сохранить на рабочий стол.

Альтернатива, если ручной скриншот не даёт точный размер — снять любой скриншот блока и привести к нужному размеру:

```bash
cd /Users/dan/Documents/xeoza.github.io
sips -z 630 1200 ~/Desktop/og-raw.png --out assets/og-preview.jpg -s format jpeg -s formatOptions 82
```

- [ ] **Step 3: Проверить превью**

```bash
cd /Users/dan/Documents/xeoza.github.io
sips -g pixelWidth -g pixelHeight assets/og-preview.jpg
ls -la assets/og-preview.jpg
```

Ожидается: ровно 1200×630, вес ≤ 250 КБ.

- [ ] **Step 4: Удалить временный исходник**

```bash
cd /Users/dan/Documents/xeoza.github.io
rm -f og-source.html
```

- [ ] **Step 5: Прогнать тесты ещё раз**

```bash
cd /Users/dan/Documents/xeoza.github.io
open tests.html
```

Ожидается: «Пройдено: 25, провалено: 0».

- [ ] **Step 6: Сквозная проверка вёрстки на четырёх ширинах**

```bash
cd /Users/dan/Documents/xeoza.github.io
open index.html
```

В инструментах разработчика проверить ширины 320, 390, 768 и 1440 px. На каждой:
- горизонтальной прокрутки нет
- ни один заголовок не выходит за края
- все три фотографии на месте
- чередование фонов идёт без сбоев по всем 11 секциям

- [ ] **Step 7: Посчитать итоговый вес страницы**

```bash
cd /Users/dan/Documents/xeoza.github.io
du -ch index.html styles.css countdown.js assets/cover.jpg assets/outro.jpg assets/venue.webp | tail -1
```

Ожидается: не больше 400 КБ без учёта шрифтов. Если больше — пережать `venue.webp` сильнее.

- [ ] **Step 8: Обновить README**

Заменить содержимое `README.md`:

```markdown
# xeoza.github.io

Приглашение на свадьбу Данилы и Анастасии — 9 октября 2026 года.

**Сайт:** https://xeoza.github.io/

## Структура

| Файл | Назначение |
|---|---|
| `index.html` | Вся разметка и весь текст приглашения |
| `styles.css` | Оформление |
| `countdown.js` | Обратный отсчёт до церемонии |
| `tests.html` | Тесты отсчёта — открыть в браузере |
| `assets/` | Фотографии и превью ссылки |

Сборки нет: что лежит в репозитории, то и отдаётся браузеру.

## Как править

Тексты — прямо в `index.html`. После правки открыть файл в браузере и посмотреть.

## Тесты

Открыть `tests.html` в браузере. Внизу страницы — количество пройденных
и проваленных проверок.

## Что осталось уточнить

- Ресторан не выбран: в блоке «Тайминг» у строки «Ужин в ресторане» стоит
  прочерк вместо времени. Когда определится — добавить блок между
  «Тайминг» и «Дресс-код».

## Документы

- [Дизайн-документ](docs/superpowers/specs/2026-09-09-wedding-invitation-design.md)
- [План реализации](docs/superpowers/plans/2026-09-09-wedding-invitation.md)
```

- [ ] **Step 9: Коммит**

```bash
cd /Users/dan/Documents/xeoza.github.io
git add assets/og-preview.jpg README.md
git commit -m "$(cat <<'EOF'
Превью ссылки для мессенджеров и обновлённый README

Картинка 1200x630 в стиле газетного фрагмента — ссылка в Telegram
и WhatsApp разворачивается открыткой, а не строкой текста.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 10: Показать заказчику итог и запросить разрешение на публикацию**

Push не делать. Сообщить заказчику:

- сайт собран, тесты проходят, вёрстка проверена на четырёх ширинах
- готово к публикации — нужен явный ответ «пушить»
- после push зайти в Settings → Pages и убедиться, что источник: `Deploy from a branch` → `master` → `/ (root)`
- превью ссылки в Telegram проверяется только после публикации: отправить себе `https://xeoza.github.io/` и посмотреть, развернулась ли открытка
- Telegram кеширует превью надолго; если картинка не появилась сразу — прогнать ссылку через `@WebpageBot`

---

## Самопроверка плана

**Покрытие спеки.** Все разделы спеки закрыты задачами: архитектурные решения — Task 1 и 2; файловая структура — Task 1; дизайн-система — Task 2; 11 секций — Task 2 (обложка), Task 3 (обращение, календарь, площадка, тайминг, дресс-код), Task 4 (таймер), Task 5 (ограничения, контакты, анкета, завершение); обратный отсчёт — Task 4; превью ссылки — Task 6; доступность — Task 2 (фокус, контраст), Task 4 (`aria-live`), Task 5 (проверка Tab); тестирование — Task 4 (автотесты), Task 6 (сквозная проверка); публикация — Task 6.

**Пробелы, найденные при самопроверке и закрытые:**

1. В спеке значилось `prefers-reduced-motion` — в Task 2 добавлено правило, отключающее анимацию появления.
2. В спеке значился `aria-live="off"` на таймере — добавлено в разметку Task 4 Step 6.
3. Спека требовала проверку «превью ссылки в Telegram» — перенесено в Task 6 Step 10 как действие после публикации, поскольку до неё проверить нечем.
4. Спека требовала удалить `photos/` — добавлено в Task 1 Step 5.

**Согласованность имён.** `pluralRu` и `breakdown` объявлены в Task 4 Step 3 и вызываются под теми же именами в тестах Task 4 Step 1 и в слое DOM. Константа `WEDDING_MS` едина. CSS-классы, объявленные в Task 2, используются в задачах 3, 4 и 5 без расхождений: `.section`, `.section--alt`, `.section--night`, `.wrap`, `.h2`, `.rule`, `.rule--thick`, `.rule--tight`, `.kicker`, `.headline`, `.dateline`, `.body-text`, `.btn`, `.photo`, `.masthead`.
