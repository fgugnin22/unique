# Generated by Django 4.2.6 on 2023-10-08 12:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_useraccount_phone_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useraccount',
            name='phone_number',
        ),
    ]