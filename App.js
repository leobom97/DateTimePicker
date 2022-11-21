import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from 'react';

export default function App() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false)
  const [text, setText] = useState('Empty')

  const onChange = (event, selectedDate) =>{
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'android');
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = 'Hours: ' + tempDate.getHours + '| Minutes: ' + tempDate.getMinutes();
    setText(fDate + '\n' + fTime)

    console.log(fDate + ' (' + fTime + ' )')
  }

  const showMode = (currentMode) =>{
    setShow(true)
    setMode(currentMode)
  }

  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 20}}>{text}</Text>
      <View style={{margin:20}}>
        <Button title='DatePicker' onPress={()=> showMode('date')}></Button>
      </View>
      <View style={{margin:20}}>
        <Button title='TimePicker' onPress={()=> showMode('time')}></Button>
      </View>

      {show && (
      <DateTimePickerAndroid
      testID = 'dateTimePicker'
      value={date}
      mode={mode}
      is24Hour={true}
      display='default'
      onChange={onChange}
      />)}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
