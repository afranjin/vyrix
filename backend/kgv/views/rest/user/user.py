# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from django_otp.plugins.otp_totp.models import TOTPDevice
from rest_framework import serializers, viewsets, views, status
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from kgv.contrib.django import get_unique_or_none
from kgv.contrib.auth import list_permission_identifier_by_user, has_permission
from kgv.models import AvailablePermissions, UserPermissions


class UserSerializer(serializers.ModelSerializer):

    permissions = serializers.SerializerMethodField()

    def get_permissions(self, obj):
        return list_permission_identifier_by_user(obj)

    class Meta:
        model = User

        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'is_staff',
            'is_active',
            'is_superuser',
            'permissions'
        ]


class UserViewSet(viewsets.ViewSet):

    permission_classes = (IsAuthenticated, )
    renderer_classes = (JSONRenderer, )

    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = get_unique_or_none(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def create(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            raise Exception(serializer.errors)

    def update(self, request, pk=None):
        instance = get_unique_or_none(User, id=pk)
        serializer = UserSerializer(instance=instance, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            raise Exception(serializer.errors)

    def destroy(self, request, pk=None):
        raise NotImplementedError('todo:destroy')


class UserSetPasswordView(views.APIView):

    permission_classes = (IsAuthenticated, )
    renderer_classes = (JSONRenderer, )

    def post(self, request):
        user = get_unique_or_none(User, id=request.data['id'])
        password = request.data['password']

        # password change is only allowed for self or by superusers
        if user == request.user or request.user.is_superuser:
            user.set_password(password)
            user.save()
            return Response({})

        raise Response({}, status=status.HTTP_403_FORBIDDEN)


class UserSetPermissionsView(views.APIView):

    permission_classes = (IsAuthenticated, )
    renderer_classes = (JSONRenderer, )

    def post(self, request):
        if has_permission(request.user, AvailablePermissions.AdministrateUsers):
            user = get_unique_or_none(User, id=request.data['id'])
            permissions = request.data['permissions']
            UserPermissions.update_user_with_permissions(user, permissions)
            return Response({}, status=status.HTTP_200_OK)

        raise Response({}, status=status.HTTP_403_FORBIDDEN)


class UserConfigureTotpView(views.APIView):

    permission_classes = (IsAuthenticated,)
    renderer_classes = (JSONRenderer,)

    def get(self, request):
        if has_permission(request.user, AvailablePermissions.AdministrateUsers):
            user = get_unique_or_none(User, id=request.query_params['id'])

            devices = TOTPDevice.objects.filter(user=user)
            if devices.count() == 0:
                return Response({
                    'enabled': False
                })
            if devices.count() == 1:
                return Response({
                    'enabled': True,
                    'url': devices[0].config_url,
                })
            return Response({
                'enabled': False,
                'error': 'There is more than 1 device for provided user'
            })

        raise Response({}, status=status.HTTP_403_FORBIDDEN)

    def post(self, request):
        if has_permission(request.user, AvailablePermissions.AdministrateUsers):
            user = get_unique_or_none(User, id=request.data['id'])
            device = TOTPDevice()
            device.user = user
            device.name = user.email
            device.save()
            return Response({})

        raise Response({}, status=status.HTTP_403_FORBIDDEN)

    def delete(self, request):
        if has_permission(request.user, AvailablePermissions.AdministrateUsers):
            user = get_unique_or_none(User, id=request.query_params['id'])
            devices = TOTPDevice.objects.filter(user=user)
            for device in devices:
                device.delete()
            return Response({})

        raise Response({}, status=status.HTTP_403_FORBIDDEN)
