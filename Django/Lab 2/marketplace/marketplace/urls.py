from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from products import views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('', views.index, name='home'),
    
    path('products/', include('products.urls')),
    path('categories/', include('categories.urls')),
    path('about-us/', include('aboutus.urls')),
    path('contact-us/', include('contactus.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)