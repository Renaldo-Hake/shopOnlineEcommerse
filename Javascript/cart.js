/* ===========================================================================================================
----------------------------------------  Add to cart  -------------------------------------------------------
============================================================================================================*/
// Cart set to an empty array. Every item the user adds to the cart will be stored in this array.
let cart = [];

// Create variable for vat as to be able to update it easily if it changes.
let vat = 0.15;

// Here we set total to 0, as the user adds products to the cart we will alert the total price to the user.
let total = JSON.parse(localStorage.getItem("total"));

// Constructor function to capture all the details of the product
function Product(name, price){
   this.name = name;
   this.price = price;
}

// Listen for a click event on the addButton and add the value of the product to the cart.
function addToCart(){
   cart = JSON.parse(localStorage.getItem("userCart"));
   total = JSON.parse(localStorage.getItem("total"));

   // get the product details and create a new object.
   let product = new Product(
      document.getElementById("product").textContent,
      document.getElementById("price").textContent,
   )
    // adding the product to the cart
   cart.push(product);
   localStorage.setItem("userCart", JSON.stringify(cart));

   // adjusting the total and displaying it to the user
   // total with vat
   total  = total + parseInt(document.getElementById("price").textContent) (parseInt(document.getElementById("price").textContent) * vat); // get total and add the new product price.
   localStorage.setItem("total", JSON.stringify(total)); // store the new total
   alert(`Your total is: R${total} incl. vat`); // display to the user the new total
}

/* ===========================================================================================================
----------------------------------------  Quick add to Cart   ------------------------------------------------
============================================================================================================*/

function quickAdd(product, value){
   cart = JSON.parse(localStorage.getItem("userCart"));
   total = JSON.parse(localStorage.getItem("total"));

   let quickProduct = new Product(
      product,
      value,
   );
   
   // add quick product to the list
   cart.push(quickProduct);
   localStorage.setItem("userCart", JSON.stringify(cart));

   // adjusting the total and displaying it to the user
   console.log(total);
   total = total + parseInt(value) + (parseInt(value) * vat); // get total and add the new product price.
   localStorage.setItem("total", JSON.stringify(total)); // store the new total
   alert(`Your total is: R${total} incl. vat`); // display to the user the new total.
}

/* ===========================================================================================================
----------------------------------------  Cart Page   --------------------------------------------------------
============================================================================================================*/

/* To display the items the user added to the cart on the cart page we will loop through the cart and get all 
the cart items, we will then create a ul for each product and inside the ul we will create li for all the 
product details */

function displayItems(){
   let cartList = document.getElementById("cartList"); // Display all items here.

   let cart = JSON.parse(localStorage.getItem("userCart"));
   cart.forEach(item => {
      let ul = document.createElement("ul"); // ul to place all li's in

      // Create 3 li elements and place all 3 inside a ul
      let productName = document.createElement("li");
      productName.innerHTML = item.name;

      let productPrice = document.createElement("li");
      productPrice.innerHTML = item.price;

      let deleteButton = document.createElement("button");
      deleteButton.innerHTML = "X";

      // append all 3 li's in the correct order
      ul.appendChild(productName);
      ul.appendChild(productPrice);
      ul.appendChild(deleteButton);

      // append the new ul to the cartList 
      cartList.appendChild(ul);
   });

   total = JSON.parse(localStorage.getItem("total")); // get the total of added items
   // Remove item from the list
    // BUTTONS EDIT AND DELETE
    let editButton = document.createElement("button");
    editButton.innerHTML = "edit";
    let deleteButton = document.createElement("button"); // button to be used to delete a track.
    deleteButton.innerHTML = "X"; // Display inside the button to look like a delete button


    // listen for a click on the delete button
    deleteButton.addEventListener("click", function(){
        // Splice to delete the correct track
        total.splice(ul, 1);
        localStorage.setItem("total", JSON.stringify(total)); // update the array
        location.reload(); // auto reload page to display updated tracks
    });
     // Display the total at the bottom of the list
   document.getElementById("Total").innerHTML = total;

   document.getElementById("Clear").addEventListener("click", function(){
      clear(); // call the function
      location.reload(); // reload the page as updated total and empty cart will only reflect on relaod;
   }); 
}

/* ===========================================================================================================
----------------------------------------  Clear Cart   -------------------------------------------------------
============================================================================================================*/

// clear all products from the cart
function clear(){
   // get teh length of the cart and pop of each item until all is gone.
   while(cart.length > 0) {
      cart.pop();
   }
   // once all items has been popped off we will update the cart to be empty.
   localStorage.setItem("userCart", JSON.stringify(cart));

   // We also have to update the new total, as there are no items we will just minus the total from itself.
   total = 0;
   localStorage.setItem("total", JSON.stringify(total));
   alert("Your cart is now empty");

}