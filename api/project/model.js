const db = require("../../data/dbConfig");

const mapIntToBool = (projArr) => {
	return projArr.map((proj) => {
		return {
			...proj,
			project_completed: proj.project_completed === 0 ? false : true,
		};
	});
};

const getAll = async () => {
	const projects = await db("projects");
	const presentation = mapIntToBool(projects);
	return presentation;
};

const getById = async (id) => {
	const project = await db("projects").where("project_id", id);
	const presentation = mapIntToBool(project);
	return presentation;
};

const create = async (project) => {
	const [id] = await db("projects").insert(project);
	const newlyCreatedProject = await getById(id);
	return newlyCreatedProject;
};

const update = async (id, project) => {
	const idOfUpdatedProject = await db("projects")
		.where("project_id", id)
		.update(project);

	const updatedProject = await getById(id);
	return updatedProject;
};

const remove = async (id) => {
	const toBeRemoved = await getById(id);
	const idOfRemovedProject = await db("projects").where("project_id", id).del();
	return toBeRemoved;
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
