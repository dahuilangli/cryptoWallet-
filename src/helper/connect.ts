import WalletConnect from "@walletconnect/client";

// Create a connector
export const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
});

connector.on("session_update", (error, payload) => {
  if (error) {
    throw error;
  }

  // Get updated accounts and chainId
  const { accounts, chainId } = payload.params[0];
});

connector.on("disconnect", (error, payload) => {
  if (error) {
    throw error;
  }

  // Delete connector
});
