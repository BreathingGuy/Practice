const activeTabs = new Set();

chrome.tabs.onRemoved.addListener((tabId) => {
    if (activeTabs.has(tabId)) {
        activeTabs.delete(tabId);
    }
});


const changeStatus = (tabId) => {
    if (activeTabs.has(tabId)) {
        chrome.action.setBadgeText({
            text: "ON",
            tabId: tabId
        }, () => {});
    } else {
        chrome.action.setBadgeText({
            text: "",
            tabId: tabId
        }, () => {});
    }
};


// тело сооьбщение, инф об отпр, колбэк для ответа
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "status") {
        const tabId = sender?.tab?.id;
        if (tabId) {
            if (activeTabs.has(tabId)) {
                sendResponse({
                    active: true
                });
                changeStatus(tabId)
            } else {
                sendResponse({
                    active: false
                });
            }
        }
    }
});

// Входной параметр обработчика - информация о текущей вкладке
chrome.action.onClicked.addListener((tab) => {
    const tabId = tab.id
    chrome.action.getBadgeText({ tabId }, (text) => {
        if (text === "ON") {
            chrome.tabs.sendMessage(tabId, { type: "enable", value: false }, (response) => {});
            if (activeTabs.has(tabId)) {
                activeTabs.delete(tabId);
            }
        } else {
            chrome.tabs.sendMessage(tabId, { type: "enable", value: true }, (response) => {});
            activeTabs.add(tabId);
        }
        changeStatus(tabId)
    });
});