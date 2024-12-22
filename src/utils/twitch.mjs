import tmi from 'tmi.js';

// Initialize the bot client
export const createBotClient = (channels) => {
    return new tmi.Client({
        // identity: {
        //     username,
        //     password: oauthToken,
        // },
        channels: channels,
    });
};

// Connect the bot to Twitch
export const connectBot = async (client) => {
    try {
        await client.connect();
        console.log('Connected to Twitch chat');
    } catch (error) {
        console.error('Connection failed:', error);
    }
};

// Add event listeners to the bot
export const setupEventHandlers = (client, questionAsked) => {
    // Handle incoming messages
    client.on('message', (channel, tags, message, self) => {
        if (self) return; // Ignore bot's own messages
        // console.log(`[${channel}] ${tags['display-name']}: ${message}`);
        questionAsked(`${tags['display-name']}: ${message}`)
    });

    // Handle errors
    client.on('error', (error) => {
        console.error('Error:', error);
    });
};
