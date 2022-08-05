//client side javascript for all .html files
//validate user inputs and fetch infor to app.js

async function login(userName, passwd, test)
{
	try{
		
        if(!test)
        {
            /* istanbul ignore next */
            var userName = document.querySelector("#user").value;
            /* istanbul ignore next */
            var passwd = document.querySelector('#pass').value;
        }

        if(userName == "") 
        {
            /* istanbul ignore next */
            alert("Empty username");
            return false;
        } 
        else if(passwd == "") 
        {
            /* istanbul ignore next */
            alert("Empty password");
            return false;
        }
    
        //validating login details with the DB
        const body = { userName : userName, password : passwd }; 
        
        // connect to heroku, remove localhost:port
        /* istanbul ignore next */
        const response = await fetch("http://localhost:5000/login", 
        {        
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        } ); 

        /* istanbul ignore next */
        const creds = await response.json();

        //creds[0] contains bool value for foundUserID && password match
        //creds[1] contains bool value for whether the user has set their profile
        
        /*istanbul ignore next*/
        if (creds[0] == false)
        {
            alert("Invalid username or password. Please try again.")
            return creds;
        }

        /* istanbul ignore next */
        else if (creds[0] == true && creds[1] == true)
        {
            location.href = "getQuote.html"
        }
        /* istanbul ignore next */
        else if (creds[0] == true && creds[1] == false)
        {
            alert("Please set profile before continuing")
            location.href = "regProfile.html"
        }
        
        return creds;

	}
	catch(err){
		console.log(err);
	}
}
module.exports.login = login;

/* istanbul ignore next */
function nospaces(t)
{
    if(t.value.match(/\s/g)){
      t.value=t.value.replace(/\s/g,'');
    }
}

/* istanbul ignore next */
async function checklogin()
{
    const response = await fetch("http://localhost:5000/checklogin", 
    {        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(body)
    });
    const abc = await response.json();
    if(!abc)
    {
		alert("OOPS! You are not logged in. Please login to continue.");
        location.href = "index.html"
        return false;
    }
    else{
        return true;
    }
    return abc;
}

//function to get data from register.html
async function register(username, password, test)
{
    try{
        if(!test)
        {
            /* istanbul ignore next */
            var username = document.querySelector("#user").value;

            /* istanbul ignore next */
            var password = document.querySelector('#pass').value;
        }

        if(username == "") 
        {
            /* istanbul ignore next */
            alert("Empty User name")
            return false;
        } 
        else if(password == "") 
        {
            /* istanbul ignore next */
            alert("Empty password")
            return false;
        }    

        //create a new user in the db

        const body = { username : username, password : password }; 
        // connect to heroku, remove localhost:port
        /* istanbul ignore next */
        const response = await fetch("http://localhost:5000/register", 
        {        
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        } ); 
        /* istanbul ignore next */
        const uniqueUser = await response.json();

        if (uniqueUser)
        {
            /* istanbul ignore next */
            alert("User created successfully")
            /* istanbul ignore next */
            location.href = "regProfile.html"
        }
        else
        {
            /* istanbul ignore next */
            alert("Username is already in use. Please choose another username")
        }   

        return uniqueUser;

    }
    catch(err){
        console.log(err);
    }
}
module.exports.register = register

/* istanbul ignore next */
async function getProfileInfo(){
	try{
        const response = await fetch("http://localhost:5000/getProfile",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
		
        const profile = await response.json();
        document.querySelector("#name").value  = profile[0];
		document.querySelector("#address1").value  = profile[1];
		document.querySelector("#address2").value  = profile[2];
		document.querySelector("#lcity").value  = profile[3];
		document.querySelector("#states").value  = profile[4];
		document.querySelector("#zip").value  = profile[5];
    }
    catch(err){
        console.log(err);
    }
}

//function to update profile 
async function profile(fullname, address1, address2, city, state, zip, test)
{
    try{
        if(!test)
        {
            /* istanbul ignore next */ 
            var fullname = document.querySelector('#name').value;
            /* istanbul ignore next */
            var address1 = document.querySelector('#address1').value;
            /* istanbul ignore next */
            var address2 = document.querySelector('#address2').value;
            /* istanbul ignore next */
            var city = document.querySelector('#lcity').value;
            /* istanbul ignore next */
            var state = document.querySelector('#states').value;
            /* istanbul ignore next */
            var zip = document.querySelector('#zip').value;
        }
    

        if(fullname == "")
        {
            /* istanbul ignore next */
            alert("Enter full name please")
            return false;
        }

        if(address1 == "")
        {
            /* istanbul ignore next */
            alert("Enter primary address please")
            return false;    
        }

        if (city == "")
        {
            /* istanbul ignore next */
            alert("Enter a city please")
            return false;
        }

        if(state == "none" || state == "")
        {
            /* istanbul ignore next */
            alert("Please select a state from the drop down menu")
            return false;
        }

        if(zip == "")
        {
            /* istanbul ignore next */
            alert("Please enter zipcode")
            return false;
        }

        if(zip.length <5 || zip.length >9)
        {
            /* istanbul ignore next */
            alert("Enter valid zipcode")
            return false;
        }

        //proceed to make changes to the DB if not alerted.

        const body = { fullname : fullname, address1 : address1, address2 : address2, city : city, state : state, zip : zip }; 
        // connect to heroku, remove localhost:port

        //check why this part isn't working
        /* istanbul ignore next */
        const response = await fetch("http://localhost:5000/profile", 
        {        
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        } ); 
        /* istanbul ignore next */
        const completed = await response.json();

        if (completed)
        {
            //location.href = "getQuote.html"
            /* istanbul ignore next */
            alert("Profile updated sucessfully")
            return completed;
        }

        else
        {
            /* istanbul ignore next */
            alert("Please complete profile")
            return completed;
        }
        return completed;
    }
    catch(err){
        console.log(err);
    }
}
module.exports.profile = profile

//Function to update profile when user register 
async function regProfile(fullname, address1, address2, city, state, zip, test)
{
    try{
        if(!test)
        {
            /* istanbul ignore next */
            var fullname = document.querySelector('#name').value;
            /* istanbul ignore next */
            var address1 = document.querySelector('#address1').value;
            /* istanbul ignore next */
            var address2 = document.querySelector('#address2').value;
            /* istanbul ignore next */
            var city = document.querySelector('#lcity').value;
            /* istanbul ignore next */
            var state = document.querySelector('#states').value;
            /* istanbul ignore next */
            var zip = document.querySelector('#zip').value;
        }

        if(fullname == "")
        {
            /* istanbul ignore next */
            alert("Enter full name please")
            return false;
        }

        if(address1 == "")
        {
            /* istanbul ignore next */
            alert("Enter primary address please")
            return false;    
        }

        if (city == "")
        {
            /* istanbul ignore next */
            alert("Enter a city please")
            return false;
        }

        if(state == "none" || state == "")
        {
            /* istanbul ignore next */
            alert("Please select a state from the drop down menu")
            return false;
        }

        if(zip == "")
        {
            /* istanbul ignore next */
            alert("Please enter zipcode")
            return false;
        }

        if(zip.length <5 || zip.length >5)
        {
            /* istanbul ignore next */
            alert("Enter valid zipcode")
            return false;
        }

        //proceed to make changes to the DB if not alerted.

        const body = { fullname : fullname, address1 : address1, address2 : address2, city : city, state : state, zip : zip }; 
        // connect to heroku, remove localhost:port

        //check why this part isn't working
        /* istanbul ignore next */
        const response = await fetch("http://localhost:5000/profile", 
        {        
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        } ); 

        const completed = await response.json();

        if (completed)
        {
            /* istanbul ignore next */
            location.href = "getQuote.html"
            /* istanbul ignore next */
            alert("Profile updated sucessfully")
            return completed;
        }

        else
        {
            /* istanbul ignore next */
            alert("Please complete profile")
            return completed;
        }
        return completed;
    }
    catch(err){
        console.log(err);
    }
}
module.exports.regProfile= regProfile;

/* istanbul ignore next */
async function signout()
{    
    const response = await fetch("http://localhost:5000/signout", 
    {        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(body)
    });
    const abc = await response.json();
    console.log(abc)
    if(abc)
        location.href = "index.html"
    else
        alert("Signout failed")
    return abc
}

/* istanbul ignore next */
async function checkNsignOut()
{
    const response = await fetch("http://localhost:5000/checkNsignOut", 
    {        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(body)
    });
    const checkprofile = await response.json();
    console.log(checkprofile)
    if(checkprofile)
        await signout()
    else
        alert("You need to add a profile before signing out")
    return checkprofile
}

/* istanbul ignore next */
async function ifsignedin()
{    
    const response = await fetch("http://localhost:5000/checklogin", 
    {        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(body)
    });
    const abc = await response.json();
    console.log(abc)
    if(abc)
        location.href = history.back();
}

//no entry to regProfile.html if user already has a profile
/* istanbul ignore next */
async function validEntry()
{    
    const response = await fetch("http://localhost:5000/checkNsignOut", 
    {        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(body)
    });
    const abcd = await response.json();
    console.log(abcd)
    if(abcd)
        location.href = history.back();
}


//function to connect quote history page and keep quotehistory page updated from back end
/* istanbul ignore next */
async function historyQ()
{
    
    //alert("from main.js!!!!!!!!!!")
    //console.log("true")
    const response = await fetch("http://localhost:5000/history", 
    {        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(body)
    });
    const abc = await response.json();
    if(abc === false)
    {
        alert("Please complete your user profile before viewing your quote history.");
        location.href = "regProfile.html";
        return false;
    }
    else
    {
        console.log(abc)

        var cols = [];  
        for (var i = 0; i < abc.length; i++)
        {
            for (var key in abc[i]) 
            {
                
                if (cols.indexOf(key) === -1) 
                {
                    // Push all keys to the array
                    //console.log(key+"\n")
                    cols.push(key);
                }
            }
        }

        // create a table element
        var table = document.createElement("table");

        // Add the data to the table
        for (var i = 0; i < abc.length; i++) 
        {
                
        // Create a new row
        var trow = table.insertRow(-1);
        trow.setAttribute("class", "table100-head");
            for (var j = 0; j < cols.length; j++) 
            {
                var cell = trow.insertCell(-1);
                var x=j+1;
                cell.setAttribute("class", "column"+x);
                    
                // Inserting the cell data              
                cell.innerHTML = abc[i][cols[j]];
                
            }
        }
    
        //Adding the created table
        var newTable = document.getElementById("table");
        newTable.innerHTML = "";
        newTable.appendChild(table);
    
        // console.log("true")
    

        return true
    }
    
}
module.exports.historyQ = historyQ

/* istanbul ignore next */
async function getQuoteInfo(){
	try{
		const response = await fetch("http://localhost:5000/quoteInfo",
		{
			method: "POST",
			headers: { "Content-Type": "application/json" }
		});
		
		const vals = await response.json();

        if(vals[0] == false)
        {
            alert("Please complete your user profile before sumbiting a quote.");
            location.href = "regProfile.html";
            return false;
        }

        else
        {
            document.querySelector("#suggested").hasHistory = vals[1];
            document.querySelector("#suggested").state = vals[2];
        }
	}
	catch(err){
		console.log(err);
	}
}

/* istanbul ignore next */
async function getAddress(){
    try{
        const response = await fetch("http://localhost:5000/address",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
		
        const addrss = await response.json();
        document.querySelector("#inputAddress").value  = addrss[0];
    }
    catch(err){
        console.log(err);
    }
}

async function getQuote(gallons, date, test)
{
    // var quote_data = document.querySelector('#quote');
    // quote_data.innerHTML="<b>Suggested Price: $###<br/>  Total Amount Due: $###<br/>"
    if(!test)
    {
        /* istanbul ignore next */
        var state = document.querySelector("#suggested").state;
        /* istanbul ignore next */
        var hist = document.querySelector("#suggested").hasHistory;
    }
	
    if(!test)
    {
        /* istanbul ignore next */
        var gallons = document.querySelector("#gallons").value;
        /* istanbul ignore next */
        var date = document.querySelector("#end_date").value;
    }

    if(gallons.length <= 0)
    {
        alert("Please enter gallon amount");
        return false;
    }
    else if(parseFloat(gallons) <= 0){
        alert("Invalid gallon amount");
        return false;
    }

    if(date.length <= 0)
    {
        alert("Please enter Date")
        return false;
    }
    //already tested in the seperate unit test
    /* istanbul ignore next */
    if(!checkIfgreaterOrEqual(date))
    {
        alert("Date cannot be in the past");
        return false;
    }
    
    // Using pricing module to calculate suggested and total prices
    /* istanbul ignore next */
    if(!test)
    {
        var suggestedPrice = await getSuggestedPrice(state, hist, gallons)
        var totalAmount = await getTotalAmount(suggestedPrice, gallons)
        // console.log(state + " " + hist)
        document.querySelector("#suggested").rawvalue  = suggestedPrice
        document.querySelector("#suggested").value  = '$' + suggestedPrice
        document.querySelector("#total").rawvalue = totalAmount
        document.querySelector("#total").value = '$' + totalAmount.toFixed(2)
    }

    return true;
}
module.exports.getQuote = getQuote;

//validate the date entered by the user is not in the past
function checkIfgreaterOrEqual(date)
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    today = yyyy+'-'+mm+'-'+dd;
    if(date < today)
    {
        return false;
    }
    return true;
}
module.exports.checkIfgreaterOrEqual = checkIfgreaterOrEqual;

/* istanbul ignore next */
async function getUsername(){
	try{
		const response = await fetch("http://localhost:5000/username",
		{
			method: "POST",
			headers: { "Content-Type": "application/json" }
		});
		
		const username = await response.json();
		document.querySelector("#usernamelabel").innerText = "Hello " + username;
	}
	catch(err){
		console.log(err);
	}
}

/* istanbul ignore next */
async function submitQuote(){
	try{
		var gallons = document.querySelector("#gallons").value;
		var date = document.querySelector("#end_date").value;
		var state = document.querySelector("#suggested").state;
		var suggestedPrice = document.querySelector("#suggested").rawvalue;
		var totalPrice = document.querySelector("#total").rawvalue;
		
		if(suggestedPrice == undefined || totalPrice == undefined){
			alert("You must calculate a quote before submitting");
			return false;
		}
		
		const body = { gallons : gallons, date : date, state : state, suggestedPrice : suggestedPrice, totalAmount : totalPrice };
		const response = await fetch("http://localhost:5000/submitQuote",
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body)
		} ); 
		
		const creds = await response.json();
		
		console.log(creds);

		if (creds[0] == false)
		{
			alert("Please login before requesting a quote.");
			location.href = "index.html"
			return false;
		}

        else if (creds[0] == true && creds[1] == false)
        {
            alert("Please complete your user profile before sumbiting a quote.");
            location.href = "regProfile.html";
            return false;
        }

		else 
		{
			alert("Thank you for using our app. Your quote has been submitted.");
            location.href = "getQuote.html"
		}
	}
	catch(err){
		console.log(err);
	}
}
module.exports.submitQuote = submitQuote;

//pricing module
async function getSuggestedPrice(state, quoteHistory, gallons)
{
	let currPrice	 = 1.5;
    let locFactor    = 0.0;
    let rhFactor     = 0.0;
    let galFactor    = 0.0;
    let margin       = 0.0;
    const compFactor = 0.1;

    // CHECK LOCATION FACTOR
    if(state === 'TX')
    {
        locFactor = 0.02;
    } 
    else 
    {
        locFactor = 0.04;
    }

    // CHECK QUOTE HISTORY
    if(quoteHistory) 
    {
        rhFactor = 0.01;
    } 
    else 
    {
        rhFactor = 0.0;
    }

    // CHECK GALLON AMOUNT
    if(gallons > 1000) 
    {
        galFactor = 0.02;
    } 
    else 
    {
        galFactor = 0.03;
    }

    // MARGIN OF PRICE
    margin = currPrice * (locFactor - rhFactor + galFactor + compFactor);
    
    // SUGGESTED PRICE
    return (currPrice + margin)
} 
module.exports.getSuggestedPrice = getSuggestedPrice;

async function getTotalAmount(suggestedPrice, gallons)
{
    return parseFloat(suggestedPrice * gallons);
}
module.exports.getTotalAmount = getTotalAmount;