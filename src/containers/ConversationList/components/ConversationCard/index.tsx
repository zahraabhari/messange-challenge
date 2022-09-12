import {
  Avatar,
  Box,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useMemo } from "react";
import moment from "moment";
import UserContext from "../../../../context/UserContext";
import { ConversationType, MessageType, UserType } from "../../../types";

interface ConversationCardType extends ConversationType {
  sx?: SxProps<Theme>;
}
export const ConversationCard = ({
  id,
  messages,
  users,
  sx,
}: ConversationCardType): JSX.Element => {
  const { palette } = useTheme();
  const myUser = useContext(UserContext);
  const user = useMemo(
    () => users.find((item) => item.id !== myUser.id),
    [users, myUser]
  );
  const router = useRouter();
  const handleClick = () => {
    router.push(`/${id}`);
  };
  const unSeenCount = useMemo(
    () =>
      messages?.filter((item) => !item.seen && item.sender.id !== myUser.id)
        .length,
    [messages]
  );
  const isActive = useMemo(() => Number(router.query.id) === id, [router, id]);
  console.log("last =>", messages);
  return (
    <Box
      onClick={handleClick}
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "12px",
        img: { borderRadius: "100%" },
        p: 1.5,
        "&:hover": {
          backgroundColor: palette.neutral[300],
        },
        backgroundColor: isActive ? palette.primary[300] : undefined,
        color: isActive ? palette.neutral.min : undefined,
        ...sx,
      }}
    >
      <Avatar
        src={user?.image}
        sx={{ width: 54, height: 54 }}
        alt={user?.name}
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", ml: 1, width: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography component="span" variant="subtitle1">
            {user?.name}
          </Typography>
          <Typography component="span" variant="body2">
            {moment(messages?.at(-1)?.date).format("MMM DD")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            component="span"
            variant="body1"
            sx={{
              color: isActive ? palette.neutral.min : palette.neutral[500],
            }}
          >
            {messages?.at(-1)?.text}
          </Typography>
          {unSeenCount > 0 && (
            <Typography
              component="span"
              variant="body2"
              sx={{
                minWidth: "24px",
                height: "24px",
                borderRadius: "12px",
                backgroundColor: palette.success.main,
                textAlign: "center",
                p: 0.5,
              }}
            >
              {unSeenCount}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
