import React, { useState, useEffect } from 'react';
import { AppState, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
interface Props {
  value: string;
  size: number;
  logo?: any;
  logoSize?: number;
}
export default ({ value, size, logo, logoSize }: Props) => {
  return value ? (
    <QRCode
      value={value}
      size={size}
      logoBackgroundColor='transparent'
    />
  ) : null;
};
