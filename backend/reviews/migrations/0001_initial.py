# Generated by Django 5.0.4 on 2024-07-14 20:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('album', '0002_alter_album_album_image'),
        ('users', '0002_alter_users_user_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('review_id', models.AutoField(primary_key=True, serialize=False)),
                ('review_mes', models.TextField()),
                ('review_sco', models.IntegerField(default=0)),
                ('review_album', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='album', to='album.album')),
                ('review_user', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='user', to='users.users')),
            ],
        ),
    ]
