# -*- coding: utf-8 -*-
from django.contrib.auth import logout
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class ApiLogoutView(APIView):

    permission_classes = (AllowAny, )
    renderer_classes = (JSONRenderer, )

    def post(self, request):
        try:
            logout(request)
            return Response(data={'status': 'logged out'})
        except Exception:
            return Response(data={'status': 'log out failed'})
