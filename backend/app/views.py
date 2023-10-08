from django.shortcuts import render
from djoser.views import UserViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from app.models import Event, Activity, Jury
from app.permissions import IsAdminUserOrReadOnly
from app.serializers import EventSerializer, ActivitySerializer


# Create your views here.
class EventView(ModelViewSet):
    queryset = Event.objects.all()
    permission_classes = [IsAdminUserOrReadOnly]
    serializer_class = EventSerializer


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
        old_password = request.data.get("old_password")
        new_email = request.data.get("email")
        new_name = request.data.get('name')
        user = request.user
        if user.check_password(old_password):
            if new_password is not None and len(new_password) > 7:
                user.set_password(new_password)
            if new_email is not None:
                user.email = new_email
            if new_name is not None:
                user.name = new_name
            user.save()
            print(user.name, user.emal)
            return Response("credentials updated successfully", 200)
        return Response("very bad response", 400)
