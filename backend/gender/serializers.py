from rest_framework import serializers

from .models import Gender

class GenderSerializer(serializers.ModelSerializer):
     class Meta:
          model = Gender
          fields = '__all__'