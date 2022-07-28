import { CLOUDFORMATION_NAME } from "../common/configuration";
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { ProductsAPIStack } from "../lib/CloudFormations";

const app = new App();

new ProductsAPIStack(app, CLOUDFORMATION_NAME, {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});