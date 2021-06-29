1. To post a record to Places collection:
    a: call this api "/places" with a post method and JSON object on the body with data of "name", "city", "state"
    b: this would add the data to the db. The record will also have a slug created from name. For example, if the name is "Chennai Express",
    the slug would be "Chennai_Express"
2. To get a record using its slug:
    a: call this api "/places/:slug" passing the slug in place of ":slug"
    b: This returns a single record whose slug matches the request param
    c: slug is case-sensitive. so searching with "chennai_express" would Not fetch the record with slug "Chennai_Express"
3. To get records based on the entered name or city:
    a: call this api "/places/:nameOrCity passing name or the city in place of ":nameOrCity"
    b: This returns all records whose name or city matches (partial match) with the entered nameOrCity. 