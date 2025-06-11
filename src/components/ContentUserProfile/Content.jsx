import React, { useState, useEffect } from "react";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile, logout } from "../../store/actions/action";
import { useNavigate } from "react-router-dom";

import AccountSettings from "./AccountSettings";
import Actions from "./Actions";
import CompanySettings from "./CompanySettings";
import Notifications from "./Notifications";

const Content = () => {
  const tabs = ["Thông tin", "Cửa hàng", "Thông báo"];
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: "",
    address: "",
    dateOfBirth: "",
    email: "",
    phone: "",
  });
  const [originalUserData, setOriginalUserData] = useState(null);
  const [pendingUpdateData, setPendingUpdateData] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      window.location.reload();
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user.profileId) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && user.profileId) {
      const transformedUser = {
        fullName: user.name || "",
        address: user.address || "",
        dateOfBirth: user.dateOfBirth || "",
        email: user.email || "",
        phone: user.phone || "",
      };
      setUserData(transformedUser);
      setOriginalUserData(transformedUser);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    let dataToUpdate = {};
    let emailChanged = false;

    for (const key in userData) {
      if (userData[key] !== originalUserData[key]) {
        if (key === 'fullName') {
          dataToUpdate.fullName = userData[key];
        } else if (key === 'dateOfBirth') {
          dataToUpdate.birthDate = userData[key];
        } else if (key === 'email') {
          dataToUpdate.email = userData[key];
          emailChanged = true;
        } else {
          dataToUpdate[key] = userData[key];
        }
      }
    }

    if (Object.keys(dataToUpdate).length === 0) {
      toast({
        title: "Không có thay đổi để cập nhật.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (emailChanged) {
      setPendingUpdateData(dataToUpdate);
      onOpen(); // Open the alert dialog
    } else {
      try {
        dispatch(updateUserProfile(dataToUpdate));
        toast({
          title: "Cập nhật thông tin thành công.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setOriginalUserData(userData);
      } catch (error) {
        toast({
          title: "Có lỗi xảy ra khi cập nhật thông tin.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleConfirmUpdate = async () => {
    try {
      dispatch(updateUserProfile(pendingUpdateData));
      dispatch(logout());
      onClose();
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra khi cập nhật thông tin.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  const handleCancelUpdate = () => {
    onClose();
    window.location.reload(); // Reload the page
  };

  return (
    <Box
      as="main"
      flex={3}
      d="flex"
      flexDir="column"
      justifyContent="space-between"
      pt={5}
      bg="white"
      rounded="md"
      borderWidth={1}
      borderColor="gray.200"
      style={{ transform: "translateY(-100px)" }}
    >
      <Tabs>
        <TabList px={5}>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              mx={3}
              px={0}
              py={3}
              fontWeight="semibold"
              color="brand.cadet"
              borderBottomWidth={1}
              _active={{ bg: "transparent" }}
              _selected={{ color: "brand.dark", borderColor: "brand.blue" }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels px={3} mt={5}>
          <TabPanel>
            <AccountSettings
              userData={userData}
              handleInputChange={handleInputChange}
            />
          </TabPanel>
          <TabPanel>
            <CompanySettings />
          </TabPanel>
          <TabPanel>
            <Notifications />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Actions handleSubmit={handleSubmit} />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xác thực Email
            </AlertDialogHeader>

            <AlertDialogBody fontSize="lg">
              Bạn sẽ phải xác thực email <b>{userData.email}</b> và đăng nhập lại sau khi cập nhật email.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancelUpdate}>Hủy</Button>
              <Button colorScheme="blue" onClick={handleConfirmUpdate} ml={3}>
                Đồng ý
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Content;
