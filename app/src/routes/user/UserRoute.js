import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInView from '../../views/user/signIn/signInView';
import SignUpView from '../../views/user/signUp/SignUpView';

const RootStack = createNativeStackNavigator();

const SignInScreen = ({ navigation }) => {
  return (
    <SignInView navigation={navigation} />
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
              <RootStack.Screen name="SignIn" component={SignInScreen} />
              <RootStack.Screen name="SignUp" component={SignUpScreen} />
      </RootStack.Navigator>
    );
  }
  
  export default UserRoute;