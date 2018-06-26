from django.db.models import Q

import graphene

from graphene_django import DjangoObjectType

from graphql import GraphQLError


from .models import Message

class MessageType(DjangoObjectType):
    class Meta:
        model = Message

class Mutation(graphene.ObjectType):
    # TODO: Add more stuff
    pass

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
