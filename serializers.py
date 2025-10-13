# convert model instances to JSON so that frontend can work with the received data

from rest_framework import serializers
from .models import *


class AppUserSerializer(serializers.ModelSerializer):
    """ based on the model AppUser & returns user """
    class Meta:
        model = AppUser
        fields = ['user_id', 'username', 'email', 'is_staff']