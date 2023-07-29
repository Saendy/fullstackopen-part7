import { useState } from 'react'
import Togglable from './Toggleable'

const BlogForm = ({ handleCreate }) => {

    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    return (
        <Togglable buttonLabel='add blog' >
            <div>
                <h2>create new</h2>
                <form onSubmit={(event) => handleCreate(event, { title: blogTitle, author: blogAuthor, url: blogUrl })}>
                    <div>
                        title:
                        <input
                            value={blogTitle}
                            onChange={({ target }) => setBlogTitle(target.value)}
                            placeholder='title'
                        />
                    </div>
                    <div>
                        author:
                        <input
                            value={blogAuthor}
                            onChange={({ target }) => setBlogAuthor(target.value)}
                            placeholder='author'
                        />
                    </div>
                    <div>
                        url:
                        <input
                            value={blogUrl}
                            onChange={({ target }) => setBlogUrl(target.value)}
                            placeholder='url'
                        />
                    </div>
                    <button type="submit">create</button>
                </form>
            </div >
        </Togglable>
    )
}
export default BlogForm