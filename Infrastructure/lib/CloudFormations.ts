import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { buildProductsTable } from "./Tables"
import { buildCreateProductsLambda } from "./Lambdas";
import { buildProductsAPIGateway } from "./APIGateways";
import { getRoute53 } from "./Route53";
import { getCertificate } from "./ACM";

export class ProductsAPIStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const route53 = getRoute53(this);

    const certificate = getCertificate(this, route53);

    const productsTable = buildProductsTable(this);

    const createProductsLambda = buildCreateProductsLambda(this);

    const productsAPI = buildProductsAPIGateway(this, route53, certificate, createProductsLambda);

    productsTable.grantWriteData(createProductsLambda);
  }
}
