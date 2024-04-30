import { Address } from "@ton/core";
import useTonClient from "./useTonClient";
import {
  MAINNET_ADDRESSES,
  TESTNET_ADDRESSES,
  NETWORK,
} from "../utils/constants";
import { UNftCollection } from "../contract/wrappers/UNftCollection";
import useAsyncInitialize from "./useAsyncInitialize";

function useContract() {
  const { client } = useTonClient();

  const contract = useAsyncInitialize(async () => {
    if (!client) return;

    const contract = UNftCollection.fromAddress(
      NETWORK == "mainnet"
        ? Address.parse(MAINNET_ADDRESSES.username)
        : Address.parse(TESTNET_ADDRESSES.username)
    );

    return client.open(contract);
  }, [client]);

  return contract;
}

export default useContract;
