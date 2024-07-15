from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
     path('', views.get_all_albuns, name='get_all'),
     path('<str:name>/reviews', views.get_reviews_albums),
     path('<str:name>', views.get_album)
]