import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { navigate } from 'components/navigationService';
import * as helper from 'apis/helper'
import { ScreensParamList } from 'actions/types';
import { RouteProp, useRoute, useIsFocused } from '@react-navigation/native';
type AboutUsScreenRouteProp = RouteProp<ScreensParamList, 'AboutUsScreen'>;
interface Props { }
interface response {
  id: number,
  language: string,
  rank: number,
  state: number,
  title: string,
  type: number,
  icon: any,
  content: string,
}

function AboutUsScreen({ }: Props) {
  const { t } = useTranslation();
  
  const [aboutDataList ,setAboutDataList] = useState([]);
  const isFocused = useIsFocused(); 
  useEffect(() => {
    if (isFocused) {
      getAboutUsList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  async function getAboutUsList() {
    await helper.get('/sys/about', {}).then((res:any)=>{
      setAboutDataList(res)
    })
  }
  return (
    <View style={styles.backView}>

      <SafeAreaView style={styles.container}>
        <View style={styles.headView}>
          <Image source={require('assets/icon_aboutus_logo.png')} style={styles.iconImage} />
          <Text style={styles.nameLabel}>{t("projectname")}</Text>
        </View>
        <View style={styles.bottomView}>
          {
            aboutDataList.map((item: response, i) => (
              <TouchableOpacity key={item.id} style={styles.itemStyle} onPress={() => navigate('WebScreen', { title: item.title, uri: item.content })}>
                <View style={styles.firstView}>
                  <Image
                    style={styles.LeftImage}
                    source={{uri:item.icon}}
                  />
                  <Text style={styles.nameText}>{item.title}</Text>
                </View >
                <View style={styles.secondView}>
                  <Image
                    style={styles.rightImage}
                    source={require('assets/icon_arrow_right.png')}
                  />
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
      </SafeAreaView>
    </View>

  );
}

const styles = StyleSheet.create({
  backView: {
    flex: 1,
    backgroundColor: '#F2F5F8',
  },
  container: {
    flex: 1,
    backgroundColor: '#efefef',
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
  bottomView: {
    marginTop: 50,
    justifyContent: 'flex-start',
  },
  itemStyle: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    height: 60,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  firstView: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  LeftImage: {
    width: 30,
    height: 30,
  },
  nameText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#394867',
    fontWeight: '500',
  },
  secondView: {
    marginRight: 15,
  },
  rightImage: {
    width: 8,
    height: 20,
  },
});

export default AboutUsScreen;
