import { PRODUCTS_TABLE_NAME } from "../common/configuration";
import { Construct } from "constructs";
import { Table, TableProps, AttributeType } from "aws-cdk-lib/aws-dynamodb";

export const buildProductsTable = (context: Construct): Table => {
    return new Table(context, PRODUCTS_TABLE_NAME, <TableProps>{
        tableName: PRODUCTS_TABLE_NAME,
        partitionKey: { name: "id", type: AttributeType.STRING },
    });
}