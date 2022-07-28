import { join } from "path";
import { CREATE_PRODUCTS_LAMBDA_NAME, PRODUCTS_TABLE_NAME } from "../common/configuration";
import { Construct } from "constructs";
import { Function, Runtime, Architecture, Code, FunctionProps } from "aws-cdk-lib/aws-lambda";

export const buildCreateProductsLambda = (context: Construct): Function => {
    return new Function(context, CREATE_PRODUCTS_LAMBDA_NAME, <FunctionProps>{
        functionName: CREATE_PRODUCTS_LAMBDA_NAME,
        runtime: Runtime.PYTHON_3_9,
        architecture: Architecture.X86_64,
        code: Code.fromAsset(join(__dirname, "../../Application/create_products")),
        handler: "create_products.handle_event",
        environment: {
            PRODUCTS_TABLE_NAME: PRODUCTS_TABLE_NAME
        }
    });
}