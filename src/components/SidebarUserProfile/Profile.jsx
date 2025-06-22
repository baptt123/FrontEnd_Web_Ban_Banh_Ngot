import { useState, useRef, useEffect } from 'react'
import {
  Avatar,
  AvatarBadge,
  Badge,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../store/actions/action";

function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const toast = useToast();

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const profileImageInputRef = useRef(null)

  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    if (user && user.avatar) {
      setPreviewUrl(user.avatar);
    }
  }, [user]);

  const openChooseImage = () => {
    profileImageInputRef.current.click()
  }

  const changeProfileImage = async (event) => {
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
    const selected = event.target.files[0]

    if (selected && ALLOWED_TYPES.includes(selected.type)) {
      setSelectedImage(selected);
      let reader = new FileReader()
      reader.onloadend = () => setPreviewUrl(reader.result)
      reader.readAsDataURL(selected)

      try {
        const formData = new FormData();
        formData.append('file', selected);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (!cloudinaryResponse.ok) {
          throw new Error('Failed to upload image to Cloudinary');
        }

        const cloudinaryData = await cloudinaryResponse.json();
        const newAvatarUrl = cloudinaryData.secure_url;

        dispatch(updateUserProfile({ avatarUrl: newAvatarUrl })).then(() => {
          toast({
            title: "Cập nhật ảnh đại diện thành công.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        });
      } catch (error) {
        toast({
          title: "Có lỗi xảy ra khi cập nhật ảnh đại diện.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      onOpen()
    }
  }

  return (
    <VStack spacing={3} py={5} borderBottomWidth={1} borderColor="brand.light">
      <Avatar
        size="2xl"
        name={String(user?.name) || "Người dùng"}
        cursor="pointer"
        onClick={openChooseImage}
        src={previewUrl || '/img/tim-cook.jpg'}
      >
        <AvatarBadge bg="brand.blue" boxSize="1em">
          <svg width="0.4em" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
            />
          </svg>
        </AvatarBadge>
      </Avatar>
      <Input
        hidden
        type="file"
        ref={profileImageInputRef}
        onChange={changeProfileImage}
        accept="image/*"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đã xảy ra lỗi</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>File không được hỗ trợ!</Text>
            <HStack mt={1}>
              <Text color="brand.cadet" fontSize="sm">
                Các định dạng được hỗ trợ:
              </Text>
              <Badge colorScheme="green">PNG</Badge>
              <Badge colorScheme="green">JPG</Badge>
              <Badge colorScheme="green">JPEG</Badge>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Đóng</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack spacing={1}>
        <Heading as="h3" fontSize="xl" color="brand.dark">
          {String(user?.name) || "Người dùng"}
        </Heading>
      </VStack>
    </VStack>
  )
}

export default Profile
