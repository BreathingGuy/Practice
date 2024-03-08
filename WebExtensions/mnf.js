let mnf = {
    "manifest_version": 3,
    "name": "EasyIt Extension",
    "description": "EasyIt Extension - the best solution for any issue",
    "version": "1.0",
    "author": "EasyIT development",

    // Действие при нажатии иконки в браузере 
    "action": {
        "default_popup": "html/popup.html", // Страница в качестве выпадающего меню при клике по кнопке
        "default_icon": "icons/icon-32.png" // Иконка для кнопки 
    },

    // Размер иконок
    "icons": {
        "16": "icons/icon-16.png",
        "32": "icons/icon-32.png",
        "48": "icons/icon-48.png",
        "128": "icons/icon-128.png"
    },

    // Скрипты и шаблон для url страницы, при совпадении применяется скрипт
    "content_scripts": [{
        "js": [
            "js/content.js"
        ],
        // Шаблон, надо добавить расширение в host permisions
        "matches": [
            "<all_urls>"
        ]
    }],

    // Список разрешений
    "permissions": [
        "tabs", //Вкладки
        "activeTab",
        "scripting",
        "storage", //Разрешение на память
        "alarms", //Тревоги
        "notifications" // Оповещение
    ],

    "host_permissions": [
        "<all_urls>"
    ],

    // Роль сервис воркера, ядро расширения 
    "background": {
        "service_worker": "js/background.js"
    },

    // Набор функций запускающихся при комбинаций клавиатуры
    "commands": {
        "pin-current-tab": {
            "suggested_key": {
                "default": "Ctrl+Shift+Up",
                "mac": "Command+Shift+Up"
            },
            "description": "Закрепить/открепить текущую вкладку"
        },
        "copy-current-tab": {
            "suggested_key": {
                "default": "Ctrl+Shift+Down",
                "mac": "Command+Shift+Down"
            },
            "description": "Дублировать вкладку"
        },
        "move-to-first": {
            "suggested_key": {
                "default": "Ctrl+Shift+Left",
                "mac": "Command+Shift+Left"
            },
            "description": "Сделать вкладку первой"
        },
        "move-to-last": {
            "suggested_key": {
                "default": "Ctrl+Shift+Right",
                "mac": "Command+Shift+Right"
            },
            "description": "Сделать вкладку последней"
        }
    }
}
