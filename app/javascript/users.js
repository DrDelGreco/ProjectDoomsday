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
        submitBtn.val("processing").prop('disabled', true);
        
        //Collect credit card fields
        var ccNum = $('#card_number').val(),
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();

        //Use stripe js library to check for card erros
        var error = false;

        //Validate card number
        if(!Stripe.card.validateCardNumber(ccNum)) {
            error = true;
            alert('The credit card number appears to be invalid');
        }

        //Validate cvc number
        if(!Stripe.card.validateCVC(cvcNum)) {
            error = true;
            alert('The cvc number appears to be invalid');
        }

        //Validate expiration date
        if(!Stripe.card.validateExpiry(expMonth, expYear)) {
            error = true;
            alert('The expiration date appears to be invalid');
        }
        if (error) {
            // if there are card erros don't send to stripe
            submitBtn.prop('disabled', false).val("Sign Up");
        } else {
            //Send card info to stripe
            Stripe.createToken({
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear        
            }, stripeResponseHandler);
        }
        
        return false;
    });
    
    function stripeResponseHandler(status, response) {
        //stripe sends back card token and we store in a var
        var token = response.id;
        // we will inject that token as a hidden field to the form
        theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
        //submit form to rails app
        theForm.get(0).submit();
    }    
});