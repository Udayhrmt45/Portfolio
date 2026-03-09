import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DraggableSkill = ({
  skill,
  onEdit,
  onDelete
}) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: skill.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex justify-between items-center bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition"
    >

      
      <div className="flex items-center gap-3">

        
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          ☰
        </span>

        
        <span className="font-medium">
          {skill.name}
        </span>

      </div>

      
      <div className="flex gap-4 text-sm">

        <button
          onClick={() => onEdit(skill)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(skill.id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default DraggableSkill;