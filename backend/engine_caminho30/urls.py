from django.urls import path
from . import views

urlpatterns = [
     path('', views.home_view, name='home'),
     path('cadastro/', views.cadastro_view, name='cadastro'),    
     path('login/', views.login_view, name='login'),
     path('boas-vindas/',views.boas_vindas_view,name='boas-vindas'),
     path('missoes/',views.missoes_view, name='missoes'),
]

