from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from app.models import UserAccount, Event, Activity


class OrganizerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ("name",)


class EventSerializer(serializers.ModelSerializer):
    organizer = OrganizerSerializer()

    class Meta:
        depth = 1
        model = Event
        fields = "__all__"


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"


class UserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = UserAccount
        depth = 1
        # СЮДА ДОБАВЛЯТЬ ПОЛЯ КОТОРЫЕ ПОТОМ ОТСЫЛАЕМ НА КЛИЕНТ
        fields = ("idNumber",
                  "phone_number",
                  "country",
                  "photo",
                  "sex",
                  "email",
                  "birth_date",
                  "name",
                  "is_staff")

    def update(self, instance, validated_data):
        # password = validated_data.pop("password")
        # validated_data["password"] = instance.password
        # if password is not None:
        #     instance.set_password(password) TODO: umm uhh ,n vm guys
        # super().update(instance, validated_data)
        # instance.save()
        return instance
