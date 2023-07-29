import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title', () => {
    const blog = {
        url: 'testurl',
        author: 'testauthor',
        likes: 5,
        title: 'testtitle',
        user: {
            username: 'testusername',
            name: 'testname'
        }
    }
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('testtitle')
})

test('renders author', () => {
    const blog = {
        url: 'testurl',
        author: 'testauthor',
        likes: 5,
        title: 'testtitle',
        user: {
            username: 'testusername',
            name: 'testname'
        }
    }

    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('testauthor')
})

test('does not render url or likes without opening', () => {
    const blog = {
        url: 'testurl',
        author: 'testauthor',
        likes: 5,
        title: 'testtitle',
        user: {
            username: 'testusername',
            name: 'testname'
        }
    }
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')

    expect(div).not.toHaveTextContent('testurl')
    expect(div).not.toHaveTextContent('likes')
    expect(div).not.toHaveTextContent('5')
})

test('click show button shows likes and url', async () => {
    const blog = {
        url: 'testurl',
        author: 'testauthor',
        likes: 5,
        title: 'testtitle',
        user: {
            username: 'testusername',
            name: 'testname'
        }
    }
    const testUser = {
        username: 'testusername2'
    }

    const { container } = render(
        <Blog blog={blog} user={testUser} />
    )
    const div = container.querySelector('.blog')

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    expect(div).toHaveTextContent('testurl')
    expect(div).toHaveTextContent('likes 5')
})


test('clicking the button twice calls event handler twice', async () => {
    const blog = {
        url: 'testurl',
        author: 'testauthor',
        likes: 5,
        title: 'testtitle',
        user: {
            username: 'testusername',
            name: 'testname'
        }
    }
    const testUser = {
        username: 'testusername2'
    }

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} user={testUser} addLike={mockHandler} />
    )

    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})