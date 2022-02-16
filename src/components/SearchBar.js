import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

export default function Searchbar({ value, updateSearch, style, textSearch }) {
  const [query, setQuery] = useState();
  const [error, setError] = useState();
  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <View style={styles.vwSearch}>
          <Image
            style={styles.icSearch}
            source={require('../../assets/ic_search.png')}
          />
        </View>

        <TextInput
          value={value}
          placeholder={textSearch}
          style={styles.textInput}
          onChangeText={(text) => {
            var letters = /^$|^[a-zA-Z._\b ]+$/;
            if (text.length > 12) setError('Query too long.');
            else if (text.match(letters)) {
              setQuery(text);
              updateSearch(text);
              if (error) setError(false);
            } else setError('Please only enter alphabets');
          }}
        />
        {query ? (
          <TouchableOpacity
            onPress={() => updateSearch('')}
            style={styles.vwClear}
          >
            <Image
              style={styles.icClear}
              source={require('../../assets/ic_clear.png')}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.vwClear} />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  txtError: {
    marginTop: '2%',
    width: '89%',
    color: 'red',
  },
  vwClear: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    // backgroundColor: 'green',
    flex: 1,
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icSearch: {
    height: 20,
    width: 20,
  },
  searchContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    flexDirection: 'row',
    borderRadius: 10,
  },
  container: {
    alignItems: 'center',
    padding: 0,
    // borderWidth: 1,
  },
});
