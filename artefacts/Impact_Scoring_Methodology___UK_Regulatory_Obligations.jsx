import React, { useState } from 'react';
import { Calculator, AlertTriangle, Scale, Clock, Shield, TrendingUp, Info, ChevronDown, ChevronRight } from 'lucide-react';

const ImpactScoringBreakdown = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [expandedSection, setExpandedSection] = useState('formula');
  const [selectedFactor, setSelectedFactor] = useState(null);

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const accentBg = darkMode ? 'bg-gray-700' : 'bg-gray-100';

  const scoringFactors = [
    {
      id: 'severity',
      name: 'Regulatory Severity',
      weight: 0.30,
      icon: Scale,
      color: '#ef4444',
      description: 'Derived from instrument type and regulatory language',
      ranges: [
        { label: 'FCA Handbook rule change / PRA SS requirement', score: '90–100', rationale: 'Binding legal obligation' },
        { label: 'FCA Policy Statement (final rules)', score: '80–90', rationale: 'Confirmed regulatory expectation' },
        { label: 'PRA Policy Statement', score: '80–90', rationale: 'Confirmed regulatory expectation' },
        { label: 'FCA Dear CEO letter with explicit expectations', score: '70–85', rationale: 'Supervisory expectation with accountability' },
        { label: 'FCA/PRA Consultation (future obligation)', score: '40–60', rationale: 'Proposed, not yet binding' },
        { label: 'Informational guidance only', score: '<40', rationale: 'Advisory, no enforcement' }
      ],
      note: 'Document type is classified in the pipeline, not inferred'
    },
    {
      id: 'scope',
      name: 'Scope of Applicability',
      weight: 0.20,
      icon: TrendingUp,
      color: '#f59e0b',
      description: 'Calculated from who is affected, product coverage, and distribution scope',
      ranges: [
        { label: 'Applies to all UK insurers', score: '90', rationale: 'Universal application' },
        { label: 'Applies to life insurers only', score: '70', rationale: 'Major segment coverage' },
        { label: 'Applies to narrow product set', score: '40', rationale: 'Limited scope' }
      ],
      factors: [
        'Who is affected (Insurers vs intermediaries vs limited firms)',
        'Product coverage (GI, Life, Protection)',
        'Distribution scope (direct, advised, outsourced)'
      ]
    },
    {
      id: 'urgency',
      name: 'Implementation Urgency',
      weight: 0.20,
      icon: Clock,
      color: '#8b5cf6',
      description: 'Based on effective date proximity',
      ranges: [
        { label: 'Already in force', score: '100', rationale: 'Immediate compliance required' },
        { label: '≤ 3 months', score: '80', rationale: 'Critical timeline' },
        { label: '3–6 months', score: '60', rationale: 'Planning window closing' },
        { label: '> 6 months', score: '30', rationale: 'Adequate planning time' },
        { label: 'Consultation only', score: '20', rationale: 'Future consideration' },
        { label: 'No date → "unknown"', score: '50', rationale: 'Default, not guessed' }
      ]
    },
    {
      id: 'control_gap',
      name: 'Control Gap Severity',
      weight: 0.20,
      icon: Shield,
      color: '#14b8a6',
      description: 'Calculated by joining obligation requirements to controls library',
      ranges: [
        { label: 'No mapped control exists', score: '90', rationale: 'Complete control gap' },
        { label: 'Control exists but not tested / outdated', score: '70', rationale: 'Unverified effectiveness' },
        { label: 'Control exists but partial coverage', score: '50', rationale: 'Residual risk remains' },
        { label: 'Control exists and effective', score: '20', rationale: 'Adequate coverage' }
      ],
      note: 'Requires Snowflake data join to controls library'
    },
    {
      id: 'risk',
      name: 'Consumer Harm / Prudential Risk',
      weight: 0.10,
      icon: AlertTriangle,
      color: '#ec4899',
      description: 'Binary-weighted escalation factor based on regulatory language',
      ranges: [
        { label: 'Consumer Duty outcomes, fair value, vulnerable customers', score: '80–100', rationale: 'Direct consumer harm potential' },
        { label: 'Capital, solvency, liquidity, stress testing', score: '70–90', rationale: 'Prudential stability risk' },
        { label: 'Operational or reporting only', score: '40–60', rationale: 'Administrative compliance' }
      ]
    }
  ];

  const thresholdLevels = [
    {
      range: '< 50',
      action: 'Monitor / Log',
      color: '#6b7280',
      description: 'Informational tracking only',
      examples: ['Future consultations', 'Guidance updates', 'Industry notices']
    },
    {
      range: '50–69',
      action: 'Assess / Plan',
      color: '#eab308',
      description: 'Review and planning required',
      examples: ['Upcoming rule changes', 'Partial control gaps', 'Medium-term deadlines']
    },
    {
      range: '≥ 70',
      action: 'Action Required',
      color: '#ef4444',
      description: 'Mandatory action with owner and evidence',
      examples: ['Consumer Duty obligations', 'Imminent deadlines', 'Critical control gaps']
    }
  ];

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderFactorCard = (factor) => {
    const Icon = factor.icon;
    const isSelected = selectedFactor?.id === factor.id;

    return (
      <div
        key={factor.id}
        className={`${cardBg} rounded-xl border-2 ${
          isSelected ? 'border-opacity-100' : 'border-opacity-0'
        } transition-all duration-300 cursor-pointer ${hoverBg}`}
        style={{ borderColor: isSelected ? factor.color : 'transparent' }}
        onClick={() => setSelectedFactor(factor)}
      >
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div
              className="p-3 rounded-lg flex-shrink-0"
              style={{ backgroundColor: `${factor.color}20`, color: factor.color }}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className={`font-semibold text-lg ${textColor}`}>
                  {factor.name}
                </h3>
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={{ backgroundColor: `${factor.color}20`, color: factor.color }}
                >
                  {(factor.weight * 100).toFixed(0)}% weight
                </span>
              </div>
              <p className={`text-sm ${textSecondary}`}>{factor.description}</p>
            </div>
          </div>

          {/* Scoring Ranges */}
          <div className="space-y-2">
            {factor.ranges.map((range, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg ${accentBg} border ${borderColor}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${textColor}`}>
                    {range.label}
                  </span>
                  <span
                    className="px-2 py-1 rounded text-xs font-bold"
                    style={{ backgroundColor: factor.color, color: 'white' }}
                  >
                    {range.score}
                  </span>
                </div>
                <p className={`text-xs ${textSecondary}`}>{range.rationale}</p>
              </div>
            ))}
          </div>

          {/* Additional factors or notes */}
          {factor.factors && (
            <div className={`mt-4 p-3 rounded-lg ${accentBg}`}>
              <p className={`text-xs font-semibold ${textColor} mb-2`}>Calculation Factors:</p>
              <ul className={`text-xs ${textSecondary} space-y-1`}>
                {factor.factors.map((f, idx) => (
                  <li key={idx}>• {f}</li>
                ))}
              </ul>
            </div>
          )}

          {factor.note && (
            <div className={`mt-4 p-3 rounded-lg border-l-4`} style={{ borderColor: factor.color, backgroundColor: `${factor.color}10` }}>
              <p className={`text-xs ${textSecondary}`}>
                <strong>Note:</strong> {factor.note}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} p-8`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Impact Scoring Methodology
            </h1>
            <p className={`text-lg ${textSecondary}`}>
              UK Insurance Regulatory Obligations - Quantified, Defensible, Auditable
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg ${cardBg} border ${borderColor} ${hoverBg} transition-colors`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Key Principles */}
        <div className={`${cardBg} rounded-xl shadow-lg border ${borderColor} p-6 mb-8`}>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#0ea5e9' }}>
                Quantified
              </div>
              <p className={`text-sm ${textSecondary}`}>
                Rule-based calculation, not subjective assessment
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#14b8a6' }}>
                Defensible
              </div>
              <p className={`text-sm ${textSecondary}`}>
                Traceable to regulatory text and internal controls
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2" style={{ color: '#8b5cf6' }}>
                Auditable
              </div>
              <p className={`text-sm ${textSecondary}`}>
                Every score component has documented rationale
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Formula */}
      <div className="max-w-7xl mx-auto mb-8">
        <div
          className={`${cardBg} rounded-xl shadow-lg border ${borderColor} overflow-hidden cursor-pointer`}
          onClick={() => toggleSection('formula')}
        >
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="w-6 h-6" style={{ color: '#0ea5e9' }} />
              <h2 className="text-2xl font-semibold">Core Formula</h2>
            </div>
            {expandedSection === 'formula' ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </div>
          
          {expandedSection === 'formula' && (
            <div className={`px-6 pb-6 border-t ${borderColor}`}>
              <div className={`mt-6 p-6 rounded-xl ${accentBg} border ${borderColor}`}>
                <div className="font-mono text-center space-y-3">
                  <div className="text-2xl font-bold" style={{ color: '#0ea5e9' }}>
                    Impact Score = 
                  </div>
                  <div className="space-y-2 text-lg">
                    <div className="flex items-center justify-center gap-2">
                      <span style={{ color: '#ef4444' }}>(Regulatory Severity</span>
                      <span className={textSecondary}>×</span>
                      <span style={{ color: '#ef4444' }}>0.30)</span>
                      <span className={textSecondary}>+</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span style={{ color: '#f59e0b' }}>(Scope of Applicability</span>
                      <span className={textSecondary}>×</span>
                      <span style={{ color: '#f59e0b' }}>0.20)</span>
                      <span className={textSecondary}>+</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span style={{ color: '#8b5cf6' }}>(Implementation Urgency</span>
                      <span className={textSecondary}>×</span>
                      <span style={{ color: '#8b5cf6' }}>0.20)</span>
                      <span className={textSecondary}>+</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span style={{ color: '#14b8a6' }}>(Control Gap Severity</span>
                      <span className={textSecondary}>×</span>
                      <span style={{ color: '#14b8a6' }}>0.20)</span>
                      <span className={textSecondary}>+</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span style={{ color: '#ec4899' }}>(Consumer Harm / Prudential Risk</span>
                      <span className={textSecondary}>×</span>
                      <span style={{ color: '#ec4899' }}>0.10)</span>
                    </div>
                  </div>
                </div>

                <div className={`mt-6 p-4 rounded-lg border-l-4`} style={{ borderColor: '#0ea5e9', backgroundColor: darkMode ? '#1e293b' : '#f0f9ff' }}>
                  <p className={`text-sm ${textSecondary}`}>
                    <strong className={textColor}>Result:</strong> Each factor is bounded (0–100), rule-based, and traceable. 
                    The weighted composite produces a final score from 0 to 100.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scoring Factors */}
      <div className="max-w-7xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold mb-6">Scoring Factors Breakdown</h2>
        <div className="grid grid-cols-1 gap-6">
          {scoringFactors.map(renderFactorCard)}
        </div>
      </div>

      {/* Threshold Explanation */}
      <div className="max-w-7xl mx-auto mb-8">
        <div
          className={`${cardBg} rounded-xl shadow-lg border ${borderColor} overflow-hidden cursor-pointer`}
          onClick={() => toggleSection('threshold')}
        >
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6" style={{ color: '#ef4444' }} />
              <h2 className="text-2xl font-semibold">Why the Threshold is 70</h2>
            </div>
            {expandedSection === 'threshold' ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </div>

          {expandedSection === 'threshold' && (
            <div className={`px-6 pb-6 border-t ${borderColor}`}>
              <div className="mt-6 space-y-6">
                {/* Threshold Rationale */}
                <div className={`p-6 rounded-xl ${accentBg} border ${borderColor}`}>
                  <h3 className={`font-semibold text-lg mb-4 ${textColor}`}>
                    70 = Regulatory Risk Becomes Operationally Mandatory
                  </h3>
                  <p className={`${textSecondary} mb-4`}>
                    In UK compliance practice, 70 is the point where regulatory risk transitions from 
                    informational to action-required with explicit accountability.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {thresholdLevels.map(level => (
                      <div
                        key={level.range}
                        className={`p-4 rounded-lg border-2`}
                        style={{ borderColor: level.color, backgroundColor: `${level.color}10` }}
                      >
                        <div className="text-2xl font-bold mb-2" style={{ color: level.color }}>
                          {level.range}
                        </div>
                        <div className="font-semibold mb-2" style={{ color: level.color }}>
                          {level.action}
                        </div>
                        <p className={`text-xs ${textSecondary} mb-3`}>
                          {level.description}
                        </p>
                        <div className={`text-xs ${textSecondary}`}>
                          <strong>Examples:</strong>
                          <ul className="mt-1 space-y-1">
                            {level.examples.map((ex, idx) => (
                              <li key={idx}>• {ex}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why 70 Matters */}
                <div className={`p-6 rounded-xl border-l-4`} style={{ borderColor: '#ef4444', backgroundColor: darkMode ? '#1e293b' : '#fef2f2' }}>
                  <h3 className={`font-semibold text-lg mb-4 ${textColor}`}>
                    Above 70: Delay Becomes a Regulatory Failing
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className={`font-semibold mb-2 ${textColor}`}>Regulatory Alignment</h4>
                      <ul className={`text-sm ${textSecondary} space-y-2`}>
                        <li>✓ FCA Consumer Duty enforcement posture</li>
                        <li>✓ PRA expectations on timely implementation</li>
                        <li>✓ Internal audit and SMCR accountability models</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className={`font-semibold mb-2 ${textColor}`}>Operational Requirements</h4>
                      <ul className={`text-sm ${textSecondary} space-y-2`}>
                        <li>✓ Ownership must be explicit (SMF)</li>
                        <li>✓ Evidence must exist before supervisory review</li>
                        <li>✓ Delay is a failing, not a planning issue</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* SMCR Context */}
                <div className={`p-6 rounded-xl ${accentBg} border ${borderColor}`}>
                  <h3 className={`font-semibold text-lg mb-3 ${textColor}`}>
                    SMCR (Senior Managers & Certification Regime) Context
                  </h3>
                  <p className={`text-sm ${textSecondary} mb-4`}>
                    The 70 threshold aligns with SMCR accountability requirements where Senior Management 
                    Functions (SMFs) must demonstrate reasonable steps to prevent regulatory breaches.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg border ${borderColor}`}>
                      <div className="font-semibold text-sm mb-2" style={{ color: '#0ea5e9' }}>
                        Below 70
                      </div>
                      <p className={`text-xs ${textSecondary}`}>
                        SMF oversight through normal governance channels
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg border ${borderColor}`}>
                      <div className="font-semibold text-sm mb-2" style={{ color: '#ef4444' }}>
                        At or Above 70
                      </div>
                      <p className={`text-xs ${textSecondary}`}>
                        Named SMF owner with documented action plan required
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Example Calculation */}
      <div className="max-w-7xl mx-auto">
        <div
          className={`${cardBg} rounded-xl shadow-lg border ${borderColor} overflow-hidden cursor-pointer`}
          onClick={() => toggleSection('example')}
        >
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Info className="w-6 h-6" style={{ color: '#14b8a6' }} />
              <h2 className="text-2xl font-semibold">Example: Consumer Duty Obligation</h2>
            </div>
            {expandedSection === 'example' ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </div>

          {expandedSection === 'example' && (
            <div className={`px-6 pb-6 border-t ${borderColor}`}>
              <div className="mt-6 space-y-4">
                {/* Scenario */}
                <div className={`p-4 rounded-lg ${accentBg} border ${borderColor}`}>
                  <h3 className={`font-semibold mb-2 ${textColor}`}>Scenario</h3>
                  <p className={`text-sm ${textSecondary}`}>
                    FCA Policy Statement on Consumer Duty fair value assessments, 
                    effective in 2 months, applies to all UK insurers, no existing control mapped, 
                    directly relates to consumer outcomes.
                  </p>
                </div>

                {/* Calculation */}
                <div className="space-y-3">
                  <div className={`p-4 rounded-lg border-l-4`} style={{ borderColor: '#ef4444', backgroundColor: darkMode ? '#1e1b1b' : '#fef2f2' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Regulatory Severity</span>
                      <span className="font-mono">85 × 0.30 = 25.5</span>
                    </div>
                    <p className={`text-xs ${textSecondary}`}>
                      FCA Policy Statement (final rules) → 85 points
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg border-l-4`} style={{ borderColor: '#f59e0b', backgroundColor: darkMode ? '#1c1917' : '#fffbeb' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Scope of Applicability</span>
                      <span className="font-mono">90 × 0.20 = 18.0</span>
                    </div>
                    <p className={`text-xs ${textSecondary}`}>
                      Applies to all UK insurers → 90 points
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg border-l-4`} style={{ borderColor: '#8b5cf6', backgroundColor: darkMode ? '#1e1b29' : '#faf5ff' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Implementation Urgency</span>
                      <span className="font-mono">80 × 0.20 = 16.0</span>
                    </div>
                    <p className={`text-xs ${textSecondary}`}>
                      Effective in ≤ 3 months → 80 points
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg border-l-4`} style={{ borderColor: '#14b8a6', backgroundColor: darkMode ? '#0f1f1e' : '#f0fdfa' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Control Gap Severity</span>
                      <span className="font-mono">90 × 0.20 = 18.0</span>
                    </div>
                    <p className={`text-xs ${textSecondary}`}>
                      No mapped control exists → 90 points
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg border-l-4`} style={{ borderColor: '#ec4899', backgroundColor: darkMode ? '#1f1729' : '#fdf2f8' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Consumer Harm / Prudential Risk</span>
                      <span className="font-mono">90 × 0.10 = 9.0</span>
                    </div>
                    <p className={`text-xs ${textSecondary}`}>
                      Consumer Duty outcomes mentioned → 90 points
                    </p>
                  </div>
                </div>

                {/* Total */}
                <div className={`p-6 rounded-xl border-2`} style={{ borderColor: '#ef4444', backgroundColor: darkMode ? '#1e1b1b' : '#fef2f2' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">Total Impact Score</span>
                    <span className="text-4xl font-bold" style={{ color: '#ef4444' }}>
                      86.5
                    </span>
                  </div>
                  <div className={`mt-3 pt-3 border-t ${borderColor}`}>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" style={{ color: '#ef4444' }} />
                      <span className="font-semibold" style={{ color: '#ef4444' }}>
                        ACTION REQUIRED
                      </span>
                    </div>
                    <p className={`text-sm ${textSecondary} mt-2`}>
                      Score ≥ 70: Mandatory action with named SMF owner and documented evidence required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Requirements */}
      <div className="max-w-7xl mx-auto">
        <div
          className={`${cardBg} rounded-xl shadow-lg border ${borderColor} overflow-hidden cursor-pointer`}
          onClick={() => toggleSection('data')}
        >
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6" style={{ color: '#14b8a6' }} />
              <h2 className="text-2xl font-semibold">Data Requirements</h2>
            </div>
            {expandedSection === 'data' ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </div>

          {expandedSection === 'data' && (
            <div className={`px-6 pb-6 border-t ${borderColor}`}>
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl ${accentBg} border ${borderColor}`}>
                  <h3 className={`font-semibold mb-3 ${textColor}`}>External Data Sources</h3>
                  <ul className={`text-sm ${textSecondary} space-y-2`}>
                    <li>• FCA publications (Policy Statements, Guidance, Consultations)</li>
                    <li>• PRA publications (Supervisory Statements, Policy Statements)</li>
                    <li>• Document metadata (effective dates, references)</li>
                    <li>• Regulatory language and obligation text</li>
                  </ul>
                </div>

                <div className={`p-6 rounded-xl ${accentBg} border ${borderColor}`}>
                  <h3 className={`font-semibold mb-3 ${textColor}`}>Internal Data (Snowflake)</h3>
                  <ul className={`text-sm ${textSecondary} space-y-2`}>
                    <li>• Controls library (existing controls and coverage)</li>
                    <li>• Control testing status and effectiveness</li>
                    <li>• Product and distribution scope mapping</li>
                    <li>• SMF ownership assignments</li>
                  </ul>
                </div>
              </div>

              <div className={`mt-6 p-4 rounded-lg border-l-4`} style={{ borderColor: '#14b8a6', backgroundColor: darkMode ? '#0f1f1e' : '#f0fdfa' }}>
                <p className={`text-sm ${textSecondary}`}>
                  <strong className={textColor}>Critical:</strong> Control Gap Severity (20% of total score) 
                  requires joining obligation requirements to the internal controls library in Snowflake. 
                  Without this data, scoring cannot be fully defensible.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className={`${cardBg} rounded-xl border ${borderColor} p-6`}>
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#0ea5e9' }} />
            <div>
              <h3 className={`font-semibold mb-2 ${textColor}`}>Methodology Principles</h3>
              <ul className={`text-sm ${textSecondary} space-y-2`}>
                <li>
                  <strong className={textColor}>No Guessing:</strong> When data is unavailable (e.g., no effective date), 
                  defaults are used (e.g., 50 for urgency), not inferred values.
                </li>
                <li>
                  <strong className={textColor}>Traceable:</strong> Every score component can be traced back to 
                  source regulatory text or internal control records.
                </li>
                <li>
                  <strong className={textColor}>Auditable:</strong> Scoring logic is documented in SQL transforms 
                  (uk_regulatory_change_items.sql) and can be reviewed by compliance or audit teams.
                </li>
                <li>
                  <strong className={textColor}>UK-Specific:</strong> Scoring reflects UK regulatory framework 
                  (FCA/PRA), SMCR accountability, and Consumer Duty priorities.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactScoringBreakdown;