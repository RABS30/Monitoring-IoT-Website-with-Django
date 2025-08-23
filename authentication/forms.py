from cProfile import label
from django import forms
from django.forms import ModelForm
from django.contrib.auth.models import User


class loginUserForm(forms.Form):
    username    = forms.CharField(label='Username', max_length=100, required=True)
    password    = forms.CharField(widget=forms.PasswordInput(), min_length=8)
    
    
    
class registerUserForm(ModelForm):
    password        = forms.CharField(widget=forms.PasswordInput(), min_length=8)
    confirmPassword = forms.CharField(widget=forms.PasswordInput(), min_length=8)

    
    class Meta :
        model   = User
        fields  = ['first_name', 'username', 'email']
    
