import { StyleSheet } from 'react-native'
import Navigation from './views/Navigation';
import { RestaurantProvider } from './src/components/ContextApp';

const App = () => {

  return (
  
    <RestaurantProvider>
      <Navigation/>
    </RestaurantProvider>
  );
};

const styles = StyleSheet.create({
  btnAdmin: {
    backgroundColor: 'FFF'
  }
})

export default App;
