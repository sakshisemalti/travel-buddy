import React from 'react';
import { MapPin, Clock, Info, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Quick icon mapping based on string
const getIcon = (iconStr) => {
  switch (iconStr) {
    case 'flight': return '✈️';
    case 'walk': return '🚶';
    case 'food': return '🍽️';
    case 'train': return '🚆';
    case 'nature': return '🌳';
    case 'mountain': return '⛰️';
    case 'relax': return '♨️';
    case 'temple': return '⛩️';
    case 'shop': return '🛍️';
    case 'art': return '🎨';
    case 'boat': return '⛴️';
    case 'star': return '⭐';
    case 'building': return '🏢';
    case 'coffee': return '☕';
    default: return '📍';
  }
};

const ItineraryDisplay = ({ data }) => {
  if (!data) return null;

  return (
    <div className="itinerary-container">
      <div className="itinerary-header">
        <h2><span className="text-gradient">Your Perfect Trip to {data.destination}</span></h2>
        
        <div className="itinerary-meta">
          <div className="meta-tag"><Clock size={16} /> {data.duration} Days</div>
          <div className="meta-tag"><CheckCircle2 size={16} /> {data.style}</div>
          <div className="meta-tag"><Info size={16} /> Budget: {data.budget}</div>
        </div>
      </div>

      <div className="days-list">
        {data.days.map((day, index) => (
          <motion.div 
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="day-card glass-panel"
          >
            <div className="day-header">
              <h3>Day {day.day}: {day.title}</h3>
              <span className="day-focus">{day.focus}</span>
            </div>

            <div className="activities-list">
              {day.activities.map((act, actIndex) => (
                <div key={actIndex} className="activity-item">
                  <div className="activity-time">
                    {act.time} <span style={{ fontSize: '1.2rem' }}>{getIcon(act.icon)}</span>
                  </div>
                  <div className="activity-content">
                    <h4>{act.title}</h4>
                    <p>{act.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {day.tips && (
              <div className="tips-section">
                <h5><Info size={16} /> Local Insight</h5>
                <p>{day.tips}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;
