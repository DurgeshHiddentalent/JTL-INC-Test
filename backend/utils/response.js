
const success = (res, data=null, message='Success') => {
	return res.status(200).json({
		status: 200,
		message,
		data,
	});
};

const error = (res, message='Error') => {
	return res.status(400).json({
		status: 400,
		message: message,
		data:null
	});
};

const unAuthorized = (res, message='Unauthorized') => {
	return res.status(401).json({
		status: 401,
		message: message.toString(),
		data:null
	});
};

module.exports = {
	success,
	error,
	unAuthorized
};