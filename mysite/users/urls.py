from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("addUser",views.addUser),
    path("testGet/<str:un>/",views.testGet),
    path("testAdd/<str:un>/<str:pw>/",views.testAdd)

]