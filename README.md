# SMISplan (+ TypeScript)
[SMISplan](https://ilyasy.github.io/smisplan-typescript/)

## Что это ?
SMISplan - стандартный трекер задач (issue tracker), сделанный для внутренней работы. Данная версия является
адаптацией закрытого репозитория для просмотра, а также с имитацией (вместо оригинального: Perl + MySQL) backend.

Архитектура полностью изменена. Проект переписан с использованием TypeScript.

## Основные возможности
* Добавление, редактирование, удаление данных

* Добавление связанных данных (например, совещание по задаче)

* Сортировка

* Фильтрация

* Меню действий

* "Редактируемые" строки

* Изменение отображаемых столбцов

* Просмотр совещаний (событий) в календаре

* Просмотр истории изменений (лог событий)

* Экспорт в PDF

* Оповещение (требуется полноценный API)

## Основные технологии
* React

* Redux (+ Thunk)

* Javascript

* TypeScript

* Jest (+ React Testing Library)

* HTML5

* CSS3

* Ant Design ~~Material UI~~

* Axios

* Axios-mock-adapter (для имитации API)

* REST API

* Lazy Loading компоненты

## Просмотр

* Клонировать репозиторий
<br>`git clone https://github.com/ilyaSy/smisplan-typescript.git`

* Установить зависимости
<br>`npm install`

* Запустить
<br>`npm start`

* Для запуска тестов
<br>`npm run test`

* Готовый результат на gh pages
<br>[SMISplan](https://ilyasy.github.io/smisplan-typescript/)

-----
**Автор: Сычугов Илья / Sychugov Ilya**
