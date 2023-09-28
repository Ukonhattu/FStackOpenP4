import PropTypes from 'prop-types';
import Togglable from '../Toggable';
import blogService from '../../services/blogService';
//Render one blog
// Blog {author, title, url, likes, user}
const Blog = ({ blog, user }) => {

    const handleLike = async () => {
        await blogService.updateBlog({
            ...blog,
            likes: blog.likes + 1
        }, user)
    }
    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
            return
        }     
        const deleted = await blogService.deleteBlog(blog, user)
        if (deleted) {
            window.location.reload() //im lazy ok I would not do this in a real app
        }

    }
    const isOwner = blog.user.username === user.username
    return (
        <>
        <p>{blog.title} </p>
        <Togglable buttonLabel="view" cancelButtonLabel="hide">
        <p>{blog.author}</p>
        <p>{blog.url}</p> 
        <p>{blog.likes} <button onClick={handleLike}> Like </button></p>
        <p>Added by: {blog.user.username}</p>
        <p>{isOwner && <button onClick={handleDelete}> Remove </button>}</p>
        </Togglable>
        </>
    )
}

export default Blog

Blog.propTypes = {
    blog: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        user: PropTypes.object.isRequired
    }),
    user: PropTypes.object.isRequired
}
