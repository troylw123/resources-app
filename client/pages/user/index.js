import { Layout } from "../../components/Layout";
import axios from "axios";
import { API } from "../../public/config";
import { getCookie } from "../../helpers/auth";
import withUser from "../withUser";
import Link from 'next/link';
import moment from 'moment';
import { useRouter } from "next/router";

const User = ({ user, token, userLinks }) => {

  const router = useRouter();

  const listOfLinks = () => userLinks.map((l, i) => (
    <div className="row alert alert-primary p-2" key={i}>
      <div className="col-md-8">
        <a href={l.url} target="_blank">
          <h5 className="pt-2">{l.title}</h5>
          <h6 className="pt-2 text-danger">{l.url}</h6>
        </a>
      </div>
      <div className="col-md-4 pt-2">
        <span className="float-end mb-2">{moment(l.createdAt).fromNow()} by {l.postedBy.name}</span>
        <Link href={`/user/link/${l._id}`}>
          <span className="btn text-warning border-dark me-1 bg-white">Update</span>
        </Link>
        <span onClick={(e) => confirmDelete(e, l._id)} className="btn border-dark text-danger bg-white">Delete</span>
        <span className="badge text-secondary position-absolute bottom-0 end-0">{l.clicks} clicks</span>
      </div>
      <div className="col-md-12">
        <span className="badge text-dark">{l.type} / {l.medium}</span>
        {l.categories.map((c, i) => (<span className="badge text-success" key={i}>{c.name}</span>))}
      </div>
    </div>
  ))

  const confirmDelete = (e, id) => {
    e.preventDefault()
    let answer = window.confirm('Are you sure you want to delete this category?')
    if (answer) {
      handleDelete(id)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/link/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log("Link Delete Success", response)
      router.replace('/user')
    } catch (error) {
      console.log("Link Delete Error", error)
    }
  }

  return (
    <Layout>
      <h1>{user.name}'s Dashboard / <span className="text-danger">{user.role}</span></h1>
      <hr />
      <div className="row">
        <div className="col-md-4">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link href='/user/link/create'>
                <a className='nav link'>Submit a Link</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href='/user/profile/update'>
                <a className='nav link'>Update Profile</a>
              </Link>
            </li>
          </ul>

        </div>
        <div className="col-md-8">
          <h2>Your links</h2>
          <br />
          {listOfLinks()}
        </div>

      </div>
    </Layout>
  )
};

export default withUser(User);
