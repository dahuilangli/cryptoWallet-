import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import QRCode from 'qrcode-generator';
interface Props {
  text: string;
  styl: any;
}
export default ({ text, styl }: Props) => {
  const [base64Img, setBase64Img] = useState('');
  useEffect(() => {
    const typeNumber = 4;
    const errorCorrectionLevel = 'Q';
    const qr = QRCode(typeNumber, errorCorrectionLevel);
    qr.addData(text);
    qr.make();
    setBase64Img(qr.createDataURL(10, 0));
  }, []);
  return base64Img ? (
    <Image source={{ uri: base64Img }} style={styl} resizeMode="contain" />
  ) : null;
};
