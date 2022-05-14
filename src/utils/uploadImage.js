import ReactS3 from "react-s3";
import s3Config from "../config/s3Config.js";
window.Buffer = window.Buffer || require("buffer").Buffer;

const uploadImageToS3 = async (file) => {
	console.log(file);
	try {
		const response = await ReactS3.uploadFile(file, s3Config);
		return response.location;
	} catch (err) {
		console.log("Error occured while uploading to S3: ", err);
		return null;
	}
};

export default uploadImageToS3;
