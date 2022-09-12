import {
  Avatar,
  Box,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { UserType } from "../../../types";

interface ContactCardType extends UserType {
  sx?: SxProps<Theme>;
}
export const ContactCard = ({
  id,
  image,
  name,
  lastSeen,
  sx,
}: ContactCardType): JSX.Element => {
  const { palette } = useTheme();

  const router = useRouter();
  const handleClick = () => {
    router.push(`/contact/${id}`);
  };
  const isActive = useMemo(() => Number(router.query.id) === id, [router, id]);
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
      <Avatar src={image} sx={{ width: 54, height: 54 }} alt={name} />
      <Box
        sx={{ display: "flex", flexDirection: "column", ml: 1, width: "100%" }}
      >
        <Typography component="span" variant="subtitle1">
          {name}
        </Typography>
        <Typography
          component="span"
          variant="body2"
          sx={{ color: isActive ? palette.neutral.min : palette.neutral[400] }}
        >
          {moment(lastSeen ?? "").fromNow()}
        </Typography>
      </Box>
    </Box>
  );
};
