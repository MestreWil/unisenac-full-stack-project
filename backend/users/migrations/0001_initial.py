# Generated by Django 5.0.4 on 2024-07-13 06:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('user_name', models.CharField(max_length=25)),
                ('user_password', models.CharField(max_length=15)),
                ('user_email', models.EmailField(max_length=254)),
                ('user_description', models.TextField(blank=True, null=True)),
                ('user_image', models.ImageField(blank=True, null=True, upload_to='images/')),
            ],
        ),
    ]
