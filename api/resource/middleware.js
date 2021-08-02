const Resources = require("./model");

//id validator:
const validateId = async (req, res, next) => {
	const { id } = req.params;
	const resource = await Resources.getById(id);
	if (!resource) {
		res.status(404).json({ message: "resource with that id not found" });
	} else {
		req.resource = resource;
		next();
	}
};

//body
const validateBody = async (req, res, next) => {
	const body = req.body;

	if (!body || Object.keys(body).length === 0) {
		res.status(400).json({ message: "missing required text fields" });
	} else if (!body.resource_name) {
		res.status(400).json({ message: "resource name required" });
	} else {
		req.body.resource_name = body.resource_name.trim();
		req.body.resource_description &&
			(req.body.resource_description = body.resource_description.trim());
		next();
	}
};

module.exports = {
	validateId,
	validateBody,
};
