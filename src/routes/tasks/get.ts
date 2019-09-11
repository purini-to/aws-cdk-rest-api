import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { tasks } from "../../models/task";
import { ok } from "../../libs/lambda/proxy";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  const ctx = event.requestContext
  const body = {
    resourcePath: ctx.resourcePath,
    method: ctx.httpMethod,
    tasks: tasks,
  };

  return ok(body);
}