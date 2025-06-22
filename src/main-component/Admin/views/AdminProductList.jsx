import React, { useEffect, useState } from "react";
import "../../../plugins/nucleo/css/nucleo.css";
import "../../../css/font-awesome.min.css";
import "../../../css/argon-dashboard-react.css";
import axios from "axios";

import {
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";

import AdminHeader from "../../../components/Admin/Header/AdminListHeader";
import {toast} from "react-toastify";
// import {cA} from "@fullcalendar/core/internal-common.js";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [priceFilter, setPriceFilter] = useState('');

  // Thêm trạng thái cho phân trang:
  const [page, setPage] = useState(0);
  const [size] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchCategories();
    fetchStores();

  }, []);

  useEffect(() => {
    const categoryId = selectedCategory ? parseInt(selectedCategory) : null;
    const storeId = selectedStore ? parseInt(selectedStore) : null;
    fetchProducts(storeId, categoryId, page, size);
  }, [selectedStore, selectedCategory, page, size]);

  const fetchProducts = async (storeId = null, categoryId = null, pageNum = 0, pageSize = 12) => {
    try {
      setIsLoading(true);
      let url = `http://localhost:8080/api/products?deleted=0&page=${pageNum}&size=${pageSize}`;

      if (storeId) url += `&storeId=${storeId}`;
      if (categoryId) url += `&categoryId=${categoryId}`;

      const apiCall = axios.get(url);
      const delay = new Promise(resolve => setTimeout(resolve, 300));
      const [response] = await Promise.all([apiCall, delay]);

      // Giả sử backend trả về dạng { content: [...], totalPages: n, number: currentPage }
      const data = response.data;
      console.log("Sản phẩm từ API:", data.content);

      const mappedProducts = data.content.map(item => ({
        productId: item.productId,
        proImg: item.imageUrl,
        name: item.name,
        stock: item.stock,
        price: item.price,
        categoryName: item.categoryName,
        storeName: item.storeName,
      }));

      setProducts(mappedProducts);
      setTotalPages(data.totalPages);
      setPage(data.number);
      console.log("Fetched products:", mappedProducts);

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories');
      setCategories(response.data);
      console.log('Categories fetched:', response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/store/all');
      setStores(response.data);
      console.log('Stores fetched:', response.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };
  const renderPagination = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
          <button
              key={i}
              className={`pagination-page ${page === i ? 'active' : ''}`}
              onClick={() => handlePageChange(i)}
          >
            {i + 1}
          </button>
      );
    }

    return (
        <div className="pagination">
          {pages}
        </div>
    );
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/products/delete/${id}`);
      toast.success("Đã xoá sản phẩm!");

      // Cập nhật danh sách hiển thị bằng cách xoá sản phẩm khỏi state
      setProducts((prev) => prev.filter((p) => p.productId !== id));
    } catch (err) {
      console.error("Lỗi khi xoá sản phẩm:", err);
      toast.error("Lỗi khi xoá sản phẩm!");
    }
  };


  return (
    <>
      <AdminHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Danh sách sản phẩm</h3>
              </CardHeader>
              <div className="chose" style={{display:"flex",width:"100%"}}>
                <div className="px-4 py-2">
                  <label>Chọn loại:</label>
                  <select
                      className="form-control text-center"
                      value={selectedCategory || ""}
                      style={{width:'100%'}}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">-- Tất cả --</option>
                    {categories.map(cat => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                          {cat.categoryId} - {cat.name}
                        </option>
                    ))}
                  </select>
                </div>
                <div className="px-4 py-2">
                  <label>Chọn cửa hàng:</label>
                  <select
                      className="form-control text-center"
                      value={selectedStore || ""}
                      style={{width:'100%'}}
                      onChange={(e) => setSelectedStore(e.target.value)}
                  >
                    <option value="">-- Tất cả --</option>
                    {stores.map(store => (
                        <option key={store.storeId} value={store.storeId}>
                          {store.storeId} - {store.name}
                        </option>
                    ))}
                  </select>
                </div>
              </div>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Tên</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Cửa hàng</th>
                    <th scope="col">Loại sản phẩm</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                  <tr key={product.productId}>
                    <th scope="row">
                      <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href=" "
                        >
                          <img
                              alt="..."
                              src={product.proImg}
                              className="avatar rounded-circle mr-3"
                              style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        </a>
                        <Media>
                          <span className="mb-0 text-sm" >
                            {product.name}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>{product.price}</td>
                    <td>{product.storeName || "Không rõ"}</td>
                    <td>{product.categoryName || "Không rõ"}</td>
                    <td>{product.stock}</td>
                    <td className="text-left">
                      <Button
                          size='sm'
                          color="danger"
                          onClick={() => handleDelete(product.productId)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </Table>
              {/* Pagination */}
              {renderPagination()}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default AdminProductList;
