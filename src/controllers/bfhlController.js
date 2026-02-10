const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getFibonacci, getPrimes, getHCF, getLCM } = require('../utils/mathHelpers');
require('dotenv').config();
const OFFICIAL_EMAIL = "tushar2549.be23@chitkara.edu.in";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// GET /health
const healthCheck = (req, res) => {
    res.status(200).json({
        "is_success": true,
        "official_email": OFFICIAL_EMAIL
    });
};

// POST /bfhl
const handleBfhlRequest = async (req, res) => {
    try {
        // Destructure all possible keys from request body
        const { fibonacci, prime, lcm, hcf, AI } = req.body;
        let data = null;
        let operation = null;

        // Fibonacci Logic
        if (fibonacci !== undefined) {
            const n = parseInt(fibonacci);
            if (isNaN(n)) throw new Error("Invalid input: fibonacci must be a number");
            data = getFibonacci(n);
            operation = "fibonacci";
        }
        // Prime Logic
        else if (prime !== undefined) {
            if (!Array.isArray(prime)) throw new Error("Invalid input: prime must be an array");
            data = getPrimes(prime);
            operation = "prime";
        }
        // LCM Logic
        else if (lcm !== undefined) {
            if (!Array.isArray(lcm)) throw new Error("Invalid input: lcm must be an array");
            data = getLCM(lcm);
            operation = "lcm";
        }
        // HCF Logic
        else if (hcf !== undefined) {
            if (!Array.isArray(hcf)) throw new Error("Invalid input: hcf must be an array");
            data = getHCF(hcf);
            operation = "hcf";
        }
        // AI Logic
        else if (AI !== undefined) {
            if (typeof AI !== 'string') throw new Error("Invalid input: AI must be a string");

            // Strict prompt for single word response
            const prompt = `Answer the following question in exactly one word. No punctuation. Question: ${AI}`;
            const result = await model.generateContent(prompt);
            const response = await result.response;

            // Clean the output to ensure it's just one word
            const text = response.text();
            data = text.trim().split(/\s+/)[0];
            operation = "AI";
        }
        else {
            return res.status(400).json({
                "is_success": false,
                "official_email": OFFICIAL_EMAIL,
                "message": "Invalid request. Provide one of: fibonacci, prime, lcm, hcf, AI"
            });
        }

        // Success Response
        res.status(200).json({
            "is_success": true,
            "official_email": OFFICIAL_EMAIL,
            "data": data
        });

    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({
            "is_success": false,
            "official_email": OFFICIAL_EMAIL,
            "message": error.message || "Internal Server Error"
        });
    }
};

module.exports = { healthCheck, handleBfhlRequest };