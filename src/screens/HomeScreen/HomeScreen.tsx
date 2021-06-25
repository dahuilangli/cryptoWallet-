import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import FeedListScreen from 'screens/FeedListScreen/FeedListScreen';
import { navigate } from 'components/navigationService';
import { setGenericPassword, getGenericPassword } from 'helper/keyChain';
interface Props {}

function HomeScreen({}: Props) {
  // for (let index = 0; index < 10; index++) {
  //   setGenericPassword(index.toString(), '密码' + index);
  // }
  getGenericPassword();
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>动态</Text>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => navigate('PostFeedScreen')}
        >
          <Icon name="plus" size={24} />
        </TouchableOpacity>
      </View> */}
      {/* <FeedListScreen /> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postButton: {
    padding: 10,
    position: 'absolute',
    right: '6%',
  },
});
export default HomeScreen;
