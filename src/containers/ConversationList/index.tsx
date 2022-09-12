import { Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import Link from "next/link";
import { useContext } from "react";
import DataContext from "../../context/DataContext";
import { ConversationCard } from "./components/ConversationCard";

export const ConversationList = (): JSX.Element => {
  const { palette } = useTheme();
  const { Conversations } = useContext(DataContext);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          px: 2,
          py: "11px",
          borderBottom: "1px solid " + palette.neutral[300],
          mb: 2,
        }}
      >
        <Link href="/contact">
          <a>
            <Button>
              <Typography component="span" variant="h6">
                Contact
              </Typography>
            </Button>
          </a>
        </Link>
      </Box>
      {Conversations?.sort((a, b) =>
        moment(a.messages.at(-1)?.date ?? "").isBefore(
          moment(b.messages.at(-1)?.date ?? "")
        )
          ? 1
          : -1
      ).map((item, index) => (
        <ConversationCard key={index} {...item} />
      ))}
    </Box>
  );
};
