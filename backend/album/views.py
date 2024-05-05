from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status

from .models import Album
from .serializer import AlbumSerializer, MusicSerializer

@api_view(['GET'])
def list_albums(request):
    albums = Album.objects.all()
    albums_serializer = AlbumSerializer(albums, many=True)

    return Response(data=albums_serializer.data, status=status.HTTP_200_OK)

