import gameManager from './game.js';
import appManager from './apps.js';
import search from './search.js';
import settings from './settings.js';

if (location.pathname == '/games') {
    gameManager.loadGames();
} else if (location.pathname == '/apps') {
    appManager.loadApps();
} else if (location.pathname == '/search') {
    search.load();
}

settings.load();