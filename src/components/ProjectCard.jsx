import React from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
      {/* Project Image */}
      <div className='relative'>
        <img
          src={project.image_url}
          alt={project.title}
          className='w-full h-48 object-cover'
        />
      </div>

      {/* Project Details */}
      <div className='p-4'>
        <h2 className='text-xl font-semibold text-gray-800 mb-2'>
          {project.title}
        </h2>
        <p className='text-sm text-gray-600 '>{project.description}</p>
        <div className='my-1  bg-white bg-opacity-50 p-1 rounded-lg'>
          <a href={project.link}>
            <span className='text-xs font-medium text-fuchsia-700'>
              {project.link}
            </span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-between'>
          <button
            onClick={() => onEdit(project.id)}
            className='flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition duration-300'
          >
            <FaEdit />
            <span>Edit</span>
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className='flex items-center space-x-2 text-red-600 hover:text-red-800 transition duration-300'
          >
            <FaTrashAlt />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectCard;
