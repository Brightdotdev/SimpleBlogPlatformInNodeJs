
const {MongoClient} = require('mongodb');
require("dotenv").config()



const uriString = process.env.MONGODB_URI

console.log(uriString)
//requirements
const uri = uriString
const client = new MongoClient(uri);




let dbName, MongoClient = 'studentsDb';

function checkConnect() {
    try {
        const connect = client.connect().then(() => {
            console.log("Connected successfully");
        });
    } catch (error) {
        console.log(error);
    }
}

// to add to the database
function inputInfo (){
    const db = client.db(dbName);

    const collection = db. collection("Students");
    
        collection
            .insertMany([{
                name:"Divine",
                age: 34,
                _id: 1,
            },
            {
                name:"Grace",
                age: 12,
                _id: 2,
            },
            {
                name:"Tope",
                age: 34,
                _id: 3,
            }
        ])
        .then(() => {
            console.log("Inserted successfully");
        })
        .catch((error) => {
            console.log(error);
        })
}/* 
checkConnect();
inputInfo(); */
const listDb = async (client) => 
    {
       try{ const adminDb = client.db().admin()
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

    listDb(client);