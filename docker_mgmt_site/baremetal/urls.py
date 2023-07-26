from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'role', views.RoleViewSet)
router.register(r'server', views.ServerViewSet)
router.register(r'user', views.UserViewSet)

urlpatterns = [
  path('api/', include(router.urls)),
]
