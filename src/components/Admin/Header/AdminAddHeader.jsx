import { Button, Container, Row, Col } from "reactstrap";
import pageTitleImg from "../../../images/page-title.jpg";

const AdminAddHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center z-0"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + pageTitleImg + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* AdminHeader container */}
        <Container className="d-flex align-items-center" fluid>
          <Row style={{width:'70%'}}>
            <Col lg="7" md="10" style={{width:'50%'}}>
              <h1 className="display-2 text-white" style={{marginBottom:'100px'}}>Nhập thông tin</h1>
              {/*<p className="text-white mt-0 mb-5">*/}
              {/*  Thêm sản phẩm*/}
              {/*</p>*/}
              <Button
                color="info"
                href="/admin/productList"
                // onClick={(e) => e.preventDefault()}
              >
                Danh sách
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminAddHeader;
