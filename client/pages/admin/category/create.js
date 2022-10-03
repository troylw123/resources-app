import dynamic from 'next/dynamic';
import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import withAdmin from "../../withAdmin";
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { API } from "../../../public/config";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.bubble.css';

const Create = ({ user, token }) => {
    const [state, setState] = useState({
        name: '',
        error: '',
        success: '',
        buttonText: 'Create',
        imageUploadText: 'Upload Image',
        image: ''
    });

    const [content, setContent] = useState('');

    const { name, success, error, image, buttonText, imageUploadText } = state;

    const handleChange = (name) => (e) => {
        setState({
            ...state,
            [name]: e.target.value,
            error: "",
            success: "",
            buttonText: 'Create',
            imageUploadText: imageUploadText,

        });
    };

    const handleContent = e => {
        console.log(e)
        setContent(e)
        setState({ ...state, success: '', error: '' })
    };

    const handleImage = (event) => {
        let fileInput = false;
        if (event.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {
            try {
                Resizer.imageFileResizer(
                    event.target.files[0],
                    300,
                    300,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        setState({ ...state, image: uri, success: '', error: '' });
                    },
                    "base64",
                    200,
                    200
                );
            } catch (err) {
                console.log(err);
            }
        }
    };


    const handleSubmit = async e => {
        e.preventDefault()
        setState({ ...state, buttonText: 'Creating' })
        // console.log(...formData)
        try {
            const response = await axios.post(`${API}/category`, { name, content, image }, {
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            });
            console.log("Category create response", response)
            setState({ ...state, name: '', content: '', image: '', buttonText: 'Created', imageUploadText: 'Upload Image', success: 'Category created successfully!' })
        } catch (error) {
            console.log("Category create error", error)
            setState({ ...state, buttonText: 'Create', error: error.response.data.error })
        }
    };

    const createCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} value={name} className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Content</label>
                <ReactQuill value={content} onChange={handleContent} placeholder="Write Your Description Here" className='pb-5' style={{ border: '1px solid #666' }} theme="bubble" />
            </div>
            <div className="form-group">
                <label className="text-muted">Image</label>
                <input type="file" onChange={handleImage} accept="image/*" className="form-control" required />

            </div>
            <div>
                <button className="btn btn-outline-warning mt-2">
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Create Category</h1>
                    <br />
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                    {createCategoryForm()}
                </div>
            </div>
        </Layout>
    )
};

export default withAdmin(Create);