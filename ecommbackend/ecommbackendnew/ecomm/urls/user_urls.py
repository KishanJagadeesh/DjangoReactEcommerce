from django.urls import path
from ecomm.views import user_views as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    
)

urlpatterns = [
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='userregoster'),
    path('profile/', views.getUserProfile, name='user-profile' ),
    path('profile/update/', views.updateUSerProfile, name='user-profile-update' ),
    path('', views.getUsers, name='user' ),
    path('<str:pk>/', views.getUserById, name='user'),
    path('update/<str:pk>/', views.updateUSer, name='user-update'),
    path('delete/<str:pk>/', views.deleteUsers, name='user-delete'),
]