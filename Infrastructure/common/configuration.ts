const ENVIRONMENT = process.env.ENVIRONMENT || "development";
const SERVICE = process.env.SERVICE || "Products";

export const CLOUDFORMATION_NAME = `${ENVIRONMENT}-${SERVICE}API-Stack`;
export const CREATE_PRODUCTS_LAMBDA_NAME = `${ENVIRONMENT}-${SERVICE}API-create-products`;
export const GET_PRODUCTS_LAMBDA_NAME = `${ENVIRONMENT}-${SERVICE}API-get-products`;
export const PRODUCTS_TABLE_NAME = `${ENVIRONMENT}-${SERVICE}-Table`;

export const Route53 = {
    id: "route53",
    zoneName: "jomicu.com"
}

export const ACM = {
    id: "certificate",
    domainName: "api-development.jomicu.com",
}

export const ProductsAPIGateway = {
    id: "productsAPIGateway",
    name: `${ENVIRONMENT}-${SERVICE}API`,
    description: "Jomicu Products API",
    basePath: "products"
}