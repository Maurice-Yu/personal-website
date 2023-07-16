from django.shortcuts import render
from django.http import HttpResponse
from .models import Question
from django.utils import timezone

def index(request):
    allquestions=Question.objects.all()
    return HttpResponse(f"hello there are {len(allquestions)} questions")
# Create your views here.
def index2(request):
    q = Question(question_text="What's new?", pub_date=timezone.now())
    q.save()
    return HttpResponse("Hello, world.")

def deleteQuestions(request):
    filterQuestions=Question.objects.filter(question_text="What's new?")
    if(len(filterQuestions)==0):
        return HttpResponse("there are no questions to delete")
    filterQuestions[0].delete()
    return HttpResponse("Deleted 1 question")
