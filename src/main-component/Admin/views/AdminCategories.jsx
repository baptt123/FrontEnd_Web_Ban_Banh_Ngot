import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardHeader,
    Table,
    Container,
    Row,
    Button,
    Input,
    Col,
} from "reactstrap";
import { toast } from "react-toastify";
import AdminHeader from "../../../components/Admin/Header/AdminListHeader";

const AdminCategory = () => {
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [description, setDescription] = useState("");
    const [stores, setStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        fetchCategories();
        fetchStores();
    }, []);

    const fetchStores = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/store/all');
            setStores(response.data);
            console.log('Stores fetched:', response.data);
        } catch (error) {
            console.error('Error fetching stores:', error);
        }
    };
    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/categories/all");
            setCategories(res.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh mục:", error);
            toast.error("Không lấy được danh sách danh mục.");
        }
    };

    const getStoreNameById = (id) => {
        const store = stores.find(s => s.storeId === id);
        return store ? store.name : "Không rõ";
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) {
            toast.warning("Vui lòng nhập tên danh mục.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8080/api/categories/create", {
                name: newCategoryName,
                description: description,
                storeId:  selectedStore ? parseInt(selectedStore) : null,
            });
            console.log("Tạo category với:", {
                name: newCategoryName,
                description: description,
                storeId: selectedStore ? parseInt(selectedStore) : null,
            });
            toast.success("Thêm danh mục thành công!");
            setNewCategoryName("");
            setDescription("");
            fetchCategories(); // Refresh lại danh sách
        } catch (error) {
            console.error("Lỗi khi thêm danh mục:", error);
            toast.error("Thêm danh mục thất bại.");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá danh mục này?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:8080/api/categories/delete/${id}`);
            toast.success("Đã xoá danh mục!");
            setCategories((prev) => prev.filter((cat) => cat.categoryId !== id));
        } catch (error) {
            console.error("Lỗi khi xoá danh mục:", error);
            toast.error("Xoá danh mục thất bại.");
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
                                <h3 className="mb-0">Danh sách danh mục</h3>
                            </CardHeader>
                            <div className="px-4 py-2 d-flex justify-content-end gap-3">
                                <Input
                                    placeholder="Tên"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    style={{flex:"1"}}
                                />
                                <Input
                                    placeholder="Mô tả"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    style={{flex:"2"}}
                                />
                                <select
                                    className="form-control text-center"
                                    value={selectedStore || ""}
                                    style={{flex:"1"}}
                                    onChange={(e) => setSelectedStore(e.target.value)}
                                >
                                    <option value="">-- Tất cả --</option>
                                    {stores.map(store => (
                                        <option key={store.storeId} value={store.storeId}>
                                            {store.storeId} - {store.name}
                                        </option>
                                    ))}
                                </select>
                                <Button color="primary" onClick={handleAddCategory}>
                                    Thêm
                                </Button>
                            </div>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Tên danh mục</th>
                                    <th scope="col">Cửa hàng</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {categories.map((cat) => (
                                    <tr key={cat.categoryId}>
                                        <td>{cat.categoryId}</td>
                                        <td>{cat.name}</td>
                                        <td>{cat.storeName}</td>
                                        <td className="text-left">
                                            <Button
                                                size='sm'
                                                color="danger"
                                                onClick={() => handleDelete(cat.categoryId)}
                                            >
                                                Xóa
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

export default AdminCategory;
