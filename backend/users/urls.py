from django.contrib import admin
from django.urls import path, include

from . import views

urlpatterns = [
     path('', views.get_all_user, name='get_all_users'),
     path('<str:name>', views.get_by_name),
     path('new_user/', views.post_user),
     path('auter_descrip/<str:name>', views.patch_user_description),
     path('auter_image/<str:name>', views.patch_user_image)
]