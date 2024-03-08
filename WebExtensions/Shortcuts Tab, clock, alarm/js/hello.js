const onClick = async (e) => {
    // параметры для поиска текущей активной вкладки
    let queryOptions = {
        active: true,
        lastFocusedWindow: true
    };
    // Ищем вкладку с помощью метода qwery, возвращает промис в котором приходит массив
    // Деструктуризируем константу таб
    const [tab] = await chrome.tabs.query(queryOptions)
    // Удаляем вкладку
    chrome.tabs.remove(tab.id)
}

const btn = document.querySelector('.ok-button')
if (btn) {
    btn.addEventListener('click', onClick)
}