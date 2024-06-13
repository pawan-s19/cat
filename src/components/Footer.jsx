import { Paper } from "@mui/material";

export default function Footer() {
  return (
    <Paper
      sx={{
        width: "100vw",
        position: "absolute",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        color: "gray",
        padding: 2,
      }}
    >
      Powered By CATApi
    </Paper>
  );
}
