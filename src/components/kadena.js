import { Pact, createClient } from '@kadena/client';

const network = 'testnet04'

export const pactCalls = async(code, chain) => {
    const pactClient = createClient(`https://api.testnet.chainweb.com/chainweb/0.0/${network}/chain/${chain}/pact`)
    
    const tx = Pact.builder
                 .execution(code)
                 .setMeta({
                    chainId: String(chain),
                    gasLimit: 1000,
                    gasPrice: 0.0000001,
                 })
                 .setNetworkId(network)
                 .createTransaction();
                 
    try{
        const res = await pactClient.dirtyRead(tx)
        return res.result.data;
    } catch {
        console.error('Error fetching account details:', error)

        return null;
    }
}