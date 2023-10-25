#!/usr/bin/env node

const { createRequest, createResponse } = require("./api/apiClient");

//get the api key from the environment variables
const apiKey = process.env.POSTMAN_API_KEY;
if (!apiKey) {
  console.error("Please set the POSTMAN_API_KEY environment variable");
  process.exit(1);
}

//get the collection id from the command line
const args = require("yargs").argv;
const collectionId = args.collectionId;

if (!collectionId) {
  console.error(
    "Usage: ./createPostmanRequestAndResponse.js --collectionId <collectionId>",
  );
  console.error(
    "collectionId: the id of the collection to save the new request to. Mandatory.",
  );
  process.exit(1);
}

let parser;
const mainProcess = async () => {

  const newRequestId = await createRequest(apiKey, collectionId, {
    name: "Example POST Request",
    url: "https://postman-echo.com/post",
    method: "POST",
    headers: [
      {
        key: "Host",
        value: "postman-echo.com",
      },
      {
        key: "user-agent",
        value: "curl/7.88.1",
      },
      {
        key: "accept",
        value: "*/*",
      },
      {
        key: "content-type",
        value: "application/json",
      },
      {
        key: "content-length",
        value: "22",
      },
    ],
    dataMode: "raw",
    rawModeData: '{\n  "field": "Value"\n}',
    dataOptions: {
      raw: {
        language: "json",
      },
    },
  });
  console.log(`Request created with id ${newRequestId}`);
  const responseId = await createResponse(apiKey, collectionId, newRequestId, {
    name: "POST response",
    responseCode: {
      code: 200,
      name: "OK",
    },
    headers: [
      {
        key: "date",
        value: "Thu, 07 Sep 2023 12:41:59 GMT",
      },
      {
        key: "content-type",
        value: "application/json; charset=utf-8",
      },
      {
        key: "content-length",
        value: "468",
      },
      {
        key: "etag",
        value: 'W/"1d4-JuAIw8ssoFCtGzk/UwITxaiSbrc"',
      },
      {
        key: "set-cookie",
        value:
          "sails.sid=s%3A6p_NXpI3OZeGE35bI6i5Uq3XgHHxcsdJ.dQVpBE%2BJ9wHWainkqe6F6dkdv7UKoshSZY7sdZ5sbzo; Path=/; HttpOnly",
      },
    ],
    text: '{\n  "args": {},\n  "data": {\n    "field": "Value"\n  },\n  "files": {},\n  "form": {},\n  "headers": {\n    "x-forwarded-proto": "https",\n    "x-forwarded-port": "443",\n    "host": "postman-echo.com",\n    "x-amzn-trace-id": "Root=1-64f9c517-36db304817c774d740619baa",\n    "content-length": "22",\n    "user-agent": "curl/7.88.1",\n    "accept": "*/*",\n    "content-type": "application/json"\n  },\n  "json": {\n    "field": "Value"\n  },\n  "url": "https://postman-echo.com/post"\n}\n',
    language: "json",
    requestObject:
      '{\n  "name": "Request",\n  "description": "",\n  "url": "https://postman-echo.com/post",\n  "method": "POST",\n  "headers": [\n    {\n      "key": "Host",\n      "value": "postman-echo.com"\n    },\n    {\n      "key": "user-agent",\n      "value": "curl/7.88.1"\n    },\n    {\n      "key": "accept",\n      "value": "*/*"\n    },\n    {\n      "key": "content-type",\n      "value": "application/json"\n    },\n    {\n      "key": "content-length",\n      "value": "22"\n    }\n  ],\n  "dataMode": "raw",\n  "rawModeData": "{\\n  \\"field\\": \\"Value\\"\\n}",\n  "dataOptions": {\n    "raw": {\n      "language": "json"\n    }\n  }\n}',
  });
  console.log(`Response created with id ${responseId}`);
};

mainProcess().catch((error) => {
  console.error(error);
  process.exit(1);
});
