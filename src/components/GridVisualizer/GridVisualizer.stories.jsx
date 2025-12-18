import React from 'react';
import GridVisualizer from './GridVisualizer';
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert'
import { parsePlacement } from './parser'

export default {
  title: 'Components/GridVisualizer',
  component: GridVisualizer,
};

const Template = (args) => <GridVisualizer {...args} />;

export const Default = Template.bind({});
Default.args = {
  placement: '1,1 NORTH',
};

export const Corners = Template.bind({});
Corners.args = {
  placement: '4,4 WEST',
};

export const BottomLeftSouth = Template.bind({});
BottomLeftSouth.args = {
  placement: '0,0 SOUTH',
};

export const InvalidInput = Template.bind({});
InvalidInput.args = {
  placement: '5,5 NORTH',
};

export const EastFacing = Template.bind({});
EastFacing.args = {
  placement: '2,3 EAST',
};

export const Interactive = Template.bind({});
Interactive.args = {
  placement: '1,1 NORTH',
};
Interactive.argTypes = {
  placement: { control: 'text' },
};
