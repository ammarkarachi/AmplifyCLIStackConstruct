import { CfnInclude, IncludedNestedStack } from '@aws-cdk/cloudformation-include';
import * as cdk from '@aws-cdk/core';
import * as fs from 'fs-extra'
import * as uuid from 'uuid'
export interface AmplifyClIsynthCdkProps {
  /**
   * The Amplify CLI environment that you would like to incorporate
   * see https://docs.amplify.aws/cli/teams/overview
   */
  readonly env: string;

  /**
   * The path to the synthesized folder that contains the artifacts for the Amplify CLI backend
   * ex: ./amplify-synth-out/
   */
  readonly path: string;

  /**
   * Specify the bucket used to stage resources for the Cloudformation and code assets
   * AMPLIFY_CLI_DEPLOYMENT_BUCKET: deploys to the bucket provided by Amplify CLI
   * CDK_DEPLOYMENT_BUCKET: deploys to the bucket 
   */
  readonly DeploymentBucketType: DeploymentBucketType;
}

export enum DeploymentBucketType {
  AMPLIFY_CLI_DEPLOYMENT_BUCKET = "AMPLIFY_CLI_DEPLOYMENT_BUCKET",
  CDK_DEPLOYMENT_BUCKET = "CDK_DEPLOYMENT_BUCKET"
}
export enum FrontendType {

}

export interface IAmplifyCLISynthCDK {
  getNestedStacksByCategory(
    category: String,
    categoryName: string
  ): IncludedNestedStack[];

  getNestedStacksOutPutByCategory(category: String, categoryName: string): cdk.CfnOutput[]

  generateExport(
    frontEndType: FrontendType,
    props: { objectKey: String }
  ): void;
}

export class AmplifyClIsynthCdk extends cdk.Construct implements IAmplifyCLISynthCDK{

  constructor(scope: cdk.Construct, id: string, props: AmplifyClIsynthCdkProps) {
    super(scope, id);
    const amplifyBackend = JSON.parse(fs.readFileSync(props.path, { encoding: "utf-8" }));
    const stack = new cdk.Stack(scope, "AmplifyStack", {
      stackName: amplifyBackend[props.env].rootStackName,
    });
    uuid.v4();
    new CfnInclude(stack, "AmplifyInclude", amplifyBackend[props.env].props);
    // Define construct contents here
  }
  getNestedStacksByCategory(category: String, categoryName: string): IncludedNestedStack[] {
    throw new Error('Method not implemented.');
  }

  generateExport(frontEndType: FrontendType, props: { objectKey: String; }): void {
    throw new Error('Method not implemented.');
  }
}
