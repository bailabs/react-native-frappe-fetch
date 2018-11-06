# react-native-frappe-fetch

A JavaScript library, mainly for React Native, in interacting with Frappe APIs.

The react-native-frappe-fetch uses [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

## Installation
```
npm install react-native-frappe-fetch
```

## Temporary Fix for Frappe v10

Currently, the codebase under the Frappe's app.py under v10 is not compatible with the react-native-frappe-fetch. However, the develop branch is already updated. Just replaced this with your `make_form_dict()` function under `app.py`.

```python
def make_form_dict(request):
	import json

	if 'application/json' in (request.content_type or '') and request.data:
		args = json.loads(request.data)
	else:
		args = request.form or request.args

	try:
		frappe.local.form_dict = frappe._dict({ k:v[0] if isinstance(v, (list, tuple)) else v \
			for k, v in iteritems(args) })
	except IndexError:
		frappe.local.form_dict = frappe._dict(args)

	if "_" in frappe.local.form_dict:
		# _ is passed by $.ajax so that the request is not cached by the browser. So, remove _ from form_dict
		frappe.local.form_dict.pop("_")
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

Copyright [Bai Web and Mobile Lab](https://bai.ph/). Released under the terms of the MIT lecense.
