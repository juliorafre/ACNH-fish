import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="container relative max-w-7xl">
      {children}
    </div>
  );
};

export default Container;
