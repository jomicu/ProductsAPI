import { Construct } from "constructs";
import { Function } from "aws-cdk-lib/aws-lambda";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { RestApi, RestApiProps, DomainNameOptions, LambdaIntegration, ApiKeySourceType, LambdaIntegrationOptions, MethodOptions, EndpointType, EndpointConfiguration, ModelOptions, PassthroughBehavior, ApiKeyOptions, ApiKey, ApiKeyProps, UsagePlan, UsagePlanProps, CorsOptions } from "aws-cdk-lib/aws-apigateway";
import { CreateProductsRequestModel } from "@infrastructure/lib/JsonSchemas";
import { CreateProductsRequestTemplate, CreateProductsResponsesTemplates } from "@infrastructure/lib/Templates";

import { ENVIRONMENT, SERVICE, SUBDOMAIN, BASE_PATH } from "@infrastructure/configuration";

export const buildProductsAPIGateway = (
    context: Construct,
    hostedZone: IHostedZone,
    certificate: Certificate,
    createProductsLambda: Function
): RestApi => {
    const productsAPI = new RestApi(context, "ProductsAPIGateway", <RestApiProps>{
        restApiName: `${ENVIRONMENT}-${SERVICE}API`,
        description: "Jomicu Products API",
        disableExecuteApiEndpoint: true,
        deployOptions: {
            stageName: ENVIRONMENT,
        },
        domainName: <DomainNameOptions>{
          domainName: `${SUBDOMAIN}.${hostedZone.zoneName}`,
          certificate: certificate,
          basePath: BASE_PATH
        },
        endpointConfiguration: <EndpointConfiguration>{
            types: [EndpointType.REGIONAL]
        },
        apiKeySourceType: ApiKeySourceType.HEADER,
        defaultCorsPreflightOptions: <CorsOptions>{
            allowHeaders: [
              "Content-Type",
              "X-Amz-Date",
              "Authorization",
              "X-Api-Key",
            ],
            allowMethods: ["POST"],
            allowOrigins: ["*"]
          }
    });

    //productsAPI.addApiKey("DefaultAPIKey");

    const createProductsLambdaIntegration = new LambdaIntegration(createProductsLambda, <LambdaIntegrationOptions>{
        proxy: false,
        allowTestInvoke: false,
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestTemplates: CreateProductsRequestTemplate,
        integrationResponses: CreateProductsResponsesTemplates
    });

    const createProductsResource = productsAPI.root.addResource("create-products");

    createProductsResource.addMethod("POST", createProductsLambdaIntegration, <MethodOptions>{
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