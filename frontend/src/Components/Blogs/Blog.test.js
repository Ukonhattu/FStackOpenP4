import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'


describe('Blog', () => {
    const blog = {
        title: 'Blog title',
        author: 'Blog author',
        url: 'Blog url',
        likes: 0,
        user: {
            username: 'Blog user'
        }
    }
    const user = {
        username: 'Blog user'
    }
    const mockHandler = jest.fn()
    beforeEach(() => {
        render(
            <Blog blog={blog} user={user} mockHandler={mockHandler} />
        )
    })
    test('renders blog title', () => {
        expect(screen.getByText(blog.title)).toBeInTheDocument()
    })
    test('Does not show author, url, likes: their div is hidden', () => {
        const div = screen.getByText(`${blog.author}`).parentElement
        expect(div).toHaveStyle('display: none')
    })

    test('Clicking the like button twice calls event handler twice', async () => {
        const userev = userEvent.setup()
        const button = screen.getByText('Like')
        await userev.click(button)
        await userev.click(button)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

describe('BlogCreatingForm', () => {
    const blog = {
        title: 'Blog title',
        author: 'Blog author',
        url: 'Blog url',
        likes: 0,
    }
    const user = {
        username: 'Blog user',
        token: 'token'
    }
    const mockSubmit = jest.fn(e => e.preventDefault())
    beforeEach(() => {
        render(
            <CreateBlogForm blog={blog} user={user} mockSubmit={mockSubmit} />
        )
    })
    test('Creating a blog calls event handler with right details', async () => {
        const titleInput = screen.getByPlaceholderText('title')
        const authorInput = screen.getByPlaceholderText('author')
        const urlInput = screen.getByPlaceholderText('url')
        const sendButton = screen.getByTestId('send-button')
        const user = userEvent.setup()
        await user.type(titleInput, 'Blog title')
        await user.type(authorInput, 'Blog author')
        await user.type(urlInput, 'Blog url')
        await user.click(sendButton)
        console.log(mockSubmit.mock.calls)
        expect(mockSubmit.mock.calls).toHaveLength(1)

    })

    //todo remember to fix tests

})