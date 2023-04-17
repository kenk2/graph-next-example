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

  const handleEnter = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter") {
      handleSubmit();
    }
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
        onKeyDown={handleEnter}
        onChange={(evt) => setText(evt.target.value)}
      />
      <Box sx={{ display: "flex", marginTop: "12px" }}>
        <LoadingButton
          loading={loading}
          variant="outlined"
          color="info"
          sx={{ marginLeft: "auto", marginRight: "8px" }}
          onClick={() => setText("")}
        >
          Clear
        </LoadingButton>
        <LoadingButton
          variant="contained"
          loading={loading}
          disabled={text.length === 0}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
}
