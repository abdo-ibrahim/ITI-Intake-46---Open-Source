from django.urls import path

from products.api.views import details, index

urlpatterns = [
	path("", index, name="index"),
	path("<int:id>", details, name="details"),
]
