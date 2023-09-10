from django.contrib.auth.models import User
from rest_framework import serializers
from .models import AnsibleRole, Server

class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = ["email", "groups", "url", "username"]
    
class ServerSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Server
    fields = ["name", "ip_address", "cpu", "memory_total", "disks"]
    
class AnsibleRoleSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = AnsibleRole
    fields = "__all__"
    
class ProvisioningSerializer(serializers.Serializer):
    pass