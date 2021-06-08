import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { navigate } from 'utils/navigationService';

interface Props {}
const list = [
  {
    name: 'STO',
    avatar_url:
      'https://tcs.teambition.net/thumbnail/11262ac182aa38d4ffc7404b9960590d8472/w/200/h/200',
  },
  {
    name: 'ETH',
    avatar_url:
      'https://tcs-ga.teambition.net/thumbnail/1126517802171e140ae13e1185afb2d0347f/w/200/h/200',
  },
];
const SelectWalletScreen = ({}: Props) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}
    >
      <View>
        {list.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => {
              navigate('CreateWalletScreen', { title: list[i]?.name });
            }}
          >
            <Avatar
              rounded
              source={{ uri: l.avatar_url }}
              containerStyle={styles.avatar}
            />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
  },
});

export default SelectWalletScreen;
