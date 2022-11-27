import React from 'react';
import '../../styles/ui/CreateTextarea.css'

const CreateTextarea = ({name, value, onBlur, onChange, place}) => {
	return (
		<textarea
			name={name}
			value={value}
			onBlur={onBlur}
			onChange={e => onChange(e)}
			placeholder={place}
			className={'textarea'}
		/>
	);
};

export default CreateTextarea;