const logger = {
  info: jest.fn(),
  error: jest.fn(),
  http: jest.fn(),
};

import winstonInstance from "winston";

jest.mock("winston", () => ({
  addColors: jest.fn(),
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    colorize: jest.fn(),
    json: jest.fn(),
  },
  createLogger: jest.fn().mockReturnValue(logger),
  transports: {
    Console: jest.fn(),
    File: jest.fn(),
  },
}));

let winston: typeof winstonInstance;

describe("Logger", () => {
  beforeEach(() => {
    jest.unmock("../../constants");
    jest.resetModules();
    winston = require("winston");
  });

  it("formats to JSON ", () => {
    const logger = require("./logger").default;
    logger.info("Testing the logger");

    expect(winston.format.json).toHaveBeenCalled();
  });

  describe("when the NODE_ENV is not development", () => {
    it("creates the logger with the warn level", () => {
      jest.mock("../../constants", () => ({
        isDevelopment: false,
      }));

      const createLoggerMock = jest.spyOn(winston, "createLogger");
      const logger = require("./logger").default;
      logger.info("Testing the logger");

      expect(createLoggerMock).toHaveBeenCalledWith(
        expect.objectContaining({ level: "warn" })
      );
    });
  });

  describe("when the NODE_ENV is development", () => {
    it("creates the logger with the debug level", () => {
      jest.mock("../../constants", () => ({
        isDevelopment: true,
      }));

      const createLoggerMock = jest.spyOn(winston, "createLogger");
      const logger = require("./logger").default;
      logger.info("Testing the logger");

      expect(createLoggerMock).toHaveBeenCalledWith(
        expect.objectContaining({ level: "debug" })
      );
    });
  });

  describe("when the NODE_ENV is not set", () => {
    it("creates the logger with the debug level", () => {
      jest.mock("../../constants", () => ({
        isDevelopment: true,
      }));

      const createLoggerMock = jest.spyOn(winston, "createLogger");
      const logger = require("./logger").default;
      logger.info("Testing the logger");

      expect(createLoggerMock).toHaveBeenCalledWith(
        expect.objectContaining({ level: "debug" })
      );
    });
  });

  describe("when the level is http", () => {
    it("logs to the http.log file", () => {
      const logger = require("./logger").default;
      logger.http("Testing the logger");

      expect(winston.transports.File).toHaveBeenCalledWith({
        filename: "logs/http.log",
        level: "http",
      });
    });
  });
});
