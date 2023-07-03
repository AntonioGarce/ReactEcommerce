from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from ..models import Product
from ..serializers import ProductSerializer
from ..products import products
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',
        '/api/products/create/',
        '/api/products/upload/',
        '/api/products/reviews/',
        '/api/products/top',
        '/api/products/<id>',
        'api/products/delete/<id>',
        'api/products/update/<id>'
    ]
    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['delete'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('success')

@api_view(['post'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['put'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    product = Product.objects.get(_id=pk)
    data = request.data
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.category = data['category']
    product.description = data['description']
    product.save()
    print(data)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['post'])
def updateImage(request,pk):
    product = Product.objects.get(_id=pk)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Success')
