import Blog from "./Blog";
import PropTypes from 'prop-types';
const ListBlogs = ({blogs, user}) => {
    if (blogs.length === 0) {
        return (
            <div>
                No blogs
            </div>
        )
    }
    return (
        <ul>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog => <li key={blog.id}><Blog blog={blog} user={user} /> </li>)}
        </ul>
    )
}

export default ListBlogs

ListBlogs.propTypes = {
    blogs: PropTypes.array,
    user: PropTypes.object.isRequired
}
