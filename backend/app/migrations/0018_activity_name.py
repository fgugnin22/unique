# Generated by Django 4.2.6 on 2023-10-09 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0017_event_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='name',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
