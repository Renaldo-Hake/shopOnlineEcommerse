/* ===========================================================================================================
-----------------------------------------  Coupon   ----------------------------------------------------------
============================================================================================================*/

/* The intention of this coupon is to allow a user to get a 5% discount off their total price. This is only
to show that a coupon that is created is working */

/* First we need to get the total price of all the products. Because this page loads both cart and coupon files 
we have access to all global variables declared in cart as coupon loads after cart */
let promoCode = [];
const addCode = (event)=>{
    event.preventDefault();  //to stop the form submitting
    let code = {
        uniqueCode: document.getElementById("Cname").value
    }
    promoCode.push(code);

    //for display purposes only
    console.log('added' , promoCode );
    let pre = document.querySelector('#promoCode');
    pre.textContent = JSON.stringify(promoCode);

    // making the promo code visible so the user can copy it.
    promoCode.forEach(element => {
        let displayHere = document.getElementById("promoCode");
        displayHere.innerHTML = element.uniqueCode;
    });

    //saving to localStorage
    localStorage.setItem('codeList', JSON.stringify(promoCode) );

    // After the user completed the form we need to remove the form so they can only get the promo 1 time.
    document.getElementById("myForm").style.display = "none";
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('getPromo').addEventListener('click', addCode);
});

