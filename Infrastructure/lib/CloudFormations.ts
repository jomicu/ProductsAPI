import { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import { getJomicuRoute53, createCnameRecord, createARecord, createAaaaRecord } from "@infrastructure/lib/Route53";
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

    if (productsAPI.domainName) {
      //const cnameRecord = createCnameRecord(this, route53, productsAPI.domainName);
      const aRecord = createARecord(this, route53, productsAPI.domainName);
      const aaaaRecord = createAaaaRecord(this, route53, productsAPI.domainName);
    }

    productsTable.grantWriteData(createProductsLambda);
  }
}
