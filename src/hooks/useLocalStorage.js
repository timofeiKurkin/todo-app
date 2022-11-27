import {useEffect, useState} from "react";

const UseLocalStorage = (key, initialValue) => {
	const getStorageValue = (key, initialValue) => {
		const value = localStorage.getItem(key)
		const parse = JSON.parse(value)
		return parse || initialValue
	}

	const [value, setValue] = useState(() => {
		return getStorageValue(key, initialValue)
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
};

export default UseLocalStorage;