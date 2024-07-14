from rest_framework import serializers

from .models import Users

class UserSerializer(serializers.ModelSerializer):
     class Meta:
          model = Users
          fields = ['user_name', 'user_description', 'user_image']
          
     def validate_username(self, value):
          if User.objects.filter(user_name=value).exists():
               raise serializers.ValidationError("Username already exists.")
          return value
     
     def validate_email(self, value):
        if User.objects.filter(user_email=value).exists():
            raise serializers.ValidationError("Email already on use.")
        return value
               