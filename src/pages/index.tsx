import Head from "next/head";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@apollo/client";

import styles from "@/styles/Home.module.css";
import { queries } from "@kenk2/graphql";
import { TodoCard, TodoInput } from "@kenk2/components";
import Todo from "@kenk2/types";

export default function Home() {
  const { loading, data } = useQuery(queries.GET_TODOS);
  const [deleteId, setDeleteId] = useState<undefined | number>();

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Typography sx={{ marginBottom: "8px" }}>GraphQL Todos</Typography>
        <Backdrop open={deleteId !== undefined || loading}>
          <CircularProgress />
        </Backdrop>
        <TodoInput />
        {data?.todos?.map((todo: Todo) => (
          <TodoCard todo={todo} key={todo.id} onDelete={handleDelete} />
        ))}
      </main>
    </>
  );
}
