import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons'

import Search from '../pages/Search';
import Detail from '../pages/Detail';
import Favorites from '../pages/Favorites';

import StackRoutes from "./stack.routes";


export default function Routes(){

    const Tab = createBottomTabNavigator();

    return(
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#121212',

            tabBarStyle:{
                backgroundColor: '#FFF',
                borderTopWidth: 0
            }
        }}>
            <Tab.Screen
                name="StackRoute"
                component={StackRoutes}
                options={{
                    tabBarIcon: ({size, focused}) => {
                        if(focused) {
                            return <Ionicons name="home" color="#000" size={size}/>
                        }

                        return <Ionicons name="home-outline" color='#000' size={size}/>
                    },
                   
                }}
            />

            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarIcon: ({size, focused}) => {
                        if(focused) {
                            return <Ionicons name="heart" color="#FF4141" size={size}/>
                        }

                        return <Ionicons name="heart-outline" color='#000' size={size}/>
                    }
                }}
            />
        </Tab.Navigator>
    )
}