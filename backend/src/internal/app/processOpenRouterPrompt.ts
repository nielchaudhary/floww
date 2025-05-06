import OpenAI from "openai"
import dotenv from "dotenv"
import { isNullOrUndefined } from "../../pkg/data-utils"

dotenv.config()



if(isNullOrUndefined(process.env.OPENROUTER_API_KEY)) {
    throw new Error("could not find OPENROUTER_API_KEY in environment variables")
}
    
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
  },
})


const processUserPrompt = async (prompt: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" }, 
    messages: [{
      role: "user",
      content: `
        You are a principal software engineer with expertise in system design. Generate a system design for ${prompt} with component-level analysis in STRICT JSON format. Follow this schema:
  
        {
          "system_components": {
            "frontend": {
              "service" : "Service name",
              "features": [
                {
                  "name": "Feature name",
                  "technology": {
                    "name": "Exact tech + version",
                    "justification": {
                      "domain_specific_fit": ["Reason 1", "Reason 2"],
                      "benchmarks": {
                        "metric": "Value",
                        "source": "Source"
                      },
                      "integration_requirements": ["Lib X", "Tool Y"]
                    }
                  },
                  "tradeoffs": [
                    {
                      "technology": "Alternative tech",
                      "pros": ["Advantage 1", "Advantage 2"],
                      "cons": ["Limitation 1", "Limitation 2"],
                      "comparison_data": {
                        "metric": "Value vs current tech"
                      }
                    }
                  ],
                  "cost_analysis": {
                    "infrastructure": "USD/month",
                    "development": "Relative effort (1-5)",
                    "maintenance": "Opex score (1-5)"
                  },
                  "scalability": {
                    "limit": "Numerical threshold",
                    "bottleneck_description": "What fails first",
                    "mitigation": "Solution"
                  }
                }
              ]
            },
            "backend": {...},
            "database": {...},
            "infrastructure": {...},
            "security": {...}
          }
        }
  
        # RULES:
        1. EVERY field must be populated - no null/empty values
        2. Use ACTUAL benchmarks (e.g., "Redis: 50K ops/sec vs DynamoDB: 25K")
        3. Cost must include:
           - Cloud provider pricing (if applicable)
           - Licensing fees
           - Estimated dev hours multiplier
        4. Scalability requires:
           - Numerical limits (RPS, connections, etc.)
           - Failure mode description
           - Concrete mitigation
        5. Generate 3-4 High Level Services for frontend, backend, database, infrastructure, and security that will give the user a comprehensive overview of the system.
        6. Each Service should have 3-4 features.
        7. Each Feature should have a name, technology, justification, tradeoffs, cost analysis, and scalability.(for example: user auth api, post api or any relevant feature)
        8. Please Do not provide generic answers like "We will use AWS" or "We will use Redis". Provide specific technologies and their justifications.
        9. Please provide a detailed explanation of the feature and the technology used.
        10. Please provide a detailed explanation of the tradeoffs and the cost analysis.
        11. Please provide a detailed explanation of the scalability and the failure mode.
        12. Please provide a detailed explanation of the security measures taken.


        # EXAMPLE (for API Gateway):
        {
          "name": "High-throughput API Routing",
          "technology": {
            "name": "NGINX 1.25 + LuaJIT",
            "justification": {
              "domain_specific_fit": [
                "Supports 100K RPS on single instance",
                "Lua plugins for custom auth logic"
              ],
              "benchmarks": {
                "metric": "P99 latency 8ms @ 50K RPS",
                "source": "NGINX benchmark docs"
              },
              "integration_requirements": ["OpenResty", "Prometheus exporter"]
            }
          },
          "tradeoffs": [
            {
              "technology": "AWS ALB",
              "pros": ["Managed service", "AWS integration"],
              "cons": ["$0.008/LCU", "No custom logic"],
              "comparison_data": {
                "metric": "Costs 3x more at scale"
              }
            }
          ],
          "cost_analysis": {
            "infrastructure": "$0.05/hr (c6g.2xlarge)",
            "development": "2 (Lua expertise needed)",
            "maintenance": "3 (config management)"
          },
          "scalability": {
            "limit": "500K RPS per LB",
            "bottleneck_description": "CPU-bound TLS handshakes",
            "mitigation": "Offload TLS to dedicated instances"
          }
        }
      `
    }],
    temperature: 0.3
  })
  console.log(completion.choices[0].message.content)
}

