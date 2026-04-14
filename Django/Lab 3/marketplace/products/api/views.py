from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from products.api.serializers import ProductSerializer
from products.models import Product


@api_view(["GET", "POST"])
def index(request):
	if request.method == "POST":
		product = ProductSerializer(data=request.data)
		if product.is_valid():
			product.save()
			return Response(
				{
					"message": "object created!",
					"product": product.data,
				},
				status=status.HTTP_201_CREATED,
			)
		return Response(
			{
				"message": "not valid",
				"errors": product.errors,
			},
			status=status.HTTP_400_BAD_REQUEST,
		)

	products = Product.objects.all()
  # use serializer to prepare objects
	products = ProductSerializer(products, many=True)
  
  # return HttpResponse(students)
	return Response(products.data)


@api_view(["GET", "PUT", "DELETE"])
def details(request, id):
	product = get_object_or_404(Product, id=id)

	if request.method == "GET":
		product = ProductSerializer(product)
		return Response(product.data)

	if request.method == "PUT":
		product = ProductSerializer(product, data=request.data)
		if product.is_valid():
			product.save()
			return Response(
				{
					"message": "object updated!",
					"product": product.data,
				},
				status=status.HTTP_200_OK,
			)
		return Response(
			{
				"message": "not valid",
				"errors": product.errors,
			},
			status=status.HTTP_400_BAD_REQUEST,
		)

	product.delete()
	return Response(
		{"message": "object deleted!"},
		status=status.HTTP_204_NO_CONTENT,
	)
