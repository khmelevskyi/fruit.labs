from django import forms

from website.models import Product


class responseForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ('name', 'quantity', 'text', 'price', 'total') # text is total
        
        widgets = {

            'name': forms.TextInput(),
            'quantity': forms.TextInput(),
            'text': forms.TextInput(),
            'price': forms.TextInput(),
            'total': forms.TextInput(),
        }
