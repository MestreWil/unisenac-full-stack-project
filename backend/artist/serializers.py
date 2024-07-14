from rest_framework import serializers

from .models import Artist

class ArtistSerializers(serializers.ModelSerializer):
     class Meta:
          model = Artist
          fields = '__all__'
     
     def validate_name(self, value):
        if Artist.objects.filter(artist_name=value).exists():
            raise serializers.ValidationError("Artist already exists.")
        return value