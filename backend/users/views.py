from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Users

from reviews.models import Reviews

from reviews.serializers import ReviewsSerializer

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
          reviews = Reviews.objects.filter(review_user=user.user_id)
          user.reviews = reviews
     except:
          return Response(status=status.HTTP_404_NOT_FOUND)
     
     serializer = UserSerializer(user)
     return Response(serializer.data)

@api_view(['GET'])
def get_reviews_user(request, username):
     try:
          user = Users.objects.get(user_name=username)
          reviews = Reviews.objects.filter(review_user=user.user_id)
          serializers = ReviewsSerializer(reviews, many=True)
          return Response(serializers.data, status=status.HTTP_200_OK)
     except Users.DoesNotExist:
          return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
          
@api_view(['POST'])
def post_user(request):
     serializer = UserSerializer(data=request.data)
     if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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


     