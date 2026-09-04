# Usamos una imagen ligera de Python
FROM python:3.11-slim

# Evitar que Python escriba archivos .pyc y forzar buffer directo para logs en tiempo real
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Directorio de trabajo en el contenedor
WORKDIR /app

# Instalar dependencias del sistema necesarias para compilar o manejar SQLite
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

# Copiar e instalar dependencias de Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código del proyecto
COPY . .

# Comando por defecto: ejecuta el pipeline ETL y luego el agente
CMD ["sh", "-c", "python run_pipeline.py && python run_agent.py"]