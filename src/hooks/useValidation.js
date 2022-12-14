import {useEffect, useState} from "react";

/**
 * Хук для валидации принимаемых данных из input.
 * @param {string} value - Значение из инпута, которое вводит пользователь.
 * @param {"isEmpty: true"} validations - Объект с ключом для валидации, проверяет пустое ли поле.
 * @example
 * Можно указывать любые ключи, и валидировать данные так, как от этого требует задача.
 * {isEmpty: true, minLength: 2, maxLength: 15, nameValid: true} - Проверка на пустоту поля, минимальную и максимальную длину полученных данных, а также проверка корректности ввода имени
 *
 * @returns {{isEmpty: boolean, inputValid: boolean, isEmptyError: string}} Возвращает объект данных с состояниями - isEmpty пустое ли поле, inputValid общее состояние валидации инпута, isEmptyError текстовая ошибка о пустом поле. {isEmpty: true/false, inputValid: true/false, isEmptyError: ""/"Поле не может быть пустым"}.
 *
 * @constructor
 */
const UseValidation = (value, validations) => {
	/**
	 * Здесь можно разделить состояния на три группы.
	 * Первая группа с ошибками, где true указывает на присутствие ошибки.
	 */
	const [isEmpty, setEmpty] = useState(true)

	/**
	 * Мы же не можем boolean значение вывести пользователю как ошибка, он ничего не поймет. Для этого есть вторая группа, в которую мы сохраняем ошибки в тексте.
	 */
	const [isEmptyError, setEmptyError] = useState('')

	/**
	 * Третья группа содержит единственное состояние, которое описывает валиден ли наш инпут.
	 */
	const [inputValid, setInputValid] = useState(false)
	
	/**
	 * В useEffect проходимся по объекту validations с указанными ключами валидации.
	 */
	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				/**
				 * Т.к. в объекте isEmpty: true, то данный кейс сработает
				 */
				case "isEmpty":
					/**
					 * Если параметр value не пустой, то состояние isEmpty = false, а isEmptyError = ""
					 */
					if (value) {
						setEmpty(false)
						setEmptyError('')
					}
					/**
					 * В обратном случае, если поле пустое, то состояние isEmpty = true, а сообщение isEmptyError = "Поле не может быть пустым"
					 */
					else {
						setEmpty(true)
						setEmptyError("Поле не может быть пустым")
					}
					break

				default:
					return
			}
		}
	}, [value, validations])

	/**
	 * Обновляем состояние inputValid. В массив зависимостей предаем все ошибки из первой группы.
	 */
	useEffect(() => {
		/**
		 * В условия записываем все наши состояния с ошибками из первой группы, если хоть одно поле истинно, то наш инпут не валиден(
		 */
		if (isEmpty) {
			setInputValid(false)
		}
		/**
		 * В обратном случае, наш инпут валиден
		 */
		else {
			setInputValid(true)
		}
	}, [isEmpty])

	return {
		isEmpty,
		isEmptyError,
		inputValid
	}
};

export default UseValidation;