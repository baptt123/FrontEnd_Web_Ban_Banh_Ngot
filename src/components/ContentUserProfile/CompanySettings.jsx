import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../store/actions/action';

const CompanySettings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const toast = useToast();

  const [companyData, setCompanyData] = useState({
    companyName: user?.companyName || '',
    companyAddress: user?.companyAddress || '',
    taxCode: user?.taxCode || '',
    businessLicense: user?.businessLicense || '',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile(companyData));
      toast({
        title: 'Cập nhật thông tin công ty thành công',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: 'Có lỗi xảy ra khi cập nhật thông tin',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={8} align="stretch">
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Tên công ty</FormLabel>
              <Input
                name="companyName"
                value={companyData.companyName}
                onChange={handleInputChange}
                isDisabled={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Địa chỉ công ty</FormLabel>
              <Input
                name="companyAddress"
                value={companyData.companyAddress}
                onChange={handleInputChange}
                isDisabled={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Mã số thuế</FormLabel>
              <Input
                name="taxCode"
                value={companyData.taxCode}
                onChange={handleInputChange}
                isDisabled={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Giấy phép kinh doanh</FormLabel>
              <Input
                name="businessLicense"
                value={companyData.businessLicense}
                onChange={handleInputChange}
                isDisabled={!isEditing}
              />
            </FormControl>

            <Button
              type={isEditing ? "submit" : "button"}
              colorScheme="blue"
              onClick={() => !isEditing && setIsEditing(true)}
              mt={4}
            >
              {isEditing ? "Lưu thay đổi" : "Chỉnh sửa"}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default CompanySettings;
