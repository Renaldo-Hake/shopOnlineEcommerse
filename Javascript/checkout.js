function load(){

    document.getElementById("")
    // Display the total at the top of the page.
    // After the user clicks confirm and pay the cart will be empty but the total will still display. This is to show total with any delivery fees included.
    document.getElementById("checkoutTotal").innerHTML = `Total: R${total}`;

    generateRef(); // calling the function that generates a ref number.
}

/* ===========================================================================================================
------------------------------------------  Promo Code   -----------------------------------------------------
============================================================================================================*/

const ReducePrice = (event)=>{
    event.preventDefault();  //to stop the form submitting

    // We need to get the code, to do so we loop though the array and store the code into a var for later reference
    promoCode = JSON.parse(localStorage.getItem("codeList"));
    promoCode.forEach(element => {
        promoCode = element.uniqueCode;
    });

    
    let userCode = document.getElementById("userCode").value; // get the code the user entered

    // see if the stored promo code and the code the user entered matches, if so we will reduce the price.
    if(userCode === promoCode){
        let discount = 0.05; // discount percent
        total = (total - (total * discount)); // apply discount
        localStorage.setItem("total", JSON.stringify((Math.round(total * 100) / 100).toFixed(2))); // store new total.
        
        // Once the code has been entered we need to prevent the user from entering it again, to do so we remove the code from the list.
        localStorage.removeItem("codeList");
    }


}

// Once page loads we will see if the user clicks the redeem button for the promo
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('redeem').addEventListener('click', ReducePrice);
});


/* ===========================================================================================================
------------------------------------  Collection or Delivery   -----------------------------------------------
============================================================================================================*/

function getSelectValue(){

    // get the values of both select tags for delivery and collection 
    let deliverValue = document.getElementById("Delivery").value;
    let collectValue = document.getElementById("Collection").value;

    // Avoid both select tags being active at the same time
    if(collectValue === "choose" && deliverValue === "900"){
        let amount = 900;
        amount = JSON.parse(localStorage.getItem("option"));
        localStorage.setItem("option", JSON.stringify(amount));
    }
    else if(collectValue === "choose" && deliverValue === "250"){
        let amount = 250;
        amount = JSON.parse(localStorage.getItem("option"));
        localStorage.setItem("option", JSON.stringify(amount));
    }
    else if(collectValue === "branch" && deliverValue === "choose"){
        let amount = 0;
        amount = JSON.parse(localStorage.getItem("option"));
        localStorage.setItem("option", JSON.stringify(amount));
    }

    /* If the user selected any branch and thereafter selects any delivery option the 
    collection option will revert back to the default. to change this the user is forced to 
    place delivery on choose and then select a collection branch */
    else if (collectValue === "branch" && deliverValue != "choose"){
        document.getElementById("defaultCollection").selected = true;
    }

}

 /* ===========================================================================================================
    -----------------------------------------  Confirm order   ---------------------------------------------------
    ============================================================================================================*/
    // Before the reference is displayed we will see whether the user selected collection or delivery and adjust the total accordingly.
    // Once the user confirms the order, there will be a reference number that will be displayed to the user
    function generateRef(){

        let confirm = document.getElementById("confirm"); // getting the button in html confirm and pay
        
        // see if the user is clicks the confirm and pay button
        confirm.addEventListener("click", function(){
            // when the user clicks we need to be sure that there are items in the cart.
            // we will do this by checking to see if the total is more than 0.
            if(total > 0){
                // result will be the random ref number generated to the user
                let result = '';
                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // chars used for ref
                let charactersLength = characters.length; // get the length of all the chars
                // we want a ref of 8 chars long so we loop 8 times through the chars.
                for ( let i = 0; i < 8; i++ ) {
                    // add a random char at each iteration.
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }

                alert(`Your order Ref:  ${result}`);
                let selectedOption = JSON.parse(localStorage.getItem("option"));
                total = JSON.parse(localStorage.getItem("total"));
                total = parseInt(selectedOption) + parseInt(total);
                localStorage.setItem("total", JSON.stringify((Math.round(total * 100) / 100).toFixed(2)));
                clear();        

            }
            else {
                alert(`Please add items to your cart`);
            }
        })
    }