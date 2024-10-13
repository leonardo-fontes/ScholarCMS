
export default function Loading() {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-lightGray bg-opacity-50 backdrop-blur-sm">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
    )
}
