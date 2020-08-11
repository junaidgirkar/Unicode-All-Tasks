# Unicode-Backend-3-4

## Consists of 2 API's of NASA
  - Nasa Insight API for Mars Weather
  - Nasa APOD API for Picture of the Day
  
### Takes SOL as input from a HTML Form and calls the API. Parses through the JSON file returned and displays the information from that JSON on the HTML page. The information is displayed by using Jinja templates.
### For the second API, the API is called by a Display button which displays a Picture of the Day on the HTML page again using Jinja templates.
### The Third item in the navbar opens an HTML page with an input fiels which takes a SOL value. It then searches through the sqlite database and displays the resulting values on the HTML page including count which is incremented every time the SOL query is done.
### The last item in the navbar opens an HTML page which displays a table on clicking of the button. The table consists of top 3 rows of the database arranged in the descending order of count variable.
