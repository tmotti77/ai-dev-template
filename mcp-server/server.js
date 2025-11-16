#!/usr/bin/env node

/**
 * AI Dev Team MCP Server
 * Orchestrates multiple AI agents working as a development team
 */

const fs = require('fs');
const path = require('path');

class AIDevTeamServer {
  constructor() {
    // Set project root as parent directory of mcp-server
    this.projectRoot = path.join(__dirname, '..');
    this.config = this.loadConfig();
    this.agents = this.config.agents;
    this.workflows = this.config.workflows;
  }

  loadConfig() {
    const configPath = path.join(__dirname, 'mcp-config.json');
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }

  // MCP Protocol Implementation
  async handleRequest(request) {
    const { method, params } = request;

    switch (method) {
      case 'tools/list':
        return this.listTools();
      case 'tools/call':
        return this.callTool(params);
      case 'resources/list':
        return this.listResources();
      case 'resources/read':
        return this.readResource(params);
      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }

  listTools() {
    return {
      tools: [
        {
          name: 'auto_route',
          description: 'ALWAYS USE THIS FIRST - Automatically detect which agent should handle the user query and load their full context. This makes the AI respond as that specialized agent.',
          inputSchema: {
            type: 'object',
            properties: {
              user_query: {
                type: 'string',
                description: 'The user\'s question or request'
              }
            },
            required: ['user_query']
          }
        },
        {
          name: 'assign_task',
          description: 'Assign a task to a specific agent',
          inputSchema: {
            type: 'object',
            properties: {
              agent: {
                type: 'string',
                enum: ['claude', 'grok', 'gemini', 'codex', 'copilot'],
                description: 'The agent to assign the task to'
              },
              task: {
                type: 'string',
                description: 'The task description'
              },
              context: {
                type: 'object',
                description: 'Additional context for the task'
              }
            },
            required: ['agent', 'task']
          }
        },
        {
          name: 'run_workflow',
          description: 'Execute a predefined workflow',
          inputSchema: {
            type: 'object',
            properties: {
              workflow: {
                type: 'string',
                enum: ['feature-development', 'bug-fix', 'refactor', 'code-review'],
                description: 'The workflow to execute'
              },
              context: {
                type: 'object',
                description: 'Context for the workflow (files, description, etc.)'
              }
            },
            required: ['workflow']
          }
        },
        {
          name: 'get_agent_info',
          description: 'Get information about an agent',
          inputSchema: {
            type: 'object',
            properties: {
              agent: {
                type: 'string',
                enum: ['claude', 'grok', 'gemini', 'codex', 'copilot'],
                description: 'The agent to get info about'
              }
            },
            required: ['agent']
          }
        },
        {
          name: 'suggest_agent',
          description: 'Suggest which agent should handle a task',
          inputSchema: {
            type: 'object',
            properties: {
              task_description: {
                type: 'string',
                description: 'Description of the task'
              }
            },
            required: ['task_description']
          }
        }
      ]
    };
  }

  listResources() {
    return {
      resources: [
        {
          uri: 'agent://claude',
          name: 'Claude - Lead Developer',
          mimeType: 'text/markdown'
        },
        {
          uri: 'agent://grok',
          name: 'Grok - Code Reviewer',
          mimeType: 'text/markdown'
        },
        {
          uri: 'agent://gemini',
          name: 'Gemini - Refactoring Specialist',
          mimeType: 'text/markdown'
        },
        {
          uri: 'agent://codex',
          name: 'Codex - Test Engineer',
          mimeType: 'text/markdown'
        },
        {
          uri: 'agent://copilot',
          name: 'Copilot - CLI Runner',
          mimeType: 'text/markdown'
        },
        {
          uri: 'workflow://list',
          name: 'Available Workflows',
          mimeType: 'application/json'
        }
      ]
    };
  }

  async readResource(params) {
    const { uri } = params;

    if (uri.startsWith('agent://')) {
      const agentName = uri.replace('agent://', '');
      const agent = this.agents[agentName];

      if (!agent) {
        throw new Error(`Unknown agent: ${agentName}`);
      }

      const configPath = path.join(this.projectRoot, agent.configPath);
      const content = fs.readFileSync(configPath, 'utf8');

      return {
        contents: [{
          uri,
          mimeType: 'text/markdown',
          text: content
        }]
      };
    }

    if (uri === 'workflow://list') {
      return {
        contents: [{
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(this.workflows, null, 2)
        }]
      };
    }

    throw new Error(`Unknown resource: ${uri}`);
  }

  async callTool(params) {
    const { name, arguments: args } = params;

    switch (name) {
      case 'auto_route':
        return this.autoRoute(args);
      case 'assign_task':
        return this.assignTask(args);
      case 'run_workflow':
        return this.runWorkflow(args);
      case 'get_agent_info':
        return this.getAgentInfo(args);
      case 'suggest_agent':
        return this.suggestAgent(args);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  assignTask(args) {
    const { agent, task, context = {} } = args;
    const agentConfig = this.agents[agent];

    if (!agentConfig) {
      throw new Error(`Unknown agent: ${agent}`);
    }

    return {
      content: [{
        type: 'text',
        text: `Task assigned to ${agent} (${agentConfig.role}):\n\n${task}\n\nContext: ${JSON.stringify(context, null, 2)}\n\nSee ${agentConfig.configPath} for agent instructions.`
      }]
    };
  }

  runWorkflow(args) {
    const { workflow, context = {} } = args;
    const workflowConfig = this.workflows[workflow];

    if (!workflowConfig) {
      throw new Error(`Unknown workflow: ${workflow}`);
    }

    const steps = workflowConfig.steps.map((step, i) => {
      return `${i + 1}. [${step.agent}] ${step.task}`;
    }).join('\n');

    return {
      content: [{
        type: 'text',
        text: `Workflow: ${workflowConfig.description}\n\nSteps:\n${steps}\n\nContext: ${JSON.stringify(context, null, 2)}`
      }]
    };
  }

  getAgentInfo(args) {
    const { agent } = args;
    const agentConfig = this.agents[agent];

    if (!agentConfig) {
      throw new Error(`Unknown agent: ${agent}`);
    }

    return {
      content: [{
        type: 'text',
        text: `Agent: ${agent}\nRole: ${agentConfig.role}\nModel: ${agentConfig.model}\nSpecialties: ${agentConfig.specialties.join(', ')}\nConfig: ${agentConfig.configPath}`
      }]
    };
  }

  suggestAgent(args) {
    const { task_description } = args;
    const taskLower = task_description.toLowerCase();

    // Simple keyword matching to suggest agents
    let suggestions = [];

    if (taskLower.match(/implement|create|build|develop|feature|architecture/)) {
      suggestions.push({ agent: 'claude', reason: 'Lead developer for implementation and architecture' });
    }
    if (taskLower.match(/review|check|bug|security|quality/)) {
      suggestions.push({ agent: 'grok', reason: 'Code reviewer for quality and security' });
    }
    if (taskLower.match(/refactor|clean|optimize|improve|simplify/)) {
      suggestions.push({ agent: 'gemini', reason: 'Refactoring specialist for code improvements' });
    }
    if (taskLower.match(/test|coverage|unit|integration/)) {
      suggestions.push({ agent: 'codex', reason: 'Test engineer for comprehensive testing' });
    }
    if (taskLower.match(/run|build|deploy|execute|command/)) {
      suggestions.push({ agent: 'copilot', reason: 'CLI runner for executing commands' });
    }

    if (suggestions.length === 0) {
      suggestions.push({ agent: 'claude', reason: 'Default: Lead developer for general tasks' });
    }

    const suggestionText = suggestions.map(s =>
      `- ${s.agent}: ${s.reason}`
    ).join('\n');

    return {
      content: [{
        type: 'text',
        text: `Suggested agents for: "${task_description}"\n\n${suggestionText}`
      }]
    };
  }

  autoRoute(args) {
    const { user_query } = args;
    const queryLower = user_query.toLowerCase();

    // Detect which agent should handle this query
    let selectedAgent = 'claude'; // default
    let reason = 'Default: Lead developer for general tasks';

    // Priority order based on keywords
    if (queryLower.match(/test|coverage|unit|integration|spec|jest|pytest|mocha/)) {
      selectedAgent = 'codex';
      reason = 'Test engineer - handles testing tasks';
    } else if (queryLower.match(/review|check|audit|security|vulnerability|bug|issue|problem/)) {
      selectedAgent = 'grok';
      reason = 'Code reviewer - handles quality and security checks';
    } else if (queryLower.match(/refactor|clean|optimize|improve|simplify|restructure|organize/)) {
      selectedAgent = 'gemini';
      reason = 'Refactoring specialist - handles code improvements';
    } else if (queryLower.match(/run|execute|build|deploy|install|command|npm|pip|docker|terminal/)) {
      selectedAgent = 'copilot';
      reason = 'CLI runner - handles command execution';
    } else if (queryLower.match(/implement|create|build|develop|feature|architecture|design|api|function|class/)) {
      selectedAgent = 'claude';
      reason = 'Lead developer - handles implementation and architecture';
    }

    // Load the agent's full instructions
    const agentConfig = this.agents[selectedAgent];
    if (!agentConfig) {
      throw new Error(`Unknown agent: ${selectedAgent}`);
    }

    const configPath = path.join(this.projectRoot, agentConfig.configPath);
    const agentInstructions = fs.readFileSync(configPath, 'utf8');

    // Return the full agent context
    return {
      content: [{
        type: 'text',
        text: `🤖 Auto-routed to: ${selectedAgent.toUpperCase()} (${reason})

========================================
AGENT INSTRUCTIONS - ${selectedAgent.toUpperCase()}
========================================

${agentInstructions}

========================================
USER QUERY
========================================

${user_query}

========================================
INSTRUCTIONS
========================================

You are now acting as the ${agentConfig.role}. Follow the agent instructions above to respond to the user's query. Stay in character and use the working style, collaboration guidelines, and output format specified for this agent.`
      }]
    };
  }
}

// MCP Server Main Loop
async function main() {
  const server = new AIDevTeamServer();

  // Read from stdin, write to stdout (MCP protocol)
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', async (line) => {
    try {
      const request = JSON.parse(line);
      const response = await server.handleRequest(request);
      console.log(JSON.stringify(response));
    } catch (error) {
      console.error(JSON.stringify({
        error: {
          code: -32000,
          message: error.message
        }
      }));
    }
  });
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { AIDevTeamServer };
