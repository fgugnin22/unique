import os

from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from core.settings import BASE_DIR


def images_path():
    return os.path.join(BASE_DIR, "static/images")


class Activity(models.Model):
    day = models.IntegerField(max_length=3)
    starts = models.TimeField()
    moderator = models.ForeignKey(to="Jury", on_delete=models.SET_NULL)
    juries = models.ManyToManyField(to="Jury")


class Event(models.Model):
    name = models.CharField(max_length=255)
    starts = models.DateField()
    duration_days = models.IntegerField(max_length=3)
    activities = models.ManyToManyField(to="Activity")
    city = models.ManyToManyField(to="City")
    winner = models.ForeignKey(to="UserAccount", on_delete=models.SET_NULL, null=True, blank=True)


class Country(models.Model):
    name = models.CharField(max_length=255)
    english_name = models.CharField(max_length=255)
    char_code = models.CharField(max_length=5)
    int_code = models.IntegerField(max_length=10)


# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email required!')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    # создать админа
    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email required!')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.is_superuser = 1
        user.is_staff = 1
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    # TODO: password validation has to be somewhere
    idNumber = models.UUIDField()
    objects = UserAccountManager()
    phone_number = models.IntegerField()
    country = models.ManyToManyField(to="Country")
    photo = models.FilePathField(path=images_path)
    sex = models.CharField(max_length=10,
                           default='male',
                           choices=[
                               ('m', 'male'),
                               ('f', 'female')
                           ])
    email = models.EmailField(max_length=255, unique=True)
    birth_date = models.DateField()
    name = models.CharField(max_length=255, unique=True)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'idNumber'  # что является логином
    REQUIRED_FIELDS = ['name']  # обязательные поля

    def __str__(self):
        return self.name


class City(models.Model):
    number = models.IntegerField(max_length=10)
    image = models.FilePathField(path=images_path)


class Jury(UserAccount):
    event = models.ManyToManyField(to="Event")
    role = models.CharField(max_length=10, choices=[
        ("J", "Jury"),
        ("M", "Moderator")
    ])
    range = models.CharField(max_length=127)
