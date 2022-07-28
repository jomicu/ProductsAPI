import { ACM } from "../common/configuration";
import { Construct } from "constructs";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";

export const getCertificate = (context: Construct, hostedZone: HostedZone): Certificate => {
    return new Certificate(context, ACM.id, {
        domainName: ACM.domainName,
        validation: CertificateValidation.fromDns(hostedZone),
  });
}