// build your `Resource` model here
const db = require("../../data/dbConfig");

const getAll = async () => {
	// const resources = await db.select("*").from("resources");
	const resources = await db("resources");

	return resources;
};

const getById = async (id) => {
	const resource = await db("resources").where("resource_id", id).first();
	return resource;
};

const create = async (resource) => {
	const [id] = await db("resources").insert(resource);
	const newlyCreatedResource = await getById(id);
	return newlyCreatedResource;
};

const update = async (id, resource) => {
	const idOfUpdatedProject = await db("resources")
		.where("resource_id", id)
		.update(resource);

	const updatedResource = await getById(id);
	return updatedResource;
};

const remove = async (id) => {
	const toBeRemoved = await getById(id);
	const idOfRemovedResource = await db("resources")
		.where("resource_id", id)
		.del();
	return toBeRemoved;
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
};
