# -*- coding: utf-8 -*-
from rest_framework import views, status
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from kgv.contrib.auth import has_permission
from kgv.models import Configuration, ConfigEmail, AvailablePermissions


class EMailConfigurationApiView(views.APIView):

    permission_classes = (IsAuthenticated, )
    renderer_classes = (JSONRenderer, )

    def get(self, request):
        result = {}
        for key in ConfigEmail.default_values.keys():
            value = Configuration.get(key)
            result[key] = value
        return Response(result)

    def post(self, request):
        if has_permission(request.user, AvailablePermissions.AdministrateEmailConfiguration):
            for key in ConfigEmail.default_values.keys():
                value = request.data[key]
                Configuration.set(key, value)

            return self.get(request)
        return Response({}, status=status.HTTP_403_FORBIDDEN)
