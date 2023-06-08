import React, {useEffect} from 'react';
import {StatusBar, PermissionsAndroid} from 'react-native';

import Router from './src/navigation/Root';
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports'

import { withAuthenticator } from 'aws-amplify-react-native';

Amplify.configure(config);

const androidPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'DiniMeak App Camera Permission',
        message:
          'DiniMeak App needs access to your Location ' +
          'so you can take awesome ride.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};


function App() {
  useEffect(() => {
    androidPermission();
  }, [])
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Router/>
    </>
  );
}

export default withAuthenticator(App);