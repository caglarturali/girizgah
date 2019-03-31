// CommandList -> Required by CommandPanel
// --------------------------------------
// Displays system commands.

import PropTypes from 'prop-types';
import React from 'react';

import Item from './Item';

export const List = ({ enabledCommands, handleCommand }) => {
  let items = enabledCommands.map(command => (
    <Item
      key={command.command}
      command={command.command}
      handleCommand={handleCommand}
      content={command.content}
    />
  ));

  return <div className="commands-wrapper">{items}</div>;
};

List.propTypes = {
  enabledCommands: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCommand: PropTypes.func.isRequired
};

export default List;
