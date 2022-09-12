import { Box, IconButton, TextField, useTheme } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { MessageType } from "../../../types";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useContext,
  useState,
} from "react";
import UserContext from "../../../../context/UserContext";
interface ConversationBoxType {
  onSend: (message: MessageType) => void;
}
export const ConversationBox = ({
  onSend,
}: ConversationBoxType): JSX.Element => {
  const { palette } = useTheme();
  const sender = useContext(UserContext);
  const [Text, setText] = useState("");
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value);
  };
  const handleSend = () => {
    if (!Text) return;
    onSend({
      date: new Date().toISOString(),
      id: -1,
      seen: false,
      sender,
      text: Text,
    });
    setText("");
  };
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        borderRadius: "8px",
        position: "relative",
        zIndex: 1,
        mb: 4,
        px: 4,
      }}
    >
      <TextField
        fullWidth
        label="Message"
        sx={{ minHeight: "40px", maxHeight: "400px" }}
        value={Text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <IconButton
        onClick={handleSend}
        disabled={!Text}
        sx={{
          "&:hover": {
            backgroundColor: "transparent",
            svg: { color: palette.primary.main },
          },
          ml: 1,
        }}
      >
        <SendRoundedIcon />
      </IconButton>
    </Box>
  );
};
