import React, { useEffect, useState } from 'react'
import { getAllProjectsForUser, getProjectById, createProject } from '../services/operations/projectAPI';
import { useSelector } from 'react-redux';
import ProjectRow from '../components/core/project/ProjectRow';
import ProjectDescription from '../components/core/project/ProjectDescription';
import Loading from '../components/Loading';
import ProjectModal from '../components/core/project/ProjectModal';


const ProjectsView = () => {
  const { userData } = useSelector((state) => state.auth || {});
  const { userRole } = useSelector((state) => state.auth || {});
  const { token } = useSelector((state) => state.auth || {});
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);

  const onClickProject = async (projectId) => {
    console.log("Project clicked:", projectId);
    setSelectedProjectId(projectId);
    const projectDetails = await getProjectById({ projectId })();
    setSelectedProjectDetails(projectDetails.data);
  };

  const closeProjectDetails = () => {
    setSelectedProjectId(null);
    setSelectedProjectDetails(null);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      if (!userData) return;

      const userId = userData.userId;
      console.log("Fetching projects for userId:", userId);
      if (!userId) return;

      setLoading(true);
      setError(null);
      try {
        const response = await getAllProjectsForUser({ userId,token })();
        const data = response.data;
        const projectsList = data || [];
        setProjects(Array.isArray(projectsList) ? projectsList : []);
        
        // TODO: Fetch available users for project creation
        // For now, create a mock list with the current user
        setAvailableUsers([
          { userId: userData.userId, userName: userData.firstName + ' ' + userData.lastName, userEmail: userData.email }
        ]);
      } catch (err) {
        console.error('Failed to fetch projects for user', err);
        setError(err.message || 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userData]);

  const handleCreateNewProject = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleCreateProjectSubmit = async (apiDto, dto) => {
    // Call your API to create the project using DTO matching projectAPI
    try {
      // If a file is present, send multipart/form-data to avoid embedding a File in JSON
      let payload = apiDto;
      if (apiDto && apiDto.file) {
            const formData = new FormData(); 
            // include both naming conventions to match backend DTO or earlier mappings
            formData.append('title', apiDto.title);
            formData.append('projectName', apiDto.title);
            formData.append('description', apiDto.description);
            formData.append('projectDescription', apiDto.description);
            formData.append('startDate', apiDto.startDate);
            formData.append('projectStartDate', apiDto.startDate);
            formData.append('endDate', apiDto.endDate);
            formData.append('projectEndDate', apiDto.endDate);
            // file fields under multiple keys for compatibility
            formData.append('file', apiDto.file);
            formData.append('formFile', apiDto.file);
            // team members as JSON and as UserIds (backend may expect UserIds)
            formData.append('teamMembers', JSON.stringify(apiDto.teamMembers || []));
            formData.append('UserIds', JSON.stringify(apiDto.teamMembers || []));
        payload = formData;
      }
      await createProject({
        formData,
        token})();
      // Refresh projects list
      const response = await getAllProjectsForUser({ userId: userData.userId,token })();
      const updatedProjects = response.data || [];
      setProjects(Array.isArray(updatedProjects) ? updatedProjects : []);
      console.log("Project created successfully");
    } catch (err) {
      console.error("Failed to create project", err);
      throw err;
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='w-full min-h-[calc(100vh-80px)] bg-linear-to-br from-slate-50 to-slate-100 p-6'>
      <div className='px-20 mx-auto max-h-[80vh] overflow-y-auto'>
        <div className='flex justify-between items-center mb-10'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>Projects</h1>
          <button onClick={(e)=>{handleCreateNewProject(e)}} className='px-2 py-3 border border-[#111111]  bg-gray-900 text-white rounded-md hover:bg-white hover:text-gray-900 transition font-semibold cursor-pointer'>
            {userRole === 1 ? 'Create New Project' : 'Request New Project'}
          </button>
        </div>
       
        {isOpen && (
          <ProjectModal isOpen={isOpen} onClose={handleCloseModal} onCreateProject={handleCreateProjectSubmit} availableUsers={availableUsers} />
        )}

        {loading && <div className='text-gray-600'>Loading projects...</div>}
        {error && <div className='text-red-600'>Error: {error}</div>}

        {!loading && projects.length === 0 && (
          <div className='text-gray-600'>No projects found.</div>
        )}
        
        {!selectedProjectId && projects.map((project) => (
          <ProjectRow key={project.projectId} project={project} onClickProject={onClickProject} />
        ))}
      </div>
      {
        selectedProjectId && !selectedProjectDetails && (
          <Loading/>
        )
      }
      {
        selectedProjectId && selectedProjectDetails && (
          <ProjectDescription project={selectedProjectDetails} onClose={closeProjectDetails} />
        )
      }
    </div>
  )
}

export default ProjectsView