from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
import uuid as _uuid



class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        """" create standard users, expects an email & password  & additional fields """
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """" create superusers """
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        superuser = self.create_user(email, password, **extra_fields)
        return superuser


class AppUser(AbstractBaseUser, PermissionsMixin):
    """User"""
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255)
    email = models.EmailField(max_length=50, unique=True)
    is_staff = models.BooleanField(default=False)

    # use the email as the unique identifier for authentication, instead of the default "username"
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["username"]
    objects = UserManager()

    def __str__(self):
        return f"{self.email} - {self.username}"


class Article(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name='articles')

    title = models.CharField(max_length=255, db_index=True)
    content = models.TextField()
    current_page = models.PositiveIntegerField(default=0)
    uuid = models.UUIDField(default=_uuid.uuid4, editable=False, unique=True)
    finished = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.id} - {self.title}"


# ----------------------------------------------------------------------------------------------------------------------
class Verb(models.Model):
    infinitive = models.CharField(max_length=255)
    translation = models.CharField(max_length=255, null=True, blank=True)
    presente = models.CharField(max_length=255, null=True, blank=True)
    perfetto = models.CharField(max_length=255, null=True, blank=True)
    gerundio = models.CharField(max_length=255, null=True, blank=True)
    imperfetto = models.CharField(max_length=255, null=True, blank=True)
    passato_remoto = models.CharField(max_length=255, null=True, blank=True)
    futuro = models.CharField(max_length=255, null=True, blank=True)
    congiuntivo_presente = models.CharField(max_length=255, null=True, blank=True)
    congiuntivo_imperfetto = models.CharField(max_length=255, null=True, blank=True)
    condizionale = models.CharField(max_length=255, null=True, blank=True)
    imperativo = models.CharField(max_length=255, null=True, blank=True)
    values = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.infinitive


class WordType(models.Model):
    type = models.CharField(max_length=255, null=True)
    full_name = models.CharField(max_length=255, null=True)
    cn = models.CharField(max_length=255, null=True)

    def __str__(self):
        return self.type


class Language(models.Model):
    name = models.CharField(max_length=255, db_index=True)

    def __str__(self):
        return self.name


class Dictionary(models.Model):
    title = models.CharField(max_length=255, db_index=True)
    source_lang = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True, related_name='source_dicts')
    target_lang = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True, related_name='target_dicts')

    def __str__(self):
        return self.title


class DictionaryWord(models.Model):
    # From Dictionary side, dictionary = Dictionary.objects.get(id=1), dictionary.words.all()
    dictionary = models.ForeignKey(Dictionary, on_delete=models.CASCADE, related_name='words')
    parent = models.ForeignKey("self", on_delete=models.SET_NULL, related_name='children', null=True, blank=True)
    # From the WordType side, noun = WordType.objects.get(name="Noun"), noun.words.all()
    word_type = models.ForeignKey(WordType, on_delete=models.SET_NULL, related_name='words', null=True, blank=True)

    word = models.CharField(max_length=255)
    translations = models.JSONField(default=list, blank=True)
    # JSONField to keep the data a list (models.TextField(blank=True) -> make data a string)
    ipa = models.CharField(max_length=255, blank=True)
    notes = models.JSONField(default=list, blank=True)

    def __str__(self):
        return f"{self.word} - {self.word_type.type}"


class Sentence(models.Model):
    """Store sentence examples from a word's translations"""
    word = models.ForeignKey(DictionaryWord, on_delete=models.SET_NULL, related_name='sentences', null=True, blank=True)
    sentence = models.TextField(blank=True)
    translation = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.word} - {self.sentence}"


