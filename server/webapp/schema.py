from graphene_django import DjangoObjectType
import graphene
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User

class Query(graphene.ObjectType):
    users = graphene.List(UserType, description='A few billion people')
    user = graphene.Field(
        UserType,
        id=graphene.ID(),
        description='Just one person belonging to an ID',
    )

    def resolve_users(self, info):
        return User.objects.all()
    def resolve_user(self, info, id):
        return User.objects.get(pk=id)

schema = graphene.Schema(query=Query)