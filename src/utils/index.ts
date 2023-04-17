import { sortModes } from "@kenk2/constants";
import Todo from "@kenk2/types";

export default function getSortFunction(mode: number) {
  if (mode === sortModes.createdAsc || mode === sortModes.createdDesc) {
    return (a: Todo, b: Todo) => {
      const mult = mode === sortModes.createdAsc ? 1 : -1;
      if (a.created_at > b.created_at) {
        return mult * -1;
      }
      if (a.created_at > b.created_at) {
        return mult * 1;
      }
      return 0;
    };
  }
  return (a: Todo, b: Todo) => {
    const mult = mode === sortModes.edittedAsc ? 1 : -1;
    if (!a.editted_at) {
      return 1;
    }
    if (!b.editted_at) {
      return -1;
    }
    if (a.editted_at > b.editted_at) {
      return mult * -1;
    }
    if (a.editted_at > b.editted_at) {
      return mult * 1;
    }
    return 0;
  };
}
