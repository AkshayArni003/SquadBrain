import { useState } from "react";
export default function Upload({ upload }: { upload: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [files, setFiles] = useState<FileList | null>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(files)
    }
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-900 p-6 rounded-lg w-96">
                <h3 className="text-lg font-semibold text-white mb-4">Upload Files</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-white mb-2">Choose Files</label>
                        <input type="file" multiple className="w-full text-white bg-slate-800 p-2 rounded-lg cursor-pointer" onChange={(e) => setFiles(e.target.files)} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors cursor-pointer" onClick={() => upload(false)}>Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer" disabled={!files}>Upload</button>
                    </div>
                </form>
            </div>
        </div>
    )
}