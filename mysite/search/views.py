from django.shortcuts import render
from .models import Search

# Create your views here.
def search_feature(request):
    # Check if the request is a post request.
    if request.method == 'POST':
        # Retrieve the search query entered by the user
        search_query = request.POST['search_query']
        # Filter your model by the search query
        posts = Model.objects.filter(fieldName__contains=search_query)
        return render(request, 'app/template_name.html', {'query':search_query, 'posts':posts})
    else:
        return render(request, 'app/template_name.html',{})
    
    