/* eslint-disable */
//import Clock from './Clock';
//import Flags from '../Flags/Flags';
import Separador from './Separador';
import SelectHemisphere from '../SelectHemisphere';
import WithLove from '../WithLove'
import { Block, HStack, Spacer, Container } from '../Layout'

const Header = () => {
  return (
    <header className="py-4">
      <Container>
        <Block>
          <HStack>
            <figure className="logo w-auto">
              <img  src="/img/Logo_Fish_Inc.png" alt="FishInc." />
            </figure>
            <Separador />
            <SelectHemisphere />
            <Spacer/>
            <WithLove/>
          </HStack>
        </Block>
      </Container>
    </header>
  );
};

export default Header
