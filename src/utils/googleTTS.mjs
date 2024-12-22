import axios from 'axios';
import fs from 'fs';
import path from 'path';


// Function to convert text to speech
export async function convertTextToSpeech(text, filename, voice, gender="NEUTRAL") {
    const apiKey = process.env.GOOGLE_API_KEY;

    const apiUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
    const __dirname = path.dirname(`${new URL(import.meta.url).pathname}`);

    const requestBody = {
        input: { text: text },
        voice: { languageCode: 'en-US', ssmlGender: gender, name: voice, },
        audioConfig: { audioEncoding: 'MP3' },
    };
    try {
        // Send the request to Google Cloud Text-to-Speech API
        const response = await axios.post(apiUrl, requestBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Get the audio content (base64 encoded)
        console.log(response.data)
        const audioContent = response.data.audioContent;

        // Write the audio content to an MP3 file

        const outputPath = path.join(__dirname, '../mp3',`/${filename}.mp3`);
        fs.writeFileSync(outputPath, Buffer.from(audioContent, 'base64'));
        console.log('Audio content written to file "output.mp3"');
    } catch (error) {
        console.error('Error during Text-to-Speech conversion:', error);
    }
}
