from django.shortcuts import render
from djoser.views import UserViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from app.models import Event, Activity, Jury, City, UserAccount, Captcha
from app.permissions import IsAdminUserOrReadOnly
from app.serializers import EventSerializer, ActivitySerializer, CitySerializer, JurySerializer, CaptchaSerializer
from app.services import create_event


# Create your views here.
class CaptchaView(ModelViewSet):
    queryset = Captcha.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = CaptchaSerializer


class EventView(ModelViewSet):
    queryset = Event.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]  # TODO: is_staff or readonly
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):

        # photo TODO: <--
        try:
            create_event(request)
            return Response(status=201, data="good")
        except:
            return Response(status=400, data="bad")


class JuryView(ModelViewSet):
    queryset = UserAccount.objects.filter(jury__role="J")
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = JurySerializer


class CityView(ModelViewSet):
    queryset = City.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = CitySerializer


class ActivityView(ModelViewSet):
    queryset = Activity.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = ActivitySerializer


class UserAPIView(GenericViewSet):
    @action(methods=["PATCH"], detail=False, permission_classes=[IsAuthenticated])
    def credentials(self, request):
        # TODO: поменять
        # {
        #     "old_password": string,
        #     "new_password": string,
        #     ...
        # }
        new_password = request.data.get("new_password")
        re_new_password = request.data.get("re_new_password")
        birth_date = request.data.get("birth_date")
        name = request.data.get("name")
        old_password = request.data.get("old_password")
        phone_number = request.data.get("phone_number")
        new_email = request.data.get("email")
        user = request.user
        print(user.check_password(old_password), old_password)
        if user.check_password(old_password):
            if new_password is not None and len(new_password) > 7 and new_password == re_new_password:
                user.set_password(new_password)
            if new_email is not None and len(new_email) > 0:
                user.email = new_email
            if name is not None and len(name) > 0:
                user.name = name
            if birth_date is not None and len(birth_date) > 0:
                user.birth_date = birth_date
            if phone_number is not None and len(phone_number) > 0:
                user.phone_number = phone_number
            user.save()
            print(user.name, user.email)
            return Response("credentials updated successfully", 200)
        return Response("very bad response", 400)
