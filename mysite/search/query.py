from azure.cosmos import cosmos_client
import json

CONFIG = {
    "ENDPOINT": "https://anime-offline-db.documents.azure.com:443/",
    "PRIMARYKEY": "phiGGZqgWjHy2woaTdShWZskLC0CAAIjgNyjCUnfvIthKgDkiHy2DqPq7m62Yt3SCmPm5Req4K9BACDbjYgMig==",
    "DATABASE": "a-o-db",  # Prolly looks more like a name to you
    "CONTAINER": "test1"  # Prolly looks more like a name to you
}

CONTAINER_LINK = f"dbs/{CONFIG['DATABASE']}/colls/{CONFIG['CONTAINER']}"
FEEDOPTIONS = {}
FEEDOPTIONS["enable_cross_partition_query"] = True
# There is also a partitionKey Feed Option, but I was unable to figure out how to us it.

QUERY = {
    "query": f"SELECT * from c WHERE c.animeSeason.year=2000"
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

# Look at your data
print(list(results))

# You can also use the list as JSON
#json.dumps(list(results), indent=4)