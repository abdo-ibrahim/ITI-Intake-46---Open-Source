from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from categories.api.serializers import CategorySerializer
from categories.models import Category


@api_view(["GET", "POST"])
def index(request):
	if request.method == "POST":
		category = CategorySerializer(data=request.data)
		if category.is_valid():
			category.save()
			return Response(
				{
					"message": "object created!",
					"category": category.data,
				},
				status=status.HTTP_201_CREATED,
			)
		return Response(
			{
				"message": "not valid",
				"errors": category.errors,
			},
			status=status.HTTP_400_BAD_REQUEST,
		)

	categories = Category.objects.all()
	categories = CategorySerializer(categories, many=True)
	return Response(categories.data)


@api_view(["GET", "PUT", "DELETE"])
def details(request, id):
	category = get_object_or_404(Category, id=id)

	if request.method == "GET":
		category = CategorySerializer(category)
		return Response(category.data)

	if request.method == "PUT":
		category = CategorySerializer(category, data=request.data)
		if category.is_valid():
			category.save()
			return Response(
				{
					"message": "object updated!",
					"category": category.data,
				},
				status=status.HTTP_200_OK,
			)
		return Response(
			{
				"message": "not valid",
				"errors": category.errors,
			},
			status=status.HTTP_400_BAD_REQUEST,
		)

	category.delete()
	return Response(
		{"message": "object deleted!"},
		status=status.HTTP_204_NO_CONTENT,
	)
