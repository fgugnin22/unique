# Generated by Django 4.2.6 on 2023-10-10 16:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0021_task_activity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='event',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='activities', to='app.event'),
        ),
    ]
