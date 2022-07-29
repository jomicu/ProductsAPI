import { Construct } from "constructs";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Function, Runtime, Architecture, Code, FunctionProps } from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { ENVIRONMENT, SERVICE } from "@infrastructure/common/configuration";

export const buildCreateProductsLambda = (context: Construct, productsTable: Table): Function => {
    return new Function(context, "createProductsLambda", <FunctionProps>{
        functionName: `${ENVIRONMENT}-${SERVICE}API-create-products`,
        runtime: Runtime.PYTHON_3_9,
        architecture: Architecture.X86_64,
        code: Code.fromAsset(join(__dirname, "../../Application/create_products")),
        handler: "create_products.handler",
        environment: {
            STAGE: ENVIRONMENT,
            PRODUCTS_TABLE_NAME: productsTable.tableName
        }
    });
}