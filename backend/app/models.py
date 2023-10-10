import os
import uuid

from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from core.settings import BASE_DIR


def images_path():
    return os.path.join(BASE_DIR, "dist/assets/images")


class Task(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    activity = models.ForeignKey(to="Activity", on_delete=models.SET_NULL, null=True, blank=True, related_name="tasks")
    creator = models.ForeignKey(to="UserAccount", on_delete=models.SET_NULL, null=True, blank=True)


class Activity(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    day = models.IntegerField()
    starts = models.TimeField()
    event = models.ForeignKey(to="Event", on_delete=models.CASCADE, null=True, blank=True, related_name="activities")
    moderator = models.ForeignKey(to="Jury", on_delete=models.SET_NULL, null=True, blank=True,
                                  related_name="moderated_activity")
    juries = models.ManyToManyField(to="Jury", related_name="judicating_activity")
class Captcha(models.Model):
    name = models.CharField(max_length=15, null=True, blank=True)
    image = models.FilePathField(path="dist/assets/images/captcha/", blank=True, null=True)
class Event(models.Model):
    name = models.CharField(max_length=255)
    starts = models.DateField()
    duration_days = models.IntegerField()
    description = models.CharField(max_length=1023, null=True, blank=True)
    city = models.ForeignKey(to="City", on_delete=models.SET_NULL, null=True, blank=True)
    photo = models.FilePathField(path="dist/assets/images/events/", blank=True, null=True)
    winner = models.ForeignKey(to="UserAccount", on_delete=models.SET_NULL, null=True, blank=True)
    organizer = models.ForeignKey(to="UserAccount", on_delete=models.SET_NULL, null=True, blank=True,
                                  related_name="organized_event")


class Country(models.Model):
    name = models.CharField(max_length=255)
    english_name = models.CharField(max_length=255)
    char_code = models.CharField(max_length=5)
    int_code = models.IntegerField()


# Create your models here.
class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email required!')

        email = self.normalize_email(email)
        user = self.model(email=email, idNumber=uuid.uuid4(), **extra_fields)
        user.set_password(password)
        user.save()
        return user

    # создать админа
    def create_superuser(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email required!')
        email = self.normalize_email(email)
        user = self.model(email=email, idNumber=uuid.uuid4(), **extra_fields)
        user.set_password(password)
        user.is_superuser = 1
        user.is_staff = 1
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    # TODO: password validation has to be somewhere
    idNumber = models.UUIDField(unique=True,
                                default=uuid.uuid4,
                                editable=False)
    objects = UserAccountManager()
    login_tries = models.IntegerField(default=0)
    phone_number = models.IntegerField()
    country = models.ForeignKey(to="Country", on_delete=models.SET_NULL, blank=True, null=True)
    photo = models.FilePathField(path="dist/assets/images/users/", blank=True, null=True)
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
    REQUIRED_FIELDS = ['name', "phone_number",
                       "sex",
                       "email",
                       "birth_date"]  # обязательные поля

    def __str__(self):
        return self.name


class City(models.Model):
    number = models.IntegerField()
    name = models.CharField(max_length=63, null=True, blank=True)


class Jury(models.Model):
    user = models.OneToOneField(to=UserAccount, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=[
        ("J", "Jury"),
        ("M", "Moderator")
    ])
    range = models.CharField(max_length=127)
