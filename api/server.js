const express = require("express");
const server = express();

const helmet = require("helmet");
const morgan = require("morgan");

const projectsRouter = require("./project/router");
const resourcesRouter = require("./resource/router");
const tasksRouter = require("./task/router");

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

//routers:
server.use("/api/projects", projectsRouter);
server.use("/api/resources", resourcesRouter);
server.use("/api/tasks", tasksRouter);

// root handler
server.get("/", (req, res) => {
	res.send(`<h2> Welcome to my API Homepage! </h2>`);
});

// catch all
server.use("*", (req, res) => {
	res
		.status(404)
		.send(
			`<h2> oops! that place doesn't exist! Read docs for more info. </h2>`,
		);
});

// error handler
server.use((err, req, res, next) => {
	const message = err?.message || "something went wrong in the server";
	const status = err?.status || 500;

	res.status(`${status}`).json({ message, stack: err.stack });
});

module.exports = server;
