import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

export default function TodoInput() {
  const [text, setText] = useState("");

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: "12px",
      }}
    >
      <TextField
        multiline
        fullWidth
        onChange={(evt) => setText(evt.target.value)}
      />
      <Box sx={{ display: "flex", marginTop: "12px" }}>
        <Button
          variant="outlined"
          color="info"
          sx={{ marginLeft: "auto", marginRight: "8px" }}
        >
          Clear
        </Button>
        <Button variant="contained" disabled={text.length === 0}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
