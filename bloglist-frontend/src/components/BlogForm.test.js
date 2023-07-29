import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'


test('<BlogForm /> calls create function with correct arguments ', async () => {
    const createBlog = jest.fn(e => e.preventDefault())
    const user = userEvent.setup()

    render(<BlogForm handleCreate={createBlog} />)


    const addButton = screen.getByText('add blog')
    await user.click(addButton)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')

    const createButton = screen.getByText('create')

    await user.type(titleInput, 'testTitle')
    await user.type(authorInput, 'testAuthor')
    await user.type(urlInput, 'testUrl')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][1].title).toBe('testTitle')
    expect(createBlog.mock.calls[0][1].author).toBe('testAuthor')
    expect(createBlog.mock.calls[0][1].url).toBe('testUrl')
})