import uv from './uv.js';

class appsManager {
    constructor() {

    }

    loadApps = () => {
        fetch('/assets/JSON/apps.json')
            .then(res => res.json())
            .then(apps => {
                apps.forEach(app => {
                    const el = document.createElement('div');
                    el.title = app.name;
                    el.classList = 'app';
                    el.innerHTML = `<img src="${app.thumb}"><span>${app.name}</span>`;
                    el.addEventListener('click', async (e) => {
                        if (app.proxied === 'true') {
                            uv.registerSW();
                            document.querySelector('.frame').classList.remove('hidden');
                            document.querySelector('#frame').src = __uv$config.prefix + __uv$config.encodeUrl(new URL(app.url).toString());
                        } else {
                            document.querySelector('.frame').classList.remove('hidden');
                            document.querySelector('#frame').src = app.url;

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
                        e.target.src = '/assets/img/Incor.png';
                    }
                    document.querySelector('.apps').appendChild(el);
                });
            })
    }
}

export default new appsManager();