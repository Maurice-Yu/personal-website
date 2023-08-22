from django.shortcuts import render
from django.http import HttpResponse
from .models import Users
from django.utils import timezone
from django.http import JsonResponse
import json
# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
def addUser(request):
    print(request)
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return JsonResponse({'error': 'Username and password are required.'}, status=400)
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists.'}, status=400)
            new_user = Users(username=username)
            new_user.setPassword(password)
            new_user.save()
            return JsonResponse({'message': 'User registered successfully.'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
        
    return JsonResponse({'error': 'Invalid request method.'}, status=405)
def testGet(request,un):
    print(un)
    if request.method == 'GET':
        allUsers=Users.objects.all()
        filterUser=allUsers.filter(username=un)
        if(len(filterUser)==0):
            return JsonResponse({'message': 'no user found'})
        returnobj={"username":filterUser[0].username,"password":filterUser[0].passwordHash}
        return JsonResponse(returnobj)
    
    return JsonResponse({'error': 'Invalid request method.'}, status=405)

def testAdd(request,un,pw):
    print(un)
    print(pw)
    if request.method == 'GET':
        if Users.objects.filter(username=un).exists():
            return JsonResponse({'error': 'Username already exists.'}, status=400)
        new_user = Users(username=un)
        new_user.setPassword(pw)
        new_user.save()
        return JsonResponse({'message': 'User registered successfully.'})
    return JsonResponse({'error': 'Invalid request method.'}, status=405)
