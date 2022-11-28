import "./App.css";
import React, {useContext, useEffect, useState} from "react";
import FormInputs from "./components/FormInputs";
import ListItem from "./components/ListItem";
import OpenItem from "./components/OpenItem";
import dayjs from "dayjs";
import {doc, addDoc, deleteDoc, updateDoc} from "firebase/firestore";
import {getData, getOneData, TODOS_PATH, todosCollectionRef} from "./firebase";
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
	 * Функция для создания нового to-do.
	 * @param {{file, dateComplete: (string|*), description: string, completeStatus: (boolean|*), id: number, title: string, idItem: string}} newTodo - Данные из формы для создания нового to-do
	 * @returns {Promise<void>}
	 */
	const createToDo = async (newTodo) => {
		/**
		 * Вызываем функцию для записи нового to-do на сервер.
		 */
		await addDoc(todosCollectionRef, newTodo)
	}

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

	/**
	 * Функция для открытия определенного to-do.
	 * @param {{file, dateComplete: (string|*), description: string, completeStatus: (boolean|*), id: number, title: string, idItem: string}} item
	 */
	const openToDo = (item) => {
		setSelectToDo(items.filter(i => i.idItem === item.idItem))
	}

	/**
	 * Функция для сохранения изменений, совершенных для определенного to-do.
	 * @param {{file, dateComplete: (string|*), description: string, completeStatus: (boolean|*), id: number, title: string, idItem: string}} editToDo
	 * @returns {Promise<void>}
	 */
	const saveEdit = async (editToDo) => {
		/**
		 * Переменная с idItem - данный id соответствует, тому что на сервере.
		 * @type {string}
		 */
		const idItem = editToDo.idItem

		/**
		 * Создаем пустой объект в который запишем изменения.
		 * @type {{}}
		 */
		let todo = {}

		items.forEach((item) => {

			/**
			 * Ищем нужный to-do.
			 */
			if ((idItem.indexOf(item.idItem) !== -1)) {

				/**
				 * И записываем изменения в ранее созданный todo объект
				 * @type {{file, dateComplete: (string|*), description: string, completeStatus: (boolean|*), id: number, title: string, idItem: string}}
				 */
				todo = {
					...item,
					id: item.id,
					title: editToDo.title,
					description: editToDo.description,
					file: editToDo.file,
					dateComplete: editToDo.dateComplete,
					completeStatus: editToDo.completeStatus
				}
			}
		})

		/**
		 * Вызываем функцию для записи изменения определенного to-do по его idItem.
		 */
		await updateDoc(doc(db, TODOS_PATH, idItem), todo)

		/**
		 * Получаем данные определенного to-do, для визуального обновления открытого to-do.
		 */
		getOneData(idItem, setSelectToDo)
	}

	/**
	 * Функция для обозначения выполненного to-do.
	 * @param {{file, dateComplete: (string|*), description, completeStatus: (boolean|*), id, title, idItem}} status - Конкретный объект.
	 * @param {ChangeEvent<HTMLSelectElement>} e - Событие
	 * @returns {Promise<void>}
	 */
	const completeTask = async (status, e) => {
		/**
		 * Переменная с idItem - данный id соответствует, тому что на сервере.
		 * @type {string}
		 */
		const idItem = status.idItem

		/**
		 * Создаем пустой объект в который запишем изменения.
		 * @type {{}}
		 */
		let todo = {}

		items.forEach((item) => {

			/**
			 * Ищем нужный to-do.
			 */
			if ((idItem.indexOf(item.idItem) !== -1)) {

				/**
				 * И обновляем в объекте поле статуса.
				 * @type {{file, dateComplete: (string|*), description, completeStatus: (boolean|*), id, title, idItem}}
				 */
				todo = {
					...item,
					id: item.id,
					completeStatus: !e
				}
			}
		})

		/**
		 * Вызываем функцию для записи изменения определенного to-do по его idItem.
		 */
		await updateDoc(doc(db, TODOS_PATH, idItem), todo)

		/**
		 * Получаем данные определенного to-do, для визуального обновления открытого to-do.
		 */
		getOneData(idItem, setSelectToDo)
	}

	return (
		<div className="App">
			<div className="App__list">
				<FormInputs createToDo={createToDo}/>
				<ListItem items={items}
						  remove={removeToDo}
						  open={openToDo}
						  complete={completeTask}
						  loading={loading}/>
			</div>

			<div className="App__line"></div>

			<div className="App__item">
				<OpenItem props={selectTodo}
						  remove={removeToDo}
						  save={saveEdit}
				/>
			</div>
		</div>
	);
}

export default App;
