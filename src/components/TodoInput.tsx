import { useMutation } from "@apollo/client";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";

import { queries } from "@kenk2/graphql";

export default function TodoInput() {
  const [text, setText] = useState("");
  const [addTodo, { loading }] = useMutation(queries.ADD_TODO, {
    onCompleted: () => {
      setText("");
    },
    refetchQueries: [queries.GET_TODOS],
  });

  const handleSubmit = () => {
    addTodo({ variables: { text } });
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
        value={text}
        fullWidth
        disabled={loading}
        onChange={(evt) => setText(evt.target.value)}
      />
      <Box sx={{ display: "flex", marginTop: "12px" }}>
        <LoadingButton
          disabled={loading}
          variant="outlined"
          color="info"
          sx={{ marginLeft: "auto", marginRight: "8px" }}
        >
          Clear
        </LoadingButton>
        <LoadingButton
          variant="contained"
          disabled={text.length === 0 || loading}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
}
