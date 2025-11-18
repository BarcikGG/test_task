-- Скрипт для создания тестовых данных: 20 пользователей и бронирования

-- 1. Создаем 20 пользователей
INSERT INTO users (id) 
SELECT generate_series(1, 20)
ON CONFLICT (id) DO NOTHING;

-- 2. Создаем несколько событий (если их еще нет)
INSERT INTO events (id, name, total_seats) 
VALUES 
  (1, 'Концерт в парке', 100),
  (2, 'Театральная постановка', 50),
  (3, 'Спортивное мероприятие', 200),
  (4, 'Выставка искусств', 80),
  (5, 'Музыкальный фестиваль', 150),
  (6, 'Киносеанс', 120),
  (7, 'Лекция о науке', 60),
  (8, 'Мастер-класс по кулинарии', 30),
  (9, 'Танцевальный вечер', 90),
  (10, 'Литературный вечер', 40)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, total_seats = EXCLUDED.total_seats;

-- 3. Очищаем старые бронирования перед созданием новых
DELETE FROM bookings;

-- 4. Создаем бронирования с разными датами для тестирования периодов

-- Пользователь 1: 10 бронирований (самый активный)
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 1, NOW() - INTERVAL '2 hours'),
  (2, 1, NOW() - INTERVAL '5 hours'),
  (3, 1, NOW() - INTERVAL '1 day'),
  (4, 1, NOW() - INTERVAL '1 day' + INTERVAL '3 hours'),
  (5, 1, NOW() - INTERVAL '2 days'),
  (6, 1, NOW() - INTERVAL '3 days'),
  (7, 1, NOW() - INTERVAL '4 days'),
  (8, 1, NOW() - INTERVAL '5 days'),
  (9, 1, NOW() - INTERVAL '6 days'),
  (10, 1, NOW() - INTERVAL '7 days');

-- Пользователь 2: 10 бронирований
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 2, NOW() - INTERVAL '1 hour'),
  (2, 2, NOW() - INTERVAL '3 hours'),
  (3, 2, NOW() - INTERVAL '1 day'),
  (4, 2, NOW() - INTERVAL '2 days'),
  (5, 2, NOW() - INTERVAL '3 days'),
  (6, 2, NOW() - INTERVAL '4 days'),
  (7, 2, NOW() - INTERVAL '6 days'),
  (8, 2, NOW() - INTERVAL '8 days'),
  (9, 2, NOW() - INTERVAL '10 days'),
  (10, 2, NOW() - INTERVAL '12 days');

-- Пользователь 3: 9 бронирований
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 3, NOW() - INTERVAL '30 minutes'),
  (2, 3, NOW() - INTERVAL '2 hours'),
  (3, 3, NOW() - INTERVAL '1 day'),
  (4, 3, NOW() - INTERVAL '2 days'),
  (5, 3, NOW() - INTERVAL '4 days'),
  (6, 3, NOW() - INTERVAL '5 days'),
  (7, 3, NOW() - INTERVAL '7 days'),
  (8, 3, NOW() - INTERVAL '9 days'),
  (9, 3, NOW() - INTERVAL '14 days');

-- Пользователь 4: 8 бронирований
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 4, NOW() - INTERVAL '4 hours'),
  (2, 4, NOW() - INTERVAL '1 day'),
  (3, 4, NOW() - INTERVAL '2 days'),
  (4, 4, NOW() - INTERVAL '3 days'),
  (5, 4, NOW() - INTERVAL '5 days'),
  (6, 4, NOW() - INTERVAL '6 days'),
  (7, 4, NOW() - INTERVAL '8 days'),
  (8, 4, NOW() - INTERVAL '11 days');

-- Пользователь 5: 7 бронирований
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 5, NOW() - INTERVAL '6 hours'),
  (2, 5, NOW() - INTERVAL '1 day'),
  (3, 5, NOW() - INTERVAL '2 days'),
  (4, 5, NOW() - INTERVAL '4 days'),
  (5, 5, NOW() - INTERVAL '6 days'),
  (6, 5, NOW() - INTERVAL '7 days'),
  (7, 5, NOW() - INTERVAL '10 days');

-- Пользователь 6: 6 бронирований
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 6, NOW() - INTERVAL '8 hours'),
  (2, 6, NOW() - INTERVAL '1 day'),
  (3, 6, NOW() - INTERVAL '3 days'),
  (4, 6, NOW() - INTERVAL '5 days'),
  (5, 6, NOW() - INTERVAL '7 days'),
  (6, 6, NOW() - INTERVAL '9 days');

-- Пользователь 7: 5 бронирований
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 7, NOW() - INTERVAL '10 hours'),
  (2, 7, NOW() - INTERVAL '2 days'),
  (3, 7, NOW() - INTERVAL '4 days'),
  (4, 7, NOW() - INTERVAL '6 days'),
  (5, 7, NOW() - INTERVAL '8 days');

-- Пользователь 8: 4 бронирования
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 8, NOW() - INTERVAL '12 hours'),
  (2, 8, NOW() - INTERVAL '2 days'),
  (3, 8, NOW() - INTERVAL '4 days'),
  (4, 8, NOW() - INTERVAL '7 days');

-- Пользователь 9: 4 бронирования (равное количество с пользователем 8)
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 9, NOW() - INTERVAL '14 hours'),
  (2, 9, NOW() - INTERVAL '2 days'),
  (3, 9, NOW() - INTERVAL '5 days'),
  (4, 9, NOW() - INTERVAL '7 days');

-- Пользователь 10: 3 бронирования
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 10, NOW() - INTERVAL '1 day'),
  (2, 10, NOW() - INTERVAL '3 days'),
  (3, 10, NOW() - INTERVAL '6 days');

-- Пользователь 11: 3 бронирования
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 11, NOW() - INTERVAL '1 day'),
  (2, 11, NOW() - INTERVAL '4 days'),
  (3, 11, NOW() - INTERVAL '7 days');

-- Пользователь 12: 2 бронирования
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 12, NOW() - INTERVAL '2 days'),
  (2, 12, NOW() - INTERVAL '5 days');

-- Пользователь 13: 2 бронирования
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 13, NOW() - INTERVAL '2 days'),
  (2, 13, NOW() - INTERVAL '6 days');

-- Пользователь 14: 1 бронирование
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 14, NOW() - INTERVAL '3 days');

-- Пользователь 15: 1 бронирование
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 15, NOW() - INTERVAL '4 days');

-- Пользователь 16: 1 бронирование
INSERT INTO bookings (event_id, user_id, created_at) VALUES
  (1, 16, NOW() - INTERVAL '5 days');