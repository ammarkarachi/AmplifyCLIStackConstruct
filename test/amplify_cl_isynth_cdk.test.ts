import { expect as expectCDK, countResources } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as AmplifyClIsynthCdk from '../lib/index';

/*
 * Example test
 */
test('SNS Topic Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
  // WHEN
  new AmplifyClIsynthCdk.AmplifyClIsynthCdk(stack, 'MyTestConstruct', {
    env: "dev",
    path: "./",
    DeploymentBucketType: AmplifyClIsynthCdk.DeploymentBucketType.AMPLIFY_CLI_DEPLOYMENT_BUCKET
  });
  // THEN
  expectCDK(stack).to(countResources("AWS::SNS::Topic",0));
});
