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

export function subSplit(text: string|undefined, start: number, end: number) {
  if (text && text !== " ") {
    return text.substr(0, start) + '...' + text.substr(text.length - end, text.length);
  }
  return null
}

export function checkEmail(emailText: string) {
  var emailPattern = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  if (emailPattern.test(emailText) == false) {
    show('请填写正确的邮箱');
  }
}

export function formatDate(timestamp: any) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());

            let strDate = Y+M+D+h+m+s;
            console.log(strDate) //2020-05-08 17:44:56　
            return strDate;

}
//替换字符串‘*’
export function replaceMoney(moneyString: any) {
  var moneyArr = moneyString.split('')
  var replaceresult = '';
  moneyArr.map((x, i) => {
    replaceresult = replaceresult + '*'
  })
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

// 判断是否是钱包地址
export function checkwalletAdress(walletAdress: string) {
  var emailPattern = /^(0x)?[0-9a-fA-F]{40}$/;
  return emailPattern.test(walletAdress)
}

//判断钱包私钥 
export function checkwalletPrivateKey(PrivateKey: string) {
  var emailPattern = /^(0x)?[0-9a-fA-F]{64}$/;
  return emailPattern.test(PrivateKey)
}