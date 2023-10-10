# Generated by Django 4.2.6 on 2023-10-10 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0023_alter_task_activity'),
    ]

    operations = [
        migrations.CreateModel(
            name='Captcha',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=15, null=True)),
                ('image', models.FilePathField(blank=True, null=True, path='dist/assets/images/captcha/')),
            ],
        ),
        migrations.AddField(
            model_name='useraccount',
            name='login_tries',
            field=models.IntegerField(default=0),
        ),
    ]
