import React, { useState } from 'react';
import { Database, Key, Link } from 'lucide-react';

const ERDiagram = () => {
  const [darkMode, setDarkMode] = useState(true);

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  const entities = [
    {
      name: 'read_fca_updates',
      color: '#0ea5e9',
      columns: [
        { name: 'reference_number', type: 'TEXT', pk: true },
        { name: 'title', type: 'TEXT' },
        { name: 'document_type', type: 'TEXT' },
        { name: 'publication_date', type: 'DATE' },
        { name: 'url', type: 'TEXT' },
        { name: 'content', type: 'TEXT' }
      ]
    },
    {
      name: 'read_pra_updates',
      color: '#0ea5e9',
      columns: [
        { name: 'reference_number', type: 'TEXT', pk: true },
        { name: 'title', type: 'TEXT' },
        { name: 'document_type', type: 'TEXT' },
        { name: 'publication_date', type: 'DATE' },
        { name: 'url', type: 'TEXT' },
        { name: 'content', type: 'TEXT' }
      ]
    },
    {
      name: 'combine_regulatory_updates',
      color: '#14b8a6',
      columns: [
        { name: 'reference_number', type: 'TEXT', pk: true },
        { name: 'regulator', type: 'TEXT' },
        { name: 'title', type: 'TEXT' },
        { name: 'document_type', type: 'TEXT' },
        { name: 'publication_date', type: 'DATE' },
        { name: 'url', type: 'TEXT' },
        { name: 'content', type: 'TEXT' }
      ]
    },
    {
      name: 'enrich_regulatory_updates',
      color: '#14b8a6',
      columns: [
        { name: 'chunk_id', type: 'TEXT', pk: true },
        { name: 'reference_number', type: 'TEXT', fk: true },
        { name: 'regulator', type: 'TEXT' },
        { name: 'title', type: 'TEXT' },
        { name: 'document_type', type: 'TEXT' },
        { name: 'publication_date', type: 'DATE' },
        { name: 'url', type: 'TEXT' },
        { name: 'content_chunk', type: 'TEXT' }
      ]
    },
    {
      name: 'extract_regulatory_obligations',
      color: '#f59e0b',
      columns: [
        { name: 'obligation_id', type: 'TEXT', pk: true },
        { name: 'reference_number', type: 'TEXT', fk: true },
        { name: 'regulator', type: 'TEXT' },
        { name: 'document_type', type: 'TEXT' },
        { name: 'obligation_text', type: 'TEXT' },
        { name: 'effective_date', type: 'DATE' },
        { name: 'is_consumer_duty', type: 'BOOLEAN' },
        { name: 'smf_owner', type: 'TEXT' },
        { name: 'url', type: 'TEXT' }
      ]
    },
    {
      name: 'uk_regulatory_change_items',
      color: '#ec4899',
      columns: [
        { name: 'obligation_id', type: 'TEXT', pk: true },
        { name: 'reference_number', type: 'TEXT', fk: true },
        { name: 'regulator', type: 'TEXT' },
        { name: 'document_type', type: 'TEXT' },
        { name: 'obligation_text', type: 'TEXT' },
        { name: 'effective_date', type: 'DATE' },
        { name: 'is_consumer_duty', type: 'BOOLEAN' },
        { name: 'smf_owner', type: 'TEXT' },
        { name: 'url', type: 'TEXT' },
        { name: 'impact_score', type: 'NUMBER(2,0)' },
        { name: 'severity_score', type: 'NUMBER' },
        { name: 'scope_score', type: 'NUMBER' },
        { name: 'urgency_score', type: 'NUMBER' },
        { name: 'control_gap_score', type: 'NUMBER' },
        { name: 'risk_score', type: 'NUMBER' }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} p-8`}>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Entity Relationship Diagram
            </h1>
            <p className={`text-lg ${textSecondary}`}>
              UK Insurance Regulatory Monitoring Pipeline
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg ${cardBg} border ${borderColor} hover:opacity-80 transition-opacity`}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      {/* ERD */}
      <div className="max-w-7xl mx-auto">
        <div className={`${cardBg} rounded-xl shadow-lg border ${borderColor} p-8`}>
          <div className="grid grid-cols-2 gap-8">
            {entities.map((entity, idx) => (
              <div key={idx} className={`border-2 rounded-lg overflow-hidden`} style={{ borderColor: entity.color }}>
                {/* Table Header */}
                <div className="px-4 py-3 flex items-center gap-2" style={{ backgroundColor: `${entity.color}20`, borderBottom: `2px solid ${entity.color}` }}>
                  <Database className="w-5 h-5" style={{ color: entity.color }} />
                  <span className="font-semibold" style={{ color: entity.color }}>
                    {entity.name}
                  </span>
                </div>

                {/* Columns */}
                <div className="divide-y" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}>
                  {entity.columns.map((col, colIdx) => (
                    <div key={colIdx} className="px-4 py-2 flex items-center gap-3">
                      <div className="w-4 flex-shrink-0">
                        {col.pk && <Key className="w-4 h-4" style={{ color: '#eab308' }} />}
                        {col.fk && !col.pk && <Link className="w-4 h-4" style={{ color: '#8b5cf6' }} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`font-mono text-sm ${textColor}`}>{col.name}</span>
                      </div>
                      <div className="flex-shrink-0">
                        <span className={`text-xs ${textSecondary}`}>{col.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Relationships */}
          <div className="mt-8 pt-8 border-t" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Link className="w-5 h-5" style={{ color: '#8b5cf6' }} />
              Relationships
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border ${borderColor}`}>
                <div className="text-sm mb-2">
                  <span className="font-semibold" style={{ color: '#0ea5e9' }}>read_fca_updates</span>
                  <span className={textSecondary}> → </span>
                  <span className="font-semibold" style={{ color: '#14b8a6' }}>combine_regulatory_updates</span>
                </div>
                <div className={`text-xs ${textSecondary}`}>UNION ALL (1:1)</div>
              </div>

              <div className={`p-4 rounded-lg border ${borderColor}`}>
                <div className="text-sm mb-2">
                  <span className="font-semibold" style={{ color: '#0ea5e9' }}>read_pra_updates</span>
                  <span className={textSecondary}> → </span>
                  <span className="font-semibold" style={{ color: '#14b8a6' }}>combine_regulatory_updates</span>
                </div>
                <div className={`text-xs ${textSecondary}`}>UNION ALL (1:1)</div>
              </div>

              <div className={`p-4 rounded-lg border ${borderColor}`}>
                <div className="text-sm mb-2">
                  <span className="font-semibold" style={{ color: '#14b8a6' }}>combine_regulatory_updates</span>
                  <span className={textSecondary}> → </span>
                  <span className="font-semibold" style={{ color: '#14b8a6' }}>enrich_regulatory_updates</span>
                </div>
                <div className={`text-xs ${textSecondary}`}>Chunking (1:N)</div>
              </div>

              <div className={`p-4 rounded-lg border ${borderColor}`}>
                <div className="text-sm mb-2">
                  <span className="font-semibold" style={{ color: '#14b8a6' }}>enrich_regulatory_updates</span>
                  <span className={textSecondary}> → </span>
                  <span className="font-semibold" style={{ color: '#f59e0b' }}>extract_regulatory_obligations</span>
                </div>
                <div className={`text-xs ${textSecondary}`}>AI Extraction (1:1)</div>
              </div>

              <div className={`p-4 rounded-lg border ${borderColor} col-span-2`}>
                <div className="text-sm mb-2">
                  <span className="font-semibold" style={{ color: '#f59e0b' }}>extract_regulatory_obligations</span>
                  <span className={textSecondary}> → </span>
                  <span className="font-semibold" style={{ color: '#ec4899' }}>uk_regulatory_change_items</span>
                </div>
                <div className={`text-xs ${textSecondary}`}>Impact Scoring (1:1)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="max-w-7xl mx-auto mt-8">
        <div className={`${cardBg} rounded-xl shadow-lg border ${borderColor} p-6`}>
          <h3 className="font-semibold mb-4">Legend</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <h4 className={`text-sm font-semibold mb-3 ${textColor}`}>Entity Types</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#0ea5e9' }} />
                  <span className="text-sm">Source Tables</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#14b8a6' }} />
                  <span className="text-sm">Transform Tables</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f59e0b' }} />
                  <span className="text-sm">AI-Powered Table</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ec4899' }} />
                  <span className="text-sm">Final Output</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className={`text-sm font-semibold mb-3 ${textColor}`}>Column Indicators</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4" style={{ color: '#eab308' }} />
                  <span className="text-sm">Primary Key</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4" style={{ color: '#8b5cf6' }} />
                  <span className="text-sm">Foreign Key</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className={`text-sm font-semibold mb-3 ${textColor}`}>Data Flow</h4>
              <div className={`text-sm ${textSecondary} space-y-1`}>
                <div>FCA + PRA Sources</div>
                <div>↓ Combine & Normalize</div>
                <div>↓ Chunk Content</div>
                <div>↓ AI Extract Obligations</div>
                <div>↓ Calculate Impact Scores</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERDiagram;