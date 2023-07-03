from django.urls import path
import base.views.order_views as order_views

urlpatterns = [
    path('add', order_views.addOrder, name='orders_add'),
    path('myorders/', order_views.getMyOrders, name='my_orders'),
    path('<str:pk>/', order_views.getOrderById, name='getordersby_id'),
    path('<str:pk>/pay/', order_views.updateOrderToPaid, name='product'),
    path('', order_views.getOrders, name='get-orders'),
]