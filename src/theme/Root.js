import React from 'react';

import useIsBrowser from '@docusaurus/useIsBrowser';

// Default implementation, that you can customize
export default function Root({children}) {

  if (useIsBrowser()) {
    // Enable Umami analytics script in production and disable
    // in dev. environment. Use the umami.disabled key in local storage for doing so
    if (process.env.NODE_ENV === "production") {
      // It's not good enough just to set the key to 0, it needs to be removed
      console.log('Detected production environment, removing umami.disabled from local storage.');
      window.localStorage.removeItem('umami.disabled');
    } else {
      console.log('Detected dev. environment, setting umami.disabled in local storage to "1".');
      window.localStorage.setItem('umami.disabled', '1');
    }
  }

  return <>{children}</>;
}