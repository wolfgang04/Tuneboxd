import app from "./app";
import { PORT } from "./constants";

app.use("/", (req, res) => {
	res.send("Server is running");
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
