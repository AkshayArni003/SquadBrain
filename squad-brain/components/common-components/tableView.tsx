const TableData = [
    { "fileName": "index.js", "size": "15 KB", "type": "JavaScript", "modified": "2024-06-10" },
    { "fileName": "styles.css", "size": "8 KB", "type": "CSS", "modified": "2024-06-12" },
    { "fileName": "app.tsx", "size": "20 KB", "type": "TypeScript", "modified": "2024-06-11" },
    { "fileName": "README.md", "size": "5 KB", "type": "Markdown", "modified": "2024-06-09" },
]

export default function Table() {
    return (
        <div className="p-6">
            <div className="bg-slate-800 rounded-lg p-4">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="border-b border-slate-700">
                            <th className="px-4 py-2 text-left text-slate-300">File Name</th>
                            <th className="px-4 py-2 text-left text-slate-300">Size</th>
                            <th className="px-4 py-2 text-left text-slate-300">Type</th>
                            <th className="px-4 py-2 text-left text-slate-300">Last Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {TableData.map((data, index) => (
                            <tr key={index} className="border-b border-slate-700">
                                <td className="px-4 py-2">{data.fileName}</td>
                                <td className="px-4 py-2">{data.size}</td>
                                <td className="px-4 py-2">{data.type}</td>
                                <td className="px-4 py-2">{data.modified}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}