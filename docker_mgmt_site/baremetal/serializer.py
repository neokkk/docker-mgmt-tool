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
    fields = "__all__"
    
  def validate(self, attrs):
    username = attrs.pop("username", None)
    password = attrs.pop("password")
    key_file = None
    
    if password.startswith("-----BEGIN OPENSSH PRIVATE KEY-----"):
      key_file = f"/tmp/key_{attrs['hostname']}_key"
      with open(key_file, mode="w") as f:
        f.write(password)
    
    from docker_mgmt.remotes.setup import test_connect, copy_id
    from django.conf import settings
    
    server = test_connect(attrs["ip_address"], username=username, password=password, key_file=key_file)
    # copy_id(server, settings.SSH_SERVER_AUTH_KEY, username=username, password=password, key_file=key_file)
    
    return attrs

class AnsibleRoleSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = AnsibleRole
    fields = "__all__"
    
class ProvisioningSerializer(serializers.Serializer):
    pass