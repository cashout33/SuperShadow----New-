import uv from './uv.js';

uv.registerSW();

const load = () => {
    document.querySelector('#search').addEventListener('submit', (e) => {
        e.preventDefault();

        const query = e.target.querySelector('#query').value;

        try {
            location.href = __uv$config.prefix + __uv$config.encodeUrl(new URL(query).toString());
        } catch (e) {
            try {
                const url = new URL(`http://${query}`);
                if (url.hostname.includes('.')) location.href = __uv$config.prefix + __uv$config.encodeUrl(url.toString());
                else throw '';
            } catch (e) {
                location.href = __uv$config.prefix + __uv$config.encodeUrl('https://www.google.com/search?q=%s'.replace('%s', encodeURIComponent(query)));
            }
        }
    });
}

export default { load };