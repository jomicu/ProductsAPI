import { Construct } from "constructs";
import { HostedZone } from "aws-cdk-lib/aws-route53";



export const getJomicuRoute53 = (context: Construct) => { 
    return new HostedZone(context, "HostedZone", {
        zoneName: "jomicu.com",
    });
}