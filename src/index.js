import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {db} from './firebase/index'

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Context.Provider value={{
		db
	}}>
		<App/>
	</Context.Provider>
);

