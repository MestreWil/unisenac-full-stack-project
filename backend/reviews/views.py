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

@api_view(['PATCH'])
def alter_review(request, rev_id):
     try:
          review = Reviews.objects.get(pk=rev_id)
     except Reviews.DoesNotExist():
          msg = {"msg": "User Not found"}
          return Response(msg, status=status.HTTP_404_NOT_FOUND)
     
     serializer = ReviewsSerializer(review, data=request.data, partial=True)
     if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_review(request, rev_id):
     try:
          delete_review = Reviews.objects.get(pk=rev_id)
          delete_review.delete()
          return Response(status=status.HTTP_202_ACCEPTED)
     except:
          return Response(status=status.HTTP_404_NOT_FOUND0)


     