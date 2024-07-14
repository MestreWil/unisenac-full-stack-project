from django.db import models
from gender.models import Gender
from artist.models import Artist
class Album(models.Model):
     album_id = models.AutoField(primary_key=True, null=False)
     album_name = models.CharField(max_length=255, null=False)
     album_release = models.CharField(max_length=4, null=False)
     album_description = models.TextField(null=False)
     album_link = models.TextField(null=True, blank=True)
     album_image = models.ImageField(null=False, upload_to="album_images")
     album_gender = models.ForeignKey(Gender, on_delete=models.CASCADE, related_name='gender_album')
     album_artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='name_artist')
     
     def __str__(self):
          return f'Name: {self.album_name} | link: {self.album_link} | Year: {self.album_release} | Gender: {self.album_gender} | Artist: {self.album_artist}'