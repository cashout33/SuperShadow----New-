const load = () => {
    return new Promise((resolve, reject) => {
        const uvBundle = document.createElement('script');
        uvBundle.src = '/uv/uv.bundle.js';
        document.body.appendChild(uvBundle);

        uvBundle.onload = () => {
            const uvConfig = document.createElement('script');
            uvConfig.src = '/uv/uv.config.js';
            document.body.appendChild(uvConfig);

            resolve();
        }
    });
}

const registerSW = () => {
    load().then(() => {
        navigator.serviceWorker.getRegistrations().then(async registrations => {
            var swExists = false;

            registrations.forEach(sw => {
                if (sw.active.scriptURL.includes('/uv/sw.js')) {
                    swExists = true;
                }
            });

            if (!swExists) {
                if (location.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(location.hostname)) {
                    new Error('Service workers cannot be registered without https.');
                }

                if (!navigator.serviceWorker) {
                    new Error(`Your browser doesn't support service workers.`);
                }

                await navigator.serviceWorker.register('/uv/sw.js', {
                    scope: '/uv/service/'
                });
            }
        });
    });
}

export default { registerSW, load };