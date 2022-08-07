import { Construct } from "constructs";
import { AaaaRecord, AaaaRecordProps, ARecord, ARecordProps, IHostedZone, HostedZone, HostedZoneProps, HostedZoneProviderProps, RecordTarget, HostedZoneAttributes } from "aws-cdk-lib/aws-route53";
import { ApiGatewayDomain } from "aws-cdk-lib/aws-route53-targets";
import { DomainName } from "aws-cdk-lib/aws-apigateway";
import { DOMAIN } from "@infrastructure/configuration";

export const getJomicuRoute53 = (context: Construct): IHostedZone => { 
    return HostedZone.fromHostedZoneAttributes(context, "HostedZone", <HostedZoneAttributes>{
        zoneName: DOMAIN
    });
}

export const createARecord = (context: Construct, zone: IHostedZone, domainName: DomainName): ARecord => {
    return new ARecord(context, "ARecord", <ARecordProps>{
        recordName: "Products API ARecord",
        zone: zone,
        target: RecordTarget.fromAlias(new ApiGatewayDomain(domainName))
    });
}

export const createAaaaRecord = (context: Construct, zone: IHostedZone, domainName: DomainName): AaaaRecord => {
    return new AaaaRecord(context, "AaaaRecord", <AaaaRecordProps>{
        recordName: "Products API AaaaRecord",
        zone: zone,
        target: RecordTarget.fromAlias(new ApiGatewayDomain(domainName))
    });
}