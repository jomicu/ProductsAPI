import { IntegrationResponse } from "aws-cdk-lib/aws-apigateway"

export const CreateProductsRequestTemplate = <{ [contentType: string]: string }>{
    "application/json": String.raw`
            #set($products = $input.path('$.products')) 
            {
                "products": [
                    #foreach($product in $products) 
                    {
                        "name": "$product.name",
                        "type": "$product.type",
                        "unit": "$product.unit"
                        #if("$product.brand" != ""),
                            "brand": "$product.brand"
                        #end
                        #if("$product.description" != ""),
                            "description": "$product.description"
                        #end
                        #if("$product.tags" != ""),
                            "tags": $product.tags
                        #end
                    }#if($foreach.hasNext),#end
                    #end
                ]
            }
        `
}

export const CreateProductsResponsesTemplates = [
    <IntegrationResponse>{
        statusCode: "500",
        selectionPattern: "/Exception/",
        responseTemplates: {
            "application/json": String.raw`
                {
                    "message": "Internal Server Error"
                }
            `
        }
    },
    <IntegrationResponse>{
        statusCode: "201",
        selectionPattern: "",
        responseTemplates: {
            "application/json": String.raw`
                #set($products = $input.path('$.products')) 
                {
                    "products": [
                        #foreach($product in $products) 
                        {
                            "id": "$product.id",
                            "name": "$product.name",
                            "type": "$product.type",
                            "unit": "$product.unit",
                            "brand": "$product.brand",
                            #if("$product.description" == "")
                                "description": null,
                            #else
                                "description": "$product.description",
                            #end
                            "tags": $product.tags
                        }#if($foreach.hasNext),#end
                        #end
                    ]
                }
            `
        }
    }
]