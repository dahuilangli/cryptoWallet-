import React, { ReactElement } from 'react';
import RootSiblings from 'react-native-root-siblings';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ImageSourcePropType,
  Linking,
  Image,
  TouchableOpacity
} from 'react-native';
import { navigate } from 'components/navigationService';
import { Card, Button } from 'react-native-elements';
import { WToast } from 'react-native-smart-tip';
import { useTranslation } from 'react-i18next';
import GallerySwiper from 'react-native-gallery-swiper';

interface DialogProps {
  onClose: () => void;
}
export function showDialogFactory<P>(
  Dialog: React.ComponentType<P & DialogProps>,
) {
  let modal: RootSiblings | null;
  return (props: P) => {
    if (modal) {
      return;
    }
    return new Promise((resolve) => {
      const element = (
        <Dialog
          {...props}
          onClose={() => {
            if (modal) {
              modal.destroy();
              modal = null;
            }
            resolve();
          }}
        />
      );
      modal = new RootSiblings(element);
    });
  };
}

export const showUpdateResultDialog = showDialogFactory<
  UpdateResultDialogProps
>(UpdateResultDialog);
interface UpdateResultDialogProps {
  name: string;
  webUri?: string;
  content: ReactElement;
  downloadLink: string;
  icon: any;
}

function UpdateResultDialog({
  name,
  content,
  onClose,
  downloadLink,
  icon,
}: UpdateResultDialogProps & DialogProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.fullScreenModal}>
      <View style={{ width: '80%', backgroundColor: '#FFFFFF', borderRadius: 8 }}>
        <Image style={{ width: '100%', borderRadius: 8 }} source={icon}>

        </Image>
        {content}
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <TouchableOpacity
            style={{...styles.button,backgroundColor: '#FFFFFF',borderColor:'#E9EDF1',borderWidth:0.5}}
            onPress={() => {
              onClose();
            }}
          >
            <Text style={{...styles.test ,color:'#616D86'}}>{t("cancel")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{...styles.button,backgroundColor: '#3B6ED5'}}
            onPress={() => {
              onClose();
              return Linking.openURL(downloadLink);;
            }}
          >
            <Text style={{...styles.test ,color:'#FFFFFF'}}>{t("down")}</Text>
          </TouchableOpacity>
          

        </View>
      </View>
    </View>
  );
}

export const showImageResultDialog = showDialogFactory<ImageResultDialogProps>(
  ImageResultDialog,
);
interface ImageResultDialogProps {
  name: string;
  imageUri: ImageSourcePropType;
  webUri?: string;
  content: ReactElement;
}
function ImageResultDialog({
  name,
  imageUri,
  webUri,
  content,
  onClose,
}: ImageResultDialogProps & DialogProps) {
  return (
    <View style={styles.fullScreenModal}>
      <Card title={name} image={imageUri} containerStyle={{ width: '80%' }}>
        {webUri ? (
          <>
            {content}
            <Button
              onPress={() => {
                onClose();
                return navigate('WebScreen', { uri: webUri });
              }}
              title="查看网页百科"
              containerStyle={{ marginBottom: 10 }}
            />
          </>
        ) : (
          <Text style={{ marginBottom: 10 }}>抱歉，暂时无法识别</Text>
        )}
        <Button onPress={onClose} title="关闭" />
      </Card>
    </View>
  );
}

let loadingModal: RootSiblings | null;
export function showLoadingModal(message?: string) {
  if (loadingModal) {
    return;
  }
  const element = <LoadingModal message={message} />;
  loadingModal = new RootSiblings(element);
}
export function closeLoadingModal() {
  if (loadingModal) {
    loadingModal.destroy();
    loadingModal = null;
  }
}

function LoadingModal({ message }: { message?: string }) {
  return (
    <View style={styles.fullScreenModal}>
      <ActivityIndicator />
      <Text>{message}</Text>
    </View>
  );
}

interface ImageViewerProps {
  imageUrls: ImageSourcePropType[];
}

function ImageViewer({ imageUrls, onClose }: ImageViewerProps & DialogProps) {
  return (
    <View style={styles.fullScreenModal}>
      <GallerySwiper
        images={imageUrls}
        onSingleTapConfirmed={onClose}
        sensitiveScroll={false}
      />
    </View>
  );
}
export const showImageViewer = showDialogFactory<ImageViewerProps>(ImageViewer);



const styles = StyleSheet.create({
  fullScreenModal: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    borderRadius: 8,
    height: 50,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25
  },
  test: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20
  }

});
