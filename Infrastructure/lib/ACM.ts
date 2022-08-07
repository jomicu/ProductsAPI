import { Construct } from "constructs";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import { Certificate, CertificateValidation, DnsValidatedCertificate } from "aws-cdk-lib/aws-certificatemanager";

import { DOMAIN } from "@infrastructure/configuration";
import { DomainName } from "aws-cdk-lib/aws-apigateway";

export const getJomicuCertificate = (context: Construct, hostedZone: IHostedZone, domainName: DomainName): Certificate => {
    return new DnsValidatedCertificate(context, "Certificate", {
        domainName: domainName.domainName,
        hostedZone: hostedZone,
        region: "us-east-1"
  });
}