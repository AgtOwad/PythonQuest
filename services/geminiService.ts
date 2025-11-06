
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function getHintForCode(code: string, problemDescription: string): Promise<string> {
  if (!API_KEY) {
    return "AI features are disabled. Please configure your API key.";
  }
  try {
    const prompt = `
      You are an expert Python programming tutor integrated into a learning app. 
      A student is working on a coding problem and has asked for a hint.

      Problem Description:
      ---
      ${problemDescription}
      ---
      
      Student's Current Code:
      ---
      ${code}
      ---

      Your task is to provide a helpful, tiered hint. Follow these rules strictly:
      1.  **DO NOT** provide the complete, correct solution.
      2.  **DO NOT** write large blocks of code.
      3.  Start with a gentle nudge or a Socratic question to guide their thinking. For example: "Have you considered what happens if the score is exactly 90?" or "What kind of statement is used to check multiple conditions in order?".
      4.  If the user's code is far off, you can point them to the right concept (e.g., "Remember how 'elif' works for checking sequential conditions.").
      5.  Keep the hint concise and focused on the most likely point of confusion.
      6.  Frame your response as a friendly and encouraging tutor.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching hint from Gemini API:", error);
    return "Sorry, I couldn't generate a hint right now. Please try again later.";
  }
}

export async function explainCodeError(code: string, testResult: string): Promise<string> {
    if (!API_KEY) {
        return "AI features are disabled. Please configure your API key.";
    }
    try {
        const prompt = `
        You are an expert Python programming tutor. A student's code failed a test. 
        Your job is to explain the error in a simple, helpful way without giving away the solution.

        Student's Code:
        ---
        ${code}
        ---

        Test Result / Error:
        ---
        ${testResult}
        ---

        Your task:
        1. Analyze the code and the test result.
        2. Explain what the error message means in plain English. For example, if it's an "AssertionError", explain that the function's output didn't match the expected value.
        3. Point the student towards the part of their code that is likely causing the issue. For instance, "Take a look at your 'if/elif' chain. Does the condition for grade 'D' correctly handle a score of 60?".
        4. DO NOT write the corrected code.
        5. Be encouraging and supportive.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error fetching explanation from Gemini API:", error);
        return "Sorry, I couldn't generate an explanation right now. Please check your code and try again.";
    }
}
