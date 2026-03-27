from django.db import models
from django.shortcuts import reverse

from categories.models import Category

# Create your models here.


class Product(models.Model):
	name = models.CharField(max_length=150)
	category = models.ForeignKey(
		Category,
		on_delete=models.SET_NULL,
		null=True,
		blank=True,
		related_name="products",
	)
	stock = models.IntegerField(default=0)
	image = models.ImageField(upload_to="products/images", null=True, blank=True)
	price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
	description = models.TextField(blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.name

	@property
	def show_url(self):
		return reverse("products:show", args=[self.id])

	@property
	def delete_url(self):
		return reverse("products:delete", args=[self.id])
