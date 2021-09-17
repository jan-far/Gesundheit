import React from "react";
import App from "next/app";
import { wrapper } from "../store/store";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

import { FullScreenLoader } from "../components/general/IsLoading";

import { authorizeUser, logout } from "../store/actions/auth";
import { getCurrentUser, validateToken } from "../services/authService";
import { getConsultForms } from "../services/consultService";
import { ConsultForms } from "../store/actions/consult";

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  const [wait, setWait] = React.useState(true);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // Get Consult Forms
    (async () => {
      const forms = await getConsultForms();
      if (forms.success) {
        store.dispatch(ConsultForms(forms.formsData));
      } else {
        store.dispatch(ConsultForms(forms.nullData));
      }
    })();

    const user = getCurrentUser();
    if (user) {
      // Authenticate token
      (async () => {
        // Validate User LocalStorage token
        const getUser = await validateToken();
        if (getUser.success) {
          // IF TOKEN VALID - Authorize user and set up persistence
          store.dispatch(authorizeUser(getUser.user));
          return setWait(false);
        } else {
          // IF TOKEN IS NOT VALID OR HAS EXPIRED - Logout, remove token and clean redux state
          store.dispatch(logout());
          return setWait(false);
        }
      })();
      return setWait(false);
    } else {
      return setWait(false);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Loading...</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <PersistGate persistor={store.__persistor} loading={<FullScreenLoader />}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
    </React.Fragment>
  );
}

export default wrapper.withRedux(MyApp);
