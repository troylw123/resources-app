import { useState } from "react";
import axios from "axios"
import { API } from "../../public/config"
import Link from "next/link";
import { Layout } from "../../components/Layout";
import parse from 'html-react-parser';
import moment from 'moment';

const Links = ({ query, category, links, totalLinks, linksLimit, linkSkip }) => {
    const [allLinks, setAllLinks] = useState(links);

    const listOfLinks = () =>
        allLinks.map((l, i) => (
            <div className="row alert alert-primary p-2" key={i}>
                <div className="col-md-8">
                    <a href={l.url} target="_blank">
                        <h5 className="pt-2">{l.title}</h5>
                        <h6 className="pt-2 text-danger" style={{ fontSize: '12px', wordWrap: 'break-word' }}>{l.url}</h6>
                    </a>
                </div>
                <div className="col-md-4 pt-2">
                    <span className="float-right">{moment(l.createdAt).fromNow()} by {l.postedBy.name}</span>
                </div>
                <div className="col-md-12">
                    <span className="badge text-dark">{l.type} / {l.medium}</span>
                    {l.categories.map((c, i) => (<span className="badge text-success" key={i}>{c.name}</span>))}
                </div>
            </div>
        ));


    return (
        <Layout>
            <div className="row">
                <div className="col-md-8">
                    <h1 className="display-4 font-weight-bold">{category.name}</h1>
                    <div className="lead alert alert-secondary pt-4">{parse(category.content)}</div>
                </div>
                <div className="col-md-4">
                    <img src={category.image.url} alt={category.name} style={{ width: 'auto', maxHeight: '200px' }} />
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-8">{listOfLinks()}</div>
                <div className="col-md-4">
                    <h2 className="lead">Most popular links in {category.name}</h2>
                    <p>Show most popular links</p>
                </div>
            </div>
            <p>load more button</p>
        </Layout>
    )
};

Links.getInitialProps = async ({ query, req }) => {
    let skip = 0
    let limit = 2
    const response = await axios.post(`${API}/category/${query.slug}`, { skip, limit })
    return {
        query,
        category: response.data.category,
        links: response.data.links,
        totalLinks: response.data.links.length,
        linksLimit: limit,
        linkSkip: skip,
    }
}

export default Links;