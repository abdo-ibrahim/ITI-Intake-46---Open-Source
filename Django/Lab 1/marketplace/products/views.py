from django.shortcuts import render

PRODUCTS = [
    {"id": 1, "name": "Laptop", "price": 1200, "description": "A high-performance laptop.", "stock": 10, "image": "images/laptop.svg"},
    {"id": 2, "name": "Mouse", "price": 25, "description": "A wireless mouse.", "stock": 50, "image": "images/mouse.svg"},
    {"id": 3, "name": "Keyboard", "price": 75, "description": "A mechanical keyboard.", "stock": 30, "image": "images/keyboard.svg"},
    {"id": 4, "name": "Gaming Laptop", "price": 1599, "description": "Powerful graphics and fast performance for creators and gamers.", "stock": 7, "image": "images/gaming-laptop.svg"},
    {"id": 5, "name": "Ergonomic Mouse", "price": 39, "description": "Comfort-focused wireless mouse for long work sessions.", "stock": 42, "image": "images/ergonomic-mouse.svg"},
    {"id": 6, "name": "Compact Keyboard", "price": 89, "description": "Space-saving keyboard with tactile keys and modern design.", "stock": 24, "image": "images/compact-keyboard.svg"},
]


def find_product(product_id):
    for p in PRODUCTS:
        if p["id"] == product_id:
            return p
    return None


def index(request):
    context = {"products": PRODUCTS}
    return render(request, "products/index.html", context)


def show(request, product_id):
    product = find_product(product_id)
    if product:
        context = {"product": product}
        return render(request, "products/show.html", context)
    return render(request, "products/not_found.html", status=404)
