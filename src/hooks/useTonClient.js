import { TonClient } from "ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { NETWORK } from "../utils/constants";
import useAsyncInitialize from "./useAsyncInitialize";

function useTonClient() {
  return {
    client: useAsyncInitialize(async () => {
      return new TonClient({
        endpoint: await getHttpEndpoint({
          network: NETWORK,
        }),
      });
    }, []),
  };
}

export default useTonClient;
