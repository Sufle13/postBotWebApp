// Проверяем, что объект Telegram Web App доступен
if (typeof window.Telegram !== "undefined" && window.Telegram.WebApp) {
    console.log("WebApp API доступен!");
    console.log("Инициализационные данные:", window.Telegram.WebApp.initData);

    const tg = window.Telegram.WebApp;

    // Устанавливаем цвет кнопки закрытия Web App
    tg.setBackgroundColor("#F0F0F0");
    tg.setHeaderColor("#000000");

    // Показываем основную кнопку
    tg.MainButton.setText("Отправить данные");
    tg.MainButton.show();

    // Добавляем обработчик клика для основной кнопки
    tg.MainButton.onClick(() => {
        const userData = {
            user_id: tg.initDataUnsafe.user?.id,
            first_name: tg.initDataUnsafe.user?.first_name,
            last_name: tg.initDataUnsafe.user?.last_name,
        };

        // Отправляем данные обратно в Telegram
        tg.sendData(JSON.stringify(userData)); // Данные отправляются боту
    });

    // Обработка нажатия кнопки "Отправить данные"
    const sendDataButton = document.getElementById("sendData");
    sendDataButton.addEventListener("click", () => {
        const message = {
            text: "Привет от Web App!",
            time: new Date().toISOString(),
        };
        tg.sendData(JSON.stringify(message)); // Отправляем данные боту
    });
} else {
    console.warn("WebApp API недоступен. Возможно, вы открываете приложение вне Telegram?");
}
