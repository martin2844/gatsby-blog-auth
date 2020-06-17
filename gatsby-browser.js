import React from 'react';
import GlobalContextProvider from './src/config/context.js';
require("./src/templates/prism.css");

export const wrapRootElement = ({ element }) => {
    return (
      <GlobalContextProvider>
        {element}
        </GlobalContextProvider>
    )
  }