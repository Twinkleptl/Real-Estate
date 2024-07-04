# Real-Estate

Steps to Test the APIs using Postman

Add New Property URL: http://localhost:8081/add_new_property Method: POST Body: json { "property_name": "Sunset Villa", "locality": "Downtown", "owner_name": "John Doe" }

Fetch All Properties URL: http://localhost:8081/fetch_all_properties?locality_name=Downtown Method: GET

Update Property Details URL: http://localhost:8081/update_property_details Method: PUT Body: json { "property_id": "<property_id>", "locality_id": "<locality_id>", "owner_name": "Jane Doe" }

Delete Property Record URL: http://localhost:8081/delete_property_record Method: DELETE Body: json { "property_id": "<property_id>" }

Fetch All Localities (Additional API) URL: http://localhost:8081/fetch_all_localities Method: GET

Make sure to replace <property_id> and <locality_id> with actual IDs from your database. Now, you should be able to successfully test all the APIs using Postman.
