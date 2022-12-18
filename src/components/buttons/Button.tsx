
interface props {
    children?: JSX.Element,
    status: string
    onClick: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];

}


const Button = ({children, status, onClick}: props) => {
  return (
    <button onClick={onClick} className={`btn-${status}`}>
        {children}
    </button>
  )
}

export default Button;