#!/usr/bin/env python3
"""Отправляет все URL из sitemap.xml сайта в IndexNow (api.indexnow.org).

Запускается как последний шаг deploy.sh — после успешного деплоя сообщает
поисковикам (Bing, Yandex и др., поддерживающим протокол IndexNow) о полном
списке актуальных URL. Использует только стандартную библиотеку Python —
на сервере нет pip-пакетов вроде requests, и ставить их ради этого незачем.
"""
import json
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

DOMAIN = "women.an51.su"
KEY = "66f35c39e827b8428f245ca4319b50fe"


def main() -> int:
    sitemap_url = f"https://{DOMAIN}/sitemap.xml"
    try:
        with urllib.request.urlopen(sitemap_url, timeout=15) as resp:
            xml_data = resp.read()
    except Exception as e:
        print(f"IndexNow: не удалось получить {sitemap_url}: {e}", file=sys.stderr)
        return 1

    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    root = ET.fromstring(xml_data)
    urls = [el.text.strip() for el in root.findall(".//sm:loc", ns) if el.text]

    if not urls:
        print("IndexNow: sitemap.xml не содержит URL, отправка отменена.", file=sys.stderr)
        return 1

    payload = {
        "host": DOMAIN,
        "key": KEY,
        "keyLocation": f"https://{DOMAIN}/{KEY}.txt",
        "urlList": urls,
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        "https://api.indexnow.org/indexnow",
        data=data,
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            print(f"IndexNow: HTTP {resp.status}, отправлено {len(urls)} URL")
            return 0
    except urllib.error.HTTPError as e:
        body = e.read().decode(errors="replace")
        print(f"IndexNow: HTTP {e.code} — {body}", file=sys.stderr)
        return 1
    except Exception as e:
        print(f"IndexNow: ошибка запроса: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
