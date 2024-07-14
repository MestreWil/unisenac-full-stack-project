from rest_framework import serializers

from .models import Album

class AlbumSerializers(serializers.ModelSerializer):
     class Meta:
          model = Album
          fields = '__all__'
     
     def validate_name(self, value):
        if Artist.objects.filter(artist_name=value).exists():
            raise serializers.ValidationError("Artist already exists.")
        return value