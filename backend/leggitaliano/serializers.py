# convert model instances to JSON so that frontend can work with the received data

from rest_framework import serializers
from .models import *


class AppUserSerializer(serializers.ModelSerializer):
    """ based on the model AppUser & returns user """
    class Meta:
        model = AppUser
        fields = ['user_id', 'username', 'email', 'is_staff']


class AppUserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = "__all__"
        extra_kwargs = {"password": {"write_only": True}}  # so password won't show in API response

    def create(self, clean_data):
        new_user = AppUser.objects.create_user(
            email=clean_data['email'],
            password=clean_data['password'],
            username=clean_data['username']
        )
        new_user.save()
        return new_user
