import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInView from '../../views/user/login/LoginView';
import SignUpView from '../../views/user/signUp/SignUpView';

const RootStack = createNativeStackNavigator();

const LogInScreen = ({ navigation }) => {
  return (
    <LogInView navigation={navigation} />
  );
}

const SignUpScreen = ({ navigation }) => {
  return (
    <SignUpView navigation={navigation} />
  );
}

const UserRoute = () => {
    return (
      <RootStack.Navigator
        screenOptions={{ headerShown: false }}     
      >
              <RootStack.Screen name="LogIn" component={LogInScreen} />
              <RootStack.Screen name="SignUp" component={SignUpScreen} />
      </RootStack.Navigator>
    );
  }
  
  export default UserRoute;