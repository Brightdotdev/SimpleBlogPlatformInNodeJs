
const CreateUserValidationSchema = {
   
    fullname : {
        in : ["body"],
        trim : true,
        isString : true,
        notEmpty : {
            errorMessage : "Full name cannot be empty boss"
        },
        isLength : {
            options : {min : 3},
            errorMessage : "There's no way your fullname's that short"}},

    username : {
        in : ["body"],
        trim : true,
        isString : true,
        toLowerCase : true,
        notEmpty : {
            errorMessage : "Full name cannot be empty boss"
        },
        isLength : {
            options : {min : 3},
            errorMessage : "There's no way your username's that short"}},
          
     userImage :{
        in : ["body"],
        trim : true,
            } ,
  email : {
        in : ["body"],
        trim : true,
        toLowerCase : true,
        isEmail : { bail: true,
        errorMessage : "Please Enter a valid email adress"
        },
        notEmpty : {
            errorMessage : "Email cannot be empty boss"}},

    password : {
        in : ["body"],
        trim : true,
        toLowerCase : true,
        isString : true,
        matches : {
            options : [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/],
            errorMessage : "Password must be 8 characters long have an upppercase a lowecase and a special character"}},

    bloggingStyle : {
        in : ["body"],
       isIn : {
         options : [["writer", "reader", "both"]],
        errorMessage : "You must be either a writer blogger or reader"
       },
       notEmpty :{
        errorMessage : "You must be either a writer blogger or reader bruh"}}}

        
const LogInValidationSchema = {
 
    email : {
        in : ["body"],
        trim : true,
        toLowerCase : true,
        isEmail : { bail: true,
        errorMessage : "Please Enter a valid email adress"
        },
        notEmpty : {
            errorMessage : "Email cannot be empty boss"}},

    password : {
        in : ["body"],
        notEmpty : {
            errorMessage : "Email cannot be empty boss"},
        trim : true,
        toLowerCase : true,
        isString : true,
    }}


        const PassportJsValidationSchema = {  
        
            id : {
                in : ["body"],
                trim : true,
                isString : true,
                notEmpty : {
                    errorMessage : "we need the id"
                }},    
            password : {
                in : ["body"],
                trim : true,
                isString : true,
                matches : {
                    options : [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/],
                    errorMessage : "Password must be 8 characters long have an upppercase a lowecase and a special character"}},
        
            bloggingStyle : {
                in : ["body"],
               isIn : {
                 options : [["writer", "reader", "both"]],
                errorMessage : "You must be either a writer blogger or reader"
               },
               notEmpty :{
                errorMessage : "You must be either a writer blogger or reader bruh"}},

                email : {
                    in : ["body"],
                    trim : true,
                    toLowerCase : true,
                    isEmail : { bail: true,
                    errorMessage : "Please Enter a valid email adress"
                    },
                    notEmpty : {
                        errorMessage : "Email cannot be empty boss"}},
            
       
           /*  socialLinks :{
                in : ["body"],
                exists : {
                    errorMessage : "the users social links is in an onbject formart"}},
            "socialLinks.linkedIn" : {
                custom : {
                    options : (value) =>  /^(https?:\/\/)?(www\.)?linkedin\.com\/[A-Za-z0-9-._~%&?=+#]*$/.test(value),
                    errorMessage : "That's not a valid linked in link"}},
            
            "socialLinks.instagram" : {
                custom : {
                    options : (value) =>  /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9-._~%&?=+#]*$/.test(value),
                    errorMessage : "That's not a valid instagram link"}},
            
            "socialLinks.facebook" : {
                custom : {
                    options : (value) =>  /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9-._~%&?=+#]*$/.test(value),
                    errorMessage : "That's not a valid facebook link"}} */}
        
    module.exports = { CreateUserValidationSchema,PassportJsValidationSchema,LogInValidationSchema }