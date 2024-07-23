from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
     path('', views.get_all_reviews, name='get_all_reviews'),
     path('post_review/', views.create_review)
]