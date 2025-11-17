import FileUpload from "../components/FileUpload";

export default function UploadPage(){
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-xl">
                <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
                    Upload Your Bank Statement (CSV File)
                </h1>
                <FileUpload />
            </div>
        </div>
    )
}