class MenuItem 
{
	constructor(name, price, description, amount)
	{
		this.name = name;
		this.price = price;
		this.description = description;
		this.amount = amount;
	}
	
	getName()
	{
		return this.name;
	}
	
	getPrice()
	{
		return this.price;
	}
	
	getDescription()
	{
		return this.description;
	}
	
	getAmount()
	{
		return this.amount;
	}

	setAmount(amount)
	{
		this.amount = amount;
	}
}

class Menu 
{
	constructor()
	{
		this.menuItems = 
		[
			new MenuItem("Pepperoni Pizza", 9.99, "Fresh pepperoni pizza with cheese.", 0),
			new MenuItem("Cheeseburger", 5.45, "Quarter pound cheeseburger with lettuce, tomatoes, and bacon.", 0),
			new MenuItem("Hot Dog", 3.75, "Two hot dogs topped with chili and cheese.", 0),
			new MenuItem("Tomato Soup", 2.97, "Hot tomato soup.", 0),
			new MenuItem("Steak", 13.55, "Grilled sirloin steak.", 0),
			new MenuItem("Pumpkin Pie", 2.85, "Pumpkin pie fresh from the oven.", 0)
		]
	}

	updateMenu()
	{
		document.getElementById("pizza").innerHTML = "<span class=boldText>" + this.menuItems[0].getName() + "</span>" + "<br>Price: $" + this.menuItems[0].getPrice() + "<br>" + this.menuItems[0].getDescription();
		document.getElementById("pizzaAmount").innerHTML = "Amount: " + this.menuItems[0].getAmount();
		document.getElementById("burger").innerHTML = "<span class=boldText>" + this.menuItems[1].getName() + "</span>" + "<br>Price: $" + this.menuItems[1].getPrice() + "<br>" + this.menuItems[1].getDescription();
		document.getElementById("burgerAmount").innerHTML = "Amount: " + this.menuItems[1].getAmount();
		document.getElementById("hotDog").innerHTML = "<span class=boldText>" + this.menuItems[2].getName() + "</span>" + "<br>Price: $" + this.menuItems[2].getPrice() + "<br>" + this.menuItems[2].getDescription();
		document.getElementById("hotDogAmount").innerHTML = "Amount: " + this.menuItems[2].getAmount();
		document.getElementById("soup").innerHTML = "<span class=boldText>" + this.menuItems[3].getName() + "</span>" + "<br>Price: $" + this.menuItems[3].getPrice() + "<br>" + this.menuItems[3].getDescription();
		document.getElementById("soupAmount").innerHTML = "Amount: " + this.menuItems[3].getAmount();
		document.getElementById("steak").innerHTML = "<span class=boldText>" + this.menuItems[4].getName() + "</span>" + "<br>Price: $" + this.menuItems[4].getPrice() + "<br>" + this.menuItems[4].getDescription();
		document.getElementById("steakAmount").innerHTML = "Amount: " + this.menuItems[4].getAmount();
		document.getElementById("pie").innerHTML = "<span class=boldText>" + this.menuItems[5].getName() + "</span>" + "<br>Price: $" + this.menuItems[5].getPrice() + "<br>" + this.menuItems[5].getDescription();
		document.getElementById("pieAmount").innerHTML = "Amount: " + this.menuItems[5].getAmount();
		document.getElementById("orderTotal").innerHTML = "<span class='boldText'>Subtotal:</span> $" + order.getSubtotal().toFixed(2);
	}
}

class Order
{
	constructor()
	{
		this.orderItems = []; //Object with key value pairs, keys are items and values are quantities
		this.subtotal = 0;
		this.delivery = true;
		this.taxRate = 0.06875; //6.875% tax rate
		this.deliveryCost = 4.00; //$4.00 delivery fee
		this.total = 0;
	}

	addItem(item)
	{
		//Adding item to order
		if (this.orderItems.includes(item)) //Item is already present, need to increment item quantity
		{
			var itemIndex = this.orderItems.indexOf(item);
			this.orderItems[itemIndex].quantity += 1;
		}
		else //Item is not already present, need to add it and intialize quantity property to 1
		{
			this.orderItems.push(item);
			var itemIndex = this.orderItems.indexOf(item);
			this.orderItems[itemIndex].quantity = 1;
		}

		//Updating subtotal
		this.subtotal += item.getPrice();
		item.setAmount(item.getAmount() + 1);
		menu.updateMenu();
	}

	removeItem(item)
	{
		if (item.getAmount() > 0) //There is at least one item of this type to remove
		{
			//Removing item from order
			if (this.orderItems.includes(item)) //Item is present, need to decrement item quantity and remove item if quantity becomes 0
			{
				var itemIndex = this.orderItems.indexOf(item);

				if (this.orderItems[itemIndex].quantity > 1)
				{
					this.orderItems[itemIndex].quantity -= 1;
				}
				else
				{
					this.orderItems.splice(itemIndex, 1); //Remove item from inventory
				}
			}

			this.subtotal -= item.getPrice();
			item.setAmount(item.getAmount() - 1);
		}
		menu.updateMenu();
	}

	getSubtotal()
	{
		return this.subtotal;
	}

	selectOrderType()
	{
		if (document.getElementById("select").selectedIndex == "1")
		{
			this.delivery = false;
		}
		else
		{
			this.delivery = true;
		}
	}

	checkout()
	{
		window.scrollTo(0,0); //Set scroll to top of the screen

		if (customerLogin.getCustomer() != null) //Need to be logged in to checkout
		{
			if (this.orderItems.length > 0) //There is at least 1 item being ordered
			{
				menuContainer.style.display = "none"; //Hide menu
				checkoutContainer.style.display = "block"; //Display checkout
	
				//Print the order
				var orderDisplay = document.getElementById("orderDisplay");
				while (orderDisplay.childElementCount > 1) //Emptying order display first in case the customer was editing the order (not removing the table header though)
				{
					orderDisplay.removeChild(orderDisplay.lastChild);
				}
				for (var i = 0; i < this.orderItems.length; i++)
				{
					var item = document.createElement('tr');
					item.innerHTML = '<tr><td>' + this.orderItems[i].getName() + '</td><td>' + this.orderItems[i].quantity + '</td><td>$' + (this.orderItems[i].getPrice() * this.orderItems[i].quantity) + '</td></tr>';
					orderDisplay.appendChild(item);
				}
	
				//Display customer information
				var customerNameDisplay = document.getElementById("customerNameDisplay");
				var customerAddressDisplay = document.getElementById("customerAddressDisplay");
				var customerCreditCardDisplay = document.getElementById("customerCreditCardDisplay");
				var customer = customerLogin.getCustomer();
	
				//Star out credit card number for confidentiality Ex: ************1283
				var creditCardNumber = customer.getCreditCard();
				var creditCardString = creditCardNumber.toString();
				var creditCardDisplay = ""; //Will hold a starred out version of the credit card number
				for (var i = 0; i < creditCardString.length; i++)
				{
					if (i > creditCardString.length - 5) //Replace all but the last 4 numbers with asterisks
					{
						creditCardDisplay += creditCardString[i];
					}
					else 
					{
						creditCardDisplay += '*';
					}
				}
	
				customerNameDisplay.innerHTML = '<td>' + customer.getFirstName() + ' ' + customer.getLastName() + '</td>';
				if (this.delivery)
				{
					customerAddressDisplay.innerHTML = '<td>Delivery Address:</td><td>' + customer.getAddress() + '</td>';
				}
				else
				{
					customerAddressDisplay.innerHTML = '';
				}
				customerCreditCardDisplay.innerHTML = '<td>Credit Card Number:</td><td>' + creditCardDisplay + '</td>';
	
				//Display transaction totals and fees
				var subtotalDisplay = document.getElementById("subtotal");
				var orderTypeDisplay = document.getElementById("orderType");
				var taxDisplay = document.getElementById("tax");
				var totalDisplay = document.getElementById("total");
	
				subtotalDisplay.innerHTML = '<td>Subtotal:</td><td>$' + this.subtotal.toFixed(2) + '</td>';
				if (this.delivery) //Displaying correct order type
				{
					orderTypeDisplay.innerHTML = '<td>Delivery:</td><td>$' + this.deliveryCost.toFixed(2) + '</td>';
					this.subtotal += this.deliveryCost;
				}
				else
				{
					orderTypeDisplay.innerHTML = '<td>Pickup:</td><td>$0.00</td>';
				}
				taxDisplay.innerHTML = '<td>Tax:</td><td>$' + (this.taxRate * this.subtotal).toFixed(2) + '</td>'; //toFixed() shows only 2 decimal places
				this.total = (this.subtotal + (this.taxRate * this.subtotal)).toFixed(2);
				totalDisplay.innerHTML = '<td class="boldText">Total:</td><td class="boldText">$' + this.total + '</td>';
			}
			else
			{
				alert("You need to select an item to order before you can checkout!");
			}
		}
		else
		{
			//Display login
			loginContainer.style.display = "block";
			menuContainer.style.display = "none";
			alert("You need to login in before you can checkout!");
		}
		
	}

	editOrder()
	{
		//Display menu again
		if (this.delivery)
		{
			this.subtotal -= this.deliveryCost;
		}
		menuContainer.style.display = "block";
		checkoutContainer.style.display = "none";
		window.scrollTo(0,0); //Set scroll to top of the screen
	}

	placeOrder()
	{
		this.chargeCustomer();
		location.reload();
		window.scrollTo(0,0); //Set scroll to top of the screen
	}

	chargeCustomer()
	{
		var cardNumber = customerLogin.getCustomer().getCreditCard();
		alert("Charging customer account using Charge.com services... \nThank you for ordering with us!");
	}
}

class CustomerAccount 
{
	constructor(emailAddress, password, address, creditCard, firstName, lastName)
	{
		this.emailAddress = emailAddress;
		this.password = password;
		this.address = address;
		this.creditCard = creditCard;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	getEmailAddress()
	{
		return this.emailAddress;
	}

	setEmailAddress(emailAddress)
	{
		this.emailAddress = emailAddress;
	}

	getPassword()
	{
		return this.password;
	}

	setPassword(password)
	{
		this.password = password;
	}

	getAddress()
	{
		return this.address;
	}

	setAddress(address)
	{
		this.address = address;
	}

	getCreditCard()
	{
		return this.creditCard;
	}

	setCreditCard(creditCard)
	{
		this.creditCard = creditCard;
	}

	getFirstName()
	{
		return this.firstName;
	}

	setFirstName(firstName)
	{
		this.firstName = firstName;
	}

	getLastName()
	{
		return this.lastName;
	}

	setLastName(lastName)
	{
		this.lastName = lastName;
	}
}

class CustomerLogin
{
    constructor()
    {
		this.customer = null;

		//Stand in for actual database
		this.accountDatabase = 
		[
			new CustomerAccount('marty@mailinator.com', 'pswd', '120 4th St., St. Cloud, MN 56301', 1253563467239871, 'Marty', 'Fitzer'),
			new CustomerAccount('sam@mailinator.com', 'password', '824 Main Ave., St. Cloud, MN 56301', 6453819200945918, 'Sam', 'Ondieki'),
			new CustomerAccount('gavin@mailinator.com', 'scsu', '542 Apple Lane, St. Cloud, MN 56301', 1965917153244617, 'Gavin', 'Dutcher'),
			new CustomerAccount('cody@mailinator.com', 'huskies', '019 1 St., St. Cloud, MN 56301', 1300772090241003, 'Cody', 'Asfeld')
		]
	}
	
	getCustomer()
	{
		return this.customer;
	}

	setCustomer(accountIndex)
	{
		this.customer = this.accountDatabase[accountIndex];
	}

	getAccountCount()
	{
		return this.accountDatabase.length;
	}

	validate()
	{
        var email = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		
		//Checking if account exists
		for (var i = 0; i < this.accountDatabase.length; i++)
		{
			//Valid credentials
			if (this.accountDatabase[i].getEmailAddress() == email && this.accountDatabase[i].getPassword() == password)
			{
				this.customer = this.accountDatabase[i];
				urlParams.append("act", i.toString());
				document.location.href = "index.html?" + urlParams;
				alert("Login Successful");
				loginContainer.style.display = "none";
				menuContainer.style.display = "block";
				checkoutContainer.style.display = "none";
			}
		}

		//Invalid credentials
        if (this.customer == null)
        {
            alert("Invalid Details");
            document.getElementById("password").value = "";
        }
	}
	
	viewSignUp()
	{
		document.getElementById("panelTitle").innerHTML = "Sign Up";
		document.getElementById("signUpBtn").style.display = "block";
		document.getElementById("saveBtn").style.display = "none";
		loginContainer.style.display = "none";
		signUpContainer.style.display = "block";
		menuContainer.style.display = "none";
		checkoutContainer.style.display = "none";
	}

	createAccount()
	{
		//Get data
		var email = document.getElementById("signUpEmail").value;
		var password = document.getElementById("signUpPassword").value;
		var address = document.getElementById("signUpAddress").value;
		var creditCard = document.getElementById("signUpCreditCard").value;
		var firstName = document.getElementById("signUpFirstName").value;
		var lastName = document.getElementById("signUpLastName").value;

		//Input fields titles
		var emailTitle = document.getElementById("emailTitle");
		var passwordTitle = document.getElementById("passwordTitle");
		var creditCardTitle = document.getElementById("creditCardTitle");
		var firstNameTitle = document.getElementById("firstNameTitle");
		var lastNameTitle = document.getElementById("lastNameTitle");

		//Checking if required fields have been filled
		var requirementsMet = true;
		if (email.length < 3)
		{
			emailTitle.style.color = "red";
			requirementsMet = false;
		}
		if (password.length < 1)
		{
			passwordTitle.style.color = "red";
			requirementsMet = false;
		}
		if (creditCard.length < 16)
		{
			creditCardTitle.style.color = "red";
			requirementsMet = false;
		}
		if (firstName.length < 1)
		{
			firstNameTitle.style.color = "red";
			requirementsMet = false;
		}
		if (lastName.length < 1)
		{
			lastNameTitle.style.color = "red";
			requirementsMet = false;
		}
		
		if (requirementsMet) //All required fields are filled out
		{
			var newAccount = new CustomerAccount(email, password, address, creditCard, firstName, lastName);
			this.accountDatabase.push(newAccount);
	
			loginContainer.style.display = "block";
			signUpContainer.style.display = "none";
			menuContainer.style.display = "none";
			checkoutContainer.style.display = "none";
		}
		else
		{
			alert("Please fill out valid information in the required fields!");
		}
	}

	viewEditAccount()
	{
		if (customerLogin.getCustomer() != null) //Logged in
		{
			document.getElementById("panelTitle").innerHTML = "Edit Account";
			document.getElementById("signUpBtn").style.display = "none";
			document.getElementById("saveBtn").style.display = "block";
			loginContainer.style.display = "none";
			signUpContainer.style.display = "block";
			menuContainer.style.display = "none";
			checkoutContainer.style.display = "none";

			//Get data
			var email = document.getElementById("signUpEmail");
			var password = document.getElementById("signUpPassword");
			var address = document.getElementById("signUpAddress");
			var creditCard = document.getElementById("signUpCreditCard");
			var firstName = document.getElementById("signUpFirstName");
			var lastName = document.getElementById("signUpLastName");
			var customer = customerLogin.getCustomer();

			//Populate fields with current customer account data
			email.value = customer.getEmailAddress();
			password.value = customer.getPassword();
			address.value = customer.getAddress();
			creditCard.value = customer.getCreditCard();
			firstName.value = customer.getFirstName();
			lastName.value = customer.getLastName();
		}
		else
		{
			loginContainer.style.display = "block";
			signUpContainer.style.display = "none";
			menuContainer.style.display = "none";
			checkoutContainer.style.display = "none";
		}
	}

	editAccount()
	{
		//Get data
		var email = document.getElementById("signUpEmail").value;
		var password = document.getElementById("signUpPassword").value;
		var address = document.getElementById("signUpAddress").value;
		var creditCard = document.getElementById("signUpCreditCard").value;
		var firstName = document.getElementById("signUpFirstName").value;
		var lastName = document.getElementById("signUpLastName").value;

		//Input fields titles
		var emailTitle = document.getElementById("emailTitle");
		var passwordTitle = document.getElementById("passwordTitle");
		var creditCardTitle = document.getElementById("creditCardTitle");
		var firstNameTitle = document.getElementById("firstNameTitle");
		var lastNameTitle = document.getElementById("lastNameTitle");

		//Checking if required fields have been filled
		var requirementsMet = true;
		if (email.length < 3)
		{
			emailTitle.style.color = "red";
			requirementsMet = false;
		}
		if (password.length < 1)
		{
			passwordTitle.style.color = "red";
			requirementsMet = false;
		}
		if (creditCard.length < 16)
		{
			creditCardTitle.style.color = "red";
			requirementsMet = false;
		}
		if (firstName.length < 1)
		{
			firstNameTitle.style.color = "red";
			requirementsMet = false;
		}
		if (lastName.length < 1)
		{
			lastNameTitle.style.color = "red";
			requirementsMet = false;
		}
		
		if (requirementsMet) //All required fields are filled out
		{
			//Save changes
			this.customer.setEmailAddress(email);
			this.customer.setPassword(password);
			this.customer.setAddress(address);
			this.customer.setCreditCard(creditCard);
			this.customer.setFirstName(firstName);
			this.customer.setLastName(lastName);
	
			loginContainer.style.display = "none";
			signUpContainer.style.display = "none";
			menuContainer.style.display = "block";
			checkoutContainer.style.display = "none";
			window.scrollTo(0,0); //Set scroll to top of the screen

			if (urlParams.has("edit"))
			{
				urlParams.delete("edit"); //Remove edit parameter
				window.history.pushState({}, document.title, "index.html?" + urlParams);
			}			
		}
		else
		{
			alert("Please fill out valid information in the required fields!");
		}
	}
}

var menu = new Menu();
var order = new Order();
var customerLogin = new CustomerLogin();

//Display correct page elements
var loginContainer = document.getElementById("loginContainer");
var signUpContainer = document.getElementById("signUpContainer");
var menuContainer = document.getElementById("menuContainer");
var checkoutContainer = document.getElementById("checkoutContainer");

signUpContainer.style.display = "none";
checkoutContainer.style.display = "none";

//Determine if menu is being accessed
var urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("menu")) //Display menu
{
	loginContainer.style.display = "none";
	menuContainer.style.display = "block";
}
else
{
	loginContainer.style.display = "block";
	menuContainer.style.display = "none";
}

//Checking if customer is already logged in
if (urlParams.has("act"))
{
	var accountIndex = urlParams.get("act");
	if (accountIndex < customerLogin.getAccountCount() && accountIndex >= 0) //Logged in
	{
		customerLogin.setCustomer(accountIndex);

		if (urlParams.has("edit")) //Edit account
		{
			/*if (urlParams.has("menu"))
			{
				urlParams.delete("menu");
				document.location.href = 'index.html?' + urlParams.toString();
			}*/

			customerLogin.viewEditAccount();
		}
		else //Show menu
		{
			loginContainer.style.display = "none";
			menuContainer.style.display = "block";
		}
	}
	else
	{
		urlParams.delete("act");
		document.location.href = "index.html?" + urlParams.toString();
	}
}

window.scrollTo(0,0); //Set scroll to top of the screen on load
menu.updateMenu(); //Display the menu