from django.contrib import admin
from app.models import Activity, Event, Country, UserAccount, City, Jury, Task

# Register your models here.
admin.site.register([Activity, Event, Country, UserAccount, City, Jury, Task])
