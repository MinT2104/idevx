export const mockModels = [
  {
    id: '1',
    icon: '🤖',
    name: 'GPT-4',
    actionType: 'try' as const
  },
  {
    id: '2',
    icon: '🎨',
    name: 'DALL-E 3',
    actionType: 'explore' as const
  },
  {
    id: '3',
    icon: '📝',
    name: 'Claude 3',
    actionType: 'try' as const
  },
  {
    id: '4',
    icon: '🔍',
    name: 'Gemini Pro',
    actionType: 'explore' as const
  },
  {
    id: '5',
    icon: '💬',
    name: 'ChatGPT',
    actionType: 'try' as const
  }
];

export const mockSteps = [
  {
    id: '1',
    title: 'Choose Your Model',
    description: 'Select from our comprehensive suite of AI models tailored for your specific needs.'
  },
  {
    id: '2',
    title: 'Configure Parameters',
    description: 'Customize model settings and parameters to optimize performance for your use case.'
  },
  {
    id: '3',
    title: 'Deploy & Scale',
    description: 'Deploy your model and scale it across your infrastructure with our robust platform.'
  }
];
