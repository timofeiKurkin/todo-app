import React from 'react';

const UploadFile = ({setSelectedFile, selectedFileStatus, setSelectedFileStatus}) => {
	const handleChange = (e) => {
		setSelectedFile(e.target.files)
		if(setSelectedFileStatus) {
			setSelectedFileStatus(!selectedFileStatus)
		}
	}

	return (
		<input type="file"
			   onChange={handleChange}
		/>
	);
};

export default UploadFile;