// Проверяем доступность Telegram Web App API
if (typeof window.Telegram !== "undefined" && window.Telegram.WebApp) {
    console.log("WebApp API доступен!");
  
    const tg = window.Telegram.WebApp;
    tg.setBackgroundColor("#F0F0F0");
    tg.setHeaderColor("#000000");
  
    // Показываем основную кнопку
    tg.MainButton.setText("Закрыть");
    tg.MainButton.show();
    tg.MainButton.onClick(() => tg.close());
  
    // Кнопка обновления
    const refreshButton = document.getElementById("refresh-button");
    const matchesList = document.getElementById("matches_list");

    // WebSocket URL
    const websocketUrl = "wss://srintagration-production.up.railway.app/ws/matches";
    const websocket = new WebSocket(websocketUrl);

    // Обработка открытия соединения
    websocket.addEventListener("open", () => {
        console.log("WebSocket соединение установлено");
    });

    // Обработка входящих сообщений
    websocket.addEventListener("message", (event) => {
        console.log("Получено сообщение через WebSocket:", event.data);
        try {
            const matches = JSON.parse(event.data);
            console.log("Получены обновления матчей через WebSocket:", matches);

            // Обновляем список матчей
            updateMatches(matches);
            showUpdateIndicator();
        } catch (error) {
            console.error("Ошибка обработки данных WebSocket:", error);
        }
    });

    // Обработка ошибок соединения
    websocket.addEventListener("error", (error) => {
        console.error("Ошибка WebSocket соединения:", error);
    });

    // Обработка закрытия соединения
    websocket.addEventListener("close", () => {
        console.warn("WebSocket соединение закрыто");
    });


    function updateMatches(matches) {
        // Очистка списка
        matchesList.innerHTML = "";

        // Добавляем матчи в список
        matches.forEach((match) => {
            const listItem = document.createElement("li");
            listItem.className = "match-item";

            listItem.innerHTML = `
                <h2>${match.tournament}</h2>
                <p><strong>Игрок 1:</strong> ${match.player1} (Счет: ${match.score1})</p>
                <p><strong>Игрок 2:</strong> ${match.player2} (Счет: ${match.score2})</p>
                <p><strong>Статус:</strong> ${match.status}</p>
                <p><strong>Состояние игры:</strong> ${match.liveStatus}</p>
            `;

            matchesList.appendChild(listItem);
        });
    }
  
    // Функция для загрузки данных матчей
    async function loadMatches() {
      try {
        const response = await fetch("https://srintagration-production.up.railway.app/api/matches/live");
        if (!response.ok) throw new Error("Ошибка загрузки данных матчей");
  
        const matches = await response.json();
        console.log("Матчи загружены через REST:", matches);

        // Обновляем список
        updateMatches(matches);
      } catch (error) {
        console.error("Ошибка загрузки матчей:", error);
        matchesList.innerHTML = "<li>Ошибка загрузки данных. Попробуйте снова позже.</li>";
      }
    }
  
    // Загружаем матчи при открытии
    loadMatches();

    function showUpdateIndicator() {
        const indicator = document.getElementById("update-indicator");
        indicator.classList.remove("hidden");
        setTimeout(() => indicator.classList.add("hidden"), 3000);
    }
  
    // Добавляем обработчик для кнопки обновления
    refreshButton.addEventListener("click", loadMatches);
  } else {
    console.warn("WebApp API недоступен. Возможно, вы открываете приложение вне Telegram?");
  }
  
