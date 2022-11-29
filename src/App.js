import "./App.css";
import React, {useContext, useEffect, useState} from "react";
import FormInputs from "./components/FormInputs";
import ListItem from "./components/ListItem";
import OpenItem from "./components/OpenItem";
import dayjs from "dayjs";
import {doc, deleteDoc} from "firebase/firestore";
import {getData, TODOS_PATH} from "./firebase";
import {Context} from "./index";

/**
 * App
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
	/**
	 * Состояние со списком to-do из бд.
	 */
	const [items, setItems] = useState([])

	/**
	 * Состояние с конкретно открытым to-do.
	 */
	const [selectTodo, setSelectToDo] = useState([])

	/**
	 * Состояние загрузки. Отслеживает, загружены ли данные с сервера.
	 */
	const [loading, setLoading] = useState(true)

	/**
	 * Переменная с актуальной датой.
	 * @type {string}
	 */
	const toDay = dayjs().format("YYYY-MM-DD")

	/**
	 * Получаем базу данных из контекста
	 */
	const {db} = useContext(Context)

	/**
	 * Загружаем данные с сервера.
	 */
	useEffect(() => {
		getData(setItems, setLoading, toDay)
	}, [toDay])

	/**
	 * Удаление to-do
	 * @param {{file, dateComplete: (string|*), description: string, completeStatus: (boolean|*), id: number, title: string, idItem: string}} item - Конкретный удаляемый to-do.
	 * @returns {Promise<void>}
	 */
	const removeToDo = async (item) => {
		/**
		 * Переменная с idItem - данный id соответствует, тому что на сервере.
		 * @type {string}
		 */
		const idItem = item.idItem

		/**
		 * Т.к. мы удаляем to-do, то если он открыт, мы должны его визуально убрать, для этого очищаем массив открытых to-do.
		 */
		setSelectToDo([])

		/**
		 * Вызываем функцию для удаления по-конкретному id.
		 */
		await deleteDoc(doc(db, TODOS_PATH, idItem))
	}

	return (
		<div className="App">
			<div className="App__list">
				<FormInputs/>
				<ListItem items={items}
						  remove={removeToDo}
						  loading={loading}
						  setSelectToDo={setSelectToDo}
						  db={db}
				/>
			</div>

			<div className="App__line"></div>

			<div className="App__item">
				<OpenItem props={selectTodo}
						  remove={removeToDo}
						  setSelectToDo={setSelectToDo}
						  db={db}
				/>
			</div>
		</div>
	);
}

export default App;
