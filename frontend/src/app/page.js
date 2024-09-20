"use client"

import { useState, useEffect } from 'react';
import { getToken } from '../lib/utils/auth';
import { ProtectedRoute } from '../components/ProtectedRoute';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = getToken();
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          throw new Error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Your Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ProtectedTasksPage() {
  return (
    <ProtectedRoute>
      <TasksPage />
    </ProtectedRoute>
  );
}