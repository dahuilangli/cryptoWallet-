

export default function(address: string|undefined,chainid: string,chain: string){
    return `
    let iden = 0
    window.web3 = new Web3(new Web3.providers.HttpProvider("${chain}"));
               
    let sendAynsc_ = window.web3.currentProvider.send.bind(window.web3.currentProvider);
    let idCallbacks = {}
    function executeCallback(id, result) {
      const cb = idCallbacks[id]
      cb(null,result);
    }
    let send2RN = function(payload, c) {
        idCallbacks[payload.id] = c;
        sendAynsc_({method:"eth_getTransactionCount", params:["${address}","pending"],id:1}, function(error, result){
            payload.nonce = result.result
            if(payload.nonce == ""){
                sendAynsc_({method:"eth_getTransactionCount", params:["${address}","latest"],id:1}, function(error, result){
                    payload.nonce = result.result
                });
            }
            window.ReactNativeWebView.postMessage(JSON.stringify(payload));
        });
      }
    let custom_sendAsync = function (req, c) {
        iden += 1;
        if (req.method === "eth_accounts" || req.method === "eth_requestAccounts" || req.method === "eth_coinbase") {
            if (c) {
                return c(null, ["${address}"])
            }
        } else if (req.method === "net_version") {
            if (c) {
                return c(null, "1")
            }
            
        } else if (req.method === "eth_sendTransaction") {
            return send2RN({
                data: req,
                id:iden
            }, c);
        } else if (req.method === "personal_sign") {
          alert(44455);
            return send2RN({
                data: req,
                id:iden
            }, c);
        } else if (req.method === "eth_sign") {
          alert(123456);
            let addr = req.params[0];
            req.params[0] = req.params[1];
            req.params[1] = addr;
            return send2RN({
                data: req,
                id:iden
            }, c);
        } else {
          if(typeof req == 'string'){
            sendAynsc_({method:req, params:[],id:1}, function(error, result){c(null, result.result)})
          }else{
            sendAynsc_({method:req.method, params:req.params,id:1}, function(error, result){c(null, result.result)})
          }
        }
    }
    let custom_sendPromise = function (req) {
        return new Promise(function (resolve, reject) {
            custom_sendAsync(req, function (err, resp) {
                resolve(resp)
            })
        })
    }
    window.ethereum = {
        isConnected: function () {
            return true;
        },
        chainId: "${chainid}",
        enable: function () {
            return new Promise(function (resolve, reject) {
                resolve(["${address}"])
            })
        },
        selectedAddress: "${address}",
        sendAsync: custom_sendAsync,
        send: custom_sendPromise,
        autoRefreshOnNetworkChange: true,
        _metamask: {
            isApproved: function () {
                return true;
            },
            isEnabled: function () {
                return true;
            },
            isUnlocked: function () {
                return true;
            },
        },
        request: custom_sendPromise,
    }
        
    window.web3.currentProvider.sendAsync = custom_sendAsync;
    window.web3.eth.account = ["${address}"]
    window.web3.ready = true;
`
}