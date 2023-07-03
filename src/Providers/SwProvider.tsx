import { useRegisterSW } from "virtual:pwa-register/react";

function SwProvider({ children }) {
  useRegisterSW({
    onRegistered(r) {},
    onRegisterError(error) {},
  });

  return children;
}

export default SwProvider;
