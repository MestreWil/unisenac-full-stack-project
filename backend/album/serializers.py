from rest_framework import serializers

from .models import Album
from reviews.serializers import ReviewsSerializer
class AlbumSerializers(serializers.ModelSerializer):
     reviews = ReviewsSerializer(many=True, read_only=True)
     class Meta:
          model = Album
          fields = ['album_id','album_name','album_release','album_description', 'album_link', 'album_image', 'reviews', 'album_artist', 'album_gender']
     
     def validate_name(self, value):
        if Artist.objects.filter(artist_name=value).exists():
            raise serializers.ValidationError("Artist already exists.")
        return value