import { Box, Typography, useTheme } from "@mui/material";
import { ReactNode, useContext } from "react";
import moment from "moment";
import { MessageType } from "../../../types";
import UserContext from "../../../../context/UserContext";
import ChatMessage from "./components/ChatMessage";

interface ConversationBodyType {
  messages: MessageType[];
}
export const ConversationBody = ({
  messages,
}: ConversationBodyType): JSX.Element => {
  const { palette } = useTheme();
  const myUser = useContext(UserContext);

  const dateFormater = (date: string) => {
    if (!date) return undefined;
    const mDate = moment(date);
    if (moment().year() !== mDate.year()) return mDate.format("DD MMM, YYYY");
    return mDate.format("DD MMM");
  };

  return (
    <Box
      sx={{
        position: "relative",
        flexGrow: 1,
        overflow: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column-reverse",
        px: 2.5,
      }}
    >
      {messages.length > 0 ? (
        [...messages].reverse().map((item, index) => {
          const currentMessageDate = dateFormater(item.date);
          const prevMessageDate = dateFormater(messages[index + 1]?.date);
          let showDateLabel = false;
          if (
            index === messages.length - 1 ||
            prevMessageDate !== currentMessageDate
          )
            showDateLabel = true;
          return (
            <ChatMessage
              key={index}
              data={item}
              isMine={myUser && item.sender.id === myUser.id}
            >
              {showDateLabel && (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 1.5,
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    component="span"
                    variant="caption"
                    sx={{
                      textAlign: "center",
                      background: palette.neutral[300],
                      borderRadius: "50px",
                      color: palette.neutral.min,
                      py: 0.25,
                      px: 1.25,
                    }}
                  >
                    {currentMessageDate}
                  </Typography>
                </Box>
              )}
            </ChatMessage>
          );
        })
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            component="span"
            variant="subtitle2"
            sx={{
              backgroundColor: palette.neutral[200],
              borderRadius: "4px",
              py: 1,
              px: 1.5,
              color: palette.neutral[600],
            }}
          >
            No messages here yet...
          </Typography>
        </Box>
      )}
    </Box>
  );
};
