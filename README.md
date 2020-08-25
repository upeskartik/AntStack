# Meta tag Validator
## Overview
This API is created for two purposes:
1. Check for a specific meta tag in an html document of a url and return the content of the meta tag (https://antstackmetalog.herokuapp.com/api/find-metatag)
  
  sample input:
  {
    "url": "https://www.flipkart.com",
    "metatag_name": "Keywords"
  }
  
2. Check for a specific dns txt record in a url and return the domains (https://antstackmetalog.herokuapp.com/api/dns-lookup)
  
  sample input:
  {
    "url": "geeksforgeeks.org",
    "dns_txt": "A"
  }

The working API is hosted [here](https://antstackmetalog.herokuapp.com)

## Setting up the environment for local development
Run npm install after pulling the source code, in the source directory.

## Running API Server
Run the API server in your local machine using the command `node app.js`

### Testing

Testing of this api is done through Postman
