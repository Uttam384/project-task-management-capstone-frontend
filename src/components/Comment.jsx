import React from "react";

export default function Comment({ comment }) {
  return (
    <div className="border p-4 rounded-lg bg-gray-50">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 font-bold">
          {comment.author[0].toUpperCase()}
        </div>

        {/* Comment Details */}
        <div>
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-sm">{comment.author}</h4>
            <span className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>

          <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">
            {comment.text}
          </p>

          {/* Attachments */}
          {comment.attachments?.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-3">
              {comment.attachments.map((file, i) => (
                <a
                  key={i}
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-2 py-1 border rounded bg-white"
                >
                  {file.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
