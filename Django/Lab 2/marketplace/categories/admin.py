from django.contrib import admin

# Register your models here.
from categories.models import Category

admin.site.register(Category)
