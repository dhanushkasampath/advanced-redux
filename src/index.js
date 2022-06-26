import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";

import './index.css';
import App from './App';
import store from './store/index';//this is the file that has combined all slices

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}><App /></Provider>);//with this provider we can utilize redux inside the app
