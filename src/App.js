import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {Loading} from './components';
import store from './redux/store';
import Router from './router';
import {useSelector} from 'react-redux';

/*
  Menggunakan redux berdampingan dengan provider
  tidak dapat secara langsung. Harus direstruktur 
  seperti di bawah membuat sebuah MainApp yang 
  diimplementasi redux, baru dimasukkan di dalam
  Provider
 */

const MainApp = () => {
  //destructuring isLoading
  const {isLoading} = useSelector(state => state.globalReducer);

  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" />
      {isLoading && <Loading />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
