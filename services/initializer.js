import fs from "fs";
import input from "input";
import chalk from "chalk";

export default async function InitializeApplication(envFileName) {
    console.clear();
    return new Promise(async (resolve, reject) => {
        const databaseName = await input.text(`Enter the database name: `, {
            default: "PasswordManger",
        });
        const collectionName = await input.text(`Enter the collection name: `, {
            default: "Passwords",
        });
        const masterPassword = await input.text(`Enter the master password: `);
        const mongodbPort = await input.text(
            `Enter the mongodb connection port number: `,
            { default: "27017" }
        );
        fs.writeFile(
            envFileName,
            `MASTER_PASSWORD = "${masterPassword}"\nMONGODB_PORT = "mongodb://localhost:${mongodbPort}/"\nDATABASE_NAME = "${databaseName}"\nCOLLECTION_NAME: "${collectionName}"`,
            (error) => {
                if (error) {
                    reject(`Failed to create .env file.`);
                    throw error;
                } else {
                    console.log(chalk.green(`Made .env file...`));
                    console.log(chalk.blue(`Initialized the application.`));
                    resolve(`Database created.`);
                }
            }
        );
    });
}