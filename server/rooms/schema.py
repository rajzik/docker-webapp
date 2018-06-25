
import graphene

from graphene_django import DjangoObjectType
from graphql import GraphQLError


from .models import Room, UserRooms

class RoomType(DjangoObjectType):
    class Meta:
        model = Room

class JoinRoom(graphene.Mutation):
    room_name = graphene.String()
    
    class Arguments:
        room_id = graphene.Int()
    
    def mutate(self, info, room_id):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError('You must be logged to join room!')
        
        room = Room.objects.filter(id=link_id).first()
        if not room:
            raise Exception('Invalid Room!')
        
        userRoom = UserRooms(
            user=user,
            room=room
        )
        userRoom.save()

        return JoinRoom(room_name=room.room_name)

        

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

        return CreateRoom(room_name=room_name)


class Mutation(graphene.ObjectType):
    create_room = CreateRoom.Field()
    join_room = JoinRoom.Field()

class Query(graphene.ObjectType):
    rooms = graphene.List(RoomType)

    def resolve_rooms(self, info):
        return Room.objects.all()

    