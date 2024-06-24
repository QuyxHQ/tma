import { CHAIN, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Address, Sender, SenderArguments } from 'ton-core';

type TonConnect = {
    sender: Sender;
    connected: boolean;
    wallet: string | null;
    network: CHAIN | null;
    address: string | null;
};

function useTonConnect(): TonConnect {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();

    return {
        sender: {
            send: async (args: SenderArguments) => {
                await tonConnectUI.sendTransaction({
                    messages: [
                        {
                            address: args.to.toString(),
                            amount: args.value.toString(),
                            payload: args.body?.toBoc().toString('base64'),
                        },
                    ],
                    validUntil: Date.now() + 5 * 60 * 1000,
                });
            },
            address: wallet?.account.address ? Address.parse(wallet.account.address) : undefined,
        },
        connected: !!wallet?.account.address,
        wallet: wallet?.account.address ?? null,
        network: wallet?.account.chain ?? null,
        address: wallet?.account.address ? Address.parse(wallet.account.address).toString() : null,
    };
}

export default useTonConnect;
