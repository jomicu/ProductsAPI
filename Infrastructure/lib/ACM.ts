import { Construct } from "constructs";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";

import { DOMAIN } from "@infrastructure/configuration";

export const getJomicuCertificate = (context: Construct, hostedZone: HostedZone): Certificate => {
    return new Certificate(context, "Certificate", {
        domainName: DOMAIN,
        validation: CertificateValidation.fromDns(hostedZone),
  });
}