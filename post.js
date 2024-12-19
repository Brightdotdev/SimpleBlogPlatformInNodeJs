const { error } = require('console');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://iamtherealbrightbkup:092MLBOA@experimental.9jz0uzj.mongodb.net/?retryWrites=true&w=majority&appName=experimental";
const client =  new MongoClient(uri);
let dbName = 'blogPlatform';
const db = client.db(dbName);
const userCollection = db.collection('users');
const postCollection = db.collection('posts');



//readline for ui in the console
      const readline = require('readline');
const input = readline.createInterface
(
  {
    input: process.stdin,
    output: process.stdout,
    prompt: 'mongodb> '
  }
)

//user email must be unique
const emailExists = async (email) =>
    {
      const user = await userCollection.findOne({email});
      return user !== null ;
    } 
  
const getUserInput = (prompt) => new Promise((resolve)  => 
    {
      input.question(prompt, (answer) => 
        {
          resolve(answer);
        });
  }); 
//title must be unique to user
//titleToUser

const titleToUser = async (title, email) => 
  {
    const query = {title, email}
    const user = await postCollection.findOne(query);
    return user !== null;
  }

// connect to mogngodb
const connect = () => 
    {
    try
    {
    client.connect();
    console.log("Connected Succesfully");
    }
    catch(error)
    {
        console.log(`${error} caused it not to connect`);
    }
} 



//creating post 
const post = async  (collection) => 
    {
       try
       {
        connect();
        let title, body, author;
        author = await getUserInput('Written by: ');
        if(await emailExists(author))
         {
           while(!title || (await titleToUser(title,author)))
             {
               title  = await getUserInput('Title: ');
               if(await titleToUser(title, author))
                 {
                   console.log('Title already exists')
                 }
             }
             while (!body) 
               {
                 body = await getUserInput('Body of the blog: ');
               }
         
             const newPost = {title, body, author, createdAt: Date.now()};
           const update = await collection.insertOne(newPost);
           const post = await collection.findOne(newPost); 
             console.log(update);
             console.log(post);
     }
     
     else{
           console.log('Not a valid user');
   }
       }
       catch(error)
       {
        console.log(error);
       }
}


const manyPosts = async (collection) =>
  {
    const posts = [
      {
        "title": "Exploring the Latest Tech Trends",
        "body": "In this post, we explore the latest trends in technology that are shaping our future.",
        "author": "stevenjames@example.com",
        "createdAt": "2024-06-13T15:00:00Z",
        "tags": ["tech", "innovation"],
        "comments": [
          {
            "commenter": "johndoe",
            "comment": "Very informative! Thanks for sharing.",
            "createdAt": "2024-06-13T15:01:00Z"
          },
          {
            "commenter": "michaelbrown",
            "comment": "Great insights on the latest tech trends.",
            "createdAt": "2024-06-13T15:02:00Z"
          }
        ],
        "likes": ["johndoe", "michaelbrown", "chloebrown"],
        "status": "published"
      },
      {
        "title": "10 Tips for Effective Content Marketing",
        "body": "Content marketing is crucial for any business. Here are 10 tips to do it right.",
        "author": "sarahlee@example.com",
        "createdAt": "2024-06-13T15:03:00Z",
        "tags": ["content marketing", "business"],
        "comments": [
          {
            "commenter": "laurensmith",
            "comment": "These tips are very helpful. Thanks!",
            "createdAt": "2024-06-13T15:04:00Z"
          },
          {
            "commenter": "oliviascott",
            "comment": "I will definitely implement these strategies.",
            "createdAt": "2024-06-13T15:05:00Z"
          }
        ],
        "likes": ["laurensmith", "oliviascott", "jasonwright"],
        "status": "published"
      },
      {
        "title": "My Journey in Photography",
        "body": "Sharing my experiences and tips from my journey as a photographer.",
        "author": "laurensmith@example.com",
        "createdAt": "2024-06-13T15:06:00Z",
        "tags": ["photography", "travel"],
        "comments": [
          {
            "commenter": "sarahlee",
            "comment": "Your journey is truly inspiring!",
            "createdAt": "2024-06-13T15:07:00Z"
          },
          {
            "commenter": "charleshall",
            "comment": "Great tips for budding photographers.",
            "createdAt": "2024-06-13T15:08:00Z"
          }
        ],
        "likes": ["sarahlee", "charleshall", "karenmartin"],
        "status": "published"
      },
      {
        "title": "Top 5 Gadgets of 2024",
        "body": "A review of the top 5 gadgets released in 2024.",
        "author": "matthewmiller@example.com",
        "createdAt": "2024-06-13T15:09:00Z",
        "tags": ["gadgets", "tech"],
        "comments": [
          {
            "commenter": "michaelbrown",
            "comment": "Awesome list! I need to check these out.",
            "createdAt": "2024-06-13T15:10:00Z"
          },
          {
            "commenter": "chloebrown",
            "comment": "Thanks for the recommendations.",
            "createdAt": "2024-06-13T15:11:00Z"
          }
        ],
        "likes": ["michaelbrown", "chloebrown", "davidjones"],
        "status": "published"
      },
      {
        "title": "Healthy Eating Habits for a Better Life",
        "body": "Discover how healthy eating habits can improve your life.",
        "author": "karenmartin@example.com",
        "createdAt": "2024-06-13T15:12:00Z",
        "tags": ["health", "nutrition"],
        "comments": [
          {
            "commenter": "sarahlee",
            "comment": "Very informative post. Thanks for sharing!",
            "createdAt": "2024-06-13T15:13:00Z"
          },
          {
            "commenter": "davidjones",
            "comment": "Great tips on maintaining a healthy diet.",
            "createdAt": "2024-06-13T15:14:00Z"
          }
        ],
        "likes": ["sarahlee", "davidjones", "chloebrown"],
        "status": "published"
      },
      {
        "title": "How to Balance Work and Life",
        "body": "Tips and strategies for maintaining a healthy work-life balance.",
        "author": "johndoe@example.com",
        "createdAt": "2024-06-13T15:15:00Z",
        "tags": ["work-life balance", "self improvement"],
        "comments": [
          {
            "commenter": "sarahlee",
            "comment": "This is exactly what I needed to read today.",
            "createdAt": "2024-06-13T15:16:00Z"
          },
          {
            "commenter": "charleshall",
            "comment": "Great advice on balancing work and life.",
            "createdAt": "2024-06-13T15:17:00Z"
          }
        ],
        "likes": ["sarahlee", "charleshall", "davidjones"],
        "status": "published"
      },
      {
        "title": "The Ultimate Guide to Blogging",
        "body": "Everything you need to know about starting and maintaining a successful blog.",
        "author": "michaelbrown@example.com",
        "createdAt": "2024-06-13T15:18:00Z",
        "tags": ["blogging", "content creation"],
        "comments": [
          {
            "commenter": "laurensmith",
            "comment": "Thanks for the comprehensive guide!",
            "createdAt": "2024-06-13T15:19:00Z"
          },
          {
            "commenter": "sarahlee",
            "comment": "This is very helpful for new bloggers.",
            "createdAt": "2024-06-13T15:20:00Z"
          }
        ],
        "likes": ["laurensmith", "sarahlee", "matthewmiller"],
        "status": "published"
      },
      {
        "title": "Top Destinations for 2024",
        "body": "Explore the top travel destinations for 2024.",
        "author": "patrickclark@example.com",
        "createdAt": "2024-06-13T15:21:00Z",
        "tags": ["travel", "destinations"],
        "comments": [
          {
            "commenter": "laurensmith",
            "comment": "Adding these places to my travel list!",
            "createdAt": "2024-06-13T15:22:00Z"
          },
          {
            "commenter": "chloebrown",
            "comment": "Great recommendations for travel enthusiasts.",
            "createdAt": "2024-06-13T15:23:00Z"
          }
        ],
        "likes": ["laurensmith", "chloebrown", "davidjones"],
        "status": "published"
      },
      {
        "title": "Essential DIY Projects for Your Home",
        "body": "Here are some essential DIY projects to improve your home.",
        "author": "lisajohnson@example.com",
        "createdAt": "2024-06-13T15:24:00Z",
        "tags": ["DIY", "home improvement"],
        "comments": [
          {
            "commenter": "laurensmith",
            "comment": "I love these DIY ideas!",
            "createdAt": "2024-06-13T15:25:00Z"
          },
          {
            "commenter": "davidjones",
            "comment": "Great projects for home improvement.",
            "createdAt": "2024-06-13T15:26:00Z"
          }
        ],
        "likes": ["laurensmith", "davidjones", "karenmartin"],
        "status": "published"
      },
      {
        "title": "Investing in the Future: A Guide",
        "body": "Learn how to make smart investments for a secure future.",
        "author": "robertwilson@example.com",
        "createdAt": "2024-06-13T15:27:00Z",
        "tags": ["investing", "finance"],
        "comments": [
          {
            "commenter": "davidjones",
            "comment": "Very useful investment tips. Thanks!",
            "createdAt": "2024-06-13T15:28:00Z"
          },
          {
            "commenter": "sarahlee",
            "comment": "Great guide for beginners.",
            "createdAt": "2024-06-13T15:29:00Z"
          }
        ],
        "likes": ["davidjones", "sarahlee", "charleshall"],
        "status": "published"
      },
      {
        "title": "Improving Your Photography Skills",
        "body": "Tips and techniques to enhance your photography skills.",
        "author": "charleshall@example.com",
        "createdAt": "2024-06-13T15:30:00Z",
        "tags": ["photography", "skills"],
        "comments": [
          {
            "commenter": "michaelbrown",
            "comment": "Very helpful tips for photographers.",
            "createdAt": "2024-06-13T15:31:00Z"
          },
          {
            "commenter": "laurensmith",
            "comment": "I learned a lot from this post.",
            "createdAt": "2024-06-13T15:32:00Z"
          }
        ],
        "likes": ["michaelbrown", "laurensmith", "jasonwright"],
        "status": "published"
      },
      {
        "title": "Fashion Trends to Watch in 2024",
        "body": "An overview of the top fashion trends to look out for in 2024.",
        "author": "ashleyyoung@example.com",
        "createdAt": "2024-06-13T15:33:00Z",
        "tags": ["fashion", "trends"],
        "comments": [
          {
            "commenter": "amandawalker",
            "comment": "Can't wait to try these trends!",
            "createdAt": "2024-06-13T15:34:00Z"
          },
          {
            "commenter": "laurensmith",
            "comment": "Great insights on upcoming fashion.",
            "createdAt": "2024-06-13T15:35:00Z"
          }
        ],
        "likes": ["amandawalker", "laurensmith", "karenmartin"],
        "status": "published"
      },
      {
        "title": "The Best Workout Routines for Beginners",
        "body": "Simple and effective workout routines for those just starting out.",
        "author": "davidjones@example.com",
        "createdAt": "2024-06-13T15:36:00Z",
        "tags": ["fitness", "workout"],
        "comments": [
          {
            "commenter": "charleshall",
            "comment": "Great routines for beginners.",
            "createdAt": "2024-06-13T15:37:00Z"
          },
          {
            "commenter": "michaelbrown",
            "comment": "Thanks for the workout tips!",
            "createdAt": "2024-06-13T15:38:00Z"
          }
        ],
        "likes": ["charleshall", "michaelbrown", "karenmartin"],
        "status": "published"
      },
      {
        "title": "Sustainable Living: A Comprehensive Guide",
        "body": "Learn how to live a more sustainable and eco-friendly life.",
        "author": "jamesgreen@example.com",
        "createdAt": "2024-06-13T15:39:00Z",
        "tags": ["sustainability", "eco-friendly"],
        "comments": [
          {
            "commenter": "victoriathomas",
            "comment": "Excellent guide for sustainable living.",
            "createdAt": "2024-06-13T15:40:00Z"
          },
          {
            "commenter": "chloebrown",
            "comment": "Very informative post. Thanks for sharing!",
            "createdAt": "2024-06-13T15:41:00Z"
          }
        ],
        "likes": ["victoriathomas", "chloebrown", "michaelbrown"],
        "status": "published"
      },
      {
        "title": "The Art of Digital Illustration",
        "body": "Techniques and tools for creating stunning digital illustrations.",
        "author": "victoriathomas@example.com",
        "createdAt": "2024-06-13T15:42:00Z",
        "tags": ["art", "digital illustration"],
        "comments": [
          {
            "commenter": "charleshall",
            "comment": "Amazing techniques for digital art.",
            "createdAt": "2024-06-13T15:43:00Z"
          },
          {
            "commenter": "laurensmith",
            "comment": "Very helpful for aspiring artists.",
            "createdAt": "2024-06-13T15:44:00Z"
          }
        ],
        "likes": ["charleshall", "laurensmith", "davidjones"],
        "status": "published"
      },
      {
        "title": "Traveling on a Budget: Tips and Tricks",
        "body": "How to see the world without breaking the bank.",
        "author": "patrickclark@example.com",
        "createdAt": "2024-06-13T15:45:00Z",
        "tags": ["travel", "budget"],
        "comments": [
          {
            "commenter": "laurensmith",
            "comment": "These tips are really useful!",
            "createdAt": "2024-06-13T15:46:00Z"
          },
          {
            "commenter": "michaelbrown",
            "comment": "Great advice for budget travelers.",
            "createdAt": "2024-06-13T15:47:00Z"
          }
        ],
        "likes": ["laurensmith", "michaelbrown", "chloebrown"],
        "status": "published"
      }
    ]
    try
    {
      await collection.insertMany(posts);
      console.log('Data accepted');
    }
    catch(error)
    {
      console.log(error);
    }
  }


  const creating = (collection)  =>
    {
      const verification = getUserInput('InsertOne oor insertMany?');
      if(verification === 'insertOne')
        {
          post(collection);
        }
      if(verification === 'insertMany')
        {
          manyPosts(collection); 
        }
    }


//reading
const reading = async  (collection) => 
  {
    try
    {
      connect();
      let blogPost 
     while(!blogPost)
       {
         blogPost  = await getUserInput('blogPost: ');
       }
         const regex = new RegExp(blogPost, 'i' );
         const query =
         {
           $or:
           [
             {title:{$regex: regex}},
             {body:{$regex: regex}}
           ]
         }
           const results = await collection.find(query).toArray();
           console.log (`found ${results.length} results`);
 
           results.forEach((result, index) => {
         
             console.log(`${index + 1}. Title: ${result.title}`);
             console.log(`   Body: ${result.body}`);
             console.log(`   Written by ${result.author}`)
 
             const matchedField = [];
 
             if(result.title.match(new RegExp (blogPost, 'i')))
               {
                 matchedField.push('title');
               }
               if(result.body.match(new RegExp (blogPost, 'i')))
                 {
                   matchedField.push('body');
                 }
                 console.log( `  Matched fields: ${matchedField.join(', ')}`)
           });
    }
    catch(error)
    {
      console.log(error);
    }
  }

 
//updating
const updateTitle = async  (collection) => 
  {
     try
     {
      connect();
      let author, title, titleUpdate;
           author = await getUserInput('Written by: ');
     if( await emailExists(author))
      {
        const options = await collection.find({author}).toArray();
        console.log(`${options.length} titles found`);
        if(! await titleToUser(title,author))
          {
         options.forEach((option) =>
          {
            console.log(`- ${option.title}`);
          }
        );
        title  = await getUserInput('Title: ');
          }
    titleUpdate = await getUserInput('Whats the title update: '); 
    if(titleUpdate)
      {
       const query = {title, author}
       await collection.updateOne(query, {$set:{title:titleUpdate}});
      const change = await collection.findOne({author});
      console.log(change);
      }
      else
      {
        console.log('No change was made');
        return;
      }
 
      }else
      {
        console.log('Not a valid user');
        return
      }
     }
     catch(error)
     {
      console.log(error);
     }
    }



//updating    
const updateBody = async  (collection) => 
  {
    try
    {
      connect();
      let author, title, bodyUpdate;
           author = await getUserInput('Written by: ');
     if( await emailExists(author))
      {
        const options = await collection.find({author}).toArray();
        console.log(`${options.length} titles found`);
        if(! await titleToUser(title,author))
          {
         options.forEach((option) =>
          {
            console.log(`- ${option.title}`);
          }
        );
        title  = await getUserInput('Title: ');
          }
    bodyUpdate = await getUserInput('Whats the body update: '); 
    if(bodyUpdate)
      {
       const query = {title, author}
       await collection.updateOne(query, {$set:{body:bodyUpdate}});
      const change = await collection.findOne({author, title});
      console.log(change);
      }
      else
      {
        console.log('No change was made');
        return;
      }
 
      }else
      {
        console.log('Not a valid user');
        return
      }
    }
    catch(error)
    {
      console.log(error);
    }   
  }


  

const update = (collection) => 
  {
    const option = getUserInput('What do you want to update? ')
    if(option === 'title')
      {
        updateTitle(collection);
      }
    if(option === 'body')
      {
        updateBody(collection);
      }
  }

//deleting
const deletePost = async  (collection) => 
  {
      try
      {
        connect();
      let author, title;
           author = await getUserInput('Input email: ');
     if( await emailExists(author))
      {
        const options = await collection.find({author}).toArray();
        console.log(`${options.length} titles found`);
        if(! await titleToUser(title,author))
          {
         options.forEach((option) =>
          {
            console.log(`- ${option.title}`);
          }
        );
        title  = await getUserInput('Title: ');
          }
          const verification = getUserInput('Are you sure you want to delete this blog post? ')
    if(verification === 'yes')
      {
       const query = {title, author}
       await collection.updateOne(query);
      const change = await collection.find({author}).toArray();
      console.log(change);
      }
      else
      {
        console.log('No change was made');
        return;
      }
 
      }else
      {
        console.log('Not a valid user');
        return
      }
      }
      catch(error)
      {
        consolee.log(error);
      }
    }
    const CRUD = () =>
        {
          try
          {
            connect();
            input.prompt();
      
        
            input.on('line', async(inputLine) => 
              {
                const command = inputLine;
      
                try
                {
                  switch(command)
                  {
                    case 'creatUser':
                      console.log('creating');
                      creating(postCollection)
                      
                      break
                    case 'read':
                      console.log('reading....');
                      reading(postCollection);

                      break
                   case 'update':
                      console.log('updating....');
                      update(postCollection)

                     break
                  case 'delete':
                         console.log('deleting...');
                         deletePost(postCollection);
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
