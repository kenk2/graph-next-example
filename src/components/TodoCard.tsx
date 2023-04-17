import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material/";
import Todo from "../types";

type TodoProps = {
  todo: Todo;
  onDelete: (id: number) => void;
};

export default function TodoCard(props: TodoProps) {
  const { todo, onDelete } = props;

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography>#{todo.id}</Typography>
          <IconButton
            color="error"
            sx={{ marginLeft: "auto" }}
            onClick={() => onDelete(todo.id)}
          >
            <Delete />
          </IconButton>
        </Box>
        <Box>{todo.text}</Box>
      </CardContent>
    </Card>
  );
}
