from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
     path('', views.get_all_user, name='get_all_users'),
     path('new_user/', views.post_user),
]