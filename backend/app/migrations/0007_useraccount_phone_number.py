# Generated by Django 4.2.6 on 2023-10-08 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_remove_useraccount_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='phone_number',
            field=models.IntegerField(default=79818910218),
            preserve_default=False,
        ),
    ]