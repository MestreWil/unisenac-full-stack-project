from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('genders/', include('gender.urls'), name='gender_urls'),
    path('users/', include('users.urls'), name='users_urls'),
    path('artists/', include('artist.urls'), name='artist_urls'),
    path('album/', include('album.urls'), name='album-urls'),
    path('reviews/', include('reviews.urls'), name='reviews-urls')
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)