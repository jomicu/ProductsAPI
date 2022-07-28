import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { buildProductsTable } from "./Tables"
import { buildCreateProductsLambda } from "./Lambdas";
import { buildProductsAPIGateway } from "./APIGateways";

export class ProductsAPIStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const productsTable = buildProductsTable(this);

    const createProductsLambda = buildCreateProductsLambda(this);

    const productsAPI = buildProductsAPIGateway(this, createProductsLambda);

    productsTable.grantWriteData(createProductsLambda);
  }
}
