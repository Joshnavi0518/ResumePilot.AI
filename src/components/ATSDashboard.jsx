import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const ATSDashboard = ({ atsData, skillGapData }) => {
  // Bar chart data for ATS categories
  const atsChartData = {
    labels: ['Formatting', 'Keywords', 'Readability', 'Action Verbs'],
    datasets: [
      {
        label: 'ATS Score',
        data: [
          atsData.categories?.formatting?.score || 0,
          atsData.categories?.keywords?.score || 0,
          atsData.categories?.readability?.score || 0,
          atsData.categories?.actionVerbs?.score || 0,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Doughnut chart data for skill match
  const skillMatchData = {
    labels: ['Matched Skills', 'Missing Skills'],
    datasets: [
      {
        data: [
          skillGapData.skillMatchPercentage || 0,
          100 - (skillGapData.skillMatchPercentage || 0),
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'ATS Analysis Breakdown',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Skill Match Percentage',
      },
    },
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="row g-4">
      {/* Overall ATS Score */}
      <div className="col-md-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body text-center">
            <div className="mb-3">
              <i className="fas fa-chart-line fa-3x text-primary"></i>
            </div>
            <h3 className={`fw-bold ${getScoreColor(atsData.overallScore)}`}>
              {atsData.overallScore}/100
            </h3>
            <p className="text-muted mb-3">Overall ATS Score</p>
            <div className="progress" style={{ height: '10px' }}>
              <div
                className={`progress-bar ${getScoreBadge(atsData.overallScore)}`}
                role="progressbar"
                style={{ width: `${atsData.overallScore}%` }}
                aria-valuenow={atsData.overallScore}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Match Score */}
      <div className="col-md-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body text-center">
            <div className="mb-3">
              <i className="fas fa-bullseye fa-3x text-success"></i>
            </div>
            <h3 className={`fw-bold ${getScoreColor(skillGapData.skillMatchPercentage)}`}>
              {skillGapData.skillMatchPercentage}%
            </h3>
            <p className="text-muted mb-3">Skill Match</p>
            <div className="progress" style={{ height: '10px' }}>
              <div
                className={`progress-bar ${getScoreBadge(skillGapData.skillMatchPercentage)}`}
                role="progressbar"
                style={{ width: `${skillGapData.skillMatchPercentage}%` }}
                aria-valuenow={skillGapData.skillMatchPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Missing Keywords Count */}
      <div className="col-md-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body text-center">
            <div className="mb-3">
              <i className="fas fa-key fa-3x text-warning"></i>
            </div>
            <h3 className="fw-bold text-warning">
              {atsData.missingKeywords?.length || 0}
            </h3>
            <p className="text-muted mb-3">Missing Keywords</p>
            <small className="text-muted">
              {atsData.missingKeywords?.length > 0 
                ? 'Consider adding these keywords' 
                : 'All keywords covered!'}
            </small>
          </div>
        </div>
      </div>

      {/* ATS Breakdown Chart */}
      <div className="col-md-8">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0">
            <h5 className="mb-0">
              <i className="fas fa-chart-bar me-2 text-primary"></i>
              ATS Category Breakdown
            </h5>
          </div>
          <div className="card-body">
            <Bar data={atsChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Skill Match Chart */}
      <div className="col-md-4">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0">
            <h5 className="mb-0">
              <i className="fas fa-pie-chart me-2 text-success"></i>
              Skill Match
            </h5>
          </div>
          <div className="card-body">
            <Doughnut data={skillMatchData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      {/* Detailed Category Analysis */}
      <div className="col-md-6">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0">
            <h5 className="mb-0">
              <i className="fas fa-list-ul me-2 text-info"></i>
              Category Analysis
            </h5>
          </div>
          <div className="card-body">
            {Object.entries(atsData.categories || {}).map(([category, data]) => (
              <div key={category} className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-capitalize fw-semibold">{category}</span>
                  <span className={`badge ${getScoreBadge(data.score)}`}>
                    {data.score}/100
                  </span>
                </div>
                <div className="progress mb-2" style={{ height: '6px' }}>
                  <div
                    className={`progress-bar ${getScoreBadge(data.score)}`}
                    role="progressbar"
                    style={{ width: `${data.score}%` }}
                  ></div>
                </div>
                <small className="text-muted">{data.feedback}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Missing Keywords */}
      <div className="col-md-6">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0">
            <h5 className="mb-0">
              <i className="fas fa-exclamation-triangle me-2 text-warning"></i>
              Missing Keywords
            </h5>
          </div>
          <div className="card-body">
            {atsData.missingKeywords?.length > 0 ? (
              <div className="d-flex flex-wrap gap-2">
                {atsData.missingKeywords.map((keyword, index) => (
                  <span key={index} className="badge bg-warning text-dark">
                    {keyword}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-center text-success">
                <i className="fas fa-check-circle fa-2x mb-2"></i>
                <p className="mb-0">All keywords are covered!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-0">
            <h5 className="mb-0">
              <i className="fas fa-lightbulb me-2 text-warning"></i>
              Recommendations
            </h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h6 className="text-primary">ATS Improvements</h6>
                <ul className="list-unstyled">
                  {atsData.recommendations?.map((rec, index) => (
                    <li key={index} className="mb-2">
                      <i className="fas fa-arrow-right text-primary me-2"></i>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-6">
                <h6 className="text-success">Skill Enhancements</h6>
                <ul className="list-unstyled">
                  {skillGapData.missingSkills?.slice(0, 3).map((skill, index) => (
                    <li key={index} className="mb-2">
                      <i className="fas fa-plus-circle text-success me-2"></i>
                      <strong>{skill.skill}</strong> - {skill.importance} priority
                    </li>
                  ))}
                  {skillGapData.recommendedSkills?.slice(0, 2).map((skill, index) => (
                    <li key={index} className="mb-2">
                      <i className="fas fa-star text-warning me-2"></i>
                      <strong>{skill.skill}</strong> - Recommended addition
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
