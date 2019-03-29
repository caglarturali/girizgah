// WallpaperSwitcher -> Required by Components/CommandPanel
// --------------------------------------
// Serves to handle wallpaper switching through DOM manipulation.

import cxs from 'cxs';
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import * as FileOperations from 'Logic/FileOperations';
import * as Settings from 'Logic/Settings';

import { defineMessages } from 'react-intl';

// Define messages.
const messages = defineMessages({
  saved: {
    id: 'WallpaperSwitcher.Notification.Saved',
    defaultMessage: 'This wallpaper has been saved as your default background.'
  },
  reset: {
    id: 'WallpaperSwitcher.Notification.Reset',
    defaultMessage: 'Wallpaper reset to default, no changes saved.'
  }
});

const FADEOUT_TIME = 600;

class WallpaperSwitcher extends React.Component {
  constructor(props) {
    super(props);

    let wallpaperDirectory = FileOperations.getWallpaperDirectory();
    let wallpapers = FileOperations.getWallpapers(wallpaperDirectory);

    this.cyclerBackground = undefined;
    this.cyclerForeground = undefined;
    this.cyclerPreloader = undefined;

    this.state = {
      directory: wallpaperDirectory,
      wallpapers: wallpapers,
      selectedWallpaper: undefined,
      savedWallpaper: undefined,
      switcher: {
        active: false,
        currentlyFading: false,
        index: 0
      }
    };
  }

  componentDidMount() {
    // Set background wallpaper
    let directory = this.state.directory;
    let image = Settings.requestSetting('wallpaper', 'wallpaper-01.jpg');
    this.cyclerBackground = document.querySelectorAll(
      '.wallpaper-background'
    )[0];
    this.cyclerForeground = document.querySelectorAll(
      '.wallpaper-foreground'
    )[0];
    this.cyclerPreloader = document.querySelectorAll('.wallpaper-preload')[0];

    this.cyclerForeground.style.background = `url('${directory}${image}')`;
    this.cyclerForeground.style.backgroundPosition = 'center';
    this.cyclerForeground.style.backgroundSize = 'cover';
    document.body.style.background = `url('${directory}${image}')`;
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';

    this.setState({
      savedWallpaper: image
    });
  }

  acceptWallpaper() {
    let selectedWallpaper = this.state.selectedWallpaper;
    let switcher = this.state.switcher;

    // Due diligence.
    Settings.saveSetting('wallpaper', selectedWallpaper);
    window.notifications.generate(
      window.formatMessage(messages.saved),
      'success'
    );

    // Reset switcher state
    switcher.active = false;
    switcher.index = 0;

    this.setState({
      selectedWallpaper: selectedWallpaper,
      savedWallpaper: selectedWallpaper,
      switcher: switcher
    });
  }

  cycleWallpaper() {
    // Prevent animation transitions stacking and causing issues.
    if (this.state.switcher.currentlyFading === true) {
      return false;
    }

    let wallpapers = this.state.wallpapers;
    let switcher = this.state.switcher;

    const nextIndex = index =>
      (index + wallpapers.length + 1) % wallpapers.length;

    let newIndex = nextIndex(switcher.index);
    let newWallpaper = wallpapers[newIndex];

    let preloadedIndex = nextIndex(newIndex);
    let preloadedWallpaper = wallpapers[preloadedIndex];

    this.setWallpaper(newWallpaper, preloadedWallpaper);

    switcher.index = newIndex;

    this.setState({
      switcher: switcher
    });
  }

  handleSwitcherActivation() {
    if (this.state.switcher.active === false) {
      setTimeout(() => {
        let switcher = this.state.switcher;
        switcher.active = true;
        this.cycleWallpaper();

        this.setState({
          switcher: switcher
        });
      }, 100);
    }
  }

  rejectWallpaper() {
    let savedWallpaper = this.state.savedWallpaper;
    let switcher = this.state.switcher;

    // Reset switcher state
    switcher.active = false;
    switcher.index = 0;

    this.setState({
      switcher: switcher
    });

    this.setWallpaper(savedWallpaper);

    window.notifications.generate(window.formatMessage(messages.reset));
  }

  setWallpaper(newWallpaper, preloadedWallpaper = false) {
    let switcher = this.state.switcher;

    // Fadeout foreground wallpaper to new wallpaper
    let directory = this.state.directory;
    this.cyclerBackground.style.background = `url('${directory}${newWallpaper}')`;
    this.cyclerBackground.style.backgroundSize = 'cover';
    this.cyclerForeground.className += ' fadeout';

    switcher.currentlyFading = true;

    if (preloadedWallpaper !== false) {
      // Preload the next image
      this.cyclerPreloader.style.background = `url('${directory}${preloadedWallpaper}')`;
    }

    setTimeout(() => {
      // Cycle new wallpaper back to the front, make it visible again.
      this.cyclerForeground.style.background = `url('${directory}${newWallpaper}')`;
      this.cyclerForeground.style.backgroundSize = 'cover';
      this.cyclerForeground.className = this.cyclerForeground.className.replace(
        ' fadeout',
        ''
      );
      document.body.style.background = `url('${directory}${newWallpaper}')`;
      document.body.style.backgroundSize = 'cover';

      let switcher = this.state.switcher;
      switcher.currentlyFading = false;

      this.setState({
        selectedWallpaper: newWallpaper,
        switcher: switcher
      });
    }, FADEOUT_TIME);
  }

  setBackgroundBlur() {
    if (
      this.cyclerForeground === undefined ||
      this.cyclerBackground === undefined
    ) {
      return;
    }

    this.cyclerForeground.style.transition = 'filter 500ms ease';
    this.cyclerBackground.style.transition = 'filter 500ms ease';

    let blurRadius = !this.props.blurRadius.toLowerCase().includes('px')
      ? `${this.props.blurRadius}px`
      : this.props.blurRadius;

    let blurStr = this.props.blurEnabled ? `blur(${blurRadius})` : '';

    this.cyclerForeground.style.filter = blurStr;
    this.cyclerForeground.style.webkitFilter = blurStr;
    this.cyclerForeground.style.mozFilter = blurStr;
    this.cyclerBackground.style.filter = blurStr;
    this.cyclerBackground.style.webkitFilter = blurStr;
    this.cyclerBackground.style.mozFilter = blurStr;
  }

  generateOptions() {
    let classes = ['options'];

    if (this.state.switcher.active === true) {
      classes.push('active');
    }

    return (
      <div className="options-wrapper">
        <div className={classes.join(' ')}>
          <div
            className="button-reject"
            onClick={this.rejectWallpaper.bind(this)}
          >
            ✕
          </div>
          <div
            className="button-accept"
            onClick={this.acceptWallpaper.bind(this)}
          >
            ✓
          </div>
        </div>
      </div>
    );
  }

  render() {
    this.setBackgroundBlur();

    let options = this.generateOptions();

    let style = cxs({
      'background-image': `url(${this.props.distroImage}) !important`
    });

    return (
      <div className="distro-wrapper">
        <div
          className={`distro-logo ${style}`}
          onClick={this.handleSwitcherActivation.bind(this)}
        />
        {options}
      </div>
    );
  }
}

WallpaperSwitcher.propTypes = {
  distroImage: PropTypes.string,
  blurEnabled: PropTypes.bool.isRequired,
  blurRadius: PropTypes.string.isRequired
};

export default connect(
  state => {
    return {
      distroImage: state.settings.distro,
      blurEnabled: state.settings.background_blur_enabled,
      blurRadius: state.settings.background_blur_radius
    };
  },
  null
)(WallpaperSwitcher);
