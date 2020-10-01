import React from 'react';
import { PreferencesContext } from '../context/preferencesContext';
import { getTheme } from '../theme/themes';
import { Provider } from 'react-native-paper';
import WebView from 'react-native-webview';
import { ILicense } from '../libref';
import { useIsFocused } from "@react-navigation/native";

type License = {
  licenses: string;
  repository: string;
  licenseUrl: string;
  parents: string;
};

export const DetailedLic = (props: License) => {

  console.log(props.route.params.repository);
  const repo = props.route.params.repository;
  const { themeType } = React.useContext(PreferencesContext);
  const theme = getTheme(themeType);
  const handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }

    console.log({ ...newNavState });
    const { url } = newNavState;
    if (!url) return;

    // handle certain doctypes
    if (url.includes('.pdf')) {
      this.webview.stopLoading();
      // open a modal with the PDF viewer
    }

    // one way to handle a successful form submit is via query strings
    if (url.includes('?message=success')) {
      this.webview.stopLoading();
      // maybe close this view?
    }

    // one way to handle errors is via query string
    if (url.includes('?errors=true')) {
      this.webview.stopLoading();
    }
  };
  const isFocused = useIsFocused();

  if (!isFocused) {
    return null;
  }
  return <WebView
  originWhitelist={['*']}
  source={{ uri:  repo }}
  onNavigationStateChange={handleWebViewNavigationStateChange}
  />
};

