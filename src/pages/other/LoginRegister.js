import PropTypes, { string } from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { useLocation } from 'react-router-dom';
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { multilanguage } from "redux-multilanguage";
import { GoogleLogin } from "@react-oauth/google";

const LoginRegister = ({strings}) => {
  const { pathname } = useLocation();

  return (
    <Fragment>
      <MetaTags>
        <title>Cupabakery | Đăng Nhập</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to='/'>{ strings["home"] }</BreadcrumbsItem>
      <BreadcrumbsItem to={pathname}>
      { strings["my_account"] }
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>{strings["login"]}</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                        <h4>{strings["register"]}</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="user-name"
                                placeholder={ strings["username"] }
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder={ strings["password"] }
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">{ strings["remember_me"] }</label>
                                  <Link to='/'>
                                  { strings["forgot_password"] }
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>{ strings["login"] }</span>
                                </button>
                                <GoogleLogin
                                  onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                  }}
                                  onError={() => {
                                    console.log('Login Failed');
                                  }}
                                  useOneTap
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                            <input
                                type="text"
                                name="user-name"
                                placeholder={ strings["username"] }
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder={ strings["password"] }
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>{ strings["register"] }</span>
                                </button>
                                <GoogleLogin
                                  onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                  }}
                                  onError={() => {
                                    console.log('Login Failed');
                                  }}
                                  useOneTap
                                />
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object
};

export default multilanguage(LoginRegister);
