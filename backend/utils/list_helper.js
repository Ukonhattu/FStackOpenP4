const _ = require('lodash')

const dummy = (_) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlogs = (blogs) => {
    const authors = _.countBy(blogs, 'author')
    const author = _.maxBy(_.keys(authors), (author) => authors[author])
    return {
        author,
        blogs: authors[author]
    }
}

const mostLikes = (blogs) => {
    const authors = _.groupBy(blogs, 'author')
    const author = _.maxBy(_.keys(authors), (author) => totalLikes(authors[author]))
    return {
        author,
        likes: totalLikes(authors[author])
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
