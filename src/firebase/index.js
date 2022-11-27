import {collection, doc, getFirestore, onSnapshot, orderBy, query} from "firebase/firestore";
import {initializeApp} from "firebase/app";

const app = initializeApp({
	apiKey: "AIzaSyDvZ3NvI3MvA08KT43FlwAB5qz-lLqcmls",
	authDomain: "ultimate-vigil-327205.firebaseapp.com",
	projectId: "ultimate-vigil-327205",
	storageBucket: "ultimate-vigil-327205.appspot.com",
	messagingSenderId: "505271017967",
	appId: "1:505271017967:web:58437570851036c567161a",
	measurementId: "G-KSB7DRSDB6"
})

export const db = getFirestore(app);
export const TODOS_PATH = "todos"
export const todosCollectionRef = collection(db, TODOS_PATH)
const todosCollectionQuery = query(todosCollectionRef, orderBy("id", "desc"))

export const getData = (setItems, setLoading, toDay) => {
	onSnapshot(todosCollectionQuery, (data) => {
		const todoArray = []
		data.forEach((dataItem) => {
			const dataInfo = dataItem.data()
			const todo = {
				id: dataInfo.id,
				idItem: dataItem.id,
				title: dataInfo.title,
				description: dataInfo.description,
				dateComplete: dataInfo.dateComplete,
				completeStatus: (dataInfo.dateComplete <= toDay) ? !dataInfo.completeStatus : dataInfo.completeStatus
			}
			todoArray.push(todo)
		})
		setItems(todoArray)
		setLoading(false)
	})
}

export const getOneData = (itemId, setSelectToDo) => {
	onSnapshot(doc(db, TODOS_PATH, itemId), (doc) => {
		setSelectToDo([doc.data()])
	});
}