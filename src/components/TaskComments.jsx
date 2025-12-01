import React, { useState, useRef } from "react";
import Comment from "./Comment";

export default function TaskComments({ task, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");
  const [uploads, setUploads] = useState([]);
  const fileRef = useRef(null);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim() && uploads.length === 0) return;

    const newComment = {
      id: Date.now(),
      author: "You",
      text: commentText,
      createdAt: new Date().toISOString(),
      attachments: uploads,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
    setUploads([]);
    if (fileRef.current) fileRef.current.value = null;
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);

    const mapped = files.map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));

    setUploads([...uploads, ...mapped]);
  };

  return (
    <div className="max-w-3xl mx-auto shadow-lg p-6 rounded-lg mb-6 bg-red-500/50">
      <h2 className="text-2xl font-semibold">{task?.title}</h2>
      <p className="text-gray-600 mt-1">{task?.description}</p>

      <div className="text-sm text-gray-500 mt-2 space-x-4">
        <span>Assigned: <strong>{task?.assignee}</strong></span>
        <span>Status: <strong>{task?.status}</strong></span>
        {task?.dueDate && (
          <span>Due: <strong>{new Date(task.dueDate).toLocaleDateString()}</strong></span>
        )}
      </div>

      {/* Add Comment */}
      <form className="mt-6" onSubmit={handleAddComment}>
        <textarea
          className="w-full border p-3 rounded-md text-sm"
          rows={3}
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        {/* File Upload */}
        <div className="mt-3 flex items-center gap-3">
          <label className="cursor-pointer text-sm px-3 py-2 bg-gray-100 rounded-md border">
            <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFiles} />
            Attach Files
          </label>

          {uploads.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {uploads.map((f, i) => (
                <span key={i} className="text-xs border px-2 py-1 rounded bg-gray-50">
                  {f.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Add Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Comments ({comments.length})</h3>

        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <Comment key={c.id} comment={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
