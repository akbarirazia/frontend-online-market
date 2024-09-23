import React, { useContext, useEffect, useState } from 'react'; // Added useState
import { AuthContext } from '../../context/AuthContext';
import ProjectCard from '../ProjectCard';
import { ProjectService } from '../../services/ProjectRoutes'; // Assuming you have a service to fetch projects
import { toast } from 'react-toastify';
import Button from '../reusable/Button';
import { Link } from 'react-router-dom';

function Projects() {
  const { userData } = useContext(AuthContext); // Get user data from AuthContext
  const [projects, setProjects] = useState([]); // State to store projects
  const [currentProject, setCurrentProject] = useState(null); // Optional: if you want to set a currently selected project
  const [expandedImage, setExpandedImage] = useState(null); // Optional: for image zoom functionality
  const [zoom, setZoom] = useState(1); // Optional: for handling zoom on image

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Assuming ProjectService.getProjects fetches projects based on userId
        const data = await ProjectService.getProjects(userData.id);
        setProjects(data);
        if (data.length > 0) {
          setCurrentProject(data[0]); // Set the first project as the current one (if needed)
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    // Fetch the projects on component mount
    if (userData?.id) {
      fetchProjects();
    }
  }, [userData.id]);
  const deleteProject = async (projectId) => {
    try {
      const response = await ProjectService.deleteProject(projectId);
      setProjects(projects.filter((p) => p.id !== projectId));
      toast.info(response);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <section className='p-6'>
      <div className='flex justify-between mb-6'>
        <h1 className='text-3xl font-bold mb-6'>Your Projects</h1>
        <Link to={'/create'}>
          <Button className='p-4 rounded-md w-full bg-[#e8d7ee] text-[#720D96] font-semibold transition ease-in-out hover:text-white hover:bg-[#720D96]'>
            + Upload a New Project
          </Button>
        </Link>
      </div>

      {projects.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              //   image_url={project.image_url}
              // You can pass relevant functions like edit/delete when implemented
              onEdit={() => console.log('Edit project:', project.id)}
              onDelete={() => deleteProject(project.id)}
            />
          ))}
        </div>
      ) : (
        <p>You have no projects yet.</p>
      )}
    </section>
  );
}

export default Projects;
