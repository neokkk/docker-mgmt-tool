from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AnsibleRole, Server
from .serializer import AnsibleRoleSerializer, ServerSerializer, ProvisioningSerializer, UserSerializer

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all().order_by("-date_joined")
  serializer_class = UserSerializer
  permission_classes = []
  
class ServerViewSet(viewsets.ModelViewSet):
  queryset = Server.objects.all().order_by("id")
  serializer_class = ServerSerializer
  permission_classes = []
  
  def create(self, request, *args, **kwargs):
    response = super().create(request, *args, **kwargs)
    return Response(response.data, status=status.HTTP_201_CREATED)
  
  @action(detail=True, methods=["get"], serializer_class=AnsibleRoleSerializer)
  def role(self, *args, **kwargs):
    server = self.get_object()
    roles = server.roles.all()
    serializer = AnsibleRoleSerializer(roles, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
  
  @role.mapping.delete
  def clear_roles(self, *args, **kwargs):
    server = self.get_object()
    server.roles.set([])
    return Response(status=status.HTTP_204_NO_CONTENT)
  
  @action(detail=True, methods=["post"], serializer_class=ProvisioningSerializer)
  def provision(self, *args, **kwargs):
    server = self.get_object()
    server.provision()
    return Response(status=status.HTTP_202_ACCEPTED)
  
class AnsibleRoleViewSet(viewsets.ModelViewSet):
  queryset = AnsibleRole.objects.all().order_by("name")
  serializer_class = AnsibleRoleSerializer
  permission_classes = []    
