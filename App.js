import React from 'react';
import {
  StyleSheet,
  NavigatorIOS,
} from 'react-native';

import Main from './App/Components/Main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Cuisines',
          component: Main,
          barStyle: 'black',
        }}
      />
    );
  }
}
