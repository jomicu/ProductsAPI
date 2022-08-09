import "source-map-support/register";
import { App, StackProps } from "aws-cdk-lib";
import { ProductsAPIStack } from "@infrastructure/lib/CloudFormations";
import { ENVIRONMENT, SERVICE } from "@infrastructure/configuration";

const app = new App();

new ProductsAPIStack(app, "ProductsAPIStack", <StackProps>{
  stackName: `${ENVIRONMENT}-${SERVICE}API-stack`,
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});