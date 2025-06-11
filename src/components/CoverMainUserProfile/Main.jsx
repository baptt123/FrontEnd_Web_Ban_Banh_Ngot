import { Container } from '@chakra-ui/react'
import Content from '../ContentUserProfile/Content.jsx'
import Sidebar from '../SidebarUserProfile/Sidebar.jsx'

export default function Main() {
  return (
    <Container display={{ base: 'block', md: 'flex' }} maxW="container.xl">
      <Sidebar />
      <Content />
    </Container>
  )
}
