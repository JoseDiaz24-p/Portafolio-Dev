import os
import ast
import pandas as pd
from django.core.management.base import BaseCommand
from django.conf import settings
from movies.models import Movie, Genre, Keyword


class Command(BaseCommand):
    help = 'Importa películas desde tmdb_5000_movies.csv a MongoDB'

    def handle(self, *args, **kwargs):
        # Apunta a la carpeta csv que ya tienes en Proyecto 1/csv/
        csv_path = os.path.join(settings.BASE_DIR, 'csv', 'tmdb_5000_movies.csv')

        if not os.path.exists(csv_path):
            self.stderr.write(self.style.ERROR(f'No se encontró el archivo en: {csv_path}'))
            return

        self.stdout.write(self.style.NOTICE('Leyendo dataset con pandas...'))
        df = pd.read_csv(csv_path)

        # Tratar nulos para evitar errores de tipo en MongoEngine
        df = df.fillna({
            'overview': '',
            'tagline': '',
            'release_date': '',
            'runtime': 0.0,
            'budget': 0,
            'revenue': 0,
            'vote_average': 0.0,
            'vote_count': 0,
            'genres': '[]',
            'keywords': '[]'
        })

        Movie.objects.delete()
        self.stdout.write(self.style.WARNING('Colección movies reiniciada.'))

        movie_documents = []
        batch_size = 500
        total_rows = len(df)

        self.stdout.write(self.style.NOTICE(f'Procesando {total_rows} registros...'))

        for index, row in df.iterrows():
            try:
                raw_genres = ast.literal_eval(row['genres'])
                genre_docs = [Genre(id=g.get('id'), name=g.get('name')) for g in raw_genres]
            except (ValueError, SyntaxError):
                genre_docs = []

            try:
                raw_keywords = ast.literal_eval(row['keywords'])
                keyword_docs = [Keyword(id=k.get('id'), name=k.get('name')) for k in raw_keywords]
            except (ValueError, SyntaxError):
                keyword_docs = []

            movie = Movie(
                tmdb_id=int(row['id']),
                title=str(row['title']),
                overview=str(row['overview']),
                release_date=str(row['release_date']),
                budget=int(row['budget']),
                revenue=int(row['revenue']),
                runtime=float(row['runtime']),
                vote_average=float(row['vote_average']),
                vote_count=int(row['vote_count']),
                tagline=str(row['tagline']),
                genres=genre_docs,
                keywords=keyword_docs
            )
            movie_documents.append(movie)

            if len(movie_documents) >= batch_size:
                Movie.objects.insert(movie_documents, load_bulk=False)
                movie_documents = []
                self.stdout.write(f'Procesadas {index + 1} de {total_rows} películas...')

        if movie_documents:
            Movie.objects.insert(movie_documents, load_bulk=False)

        self.stdout.write(self.style.SUCCESS(f'Importación finalizada. Total: {total_rows} películas cargadas en MongoDB.'))