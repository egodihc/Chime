import React from 'react';
import { Navigation } from "react-native-navigation";
import App from './App';

import configureStore from './src/store/configureStore';

const store = configureStore();

const reduxComponent = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

Navigation.registerComponent(`Chime`, () => reduxComponent);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: "Chime"
            }
        }
    });
});