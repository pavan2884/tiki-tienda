import { Box, Divider, Link, Stack, Theme, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";

type NFT = {
  image: string;
  name: string;
};

type Props = {
  tiki: NFT;
};

const Tiki = ({ tiki }: Props) => {
  const { image, name } = tiki;
  console.log(tiki);
  const downlg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const upxl = useMediaQuery((theme: Theme) => theme.breakpoints.up("xl"));
  const matches = downlg || upxl;

  return (
    <Box>
      <Image src={image} alt="" />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        p={1}
      >
        <Typography
          sx={{ fontFamily: "Raleway" }}
          color="white"
          variant={matches ? "h6" : "subtitle1"}
        >
          {name}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Tiki;
