import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreensParamList } from 'actions/types';
import * as helper from 'apis/helper'

type WebScreenNavigationProp = StackNavigationProp<
  ScreensParamList,
  'WebHtmlScreen'
>;
type WebScreenRouteProp = RouteProp<ScreensParamList, 'WebHtmlScreen'>;
interface Props {
  navigation: WebScreenNavigationProp;
  route: WebScreenRouteProp;
}

const scriptToRemoveHeader = `
const meta = document.createElement('meta'); 
meta.setAttribute('content', 'initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); 
meta.setAttribute('name', 'viewport'); 
document.getElementsByTagName('head')[0].appendChild(meta); 
const body = document.body
body.style.padding="0 20"
`;

let loading: boolean = false;

export default function WebHtmlScreen({ navigation, route }: Props) {
  const { uri } = route.params;
  return (
    <WebView
      style={styles.container}
      source={{ html: uri }}
      cacheMode={'LOAD_NO_CACHE'}
      startInLoadingState={loading}
      javaScriptEnabled={true}
      scalesPageToFit={false}
      injectedJavaScript={scriptToRemoveHeader}
      allowFileAccess={true}
      onMessage={event => {
        navigation.setParams({ title: event.nativeEvent.data });
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
