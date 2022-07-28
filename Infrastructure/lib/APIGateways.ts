import { PRODUCTS_API_GATEWAY } from "../common/configuration";
import { Construct } from "constructs";
import { Function } from "aws-cdk-lib/aws-lambda";
import { RestApi, RestApiProps, DomainNameOptions, LambdaIntegration, ApiKeySourceType, LambdaIntegrationOptions, MethodOptions, EndpointType, EndpointConfiguration, ModelOptions, PassthroughBehavior, IntegrationResponse } from "aws-cdk-lib/aws-apigateway";
import { CreateProductsRequestModel } from "./JsonSchemas";
import { CreateProductsRequestTemplate, CreateProductsResponsesTemplates } from "./Templates";

export const buildProductsAPIGateway = (context: Construct, createProductsLambda: Function): RestApi => {
    const productsAPI = new RestApi(context, PRODUCTS_API_GATEWAY.NAME, <RestApiProps>{
        restApiName: PRODUCTS_API_GATEWAY.NAME,
        description: PRODUCTS_API_GATEWAY.DESCRIPTION,
        domainName: <DomainNameOptions>{
          domainName: PRODUCTS_API_GATEWAY.DOMAIN,
          basePath: PRODUCTS_API_GATEWAY.BASE_PATH
        },
        endpointConfiguration: <EndpointConfiguration>{
            types: [EndpointType.REGIONAL]
        },
        apiKeySourceType: ApiKeySourceType.HEADER
    });

    const createProductsLambdaIntegration = new LambdaIntegration(createProductsLambda, <LambdaIntegrationOptions>{
        proxy: false,
        allowTestInvoke: false,
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestTemplates: CreateProductsRequestTemplate,
        integrationResponses: CreateProductsResponsesTemplates
    });

    productsAPI.root.addMethod("POST", createProductsLambdaIntegration, <MethodOptions>{
        apiKeyRequired: true,
        requestModels: {
            "application/json": productsAPI.addModel("CreateProductsModel", <ModelOptions>{
                contentType: "application/json",
                description: "Create products request JSON schema",
                modelName: "CreateProductsRequestModel",
                schema: CreateProductsRequestModel
            })
        }
    }); 

    return productsAPI;
}