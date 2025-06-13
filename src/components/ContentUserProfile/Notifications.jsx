import React, { useState } from 'react';
import {
  Box,
  VStack,
  Switch,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../store/actions/action';

const Notifications = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const toast = useToast();

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: user?.emailNotifications || false,
    orderUpdates: user?.orderUpdates || false,
    promotions: user?.promotions || false,
    newsLetter: user?.newsLetter || false,
  });

  const handleToggle = async (setting) => {
    try {
      const newSettings = {
        ...notificationSettings,
        [setting]: !notificationSettings[setting],
      };
      
      setNotificationSettings(newSettings);
      await dispatch(updateUserProfile({ [setting]: newSettings[setting] }));
      
      toast({
        title: 'Cập nhật cài đặt thông báo thành công',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Có lỗi xảy ra khi cập nhật cài đặt',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={6} align="stretch">
        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Thông báo qua email</FormLabel>
          <Switch
            isChecked={notificationSettings.emailNotifications}
            onChange={() => handleToggle('emailNotifications')}
            colorScheme="blue"
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Cập nhật đơn hàng</FormLabel>
          <Switch
            isChecked={notificationSettings.orderUpdates}
            onChange={() => handleToggle('orderUpdates')}
            colorScheme="blue"
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Khuyến mãi và ưu đãi</FormLabel>
          <Switch
            isChecked={notificationSettings.promotions}
            onChange={() => handleToggle('promotions')}
            colorScheme="blue"
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Bản tin</FormLabel>
          <Switch
            isChecked={notificationSettings.newsLetter}
            onChange={() => handleToggle('newsLetter')}
            colorScheme="blue"
          />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default Notifications;
