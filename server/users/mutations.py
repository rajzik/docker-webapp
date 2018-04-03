import graphene
import hashlib
from django.core import exceptions
import uuid
from graphene_django import DjangoObjectType
from graphene_django.filter.fields import DjangoFilterConnectionField
from .serializers import CustomJWTSerializer
from rest_framework_jwt.serializers import (
    JSONWebTokenSerializer,
)
from graphene import InputObjectType, relay, ObjectType
from .models import User
from .helpers import update_create_instance, get_errors, get_object


class UserType(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = {
            'email': ['exact', ]
        }
        exclude_fields = ('password', 'is_superuser', )


class Viewer(ObjectType):
    user = graphene.Field(UserType)

    def resolve_user(self, info, **kwargs):
        if info.context.user.is_authenticated:
            return info.context.user
        return None


class UserCreateInput(InputObjectType):
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)
    username = graphene.String(required=True)
    password = graphene.String(required=True)
    email = graphene.String(required=True)
    is_super_user = graphene.Boolean(required=False)


class UserModInput(InputObjectType):
    first_name = graphene.String(required=False)
    last_name = graphene.String(required=False)
    username = graphene.String(required=False)
    password = graphene.String(required=False)
    email = graphene.String(required=False)
    is_super_user = graphene.Boolean(required=False)


class CreateUser(relay.ClientIDMutation):

    class Input:
        user = graphene.Argument(UserCreateInput)

    new_user = graphene.Field(UserType)

    @classmethod
    def mutate_and_get_payload(cls, self, info, **input):
        input['user']['password'] = hashlib.md5(
            input['user']['password'].encode('utf-8')).hexdigest()
        user_data = input['user']
        user_instance = User()
        new_user = update_create_instance(user_instance, user_data)
        return cls(new_user=new_user)


class UpdateUser(relay.ClientIDMutation):

    class Input:
        user = graphene.Argument(UserModInput)
        id = graphene.String(required=True)

    errors = graphene.List(graphene.String)
    updated_user = graphene.Field(UserType)

    @classmethod
    def mutate_and_get_payload(cls, self, info, **input):

        try:
            user_instance = get_object(User, input['id'])  # get user by id
            print(user_instance)
            if user_instance:
                if 'password' in input['user']:
                    input['user']['password'] = hashlib.md5(
                        input['user']['password'].encode('utf-8')).hexdigest()
                user_data = input['user']
                updated_user = update_create_instance(user_instance, user_data)
                return cls(updated_user=updated_user)
        except exceptions.ValidationError as e:
            # return an error if something wrong happens
            return cls(updated_user=None, errors=get_errors(e))


class Login(graphene.Mutation):

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    token = graphene.String()
    # user = graphene.Field(User)


    def mutate(self, info, email, password):
        user = {'email': email, 'password': password}
        serializer = CustomJWTSerializer(data=user)
        if serializer.is_valid():
            token = serializer.object['token']
            user = serializer.object['user']
            return Login(success=True, token=token, errors=None)
        return Login(
                success=False,
                token=None,
                errors=['email', 'Unable to login with provided credentials.']
            )
"""
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)
    token = graphene.String()
    user = graphene.Field(User)

    def mutate(self, info, email, password):
        user = {'email': email, 'password': password}
        serializer = JSONWebTokenSerializer(data=user)
        if serializer.is_valid():
            token = serializer.object['token']
            user = serializer.object['user']
            return Login(success=True, user=user, token=token, errors=None)
        else:
            return Login(
                success=False,
                token=None,
                errors=['email', 'Unable to login with provided credentials.']
            )
"""