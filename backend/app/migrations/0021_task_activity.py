# Generated by Django 4.2.6 on 2023-10-10 15:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0020_task'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='activity',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.activity'),
        ),
    ]