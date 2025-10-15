
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { BadgeKey } from '../types';

interface GamificationContextType {
  xp: number;
  level: number;
  badges: BadgeKey[];
  addXp: (amount: number) => void;
  addBadge: (badgeKey: BadgeKey) => void;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const XP_PER_LEVEL = 1000;

export const GamificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(0);
  const [badges, setBadges] = useState<BadgeKey[]>([]);

  useEffect(() => {
    if (user) {
      setXp(user.xp);
      setLevel(Math.floor(user.xp / XP_PER_LEVEL));
      setBadges(user.badges);
    } else {
      setXp(0);
      setLevel(0);
      setBadges([]);
    }
  }, [user]);
  
  const addXp = (amount: number) => {
    const newXp = xp + amount;
    setXp(newXp);
    const newLevel = Math.floor(newXp / XP_PER_LEVEL);
    if (newLevel > level) {
      setLevel(newLevel);
      // TODO: Show level up notification
    }
  };
  
  const addBadge = (badgeKey: BadgeKey) => {
    if (!badges.includes(badgeKey)) {
      setBadges(prev => [...prev, badgeKey]);
      // TODO: Show badge earned notification
    }
  };

  return (
    <GamificationContext.Provider value={{ xp, level, badges, addXp, addBadge }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = (): GamificationContextType => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
