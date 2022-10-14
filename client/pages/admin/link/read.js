import { useState } from "react";
import axios from "axios"
import { API } from "../../../public/config"
import { Layout } from "../../../components/Layout";
import parse from 'html-react-parser';
import moment from 'moment';
import withAdmin from "../../withAdmin";
import { getCookie } from "../../../helpers/auth";
import Link from "next/link";

const Links = ({ links, totalLinks, linksLimit, linkSkip, token }) => {
    const [allLinks, setAllLinks] = useState(links);
    const [limit, setLimit] = useState(linksLimit);
    const [skip, setSkip] = useState(linkSkip);
    const [size, setSize] = useState(totalLinks);

    const listOfLinks = () =>
        allLinks.map((l, i) => (
            <div className="row alert alert-primary p-2" key={i}>
                <div className="col-md-8" >
                    <a href={l.url} target="_blank">
                        <h5 className="pt-2">{l.title}</h5>
                        <h6 className="pt-2 text-danger" style={{ fontSize: '12px', wordWrap: 'break-word' }}>{l.url}</h6>
                    </a>
                </div>
                <div className="col-md-4 pt-2">
                    <span className="float-end">{moment(l.createdAt).fromNow()} by {l.postedBy.name}</span>
                    <Link href={`/user/link/${l._id}`}>
                        <button className="btn btn-sm btn-outline-warning w-100 mb-1">Update</button>
                    </Link>
                    <button className="btn btn-sm btn-outline-danger w-100" onClick={(e) => confirmDelete(e, l._id)}>
                        Delete
                    </button>
                    <span className="badge text-secondary position-absolute bottom-0 end-0">{l.clicks} clicks</span>
                </div>
                <div className="col-md-12">
                    <span className="badge text-dark">{l.type} / {l.medium}</span>
                    {l.categories.map((c, i) => (<span className="badge text-success" key={i}>{c.name}</span>))}

                </div>
            </div>
        ));

    const confirmDelete = (e, id) => {
        e.preventDefault()
        let answer = window.confirm('Are you sure you want to delete this link?')
        if (answer) {
            handleDelete(id)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${API}/link/admin/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("Link Delete Success", response)
            process.browser && window.location.reload();
        } catch (error) {
            console.log("Link Delete Error", error)
        }
    }

    const loadMore = async () => {
        let toSkip = skip + limit
        const response = await axios.post(`${API}/links`, { skip: toSkip, limit },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        setAllLinks([...allLinks, ...response.data])
        setSize(response.data.length)
        setSkip(toSkip)

    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary btn lg">Load More</button>
            )
        )
    }


    return (
        <Layout>
            <div className="row">
                <div className="col-md-8">
                    <h1 className="display-4 font-weight-bold">All Links</h1>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-8">{listOfLinks()}</div>
            </div>
            <div className="text-center pt-4 pb-5">{loadMoreButton()}</div>
        </Layout>
    )
};

Links.getInitialProps = async ({ req }) => {
    let skip = 0
    let limit = 3

    const token = getCookie('token', req);

    const response = await axios.post(`${API}/links`, { skip, limit }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return {
        links: response.data,
        totalLinks: response.data.length,
        linksLimit: limit,
        linkSkip: skip,
        token
    }
}

export default withAdmin(Links);