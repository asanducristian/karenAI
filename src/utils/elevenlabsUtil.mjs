import { ElevenLabsClient } from "elevenlabs";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!ELEVENLABS_API_KEY) {
  throw new Error("Missing ELEVENLABS_API_KEY in environment variables");
}

const client = new ElevenLabsClient({
  apiKey: ELEVENLABS_API_KEY,
});

/**
 * Generates an audio stream from the given text.
 * @param {string} text - The text to be converted to speech.
 * @returns {Promise<Buffer>} - The audio content as a Buffer.
 */
const createAudioStreamFromText = async (text) => {
  try {
    const audioStream = await client.generate({
      voice: "Rachel",
      model_id: "eleven_turbo_v2",
      text,
    });

    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    const content = Buffer.concat(chunks);
    return content;
  } catch (error) {
    console.error("Error generating audio:", error);
    throw error;
  }
};

/**
 * Saves the generated audio stream to a file.
 * @param {string} text - The text to be converted to speech.
 * @param {string} filename - The name of the file to save the audio to.
 * @returns {Promise<void>}
 */
const saveAudioToFile = async (text, filename) => {
  try {
    const audioBuffer = await createAudioStreamFromText(text);
    fs.writeFileSync(filename, audioBuffer);
    console.log(`Audio saved as ${filename}`);
  } catch (error) {
    console.error("Error saving audio to file:", error);
  }
};

// Export the functions as named exports
export { createAudioStreamFromText, saveAudioToFile };
