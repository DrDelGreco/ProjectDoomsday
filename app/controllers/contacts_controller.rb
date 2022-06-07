class ContactsController < ApplicationController
    
    #GET request to custom route
    #Show new contact form
    
    def new
        @contact = Contact.new
    end


    #POST request /contacts
    
    def create
        #Mass assignment of form fields to contact object
        @contact = Contact.new(contact_params)
        #save contact to database
            if @contact.save
                #store form fields via parameters, into variables
                name = params[:contact][:name]
                email = params[:contact][:email]
                body = params[:contact][:comments]
                #PLug variables into contactmailer
                #email method and send email
                ContactMailer.contact_email(name, email, body).deliver
                #store success message in flash hash
                #and redirect to new action
                flash[:success] = "Message sent."
                redirect_to new_contact_path
            else
                #If contact object doesn't save store errors in flash hash
                #and redirect to new action
                flash[:danger] = @contact.errors.full_messages.join(", ")
                redirect_to new_contact_path
            end
    end

    private
        #To collect data from forms we need to use strong paramaters
        #and whitelist the form fields
        def contact_params
            params.require(:contact).permit(:name, :email, :comments)
        end

end