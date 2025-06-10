import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  VStack,
  HStack,
  Text,
  useToast,
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { Link } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../../store/actions/action";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    fullName: "",
    address: "",
    dateOfBirth: "",
    avatar: "",
    email: "",
    phone: "",
  });
  const [originalUserData, setOriginalUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const toast = useToast();

  // Cloudinary credentials (replace with your actual values or environment variables)
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Effect để fetch profile nếu chưa có
  useEffect(() => {
    if (!user.profileId) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  // Effect để cập nhật state cục bộ khi user (từ Redux) thay đổi
  useEffect(() => {
    if (user && user.profileId) {
      const transformedUser = {
        fullName: user.name || "",
        address: user.address || "",
        dateOfBirth: user.dateOfBirth || "",
        avatar: user.avatar || "",
        email: user.email || "",
        phone: user.phone || "",
      };
      setUserData(transformedUser);
      setOriginalUserData(transformedUser);
      setPreviewUrl(user.avatar || null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalAvatarUrl = previewUrl || userData.avatar;
      let dataToUpdate = {};

      if (selectedImage) {
        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append('file', selectedImage);
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
        finalAvatarUrl = cloudinaryData.secure_url;
        dataToUpdate.avatarUrl = finalAvatarUrl;
      }

      // Compare current userData with originalUserData and add only changed fields
      for (const key in userData) {
        if (userData[key] !== originalUserData[key] && key !== 'avatar' && key !== 'email' && key !== 'phone') {
          // Map local state keys to API keys if necessary
          if (key === 'fullName') {
            dataToUpdate.fullName = userData[key];
          } else if (key === 'dateOfBirth') {
            dataToUpdate.birthDate = userData[key];
          } else {
            dataToUpdate[key] = userData[key];
          }
        }
      }

      // If no changes and no new image, don't make API call
      if (Object.keys(dataToUpdate).length === 0) {
        toast({
          title: "Không có thay đổi để cập nhật.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        setIsEditing(false);
        return;
      }

      await dispatch(updateUserProfile(dataToUpdate));

      setIsEditing(false);
      setSelectedImage(null); // Reset selected image after successful upload and update
    } catch (error) {
      
    }
  };

  if (loading) {
    return <Text>Đang tải thông tin...</Text>;
  }

  if (!user) {
    return <Text>Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.</Text>;
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Grid templateColumns="repeat(12, 1fr)" gap={8}>
        {/* Avatar Section */}
        <GridItem colSpan={{ base: 12, md: 4 }}>
          <VStack spacing={6} align="center">
            <Box
              position="relative"
              _hover={{
                '& .avatar-overlay': {
                  opacity: 1,
                },
              }}
            >
              <Avatar
                size="2xl"
                src={previewUrl || userData.avatar}
                name={userData.fullName}
              />
              {isEditing && (
                <Box
                  className="avatar-overlay"
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  bg="rgba(0,0,0,0.6)"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  opacity="0"
                  transition="opacity 0.2s ease-in-out"
                >
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    display="none"
                    id="avatar-upload"
                  />
                  <label htmlFor="avatar-upload">
                    <Button
                      as="span"
                      size="md"
                      colorScheme="blue"
                      cursor="pointer"
                      fontWeight="bold"
                    >
                      Thay đổi
                    </Button>
                  </label>
                </Box>
              )}
            </Box>
            <Text fontSize="xl" fontWeight="bold">
              {userData.fullName}
            </Text>
          </VStack>
        </GridItem>

        {/* Form Section */}
        <GridItem colSpan={{ base: 12, md: 8 }}>
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={8} align="stretch">
              <FormControl>
                <FormLabel>Họ và tên</FormLabel>
                <Input
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  isDisabled={!isEditing}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  isDisabled={true}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Số điện thoại</FormLabel>
                <Input
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  isDisabled={true}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Ngày sinh</FormLabel>
                <Input
                  name="dateOfBirth"
                  type="date"
                  value={userData.dateOfBirth}
                  onChange={handleInputChange}
                  isDisabled={!isEditing}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Địa chỉ</FormLabel>
                <Input
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  isDisabled={!isEditing}
                />
              </FormControl>

              <HStack spacing={4} justify="flex-end">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setUserData(originalUserData);
                        setSelectedImage(null);
                        setPreviewUrl(originalUserData.avatar || null);
                      }}
                    >
                      Hủy
                    </Button>
                    <Button type="submit" colorScheme="blue">
                      Lưu thay đổi
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} colorScheme="blue">
                    Chỉnh sửa
                  </Button>
                )}
              </HStack>
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
};

export default UserProfilePage; 