import WalletConnect from "@walletconnect/client";

export function walletConnect(uri: string|undefined){
// Create a connector
const connector = new WalletConnect({
  uri: uri, // Required 
});
 
connector.on("session_request", (error, payload) => {
  console.log(payload);
  if (error) {
    throw error;
  }
  connector.approveSession({chainId:payload.params[0].chainId,accounts:['0xE7b1167B82E0271fFED3F7DA549232d832Df33c2']})
});

connector.on("call_request", (error, payload) => {
  console.log(payload);
 
  if (error) {
    throw error;
  }
  connector.approveRequest({id:payload.params[0].request.id,result:""});
});

connector.on("disconnect", (error, payload) => {
  if (error) {
    throw error;
  }

}); 
}
