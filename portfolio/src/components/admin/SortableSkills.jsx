import {
    DndContext,
    closestCenter
  } from "@dnd-kit/core";
  
  import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove
  } from "@dnd-kit/sortable";
  
  import { useState } from "react";
  import DraggableSkill from "./DraggableSkill";
  import { apiUrl } from "../../utils/api";
  
  const SortableSkills = ({ 
    skills,
    refresh,
    onEdit,
    onDelete
   }) => {
  
    const token = localStorage.getItem("token");
    const [items, setItems] = useState(skills);
  
    const handleDragEnd = async (event) => {
  
      const { active, over } = event;
  
      if (!over || active.id === over.id) return;
  
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over.id);
  
      const newItems = arrayMove(items, oldIndex, newIndex);
  
      setItems(newItems);
  
      await fetch(apiUrl("/api/skills/reorder"), {
  
        method: "PUT",
  
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
  
        body: JSON.stringify({
          category_id: newItems[0].category_id,
          skills: newItems.map(skill => skill.id)
        })
  
      });
  
      refresh();
  
    };
  
    return (
  
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
  
        <SortableContext
          items={items.map(skill => skill.id)}
          strategy={verticalListSortingStrategy}
        >
  
          <div className="space-y-3">
  
            {items.map((skill) => (
              <DraggableSkill
              key={skill.id}
              skill={skill}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            ))}
  
          </div>
  
        </SortableContext>
  
      </DndContext>
  
    );
  };
  
  export default SortableSkills;
