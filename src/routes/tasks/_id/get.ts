import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import { tasks } from "../../../models/task";
import { ok, bad, notfound } from "../../../libs/lambda/proxy";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, _context) => {
  if (!event.pathParameters) {
    return bad({
      message: 'required path variables id',
    })
  }

  const {id} = event.pathParameters;
  const task = tasks.find(t => t.id === Number(id));
  if (!task) {
    return notfound();
  }

  const ctx = event.requestContext
  const body = {
    resourcePath: ctx.resourcePath,
    method: ctx.httpMethod,
    task: task,
  };

  return ok(body);
}