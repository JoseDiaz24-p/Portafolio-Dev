from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Movie
from .serializers import MovieSerializer

class MovieListView(APIView):
    """
    GET /api/movies/?page=1&page_size=12&search=avatar&genre=Action
    """
    def get(self, request):
        page = int(request.query_params.get('page', 1))
        page_size = int(request.query_params.get('page_size', 12))
        search = request.query_params.get('search', '').strip()
        genre = request.query_params.get('genre', '').strip()

        # Query base sobre MongoDB
        queryset = Movie.objects

        # Búsqueda usando el índice de texto de Mongo
        if search:
            queryset = queryset.search_text(search).order_by('$text_score')
        else:
            # Orden descendente por calificación por defecto
            queryset = queryset.order_by('-vote_average')

        # Filtro por subdocumento anidado (género)
        if genre:
            queryset = queryset.filter(genres__name__iexact=genre)

        total_movies = queryset.count()
        offset = (page - 1) * page_size
        movies = queryset[offset:offset + page_size]

        serializer = MovieSerializer(movies, many=True)

        return Response({
            'total': total_movies,
            'page': page,
            'page_size': page_size,
            'total_pages': (total_movies + page_size - 1) // page_size,
            'results': serializer.data
        }, status=status.HTTP_200_OK)


class MovieDetailView(APIView):
    """
    GET /api/movies/<tmdb_id>/
    """
    def get(self, request, tmdb_id):
        try:
            movie = Movie.objects.get(tmdb_id=tmdb_id)
            serializer = MovieSerializer(movie)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            return Response({'error': 'Película no encontrada'}, status=status.HTTP_404_NOT_FOUND)