interface Props {
    icon: string;
    onClick: () => void;
}

const IconButton: React.FC<Props>  = ({ icon, onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            {icon}
        </button>
    );
};

export default IconButton;