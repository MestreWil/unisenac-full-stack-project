# Generated by Django 5.0.4 on 2024-07-14 03:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('gender', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('artist_id', models.AutoField(primary_key=True, serialize=False)),
                ('artist_name', models.CharField(max_length=100)),
                ('artist_description', models.TextField()),
                ('artist_image', models.TextField()),
                ('art_gender', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='style', to='gender.gender')),
            ],
        ),
    ]
