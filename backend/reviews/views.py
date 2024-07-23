from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from reviews.models import Reviews
from reviews.serializers import ReviewsSerializer


import json


@api_view(['GET'])
def get_all_reviews(request):
     try:
          reviews = Reviews.objects.all()
     except:
          return Response(status=status.HTTP_404_NOT_FOUND)
     
     serializer = ReviewsSerializer(reviews, many=True)
     return Response(serializer.data)
     


@api_view(['POST'])
def create_review(request):
     serializer = ReviewsSerializer(data=request.data)
     if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)