import { Construct } from "constructs";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";

import { SUBDOMAIN } from "@infrastructure/configuration";

export const getJomicuCertificate = (context: Construct, hostedZone: IHostedZone): Certificate => {
    return new Certificate(context, "Certificate", {
        domainName: `${SUBDOMAIN}.${hostedZone.zoneName}`,
        validation: CertificateValidation.fromDns(hostedZone),
  });
}