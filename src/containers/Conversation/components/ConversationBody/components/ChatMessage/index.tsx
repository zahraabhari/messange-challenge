import { Box, Typography, useTheme } from "@mui/material";
import moment from "moment";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { ReactNode } from "react";
import { MessageType } from "../../../../../types";

interface ChatMessageType {
  data: MessageType;
  isMine: boolean;
  children: ReactNode;
}
const ChatMessage = ({ data, isMine, children }: ChatMessageType) => {
  const { palette } = useTheme();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexShrink: 0,
          mb: 1,
          ".message-box": {
            ...(isMine
              ? {
                  ml: "auto",
                  alignItems: "flex-end",
                  backgroundColor: palette.primary[100],
                }
              : {}),
          },
        }}
      >
        <Box className="message-box">
          {data.text && (
            <Box
              sx={{
                color: palette.neutral[900],
                py: 1,
                px: 1.5,
                wordBreak: "break-all",
                whiteSpace: "break-spaces",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography component="span" variant="body2">
                {data.text}
              </Typography>
              <Typography
                component="span"
                variant="caption"
                sx={{
                  textAlign: "right",
                  mt: 0.5,
                  color: isMine ? palette.primary[400] : palette.neutral[400],
                  ml: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {moment(data.date).format("LT")}
                {isMine &&
                  (data.seen ? <DoneAllRoundedIcon /> : <DoneRoundedIcon />)}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      {children}
    </>
  );
};
export default ChatMessage;
