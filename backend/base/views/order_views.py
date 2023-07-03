from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User

from rest_framework import status

from rest_framework.exceptions import PermissionDenied

# import models
from base.models import Order, OrderItem, ShippingAddress
from base.models import Product

# import serializers
from base.serializers import OrderSerializer

# import datetime
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrder(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if(orderItems and len(orderItems)==0):
        return Response({'detail':'OrderItem is empty'}, status=status.HTTP_400_BAD_REQUEST)

    # create OrderItems
    for orderItem in orderItems:
        try:
            product = Product.objects.get(_id = orderItem['product'])
        except:
            return Response({'detail':'OrderItem is empty'}, status=status.HTTP_400_BAD_REQUEST)

        # update stock
        if (product.countInStock<orderItem['qty']):
            return Response({'detail':'Sorry. In the stock, ' + product.name + 'is not full.'}, status=status.HTTP_400_BAD_REQUEST)
        

    # create Order
    order = Order.objects.create(
       user= user,
       paymentMethod= data['paymentMethod'],
       taxPrice = data['taxPrice'],
       totalPrice = data['totalPrice'],
       shippingPrice = data['shippingPrice']
    )
    for orderItem in orderItems:
        product = Product.objects.get(_id = orderItem['product'])
        item = OrderItem.objects.create(
            product = product,
            order = order,
            name = orderItem['name'],
            price = orderItem['price'],
            qty = orderItem['qty'],
            image = product.image.url
        )

        product.countInStock -=  item.qty
        product.save()
    # create ShippingAddress
    ShippingAddress.objects.create(
        order = order,
        address = data['shippingAddress']['address'],
        city = data['shippingAddress']['city'],
        postalCode = data['shippingAddress']['postalCode'],
        country = data['shippingAddress']['country']
    )
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    order = Order.objects.get(_id=pk)
    if (user.is_staff or order.user == user):
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
    else:
        return Response({'detail': 'Not authorized to view this order'})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Order is paid.')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all().order_by('-createdAt')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)
