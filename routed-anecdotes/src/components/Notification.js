const Notification = ({ notification }) => {
    if (notification) {
        return (
            <div>{notification}</div>
        )
    }

    return (<></>)
}
export default Notification