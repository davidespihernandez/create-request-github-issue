# save-as-postman-request

> This code is part of a GitHub issue and is **not** actively maintained by Postman.

Command line utility to create a test request on an specific collection

## Purpose

This code demonstrates how to use the [Postman API](https://www.postman.com/postman/workspace/postman-public-workspace/collection/12959542-c8142d51-e97c-46b6-bd77-52bb66712c9a) to create requests and responses on a collection.

The goal of this repository is to demonstrate how the Collection Items endpoints can be used to modify a Postman collection adding requests and responses programmatically, without having to perform a full PUT of the collection.

In order to do that, we have created a (small Postman API wrapper)[api/apiClient.js] that enables users to create collection requests and responses. We have also created a Javascript file called (createPostmanRequestAndResponse.js)[createPostmanRequestAndResponse.js] that can be executed as a shell script.

> NOTE: You need a valid (Postman API key)[https://learning.postman.com/docs/developer/postman-api/authentication/] saved in an environment variable called `POSTMAN_API_KEY` in order to execute the command.

```shell
export POSTMAN_API_KEY=PMAK_your_key
```

## Usage

The (createPostmanRequestAndResponse.js)[createPostmanRequestAndResponse.js] command receives the following arguments:

```shell
./createPostmanRequestAndResponse.js --collectionId <collectionId>
```

| Argument     | Description                                                     |
| ------------ | --------------------------------------------------------------- |
| collectionId | the id of the collection to save the new request to. Mandatory. |

The command creates a test POST request named "Example POST Request" with a response on the collection.
