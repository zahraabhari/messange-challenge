import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { UserType } from "../../../types";
import { useCallback, useContext, useMemo } from "react";
import DataContext from "../../../../context/DataContext";
import { useRouter } from "next/router";
import moment from "moment";
import UserContext from "../../../../context/UserContext";

interface UserDetailsType {
  icon: JSX.Element;
  title: string;
}
const UserDetails = {
  phoneNumber: {
    icon: <PhoneRoundedIcon />,
    title: "Phone",
  },
  userId: {
    icon: <AlternateEmailRoundedIcon />,
    title: "User Id",
  },
  bio: {
    icon: <ErrorOutlineRoundedIcon />,
    title: "Bio",
  },
};
export const ContactInfo = (): JSX.Element => {
  const { palette } = useTheme();
  const { Users, Conversations, setConversations } = useContext(DataContext);
  const myUser = useContext(UserContext);
  const router = useRouter();
  const id = useMemo(() => Number(router.query.id), [router]);
  const user = useMemo(
    () => Users?.find((item) => item.id === id),
    [router, Users]
  );
  const handleSendMessage = useCallback(() => {
    const conversation = Conversations?.find((item) =>
      item.users.find((user) => user.id === id)
    );
    if (conversation) router.push(`/${conversation.id}`);
    else {
      let conversationId;
      setConversations((current = []) => {
        conversationId = (current?.at(-1)?.id ?? 0) + 1;
        return [
          ...current,
          {
            id: conversationId,
            messages: [],
            users: [user!, myUser],
          },
        ];
      });
      if (conversationId) router.push(`/${conversationId}`);
    }
  }, [Conversations, myUser, user, id]);

  if (id) {
    if (user) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              img: { borderRadius: "100%" },
              mb: 2,
            }}
          >
            <Avatar
              src={user.image}
              sx={{ width: 54, height: 54 }}
              alt={user.name}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                ml: 1,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
                <Typography component="span" variant="h6">
                  {user.name}
                </Typography>
                <Typography
                  component="span"
                  variant="body1"
                  sx={{ color: palette.neutral[300] }}
                >
                  {moment(user.lastSeen ?? "").fromNow()}
                </Typography>
              </Box>
              <Button variant="contained" onClick={handleSendMessage}>
                <Typography component="span" variant="button">
                  Send Message
                </Typography>
              </Button>
            </Box>
          </Box>
          {["phoneNumber", "userId", "bio"].map((item) => {
            const { icon, title } = (UserDetails as any)[item];
            const value = (user as any)[item];
            return (
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                {icon}
                <Box sx={{ display: "flex", flexDirection: "column", ml: 1 }}>
                  <Typography component="span" variant="subtitle1">
                    {value}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body1"
                    sx={{ color: palette.neutral[400] }}
                  >
                    {title}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      );
    } else
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
            Wrong User Id
          </Typography>
        </Box>
      );
  }
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
        No User Selected
      </Typography>
    </Box>
  );
};
