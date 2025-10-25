import { Container, HStack } from './Layout'
import Title from './Title/Title.js'
import ButtonGroup from './ButtonGroup/ButtonGroup'

function Actions() {
  return (
    <div className="py-3">
      <Container>
        <HStack>
          <Title>
            In Water!
          </Title>
          <ButtonGroup/>
        </HStack>
      </Container>
    </div>
  )
}

export default Actions
