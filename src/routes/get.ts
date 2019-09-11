import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { ok } from "../libs/lambda/proxy";
const greeting = require('greeting');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  const ctx = event.requestContext
  const body = {
    resourcePath: ctx.resourcePath,
    method: ctx.httpMethod,
    message: greeting.random(),
  };

  return ok(body);
}