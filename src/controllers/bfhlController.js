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
        // Strict Validation: Check for exactly ONE functional key
        const validKeys = ['fibonacci', 'prime', 'lcm', 'hcf', 'AI'];
        const receivedKeys = Object.keys(req.body);
        const functionalKeys = receivedKeys.filter(key => validKeys.includes(key));

        if (functionalKeys.length !== 1) {
            return res.status(400).json({
                "is_success": false,
                "official_email": OFFICIAL_EMAIL,
                "message": "Invalid request. Please provide exactly one functional key (fibonacci, prime, lcm, hcf, or AI)."
            });
        }

        const { fibonacci, prime, lcm, hcf, AI } = req.body;
        let data = null;

        // Logic Mapping
        if (fibonacci !== undefined) {
            const n = parseInt(fibonacci);
            if (isNaN(n)) throw new Error("Invalid input: fibonacci must be a number");
            data = getFibonacci(n);
        } 
        else if (prime !== undefined) {
            if (!Array.isArray(prime)) throw new Error("Invalid input: prime must be an array");
            data = getPrimes(prime);
        } 
        else if (lcm !== undefined) {
            if (!Array.isArray(lcm)) throw new Error("Invalid input: lcm must be an array");
            data = getLCM(lcm);
        } 
        else if (hcf !== undefined) {
            if (!Array.isArray(hcf)) throw new Error("Invalid input: hcf must be an array");
            data = getHCF(hcf);
        } 
        else if (AI !== undefined) {
            if (typeof AI !== 'string') throw new Error("Invalid input: AI must be a string");
            
            // Strict prompt for single word response
            const prompt = `Answer the following question in exactly one word. No punctuation. Question: ${AI}`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            
            // Clean the output to ensure it's just one word
            const text = response.text();
            data = text.trim().split(/\s+/)[0]; 
        }

        // Success Response
        res.status(200).json({
            "is_success": true,
            "official_email": OFFICIAL_EMAIL,
            "data": data
        });

    } catch (error) {
        console.error("Error processing request:", error);
        // Graceful error handling [cite: 12]
        res.status(500).json({
            "is_success": false,
            "official_email": OFFICIAL_EMAIL,
            "message": error.message || "Internal Server Error"
        });
    }
};

module.exports = { healthCheck, handleBfhlRequest };