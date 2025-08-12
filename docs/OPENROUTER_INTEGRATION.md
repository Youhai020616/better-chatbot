# OpenRouter Integration Guide

This document describes the OpenRouter API integration in the better-chatbot project, including configuration, available models, and usage instructions.

## Overview

OpenRouter provides access to 300+ AI models from various providers through a unified API. This integration allows the chatbot to use models from OpenAI, Anthropic, Google, xAI, Meta, Microsoft, and many other providers.

## Configuration

### 1. API Key Setup

Add your OpenRouter API key to the `.env` file:

```bash
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here
```

### 2. Available Models

The integration includes carefully selected models organized by provider:

#### OpenAI Models
- `gpt-5` - Latest GPT-5 model
- `gpt-5-mini` - Smaller, faster GPT-5 variant
- `gpt-4.1` - GPT-4.1 model
- `gpt-4.1-mini` - Smaller GPT-4.1 variant
- `gpt-4o` - GPT-4 Omni model
- `gpt-4o-mini` - Smaller GPT-4 Omni variant
- `o4-mini` - Reasoning-focused model

#### Anthropic Models
- `claude-opus-4` - Most capable Claude model
- `claude-sonnet-4` - Balanced performance Claude model
- `claude-3.7-sonnet` - Advanced Claude 3.7 model
- `claude-3.5-sonnet` - Claude 3.5 Sonnet
- `claude-3.5-haiku` - Fast Claude 3.5 model

#### Google Models
- `gemini-2.5-flash` - Fast Gemini model
- `gemini-2.5-pro` - Professional Gemini model
- `gemini-2.5-flash-lite` - Lightweight Gemini model
- `gemma-3n-2b:free` - Free Gemma model

#### xAI Models
- `grok-4` - Latest Grok model
- `grok-3` - Grok 3 model
- `grok-3-mini` - Smaller Grok variant

#### Other Notable Models
- **Mistral**: `codestral-2508`, `mistral-large-2411`, `mistral-small-3.2`
- **Qwen**: `qwen3-coder`, `qwen3-235b`, `qwen3-30b`
- **DeepSeek**: `deepseek-r1`, `deepseek-r1-distill`
- **Meta Llama**: `llama-4-maverick`, `llama-4-scout`, `llama-3.3-70b`
- **Microsoft**: `phi-4`, `phi-4-multimodal`, `mai-ds-r1`
- **Amazon**: `nova-pro`, `nova-lite`, `nova-micro`
- **Cohere**: `command-a`, `command-r7b`, `command-r-plus`

#### Free Models for Testing
- `glm-4.5-air:free` - Free GLM model
- `kimi-k2:free` - Free Kimi model
- `sarvam-m:free` - Free Sarvam model
- `reka-flash-3:free` - Free Reka model

## Features

### 1. Tool Calling Support
Most models support function calling/tool usage. Models that don't support tools are automatically identified and handled appropriately.

### 2. Vision Capabilities
Many models support image input for vision-related tasks:
- OpenAI GPT-4o models
- Google Gemini models
- Anthropic Claude models

### 3. Streaming Support
All models support streaming responses for real-time interaction.

### 4. Error Handling
The integration includes comprehensive error handling for:
- Invalid API keys
- Model availability issues
- Rate limiting
- Network errors

## Usage

### In the Application
1. Select "openRouter" as the provider in the model selection dropdown
2. Choose from the available models
3. The chatbot will automatically use the OpenRouter API

### Model Selection Guidelines

#### For General Chat
- `gpt-4o` - Best overall performance
- `claude-opus-4` - Excellent reasoning
- `gemini-2.5-flash` - Fast responses

#### For Coding
- `codestral-2508` - Specialized for code
- `qwen3-coder` - Good coding capabilities
- `deepseek-r1` - Strong reasoning for complex problems

#### For Free Usage
- `deepseek-r1:free` - Free reasoning model
- `mistral-small-3.2:free` - Free general model
- `llama-3.3-70b:free` - Free large model

#### For Vision Tasks
- `gpt-4o` - Best vision capabilities
- `gemini-2.5-pro` - Strong multimodal
- `claude-opus-4` - Good image understanding

## Cost Optimization

1. **Use Free Models**: Start with free models for testing and development
2. **Choose Appropriate Size**: Use mini/small variants for simple tasks
3. **Monitor Usage**: OpenRouter provides usage tracking
4. **Batch Requests**: Group related queries when possible

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify API key is correct
   - Check if key has sufficient credits

2. **Model Not Available**
   - Some models may have limited availability
   - Try alternative models from the same provider

3. **Rate Limiting**
   - Implement exponential backoff
   - Consider using multiple API keys for high volume

4. **Tool Calling Issues**
   - Verify the model supports tools
   - Check tool definition format

### Testing

The integration has been thoroughly tested with:
- ✅ Authentication validation
- ✅ Model availability checks
- ✅ Error handling verification
- ✅ Tool calling functionality
- ✅ Vision model support
- ✅ Rate limiting behavior

## Security Considerations

1. **API Key Protection**: Never commit API keys to version control
2. **Environment Variables**: Use `.env` files for local development
3. **Production Secrets**: Use secure secret management in production
4. **Rate Limiting**: Implement client-side rate limiting to avoid abuse

## Support

For issues related to:
- **OpenRouter API**: Check [OpenRouter Documentation](https://openrouter.ai/docs)
- **Model Availability**: Visit [OpenRouter Models](https://openrouter.ai/models)
- **Integration Issues**: Check the application logs and error messages

## Updates

This integration supports 314 models as of the last update. New models are regularly added to OpenRouter and can be easily integrated by updating the model configuration in `src/lib/ai/models.ts`.
