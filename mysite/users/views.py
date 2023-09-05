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
            if Users.objects.filter(username=username).exists():
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
        new_user.animeList={"title":"nothing yet"}
        new_user.save()
        return JsonResponse({'message': 'User registered successfully.'})
    return JsonResponse({'error': 'Invalid request method.'}, status=405)
def auth(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            if not username or not password:
                return JsonResponse({'error': 'Username and password are required.'}, status=400)
            if not Users.objects.filter(username=username).exists():
                return JsonResponse({'error': 'user does not exist.'}, status=400)
            usercheck = Users.objects.get(username=username)
            print("inside auth:"+usercheck.passwordHash)
            if usercheck.check_password(password):
                return JsonResponse({'ok': 'credentials match'}, status=200)
            return JsonResponse({'error': 'user does not exist.'}, status=599)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)

def getList(request):
    
    print(request)
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')

            if not username :
                return JsonResponse({'error': 'Username and password are required.'}, status=400)
            if not Users.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username does not exist'}, status=400)
            allUsers=Users.objects.all()
            filterUser=allUsers.filter(username=username)[0].animeList
            returnResult = filterUser
            return JsonResponse(returnResult)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
        
    return JsonResponse({'error': 'Invalid request method.'}, status=405)

def addToList(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            payload = data.get('payload')
            if not username:
                return JsonResponse({'error': 'Username and password are required.'}, status=400)
            if not payload:
                return JsonResponse({'error': 'Username and password are required.'}, status=400)
            if not Users.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username does not exist'}, status=400)
            user = Users.objects.get(username=username)
            print("before"+ json.dumps(user.animeList.get('results')))
            user.animeList.get('results').append(payload)
            user.save()
            print("after "+ json.dumps(user.animeList.get('results')))
            return JsonResponse({'OK': 'Invalid request method.'}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
    return JsonResponse({'error': 'Invalid request method.'}, status=405)
def deleteFromList(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            payload = data.get('payload')
            if not username:
                return JsonResponse({'error': 'Username and password are required.'}, status=400)
            if not payload:
                return JsonResponse({'error': 'Username and password are required.'}, status=400)
            if not Users.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username does not exist'}, status=400)
            user = Users.objects.get(username=username)
            print("before"+ json.dumps(user.animeList.get('results')))
            tempList=user.animeList.get('results')
            print("templistbefore"+templist)
            templist2 = [d for d in templist if d['id'] != payload]
            print("templistafter"+templist2)
            user.animeList={'results':templist2}
            user.save()
            print("after "+ json.dumps(user.animeList.get('results')))
            return JsonResponse({'OK': 'Invalid request method.'}, status=200)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
    return JsonResponse({'error': 'Invalid request method.'}, status=405)