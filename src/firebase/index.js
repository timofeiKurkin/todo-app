import {collection, doc, getFirestore, onSnapshot, orderBy, query} from "firebase/firestore";
import {initializeApp} from "firebase/app";

/**
 * Инициализируем приложения с помощью конфига.
 * @type {FirebaseApp}
 */
const app = initializeApp({
	apiKey: "AIzaSyDvZ3NvI3MvA08KT43FlwAB5qz-lLqcmls",
	authDomain: "ultimate-vigil-327205.firebaseapp.com",
	projectId: "ultimate-vigil-327205",
	storageBucket: "ultimate-vigil-327205.appspot.com",
	messagingSenderId: "505271017967",
	appId: "1:505271017967:web:58437570851036c567161a",
	measurementId: "G-KSB7DRSDB6"
})

/**
 * Переменные для их последующего многоразового использования:
 *
 * Создаем переменную и присваиваем ей хранилище.
 * @type {Firestore}
 */
export const db = getFirestore(app);

/**
 * Переменная с названием коллекции.
 * @type {string}
 */
export const TODOS_PATH = "todos"

/**
 * Переменная с коллекцией.
 */
export const todosCollectionRef = collection(db, TODOS_PATH)

/**
 * Переменная с запросом.
 */
const todosCollectionQuery = query(todosCollectionRef, orderBy("id", "desc"))

/**
 * Функция для получения to-do из бд.
 *
 * @param {function} setItems - Функция для обновления состояния to-do списка.
 * @param {function} setLoading - Обновление состояния загрузки.
 * @param toDay
 */
export const getData = (setItems, setLoading, toDay) => {
	onSnapshot(todosCollectionQuery, (data) => {
		/**
		 * Создаем пустой массив.
		 */
		const todoArray = []

		/**
		 * С помощью метода forEach пробегаемся по data - объект с сервера.
		 */
		data.forEach((dataItem) => {

			/**
			 * Для лучшей читабельности, выводим вызов в отдельную переменную.
			 */
			const dataInfo = dataItem.data()

			/**
			 * Полученные данные записываем в объект todo
			 * @type {{file, dateComplete: (string|*), description: string, completeStatus: (boolean|*), id: number, title: string, idItem: string}}
			 */
			const todo = {
				id: dataInfo.id,
				idItem: dataItem.id,
				title: dataInfo.title,
				description: dataInfo.description,
				file: dataInfo.file,
				dateComplete: dataInfo.dateComplete,
				completeStatus: dataInfo.completeStatus
			}

			/**
			 * Далее записанный объект пушим в массив.
			 */
			todoArray.push(todo)
		})

		/**
		 * Массив с нашими to-do с сервера помещаем в состояние items.
		 */
		setItems(todoArray)

		/**
		 * После записи, меням состояние загрузки на false, это означает что запрос выполнен, данные получены и записаны.
		 */
		setLoading(false)
	})
}

/**
 * Получение определенного to-do по itemId. Получаем и записываем в selectToDo - состояние хранящее открытый to-do. Таким образом мы обновляем его.
 * @param {string} itemId
 * @param {function} setSelectToDo
 */
export const getOneData = (itemId, setSelectToDo) => {
	onSnapshot(doc(db, TODOS_PATH, itemId), (doc) => {
		setSelectToDo([doc.data()])
	});
}