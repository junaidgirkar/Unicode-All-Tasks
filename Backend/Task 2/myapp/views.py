from django.shortcuts import render, HttpResponse
import json

# Create your views here.
def home(request):
    if request.method=='GET':
        return render(request, 'myapp/home.html')
    if request.method == 'POST':
        smaller_num = request.POST.get('smaller_number')
        larger_num = request.POST.get('larger_number')
        num1 = int(smaller_num) # Converting number into int from string
        num2 = int(larger_num)  # Converting number into int from string
        dictionary = {} # Initiating an empty dictionary


        for j in range(num1,num2):
            number = j
            num_bits = 8
            bits = [(number >> bit) & 1 for bit in range(num_bits - 1, -1, -1)]

            for i in range(7):   # To iterate over the 8 bits (0 to 7)

                if((bits[i] and bits[i+1])==1):
                    dictionary[j] = "True"      # Adding key,value to the dictionary
                    
                else:
                    if j not in dictionary:
                        dictionary[j] = "False" # Adding key,value to the dictionary


        json_string = json.dumps(dictionary,skipkeys=True) # Converting a Dictionary into a json_string

        args={'json_string':json_string}
        return render(request, 'myapp/home.html', args)
    else:
        return render(request, 'myapp/home.html')

# This is views for a dynamic url

def dynamicHome(request,small,large):
    num1 = int(small)
    num2 = int(large)

    dictionary = {}

    for j in range(num1, num2):
        number = j
        num_bits = 8
        bits = [(number >> bit) & 1 for bit in range(num_bits - 1, -1, -1)]

        for i in range(7):  # To iterate over the 8 bits (0 to 7)

            if ((bits[i] and bits[i + 1]) == 1):
                dictionary[j] = "True"

            else:

                if j not in dictionary:
                    dictionary[j] = "False"

    json_string = json.dumps(dictionary, skipkeys=True)

    args = {'json_string': json_string}#, 'small':small,'large':large}
    return render(request, 'myapp/home.html', args)



