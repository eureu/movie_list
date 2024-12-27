import requests

url = 'http://34.201.41.57:11434/api/delete'
payload = {
    "model": "tinyllama:latest"
}

response = requests.delete(url, json=payload)

if response.status_code == 200:
    print(response.text)
else:
    print(f"Error: {response.status_code}, {response.text}")