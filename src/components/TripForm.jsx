import React, { useState } from 'react';
import { Plane, Calendar, Wallet, Users, Heart, ShieldAlert, Sparkles } from 'lucide-react';

const TripForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    destination: '',
    duration: '',
    style: 'Solo',
    budget: '',
    vibes: '',
    constraints: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem' }}>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label><Plane size={18} /> Destination</label>
          <input 
            type="text" 
            name="destination"
            placeholder="e.g. Tokyo, Japan" 
            className="input-field" 
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label><Calendar size={18} /> Duration (Days)</label>
          <input 
            type="number" 
            name="duration"
            min="1"
            max="30"
            placeholder="e.g. 7" 
            className="input-field" 
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label><Users size={18} /> Travel Style</label>
          <select 
            name="style"
            className="input-field"
            value={formData.style}
            onChange={handleChange}
          >
            <option value="Solo">Solo</option>
            <option value="Couple">Couple</option>
            <option value="Family">Family</option>
            <option value="Group">Group</option>
          </select>
        </div>

        <div className="form-group">
          <label><Wallet size={18} /> Budget (Per Person)</label>
          <input 
            type="text" 
            name="budget"
            placeholder="e.g. $2,000 USD" 
            className="input-field" 
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label><Heart size={18} /> Interests & Vibes</label>
          <input 
            type="text" 
            name="vibes"
            placeholder="e.g. Adventure, Food & Cuisine, Off-the-beaten-path" 
            className="input-field" 
            value={formData.vibes}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label><ShieldAlert size={18} /> Constraints & Preferences</label>
          <input 
            type="text" 
            name="constraints"
            placeholder="e.g. vegetarian-friendly, no red-eye flights, avoid tourist traps" 
            className="input-field" 
            value={formData.constraints}
            onChange={handleChange}
          />
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Crafting Itinerary...' : <><Sparkles size={20} /> Generate AI Itinerary</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripForm;
