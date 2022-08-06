import { Construct } from "constructs";
import { HostedZone, HostedZoneAttributes } from "aws-cdk-lib/aws-route53";

export const getJomicuRoute53 = (context: Construct) => { 
    return HostedZone.fromHostedZoneAttributes(context, "HostedZone", <HostedZoneAttributes>{
        zoneName: "jomicu.com",
    });
}