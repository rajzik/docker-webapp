
import graphene

from graphene_django import DjangoObjectType

from .models import Room

class RoomType(DjangoObjectType):
    class Meta:
        model = Room

class CreateRoom(graphene.Mutation):
    room_name = graphene.String()

    class Arguments:
        room_name = graphene.String(required=True)

    def mutate(self, info, room_name):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged!')
        room = Room(
            room_name=room_name,
            admin=user
        )
        room.save()

        return CreateRoom(room_name=room_name)


class Mutation(graphene.ObjectType):
    create_room = CreateRoom.Field()

class Query(graphene.ObjectType):
    rooms = graphene.List(RoomType)

    def resolve_rooms(self, info):
        return Room.objects.all()

    