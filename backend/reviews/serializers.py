from rest_framework import serializers
from .models import Reviews

class ReviewsSerializer(serializers.ModelSerializer):
  class Meta:
    model = Reviews
    fields = ["review_user_id","review_mes", "review_sco", "review_album_id"]