const { Scenes } = require("telegraf");
const registrationScene = require("./registration");
const mainMenuScene = require("./mainMenu");
const settingsScene = require("./settings");

function setupScenes() {
  const stage = new Scenes.Stage([
    registrationScene,
    mainMenuScene,
    settingsScene,
  ]);

  return stage;
}

module.exports = {
  setupScenes,
};
