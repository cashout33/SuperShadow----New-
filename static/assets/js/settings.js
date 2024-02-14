class Settings {
  constructor() {
    let tabData = {};
    const tab = this.get('tab');

    //document.querySelector()

    try {
      tabData = JSON.parse(tab);
    } catch (e) { }

    const settingsDefaultTab = {
      title: 'Settings | IncorHosting'
    };

    const setTitle = (title = '') => {
      document.title = title || settingsDefaultTab.title;
      if (title) {
        tabData.title = title;
      } else {
        delete tabData.title;
      }
      this.set('tab', JSON.stringify(tabData));
    };

    const setFavicon = (url) => {
      const faviconLink = document.querySelector('link[rel="icon"]');

      const img = new Image();
      img.src = url;
      img.onload = () => {
        faviconLink.href = url;
        if (url) {
          tabData.icon = url;
        } else {
          delete tabData.icon;
        }
        this.set('tab', JSON.stringify(tabData));
      };

      img.onerror = () => {
        const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${url}`;
        faviconLink.href = faviconUrl || settingsDefaultTab.icon;
        if (url) {
          tabData.icon = faviconUrl;
        } else {
          delete tabData.icon;
        }
        this.set('tab', JSON.stringify(tabData));
      };
    };


    const resetTab = () => {
      setTitle();
      setFavicon();
      document.getElementById('title').value = '';
      document.getElementById('icon').value = '';
      this.set('tab', JSON.stringify({}));
    };

    if (tabData.title) {
      document.getElementById('title').value = tabData.title;
    }

    if (tabData.icon) {
      document.getElementById('icon').value = tabData.icon;
    }
  }

  set = (name, value) => {
    if (!localStorage.getItem('settings')) {
      localStorage.setItem('settings', JSON.stringify({}));
    } else {
      try {
        JSON.parse(localStorage.getItem('settings'));
      } catch (e) {
        localStorage.setItem('settings', JSON.stringify({}));
      }
    }

    const settings = JSON.parse(localStorage.getItem('settings'));
    settings[name] = value;
    localStorage.setItem('settings', JSON.stringify(settings));
  };

  get = (name) => {
    if (!localStorage.getItem('settings')) {
      localStorage.setItem('settings', JSON.stringify({}));
    } else {
      try {
        JSON.parse(localStorage.getItem('settings'));
      } catch (e) {
        localStorage.setItem('settings', JSON.stringify({}));
      }
    }

    const settings = JSON.parse(localStorage.getItem('settings'));
    return settings[name];
  }

  remove = (name) => {
    if (!localStorage.getItem('settings')) {
      localStorage.setItem('settings', JSON.stringify({}));
    } else {
      try {
        JSON.parse(localStorage.getItem('settings'));
      } catch (e) {
        localStorage.setItem('settings', JSON.stringify({}));
      }
    }

    const settings = JSON.parse(localStorage.getItem('settings'));
    delete settings[name];
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}

const load = () => {
  new Settings()
}

export default { load };