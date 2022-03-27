import input from "input";
import Welcome from "./components/welcome.js";
import Menu from "./components/menu.js";
import GeneratePassword from "./services/generateRandomPassword.js";
import StorePassword from "./services/storePassword.js";
import Encryptor from "./services/encryptor.js";
import CopyText from "./services/copy.js";
import GetSiteNames from "./services/getSiteNames.js";
import AccessSiteData from "./services/accessSiteData.js";
import Decryptor from "./services/decryptor.js";
import chalk from "chalk";
import dotenv from "dotenv";
import process from "process";
import UpdateSiteName from "./services/updateSiteName.js";
import UpdateUrl from "./services/updateUrl.js";
import UpdatePassword from "./services/updatePassword.js";
import InitializeApplication from "./services/initializer.js";
import fs from "fs";
dotenv.config();

async function masterFunction() {
    //Detecting if this is the first time application is getting run...
        if (!fs.existsSync(".env")) {
            // File does not exists
            await InitializeApplication();
        }
    console.clear();
    let userPassword = await input.password(`Enter the master password: `);
    // User authentication through master password
    if (userPassword != process.env.MASTER_PASSWORD) {
        console.log(chalk.red(`INVALID PASSWORD`));
        process.exit();
    }
    console.clear();
    // Figlet fonts
    await Welcome();
    const userInput = await Menu();

    // Declaring variables
    let siteNames, sitesSelected;

    switch (userInput) {
        case `Store password`:
            let siteName = await input.text(`Enter the name of site: `);
            let siteDescription = await input.text(`Any descriptions: `);
            let siteUrl = await input.text(`Site url: `);
            let signedAccount = await input.text(`Enter the account used: `);
            let generateAutoPswd = await input.confirm(
                `Wanna generate auto password? `
            );
            if (generateAutoPswd) {
                let generatedPassword = await GeneratePassword();
                await CopyText(generatedPassword);
                let encryptedPassword = await Encryptor(generatedPassword);
                let jsonData = {
                    siteName: siteName,
                    signedInAccount: signedAccount,
                    siteDescription: siteDescription,
                    siteUrl: siteUrl,
                    autoPassword: generateAutoPswd,
                    encryptedPassword: encryptedPassword,
                    timeStamp: new Date(),
                };
                await StorePassword(jsonData);
                let showPassword = await input.confirm(
                    `Do you want me to show the password?`
                );
                if (showPassword) {
                    console.log(
                        chalk.green(`Password is:  `) +
                            chalk.blue(`${generatedPassword}`)
                    );
                }
            }
            break;
        case `Retrieve password`:
            siteNames = await GetSiteNames();
            sitesSelected = await input.checkboxes(
                `Select the class: `,
                siteNames
            );
            let siteData;
            let decryptedPassword;
            for (let i = 0; i < sitesSelected.length; i++) {
                siteData = await AccessSiteData(sitesSelected[i]);
                decryptedPassword = await Decryptor(siteData.encryptedPassword);
                console.log(
                    chalk.blue(`\nSite name: `),
                    chalk.green(siteData.siteName)
                );
                console.log(
                    chalk.blue(`Signed in account: `),
                    chalk.green(siteData.signedInAccount)
                );
                console.log(
                    chalk.blue(`Site description: `),
                    chalk.green(siteData.siteDescription)
                );
                console.log(
                    chalk.blue(`Site URL: `),
                    chalk.green(siteData.siteUrl)
                );
                console.log(
                    chalk.blue(`Auto password: `),
                    chalk.green(siteData.autoPassword)
                );
                const showPassword = await input.confirm(
                    `Would you like to see the password?`
                );
                if (showPassword) {
                    console.log(
                        chalk.blue(`PASSWORD: `),
                        chalk.green(decryptedPassword)
                    );
                }
                CopyText(decryptedPassword);
            }
            break;
        case `Update the password`:
            siteNames = await GetSiteNames();
            sitesSelected = await input.checkboxes(
                `Select the class: `,
                siteNames
            );
            for (let i = 0; i < sitesSelected.length; i++) {
                let updateThis = await input.checkboxes(
                    `Select the information you wanna update: `,
                    [`Update site name`, `Update url`, `Update password`]
                );
                switch (updateThis) {
                    case `Update site name`:
                        let newSiteName = await input.text(
                            `Enter the new site name: `
                        );
                        await UpdateSiteName(sitesSelected[i], newSiteName);
                        break;
                    case `Update url`:
                        let updatedUrl = await input.text(
                            `Enter the updated URL: `
                        );
                        await UpdateUrl(sitesSelected[i], updatedUrl);
                        break;
                    case `Update password`:
                        let autoPassword = await input.confirm(
                            `Would you like to have password auto generated?`
                        );
                        let newPassword;
                        if (autoPassword) {
                            newPassword = await GeneratePassword();
                        } else {
                            newPassword = await input.text(
                                `Enter the password: `
                            );
                        }
                        await UpdatePassword(sitesSelected[i], newPassword);
                        break;
                }
            }
            break;
        default:
            console.log(chalk.red(`Incorrect option selected.`));
            await masterFunction();
    }
}

masterFunction();
