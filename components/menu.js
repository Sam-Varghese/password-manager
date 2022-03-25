import chalk from "chalk";
import input from "input";
export default async function Menu() {
    return new Promise(async(resolve, reject) => {
        let userInput = await input.checkboxes(`Select the task: `, [
            `Store password`,
            `Retrieve password`,
            `Update the password`,
        ]);
        resolve(userInput[0]);
    });
}