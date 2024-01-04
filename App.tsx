import React, {Fragment, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import KeyEvent from 'react-native-keyevent';

function App(): React.JSX.Element {
  const [text, setText] = useState('');
  const [barcode] = useState<number[]>([]);

  //only capture if numbers
  //end capture if latest entry is `\r` and previous character was a number - maybe make it at least 5 numbers to be valid
  //after end capture, search string.

  useEffect(() => {
    KeyEvent.onKeyUpListener((keyEvent: {pressedKey: string}) => {
      // console.log('keyevent', keyEvent);
      console.log(`Key: ${keyEvent.pressedKey}`);
      // console.log(`Characters: ${keyEvent.characters}`);
      // console.log(`onKeyDown keyCode: ${keyEvent.keyCode}`);
      // console.log(`Action: ${keyEvent.action}`);

      const pressedKeyAsNumber = parseInt(keyEvent.pressedKey, 10);

      if (!isNaN(pressedKeyAsNumber)) {
        barcode.push(pressedKeyAsNumber);
        console.log('current array = ', barcode);
      }

      if (keyEvent.pressedKey === '\r') {
        console.log('bingo');
        const barcodeString = barcode.join('');
        console.log('barcode string = ', barcodeString);
        barcode.length = 0;
      }

      return () => {
        KeyEvent.removeKeyUpListener();
      };
    });
  }, [barcode]);

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
