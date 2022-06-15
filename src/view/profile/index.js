import React, {useState, useEffect} from 'react';
import NavBar from "../../components/Navbar"
import Footer from "../../components/Footer"
import {Row, Col, Table} from "reactstrap"
import {TiTick} from "react-icons/ti"
import {ImCross} from "react-icons/im"
import {Link, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import * as Routes from "../../router"
import './profile.scss'
import Loading from "../../components/Loading"

export default function MyProfile() {
  
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword]= useState('')
  const [confirmPassword, setCfPassword]= useState('')
  const [errMessage, setErrMessage]= useState(null)
  const {page} = useParams()
  const dispatch= useDispatch()

  // useEffect(() =>{
  //   dispatch(getUserOrdering({page}))

  //   return () => {
  //     dispatch(resetOrder())
  //     dispatch(resetMessage())
  //   }
  // }, [dispatch, page])

  const handleUpdate = async (e) =>{
    e.preventDefault()
    
    // if(confirmPassword !== password){
    //   setErrMessage('Confirm password does not match!')
    //   return
    // }

    // setErrMessage('')
    // dispatch(updateProfile({_id: user && user._id, name, email, password}))
  }

  return (
    <>
      <NavBar />
        <div className="profile-user">
          <Row>
            <Col xl="3" lg="3" md="3">
              <div className="title-profile">
                <span>User Profile</span>
              </div>
              {/* {isError && (
                <div className="box-message">
                <span>{message}</span>
                </div>
              )} */}
              {errMessage && (
                <div className="box-message">
                  <span>{errMessage}</span>
                </div>
              )}
              {/* {isSucceed && !errMessage && (
                <div className="box-success">
                  <span>Update Successfully!</span>
                </div>
              )} */}
              <div className="form-user">
                <form onSubmit={handleUpdate}>
                  <div>
                    <label>Name</label>
                  </div>
                  <div>
                    <input type="text" spellCheck="false" value={name} onChange={(e) => {setName(e.target.value)}} required />
                  </div>
                  <div>
                    <label>Email Address</label>
                  </div>
                  <div>
                    <input type="email" spellCheck="false" value={email} onChange={(e) => {setEmail(e.target.value)}} required />
                  </div>
                  <div>
                    <label>Password Address</label>
                  </div>
                  <div>
                    <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                  </div>
                  <div>
                    <label>Confirm Password</label>
                  </div>
                  <div>
                    <input type="password" value={confirmPassword} onChange={(e) =>{setCfPassword(e.target.value)}}/>
                  </div>
                  <button>Update</button>
                  {/* {isLoading && <button><span>Updating...</span></button>}
                  {!isLoading && <button><span>Update</span></button>} */}
                </form>
              </div>
            </Col>
            <Col xl="9" lg="9" md="9" className="order-info">
              <div className="title-profile">
                <span>My Order</span>
              </div>
              <div className="table-info">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                      <td>1</td>
                      <td>2022-03-12</td>
                      <td>$ 344.55</td>
                      <td><TiTick className="tick-svg" /></td>
                      {/* <td>{val.isPaid ? <TiTick className="tick-svg" /> : <ImCross className="cross-icon" />}</td> */}
                      <td>
                        <button className="btn-deliver">Details</button>
                      </td>
                    </tr>
                </tbody>
              </Table>
              {/* {isPending && (
                <div className="loading" style={{marginTop:"10px"}}>
                  <Loading />
                </div>
              )} */}
              {/* <div className="pagination">
                <Pagination isLoading={isPending} isError={isError} pagination={pagination} pages={pages} pageNumber={pageNumber} ROUTE={Routes.PROFILE} />
              </div> */}
              </div>
            </Col>
          </Row>
        </div>
      <Footer />
    </>
  );
}
