from django.db import models

from gender.models import Gender
class Artist(models.Model):
     artist_id = models.AutoField(primary_key=True)
     artist_name = models.CharField(max_length=100, null=False)
     artist_description = models.TextField(null=False)
     artist_image = models.ImageField(null=False, upload_to="artist_images")
     art_gender = models.ForeignKey(Gender, on_delete=models.DO_NOTHING, related_name='style')
     
     def __str__(self):
          return f'Name: {self.artist_name} |  Gender: {self.art_gender}'