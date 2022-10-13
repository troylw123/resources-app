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

const Update = ({ oldCategory, token }) => {
    const [state, setState] = useState({
        name: oldCategory.name,
        content: oldCategory.content,
        error: '',
        success: '',
        buttonText: 'Update',
        imagePreview: oldCategory.image.url,
        image: ''
    });

    const [content, setContent] = useState(oldCategory.content);

    const { name, success, error, image, buttonText, imagePreview } = state;

    const handleChange = (name) => (e) => {
        setState({
            ...state,
            [name]: e.target.value,
            error: "",
            success: "",
            buttonText: 'Update',


        });
    };

    const handleContent = e => {
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
        setState({ ...state, buttonText: 'Updating' })
        // console.log(...formData)
        try {
            const response = await axios.put(`${API}/category/${oldCategory.slug}`, { name, content, image }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Category update response", response)
            setState({ ...state, content: '', image: '', imagePreview: response.data.image.url, buttonText: 'Updated', success: 'Category updated successfully!' })

        } catch (error) {
            console.log("Category update error", error)
            setState({ ...state, buttonText: 'Update', error: error.response.data.error })
        }
    };

    const updateCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} value={name} className="form-control" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Content</label>
                <ReactQuill value={content} onChange={handleContent} placeholder="Write Your Description Here" className='pb-5' style={{ border: '1px solid #666' }} theme="bubble" />
            </div>
            <p className='text-muted'>Current Image</p>
            <span>
                <img className='pt-0 mb-2' src={imagePreview} alt='image' height="75px"></img>
            </span>
            <div className="form-group">
                <label className="text-muted mb-1">Change Image</label>
                <input type="file" onChange={handleImage} accept="image/*" className="form-control" />

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
                    <h1>Update Category</h1>
                    <br />
                    {success && showSuccessMessage(success)}
                    {error && showErrorMessage(error)}
                    {updateCategoryForm()}
                </div>
            </div>
        </Layout>
    )
};

Update.getInitialProps = async ({ req, query, token }) => {
    const response = await axios.post(`${API}/category/${query.slug}`)
    return { oldCategory: response.data.category, token }
}

export default withAdmin(Update);