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

async function masterFunction() {
    console.clear();
    await Welcome();
    const userInput = await Menu();
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
            const siteNames = await GetSiteNames();
            const sitesSelected = await input.checkboxes(
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
                console.log(
                    chalk.blue(`PASSWORD: `),
                    chalk.green(decryptedPassword)
                );
                CopyText(decryptedPassword);
            }
            break;
    }
}

masterFunction();
