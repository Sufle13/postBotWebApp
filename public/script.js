// Проверяем, доступно ли Telegram Web App
if (window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;

    // Активируем Web App (меняем заголовок, цвет кнопок и т.д.)
    tg.MainButton.text = "Отправить данные";
    tg.MainButton.setParams({ color: "#143F6B" }); // Устанавливаем цвет кнопки
    tg.MainButton.show(); // Показываем главную кнопку

    // Добавляем обработчик для главной кнопки
    tg.MainButton.onClick(() => {
        // Отправляем данные обратно боту
        const userData = {
            username: tg.initDataUnsafe.user.username,
            firstName: tg.initDataUnsafe.user.first_name,
            lastName: tg.initDataUnsafe.user.last_name,
        };

        // Отправляем данные в бота через Web App data
        tg.sendData(JSON.stringify(userData));

        // Закрываем Web App после отправки
        tg.close();
    });

    // Получаем информацию о пользователе
    console.log("Имя пользователя:", tg.initDataUnsafe.user.first_name);
    console.log("Фамилия пользователя:", tg.initDataUnsafe.user.last_name);
    console.log("Юзернейм:", tg.initDataUnsafe.user.username);
} else {
    console.error("Telegram Web App API недоступен.");
}
