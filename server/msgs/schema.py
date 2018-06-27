from django.db.models import Q

import graphene

from graphene_django import DjangoObjectType

from graphql import GraphQLError


from .models import Message, UserMessages

from users.models import User

class MessageType(DjangoObjectType):
    class Meta:
        model = Message

class SendMessage(graphene.Mutation):
    message = graphene.String()

    class Arguments:
        message = graphene.String()
        user_id = graphene.Int()
    
    def mutate(self, info, message, user_id):
        user = info.context.user

        if user.is_anonymous:
            raise GraphQLError('You must be logged to send message!')
        
        toUser = User.objects.filter(id=user_id).first()

        if not toUser:
            raise Exception('Invalid user!')

        msg = Message(from_user=user, message=message)
        msg.save()

        UserMessages(user1=user, user2=toUser, message=msg).save()
        UserMessages(user2=user, user1=toUser, message=msg).save()
        
        return SendMessage(message)



class Mutation(graphene.ObjectType):
    send_message = SendMessage.Field()

class Query(graphene.ObjectType):
    messages = graphene.List(
        MessageType,
        search=graphene.String()
    )

    def resolve_messages(self, info, **kwargs):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('You must be logged to see messages!')
        filter = (
            Q(from_user=user)
        )
        return Message.objects.get(filter)
