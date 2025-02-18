import { accordionSummaryClasses } from "@mui/material";
import { startTransition, useEffect, useState } from "react";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import { useSearchParams } from "react-router-dom";
function CallbackOauth() {
  const [dotLoading, setDotLoading] = useState("");
  const { googleLogin, getOauthAuthorizationCode } = useGoogleLogin();

  useEffect(() => {
    console.log();
    // googleLogin(getOauthAuthorizationCode());
    setInterval(() => {
      setDotLoading((state) => {
        return state.length >= 3 ? "" : state + ".";
      });
    }, 500);

    (async function login() {
      const authorizationCode = await getOauthAuthorizationCode();
      googleLogin(authorizationCode);
    })();
  }, []);
  return <div className="text-3xl">Logging in {dotLoading}</div>;
}

export default CallbackOauth;
