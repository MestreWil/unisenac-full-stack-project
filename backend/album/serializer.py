from rest_framework import serializers

from .models import Album, Music

class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = '__all__'

class AlbumSerializer(serializers.ModelSerializer):
    songs = MusicSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ['name', 'description', 'author', 'release_date', 'songs']