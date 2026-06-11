const Button = ({text, onClick, type = "button"}) => {
    return (
        <button 
            type={type} 
            onClick={onClick} 
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 "
        >
            {text}
        </button>
    )
}

export default Button