# -*- coding: utf-8 -*-
import typing
from django.contrib.auth.models import User, AnonymousUser
from django.contrib.auth import authenticate, login
from django_otp.plugins.otp_totp.models import TOTPDevice
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from kgv.contrib.django import get_unique_or_none
from kgv.views.rest.auth.exception import AuthenticationException
from kgv.contrib.auth import list_permission_identifier_by_user


class ApiLoginView(APIView):

    permission_classes = (AllowAny, )
    renderer_classes = (JSONRenderer, )

    @staticmethod
    def __user_to_result_dict(user: typing.Optional[User] = None) -> typing.Dict:
        result = {
            'username': None,
            'email': None,
            'authenticated': False,
            'permissions': [],
        }
        if user:
            result['username'] = user.username
            result['email'] = user.email
            result['authenticated'] = True
            result['permissions'] = list_permission_identifier_by_user(user)
        return result

    def get(self, request):
        """Returns current logged-in user
        """
        result = self.__user_to_result_dict()
        if type(request.user) != AnonymousUser:
            result = self.__user_to_result_dict(request.user)
        return Response(data=result)

    def post(self, request):
        """Login a user
        """
        username = request.data['username']
        password = request.data['password']
        totp_token = request.data['totp']

        user = get_unique_or_none(User, username=username)
        if not user:
            raise AuthenticationException(f'user "{username} not found')

        user = authenticate(username=username, password=password)

        if user is None:
            raise AuthenticationException(f'login failed for user "{username}"')
        if not user.is_active:
            raise AuthenticationException(f'user "{username}" is not activated')

        totp_devices = TOTPDevice.objects.filter(user=user)
        totp_verified = totp_devices.count() == 0

        for totp_device in totp_devices:
            if totp_device.verify_token(totp_token):
                totp_verified = True

        if not totp_verified:
            return Response(data={'status': '2fa failed'}, status=status.HTTP_401_UNAUTHORIZED)

        login(request, user)

        return Response(data=self.__user_to_result_dict(user))
