from django.shortcuts import render

def index(request):
    return render(request, 'aboutus/index.html')
