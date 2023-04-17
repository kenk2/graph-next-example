import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { queries } from "@kenk2/graphql";
import { TodoCard, TodoInput } from "@kenk2/components";
import Todo from "@kenk2/types";

export default function TodoContainer() {
  const { loading, data } = useQuery(queries.GET_TODOS);
  const [deleteId, setDeleteId] = useState<undefined | number>();
  const [editId, setEditId] = useState<undefined | number>();
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
    <Box sx={{ width: "100%" }}>
      <Typography sx={{ marginBottom: "8px" }}>GraphQL Todos</Typography>
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
      <TodoInput />
      {data?.todos?.map((todo: Todo) => (
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
