import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/StackNavigator';
import { PlaceContext } from './screens/PlaceContext';
import { ModalPortal } from 'react-native-modals';

export default function App() {
  return (
    <>
      <PlaceContext>
        <Navigation />
        <ModalPortal />
      </PlaceContext>
    </>
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
