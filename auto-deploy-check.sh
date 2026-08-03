#!/bin/bash
cd /var/www/site-001
git fetch origin main

LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" != "$REMOTE" ]; then
    echo "$(date): обнаружены новые изменения, деплою..." >> /var/log/site-001-autodeploy.log
    /var/www/site-001/deploy.sh >> /var/log/site-001-autodeploy.log 2>&1
fi