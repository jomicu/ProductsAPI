import { Construct } from "constructs";
import { Table, TableProps, BillingMode, AttributeType } from "aws-cdk-lib/aws-dynamodb";
import { ENVIRONMENT, SERVICE } from "@infrastructure/common/configuration";

export const buildProductsTable = (context: Construct): Table => {
    return new Table(context, "JomicuProductsTable", <TableProps>{
        tableName: `${ENVIRONMENT}-${SERVICE}-Table`,
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: { name: "id", type: AttributeType.STRING }
    });
}