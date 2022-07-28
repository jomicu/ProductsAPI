import { Route53 } from "../common/configuration";
import { Construct } from "constructs";
import { HostedZone } from "aws-cdk-lib/aws-route53";

export const getRoute53 = (context: Construct) => { 
    return new HostedZone(context, Route53.id, {
        zoneName: Route53.zoneName,
    });
}