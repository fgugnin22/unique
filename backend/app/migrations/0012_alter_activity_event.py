# Generated by Django 4.2.6 on 2023-10-08 17:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_alter_event_photo_alter_useraccount_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='event',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='app.event'),
        ),
    ]
