import React, { useRef, useState, useEffect } from 'react';
import { stats } from '../data/data';
import { Users, Building2, Shield, Star } from 'lucide-react';

function useCountUp(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOutQuad = (t) => t * (2 - t);
      const currentCount = Math.floor(easeOutQuad(percentage) * end);

      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

const iconMap = {
  Users,
  Building2,
  Shield,
  Star
};

function StatCounterItem({ stat, isVisible }) {
  const Icon = iconMap[stat.icon] || Star;
  const animatedValue = useCountUp(stat.value, 2000, isVisible);

  return (
    <div className="stat-banner-item">
      <div className="stat-banner-icon">
        <Icon size={22} />
      </div>
      <div className="stat-banner-number">
        {stat.prefix}
        {stat.isFloat ? (isVisible ? stat.value : 0) : animatedValue.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="stat-banner-label">{stat.label}</div>
    </div>
  );
}

export function Stats() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-navy-section" ref={sectionRef} aria-label="Our Impact">
      <div className="container">
        <div className="stats-navy-layout">
          <div className="stats-navy-intro">
            <span className="stats-navy-tag">OUR IMPACT</span>
            <h2 className="stats-navy-title">
              Numbers That<br />
              Speak for Themselves
            </h2>
          </div>

          <div className="stats-navy-grid">
            {stats.map((stat) => (
              <StatCounterItem
                key={stat.id}
                stat={stat}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
