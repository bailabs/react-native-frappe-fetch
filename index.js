 function Client(settings) {

  // Initialize the settings
  this.url = settings.url;

}

Client.prototype.insert = function(doc) {
  return fetch(this.url + "/api/resource/" + doc.doctype, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: JSON.stringify(doc) })
  });
};

Client.prototype.delete = function(doctype, name) {
  return fetch(this.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "cmd": "frappe.client.delete",
      "doctype": doctype,
      "name": name
    })
  });
};

Client.prototype.cancel = function(doctype, name) {
  return fetch(this.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "cmd": "frappe.client.cancel",
      "doctype": doctype,
      "name": name
    })
  });
};

Client.prototype.submit = function(doc) {
  return fetch(this.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "cmd": "frappe.client.submit",
      "doc": JSON.stringify(doc)
    })
  }).then((res) => res.json());
};

Client.prototype.getList = function(doctype) {
  return fetch(this.url + "/api/resource/" + doctype, { method: "GET" }).then((res) => res.json());
};

Client.prototype.getDoc = function(doctype, name) {
  return fetch(this.url + "/api/resource/" + doctype + "/" + name, { method: "GET" }).then((res) => res.json());
};

Client.prototype.getApi = function(method) {
  return fetch(this.url + "/api/method/" + method, { method: "GET" }).then((res) => res.json());
};

Client.prototype.postApi = function(method, data) {
  return fetch(this.url + "/api/method/" + method, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data })
  });
};

module.exports = {

  // Client object
  Client: Client,

  // Create client based on the settings given
  createClient: function(settings) {

    // Error for missing settings
    ["url", "username", "password"].forEach(function(prop) {
      if (!settings[prop]) {
        throw new Error("Missing required settings: " + prop);
      }
    });

    // Login to the server
    return fetch(settings.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "cmd": "login",
        "usr": settings.username,
        "pwd": settings.password
      })
    }).then((res) => {

      // If not success
      if (res.status !== 200) {
        throw new Error("Unable to login. (Error Code: " + res.status + ")");
      }

      // Initialize the Client object
      this.Client = new Client(settings);

      return res;

    });

  },

};
