---
authors: [ "Geoffrey Hunter" ]
categories: [ "Programming", "Cloud", "AWS" ]
date: 2019-11-21
draft: false
lastmod: 2019-11-21
tags: [ "programming", "cloud", "AWS", "SAM" ]
title: "AWS SAM"
type: "page"
---

## Overview

{{% figure src="aws-sam-squirrel-logo.jpg" width="200px" caption="The logo for AWS SAM." %}}

## Installation

AWS SAM provides a commandline tool `sam` (called the _AWS SAM CLI_, formerly called _SAM Local_).

### MacOS

Assuming you have `homebrew` installed:

```sh
$ brew tap aws/tap
$ brew install aws-sam-cli
```

You should be able to verify the installation with the `--version` flag:

```sh
sam --version
SAM CLI, version 0.31.1
```

## Building

```bash
$ sam build
```

Build artifacts are created within `.aws-sam/build/`.

## Example

tempate.yaml:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: >
  sam-app

  Sample SAM Template for sam-app

# More info about Globals: https://github.com/awslabs/serverless-application-model/blob/master/docs/globals.rst
Globals:
  Function:
    Timeout: 3

Resources:
  HelloWorldFunction:
    Type: AWS::Serverless::Function # More info about Function Resource: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction
    Properties:
      CodeUri: hello_world/
      Handler: app.lambda_handler
      Runtime: python3.7
      Events:
        HelloWorld:
          Type: Api # More info about API Event Source: https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#api
          Properties:
            Path: /hello
            Method: get

Outputs:
  # ServerlessRestApi is an implicit API created out of Events key under Serverless::Function
  # Find out more about other implicit resources you can reference within SAM
  # https://github.com/awslabs/serverless-application-model/blob/master/docs/internals/generated_resources.rst#api
  HelloWorldApi:
    Description: "API Gateway endpoint URL for Prod stage for Hello World function"
    Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/hello/"
  HelloWorldFunction:
    Description: "Hello World Lambda Function ARN"
    Value: !GetAtt HelloWorldFunction.Arn
  HelloWorldFunctionIamRole:
    Description: "Implicit IAM Role created for Hello World function"
    Value: !GetAtt HelloWorldFunctionRole.Arn
```