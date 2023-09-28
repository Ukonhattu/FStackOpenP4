// form for creating a blog listing with title, author, url
import {useState} from 'react';
import blogService from '../../services/blogService';
import PropTypes from 'prop-types'

const CreateBlogForm = ({user, setBlogs, handleNotification, createBlogToggle}) => {
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
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Title</p>
                    <input type="text" onChange={e => setTitle(e.target.value)} />
                </label>
                <label>
                    <p>Author</p>
                    <input type="text" onChange={e => setAuthor(e.target.value)} />
                </label>
                <label>
                    <p>Url</p>
                    <input type="text" onChange={e => setUrl(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBlogForm

CreateBlogForm.propTypes = {
    user: PropTypes.object.isRequired,
    setBlogs: PropTypes.func.isRequired,
    handleNotification: PropTypes.func.isRequired,
    createBlogToggle: PropTypes.object.isRequired
}