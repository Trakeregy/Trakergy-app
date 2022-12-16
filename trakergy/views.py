from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.tokens import AccessToken

from .serializers import *
import re


# Register API


class RegisterAPI(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request):
        serialized = RegisterSerializer(request.data)
        try:
            validated = serialized.validate(request.data)
            serialized.create(validated)
        except Exception as e:
            content = {'message': f'Register error. {e}'}
            return Response(data=content, status=status.HTTP_406_NOT_ACCEPTABLE)
        content = {'message': 'User successfully added.'}
        return Response(data=content, status=status.HTTP_201_CREATED)


class LogoutAPI(generics.GenericAPIView):
    def post(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            tokens = OutstandingToken.objects.filter(user_id=user_id)
            # this deletes refresh token based on user_id from access tokens
            for token in tokens:
                t, _ = BlacklistedToken.objects.get_or_create(token=token)
            #  access tokens can't be deleted, so it's recommended that access lifetime should be short
            return Response(data={"message": "User successfully logout"}, status=status.HTTP_200_OK)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class SeeCurrentUserAPI(generics.GenericAPIView):
    def get(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            serializer = CustomUserSerializer(request.user, context=self.get_serializer_context())
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class EditUsernameAPI(generics.GenericAPIView):
    def patch(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)
            try:
                username = request.data['username']
                min_chars = 3
                if len(username) > min_chars:
                    user.username = username
                    user.save()
                    content = {'message': 'Username successfully updated.'}
                    return Response(data=content, status=status.HTTP_200_OK)
                else:
                    content = {'message': f"Username too short. At least {min_chars} characters required."}
                    return Response(data=content, status=status.HTTP_400_BAD_REQUEST)
            except Exception:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)


class EditEmailAPI(generics.GenericAPIView):
    def patch(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)
            try:
                email = request.data['email']
                if not self.validateEmail(email):
                    content = {'message': 'Wrong email address'}
                    return Response(data=content, status=status.HTTP_400_BAD_REQUEST)
                user.email = email
                user.save()
                content = {'message': 'Email successfully updated.'}
                return Response(data=content, status=status.HTTP_200_OK)
            except Exception:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

    def validateEmail(self, email):
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if re.fullmatch(regex, email):
            return True
        return False


class EditPasswordAPI(generics.GenericAPIView):
    def patch(self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
            access_token_obj = AccessToken(token)
            user_id = access_token_obj['user_id']
            user = CustomUser.objects.get(id=user_id)
            try:
                password1 = request.data['password1']
                password2 = request.data['password2']
                if password1 == password2:
                    try:
                        validate_password(password1)
                        user.set_password(password1)
                        user.save()
                        content = {'message': 'Password successfully updated.'}
                        return Response(data=content, status=status.HTTP_200_OK)
                    except Exception as e:
                        content = {'message': e}
                        return Response(data=content, status=status.HTTP_400_BAD_REQUEST)
                else:
                    content = {'message': 'Passwords don\'t match'}
                    return Response(data=content, status=status.HTTP_400_BAD_REQUEST)
            except Exception:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(data={'message': 'Missing authorization header'}, status=status.HTTP_403_FORBIDDEN)

