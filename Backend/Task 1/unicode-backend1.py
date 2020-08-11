def Unicode(num1,num2):
	#num1=2 #Giving Value to the Smaller Number
	#num2=7 # Giving value to the Larger number
	""" In case you want to take input of the two numbers from the user : """
	#num1 = int(input("Enter th smaller number:"))
	#num2 = int(input("Enter the larger number:"))


	""" Defining an empty Dictionary """
	dictionary = {}
	    

	""" Looping through all the numbers between num1 and num2(excluded) """
	for j in range(num1,num2):
		number = j
		num_bits = 8
		bits = [(number >> bit) & 1 for bit in range(num_bits - 1, -1, -1)]

		for i in range(7):   #To iterate over the 8 bits (0 to 7)

			if((bits[i] and bits[i+1])==1): # Checking Condition
				dictionary[j] = "True" # Adding to the Dictionary 
			else:
				if j not in dictionary:
					dictionary[j] = "False" # Adding to the Dictionary

	print(dictionary)

Unicode(3,7)  # Calling the function with smaller number and larger number as parameters
