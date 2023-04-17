import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { queries } from "@kenk2/graphql";
import { TodoCard, TodoInput, TodoSorter } from "@kenk2/components";
import Todo from "@kenk2/types";
import getSortFunction from "../utils";

export default function TodoContainer() {
  const { loading, data } = useQuery(queries.GET_TODOS);

  const [deleteId, setDeleteId] = useState<undefined | number>();
  const [editId, setEditId] = useState<undefined | number>();
  const [sortMode, setSortMode] = useState<number>(0);

  const [deleteTodos] = useMutation(queries.DELETE_TODO, {
    onCompleted: () => setDeleteId(undefined),
    refetchQueries: [queries.GET_TODOS],
  });
  const [editTodos] = useMutation(queries.UPDATE_TODO, {
    onCompleted: () => setEditId(undefined),
    refetchQueries: [queries.GET_TODOS],
  });

  const handleDelete = (id: number) => {
    setDeleteId(id);
    if (editId === id) {
      setEditId(undefined);
    }
    deleteTodos({ variables: { id } });
  };

  const handleEdit = (id: number, text: string) => {
    editTodos({ variables: { id, text } });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ marginBottom: "8px" }}>GraphQL Todos</Typography>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
      <TodoInput />
      <TodoSorter onChange={(mode) => setSortMode(mode)} />
      {!loading &&
        [...data.todos]
          .sort(getSortFunction(sortMode))
          .map((todo: Todo) => (
            <TodoCard
              todo={todo}
              key={todo.id}
              onEditToggle={(id) => setEditId(id)}
              onDelete={handleDelete}
              onEditSave={handleEdit}
              editting={todo.id === editId}
              deleting={todo.id === deleteId}
            />
          ))}
    </Box>
  );
}
