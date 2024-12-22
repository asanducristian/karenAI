import OBSWebSocket from 'obs-websocket-js';

const obs = new OBSWebSocket();

// Connect to OBS
export async function connectOBS() {
  try {
    await obs.connect('ws://127.0.0.1:4455', 'STnAK7w0ioyoQabD'); // Replace with your OBS password
    console.log('Connected to OBS!');
  } catch (error) {
    console.error('Failed to connect to OBS:', error);
    throw error;
  }
}

// Change the active scene
export async function changeScene(sceneName) {
  try {
    await obs.call('SetCurrentProgramScene', { sceneName });
    console.log(`Scene changed to: ${sceneName}`);
  } catch (error) {
    console.error(`Failed to change scene to "${sceneName}":`, error);
    throw error;
  }
}

// Fetch available scenes
export async function getScenes() {
  try {
    const { scenes } = await obs.call('GetSceneList');
    return scenes.map(scene => scene.sceneName);
  } catch (error) {
    console.error('Failed to fetch scenes:', error);
    throw error;
  }
}

// Disconnect from OBS
export function disconnectOBS() {
  obs.disconnect();
  console.log('Disconnected from OBS');
}