from django.urls import path
from . import views

urlpatterns = [

    path("search/", views.search_feature ),
    path("searchTest/<str:queryVar>/", views.search_feature_test)
]