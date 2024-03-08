
// Запуск hello.html
// Событие перезагрузки или загрузки, добавляем обработчик
chrome.runtime.onInstalled.addListener(async () => {
    // Генерируем url для локального файл 
    let url = chrome.runtime.getURL("html/hello.html");
    // Открываем странцу 
    let tab = await chrome.tabs.create({ url });

    // Смотрим хранилище для часов - тру/нетру, для таймера, если нет то база - 1 минута
    chrome.storage.sync.get(['showClock'], (result) => {
        if (result.showClock) {
            chrome.action.setBadgeText({
                text: 'ON'
            });
        }
    });

    chrome.storage.sync.get(['timer'], (result) => {
        console.log('result', result)
        if (!result.timer) {
            chrome.storage.sync.set({
                'timer': 1
            })
        }
    });
});

// Не используется потому что добавили меню для копки расширения в Манифест файле 
// chrome.action.onClicked.addListener((tab) => {
//     console.log('worker1');
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         files: ['js/onclickAction.js']
//     })
// });

// Обработчик команд, на вход строка
chrome.commands.onCommand.addListener((command) => {

    // Все команды с текущей вкладкой, поэтому пустой объект в качесвте входного параметра
    chrome.tabs.update({}, async (tab) => {
        debugger
        if (command == 'pin-current-tab') {
            chrome.tabs.update({
                pinned: !tab.pinned
            });
        } else if (command == 'move-to-first') {
            // Адресация вкладок начинается с нуля 
            chrome.tabs.move(tab.id, {
                index: 0
            });
        } else if (command == 'move-to-last') {
            // Получаем массив открытых вкладок, чтобы потом переместить в конец
            const allTabs = await chrome.tabs.query({})
            chrome.tabs.move(tab.id, {
                index: allTabs.length - 1
            });
        } else if (command == 'copy-current-tab') {
            chrome.tabs.duplicate(tab.id);
        }
    });
});

//notifications
chrome.alarms.onAlarm.addListener((alarm) => {
    console.log('onAlarm', alarm)
    chrome.notifications.create('notification1', {
        type: 'basic',
        iconUrl: '/icons/alert.png',
        title: 'Напоминашка',
        message: 'Ахтунг! Пришло время напомнить!',
        buttons: [{
            title: 'Спасибо'
        }],
        priority: 0
    }, (e) => {
        console.log("Last error:", chrome.runtime.lastError);
    });
});

chrome.notifications.onButtonClicked.addListener(async (notificationId, buttonIndex) => {
    console.log({
        notificationId,
        buttonIndex
    })
});

chrome.notifications.onClicked.addListener(async (notificationId) => {
    chrome.storage.sync.get(['timer'], (result) => {
        if (result.timer) {
            chrome.alarms.create({
                delayInMinutes: result.timer
            });
        }
    })

    chrome.notifications.clear(notificationId)

});