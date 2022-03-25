import mongodb from "mongodb";
var MongoClient = mongodb.MongoClient;
import chalk from "chalk";
import dotenv from "dotenv";
dotenv.config();
var databaseName = process.env.DATABASE_NAME;
var collectionName = process.env.COLLECTION_NAME;
var url = process.env.MONGODB_PORT;
export default async function StorePassword(jsonData) {
    return new Promise(async (resolve, reject) => {
        MongoClient.connect(url, (error, db) => {
            if (error) throw error;
            let dbo = db.db(databaseName);
            dbo.collection(collectionName).insertOne(
                jsonData,
                (error1, data) => {
                    if (error1) {
                        reject(`Failed to send data to database`);
                    }
                    console.log(
                        chalk.green(
                            `Successfully inserted the data to database.`
                        )
                    );
                    db.close();
                    resolve(`Data inserted`);
                }
            );
        });
    });
}
