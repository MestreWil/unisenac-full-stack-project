from django.db import models

class Album(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    author = models.CharField(max_length=255)
    release_date = models.DateField()

    def __str__(self) -> str:
        return f"{self.name} - {self.author}"

class Music(models.Model):
    title = models.CharField(max_length=100)
    duration = models.IntegerField()

    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name="songs")

    def __str__(self) -> str:
        return f"{self.title}"
