from graphene_django import DjangoObjectType
import graphene
from users.models import User, Message


class UserType(DjangoObjectType):
    class Meta:
        model = User

class MessageType(DjangoObjectType):

    class Meta:
        model = Message

class Query(graphene.ObjectType):
    users = graphene.List(UserType, description='A few billion people')
    user = graphene.Field(
        UserType,
        id=graphene.ID(),
        description='Just one person belonging to an ID',
    )
    message = graphene.Field(
        MessageType,
        id=graphene.ID(),
        description='Just one message belonging to an ID',
    )
    messages = graphene.List(MessageType, description='Messages')

    def resolve_messages(self, info):
        return Message.objects.all()
    def resolve_message(self, info, id):
        return Message.objects.get(pk=id)
    def resolve_users(self, info):
        return User.objects.all()
    def resolve_user(self, info, id):
        return User.objects.get(pk=id)

schema = graphene.Schema(query=Query)