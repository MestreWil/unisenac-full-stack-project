# Generated by Django 5.0.4 on 2024-07-14 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='user_image',
            field=models.ImageField(blank=True, null=True, upload_to='user_images'),
        ),
    ]