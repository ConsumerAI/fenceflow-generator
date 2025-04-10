
import React from 'react';

// Function to convert an anchor event handler to a button event handler
export const adaptAnchorToButtonHandler = 
  (handler: (e: React.MouseEvent<HTMLAnchorElement>) => void): 
  React.MouseEventHandler<HTMLButtonElement> => {
    return (event: React.MouseEvent<HTMLButtonElement>) => {
      // Create a simulated anchor event that's compatible with the handler
      const simulatedEvent = event as unknown as React.MouseEvent<HTMLAnchorElement>;
      handler(simulatedEvent);
    };
  };
