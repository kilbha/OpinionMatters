import { startGraphqlServer } from "./graphql/server";
import dotenv from "dotenv";

const PORT = process.env.port || 4000;
dotenv.config();

const startApp = async () => {
  const app = await startGraphqlServer();

  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
};

startApp();
