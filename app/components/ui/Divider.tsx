type DividerProps = {
    className?: string;
};

const Divider = ({ className = "" }: DividerProps) => {
    return <hr className={`border-t border-gray-300 my-4 ${className}`} />;
};

export default Divider;