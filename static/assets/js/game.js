import uv from './uv.js';

class GameManager {
    constructor() {

    }

    loadGames = () => {
        fetch('/assets/JSON/games.json')
            .then(res => res.json())
            .then(games => {
                games.forEach(game => {
                    const el = document.createElement('div');
                    el.title = game.name;
                    el.classList = 'game';
                    el.innerHTML = `<img src="${game.thumb}"><span>${game.name}</span>`;
                    el.addEventListener('click', (e) => {
                        if (game.proxied === 'true') {
                            uv.registerSW();
                            document.querySelector('.frame').classList.remove('hidden');
                            document.querySelector('#frame').src = __uv$config.prefix + __uv$config.encodeUrl(new URL(game.url).toString());
                        } else {
                            document.querySelector('.frame').classList.remove('hidden');
                            document.querySelector('#frame').src = game.url;
                            document.body.classList.add('noscroll');
                        }

                        document.querySelector('#back').addEventListener('click', () => {
                            document.querySelector('.frame').classList.add('hidden');
                            document.querySelector('#frame').src = '';
                            document.body.classList.remove('noscroll');
                        });
                        
                        document.querySelector('#fullscreen').addEventListener('click', () => {
                            const frame = document.querySelector('#frame');
                            if (frame.requestFullscreen) {
                                frame.requestFullscreen();
                            } else if (frame.mozRequestFullScreen) {
                                frame.mozRequestFullScreen();
                            } else if (frame.webkitRequestFullscreen) {
                                frame.webkitRequestFullscreen();
                            } else if (frame.msRequestFullscreen) {
                                frame.msRequestFullscreen();
                            }
                        });
                    });

                    el.querySelector('img').onerror = (e) => {
                        e.target.src = '/assets/img/placeholder.png';
                    }

                    document.querySelector('.games').appendChild(el);
                });
            })
    }
}

export default new GameManager();
