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

export default async function UpdatePassword(siteName, newPassword) {
    // Generating encrypted password
    let encryptedPassword = await Encryptor(newPassword);
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
                            encryptedPassword: encryptedPassword,
                            timeStamp: new Date(),
                        },
                    },
                    (error1, res) => {
                        if (error1) {
                            reject(`Password update failed`);
                        } else {
                            console.log(
                                chalk.green(
                                    `Password of ${siteName} successfully updated.`
                                )
                            );
                            db.close();
                            resolve(`Password updated`);
                        }
                    }
                );
            }
        });
    });
}
