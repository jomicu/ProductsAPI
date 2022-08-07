import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import { createAaaaRecord, createARecord, getJomicuRoute53, createCnameRecord } from "@infrastructure/lib/Route53";
import { getJomicuCertificate } from "@infrastructure/lib/ACM";
import { buildProductsAPIGateway } from "@infrastructure/lib/APIGateways";
import { buildCreateProductsLambda } from "@infrastructure/lib/Lambdas";
import { buildProductsTable } from "@infrastructure/lib/Tables";

export class ProductsAPIStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const productsTable = buildProductsTable(this);

    const createProductsLambda = buildCreateProductsLambda(this, productsTable);

    const productsAPI = buildProductsAPIGateway(this, certificate, createProductsLambda);

    const route53 = getJomicuRoute53(this);

    if (productsAPI.domainName) {
      const certificate = getJomicuCertificate(this, route53, productsAPI.domainName);
      const cnameRecord = createCnameRecord(this, route53, productsAPI.domainName);
      //const aRecord = createARecord(this, route53, productsAPI.domainName);
      //const aaaaRecord = createAaaaRecord(this, route53, productsAPI.domainName);
    }

    productsTable.grantWriteData(createProductsLambda);
  }
}
