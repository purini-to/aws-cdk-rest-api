import dirTree = require("directory-tree");
import cdk = require('@aws-cdk/core');
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';
import { IResource } from "@aws-cdk/aws-apigateway";
import { DirectoryTree } from "directory-tree";

const SOURCE_PATH = 'src/'
const ROUTES_PATH = `${SOURCE_PATH}routes/`;

const routes = dirTree(ROUTES_PATH, { extensions: /.*\.js$/ }).children;

function addRoutes(scope: cdk.Construct, id: string, resource: IResource, routes: DirectoryTree[] | undefined) {
  if (routes && routes.length > 0) {
    routes.forEach(r => {
      if (r.type === 'directory' && r.children) {
        let name = r.name;
        if (r.name.match(/^_/)) {
          name = `{${r.name.replace(/^_/, '')}}`;
        }
        const childResource = resource.addResource(name);
        addRoutes(scope, id, childResource, r.children);
        return;
      }
      const pathName = r.path.replace(ROUTES_PATH, '').replace(/\//g, '-').replace(/\.js$/g, '');
      const handlerPath = r.path.replace(SOURCE_PATH, '').replace(/\.js$/g, '');
      const lambdaParams = {
        functionName: `${id}-${pathName}`,
        runtime: lambda.Runtime.NODEJS_10_X,
        handler: `${handlerPath}.handler`,
        code: lambda.Code.asset('src'),
      };
      const lambdaFunction = new lambda.Function(scope, `${pathName}`, lambdaParams);
      const lambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction, { proxy: true });
      const name = r.name.replace(/\.js$/g, '');
      resource.addMethod(name, lambdaIntegration)
    });
  }
}

export class AwsCdkRestApiStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, 'RestApi', {
      restApiName: `${id}-RestApi`,
    });
    addRoutes(this, id, api.root, routes);
  }
}
