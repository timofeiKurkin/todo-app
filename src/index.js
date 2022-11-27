import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {db} from './firebase/index'

/**
 * Создаю контекст для того, чтобы передавать db из "./firebase/index", во все компоненты.
 * @type {React.Context<null>}
 */
export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Context.Provider value={{
		db
	}}>
		<App/>
	</Context.Provider>
);

