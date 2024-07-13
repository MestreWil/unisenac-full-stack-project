from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Gender
from .serializers import GenderSerializer

import json

@api_view(['GET'])
def get_gender(request):
     
     if request.method == 'GET':
          gender = Gender.objects.all()
     
          serializers = GenderSerializer(gender, many=True)
     
          return Response(serializers.data)
     return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_by_name(request, name):
     try:
          gender = Gender.objects.get(gender_name=name)
     except:
          return Response(status=status.HTTP_404_NOT_FOUND)
     
     serializer = GenderSerializer(gender)
     return Response(serializer.data)

@api_view(['POST'])
def post_gender(request):
     new_gender = request.data
     serializer = GenderSerializer(data=new_gender)
     
     if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
     return Response(status=status.HTTP_400_BAD_REQUEST)
          