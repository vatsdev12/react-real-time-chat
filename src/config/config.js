import firebase from 'firebase/app';
let DB_CONFIG
switch (process.env.REACT_APP_ENV) {
    case "prod" :
    case  "production":
        DB_CONFIG = {
            apiKey: "AIzaSyDkl9bGa-VF7ii7MDZUY7OgvPxEwCNiv0I",
            authDomain: "sport-live-line-6bfdf.firebaseapp.co",
            databaseURL: "https://sport-live-line-6bfdf.firebaseio.com",
            projectId: "sport-live-line-6bfdf",
            storageBucket: "sport-live-line-6bfdf.appspot.com",
            messagingSenderId: "980512681621",
            appId: "1:980512681621:web:c6e93b733f913dc38b759c",
            measurementId: "G-1SG6MVTMHJ"
        }
        break;
    case "stag" :
    case  "staging":
        DB_CONFIG = {
            apiKey: "AIzaSyAhhGASIJma5c8MlgC73NGFFMep8DA6QNY",
            authDomain: "sport-live-line.firebaseapp.com",
            databaseURL: "https://sport-live-line.firebaseio.com",
            projectId: "sport-live-line",
            storageBucket: "sport-live-line.appspot.com",
            messagingSenderId: "997987564784",
            appId: "1:997987564784:web:3f87a8acf307272062d635",
            measurementId: "G-PHWNYVS53W",
    
        }
        break;
    case "dev" :
    case  "development":
        DB_CONFIG = {
            apiKey: "AIzaSyAhhGASIJma5c8MlgC73NGFFMep8DA6QNY",
            authDomain: "sport-live-line.firebaseapp.com",
            databaseURL: "https://sport-live-line.firebaseio.com",
            projectId: "sport-live-line",
            storageBucket: "sport-live-line.appspot.com",
            messagingSenderId: "997987564784",
            appId: "1:997987564784:web:3f87a8acf307272062d635",
            measurementId: "G-PHWNYVS53W",
    
        }
        break;
    case "local" :
    case  "localhost":
        DB_CONFIG = {
            apiKey: "AIzaSyAhhGASIJma5c8MlgC73NGFFMep8DA6QNY",
            authDomain: "sport-live-line.firebaseapp.com",
            databaseURL: "https://sport-live-line.firebaseio.com",
            projectId: "sport-live-line",
            storageBucket: "sport-live-line.appspot.com",
            messagingSenderId: "997987564784",
            appId: "1:997987564784:web:3f87a8acf307272062d635",
            measurementId: "G-PHWNYVS53W",
    
        }
        break;
    default:
        DB_CONFIG = {
            apiKey: "AIzaSyAhhGASIJma5c8MlgC73NGFFMep8DA6QNY",
            authDomain: "sport-live-line.firebaseapp.com",
            databaseURL: "https://sport-live-line.firebaseio.com",
            projectId: "sport-live-line",
            storageBucket: "sport-live-line.appspot.com",
            messagingSenderId: "997987564784",
            appId: "1:997987564784:web:3f87a8acf307272062d635",
            measurementId: "G-PHWNYVS53W",
    
        }
}



export const app = firebase.initializeApp(DB_CONFIG);
