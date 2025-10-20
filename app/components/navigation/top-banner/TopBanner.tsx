interface TopBannerProps {
    message: string;
    bgColor: string; // e.g., "bg-blue-500", "bg-red-600"
}

const TopBanner = ({ message, bgColor }: TopBannerProps) => {
    return (
        <div className={`${bgColor} text-white text-center py-2 px-4 text-xs relative`}>
            <div className="max-w-screen-2xl mx-auto flex items-center justify-center">
                <span>{message.toLocaleUpperCase()}</span>
            </div>
        </div>
    );
};
export default TopBanner;