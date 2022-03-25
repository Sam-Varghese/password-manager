import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
import dotenv from "dotenv";
dotenv.config();
var url = process.env.MONGODB_PORT;
var databaseName = process.env.DATABASE_NAME;
var collectionName = process.env.COLLECTION_NAME;
export default async function AccessSiteData(siteName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (error, db) => {
            if (error) {
                reject(`Failed to connect to the database`);
            } else {
                let dbo = db.db(`FakePasswords1`);
                dbo.collection(`Passwords`).findOne(
                    { siteName: siteName },
                    (err, result) => {
                        if (err) {
                            reject(`Failed to connect to the database`);
                        } else {
                            db.close();
                            resolve(result);
                        }
                    }
                );
            }
        });
    });
}
