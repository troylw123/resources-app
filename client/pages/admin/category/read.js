import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import withAdmin from "../../withAdmin";
import axios from 'axios';
import { API } from "../../../public/config";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import Link from "next/link";

const Read = ({ user, token }) => {
    const [state, setState] = useState({
        error: '',
        success: '',
        categories: []
    });

    const { error, success, categories } = state;

    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = async () => {
        const response = await axios.get(`${API}/categories`)
        setState({ ...state, categories: response.data })
    }

    const confirmDelete = (e, slug) => {
        e.preventDefault()
        let answer = window.confirm('Are you sure you want to delete this category?')
        if (answer) {
            handleDelete(slug)
        }
    }

    const handleDelete = async (slug) => {
        try {
            const response = await axios.delete(`${API}/category/${slug}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            loadCategories()
            console.log("Category Delete Success", response)
        } catch (error) {
            console.log("Category Delete Error", error)
        }
    }

    const listCategories = () => categories.map((c, i) => (
        <Link href={`/links/${c.slug}`} key={i}>
            <a style={{ border: '1px solid black' }} className="bg-light p-3 col-md-6">

                <div className="row">
                    <div className="col-md-3">
                        <img src={c.image && c.image.url} alt={c.name} style={{ width: '100px', height: 'auto' }} className="pe-3" />
                    </div>
                    <div className="col-md-6"><h3>{c.name}</h3></div>
                    <div className="col-md-3">
                        <Link href={`/admin/category/${c.slug}`}>
                            <button className="btn btn-sm btn-outline-success w-100 mb-1">Update</button>
                        </Link>
                        <button className="btn btn-sm btn-outline-danger w-100" onClick={(e) => confirmDelete(e, c.slug)}>
                            Delete
                        </button>
                    </div>
                </div>

            </a>
        </Link>
    ));

    return (
        <Layout>
            <div className="row">
                <div className="col">
                    <h1>List of Categories</h1>
                </div>
            </div>

            <div className="row">{listCategories()}</div>
        </Layout>
    )
};

export default withAdmin(Read);