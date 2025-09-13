const Footer = () => {
    return (
        <div className="bg-gray-400 px-8 py-8 text-amber-50 flex">
            <div className="flex flex-col gap-4">
                {/* <div>
                    <h1 className="text-xl font-bold text-amber-200">Say Hello!</h1>
                    <p className="text-sm">Get the latest updates delivered straight to your inbox.</p>
                </div> */}
                <button className="bg-gray-700 text-white px-4 py-2 rounded w-min text-sm">Subscribe</button>
            </div>
        </div>
    )
}

export default Footer