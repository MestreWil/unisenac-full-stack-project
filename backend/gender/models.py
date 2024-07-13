from django.db import models

class Gender(models.Model):
     gender_id = models.AutoField(primary_key=True)
     gender_name = models.CharField(max_length=25, null=False)
     
     def __str__(self):
          return f'Gender: {self.gender_name}'
     
     