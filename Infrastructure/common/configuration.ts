const ENVIRONMENT = process.env.ENVIRONMENT || "development";
const SERVICE = process.env.SERVICE || "Products";

export const CLOUDFORMATION_NAME = `${ENVIRONMENT}-${SERVICE}API-Stack`;
export const CREATE_PRODUCTS_LAMBDA_NAME = `${ENVIRONMENT}-${SERVICE}API-create-products`;
export const GET_PRODUCTS_LAMBDA_NAME = `${ENVIRONMENT}-${SERVICE}API-get-products`;
export const PRODUCTS_TABLE_NAME = `${ENVIRONMENT}-${SERVICE}-Table`;

export const PRODUCTS_API_GATEWAY = {
    NAME: `${ENVIRONMENT}-${SERVICE}API`,
    DESCRIPTION: "",
    DOMAIN: "api-development.jomicu.com",
    BASE_PATH: "products"
}