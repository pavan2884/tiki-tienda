import { Box, Divider, Stack, Theme, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

type NFT = {
  image: string;
  name: string;
  description: string;
  collection: {
    name: string;
    family: string;
  };
};

type Props = {
  tiki: NFT;
};

const Tiki = ({ tiki }: Props) => {
  const { image, name, collection } = tiki;
  const downlg = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const upxl = useMediaQuery((theme: Theme) => theme.breakpoints.up("xl"));
  const matches = downlg || upxl;

  return (
    <Box>
      <img src={image} alt="" width="100%" />
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
          {name + " (" + collection.family + ")"}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Tiki;
