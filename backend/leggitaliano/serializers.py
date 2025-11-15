# convert model instances to JSON so that frontend can work with the received data
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
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
    # write with id, in the client requests
    word_type_id = serializers.PrimaryKeyRelatedField(source="word_type", queryset=WordType.objects.all(), write_only=True)
    parent_id = serializers.PrimaryKeyRelatedField(
        source="parent", queryset=DictionaryWord.objects.all(), write_only=True, allow_null=True
    )
    # read as label,returns in the response
    word_type = serializers.SlugRelatedField(read_only=True, slug_field="type")
    parent = serializers.SlugRelatedField(read_only=True, slug_field="word")

    translations = serializers.SerializerMethodField()

    class Meta:
        model = DictionaryWord
        fields = (
            "id", "dictionary", "parent_id", "parent",
            "word_type_id",   # write-only
            "word_type",      # read-only label
            "word", "translations", "ipa", "notes",
        )

    def get_translations(self, obj):
        """ check if word has a parent, if so, show the parent translations """
        # # if not, show its own translations
        if obj.parent:
            return obj.parent.translations
        return obj.translations


class DictionaryWordEditSerializer(serializers.ModelSerializer):
    word_type_id = serializers.PrimaryKeyRelatedField(source="word_type", queryset=WordType.objects.all(), write_only=True)
    parent_id = serializers.PrimaryKeyRelatedField(
        source="parent", queryset=DictionaryWord.objects.all(), write_only=True, allow_null=True
    )
    # read as label,returns in the response
    word_type = serializers.SlugRelatedField(read_only=True, slug_field="type")
    parent = serializers.SlugRelatedField(read_only=True, slug_field="word")

    class Meta:
        model = DictionaryWord
        fields = (
            "id", "dictionary", "parent_id", "parent",
            "word_type_id",   # write-only
            "word_type",      # read-only label
            "word", "translations", "ipa", "notes",
        )


class SentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sentence
        fields = "__all__"
