import React, { ReactElement } from 'react';
import RootSiblings from 'react-native-root-siblings';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ImageSourcePropType,
} from 'react-native';

import {show} from 'components/Dialog'
export function checkEmail(emailText:string){
    console.log(emailText);
    var emailPattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (emailPattern.test(emailText)==false){
      show('请填写正确的邮箱');
    }
  }

export function formatDate(date:any){
    date = new Date(date);
    var y=date.getFullYear();
    var m=date.getMonth()+1;
    var d=date.getDate();
    var h=date.getHours();
    var m1=date.getMinutes();
    m = m<10?("0"+m):m;
    d = d<10?("0"+d):d;
    return y+"-"+m+"-"+d+" "+h+":"+m1;
}
//替换字符串‘*’
export function replaceMoney(moneyString:string){
  var moneyArr = moneyString.split('')
  var replaceresult = '';
  moneyArr.map((x,i) => {
    replaceresult = replaceresult+'*'
  })
  console.log(replaceresult);
  
  return replaceresult;
}