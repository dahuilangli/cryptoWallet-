
import walletConnect from "@walletconnect/client";

export const connector = new walletConnect(
    {
      uri: "wc:00e46b69-d0cc-4b3e-b6a2-cee442f97188@1?bridge=https%3A%2F%2Fbridge.walletconnect.org&key=91303dedf64285cbbaf9120f6e9d160a5c8aa3deb67017a3874cd272323f48ae", // Required
    clientMeta: {
      description: "WalletConnect Developer App",
      url: "https://walletconnect.org",
      icons: ["https://walletconnect.org/walletconnect-logo.png"],
      name: "WalletConnect",
    },
  },
  // {
  //   // // Optional
  //   // url: "<YOUR_PUSH_SERVER_URL>",
  //   // type: "fcm",
  //   // // token: token,
  //   // // peerMeta: true,
  //   // // language: language,
  // }
  );
connector.on("session_request", (error, payload) => {
    console.log(payload);
    if (error) {
      throw error;
    }
});

connector.on("call_request", (error, payload) => {
    console.log(payload);
    if (error) {
      throw error;
    }
});
connector.on("disconnect", (error, payload) => {
    console.log(payload);
    if (error) {
      throw error;
    }

  });

connector.approveSession({
    accounts: [                 // required
      '0x4292...931B3'
    ],
    chainId: 1                  // required
  })
