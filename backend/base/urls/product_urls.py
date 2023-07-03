from django.urls import path
import base.views.product_views as product_views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
import base.views.user_views as user_views
from base.views.user_views import MyTokenObtainPairView

urlpatterns = [
    path('', product_views.getProducts, name='products-get'),
    path('create/', product_views.createProduct, name='product-create'),
    path('<str:pk>/', product_views.getProduct, name='product-get'),
    path('delete/<str:pk>/', product_views.deleteProduct, name='product-delete'),
    path('update/<str:pk>/', product_views.updateProduct, name='product-update'),
    path('upload/<str:pk>/', product_views.updateImage, name='product-image-upload'),
]