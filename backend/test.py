import requests

# URL API Ollama
API_URL = "http://34.201.41.57:11434/api/generate"

# Данные запроса
data = {
    "model": "tinyllama:latest",  # Укажите имя модели
    "prompt": "how are you?"  # Ваш запрос
}

# Отправка POST-запроса
response = requests.post(API_URL, json=data)

# Обработка ответа
if response.status_code == 200:
    result = response.json()
    print("Ответ модели:", result.get("response", "Нет ответа"))
else:
    print("Ошибка:", response.status_code, response.text)
