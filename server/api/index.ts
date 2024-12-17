import app from "../src/app";

app.use("/", (req, res) => {
	res.send("Server is running");
});

export default app;