{{/* Shortcode for embedded circuitjs circuits in pages/posts:
    Args:
      data: Encoded circuit data as provided by circuitjs when you click the File->Export As URL menu. Data is after the ctz= in the URL.
    */}}
  
import React from 'react';

// import styles from './Image.module.css';

export default function CircuitJs({children, data, width=500, height=500}) {

    {{/* Build a URL to circuitjs from the provided encoded data. We need to make sure to htmlUnescape and safeHTML this later on
        2023-06-05: Had to change hideSidebar=true to hideSidebar=false because for some reason the iframes stopped displaying the circuit correctly */}}
    const url = `https://www.falstad.com/circuit/circuitjs.html?ctz=${data}&hideMenu=true&hideSidebar=false`; 
    const fullPageUrl = `https://www.falstad.com/circuit/circuitjs.html?ctz=${data}`; 

  return (
    <div 
        className="circuitjs-container"
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <iframe src={url} width={width} height={height}></iframe>
    <div>(<a href={fullPageUrl} target="_blank">full page version</a>)</div>
  </div>
  );
}