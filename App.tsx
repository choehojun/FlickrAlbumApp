import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import Home from "./components/Home";
import Slide from "./components/Slide";

const AppNavigator = createStackNavigator({
    Home: {screen: Home},
    Slide: {screen: Slide},
  },
  {
    initialRouteName: 'Home'
  }
);

const App = createAppContainer(AppNavigator);

export default App;
