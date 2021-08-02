// build your `/api/projects` router here
const express = require("express");
const Projects = require("./model");

const Middleware = require("./middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
	Projects.getAll()
		.then((projects) => {
			res.status(200).json(projects);
		})
		.catch(next);
});

router.get("/:id", Middleware.validateId, (req, res, next) => {
	const { id } = req.params;
	Projects.getById(id)
		.then((project) => {
			res.status(200).json(project);
		})
		.catch(next);
});

router.post("/", Middleware.validateBody, (req, res, next) => {
	const body = req.body;
	Projects.create(body)
		.then((newProj) => {
			res.status(201).json(newProj);
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
		Projects.update(id, body)
			.then((updated) => {
				res.status(200).json(updated);
			})
			.catch(next);
	},
);

router.delete("/:id", Middleware.validateId, (req, res, next) => {
	const { id } = req.params;
	Projects.remove(id)
		.then((removedResource) => {
			res
				.status(200)
				.json({ message: "successfully removed", removed: removedResource });
		})
		.catch(next);
});

//error handler:
router.use((err, req, res, next) => {
	const message = err?.message || "Something went wrong in the Projects router";
	const status = err?.status || 500;
	res.status(`${status}`).json({ message, stack: err.stack });
});

module.exports = router;
