Основная задача: настроить compose для успешного взаимодействия нескольких простых сервисов.

Критерии выполнения:

1. Сделать форк этого репозитория и опубликовать там решение.

1. Compose файл должен описывать четыре сервиса (подробности ниже).

1. При запуске (`docker-compose up --build`) и открытии в браузере страницы по опубликованному сервисом proxy порту, виден успешный ответ - 1 - OK

1. Для выполнения задания в общем случае понадобится два новых файла: docker-compose.yml и файл с конфигурацией прокси, напр., haproxy.cfg 

## Описание сервисов:

### postgresql

Сервис должен при запуске инициализировать бд и таблицы из локально хранимого sql.

См. файл `initdb/01-all.sql`

### api

PostgREST - сервис, который превращает любой postgres в удобный REST API.
Мы его используем как пример бэкенда и источник данных для frontend. 

[PostgREST 9.0.0 documentation](https://postgrest.org/en/stable/)

### proxy

Поднять любой известный тебе прокси (напр. nginx, haproxy) для проксирования запросов извне к сервисам frontend и api. 
Это должен быть единственный сервис с опубликованным портом.

Настроить так, чтобы по адресу /api/ выдавался ответ от PostgREST (http://api:3000).  
(`{"swagger":"2.0","info":{"version":"9.0.0"...`)

### frontend 

Обращается к `/api/`, чтобы получить данные. 
Как следствие, обращения к /api должны проксироваться в апи-сервис.

В директории frontend находится готовый к сборке проект. Его достаточно описать так:

```
frontend:
    build:
      context: './frontend'
```

## Рекомендации

* Пароли не должны находиться в docker-compose.yml

Схема взаимодействия сервисов между собой:
```
[frontend] ↔ [proxy] ↔ [api] ↔ [postgres]
```
