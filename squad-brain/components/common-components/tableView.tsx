function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default function Table({ projectFiles }: { projectFiles: Array<any> }) {
    return (
        <div className="p-6">
            {!projectFiles.length && (
                <p className="text-center text-slate-400">No files uploaded yet.</p>
            )}

            {projectFiles.length > 0 && (
                <div className="bg-slate-800 rounded-lg p-4 overflow-x-auto">
                    <table className="min-w-full table-fixed">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="px-4 py-2 text-left text-slate-300 w-[260px]">
                                    File Name
                                </th>
                                <th className="px-4 py-2 text-left text-slate-300">
                                    Size
                                </th>
                                <th className="px-4 py-2 text-left text-slate-300">
                                    Type
                                </th>
                                <th className="px-4 py-2 text-left text-slate-300">
                                    Last Modified
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {projectFiles.map((data, index) => (
                                <tr key={index} className="border-b border-slate-700">
                                    <td className="px-4 py-2">
                                        <div className="max-w-[240px] overflow-hidden ">
                                            <p
                                                className="truncate cursor-pointer"
                                                title={data.fileName}
                                            >
                                                {data.fileName}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">{formatBytes(data.fileSize)}</td>
                                    <td className="px-4 py-2">{data.fileType}</td>
                                    <td className="px-4 py-2">
                                        {new Date(data.uploadedAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
