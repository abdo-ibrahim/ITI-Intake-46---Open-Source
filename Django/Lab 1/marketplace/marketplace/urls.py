from django.contrib import admin
from django.urls import path, include
from products import views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('', views.index, name='home'),
    
    path('products/', include('products.urls')),
    path('about-us/', include('aboutus.urls')),
    path('contact-us/', include('contactus.urls')),
]