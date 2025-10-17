from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AppUser
from .serializers import AppUserSerializer, AppUserRegisterSerializer, AppUserLoginSerializer
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