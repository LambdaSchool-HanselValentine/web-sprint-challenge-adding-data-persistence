const Tasks = require("./model");

//id validator:
const validateId = async (req, res, next) => {
	const { id } = req.params;
	const task = await Tasks.getById(id);
	if (!task) {
		res.status(404).json({ message: "task with that id not found" });
	} else {
		req.task = task;
		next();
	}
};

//body
const validateBody = async (req, res, next) => {
	const body = req.body;

	if (!body || Object.keys(body).length === 0) {
		res.status(400).json({ message: "missing required text fields" });
	} else if (!body.task_description) {
		res.status(400).json({ message: "task description required" });
	} else if (!body.project_id) {
		res.status(400).json({ message: "project_id for this task required" });
	} else {
		req.body.task_description = body.task_description.trim();
		req.body.resource_notes &&
			(req.body.resource_notes = body.resource_notes.trim());
		next();
	}
};

module.exports = {
	validateId,
	validateBody,
};
