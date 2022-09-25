import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          src="//unpkg.com/react/umd/react.production.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="//unpkg.com/react-dom/umd/react-dom.production.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="//unpkg.com/babel-standalone"
          strategy="beforeInteractive"
        ></Script>

        <Script src="//unpkg.com/three" strategy="beforeInteractive"></Script>
        <Script
          src="//unpkg.com/three/examples/js/postprocessing/Pass.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="//unpkg.com/three/examples/js/shaders/CopyShader.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="//unpkg.com/three/examples/js/shaders/LuminosityHighPassShader.js"
          strategy="beforeInteractive"
        ></Script>
        <Script
          src="//unpkg.com/three/examples/js/postprocessing/UnrealBloomPass.js"
          strategy="beforeInteractive"
        ></Script>
      </body>
    </Html>
  );
}
