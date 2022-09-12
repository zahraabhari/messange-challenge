import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContext } from "react";
import DataContext from "../../../../context/DataContext";
import UserContext from "../../../../context/UserContext";
import { ContactCard } from "../ContactCard";
import { useRouter } from "next/router";

export const ContactList = (): JSX.Element => {
  const { Users } = useContext(DataContext);
  const { id: myUserId } = useContext(UserContext);
  const router = useRouter();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 1 }}>
        <IconButton onClick={() => router.push("/")}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
      {Users?.filter((item) => item.id !== myUserId).map((user, index) => (
        <ContactCard key={index} {...user} sx={{ mb: 1 }} />
      ))}
    </Box>
  );
};
