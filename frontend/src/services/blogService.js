import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async (user) => {
    const response = await axios.get(baseUrl, {
        headers: {
            Authorization: `bearer ${user.token}`
        }
    })
    return response.data;
}

const createBlog = async (blog, user) => {
    const response = await axios.post(baseUrl, blog, {
        headers: {
            Authorization: `bearer ${user.token}`
        }
    })
    if (response.status === 201) {
        return response.data;
    } else return false;
}

const updateBlog = async (blog, user) => {
    blog.delete(blog.user); // delete user property because it has been popupalated by mongoose
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, {
        headers: {
            Authorization: `bearer ${user.token}`
        }
    })
    if (response.status === 200) {
        return response.data;
    } else return false;
}

const deleteBlog = async (blog, user) => {
    const response = await axios.delete(`${baseUrl}/${blog.id}`, {
        headers: {
            Authorization: `bearer ${user.token}`
        }
    })
    if (response.status === 204) {
        return true;
    } else return false;
}


const blogService = { getAll, createBlog, updateBlog, deleteBlog };

export default blogService;