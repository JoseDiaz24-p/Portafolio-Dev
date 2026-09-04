import os
import sqlite3
from typing import Dict, Any

def get_customer_profile(customer_id: str) -> Dict[str, Any]:
    """
    Obtiene las métricas financieras, de actividad y segmento de un cliente en la base analítica de la billetera digital.
    
    Args:
        customer_id: Identificador único del cliente (ejemplo: 'cust_000054').
    """
    # Ubicar la base de datos de manera dinámica en la raíz del proyecto
    directorio_actual = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(directorio_actual, "..", "..", "fraud_warehouse.db")
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    query = """
        SELECT 
            Customer_ID, Age, Location, Income_Level, Total_Transactions,
            Avg_Transaction_Value, Total_Spent, Active_Days, Daily_Spend_Rate,
            Ticket_Spread, Customer_Segment
        FROM dim_customers_ltv
        WHERE Customer_ID = ?;
    """
    
    cursor.execute(query, (customer_id.strip(),))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return {"error": f"No se encontraron registros para el cliente con ID '{customer_id}'."}

    columnas = [
        "Customer_ID", "Age", "Location", "Income_Level", "Total_Transactions",
        "Avg_Transaction_Value", "Total_Spent", "Active_Days", "Daily_Spend_Rate",
        "Ticket_Spread", "Customer_Segment"
    ]
    return dict(zip(columnas, row))