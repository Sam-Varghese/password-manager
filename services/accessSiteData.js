import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";
export default async function AccessSiteData(siteName) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (error, db) => {
            if (error) {
                reject(`Failed to connect to the database`);
            } else {
                let dbo = db.db(`FakePasswords1`);
                dbo.collection(`Passwords`).findOne({ siteName: siteName }, (err, result) => {
                    if (err) {
                        reject(`Failed to connect to the database`);
                    } else {
                        db.close();
                        resolve(result);
                    }
                });
            }
        });
    });
}