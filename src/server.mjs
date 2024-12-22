import express from 'express';
import dotenv from 'dotenv';
import playSound from 'play-sound';
import { convertTextToSpeech } from './utils/googleTTS.mjs';
import { connectOBS, changeScene, getScenes, disconnectOBS } from './utils/obs.mjs';
import { KAREN_VOICE, SCENES } from './utils/constants.mjs';
import { connectBot, createBotClient, setupEventHandlers } from './utils/twitch.mjs';
import { generateKarenResponse } from './utils/oaiGenerate.mjs';
import { saveAudioToFile } from './utils/elevenlabsUtil.mjs';

const player = playSound();

dotenv.config();

let canReceiveMessage = true;


const app = express(); // Create an Express application

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000; // Use the PORT environment variable or default to 3000

await connectOBS();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const questionAsked = async (prompt) => {
    if (canReceiveMessage) {
        const response = await generateKarenResponse(prompt)
        // await convertTextToSpeech(response, 'response', KAREN_VOICE);
        await saveAudioToFile(response, "./src/mp3/karen_audio.mp3");
        changeScene(SCENES.KAREN_TALKING);
        canReceiveMessage=false;
        player.play('./src/mp3/karen_audio.mp3', { device: 'VB-Cable' }, function (err) {
            if (err) console.log(err);
            changeScene(SCENES.KAREN_STILL);
            canReceiveMessage=true;
            
        });
    }

}
await changeScene(SCENES.KAREN_STILL);
const client = createBotClient(['esburchd'])
connectBot(client)
setupEventHandlers(client, questionAsked)

