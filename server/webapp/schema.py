from graphene_django import DjangoObjectType
import graphene
from users.models import User, Message, Room, GroupMessage
from users.mutations import UserType, CreateUser, UpdateUser, Viewer, Login


class MessageType(DjangoObjectType):

    class Meta:
        model = Message


class RoomType(DjangoObjectType):
    class Meta:
        model = Room


class GroupMessageType(DjangoObjectType):
    class Meta:
        model = GroupMessage


class Query(graphene.ObjectType):
    viewer = graphene.Field(Viewer)

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

    rooms = graphene.List(RoomType, description= 'Rooms')
    room = graphene.Field(
        RoomType,
        id=graphene.ID(),
        description='Just one Room belonging to an ID',
    )
    groupMessages = graphene.List(GroupMessageType)

    def resolve_groupMessages(self, info, id):
        return GroupMessage.objects.all()

    def resolve_rooms(self, info):
        return Room.objects.all()
    def resolve_room(self, info, id):
        return Room.objects.get(pk=id)
    
    def resolve_viewer(self, info, **kwargs):
        print(info.context.user)
        if info.context.user.is_authenticated:
            return info.context.user
        return None
    def resolve_messages(self, info):
        return Message.objects.all()
    def resolve_message(self, info, id):
        return Message.objects.get(pk=id)

    def resolve_users(self, info):
        return User.objects.all()
    def resolve_user(self, info, id):
        return User.objects.get(pk=id)

class Mutation(graphene.ObjectType):
    register = CreateUser.Field()
    # update_user = UpdateUser.Field()
    login = Login.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
