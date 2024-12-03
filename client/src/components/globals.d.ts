// src/globals.d.ts or client/globals.d.ts
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  