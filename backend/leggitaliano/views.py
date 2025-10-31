from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404


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
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


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