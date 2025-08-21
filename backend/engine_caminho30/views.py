from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login

def home_view(request):
    return render(request, 'index.html')


def cadastro_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            nome = data.get('nome')
            email = data.get('email')
            senha = data.get('senha')
            
            if User.objects.filter(username=nome).exists():
                return JsonResponse({'status': 'error', 'message': 'Este nome de usuário já está em uso.'}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({'status': 'error', 'message': 'Este e-mail já está em uso.'}, status=400)
          
            User.objects.create_user(username=nome, email=email, password=senha)
            
            return JsonResponse({'status': 'sucess', 'message': 'Usuário cadastrado com sucesso!'})
        except Exception as e:
            
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return render(request, 'cadastro.html')


def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get('email')
            senha = data.get('senha')

            user = User.objects.get(email=email)

            if not user.check_password(senha):
                return JsonResponse({'status': 'error', 'message': 'Credenciais inválidas.'}, status=400)

            login(request, user)
            return JsonResponse({'status': 'success', 'message': 'Login realizado com sucesso!'})

        except User.DoesNotExist:#conectar rota do login pra pagina principal.
            return JsonResponse({'status': 'error', 'message': 'Credenciais inválidas.'}, status=400)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return render(request, 'login.html')


def boas_vindas_view(request):
    context = {
        'usuario': request.user
    }
    return render(request, "boas_vindas.html", context)

def missoes_view(request):
    return render(request, 'missoes.html')