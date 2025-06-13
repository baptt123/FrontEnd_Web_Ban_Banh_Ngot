import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../store/actions/action";

const AccountSettings = ({ userData, handleInputChange }) => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user.profileId) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  if (loading) {
    return <Text>Đang tải thông tin...</Text>;
  }

  if (!user) {
    return <Text>Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.</Text>;
  }

  return (
    <Box p={4}>
      <VStack spacing={8} align="stretch">
        <Box as="form">
          <VStack spacing={4}>
            <Grid templateColumns="repeat(2, 1fr)" gap={4} width="full">
              <GridItem>
                <FormControl>
                  <FormLabel>Họ và tên</FormLabel>
                  <Input
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Số điện thoại</FormLabel>
                  <Input
                    name="phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Ngày sinh</FormLabel>
                  <Input
                    name="dateOfBirth"
                    type="date"
                    value={userData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </GridItem>
            </Grid>

            <FormControl mt={4}>
              <FormLabel>Địa chỉ</FormLabel>
              <Input
                name="address"
                value={userData.address}
                onChange={handleInputChange}
              />
            </FormControl>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default AccountSettings;
