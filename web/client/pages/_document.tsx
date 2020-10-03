import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="shortcut icon"
            href="/static/favicons/apple-icon-180x180.png"
          />
          <link
            rel="apple-touch-icon"
            href="/static/favicons/apple-icon-180x180.png"
          />
          <link
            rel="shortcut icon"
            href="/static/favicons/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="icon"
            href="/static/favicons/favicon.ico"
            type="image/x-icon"
          />

          <link href="/static/suneditor/suneditor.min.css" rel="stylesheet" />
          <script src="/static/suneditor/suneditor.min.js" />
          <script src="/static/suneditor/ko.js" />

          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=6"
          />
          <meta name="theme-color" content="#305f5d" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="국방프렌즈" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="msapplication-navbutton-color" content="#305f5d" />
          <meta name="msapplication-TileColor" content="#305f5d" />
          <meta name="msapplication-config" content="browserconfig.xml" />
          <meta name="application-name" content="국방프렌즈" />
          <meta name="msapplication-tooltip" content="Tooltip Text" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />

          <meta name="nightmode" content="enable/disable" />
          <meta name="layoutmode" content="fitscreen/standard" />
          <meta name="imagemode" content="force" />
          <meta name="screen-orientation" content="portrait" />
          <meta name="theme-color" content="#305f5d" />
          <meta name="msapplication-navbutton-color" content="#305f5d" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#305f5d"
          />
          <link href="/static/manifest.json" rel="manifest" />

          <link rel="canonical" href="https://friends.kookbang.kr" />
          <meta property="og:type" content="website" />
          <meta property="fb:app_id" content="643839059141513" />

          <meta property="al:ios:url" content="applinks://docs" />
          <meta property="al:ios:app_store_id" content="12345" />
          <meta property="al:ios:app_name" content="App Links" />
          <meta property="al:android:url" content="applinks://docs" />
          <meta property="al:android:app_name" content="App Links" />
          <meta property="al:android:package" content="org.applinks" />
          <meta
            property="al:web:url"
            content="http://applinks.org/documentation"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
