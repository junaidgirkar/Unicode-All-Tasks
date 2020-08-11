from . import views
from django.urls import path,include

urlpatterns = [
    path('', views.home, name='home'),
    path('picture/', views.picture, name='picture'),
    path('dbquery/', views.dbquery, name='dbquery'),
    path('top3/', views.top3, name='top3'),
]
