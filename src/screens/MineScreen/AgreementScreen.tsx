import React, { useState ,useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Text,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigate } from 'components/navigationService';
import { ListItem , Header} from 'react-native-elements';
import {  SCREENWIDTH } from 'config/constants';
import ActionSheet from 'react-native-action-sheet';
import pickImage from 'components/pickImage';
import { showLoadingModal, closeLoadingModal } from 'components/Dialog';
import * as helper from 'apis/helper'
import {WebView} from 'react-native-webview';
import { User } from 'actions/types';
import { useTranslation } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
interface Props {}
function AgreementScreen({ }: Props) {
  const {t} = useTranslation();
  const [aggrementlistData, setAggrementListData] = useState({});
  const [checkVersion, setCheckVersion] = useState(false);
  const isFocused = useIsFocused();  useEffect(() => {
    if (isFocused) {
      getXieYi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
 
  async function getXieYi(){
    const {data}  = await helper.get('/sys/user/agreement',{})
    setAggrementListData(data)
  }
  var agreeContent = '<p>请查看<a href="https://www.baidu.com" target="_blank">隐私条款</a><br></p>';
  return (
    <SafeAreaView style = {styles.container}>
      {/* <WebView>111111</WebView> */}
    </SafeAreaView>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  
});
export default AgreementScreen;
