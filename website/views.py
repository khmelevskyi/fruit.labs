from django.shortcuts import render

# Create your views here.

from .models import Product, HandMadeComponents, PastillaComponents, Pastilla
from django.views.decorators.csrf import csrf_protect
from .forms import response
import requests
from os import environ as env


@csrf_protect
def product_list(request):
    objects_list = Product.objects.all()
    HMcomp_list = HandMadeComponents.objects.all()
    Pcomp_list = PastillaComponents.objects.all()
    pastilla_list = Pastilla.objects.all()
    form = response.responseForm(request.POST or None)
    context = {'objects_list': objects_list, 'HMcomp_list': HMcomp_list, 'Pcomp_list': Pcomp_list, 'pastilla_list': pastilla_list, 'form': form}

    # # POST request
    # if request.method == 'POST':
    #     print('Incoming..')
    #     print(request.get_json())  # parse as JSON
    #     return 'OK', 200

    if request.method == 'POST':
        form = response.responseForm(request.POST)
        text = ''

        name = request.POST.get('name')
        quantity = request.POST.get('quantity')
        hooman_contacts = request.POST.get('text')
        total = request.POST.get('total')
        price_per_item = request.POST.get('price')

        name = split_post_items(name)
        quantity = split_post_items(quantity)
        price_per_item = split_post_items(price_per_item)

        text += hooman_contacts + '\n\n'

        for i in range(len(name)):
                text += 'Название: ' + name[i] + '   ' + 'Количество: ' + quantity[i] + '\n' + 'По цене(1 штука): ' + price_per_item[i] + '\n\n'

        text += '\nОбщая сумма заказа: ' + total
        # quantity = request.POST.get('quantity')
        # form2 = request.Get.get('name')
        # print(form)
        api_key = env.get('API_KEY')
        chat_id_kh = env.get('CHAT_ID_KH')
        print(f'df: {chat_id_kh}')
        chat_id_s = env.get('CHAT_ID_S')
        r = requests.post(f'https://api.telegram.org/bot{api_key}/sendMessage', data = {'chat_id':f'{chat_id_kh}', 'text':text})

    return render(request, 'website/products_list.html', context)

def split_post_items(item):
    result = item.split(",")
    return result



