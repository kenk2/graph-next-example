import { FormControl, MenuItem, Select } from "@mui/material";
import { sortModes } from "../constants";

type TodoSorterProps = {
  onChange: (mode: number) => void;
};

export default function TodoSorter(props: TodoSorterProps) {
  const { onChange } = props;

  return (
    <FormControl
      sx={{
        maxWidth: "300px",
        margin: "0 auto",
      }}
    >
      <Select
        defaultValue={sortModes.createdAsc}
        onChange={(evt) => onChange(Number(evt.target.value))}
      >
        <MenuItem value={sortModes.createdAsc}>Created: By Latest</MenuItem>
        <MenuItem value={sortModes.createdDesc}>Created: By Earliest</MenuItem>
        <MenuItem value={sortModes.edittedAsc}>Editted: By Latest</MenuItem>
        <MenuItem value={sortModes.edittedDesc}>Editted: By Earliest</MenuItem>
      </Select>
    </FormControl>
  );
}
