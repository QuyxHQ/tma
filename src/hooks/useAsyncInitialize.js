import { useEffect, useState } from "react";

function useAsyncInitialize(func, deps = []) {
  const [state, setState] = useState();

  useEffect(() => {
    (async () => setState(await func()))();
  }, deps);

  return state;
}

export default useAsyncInitialize;
