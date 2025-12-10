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
    """Get words, Post word, Get word by word, Get word by id, Update translation by id"""
    # write with id, in the client requests
    word_type_id = serializers.PrimaryKeyRelatedField(source="word_type", queryset=WordType.objects.all(), write_only=True)
    parent_id = serializers.PrimaryKeyRelatedField( source="parent", queryset=DictionaryWord.objects.all(), write_only=True, allow_null=True)
    # read as label,returns in the response
    word_type = serializers.SlugRelatedField(read_only=True, slug_field="type")
    parent = serializers.SlugRelatedField(read_only=True, slug_field="word")

    # translations = serializers.SerializerMethodField()
    # notes = serializers.SerializerMethodField()
    translations = serializers.JSONField(required=False)
    notes = serializers.JSONField(required=False)

    class Meta:
        model = DictionaryWord
        fields = (
            "id", "dictionary", "parent_id", "parent", "word", "translations", "ipa", "notes",
            "is_inherit_translations",
            "word_type_id",   # write-only
            "word_type",      # read-only label
        )

    def to_representation(self, instance):
        """
            On read: if this word has empty translations / notes and a parent,
            fall back to the parent's translations / notes.
            DB stores only the child's own data; inheritance is virtual.
        """
        data = super().to_representation(instance)

        # Normalize types to something predictable
        translations = data.get("translations")
        notes = data.get("notes")

        # If child has no translations and has a parent, inherit from parent
        if (not translations) and instance.parent:
            data["translations"] = instance.parent.translations
        if (not notes) and instance.parent:
            data["notes"] = instance.parent.notes
        return data

    # def get_translations(self, obj):
    #     """ check if word has a parent, if so, show the parent translations """
    #     # # if not, show its own translations
    #     if obj.parent:
    #         return obj.parent.translations
    #     return obj.translations
    #
    # def get_notes(self, obj):
    #     """ check if word has a parent, if so, show the parent translations if not, show its own translations"""
    #     if obj.parent:
    #         return obj.parent.notes
    #     return obj.notes


class DictionaryWordEditSerializer(serializers.ModelSerializer):
    """Update word by id"""
    word_type_id = serializers.PrimaryKeyRelatedField(source="word_type", queryset=WordType.objects.all(), write_only=True)
    parent_id = serializers.PrimaryKeyRelatedField( source="parent", queryset=DictionaryWord.objects.all(), write_only=True, allow_null=True)
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
