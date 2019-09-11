import { APIGatewayProxyResult } from "aws-lambda";

export const ok = (body: any): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(body),
  };
}

export const bad = (body: any): APIGatewayProxyResult => {
  return {
    statusCode: 400,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(body),
  };
}

export const notfound = (body: any = {}): APIGatewayProxyResult => {
  return {
    statusCode: 404,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(body),
  };
}
