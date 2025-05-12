
interface SystemArchitecture {
    systemComponents: {
        frontend: ServiceArchitecture;
        backend: ServiceArchitecture;
        database: ServiceArchitecture;
        infrastructure: ServiceArchitecture;
        security: ServiceArchitecture;
    }
}

interface ServiceArchitecture {
    service: string;
    features: Feature[];
}

interface Feature {
    name: string;
    technology: Technology;
    tradeoffs: Tradeoff[];
    costAnalysis: CostAnalysis;
    scalability: Scalability;
}

interface Technology {
    name: string;
    justification: Justification;
}

interface Justification {
    domainSpecificFit: string[];
    benchmarks: Benchmark[];
    integrationRequirements: string[];
}

interface Benchmark {
    metric: string;
    source: string;
}

interface Tradeoff {
    technology: string;
    pros: string[];
    cons: string[];
    comparisonData: ComparisonData;
}

interface ComparisonData {
    metric: string;
}

interface CostAnalysis {
    infrastructure: string;
    developmentTimeInDays: string;
    maintenanceOpexScore: string;
}

interface Scalability {
    limit: string;
    bottleneckDescription: string;
    mitigation: string;
}
