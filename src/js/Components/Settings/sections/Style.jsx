import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import ColorPicker from '../inputs/ColorPicker';
import TextField from '../inputs/TextField';
import Checkbox from '../inputs/Checkbox';
import Dropdown from '../inputs/Dropdown';

import { FormattedMessage } from 'react-intl';

export const StyleSection = props => {
  const settings = props.settings;

  return (
    <div className="settings-style">
      <div className="left">
        <ul>
          <h4>
            <FormattedMessage id="Settings.Style.WindowAppearance" defaultMessage="Window Appearance" />
          </h4>
          <hr />
          <TextField
            name={'Border Radius'}
            value={settings.window_border_radius}
            boundFunction={props.settingsSetValue.bind(this, 'window_border_radius')}
            localeContent={<FormattedMessage id="Settings.Style.BorderRadius" defaultMessage="Border Radius" />}
          />
          <TextField
            name={'Font-Size'}
            value={settings.window_font_size}
            boundFunction={props.settingsSetValue.bind(this, 'window_font_size')}
            localeContent={<FormattedMessage id="Settings.Style.FontSize" defaultMessage="Font-Size" />}
          />
          <TextField
            name={'DPI Zoom'}
            value={settings.page_zoom}
            boundFunction={props.settingsSetValue.bind(this, 'page_zoom')}
            localeContent={<FormattedMessage id="Settings.Style.DPIZoom" defaultMessage="DPI Zoom" />}
          />

          <h4>
            <FormattedMessage id="Settings.Style.EyeCandy" defaultMessage="Eye Candy" />
          </h4>
          <hr />

          <Checkbox
            name={'Staggered Animations'}
            value={settings.staggered_animations_enabled}
            boundFunction={props.settingsToggleBinary.bind(this, 'staggered_animations_enabled')}
            localeContent={<FormattedMessage id="Settings.Style.StaggeredAnimations" defaultMessage="Staggered Animations" />}
          />
        </ul>
      </div>
      <div className="right">
        <ul>
          <h4>
            <FormattedMessage id="Settings.Style.CommandPanel" defaultMessage="Command Panel" />
          </h4>
          <hr />
          <Checkbox
            name={'Icons Enabled'}
            value={settings.command_icons_enabled}
            boundFunction={props.settingsToggleBinary.bind(this, 'command_icons_enabled')}
            localeContent={<FormattedMessage id="Settings.Style.IconsEnabled" defaultMessage="Icons Enabled" />}
          />
          <Dropdown
            name={'Text Align'}
            value={settings.command_text_align}
            options={['left', 'center', 'right']}
            boundFunction={props.settingsSetValue.bind(this, 'command_text_align')}
            localeContent={<FormattedMessage id="Settings.Style.TextAlign" defaultMessage="Text Align" />}
          />
          <div className="color-group">
            <ColorPicker
              name={'Background'}
              value={settings.style_command_background_color}
              boundFunction={props.settingsSetValue.bind(this, 'style_command_background_color')}
              localeContent={<FormattedMessage id="Settings.Style.Background" defaultMessage="Background" />}
            />
            <ColorPicker
              name={'Icon Color'}
              value={settings.style_command_icon_color}
              boundFunction={props.settingsSetValue.bind(this, 'style_command_icon_color')}
              localeContent={<FormattedMessage id="Settings.Style.IconColor" defaultMessage="Icon Color" />}
            />
            <ColorPicker
              name={'Text Color'}
              value={settings.style_command_text_color}
              boundFunction={props.settingsSetValue.bind(this, 'style_command_text_color')}
              localeContent={<FormattedMessage id="Settings.Style.TextColor" defaultMessage="Text Color" />}
            />
          </div>

          <h4>
            <FormattedMessage id="Settings.Style.LoginPanel" defaultMessage="Login Panel" />
          </h4>
          <hr />
          <Checkbox
            name={'Border Enabled'}
            value={settings.style_login_border_enabled}
            boundFunction={props.settingsToggleBinary.bind(this, 'style_login_border_enabled')}
            localeContent={<FormattedMessage id="Settings.Style.BorderEnabled" defaultMessage="Border Enabled" />}
          />
          <div className="color-group">
            <ColorPicker
              name={'Border Color'}
              value={settings.style_login_border_color}
              boundFunction={props.settingsSetValue.bind(this, 'style_login_border_color')}
              localeContent={<FormattedMessage id="Settings.Style.BorderColor" defaultMessage="Border Color" />}
            />
            <ColorPicker
              name={'Gradient-Top'}
              value={settings.style_login_gradient_top_color}
              boundFunction={props.settingsSetValue.bind(this, 'style_login_gradient_top_color')}
              localeContent={<FormattedMessage id="Settings.Style.GradientTop" defaultMessage="Gradient-Top" />}
            />
            <ColorPicker
              name={'Gradient-Bottom'}
              value={settings.style_login_gradient_bottom_color}
              boundFunction={props.settingsSetValue.bind(this, 'style_login_gradient_bottom_color')}
              localeContent={<FormattedMessage id="Settings.Style.GradientBottom" defaultMessage="Gradient-Bottom" />}
            />
            <ColorPicker
              name={'Button Color'}
              value={settings.style_login_button_color}
              boundFunction={props.settingsSetValue.bind(this, 'style_login_button_color')}
              localeContent={<FormattedMessage id="Settings.Style.ButtonColor" defaultMessage="Button Color" />}
            />
            <ColorPicker
              name={'Username'}
              value={settings.style_login_username_color}
              boundFunction={props.settingsSetValue.bind(this, 'style_login_username_color')}
              localeContent={<FormattedMessage id="Settings.Style.Username" defaultMessage="Username" />}
            />
          </div>
        </ul>
      </div>
    </div>
  );
};

StyleSection.propTypes = {
  settings: PropTypes.object.isRequired,
  settingsSetValue: PropTypes.func.isRequired,
  settingsToggleBinary: PropTypes.func.isRequired
};

export default connect(
  state => {
    return {
      settings: state.settings
    };
  },
  null
)(StyleSection);
