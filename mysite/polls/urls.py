from django.contrib import admin
from django.urls import include, path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("hello", views.index2, name="index2"),
    path("delete", views.deleteQuestions, name="delete")
]