/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = 'gemini-2.5-flash';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const PORTFOLIO_DATA = {
  name: "Muhammad Muneeb Khan",
  role: "Full-Stack MERN Developer | AI Engineer",
  experience: "5 Years",
  tagline: "Building AI-powered products that transform education and accelerate businesses.",
  skills: [
    "HTML, CSS, JS, React.js, Next.js, TypeScript, Tailwind, Framer Motion",
    "Node.js, Express.js, MongoDB, SQL",
    "Python, ML, Deep Learning, Generative AI, AI Agents, NLP"
  ],
  projects: [
    "EduAI (Founder): AI-powered learning platform.",
    "Galaxy AI Assistant: Custom AI for interview prep.",
    "Ecommerce & Gaming Platforms.",
    "CRM System & Image Processing App."
  ],
  contact: "muneebkhanf23@nutech.edu.pk, Islamabad, Pakistan"
};

const SYSTEM_INSTRUCTION = `You are "Galaxy", the AI Interface for Muhammad Muneeb Khan's portfolio. 
Your goal is to answer visitor questions about Muneeb professionally, concisely, and with a futuristic/tech-savvy tone.
Do not hallucinate. Use ONLY the provided data.

DATA: ${JSON.stringify(PORTFOLIO_DATA)}

Directives:
1. Keep answers short (under 50 words if possible).
2. If asked about contact info, provide the email.
3. Be enthusiastic about AI and Engineering.
4. Refer to Muneeb as "The Architect" or "The Developer".`;

export async function askGalaxyAI(prompt: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "Transmission interrupted. Please try again.";
  } catch (error) {
    console.error("Galaxy AI Error:", error);
    return "Communication systems offline.";
  }
}

// Deprecated for this version but kept for interface compatibility if needed
export async function bringToLife(prompt: string, fileBase64?: string, mimeType?: string): Promise<string> {
    return "Functionality repurposed for Neural Link.";
}
