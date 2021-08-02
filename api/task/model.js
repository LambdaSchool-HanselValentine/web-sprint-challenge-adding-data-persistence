// build your `Task` model here
const db = require("../../data/dbConfig");

const mapIntToBool = (tasksArr) => {
	return tasksArr.map((task) => {
		return {
			...task,
			task_completed: task.task_completed === 0 ? false : true,
		};
	});
};

const getAll = async () => {
	const taskList = await db
		.select(
			"task_id",
			"task_description",
			"task_notes",
			"task_completed",
			"project_name",
			"project_description",
		)
		.from("tasks as t")
		.join("projects as p", "t.project_id", "p.project_id");

	const presentation = await mapIntToBool(taskList);
	return presentation;
};

const getById = async (id) => {
	// const task = await db("tasks as t")
	// 	.join("projects as p", "t.project_id", "p.project_id")
	// 	.select(
	// 		"task_id",
	// 		"task_description",
	// 		"task_notes",
	// 		"task_completed",
	//		"project_name",
	// 		"project_description",
	// 	)
	// 	.orderBy("task_id")
	// 	.where("task_id", id)
	// 	.first();
	//Works the same as bottom ???

	const task = await db
		.select(
			"task_id",
			"task_description",
			"task_notes",
			"task_completed",
			"project_name",
			"project_description",
		)
		.from("tasks as t")
		.join("projects as p", "t.project_id", "p.project_id")
		.where("task_id", id);

	const presentation = await mapIntToBool(task);
	return presentation;
};

const create = async (task) => {
	const [id] = await db("tasks").insert(task);
	const newlyCreatedTask = await getById(id);
	return newlyCreatedTask;
};

const update = async (id, task) => {
	const idOfUpdatedTask = await db("tasks").where("task_id", id).update(task);
	const updatedTask = await getById(id);
	return updatedTask;
};

const remove = async (id) => {
	const toBeRemoved = await getById(id);
	const idOfRemovedTask = await db("tasks").where("task_id", id).del();
	return toBeRemoved;
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
