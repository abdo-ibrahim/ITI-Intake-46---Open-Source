from django.contrib import admin

# Register your models here.
from products.models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
	list_display = ("id", "name", "category", "price", "stock", "created_at")
	list_filter = ("category",)
	search_fields = ("name", "description")