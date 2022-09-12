import { Avatar, Box, Typography, useTheme } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserType } from "../../../types";

interface ConversationHeaderType {
  user: UserType;
}

export const ConversationHeader = ({
  user,
}: ConversationHeaderType): JSX.Element => {
  const { palette } = useTheme();
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        py: 1,
        px: 2,
        backgroundColor: palette.neutral.min,
        borderLeft: "1px solid " + palette.neutral[300],
      }}
    >
      <Link href={`/contact/${user.id}`}>
        <a>
          <Avatar
            src={user.image}
            sx={{ width: 50, height: 50 }}
            alt={user.name}
          />
        </a>
      </Link>
      <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
        <Link href={"/profile/" + user.id}>
          <Typography component="span" variant="body1">
            {user.name ? user.name : ""}
          </Typography>
        </Link>
        {user.id && (
          <Typography component="span" variant="body2">
            {moment(user.lastSeen ?? "").fromNow()}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
