import { defineMessages } from 'react-intl';
import { intl } from '../../modules/IntlGlobalProvider';

// Cumbersome, but required!
let formatMessage;
setTimeout(() => {
  formatMessage = intl.formatMessage;
}, 10);

// Define messages.
const messages = defineMessages({
  greeting: {
    id: 'App.Greeting',
    defaultMessage: 'Hey there!'
  },
  switchWallpapers: {
    id: 'Tip.SwitchWallpapers',
    defaultMessage: 'TIP: Click the logo to switch wallpapers.'
  },
  accessSettings: {
    id: 'Tip.AccessSettings',
    defaultMessage: 'TIP: Access settings by hovering over the bottom left of your screen!'
  }
});

export default class Notifications {
  constructor() {
    this.container = document.querySelectorAll('.notifications-container')[0];

    // Greet user.
    setTimeout(() => {
      this.generate(formatMessage(messages.greeting), 'success');
    }, 100);

    // Only show in debug mode.
    if (window.__debug === true) {
      setTimeout(() => {
        this.generate(formatMessage(messages.switchWallpapers));
      }, 2000);

      setTimeout(() => {
        this.generate(formatMessage(messages.accessSettings));
      }, 5 * 1000);
    }
  }

  generate(message, type) {
    if (type === undefined) {
      type = '';
    }

    let notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
    this.container.appendChild(notification);

    setTimeout(() => {
      notification.className += ' fadeout';
      setTimeout(() => {
        this.container.removeChild(notification);
      }, 500);
    }, 5000);
  }
}
