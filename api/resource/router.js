// build your `/api/resources` router here
const express = require("express");
const Resources = require("./model");

const Middleware = require("./middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
	Resources.getAll()
		.then((resources) => {
			res.status(200).json(resources);
		})
		.catch(next);
});

router.get("/:id", Middleware.validateId, (req, res, next) => {
	const { id } = req.params;
	Resources.getById(id)
		.then((resource) => {
			res.status(200).json(resource);
		})
		.catch(next);
});

router.post("/", Middleware.validateBody, (req, res, next) => {
	const body = req.body;
	Resources.create(body)
		.then((newResource) => {
			res.status(201).json(newResource);
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
		Resources.update(id, body)
			.then((updated) => {
				res.status(200).json(updated);
			})
			.catch(next);
	},
);

router.delete("/:id", Middleware.validateId, (req, res, next) => {
	const { id } = req.params;
	Resources.remove(id)
		.then((removedResource) => {
			res
				.status(200)
				.json({ message: "successfully removed", removed: removedResource });
		})
		.catch(next);
});

//error handler:
router.use((err, req, res, next) => {
	const message =
		err?.message || "Something went wrong in the Resources router";
	const status = err?.status || 500;
	res.status(`${status}`).json({ message, stack: err.stack });
});

module.exports = router;
