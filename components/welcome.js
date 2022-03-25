import chalk from "chalk";
import figlet from "figlet";
export default async function Welcome() {
    // Printing out the figlet text
    let figletPromise = new Promise(async(resolve, reject) => {
        figlet("Pswd Mngr", (err, data) => {
            if (err) {
                reject(`figlet promise failed`);
            }
            console.log(chalk.green(data));
            resolve(`printed`);
        });
    });
    return figletPromise;
}
// module.exports = Welcome;