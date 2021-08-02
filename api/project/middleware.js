const Projects = require("./model");

//id validator:
const validateId = async (req, res, next) => {
	const { id } = req.params;
	const project = await Projects.getById(id);
	if (!project) {
		res.status(404).json({ message: "project with that id not found" });
	} else {
		req.project = project;
		next();
	}
};

//body validator
const validateBody = async (req, res, next) => {
	const body = req.body;

	if (!body || Object.keys(body).length === 0) {
		res.status(400).json({ message: "missing required text fields" });
	} else if (!body.project_name) {
		res.status(400).json({ message: "project name required" });
	} else {
		req.body.project_name = body.project_name.trim();
		req.body.project_description &&
			(req.body.project_description = body.project_description.trim());
		next();
	}
};

module.exports = {
	validateId,
	validateBody,
};
