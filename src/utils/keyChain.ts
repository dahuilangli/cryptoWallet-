import * as Keychain from 'react-native-keychain';
export async function setGenericPassword(username: string, password: string) {
  try {
    console.log('====================================');
    console.log('存储');
    console.log('====================================');
    // Store the credentials
    await Keychain.setGenericPassword(username, password);
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
}
export async function getGenericPassword() {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    console.log('====================================');
    console.log(credentials);
    console.log('====================================');
    if (credentials) {
      console.log(
        'Credentials successfully loaded for user ' + credentials.username,
        credentials.password,
      );
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
}
