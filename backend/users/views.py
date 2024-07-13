from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Users
from .serializers import UserSerializer

import json

@api_view(['GET'])
def get_all_user(request):
     try:
          user = Users.objects.all()
     except:
          return Response(status=status.HTTP_404_NOT_FOUND)
     
     serializer = UserSerializer(user, many=True)
     return Response(serializer.data)

@api_view(['POST'])
def post_user(request):
     new_user = request.data
     serializer = UserSerializer(data=new_user)
     
     if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
     return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def patch_user_description(request):
     new_description = request.data
     serielizer = UserSerializer(user_description = new_description)
     
     if serielizer.is_valid():
          serielizer.save()
          return Response(serielizer.data, status=status.HTTP_202_ACCEPTED)
     return Response(status=status.HTTP_400_BAD_REQUEST)
