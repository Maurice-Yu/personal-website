from django.shortcuts import render
from .models import Search
from azure.cosmos import cosmos_client
import json
from django.http import JsonResponse
CONFIG = {
    "ENDPOINT": "https://anime-offline-db.documents.azure.com:443/",
    "PRIMARYKEY": "phiGGZqgWjHy2woaTdShWZskLC0CAAIjgNyjCUnfvIthKgDkiHy2DqPq7m62Yt3SCmPm5Req4K9BACDbjYgMig==",
    "DATABASE": "a-o-db",  # Prolly looks more like a name to you
    "CONTAINER": "test1"  # Prolly looks more like a name to you
}

#CONTAINER_LINK = f"dbs/{CONFIG['DATABASE']}/colls/{CONFIG['CONTAINER']}"
#FEEDOPTIONS = {}
#FEEDOPTIONS["enable_cross_partition_query"] = True
# There is also a partitionKey Feed Option, but I was unable to figure out how to us it.

# Create your views here.
def search_feature(request):
    # Check if the request is a post request.
    data = json.loads(request.body)
    search = data.get('searchQ')
    
    QUERY = {
        "query": f"SELECT * from c WHERE LOWER(c.title) LIKE LOWER('{search}%')"
    }
    # Initialize the Cosmos client
    client = cosmos_client.CosmosClient(
        url=CONFIG["ENDPOINT"],
        credential=CONFIG["PRIMARYKEY"]
        #url_connection=CONFIG["ENDPOINT"], auth={"masterKey": CONFIG["PRIMARYKEY"]}
    )

    # Query for some data
    #results = client.query_databases(CONTAINER_LINK, QUERY, FEEDOPTIONS, max_item_count=10)
    #results = client.list_databases(max_item_count=10)
    db_client = client.get_database_client(CONFIG['DATABASE'])
    container_client = db_client.get_container_client(CONFIG['CONTAINER'])
    results = container_client.query_items(max_item_count=10, query=QUERY["query"], enable_cross_partition_query=True)
    result = []  # To store the converted items

    for page in results.by_page():
        # page is of type 'itemPage'
    
        
        # Process each item in the page
        for item in page:
            # Convert item to JSON format and append to results
            result.append(item)
            print(item.get("title"))
            print("itworks")
# Create a JSON response using JsonResponse
    response_data = {"results": result}
    return JsonResponse(response_data)

    if request.method == 'POST':
        # Retrieve the search query entered by the user
        search_query = request.POST['search_query']
        # Filter your model by the search query
        # posts = Model.objects.filter(fieldName__contains=search_query)
        return JsonResponse({'results':results})
    else:
        return render(request, 'app/template_name.html',{})


# Create your views here.
def search_tag_feature(request):
    # Check if the request is a post request.
    data = json.loads(request.body)
    search = data.get('searchQ')
    
    QUERY = {
        "query": f"SELECT * from c WHERE LOWER(c.title) LIKE LOWER('{search}%')"
    }
    #QUERY = {
    #    "query": f"SELECT * from c WHERE ARRAY_CONTAINS(c.tags, LOWER('{search}%'))"
    #}
    # Initialize the Cosmos client
    client = cosmos_client.CosmosClient(
        url=CONFIG["ENDPOINT"],
        credential=CONFIG["PRIMARYKEY"]
        #url_connection=CONFIG["ENDPOINT"], auth={"masterKey": CONFIG["PRIMARYKEY"]}
    )

    # Query for some data
    #results = client.query_databases(CONTAINER_LINK, QUERY, FEEDOPTIONS, max_item_count=10)
    #results = client.list_databases(max_item_count=10)
    db_client = client.get_database_client(CONFIG['DATABASE'])
    container_client = db_client.get_container_client(CONFIG['CONTAINER'])
    results = container_client.query_items(max_item_count=10, query=QUERY["query"], enable_cross_partition_query=True)
    result = []  # To store the converted items

    for page in results.by_page():
        # page is of type 'itemPage'
    
        
        # Process each item in the page
        for item in page:
            # Convert item to JSON format and append to results
            result.append(item)
            print(item.get("title"))
            print("itworks")
# Create a JSON response using JsonResponse
    response_data = {"results": result}
    return JsonResponse(response_data)

    if request.method == 'POST':
        # Retrieve the search query entered by the user
        search_query = request.POST['search_query']
        # Filter your model by the search query
        # posts = Model.objects.filter(fieldName__contains=search_query)
        return JsonResponse({'results':results})
    else:
        return render(request, 'app/template_name.html',{})
    
def search_feature_test(request,queryVar):
    # Check if the request is a post request.
    QUERY = {
        "query": f"SELECT * from c WHERE c.title LIKE '%{queryVar}%'"
    }

    # Initialize the Cosmos client
    client = cosmos_client.CosmosClient(
        url=CONFIG["ENDPOINT"],
        credential=CONFIG["PRIMARYKEY"]
        #url_connection=CONFIG["ENDPOINT"], auth={"masterKey": CONFIG["PRIMARYKEY"]}
    )

    # Query for some data
    #results = client.query_databases(CONTAINER_LINK, QUERY, FEEDOPTIONS, max_item_count=10)
    #results = client.list_databases(max_item_count=10)
    db_client = client.get_database_client(CONFIG['DATABASE'])
    container_client = db_client.get_container_client(CONFIG['CONTAINER'])
    results = container_client.query_items(max_item_count=10, query=QUERY["query"], enable_cross_partition_query=True)
    result = []  # To store the converted items

    for page in results.by_page():
        # page is of type 'itemPage'
    
        
        # Process each item in the page
        for item in page:
            # Convert item to JSON format and append to results
            result.append(item)
            print(item.get("title"))

# Create a JSON response using JsonResponse
    response_data = {"results": result}
    return JsonResponse(response_data)

    
    # Retrieve the search query entered by the user
    # search_query = request.POST['search_query']
    # Filter your model by the search query
    # posts = Model.objects.filter(fieldName__contains=search_query)
    print(json.dumps(list(results)[0:10]))
    return JsonResponse({'stuff':json.dumps(list(results)[0:10])},safe=False)

   
    
    