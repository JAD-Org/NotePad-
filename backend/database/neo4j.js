import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

export default neo4j.driver(
  `neo4j+s://${process.env.NEO4J_HOST}`,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);
