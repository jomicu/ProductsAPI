import { JsonSchema, JsonSchemaVersion, JsonSchemaType } from "aws-cdk-lib/aws-apigateway";

export const CreateProductRequestModel = <JsonSchema>{
    schema: JsonSchemaVersion.DRAFT4,
    title: "CreateProductRequestModel",
    type: JsonSchemaType.OBJECT,
    required: ["name", "type", "unit"],
    additionalProperties: false,
    properties: {
        name: <JsonSchema>{
            type: JsonSchemaType.STRING,
            minLength: 1,
            maxLength: 50
        },
        brand: <JsonSchema>{
            type: JsonSchemaType.STRING,
            minLength: 1,
            maxLength: 50
        },
        type: <JsonSchema>{
            type: JsonSchemaType.STRING,
            enum: [
                "Food",
                "Clothes",
                "Furniture"
            ]
        },
        unit: <JsonSchema>{
            type: JsonSchemaType.STRING,
            enum: [
                "Unit",
                "Kilograms",
                "Meters"
            ]
        },
        description: <JsonSchema>{
            type: JsonSchemaType.STRING,
            minLength: 1,
            maxLength: 150
        },
        tags: <JsonSchema>{
            type: JsonSchemaType.ARRAY,
            uniqueItems: true,
            minItems: 0,
            maxItems: 5,
            items: <JsonSchema>{
                type: "string",
                minLength: 1,
                maxLength: 10
            }
        }
    }
}

export const CreateProductsRequestModel = <JsonSchema>{
    schema: JsonSchemaVersion.DRAFT4,
    title: "CreateProductsRequestModel",
    type: JsonSchemaType.OBJECT,
    required: ["products"],
    additionalProperties: false,
    properties: <JsonSchema>{
        products: <JsonSchema>{
            title: "The products array holding products to be created",
            type: JsonSchemaType.ARRAY,
            uniqueItems: true,
            minItems: 1,
            items: CreateProductRequestModel
        }
    }
}