import Clipboard from "@react-native-clipboard/clipboard";
import { Image } from "react-native";
import { WToast } from "react-native-smart-tip";



export function show(text: string) {
  const toastOpts = {
    data: text,
    textColor: '#ffffff',
    backgroundColor: '#444444',
    duration: WToast.duration.SHORT, //1.SHORT 2.LONG
    position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
  };

  WToast.show(toastOpts);
};

export const showWithImage = (text: string, imageSource: any) => {
  const toastOpts = {
    data: text,
    textColor: '#ffffff',
    backgroundColor: '#444444',
    duration: WToast.duration.SHORT, //1.SHORT 2.LONG
    position: WToast.position.CENTER, // 1.TOP 2.CENTER 3.BOTTOM
    icon: <Image source={imageSource} style={{ width: 16, height: 16, resizeMode: 'contain' }} />,
  };

  WToast.show(toastOpts);
};

export function subSplit(text: string, start: number, end: number) {
  return text.substr(0, start) + '...' + text.substr(text.length - end, text.length);
}

export function checkEmail(emailText: string) {
  var emailPattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if (emailPattern.test(emailText) == false) {
    show('请填写正确的邮箱');
  }
}

export function formatDate(date: any) {
  date = new Date(date);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  var h = date.getHours();
  var m1 = date.getMinutes();
  m = m < 10 ? ("0" + m) : m;
  d = d < 10 ? ("0" + d) : d;
  return y + "-" + m + "-" + d + " " + h + ":" + m1;
}
//替换字符串‘*’
export function replaceMoney(moneyString: string) {
  var moneyArr = moneyString.split('')
  var replaceresult = '';
  moneyArr.map((x, i) => {
    replaceresult = replaceresult + '*'
  })
  console.log(replaceresult);

  return replaceresult;
}
// 复制
export const copyToClipboard = (content: string, title: string) => {
  Clipboard.setString(content);
  show(title);
};
// 验证网址
export const verifyURL = (text: string) => {
  let a = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(.)+$/
  return a.test(text)
}

// 解析网址
export const parseURL = (text: string) => {
  let a = /(\w+):\/\/([^\/:]+)(:\d*)?([^# ]*)/
  return text.match(a)
}
