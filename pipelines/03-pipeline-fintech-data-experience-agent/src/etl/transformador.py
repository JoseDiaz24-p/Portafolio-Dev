import pandas as pd 
import numpy as np

class FintechTransformadorDatos:
    def __init__(self, df: pd.DataFrame):
        self.df = df.copy()
        
    def limpieza_datos(self) -> "FintechTransformadorDatos":
        col_numericas = [
            'Total_Transactions',
            'Avg_Transaction_Value',
            'Max_Transaction_Value',
            'Min_Transaction_Value',
            'Total_Spent',
            'Active_Days'
        ]
        for col in col_numericas:
            self.df[col] = pd.to_numeric(self.df[col], errors='coerce')
        self.df.dropna(inplace=True)
        return self
    
    def agregar_metricas_negocio(self) -> "FintechTransformadorDatos":
        # Tasa de gasto diario (evita división por cero)
        self.df['Daily_Spend_Rate'] = (
            self.df['Total_Spent'] / self.df['Active_Days'].replace(0, np.nan)
        ).round(2)
        
        # Dispersión del ticket
        self.df['Ticket_Spread'] = (
            self.df['Max_Transaction_Value'] - self.df['Min_Transaction_Value']
        ).round(2)
        
        # Percentiles para segmentación
        p75_gastado = self.df['Total_Spent'].quantile(0.75)
        p75_activo = self.df['Active_Days'].quantile(0.75)
        
        def asignar_segmento(row):
            if row['Total_Spent'] >= p75_gastado and row['Active_Days'] >= p75_activo:
                return 'VIP_ALTO_CONSUMO'
            elif row['Total_Spent'] >= p75_gastado and row['Active_Days'] < p75_activo:
                return 'COMPRADOR_DE_BAJA_FRECUENCIA'
            elif row['Active_Days'] >= p75_activo:
                return 'USUARIO_REGULAR'
            else:
                return 'USUARIO_ESTANDAR'
                
        # Esta asignación va fuera de la función interna asignar_segmento
        self.df['Customer_Segment'] = self.df.apply(asignar_segmento, axis=1)
        return self
        
    def datos_limpios(self) -> pd.DataFrame:
        return self.df