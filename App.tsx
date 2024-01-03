import React, {Fragment, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import KeyEvent from 'react-native-keyevent';

function App(): React.JSX.Element {
  const [text, setText] = React.useState('');

  //only capture if numbers
  //end capture if latest entry is `\r` and previous character was a number - maybe make it at least 5 numbers to be valid
  //after end capture, search string.

  useEffect(() => {
    KeyEvent.onKeyUpListener(keyEvent => {
      console.log('keyevent', keyEvent);
      console.log(`Key: ${keyEvent.pressedKey}`);
      console.log(`Characters: ${keyEvent.characters}`);
      console.log(`onKeyDown keyCode: ${keyEvent.keyCode}`);
      console.log(`Action: ${keyEvent.action}`);

      if (keyEvent.pressedKey === '\r') {
        console.log('bingo');
      }
    });

    return () => {
      KeyEvent.removeKeyUpListener();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Fragment>
        <TouchableOpacity
          onPress={() => console.log('This is an example')}
          style={styles.btn}>
          <Text> Test Button </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={newText => setText(newText)}
          value={text}
        />
      </Fragment>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {},
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {},
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  highlight: {
    fontWeight: '700',
  },
  btn: {
    padding: 10,
    backgroundColor: '#ccc',
    margin: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
