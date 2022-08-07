import { Construct } from "constructs";
import { HostedZone, HostedZoneProps, HostedZoneProviderProps } from "aws-cdk-lib/aws-route53";
import { DOMAIN } from "@infrastructure/configuration";

export const getJomicuRoute53 = (context: Construct): HostedZone => { 
    // const hostedZone = HostedZone.fromLookup(context, "HostedZone", <HostedZoneProviderProps>{
    //     domainName: "jomicu.com"
    // });

    return new HostedZone(context, "HostedZone", <HostedZoneProps>{
        zoneName: `${DOMAIN}.`
    })
}