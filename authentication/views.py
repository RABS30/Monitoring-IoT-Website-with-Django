from re import L
from django.forms import ValidationError
from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login
from django.urls import reverse_lazy

from .forms import loginUserForm, registerUserForm

# login
def loginUser(request):
    # Proses Login
    if request.method == 'POST' :
        # Mengambil data dari input form
        username    = request.POST.get('username')
        password    = request.POST.get('password')

        # memasukkan data input ke form untuk dibersihkan
        user = loginUserForm({'username' : username, 'password': password})

        # memvalidasi data
        if user.is_valid():
            
            # autentikasi pengguna
            user = authenticate(request, username=user.cleaned_data.get('username'), password=user.cleaned_data.get('password'))
            
            
            # Jika autentikasi berhasil  
            if user is not None :
                # Login jika autentikasi berhasil
                login(request, user)
                # redirect ke dashboard
                return redirect(reverse_lazy('dashboard:dashboard'))
            else :
                # Jika autentikasi gagal
                return redirect(reverse_lazy('auth:login'))            
                
        else :
            # Jika data tidak valid
            return redirect(reverse_lazy('auth:login'))            
            
    context = {
        'loginUserForm' : loginUserForm,
    }
    
    return render(request, "authentication/login.html", context)


# register
def register(request):
    
    if request.method == 'POST':
        print(request.POST)
        userRegister = registerUserForm(request.POST)

        if userRegister.is_valid() :
            userRegister.save()
            return redirect(reverse_lazy('auth:login'))
        else :
            print(userRegister.errors)
            
    context = {
        'registerUserForm' : registerUserForm 
    }
    return render(request, "authentication/register.html", context)