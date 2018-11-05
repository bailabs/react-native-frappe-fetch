# react-native-frappe-fetch

A JavaScript library, mainly for React Native, in interacting with Frappe APIs.

The react-native-frappe-fetch uses [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## Installation
```
npm install react-native-frappe-fetch
```

## Basic Usage
```js
import FrappeFetch from "react-native-frappe-fetch";

// Connect to Frappe server
FrappeFetch.createClient({
  url: "http://192.168.xx.xxx:8002",
  username: "Administrator",
  password: "frappe"
}).then((response) => {
  console.log("Logged in");
}).catch((error) => {
  console.error(error);
});

// Using the client
const { Client } = FrappeFetch;

// Post requests through API
const data = {
  doctype: "Test",
  name: "Name"
};

Client.postApi("xxxxx.xxxxx.test_api", data).then((response) => {
  console.log(response);
});
```

## License

Copyright Bai Web and Mobile Lab. Released under the terms of the MIT lecense.