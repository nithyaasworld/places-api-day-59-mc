# How to use this APIs:

### To post a record to "Places" collection: 
* Call this api "/places" with a post method and JSON object on the body with data of "name", "city", "state" 
* This would add the data to the db. The record will also have a slug created from name. For example, if the name is "Chennai Express", the slug would be "Chennai_Express"
### To get a record using its slug: 
* Call this api "/places/:slug" passing the slug in place of ":slug" 
* This returns a single record whose slug matches the request param c: slug is case-sensitive. so searching with "chennai_express" would Not fetch the record with slug "Chennai_Express"
### To get records based on the entered name or city: 
* Call this api "/places/:nameOrCity passing name or the city in place of ":nameOrCity" 
* This returns all records whose name or city matches (partial match) with the entered nameOrCity.
