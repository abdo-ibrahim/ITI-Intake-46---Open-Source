from django.shortcuts import get_object_or_404, redirect, render

from .models import Category


def index(request):
	categories = Category.objects.all()
	return render(request, "categories/index.html", {"categories": categories})


def show(request, id):
	category = get_object_or_404(Category, pk=id)
	products = category.products.all()
	return render(
		request,
		"categories/show.html",
		{"category": category, "products": products},
	)


def create(request):
	if request.method == "POST":
		name = request.POST.get("name", "").strip()
		logo = request.FILES.get("logo")

		category = Category(name=name, logo=logo or None)
		category.save()
		return redirect("categories:show", id=category.id)

	return render(request, "categories/create.html")


def edit(request, id):
	category = get_object_or_404(Category, pk=id)

	if request.method == "POST":
		category.name = request.POST.get("name", "").strip()

		logo = request.FILES.get("logo")
		if logo:
			category.logo = logo

		category.save()
		return redirect("categories:show", id=category.id)

	return render(request, "categories/edit.html", {"category": category})


def delete(request, id):
	category = get_object_or_404(Category, pk=id)

	if request.method == "POST":
		category.delete()
		return redirect("categories:index")

	return render(request, "categories/delete.html", {"category": category})
