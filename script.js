async function getWeather(city) {
    const apiKey = "88486c035881f2871bbe4842beabba3d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    document.getElementById("weatherResult").innerHTML = `<div class="loader"></div>`;
    document.getElementById("weatherResult").classList.remove("show");

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("weatherResult").innerHTML = "Город не найден!";
            document.getElementById("weatherResult").classList.add("show");
            return;
        }

        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById("weatherResult").innerHTML = `
        <img src="${icon}" alt="Погода">
        <p><strong>${city}</strong></p>
        <p>${temp}°C, ${desc}</p>
        `;

        document.getElementById("weatherResult").classList.add("show");
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = "Ошибка загрузки данных!";
        document.getElementById("weatherResult").classList.add("show");
    }
}

async function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = "88486c035881f2871bbe4842beabba3d";
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`;

            document.getElementById("weatherResult").innerHTML = `<div class="loader"></div>`;
            document.getElementById("weatherResult").classList.remove("show");

            try {
                const response = await fetch(url);
                const data = await response.json();

                const temp = Math.round(data.main.temp);
                const desc = data.weather[0].description;
                const city = data.name;
                const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                document.getElementById("weatherResult").innerHTML = `
                <img src="${icon}" alt="Погода">
                <p><strong>${city}</strong></p>
                <p>${temp}°C, ${desc}</p>
                `;

                document.getElementById("weatherResult").classList.add("show");
            } catch (error) {
                document.getElementById("weatherResult").innerHTML = "Ошибка загрузки данных!";
                document.getElementById("weatherResult").classList.add("show");
            }
        }, (error) => {
            document.getElementById("weatherResult").innerHTML = "Не удалось получить геолокацию!";
            document.getElementById("weatherResult").classList.add("show");
        });
    } else {
        document.getElementById("weatherResult").innerHTML = "Геолокация не поддерживается!";
        document.getElementById("weatherResult").classList.add("show");
    }
}