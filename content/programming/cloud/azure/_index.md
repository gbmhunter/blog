---
author: "gbmhunter"
categories: [ "Programming", "Cloud" ]
date: 2019-01-14
draft: false
lastmod: 2019-01-14
tags: [ "programming", "cloud", "Azure" ]
title: "Azure"
type: "page"
---








## Azure Hierarchy
Accounts (Subscription)
Resource Groups
Resources

Resource manager allows you delete everything within a resource group.

A resource is a single service instance in Azure. A resource group is a logical grouping of resources. A ARM (Azure Resource Manager) template is a .json file that allows you to declaratively describe a set of resources.

The region of the resource group does not have to be the same as the region of the resource. Resource managers can be assigned resource manager locks (either Read-Only or Delete).

Resource groups can usually be moved between subscriptions.

IaaS -> Infrastructure as a Service. You look after the OS, libraries
PaaS -> Platform as a Service.

Normally charged for egress of data, but not ingress.

Supported operating systems: Windows Server, Windows Client, Ubuntu, Red Hat Enterprise Linux, SUSE Linux

## Resources

A _resource_ is a primary primitive in Azure. Almost every thing you create in Azure is a particular type of resource.

Resources can be assigned _Resource Tags_. Resource tags can be used to logically organise resources. They are useful for the monitoring and billing of resources.

## Storage Accounts

Storage account names have to be unique across all Azure storage accounts.

Storage explorer is a desktop application for browsing Azure storage accounts: [https://azure.microsoft.com/en-ca/features/storage-explorer/](https://azure.microsoft.com/en-ca/features/storage-explorer/)

Blobs are a key/value object store (similar to AWS S3). Control user permissions with blob access policies. Block blobs are about 30x cheaper per GB than file blobs.

## Load Balancers

### Azure Load Balancers

A traditional traffic manager that can balance traffic between VMs (or other Azure end points).

### Traffic Managers

A [traffic manager](https://azure.microsoft.com/en-ca/services/traffic-manager/) is a smart DNS form of load balancer can can resolve a `CNAME` based on performance/geographic requirements.

## Azure Active Directory

Azure Active Directory (Azure AD) is a cloud service that offers multi-tenant access and identity control.

Pass-through authentication: 

Federation: Federation is a collection of domains that have established trust.

## Management Groups

No management groups exists by default. Management groups can be used to group together subscriptions. Management groups exist in a tree-like hierarchy. 

## Subscriptions

A subscription is a logical unit of Azure services that is linked to an account. An Azure account is either an identity in Azure AD or a directory within Azure AD.

## Role-based Access Control (RBAC)

Built-in Roles:

* Owners
* Contributors
* Readers

What can be assigned to a role?

* Users
* Groups
* Service Principals

## Azure Policy

You can use _Azure Policy_ to create, assign and manage policies. Policies are created from policy definitions. You can also determine the compliance for any policies.

## File Sync

Azure supports both import and export file sync job.

For really large files, you can use the data boxes.

## Azure Web Apps

