import WalletConnect from "@walletconnect/client";

export function walletConnect(uri: string|undefined,addr: string){
// Create a connector
const connector = new WalletConnect({
  uri: uri, // Required 
});
 
connector.on("session_request", (error, payload) => {
  console.log(payload);
  if (error) {
    throw error;
  }
  connector.approveSession({chainId:payload.params[0].chainId,accounts:[addr]})
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
