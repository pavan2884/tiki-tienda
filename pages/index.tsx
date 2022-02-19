import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { NextPage } from "next";
import GridTemplateAreas from "./components/GridTemplateAreas";


const ContainerWrapper = styled(Container)`
  background-image: url(/assets/background.png);
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: #ffaf70;
  height: 56.25vw;
`;

const Home: NextPage = () => {
  return (
    <ContainerWrapper maxWidth="xl" disableGutters>
      <GridTemplateAreas />
    </ContainerWrapper>
  );
};

export default Home;
