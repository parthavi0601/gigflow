import type { ReactNode } from "react";
import { Zap, TrendingUp, Users, Target } from "lucide-react";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  demo?: ReactNode;
}

const FEATURES = [
  { icon: TrendingUp, text: "Track pipeline in real time" },
  { icon: Users, text: "Collaborate across your sales team" },
  { icon: Target, text: "Filter, search, and close faster" },
];

export const AuthShell = ({ title, subtitle, children, demo }: AuthShellProps) => (
  <div className="auth-page">
    <div className="auth-brand-panel">
      <div className="auth-brand-inner">
        <div className="auth-logo">
          <Zap size={22} color="#fff" fill="#fff" />
        </div>
        <h1 className="auth-brand-title">GigFlow</h1>
        <p className="auth-brand-tagline">Turn prospects into revenue with a dashboard built for speed.</p>
        <ul className="auth-features">
          {FEATURES.map(({ icon: Icon, text }) => (
            <li key={text}>
              <span className="auth-feature-icon">
                <Icon size={16} />
              </span>
              {text}
            </li>
          ))}
        </ul>
        <div className="auth-brand-orb auth-brand-orb-1" />
        <div className="auth-brand-orb auth-brand-orb-2" />
      </div>
    </div>
    <div className="auth-form-panel">
      <div className="auth-card">
        <div className="auth-card-header">
          <h2 className="auth-card-title">{title}</h2>
          <p className="auth-card-sub">{subtitle}</p>
        </div>
        {demo}
        {children}
      </div>
    </div>
  </div>
);
