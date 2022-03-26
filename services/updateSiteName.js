import chalk from "chalk";
import input from "input";
import mongodb from "mongodb";
import dotenv from "dotenv";
import Encryptor from "./encryptor.js";
dotenv.config();

var url = process.env.MONGODB_PORT;
var databaseName = process.env.DATABASE_NAME;
var collectionName = process.env.COLLECTION_NAME;

const MongoClient = mongodb.MongoClient;

export default async function UpdateSiteName(oldSiteName, newSiteName) {
    return new Promise(async (resolve, reject) => {
        MongoClient.connect(url, (error, db) => {
            if (error) {
                reject(`Failed database connection`);
            } else {
                let dbo = db.db(databaseName);
                dbo.collection(collectionName).updateOne(
                    { siteName: oldSiteName },
                    {
                        $set: {
                            siteName: newSiteName,
                            timeStamp: new Date(),
                        },
                    },
                    (error1, res) => {
                        if (error1) {
                            reject(`Site name's update failed`);
                        } else {
                            console.log(
                                chalk.green(
                                    `Site name ${oldSiteName} successfully updated to ${newSiteName}.`
                                )
                            );
                            db.close();
                            resolve(`Site name updated`);
                        }
                    }
                );
            }
        });
    });
}
