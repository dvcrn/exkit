console.info("Hey, you just attached me to the google.com page");
console.info("Check src/page-worker/google.js to find this code");

Exkit.fire("google-attached", new Date().getTime(), function (data) {
  console.info("The background page told us something important:");
  console.info(data);
});
