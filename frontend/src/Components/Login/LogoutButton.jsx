const LogoutButton = () => {
    const onClick = () => {
        localStorage.removeItem('user');
        window.location.reload();
    }
    return (
        <button className="btn btn-danger" onClick={onClick}>Logout</button>
    );
}

export default LogoutButton;
