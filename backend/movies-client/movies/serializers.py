from rest_framework import serializers

class GenreSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()

class KeywordSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()

class MovieSerializer(serializers.Serializer):
    id = serializers.CharField()  # <-- Corregido: sin source='id'
    tmdb_id = serializers.IntegerField()
    title = serializers.CharField()
    overview = serializers.CharField()
    release_date = serializers.CharField()
    budget = serializers.IntegerField()
    revenue = serializers.IntegerField()
    runtime = serializers.FloatField()
    vote_average = serializers.FloatField()
    vote_count = serializers.IntegerField()
    tagline = serializers.CharField()
    genres = GenreSerializer(many=True)
    keywords = KeywordSerializer(many=True)