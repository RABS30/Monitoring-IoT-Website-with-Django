from django.shortcuts import render, HttpResponse

# login
def login(request):
    if request.method == 'POST' :
        print(request.POST)
    return render(request, "authentication/login.html")


# register
def register(request):
    print(request.POST)
    return render(request, "authentication/register.html")