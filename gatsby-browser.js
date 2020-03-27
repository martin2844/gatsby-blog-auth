import React from 'react';
import GlobalContextProvider from './src/config/context.js';

export const wrapRootElement = ({ element }) => {
    return (
      <GlobalContextProvider>
        {element}
        </GlobalContextProvider>
    )
  }