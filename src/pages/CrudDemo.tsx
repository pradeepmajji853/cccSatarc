import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, RefreshCw } from 'lucide-react';

interface Topic {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
}

// Mock URL for frontend-only operation
const API_URL = "https://ccc-satarc-backend";

function CrudDemo() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Beginner',
    duration: 1
  });
  const [requestInfo, setRequestInfo] = useState({
    method: '',
    url: '',
    response: ''
  });

  // Load topics from localStorage
  const fetchTopics = () => {
    setLoading(true);
    try {
      const storedTopics = JSON.parse(localStorage.getItem('topics') || '[]');
      setTopics(storedTopics);
      setRequestInfo({
        method: 'GET',
        url: `${API_URL}/api/topics`,
        response: JSON.stringify(storedTopics, null, 2)
      });
    } catch (err) {
      setError('Failed to fetch topics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // Create topic
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newTopic = { ...formData, _id: Date.now().toString() };
    const updatedTopics = [newTopic, ...topics];
    localStorage.setItem('topics', JSON.stringify(updatedTopics));
    setTopics(updatedTopics);
    setFormData({ title: '', description: '', difficulty: 'Beginner', duration: 1 });
    setRequestInfo({
      method: 'POST',
      url: `${API_URL}/api/topics`,
      response: JSON.stringify(newTopic, null, 2)
    });
  };

  // Update topic
  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopic) return;

    const updatedTopics = topics.map(t => t._id === selectedTopic._id ? { ...selectedTopic, ...formData } : t);
    localStorage.setItem('topics', JSON.stringify(updatedTopics));
    setTopics(updatedTopics);
    setSelectedTopic(null);
    setFormData({ title: '', description: '', difficulty: 'Beginner', duration: 1 });
    setRequestInfo({
      method: 'PUT',
      url: `${API_URL}/api/topics/${selectedTopic._id}`,
      response: JSON.stringify(formData, null, 2)
    });
  };

  // Delete topic
  const handleDelete = (id: string) => {
    const updatedTopics = topics.filter(t => t._id !== id);
    localStorage.setItem('topics', JSON.stringify(updatedTopics));
    setTopics(updatedTopics);
    setRequestInfo({
      method: 'DELETE',
      url: `${API_URL}/api/topics/${id}`,
      response: JSON.stringify({ message: 'Topic deleted' }, null, 2)
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 p-6 rounded-lg shadow-xl"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">
            {selectedTopic ? 'Update Topic' : 'Add New Topic'}
          </h2>
          <form onSubmit={selectedTopic ? handleUpdate : handleCreate}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Description</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={e => setFormData({ ...formData, difficulty: e.target.value as Topic['difficulty'] })}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Duration (hours)</label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
                  min="1"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700"
              >
                {selectedTopic ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                {selectedTopic ? 'Update Topic' : 'Add Topic'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Topics List & Request Info */}
        <div className="space-y-6">
          {/* Request Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 p-6 rounded-lg shadow-xl"
          >
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Last Request Info</h3>
            <div className="space-y-2 font-mono text-sm">
              <p className="text-gray-300">Method: <span className="text-cyan-400">{requestInfo.method}</span></p>
              <p className="text-gray-300">URL: <span className="text-cyan-400">{requestInfo.url}</span></p>
              <div className="mt-4">
                <p className="text-gray-300 mb-2">Response:</p>
                <pre className="bg-gray-800 p-4 rounded-md overflow-x-auto">
                  <code className="text-cyan-400">{requestInfo.response}</code>
                </pre>
              </div>
            </div>
          </motion.div>

          {/* Topics List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 p-6 rounded-lg shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-cyan-400">Workshop Topics</h3>
              <button
                onClick={fetchTopics}
                className="p-2 text-cyan-400 hover:bg-gray-800 rounded-full"
                title="Refresh"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
            </div>
            
            {loading ? (
              <p className="text-gray-300">Loading...</p>
            ) : error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              <div className="space-y-4">
                {topics.map(topic => (
                  <motion.div
                    key={topic._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-800 p-4 rounded-lg"
                  >
                    <h4 className="text-lg font-bold text-cyan-400">{topic.title}</h4>
                    <p className="text-gray-400 text-sm">{topic.description}</p>
                    <p className="text-gray-400 text-sm">Difficulty: {topic.difficulty}</p>
                    <p className="text-gray-400 text-sm">Duration: {topic.duration} hours</p>
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => {
                          setSelectedTopic(topic);
                          setFormData(topic);
                        }}
                        className="px-2 py-1 rounded-md text-sm font-medium text-yellow-500 hover:bg-gray-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(topic._id)}
                        className="px-2 py-1 rounded-md text-sm font-medium text-red-500 hover:bg-gray-700"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CrudDemo;
