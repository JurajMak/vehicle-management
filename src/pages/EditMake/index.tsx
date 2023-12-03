import React from 'react';
import { useLocation } from 'react-router-dom';

const Make = () => {
  const { state } = useLocation();
  console.log(state, 'brand');
  return <div>Make</div>;
};

export default Make;
