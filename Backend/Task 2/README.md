# Unicode-Backend-2
### Taking input from a HTML page , Running a python script and then displaying the output on the HTML page. 
### Input is taken via HTML forms which is then submitted to Django views where a python script is run with the input data.
### The output is displayed using Jinja2 templates.
### Since the output is a dictionary and Jinja2 can't render a dictionary, we convert the dictionary into a json_string using the JSON.dumps() function which can be then rendered (Recommended)
### Another option to render is to render a List of alternating key and values
### Third possible option is to render a list of Dictionaries
