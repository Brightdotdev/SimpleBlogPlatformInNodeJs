///beforree runnung the code you 
//run: npm init(press enter many times until a package.json file appears in your folder)
//then you run  npm install mongodb
//in your terminal
//(to open teminal control j)


require("dotenv").config()


const uriString = process.env.MONGODB_URI

console.log(uriString)
//requirements
const {MongoClient} = require('mongodb');
const uri = uriString
   const client = new MongoClient(uri);



//creating
//function to insert one data in the database
       const  insertOneData = async (userName,UserAge,id) =>
            {
                try
                {
                    let dbName = 'firstDb';
                     db = client.db(dbName);
                collection = db.collection('firstCollection');
                data = {
                    name:userName,
                    age:UserAge,
                    _id:id
                }
                await  collection.insertOne(data);
                result = collection.insertedId
                console.log('Data inserted succesfully');
                 console.log(`${data.name} is now in the database and of id ${_id}`);
                 return result
                }
                catch(error)
                {
                console.log(`errmm ${error} fit it!!`);

                }
            }
//funstion to insert many data
             const  insertManyData = async () =>
                {
                    let dbName = 'firstDb';
                    db = client.db(dbName);
                    collection = db.collection('firstCollection');
                    data =[ 
                {
                    name:"Grace",
                    age: 12,
                    _id: 31,
                },
                {
                    name:"Tope",
                    age: 34,
                    _id: 30,
                },
                {
                    name:"Steven",
                    age: 32,
                    _id: 29,
                },
                {
                    name:"Grace",
                    age: 12,
                    _id: 28,
                }
            ]
                   await collection.insertMany(data).then(() => {console.log('Data inserted succesfully')})
                    .catch((error) => {console.log(`errmm ${error} fit it!!`)});
                }
    //creating database
   /* const creatingDatabase = async (dbName, collections) =>
        {
            try
            {
                let database = dbName;
                let collectionName = collections
                const db = client.db(database);
                console.log(`Database ${database} created successfully`);
               const collection = await db.createCollection(collectionName);
               console.log(`Collection ${collectionName} created successfully`);
                listDb(client);
            }
            catch(error)
            {
                console.log(`the error is ${error} fix it!!`);
            }
        }
        await creatingDatabase('firstDb','firstCollection');


//reading data
//listing the database
const listDb = async (client) => 
    {
       try{ 
    const adminDb = client.db().admin()
     const databasesList = await adminDb.listDatabases();
     console.log("Databeses:");
     databasesList.databases.forEach
     (db => 
        {
            console.log(`- ${db.name}`); 
        })}
        catch(error)
        {console.log(`The error is ${error} fix it!!`)}
    };
  */  

const queryAllData = async () => 
    {
    try{    let dbName = 'firstDb';
        db = client.db(dbName);
        collection = db.collection('firstCollection');
       const found = await collection.find().toArray();
        console.log("The datas are -");
       console.log(found);
    }
       catch(error)
       {
        console.log(error);
       }
    }
const queryDataById = async (id) => 
    {
     try
     {
        let dbName = 'firstDb';
        db = client.db(dbName);
        collection = db.collection('firstCollection');
        ide = {_id:id}
       const dataFound = await collection.findOne(ide);
       console.log(dataFound);
     }
     catch(error)
     {
        console.log(error);
     }
    }

    
    ///finding one data by name
    const findingOne = async (userName) =>
        {
           try
           {
            let dbName = 'firstDb';
            db = client.db(dbName);
            collection = db.collection('firstCollection');
            data = {name:userName};
            const dataFound = await collection.findOne(data);
            console.log(dataFound);
           }
           catch(error)
           {
            console.log(`${error} fix it!!`)
           }
        }

    const queryDataByNameAndAge = async (userName,UserAge) => 
        {
            try
                {let dbName = 'firstDb';
                db = client.db(dbName);
                collection = db.collection('firstCollection');
               if( UserAge === undefined)
                {
                    console.log(`Finding ${userName}`);
                    datafound = await findingOne(userName);
                    console.log(dataFound);
                }else
                {
                    data = {name:userName,age:UserAge};
                    const dataFound = await collection.findOne(data);
                    console.log(dataFound);
                }
            }        
            catch(error)
            {
        console.log(`The error is ${error} fix it!!`)

            }
        }




//update

const updating = async (id,currentName, userName,UserAge) => 
    {
        let dbName = 'firstDb';
        db = client.db(dbName);
        collection = db.collection('firstCollection');
        const filter = {_id:id, name:currentName};
        const upadating = {name:userName, age:UserAge}
        updatingDocument = await collection.updateOne(filter,{$set:upadating});
        const result = updatingDocument.modifiedCount;
        console.log(`${result} count is updated`);
        console.log(updatingDocument);
        change = await queryDataById(id);
        console.log(change);
    } 

    const deleting =  async(id) =>
        {
            let dbName = 'firstDb';
            db = client.db(dbName);
            collection = db.collection('firstCollection');
            const deletingValue = {_id:id};
            deleted = await collection.deleteOne(deletingValue);
            const result = deleted.deletedCount;
            console.log(result);
        }

//the main coode
async function main()
{    
    try
    {
        await client.connect();
        console.log("Connnected Succesfully");
        await queryAllData();
       await deleting(3);
    }
    catch(error)
    {
        console.log("The error is ", error);
    }
    finally{
       await client.close();
        console.log("Connection clossed");
    }
}

 main().catch(console.error);