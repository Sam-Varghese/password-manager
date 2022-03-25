import mongodb from "mongodb";
var MongoClient = mongodb.MongoClient;
import dotenv from "dotenv";
dotenv.config();
var url = process.env.MONGODB_PORT;

var databaseName = process.env.DATABASE_NAME;
var collectionName = process.env.COLLECTION_NAME;

export default async function GetSiteNames() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (error, db) => {
            if (error) throw error;
            let dbo = db.db(databaseName);
            dbo.collection(collectionName)
                .find({}, { projection: { _id: 0, siteName: 1 } })
                .toArray((err, res) => {
                    // console.log(res);
                    let siteNameArray = res.map((element) => {
                        return element.siteName;
                    });
                    db.close();
                    resolve(siteNameArray);
                });
        });
    });
}
