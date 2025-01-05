const CreateUserValidationSchema = {
   
    fullname : {
        in : ["body"],
        trim : true,
        isString : true,
        toLowerCase : true,
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
            errorMessage : "There's no way your fullname's that short"}},
          
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
         options : [["writer", "Reader", "Both"]],
        errorMessage : "You must be either a writer blogger or reader"
       },
       notEmpty :{
        errorMessage : "You must be either a writer blogger or reader bruh"}}}




    module.exports = { CreateUserValidationSchema }