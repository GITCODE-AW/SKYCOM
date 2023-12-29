from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from .views import (
    UserRegistrationView, 
    UserVerifyView, 
    UserPasswordResetView, 
    UserReverifyView,
    UserInfoView
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view()),
    path('verify/', UserVerifyView.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('reset/', UserPasswordResetView.as_view()),
    path('reverify/', UserReverifyView.as_view()),
    path('info/', UserInfoView.as_view())
]