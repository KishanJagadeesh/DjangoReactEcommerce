from django.shortcuts import render


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response

from ecomm.models import Product,Review

from ecomm.serializers import ProductSerializer

from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    data=request.data
    product=Product.objects.get(_id=pk)
    product.name=data['name']
    product.price=data['price']
    product.brand=data['brand']
    product.category=data['category']
    product.countInStock=data['countInStock']
    product.description=data['description']

    product.save()
    serializer=ProductSerializer(product, many=False)
    return Response(serializer.data)




@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProducts(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        rating=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)




@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product=Product.objects.get(_id=pk)
    product.delete()
    return Response('Product Deleted')



@api_view(['POST'])
def uploadImage(request):
    data=request.data
    product_id=data['product_id']
    product=Product.objects.get(_id=product_id)
    product.image=request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,pk):
    user=request.user
    print(user)
    product=Product.objects.get(_id=pk)
    print(product)
    data=request.data
    print(data)
   
    # 1. review already exists
    alreadyExists=product.review_set.filter(user=user).exists()

    if alreadyExists:
        content={'detail':'Product already reviewed'}
        print('ss')
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # 2. no rating or 0
    elif data['rating']==0:
        content={'detail':'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # 3. create review
    else:
        review=Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment']

        )

        reviews=product.review_set.all()
        product.numReviews=len(reviews)

        total=0
        for i in reviews:
            total+=i.rating

        product.rating=total/len(reviews)
        product.save()
        return Response({'detail':'Review added'})