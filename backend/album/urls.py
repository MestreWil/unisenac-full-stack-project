from django.urls import path

from .views import list_albums, get_album, create_album, create_song

urlpatterns = [
    path('list/', list_albums, name='list_albums'),
    path('<int:pk>/detail/', get_album, name='get_album'),
    path('create/', create_album, name='create_album'),
    path('music/create/', create_song, name='create_song')
]