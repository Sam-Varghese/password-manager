export default async function Decryptor(encryptedData) {
    return new Promise(async(resolve, reject) => {
        function listPrimes(max) {
            // Start with an empty list of primes
            var primes = [];
            // Initialize the sieve - each number is prime unless proven otherwise
            var sieve = new Array(max);
            for (var i = 1; i <= max; i++) {
                sieve[i] = true;
            }
            // Now check each number from 2 through max
            for (var p = 2; p <= max; p++) {
                if (sieve[p]) {
                    // p is prime, save it in the output list
                    primes.push(p);
                    // Mark p * 2, p * 3, p * 4, etc. as non-prime
                    for (var t = p * 2; t <= max; t += p) {
                        sieve[t] = false;
                    }
                }
            }
            return primes;
        }
        const primeNumbersArray = listPrimes(encryptedData.length ** 2);
        let encryptedDataArray = encryptedData.split("|");
        let decryptedData = "";
        for (let i = 0; i < encryptedDataArray.length - 1; i++) {
            decryptedData += String.fromCharCode(
                encryptedDataArray[i] / primeNumbersArray[i]
            );
        }
        resolve(decryptedData);
    });
}
