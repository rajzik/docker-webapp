
import graphene
import random
from django.db.models import Q
from graphene_django import DjangoObjectType
from graphql import GraphQLError


from .models import Room, UserRooms, GroupMessage, RoomMessages

class RoomType(DjangoObjectType):
    class Meta:
        model = Room

class GroupMessageType(DjangoObjectType):

    class Meta:
        model = GroupMessage

class RoomMessageType(DjangoObjectType):
    class Meta:
        model = RoomMessages

class JoinRoom(graphene.Mutation):
    room_name = graphene.String()

    class Arguments:
        room_id = graphene.Int()

    def mutate(self, info, room_id):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError('You must be logged to join room!')

        room = Room.objects.filter(id=room_id).first()
        if not room:
            raise Exception('Invalid Room!')

        userRoom = UserRooms(
            user=user,
            room=room
        )
        userRoom.save()

        return JoinRoom(room_name=room.room_name)


class LeaveRoom(graphene.Mutation):
    success = graphene.Boolean()
    class Arguments:
        room_id = graphene.Int()

    def mutate(self, info, room_id):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('You must be logged to join room!')
        room = Room.objects.filter(id=room_id).first()
        if not room:
            raise Exception('Invalid Room!')

        UserRooms.objects.filter(Q(user=user) & Q(room=room)).delete()

        if room.admin == user:
            otherUsers = UserRooms.objects.filter(room=room)
            if len(otherUsers) <= 0:
                room.delete()
            else:
                random.shuffle(otherUsers)
                room.admin = otherUsers[:1].user
                room.save()
        return LeaveRoom(success=True)

class SendRoomMessage(graphene.Mutation):
    room_name = graphene.String()
    message = graphene.String()

    class Arguments:
        room_id = graphene.Int()
        message = graphene.String()

    def mutate(self, info, room_id, message):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('You must be logged to vote!')

        room = Room.objects.filter(id=room_id).first()
        if not room:
            raise Exception('Invalid Room!')

        groupMessage = GroupMessage(
            message=message,
            from_user=user
        )
        groupMessage.save()

        roomMessage = RoomMessages(
            room=room,
            room_message=groupMessage
        )
        roomMessage.save()

        return SendRoomMessage(room_name=room.room_name, message=groupMessage.message)



class CreateRoom(graphene.Mutation):
    room_name = graphene.String()

    class Arguments:
        room_name = graphene.String(required=True)

    def mutate(self, info, room_name):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('You must be logged to vote!')
        room = Room(
            room_name=room_name,
            admin=user
        )
        room.save()
        userRoom = UserRooms(
            user=user,
            room=room
        )
        userRoom.save()
        return CreateRoom(room_name=room_name)


class Mutation(graphene.ObjectType):
    create_room = CreateRoom.Field()
    join_room = JoinRoom.Field()
    send_room_message = SendRoomMessage.Field()
    leave_room = LeaveRoom.Field()

class Query(graphene.ObjectType):
    rooms = graphene.List(RoomType)
    room_messages = graphene.List(RoomMessageType)
    group_message = graphene.List(GroupMessageType)

    def resolve_rooms(self, info):
        return Room.objects.all()

    def resolve_room_messages(self, info):
        return RoomMessages.objects.all()

    def resolve_group_message(self, info):
        return GroupMessage.objects.all()
