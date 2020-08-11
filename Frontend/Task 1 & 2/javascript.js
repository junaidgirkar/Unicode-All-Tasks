
function validation()
{
    console.log('validating')
    var name = document.forms["RegForm"]["Name"];
    var email = document.forms["RegForm"]["EMail"];
    var phone = document.forms["RegForm"]["Mobile_num"];
    var city =  document.forms["RegForm"]["City"];
    var pincode = document.forms["RegForm"]["Pincode"];
    var address = document.forms["RegForm"]["Address1"];

{
    if (name.value == "")
    {
        window.alert("Please enter your name.");
        name.focus();
        return false;
    }
   /* var letters = /^[A-Za-z]+$/;
    if(name.value.match(letters))
    {
        return true;
    }
    else
    {
        alert('Name must have alphabet characters only!');
        name.focus();
        return false;
    }*/

}


//function address_validation()
{
    if (address.value == "")
    {
        window.alert("Please enter your address.");
        address.focus();
        return false;
    }

    /*var letters = /^[0-9a-zA-Z]+$/;
    if(address.value.match(letters))
    {
        return true;
    }
    else
    {
        alert('Address must have alphanumeric characters only!');
        address.focus();
        return false;
    }*/
}





//function pincode_validation()
{
    if (pincode.value == "")
    {
        window.alert("Please enter your pincode !");
        password.focus();
        return false;
    }
    /*var pincode_number = /^[0-9]{6}/;
    if(pincode.value.match(numbers))
    {
        return true;
    }
    else
    {
        alert('Pin Code must consist of exactly 6 numerical characters only!');
        pincode.focus();
        return false;

    }*/
}





//function email_validation()
{

    if (email.value == "")
    {
        window.alert("Please enter a valid e-mail address.");
        email.focus();
        return false;
    }

   /* var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.value.match(mailformat))
    {
        return true;
    }
    else
    {
        alert("You have entered an invalid email address");
        email.focus();
        return false;
    }*/
}




//function phone_validation()
{

    if (phone.value == "")                           
    {
        window.alert("Please enter your telephone number.");
        phone.focus();
        return false;
    }

    /*var mobile_number = /^((\+91)?|91)?[789][0-9]{9}/;
    var number_length = phone.value.length();

    {
        if (phone.value.match(mobile_number))
        {
            return true;
        }
        else
        {
            window.alert('Phone Number must have exactly 10 numeric characters only!')
            phone.focus();
            return false;
        }
    }*/

}








//function city_validation()
{

    if (city.selectedIndex < 1)
    {
        alert("Please select a city! ");
        city.focus();
        return false;
    }
}

}
