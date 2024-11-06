import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, RefreshCw } from 'lucide-react';

interface Topic {
  _id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
}

const API_URL = import.meta.env.VITE_API_URL;

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

  // Fetch topics
  const fetchTopics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/topics`);
      setTopics(response.data);
      setRequestInfo({
        method: 'GET',
        url: `${API_URL}/api/topics`,
        response: JSON.stringify(response.data, null, 2)
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
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/topics`, formData);
      setTopics([response.data, ...topics]);
      setFormData({ title: '', description: '', difficulty: 'Beginner', duration: 1 });
      setRequestInfo({
        method: 'POST',
        url: `${API_URL}/api/topics`,
        response: JSON.stringify(response.data, null, 2)
      });
    } catch (err) {
      setError('Failed to create topic');
    }
  };

  // Update topic
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopic) return;

    try {
      const response = await axios.put(`${API_URL}/api/topics/${selectedTopic._id}`, formData);
      setTopics(topics.map(t => t._id === selectedTopic._id ? response.data : t));
      setSelectedTopic(null);
      setFormData({ title: '', description: '', difficulty: 'Beginner', duration: 1 });
      setRequestInfo({
        method: 'PUT',
        url: `${API_URL}/api/topics/${selectedTopic._id}`,
        response: JSON.stringify(response.data, null, 2)
      });
    } catch (err) {
      setError('Failed to update topic');
    }
  };

  // Delete topic
  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/api/topics/${id}`);
      setTopics(topics.filter(t => t._id !== id));
      setRequestInfo({
        method: 'DELETE',
        url: `${API_URL}/api/topics/${id}`,
        response: JSON.stringify(response.data, null, 2)
      });
    } catch (err) {
      setError('Failed to delete topic');
    }
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
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-white">{topic.title}</h4>
                        <p className="text-gray-400 text-sm mt-1">{topic.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-cyan-400">{topic.difficulty}</span>
                          <span className="text-sm text-gray-400">{topic.duration}h</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedTopic(topic);
                            setFormData({
                              title: topic.title,
                              description: topic.description,
                              difficulty: topic.difficulty,
                              duration: topic.duration
                            });
                          }}
                          className="p-2 text-cyan-400 hover:bg-gray-700 rounded-full"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(topic._id)}
                          className="p-2 text-red-400 hover:bg-gray-700 rounded-full"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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