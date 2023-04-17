import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Delete, Edit } from "@mui/icons-material/";
import Todo from "@kenk2/types";

type TodoProps = {
  todo: Todo;
  onDelete: (id: number) => void;
  onEditToggle: (id?: number) => void;
  onEditSave: (id: number, text: string) => void;
  deleting: boolean;
  editting: boolean;
};

export default function TodoCard(props: TodoProps) {
  const { todo, onDelete, onEditSave, onEditToggle, deleting, editting } =
    props;
  const [editText, setEditText] = useState<string>(todo.text);

  const handleToggleEdit = () => {
    if (editting) {
      setEditText(todo.text);
      onEditToggle(undefined);
    } else {
      onEditToggle(todo.id);
    }
  };

  const handleEnter = (evt: React.KeyboardEvent) => {
    if (evt.key === "Enter") {
      onEditSave(todo.id, editText);
    }
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography>#{todo.id}</Typography>
          <LoadingButton onClick={handleToggleEdit} sx={{ marginLeft: "auto" }}>
            <Edit />
          </LoadingButton>
          <LoadingButton
            sx={{ marginLeft: "8px" }}
            loading={deleting}
            color="error"
            onClick={() => onDelete(todo.id)}
          >
            <Delete />
          </LoadingButton>
        </Box>
        <Box>
          {editting ? (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                sx={{ marginTop: "8px" }}
                value={editText}
                onChange={(evt) => setEditText(evt.target.value)}
                onKeyDown={handleEnter}
              />
              <Button
                sx={{ marginLeft: "auto", marginTop: "8px" }}
                onClick={() => onEditSave(todo.id, editText)}
              >
                Save
              </Button>
            </Box>
          ) : (
            todo.text
          )}
        </Box>
        <Box>{new Date(todo.created_at).toLocaleString()}</Box>
      </CardContent>
    </Card>
  );
}
