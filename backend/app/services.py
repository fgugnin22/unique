from app.models import Event, City, Activity, Jury


def create_event(request):
    body = request.data
    name = body.get("formState").get("name")
    starts = body.get("formState").get("starts")
    duration_days = body.get("formState").get('duration_days')
    description = body.get("formState").get('description')
    city = body.get("formState").get("city")
    activities = body.get('activityState')
    organizer = request.user
    event = Event.objects.create(name=name,
                                 starts=starts,
                                 duration_days=duration_days,
                                 description=description,
                                 city=City.objects.get(name=city),
                                 organizer=organizer, )

    a1 = Activity.objects.create(
        name=activities.get('name1'),
        day=1,
        starts=activities.get('starts1'),
    )
    a1.juries.add(Jury.objects.get(user__name=activities.get("jury1")))
    a2 = Activity.objects.create(
        name=activities.get('name2'),
        day=1,
        starts=activities.get('starts2'),
    )
    a2.juries.add(Jury.objects.get(user__name=activities.get("jury2")))
    a3 = Activity.objects.create(
        name=activities.get('name3'),
        day=1,
        starts=activities.get('starts3'),
    )
    a3.juries.add(Jury.objects.get(user__name=activities.get("jury3")))
    a1.event = event
    a2.event = event
    a3.event = event
    event.save()
    a1.save()
    a2.save()
    a3.save()
