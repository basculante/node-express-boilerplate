import { Request } from "express";
import morgan, { StreamOptions } from "morgan";
import { isProduction } from "../../constants";
import Logger from "../lib/logger";

// HTTP logging using morgan

const stream: StreamOptions = {
  write: (message) => Logger.http(message),
};

const skip = () => isProduction;

const Morgan = morgan(
  (token, req, res) => {
    const { query, variables, operationName } = (req as Request).body;
    return ":method :url :status :res[content-length] - :response-time ms - :req[body]" +
      query
      ? `GRAPHQL: \nOperation Name: ${operationName} \nQuery: ${query} \nVariables: ${JSON.stringify(
          variables
        )}`
      : "";
  },
  { stream, skip }
);

export default Morgan;
