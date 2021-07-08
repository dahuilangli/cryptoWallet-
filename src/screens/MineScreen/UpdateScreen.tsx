import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Linking ,Image} from 'react-native';
import { navigate } from 'components/navigationService';
import { ScreensParamList, Feed } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { Button } from 'react-native-elements';
import { useTranslation } from 'react-i18next';

type UpdateScreenRouteProp = RouteProp<ScreensParamList, 'UpdateScreen'>;
interface Props { }

let systemVersion = DeviceInfo.getVersion();
let buildVersion = DeviceInfo.getBuildNumber();
function UpdateScreen(props: any) {
  const {t} = useTranslation();
  console.log(props.route.params.item);
  const updateVersion = props.route.params.item.app_ver;
  const updateBuild = props.route.params.item.build_ver;
  const  checkVersion = props.route.params.checkVersion;
  const downlodURL = props.route.params.item.download_url;
  console.log(downlodURL);
  
  
  return (

    <SafeAreaView style={styles.container}>

      <View style={styles.headView}>
        <Image source={require('assets/icon-125-aboutuslogo.png')} style={styles.iconImage} />
        <Text style={styles.nameLabel}>{t("projectname")}</Text>
        <Text style={styles.currentVersion}>{t("currentversion")}</Text>
        <Text style={styles.localVersion}>
          v{systemVersion}({buildVersion})
        </Text>
      </View>
      <View style={styles.bottomView}>
        {checkVersion?<View style = {styles.VersionNumber}>
          <Image style = {styles.Icon} source = {require('assets/icon-125-aboutuslogo.png')}/>
          <Text style = {styles.findText}>{t("newversionfound")}</Text>
          <Text>v{updateVersion}({updateBuild})</Text>
        </View>:null}
        <Button
          title={t("downloadupdate")}
          titleStyle={styles.Tlabel}
          buttonStyle={styles.Tbutton}
          onPress={() =>
            {
              Linking.openURL(downlodURL)
            }}
          disabled={!checkVersion}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    justifyContent: 'space-between',
  },
  headView: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    marginTop: 60,
    width: 125,
    height: 125,
  },
  nameLabel: {
    marginTop: 20,
    alignContent: 'center',
    fontWeight: 'bold',
    color: '#394867',
    fontSize: 24,
    justifyContent: 'center'

  },
  currentVersion: {
    marginTop: 20,
    height: 20,
    color: '#9CA4B3',
    fontSize: 16,
  },
  localVersion: {
    marginTop: 9,
    height: 20,
    color: '#616D86',
    fontSize: 16,
    fontWeight: '400',
  },
  bottomView: {
    // height:189,
    flexDirection: 'column',
    marginHorizontal:20,
  },
  VersionNumber:{
    height:60,
    backgroundColor:'white',
    borderRadius:8,
    justifyContent: 'center',
    flexDirection:'row',
    alignItems:'center',
  },
  Icon:{
    width:24,
    height:24,
  },
  findText:{
    marginHorizontal:8,
    fontSize:14,
    fontWeight:'400',
    color:'#394867',
  },
  newVersion:{
    fontSize:14,
    fontWeight:'400',
    color:'#3B6ED5',
    fontFamily:'CircularPro-Book',
  },
  Tbutton: {
    marginTop:20,
    marginBottom: 54,
    height: 55,
    backgroundColor: '#3B6ED5',
    alignItems: 'center',
    borderRadius: 8,
  },
  Tlabel: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default UpdateScreen;