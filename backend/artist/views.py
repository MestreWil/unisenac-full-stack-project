from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Artist
from .serializers import ArtistSerializers

import json

@api_view(['GET'])
def get_all_artist(request):
     if request.method == "GET":
          artists = Artist.objects.all()
          serializers = ArtistSerializers(artists, many=True)
     
          return Response(serializers.data)
     return Response(status=status.HTTP_400_BAD_REQUEST)
     
@api_view(['GET'])
def get_by_name(request, name):
     try:
          artist = Artist.objects.get(artist_name=name)
     except:
          return Response(status=status.HTTP_404_NOT_FOUND)
     
     serializer = ArtistSerializers(artist)
     return Response(serializer.data)



@api_view(['POST'])
def create_artist(request):
    serializer = ArtistSerializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)