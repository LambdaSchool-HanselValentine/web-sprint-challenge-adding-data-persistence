// build your `/api/tasks` router here
const express = require("express");
const Tasks = require("./model");

const Middleware = require("./middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
	Tasks.getAll()
		.then((tasks) => {
			res.status(200).json(tasks);
		})
		.catch(next);
});

router.get("/:id", Middleware.validateId, (req, res, next) => {
	const { id } = req.params;
	Tasks.getById(id)
		.then((task) => {
			res.status(200).json(task);
		})
		.catch(next);
});

router.post("/", Middleware.validateBody, (req, res, next) => {
	const body = req.body;
	Tasks.create(body)
		.then((newTask) => {
			res.status(201).json(newTask);
		})
		.catch(next);
});

router.put(
	"/:id",
	Middleware.validateBody,
	Middleware.validateId,
	(req, res, next) => {
		const { id } = req.params;
		const body = req.body;
		Tasks.update(id, body)
			.then((updated) => {
				res.status(200).json(updated);
			})
			.catch(next);
	},
);

router.delete("/:id", Middleware.validateId, (req, res, next) => {
	const { id } = req.params;
	Tasks.remove(id)
		.then((removedTask) => {
			res
				.status(200)
				.json({ message: "successfully removed", removed: removedTask });
		})
		.catch(next);
});

//error handler:
router.use((err, req, res, next) => {
	const message = err?.message || "Something went wrong in the Tasks router";
	const status = err?.status || 500;
	res.status(`${status}`).json({ message, stack: err.stack });
});

module.exports = router;
