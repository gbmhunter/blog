import React from 'react';

import styles from './Image.module.css';

export default function Image({children, src, width}) {
  let imgComponent;
  let Src = src;
  // When using require() to import an image, the src will be a string if it's
  // a png, jpg or webp. If it's a svg, it will be a function. In the case of an svg,
  // we have to handle it differently.
  if (typeof src === 'function') {
    imgComponent = (<Src width={width} height="" />);
  } else {
    imgComponent = <a href={src}><img src={src} width={width} /></a>;
  }

  return (
    <figure style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {imgComponent}
      <figcaption className={styles.figcaption} style={{ width: width }}>{children}</figcaption>
    </figure>
  );
}