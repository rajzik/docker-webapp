from graphene_django import DjangoObjectType
import graphene
from .models import usersModel


class User(DjangoObjectType):
    class Meta:
        model = usersModel

class Query(graphene.ObjectType):
    users = graphene.List(User)

    def resolve_users(self, info):
        return usersModel.objects.all()

schema = graphene.Schema(query=Query)