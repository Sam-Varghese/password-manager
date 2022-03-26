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

export default async function UpdateUrl(siteName, updatedUrl) {
    return new Promise(async (resolve, reject) => {
        MongoClient.connect(url, (error, db) => {
            if (error) {
                reject(`Failed database connection`);
            } else {
                let dbo = db.db(databaseName);
                dbo.collection(collectionName).updateOne(
                    { siteName: siteName },
                    {
                        $set: {
                            siteUrl: updatedUrl,
                            timeStamp: new Date(),
                        },
                    },
                    (error1, res) => {
                        if (error1) {
                            reject(`URL update failed`);
                        } else {
                            console.log(
                                chalk.green(
                                    `URL of ${siteName} updated successfully.`
                                )
                            );
                            db.close();
                            resolve(`URL updated`);
                        }
                    }
                );
            }
        });
    });
}
