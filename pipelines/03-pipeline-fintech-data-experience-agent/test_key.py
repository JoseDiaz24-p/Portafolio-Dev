import os
import json
import urllib.request
import urllib.error

api_key = None
if os.path.exists(".env"):
    with open(".env", "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith("GEMINI_API_KEY="):
                api_key = line.split("=", 1)[1].strip().strip('"').strip("'")

if not api_key:
    print("[ERROR]: No se encontro la clave en .env")
    exit(1)

print(f"Probando clave: {api_key[:15]}...")

url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent"
headers = {
    "Content-Type": "application/json",
    "X-goog-api-key": api_key
}
payload = {
    "contents": [{"parts": [{"text": "Di exactamente: CONEXION EXITOSA"}]}]
}

req = urllib.request.Request(
    url,
    data=json.dumps(payload).encode("utf-8"),
    headers=headers,
    method="POST"
)

try:
    with urllib.request.urlopen(req) as resp:
        print(f"\nStatus Code: {resp.status}")
        body = resp.read().decode("utf-8")
        print("Respuesta:")
        print(body)
except urllib.error.HTTPError as e:
    print(f"\nError HTTP: {e.code} {e.reason}")
    print(e.read().decode("utf-8"))
except Exception as e:
    print(f"\nError de conexion: {e}")