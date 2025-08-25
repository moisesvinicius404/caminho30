from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
import re


def home_view(request):
    return render(request, "index.html")


@csrf_exempt
def cadastro_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse(
                {"status": "error", "message": "JSON inválido na requisição."},
                status=400,
            )

        first_name = data.get("nome")
        email = data.get("email")
        senha = data.get("senha")

        if not first_name or not email or not senha:
            return JsonResponse(
                {"status": "error", "message": "todos os campos são obrigatórios."},
                status=400,
            )
        if len(first_name) < 3:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "este campo requer pelo menos 3 caracteres",
                },
                status=400,
            )
        if User.objects.filter(email__iexact=email).exists():
            return JsonResponse(
                {"status": "error", "message": "usuário já cadastrado."}, status=400
            )

        if len(senha) < 8:
            return JsonResponse(
                {
                    "status": "error",
                    "message": "a senha deve ter pelo menos 8 caracteres",
                },
                status=400,
            )
        User.objects.create_user(username=first_name, email=email, password=senha)
        return JsonResponse(
            {"status": "sucess", "message": "Usuário cadastrado com sucesso!"},
            status=200,
        )
    return render(request, "cadastro.html")


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            senha = data.get("senha")

            if not email or not senha:
                return JsonResponse(
                    {
                        "status": "error",
                        "message": "E-mail e senha são campos obrigatórios.",
                    },
                    status=400,
                )

            try:
                user = User.objects.get(email__iexact=email)
            except User.DoesNotExist:

                return JsonResponse(
                    {"status": "error", "message": "Credenciais inválidas."}, status=400
                )

            if user.check_password(senha):

                login(request, user)
                return JsonResponse(
                    {"status": "sucess", "message": "Login realizado com sucesso!!"},
                    status=200,
                )
            else:

                return JsonResponse(
                    {"status": "error", "message": "Credenciais inválidas."}, status=400
                )

        except json.JSONDecodeError:
            return JsonResponse(
                {"status": "error", "message": "JSON inválido na requisição"},
                status=400,
            )
        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": "Erro inesperado."}, status=400
            )

    return render(request, "login.html")


def boas_vindas_view(request):
    context = {"usuario": request.user}
    return render(request, "boas_vindas.html", context)


def missoes_view(request):
    return render(request, "missoes.html")
