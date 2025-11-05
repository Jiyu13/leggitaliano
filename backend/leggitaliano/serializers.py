# convert model instances to JSON so that frontend can work with the received data
from django.contrib.auth import authenticate
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


class AppUserLoginSerializer(serializers.Serializer):
    """ authenticate username & password of the user"""
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(email=clean_data['email'], password=clean_data['password'])
        if not user:
            raise serializers.ValidationError(
                {"email": ["Invalid email or password. Please try again."]})  # Use DRF's ValidationError
        return user


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = "__all__"
        read_only_fields = ("user", "uuid", "current_page", "finished", "created_at", "update_at")


class WordTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WordType
        fields = "__all__"


class DictionaryWordSerializer(serializers.ModelSerializer):
    # show word_type.type instead of id in return data
    word_type = serializers.CharField(source="word_type.type", allow_null=True)

    class Meta:
        model = DictionaryWord
        fields = "__all__"


class SentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sentence
        fields = "__all__"
