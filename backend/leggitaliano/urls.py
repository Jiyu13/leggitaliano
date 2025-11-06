"""
URL configuration for leggitaliano project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from .views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', AppUserView.as_view(), name='users'),
    path("user/", GetUserView.as_view(), name="user"),
    path('register/', AppUserRegisterView.as_view(), name='register'),
    path('login/', AppUserLoginView.as_view(), name='login'),
    path('logout/', AppUserLogoutView.as_view(), name='login'),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('auth/', include('rest_framework.urls')),

    path('articles/', ArticlesByUserView.as_view(), name='user_articles'),
    path('article/<int:article_id>/', ArticlesByIDView.as_view(), name='article_by_id'),

    path('word_types/', WordTypeView.as_view(), name='word_types'),

    path("word/word/<str:word>/", DictionaryWordByWordView.as_view(), name="word"),
    path("word/id/<int:word_id>/", DictionaryWordByIDView.as_view(), name="word_by_id"),
    path("word/update_translation/<int:word_id>/", TranslationUpdateByWordIDView.as_view(), name="translation_update_by_word_id"),

    path("sentences/", GetAllSentencesView.as_view(), name="all_sentences"),
    path("sentence/add/<int:word_id>/", CreateSentenceView.as_view(), name="add_sentence"),
    path("sentence/<int:word_id>/<int:sentence_id>/", SentenceByIdView.as_view(), name="sentence_by_id")
]

