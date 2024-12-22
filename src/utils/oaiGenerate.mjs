import { KAREN_CONTEXT } from "./constants.mjs";
import OpenAI from "openai";


export const generateKarenResponse = async (prompt) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system", content: KAREN_CONTEXT
            },
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    return completion.choices[0].message.content;
}