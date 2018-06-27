from django.contrib.auth import get_user_model
from django.conf import settings
import graphene
from graphene_django import DjangoObjectType
from .models import User, UserFriends



class UserType(DjangoObjectType):
    class Meta:
        model = User

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)

class AddFriend(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        user_id = graphene.Int()
    
    def mutate(self, info, user_id):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged!')
        
        friend = User.objects.filter(id=user_id).first()
        if not friend:
            raise Exception('Invalid friend!')
        
        userFriend = UserFriends(user1=user, user2=friend)
        userFriend.save()

        userFriend2 = UserFriends(user2=user, user1=friend)
        userFriend2.save()

        return AddFriend(user=friend)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    add_friend = AddFriend.Field()

class Query(graphene.ObjectType):
    me = graphene.Field(UserType)
    users = graphene.List(UserType)

    def resolve_users(self, info):
        return get_user_model().objects.all()

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged!')
        return user