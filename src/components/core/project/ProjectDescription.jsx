import KanbanBoard from './Kanban';
import GanttChart from '../../core/project/Gantt';
import React from 'react';
import TaskModal from './TaskModal';
import UpdateProjectModal from './UpdateProjectModal';
import DeleteProjectConfirmation from './DeleteProjectConfirmation';
import { useSelector } from 'react-redux';
import { createTask } from '../../../services/operations/taskAPI';
import { updateProject, deleteProject } from '../../../services/operations/projectAPI';
import { FileOutput } from 'lucide-react';
import FileViewer from './FileViewer';

const ProjectDescription = ({ project, onClose }) => {
    const { userData } = useSelector((state) => state.auth || {});
    const { userRole } = useSelector((state) => state.auth || {});
    const [tasks, setTasks] = React.useState(project ? project.tasks : []);
    const [isTaskModalOpen, setIsTaskModalOpen] = React.useState(false);
    const [isUpdateProjectModalOpen, setIsUpdateProjectModalOpen] = React.useState(false);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = React.useState(false);
    const [updatedProject, setUpdatedProject] = React.useState(project);
    const [isFileViewerOpen, setIsFileViewerOpen] = React.useState(false);
    const [availableUsers, setAvailableUsers] = React.useState([
      { userId: userData?.userId, userName: userData?.firstName + ' ' + userData?.lastName, userEmail: userData?.email }
    ]);
  if (!project) {
    return null;
  }
  console.log("Project details:", project.tasks);
  const formatDate = (date) => {
    return date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData)();
      // Refresh tasks
      setTasks([...tasks, taskData]);
      console.log("Task created successfully");
    } catch (err) {
      console.error("Failed to create task", err);
      throw err;
    }
  };

  const handleUpdateProject = async (payload, dto) => {
    try {
      await updateProject(project.projectId, dto)();
      // Update local state with new project data
      const updatedData = {
        ...updatedProject,
        projectName: dto.projectName,
        projectDescription: dto.projectDescription,
        projectStartDate: dto.projectStartDate,
        projectEndDate: dto.projectEndDate
      };
      setUpdatedProject(updatedData);
      console.log("Project updated successfully");
    } catch (err) {
      console.error("Failed to update project", err);
      throw err;
    }
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(project.projectId)();
      console.log("Project deleted successfully");
      // Close project description modal and refresh projects list
      if (onClose) onClose();
    } catch (err) {
      console.error("Failed to delete project", err);
      throw err;
    }
  };

  return (
    
    <div className=" flex items-center justify-center z-50 p-4 ">
      <div className= " mx-16 bg-white rounded-lg shadow-xl w-full max-h-[90vh]  ">
        {/* Header */}
        <div className="sticky bg-gray-900 text-white p-6 flex justify-between items-start rounded-lg shadow-lg">
          <div className='flex justify-between items-center w-full'>
            <h2 className="text-3xl font-bold mb-2">{updatedProject.projectName}</h2>
            {
                userRole === 1 && (<div className='flex gap-4 px-2'>
                    <button onClick={() => setIsUpdateProjectModalOpen(true)} className="text-md font-semibold px-3 py-1 border border-gray-300 hover:bg-gray-700 cursor-pointer rounded-md">Edit Project</button> 
                    <button onClick={() => setIsDeleteConfirmationOpen(true)} className="text-md font-semibold px-3 py-1 border border-red-500 text-red-600  hover:bg-red-100 cursor-pointer rounded-md">Delete Project</button>
                    </div>) 
            }
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-white text-2xl font-bold hover:bg-gray-800 cursor-pointer rounded-full w-10 h-10 flex items-center justify-center transition"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6  px-8 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Description */}
          {updatedProject.projectDescription && (
            <div className='flex justify-between mx-4'>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-md text-gray-600 whitespace-pre-line">{updatedProject.projectDescription}</p>
              </div>
              {
                updatedProject.fileId && (
                  <div className='flex flex-col items-center'>
                    <button onClick={() => setIsFileViewerOpen(true)} className="text-gray-900 hover:underline flex items-center gap-2">
                      <FileOutput className="w-5 h-5"/> View Document
                    </button>
                  </div>
                )
              }
            </div>
          )}
           <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 font-medium mb-1">Start Date</p>
              <p className="text-lg text-gray-800 font-semibold">{formatDate(updatedProject.projectStartDate)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 font-medium mb-1">End Date</p>
              <p className="text-lg text-gray-800 font-semibold">{formatDate(updatedProject.projectEndDate)}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4">
            {updatedProject.projectBudget && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 font-medium mb-1">Budget</p>
                <p className="text-lg text-gray-800 font-semibold">${updatedProject.projectBudget.toLocaleString()}</p>
              </div>
            )}
            {updatedProject.projectCategory && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 font-medium mb-1">Category</p>
                <p className="text-lg text-gray-800 font-semibold">{updatedProject.projectCategory}</p>
              </div>
            )}
          </div>

          {/* Team Members */}
          {updatedProject.teamMembers && updatedProject.teamMembers.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Team Members</h3>
              <div className="flex flex-wrap gap-2">
                {updatedProject.teamMembers.map((member, idx) => (
                  <div key={idx} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium">
                    {member.name || member}
                  </div>
                ))}
              </div>
            </div>
          )}
            <GanttChart tasks={tasks} setTasks={setTasks}/>
            <KanbanBoard tasksArray={tasks} setTasksArray={setTasks} setIsTaskModalOpen={setIsTaskModalOpen} />
          {/* Project ID */}
          <div className="border-t pt-4">
            <p className="text-xs text-gray-400">Project ID: {project.projectId}</p>
          </div>
      </div>

        </div> 
         
      {/* Task Modal */}
      {isTaskModalOpen && (
        <TaskModal 
          isOpen={isTaskModalOpen} 
          onClose={() => setIsTaskModalOpen(false)} 
          onCreateTask={handleCreateTask}
          projectId={project.projectId}
          availableUsers={availableUsers}
        />
      )}

      {/* Update Project Modal */}
      {isUpdateProjectModalOpen && (
        <UpdateProjectModal 
          isOpen={isUpdateProjectModalOpen} 
          onClose={() => setIsUpdateProjectModalOpen(false)} 
          onUpdateProject={handleUpdateProject}
          project={updatedProject}
          availableUsers={availableUsers}
        />
      )}

      {/* Delete Project Confirmation */}
      {isDeleteConfirmationOpen && (
        <DeleteProjectConfirmation
          isOpen={isDeleteConfirmationOpen}
          onClose={() => setIsDeleteConfirmationOpen(false)}
          onConfirmDelete={handleDeleteProject}
          projectName={updatedProject.projectName}
        />
      )}
      {isFileViewerOpen && (
        <FileViewer
          fileId={updatedProject.fileId}
          fileUrl={updatedProject.projectDocument}
          onClose={() => setIsFileViewerOpen(false)}
        />
      )}
    </div>
  );
};

export default ProjectDescription;