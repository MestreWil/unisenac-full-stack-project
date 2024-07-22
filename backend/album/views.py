from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Album
from .serializers import AlbumSerializers
from reviews.models import Reviews
from reviews.serializers import ReviewsSerializer

import json

@api_view(['GET'])
def get_all_albuns(request):
     if request.method == "GET":
          album = Album.objects.all()
          serializers = AlbumSerializers(album, many=True)
     
          return Response(serializers.data)
     return Response(status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def get_album(request, name):
     try:
          album = Album.objects.get(album_name=name)
          reviews = Reviews.objects.filter(review_album=album)
          album.reviews = reviews
     except:
          return Response(status=status.HTTP_404_NOT_FOUND)
     
     serializer = AlbumSerializers(album)
     return Response(serializer.data)     

@api_view(['GET'])
def get_reviews_albums(request, name):
     try:
          album = Album.objects.get(album_name=name)
          reviews = Reviews.objects.filter(review_album=album.album_id)
          serializers = ReviewsSerializer(reviews, many=True)
          return Response(serializers.data, status=status.HTTP_200_OK)
     except Album.DoesNotExist:
          return Response({"error": "Album not found"}, status=status.HTTP_404_NOT_FOUND)
     
