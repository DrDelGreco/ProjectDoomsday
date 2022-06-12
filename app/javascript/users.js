/* global $, Stripe */
// Document ready
$(document).on('turbolinks:load', function(){
    
    var theForm = $('#pro_form');
    var submitBtn = $('#form-submit-btn');
    
    //Set Stripe Public Key
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
    
    //When user clicks submit prevent default submission behavior
    submitBtn.click(function(event){
        event.preventDefault();
        
        //Collect credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();

        //Send card info to stripe
        Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear        
        }, stripeResponseHandler);


    });
    
   

    //stripe sends back card token and we will inject that token as a hidden field to the form

    //submit form to rails app
});