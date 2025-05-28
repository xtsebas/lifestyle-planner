# 🧠 Lifestyle Plan Generator with LLMs

This project allows users to generate a **custom lifestyle plan** using an LLM (Large Language Model). It supports:

- Custom input for goals in **professional life**, **training**, **nutrition**, and **hobbies**
- LLM-generated responses using **Ollama** locally
- Real-time feedback and refinement of specific sections
- Conversation history stored locally (prompt + response)

---

## 🛠️ Requirements

- Node.js >= 18
- npm or pnpm
- [Ollama](https://ollama.com/) installed and running
- A supported model like `mistral` pulled using Ollama

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Start Ollama (runs on http://127.0.0.1:11434 by default)
ollama serve

# Pull a model (e.g., DeepSeek Coder)
ollama pull mistral
```

# 🚀 Getting Started
```bash
npm install
npm run dev
```
Open your browser at http://localhost:5173


# 🧩 Notes About LLM Models
This project uses deepseek-coder via Ollama by default.
We originally attempted to use ChatGPT and DeepSeek’s hosted APIs, but:
 - DeepSeek does not currently offer an API key for their hosted models
 - ChatGPT requires paid credits, and we exhausted the free quota

# 📂 Project Structure
```bash
├── components/
│   ├── PlanForm.tsx          # User input form
│   ├── GeneratePlan.tsx      # Displays parsed plan
│   ├── FeedbackForm.tsx      # Adjustments per section
├── api/
│   └── llm.ts                # LLM interaction logic
├── utils/
│   └── planParser.ts         # Extracts sections from text
├── pages/
│   └── Home.tsx              # Main page logic
```

# 📋 Features
 - Interactive input form
 - LLM integration (via Ollama)
 - Plan parsing + display
 - Section-specific feedback loop
 - Local history tracking (stored in localStorage)
