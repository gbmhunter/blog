import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
// import Highlight from '@site/src/components/Highlight';
import Image from '@site/src/components/Image';
import CircuitJs from '@site/src/components/CircuitJs';
import WarningIsNotes from '@site/src/components/WarningIsNotes';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "<Highlight>" tag to our Highlight component
  // `Highlight` will receive all props that were passed to `<Highlight>` in MDX
  // Highlight,
  Image,
  WarningIsNotes,
  CircuitJs,
};