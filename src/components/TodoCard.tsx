import { Box, Card, CardContent, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Delete } from "@mui/icons-material/";
import Todo from "../types";

type TodoProps = {
  todo: Todo;
  onDelete: (id: number) => void;
  deleting: boolean;
};

export default function TodoCard(props: TodoProps) {
  const { todo, onDelete, deleting } = props;

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography>#{todo.id}</Typography>
          <LoadingButton
            loading={deleting}
            color="error"
            sx={{ marginLeft: "auto" }}
            onClick={() => onDelete(todo.id)}
          >
            <Delete />
          </LoadingButton>
        </Box>
        <Box>{todo.text}</Box>
      </CardContent>
    </Card>
  );
}
