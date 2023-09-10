from django.contrib import admin
from ..models import AnsibleRole, Server
from .ansible import AnsibleRoleAdmin
from .setup import ServerAdmin

admin.site.register(AnsibleRole, AnsibleRoleAdmin)
admin.site.register(Server, ServerAdmin)