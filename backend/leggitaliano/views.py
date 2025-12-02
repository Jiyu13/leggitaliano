from django.core.exceptions import ValidationError
from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.exceptions import NotFound
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.db import transaction


from .models import *
from .serializers import *
from .user_validations import custom_validation


class AppUserView(APIView):
    permission_classes = (permissions.IsAdminUser,)
    authentication_classes = (JWTAuthentication,)

    def get(self, request):
        if not request.user.is_staff:
            return Response({"detail": "403 Forbidden"}, status=status.HTTP_403_FORBIDDEN)
        users = AppUser.objects.all()
        serializer = AppUserSerializer(users, many=True)
        return Response(serializer.data)


class AppUserRegisterView(APIView):
    """ can be access by anyone, only has a post method. """
    permission_classes = (permissions.AllowAny, )

    def post(self, request):
        validate_data = custom_validation(request.data)
        if 'errors' in validate_data:
            return Response(validate_data['errors'], status=status.HTTP_400_BAD_REQUEST)

        serializer = AppUserRegisterSerializer(data=validate_data)
        if serializer.is_valid(raise_exception=True):
            # create user
            user = serializer.create(validate_data)
            if user:
                # create refresh+access tokens
                refresh = RefreshToken.for_user(user)
                access = refresh.access_token
                return Response(
                    {
                        "user": {
                            "user_id": user.user_id,
                            "username": user.username,
                            "email": user.email,
                        },
                        "refresh": str(refresh),
                        "access": str(access),
                    },
                    status=status.HTTP_201_CREATED
                )
        return Response(status=status.HTTP_400_BAD_REQUEST)


class AppUserLoginView(APIView):
    """ can be accessed by anyone """
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        serializer = AppUserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(request.data)

            # for session auth
            # login(request, user)

            # issue tokens
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            user_data = {
                'id': user.user_id,
                'username': user.username,
                'email': user.email
            }
            return Response(
                {
                    "user": user_data,
                    "refresh": str(refresh),
                    "access": str(access),
                },
                status=status.HTTP_200_OK
            )


class GetUserView(APIView):
    """ /me/ endpoint that returns the currently logged in user"""
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (JWTAuthentication,)

    def get(self, request):
        serializer = AppUserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AppUserLogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist() # Invalidate token
            return Response({"detail": "Logout successful"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ArticlesByUserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        articles = Article.objects.filter(user=request.user)
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({"error": "Failed to create new content."}, status=status.HTTP_400_BAD_REQUEST)


class ArticlesByIDView(APIView):
    def get(self, request, article_id):
        article = get_object_or_404(Article, pk=article_id, user=request.user)
        serializer = ArticleSerializer(article)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, article_id):
        article = get_object_or_404(Article, pk=article_id, user=request.user)
        serializer = ArticleSerializer(article, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, article_id):
        article = get_object_or_404(Article, pk=article_id, user=request.user)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class WordTypeView(APIView):
    # permission_classes = (permissions.IsAdminUser,)
    authentication_classes = (JWTAuthentication,)

    def get(self, request):
        # if not request.user.is_staff:
        #     return Response({"detail": "403 Forbidden"}, status=status.HTTP_403_FORBIDDEN)
        types = WordType.objects.all().order_by('type')
        serializer = WordTypeSerializer(types, many=True)
        return Response(serializer.data)


class DictionaryWordView(APIView):
    authentication_classes = (JWTAuthentication,)

    def get(self, request):
        if not request.user.is_staff:
            return Response({"detail": "403 Forbidden"}, status=status.HTTP_403_FORBIDDEN)
        words = DictionaryWord.objects.all()
        serializer = DictionaryWordSerializer(words, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """Accept word_type id as string, Return a word with new type."""
        if not request.user.is_staff:
            return Response({"detail": "403 Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        word = request.data.get('word')
        word_type_id = request.data.get('word_type_id')   # a string
        translations = request.data.get('translations')
        parent_string = request.data.get('parent')
        ipa = request.data.get('ipa')
        notes_string = request.data.get("notes")   # a string, need to be separated by "; " | null
        parent_word = DictionaryWord.objects.filter(word__iexact=parent_string, word_type=int(word_type_id)).first()
        parent_word_id = parent_word.id if parent_word else None
        # print("parent_word-----------------------", parent_string, parent_word)

        # =============== For "notes" field ------ check if a word has a parent and is a verb ==========================
        if parent_word and int(word_type_id) in [9, 12, 62, 63, 64, 65, 66, 67, 68]:
            verb = Verb.objects.filter(infinitive=parent_word.word).first()
            if verb is None:
                # if parent_word.word doesn't exist in Verb.objects
                notes = notes_string.split("; ") if isinstance(notes_string, str) else []
            else:
                notes = getattr(verb, notes_string, None)   # need to make string into a list
        else:
            notes = notes_string.split("; ") if isinstance(notes_string, str) else []

        # ================ For "translations" field ------  On Write  ==================================================
        # if parent exists, DON'T copy its translation into child
        # Let the child be blank and inherit at read time
        if parent_word:
            translations_to_save = []
        else:
            translations_to_save = translations or []
        # =========================================================================================================="""
        data = {
            "dictionary": 1,
            "word": word,  # If Sentence.word is a FK
            "word_type_id": int(word_type_id),
            "translations": translations_to_save,
            "parent_id": parent_word_id,
            "ipa": ipa,
            "notes": notes,
        }
        # print(data)
        new_word_serializer = DictionaryWordSerializer(data=data)
        if not new_word_serializer.is_valid():
            return Response(new_word_serializer.errors, status=400)
        obj = new_word_serializer.save()
        new_word_out = DictionaryWordSerializer(obj).data

        return Response({"data": new_word_out, "ipa": ipa}, status=status.HTTP_201_CREATED)


class DictionaryWordByWordView(APIView):
    authentication_classes = (JWTAuthentication,)

    def get(self,  request, word):
        words = DictionaryWord.objects.filter(word__iexact=word).order_by("word_type__type")
        if not words.exists():
            return Response({"error": "Word not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = DictionaryWordSerializer(words, many=True)
        data = serializer.data
        ipa = data[0]["ipa"]

        formatted_data = {
            "ipa": ipa,
            "data": data
        }
        return Response(formatted_data, status=status.HTTP_200_OK)


class DictionaryWordByIDView(APIView):
    def get(self, request, word_id):
        word = DictionaryWord.objects.get(pk=word_id)
        if word:
            serializer = DictionaryWordSerializer(word)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            response = {"error": "Word not found"}
            return Response(response)

    def patch(self, request, word_id):
        """ Edit word form """
        if not request.user.is_staff:
            return Response({"detail": "403 Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        word_type_string = request.data.get('word_type')  # a string of type.type
        parent_string = request.data.get('parent')
        ipa = request.data.get('ipa')
        translations = request.data.get('translations')
        notes_string = request.data.get("notes")    # a list

        word = DictionaryWord.objects.get(pk=word_id)
        word_type = WordType.objects.get(type=word_type_string)

        parent_word = DictionaryWord.objects.filter(word__iexact=parent_string, word_type=word_type.id).first()

        # 1. ------------------------- if parent word exists------------------------------------------------------------
        if parent_word:
            # 2. if word IS a verb
            if parent_word.word_type.id in [9, 12, 62, 63, 64, 65, 66, 67, 68, 96]:
                if len(notes_string) != 0:
                    # 3. notes_String is not empty, add verb conjugation based on the notes[0] value -- verb tense
                    verb = Verb.objects.filter(infinitive=word.parent.word).first()
                    verb_conjugation = getattr(verb, notes_string[0], None)
                    verb_tense = notes_string[0].replace("_", " ")
                    verb_conjugation.insert(0, verb_tense)
                    updated = {
                        "word": word.word,
                        "word_type_id": word_type.id,
                        "parent_id": parent_word.id,
                        "ipa": ipa,
                        "notes": verb_conjugation
                    }
                else:
                    # 4. notes_String = []
                    updated = {
                        "word": word.word,
                        "word_type_id": word_type.id,
                        "parent_id": parent_word.id,
                        "ipa": ipa,
                        "notes": []
                    }

            else:
                # 5. if word is NOT a verb, notes_string is usually empty or inherits from parent word
                if len(notes_string) != 0:
                    updated = {
                        "word": word.word,
                        "word_type_id": word_type.id,
                        "parent_id": parent_word.id,
                        "ipa": ipa,
                        "notes": notes_string.split("; ") if isinstance(notes_string, str) else notes_string
                    }
                else:
                    # 6. inherit notes from parent
                    updated = {
                        "word": word.word,  # If Sentence.word is a FK
                        "word_type_id": word_type.id,
                        "parent_id": parent_word.id,
                        "ipa": ipa,
                    }
        else:
            # 6. set parent word None if parent word does not exist
            # parent_word = DictionaryWord.objects.filter(word__iexact=parent_string, word_type=word_type.id).first()
            updated = {
                "word": word.word,
                "word_type_id": word_type.id,
                "parent_id": None,
                "ipa": ipa,
                "translations": translations,
                "notes": notes_string #.split("; ") if isinstance(notes_string, str) else notes_string
                #notes_string[0].split(", ") if len(notes_string) != 0 else notes_string,
            }
        # print(updated)
        serializer = DictionaryWordSerializer(word, data=updated, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, word_id):
        if not request.user.is_staff:
            return Response({"detail": "403 Forbidden"}, status=status.HTTP_403_FORBIDDEN)
        word = DictionaryWord.objects.get(pk=word_id)
        print(word)
        word.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TranslationUpdateByWordIDView(APIView):
    """Receive the updated translation_item of word[translations] , Return the target word by id"""
    def patch(self, request, word_id):
        if not request.user.is_staff:
            return Response({"detail": "403 Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        updated_translation = request.data.get('translation')
        translation_index = request.data.get('translation_index')

        word = DictionaryWord.objects.get(pk=word_id)
        word.translations[translation_index] = ';'.join(updated_translation)  # frontend split list by ";:"
        word.save(update_fields=["translations"])
        word_out = DictionaryWordSerializer(word).data
        return Response(word_out, status=status.HTTP_200_OK)


class GetAllSentencesView(ListAPIView):
    authentication_classes = (JWTAuthentication,)
    queryset = Sentence.objects.all()
    serializer_class = SentenceSerializer


class CreateSentenceView(CreateAPIView):
    """create sentence + remove the sentence from word translations"""

    @transaction.atomic
    def post(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return Response({"detail": "403 Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        word_id = kwargs["word_id"]
        dict_word = DictionaryWord.objects.get(pk=word_id)
        word = request.data.get('word')
        word_type = request.data.get('word_type')
        updated_translation = request.data.get('translation')
        translation_index = request.data.get('translation_index')

        sentence = request.data.get("sentence")
        sentence_translation = request.data.get("sentence_translation")

        # print("dict_word", type(dict_word.translations[translation_index]))
        # print(f"updated_translation-{updated_translation}----{';'.join(updated_translation)}")
        # print(f"translation_index-{translation_index}")

        # 1) check if word exists before adding sentence + updating word
        try:
            dict_word = DictionaryWord.objects.select_for_update().get(pk=word_id)
        except DictionaryWord.DoesNotExist:
            raise NotFound("Word not found.")

        # 2). add the sentence - using serializer (or model)
        new_sentence_serializer = SentenceSerializer(data={
            "word": word_id,  # If Sentence.word is a FK
            "sentence": sentence,
            "translation": sentence_translation,
        })
        new_sentence_serializer.is_valid(raise_exception=True)
        new_sentence_serializer.save()
        sentence_out = new_sentence_serializer.data

        # 3_. remove sentence from word[translations]
        # with passed in value updated_translation - word["translation"][index]
        dict_word.translations[translation_index] = ';'.join(updated_translation)   # frontend split list by ";:"
        dict_word.save(update_fields=["translations"])
        word_out = DictionaryWordSerializer(dict_word).data

        return Response({"sentence": sentence_out, "word": word_out}, status=status.HTTP_201_CREATED)


class SentenceByIdView(APIView):
    authentication_classes = (JWTAuthentication,)

    def get(self, request, word_id, sentence_id):
        sentence = Sentence.objects.get(pk=sentence_id)
        if sentence:
            serializer = SentenceSerializer(sentence)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            response = {"error": "Sentence not found"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, word_id, sentence_id):
        if not request.user.is_staff:
            return Response({"detail": "403 Forbidden"}, status=status.HTTP_403_FORBIDDEN)
        sentence = Sentence.objects.get(pk=sentence_id)
        serializer = SentenceSerializer(sentence, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

