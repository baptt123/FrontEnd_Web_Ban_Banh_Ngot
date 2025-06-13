import { Box, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function Actions({ handleSubmit }) {
  const navigate = useNavigate()
  return (
    <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
      <Button onClick={handleSubmit} colorScheme="blue" mr={3}>Cập Nhật</Button>
      <Button onClick={() => navigate('/home')} colorScheme="gray">Trang Chủ</Button>
    </Box>
  )
}

export default Actions
