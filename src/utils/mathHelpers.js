// Fibonacci Series (Input: Integer -> Output: Series)
const getFibonacci = (n) => {
    if (typeof n !== 'number' || n <= 0) return []; 
    if (n === 1) return [0];
    
    let series = [0, 1];
    while (series.length < n) {
        const nextVal = series[series.length - 1] + series[series.length - 2];
        series.push(nextVal);
    }
    return series.slice(0, n); 
};

// Prime Number Checker (Helper for Prime Array)
const isPrime = (num) => {
    if (num <= 1) return false; // 0 and 1 are not prime
    if (num <= 3) return true;  // 2 and 3 are prime

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
};

// Filter array for Primes
const getPrimes = (arr) => {
    if (!Array.isArray(arr)) return [];
    return arr.filter(num => Number.isInteger(num) && isPrime(num));
};

// HCF (GCD) Calculation
const gcd = (a, b) => (!b ? a : gcd(b, a % b));

const getHCF = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr.reduce((acc, curr) => gcd(acc, curr));
};

// LCM Calculation
const lcm = (a, b) => {
    if (a === 0 || b === 0) return 0;
    return Math.abs((a * b) / gcd(a, b));
};

const getLCM = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return arr.reduce((acc, curr) => lcm(acc, curr));
};

module.exports = { getFibonacci, getPrimes, getHCF, getLCM };