// Comment.jsx
import React from "react";

/**
 * Props:
 * - comment: {
 *     commentId, taskId, userId, commentMessage, commentCreatedAt, user, file
 *   }
 * - currentUserId: optional (to highlight current user's comments)
 */
export default function Comment({ comment, currentUserId }) {
  const date = comment?.commentCreatedAt ? new Date(comment.commentCreatedAt) : null;
  const isMine = currentUserId && comment.userId === currentUserId;

  return (
    <div className={`p-3 rounded-md border ${isMine ? "bg-blue-50" : "bg-white"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{comment?.user?.userName ?? `User ${comment?.userId ?? ""}`}</span>
            {isMine && <span className="text-xs text-blue-600 px-2 py-0.5 rounded border border-blue-100">You</span>}
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{date ? date.toLocaleString() : ""}</span>
          </div>

          <p className="mt-2 text-gray-800 whitespace-pre-wrap">{comment?.commentMessage}</p>

          {comment?.file && (
            <div className="mt-2">
              {/* Adapt file display depending on file object shape from backend */}
              {comment.file.fileUrl ? (
                <a
                  href={comment.file.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 underline"
                >
                  View attachment
                </a>
              ) : (
                // fallback if your API returns just fileId
                <span className="text-sm text-gray-600">Attachment available</span>
              )}
            </div>
          )}
        </div>

        {/* optional: show file icon or actions */}
        <div className="text-xs text-gray-400">
          #{comment?.commentId}
        </div>
      </div>
    </div>
  );
}
