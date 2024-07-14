from django.db import models

class Users(models.Model):
     user_id = models.AutoField(primary_key=True, null=False)
     user_name = models.CharField(max_length=25, null=False)
     user_password = models.CharField(max_length=15, null=False)
     user_email = models.EmailField(null=False)
     user_description = models.TextField(null=True, blank=True)
     user_image = models.ImageField(null=True, blank=True, upload_to="user_images")
     
     def __str__(self):
          return f'Name: {self.user_name} | Email: {self.user_email}'

