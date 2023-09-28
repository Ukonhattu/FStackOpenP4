// form for creating a blog listing with title, author, url
import {useState} from 'react';
import blogService from '../../services/blogService';
import PropTypes from 'prop-types'

const CreateBlogForm = ({user, setBlogs, handleNotification, createBlogToggle, mockSubmit = null}) => {
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [url, setUrl] = useState();
    
    const handleSubmit = async e => {
        e.preventDefault();
        const blog = await blogService.createBlog({
            title,
            author,
            url
        }, user);
        if (blog) {
            setBlogs(blogs => blogs.concat({...blog, user}));
            createBlogToggle.current.toggleVisibility()
            handleNotification("Blog created successfully", 'success')
        } else {
            handleNotification("Invalid blog", 'error')
        }
    }
    return (
        <div className="create-blog-wrapper">
            <h1>Create Blog</h1>
            <form  aria-label='form' onSubmit={mockSubmit || handleSubmit}>
                <label>
                    <p>Title</p>
                    <input id='title' type="text" onChange={e => setTitle(e.target.value)} placeholder='title' />
                </label>
                <label>
                    <p>Author</p>
                    <input id='author' type="text" onChange={e => setAuthor(e.target.value)} placeholder='author' />
                </label>
                <label>
                    <p>Url</p>
                    <input id='url' type="text" onChange={e => setUrl(e.target.value)} placeholder='url'/>
                </label>
                <div>
                    <button id='create-button' type="submit" data-testid='send-button'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBlogForm

CreateBlogForm.propTypes = {
    user: PropTypes.object,
    setBlogs: PropTypes.func,
    handleNotification: PropTypes.func,
    createBlogToggle: PropTypes.object,
    mockSubmit: PropTypes.func
}