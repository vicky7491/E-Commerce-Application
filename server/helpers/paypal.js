const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "AXB7efBCDPU80YZbHH1iRVH7nN6toXInJllCvcwdY8COn5SuX-eYHt8jjSzyKtltiiBw69fn0bAfopZ2",
  client_secret: "EP5eSY-8xLqkUTdZ7G50daGBex3H7qSaXyiQwiAmoo8WQZ5GgMSiPOB17C1mFmY0y1WZo47mvs8nAVNS",
});


console.log("✅ PayPal integration is  enabled.");
module.exports = paypal;
