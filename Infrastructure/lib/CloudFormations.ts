import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import { getJomicuRoute53 } from "@infrastructure/lib/Route53";
import { getJomicuCertificate } from "@infrastructure/lib/ACM";
import { buildProductsAPIGateway } from "@infrastructure/lib/APIGateways";
import { buildCreateProductsLambda } from "@infrastructure/lib/Lambdas";
import { buildProductsTable } from "@infrastructure/lib/Tables";

export class ProductsAPIStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const route53 = getJomicuRoute53(this);

    const certificate = getJomicuCertificate(this, route53);

    const productsTable = buildProductsTable(this);

    const createProductsLambda = buildCreateProductsLambda(this, productsTable);

    const productsAPI = buildProductsAPIGateway(this, route53, certificate, createProductsLambda);

    productsTable.grantWriteData(createProductsLambda);
  }
}
