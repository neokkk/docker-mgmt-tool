from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AnsibleRole, Server
from .serializer import AnsibleRoleSerializer, ServerSerializer, UserSerializer

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all().order_by('-date_joined')
  serializer_class = UserSerializer
  permission_classes = []
  
class ServerViewSet(viewsets.ModelViewSet):
  queryset = Server.objects.all().order_by('name')
  serializer_class = ServerSerializer
  permission_classes = []
  
  @action(detail=True, methods=['get'], serializer_class=AnsibleRoleSerializer)
  def role(self, *args, **kwargs):
    server = self.get_object()
    roles = server.roles.all()
    serializer = AnsibleRoleSerializer(roles, many=True)
    return Response(serializer.data)
  
  @role.mapping.delete
  def clear_roles(self, *args, **kwargs):
    server = self.get_object()
    server.roles.clear()
    return Response(status=204)
  
class AnsibleRoleViewSet(viewsets.ModelViewSet):
  queryset = AnsibleRole.objects.all().order_by('name')
  serializer_class = AnsibleRoleSerializer
  permission_classes = []    
