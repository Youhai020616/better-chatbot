import "server-only";

import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { xai } from "@ai-sdk/xai";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { LanguageModel } from "ai";
import { ChatModel } from "app-types/chat";
import { createOllama } from "ollama-ai-provider";
import {
  createOpenAICompatibleModels,
  openaiCompatibleModelsSafeParse,
} from "./create-openai-compatiable";

const ollama = createOllama({
  baseURL: process.env.OLLAMA_BASE_URL || "http://localhost:11434/api",
});

const staticModels = {
  openai: {
    "gpt-4.1": openai("gpt-4.1"),
    "gpt-4.1-mini": openai("gpt-4.1-mini"),
    "4o": openai("gpt-4o"),
    "4o-mini": openai("gpt-4o-mini"),
    "o4-mini": openai("o4-mini", {
      reasoningEffort: "medium",
    }),
  },
  google: {
    "gemini-2.0-flash-lite": google("gemini-2.0-flash-lite"),
    "gemini-2.5-flash": google("gemini-2.5-flash", {}),
    "gemini-2.5-pro": google("gemini-2.5-pro"),
  },
  anthropic: {
    "claude-4-sonnet": anthropic("claude-4-sonnet-20250514"),
    "claude-4-opus": anthropic("claude-4-opus-20250514"),
    "claude-3-7-sonnet": anthropic("claude-3-7-sonnet-latest"),
  },
  xai: {
    "grok-3": xai("grok-3-latest"),
    "grok-3-mini": xai("grok-3-mini-latest"),
  },
  ollama: {
    "gemma3:1b": ollama("gemma3:1b"),
    "gemma3:4b": ollama("gemma3:4b"),
    "gemma3:12b": ollama("gemma3:12b"),
  },
  openRouter: {
    // OpenAI Models
    "gpt-5": openrouter("openai/gpt-5"),
    "gpt-5-mini": openrouter("openai/gpt-5-mini"),
    "gpt-4.1": openrouter("openai/gpt-4.1"),
    "gpt-4.1-mini": openrouter("openai/gpt-4.1-mini"),
    "gpt-4o": openrouter("openai/gpt-4o"),
    "gpt-4o-mini": openrouter("openai/gpt-4o-mini"),
    "o4-mini": openrouter("openai/o4-mini"),

    // Anthropic Models
    "claude-opus-4": openrouter("anthropic/claude-opus-4"),
    "claude-sonnet-4": openrouter("anthropic/claude-sonnet-4"),
    "claude-3.7-sonnet": openrouter("anthropic/claude-3.7-sonnet"),
    "claude-3.5-sonnet": openrouter("anthropic/claude-3-5-sonnet-20241022"),
    "claude-3.5-haiku": openrouter("anthropic/claude-3-5-haiku-20241022"),

    // Google Models
    "gemini-2.5-flash": openrouter("google/gemini-2.5-flash"),
    "gemini-2.5-pro": openrouter("google/gemini-2.5-pro"),
    "gemini-2.5-flash-lite": openrouter("google/gemini-2.5-flash-lite"),
    "gemma-3n-2b:free": openrouter("google/gemma-3n-e2b-it:free"),

    // xAI Models
    "grok-4": openrouter("x-ai/grok-4"),
    "grok-3": openrouter("x-ai/grok-3"),
    "grok-3-mini": openrouter("x-ai/grok-3-mini"),

    // Mistral Models
    "codestral-2508": openrouter("mistralai/codestral-2508"),
    "mistral-small-3.2:free": openrouter(
      "mistralai/mistral-small-3.2-24b-instruct:free",
    ),
    "mistral-small-3.2": openrouter("mistralai/mistral-small-3.2-24b-instruct"),
    "mistral-large-2411": openrouter("mistralai/mistral-large-2411"),

    // Qwen Models
    "qwen3-coder:free": openrouter("qwen/qwen3-coder:free"),
    "qwen3-coder": openrouter("qwen/qwen3-coder"),
    "qwen3-235b": openrouter("qwen/qwen3-235b-a22b-2507"),
    "qwen3-30b": openrouter("qwen/qwen3-30b-a3b-instruct-2507"),

    // DeepSeek Models
    "deepseek-r1:free": openrouter("deepseek/deepseek-r1-0528:free"),
    "deepseek-r1": openrouter("deepseek/deepseek-r1-0528"),
    "deepseek-r1-qwen:free": openrouter(
      "deepseek/deepseek-r1-0528-qwen3-8b:free",
    ),
    "deepseek-r1-distill": openrouter("deepseek/deepseek-r1-distill-qwen-7b"),

    // Meta Llama Models
    "llama-4-maverick": openrouter("meta-llama/llama-4-maverick"),
    "llama-4-scout": openrouter("meta-llama/llama-4-scout"),
    "llama-3.3-70b:free": openrouter("meta-llama/llama-3.3-70b-instruct:free"),
    "llama-3.3-70b": openrouter("meta-llama/llama-3.3-70b-instruct"),

    // Microsoft Models
    "phi-4": openrouter("microsoft/phi-4"),
    "phi-4-multimodal": openrouter("microsoft/phi-4-multimodal-instruct"),
    "mai-ds-r1:free": openrouter("microsoft/mai-ds-r1:free"),

    // Amazon Models
    "nova-pro": openrouter("amazon/nova-pro-v1"),
    "nova-lite": openrouter("amazon/nova-lite-v1"),
    "nova-micro": openrouter("amazon/nova-micro-v1"),

    // Cohere Models
    "command-a": openrouter("cohere/command-a"),
    "command-r7b": openrouter("cohere/command-r7b-12-2024"),
    "command-r-plus": openrouter("cohere/command-r-plus-08-2024"),

    // Free Models for Testing
    "glm-4.5-air:free": openrouter("z-ai/glm-4.5-air:free"),
    "kimi-k2:free": openrouter("moonshotai/kimi-k2:free"),
    "sarvam-m:free": openrouter("sarvamai/sarvam-m:free"),
    "reka-flash-3:free": openrouter("rekaai/reka-flash-3:free"),
  },
};

const staticUnsupportedModels = new Set([
  staticModels.openai["o4-mini"],
  staticModels.google["gemini-2.0-flash-lite"],
  staticModels.ollama["gemma3:1b"],
  staticModels.ollama["gemma3:4b"],
  staticModels.ollama["gemma3:12b"],
  // OpenRouter models that don't support tools
  staticModels.openRouter["glm-4.5-air:free"],
  staticModels.openRouter["kimi-k2:free"],
  staticModels.openRouter["sarvam-m:free"],
  staticModels.openRouter["reka-flash-3:free"],
  staticModels.openRouter["gemma-3n-2b:free"],
]);

const openaiCompatibleProviders = openaiCompatibleModelsSafeParse(
  process.env.OPENAI_COMPATIBLE_DATA,
);

const {
  providers: openaiCompatibleModels,
  unsupportedModels: openaiCompatibleUnsupportedModels,
} = createOpenAICompatibleModels(openaiCompatibleProviders);

const allModels = { ...openaiCompatibleModels, ...staticModels };

const allUnsupportedModels = new Set([
  ...openaiCompatibleUnsupportedModels,
  ...staticUnsupportedModels,
]);

export const isToolCallUnsupportedModel = (model: LanguageModel) => {
  return allUnsupportedModels.has(model);
};

const firstProvider = Object.keys(allModels)[0];
const firstModel = Object.keys(allModels[firstProvider])[0];

const fallbackModel = allModels[firstProvider][firstModel];

export const customModelProvider = {
  modelsInfo: Object.entries(allModels).map(([provider, models]) => ({
    provider,
    models: Object.entries(models).map(([name, model]) => ({
      name,
      isToolCallUnsupported: isToolCallUnsupportedModel(model),
    })),
  })),
  getModel: (model?: ChatModel): LanguageModel => {
    if (!model) return fallbackModel;
    return allModels[model.provider]?.[model.model] || fallbackModel;
  },
};
