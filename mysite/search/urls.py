from django.urls import path
from . import views

urlpatterns = [

    path("search/", views.search_feature ),
    path("searchTag/", views.search_tag_feature ),
    path("searchTest/<str:queryVar>/", views.search_feature_test)
]