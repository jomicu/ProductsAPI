import { Construct } from "constructs";
import { Table, TableProps, BillingMode, AttributeType, Attribute } from "aws-cdk-lib/aws-dynamodb";
import { ENVIRONMENT, SERVICE } from "@infrastructure/configuration";

export const buildProductsTable = (context: Construct): Table => {
    return new Table(context, "ProductsTable", <TableProps>{
        tableName: `${ENVIRONMENT}-${SERVICE}-table`,
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: <Attribute>{ name: "id", type: AttributeType.STRING }
    });
}