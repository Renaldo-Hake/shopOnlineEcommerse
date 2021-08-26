$(document).ready(function() { 
    // Function that will hide or show the reviews on the index page only. We will use one button for both functions.
    $("#hideShow").click(function(){
        // after the hide button has been clicked we will change the text of the button to display show
        document.getElementById("hideShow").innerHTML = "Show Reviews";
        // we then hide the reviews and use a callback function to perform the show function.
        $("#hide").hide(function(){
            // if the user clicks the show button we will then display the reviews again 
            $("#hideShow").click(function(){
                // The text will then change to hide again 
                document.getElementById("hideShow").innerHTML = "Hide Reviews";
                // display the reviews
                $("#hide").show();
            })
        });
    });


    // Accordion effect menu on click. WHen the user clicks the title the links will be displayed with the accordion effect.
    $(".container-title").click(function(){
        $(this).closest(".container").find(".container-content").slideToggle(400);
        // Once the user clicks the title the links will move back to it's original position.
    });


    // Animation effects
    // rotate all icons 360 deg on load
    $("i").animate(
        { deg: 360 },
        {
          duration: 1500,
          step: function(now) {
            $(this).css({ transform: 'rotate(' + now + 'deg)' });
          }
        }
    );

    // Chained effects
    // all card element will fade out immediately on load and slowly fade back in.
    $(".card").fadeOut().fadeIn(1500);
    
});

