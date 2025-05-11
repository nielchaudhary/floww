
interface Technology {
    name: string;
    justification: {
      domain_specific_fit: string[];
      benchmarks: {
        metric: string;
        source: string;
      };
      integration_requirements: string[];
    };
  }
  
  interface ITradeoff {
    technology: string;
    pros: string[];
    cons: string[];
    comparison_data: {
      metric: string;
    };
  }
  
  interface ICostAnalysis {
    infrastructure: string;
    development_time: number;
    maintenance_time: number;
  }
  
  interface IScalability {
    limit: string;
    bottleneck_description: string;
    mitigation: string;
  }
  
  interface IFeature {
    name: string;
    technology: Technology;
    tradeoffs: ITradeoff[];
    cost_analysis: ICostAnalysis;
    scalability: IScalability;
  }
  
  interface ISystemComponent {
    service: string;
    features: IFeature[];
  }
  
  interface ISystemArchitecture {
    system_components: {
      frontend: ISystemComponent;
      backend: ISystemComponent;
      database: ISystemComponent;
      infrastructure: ISystemComponent;
      security: ISystemComponent;
    };
  }