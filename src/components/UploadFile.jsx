import React from 'react';

const UploadFile = ({setSelectedFile}) => {
	// const [uploaded, setUploeded] = useState()

	const handleChange = (e) => {
		setSelectedFile(e.target.files)
	}

	return (
		<input type="file"
			   onChange={handleChange}
		/>
	);
};

export default UploadFile;