import { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import { Outlet } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { Box, Grid, Paper, styled, Container } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function AppLayout() {
  const { connected, stompClient } = useSocket();

  useEffect(() => {
    if (connected) {
      console.log("Connected status: ", connected, stompClient);
      stompClient.subscribe(`/topic/room`, (message) => {
        console.log(JSON.parse(message.body));
      });
    }
  }, [connected]);

  return (
    <Container sx={{ bgcolor: "tomato", height: "100vh" }}>hwllo</Container>
  );
}

export default AppLayout;
{
  /* <h1>Phat </h1>
      <button onClick={() => {}}>disconnect</button>
      <br />
      <button
        onClick={() => {
          stompClient.connect({}, function () {});
        }}
      >
        connect
      </button> */
}
