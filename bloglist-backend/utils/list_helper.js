const totalLikes = (blogs) => {
    return blogs.reduce((accumulator, currentValue) => accumulator + currentValue.likes, 0)
}

const favouriteBlog = (blogs) => {
    let sortedBlogs = [...blogs]
    return sortedBlogs.sort((a, b) => { return b.likes - a.likes })[0]
}

const summariseAuthors = (blogs) => {
    let authorSummary = {}
    blogs.forEach(blog => {
        if (blog.author in authorSummary) {
            authorSummary[blog.author].likes += blog.likes
            authorSummary[blog.author].blogCount += 1
        }
        else {
            authorSummary[blog.author] = { likes: blog.likes, blogCount: 1 }
        }
    })
    let authorList = []
    Object.keys(authorSummary).forEach(author => {
        authorList.push({
            author: author,
            likeCount: authorSummary[author].likes,
            blogCount: authorSummary[author].blogCount
        })
    })
    return authorList
}

const mostBlogs = (blogs) => {
    let authorList = summariseAuthors(blogs)
    authorList.sort((a, b) => { return b.blogCount - a.blogCount })
    return { author: authorList[0].author, blogs: authorList[0].blogCount }
}

const mostLikes = (blogs) => {
    let authorList = summariseAuthors(blogs)
    authorList.sort((a, b) => { return b.likeCount - a.likeCount })
    return { author: authorList[0].author, likes: authorList[0].likeCount }
}

module.exports = {
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}