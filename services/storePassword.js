import mongodb from "mongodb";
var MongoClient = mongodb.MongoClient;
import chalk from "chalk";
var url = "mongodb://localhost:27017/";
export default async function StorePassword(jsonData) {
    return new Promise(async(resolve, reject) => {
        MongoClient.connect(url, (error, db) => {
            if (error) throw error;
            let dbo = db.db('FakePasswords1');
            dbo.collection('Passwords').insertOne(jsonData, (error1, data) => {
                if (error1) {
                    reject(`Failed to send data to database`);
                };
                console.log(chalk.green(`Successfully inserted the data to database.`));
                db.close();
                resolve(`Data inserted`);
            })
        })
    })
}