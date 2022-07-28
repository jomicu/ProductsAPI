import { ProductsAPIGateway } from "../common/configuration";
import { Construct } from "constructs";
import { Function } from "aws-cdk-lib/aws-lambda";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { RestApi, RestApiProps, DomainNameOptions, LambdaIntegration, ApiKeySourceType, LambdaIntegrationOptions, MethodOptions, EndpointType, EndpointConfiguration, ModelOptions, PassthroughBehavior, IntegrationResponse } from "aws-cdk-lib/aws-apigateway";
import { CreateProductsRequestModel } from "./JsonSchemas";
import { CreateProductsRequestTemplate, CreateProductsResponsesTemplates } from "./Templates";

export const buildProductsAPIGateway = (
    context: Construct,
    route53: HostedZone,
    certificate: Certificate,
    createProductsLambda: Function
): RestApi => {
    const productsAPI = new RestApi(context, ProductsAPIGateway.id, <RestApiProps>{
        restApiName: ProductsAPIGateway.name,
        description: ProductsAPIGateway.description,
        domainName: <DomainNameOptions>{
          domainName: route53.zoneName,
          certificate: certificate,
          basePath: ProductsAPIGateway.basePath
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