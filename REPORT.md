# 01 GET — базовий
Method:GET
URL:https://httpbin.org/get
Status:200
title main field:args,headers,origin,url.
# 02 GET — параметри й заголовки
 "args": {
        "category": "десерт",
        "limit": "3",
        "title": "Торт"
    },
## Де опинилися Query Parameters і заголовок?
Query Parameters передаються в URL після ? і відображаються у відповіді httpbin в полі args. Заголовки X-Lab-Topic та Accept передаються окремо й відображаються в полі headers.
## Чому GET не потребував Multipart Form?
GET передає параметри через URL, а не через тіло запиту. Multipart Form потрібен для передавання даних у Body, наприклад файлів або полів форми, тому тут він не використовується.
# 03 POST — URL-encoded form
"files": {},
 "form": {
        "category": "Фаст-фуд",
        "price": "170",
        "title": "Шаурма"
    },
    "json": null
## Чому ціна у form є рядком?
Дані з HTML-форми зазвичай передаються як текст, тому ціна приходить у вигляді рядка "170". Для обчислень її потрібно перетворити на число.

## Чим формат запиту відрізняється від формату відповіді?
Запит передає дані від клієнта до сервера, наприклад у форматі form-data. Відповідь надсилається сервером клієнту, зазвичай у форматі JSON, який містить результат обробки або повідомлення про помилку.
# 04 POST — Multipart Form
"files": {},
    "form": {
        "category": "Фаст-фуд",
        "price": "170",
        "title": "Шаурма"
    },
    "json": null
# 05 POST — JSON
"form": {},
    "json": {
        "available": false,
        "category": "десерт",
        "price": 200,
        "published": {
            "day": 28,
            "month": 11,
            "year": 2026
        },
        "title": "Торт"
    }
# 06 PUT — представлення
 "json": {
        "available": true,
        "category": "main",
        "price": 120,
        "published": {
            "day": 25,
            "month": 10,
            "year": 2026
        },
        "title": "Гарбузовий суп"
    }
# 07 PATCH — зміна ціни
    "method": "PATCH",
    "origin": "188.163.1.74",
    "url": "https://httpbin.org/patch",
    "data": "{\"price\":135}",
    "files": {},
    "form": {},
    "json": {
        "price": 135
    }
# 08 DELETE — echo
    "method": "DELETE",
    "origin": "188.163.1.74",
    "url": "https://httpbin.org/delete",
    "data": "",
    "files": {},
    "form": {},
    "json": null
# 09 GET — 204
status:204
# 10 GET — 404
status:404
# 11 GET — 500
status: 500
# 12 GET — метод не дозволено
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<title>405 Method Not Allowed</title>
<h1>Method Not Allowed</h1>
<p>The method is not allowed for the requested URL.</p>