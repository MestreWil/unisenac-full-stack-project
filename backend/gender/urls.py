from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
     path('', views.get_gender, name='get_all_gender'),
     path('<str:name>', views.get_by_name),
     path('new_gender/', views.post_gender),
]