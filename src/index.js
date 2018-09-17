// Include polyfill for any compiled javascript > ES5
import "babel-polyfill";

// Include polyfill for ECMA-402
import "intl";
// Include the locales that you need to support
// You always need English because we use it as our development language
import "intl/locale-data/jsonp/en.js";
// Here are some examples
// If you know the language and the region you need to support
// then you should use the more specific locale data.
// This is because the more specific the locale data,
// the more precise the language convention is.
// The full list can be found in "/node_modules/intl/locale-data/jsonp"
// Japanese
// import "intl/locale-data/jsonp/ja.js";
// Japanese used in Japan
// import "intl/locale-data/jsonp/ja-JP.js";
// Chinese
// But please do NOT use it because
// written Chinese must have an associated script (Hant or Hans)
// import "intl/locale-data/jsonp/zh.js";
// Traditional Chinese
// import "intl/locale-data/jsonp/zh-Hant.js";
// Traditional Chinese used in Hong Kong
import "intl/locale-data/jsonp/zh-Hant-HK.js";
// Traditional Chinese used in Taiwan
// import "intl/locale-data/jsonp/zh-Hant-TW.js";

// Apply global style
import "./global.scss";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import createStore from "./redux/createStore";
import ReduxIntlProvider from "./intl/ReduxIntlProvider";
import { ScrollToTop } from "./router/scroll";
import Demo from "./Demo";
const store = createStore();
const element = (
  <Provider store={store}>
    <ReduxIntlProvider>
      <BrowserRouter>
        <ScrollToTop>
          <Demo />
        </ScrollToTop>
      </BrowserRouter>
    </ReduxIntlProvider>
  </Provider>
);
render(element, document.getElementById("root"));
