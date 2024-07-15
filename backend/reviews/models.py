from django.db import models

from users.models import Users
from album.models import Album

class Reviews(models.Model):
     review_id = models.AutoField(primary_key=True)
     review_mes = models.TextField(null=False)
     review_sco = models.IntegerField(null=False, default=0)
     review_user = models.ForeignKey(Users, on_delete=models.DO_NOTHING, related_name='user')
     review_album = models.ForeignKey(Album, on_delete=models.DO_NOTHING, related_name='album')
     
