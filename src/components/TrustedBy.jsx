import React from 'react';

export function TrustedBy() {
  const logos = [
    { name: 'Google', symbol: 'Google' },
    { name: 'Microsoft', symbol: 'Microsoft' },
    { name: 'Spotify', symbol: 'Spotify' },
    { name: 'Notion', symbol: 'Notion' },
    { name: 'Figma', symbol: 'Figma' },
    { name: 'Slack', symbol: 'Slack' },
    { name: 'Adobe', symbol: 'Adobe' },
  ];

  return (
    <section className="trusted-section" aria-label="Trusted by innovative teams">
      <div className="container">
        <p className="trusted-title">
          Trusted by innovative teams worldwide
        </p>

        <div className="trusted-logos-grid">
          {logos.map((logo) => (
            <div key={logo.name} className="brand-logo-pill">
              <span className="brand-logo-name">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedBy;
