import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type OnConnect,
} from '@xyflow/react';
import {
  IconFile,
  IconServer,
  IconDatabase,
  IconShieldLock,
  IconCloud,
  IconSettings,
  IconCode,
} from '@tabler/icons-react';

import '@xyflow/react/dist/base.css';

import TurboNode, { type TurboNodeData } from './TurboNode';
import TurboEdge from './TurboEdge';

// Define the data structure type
type SystemData = {
  system_components: {
    [componentName: string]: {
      service: string;
      features: Array<{
        name: string;
        technology: {
          name: string;
          justification: {
            domain_specific_fit: string[];
            benchmarks: {
              metric: string;
              source: string;
            };
            integration_requirements: string[];
          };
        };
        tradeoffs?: Array<{
          technology: string;
          pros: string[];
          cons: string[];
          comparison_data: {
            metric: string;
          };
        }>;
        cost_analysis?: {
          infrastructure: string;
          'development time in days': string;
          'maintenance OPEX Score': string;
        };
        scalability?: {
          limit: string;
          bottleneck_description: string;
          mitigation: string;
        };
      }>;
    };
  };
};

const systemData: SystemData = {
  system_components: {
    frontend: {
      service: 'Decentralized Exchange UI',
      features: [
        {
          name: 'Market Overview',
          technology: {
            name: 'React 18',
            justification: {
              domain_specific_fit: [
                'React provides a component-based architecture that facilitates the building of interactive UIs, which is essential for a dynamic trading platform.',
              ],
              benchmarks: {
                metric: 'User engagement metrics increase by 30%',
                source: 'State of JS 2022',
              },
              integration_requirements: ['Redux for state management', 'Axios for API calls'],
            },
          },
        },
      ],
    },
    backend: {
      service: 'Decentralized Exchange API',
      features: [
        {
          name: 'Order Matching Engine',
          technology: {
            name: 'Node.js 16 with Express',
            justification: {
              domain_specific_fit: [
                'Node.js is non-blocking and handles I/O-bound tasks efficiently, which is crucial for real-time trading applications.',
              ],
              benchmarks: {
                metric: 'Throughput of 10,000 RPS',
                source: 'Node.js Performance Benchmark',
              },
              integration_requirements: ['MongoDB for order storage', 'Redis for caching'],
            },
          },
        },
      ],
    },
    database: {
      service: 'Order and User Data Storage',
      features: [
        {
          name: 'User Account Management',
          technology: {
            name: 'PostgreSQL 14',
            justification: {
              domain_specific_fit: [
                'PostgreSQL offers ACID compliance and robust indexing which is essential for transactional integrity in trading applications.',
              ],
              benchmarks: {
                metric: 'Query performance of 1,000 transactions per second',
                source: 'PostgreSQL Performance Tuning Guide',
              },
              integration_requirements: ['pgAdmin for database management', 'Sequelize for ORM'],
            },
          },
        },
      ],
    },
    infrastructure: {
      service: 'Cloud Hosting and Orchestration',
      features: [
        {
          name: 'Kubernetes Cluster Management',
          technology: {
            name: 'AWS EKS',
            justification: {
              domain_specific_fit: [
                'AWS EKS simplifies Kubernetes management and offers scalability, which is critical for a decentralized exchange.',
              ],
              benchmarks: {
                metric: 'Scalability to 1000 pods',
                source: 'AWS EKS Best Practices',
              },
              integration_requirements: [
                'Helm for package management',
                'AWS IAM for access control',
              ],
            },
          },
        },
      ],
    },
    security: {
      service: 'Security and Compliance',
      features: [
        {
          name: 'User Authentication',
          technology: {
            name: 'OAuth 2.0',
            justification: {
              domain_specific_fit: [
                'OAuth 2.0 is widely adopted for secure API authentication, which is essential for user accounts in a decentralized exchange.',
              ],
              benchmarks: {
                metric: 'Security incident reduction by 40%',
                source: 'OWASP Security Report 2022',
              },
              integration_requirements: [
                'JWT for token management',
                'Spring Security for backend protection',
              ],
            },
          },
        },
      ],
    },
  },
};

const getServiceIcon = (serviceType: string) => {
  switch (serviceType) {
    case 'frontend':
      return <IconFile size={20} />;
    case 'backend':
      return <IconServer size={20} />;
    case 'database':
      return <IconDatabase size={20} />;
    case 'infrastructure':
      return <IconCloud size={20} />;
    case 'security':
      return <IconShieldLock size={20} />;
    default:
      return <IconFile size={20} />;
  }
};

const generateNodesAndEdges = (data: SystemData) => {
  const nodes: Node<TurboNodeData>[] = [];
  const edges: Edge[] = [];

  const serviceTypes = Object.keys(data.system_components);
  const horizontalSpacing = 300; // Reduced from 400
  const serviceVerticalPos = 100; // Y position for service nodes
  const featureVerticalPos = 250; // Y position for feature nodes
  const techVerticalPos = 400; // Y position for technology nodes
  const costVerticalPos = 550; // Y position for cost nodes
  const featureHorizontalOffset = 0; // Center features under services

  // Calculate maximum features per service to help with horizontal spacing
  const maxFeaturesPerService = Math.max(
    ...serviceTypes.map((type) => data.system_components[type].features.length)
  );

  // First create service nodes in a horizontal line
  serviceTypes.forEach((serviceType, serviceIndex) => {
    const service = data.system_components[serviceType];
    const serviceX = 150 + serviceIndex * horizontalSpacing;

    // Create service node
    const serviceNode: Node<TurboNodeData> = {
      id: serviceType,
      position: { x: serviceX, y: serviceVerticalPos },
      data: {
        icon: getServiceIcon(serviceType),
        title: service.service,
        subtitle: serviceType.toUpperCase(),
        type: 'service',
      },
      type: 'turbo',
    };

    nodes.push(serviceNode);

    // Connect services in sequence
    if (serviceIndex > 0) {
      edges.push({
        id: `service-edge-${serviceTypes[serviceIndex - 1]}-${serviceType}`,
        source: serviceTypes[serviceIndex - 1],
        target: serviceType,
        type: 'turbo',
      });
    }

    // Calculate feature spacing for this service
    const featureCount = service.features.length;
    const featureWidth = 200; // Approximate width of a feature node
    const featuresWidth = featureCount * featureWidth;
    const startX = serviceX - featuresWidth / 2 + featureWidth / 2 + featureHorizontalOffset;

    // For each feature in the service
    service.features.forEach((feature, featureIndex) => {
      const featureX = startX + featureIndex * featureWidth;
      const featureNodeId = `${serviceType}-feature-${featureIndex}`;

      // Feature node positioned below service
      const featureNode: Node<TurboNodeData> = {
        id: featureNodeId,
        position: { x: featureX, y: featureVerticalPos },
        data: {
          icon: <IconSettings size={16} />,
          title: feature.name,
          subtitle: 'Feature',
          type: 'feature',
        },
        type: 'turbo',
      };

      nodes.push(featureNode);
      edges.push({
        id: `feature-edge-${serviceType}-${featureNodeId}`,
        source: serviceType,
        target: featureNodeId,
        type: 'turbo',
      });

      // Technology node positioned below feature
      const techNodeId = `${serviceType}-tech-${featureIndex}`;
      const techNode: Node<TurboNodeData> = {
        id: techNodeId,
        position: { x: featureX, y: techVerticalPos },
        data: {
          icon: <IconCode size={16} />,
          title: feature.technology.name,
          subtitle: 'Technology',
          description: `
            ${feature.technology.justification.domain_specific_fit.join('\n')}
            \nBenchmark: ${feature.technology.justification.benchmarks.metric}
            \nIntegrations: ${feature.technology.justification.integration_requirements.join(', ')}
          `,
          type: 'technology',
        },
        type: 'turbo',
      };

      nodes.push(techNode);
      edges.push({
        id: `tech-edge-${featureNodeId}-${techNodeId}`,
        source: featureNodeId,
        target: techNodeId,
        type: 'turbo',
      });

      // Add cost analysis if available
      if (feature.cost_analysis) {
        const costNodeId = `${serviceType}-cost-${featureIndex}`;
        const costNode: Node<TurboNodeData> = {
          id: costNodeId,
          position: { x: featureX, y: costVerticalPos },
          data: {
            icon: <IconFile size={14} />,
            title: 'Cost Analysis',
            subtitle: `$${feature.cost_analysis.infrastructure}/month`,
            description: `
              Development: ${feature.cost_analysis['development time in days']} days
              Maintenance: ${feature.cost_analysis['maintenance OPEX Score']}/5
            `,
            type: 'cost',
          },
          type: 'turbo',
        };

        nodes.push(costNode);
        edges.push({
          id: `cost-edge-${techNodeId}-${costNodeId}`,
          source: techNodeId,
          target: costNodeId,
          type: 'turbo',
        });
      }
    });
  });

  return { nodes, edges };
};

const nodeTypes = {
  turbo: TurboNode,
};

const edgeTypes = {
  turbo: TurboEdge,
};

const defaultEdgeOptions = {
  type: 'turbo',
  markerEnd: 'edge-circle',
};

const Flow = () => {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => generateNodesAndEdges(systemData),
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      minZoom={0.2}
      maxZoom={1.5}
    >
      <Controls showInteractive={false} />
      <svg>
        <defs>
          <linearGradient id="edge-gradient">
            <stop offset="0%" stopColor="#ae53ba" />
            <stop offset="100%" stopColor="#2a8af6" />
          </linearGradient>

          <marker
            id="edge-circle"
            viewBox="-5 -5 10 10"
            refX="0"
            refY="0"
            markerUnits="strokeWidth"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
          </marker>
        </defs>
      </svg>
    </ReactFlow>
  );
};

export default Flow;

export const SystemDesign = () => {
  return (
    <div className="relative flex flex-col justify-center items-center h-screen w-screen overflow-hidden bg-black">
      <div className="relative rounded-lg shadow-lg h-96 lg:h-screen max-h-screen w-full lg:w-full flex items-center justify-center overflow-hidden border border-white/10">
        <Flow />
      </div>
    </div>
  );
};
