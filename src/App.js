import "./App.css";
import React, {useContext, useEffect, useState} from "react";
import FormInputs from "./components/FormInputs";
import ListItem from "./components/ListItem";
import OpenItem from "./components/OpenItem";
import dayjs from "dayjs";
import {doc, addDoc, deleteDoc, updateDoc} from "firebase/firestore";
import {getData, getOneData, TODOS_PATH, todosCollectionRef} from "./firebase";
import {Context} from "./index";

function App() {
	const [items, setItems] = useState([])
	const [selectTodo, setSelectToDo] = useState([])
	const [loading, setLoading] = useState(true)
	const toDay = dayjs().format("YYYY-MM-DD")
	const {db} = useContext(Context)

	useEffect(() => {
		getData(setItems, setLoading, toDay)
	}, [])

	const createToDo = async (newTodo) => {
		await addDoc(todosCollectionRef, newTodo)
	}

	const removeToDo = async (item) => {
		const idItem = item.idItem
		setSelectToDo([])
		await deleteDoc(doc(db, TODOS_PATH, idItem))
	}

	const openToDo = (item) => {
		setSelectToDo(items.filter(i => i.idItem === item.idItem))
	}

	const saveEdit = async (editToDo) => {
		const idItem = editToDo.idItem
		let todo = {}
		items.forEach((item) => {
			if ((idItem.indexOf(item.idItem) !== -1)) {
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
		await updateDoc(doc(db, TODOS_PATH, idItem), todo)
		getOneData(idItem, setSelectToDo)
	}

	const completeTask = async (status, e) => {
		const idItem = status.idItem
		let todo = {}
		items.forEach((item) => {
			if ((idItem.indexOf(item.idItem) !== -1)) {
				todo = {
					...item,
					id: -(item.id),
					completeStatus: !e
				}
			}
		})
		await updateDoc(doc(db, TODOS_PATH, idItem), todo)
		getOneData(idItem, setSelectToDo)
	}

	return (
		<div className="App">
			<div className="App__list">
				<FormInputs createToDo={createToDo} toDay={toDay}/>
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
						  toDay={toDay}
				/>
			</div>
		</div>
	);
}

export default App;
