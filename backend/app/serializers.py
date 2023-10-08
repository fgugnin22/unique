from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from app.models import UserAccount


class UserSerializer(UserCreateSerializer):
    team_status = serializers.SlugField(read_only=True)

    class Meta(UserCreateSerializer.Meta):
        model = UserAccount
        # СЮДА ДОБАВЛЯТЬ ПОЛЯ КОТОРЫЕ ПОТОМ ОТСЫЛАЕМ НА КЛИЕНТ
        fields = "__all__"

    def update(self, instance, validated_data):
        # password = validated_data.pop("password")
        # validated_data["password"] = instance.password
        # if password is not None:
        #     instance.set_password(password) TODO: umm uhh ,n vm guys
        # super().update(instance, validated_data)
        # instance.save()
        return instance
