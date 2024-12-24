const {MongoClient} = require('mongodb');
require("dotenv").config()



const uriString = process.env.MONGODB_URI

console.log(uriString)
//requirements
const uri = uriString
const client = new MongoClient(uri);


let dbName = 'blog';
const db = client.db(dbName);
const userCollection = db.collection('users');



//readline for ui in the con, MongoClientsole
const readline = require('readline');
const input = readline.createInterface
(
  {
    input: process.stdin,
    output: process.stdout,
    prompt: 'mongodb> '
  }
)

const getUserInput = (prompt) => new Promise((resolve)  => 
    {
      input.question(prompt, (answer) => 
        {
          resolve(answer);
        });
  }); 
  


// connect to mogngodb
  const connect = async () => 
    {
    try
    {
    await  client.connect();
    console.log("Connected Succesfully");
    }
    catch(error)
    {
        console.log(`${error} caused it not to connect`);
    }
} 



//validating user input

const validName =(name)=>
  {
      return name.trim().length > 2;
  }
const validAge = (age) => 
{
  const num = parseInt(age, 10);
  return !isNaN(num) && num > 0;
}

const validEmail = (email) =>
  {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email)
  }
const validBlog =(blogging) =>
  {
    if(blogging === 'both' || blogging === 'writer' || blogging === 'reader' ) 
      {
        return blogging
      }
  }

//validating data
const emailExists = async (email) =>
  {
    const user = await userCollection.findOne({email});
    return user !== null ;
  }

const correctPassword = async (password, email) =>
  {
    const valid = await userCollection.findOne({email, password});
    return valid !== null; 
  }
  const validPassowrd = async (password) =>
    {
      return password.trim().length > 0;
    }


//CREATING

//creating user

const gettingUser = async (collection) =>
  {
    let username, name, age, email, blogging, password
    try
    {
      while(!validName(username))
        {
          username = await getUserInput('Input your Username: ');
        }
      while(!validName(name))
        {
          name = await getUserInput('Enter your name: ');
          if(!validName(name))
            {
              console.log('Not a name man');
            }
        }
        while(!validAge(age))
          {
            age = await getUserInput('Enter your age: ');
            if(!validAge(age))
              {
                console.log('Not an age man');
              }
          }
          while (!validEmail(email) ||  await  emailExists(email,collection))
            {
              email = await getUserInput('Input email: ');
              if(!validEmail(email))
                {
                  console.log(`not an  email`);
                }
                if(await emailExists(email))
                  {
                    console.log('Email already exists in the database');
                  } 
            }
            while (!validBlog(blogging))
            {
              blogging = await getUserInput('Whats your blogging style(reader,writerr,both): ');
      
                 if(!validBlog(blogging))
                  {
                    console.log('Whats your bogging style')
                  }
            }
            while (!validPassowrd(password))
              {
                password = await getUserInput('Create a password: ')
                if(!validPassowrd(password))
                  {
                    console.log('Your password can be better thann that man');
                  }
              }
           const newUser = {username,name,age: parseInt(age, 10),email,blogging,password,createdAt: Date.now()};
          console.log(newUser);
          console.log('User Accepted');
          await collection.insertOne(newUser);
    }
    catch(error)
    {
      console.log(error);
    }
  }
//insert many
const manyUsers = async  (collection) =>
  {
    const users = 
    [
      {
        "username": "johndoe",
        "email": "johndoe@example.com",
        "password": "johndoe123",
        "createdAt": "2024-06-13T14:35:00Z",
        "name": "John Doe",
        "bio": "Software developer and blogger.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/johndoe" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/johndoe" }
        ],
        "bloggingStyle": "both",
        "settings": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "tracydunlop",
        "email": "tracydunlop@example.com",
        "password": "tracydunlop123",
        "createdAt": "2024-06-13T14:36:00Z",
        "name": "Tracy Dunlop",
        "bio": "Web developer and blogger.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/tracydunlop" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/tracydunlop" }
        ],
        "bloggingStyle": "reader",
        "settings": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "stevenjames",
        "email": "stevenjames@example.com",
        "password": "stevenjames123",
        "createdAt": "2024-06-13T14:37:00Z",
        "name": "Steven James",
        "bio": "Blogger and CEO of Pear",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/stevenjames" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/stevenjames" }
        ],
        "bloggingStyle": "writer",
        "settings": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "emilywhite",
        "email": "emilywhite@example.com",
        "password": "emilywhite123",
        "createdAt": "2024-06-13T14:38:00Z",
        "name": "Emily White",
        "bio": "Digital marketer and avid reader.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/emilywhite" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/emilywhite" }
        ],
        "bloggingStyle": "reader",
        "settings": {
          "theme": "light",
          "notifications": false,
          "language": "en"
        }
      },
      {
        "username": "michaelbrown",
        "email": "michaelbrown@example.com",
        "password": "michaelbrown123",
        "createdAt": "2024-06-13T14:39:00Z",
        "name": "Michael Brown",
        "bio": "Tech enthusiast and blogger.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/michaelbrown" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/michaelbrown" }
        ],
        "bloggingStyle": "both",
        "settings": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "sarahlee",
        "email": "sarahlee@example.com",
        "password": "sarahlee123",
        "createdAt": "2024-06-13T14:40:00Z",
        "name": "Sarah Lee",
        "bio": "Content creator and social media manager.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/sarahlee" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/sarahlee" }
        ],
        "bloggingStyle": "writer",
        "settings": {
          "theme": "light",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "jasonwright",
        "email": "jasonwright@example.com",
        "password": "jasonwright123",
        "createdAt": "2024-06-13T14:41:00Z",
        "name": "Jason Wright",
        "bio": "Software engineer and part-time blogger.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/jasonwright" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/jasonwright" }
        ],
        "bloggingStyle": "both",
        "settings": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "laurensmith",
        "email": "laurensmith@example.com",
        "password": "laurensmith123",
        "createdAt": "2024-06-13T14:42:00Z",
        "name": "Lauren Smith",
        "bio": "Travel blogger and photographer.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/laurensmith" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/laurensmith" }
        ],
        "bloggingStyle": "writer",
        "settings": {
          "theme": "light",
          "notifications": false,
          "language": "en"
        }
      },
      {
        "username": "davidjones",
        "email": "davidjones@example.com",
        "password": "davidjones123",
        "createdAt": "2024-06-13T14:43:00Z",
        "name": "David Jones",
        "bio": "Fitness coach and wellness blogger.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/davidjones" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/davidjones" }
        ],
        "bloggingStyle": "writer",
        "settings": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "chloebrown",
        "email": "chloebrown@example.com",
        "password": "chloebrown123",
        "createdAt": "2024-06-13T14:44:00Z",
        "name": "Chloe Brown",
        "bio": "Lifestyle blogger and influencer.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/chloebrown" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/chloebrown" }
        ],
        "bloggingStyle": "both",
        "settings": {
          "theme": "light",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "oliviascott",
        "email": "oliviascott@example.com",
        "password": "oliviascott123",
        "createdAt": "2024-06-13T14:45:00Z",
        "name": "Olivia Scott",
        "bio": "Food blogger and chef.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/oliviascott" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/oliviascott" }
        ],
        "bloggingStyle": "writer",
        "settings": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "matthewmiller",
        "email": "matthewmiller@example.com",
        "password": "matthewmiller123",
        "createdAt": "2024-06-13T14:46:00Z",
        "name": "Matthew Miller",
        "bio": "Tech blogger and gadget reviewer.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/matthewmiller" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/matthewmiller" }
        ],
        "bloggingStyle": "both",
        "settings": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "lisajohnson",
        "email": "lisajohnson@example.com",
        "password": "lisajohnson123",
        "createdAt": "2024-06-13T14:47:00Z",
        "name": "Lisa Johnson",
        "bio": "DIY blogger and crafter.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/lisajohnson" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/lisajohnson" }
        ],
        "bloggingStyle": "writer",
        "settings": {
          "theme": "light",
          "notifications": false,
          "language": "en"
        }
      },
      {
        "username": "robertwilson",
        "email": "robertwilson@example.com",
        "password": "robertwilson123",
        "createdAt": "2024-06-13T14:48:00Z",
        "name": "Robert Wilson",
        "bio": "Finance blogger and advisor.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/robertwilson" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/robertwilson" }
        ],
        "bloggingStyle": "both",
        "settings": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "karenmartin",
        "email": "karenmartin@example.com",
        "password": "karenmartin123",
        "createdAt": "2024-06-13T14:49:00Z",
        "name": "Karen Martin",
        "bio": "Health blogger and nutritionist.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/karenmartin" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/karenmartin" }
        ],
        "bloggingStyle": "writer",
        "settings": {
          "theme": "light",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "charleshall",
        "email": "charleshall@example.com",
        "password": "charleshall123",
        "createdAt": "2024-06-13T14:50:00Z",
        "name": "Charles Hall",
        "bio": "Automotive blogger and car enthusiast.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/charleshall" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/charleshall" }
        ],
        "bloggingStyle": "writer",
        "settings": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "ashleyyoung",
        "email": "ashleyyoung@example.com",
        "password": "ashleyyoung123",
        "createdAt": "2024-06-13T14:51:00Z",
        "name": "Ashley Young",
        "bio": "Fashion blogger and stylist.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/ashleyyoung" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/ashleyyoung" }
        ],
        "bloggingStyle": "writer",
        "settings": {
          "theme": "light",
          "notifications": false,
          "language": "en"
        }
      },
      {
        "username": "danielharris",
        "email": "danielharris@example.com",
        "password": "danielharris123",
        "createdAt": "2024-06-13T14:52:00Z",
        "name": "Daniel Harris",
        "bio": "Sports blogger and analyst.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/danielharris" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/danielharris" }
        ],
        "bloggingStyle": "both",
        "settings": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "amandawalker",
        "email": "amandawalker@example.com",
        "password": "amandawalker123",
        "createdAt": "2024-06-13T14:53:00Z",
        "name": "Amanda Walker",
        "bio": "Beauty blogger and makeup artist.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/amandawalker" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/amandawalker" }
        ],
        "bloggingStyle": "writer",
        "settings": {
          "theme": "light",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "jamesgreen",
        "email": "jamesgreen@example.com",
        "password": "jamesgreen123",
        "createdAt": "2024-06-13T14:54:00Z",
        "name": "James Green",
        "bio": "Environmentalist and sustainability blogger.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/jamesgreen" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/jamesgreen" }
        ],
        "bloggingStyle": "both",
        "settings": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "victoriathomas",
        "email": "victoriathomas@example.com",
        "password": "victoriathomas123",
        "createdAt": "2024-06-13T14:55:00Z",
        "name": "Victoria Thomas",
        "bio": "Art blogger and illustrator.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/victoriathomas" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/victoriathomas" }
        ],
        "bloggingStyle": "writer",
        "settings": {
          "theme": "light",
          "notifications": true,
          "language": "en"
        }
      },
      {
        "username": "patrickclark",
        "email": "patrickclark@example.com",
        "password": "patrickclark123",
        "createdAt": "2024-06-13T14:56:00Z",
        "name": "Patrick Clark",
        "bio": "Travel blogger and adventurer.",
        "socialLinks": [
          { "platform": "twitter", "url": "https://twitter.com/patrickclark" },
          { "platform": "linkedin", "url": "https://linkedin.com/in/patrickclark" }
        ],
        "bloggingStyle": "writer",
        "settings": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      }
    ]
    
    try
    {
      input = await collection.insertMany(users);
      console.log('Data Accepted');
    }
    catch(error)
    {
      console.log(error);
    }
  }



const creating =(collection) => 
  {
    inserting = getUserInput('insertOne or insertMany');
    if (inserting === 'insertOne') 
      {
        gettingUser(collection);
      }
    if(inserting === 'insertMany')
      {
        manyUsers(collection);
      }
      else
      {
        console.log('Not a valid request');
      }
  }




//READIING
const validatingUser =  async (collection) =>
  {
    const email =  await getUserInput('Search by email: ');
    const user = {email}
    try
    {
      const data = await collection.findOne(user);
      if(!data)
        {
          console.log('User not found');
        }
   console.log(data)
    }
    catch(error)
    {
      console.log(error)
    }
  }


const totalUsers = async (collection) =>
  {
    const users = await collection.find().toArray();

    console.log(`${users.length} found`);
    users.forEach((user, index) =>
      {
        console.log(`${index + 1}`);
        console.log(`${JSON.stringify(user, null, 2)}`);
      });
  }

const bloggers = async (collection) =>
  {
    const style = getUserInput("What blogging Style do you wanna search for? ");
    const users =  await collection.find({'bloggingStyyle':style}).toArray()
    users.forEach((user,index) => 
      {
        console.log(`${index + 1}`)
        console.log(`${JSON.stringify(user,null, 2)}`);
      });
  }

//MAIN
const reading = (collection) =>
  {
     const option = getUserInput("What value from the database do you wanna read?(readOne, all, bloggers) ");
     if(option === 'all')
      {
        totalUsers(collection);
      } 
      if(option === 'bloggers')
        {
          bloggers(collection);
        }
      if(option === 'findOne')
        {
          validatingUser(collection);
        }
  } 

// UPDATING



const updatingUser = async (collection) =>
  {
  try{
    let  email = await  getUserInput('Input email: ');
    while(!emailExists(email))
      { 
        console.log('Not a user');
       email = await  getUserInput('Input email: ');  
      } 
    let password = await getUserInput('Whats your password: ');
  if(!(await correctPassword(password, email)))
    {
     password = await getUserInput('Whats your password:');
    }
        const name = await getUserInput('Name change:');
        const bio = await getUserInput('Bio change: ');
        const bloggingStyle = await getUserInput('Blog style change')
        const filter = {email}
        if(validName(bio))
          {
          const data = await collection.updateOne(filter, {$set:{boi}});
          const result = data.modifiedCount;
          console.log(`user updated`);
          console.log(`${result}`);
          const newUpdate = await collection.findOne(filter);
          console.log(newUpdate);
          }
              if(validBlog(bloggingStyle))
                {
                const data = await collection.updateOne(filter, {$set:{bloggingStyle}});
                const result = data.modifiedCount;
                console.log(`user updated`);
                console.table(`${result}`);
                const newUpdate = await collection.findOne(filter);
                console.log(newUpdate);
                }
              if (validName(name))
                {
                const data = await collection.updateOne(filter, {$set:{name}});
                const result = data.modifiedCount;
                console.log(`user updated`);
                console.table(`${result}`);
                const newUpdate = await collection.findOne(filter);
                console.log(newUpdate);
                }
              if(!validName(bio) && !validName(name))
                {
                  console.log('Nothing was updated');
                }
              }
    catch(error)
    {
      console.log(error);
    }
  }
   //deleting

  const deleteUser = async (collection) =>
    {
      try{
      const email = await getUserInput('Input your email: ');
      if( await emailExists(email)){
      const verification = await getUserInput(`Do you want to delete the account linked to ${email}: `);
      if(verification === 'yes') 
      {
        const password = await getUserInput('Whats the password: ');
        if(await correctPassword(password, email))
          {
           await collection.deleteOne({email});
            console.log('Deleted');   
          } else
          {
            console.log('wrong password');
            return;
          }
          }else if(!verification || verification !== 'yes' )
          {
            console.log('Exiting');
            return;
          }
        }
      else
            {
              console.log('Not a user');
            }
        }
      catch(error)
      {
        console.log(error);
      }
      };
  


const CRUD = async () =>
  {
    try
    {
      await connect();


      input.prompt();

  
      input.on('line', async(inputLine) => 
        {
          const command = inputLine;

          try
          {
            switch(command)
            {
              case 'create':
                console.log('creating');
                await creating(userCollection);
                break
              case 'read':
                console.log('reading....');
                await  reading(userCollection);
                break
             case 'update':
               console.log('updating....');
               updatingUser(userCollection);
               break
            case 'delete':
                   console.log('deleting...');
                  deleteUser(userCollection);
                   break
                case 'exit':
                  console.log('bye');
                  input.close();
                  break
                  default:
                  console.log('ehnn??');
            }
          }
          catch(error)
          {
            console.log(error);
          }

          input.prompt();
        }
      ).on('close', () =>
        {
          console.log('closed');
          process.exit(0);
        });
    }
    catch(error)
    {
      console.log('omo');
    }
  }
