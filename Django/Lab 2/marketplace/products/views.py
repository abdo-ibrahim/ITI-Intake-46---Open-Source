from django.shortcuts import get_object_or_404, redirect, render

from categories.models import Category

from .models import Product


def index(request):
    products = Product.objects.select_related("category").all()
    return render(request, "products/index.html", {"products": products})


def show(request, id):
    product = get_object_or_404(Product, pk=id)
    return render(request, "products/show.html", {"product": product})


def create(request):
    categories = Category.objects.all()

    if request.method == "POST":
        name = request.POST.get("name", "").strip()
        stock = request.POST.get("stock", "0").strip()
        price = request.POST.get("price", "0").strip()
        description = request.POST.get("description", "").strip()
        image = request.FILES.get("image")

        category_id = request.POST.get("category")
        category = Category.objects.filter(pk=category_id).first() if category_id else None

        product = Product(
            name=name,
            category=category,
            stock=int(stock) if stock else 0,
            price=price or 0,
            description=description,
            image=image or None,
        )
        product.save()
        return redirect(product.show_url)

    return render(request, "products/create.html", {"categories": categories})


def edit(request, id):
    product = get_object_or_404(Product, pk=id)
    categories = Category.objects.all()

    if request.method == "POST":
        product.name = request.POST.get("name", "").strip()
        stock = request.POST.get("stock", "0").strip()
        price = request.POST.get("price", "0").strip()
        product.stock = int(stock) if stock else 0
        product.price = price or 0
        product.description = request.POST.get("description", "").strip()

        category_id = request.POST.get("category")
        product.category = Category.objects.filter(pk=category_id).first() if category_id else None

        image = request.FILES.get("image")
        if image:
            product.image = image

        product.save()
        return redirect(product.show_url)

    return render(
        request,
        "products/edit.html",
        {"product": product, "categories": categories},
    )


def delete(request, id):
    product = get_object_or_404(Product, pk=id)

    if request.method == "POST":
        product.delete()
        return redirect("products:index")

    return render(request, "products/delete.html", {"product": product})
