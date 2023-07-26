from django.contrib import admin

class ServerAdmin(admin.ModelAdmin):
  readonly_fields = ("cpu", "memory_total", "disks")