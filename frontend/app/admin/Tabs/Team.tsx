import { useState, useEffect } from 'react';

interface TeamInfo {
  description: string;
  descriptionLeft: string;
  descriptionRight: string;
  imageLeft: string | null;
  imageRight: string | null;
}

export function TeamComponent() {
  const [teamInfo, setTeamInfo] = useState<TeamInfo>({
    description: '',
    descriptionLeft: '',
    descriptionRight: '',
    imageLeft: null,
    imageRight: null
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch('https://64.226.114.142:3443/api/team');
      const data = await res.json();
      setTeamInfo(data);
    } catch (error) {
      console.error('Error fetching team info:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('https://64.226.114.142:3443/api/team', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamInfo)
      });
      fetchTeam();
    } catch (error) {
      console.error('Error updating team info:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setTeamInfo(prev => ({
            ...prev,
            [name]: reader.result as string
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setTeamInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6">Team Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Main Description
          </label>
          <textarea
            name="description"
            value={teamInfo.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Left Description
            </label>
            <textarea
              name="descriptionLeft"
              value={teamInfo.descriptionLeft}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Left Image
              </label>
              <input
                type="file"
                name="imageLeft"
                onChange={handleChange}
                accept="image/*"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {teamInfo.imageLeft && (
                <img 
                  src={teamInfo.imageLeft} 
                  alt="Left team" 
                  className="mt-2 h-32 object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Right Description
            </label>
            <textarea
              name="descriptionRight"
              value={teamInfo.descriptionRight}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Right Image
              </label>
              <input
                type="file"
                name="imageRight"
                onChange={handleChange}
                accept="image/*"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {teamInfo.imageRight && (
                <img 
                  src={teamInfo.imageRight} 
                  alt="Right team" 
                  className="mt-2 h-32 object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Update Team Information
        </button>
      </form>
    </div>
  );
}