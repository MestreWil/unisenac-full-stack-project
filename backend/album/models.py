from django.db import models
from gender.models import Gender
from artist.models import Artist
class Album(models.Model):
     album_id = models.AutoField(primary_key=True, null=False)
     album_name = models.CharField(max_length=255, null=False)
     album_release = models.CharField(max_length=4, null=False)
     album_description = models.TextField(null=False)
     album_link = models.TextField(null=True, blank=True)
     album_image = models.ImageField(null=False, upload_to="images/album_images")
     id_gender = models.ForeignKey(Gender, on_delete=models.CASCADE, related_name='style')
     id_artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='band')
     
     def __str__(self):
          return f'Name: {self.album_name} | link: {self.album_link} | Year: {self.album_release} | Gender: {self.id_gender} | Artist: {self.id_artist}'