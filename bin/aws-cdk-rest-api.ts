#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { AwsCdkRestApiStack } from '../lib/aws-cdk-rest-api-stack';

const app = new cdk.App();
new AwsCdkRestApiStack(app, 'AwsCdkRestApiStack');
