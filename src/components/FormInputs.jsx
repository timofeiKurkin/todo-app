import React, {useState} from "react";
import useInput from "../hooks/useInput";
import CreateInput from "./ui/CreateInput";
import CreateTextarea from "./ui/CreateTextarea";
import Button from "./ui/Button";
import "../styles/FormInput.css"
import UploadFile from "./UploadFile";
import {addDoc} from "firebase/firestore";
import {todosCollectionRef} from "../firebase";

/**
 * Функциональный компонент FormInputs - создает новый to-do. Cодержит инпуты для создания нового to-do.
 * @param {function} createToDo
 * @returns {JSX.Element}
 * @constructor
 */
const FormInputs = () => {

	/**
	 * Превращаем инпуты в управляемые, с помощью указания значений из хуков:
	 */

	/**
	 * @type {{onBlur: React.DOMAttributes.onBlur, isDirty: boolean, onChange: React.DOMAttributes.onChange, isEmpty: boolean, value: *, inputValid: boolean, isEmptyError: string}}
	 */
	const title = useInput("", "title", {isEmpty: true})

	/**
	 * @type {{onBlur: React.DOMAttributes.onBlur, isDirty: boolean, onChange: React.DOMAttributes.onChange, isEmpty: boolean, value: *, inputValid: boolean, isEmptyError: string}}
	 */
	const description = useInput("", "description", {isEmpty: true})

	/**
	 * @type {{onBlur: React.DOMAttributes.onBlur, isDirty: boolean, onChange: React.DOMAttributes.onChange, isEmpty: boolean, value: *, inputValid: boolean, isEmptyError: string}}
	 */
	const date = useInput("", "date", {isEmpty: true})

	/**
	 * Состояние для загрузки файла. По умолчанию пустой объект.
	 */
	const [selectedFile, setSelectedFile] = useState({})

	const statusDate = false

	/**
	 * Функция для очистки хранилища после создания нового to-do.
	 */
	const clearLocalStorage = () => {
		localStorage.clear()
	}

	/**
	 * Функция для создания нового to-do.
	 * @param {{file:  (false | {size, name, id: number, lastModified: any, type}), dateComplete: string, description: string, completeStatus: boolean, id: number, title: string, idItem: string}} newTodo - Данные из формы для создания нового to-do
	 * @returns {Promise<void>}
	 */
	const createToDo = async (newTodo) => {
		/**
		 * Вызываем функцию для записи нового to-do на сервер.
		 */
		await addDoc(todosCollectionRef, newTodo)
	}

	/**
	 * Функция для создания нового to-do.
	 *
	 * @param {ChangeEvent<HTMLSelectElement>} e
	 */
	const handleSubmit = async (e) => {
		e.preventDefault()

		/**
		 * Создаем объект, в который полям присваиваем данный из инпутов, и если пользователь прикрепил файл, то записываем его.
		 *
		 * @type {{file: (false|{size, name, id: number, lastModified: *, type}), dateComplete: *, description: *, completeStatus: boolean, id: number, title: *}}
		 */
		const newToDo = {
			id: Date.now(),
			title: title.value,
			description: description.value,
			file: !!selectedFile.length && {
				id: Date.now(),
				name: selectedFile[0].name,
				size: selectedFile[0].size,
				type: selectedFile[0].type,
				lastModified: selectedFile[0].lastModified,
			},
			dateComplete: date.value,
			completeStatus: statusDate
		}

		/**
		 * Вызываем функцию из App.js и передаем в нее созданный объект newToDo.
		 */
		await createToDo(newToDo)
	}

	return (
		<div className="form">
			<div className="form__title">
				<h1>Создать To-Do...</h1>
			</div>
			<form className="form__body" onSubmit={handleSubmit}>

				<div className="form__inputBody">

					<div className="form__input">
						<CreateInput onChange={title.onChange}
									 onBlur={title.onBlur}
									 value={title.value}
									 name="title"
									 place="Название"
						/>
					</div>

					<div>
						<p>
							Дата выполнения: <input type="date"
								   value={date.value}
								   onChange={e => date.onChange(e)}
							/>
						</p>
					</div>

					<div className="form__textarea">
						<CreateTextarea
							onChange={description.onChange}
							onBlur={description.onBlur}
							value={description.value}
							name="description"
							type="text"
							place="Описание"

						/>
					</div>

					<div>
						<UploadFile setSelectedFile={setSelectedFile}/>
					</div>
				</div>

				<Button
					disabled={!title.inputValid || !description.inputValid || !date.value}
					onClick={e => clearLocalStorage()}
				>Добавить
				</Button>
			</form>
		</div>
	);
};

export default FormInputs;