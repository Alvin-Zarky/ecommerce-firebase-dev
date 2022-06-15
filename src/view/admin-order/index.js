import React, {useEffect, useState} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { Table } from 'reactstrap';
import {ImCross} from "react-icons/im"
import {TiTick} from "react-icons/ti"
import {Row, Col} from "reactstrap"
import { Link, useParams, useHistory } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import * as Routes from "../../router";
import '../admin-user/admin-user.scss';
import './admin-order.scss'
import Loading from '../../components/Loading';

export default function AdminOrder() {

  const [keySearch, setKeySearch] = useState('')
  const dispatch= useDispatch()
  const history = useHistory()
  const {search, page} = useParams()

  // useEffect(() =>{
  //   dispatch(getDataOrders({search, page}))

  //   return () => dispatch(reset())
  // }, [dispatch, page, search])

  const handleSearch = (e) =>{
    e.preventDefault()
  }

  return (
    <>
      <NavBar />
        <div className="maximum-width-page">
          <Row>
            <Col xl="6" lg="6" md="6">
              <div className="title-overview">
                <span>Orders</span>
              </div>
            </Col>
            <Col xl="6" lg="6" md="6">
              <form onSubmit={handleSearch}>
                <div className="input-search marginb20">
                  <div className="input-type">
                    <input type="text" value={keySearch} onChange={(e) => {setKeySearch(e.target.value)}} spellCheck="false" />
                  </div>
                  <div className="btn-search">
                    <button>Search</button>
                  </div>
                </div>
              </form>
            </Col>
          </Row>
          <Table className="table-content" striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                  <td>1</td>
                  <td>Alvin</td>
                  <td>2022-03-13</td>
                  <td>$ 23.44</td>
                  <td>$ 322.33</td>
                  <td><ImCross className="cross-icon" /></td>
                  {/* <td>{!val.isDeliver ? <ImCross className="cross-icon" /> : <TiTick className="tick-icon" />}</td> */}
                  <td>
                    <button className="btn-detail">Details</button>
                  </td>
                </tr>
            </tbody>
          </Table>
            {/* {isLoading && (
              <div className="loading" style={{marginTop:"-30px"}}>
                <Loading />
              </div>
            )} */}
          {/* <>
            <div className="pagination-padd">
              <Pagination isLoading={isLoading} isError={isError} pagination={pagination} keyword={search} pages={allPages} pageNumber={pageNumber} ROUTE={Routes.ORDER_LIST}  />
            </div>
          </> */}
        </div>
      <Footer />
    </>
  );
}

