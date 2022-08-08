export const ENVIRONMENT = process.env.ENVIRONMENT || "development";
export const SERVICE = process.env.SERVICE || "Products";

export const DOMAIN = "jomicu.com"
export const SUBDOMAIN = "api-development"

export const CERTIFICATE_DOMAIN_NAME = `*.${DOMAIN}`

export const HOSTED_ZONE_NAMES = "jomicu.com."
export const BASE_PATH = "products"

export const GET_PRODUCTS_LAMBDA_NAME = `${ENVIRONMENT}-${SERVICE}API-get-products`;