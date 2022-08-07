import { Construct } from "constructs";
import { AaaaRecord, AaaaRecordProps, ARecord, ARecordProps, IHostedZone, HostedZone, HostedZoneProps, HostedZoneProviderProps, RecordTarget, HostedZoneAttributes, CnameRecord, CnameRecordProps } from "aws-cdk-lib/aws-route53";
import { ApiGateway } from "aws-cdk-lib/aws-route53-targets";
import { DomainName, RestApi } from "aws-cdk-lib/aws-apigateway";
import { DOMAIN } from "@infrastructure/configuration";

export const getJomicuRoute53 = (context: Construct): IHostedZone => { 
    return HostedZone.fromLookup(context, "HostedZone", <HostedZoneProviderProps>{
        domainName: DOMAIN
    });
}

export const createCnameRecord = (context: Construct, zone: IHostedZone, domainName: DomainName) => {
    return new CnameRecord(context, "CnameRecord", <CnameRecordProps>{
        zone: zone,
        recordName: "Products API Cname Record",
        domainName: domainName.domainName
    });
}

export const createARecord = (context: Construct, zone: IHostedZone, api: RestApi): ARecord => {
    return new ARecord(context, "ARecord", <ARecordProps>{
        recordName: "Products API ARecord",
        zone: zone,
        target: RecordTarget.fromAlias(new ApiGateway(api))
    });
}

// export const createAaaaRecord = (context: Construct, zone: IHostedZone, domainName: DomainName): AaaaRecord => {
//     return new AaaaRecord(context, "AaaaRecord", <AaaaRecordProps>{
//         recordName: "Products API AaaaRecord",
//         zone: zone,
//         target: RecordTarget.fromAlias(new ApiGatewayDomain(domainName))
//     });
// }