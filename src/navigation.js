import {
    createSwitchNavigator,
    createAppContainer,
} from "react-navigation";

import Login from './components/Login'
import Home from './views/Home'

let App = createSwitchNavigator({
    login: Login,
    home: Home
});

export default createAppContainer(App);