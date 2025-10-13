from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import AppUser
from .serializers import AppUserSerializer, AppUserRegisterSerializer
from .user_validations import custom_validation


class AppUserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

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
            user = serializer.create(validate_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)