# Generated by Django 4.2.6 on 2023-10-08 14:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_remove_city_image_event_photo_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='country',
        ),
        migrations.AddField(
            model_name='useraccount',
            name='country',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.country'),
        ),
    ]
