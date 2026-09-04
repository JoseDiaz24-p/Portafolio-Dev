import os
import sys
import json
import time
import urllib.request
import urllib.error
from dotenv import load_dotenv
from src.ai_agent.database_tool import get_customer_profile

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("[ERROR]: No se encontró la variable GEMINI_API_KEY en el archivo .env")
    sys.exit(1)

API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent"
HEADERS = {
    "Content-Type": "application/json",
    "X-goog-api-key": api_key
}

SYSTEM_INSTRUCTION = (
    "Eres el Agente Inteligente de Soporte y Customer Experience de MACHBANK. "
    "Tu misión es asistir al equipo de operaciones analizando el comportamiento de clientes. "
    "Usa la herramienta 'get_customer_profile' para consultar los datos del cliente solicitado. "
    "Con la información obtenida, entrega un informe estructurado: "
    "1. Perfil demográfico. 2. Métricas y comportamiento financiero. 3. Diagnóstico y recomendación de negocio."
)

TOOL_DECLARATION = {
    "function_declarations": [
        {
            "name": "get_customer_profile",
            "description": "Obtiene el perfil consolidado de un cliente desde la base analítica SQLite dado su ID.",
            "parameters": {
                "type": "OBJECT",
                "properties": {
                    "customer_id": {
                        "type": "STRING",
                        "description": "El identificador único del cliente (ejemplo: 'cust_000054')"
                    }
                },
                "required": ["customer_id"]
            }
        }
    ]
}

def enviar_a_gemini(contents: list, reintentos: int = 3) -> dict:
    payload = {
        "systemInstruction": {
            "parts": [{"text": SYSTEM_INSTRUCTION}]
        },
        "contents": contents,
        "tools": [TOOL_DECLARATION],
        "generationConfig": {
            "temperature": 0.2
        }
    }
    
    req = urllib.request.Request(
        API_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers=HEADERS,
        method="POST"
    )
    
    for intento in range(reintentos):
        try:
            with urllib.request.urlopen(req) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code in [503, 429] and intento < reintentos - 1:
                print(f"[Aviso]: Servidor ocupado ({e.code}). Reintentando en 2 segundos...")
                time.sleep(2)
                continue
            error_body = e.read().decode("utf-8")
            print(f"\n[HTTP Error {e.code}]: {error_body}")
            raise e

def consultar_agente(pregunta: str) -> str:
    print(f"\n[Usuario]: {pregunta}")
    print("[Agente]: Consultando base analítica y generando diagnóstico...\n")
    
    conversacion = [
        {"role": "user", "parts": [{"text": pregunta}]}
    ]
    
    resultado_1 = enviar_a_gemini(conversacion)
    candidato_1 = resultado_1["candidates"][0]["content"]
    conversacion.append(candidato_1)
    
    for part in candidato_1.get("parts", []):
        if "functionCall" in part:
            llamada = part["functionCall"]
            nombre_fn = llamada["name"]
            argumentos = llamada.get("args", {})
            
            if nombre_fn == "get_customer_profile":
                cid = argumentos.get("customer_id")
                print(f"[Tool Execution]: Consultando SQLite para customer_id='{cid}'...")
                
                datos_cliente = get_customer_profile(cid)
                
                # El rol debe ser 'user' para inyectar la respuesta de la función en la API
                conversacion.append({
                    "role": "user",
                    "parts": [{
                        "functionResponse": {
                            "name": nombre_fn,
                            "response": {"result": datos_cliente}
                        }
                    }]
                })
                
                resultado_2 = enviar_a_gemini(conversacion)
                candidato_2 = resultado_2["candidates"][0]["content"]
                for p in candidato_2.get("parts", []):
                    if "text" in p:
                        return p["text"]
                        
        elif "text" in part:
            return part["text"]
            
    return "No se pudo completar el diagnóstico."

if __name__ == "__main__":
    pregunta_prueba = "Necesito revisar el perfil de 'cust_000054' para ver si califica para beneficios VIP o una campaña especial."
    resultado = consultar_agente(pregunta_prueba)
    print("\n" + "="*70)
    print(resultado)
    print("="*70)