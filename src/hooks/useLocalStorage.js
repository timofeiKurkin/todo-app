import {useEffect, useState} from "react";

/**
 * Хук для записи данных в хранилище, и их чтение.
 * @param {string} key - Ключ для поиска в локальном хранилище браузера.
 * @param {string} initialValue - Начальное значение.
 * @returns {Array} Возвращаем прочитанные данные и функцию.
 * @constructor
 */
const UseLocalStorage = (key, initialValue) => {
	/**
	 * Функция для получения данных из хранилища.
	 * @param {string} key - Ключ для поиска в локальном хранилище браузера.
	 * @param {string} initialValue - Начальное значение.
	 * @returns {any}
	 */
	const getStorageValue = (key, initialValue) => {
		/**
		 * Получаем данные по ключу
		 * @type {string}
		 */
		const value = localStorage.getItem(key)
		/**
		 * Парсим их и возвращаем
		 * @type {any}
		 */
		const parse = JSON.parse(value)
		return parse || initialValue
	}

	/**
	 * Сохраняем данные из функции в состояние.
	 */
	const [value, setValue] = useState(() => {
		return getStorageValue(key, initialValue)
	})

	/**
	 * Записываем данные в хранилище, в массив зависимостей предаем key и value.
	 */
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
};

export default UseLocalStorage;