// This script is injected into all dynamically served html pages

if (!window.top.location.href.endsWith('games')) {
    fetch('/403')
        .then(res => res.text())
        .then(page => {
            document.documentElement.innerHTML = page;
        });
}