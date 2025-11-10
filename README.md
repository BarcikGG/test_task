# API для бронирования мест на мероприятия

## Краткий гайд

## Требования

- Node.js
- PostgreSQL (локально)
- npm или yarn

## Установка

1. Установка зависимостей:
```bash
yarn install
```

2. Создание `.env` в корне проекта (можно без env):
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=test_task
```

3. Перед началом необходимо создать БД `test_task`:
```bash
createdb test_task
```

## Запуск

Запуск в режиме разработки:
```bash
yarn run start:dev
```

Также нужно добавить событие:
```sql
INSERT INTO events (id, name, total_seats) 
VALUES (1, 'Тестовое мероприятие', 5);
```

Приложение будет доступно по адресу `http://localhost:8080`

## API

### POST /api/bookings/reserve

Бронирование места на мероприятие.

**Запрос:**
```json
{
  "event_id": 1,
  "user_id": "user123"
}
```

**Успешный ответ (201):**
```json
{
  "success": true,
  "booking": {
    "id": 1,
    "event_id": 1,
    "user_id": "user123",
    "created_at": "2024-01-01T12:00:00.000Z"
  }
}
```