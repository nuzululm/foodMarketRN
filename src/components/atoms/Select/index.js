import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Select = ({label, value, onSelectChange}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={value}
          onValueChange={itemValue => onSelectChange(itemValue)}>
          <Picker.Item label="Bandung" value="Bandung" />
          <Picker.Item label="Banyuwangi" value="Banyuwangi" />
          <Picker.Item label="Blitar" value="Blitar" />
          <Picker.Item label="Bogor" value="Bogor" />
          <Picker.Item label="Gresik" value="Gresik" />
          <Picker.Item label="Jakarta" value="Jakarta" />
          <Picker.Item label="Jember" value="Jember" />
          <Picker.Item label="Jogjakarta" value="Jogjakarta" />
          <Picker.Item label="Kediri" value="Kediri" />
          <Picker.Item label="Lamongan" value="Lamongan" />
          <Picker.Item label="Madura" value="Madura" />
          <Picker.Item label="Mojokerto" value="Mojokerto" />
          <Picker.Item label="Sidoarjo" value="Sidoarjo" />
          <Picker.Item label="Solo" value="Solo" />
          <Picker.Item label="Surabaya" value="Surabaya" />
        </Picker>
      </View>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  input: {
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
    paddingHorizontal: 2,
    paddingVertical: 0,
  },
});
