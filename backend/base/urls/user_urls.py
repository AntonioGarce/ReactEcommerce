from django.urls import path
import base.views.product_views as product_views

import base.views.user_views as user_views
from base.views.user_views import MyTokenObtainPairView

urlpatterns = [
    path('login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('login', user_views.loginUser, name='login'),
    path('register', user_views.registerUser, name='register'),
    path('profile/update', user_views.updateUserProfile, name='updateProfile'),
    path('profile', user_views.getUserProfile, name='getUserProfile'),
    path('', user_views.getUsers, name='getUsers'),
    path('<str:pk>', user_views.getUserById, name='getUserById'),
    path('delete/<str:pk>', user_views.deleteUser, name='deleteUser'),
    path('update/<str:pk>', user_views.updateUser, name='updateUser'),
]