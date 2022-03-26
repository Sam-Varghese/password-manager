import util from "util";
import child_process from "child_process";
import chalk from "chalk";
export default function CopyText(text) {
    return new Promise((resolve, reject) => {
        // Copying password to clipboard
        child_process.spawn("clip").stdin.end(util.inspect(text));
        resolve(`Password copied to clipboard`);
    }).then((data) => {
        console.log(chalk.yellow(`ATTENTION: Please don't forget to remove the start and end single quotes before pasting.`))
        console.log(chalk.green(data));
    });
}