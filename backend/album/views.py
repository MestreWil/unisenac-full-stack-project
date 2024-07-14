from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Album
from .serializers import AlbumSerializers

import json

@api_view(['GET'])
def get_all_albuns(request):
     if request.method == "GET":
          album = Album.objects.all()
          serializers = AlbumSerializers(album, many=True)
     
          return Response(serializers.data)
     return Response(status=status.HTTP_400_BAD_REQUEST)