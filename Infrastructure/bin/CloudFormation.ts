import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { ProductsAPIStack } from "@infrastructure/lib/CloudFormations";
import { ENVIRONMENT, SERVICE } from "@infrastructure/configuration";

const app = new App();

new ProductsAPIStack(app, `${ENVIRONMENT}-${SERVICE}API-Stack`, {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});