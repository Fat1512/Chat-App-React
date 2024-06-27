import { useEffect } from "react";
import { request } from "../utils/helper";

function AppLayout() {
  useEffect(function () {
    async function k() {
      const xx = await request("api/v1/phatdeptrai/demo-controller");
      console.log(xx.data);
    }

    k();
  }, []);
  return (
    <main className=" bg-gray-800 pb-7 text-white ">
      <h1>Phat </h1>
    </main>
  );
}

export default AppLayout;
