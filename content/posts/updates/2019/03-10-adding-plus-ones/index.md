---
date: 2019-03-10
description: ""
draft: true
lastmod: 2019-03-10
tags: []
title: "Adding Plus Ones"
type: "post"
---

Amazon Lambda

* 1M free requests per month
* 3.2Ms of compute time per month

Amazon DynamoDB Free Tier

* 25GB of storage
* 25 units of write capacity
* 25 units of read capacity (enough for 200M requests/month)

Runtime: Node.js 8.10

Function: hello
Role name: myTestRole

IAM User: serverless
Access Type: Programmatic Access
Permissions: AdministratorAccess (policy directly attached to user)

Serverless was given the AWS credentials to the serverless user with (using the `default` profile):

```sh
serverless config credentials --provider aws --key <key> --secret <secret_key>
```

Service can be deployed with:

```sh
serverless deploy -v
```

Region: `us-east-1`