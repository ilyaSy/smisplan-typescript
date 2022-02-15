# SMISplan (+ TypeScript)
[SMISplan](https://ilyasy.github.io/smisplan-typescript/)

## Что это ?
SMISplan - стандартный трекер задач (issue tracker), сделанный для внутренней работы. Данная версия является
адаптацией закрытого репозитория для просмотра, а также с имитацией (вместо оригинального: Perl + MySQL) backend.

Архитектура полностью изменена. Проект переписан с использованием TypeScript.

## Основные возможности
* Добавление, редактирование, удаление данных

* Добавление связанных данных (например, совещание по задаче)

* Показ связанных данных (например, проведённых совещаний по задаче)

* Сортировка

* Фильтрация

* Меню действий

* Строки с "редактируемыми" данными

* Изменение  отображаемых столбцов

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

## ToDo
- [x] Unit-тесты

- [x] Добавить выделение цветом по необходимости (статус, критический, ...):<br>
      ~~раскрасить таблицу по цветам статуса / критичности~~<br>
      добавлена возможность раскрашивать статусы и т.д. через тэги

- [x] "Показать совещания" по задаче:<br>
      ~~совещания отображаются как вложенная по отношению к строке таблица~~<br>
      совещания отображаются во всплывающем окне после запроса к серверу

- [x] Добавить псевдо-поле (когда поля нет в исходных данных, но определяется из одного или нескольких):<br>
      пока предполагается делать или через шаблоны или через eval(?)

- [ ] Группировка

- [ ] Адаптив

## Просмотр

* Клонировать репозиторий
```
git clone https://github.com/ilyaSy/smisplan-typescript.git
```

* Установить зависимости
```
npm install
```

* Запустить
```
npm start
```

* Для запуска тестов
```
npm run test
```

* Готовый результат на gh pages
<br>[SMISplan](https://ilyasy.github.io/smisplan-typescript/)

-----
**Автор: Сычугов Илья / Sychugov Ilya**
