import React, { useState, useEffect } from 'react';
import { Layout } from '../../../components/Layout';
import axios from 'axios';
import { API } from "../../../public/config";
import { showSuccessMessage, showErrorMessage } from "../../../helpers/alerts";
import { getCookie, isAuth } from '../../../helpers/auth';


const Create = ({ token }) => {
    const [state, setState] = useState({
        title: '',
        url: '',
        categories: [],
        loadedCategories: [],
        success: '',
        error: '',
        type: '',
        medium: ''
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
            const response = await axios.post(`${API}/link`, { title, url, categories, type, medium }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setState({ ...state, title: '', url: '', success: 'Link has been added.', error: '', loadedCategories: [], categories: [], type: '', medium: '' })
        } catch (error) {
            console.log('Link submit error:', error)
            setState({ ...state, error: error.response.data.error })
        }
    };

    const showTypes = () => (
        <React.Fragment>
            <div className='form-check ps-5'>
                <label className='form-check-label'>
                    <input type='radio' onClick={handleTypeClick} value='free'
                        className='form-check-input' name='type' />{' '}Free
                </label>
            </div>
            <div className='form-check ps-5'>
                <label className='form-check-label'>
                    <input type='radio' onClick={handleTypeClick} value='paid'
                        className='form-check-input' name='type' />{' '}Paid
                </label>
            </div>
        </React.Fragment>
    );

    const showMedium = () => (
        <React.Fragment>
            <div className='form-check ps-5'>
                <label className='form-check-label'>
                    <input type='radio' onClick={handleMediumClick} value='video'
                        className='form-check-input' name='medium' />{' '}Video
                </label>
            </div>
            <div className='form-check ps-5'>
                <label className='form-check-label'>
                    <input type='radio' onClick={handleMediumClick} value='article'
                        className='form-check-input' name='medium' />{' '}Article
                </label>
            </div>
            <div className='form-check ps-5'>
                <label className='form-check-label'>
                    <input type='radio' onClick={handleMediumClick} value='forum'
                        className='form-check-input' name='medium' />{' '}Forum
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
                <input type='checkbox' onChange={handleToggle(c._id)} className='me-2' />
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
                    {isAuth() || token ? 'Submit' : 'Login to Submit'}
                </button>
            </div>
        </form>
    )
    return (
        <Layout>
            <div className='row'>
                <div className='col-md-12'>
                    <h1>Submit Link</h1>
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

Create.getInitialProps = ({ req }) => {
    const token = getCookie('token', req)
    return { token }
};

export default Create;