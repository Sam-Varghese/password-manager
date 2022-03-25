import mongodb from "mongodb";
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/";

export default async function GetSiteNames() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (error, db) => {
            if (error) throw error;
            let dbo = db.db("FakePasswords1");
            dbo.collection("Passwords").find({}, { projection: { _id: 0, siteName: 1 } }).toArray((err, res) => {
                // console.log(res);
                let siteNameArray = res.map((element) => {return(element.siteName)})
                db.close();
                resolve(siteNameArray);
            })
        });
    })
}