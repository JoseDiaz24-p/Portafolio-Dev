from django.db import models
from mongoengine import Document, EmbeddedDocument, fields

class Genre(EmbeddedDocument):
    id = fields.IntField()
    name = fields.StringField()

class Keyword(EmbeddedDocument):
    id = fields.IntField()
    name = fields.StringField()

class Movie(Document):
    tmdb_id = fields.IntField(unique=True, required=True)
    title = fields.StringField(required=True, max_length=255)
    overview = fields.StringField()
    release_date = fields.StringField()
    budget = fields.IntField()
    revenue = fields.IntField()
    runtime = fields.FloatField()
    vote_average = fields.FloatField()
    vote_count = fields.IntField()
    tagline = fields.StringField()
    
    # Subdocumentos anidados
    genres = fields.EmbeddedDocumentListField(Genre)
    keywords = fields.EmbeddedDocumentListField(Keyword)

    meta = {
        'collection': 'movies',
        'indexes': [
            '$title',        # Índice de texto para búsquedas rápidas
            'vote_average',
            'release_date'
        ]
    }

    def __str__(self):
        return self.title
