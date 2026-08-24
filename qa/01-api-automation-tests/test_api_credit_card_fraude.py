import os
import json
import pytest

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
JSON_PATH = os.path.join(BASE_DIR, "fraude_tarjetas.json")


@pytest.fixture(scope="module")
def financial_data():
    """Carga el dataset JSON local para las pruebas de QA."""
    if not os.path.exists(JSON_PATH):
        pytest.fail(f"No se encontró el archivo: {JSON_PATH}")
    
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data


class TestCreditCardDataIntegrity:
    """Suite de aseguramiento de calidad sobre los datos procesados."""

    def test_tc01_archivo_no_vacio(self, financial_data):
        """TC-DATA-01: Validar formato de lista y carga de registros."""
        assert isinstance(financial_data, list), "El contenido debe ser una lista JSON"
        assert len(financial_data) == 10000, f"Se esperaban 10,000 registros, hay {len(financial_data)}"

    def test_tc02_esquema_campos_obligatorios(self, financial_data):
        """TC-DATA-02: Validar presencia de columnas obligatorias."""
        campos_requeridos = {"transaction_id", "amount", "merchant_category", "is_fraud"}
        for item in financial_data[:500]:
            faltantes = campos_requeridos - set(item.keys())
            assert len(faltantes) == 0, f"Campos faltantes en registro: {faltantes}"

    def test_tc03_montos_no_negativos(self, financial_data):
        """TC-DATA-03: Regla de negocio: montos válidos no negativos (>= 0.0)."""
        for item in financial_data:
            monto = item.get("amount")
            assert monto is not None and monto >= 0, f"Monto negativo o nulo en ID {item.get('transaction_id')}"

    def test_tc04_valores_binarios_de_fraude(self, financial_data):
        """TC-DATA-04: El estado de fraude debe ser 0 o 1."""
        valores_validos = {0, 1}
        for item in financial_data:
            assert item.get("is_fraud") in valores_validos, f"Valor de fraude anómalo en ID {item.get('transaction_id')}"

    def test_tc05_categorias_de_comercio_validas(self, financial_data):
        """TC-DATA-05: El comercio debe pertenecer al catálogo permitido."""
        catalogo = {"Clothing", "Electronics", "Food", "Grocery", "Travel"}
        for item in financial_data:
            assert item.get("merchant_category") in catalogo, f"Categoría fuera de catálogo en ID {item.get('transaction_id')}"