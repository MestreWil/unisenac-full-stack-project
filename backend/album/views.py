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

@api_view(['GET'])
def get_album(request, pk):
    try:
        album = Album.objects.get(pk=pk)
    except Album.DoesNotExist:
        return Response({ "error": "Album not Found" }, status=status.HTTP_404_NOT_FOUND)
    
    album_serializer = AlbumSerializer(album)

    return Response(album_serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_album(request):
    album_request = JSONParser().parse(request)

    album_serializer = AlbumSerializer(data=album_request)

    if album_serializer.is_valid():
        album_serializer.save()

        return Response(album_serializer.data, status=status.HTTP_200_OK)
    
    return Response(album_serializer.errors, status=status.HTTP_400_BAD_REQUEST)