export default function GeneratePassword() {
    return new Promise(async(resolve, reject) => {
        function randomIntFromInterval(min, max) {
            // min and max included
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        const passwordLength = randomIntFromInterval(18, 42);
        let password = "";
        for (let i = 0; i < passwordLength; i++) {
            password =
                password + String.fromCharCode(randomIntFromInterval(33, 122));
        }
        resolve(password);
    });
}
// GeneratePassword().then((data) => console.log(data));
