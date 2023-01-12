const Header = ({ title }) => {
    const headerStyle = {
        backgroundColor: "black",
        color: "white"
    }
    return (
        <header style={headerStyle}>
            <h1>{title}</h1>
        </header>
    )
}

Header.defaultProps = {
    title: "Default Title"
}

export default Header;