import React, { useState, useEffect } from 'react';
import { Layout } from '../../../components/Layout';
import axios from 'axios';
import { API } from "../../../public/config";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import { getCookie, isAuth } from '../../../helpers/auth';
import withUser from '../../withUser';


const Update = ({ oldLink, token }) => {
    const [state, setState] = useState({
        title: oldLink.title,
        url: oldLink.url,
        categories: oldLink.categories,
        loadedCategories: [],
        success: '',
        error: '',
        type: oldLink.type,
        medium: oldLink.medium
    });

    const { title, url, categories, loadedCategories, success, error, type, medium } = state;

    useEffect(() => {
        loadCategories()
    }, [success]);

    const loadCategories = async () => {
        const response = await axios.get(`${API}/categories`)
        setState({ ...state, loadedCategories: response.data })
    };

    const handleSubmit = async e => {
        e.preventDefault()
        // console.table({ title, url, categories, type, medium })
        try {
            const response = await axios.put(`${API}/link/${oldLink._id}`, { title, url, categories, type, medium }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setState({ ...state, success: 'Link has been updated.', error: '' })
        } catch (error) {
            console.log('Link update error:', error)
            setState({ ...state, error: error.response.data.error })
        }
    };

    const showTypes = () => (
        <React.Fragment>
            <div className='form-check ps-5'>
                <label className='form-check-label'>
                    <input type='radio' onClick={handleTypeClick} value='free'
                        className='form-check-input' name='type' defaultChecked={type === 'free'} />{' '}Free
                </label>
            </div>
            <div className='form-check ps-5'>
                <label className='form-check-label'>
                    <input type='radio' onClick={handleTypeClick} value='paid'
                        className='form-check-input' name='type' defaultChecked={type === 'paid'} />{' '}Paid
                </label>
            </div>
        </React.Fragment>
    );

    const showMedium = () => (
        <React.Fragment>
            <div className='form-check ps-5'>
                <label className='form-check-label'>
                    <input type='radio' onClick={handleMediumClick} value='video'
                        className='form-check-input' name='medium' defaultChecked={medium === 'video'} />{' '}Video
                </label>
            </div>
            <div className='form-check ps-5'>
                <label className='form-check-label'>
                    <input type='radio' onClick={handleMediumClick} value='article'
                        className='form-check-input' name='medium' defaultChecked={medium === 'article'} />{' '}Article
                </label>
            </div>
            <div className='form-check ps-5'>
                <label className='form-check-label'>
                    <input type='radio' onClick={handleMediumClick} value='forum'
                        className='form-check-input' name='medium' defaultChecked={medium === 'forum'} />{' '}Forum
                </label>
            </div>
        </React.Fragment>
    );


    const handleToggle = c => () => {
        // return the first index or -1
        const clickedCategory = categories.indexOf(c)
        const all = [...categories]
        if (clickedCategory === -1) {
            all.push(c)
        } else {
            all.splice(clickedCategory, 1)
        }
        console.log(all)
        setState({ ...state, categories: all, success: '', error: '' })
    };

    const showCategories = () => {
        return loadedCategories && loadedCategories.map((c, i) => (
            <li className='list-unstyled' key={c._id}>
                <input type='checkbox' checked={categories.includes(c._id)} onChange={handleToggle(c._id)} className='me-2' />
                <label className='form-check-label'>{c.name}</label>
            </li>
        ))
    }

    const handleTitleChange = e => {
        setState({ ...state, title: e.target.value, error: '', success: '' })
    };

    const handleUrlChange = e => {
        setState({ ...state, url: e.target.value, error: '', success: '' })
    };

    const handleTypeClick = e => {
        setState({ ...state, type: e.target.value, success: '', error: '' })
    };

    const handleMediumClick = e => {
        setState({ ...state, medium: e.target.value, success: '', error: '' })
    };

    const submitLinkForm = () => (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Title</label>
                <input type='text' className='form-control' onChange={handleTitleChange} value={title} />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Url</label>
                <input type='url' className='form-control' onChange={handleUrlChange} value={url} />
            </div>
            <div>
                <button disabled={!token} className='btn btn-outline-warning mt-3' type='submit'>
                    {isAuth() || token ? 'Update' : 'Login to Update'}
                </button>
            </div>
        </form>
    )
    return (
        <Layout>
            <div className='row'>
                <div className='col-md-12'>
                    <h1>Update Link</h1>
                    <br />
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='form-group'>
                            <label className='text-decoration-underline ms-4'>Category</label>
                            <ul style={{ maxHeight: '125px', overflowY: 'scroll' }}>{showCategories()}</ul>
                        </div>
                        <div className='form-group mb-4'>
                            <label className='text-decoration-underline ms-4'>Type</label>
                            {showTypes()}
                        </div>
                        <div className='form-group'>
                            <label className='text-decoration-underline ms-4'>Medium</label>
                            {showMedium()}
                        </div>
                    </div>

                    <div className='col-md-6'>
                        {success && showSuccessMessage(success)}
                        {error && showErrorMessage(error)}
                        {submitLinkForm()}</div>
                </div>
            </div>
        </Layout>
    )
};

Update.getInitialProps = async ({ req, token, query }) => {
    const response = await axios.get(`${API}/link/${query.id}`)
    return { oldLink: response.data, token }
};

export default withUser(Update);