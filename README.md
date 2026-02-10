# Chitkara Qualifier Exam - Backend API

This repository contains the backend API for the **Chitkara Qualifier Exam (10 Feb 2026)**. The API is built using **Node.js, Express.js**, and integrated with **Google Gemini AI**.

## 🚀 Deployment
**Live API URL:** `https://bajaj-qualifier1-v5l9.onrender.com`

---

## 🛠 Tech Stack
* [cite_start]**Runtime:** Node.js [cite: 26]
* [cite_start]**Framework:** Express.js [cite: 29]
* [cite_start]**AI Integration:** Google Gemini (2.5 Flash) 
* [cite_start]**Deployment:** Render [cite: 121]

---

## 📝 API Documentation

### 1. Health Check
* [cite_start]**Endpoint:** `GET /health` [cite: 23]
* **Description:** Verifies if the API is running and returns the official email.
* **Response:**
    ```json
    {
      "is_success": true,
      "official_email": "tushar2549.be23@chitkara.edu.in"
    }
    ```

### 2. Main Logic (BFHL)
* [cite_start]**Endpoint:** `POST /bfhl` [cite: 22]
* **Description:** Handles Fibonacci, Prime, LCM, HCF, and AI logic based on the input key.
* [cite_start]**Constraints:** Requires **exactly one** functional key in the request body. [cite: 32]

#### Supported Keys & Examples:

| Key | Input Type | Description |
| :--- | :--- | :--- |
| `fibonacci` | Integer | [cite_start]Returns the first `n` Fibonacci numbers. [cite: 34] |
| `prime` | Array of Int | [cite_start]Returns only prime numbers from the array. [cite: 34] |
| `lcm` | Array of Int | [cite_start]Returns the LCM of the array. [cite: 34] |
| `hcf` | Array of Int | [cite_start]Returns the HCF (GCD) of the array. [cite: 34] |
| `AI` | String | [cite_start]Returns a single-word answer from Gemini AI. [cite: 34] |

#### Example Request (Fibonacci):
```json
{
  "fibonacci": 7
}