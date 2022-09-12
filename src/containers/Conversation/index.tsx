import { Box, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import DataContext from "../../context/DataContext";
import UserContext from "../../context/UserContext";
import { ConversationType, MessageType } from "../types";
import { ConversationBody } from "./components/ConversationBody";
import { ConversationBox } from "./components/ConversationBox";
import { ConversationHeader } from "./components/ConversationHeader";

const User = [
  {
    image: "/images/user.png",
    id: 10,
    name: "zahra",
    lastSeen: "Online",
  },
];
export const Conversation = (): JSX.Element => {
  const { palette } = useTheme();
  const router = useRouter();
  const id = useMemo(() => Number(router.query.id), [router]);
  const { id: myUserId } = useContext(UserContext);
  const { Conversations, setConversations } = useContext(DataContext);

  const conversation = useMemo(
    () => Conversations?.find((item) => item.id === id),
    [router, Conversations]
  );

  const handleNewMessage = (message: MessageType) => {
    setConversations((current) =>
      current?.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            messages: [
              ...item.messages,
              { ...message, id: (item.messages.at(-1)?.id ?? 0) + 1 },
            ],
          };
        }
        return item;
      })
    );
    setTimeout(handleFakeResponse, 2000);
  };
  const handleFakeResponse = () => {
    setConversations((current) =>
      current?.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            messages: [
              ...item.messages.map((item) => ({ ...item, seen: true })),
              {
                id: (item.messages.at(-1)?.id ?? 0) + 1,
                text: "Hello,this is an automatic response",
                seen: false,
                date: new Date().toISOString(),
                sender: conversation?.users.find(
                  (item) => item.id !== myUserId
                )!,
              },
            ],
          };
        }
        return item;
      })
    );
  };
  useEffect(() => {
    if (
      conversation?.messages.filter(
        (item) => !item.seen && item.sender.id !== myUserId
      )?.length
    )
      setConversations((current) =>
        current?.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              messages: item.messages.map((item) => ({ ...item, seen: true })),
            };
          }
          return item;
        })
      );
  }, [conversation?.messages]);
  if (id)
    if (conversation)
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            backgroundColor: palette.primary[50],
          }}
        >
          <ConversationHeader
            user={conversation.users.find((item) => item.id !== myUserId)!}
          />

          <ConversationBody messages={conversation.messages} />

          <ConversationBox onSend={handleNewMessage} />
        </Box>
      );
    else
      return (
        <Box sx={{ height: "100%", backgroundColor: palette.primary[50] }}>
          <Typography
            component="span"
            variant="h5"
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              alignItems: "center",
            }}
          >
            Wrong Conversation Id
          </Typography>
        </Box>
      );
  return (
    <Box sx={{ height: "100%", backgroundColor: palette.primary[50] }}>
      <Typography
        component="span"
        variant="h5"
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          alignItems: "center",
        }}
      >
        No Message Selected
      </Typography>
    </Box>
  );
};
