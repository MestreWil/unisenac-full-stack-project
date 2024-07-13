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

@api_view(['GET'])
def get_by_name(request, name):
     try:
          user = Users.objects.get(user_name=name)
     except:
          return Response(status=status.HTTP_404_NOT_FOUND)
     
     serializer = UserSerializer(user)
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
def patch_user_description(request, name):
     try:
          description = Users.objects.get(user_name=name)
     except Users.DoesNotExist():
          msg = {"msg": "User Not found"}
          return Response(msg, status=status.HTTP_404_NOT_FOUND)
     
     serializer = UserSerializer(description, data=request.data, partial=True)
     if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def patch_user_image(request, name):
     try:
          image = Users.objects.get(user_image=name)
     except Users.DoesNotExist():
          msg = {"msg": "User Not found"}
          return Response(msg, status=status.HTTP_404_NOT_FOUND)
     
     serializer = UserSerializer(image, data=request.data, partial=True)
     if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


     