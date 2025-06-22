import React, { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Button,
    Input,
} from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import AdminHeader from "../../../components/Admin/Header/AdminListHeader";

const AdminUserList = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [roleMap, setRoleMap] = useState({}); // name -> id

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/users");
            console.log("Users fetched:", res.data);
            setUsers(res.data);
            const initialSelected = {};
            res.data.forEach(u => {
                initialSelected[u.userId] = u.roleName;
            });
            setSelectedRoles(initialSelected);
        } catch (err) {
            console.error(err);
            toast.error("Không lấy được danh sách người dùng.");
        }
    };

    const fetchRoles = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/roles");
            setRoles(res.data);
            const map = {};
            res.data.forEach(r => {
                map[r.name] = r.id;
            });
            setRoleMap(map);
        } catch (err) {
            toast.error("Không lấy được danh sách quyền.");
        }
    };

    const handleUpdateRole = async (userId) => {
        const roleName = selectedRoles[userId];
        const roleId = roleMap[roleName];
        if (!roleId) {
            toast.warning("Vai trò không hợp lệ.");
            return;
        }

        try {
            await axios.put("http://localhost:8080/api/users/update-role", {
                userId,
                roleId,
            });
            toast.success("Cập nhật vai trò thành công!");
            fetchUsers(); // reload lại
        } catch (err) {
            toast.error("Lỗi khi cập nhật vai trò.");
        }
    };

    const handleDeleteUser = async (userId) => {
        const confirm = window.confirm("Bạn có chắc muốn xoá người dùng này?");
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:8080/api/users/delete/${userId}`);
            toast.success("Xoá người dùng thành công!");
            setUsers(prev => prev.filter(u => u.userId !== userId)); // Cập nhật danh sách
        } catch (err) {
            console.error(err);
            toast.error("Lỗi khi xoá người dùng.");
        }
    };


    return (
        <>
            <AdminHeader />
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Danh sách người dùng</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Tên đăng nhập</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Vai trò</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user) => (
                                    <tr key={user.userId}>
                                        <td>{user.userId}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            <Input
                                                className="text-center"
                                                type="select"
                                                value={selectedRoles[user.userId] || ""}
                                                onChange={(e) =>
                                                    setSelectedRoles({
                                                        ...selectedRoles,
                                                        [user.userId]: e.target.value,
                                                    })
                                                }
                                            >
                                                <option value={user.roleName}>{user.roleName} - Hiện tại</option>
                                                {roles.map((role) => (
                                                    <option key={role.id} value={role.name}>
                                                        {role.name}
                                                    </option>
                                                ))}
                                            </Input>
                                        </td>
                                        <td>
                                            <Button
                                                size="sm"
                                                color="primary"
                                                onClick={() => handleUpdateRole(user.userId)}
                                            >
                                                Cập nhật
                                            </Button>
                                            <Button
                                                size="sm"
                                                color="danger"
                                                onClick={() => handleDeleteUser(user.userId)}
                                            >
                                                Xoá
                                            </Button>

                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default AdminUserList;
