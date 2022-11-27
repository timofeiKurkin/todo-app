import React from 'react';
import '../styles/ui/CreateInput.css'

const CreateInput = ({name, value, onBlur, onChange, place}) => {
	return (
		<input
			onChange={e => onChange(e)}
			onBlur={onBlur}
			value={value}
			name={name}
			type="text"
			placeholder={place}
			className={'input'}
		/>
	);
};

export default CreateInput;