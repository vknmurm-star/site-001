#!/bin/bash
set -e

cd /var/www/site-001

echo "=== Сохранение локальных правок (если есть) ==="
git stash

echo "=== Обновление кода из GitHub ==="
git pull

echo "=== Восстановление локальных правок ==="
git stash pop || true

echo "=== Установка зависимостей ==="
npm install

echo "=== Сборка проекта ==="
npm run build

echo "=== Перезапуск сайта ==="
pm2 restart site-001

echo "=== Отправка в IndexNow ==="
python3 scripts/indexnow-submit.py || echo "IndexNow: отправка не удалась (не критично для деплоя)"

echo "=== Готово! ==="