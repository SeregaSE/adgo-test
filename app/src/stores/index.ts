import React from 'react';

import getFilters from './GetFilters';
import statistics from './Statistics';

const storesContext = React.createContext({
  getFilters,
  statistics,
});

const useControllers = () => React.useContext(storesContext);

export default useControllers;
